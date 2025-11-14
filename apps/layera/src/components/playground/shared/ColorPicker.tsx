import React from 'react';
import { Box } from '@layera/layout';
import { Text } from '@layera/typography';
import { ColorPickerProps } from './types';

/**
 * ColorPicker - Επαναχρησιμοποιήσιμο component για επιλογή χρωμάτων
 *
 * ARXES Compliant Color Input Component:
 * - Χρησιμοποιεί μόνο @layera layout primitives
 * - Καμία inline στυλιστική
 * - Enterprise design patterns
 * - TypeScript strict mode
 */
export const ColorPicker: React.FC<ColorPickerProps> = ({
  label,
  value,
  onChange,
  className = ''
}) => {
  return (
    <Box className={`layera-card layera-padding--lg ${className}`}>
      <h4 className="layera-typography layera-margin-bottom--md" data-size="base" data-weight="semibold" data-color="primary">
        {label}
      </h4>
      <input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="layera-input layera-width--full layera-margin-bottom--sm"
      />
      <Text className="layera-typography" data-size="sm" data-color="secondary">
        {value.toUpperCase()}
      </Text>
    </Box>
  );
};