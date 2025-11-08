/**
 * AddressBreakdownCard - Interactive address display με clickable boundary search
 *
 * Χρησιμοποιεί LEGO systems:
 * - @layera/cards για BaseCard
 * - @layera/buttons για clickable components
 * - @layera/icons για location/boundary icons
 * - @layera/tolgee για internationalization
 * - @layera/geo-drawing για boundary visualization
 */

import { useState, useCallback, useEffect } from 'react';
import { BaseCard } from '@layera/cards';
import { Button } from '@layera/buttons';
import { Box } from '@layera/layout';
import { Text } from '@layera/typography';
import { LocationIcon, MapIcon } from '@layera/icons';
import { Spinner } from '@layera/loading';
import { useLayeraTranslation } from '@layera/tolgee';
import { BOX_SHADOW_SCALE } from '@layera/box-shadows';
import { SPACING_SCALE, BORDER_RADIUS_SCALE, UI_TIMING } from '@layera/constants';
// Fixed import - χρησιμοποιούμε το νέο working osmService από geo-mapping
import { fetchBoundaryByAddressComponent } from '../../../geo-mapping/src/services/osmService';
import './AddressBreakdownCard.css';

import type {
  AddressBreakdownCardProps,
  AddressComponent,
  BoundaryVisualizationEvent
} from '../types';
import { parseFullAddress } from '../utils/addressParser';

/**
 * AddressBreakdownCard Component
 *
 * Μετατρέπει το displayName από geocoding σε structured, clickable λίστα
 * Όταν κάνεις κλικ σε administrative area → δείχνει το boundary στο χάρτη
 */
export function AddressBreakdownCard({
  geocodeResult,
  config = {},
  title,
  onClick,
  style,
  isLoading = false,
  error = null
}: AddressBreakdownCardProps) {
  const { t } = useLayeraTranslation();
  const [boundaryLoading, setBoundaryLoading] = useState<string | null>(null);
  const [boundaryError, setBoundaryError] = useState<string | null>(null);
  const [loadingTimer, setLoadingTimer] = useState<number>(0);

  // Timer effect για loading countdown
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (boundaryLoading) {
      setLoadingTimer(0);
      interval = setInterval((): void => {
        setLoadingTimer(prev => prev + 1);
      }, UI_TIMING.DEBOUNCE_LONG);
    } else {
      setLoadingTimer(0);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [boundaryLoading]);

  // Default configuration
  const finalConfig = {
    layout: 'list' as const,
    enableBoundarySearch: true,
    maxComponents: 10, // Maximum number of address components to display - UI limitation constant
    ...config
  };

  // Parse το geocode result σε components
  const components = parseFullAddress(geocodeResult);
  const visibleComponents = finalConfig.maxComponents
    ? components.slice(0, finalConfig.maxComponents)
    : components;

  /**
   * Handle κλικ σε address component
   * Αν είναι clickable → fetch boundary και dispatch event για το χάρτη
   */
  const handleComponentClick = useCallback(async (component: AddressComponent) => {
    if (!component.clickable || !finalConfig.enableBoundarySearch) {
      return;
    }

    if (finalConfig.onComponentClick) {
      finalConfig.onComponentClick(component);
    }
    setBoundaryLoading(component.id);
    setBoundaryError(null);

    try {
      // Κάνω fetch του boundary από το OSM API
      const boundaryData = await fetchBoundaryByAddressComponent({
        label: component.label,
        type: component.type
      });

      if (boundaryData && boundaryData.features && boundaryData.features.length > 0) {
        // Dispatch event με τα actual boundary data
        const event = new CustomEvent('showAdministrativeBoundary', {
          detail: {
            type: 'showBoundary',
            component,
            geocodeResult,
            boundary: boundaryData
          } as BoundaryVisualizationEvent & { boundary: unknown }
        });
        window.dispatchEvent(event);
      } else {
        console.warn(`⚠️ No boundary data found for: ${component.label}`);
        setBoundaryError(`Δεν βρέθηκαν όρια για ${component.label}`);
      }
    } catch (error) {
      setBoundaryError(`Failed to search boundary for ${component.label}`);
      console.error('Boundary search error:', error);
    } finally {
      setBoundaryLoading(null);
    }
  }, [finalConfig, geocodeResult, t]);

  /**
   * Render component based on layout
   */
  const renderComponent = (component: AddressComponent) => {
    const isLoading = boundaryLoading === component.id;
    const isClickable = component.clickable && finalConfig.enableBoundarySearch;

    const componentProps = {
      onClick: isClickable ? () => handleComponentClick(component) : undefined,
      disabled: isLoading || !!boundaryLoading
    };

    if (finalConfig.layout === 'tags') {
      return (
        <Button
          key={component.id}
          {...componentProps}
          variant={isClickable ? 'outline' : 'secondary'}
        >
          {isClickable ? <MapIcon /> : <LocationIcon />}
          {component.label}
          {isLoading && (
            <Text
              as="span"
              marginLeft="var(--la-space-2)" /* 🎯 SST: SM spacing */
              fontSize="var(--la-font-size-xs)"
              color="var(--la-text-secondary)"
            >
              ({loadingTimer}s)
            </Text>
          )}
        </Button>
      );
    }

    // List layout - ΙΕΡΑΡΧΙΚΗ ΕΜΦΑΝΙΣΗ
    if (isClickable) {
      return (
        <Button
          key={component.id}
          variant="outline"
          {...componentProps}
          className={`address-breakdown-list-item ${isLoading ? 'loading' : ''}`}
        >
        <Box className="list-item-content">
          {isLoading ? (
            <Spinner size="sm" />
          ) : isClickable ? (
            <MapIcon />
          ) : (
            <LocationIcon />
          )}
          <span className={`list-label ${isClickable ? 'clickable' : 'not-clickable'}`}>
            {component.label}
          </span>
        </Box>
        {isLoading && (
          <Box className="loading-indicator">
            <span>Αναζήτηση περιγράμματος...</span>
            <Text
              as="span"
              fontWeight="var(--la-font-weight-medium, 500)"
              color="var(--la-color-primary)"
              minWidth="var(--la-width-min-2rem, 2rem)"
            >
              {loadingTimer}s
            </Text>
          </Box>
        )}
      </Button>
    );
    }

    // Non-clickable list item
    return (
      <Box key={component.id} className="address-breakdown-list-item non-clickable">
        <Box className="list-item-content">
          <LocationIcon />
          <span className="list-label not-clickable">
            {component.label}
          </span>
        </Box>
      </Box>
    );
  };

  // Card actions
  const cardActions = (
    <Button
      variant="secondary"
      onClick={(): void => {
        const event = new CustomEvent('showSearchResult', {
          detail: {
            latitude: geocodeResult.coordinates.latitude,
            longitude: geocodeResult.coordinates.longitude,
            zoom: 16,
            displayName: geocodeResult.displayName
          }
        });
        window.dispatchEvent(event);
      }}
    >
      {t('showOnMap')}
    </Button>
  );

  return (
    <BaseCard
      title={title || t('addressDetails')}
      actions={cardActions}
      className={`address-breakdown-card ${finalConfig.className || ''}`}
      onClick={onClick ? () => onClick({} as React.MouseEvent<HTMLDivElement>) : undefined}
      {...(style && { style })}
    >
      {error && (
        <Box className="error-message">
          {error}
        </Box>
      )}

      {boundaryError && (
        <Box className="boundary-error">
          {boundaryError}
        </Box>
      )}

      {/* Instruction text μία φορά στην κορυφή */}
      {!isLoading && visibleComponents.some(c => c.clickable) && finalConfig.enableBoundarySearch && (
        <Box className="la-instruction-text">
          {t('clickToShowBoundary')}
        </Box>
      )}

      <Box className={`address-components layout-${finalConfig.layout}`}>
        {isLoading ? (
          <Box className="loading-state">
            Loading...
          </Box>
        ) : (
          visibleComponents.map(renderComponent)
        )}
      </Box>

      {components.length > visibleComponents.length && (
        <Box className="components-overflow">
          +{components.length - visibleComponents.length} more components
        </Box>
      )}
    </BaseCard>
  );
}
