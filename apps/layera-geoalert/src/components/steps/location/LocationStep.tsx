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
import { Stack, Box, Flex } from '@layera/layout';
import { SPACING_SCALE, CSS_DESIGN_TOKENS } from '@layera/constants';
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
  const getInputStyles = (): void => {
    switch (opacityMode) {
      case 'transparent':
        return {
          backgroundColor: 'var(--color-bg-surface-overlay-light)',
          border: '1px solid var(--color-border-subtle)',
          color: 'var(--color-text-primary)',
          '::placeholder': { color: 'var(--color-text-placeholder)' }
        };
      case 'semi-transparent':
        return {
          backgroundColor: 'var(--color-bg-surface-overlay-medium)',
          border: '1px solid var(--color-border-default)',
          color: 'var(--color-text-primary)',
          '::placeholder': { color: 'var(--color-text-secondary)' }
        };
      case 'opaque':
        return {
          backgroundColor: 'var(--color-bg-surface-overlay-strong)',
          border: '1px solid var(--color-border-primary-overlay)',
          color: 'var(--color-text-primary)',
          '::placeholder': { color: 'var(--color-text-primary)' }
        };
    }
  };

  const inputStyles = getInputStyles();

  const getLabelColor = (): void => {
    switch (opacityMode) {
      case 'transparent':
        return 'var(--color-text-primary)';
      case 'semi-transparent':
        return 'var(--color-text-primary)';
      case 'opaque':
        return 'var(--color-text-inverse)';
    }
  };

  const getMessageColor = (): void => {
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
      className="layera-card-uniform"
      title={
        <Box width="100%">
          <Text size="xs" weight="medium" color={getLabelColor()}>
            Αναζήτηση διεύθυνσης
          </Text>
          <Input
            type="text"
            value={searchInput}
            onChange={onSearchInputChange}
            placeholder={t('location.address-example')}
            variant="default"
            size="medium"
            fullWidth
            startIcon={<SearchIcon size="sm" />}
          />
          {/* Loading/Error messages */}
          {isLoading && (
            <Text size="xs" align="center" color={getMessageColor()} marginTop="xs">
              Αναζήτηση...
            </Text>
          )}
          {error && (
            <Text
              size="xs"
              align="center"
              color={opacityMode === 'opaque' ? 'var(--color-semantic-error-text)' : 'var(--color-semantic-error-border)'}
              marginTop="xs"
            >
              {error}
            </Text>
          )}
        </Box>
      }
      icon={<SearchIcon size="sm" theme="neutral" />}
      onClick={(): void => {}} // Empty click handler
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
    },
    clear: () => {
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
        // setTimeout((): void => {
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
    // setTimeout((): void => {
    //   onNext?.();
    // }, 500);
  }, [onStepComplete, onLocationConfigured, onNext]);

  const handleDrawingTool = useCallback(() => {
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
    // setTimeout((): void => {
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
    <Box className={containerClass}>
      {!showLocationSearch ? (
        // Menu Cards - Enterprise LEGO Layout με CSS variables
        <>
          {/* Πρώτη σειρά */}
          <Flex gap="md" wrap="wrap">
            {/* Location Search Card */}
            <BaseCard
              variant="job"
              className="layera-card-uniform"
              title={t('location.search-title')}
              description={t('location.search-description')}
              icon={<SearchIcon size="sm" theme="neutral" />}
              onClick={handleLocationSearch}
              onInfoClick={() => handleInfoClick('search')}
              data-testid="location-search-card"
            />

            {shouldShowUpload ? (
              // Αν έχουμε 3 κάρτες: Upload στην πρώτη σειρά
              <BaseCard
                variant="job"
                className="layera-card-uniform"
                title={t('location.upload-floorplan')}
                description={t('location.upload-floorplan-description')}
                icon={<UploadIcon size="sm" theme="neutral" />}
                onClick={handleFileUpload}
                onInfoClick={() => handleInfoClick('upload')}
                data-testid="location-upload-card"
              />
            ) : (
              // Αν έχουμε 2 κάρτες: Drawing στην πρώτη σειρά
              <BaseCard
                variant="job"
                className="layera-card-uniform"
                title={t('location.drawing.title')}
                description={t('location.drawing.description')}
                icon={<MapIcon size="sm" theme="neutral" />}
                onClick={handleDrawingTool}
                onInfoClick={() => handleInfoClick('drawing')}
                data-testid="location-drawing-card"
              />
            )}
          </Flex>

          {/* Δεύτερη σειρά - μόνο αν έχουμε 3 κάρτες */}
          {shouldShowUpload && (
            <Flex gap="md" wrap="wrap">
              <BaseCard
                variant="job"
                className="layera-card-uniform"
                title={t('location.drawing.title')}
                description={t('location.drawing.description')}
                icon={<MapIcon size="sm" theme="neutral" />}
                onClick={handleDrawingTool}
                onInfoClick={() => handleInfoClick('drawing')}
                data-testid="location-drawing-card"
              />
            </Flex>
          )}

          {uploadedFile && (
            <BaseCard
              variant="success"
              className="layera-card-uniform"
              padding="sm"
              marginBottom="sm">
              <Stack spacing="xs" align="center">
                <Text size="sm" color="success" align="center">
                  <CheckIcon size="sm" theme="success" marginRight="sm" />
                  {uploadedFile.name} ({getFileType(uploadedFile).toUpperCase()})
                </Text>
                <Text size="xs" color="success" align="center">
                  Η κάτοψη εμφανίστηκε στον χάρτη
                </Text>
              </Stack>
            </BaseCard>
          )}
        </>
      ) : (
        // Enterprise Location Search Interface με BaseCard
        <>
          {/* Search Input σε BaseCard container */}
          <Box>
            <SearchInputCard
              searchInput={searchInput}
              onSearchInputChange={handleSearchInputChange}
              isLoading={isLoading}
              error={error}
            />
          </Box>

          {/* Search Results */}
          {results.length > 0 && (
            <Box
              maxHeight="calc(100vh - 400px)"
              overflow={CSS_DESIGN_TOKENS.positioning['overflow-auto']}
              marginBottom="sm"
            >
              {results.map((result: unknown) => (
                <BaseCard
                  key={result.id}
                  variant="job"
                  title={result.displayName}
                  description={result.address?.country ? `${result.address.country}` : ''}
                  icon={<LocationIcon size="sm" theme="neutral" />}
                  onClick={(): void => handleLocationSelected(result)}
                  marginBottom="sm"
                />
              ))}
            </Box>
          )}

          {/* Selected Location Display */}
          {selectedLocation && (
            <BaseCard
              variant="success"
              className="layera-card-uniform"
              padding="sm"
              marginBottom="sm">
              <Text size="sm" color="success">
                <LocationIcon size="sm" theme="success" marginRight="sm" />
                Επιλεγμένη τοποθεσία: Placeholder location
              </Text>
            </BaseCard>
          )}

          {/* Back Button */}
          <BaseCard
            variant="job"
            title={t('location.back.title')}
            description={t('location.back.description')}
            onClick={(): void => {
              setShowLocationSearch(false);
              actions.clear();
              setSearchInput('');
              setSelectedLocation(null);
            }}
            data-testid="location-back-card"
          />
        </>
      )}
    </Box>

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