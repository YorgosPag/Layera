/**
 * useOccupationSearch - Enterprise React hook για occupation search
 * Χρησιμοποιεί ESCO API με caching, debouncing και error handling
 */

import React from "react";
import { useState, useCallback, useEffect, useRef } from 'react';
import { escoProvider } from '../providers/esco';
import type { Occupation, OccupationSearchFilters, OccupationSearchResult } from '../types/occupation';
import type { ESCOOccupation } from '../types/esco';

export interface UseOccupationSearchOptions {
  /** Auto-search as user types */
  autoSearch?: boolean;
  /** Debounce delay in milliseconds */
  debounceMs?: number;
  /** Default search filters */
  defaultFilters?: Partial<OccupationSearchFilters>;
  /** Callback when occupation is selected */
  onOccupationSelect?: (occupation: Occupation) => void;
  /** Default language */
  language?: string;
}

export interface UseOccupationSearchReturn {
  /** Current search query */
  query: string;
  /** Search results */
  results: Occupation[];
  /** Loading state */
  isLoading: boolean;
  /** Error message */
  error: string | null;
  /** Selected occupation */
  selectedOccupation: Occupation | null;
  /** Current filters */
  filters: OccupationSearchFilters;
  /** Search actions */
  actions: {
    /** Set search query */
    setQuery: (query: string) => React.ReactNode;
    /** Execute search */
    search: (query?: string, filters?: Partial<OccupationSearchFilters>) => Promise<void>;
    /** Select occupation */
    selectOccupation: (occupation: Occupation) => React.ReactNode;
    /** Update filters */
    setFilters: (filters: Partial<OccupationSearchFilters>) => React.ReactNode;
    /** Clear search */
    clear: () => React.ReactNode;
  };
  /** Search metadata */
  meta: {
    /** Total results available */
    total: number;
    /** Current page */
    page: number;
    /** Has more results */
    hasMore: boolean;
    /** Load more results */
    loadMore: () => Promise<void>;
  };
}

export function useOccupationSearch(options: UseOccupationSearchOptions = {}): UseOccupationSearchReturn {
  const {
    autoSearch = false,
    debounceMs = 500,
    defaultFilters = {},
    onOccupationSelect,
    language = 'el'
  } = options;

  // State
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<Occupation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedOccupation, setSelectedOccupation] = useState<Occupation | null>(null);
  const [total, setTotal] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(0);

  const [filters, setFiltersState] = useState<OccupationSearchFilters>({
    language,
    limit: 20,
    offset: 0,
    ...defaultFilters
  });

  // Refs για cleanup και debouncing
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  /**
   * Transform ESCO occupation to domain occupation
   */
  const transformESCOToOccupation = useCallback((escoOccupation: ESCOOccupation): Occupation => {
    return {
      id: escoOccupation.uuid,
      title: escoOccupation.preferredLabel,
      alternativeTitles: escoOccupation.alternativeLabel,
      description: escoOccupation.description,
      category: {
        id: escoOccupation.iscoGroup || 'unknown',
        name: escoOccupation.iscoGroup || 'Άγνωστη κατηγορία',
        level: 1 // NOTE: Extract from ISCO code
      },
      employmentTypes: ['full_time'], // NOTE: Infer from occupation data
      skills: [], // NOTE: Transform ESCO skills
      experienceLevel: 'mid', // NOTE: Infer from occupation
      escoUri: escoOccupation.uri,
      iscoCode: escoOccupation.iscoGroup,
      localizations: {
        [language]: {
          title: escoOccupation.preferredLabel,
          alternativeTitles: escoOccupation.alternativeLabel,
          description: escoOccupation.description,
          language
        }
      }
    };
  }, [language]);

  /**
   * Execute search against ESCO API
   */
  const search = useCallback(async (searchQuery?: string, searchFilters?: Partial<OccupationSearchFilters>) => {
    const queryToSearch = searchQuery ?? query;
    const filtersToUse = { ...filters, ...searchFilters };

    if (!queryToSearch.trim()) {
      setResults([]);
      setError(null);
      setTotal(0);
      return;
    }
    // Cancel previous search
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    setIsLoading(true);
    setError(null);

    try {
      const escoResponse = await escoProvider.search({
        text: queryToSearch,
        type: 'occupation',
        language: filtersToUse.language || language,
        limit: filtersToUse.limit || 20,
        offset: filtersToUse.offset || 0,
        includeSkills: true,
        mode: 'contains'
      });

      // Transform ESCO results to domain objects
      const occupations = escoResponse.results
        .filter((result): result is ESCOOccupation => 'iscoGroup' in result)
        .map(transformESCOToOccupation);
      setResults(occupations);
      setTotal(escoResponse.total);
      setCurrentPage(Math.floor((filtersToUse.offset || 0) / (filtersToUse.limit || 20)));

    } catch (searchError) {
      console.error('❌ useOccupationSearch: Search error:', searchError);
      setError(searchError instanceof Error ? searchError.message : 'Σφάλμα αναζήτησης');
      setResults([]);
      setTotal(0);
    } finally {
      setIsLoading(false);
    }
  }, [query, filters, language, transformESCOToOccupation]);

  /**
   * Debounced search για auto-search
   */
  const debouncedSearch = useCallback((searchQuery: string) => {
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }

    debounceTimeoutRef.current = setTimeout((): void => {
      search(searchQuery);
    }, debounceMs);
  }, [search, debounceMs]);

  /**
   * Auto-search όταν αλλάζει το query
   */
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

  /**
   * Cleanup on unmount
   */
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

  /**
   * Select occupation
   */
  const selectOccupation = useCallback((occupation: Occupation) => {
    setSelectedOccupation(occupation);

    if (onOccupationSelect) {
      onOccupationSelect(occupation);
    }
  }, [onOccupationSelect]);

  /**
   * Update filters
   */
  const setFilters = useCallback((newFilters: Partial<OccupationSearchFilters>) => {
    setFiltersState(prev => ({ ...prev, ...newFilters }));
  }, []);

  /**
   * Clear search
   */
  const clear = useCallback(() => {
    setQuery('');
    setResults([]);
    setError(null);
    setSelectedOccupation(null);
    setTotal(0);
    setCurrentPage(0);
    setIsLoading(false);

    // Cancel active search
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Clear debounce
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current);
    }
  }, []);

  /**
   * Load more results (pagination)
   */
  const loadMore = useCallback(async () => {
    if (isLoading || !query.trim()) return;

    const nextOffset = (currentPage + 1) * (filters.limit || 20);
    await search(query, { ...filters, offset: nextOffset });
  }, [isLoading, query, currentPage, filters, search]);

  const hasMore = total > results.length;

  return {
    query,
    results,
    isLoading,
    error,
    selectedOccupation,
    filters,
    actions: {
      setQuery,
      search,
      selectOccupation,
      setFilters,
      clear
    },
    meta: {
      total,
      page: currentPage,
      hasMore,
      loadMore
    }
  };
}