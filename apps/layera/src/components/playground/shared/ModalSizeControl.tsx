import React from 'react';
import { Box } from '@layera/layout';
import { Text } from '@layera/typography';
import { Button } from '@layera/buttons';
import { SettingsIcon, MonitorIcon } from '@layera/icons';
import type { ModalSizeValue } from '../../../types/sizes';

/**
 * ModalSizeControl Component
 *
 * Παρέχει επιλογές μεγέθους modal για modals element type
 * - 6 βασικά μεγέθη: xs, sm, md, lg, xl, full
 * - Βασισμένα στα Material Design, Ant Design standards
 * - Enterprise responsive design με εικονίδια και καθαρή interface
 * - Compatible με Bootstrap, Chakra UI, Mantine modal systems
 */

// ModalSizeValue moved to unified size system - import from ../../../types/sizes

import type { ButtonState } from '../../../hooks/useButtonState.js';

interface ModalSizeControlProps {
  modalSize: ModalSizeValue;
  onModalSizeChange: (size: ModalSizeValue) => void;
  className?: string;
  /** Real-time preview callback */
  onPreview?: (key: string, value: string) => void;
  /** Button state for sizing */
  buttonState?: ButtonState;
}

export const ModalSizeControl: React.FC<ModalSizeControlProps> = ({
  modalSize,
  onModalSizeChange,
  className = '',
  onPreview,
  buttonState
}) => {

  // Modal size options με περιγραφές
  const modalSizeOptions: { value: ModalSizeValue; label: string; description: string }[] = [
    { value: 'xs', label: 'XS', description: 'Alerts, confirmations - "Are you sure?"' },
    { value: 'sm', label: 'SM', description: 'Quick forms - Login, register, contact' },
    { value: 'md', label: 'MD', description: 'Standard modals - Settings, preferences' },
    { value: 'lg', label: 'LG', description: 'Complex forms - Product details, profiles' },
    { value: 'xl', label: 'XL', description: 'Rich content - Galleries, detailed views' },
    { value: 'full', label: 'Full', description: 'Immersive - Video player, fullscreen editor' }
  ];

  const handleSizeChange = (size: ModalSizeValue) => {
    onModalSizeChange(size);

    // Trigger real-time preview
    if (onPreview) {
      onPreview('modalSize', size);
    }
  };

  return (
    <Box className={`layera-card layera-padding--lg ${className}`}>
      <h4 className="layera-typography layera-margin-bottom--md" data-size="lg" data-weight="bold" data-color="primary">
        <MonitorIcon size="sm" /> Μέγεθος Modals
      </h4>

      {/* Modal Size Selection Buttons */}
      <Box className="layera-flex layera-flex--wrap-wrap layera-flex--gap-md layera-margin-bottom--md layera-flex--justify-center">
        {modalSizeOptions.map((option) => (
          <Button
            key={option.value}
            variant={modalSize === option.value ? 'primary' : 'outline'}
            size={buttonState?.size || 'sm'}
            onClick={() => handleSizeChange(option.value)}
            className={`layera-btn layera-btn--${buttonState?.size || 'sm'} layera-btn--${modalSize === option.value ? 'primary' : 'outline'}`}
          >
            <SettingsIcon size="sm" /> {option.label}
          </Button>
        ))}
      </Box>

      {/* Live Preview Description */}
      <Box className="layera-margin-bottom--sm layera-padding--md layera-bg--surface-secondary layera-text-align--center">
        <Text className="layera-typography" data-size="sm" data-weight="medium" data-color="primary">
          {modalSizeOptions.find(option => option.value === modalSize)?.description}
        </Text>
      </Box>

      {/* Description */}
      <Text className="layera-typography" data-size="sm" data-color="secondary">
        Επιλέξτε το μέγεθος των modals ανάλογα με το περιεχόμενο και τη σημαντικότητα
      </Text>
    </Box>
  );
};