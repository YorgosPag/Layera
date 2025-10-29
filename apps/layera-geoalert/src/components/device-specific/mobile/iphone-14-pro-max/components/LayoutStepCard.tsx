/**
 * LayoutStepCard.tsx - Compact Layout Step για iPhone 14 Pro Max Cards
 *
 * Compact έκδοση του LayoutStep από το control panel.
 * Περιέχει GPS, search, rotation, scale controls σε μία κάρτα.
 */

import React, { useState } from 'react';
import { Text } from '@layera/typography';
import { Flex, Box } from '@layera/layout';
import { Button } from '@layera/buttons';
import { LocationIcon, RotateIcon, RulerIcon } from '@layera/icons';
import { SPACING_SCALE } from '@layera/constants';
import { BOX_SHADOW_SCALE } from '@layera/box-shadows';
import { getCursorVar } from '@layera/cursors';
import { BaseCard } from '@layera/cards';
import { Input } from '@layera/forms';
import { useLayeraTranslation } from '@layera/tolgee';

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
  const { t } = useLayeraTranslation();
  const [rotation, setRotation] = useState<number>(0);
  const [scaleWidth, setScaleWidth] = useState<number>(1);
  const [scaleHeight, setScaleHeight] = useState<number>(1);
  const [scaleDepth, setScaleDepth] = useState<number>(1);
  const [locationQuery, setLocationQuery] = useState<string>('');

  // Opacity modes - τρεις καταστάσεις
  type OpacityMode = 'transparent' | 'semi-transparent' | 'opaque';
  const [opacityMode, setOpacityMode] = useState<OpacityMode>('transparent');

  const handleFindMyLocation = (): void => {
    if ('geolocation' in navigator) {
      // Προσθήκη loading state feedback
      setLocationQuery('Εντοπισμός θέσης...');

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
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
          setTimeout((): void => {
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

      setTimeout((): void => {
        setLocationQuery('');
      }, 3000);
    }
  };

  const handleRotationChange = (newRotation: number) => {
    setRotation(newRotation);
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
  const getPropertyTheme = (): void => {
    switch (opacityMode) {
      case 'transparent':
        return {
          backgroundColor: 'var(--la-bg-overlay-transparent, var(--la-color-success-alpha-1))', // Πλήρως διαφανές background ΜΟΝΟ
          titleBackground: 'var(--la-bg-overlay-subtle, var(--la-color-success-alpha-2))',
          backdropFilter: 'none', // ΚΑΜΙΑ θόλωση - όλα καθαρά
          opacity: 1, // ΠΑΡΑΜΕΝΕΙ 1 - μόνο το background είναι διαφανές
          titleShadow: 'none' // Χωρίς shadow στο transparent mode επίσης
        };
      case 'semi-transparent':
        return {
          backgroundColor: 'var(--la-bg-overlay-semi, var(--la-color-success-alpha-65))', // Πιο έντονο πράσινο, λιγότερη διαφάνεια
          titleBackground: 'transparent', // Χωρίς δεύτερο στρώμα στον τίτλο
          backdropFilter: 'none', // Χωρίς blur - κείμενα και εικονίδια καθαρά
          opacity: 0.8,
          titleShadow: 'none' // Χωρίς shadow για να μην υπάρχει δεύτερο πράσινο
        };
      case 'opaque':
        return {
          backgroundColor: 'var(--la-bg-overlay-opaque, var(--la-color-success-alpha-95))', // Συμπαγές
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
    titleShadow: 'var(--la-shadow-glow-success, 0 0 25px rgba(var(--color-semantic-success-rgb), 0.2))'
  };

  const cardBaseStyles: React.CSSProperties = {
    borderRadius: `${SPACING_SCALE.SM + SPACING_SCALE.XS}px`,
    boxShadow: BOX_SHADOW_SCALE.none,
    padding: `${SPACING_SCALE.SM + SPACING_SCALE.XS}px`,
    cursor: getCursorVar('pointer'), // Cursor system token για interactive elements
    transition: 'var(--la-transition-normal)',
    userSelect: 'none',
    WebkitTapHighlightColor: 'transparent',
    // Layout handled by Flex wrapper
    position: 'relative',
    backgroundColor: propertyTheme.backgroundColor,
    border: `2px solid ${propertyTheme.borderColor}`,
    backdropFilter: 'none', // ΕΞΑΣΦΑΛΙΖΩ ότι δεν υπάρχει blur πουθενά
    opacity: propertyTheme.opacity
  };

  const titleStyles: React.CSSProperties = {
    // Layout handled by Flex wrapper
    // gap handled by Flex component
    padding: `${SPACING_SCALE.XS + 2}px ${SPACING_SCALE.SM}px`,
    borderRadius: `${SPACING_SCALE.SM}px`,
    // fontSize handled by Text component
    fontWeight: 'var(--la-font-semibold)', // Typography system token για 600
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
  const getInputStyles = (): void => {
    switch (opacityMode) {
      case 'transparent':
        return {
          backgroundColor: 'var(--la-bg-overlay-subtle-transparent, rgba(var(--color-semantic-success-rgb), 0.05))',
          border: '2px solid var(--color-semantic-success-border)',
          color: 'var(--color-text-primary)'
        };
      case 'semi-transparent':
        return {
          backgroundColor: 'var(--color-bg-surface-strong)', // Λευκό background για καλή ορατότητα
          border: '2px solid var(--la-color-white, var(--color-bg-canvas))',
          color: 'var(--color-text-primary)'
        };
      case 'opaque':
        return {
          backgroundColor: 'var(--color-bg-surface-solid)', // Πιο έντονο λευκό
          border: '2px solid var(--la-color-white, var(--color-bg-canvas))',
          color: 'var(--color-text-primary)'
        };
    }
  };

  // Dynamic styles για buttons ανάλογα με το opacity mode
  const getButtonStyles = (): void => {
    switch (opacityMode) {
      case 'transparent':
        return {
          backgroundColor: 'var(--la-bg-overlay-light, rgba(var(--color-semantic-success-rgb), 0.1))',
          border: '1px solid var(--color-semantic-success-border)',
          color: 'var(--color-semantic-success-text)'
        };
      case 'semi-transparent':
        return {
          backgroundColor: 'var(--color-bg-surface-strong)',
          border: '2px solid var(--la-color-white, var(--color-bg-canvas))',
          color: 'var(--color-semantic-success-text)'
        };
      case 'opaque':
        return {
          backgroundColor: 'var(--color-bg-surface-solid)',
          border: '2px solid var(--la-color-white, var(--color-bg-canvas))',
          color: 'var(--color-semantic-success-text)'
        };
    }
  };

  // Dynamic styles για primary button (location button) ανάλογα με το opacity mode
  const getPrimaryButtonStyles = (): void => {
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
          border: '2px solid var(--la-color-white, var(--color-bg-canvas))',
          color: 'var(--color-semantic-success-border)' // Πράσινο κείμενο για contrast
        };
      case 'opaque':
        return {
          backgroundColor: 'var(--color-bg-surface-solid)', // Πιο έντονο λευκό
          border: '2px solid var(--la-color-white, var(--color-bg-canvas))',
          color: 'var(--color-semantic-success-border)' // Πράσινο κείμενο
        };
    }
  };

  return (
    <Box width="full" padding="sm">
      {/* Πρώτη σειρά: Μεγάλη κάρτα για Τοποθεσία (σαν δύο κάρτες ενωμένες) */}
      <BaseCard
        variant="success"
        opacityMode={opacityMode}
        padding="md"
        marginBottom="sm"
        minHeight={`${SPACING_SCALE.XL}px`}
      >
        {/* Title με Icon */}
        <Flex align="center" justify="center" gap="xs" marginBottom="sm">
          <LocationIcon size="sm" theme="neutral" />
          <Text size="sm" weight="bold" color="primary">
            Τοποθεσία
          </Text>
        </Flex>

        {/* Content */}
        <Box width="full" position="relative" zIndex={2}>
          <Flex gap="xs" align="center" marginBottom="sm">
            <Button
              variant="primary"
              size="sm"
              onClick={handleFindMyLocation}
              minWidth={`${SPACING_SCALE.XL}px`}
              flex="none"
              position="relative"
              zIndex={3}
            >
              <LocationIcon size="xs" theme="neutral" marginRight="xs" />
              <Text size="xs" color="inherit">
                Βρες τη θέση μου
              </Text>
            </Button>
          </Flex>

          <Input
            type="text"
            value={locationQuery}
            onChange={(e: React.FormEvent<HTMLFormElement>) => setLocationQuery(e.target.value)}
            placeholder={t('search.address-placeholder')}
            variant="outline"
            size="sm"
            fullWidth
            position="relative"
            zIndex={3}
            onKeyPress={(e: React.FormEvent<HTMLFormElement>) => {
              if (e.key === 'Enter' && locationQuery.trim()) {
                if (onLocationSearch) {
                  onLocationSearch(locationQuery);
                }
              }
            }}
          />
        </Box>
      </BaseCard>

      {/* Δεύτερη σειρά: Δύο μικρές κάρτες δίπλα-δίπλα */}
      <Flex gap="sm" marginBottom="sm">
        {/* Κάρτα Περιστροφής */}
        <BaseCard
          variant="success"
          opacityMode={opacityMode}
          padding="sm"
          flex="1"
          minHeight={`${SPACING_SCALE.LG}px`}
        >
          {/* Title με Icon */}
          <Flex align="center" justify="center" gap="xs" marginBottom="sm">
            <RotateIcon size="sm" theme="neutral" />
            <Text size="sm" weight="bold" color="primary">
              Περιστροφή
            </Text>
          </Flex>

          {/* Content */}
          <Box width="full" position="relative" zIndex={2}>
            <Flex gap="xs" align="center" justify="center" marginBottom="xs">
              <Button
                variant="outline"
                size="sm"
                onClick={(): void => handleRotationChange(rotation - 90)}
                padding="xs"
                position="relative"
                zIndex={3}
              >
                <Text size="xs" color="inherit">-90°</Text>
              </Button>

              <Text
                size="xs"
                weight="bold"
                color={opacityMode === 'opaque' ? 'on-primary' : 'primary'}
                minWidth={`${SPACING_SCALE.XXL}px`}
                textAlign="center"
                position="relative"
                zIndex={3}>
                {rotation}°
              </Text>

              <Button
                variant="outline"
                size="sm"
                onClick={(): void => handleRotationChange(rotation + 90)}
                padding="xs"
                position="relative"
                zIndex={3}
              >
                <Text size="xs" color="inherit">+90°</Text>
              </Button>
            </Flex>
          </Box>
        </BaseCard>

        {/* Κάρτα Κλίμακας */}
        <BaseCard
          variant="success"
          opacityMode={opacityMode}
          padding="sm"
          flex="1"
          minHeight={`${SPACING_SCALE.LG}px`}
        >
          {/* Title με Icon */}
          <Flex align="center" justify="center" gap="xs" marginBottom="sm">
            <RulerIcon size="sm" theme="neutral" />
            <Text size="sm" weight="bold" color="primary">
              Κλίμακα
            </Text>
          </Flex>

          {/* Content */}
          <Box width="full" position="relative" zIndex={2}>
            <Box
              display="grid"
              gridTemplateColumns="1fr 1fr 1fr"
              gap="xs"
            >
              {/* Width */}
              <Box>
                <Text
                  size="xs"
                  weight="bold"
                  color={opacityMode === 'opaque' ? 'on-primary' : 'primary'}
                  marginBottom="xs"
                  textAlign="center"
                  position="relative"
                  zIndex={3}>
                  cm→m
                </Text>
                <Input
                  type="number"
                  value={scaleWidth.toString()}
                  onChange={(e: React.FormEvent<HTMLFormElement>) => handleScaleChange('width', parseFloat(e.target.value) || 1)}
                  width="full"
                  padding="xs"
                  borderRadius="xs"
                  textAlign="center"
                  position="relative"
                  zIndex={3}
                />
              </Box>

              {/* Height */}
              <Box>
                <Text
                  size="xs"
                  weight="bold"
                  color={opacityMode === 'opaque' ? 'on-primary' : 'primary'}
                  marginBottom="xs"
                  textAlign="center"
                  position="relative"
                  zIndex={3}>
                  mm→m
                </Text>
                <Input
                  type="number"
                  value={scaleHeight.toString()}
                  onChange={(e: React.FormEvent<HTMLFormElement>) => handleScaleChange('height', parseFloat(e.target.value) || 1)}
                  width="full"
                  padding="xs"
                  borderRadius="xs"
                  textAlign="center"
                  position="relative"
                  zIndex={3}
                />
              </Box>

              {/* Depth */}
              <Box>
                <Text
                  size="xs"
                  weight="bold"
                  color={opacityMode === 'opaque' ? 'on-primary' : 'primary'}
                  marginBottom="xs"
                  textAlign="center"
                  position="relative"
                  zIndex={3}>
                  m→m
                </Text>
                <Input
                  type="number"
                  value={scaleDepth.toString()}
                  onChange={(e: React.FormEvent<HTMLFormElement>) => handleScaleChange('depth', parseFloat(e.target.value) || 1)}
                  width="full"
                  padding="xs"
                  borderRadius="xs"
                  textAlign="center"
                  position="relative"
                  zIndex={3}
                  style={getInputStyles()} // Dynamic styling ανάλογα με opacity mode
                />
              </Box>
            </Box>
          </Box>
        </BaseCard>
      </Flex>

      {/* Status */}
      <BaseCard
        variant="success"
        opacityMode={opacityMode}
        padding="sm"
        marginBottom="sm"
        textAlign="center"
      >
        <Text size="xs" color="success" weight="bold">
          ✅ Κάτοψη έτοιμη για τοποθέτηση
        </Text>
      </BaseCard>

      {/* Complete Button */}
      {onComplete && (
        <Button
          variant="primary"
          size="md"
          onClick={onComplete}
          fullWidth
          backgroundColor="var(--color-semantic-success-border)"
          fontWeight="var(--la-font-bold)"
          padding={`${SPACING_SCALE.SM}px ${SPACING_SCALE.MD}px`}
          border="2px solid var(--color-semantic-success-border)"
          borderRadius={`${SPACING_SCALE.SM + SPACING_SCALE.XS}px`}
          boxShadow={BOX_SHADOW_SCALE.glowDefault}
        >
          <Text size="sm" weight="bold" color="inherit">
            Συνέχεια στα Στοιχεία Ακινήτου →
          </Text>
        </Button>
      )}
    </Box>
  );
};