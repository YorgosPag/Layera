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
            <span style={{
              marginLeft: `${SPACING_SCALE.SM}px`,
              fontSize: '0.75rem',
              color: '#6B7280'
            }}>
              ({loadingTimer}s)
            </span>
          )}
        </Button>
      );
    }

    // List layout - ΙΕΡΑΡΧΙΚΗ ΕΜΦΑΝΙΣΗ
    return (
      <div
        key={component.id}
        {...componentProps}
        className={`list-item ${componentProps.className}`}
        style={{
          ...componentProps.style,
          padding: `${SPACING_SCALE.SM + SPACING_SCALE.XS}px`,
          borderRadius: `${BORDER_RADIUS_SCALE.INPUT}px`,
          marginBottom: `${SPACING_SCALE.SM}px`,
          border: '1px solid #E5E7EB',
          transition: 'all 0.2s ease-in-out',
          backgroundColor: isClickable ? '#FFFFFF' : '#F9FAFB',
          textAlign: 'left', // Ευθυγράμμιση προς τα αριστερά
          ...(isClickable && {
            ':hover': {
              backgroundColor: '#F3F4F6',
              borderColor: '#D1D5DB',
              transform: 'translateY(-1px)',
              boxShadow: BOX_SHADOW_SCALE.cardHover
            }
          })
        }}
        onMouseEnter={(e) => {
          if (isClickable && !isLoading) {
            e.currentTarget.style.backgroundColor = '#F3F4F6';
            e.currentTarget.style.borderColor = '#D1D5DB';
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow = BOX_SHADOW_SCALE.cardHover;
          }
        }}
        onMouseLeave={(e) => {
          if (isClickable && !isLoading) {
            e.currentTarget.style.backgroundColor = '#FFFFFF';
            e.currentTarget.style.borderColor = '#E5E7EB';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = BOX_SHADOW_SCALE.none;
          }
        }}
      >
        <div className="list-item-content" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start', // Ευθυγράμμιση προς τα αριστερά
          gap: `${SPACING_SCALE.SM}px`,
          width: '100%'
        }}>
          {isLoading ? (
            <Spinner size="sm" variant="default" />
          ) : isClickable ? (
            <MapIcon className="list-icon" style={{
              width: '1rem',
              height: '1rem',
              color: '#3B82F6'
            }} />
          ) : (
            <LocationIcon className="list-icon" style={{
              width: '1rem',
              height: '1rem',
              color: '#6B7280'
            }} />
          )}
          <span className="list-label" style={{
            flex: 1,
            fontSize: '0.875rem',
            color: isClickable ? '#1F2937' : '#6B7280',
            fontWeight: isClickable ? '500' : '400',
            textAlign: 'left', // Ευθυγράμμιση κειμένου προς τα αριστερά
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {component.label}
          </span>
        </div>
        {isLoading && (
          <div className="loading-indicator" style={{
            marginTop: `${SPACING_SCALE.XS}px`,
            fontSize: '0.75rem',
            color: '#6B7280',
            display: 'flex',
            alignItems: 'center',
            gap: `${SPACING_SCALE.SM}px`
          }}>
            <span>Αναζήτηση περιγράμματος...</span>
            <span style={{
              fontWeight: '500',
              color: '#3B82F6',
              minWidth: '2rem'
            }}>
              {loadingTimer}s
            </span>
          </div>
        )}
      </div>
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
        <div className="error-message">
          {error}
        </div>
      )}

      {boundaryError && (
        <div className="boundary-error">
          {boundaryError}
        </div>
      )}

      {/* Instruction text μία φορά στην κορυφή */}
      {!isLoading && visibleComponents.some(c => c.clickable) && finalConfig.enableBoundarySearch && (
        <div style={{
          fontSize: '0.875rem',
          color: '#6B7280',
          marginBottom: `${SPACING_SCALE.SM + SPACING_SCALE.XS}px`,
          fontStyle: 'italic'
        }}>
          {t('clickToShowBoundary')}
        </div>
      )}

      <div className={`address-components layout-${finalConfig.layout}`}>
        {isLoading ? (
          <div className="loading-state">
            Loading...
          </div>
        ) : (
          visibleComponents.map(renderComponent)
        )}
      </div>

      {components.length > visibleComponents.length && (
        <div className="components-overflow">
          +{components.length - visibleComponents.length} more components
        </div>
      )}
    </BaseCard>
  );
}