import React, { useState } from 'react';
import { Box } from '@layera/layout';
import { Text } from '@layera/typography';
import { Button } from '@layera/buttons';
import { CheckIcon, CloseIcon, BellIcon, SettingsIcon, LocationIcon } from '@layera/icons';
import { useCSSVariables } from '../../hooks/useCSSVariables';
import { PLAYGROUND_HELPERS } from '../../constants/ui-utilities';
import type { ModalTextAlignValue } from './shared/ModalTextAlignControl';
import { VariablesInfoAccordion } from './shared/VariablesInfoAccordion';
import { createModalsVariablesData } from './shared/ModalsVariablesData';
import { getTextColor, getBackgroundColor, getBorderStyle, type ColorCategory } from './shared/types';

/**
 * ModalsPlayground Component
 *
 * Live Preview για modals με δυναμικά χρώματα
 * Εμφανίζει 6 χρωματιστά modals (P, S, Su, W, D, I)
 */

interface ModalsPlaygroundProps {
  currentColors: {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    danger: string;
    info: string;
  };
  colorCategory: string;
  /** Border width for borders category (1, 2, or 3) */
  borderWidth?: number;
  /** Modal radius for styling */
  modalRadius?: string;
  /** Modal size for styling */
  modalSize?: string;
  /** Modal text alignment */
  modalTextAlign?: ModalTextAlignValue;
  /** Hover effect for interactive elements */
  hoverEffect?: string;
  /** Active effect for interactive elements */
  activeEffect?: string;
}

export const ModalsPlayground: React.FC<ModalsPlaygroundProps> = ({
  currentColors,
  colorCategory,
  borderWidth = 2,
  modalRadius = 'lg',
  modalSize = 'md',
  modalTextAlign = 'middle',
  hoverEffect = 'normal',
  activeEffect = 'scale'
}) => {
  // State για το Variables Info Popup
  const [showVariablesPopup, setShowVariablesPopup] = useState(false);

  // Χρησιμοποιούμε τις κεντρικές helper functions από το PLAYGROUND_HELPERS utility
  const { getRadiusInGreek, getHoverEffectInGreek, getActiveEffectInGreek, getSizeInGreek, getCategoryInGreek, getRadiusToken } = PLAYGROUND_HELPERS;

  // Δυναμική δημιουργία πλήρους περιγραφής
  const generateFullDescription = () => {
    const parts = [
      getCategoryInGreek(colorCategory),
      'για modals',
      `μεγέθους ${getSizeInGreek(modalSize)}`
    ];

    // Προσθέτουμε επιπλέον πληροφορίες για borders category
    if (colorCategory === 'borders') {
      parts.push(`με πάχος περιγράμματος ${borderWidth}px`);
    }

    // Προσθέτουμε radius information - ΠΑΝΤΑ
    parts.push(`με ${getRadiusInGreek(modalRadius)}`);

    // Προσθέτουμε hover effect information
    if (hoverEffect && hoverEffect !== 'normal') {
      parts.push(`με ${getHoverEffectInGreek(hoverEffect)}`);
    }

    // Προσθέτουμε active effect information
    if (activeEffect && activeEffect !== 'scale') {
      parts.push(`και ${getActiveEffectInGreek(activeEffect)}`);
    }

    return parts.join(' ');
  };

  // Helper function για text alignment CSS classes - Χρησιμοποιεί κοινές card κλάσεις
  const getModalTextAlignClass = (textAlign: ModalTextAlignValue) => {
    // Κάθετες τιμές χρησιμοποιούν κάθετες CSS classes (από κάρτες)
    if (['top', 'middle', 'bottom'].includes(textAlign)) {
      return `layera-card-text-vertical-${textAlign}`;
    }
    // Οριζόντιες τιμές χρησιμοποιούν οριζόντιες CSS classes (από κάρτες)
    if (['left', 'right'].includes(textAlign)) {
      return `layera-card-text-horizontal-${textAlign}`;
    }
    // Default fallback (από κάρτες)
    return 'layera-card-text-vertical-middle';
  };

  // Helper functions same as CardsPlayground


  // Debug logging





  const modalConfigs = [
    { key: 'primary', title: 'Primary Modal', description: 'Κύριο modal', colorValue: currentColors.primary },
    { key: 'secondary', title: 'Secondary Modal', description: 'Δευτερεύον modal', colorValue: currentColors.secondary },
    { key: 'success', title: 'Success Modal', description: 'Modal επιτυχίας', colorValue: currentColors.success },
    { key: 'warning', title: 'Warning Modal', description: 'Modal προειδοποίησης', colorValue: currentColors.warning },
    { key: 'danger', title: 'Danger Modal', description: 'Modal κινδύνου', colorValue: currentColors.danger },
    { key: 'info', title: 'Info Modal', description: 'Modal πληροφοριών', colorValue: currentColors.info }
  ];

  // Modal configs for rendering

  // ✅ NO INLINE STYLES - Using useCSSVariables hook
  const { actions } = useCSSVariables();

  React.useEffect(() => {
    modalConfigs.forEach(({ key, colorValue }) => {
      actions.applySpecificModalColor(key, colorValue);
    });
  }, [modalConfigs, actions]);

  return (
    <Box className="layera-playground-modals">
      <Box className="layera-text-center layera-padding--2xl layera-bg-surface--primary layera-border-radius--lg layera-margin-bottom--xl layera-border--dashed layera-border-width--2 layera-border-color--info">
        <h3 className="layera-typography layera-margin-bottom--sm layera-text--align-center" data-size="lg" data-weight="bold" data-color="primary">
          <CheckIcon size="sm" /> Live Preview: Modals
        </h3>
        <p className="layera-typography layera-margin-bottom--md layera-text--align-center" data-size="sm" data-color="secondary">
          {generateFullDescription()}
        </p>

        <Box className="global-display-flex global-justifyContent-center global-alignItems-center layera-flex--gap-md layera-padding-top--lg layera-padding-bottom--lg">
          {modalConfigs.map(({ key, title }) => (
            <Box
              key={key}
              className={`layera-card-uniform layera-card ${getModalTextAlignClass(modalTextAlign)}`}
              data-variant={key === 'danger' ? 'error' : key}
            >
              <Text
                className="layera-typography"
                data-size="xs"
                data-weight="bold"
              >
                {title}
              </Text>
            </Box>
          ))}
        </Box>

        {/* Information Icon για Modal Variables */}
        <Box className="layera-text-center layera-margin-top--md">
          <Button
            variant="ghost"
            size="sm"
            icon={<SettingsIcon size="sm" />}
            onClick={() => setShowVariablesPopup(true)}
            className="layera-text--align-center layera-opacity--70 layera-hover--opacity-100"
          >
            Όλες οι Μεταβλητές Modals
          </Button>
        </Box>
      </Box>

      {/* Variables Info Section */}
      {showVariablesPopup && (
        <Box className="layera-margin-top--xl layera-padding--lg layera-bg--surface-primary layera-border-radius--lg layera-border--solid layera-border-width--2 layera-border-color--primary layera-width--full">
            {/* Header */}
            <Box className="layera-flex layera-flex--justify-between layera-flex--align-center layera-margin-bottom--lg">
              <Text className="layera-typography" data-size="2xl" data-weight="bold" data-color="primary">
                <LocationIcon size="sm" /> Όλες οι Μεταβλητές Modals
              </Text>
              <Button
                variant="ghost"
                size="sm"
                icon={<CloseIcon size="sm" />}
                onClick={() => setShowVariablesPopup(false)}
                className="layera-opacity--70 layera-hover--opacity-100"
              >
                ✕
              </Button>
            </Box>

            {/* Accordion Structure για Variables */}
            <Box className="layera-space-y--md layera-margin-bottom--lg">
              <VariablesInfoAccordion
                categories={createModalsVariablesData(
                  colorCategory,
                  borderWidth,
                  modalRadius,
                  modalSize,
                  modalTextAlign,
                  hoverEffect,
                  activeEffect
                )}
                defaultExpandedCategory="backgroundColors"
              />
            </Box>
        </Box>
      )}
    </Box>
  );
};