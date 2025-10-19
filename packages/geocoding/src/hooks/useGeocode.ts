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

    console.log('🔍 useGeocode: Starting search for:', queryToSearch);

    // Cancel προηγούμενη αναζήτηση
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Δημιουργία νέου AbortController
    abortControllerRef.current = new AbortController();

    setIsLoading(true);
    setError(null);

    try {
      const request: GeocodeRequest = {
        query: queryToSearch,
        countryCode: 'GR',
        limit: 5,
        language: 'el'
      };

      console.log('📡 useGeocode: Making API request with:', request);

      const response = await provider.search(request);

      // Έλεγχος αν η αναζήτηση ακυρώθηκε
      if (abortControllerRef.current?.signal.aborted) {
        console.log('🛑 useGeocode: Search aborted');
        return;
      }

      console.log('✅ useGeocode: Search completed with', response.results.length, 'results');

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
        console.log('🛑 useGeocode: Request cancelled');
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

    debounceTimeoutRef.current = setTimeout(() => {
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
    console.log('🎯 useGeocode: Selected result:', result.displayName);
    setSelectedResult(result);

    if (onSelect) {
      onSelect(result);
    }
  }, [onSelect]);

  // Action για καθαρισμό
  const clear = useCallback(() => {
    console.log('🧹 useGeocode: Clearing results');
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