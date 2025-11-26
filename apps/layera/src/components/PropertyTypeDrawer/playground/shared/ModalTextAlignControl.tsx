import React from 'react';
import { Box } from '@layera/layout';
import { Text } from '@layera/typography';
import { Button } from '@layera/buttons';
import { CheckIcon, MoreIcon, EditIcon, ArrowLeftIcon, ArrowRightIcon } from '@layera/icons';

/**
 * ModalTextAlignControl Component
 *
 * Παρέχει επιλογές στοίχισης κειμένου για modals
 * - 4 βασικές επιλογές: left, center, right, justify
 * - Enterprise design με εικονίδια και καθαρή interface
 * - Compatible με modal text-align CSS variables
 */

export type ModalTextAlignValue = 'top' | 'middle' | 'bottom' | 'left' | 'right';

interface ModalTextAlignControlProps {
  textAlign: ModalTextAlignValue;
  onTextAlignChange: (align: ModalTextAlignValue) => void;
  className?: string;
  /** Real-time preview callback */
  onPreview?: (key: string, value: string) => void;
}

export const ModalTextAlignControl: React.FC<ModalTextAlignControlProps> = ({
  textAlign,
  onTextAlignChange,
  className = '',
  onPreview
}) => {

  // Text alignment options με περιγραφές
  const textAlignOptions: {
    value: ModalTextAlignValue;
    label: string;
    description: string;
    icon: React.ReactNode;
  }[] = [
    {
      value: 'top',
      label: 'Top',
      description: 'Κορυφή - Στοίχιση στο επάνω μέρος του modal',
      icon: <CheckIcon size="sm" />
    },
    {
      value: 'middle',
      label: 'Middle',
      description: 'Κέντρο - Κεντρική κάθετη στοίχιση (default)',
      icon: <MoreIcon size="sm" />
    },
    {
      value: 'bottom',
      label: 'Bottom',
      description: 'Κάτω - Στοίχιση στο κάτω μέρος του modal',
      icon: <EditIcon size="sm" />
    },
    {
      value: 'left',
      label: 'Left',
      description: 'Αριστερά - Οριζόντια στοίχιση αριστερά',
      icon: <ArrowLeftIcon size="sm" />
    },
    {
      value: 'right',
      label: 'Right',
      description: 'Δεξιά - Οριζόντια στοίχιση δεξιά',
      icon: <ArrowRightIcon size="sm" />
    }
  ];

  const handleTextAlignChange = (align: ModalTextAlignValue) => {
    onTextAlignChange(align);

    // Trigger real-time preview
    if (onPreview) {
      onPreview('modalTextAlign', align);
    }
  };

  return (
    <Box className={`layera-card layera-padding--lg ${className}`} data-variant="primary">
      <h4 className="layera-typography layera-margin-bottom--md" data-size="lg" data-weight="bold" data-color="primary">
        <MoreIcon size="sm" /> Στοίχιση Κειμένου
      </h4>

      {/* Text Alignment Selection Buttons */}
      <Box className="layera-flex layera-flex--wrap-wrap layera-flex--gap-md layera-margin-bottom--md layera-flex--justify-center">
        {textAlignOptions.map((option, index) => (
          <Button
            key={option.value}
            variant={textAlign === option.value ? 'primary' : 'outline'}
            size="sm"
            onClick={() => handleTextAlignChange(option.value)}
            className={`${index < textAlignOptions.length - 1 ? 'layera-margin-right--sm' : ''} layera-button layera-button--sm layera-button--${textAlign === option.value ? 'primary' : 'outline'}`}
          >
            {option.icon} {option.label}
          </Button>
        ))}
      </Box>

      {/* Live Preview Description */}
      <Box className="layera-margin-bottom--sm layera-padding--md layera-bg--surface-secondary layera-text-align--center">
        <Text className="layera-typography" data-size="sm" data-weight="medium" data-color="primary">
          {textAlignOptions.find(option => option.value === textAlign)?.description}
        </Text>
      </Box>

      {/* Description */}
      <Text className="layera-typography" data-size="sm" data-color="secondary">
        Επιλέξτε τη στοίχιση κειμένου για το modal περιεχόμενο
      </Text>
    </Box>
  );
};