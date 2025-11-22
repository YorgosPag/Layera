import React, { useState, useEffect } from 'react';
import { Box } from '@layera/layout';
import { Text } from '@layera/typography';
import { Button } from '@layera/buttons';
import { ColorPickerWithAlpha, ColorWithAlpha } from './shared/ColorPickerWithAlpha';
import { SettingsIcon, LayersIcon } from '@layera/icons';
import { ColorControlsProps } from '../../types/unified-interfaces';
import { useCSSVariables } from '../../hooks/useCSSVariables';

/**
 * ColorControlsGridWithAlpha Component
 *
 * Enhanced Color Controls Grid με Alpha Channel Support
 * - Toggle μεταξύ HEX και RGBA mode
 * - Alpha sliders για διαφάνεια
 * - Backward compatibility με υπάρχον σύστημα
 * - Live preview με transparency effects
 * Props interface moved to unified-interfaces.ts
 */

import type { ButtonState } from '../../hooks/useButtonState.js';

interface ColorControlsGridWithAlphaProps extends ColorControlsProps {
  alphaEnabled?: boolean;
  onAlphaToggle?: (enabled: boolean) => void;
  buttonState?: ButtonState; // Προαιρετικό για backward compatibility
}

export const ColorControlsGridWithAlpha: React.FC<ColorControlsGridWithAlphaProps> = React.memo(({
  currentColors,
  currentSetters = {},
  startPreview = () => {},
  colorCategory = '',
  alphaEnabled = false,
  onAlphaToggle
}) => {
  const [localAlphaEnabled, setLocalAlphaEnabled] = useState(alphaEnabled);

  // ✅ Hook για CSS variables management
  const { actions } = useCSSVariables();

  // Συγχρονισμός με το external prop
  useEffect(() => {
    setLocalAlphaEnabled(alphaEnabled);
  }, [alphaEnabled]);

  const handleAlphaToggle = () => {
    const newState = !localAlphaEnabled;
    setLocalAlphaEnabled(newState);
    onAlphaToggle?.(newState);
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
      const hex = color.startsWith('#') ? color : 'var(--layera-colors-surface-light)';
      if (hex.startsWith('#')) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return {
          hex,
          alpha: 1.0,
          rgba: `rgba(${r}, ${g}, ${b}, 1.0)`
        };
      }
      return {
        hex: 'var(--layera-colors-surface-light)',
        alpha: 1.0,
        rgba: 'color-mix(in srgb, var(--layera-colors-surface-light) 100%, transparent)'
      };
    }
    return color;
  };

  // Helper function: Extract HEX για legacy compatibility
  const extractHex = (color: ColorWithAlpha | string): string => {
    if (typeof color === 'string') {
      // 🎯 Επέστρεψε το αρχικό color value (HEX ή CSS variable)
      return color;
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
      // Convert to string for compatibility
      const stringValue = typeof newValue === 'string' ? newValue :
                         (localAlphaEnabled ? newValue.rgba : newValue.hex);

      setter(stringValue);

      // Trigger preview
      startPreview(colorKey, stringValue);

      // ✅ REAL-TIME BUTTONS UPDATE: Ενημέρωση πλήκτρων όταν είμαστε σε buttons κατηγορία
      if (colorCategory === 'buttons') {
        const capitalizedKey = `${colorKey}Color`;
        actions.applySpecificButtonColor(capitalizedKey, stringValue);
      }
    }
  };

  return (
    <>
      {/* Unified Color Controls Header */}
      <Box className="layera-text--align-center layera-margin-bottom--lg">
        <h3 className="layera-typography layera-margin-bottom--md" data-size="lg" data-weight="bold" data-color="primary">
          <LayersIcon size="sm" /> Χρώματα {colorCategory.charAt(0).toUpperCase() + colorCategory.slice(1)}
        </h3>
        <Text className="layera-typography" data-size="sm" data-color="secondary">
          Color Pickers με Alpha Channel
        </Text>
      </Box>

      {/* Color Controls - Horizontal Layout ARXES Compliant */}
      <Box
        className="layera-grid--auto-fit-280 layera-margin-bottom--4xl"
      >
        {Object.entries(currentColors || {}).map(([colorKey, colorValue]) => {
          const description = colorDescriptions[colorKey as keyof typeof colorDescriptions] || '';

          // Υπολογισμός variant για dynamic card coloring (μόνο για cards + backgrounds)
          // Αφαιρεί το "Color" suffix από το colorKey (π.χ. "primaryColor" → "primary")
          // Special mapping: danger → error (για consistency με CardsPlayground)
          const getVariantFromColorKey = (key: string): string => {
            const baseVariant = key.replace('Color', '').toLowerCase();
            return baseVariant === 'danger' ? 'error' : baseVariant;
          };

          const variant = (colorCategory === 'backgrounds')
            ? getVariantFromColorKey(colorKey)
            : undefined;

          if (localAlphaEnabled) {
            // Alpha Mode - Use ColorPickerWithAlpha
            const colorWithAlpha = ensureColorWithAlpha(colorValue as string);

            return (
              <ColorPickerWithAlpha
                key={colorKey}
                label={`${colorKey.charAt(0).toUpperCase() + colorKey.slice(1)} (RGBA)`}
                value={colorWithAlpha}
                onChange={(newValue) => handleColorChange(colorKey, newValue)}
                onPreview={(previewValue) => {
                  // Real-time preview χωρίς αλλαγή state
                  const previewVal = localAlphaEnabled ? previewValue.rgba : previewValue.hex;
                  startPreview(colorKey, previewVal);

                  // ✅ LIVE BUTTONS PREVIEW: Real-time ενημέρωση πλήκτρων κατά τη κίνηση του slider
                  if (colorCategory === 'buttons') {
                    const capitalizedKey = `${colorKey}Color`;
                    actions.applySpecificButtonColor(capitalizedKey, previewVal);
                  }
                }}
                className="layera-height--auto layera-text--align-center layera-width--auto"
                variant={variant}
                showVariantInfo={!!variant}
              />
            );
          } else {
            // HEX Mode - Use ColorPickerWithAlpha in HEX-only mode
            const hexValue = extractHex(colorValue as string);
            const colorWithAlpha = ensureColorWithAlpha(hexValue);

            return (
              <ColorPickerWithAlpha
                key={colorKey}
                label={`${colorKey.charAt(0).toUpperCase() + colorKey.slice(1)} (HEX)`}
                value={colorWithAlpha}
                onChange={(newValue) => handleColorChange(colorKey, newValue.hex)}
                onPreview={(previewValue) => {
                  // Real-time preview χωρίς αλλαγή state
                  startPreview(colorKey, previewValue.hex);

                  // ✅ LIVE BUTTONS PREVIEW: Real-time ενημέρωση πλήκτρων κατά τη κίνηση του slider
                  if (colorCategory === 'buttons') {
                    const capitalizedKey = `${colorKey}Color`;
                    actions.applySpecificButtonColor(capitalizedKey, previewValue.hex);
                  }
                }}
                className="layera-height--auto layera-text--align-center"
                variant={variant}
                showVariantInfo={!!variant}
              />
            );
          }
        })}
      </Box>

    </>
  );
});

ColorControlsGridWithAlpha.displayName = 'ColorControlsGridWithAlpha';