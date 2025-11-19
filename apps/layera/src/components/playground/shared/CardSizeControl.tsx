import React from 'react';
import { Box } from '@layera/layout';
import { Text } from '@layera/typography';
import { Button } from '@layera/buttons';
import { SettingsIcon, LayersIcon } from '@layera/icons';
import type { CardSizeValue } from '../../../types/sizes';

/**
 * CardSizeControl Component
 *
 * Παρέχει επιλογές μεγέθους κάρτας για cards element type
 * - 5 βασικά μεγέθη: xs, sm, md, lg, xl
 * - Βασισμένα στα card design tokens του design system
 * - Enterprise responsive design με εικονίδια και καθαρή interface
 * - Compatible με Material Design, Ant Design standards
 */

// CardSizeValue moved to unified size system - import from ../../../types/sizes

import type { ButtonState } from '../../../hooks/useButtonState.js';

interface CardSizeControlProps {
  cardSize: CardSizeValue;
  onCardSizeChange: (size: CardSizeValue) => void;
  className?: string;
  /** Real-time preview callback */
  onPreview?: (key: string, value: string) => void;
  /** Button state for sizing */
  buttonState?: ButtonState;
}

export const CardSizeControl: React.FC<CardSizeControlProps> = ({
  cardSize,
  onCardSizeChange,
  className = '',
  onPreview,
  buttonState
}) => {

  // Card size options με περιγραφές
  const cardSizeOptions: { value: CardSizeValue; label: string; description: string }[] = [
    { value: 'xs', label: 'XS', description: 'Compact cards - Thumbnails, chips' },
    { value: 'sm', label: 'SM', description: 'Small cards - List items, mini cards' },
    { value: 'md', label: 'MD', description: 'Medium cards - Standard content cards' },
    { value: 'lg', label: 'LG', description: 'Large cards - Product cards, featured content' },
    { value: 'xl', label: 'XL', description: 'Extra large - Hero cards, full-width sections' }
  ];

  const handleSizeChange = (size: CardSizeValue) => {
    onCardSizeChange(size);

    // Trigger real-time preview
    if (onPreview) {
      onPreview('cardSize', size);
    }
  };

  return (
    <Box className={`layera-card layera-padding--lg ${className}`}>
      <h4 className="layera-typography layera-margin-bottom--md" data-size="lg" data-weight="bold" data-color="primary">
        <LayersIcon size="sm" /> Μέγεθος Καρτών
      </h4>

      {/* Card Size Selection Buttons */}
      <Box className="layera-flex layera-flex--wrap-wrap layera-flex--gap-md layera-margin-bottom--md layera-flex--justify-center">
        {cardSizeOptions.map((option) => (
          <Button
            key={option.value}
            variant={cardSize === option.value ? 'primary' : 'outline'}
            size={buttonState?.size || 'sm'}
            onClick={() => handleSizeChange(option.value)}
            className={`layera-btn layera-btn--${buttonState?.size || 'sm'} layera-btn--${cardSize === option.value ? 'primary' : 'outline'}`}
          >
            <SettingsIcon size="sm" /> {option.label}
          </Button>
        ))}
      </Box>

      {/* Live Preview Description */}
      <Box className="layera-margin-bottom--sm layera-padding--md layera-bg--surface-secondary layera-text-align--center">
        <Text className="layera-typography" data-size="sm" data-weight="medium" data-color="primary">
          {cardSizeOptions.find(option => option.value === cardSize)?.description}
        </Text>
      </Box>

      {/* Description */}
      <Text className="layera-typography" data-size="sm" data-color="secondary">
        Επιλέξτε το μέγεθος των καρτών ανάλογα με τη χρήση τους στην εφαρμογή
      </Text>
    </Box>
  );
};