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
import { useLayeraTranslation } from '@layera/i18n';
import { BOX_SHADOW_SCALE } from '@layera/box-shadows';
import { SPACING_SCALE, BORDER_RADIUS_SCALE } from '@layera/constants';
// Fixed import - χρησιμοποιούμε το νέο working osmService από geo-mapping
import { fetchBoundaryByAddressComponent } from '../../../geo-mapping/src/services/osmService';

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
      interval = setInterval(() => {
        setLoadingTimer(prev => prev + 1);
      }, 1000);
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
    maxComponents: 10,
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

    console.log(`🔄 Starting boundary search for: ${component.label}, ID: ${component.id}`);
    setBoundaryLoading(component.id);
    setBoundaryError(null);

    try {
      // Κάνω fetch του boundary από το OSM API
      console.log(`🔍 Fetching boundary for: ${component.label}`);
      const boundaryData = await fetchBoundaryByAddressComponent({
        label: component.label,
        type: component.type
      });

      if (boundaryData && boundaryData.features && boundaryData.features.length > 0) {
        console.log(`✅ Found boundary with ${boundaryData.features.length} features`);

        // Dispatch event με τα actual boundary data
        const event = new CustomEvent('showAdministrativeBoundary', {
          detail: {
            type: 'showBoundary',
            component,
            geocodeResult,
            boundary: boundaryData
          } as BoundaryVisualizationEvent & { boundary: any }
        });
        window.dispatchEvent(event);

        console.log(`🎯 Boundary search completed for: ${component.label}`);
      } else {
        console.warn(`⚠️ No boundary data found for: ${component.label}`);
        setBoundaryError(`Δεν βρέθηκαν όρια για ${component.label}`);
      }
    } catch (error) {
      setBoundaryError(`Failed to search boundary for ${component.label}`);
      console.error('Boundary search error:', error);
    } finally {
      console.log(`🏁 Boundary search completed for: ${component.label}, clearing loading state`);
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
      className: `address-component ${component.className || ''} ${isClickable ? 'clickable' : ''}`,
      onClick: isClickable ? () => handleComponentClick(component) : undefined,
      disabled: isLoading || !!boundaryLoading,
      style: {
        cursor: isClickable ? 'pointer' : 'default',
        opacity: isLoading ? 0.6 : 1
      }
    };

    if (finalConfig.layout === 'tags') {
      return (
        <Button
          key={component.id}
          {...componentProps}
          variant={isClickable ? 'outline' : 'ghost'}
          size="sm"
          startIcon={isClickable ? <MapIcon /> : <LocationIcon />}
          loading={isLoading}
        >
          {component.label}
          {isLoading && (
            <Text
              as="span"
              marginLeft={`${SPACING_SCALE.SM}px`}
              fontSize="var(--layera-font-size-xs)"
              color="var(--layera-text-secondary)"
            >
              ({loadingTimer}s)
            </Text>
          )}
        </Button>
      );
    }

    // List layout - ΙΕΡΑΡΧΙΚΗ ΕΜΦΑΝΙΣΗ
    return (
      <Box
        key={component.id}
        {...componentProps}
        className={`list-item ${componentProps.className}`}
        style={{
          ...componentProps.style,
          padding: `${SPACING_SCALE.SM + SPACING_SCALE.XS}px`,
          borderRadius: `${BORDER_RADIUS_SCALE.INPUT}px`,
          marginBottom: `${SPACING_SCALE.SM}px`,
          border: 'var(--layera-border-default-style, 1px solid var(--layera-border-default))',
          transition: 'var(--layera-transition-smooth, all 0.2s ease-in-out)',
          backgroundColor: isClickable ? 'var(--layera-bg-primary)' : 'var(--layera-bg-secondary)',
          textAlign: 'var(--layera-text-align-left, left)', // Ευθυγράμμιση προς τα αριστερά
          ...(isClickable && {
            ':hover': {
              backgroundColor: 'var(--layera-bg-secondary)',
              borderColor: 'var(--layera-border-hover)',
              transform: 'translateY(-1px)',
              boxShadow: BOX_SHADOW_SCALE.cardHover
            }
          })
        }}
        onMouseEnter={(e) => {
          if (isClickable && !isLoading) {
            e.currentTarget.style.backgroundColor = 'var(--layera-bg-hover)';
            e.currentTarget.style.borderColor = 'var(--layera-border-hover)';
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow = BOX_SHADOW_SCALE.cardHover;
          }
        }}
        onMouseLeave={(e) => {
          if (isClickable && !isLoading) {
            e.currentTarget.style.backgroundColor = 'var(--layera-bg-primary)';
            e.currentTarget.style.borderColor = 'var(--layera-border-default)';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = BOX_SHADOW_SCALE.none;
          }
        }}
      >
        <Box className="list-item-content" style={{
          display: 'var(--layera-display-flex, flex)',
          alignItems: 'var(--layera-align-center, center)',
          justifyContent: 'var(--layera-justify-start, flex-start)', // Ευθυγράμμιση προς τα αριστερά
          gap: `${SPACING_SCALE.SM}px`,
          width: 'var(--layera-width-full, 100%)'
        }}>
          {isLoading ? (
            <Spinner size="sm" variant="default" />
          ) : isClickable ? (
            <MapIcon className="list-icon" style={{
              width: 'var(--layera-icon-size-md)',
              height: 'var(--layera-icon-size-md)',
              color: 'var(--layera-color-primary)'
            }} />
          ) : (
            <LocationIcon className="list-icon" style={{
              width: 'var(--layera-icon-size-md)',
              height: 'var(--layera-icon-size-md)',
              color: 'var(--layera-text-secondary)'
            }} />
          )}
          <span className="list-label" style={{
            flex: 'var(--layera-flex-1, 1)',
            fontSize: 'var(--layera-font-size-sm)',
            color: isClickable ? 'var(--layera-text-primary)' : 'var(--layera-text-secondary)',
            fontWeight: isClickable ? 'var(--layera-font-weight-medium, 500)' : 'var(--layera-font-weight-normal, 400)',
            textAlign: 'var(--layera-text-align-left, left)', // Ευθυγράμμιση κειμένου προς τα αριστερά
            whiteSpace: 'var(--layera-white-space-nowrap, nowrap)',
            overflow: 'var(--layera-overflow-hidden, hidden)',
            textOverflow: 'var(--layera-text-overflow-ellipsis, ellipsis)'
          }}>
            {component.label}
          </span>
        </Box>
        {isLoading && (
          <Box className="loading-indicator" style={{
            marginTop: `${SPACING_SCALE.XS}px`,
            fontSize: 'var(--layera-font-size-xs)',
            color: 'var(--layera-text-secondary)',
            display: 'var(--layera-display-flex, flex)',
            alignItems: 'var(--layera-align-center, center)',
            gap: `${SPACING_SCALE.SM}px`
          }}>
            <span>Αναζήτηση περιγράμματος...</span>
            <Text
              as="span"
              fontWeight="var(--layera-font-weight-medium, 500)"
              color="var(--layera-color-primary)"
              minWidth="var(--layera-width-min-2rem, 2rem)"
            }}>
              {loadingTimer}s
            </span>
          </Box>
        )}
      </Box>
    );
  };

  // Card actions
  const cardActions = (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => {
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
      onClick={onClick}
      style={style}
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
        <Box style={{
          fontSize: 'var(--layera-font-size-sm)',
          color: 'var(--layera-text-secondary)',
          marginBottom: `${SPACING_SCALE.SM + SPACING_SCALE.XS}px`,
          fontStyle: 'var(--layera-font-style-italic, italic)'
        }}>
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