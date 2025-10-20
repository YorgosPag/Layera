import React, { useState, useEffect } from 'react';
import { Text, Heading } from '@layera/typography';
import { Stack, Flex } from '@layera/layout';
import { Button } from '@layera/buttons';
import { FormActions } from '@layera/forms';
import { Input } from '@layera/forms';
import { LocationIcon } from '@layera/icons';
import { useGeocode } from '../../../geocoding/src/index';
import { AddressBreakdownCard } from '../../../address-breakdown/src/index';
import { useLayeraTranslation } from '@layera/tolgee';

export interface LayoutState {
  layoutLocation: string | null;
  layoutRotation: number;
  layoutScaleWidth: number;
  layoutScaleHeight: number;
  layoutScaleDepth: number;
  activeScaleField: 'width' | 'height' | 'depth' | null;
}

export interface LayoutStepProps {
  onNext: () => void;
  onBack: () => void;
}

/**
 * LayoutStep - Enterprise LEGO Component
 * Purpose: Layout & Positioning tools - EXACT from original UnifiedPipeline.tsx
 * Property + Offer + Now ONLY - Complex positioning controls
 * Complexity: High (matching original)
 * Dependencies: ONLY @layera LEGO systems
 */
export const LayoutStep: React.FC<LayoutStepProps> = ({ onNext, onBack }) => {
  const { t } = useLayeraTranslation();
  const [layoutRotation, setLayoutRotation] = useState<number>(0);
  const [layoutScaleWidth, setLayoutScaleWidth] = useState<number>(1);
  const [layoutScaleHeight, setLayoutScaleHeight] = useState<number>(1);
  const [layoutScaleDepth, setLayoutScaleDepth] = useState<number>(1);
  const [activeScaleField, setActiveScaleField] = useState<'width' | 'height' | 'depth' | null>(null);

  // Geocoding hook για αναζήτηση τοποθεσίας
  const { query: layoutLocation, actions: geocodeActions, isLoading, results, selectedResult } = useGeocode({
    debounceMs: 500,
    autoSearch: false,
    onSelect: (result) => {
      console.log('🎯 LayoutStep: Location selected:', result.displayName);

      // Dispatch νέο event για search results που διαχωρίζει από user location
      const mapEvent = new CustomEvent('showSearchResult', {
        detail: {
          latitude: result.coordinates.latitude,
          longitude: result.coordinates.longitude,
          zoom: 16,
          displayName: result.displayName
        }
      });
      console.log('📡 LayoutStep: Dispatching showSearchResult event for search result');
      window.dispatchEvent(mapEvent);
    }
  });

  // Listen για αλλαγές γλώσσας και ξανάκανε αναζήτηση αν υπάρχουν αποτελέσματα
  useEffect(() => {
    const handleLanguageChange = () => {
      const currentLang = localStorage.getItem('i18nextLng');
      console.log('🌍 LayoutStep detected language change to:', currentLang);

      // Αν έχουμε αποτελέσματα, ξανάκανε την αναζήτηση
      if (layoutLocation && results.length > 0) {
        console.log('🔄 Re-searching location with new language:', currentLang);
        geocodeActions.search(layoutLocation);
      }
    };

    // Έλεγχος κάθε 1 δευτερόλεπτο για αλλαγή γλώσσας
    let lastLang = localStorage.getItem('i18nextLng');
    const interval = setInterval(() => {
      const storedLang = localStorage.getItem('i18nextLng');

      if (storedLang !== lastLang) {
        lastLang = storedLang;
        handleLanguageChange();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [layoutLocation, results.length, geocodeActions]);

  const handleFindMyLocation = () => {
    console.log('🔍 LayoutStep: Find location button clicked');

    if ('geolocation' in navigator) {
      console.log('🌍 LayoutStep: Geolocation is available, requesting position...');

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log('📍 LayoutStep: User location found:', { latitude, longitude });

          // Άμεση ενημέρωση του χάρτη με τη θέση του χρήστη
          // Προσπελαύνω το χάρτη να κεντραριστεί στη θέση του χρήστη
          const mapEvent = new CustomEvent('centerMapToLocation', {
            detail: { latitude, longitude, zoom: 16 }
          });
          console.log('📡 LayoutStep: Dispatching centerMapToLocation event with:', { latitude, longitude, zoom: 16 });
          window.dispatchEvent(mapEvent);

          // Ενημέρωση του input field με τις συντεταγμένες
          geocodeActions.setQuery(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
          console.log('✅ LayoutStep: Location field updated');
        },
        (error) => {
          console.error('❌ LayoutStep: Geolocation error:', error);
          // Σιωπηρή διαχείριση σφαλμάτων - χωρίς alerts
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 300000 // 5 λεπτά cache
        }
      );
    } else {
      console.error('❌ LayoutStep: Geolocation is not supported by this browser');
    }
  };

  const handleLayoutLocationSearch = async () => {
    if (!layoutLocation.trim()) {
      console.log('🔍 LayoutStep: Empty search query');
      return;
    }

    console.log('🔍 LayoutStep: Starting location search for:', layoutLocation);
    await geocodeActions.search(layoutLocation);
  };

  const handleScaleFieldEdit = (field: 'width' | 'height' | 'depth') => {
    setActiveScaleField(field);
  };

  const handleScaleFieldOk = (field: 'width' | 'height' | 'depth') => {
    setActiveScaleField(null);
  };

  return (
    <Stack spacing="lg">
      <Heading as="h3" size="lg" color="primary">
        {t('pipelines.steps.layout.title')}
      </Heading>

      {/* Βρες τη θέση μου button */}
      <Button
        variant="primary"
        onClick={handleFindMyLocation}
        style={{
          width: '100%',
          backgroundColor: '#60a5fa',
          border: 'none',
          color: 'white',
          borderRadius: '8px',
          padding: '12px',
          marginBottom: '2px',
          fontWeight: 'bold'
        }}
      >
        <LocationIcon size="sm" theme="neutral" style={{ marginRight: '4px' }} />
        {t('pipelines.steps.layout.findMyLocation')}
      </Button>

      {/* Διαχωριστικό "ή" */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        margin: '1px 0',
        gap: '2px'
      }}>
        <div style={{
          flex: 1,
          height: '1px',
          backgroundColor: '#dee2e6'
        }} />
        <Text size="sm" color="secondary">{t('pipelines.steps.layout.or')}</Text>
        <div style={{
          flex: 1,
          height: '1px',
          backgroundColor: '#dee2e6'
        }} />
      </div>

      {/* Αναζήτηση Τοποθεσίας */}
      <div style={{ marginBottom: '2px' }}>
        <Text size="base" weight="bold">
          {t('pipelines.steps.layout.searchLocation')}
        </Text>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', gap: '2px', position: 'relative' }}>
          <Input
            value={layoutLocation}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              geocodeActions.setQuery(e.target.value)
            }
            placeholder={t('pipelines.steps.layout.locationPlaceholder')}
            size="lg"
            variant="outline"
            className="layera-form-input"
            style={{
              borderRadius: '8px',
              padding: '12px 16px',
              fontSize: '16px',
              width: 'calc(100% - 50px)',
              border: '1px solid #dee2e6'
            }}
          />
          <Button
            variant="primary"
            size="lg"
            onClick={handleLayoutLocationSearch}
            disabled={isLoading || !layoutLocation.trim()}
            style={{
              backgroundColor: isLoading ? '#9ca3af' : '#60a5fa',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              padding: '12px 20px',
              fontWeight: 'bold',
              width: '60px',
              position: 'absolute',
              right: 0
            }}
          >
            {isLoading ? '...' : 'Go'}
          </Button>
        </div>

        {/* Αποτελέσματα αναζήτησης με νέο AddressBreakdownCard */}
        {results.length > 0 && (
          <div style={{ marginTop: '8px' }}>
            <Text size="sm" weight="bold" style={{ marginBottom: '8px' }}>
              {t('pipelines.steps.layout.results', { count: results.length })}
            </Text>
            {results.map((result) => (
              <div key={result.id} style={{ marginBottom: '8px' }}>
                <AddressBreakdownCard
                  geocodeResult={result}
                  config={{
                    layout: 'list',
                    enableBoundarySearch: true,
                    onComponentClick: (component) => {
                      console.log('🎯 Address component clicked:', component);
                    }
                  }}
                  title={(() => {
                    // Για διευθύνσεις με οδό
                    if (result.address.street) {
                      return `📍 ${result.address.street}${result.address.houseNumber ? ' ' + result.address.houseNumber : ''}`;
                    }

                    // Για πόλεις/χωριά/κωμοπόλεις
                    const location = result.address.city || result.address.town || result.address.village;
                    const state = result.address.state || result.address.region;
                    const country = result.address.country;

                    if (location && country) {
                      // Πλήρης τίτλος με πόλη και χώρα
                      return `📍 ${location}${state ? ', ' + state : ''}, ${country}`;
                    } else if (location) {
                      return `📍 ${location}`;
                    } else if (country) {
                      return `📍 ${country}`;
                    }

                    // Fallback αν δεν έχουμε τίποτα
                    return `📍 ${t('pipelines.steps.layout.locationPin')}`;
                  })()}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Εργαλεία Τοποθέτησης - Γαλάζιο πλαίσιο */}
      <div
        style={{
          backgroundColor: '#ffffff',
          border: '2px solid #60a5fa',
          borderRadius: '12px',
          padding: '20px',
          marginBottom: '16px'
        }}
      >
        <Text size="base" weight="bold" color="primary">
          {t('pipelines.steps.layout.placementTools.title')}
        </Text>

        <Text size="sm" color="secondary">
          {t('pipelines.steps.layout.placementTools.description')}
        </Text>

        {/* Περιστροφή */}
        <div style={{ marginBottom: '16px' }}>
          <Text size="sm" weight="bold">
            {t('pipelines.steps.layout.placementTools.rotation')}
          </Text>
          <Flex gap="md" align="center" justify="center">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLayoutRotation(-90)}
              style={{
                backgroundColor: '#d0d7de',
                border: '1px solid #8c959f',
                color: '#495057',
                borderRadius: '6px',
                padding: '8px 12px'
              }}
            >
              -90°
            </Button>
            <Text size="sm">
              {layoutRotation}°
            </Text>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLayoutRotation(90)}
              style={{
                backgroundColor: '#d0d7de',
                border: '1px solid #8c959f',
                color: '#495057',
                borderRadius: '6px',
                padding: '8px 12px'
              }}
            >
              +90°
            </Button>
          </Flex>
        </div>

        {/* Scale Controls - Τρία πεδία με OK buttons */}
        <div style={{
          backgroundColor: '#f8f9fa',
          border: '1px solid #dee2e6',
          borderRadius: '8px',
          padding: '8px',
          margin: '8px 0'
        }}>
          <Text size="sm" weight="bold">
            {t('pipelines.steps.layout.placementTools.scale')}
          </Text>
          <div style={{
            display: 'flex',
            gap: '4px',
            width: '100%',
            justifyContent: 'space-between'
          }}>
          {/* cm - m */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <Text size="sm" weight="bold">
              {t('pipelines.steps.layout.placementTools.units.cmToM')}
            </Text>
            <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
              <Input
                type="number"
                value={layoutScaleWidth}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setLayoutScaleWidth(parseFloat(e.target.value) || 1)
                }
                onFocus={() => handleScaleFieldEdit('width')}
                disabled={activeScaleField !== null && activeScaleField !== 'width'}
                size="sm"
                variant="outline"
                className="layera-form-input"
                style={{
                  borderRadius: '4px',
                  padding: '4px 6px',
                  backgroundColor: activeScaleField === 'width' ? '#ffffff' : '#f8f9fa',
                  border: '1px solid #dee2e6',
                  flex: 1,
                  fontSize: '10px',
                  minWidth: 0,
                  maxWidth: '50px'
                }}
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleScaleFieldOk('width')}
                disabled={activeScaleField !== 'width'}
                style={{
                  backgroundColor: activeScaleField === 'width' ? '#60a5fa' : '#e9ecef',
                  border: `1px solid ${activeScaleField === 'width' ? '#60a5fa' : '#ced4da'}`,
                  color: activeScaleField === 'width' ? 'white' : '#6c757d',
                  borderRadius: '4px',
                  padding: '6px',
                  fontSize: '10px',
                  minWidth: '24px',
                  maxWidth: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                OK
              </Button>
            </div>
          </div>

          {/* mm - m */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <Text size="sm" weight="bold">
              {t('pipelines.steps.layout.placementTools.units.mmToM')}
            </Text>
            <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
              <Input
                type="number"
                value={layoutScaleHeight}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setLayoutScaleHeight(parseFloat(e.target.value) || 1)
                }
                onFocus={() => handleScaleFieldEdit('height')}
                disabled={activeScaleField !== null && activeScaleField !== 'height'}
                size="sm"
                variant="outline"
                className="layera-form-input"
                style={{
                  borderRadius: '4px',
                  padding: '4px 6px',
                  backgroundColor: activeScaleField === 'height' ? '#ffffff' : '#f8f9fa',
                  border: '1px solid #dee2e6',
                  flex: 1,
                  fontSize: '10px',
                  minWidth: 0,
                  maxWidth: '50px'
                }}
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleScaleFieldOk('height')}
                disabled={activeScaleField !== 'height'}
                style={{
                  backgroundColor: activeScaleField === 'height' ? '#60a5fa' : '#e9ecef',
                  border: `1px solid ${activeScaleField === 'height' ? '#60a5fa' : '#ced4da'}`,
                  color: activeScaleField === 'height' ? 'white' : '#6c757d',
                  borderRadius: '4px',
                  padding: '6px',
                  fontSize: '10px',
                  minWidth: '24px',
                  maxWidth: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                OK
              </Button>
            </div>
          </div>

          {/* m - m */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <Text size="sm" weight="bold">
              {t('pipelines.steps.layout.placementTools.units.mToM')}
            </Text>
            <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
              <Input
                type="number"
                value={layoutScaleDepth}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setLayoutScaleDepth(parseFloat(e.target.value) || 1)
                }
                onFocus={() => handleScaleFieldEdit('depth')}
                disabled={activeScaleField !== null && activeScaleField !== 'depth'}
                size="sm"
                variant="outline"
                className="layera-form-input"
                style={{
                  borderRadius: '4px',
                  padding: '4px 6px',
                  backgroundColor: activeScaleField === 'depth' ? '#ffffff' : '#f8f9fa',
                  border: '1px solid #dee2e6',
                  flex: 1,
                  fontSize: '10px',
                  minWidth: 0,
                  maxWidth: '50px'
                }}
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleScaleFieldOk('depth')}
                disabled={activeScaleField !== 'depth'}
                style={{
                  backgroundColor: activeScaleField === 'depth' ? '#60a5fa' : '#e9ecef',
                  border: `1px solid ${activeScaleField === 'depth' ? '#60a5fa' : '#ced4da'}`,
                  color: activeScaleField === 'depth' ? 'white' : '#6c757d',
                  borderRadius: '4px',
                  padding: '6px',
                  fontSize: '10px',
                  minWidth: '24px',
                  maxWidth: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                OK
              </Button>
            </div>
          </div>
          </div>
        </div>
      </div>

      <FormActions>
        <Button
          variant="outline"
          onClick={onBack}
          className="layera-unified-button"
          style={{
            backgroundColor: '#f8f9fa',
            border: '1px solid #dee2e6',
            color: '#6c757d'
          }}
        >
          {t('pipelines.steps.layout.actions.back')}
        </Button>
        <Button
          variant="primary"
          onClick={onNext}
          className="layera-unified-button"
          style={{
            backgroundColor: '#10b981',
            color: 'white',
            border: 'none',
            fontWeight: 'bold'
          }}
        >
          {t('pipelines.steps.layout.actions.saveLocation')}
        </Button>
      </FormActions>
    </Stack>
  );
};