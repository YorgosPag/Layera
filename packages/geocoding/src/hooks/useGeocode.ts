/**
 * @layera/geocoding - useGeocode Hook
 * Enterprise React hook για location search functionality
 */

import { useState, useCallback, useEffect, useRef } from 'react';
import type {
  UseGeocodeOptions,
  UseGeocodeReturn,
  GeocodeResult,
  GeocodeRequest
} from '../types';
import { nominatimProvider } from '../providers/nominatim';

export function useGeocode(options: UseGeocodeOptions = {}): UseGeocodeReturn {
  const {
    provider = nominatimProvider,
    debounceMs = 300,
    autoSearch = false,
    onSelect
  } = options;

  // State
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<GeocodeResult[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedResult, setSelectedResult] = useState<GeocodeResult | null>(null);
  const [currentLanguage, setCurrentLanguage] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      // LEGACY: 'i18nextLng' key maintained for backward compatibility with existing installations
      return localStorage.getItem('i18nextLng') || 'el';
    }
    return 'el';
  });

  // Refs για debouncing και cleanup
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Κύρια μέθοδος αναζήτησης
  const search = useCallback(async (searchQuery?: string) => {
    const queryToSearch = searchQuery ?? query;

    if (!queryToSearch.trim()) {
      setResults([]);
      setError(null);
      return;
    }
    // Cancel προηγούμενη αναζήτηση
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Δημιουργία νέου AbortController
    abortControllerRef.current = new AbortController();

    setIsLoading(true);
    setError(null);

    try {
      // Ανίχνευση γλώσσας από browser ή localStorage
      // LEGACY: Using 'i18nextLng' for backward compatibility - can be 'el' or 'en', not 'el-GR' or 'en-US'
      const storedLang = typeof window !== 'undefined' ? localStorage.getItem('i18nextLng') : null;
      const userLanguage = storedLang || (typeof navigator !== 'undefined' ? navigator.language.slice(0, 2) : 'el');
      const request: GeocodeRequest = {
        query: queryToSearch,
        // Αφαιρούμε το countryCode για παγκόσμια αναζήτηση
        limit: 5,
        language: userLanguage.startsWith('el') ? 'el' : 'en' // Χρήση γλώσσας χρήστη
      };
      const response = await provider.search(request);

      // Έλεγχος αν η αναζήτηση ακυρώθηκε
      if (abortControllerRef.current?.signal.aborted) {
        return;
      }
      if (response.status === 'error') {
        setError(response.error || 'Σφάλμα αναζήτησης');
        setResults([]);
      } else {
        setResults(response.results);
        setError(null);
      }

    } catch (searchError) {
      // Αγνόησε σφάλματα από cancelled requests
      if (searchError instanceof Error && searchError.name === 'AbortError') {
        return;
      }

      console.error('❌ useGeocode: Search error:', searchError);
      setError(searchError instanceof Error ? searchError.message : 'Άγνωστο σφάλμα');
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, [query, provider]);

  // Debounced search για auto-search
  const debouncedSearch = useCallback((searchQuery: string) => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout((): void => {
      search(searchQuery);
    }, debounceMs);
  }, [search, debounceMs]);

  // Auto-search όταν αλλάζει το query
  useEffect(() => {
    if (autoSearch && query.trim()) {
      debouncedSearch(query);
    }

    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [query, autoSearch, debouncedSearch]);

  // Listen για αλλαγές γλώσσας και re-search αν υπάρχουν αποτελέσματα
  useEffect(() => {
    const handleLanguageChange = (): void => {
      // LEGACY: 'i18nextLng' key for backward compatibility
      const newLanguage = localStorage.getItem('i18nextLng') || 'el';
      if (newLanguage !== currentLanguage) {
        setCurrentLanguage(newLanguage);

        // Αν υπάρχουν αποτελέσματα ή active query, ξανακάνε αναζήτηση
        if (query.trim() && results.length > 0) {
          search(query);
        }
      }
    };

    // Listen για storage events (αλλαγές από άλλα tabs)
    window.addEventListener('storage', handleLanguageChange);

    // Listen για custom event από language switcher
    window.addEventListener('languagechange', handleLanguageChange);

    // Polling για τοπικές αλλαγές (same tab)
    const interval = setInterval((): void => {
      // LEGACY: Check for language changes using legacy key
      const newLang = localStorage.getItem('i18nextLng') || 'el';
      if (newLang !== currentLanguage) {
        handleLanguageChange();
      }
    }, 500);

    return () => {
      window.removeEventListener('storage', handleLanguageChange);
      window.removeEventListener('languagechange', handleLanguageChange);
      clearInterval(interval);
    };
  }, [currentLanguage, query, results.length, search]);

  // Cleanup όταν unmount το component
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  // Action για επιλογή αποτελέσματος
  const selectResult = useCallback((result: GeocodeResult) => {
    setSelectedResult(result);

    if (onSelect) {
      onSelect(result);
    }
  }, [onSelect]);

  // Action για καθαρισμό
  const clear = useCallback(() => {
    setQuery('');
    setResults([]);
    setError(null);
    setSelectedResult(null);
    setIsLoading(false);

    // Cancel τρέχουσα αναζήτηση
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Clear debounce
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
  }, []);

  return {
    query,
    results,
    isLoading,
    error,
    selectedResult,
    actions: {
      setQuery,
      search,
      selectResult,
      clear
    }
  };
}