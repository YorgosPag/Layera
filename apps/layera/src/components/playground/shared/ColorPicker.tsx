import React from 'react';
import { Box } from '@layera/layout';
import { Text } from '@layera/typography';
import { ColorPickerProps } from './types';

/**
 * ColorPicker - Επαναχρησιμοποιήσιμο component για επιλογή χρωμάτων
 *
 * ARXES Compliant Color Input Component με Real-Time Preview:
 * - Χρησιμοποιεί μόνο @layera layout primitives
 * - Live preview με onInput για real-time updates
 * - onChange για final commits
 * - Enterprise design patterns με smooth UX
 * - TypeScript strict mode
 */
export const ColorPicker: React.FC<ColorPickerProps> = ({
  label,
  value,
  onChange,
  onPreview,
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
        onInput={(e) => {
          // Real-time preview while dragging
          if (onPreview) {
            onPreview((e.target as HTMLInputElement).value);
          }
        }}
        onChange={(e) => {
          // Final commit when selection is done
          onChange(e.target.value);
        }}
        className="layera-input layera-width--full layera-margin-bottom--sm"
        style={{
          cursor: 'pointer',
          transition: 'all 0.2s ease'
        }}
      />
      <Text className="layera-typography" data-size="sm" data-color="secondary">
        {value.toUpperCase()}
      </Text>
    </Box>
  );
};