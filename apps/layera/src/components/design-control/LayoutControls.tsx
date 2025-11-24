import React from 'react';
import { Box } from '@layera/layout';
import { Text } from '@layera/typography';

/**
 * ARXES COMPLIANT Layout Controls Component
 *
 * Advanced Layout Controls από το HTML mockup:
 * - Component Gap (16px default)
 * - Padding (16px default)
 * - Border Radius (8px default)
 * - Button Height (36px default)
 * - Button Padding (16px default)
 * - Button Font Size (14px default)
 * - Card Height (120px default)
 * - Modal Width (400px default)
 *
 * Χρησιμοποιεί υπάρχοντα tokens και δεν δημιουργεί νέους
 */

interface LayoutControlsProps {
  onLayoutUpdate: (property: string, value: string | number) => void;
}

const LAYOUT_CONTROLS = [
  { key: 'component-gap', label: 'Component Gap', unit: 'px', min: 4, max: 32, step: 4, defaultValue: 16 },
  { key: 'padding', label: 'Padding', unit: 'px', min: 4, max: 48, step: 4, defaultValue: 16 },
  { key: 'border-radius', label: 'Border Radius', unit: 'px', min: 0, max: 24, step: 2, defaultValue: 8 },
  { key: 'button-height', label: 'Button Height', unit: 'px', min: 28, max: 48, step: 2, defaultValue: 36 },
  { key: 'button-padding', label: 'Button Padding', unit: 'px', min: 8, max: 32, step: 2, defaultValue: 16 },
  { key: 'button-font-size', label: 'Button Font Size', unit: 'px', min: 10, max: 18, step: 1, defaultValue: 14 },
  { key: 'card-height', label: 'Card Height', unit: 'px', min: 80, max: 200, step: 10, defaultValue: 120 },
  { key: 'modal-width', label: 'Modal Width', unit: 'px', min: 300, max: 600, step: 25, defaultValue: 400 }
] as const;

export const LayoutControls: React.FC<LayoutControlsProps> = ({
  onLayoutUpdate
}) => {
  const [values, setValues] = React.useState<Record<string, number>>(
    LAYOUT_CONTROLS.reduce((acc, control) => {
      acc[control.key] = control.defaultValue;
      return acc;
    }, {} as Record<string, number>)
  );

  const handleSliderChange = React.useCallback((key: string, newValue: number) => {
    setValues(prev => ({
      ...prev,
      [key]: newValue
    }));

    onLayoutUpdate(key, newValue);
  }, [onLayoutUpdate]);

  return (
    <Box className="layera-flex layera-flex--direction-column layera-flex--gap-sm">
      {LAYOUT_CONTROLS.map(({ key, label, unit, min, max, step, defaultValue }) => (
        <Box key={key} className="layera-margin-bottom--sm">
          <Box className="layera-flex layera-flex--justify-between layera-margin-bottom--xs">
            <Text
              className="layera-typography"
              data-size="sm"
              data-weight="semibold"
              data-color="primary"
            >
              {label}
            </Text>
            <Text
              className="layera-typography"
              data-size="xs"
              data-color="info"
            >
              {values[key]}{unit}
            </Text>
          </Box>

          {/* Range Input - χρησιμοποιώ μόνο τα υπάρχοντα tokens */}
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={values[key]}
            onChange={(e) => handleSliderChange(key, parseInt(e.target.value))}
            className="layera-input layera-width--full layera-range-input"
          />

          {/* Number Input για ακριβή τιμή - χρησιμοποιώ μόνο τα υπάρχοντα tokens */}
          <input
            type="number"
            min={min}
            max={max}
            step={step}
            value={values[key]}
            onChange={(e) => handleSliderChange(key, parseInt(e.target.value) || defaultValue)}
            className="layera-input layera-width--full layera-margin-top--xs layera-text--align-center layera-number-input"
          />
        </Box>
      ))}
    </Box>
  );
};