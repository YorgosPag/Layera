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
import { BaseCard } from './BaseCard';

export interface LayoutStepCardProps {
  onLocationFound?: (lat: number, lon: number) => void;
  onLocationSearch?: (query: string) => void;
  onRotationChange?: (rotation: number) => void;
  onScaleChange?: (scale: { width: number; height: number; depth: number }) => void;
  onComplete?: () => void;
}

/**
 * Compact Layout Step Card που τρέχει όλα τα controls του control panel
 * σε μία μικρή κάρτα για το iPhone 14 Pro Max CategoryStep
 */
export const LayoutStepCard: React.FC<LayoutStepCardProps> = ({
  onLocationFound,
  onLocationSearch,
  onRotationChange,
  onScaleChange,
  onComplete
}) => {
  const [rotation, setRotation] = useState<number>(0);
  const [scaleWidth, setScaleWidth] = useState<number>(1);
  const [scaleHeight, setScaleHeight] = useState<number>(1);
  const [scaleDepth, setScaleDepth] = useState<number>(1);
  const [locationQuery, setLocationQuery] = useState<string>('');

  // Opacity modes - τρεις καταστάσεις
  type OpacityMode = 'transparent' | 'semi-transparent' | 'opaque';
  const [opacityMode, setOpacityMode] = useState<OpacityMode>('transparent');

  const handleFindMyLocation = () => {
    console.log('🔍 LayoutStepCard: Find location clicked');

    if ('geolocation' in navigator) {
      // Προσθήκη loading state feedback
      setLocationQuery('Εντοπισμός θέσης...');

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          console.log('📍 LayoutStepCard: Location found:', { latitude, longitude });

          // 1. Στείλε event στον χάρτη για κεντράρισμα με υψηλό zoom
          const mapEvent = new CustomEvent('centerMapToLocation', {
            detail: {
              latitude,
              longitude,
              zoom: 18, // Υψηλότερο zoom για καλύτερη ορατότητα
              animate: true // Smooth animation
            }
          });
          window.dispatchEvent(mapEvent);

          // 2. Στείλε event για μετακίνηση floor plan
          const floorPlanEvent = new CustomEvent('moveFloorPlanToLocation', {
            detail: {
              latitude,
              longitude,
              reason: 'user_location',
              center: true // Εξασφάλισε ότι θα κεντραριστεί
            }
          });
          window.dispatchEvent(floorPlanEvent);

          // 3. Στείλε event για focus στον χάρτη (αν χρειάζεται)
          const focusEvent = new CustomEvent('focusMapOnLocation', {
            detail: { latitude, longitude }
          });
          window.dispatchEvent(focusEvent);

          // 4. Ενημέρωσε το input field με τις συντεταγμένες
          setLocationQuery(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);

          // 5. Haptic feedback για mobile
          if ('vibrate' in navigator) {
            navigator.vibrate(50);
          }

          // 6. Callback για parent component
          if (onLocationFound) {
            onLocationFound(latitude, longitude);
          }

          console.log('✅ LayoutStepCard: Location centered successfully');
        },
        (error) => {
          console.error('❌ LayoutStepCard: Geolocation error:', error);

          // User-friendly error messages
          let errorMessage = 'Αποτυχία εντοπισμού θέσης';
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Άδεια τοποθεσίας απορρίφθηκε';
              break;
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Θέση μη διαθέσιμη';
              break;
            case error.TIMEOUT:
              errorMessage = 'Λήξη χρόνου εντοπισμού';
              break;
          }

          setLocationQuery(errorMessage);

          // Reset το error message μετά από 3 δευτερόλεπτα
          setTimeout(() => {
            setLocationQuery('');
          }, 3000);
        },
        {
          enableHighAccuracy: true, // Υψηλή ακρίβεια
          timeout: 10000, // Περισσότερος χρόνος (10 δευτερόλεπτα)
          maximumAge: 60000 // Cache για 1 λεπτό
        }
      );
    } else {
      console.error('❌ LayoutStepCard: Geolocation not supported');
      setLocationQuery('Δεν υποστηρίζεται geolocation');

      setTimeout(() => {
        setLocationQuery('');
      }, 3000);
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

  // BaseCard styles από το theme system με 3 opacity modes
  const getPropertyTheme = () => {
    switch (opacityMode) {
      case 'transparent':
        return {
          backgroundColor: 'rgba(16, 185, 129, 0.01)', // Πλήρως διαφανές background ΜΟΝΟ
          titleBackground: 'rgba(16, 185, 129, 0.02)',
          backdropFilter: 'none', // ΚΑΜΙΑ θόλωση - όλα καθαρά
          opacity: 1, // ΠΑΡΑΜΕΝΕΙ 1 - μόνο το background είναι διαφανές
          titleShadow: 'none' // Χωρίς shadow στο transparent mode επίσης
        };
      case 'semi-transparent':
        return {
          backgroundColor: 'rgba(16, 185, 129, 0.65)', // Πιο έντονο πράσινο, λιγότερη διαφάνεια
          titleBackground: 'transparent', // Χωρίς δεύτερο στρώμα στον τίτλο
          backdropFilter: 'none', // Χωρίς blur - κείμενα και εικονίδια καθαρά
          opacity: 0.8,
          titleShadow: 'none' // Χωρίς shadow για να μην υπάρχει δεύτερο πράσινο
        };
      case 'opaque':
        return {
          backgroundColor: 'rgba(16, 185, 129, 0.95)', // Συμπαγές
          titleBackground: 'transparent', // Χωρίς δεύτερο στρώμα στον τίτλο
          backdropFilter: 'none', // Χωρίς blur
          opacity: 0.95,
          titleShadow: 'none' // Χωρίς shadow για να μην υπάρχει δεύτερο πράσινο
        };
    }
  };

  const propertyTheme = {
    ...getPropertyTheme(),
    borderColor: 'rgb(16, 185, 129)',
    titleShadow: '0 0 25px rgba(16, 185, 129, 0.2)'
  };

  const cardBaseStyles: React.CSSProperties = {
    borderRadius: '12px',
    boxShadow: 'none',
    padding: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    userSelect: 'none',
    WebkitTapHighlightColor: 'transparent',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
    backgroundColor: propertyTheme.backgroundColor,
    border: `2px solid ${propertyTheme.borderColor}`,
    backdropFilter: 'none', // ΕΞΑΣΦΑΛΙΖΩ ότι δεν υπάρχει blur πουθενά
    opacity: propertyTheme.opacity
  };

  const titleStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    padding: '6px 12px',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '600',
    color: opacityMode === 'opaque' ? '#ffffff' : '#000000', // Κείμενα παραμένουν πλήρως ορατά
    textAlign: 'center',
    lineHeight: '1.2',
    backgroundColor: propertyTheme.titleBackground,
    boxShadow: propertyTheme.titleShadow,
    marginBottom: '8px',
    position: 'relative',
    zIndex: 2 // Τίτλος και εικονίδια μπροστά από το background
  };

  // Dynamic styles για input fields ανάλογα με το opacity mode
  const getInputStyles = () => {
    switch (opacityMode) {
      case 'transparent':
        return {
          backgroundColor: 'rgba(16, 185, 129, 0.05)',
          border: '2px solid #10b981',
          color: '#000000'
        };
      case 'semi-transparent':
        return {
          backgroundColor: 'rgba(255, 255, 255, 0.9)', // Λευκό background για καλή ορατότητα
          border: '2px solid #ffffff',
          color: '#000000'
        };
      case 'opaque':
        return {
          backgroundColor: 'rgba(255, 255, 255, 0.95)', // Πιο έντονο λευκό
          border: '2px solid #ffffff',
          color: '#000000'
        };
    }
  };

  // Dynamic styles για buttons ανάλογα με το opacity mode
  const getButtonStyles = () => {
    switch (opacityMode) {
      case 'transparent':
        return {
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          border: '1px solid #10b981',
          color: '#059669'
        };
      case 'semi-transparent':
        return {
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          border: '2px solid #ffffff',
          color: '#059669'
        };
      case 'opaque':
        return {
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          border: '2px solid #ffffff',
          color: '#059669'
        };
    }
  };

  // Dynamic styles για primary button (location button) ανάλογα με το opacity mode
  const getPrimaryButtonStyles = () => {
    switch (opacityMode) {
      case 'transparent':
        return {
          backgroundColor: '#10b981', // Αρχικό πράσινο
          border: '2px solid #10b981',
          color: '#ffffff'
        };
      case 'semi-transparent':
        return {
          backgroundColor: 'rgba(255, 255, 255, 0.9)', // Λευκό background για καλή ορατότητα
          border: '2px solid #ffffff',
          color: '#10b981' // Πράσινο κείμενο για contrast
        };
      case 'opaque':
        return {
          backgroundColor: 'rgba(255, 255, 255, 0.95)', // Πιο έντονο λευκό
          border: '2px solid #ffffff',
          color: '#10b981' // Πράσινο κείμενο
        };
    }
  };

  return (
    <div style={{ width: '100%', padding: '8px' }}>
      {/* Πρώτη σειρά: Μεγάλη κάρτα για Τοποθεσία (σαν δύο κάρτες ενωμένες) */}
      <div style={{
        ...cardBaseStyles,
        width: '100%',
        height: 'auto',
        minHeight: '120px',
        marginBottom: '8px'
      }}>
        {/* Title με Icon */}
        <div style={titleStyles}>
          <LocationIcon size="sm" theme="neutral" />
          Τοποθεσία
        </div>

        {/* Content */}
        <div style={{ width: '100%', position: 'relative', zIndex: 2 }}>
          <Flex gap="xs" align="center" style={{ marginBottom: '8px' }}>
            <Button
              variant="primary"
              size="sm"
              onClick={handleFindMyLocation}
              style={{
                fontSize: '11px',
                padding: '5px 8px',
                minWidth: '120px',
                flex: '0 0 auto',
                position: 'relative',
                zIndex: 3,
                ...getPrimaryButtonStyles() // Dynamic styling ανάλογα με opacity mode
              }}
            >
              <LocationIcon size="xs" theme="neutral" style={{ marginRight: '3px' }} />
              Βρες τη θέση μου
            </Button>
          </Flex>

          <input
            type="text"
            value={locationQuery}
            onChange={(e) => setLocationQuery(e.target.value)}
            placeholder="Αναζήτηση διεύθυνσης..."
            style={{
              width: '100%',
              padding: '8px 10px',
              fontSize: '13px',
              borderRadius: '8px',
              outline: 'none',
              position: 'relative',
              zIndex: 3,
              ...getInputStyles() // Dynamic styling ανάλογα με opacity mode
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
      </div>

      {/* Δεύτερη σειρά: Δύο μικρές κάρτες δίπλα-δίπλα */}
      <div style={{
        display: 'flex',
        gap: '8px',
        marginBottom: '8px'
      }}>
        {/* Κάρτα Περιστροφής */}
        <div style={{
          ...cardBaseStyles,
          flex: 1,
          height: 'auto',
          minHeight: '90px'
        }}>
          {/* Title με Icon */}
          <div style={titleStyles}>
            <RotateIcon size="sm" theme="neutral" />
            Περιστροφή
          </div>

          {/* Content */}
          <div style={{ width: '100%', position: 'relative', zIndex: 2 }}>
            <Flex gap="xs" align="center" justify="center" style={{ marginBottom: '4px' }}>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleRotationChange(rotation - 90)}
                style={{
                  fontSize: '9px',
                  padding: '3px 6px',
                  position: 'relative',
                  zIndex: 3,
                  ...getButtonStyles() // Dynamic styling ανάλογα με opacity mode
                }}
              >
                -90°
              </Button>

              <Text size="xs" style={{
                minWidth: '30px',
                textAlign: 'center',
                fontWeight: 'bold',
                position: 'relative',
                zIndex: 3,
                color: opacityMode === 'opaque' ? '#ffffff' : '#000000' // Dynamic color
              }}>
                {rotation}°
              </Text>

              <Button
                variant="outline"
                size="sm"
                onClick={() => handleRotationChange(rotation + 90)}
                style={{
                  fontSize: '9px',
                  padding: '3px 6px',
                  position: 'relative',
                  zIndex: 3,
                  ...getButtonStyles() // Dynamic styling ανάλογα με opacity mode
                }}
              >
                +90°
              </Button>
            </Flex>
          </div>
        </div>

        {/* Κάρτα Κλίμακας */}
        <div style={{
          ...cardBaseStyles,
          flex: 1,
          height: 'auto',
          minHeight: '90px'
        }}>
          {/* Title με Icon */}
          <div style={titleStyles}>
            <RulerIcon size="sm" theme="neutral" />
            Κλίμακα
          </div>

          {/* Content */}
          <div style={{ width: '100%', position: 'relative', zIndex: 2 }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: '3px'
            }}>
              {/* Width */}
              <div>
                <Text size="xs" weight="bold" style={{
                  marginBottom: '2px',
                  textAlign: 'center',
                  position: 'relative',
                  zIndex: 3,
                  color: opacityMode === 'opaque' ? '#ffffff' : '#000000' // Dynamic color
                }}>
                  cm→m
                </Text>
                <input
                  type="number"
                  value={scaleWidth}
                  onChange={(e) => handleScaleChange('width', parseFloat(e.target.value) || 1)}
                  style={{
                    width: '100%',
                    padding: '2px 3px',
                    fontSize: '9px',
                    borderRadius: '4px',
                    textAlign: 'center',
                    outline: 'none',
                    position: 'relative',
                    zIndex: 3,
                    ...getInputStyles() // Dynamic styling ανάλογα με opacity mode
                  }}
                />
              </div>

              {/* Height */}
              <div>
                <Text size="xs" weight="bold" style={{
                  marginBottom: '2px',
                  textAlign: 'center',
                  position: 'relative',
                  zIndex: 3,
                  color: opacityMode === 'opaque' ? '#ffffff' : '#000000' // Dynamic color
                }}>
                  mm→m
                </Text>
                <input
                  type="number"
                  value={scaleHeight}
                  onChange={(e) => handleScaleChange('height', parseFloat(e.target.value) || 1)}
                  style={{
                    width: '100%',
                    padding: '2px 3px',
                    fontSize: '9px',
                    borderRadius: '4px',
                    textAlign: 'center',
                    outline: 'none',
                    position: 'relative',
                    zIndex: 3,
                    ...getInputStyles() // Dynamic styling ανάλογα με opacity mode
                  }}
                />
              </div>

              {/* Depth */}
              <div>
                <Text size="xs" weight="bold" style={{
                  marginBottom: '2px',
                  textAlign: 'center',
                  position: 'relative',
                  zIndex: 3,
                  color: opacityMode === 'opaque' ? '#ffffff' : '#000000' // Dynamic color
                }}>
                  m→m
                </Text>
                <input
                  type="number"
                  value={scaleDepth}
                  onChange={(e) => handleScaleChange('depth', parseFloat(e.target.value) || 1)}
                  style={{
                    width: '100%',
                    padding: '2px 3px',
                    fontSize: '9px',
                    borderRadius: '4px',
                    textAlign: 'center',
                    outline: 'none',
                    position: 'relative',
                    zIndex: 3,
                    ...getInputStyles() // Dynamic styling ανάλογα με opacity mode
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status */}
      <div style={{
        backgroundColor: '#dcfce7',
        border: '2px solid #16a34a',
        borderRadius: '12px',
        padding: '8px',
        textAlign: 'center',
        marginBottom: '8px',
        boxShadow: '0 0 25px rgba(22, 163, 74, 0.2)'
      }}>
        <Text size="xs" color="success" weight="bold">
          ✅ Κάτοψη έτοιμη για τοποθέτηση
        </Text>
      </div>

      {/* Complete Button */}
      {onComplete && (
        <Button
          variant="primary"
          size="md"
          onClick={onComplete}
          style={{
            width: '100%',
            backgroundColor: '#16a34a',
            fontSize: '14px',
            fontWeight: 'bold',
            padding: '12px 16px',
            border: '2px solid #16a34a',
            borderRadius: '12px',
            boxShadow: '0 0 25px rgba(22, 163, 74, 0.2)'
          }}
        >
          Συνέχεια στα Στοιχεία Ακινήτου →
        </Button>
      )}
    </div>
  );
};