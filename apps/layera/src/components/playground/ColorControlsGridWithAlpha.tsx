import React, { useState, useEffect } from 'react';
import { Box } from '@layera/layout';
import { Text } from '@layera/typography';
import { Button } from '@layera/buttons';
import { ColorPickerWithAlpha, ColorWithAlpha } from './shared/ColorPickerWithAlpha';
import { OptimizedColorPicker } from './shared/OptimizedColorPicker';
import { SettingsIcon, LayersIcon } from '@layera/icons';

/**
 * ColorControlsGridWithAlpha Component
 *
 * Enhanced Color Controls Grid με Alpha Channel Support
 * - Toggle μεταξύ HEX και RGBA mode
 * - Alpha sliders για διαφάνεια
 * - Backward compatibility με υπάρχον σύστημα
 * - Live preview με transparency effects
 */

interface ColorControlsGridWithAlphaProps {
  currentColors: Record<string, ColorWithAlpha | string>; // Support για mixed types
  currentSetters: Record<string, (value: ColorWithAlpha | string) => void>;
  startPreview: (key: string, value: string | ColorWithAlpha) => void;
  colorCategory: string;
  alphaEnabled?: boolean;
  onAlphaToggle?: (enabled: boolean) => void;
}

export const ColorControlsGridWithAlpha: React.FC<ColorControlsGridWithAlphaProps> = React.memo(({
  currentColors,
  currentSetters,
  startPreview,
  colorCategory,
  alphaEnabled = false,
  onAlphaToggle
}) => {
  const [localAlphaEnabled, setLocalAlphaEnabled] = useState(alphaEnabled);

  // Συγχρονισμός με το external prop
  useEffect(() => {
    setLocalAlphaEnabled(alphaEnabled);
  }, [alphaEnabled]);

  const handleAlphaToggle = () => {
    const newState = !localAlphaEnabled;
    console.log('🎯 Alpha toggle clicked! Current:', localAlphaEnabled, '-> New:', newState);
    setLocalAlphaEnabled(newState);
    onAlphaToggle?.(newState);
    console.log('✅ Alpha toggle complete. Local state should be:', newState);
  };

  // Helper function: Ensure ColorWithAlpha format
  const ensureColorWithAlpha = (color: ColorWithAlpha | string): ColorWithAlpha => {
    if (typeof color === 'string') {
      // Convert HEX to ColorWithAlpha
      if (color.startsWith('rgba')) {
        const rgbaMatch = color.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
        if (rgbaMatch) {
          const [, r, g, b, a] = rgbaMatch;
          const hex = `#${[r, g, b].map(x => parseInt(x).toString(16).padStart(2, '0')).join('')}`;
          return {
            hex,
            alpha: parseFloat(a),
            rgba: color
          };
        }
      }
      // Regular HEX
      const hex = color.startsWith('#') ? color : '#ffffff';
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return {
        hex,
        alpha: 1.0,
        rgba: `rgba(${r}, ${g}, ${b}, 1.0)`
      };
    }
    return color;
  };

  // Helper function: Extract HEX για legacy compatibility
  const extractHex = (color: ColorWithAlpha | string): string => {
    if (typeof color === 'string') {
      return color.startsWith('#') ? color : '#ffffff';
    }
    return color.hex;
  };

  // Περιγραφές για κάθε κατηγορία χρωμάτων
  const getColorDescriptions = () => {
    switch(colorCategory) {
      case 'borders':
        return {
          primary: 'Κύρια περιγράμματα - Γενικά στοιχεία UI',
          secondary: 'Τετράγωνα κουμπιά header - Εικονίδια επικεφαλίδας',
          success: 'Περιγράμματα επιτυχίας - Θετικές ενέργειες',
          warning: 'Περιγράμματα προειδοποίησης - Ειδοποιήσεις',
          danger: 'Περιγράμματα κινδύνου - Διαγραφές/Σφάλματα',
          info: 'Περιγράμματα πληροφοριών - Ενημερώσεις'
        };
      case 'buttons':
        return {
          primary: 'Κουμπιά κύριας δράσης - Call-to-action',
          secondary: 'Δευτερεύοντα κουμπιά - Γενικές ενέργειες',
          success: 'Κουμπιά επιτυχίας - Αποθήκευση, Επιβεβαίωση',
          warning: 'Κουμπιά προειδοποίησης - Προσοχή απαιτείται',
          danger: 'Κουμπιά κινδύνου - Διαγραφή, Ακύρωση',
          info: 'Κουμπιά πληροφοριών - Βοήθεια, Πληροφορίες'
        };
      case 'backgrounds':
        return {
          primary: 'Κύρια φόντα - Κεντρικές περιοχές',
          secondary: 'Δευτερεύοντα φόντα - Sidebars, Cards',
          success: 'Φόντα επιτυχίας - Θετικά μηνύματα',
          warning: 'Φόντα προειδοποίησης - Ειδοποιήσεις',
          danger: 'Φόντα κινδύνου - Σφάλματα, Alerts',
          info: 'Φόντα πληροφοριών - Βοηθητικά μηνύματα'
        };
      case 'text':
        return {
          primary: 'Κύριο κείμενο - Τίτλοι, headings',
          secondary: 'Δευτερεύον κείμενο - Υπότιτλοι, περιγραφές',
          success: 'Κείμενο επιτυχίας - Θετικά μηνύματα',
          warning: 'Κείμενο προειδοποίησης - Ειδοποιήσεις',
          danger: 'Κείμενο κινδύνου - Σφάλματα, Alerts',
          info: 'Κείμενο πληροφοριών - Βοηθητικές πληροφορίες'
        };
      default:
        return {
          primary: 'Κύριο χρώμα',
          secondary: 'Δευτερεύον χρώμα',
          success: 'Χρώμα επιτυχίας',
          warning: 'Χρώμα προειδοποίησης',
          danger: 'Χρώμα κινδύνου',
          info: 'Χρώμα πληροφοριών'
        };
    }
  };

  const colorDescriptions = getColorDescriptions();

  const handleColorChange = (colorKey: string, newValue: ColorWithAlpha | string) => {
    const setter = currentSetters[colorKey];
    if (setter) {
      setter(newValue);

      // Trigger preview
      const previewValue = typeof newValue === 'string' ? newValue :
                          (localAlphaEnabled ? newValue.rgba : newValue.hex);
      startPreview(colorKey, previewValue);
    }
  };

  return (
    <Box>
      {/* Alpha Mode Toggle - Compact Header */}
      <Box className="layera-flex layera-flex--justify-between layera-flex--align-center layera-margin-bottom--lg layera-text--align-center">
        <h3 className="layera-typography" data-size="lg" data-weight="bold" data-color="primary">
          <LayersIcon size="sm" /> Χρώματα {colorCategory.charAt(0).toUpperCase() + colorCategory.slice(1)}
        </h3>
        <Button
          variant={localAlphaEnabled ? 'primary' : 'outline'}
          size="sm"
          onClick={handleAlphaToggle}
        >
          <SettingsIcon size="sm" />
          {localAlphaEnabled ? 'RGBA' : 'HEX'}
        </Button>
      </Box>

      {/* Color Controls - Horizontal Layout ARXES Compliant */}
      <Box
        className="layera-grid--auto-fit-280 layera-margin-bottom--4xl"
      >
        {Object.entries(currentColors || {}).map(([colorKey, colorValue]) => {
          const description = colorDescriptions[colorKey as keyof typeof colorDescriptions] || '';

          // Debug: Εμφάνιση της τρέχουσας κατάστασης του toggle
          console.log('🔍 Rendering color picker for', colorKey, '- alphaEnabled:', localAlphaEnabled);

          if (localAlphaEnabled) {
            // Alpha Mode - Use ColorPickerWithAlpha
            const colorWithAlpha = ensureColorWithAlpha(colorValue);

            return (
              <ColorPickerWithAlpha
                key={`${colorKey}-alpha`}
                label={`${colorKey.charAt(0).toUpperCase() + colorKey.slice(1)} (RGBA)`}
                value={colorWithAlpha}
                onChange={(newValue) => handleColorChange(colorKey, newValue)}
                className="layera-height--auto layera-text--align-center layera-width--auto"
              />
            );
          } else {
            // HEX Mode - Use OptimizedColorPicker (legacy)
            const hexValue = extractHex(colorValue);

            return (
              <OptimizedColorPicker
                key={`${colorKey}-hex`}
                label={`${colorKey.charAt(0).toUpperCase() + colorKey.slice(1)} (HEX)`}
                value={hexValue}
                onChange={(newValue) => handleColorChange(colorKey, newValue)}
                className="layera-height--auto layera-text--align-center"
              />
            );
          }
        })}
      </Box>

    </Box>
  );
});

ColorControlsGridWithAlpha.displayName = 'ColorControlsGridWithAlpha';