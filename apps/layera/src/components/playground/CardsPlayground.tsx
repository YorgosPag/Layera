import React, { useState } from 'react';
import { Box } from '@layera/layout';
import { Text } from '@layera/typography';
import { Button } from '@layera/buttons';
import { CheckIcon, BellIcon, SettingsIcon, LocationIcon, CloseIcon } from '@layera/icons';
import { PLAYGROUND_HELPERS } from '../../constants/ui-utilities';
import { LayoutPlaygroundProps } from '../../types/unified-interfaces';
import { useCSSVariables } from '../../hooks/useCSSVariables';
import { VariablesInfoAccordion } from './shared/VariablesInfoAccordion';
import { createCardsVariablesData } from './shared/CardsVariablesData';

/**
 * CardsPlayground Component
 *
 * Live Preview για κάρτες με δυναμικά χρώματα
 * Εμφανίζει 6 χρωματιστές κάρτες (P, S, Su, W, D, I)
 * Props interface moved to unified-interfaces.ts
 */

interface ExtendedCardsPlaygroundProps extends LayoutPlaygroundProps {
  /** Card radius for styling */
  cardRadius?: string;
  /** Card size for styling */
  cardSize?: string;
  /** Hover effect for interactive elements */
  hoverEffect?: string;
  /** Active effect for interactive elements */
  activeEffect?: string;
}

export const CardsPlayground: React.FC<ExtendedCardsPlaygroundProps> = ({
  currentColors,
  colorCategory,
  borderWidth = 2,
  cardRadius = 'md',
  cardSize = 'md',
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
      'για κάρτες',
      `μεγέθους ${getSizeInGreek(cardSize)}`
    ];

    // Προσθέτουμε επιπλέον πληροφορίες για borders category
    if (colorCategory === 'borders') {
      parts.push(`με πάχος περιγράμματος ${borderWidth}px`);
    }

    // Προσθέτουμε radius information - ΠΑΝΤΑ
    parts.push(`με ${getRadiusInGreek(cardRadius)}`);

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


  // Card configurations με mapping σε data-variant values
  const cardConfigs = [
    { key: 'primary', title: 'Primary Card', description: 'Κύρια κάρτα', colorValue: currentColors.primary, variant: 'primary' },
    { key: 'secondary', title: 'Secondary Card', description: 'Δευτερεύουσα κάρτα', colorValue: currentColors.secondary, variant: 'secondary' },
    { key: 'success', title: 'Success Card', description: 'Κάρτα επιτυχίας', colorValue: currentColors.success, variant: 'success' },
    { key: 'warning', title: 'Warning Card', description: 'Κάρτα προειδοποίησης', colorValue: currentColors.warning, variant: 'warning' },
    { key: 'danger', title: 'Danger Card', description: 'Κάρτα κινδύνου', colorValue: currentColors.danger, variant: 'error' }, // danger → error
    { key: 'info', title: 'Info Card', description: 'Κάρτα πληροφοριών', colorValue: currentColors.info, variant: 'info' }
  ];

  // ✅ Apply card colors for live preview
  const { actions } = useCSSVariables();

  React.useEffect(() => {
    cardConfigs.forEach(({ key, colorValue }) => {
      actions.applySpecificCardColor(key, colorValue);
    });
  }, [cardConfigs, actions]);

  // ✅ ARXES COMPLIANT: NO CSS injection - Using only @layera tokens
  // Cards use predefined CSS classes with data-variant attributes for semantic theming
  // NO style.setProperty() - ZERO DOM manipulation - ZERO inline styles

  return (
    <Box className="layera-playground-cards">
      {/* Live Preview Area - 6 χρωματιστές κάρτες */}
      <Box className="layera-text-center layera-padding--2xl layera-bg-surface--primary layera-border-radius--lg layera-margin-bottom--xl layera-border--dashed layera-border-width--2 layera-border-color--info">
        <h3 className="layera-typography layera-margin-bottom--sm layera-text--align-center" data-size="lg" data-weight="bold" data-color="primary">
          <CheckIcon size="sm" /> Live Preview: Κάρτες
        </h3>
        <p className="layera-typography layera-margin-bottom--md layera-text--align-center" data-size="sm" data-color="secondary">
          {generateFullDescription()}
        </p>

        <Box className="global-display-flex global-justifyContent-center global-alignItems-center layera-flex--gap-md layera-padding-top--lg layera-padding-bottom--lg">
          {cardConfigs.map(({ key, title, variant }) => (
            <Box
              key={key}
              className="layera-card-uniform layera-card layera-card-text-vertical-middle"
              data-variant={variant}
              data-dynamic-color={cardConfigs.find(config => config.key === key)?.colorValue}
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

        {/* Information Icon για Card Variables */}
        <Box className="layera-text-center layera-margin-top--md">
          <Button
            variant="ghost"
            size="sm"
            icon={<SettingsIcon size="sm" />}
            onClick={() => setShowVariablesPopup(true)}
            className="layera-text--align-center layera-opacity--70 layera-hover--opacity-100"
          >
            Όλες οι Μεταβλητές Καρτών
          </Button>
        </Box>
      </Box>

      {/* Variables Info Section */}
      {showVariablesPopup && (
        <Box className="layera-margin-top--xl layera-padding--lg layera-bg--surface-primary layera-border-radius--lg layera-border--solid layera-border-width--2 layera-border-color--primary layera-width--full">
            {/* Header */}
            <Box className="layera-flex layera-flex--justify-between layera-flex--align-center layera-margin-bottom--lg">
              <Text className="layera-typography" data-size="2xl" data-weight="bold" data-color="primary">
                <LocationIcon size="sm" /> Όλες οι Μεταβλητές Καρτών
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
                categories={createCardsVariablesData(
                  colorCategory,
                  borderWidth,
                  cardRadius,
                  cardSize,
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