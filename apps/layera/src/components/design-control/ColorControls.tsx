import React from 'react';
import { Box } from '@layera/layout';
import { Text } from '@layera/typography';
import { ColorPickerWithAlpha } from '../playground/shared/ColorPickerWithAlpha';
import type { ColorWithAlpha } from '../playground/shared/ColorPickerWithAlpha';

/**
 * ARXES COMPLIANT Color Controls Component
 *
 * 6-Color System από το HTML mockup:
 * - Primary (#4A90E2)
 * - Secondary (#9013FE)
 * - Success (#4CAF50)
 * - Warning (#FF9800)
 * - Danger (#F44336)
 * - Info (#2196F3)
 *
 * Χρησιμοποιεί υπάρχοντα ColorPickerWithAlpha component
 * και tokens από @layera/tokens
 */

interface ColorControlsProps {
  onColorUpdate: (colorType: string, newColor: string) => void;
}

const DEFAULT_COLORS: Record<string, string> = {
  primary: '#4A90E2',
  secondary: '#9013FE',
  success: '#4CAF50',
  warning: '#FF9800',
  danger: '#F44336',
  info: '#2196F3'
};

const COLOR_DESCRIPTIONS: Record<string, string> = {
  primary: 'Κύρια δράση - Call-to-action στοιχεία',
  secondary: 'Δευτερεύοντα στοιχεία - Βοηθητικές ενέργειες',
  success: 'Επιτυχία - Θετικά μηνύματα και confirmations',
  warning: 'Προειδοποίηση - Ειδοποιήσεις προσοχής',
  danger: 'Κίνδυνος - Διαγραφές και σφάλματα',
  info: 'Πληροφορίες - Βοηθητικά μηνύματα'
};

export const ColorControls: React.FC<ColorControlsProps> = ({
  onColorUpdate
}) => {
  const [colors, setColors] = React.useState<Record<string, string>>(DEFAULT_COLORS);

  const handleColorChange = React.useCallback((colorType: string, newColor: ColorWithAlpha | string) => {
    const colorValue = typeof newColor === 'string' ? newColor : newColor.hex;

    setColors(prev => ({
      ...prev,
      [colorType]: colorValue
    }));

    onColorUpdate(colorType, colorValue);
  }, [onColorUpdate]);

  const ensureColorWithAlpha = (colorValue: string): ColorWithAlpha => {
    if (colorValue.startsWith('#')) {
      const r = parseInt(colorValue.slice(1, 3), 16);
      const g = parseInt(colorValue.slice(3, 5), 16);
      const b = parseInt(colorValue.slice(5, 7), 16);
      return {
        hex: colorValue,
        alpha: 1.0,
        rgba: `rgba(${r}, ${g}, ${b}, 1.0)`
      };
    }
    return {
      hex: colorValue,
      alpha: 1.0,
      rgba: colorValue
    };
  };

  return (
    <Box className="layera-flex layera-flex--direction-column layera-flex--gap-md">
      {Object.entries(DEFAULT_COLORS).map(([colorType, defaultColor]) => (
        <Box key={colorType} className="layera-margin-bottom--sm">
          <Text
            className="layera-typography layera-margin-bottom--xs"
            data-size="sm"
            data-weight="semibold"
            data-color="primary"
          >
            {colorType.charAt(0).toUpperCase() + colorType.slice(1)} Color
          </Text>
          <Text
            className="layera-typography layera-margin-bottom--xs"
            data-size="xs"
            data-color="secondary"
          >
            {COLOR_DESCRIPTIONS[colorType]}
          </Text>
          <ColorPickerWithAlpha
            label={`${colorType} color`}
            value={ensureColorWithAlpha(colors[colorType] || defaultColor)}
            onChange={(newValue) => handleColorChange(colorType, newValue)}
            onPreview={(previewValue) => {
              const previewColor = typeof previewValue === 'string' ? previewValue : previewValue.hex;
              onColorUpdate(colorType, previewColor);
            }}
            className="layera-width--full"
            variant={colorType}
            showVariantInfo={true}
          />
        </Box>
      ))}
    </Box>
  );
};