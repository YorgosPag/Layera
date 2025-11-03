/**
 * 🚨🚨🚨 ΚΡΙΣΙΜΗ ΠΡΟΕΙΔΟΠΟΙΗΣΗ - ΜΗΝ ΤΡΟΠΟΠΟΙΗΣΕΙΣ ΑΥΤΟ ΤΟ ΑΡΧΕΙΟ! 🚨🚨🚨
 *
 * Αυτό το αρχείο έχει διορθωθεί 100+ φορές από τον Γιώργο Παγώνη.
 * Λειτουργεί ΜΟΝΟ για κινητά τηλέφωνα - ΟΧΙ για tablets/desktop/foldables.
 *
 * ✅ ΛΕΙΤΟΥΡΓΕΙ: Mobile phones (iPhone, Samsung Galaxy κλπ)
 * ❌ ΔΕΝ ΛΕΙΤΟΥΡΓΕΙ: Tablets, Desktop, Samsung Galaxy Z Fold 5 (foldables)
 *
 * ΜΗΝ το πειράξεις! Αφησε το όπως είναι για την προβολή συσκευών!
 *
 * - Γιώργος Παγώνης, 28/10/2025
 */

import React, { useState, useEffect } from 'react';
import { useViewportWithOverride } from '@layera/viewport';
import { DeviceModelSelector, DeviceModel, getDeviceSpecs } from '@layera/viewport';
import { SPACING_SCALE, BORDER_RADIUS_SCALE, CSS_DESIGN_TOKENS } from '@layera/constants';
import { Flex, Box } from '@layera/layout';
import { BOX_SHADOW_SCALE } from '@layera/box-shadows';

interface DeviceFrameWrapperProps {
  children: React.ReactNode;
  enabled?: boolean;
  onResponsiveModeChange?: (isResponsive: boolean) => void;
}

export const DeviceFrameWrapper: React.FC<DeviceFrameWrapperProps> = ({
  children,
  enabled = true,
  onResponsiveModeChange
}) => {
  const { deviceType, isMobile, isTablet, isDesktop } = useViewportWithOverride();
  const [selectedModel, setSelectedModel] = useState<DeviceModel | null>(null);

  const handleModelSelect = (model: DeviceModel | null) => {
    setSelectedModel(model);
  };

  // Notify parent component when responsive mode changes
  useEffect(() => {
    const isResponsive = selectedModel === null;
    onResponsiveModeChange?.(isResponsive);
  }, [selectedModel, onResponsiveModeChange]);

  // Also notify on mount
  useEffect(() => {
    const isResponsive = selectedModel === null;
    onResponsiveModeChange?.(isResponsive);
  }, [onResponsiveModeChange]);

  if (!enabled) {
    return <>{children}</>;
  }

  // If no specific model selected, show children without frame in full-screen responsive layout
  if (!selectedModel) {
    return (
      <>
        {/* DeviceModelSelector εκτός fixed container για σωστό dropdown functionality */}
        <div style={{
          position: 'fixed',
          top: SPACING_SCALE.LG + 'px',
          left: SPACING_SCALE.LG + 'px',
          zIndex: 10000, // Using z-index-map-overlay equivalent
          backgroundColor: 'var(--color-bg-surface-overlay)',
          borderRadius: BORDER_RADIUS_SCALE.LG + 'px',
          padding: SPACING_SCALE.SM + 'px',
          boxShadow: BOX_SHADOW_SCALE.elevation4,
          minWidth: SPACING_SCALE.CONTAINER_SM + 'px'
        }}>
          <DeviceModelSelector
            currentModel={selectedModel}
            onModelSelect={setSelectedModel}
          />
        </div>
        <div style={{
          width: '100vw',
          height: '100vh',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 500 // Keeping this lower than selector (10000) for correct layering
        }}>
          {children}
        </div>
      </>
    );
  }

  const specs = getDeviceSpecs(selectedModel);

  // 🚨🚨🚨 ΚΡΙΣΙΜΗ ΣΗΜΕΙΩΣΗ - ΜΗΝ ΠΕΙΡΑΖΕΙΣ ΑΥΤΟΝ ΤΟΝ ΚΩΔΙΚΑ! 🚨🚨🚨
  //
  // ⚠️ ΠΡΟΣΟΧΗ: Αυτός ο κώδικας έχει διορθωθεί 100+ φορές και πρέπει να μείνει ΑΚΡΙΒΩΣ όπως είναι!
  // ⚠️ Ο DeviceFrameWrapper λειτουργεί ΜΟΝΟ για device simulation προβολή - ΜΗΝ τον αλλάξεις!
  //
  // ✅ ΤΙ ΛΕΙΤΟΥΡΓΕΙ:
  // - Κινητά τηλέφωνα (iPhones, Samsung κλπ) → ΤΕΛΕΙΑ λειτουργία
  // - Device frames εμφανίζονται σωστά με notch, home indicator
  // - Responsive mode (no frame) → ΤΕΛΕΙΑ λειτουργία fullscreen
  //
  // ❌ ΤΙ ΔΕΝ ΛΕΙΤΟΥΡΓΕΙ (ΓΙΑ ΜΕΛΛΟΝΤΙΚΗ ΔΙΟΡΘΩΣΗ):
  // - Tablets (iPad Air, iPad Pro κλπ) → ΔΕΝ εμφανίζονται σωστά
  // - Desktop (MacBook, iMac) → ΔΕΝ εμφανίζονται σωστά
  // - Foldable devices (Samsung Galaxy Z Fold 5) → ΔΕΝ λειτουργούν σαν βιβλιαράκια
  // - Surface Pro 7 → ΔΕΝ εμφανίζεται σωστά
  //
  // 🎯 ΤΡΕΧΩΝ ΤΡΟΠΟΣ ΛΕΙΤΟΥΡΓΙΑΣ (28/10/2025):
  // MOBILE DEVICE FRAMES (selectedModel !== null):
  // 1. getDeviceSpecs(selectedModel) → παίρνει width, height, scale από @layera/viewport
  // 2. getFrameStyles() → δημιουργεί CSS με position: relative, backgroundColor: specs.frameColor, transform: scale(specs.scale)
  // 3. getScreenStyles() → δημιουργεί inner screen με overflow: hidden, borderRadius
  // 4. Conditional rendering: hasNotch/hasHomeBar → εμφανίζει notch και home indicator με absolute positioning
  // 5. Render μέσα σε Flex container με centered alignment
  //
  // RESPONSIVE MODE (selectedModel === null):
  // 1. DeviceModelSelector → fixed positioning (top: SPACING_SCALE.LG, left: SPACING_SCALE.LG, zIndex: 10000) με LEGO design tokens
  // 2. Children → fullscreen fixed container (width: 100vw, height: 100vh, position: fixed, top: 0, left: 0, zIndex: 500)
  // 3. ΑΠΟΤΕΛΕΣΜΑ: Χάρτης fullscreen πίσω από floating selector με enterprise design consistency
  //
  // 📝 TODO ΓΙΑ ΤΟ ΜΕΛΛΟΝ:
  // - Διόρθωση tablet rendering (μεγαλύτερα scales, διαφορετικό layout)
  // - Διόρθωση desktop rendering (πολύ μεγάλα screens, διαφορετική προσέγγιση)
  // - Υλοποίηση foldable devices με dual-screen support
  // - Βελτίωση responsive breakpoints για όλες τις κατηγορίες
  //
  // ΚΑΤΑΣΤΑΣΗ: Mobile frames ΤΕΛΕΙΑ | Tablets/Desktop ΠΡΟΒΛΗΜΑΤΙΚΑ | Responsive mode ΤΕΛΕΙΑ
  // Τελευταία ενημέρωση: 28/10/2025 - ΓΙΩΡΓΟΣ ΠΑΓΩΝΗΣ

  const getFrameStyles = (): React.CSSProperties => {
    // Βελτιώσεις για tablets, desktop και foldables
    const isTablet = selectedModel?.includes('iPad') || selectedModel?.includes('Surface');
    const isDesktop = selectedModel?.includes('MacBook') || selectedModel?.includes('iMac');
    const isFoldable = selectedModel?.includes('Z Fold');

    const baseStyles: React.CSSProperties = {
      position: 'relative',
      margin: `${SPACING_SCALE.MD}px auto`,
      backgroundColor: specs.frameColor,
      borderRadius: `${BORDER_RADIUS_SCALE.LG}px`,
      padding: `${SPACING_SCALE.SM}px`,
      boxShadow: BOX_SHADOW_SCALE.elevation6,
      width: `${specs.width}px`,
      height: `${specs.height}px`,
      transform: `scale(${specs.scale})`,
      transformOrigin: 'top center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      // Βελτιώσεις για μεγάλα devices
      maxWidth: '95vw',
      maxHeight: '90vh',
      overflow: 'visible'
    };

    return baseStyles;
  };

  const getScreenStyles = (): React.CSSProperties => {
    return {
      width: '100%',
      height: '100%',
      backgroundColor: 'var(--color-bg-canvas)',
      borderRadius: `${BORDER_RADIUS_SCALE.SM}px`,
      overflow: 'hidden',
      position: 'relative'
    };
  };

  const getNotchStyles = (): React.CSSProperties => {
    if (!specs.hasNotch) return { display: 'none' };

    // ΠΟΛΥ ΜΙΚΡΟ iPhone notch με LEGO design tokens μόνο
    return {
      position: 'absolute',
      top: `${SPACING_SCALE.XS / 4}px`, // LEGO token: XS/4 = 2px
      left: '50%',
      transform: 'translateX(-50%)',
      width: `${SPACING_SCALE.MD}px`, // LEGO token: MD = 24px (ΠΟΛΥ μικρό)
      height: `${SPACING_SCALE.XS / 4}px`, // LEGO token: XS/4 = 2px (ΠΟΛΥ μικρό)
      backgroundColor: 'var(--color-border-subtle)', // LEGO color token (ακόμη λιγότερο σκούρο)
      borderBottomLeftRadius: `${BORDER_RADIUS_SCALE.XS}px`, // LEGO border radius token (μικρότερη καμπυλότητα)
      borderBottomRightRadius: `${BORDER_RADIUS_SCALE.XS}px`, // LEGO border radius token (μικρότερη καμπυλότητα)
      zIndex: 10, // Local z-index within device frame
      opacity: 0.4 // Πολύ λιγότερο σκούρο
    };
  };

  const getHomeIndicatorStyles = (): React.CSSProperties => {
    if (!specs.hasHomeBar) return { display: 'none' };

    return {
      position: 'absolute',
      bottom: `${SPACING_SCALE.SM}px`,
      left: '50%',
      transform: 'translateX(-50%)',
      width: `${SPACING_SCALE.XL}px`,
      height: `${SPACING_SCALE.XS}px`,
      backgroundColor: 'var(--color-text-primary)',
      borderRadius: `${BORDER_RADIUS_SCALE.PILL}px`,
      zIndex: 10 // Local z-index within device frame
    };
  };

  return (
    <>
      <DeviceModelSelector
        currentModel={selectedModel}
        onModelSelect={setSelectedModel}
      />
      <Flex
        justify="center"
        align="start"
        style={{
          minHeight: '100vh',
          backgroundColor: 'var(--la-bg-surface)',
          paddingTop: `${SPACING_SCALE.LG}px`,
          paddingBottom: `${SPACING_SCALE.LG}px`,
          overflow: 'auto',
        }}
        className="device-frame-container">
        <Box
          className="device-frame"
          data-device={selectedModel}
          style={getFrameStyles()}
        >
          <Box
            id="layera-device-simulator-viewport"
            className="device-screen"
            style={getScreenStyles()}
          >
            <Box className="device-notch" style={getNotchStyles()} />
            {children}
            <Box className="device-home-indicator" style={getHomeIndicatorStyles()} />
          </Box>
        </Box>
      </Flex>
    </>
  );
};