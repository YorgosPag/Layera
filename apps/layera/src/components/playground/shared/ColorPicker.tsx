import React from 'react';
import { Box } from '@layera/layout';
import { Text } from '@layera/typography';
import { ColorPickerProps } from './types';
import { hexToColorWithAlpha } from '../../../hooks/useColorState';

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
      <h4 className="layera-typography layera-margin-bottom--md" data-size="lg" data-weight="bold" data-color="primary">
        {label}
      </h4>
      <Box
        as="input"
        type="color"
        value={typeof value === 'string' ? value : value.hex}
        onInput={(e: React.FormEvent<HTMLInputElement>) => {
          // Real-time preview while dragging
          if (onPreview) {
            onPreview(hexToColorWithAlpha((e.target as HTMLInputElement).value));
          }
        }}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          // Final commit when selection is done
          onChange(hexToColorWithAlpha(e.target.value));
        }}
        className="layera-input layera-width--full layera-margin-bottom--sm layera-cursor--pointer layera-transition--all"
      />
      <Text className="layera-typography" data-size="sm" data-color="secondary">
        {typeof value === 'string' ? value.toUpperCase() : value.hex.toUpperCase()}
      </Text>
    </Box>
  );
};