/**
 * LayoutStepCard.tsx - Compact Layout Step για iPhone 14 Pro Max Cards
 *
 * Compact έκδοση του LayoutStep από το control panel.
 * Περιέχει GPS, search, rotation, scale controls σε μία κάρτα.
 */

import React, { useState } from 'react';
import { Text } from '@layera/typography';
import { Stack, Flex } from '@layera/layout';
import { Button } from '@layera/buttons';
import { LocationIcon, RotateIcon, RulerIcon } from '@layera/icons';

export interface LayoutStepCardProps {
  onLocationFound?: (lat: number, lon: number) => void;
  onLocationSearch?: (query: string) => void;
  onRotationChange?: (rotation: number) => void;
  onScaleChange?: (scale: { width: number; height: number; depth: number }) => void;
}

/**
 * Compact Layout Step Card που τρέχει όλα τα controls του control panel
 * σε μία μικρή κάρτα για το iPhone 14 Pro Max CategoryStep
 */
export const LayoutStepCard: React.FC<LayoutStepCardProps> = ({
  onLocationFound,
  onLocationSearch,
  onRotationChange,
  onScaleChange
}) => {
  const [rotation, setRotation] = useState<number>(0);
  const [scaleWidth, setScaleWidth] = useState<number>(1);
  const [scaleHeight, setScaleHeight] = useState<number>(1);
  const [scaleDepth, setScaleDepth] = useState<number>(1);
  const [locationQuery, setLocationQuery] = useState<string>('');

  const handleFindMyLocation = () => {
    console.log('🔍 LayoutStepCard: Find location clicked');

    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log('📍 LayoutStepCard: Location found:', { latitude, longitude });

          // Στείλε event στον χάρτη για κεντράρισμα
          const mapEvent = new CustomEvent('centerMapToLocation', {
            detail: { latitude, longitude, zoom: 16 }
          });
          window.dispatchEvent(mapEvent);

          // Στείλε event για μετακίνηση floor plan
          const floorPlanEvent = new CustomEvent('moveFloorPlanToLocation', {
            detail: {
              latitude,
              longitude,
              reason: 'user_location'
            }
          });
          window.dispatchEvent(floorPlanEvent);

          setLocationQuery(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);

          if (onLocationFound) {
            onLocationFound(latitude, longitude);
          }
        },
        (error) => {
          console.error('❌ LayoutStepCard: Geolocation error:', error);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 300000
        }
      );
    }
  };

  const handleRotationChange = (newRotation: number) => {
    setRotation(newRotation);
    console.log('🔄 LayoutStepCard: Rotation changed to:', newRotation);

    // Στείλε event στον χάρτη για περιστροφή κάτοψης
    const rotateEvent = new CustomEvent('rotateFloorPlan', {
      detail: { rotation: newRotation }
    });
    window.dispatchEvent(rotateEvent);

    if (onRotationChange) {
      onRotationChange(newRotation);
    }
  };

  const handleScaleChange = (field: 'width' | 'height' | 'depth', value: number) => {
    let newScale = { width: scaleWidth, height: scaleHeight, depth: scaleDepth };

    if (field === 'width') {
      setScaleWidth(value);
      newScale.width = value;
    } else if (field === 'height') {
      setScaleHeight(value);
      newScale.height = value;
    } else if (field === 'depth') {
      setScaleDepth(value);
      newScale.depth = value;
    }

    console.log('📏 LayoutStepCard: Scale changed:', newScale);

    // Στείλε event στον χάρτη για αλλαγή κλίμακας
    const scaleEvent = new CustomEvent('scaleFloorPlan', {
      detail: newScale
    });
    window.dispatchEvent(scaleEvent);

    if (onScaleChange) {
      onScaleChange(newScale);
    }
  };

  return (
    <Stack spacing="sm" style={{ width: '100%', padding: '12px' }}>
      {/* Location Section */}
      <div style={{
        backgroundColor: '#f8fafc',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        padding: '8px'
      }}>
        <Text size="sm" weight="bold" style={{ marginBottom: '6px' }}>
          📍 Τοποθεσία
        </Text>

        <Button
          variant="primary"
          size="sm"
          onClick={handleFindMyLocation}
          style={{
            width: '100%',
            backgroundColor: '#3b82f6',
            fontSize: '12px',
            padding: '6px',
            marginBottom: '6px'
          }}
        >
          <LocationIcon size="xs" theme="neutral" style={{ marginRight: '4px' }} />
          Βρες τη θέση μου
        </Button>

        <input
          type="text"
          value={locationQuery}
          onChange={(e) => setLocationQuery(e.target.value)}
          placeholder="Αναζήτηση διεύθυνσης..."
          style={{
            width: '100%',
            padding: '6px 8px',
            fontSize: '12px',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            backgroundColor: 'white'
          }}
          onKeyPress={(e) => {
            if (e.key === 'Enter' && locationQuery.trim()) {
              console.log('🔍 LayoutStepCard: Search for:', locationQuery);
              if (onLocationSearch) {
                onLocationSearch(locationQuery);
              }
            }
          }}
        />
      </div>

      {/* Rotation Section */}
      <div style={{
        backgroundColor: '#f8fafc',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        padding: '8px'
      }}>
        <Text size="sm" weight="bold" style={{ marginBottom: '6px' }}>
          🔄 Περιστροφή
        </Text>

        <Flex gap="xs" align="center" justify="center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleRotationChange(rotation - 90)}
            style={{
              fontSize: '10px',
              padding: '4px 8px',
              backgroundColor: '#e5e7eb',
              border: '1px solid #9ca3af'
            }}
          >
            -90°
          </Button>

          <Text size="sm" style={{ minWidth: '40px', textAlign: 'center' }}>
            {rotation}°
          </Text>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handleRotationChange(rotation + 90)}
            style={{
              fontSize: '10px',
              padding: '4px 8px',
              backgroundColor: '#e5e7eb',
              border: '1px solid #9ca3af'
            }}
          >
            +90°
          </Button>
        </Flex>
      </div>

      {/* Scale Section */}
      <div style={{
        backgroundColor: '#f8fafc',
        border: '1px solid #e2e8f0',
        borderRadius: '8px',
        padding: '8px'
      }}>
        <Text size="sm" weight="bold" style={{ marginBottom: '6px' }}>
          📏 Κλίμακα
        </Text>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '4px'
        }}>
          {/* Width */}
          <div>
            <Text size="xs" weight="bold" style={{ marginBottom: '2px' }}>
              cm→m
            </Text>
            <input
              type="number"
              value={scaleWidth}
              onChange={(e) => handleScaleChange('width', parseFloat(e.target.value) || 1)}
              style={{
                width: '100%',
                padding: '3px 4px',
                fontSize: '10px',
                border: '1px solid #d1d5db',
                borderRadius: '3px',
                backgroundColor: 'white'
              }}
            />
          </div>

          {/* Height */}
          <div>
            <Text size="xs" weight="bold" style={{ marginBottom: '2px' }}>
              mm→m
            </Text>
            <input
              type="number"
              value={scaleHeight}
              onChange={(e) => handleScaleChange('height', parseFloat(e.target.value) || 1)}
              style={{
                width: '100%',
                padding: '3px 4px',
                fontSize: '10px',
                border: '1px solid #d1d5db',
                borderRadius: '3px',
                backgroundColor: 'white'
              }}
            />
          </div>

          {/* Depth */}
          <div>
            <Text size="xs" weight="bold" style={{ marginBottom: '2px' }}>
              m→m
            </Text>
            <input
              type="number"
              value={scaleDepth}
              onChange={(e) => handleScaleChange('depth', parseFloat(e.target.value) || 1)}
              style={{
                width: '100%',
                padding: '3px 4px',
                fontSize: '10px',
                border: '1px solid #d1d5db',
                borderRadius: '3px',
                backgroundColor: 'white'
              }}
            />
          </div>
        </div>
      </div>

      {/* Status */}
      <div style={{
        backgroundColor: '#dcfce7',
        border: '1px solid #16a34a',
        borderRadius: '6px',
        padding: '6px',
        textAlign: 'center'
      }}>
        <Text size="xs" color="success" weight="bold">
          ✅ Κάτοψη έτοιμη για τοποθέτηση
        </Text>
      </div>
    </Stack>
  );
};