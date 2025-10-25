/**
 * LayoutStepCard.tsx - Compact Layout Step για iPhone 14 Pro Max Cards
 *
 * Compact έκδοση του LayoutStep από το control panel.
 * Περιέχει GPS, search, rotation, scale controls σε μία κάρτα.
 */

import React, { useState } from 'react';
import { Text } from '@layera/typography';
import { Stack, Flex, SIZING_SCALE } from '@layera/layout';
import { Button } from '@layera/buttons';
import { LocationIcon, RotateIcon, RulerIcon } from '@layera/icons';
import { SPACING_SCALE } from '@layera/constants';
import { BOX_SHADOW_SCALE } from '@layera/box-shadows';
import { getCursorVar } from '@layera/cursors';
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
          backgroundColor: 'rgba(var(--color-semantic-success-rgb), 0.01)', // Πλήρως διαφανές background ΜΟΝΟ
          titleBackground: 'rgba(var(--color-semantic-success-rgb), 0.02)',
          backdropFilter: 'none', // ΚΑΜΙΑ θόλωση - όλα καθαρά
          opacity: 1, // ΠΑΡΑΜΕΝΕΙ 1 - μόνο το background είναι διαφανές
          titleShadow: 'none' // Χωρίς shadow στο transparent mode επίσης
        };
      case 'semi-transparent':
        return {
          backgroundColor: 'rgba(var(--color-semantic-success-rgb), 0.65)', // Πιο έντονο πράσινο, λιγότερη διαφάνεια
          titleBackground: 'transparent', // Χωρίς δεύτερο στρώμα στον τίτλο
          backdropFilter: 'none', // Χωρίς blur - κείμενα και εικονίδια καθαρά
          opacity: 0.8,
          titleShadow: 'none' // Χωρίς shadow για να μην υπάρχει δεύτερο πράσινο
        };
      case 'opaque':
        return {
          backgroundColor: 'rgba(var(--color-semantic-success-rgb), 0.95)', // Συμπαγές
          titleBackground: 'transparent', // Χωρίς δεύτερο στρώμα στον τίτλο
          backdropFilter: 'none', // Χωρίς blur
          opacity: 0.95,
          titleShadow: 'none' // Χωρίς shadow για να μην υπάρχει δεύτερο πράσινο
        };
    }
  };

  const propertyTheme = {
    ...getPropertyTheme(),
    borderColor: 'var(--color-semantic-success-border)',
    titleShadow: '0 0 25px rgba(var(--color-semantic-success-rgb), 0.2)'
  };

  const cardBaseStyles: React.CSSProperties = {
    borderRadius: `${SPACING_SCALE.SM + SPACING_SCALE.XS}px`,
    boxShadow: BOX_SHADOW_SCALE.none,
    padding: `${SPACING_SCALE.SM + SPACING_SCALE.XS}px`,
    cursor: getCursorVar('pointer'), // Cursor system token για interactive elements
    transition: 'var(--layera-transition-normal)',
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
    gap: `${SPACING_SCALE.XS + 2}px`,
    padding: `${SPACING_SCALE.XS + 2}px ${SPACING_SCALE.SM}px`,
    borderRadius: `${SPACING_SCALE.SM}px`,
    // fontSize handled by Text component
    fontWeight: 'var(--layera-font-semibold)', // Typography system token για 600
    color: opacityMode === 'opaque' ? 'var(--color-text-on-primary)' : 'var(--color-text-primary)', // Κείμενα παραμένουν πλήρως ορατά
    textAlign: 'center',
    lineHeight: '1.2',
    backgroundColor: propertyTheme.titleBackground,
    boxShadow: propertyTheme.titleShadow,
    marginBottom: `${SPACING_SCALE.SM}px`,
    position: 'relative',
    zIndex: 2 // Τίτλος και εικονίδια μπροστά από το background
  };

  // Dynamic styles για input fields ανάλογα με το opacity mode
  const getInputStyles = () => {
    switch (opacityMode) {
      case 'transparent':
        return {
          backgroundColor: 'rgba(var(--color-semantic-success-rgb), 0.05)',
          border: '2px solid var(--color-semantic-success-border)',
          color: 'var(--color-text-primary)'
        };
      case 'semi-transparent':
        return {
          backgroundColor: 'var(--color-bg-surface-strong)', // Λευκό background για καλή ορατότητα
          border: '2px solid #ffffff',
          color: 'var(--color-text-primary)'
        };
      case 'opaque':
        return {
          backgroundColor: 'var(--color-bg-surface-solid)', // Πιο έντονο λευκό
          border: '2px solid #ffffff',
          color: 'var(--color-text-primary)'
        };
    }
  };

  // Dynamic styles για buttons ανάλογα με το opacity mode
  const getButtonStyles = () => {
    switch (opacityMode) {
      case 'transparent':
        return {
          backgroundColor: 'rgba(var(--color-semantic-success-rgb), 0.1)',
          border: '1px solid #10b981',
          color: 'var(--color-semantic-success-text)'
        };
      case 'semi-transparent':
        return {
          backgroundColor: 'var(--color-bg-surface-strong)',
          border: '2px solid #ffffff',
          color: 'var(--color-semantic-success-text)'
        };
      case 'opaque':
        return {
          backgroundColor: 'var(--color-bg-surface-solid)',
          border: '2px solid #ffffff',
          color: 'var(--color-semantic-success-text)'
        };
    }
  };

  // Dynamic styles για primary button (location button) ανάλογα με το opacity mode
  const getPrimaryButtonStyles = () => {
    switch (opacityMode) {
      case 'transparent':
        return {
          backgroundColor: 'var(--color-semantic-success-border)', // Αρχικό πράσινο
          border: '2px solid var(--color-semantic-success-border)',
          color: 'var(--color-text-on-primary)'
        };
      case 'semi-transparent':
        return {
          backgroundColor: 'var(--color-bg-surface-strong)', // Λευκό background για καλή ορατότητα
          border: '2px solid #ffffff',
          color: 'var(--color-semantic-success-border)' // Πράσινο κείμενο για contrast
        };
      case 'opaque':
        return {
          backgroundColor: 'var(--color-bg-surface-solid)', // Πιο έντονο λευκό
          border: '2px solid #ffffff',
          color: 'var(--color-semantic-success-border)' // Πράσινο κείμενο
        };
    }
  };

  return (
    <div style={{ width: SIZING_SCALE.FULL, padding: `${SPACING_SCALE.SM}px` }}>
      {/* Πρώτη σειρά: Μεγάλη κάρτα για Τοποθεσία (σαν δύο κάρτες ενωμένες) */}
      <div style={{
        ...cardBaseStyles,
        width: SIZING_SCALE.FULL,
        height: 'auto',
        minHeight: `${SIZING_SCALE.LAYOUT_MD}px`,
        marginBottom: `${SPACING_SCALE.SM}px`
      }}>
        {/* Title με Icon */}
        <div style={titleStyles}>
          <LocationIcon size="sm" theme="neutral" />
          <Text size="sm" weight="bold" style={{ color: 'inherit' }}>
            Τοποθεσία
          </Text>
        </div>

        {/* Content */}
        <div style={{ width: SIZING_SCALE.FULL, position: 'relative', zIndex: 2 }}>
          <Flex gap="xs" align="center" style={{ marginBottom: `${SPACING_SCALE.SM}px` }}>
            <Button
              variant="primary"
              size="sm"
              onClick={handleFindMyLocation}
              style={{
                // fontSize handled by Text component
                padding: `${SPACING_SCALE.XS + 1}px ${SPACING_SCALE.XS + 2}px`,
                minWidth: `${SIZING_SCALE.LAYOUT_MD}px`,
                flex: '0 0 auto',
                position: 'relative',
                zIndex: 3,
                ...getPrimaryButtonStyles() // Dynamic styling ανάλογα με opacity mode
              }}
            >
              <LocationIcon size="xs" theme="neutral" style={{ marginRight: `${SPACING_SCALE.XS - 1}px` }} />
              <Text size="xs" style={{ color: 'inherit' }}>
                Βρες τη θέση μου
              </Text>
            </Button>
          </Flex>

          <input
            type="text"
            value={locationQuery}
            onChange={(e) => setLocationQuery(e.target.value)}
            placeholder="Αναζήτηση διεύθυνσης..."
            style={{
              width: SIZING_SCALE.FULL,
              padding: `${SPACING_SCALE.XS + 2}px ${SPACING_SCALE.XS + 4}px`,
              borderRadius: `${SPACING_SCALE.SM}px`,
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
        gap: `${SIZING_SCALE.SM}px`,
        marginBottom: `${SPACING_SCALE.SM}px`
      }}>
        {/* Κάρτα Περιστροφής */}
        <div style={{
          ...cardBaseStyles,
          flex: 1,
          height: 'auto',
          minHeight: `${SIZING_SCALE.LAYOUT_SM}px`
        }}>
          {/* Title με Icon */}
          <div style={titleStyles}>
            <RotateIcon size="sm" theme="neutral" />
            <Text size="sm" weight="bold" style={{ color: 'inherit' }}>
              Περιστροφή
            </Text>
          </div>

          {/* Content */}
          <div style={{ width: SIZING_SCALE.FULL, position: 'relative', zIndex: 2 }}>
            <Flex gap="xs" align="center" justify="center" style={{ marginBottom: `${SPACING_SCALE.XS}px` }}>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleRotationChange(rotation - 90)}
                style={{
                  // fontSize handled by Text component
                  padding: `${SPACING_SCALE.XS - 1}px ${SPACING_SCALE.XS + 2}px`,
                  position: 'relative',
                  zIndex: 3,
                  ...getButtonStyles() // Dynamic styling ανάλογα με opacity mode
                }}
              >
                <Text size="xs" style={{ color: 'inherit' }}>-90°</Text>
              </Button>

              <Text size="xs" style={{
                minWidth: `${SIZING_SCALE.XL}px`,
                textAlign: 'center',
                fontWeight: 'var(--layera-font-bold)', // Typography system token για bold
                position: 'relative',
                zIndex: 3,
                color: opacityMode === 'opaque' ? 'var(--color-text-on-primary)' : 'var(--color-text-primary)' // Dynamic color
              }}>
                {rotation}°
              </Text>

              <Button
                variant="outline"
                size="sm"
                onClick={() => handleRotationChange(rotation + 90)}
                style={{
                  // fontSize handled by Text component
                  padding: `${SPACING_SCALE.XS - 1}px ${SPACING_SCALE.XS + 2}px`,
                  position: 'relative',
                  zIndex: 3,
                  ...getButtonStyles() // Dynamic styling ανάλογα με opacity mode
                }}
              >
                <Text size="xs" style={{ color: 'inherit' }}>+90°</Text>
              </Button>
            </Flex>
          </div>
        </div>

        {/* Κάρτα Κλίμακας */}
        <div style={{
          ...cardBaseStyles,
          flex: 1,
          height: 'auto',
          minHeight: `${SIZING_SCALE.LAYOUT_SM}px`
        }}>
          {/* Title με Icon */}
          <div style={titleStyles}>
            <RulerIcon size="sm" theme="neutral" />
            <Text size="sm" weight="bold" style={{ color: 'inherit' }}>
              Κλίμακα
            </Text>
          </div>

          {/* Content */}
          <div style={{ width: SIZING_SCALE.FULL, position: 'relative', zIndex: 2 }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr 1fr',
              gap: `${SIZING_SCALE.XXS + 1}px`
            }}>
              {/* Width */}
              <div>
                <Text size="xs" weight="bold" style={{
                  marginBottom: `${SPACING_SCALE.XS - 2}px`,
                  textAlign: 'center',
                  position: 'relative',
                  zIndex: 3,
                  color: opacityMode === 'opaque' ? 'var(--color-text-on-primary)' : 'var(--color-text-primary)' // Dynamic color
                }}>
                  cm→m
                </Text>
                <input
                  type="number"
                  value={scaleWidth}
                  onChange={(e) => handleScaleChange('width', parseFloat(e.target.value) || 1)}
                  style={{
                    width: SIZING_SCALE.FULL,
                    padding: `${SPACING_SCALE.XS - 2}px ${SPACING_SCALE.XS - 1}px`,
                    // Keep original fontSize for input elements
                    borderRadius: `${SPACING_SCALE.XS}px`,
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
                  marginBottom: `${SPACING_SCALE.XS - 2}px`,
                  textAlign: 'center',
                  position: 'relative',
                  zIndex: 3,
                  color: opacityMode === 'opaque' ? 'var(--color-text-on-primary)' : 'var(--color-text-primary)' // Dynamic color
                }}>
                  mm→m
                </Text>
                <input
                  type="number"
                  value={scaleHeight}
                  onChange={(e) => handleScaleChange('height', parseFloat(e.target.value) || 1)}
                  style={{
                    width: SIZING_SCALE.FULL,
                    padding: `${SPACING_SCALE.XS - 2}px ${SPACING_SCALE.XS - 1}px`,
                    // Keep original fontSize for input elements
                    borderRadius: `${SPACING_SCALE.XS}px`,
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
                  marginBottom: `${SPACING_SCALE.XS - 2}px`,
                  textAlign: 'center',
                  position: 'relative',
                  zIndex: 3,
                  color: opacityMode === 'opaque' ? 'var(--color-text-on-primary)' : 'var(--color-text-primary)' // Dynamic color
                }}>
                  m→m
                </Text>
                <input
                  type="number"
                  value={scaleDepth}
                  onChange={(e) => handleScaleChange('depth', parseFloat(e.target.value) || 1)}
                  style={{
                    width: SIZING_SCALE.FULL,
                    padding: `${SPACING_SCALE.XS - 2}px ${SPACING_SCALE.XS - 1}px`,
                    // Keep original fontSize for input elements
                    borderRadius: `${SPACING_SCALE.XS}px`,
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
        backgroundColor: 'var(--color-semantic-success-bg)',
        border: '2px solid var(--color-semantic-success-border)',
        borderRadius: `${SPACING_SCALE.SM + SPACING_SCALE.XS}px`,
        padding: `${SPACING_SCALE.SM}px`,
        textAlign: 'center',
        marginBottom: `${SPACING_SCALE.SM}px`,
        boxShadow: BOX_SHADOW_SCALE.glowDefault
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
            width: SIZING_SCALE.FULL,
            backgroundColor: 'var(--color-semantic-success-border)',
            // fontSize handled by Text component
            fontWeight: 'var(--layera-font-bold)', // Typography system token για bold
            padding: `${SPACING_SCALE.SM}px ${SPACING_SCALE.MD}px`,
            border: '2px solid var(--color-semantic-success-border)',
            borderRadius: `${SPACING_SCALE.SM + SPACING_SCALE.XS}px`,
            boxShadow: BOX_SHADOW_SCALE.glowDefault
          }}
        >
          <Text size="sm" weight="bold" style={{ color: 'inherit' }}>
            Συνέχεια στα Στοιχεία Ακινήτου →
          </Text>
        </Button>
      )}
    </div>
  );
};