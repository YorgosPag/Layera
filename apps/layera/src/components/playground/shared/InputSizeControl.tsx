import React from 'react';
import { Box } from '@layera/layout';
import { Text } from '@layera/typography';
import { Button } from '@layera/buttons';
import { SettingsIcon, EditIcon } from '@layera/icons';
import type { InputSizeValue } from '../../../types/sizes';

/**
 * InputSizeControl Component
 *
 * Παρέχει επιλογές μεγέθους input fields για inputs element type
 * - 4 βασικά μεγέθη: xs, sm, md, lg
 * - Βασισμένα στα Material UI, Ant Design, Chakra UI standards
 * - Enterprise responsive design με εικονίδια και καθαρή interface
 * - Compatible με Form density principles (Compact, Standard, Comfortable)
 */

// InputSizeValue moved to unified size system - import from ../../../types/sizes

import type { ButtonState } from '../../../hooks/useButtonState.js';

interface InputSizeControlProps {
  inputSize: InputSizeValue;
  onInputSizeChange: (size: InputSizeValue) => void;
  className?: string;
  /** Real-time preview callback */
  onPreview?: (key: string, value: string) => void;
  /** Button state for sizing */
  buttonState?: ButtonState;
}

export const InputSizeControl: React.FC<InputSizeControlProps> = ({
  inputSize,
  onInputSizeChange,
  className = '',
  onPreview,
  buttonState
}) => {

  // Input size options με περιγραφές
  const inputSizeOptions: { value: InputSizeValue; label: string; description: string }[] = [
    { value: 'xs', label: 'XS', description: 'Compact - High-density forms, dashboards' },
    { value: 'sm', label: 'SM', description: 'Small - Dense forms, data entry screens' },
    { value: 'md', label: 'MD', description: 'Medium - Standard forms, default size' },
    { value: 'lg', label: 'LG', description: 'Large - Accessible, mobile-first, marketing' }
  ];

  const handleSizeChange = (size: InputSizeValue) => {
    onInputSizeChange(size);

    // Trigger real-time preview
    if (onPreview) {
      onPreview('inputSize', size);
    }
  };

  return (
    <Box className={`layera-card layera-padding--lg ${className}`}>
      <h4 className="layera-typography layera-margin-bottom--md" data-size="lg" data-weight="bold" data-color="primary">
        <EditIcon size="sm" /> Μέγεθος Πεδίων Εισαγωγής
      </h4>

      {/* Input Size Selection Buttons */}
      <Box className="layera-flex layera-flex--wrap-wrap layera-flex--gap-md layera-margin-bottom--md layera-flex--justify-center">
        {inputSizeOptions.map((option) => (
          <Button
            key={option.value}
            variant={inputSize === option.value ? 'primary' : 'outline'}
            size={buttonState?.size || 'sm'}
            onClick={() => handleSizeChange(option.value)}
            className={`layera-button layera-button--${buttonState?.size || 'sm'} layera-button--${inputSize === option.value ? 'primary' : 'outline'}`}
          >
            <SettingsIcon size="sm" /> {option.label}
          </Button>
        ))}
      </Box>

      {/* Live Preview Description */}
      <Box className="layera-margin-bottom--sm layera-padding--md layera-bg--surface-secondary layera-text-align--center">
        <Text className="layera-typography" data-size="sm" data-weight="medium" data-color="primary">
          {inputSizeOptions.find(option => option.value === inputSize)?.description}
        </Text>
      </Box>

      {/* Description */}
      <Text className="layera-typography" data-size="sm" data-color="secondary">
        Επιλέξτε το μέγεθος των input fields ανάλογα με τη χρήση και την πυκνότητα της φόρμας
      </Text>
    </Box>
  );
};