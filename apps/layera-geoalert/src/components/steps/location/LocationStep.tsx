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
import { useGeocode } from '@layera/geocoding';
import { AddressBreakdownCard } from '@layera/address-breakdown';
import { BaseCard } from '../../device-specific/mobile/iphone-14-pro-max/components/BaseCard';
import { UploadIcon, MapIcon, CheckIcon, SearchIcon, LocationIcon } from '@layera/icons';
import type { StepProps } from '../types';
import type { LocationMethodType, LocationDetails, LocationStepData } from './types';
import type { GeocodeResult } from '@layera/geocoding';

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
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [showLocationSearch, setShowLocationSearch] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<GeocodeResult | null>(null);
  const [searchInput, setSearchInput] = useState<string>('');

  // Enterprise LEGO Geocoding Hook
  const {
    query,
    results,
    isLoading,
    error,
    selectedResult,
    actions
  } = useGeocode({
    autoSearch: true,
    debounceMs: 300,
    onSelect: (result) => {
      console.log(`🎯 ENTERPRISE LOCATION: Selected location: ${result.displayName}`);
      setSelectedLocation(result);
    }
  });

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

        // Auto-advance
        setTimeout(() => {
          onNext?.();
        }, 500);
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

  const handleLocationSelected = useCallback((result: GeocodeResult) => {
    console.log(`🎯 ENTERPRISE LOCATION: Location selected: ${result.displayName}`);

    const locationDetails: LocationDetails = {
      method: 'search',
      searchResult: result,
      coordinates: {
        latitude: result.coordinates.latitude,
        longitude: result.coordinates.longitude
      },
      address: result.displayName
    };

    if (onStepComplete) {
      const stepData: LocationStepData = {
        locationDetails,
        isComplete: true
      };
      onStepComplete('location', stepData);
    }

    onLocationConfigured?.(locationDetails);

    // Auto-advance
    setTimeout(() => {
      onNext?.();
    }, 500);
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

    // Auto-advance
    setTimeout(() => {
      onNext?.();
    }, 300);
  }, [onStepComplete, onLocationConfigured, onNext]);

  if (!isVisible) {
    return null;
  }

  const containerStyles: React.CSSProperties = {
    position: 'fixed',
    top: '161px',
    left: '8px',
    right: '8px',
    zIndex: 10002,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    padding: '0'
  };

  return (
    <div style={containerStyles}>
      {!showLocationSearch ? (
        // Menu Cards
        <>
          {/* Location Search Card */}
          <BaseCard
            variant="primary"
            title={t('location.searchTitle', 'Αναζήτηση Τοποθεσίας')}
            description={t('location.searchDescription', 'Βρείτε διεύθυνση ή περιοχή')}
            icon={<SearchIcon size="sm" theme="neutral" />}
            onClick={handleLocationSearch}
            data-testid="location-search-card"
          />

          {shouldShowUpload && (
            // Property + Offer + Now = File Upload option
            <BaseCard
              variant="info"
              title={t('location.uploadTitle', 'Ανέβασμα Κάτοψης')}
              description={t('location.uploadDescription', 'Επιλέξτε αρχείο κάτοψης')}
              icon={<UploadIcon size="sm" theme="neutral" />}
              onClick={handleFileUpload}
              data-testid="location-upload-card"
            />
          )}

          {/* Drawing Tool Card */}
          <BaseCard
            variant="secondary"
            title={t('location.drawingTitle', 'Εργαλείο Σχεδίασης')}
            description={t('location.drawingDescription', 'Σχεδιάστε περιοχή στον χάρτη')}
            icon={<MapIcon size="sm" theme="neutral" />}
            onClick={handleDrawingTool}
            data-testid="location-drawing-card"
          />

          {uploadedFile && (
            <div style={{
              padding: '12px',
              background: 'rgba(0, 255, 0, 0.1)',
              borderRadius: '8px',
              fontSize: '14px',
              color: '#008000',
              textAlign: 'center'
            }}>
              <CheckIcon size="sm" theme="success" style={{ marginRight: '8px' }} />
              {uploadedFile.name} ({getFileType(uploadedFile).toUpperCase()})
              <br />
              <small style={{ fontSize: '12px' }}>
                {t('location.fileUploaded', 'Η κάτοψη εμφανίστηκε στον χάρτη')}
              </small>
            </div>
          )}
        </>
      ) : (
        // Enterprise Location Search Interface
        <>
          {/* Search Input */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '8px'
          }}>
            <div style={{ marginBottom: '12px' }}>
              <label style={{
                fontSize: '14px',
                fontWeight: '500',
                color: '#333',
                marginBottom: '6px',
                display: 'block'
              }}>
                {t('location.searchPlaceholder', 'Αναζήτηση διεύθυνσης...')}
              </label>
              <input
                type="text"
                value={searchInput}
                onChange={handleSearchInputChange}
                placeholder={t('location.searchExample', 'π.χ. Πλατεία Συντάγματος, Αθήνα')}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                  fontSize: '16px',
                  backgroundColor: '#fff'
                }}
              />
            </div>

            {/* Loading indicator */}
            {isLoading && (
              <div style={{
                padding: '8px',
                fontSize: '14px',
                color: '#666',
                textAlign: 'center'
              }}>
                {t('location.searching', 'Αναζήτηση...')}
              </div>
            )}

            {/* Error message */}
            {error && (
              <div style={{
                padding: '8px',
                fontSize: '14px',
                color: '#dc2626',
                textAlign: 'center'
              }}>
                {error}
              </div>
            )}
          </div>

          {/* Search Results */}
          {results.length > 0 && (
            <div style={{
              maxHeight: 'calc(100vh - 400px)',
              overflowY: 'auto',
              marginBottom: '8px'
            }}>
              {results.map((result) => (
                <AddressBreakdownCard
                  key={result.id}
                  geocodeResult={result}
                  title={result.displayName}
                  onClick={() => handleLocationSelected(result)}
                  config={{
                    layout: 'list',
                    enableBoundarySearch: true,
                    maxComponents: 5
                  }}
                  style={{ marginBottom: '8px' }}
                />
              ))}
            </div>
          )}

          {/* Selected Location Display */}
          {selectedLocation && (
            <div style={{
              padding: '12px',
              background: 'rgba(0, 200, 0, 0.1)',
              borderRadius: '8px',
              fontSize: '14px',
              color: '#008000',
              marginBottom: '8px'
            }}>
              <LocationIcon size="sm" theme="success" style={{ marginRight: '8px' }} />
              {t('location.selected', 'Επιλεγμένη τοποθεσία')}: {selectedLocation.displayName}
            </div>
          )}

          {/* Back Button */}
          <BaseCard
            variant="neutral"
            title={t('common.back', 'Πίσω')}
            description={t('location.backToMenu', 'Επιστροφή στο μενού')}
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
  );
};