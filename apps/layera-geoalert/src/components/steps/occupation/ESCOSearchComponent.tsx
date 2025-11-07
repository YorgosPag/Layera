/**
 * ESCOSearchComponent.tsx - Enterprise ESCO Search με Firebase Integration
 *
 * Real-time search στην ESCO database με enterprise features
 */

import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { useLayeraTranslation } from '@layera/tolgee';
import { Input } from '@layera/forms';
import { Text } from '@layera/typography';
import { Stack, Box } from '@layera/layout';
import { SPACING_SCALE, TABLE_COLUMN_WIDTHS, CSS_DESIGN_TOKENS } from '@layera/constants';
import { BOX_SHADOW_SCALE } from '@layera/box-shadows';
import { BaseCard } from '@layera/cards';
// Firebase imports
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
          error: t('esco.search.error')
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

    setSearchState(prev => ({
      ...prev,
      selectedOccupation: occupation,
      query: occupation.preferredLabel
    }));

    onOccupationSelected(occupation);
  }, [onOccupationSelected]);

  // Connection Status
  const isConnected = !!db;

  // All styles converted to LEGO components - no custom styles needed

  return (
    <Box
      position="relative"
      width="full"
      maxWidth={`${TABLE_COLUMN_WIDTHS.EXTRA_WIDE}px`}
      margin="0 auto">
      {/* Connection Status */}
      {!isConnected && (
        <BaseCard
          variant="warning"
          padding="sm"
          marginBottom="sm">
          <Text size="sm" color="warning">
            ⚠️ {t('esco.connection.connecting')}
          </Text>
        </BaseCard>
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
        <Box
          position="absolute"
          top="100%"
          left={0}
          right={0}
          backgroundColor="var(--color-bg-canvas)"
          border="1px solid var(--la-border-default)"
          borderRadius={`${SPACING_SCALE.SM}px`}
          maxHeight={`${TABLE_COLUMN_WIDTHS.WIDE}px`}
          overflowY={CSS_DESIGN_TOKENS.positioning['overflow-auto']}
          zIndex="var(--la-z-index-dropdown, 1000)"
          boxShadow={BOX_SHADOW_SCALE.cardDefault}>
          {/* Loading */}
          {searchState.isLoading && (
            <Box padding="sm">
              <Text size="sm" color="secondary" align="center" weight="light">
                🔍 {t('esco.search.searching')}
              </Text>
            </Box>
          )}

          {/* Error */}
          {searchState.error && (
            <Box padding="var(--la-space-3) var(--la-space-4)" textAlign="center"> {/* 🎯 SST: SM + MD padding (8px 16px) */}
              <Text size="sm" color="error" align="center">
                ❌ {searchState.error}
              </Text>
            </Box>
          )}

          {/* Results */}
          {!searchState.isLoading && !searchState.error && searchState.results.map((occupation: ESCOOccupation) => (
            <BaseCard
              key={occupation.id}
              variant="default"
              title={occupation.preferredLabel}
              description={occupation.description ?
                `${occupation.description.slice(0, 100)}${occupation.description.length > 100 ? '...' : ''}` :
                undefined
              }
              onClick={(): void => handleOccupationSelect(occupation)}
              marginBottom="xs"
              className="layera-card-uniform"
              data-testid={`esco-result-${occupation.id}`}
            >
              {occupation.skillsCount > 0 && (
                <Text size="xs" color="success">
                  💼 {t('esco.skills.count', { count: occupation.skillsCount })}
                </Text>
              )}
            </BaseCard>
          ))}

          {/* No Results */}
          {!searchState.isLoading && !searchState.error && searchState.query.length >= 3 && searchState.results.length === 0 && (
            <Box padding="var(--la-space-3) var(--la-space-4)" textAlign="center"> {/* 🎯 SST: SM + MD padding (8px 16px) */}
              🔍 {t('esco.search.noResults', { query: searchState.query })}
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};