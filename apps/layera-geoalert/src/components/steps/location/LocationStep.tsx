/**
 * LocationStep.tsx - Enterprise Modular Location Step
 *
 * 🏗️ ENTERPRISE LEGO INTEGRATION:
 * Χρησιμοποιεί @layera/geocoding για location search και @layera/address-breakdown
 * για interactive address display με boundary visualization
 *
 * Business Logic από unified pipeline:
 * - Property + Offer + Now = File Upload + Location Search
 * - Όλα τα άλλα = Location Search + Drawing Tool
 */

import React, { useCallback, useState, useEffect } from 'react';
import { useLayeraTranslation } from '@layera/tolgee';
import { Text } from '@layera/typography';
import { Stack } from '@layera/layout';
import { SPACING_SCALE } from '@layera/constants';
// import { useGeocode } from '@layera/geocoding';
import { Input } from '@layera/forms';
import { BaseCard } from '@layera/cards';
import { UploadIcon, MapIcon, CheckIcon, SearchIcon, LocationIcon } from '@layera/icons';
import { InfoPanel } from '@layera/info-panels';
import {
  GEOALERT_INFO_CONTENT,
  StaticContentProvider
} from '@layera/info-panels';
import { useGeoAlertLayout } from '@layera/layout';
import type { StepProps } from '../types';
import type { LocationMethodType, LocationDetails, LocationStepData } from './types';
// import type { GeocodeResult } from '@layera/geocoding';

// Smart SearchInputCard component που ανταποκρίνεται στο opacity toggle
const SearchInputCard: React.FC<{
  searchInput: string;
  onSearchInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading: boolean;
  error: string | null;
}> = ({ searchInput, onSearchInputChange, isLoading, error }) => {
  const [opacityMode, setOpacityMode] = React.useState<'transparent' | 'semi-transparent' | 'opaque'>('transparent');

  // Event listener για opacity toggle από το stepper
  React.useEffect(() => {
    const handleOpacityToggle = (event: CustomEvent) => {
      const { opacityMode: newOpacityMode } = event.detail;
      setOpacityMode(newOpacityMode);
    };

    window.addEventListener('toggleCardsOpacity', handleOpacityToggle as EventListener);

    return () => {
      window.removeEventListener('toggleCardsOpacity', handleOpacityToggle as EventListener);
    };
  }, []);

  // Dynamic styles ανάλογα με το opacity mode
  const getInputStyles = () => {
    switch (opacityMode) {
      case 'transparent':
        return {
          backgroundColor: 'var(--color-bg-surface-overlay-light)',
          border: '1px solid var(--color-border-subtle)',
          color: '#000000',
          '::placeholder': { color: 'var(--color-text-placeholder)' }
        };
      case 'semi-transparent':
        return {
          backgroundColor: 'var(--color-bg-surface-overlay-medium)',
          border: '1px solid var(--color-border-default)',
          color: '#000000',
          '::placeholder': { color: 'var(--color-text-secondary)' }
        };
      case 'opaque':
        return {
          backgroundColor: 'var(--color-bg-surface-overlay-strong)',
          border: '1px solid var(--color-border-primary-overlay)',
          color: '#000000',
          '::placeholder': { color: 'var(--color-text-primary)' }
        };
    }
  };

  const inputStyles = getInputStyles();

  const getLabelColor = () => {
    switch (opacityMode) {
      case 'transparent':
        return '#000000';
      case 'semi-transparent':
        return '#000000';
      case 'opaque':
        return '#ffffff';
    }
  };

  const getMessageColor = () => {
    switch (opacityMode) {
      case 'transparent':
        return 'var(--color-text-secondary)';
      case 'semi-transparent':
        return 'var(--color-text-primary)';
      case 'opaque':
        return 'var(--color-bg-surface-strong)';
    }
  };

  return (
    <BaseCard
      variant="job"
      title={
        <div style={{ width: '100%' }}>
          <Text size="xs" weight="medium" style={{ color: getLabelColor() }}>
            Αναζήτηση διεύθυνσης
          </Text>
          <Input
            type="text"
            value={searchInput}
            onChange={onSearchInputChange}
            placeholder="π.χ. Πλατεία Συντάγματος, Αθήνα"
            variant="default"
            size="medium"
            fullWidth
            startIcon={<SearchIcon size="sm" />}
          />
          {/* Loading/Error messages */}
          {isLoading && (
            <Text size="xs" align="center" style={{ color: getMessageColor(), marginTop: `${SPACING_SCALE.XS}px` }}>
              Αναζήτηση...
            </Text>
          )}
          {error && (
            <Text
              size="xs"
              align="center"
              style={{
                color: opacityMode === 'opaque' ? 'rgba(255, 100, 100, 0.9)' : '#dc2626',
                marginTop: `${SPACING_SCALE.XS}px`
              }}
            >
              {error}
            </Text>
          )}
        </div>
      }
      icon={<SearchIcon size="sm" theme="neutral" />}
      onClick={() => {}} // Empty click handler
      data-testid="location-search-input-card"
    />
  );
};

export interface LocationStepProps extends StepProps {
  /** Location configuration callback */
  onLocationConfigured?: (details: LocationDetails) => void;
}

/**
 * Enterprise Location Step - Καθαρό modular component με business logic
 */
export const LocationStep: React.FC<LocationStepProps> = ({
  context,
  onNext,
  onStepComplete,
  onLocationConfigured,
  isVisible = true,
  deviceProps = {}
}) => {
  const { t } = useLayeraTranslation();

  // Enterprise LEGO Layout System
  const { utils } = useGeoAlertLayout();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [showLocationSearch, setShowLocationSearch] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<unknown | null>(null);
  const [searchInput, setSearchInput] = useState<string>('');

  // Info Panel state
  const [showInfoPanel, setShowInfoPanel] = useState(false);
  const [currentInfoCard, setCurrentInfoCard] = useState<'search' | 'upload' | 'drawing' | null>(null);

  // Info content provider
  const infoContentProvider = React.useMemo(() =>
    new StaticContentProvider(GEOALERT_INFO_CONTENT),
    []
  );

  // Temporary: Disabled geocoding for now due to React multiple copies issue
  const results: unknown[] = [];
  const isLoading = false;
  const error = null;
  const actions = {
    setQuery: (query: string) => {
      console.log('Geocoding disabled temporarily:', query);
    },
    clear: () => {
      console.log('Geocoding cleared');
    }
  };

  // Business Logic: Property + Offer + Now = Upload, όλα τα άλλα = Drawing
  const shouldShowUpload = context?.selectedCategory === 'property' &&
                          context?.selectedIntent === 'offer' &&
                          context?.selectedAvailability === 'now';

  const getFileType = (file: File): 'image' | 'pdf' | 'cad' | 'unknown' => {
    const extension = file.name.toLowerCase().split('.').pop();
    const mimeType = file.type.toLowerCase();

    if (mimeType.startsWith('image/') || ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension || '')) {
      return 'image';
    }
    if (mimeType === 'application/pdf' || extension === 'pdf') {
      return 'pdf';
    }
    if (['dxf', 'dwg'].includes(extension || '') || mimeType.includes('acad') || mimeType.includes('autocad')) {
      return 'cad';
    }
    return 'unknown';
  };

  const sendFileToMap = (file: File) => {
    const fileType = getFileType(file);
    const fileUrl = URL.createObjectURL(file);

    // Αποστολή event στον χάρτη
    const mapEvent = new CustomEvent('showFloorPlan', {
      detail: {
        file: file,
        fileUrl: fileUrl,
        fileName: file.name,
        fileType: fileType,
        fileSize: file.size
      }
    });

    console.log(`📂 LOCATION UI: Sending floor plan to map: ${file.name}`);
    window.dispatchEvent(mapEvent);
  };

  const handleFileUpload = useCallback(() => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/jpeg,image/png,image/gif,image/webp,application/pdf,.dxf,.dwg,application/acad,application/x-autocad';
    fileInput.style.display = 'none';

    fileInput.onchange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];
      if (file) {
        setUploadedFile(file);
        sendFileToMap(file);

        console.log(`🎯 LOCATION UI: File uploaded: ${file.name}, Type: ${getFileType(file)}`);

        // Complete step
        const locationDetails: LocationDetails = {
          method: 'upload',
          uploadedFile: file,
          fileType: getFileType(file)
        };

        if (onStepComplete) {
          const stepData: LocationStepData = {
            locationDetails,
            isComplete: true
          };
          onStepComplete('location', stepData);
        }

        onLocationConfigured?.(locationDetails);

        // Auto-advance handled by StepOrchestrator
        // setTimeout(() => {
        //   onNext?.();
        // }, 500);
      }
    };

    document.body.appendChild(fileInput);
    fileInput.click();
    document.body.removeChild(fileInput);
  }, [onStepComplete, onLocationConfigured, onNext]);

  const handleLocationSearch = useCallback(() => {
    setShowLocationSearch(true);
  }, []);

  const handleSearchInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchInput(value);
    actions.setQuery(value);
  }, [actions]);

  const handleLocationSelected = useCallback((result: unknown) => {
    console.log(`🎯 ENTERPRISE LOCATION: Location selected (temporarily disabled):`, result);

    const locationDetails: LocationDetails = {
      method: 'search',
      searchResult: result,
      coordinates: {
        latitude: 0,
        longitude: 0
      },
      address: 'Temporary placeholder address'
    };

    if (onStepComplete) {
      const stepData: LocationStepData = {
        locationDetails,
        isComplete: true
      };
      onStepComplete('location', stepData);
    }

    onLocationConfigured?.(locationDetails);

    // Auto-advance handled by StepOrchestrator
    // setTimeout(() => {
    //   onNext?.();
    // }, 500);
  }, [onStepComplete, onLocationConfigured, onNext]);

  const handleDrawingTool = useCallback(() => {
    console.log(`🎯 LOCATION UI: Opening drawing tool`);

    const locationDetails: LocationDetails = {
      method: 'drawing'
    };

    if (onStepComplete) {
      const stepData: LocationStepData = {
        locationDetails,
        isComplete: true
      };
      onStepComplete('location', stepData);
    }

    onLocationConfigured?.(locationDetails);

    // Auto-advance handled by StepOrchestrator, no need for manual onNext
    // setTimeout(() => {
    //   onNext?.();
    // }, 300);
  }, [onStepComplete, onLocationConfigured, onNext]);

  // Handle info button clicks
  const handleInfoClick = useCallback((cardId: 'search' | 'upload' | 'drawing') => {
    setCurrentInfoCard(cardId);
    setShowInfoPanel(true);

    if ('vibrate' in navigator) {
      navigator.vibrate(20);
    }
  }, []);

  // Get info content για specific card
  const getInfoContent = useCallback((cardId: 'search' | 'upload' | 'drawing') => {
    try {
      // Map location-specific cards to content keys
      const contentKey = cardId === 'search' ? 'location-search' :
                        cardId === 'upload' ? 'location-upload' :
                        'location-drawing';

      return infoContentProvider.getContent(contentKey);
    } catch (error) {
      console.warn(`Info content not found for card: ${cardId}`);
      return {
        title: 'Πληροφορίες',
        content: 'Δεν υπάρχουν διαθέσιμες πληροφορίες για αυτή την επιλογή.',
        type: 'info' as const
      };
    }
  }, [infoContentProvider]);

  if (!isVisible) {
    return null;
  }

  // Υπολογίζω πόσες κάρτες θα εμφανιστούν
  const cardCount = shouldShowUpload ? 3 : 2;

  // Enterprise LEGO Layout - Smart arrangement for 3 cards (2+1)
  const containerStyles = utils.getCardStyles('smart-triple');
  const containerClass = utils.getCardContainerClass('smart-triple');


  return (
    <>
    <div style={containerStyles} className={containerClass}>
      {!showLocationSearch ? (
        // Menu Cards - Enterprise LEGO Layout με CSS variables
        <>
          {/* Πρώτη σειρά */}
          <div className="layera-card-row">
            {/* Location Search Card */}
            <BaseCard
              variant="job"
              title="Αναζήτηση Τοποθεσίας"
              description="Βρείτε διεύθυνση ή περιοχή"
              icon={<SearchIcon size="sm" theme="neutral" />}
              onClick={handleLocationSearch}
              onInfoClick={() => handleInfoClick('search')}
              data-testid="location-search-card"
            />

            {shouldShowUpload ? (
              // Αν έχουμε 3 κάρτες: Upload στην πρώτη σειρά
              <BaseCard
                variant="job"
                title="Ανέβασμα Κάτοψης"
                description="Επιλέξτε αρχείο κάτοψης"
                icon={<UploadIcon size="sm" theme="neutral" />}
                onClick={handleFileUpload}
                onInfoClick={() => handleInfoClick('upload')}
                data-testid="location-upload-card"
              />
            ) : (
              // Αν έχουμε 2 κάρτες: Drawing στην πρώτη σειρά
              <BaseCard
                variant="job"
                title="Εργαλείο Σχεδίασης"
                description="Σχεδιάστε περιοχή στον χάρτη"
                icon={<MapIcon size="sm" theme="neutral" />}
                onClick={handleDrawingTool}
                onInfoClick={() => handleInfoClick('drawing')}
                data-testid="location-drawing-card"
              />
            )}
          </div>

          {/* Δεύτερη σειρά - μόνο αν έχουμε 3 κάρτες */}
          {shouldShowUpload && (
            <div className="layera-card-row">
              <BaseCard
                variant="job"
                title="Εργαλείο Σχεδίασης"
                description="Σχεδιάστε περιοχή στον χάρτη"
                icon={<MapIcon size="sm" theme="neutral" />}
                onClick={handleDrawingTool}
                onInfoClick={() => handleInfoClick('drawing')}
                data-testid="location-drawing-card"
              />
            </div>
          )}

          {uploadedFile && (
            <div style={{
              padding: `${SPACING_SCALE.SM + SPACING_SCALE.XS}px`,
              background: 'rgba(0, 255, 0, 0.1)',
              borderRadius: `${SPACING_SCALE.SM}px`
            }}>
              <Stack spacing="xs" align="center">
                <Text size="sm" color="success" align="center">
                  <CheckIcon size="sm" theme="success" style={{ marginRight: `${SPACING_SCALE.SM}px` }} />
                  {uploadedFile.name} ({getFileType(uploadedFile).toUpperCase()})
                </Text>
                <Text size="xs" color="success" align="center">
                  Η κάτοψη εμφανίστηκε στον χάρτη
                </Text>
              </Stack>
            </div>
          )}
        </>
      ) : (
        // Enterprise Location Search Interface με BaseCard
        <>
          {/* Search Input σε BaseCard container */}
          <div style={{
            marginBottom: `${SPACING_SCALE.SM}px`
          }}>
            <SearchInputCard
              searchInput={searchInput}
              onSearchInputChange={handleSearchInputChange}
              isLoading={isLoading}
              error={error}
            />
          </div>

          {/* Search Results */}
          {results.length > 0 && (
            <div style={{
              maxHeight: 'calc(100vh - 400px)',
              overflowY: 'auto',
              marginBottom: `${SPACING_SCALE.SM}px`
            }}>
              {results.map((result) => (
                <BaseCard
                  key={result.id}
                  variant="job"
                  title={result.displayName}
                  description={result.address?.country ? `${result.address.country}` : ''}
                  icon={<LocationIcon size="sm" theme="neutral" />}
                  onClick={() => handleLocationSelected(result)}
                  style={{ marginBottom: `${SPACING_SCALE.SM}px` }}
                />
              ))}
            </div>
          )}

          {/* Selected Location Display */}
          {selectedLocation && (
            <div style={{
              padding: `${SPACING_SCALE.SM + SPACING_SCALE.XS}px`,
              background: 'rgba(0, 200, 0, 0.1)',
              borderRadius: `${SPACING_SCALE.SM}px`,
              marginBottom: `${SPACING_SCALE.SM}px`
            }}>
              <Text size="sm" color="success">
                <LocationIcon size="sm" theme="success" style={{ marginRight: `${SPACING_SCALE.SM}px` }} />
                Επιλεγμένη τοποθεσία: Placeholder location
              </Text>
            </div>
          )}

          {/* Back Button */}
          <BaseCard
            variant="job"
            title="Πίσω"
            description="Επιστροφή στο μενού"
            onClick={() => {
              setShowLocationSearch(false);
              actions.clear();
              setSearchInput('');
              setSelectedLocation(null);
            }}
            data-testid="location-back-card"
          />
        </>
      )}
    </div>

    {/* Info Panel */}
    {showInfoPanel && currentInfoCard && (
      <InfoPanel
        isOpen={showInfoPanel}
        onClose={() => {
          setShowInfoPanel(false);
          setCurrentInfoCard(null);
        }}
        title={getInfoContent(currentInfoCard).title}
        content={getInfoContent(currentInfoCard).content}
        variant={getInfoContent(currentInfoCard).type}
        getInfoContent={getInfoContent}
        selectedCategory={context?.selectedCategory || 'property'}
      />
    )}
  </>
  );
};