/**
 * ESCOSearchComponent.tsx - Enterprise ESCO Search με Firebase Integration
 *
 * Real-time search στην ESCO database με enterprise features
 */

import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { Input } from '@layera/forms';
import { Text } from '@layera/typography';
import { Stack } from '@layera/layout';
import { SPACING_SCALE, TABLE_COLUMN_WIDTHS } from '@layera/constants';
import { BOX_SHADOW_SCALE } from '@layera/box-shadows';
// Firebase imports temporarily disabled
// import { initializeApp } from 'firebase/app';
// import {
//   getFirestore,
//   collection,
//   query,
//   where,
//   limit,
//   getDocs
// } from 'firebase/firestore';
import type { ESCOOccupation, ESCOSearchProps, OccupationSearchState } from './types';

// Firebase Configuration με environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCFOPrm-YaHRbsZ38F7y0jYtGI6iCxzXJQ",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "layera-dev.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "layera-dev",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "layera-dev.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "318578122017",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:318578122017:web:9dbe031370ed79339db260"
};

/**
 * Enterprise ESCO Search Component με Firebase real-time search
 */
export const ESCOSearchComponent: React.FC<ESCOSearchProps> = ({
  onOccupationSelected,
  placeholder = "Αναζήτηση επαγγέλματος... (π.χ. γιατρός, μηχανικός, δικηγόρος)",
  maxResults = 20
}) => {

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

  // Styles για non-LEGO elements
  const containerStyles: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    maxWidth: `${TABLE_COLUMN_WIDTHS.EXTRA_WIDE}px`,
    margin: '0 auto'
  };

  const resultsContainerStyles: React.CSSProperties = {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: 'var(--color-bg-canvas)',
    border: '1px solid #e1e5e9',
    borderRadius: `${SPACING_SCALE.SM}px`,
    maxHeight: `${TABLE_COLUMN_WIDTHS.WIDE}px`,
    overflowY: 'auto',
    zIndex: 1000,
    boxShadow: BOX_SHADOW_SCALE.cardDefault
  };

  const resultItemStyles: React.CSSProperties = {
    padding: `${SPACING_SCALE.SM}px ${SPACING_SCALE.MD}px`,
    borderBottom: '1px solid #f1f3f4',
    cursor: 'pointer',
    transition: 'var(--layera-transition-fast)'
  };

  const loadingStyles: React.CSSProperties = {
    padding: `${SPACING_SCALE.SM}px ${SPACING_SCALE.MD}px`,
    textAlign: 'center'
  };

  return (
    <div style={containerStyles}>
      {/* Connection Status */}
      {!isConnected && (
        <div style={{
          padding: `${SPACING_SCALE.SM}px`,
          backgroundColor: 'var(--color-semantic-warning-bg)',
          borderRadius: `${SPACING_SCALE.XS}px`,
          marginBottom: `${SPACING_SCALE.SM}px`
        }}>
          <Text size="sm" color="warning">
            ⚠️ Προσπάθεια σύνδεσης με ESCO database...
          </Text>
        </div>
      )}

      {/* Search Input - LEGO Component */}
      <Input
        value={searchState.query}
        onChange={handleSearchChange}
        placeholder={placeholder}
        disabled={!isConnected}
      />

      {/* Results */}
      {(searchState.results.length > 0 || searchState.isLoading || searchState.error) && (
        <div style={resultsContainerStyles}>
          {/* Loading */}
          {searchState.isLoading && (
            <div style={loadingStyles}>
              <Text size="sm" color="secondary" align="center" style={{ fontStyle: 'italic' }}>
                🔍 Αναζήτηση...
              </Text>
            </div>
          )}

          {/* Error */}
          {searchState.error && (
            <div style={loadingStyles}>
              <Text size="sm" color="error" align="center">
                ❌ {searchState.error}
              </Text>
            </div>
          )}

          {/* Results */}
          {!searchState.isLoading && !searchState.error && searchState.results.map((occupation) => (
            <div
              key={occupation.id}
              style={resultItemStyles}
              onClick={() => handleOccupationSelect(occupation)}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.backgroundColor = 'var(--color-bg-surface-hover)';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.backgroundColor = 'transparent';
              }}
              data-testid={`esco-result-${occupation.id}`}
            >
              <Stack spacing="xs">
                <Text weight="bold">
                  {occupation.preferredLabel}
                </Text>
                {occupation.description && (
                  <Text size="sm" color="secondary" style={{ lineHeight: '1.4' }}>
                    {occupation.description.slice(0, 100)}
                    {occupation.description.length > 100 ? '...' : ''}
                  </Text>
                )}
                {occupation.skillsCount > 0 && (
                  <Text size="xs" color="success">
                    💼 {occupation.skillsCount} skills
                  </Text>
                )}
              </Stack>
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