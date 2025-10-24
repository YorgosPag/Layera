/**
 * ESCOSearchComponent.tsx - Enterprise ESCO Search με Firebase Integration
 *
 * Real-time search στην ESCO database με enterprise features
 */

import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { useLayeraTranslation } from '@layera/tolgee';
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  query,
  where,
  limit,
  getDocs
} from 'firebase/firestore';
import type { ESCOOccupation, ESCOSearchProps, OccupationSearchState } from './types';

// Firebase Configuration - Same as HTML demo
const firebaseConfig = {
  apiKey: "AIzaSyCFOPrm-YaHRbsZ38F7y0jYtGI6iCxzXJQ",
  authDomain: "layera-dev.firebaseapp.com",
  projectId: "layera-dev",
  storageBucket: "layera-dev.firebasestorage.app",
  messagingSenderId: "318578122017",
  appId: "1:318578122017:web:9dbe031370ed79339db260"
};

/**
 * Enterprise ESCO Search Component με Firebase real-time search
 */
export const ESCOSearchComponent: React.FC<ESCOSearchProps> = ({
  onOccupationSelected,
  placeholder = "Αναζήτηση επαγγέλματος... (π.χ. γιατρός, μηχανικός, δικηγόρος)",
  maxResults = 20,
  variant = 'default'
}) => {
  const { t } = useLayeraTranslation();

  // Search State
  const [searchState, setSearchState] = useState<OccupationSearchState>({
    query: '',
    isLoading: false,
    results: [],
    selectedOccupation: null,
    error: undefined
  });

  // Firebase Connection
  const firebaseApp = useMemo(() => {
    try {
      return initializeApp(firebaseConfig);
    } catch (error) {
      console.error('Firebase initialization failed:', error);
      return null;
    }
  }, []);

  const db = useMemo(() => {
    if (!firebaseApp) return null;
    return getFirestore(firebaseApp);
  }, [firebaseApp]);

  // Search Function με debouncing
  const searchOccupations = useCallback(async (searchQuery: string): Promise<ESCOOccupation[]> => {
    if (!db || !searchQuery || searchQuery.length < 3) {
      return [];
    }

    try {
      console.log(`🔍 ESCO Search: "${searchQuery}"`);

      const searchTerms = searchQuery.toLowerCase().split(' ').filter(term => term.length > 2);

      if (searchTerms.length === 0) return [];

      // Firebase Query - same as HTML demo
      const q = query(
        collection(db, 'occupations'),
        where('searchTerms', 'array-contains', searchTerms[0]),
        limit(maxResults)
      );

      const querySnapshot = await getDocs(q);
      const results: ESCOOccupation[] = [];

      querySnapshot.docs.forEach(doc => {
        const data = doc.data();
        results.push({
          id: data.id,
          preferredLabel: data.preferredLabel,
          alternativeLabels: data.alternativeLabels || [],
          description: data.description || '',
          definition: data.definition || '',
          iscoGroupCode: data.iscoGroupCode || '',
          searchTerms: data.searchTerms || [],
          skillsCount: data.skillsCount || 0,
          essentialSkills: data.essentialSkills || []
        });
      });

      console.log(`✅ ESCO Search found ${results.length} results`);
      return results;

    } catch (error) {
      console.error('ESCO search failed:', error);
      throw error;
    }
  }, [db, maxResults]);

  // Debounced search effect
  useEffect(() => {
    if (searchState.query.length < 3) {
      setSearchState(prev => ({ ...prev, results: [], isLoading: false, error: undefined }));
      return;
    }

    setSearchState(prev => ({ ...prev, isLoading: true, error: undefined }));

    const timeoutId = setTimeout(async () => {
      try {
        const results = await searchOccupations(searchState.query);
        setSearchState(prev => ({
          ...prev,
          results,
          isLoading: false,
          error: undefined
        }));
      } catch (error) {
        setSearchState(prev => ({
          ...prev,
          results: [],
          isLoading: false,
          error: 'Αποτυχία αναζήτησης. Παρακαλώ δοκιμάστε ξανά.'
        }));
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(timeoutId);
  }, [searchState.query, searchOccupations]);

  // Handle search input change
  const handleSearchChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setSearchState(prev => ({ ...prev, query: newQuery }));
  }, []);

  // Handle occupation selection
  const handleOccupationSelect = useCallback((occupation: ESCOOccupation) => {
    console.log(`✅ OCCUPATION SELECTED: ${occupation.preferredLabel} (ID: ${occupation.id})`);

    setSearchState(prev => ({
      ...prev,
      selectedOccupation: occupation,
      query: occupation.preferredLabel
    }));

    onOccupationSelected(occupation);
  }, [onOccupationSelected]);

  // Connection Status
  const isConnected = !!db;

  // Styles
  const containerStyles: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    maxWidth: '400px',
    margin: '0 auto'
  };

  const searchInputStyles: React.CSSProperties = {
    width: '100%',
    padding: '12px 16px',
    border: '2px solid #e1e5e9',
    borderRadius: '8px',
    fontSize: '16px',
    backgroundColor: isConnected ? '#ffffff' : '#f8f9fa',
    outline: 'none',
    transition: 'border-color 0.2s ease',
    boxSizing: 'border-box'
  };

  const resultsContainerStyles: React.CSSProperties = {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    border: '1px solid #e1e5e9',
    borderRadius: '8px',
    maxHeight: '300px',
    overflowY: 'auto',
    zIndex: 1000,
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
  };

  const resultItemStyles: React.CSSProperties = {
    padding: '12px 16px',
    borderBottom: '1px solid #f1f3f4',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease'
  };

  const loadingStyles: React.CSSProperties = {
    padding: '12px 16px',
    textAlign: 'center',
    color: '#666',
    fontStyle: 'italic'
  };

  return (
    <div style={containerStyles}>
      {/* Connection Status */}
      {!isConnected && (
        <div style={{
          padding: '8px',
          backgroundColor: '#fff3cd',
          color: '#856404',
          borderRadius: '4px',
          marginBottom: '8px',
          fontSize: '14px'
        }}>
          ⚠️ Προσπάθεια σύνδεσης με ESCO database...
        </div>
      )}

      {/* Search Input */}
      <input
        type="text"
        value={searchState.query}
        onChange={handleSearchChange}
        placeholder={placeholder}
        style={searchInputStyles}
        disabled={!isConnected}
        data-testid="esco-search-input"
      />

      {/* Results */}
      {(searchState.results.length > 0 || searchState.isLoading || searchState.error) && (
        <div style={resultsContainerStyles}>
          {/* Loading */}
          {searchState.isLoading && (
            <div style={loadingStyles}>
              🔍 Αναζήτηση...
            </div>
          )}

          {/* Error */}
          {searchState.error && (
            <div style={{ ...loadingStyles, color: '#dc3545' }}>
              ❌ {searchState.error}
            </div>
          )}

          {/* Results */}
          {!searchState.isLoading && !searchState.error && searchState.results.map((occupation) => (
            <div
              key={occupation.id}
              style={resultItemStyles}
              onClick={() => handleOccupationSelect(occupation)}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.backgroundColor = '#f8f9fa';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.backgroundColor = 'transparent';
              }}
              data-testid={`esco-result-${occupation.id}`}
            >
              <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                {occupation.preferredLabel}
              </div>
              {occupation.description && (
                <div style={{ fontSize: '14px', color: '#666', lineHeight: '1.4' }}>
                  {occupation.description.slice(0, 100)}
                  {occupation.description.length > 100 ? '...' : ''}
                </div>
              )}
              {occupation.skillsCount > 0 && (
                <div style={{ fontSize: '12px', color: '#28a745', marginTop: '4px' }}>
                  💼 {occupation.skillsCount} skills
                </div>
              )}
            </div>
          ))}

          {/* No Results */}
          {!searchState.isLoading && !searchState.error && searchState.query.length >= 3 && searchState.results.length === 0 && (
            <div style={loadingStyles}>
              🔍 Δεν βρέθηκαν αποτελέσματα για "{searchState.query}"
            </div>
          )}
        </div>
      )}
    </div>
  );
};