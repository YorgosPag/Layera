/**
 * OccupationSearch - Enterprise occupation search component
 * Professional search interface με ESCO integration
 */

import React, { useState, useCallback } from 'react';
import { useLayeraTranslation } from '@layera/tolgee';
import { BaseCard } from '@layera/cards';
import { Button } from '@layera/buttons';
import { SearchIcon, BriefcaseIcon, CloseIcon } from '@layera/icons';
import { Text, Heading } from '@layera/typography';
import { Stack, Flex } from '@layera/layout';
import { Spinner } from '@layera/loading';
import { useOccupationSearch } from '../hooks/useOccupationSearch';
import { OccupationCard } from './OccupationCard';
import { SPACING_SCALE, BORDER_RADIUS_SCALE } from '@layera/constants';
import type { Occupation } from '../types/occupation';

export interface OccupationSearchProps {
  /** Search placeholder text */
  placeholder?: string;
  /** Maximum results to show */
  maxResults?: number;
  /** Auto-search as user types */
  autoSearch?: boolean;
  /** Search language */
  language?: string;
  /** Callback when occupation is selected */
  onOccupationSelect?: (occupation: Occupation) => void;
  /** Custom styling */
  style?: React.CSSProperties;
  /** Custom className */
  className?: string;
}

/**
 * Enterprise Occupation Search Component
 * Ενσωματώνει ESCO API search με professional UI
 */
export const OccupationSearch: React.FC<OccupationSearchProps> = ({
  placeholder,
  maxResults = 10,
  autoSearch = true,
  language = 'el',
  onOccupationSelect,
  style,
  className = ''
}) => {
  const { t } = useLayeraTranslation();
  const [searchInput, setSearchInput] = useState<string>('');

  // Enterprise ESCO search hook
  const {
    query,
    results,
    isLoading,
    error,
    selectedOccupation,
    actions,
    meta
  } = useOccupationSearch({
    autoSearch,
    debounceMs: 300,
    language,
    onOccupationSelect,
    defaultFilters: {
      limit: maxResults
    }
  });

  const handleSearchInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(value);
    actions.setQuery(value);
  }, [actions]);

  const handleManualSearch = useCallback(() => {
    if (searchInput.trim()) {
      actions.search(searchInput);
    }
  }, [searchInput, actions]);

  const handleOccupationSelect = useCallback((occupation: Occupation) => {
    actions.selectOccupation(occupation);
  }, [actions]);

  const handleClear = useCallback(() => {
    setSearchInput('');
    actions.clear();
  }, [actions]);

  const hasResults = results.length > 0;
  const hasQuery = searchInput.trim().length > 0;

  return (
    <div className={`layera-occupation-search ${className}`} style={style}>
      <Stack spacing="md">
        {/* Search Header */}
        <Flex align="center" gap="sm">
          <BriefcaseIcon size="lg" theme="primary" />
          <div>
            <Heading as="h3" size="lg" color="primary">
              {t('employment.search.title', 'Αναζήτηση Επαγγέλματος')}
            </Heading>
            <Text size="sm" color="secondary">
              {t('employment.search.subtitle', 'Βρείτε το κατάλληλο επάγγελμα από τη βάση ESCO')}
            </Text>
          </div>
        </Flex>

        {/* Search Input */}
        <div style={{
          background: 'var(--color-bg-surface-strong)',
          borderRadius: `${BORDER_RADIUS_SCALE.CARD}px`,
          padding: `${SPACING_SCALE.MD}px`
        }}>
          <Stack spacing="sm">
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                value={searchInput}
                onChange={handleSearchInputChange}
                placeholder={placeholder || t('employment.search.placeholder', 'π.χ. Προγραμματιστής, Δικηγόρος, Γιατρός...')}
                style={{
                  width: '100%',
                  padding: `${SPACING_SCALE.SM + SPACING_SCALE.XS}px ${SPACING_SCALE.XXL + SPACING_SCALE.SM}px ${SPACING_SCALE.SM + SPACING_SCALE.XS}px ${SPACING_SCALE.SM + SPACING_SCALE.XS}px`,
                  border: '1px solid #ddd',
                  borderRadius: `${BORDER_RADIUS_SCALE.INPUT}px`,
                  fontSize: '16px',
                  backgroundColor: '#fff'
                }}
              />

              {hasQuery && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClear}
                  style={{
                    position: 'absolute',
                    right: '8px',
                    top: '50%',
                    transform: 'translateY(-50%)'
                  }}
                >
                  <CloseIcon size="sm" />
                </Button>
              )}
            </div>

            {!autoSearch && (
              <Button
                variant="primary"
                onClick={handleManualSearch}
                disabled={!hasQuery || isLoading}
                style={{ width: '100%' }}
              >
                <SearchIcon size="sm" />
                {t('employment.search.button', 'Αναζήτηση')}
              </Button>
            )}
          </Stack>
        </div>

        {/* Loading State */}
        {isLoading && (
          <Flex align="center" justify="center" style={{ padding: `${SPACING_SCALE.LG}px` }}>
            <Spinner size="lg" variant="primary" />
            <Text style={{ marginLeft: `${SPACING_SCALE.SM + SPACING_SCALE.XS}px` }}>
              {t('employment.search.loading', 'Αναζήτηση επαγγελμάτων...')}
            </Text>
          </Flex>
        )}

        {/* Error State */}
        {error && (
          <BaseCard variant="error" size="sm" padding="sm">
            <Text color="error">
              {t('employment.search.error', 'Σφάλμα αναζήτησης')}: {error}
            </Text>
          </BaseCard>
        )}

        {/* Results Counter */}
        {hasResults && !isLoading && (
          <Text size="sm" color="secondary">
            {t('employment.search.resultsCount', 'Βρέθηκαν {{count}} επαγγέλματα', {
              count: meta.total
            })}
          </Text>
        )}

        {/* Search Results */}
        {hasResults && (
          <Stack spacing="xs">
            {results.map((occupation) => (
              <OccupationCard
                key={occupation.id}
                occupation={occupation}
                onClick={() => handleOccupationSelect(occupation)}
                isSelected={selectedOccupation?.id === occupation.id}
                variant="compact"
              />
            ))}
          </Stack>
        )}

        {/* Load More */}
        {meta.hasMore && (
          <Button
            variant="outline"
            onClick={meta.loadMore}
            disabled={isLoading}
            style={{ width: '100%' }}
          >
            {t('employment.search.loadMore', 'Φόρτωση περισσότερων')}
          </Button>
        )}

        {/* No Results */}
        {hasQuery && !isLoading && !hasResults && !error && (
          <BaseCard variant="info" size="sm" padding="md">
            <Flex align="center" gap="sm">
              <SearchIcon size="sm" theme="info" />
              <Text color="info">
                {t('employment.search.noResults', 'Δεν βρέθηκαν επαγγέλματα για "{{query}}"', {
                  query: searchInput
                })}
              </Text>
            </Flex>
          </BaseCard>
        )}

        {/* ESCO Attribution */}
        {hasResults && (
          <Text size="xs" color="tertiary" style={{ textAlign: 'center', fontStyle: 'italic' }}>
            {t('employment.search.attribution', 'Δεδομένα από ESCO - European Commission')}
          </Text>
        )}
      </Stack>
    </div>
  );
};