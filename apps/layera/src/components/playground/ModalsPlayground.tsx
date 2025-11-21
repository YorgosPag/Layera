import React from 'react';
import { Box } from '@layera/layout';
import { Text } from '@layera/typography';
import { CheckIcon, CloseIcon } from '@layera/icons';
import { useCSSVariables } from '../../hooks/useCSSVariables';
import { PLAYGROUND_HELPERS } from '../../constants/ui-utilities';
import type { ModalTextAlignValue } from './shared/ModalTextAlignControl';

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

  // Helper function για text alignment CSS classes
  const getModalTextAlignClass = (textAlign: ModalTextAlignValue) => {
    // Κάθετες τιμές χρησιμοποιούν κάθετες CSS classes
    if (['top', 'middle', 'bottom'].includes(textAlign)) {
      return `layera-modal-text-vertical-${textAlign}`;
    }
    // Οριζόντιες τιμές χρησιμοποιούν νέες οριζόντιες CSS classes
    if (['left', 'right'].includes(textAlign)) {
      return `layera-modal-text-horizontal-${textAlign}`;
    }
    // Default fallback
    return 'layera-modal-text-vertical-middle';
  };

  // Helper functions same as CardsPlayground
  const getTextColor = (colorValue: string) => {
    if (colorCategory === 'text') return colorValue;
    if (colorCategory === 'backgrounds') {
      return colorValue === 'var(--layera-colors-primary-warning)' ? 'var(--layera-colors-text-primary)' : 'var(--layera-colors-text-primary)';
    }
    return 'var(--layera-colors-text-secondary)';
  };

  const getBackgroundColor = (colorValue: string) => {
    if (colorCategory === 'backgrounds') return colorValue;
    return 'var(--layera-colors-surface-light)';
  };

  const getBorderStyle = (colorValue: string) => {
    if (colorCategory === 'borders') {
      const borderWidthToken = `var(--layera-spacing-scale-${borderWidth})`;
      return `${borderWidthToken} solid ${colorValue}`;
    }
    return 'var(--layera-spacing-scale-1) solid var(--layera-color-border-primary)';
  };


  // Debug logging
  console.log('🔲 ModalsPlayground: modalRadius prop =', modalRadius);
  console.log('🔲 ModalsPlayground: Final borderRadius =', getRadiusToken(modalRadius));
  console.log('🔲 ModalsPlayground: modalTextAlign =', modalTextAlign);
  console.log('🔲 ModalsPlayground: CSS class =', getModalTextAlignClass(modalTextAlign));

  const modalConfigs = [
    { key: 'primary', title: 'Primary Modal', description: 'Κύριο modal', colorValue: currentColors.primary },
    { key: 'secondary', title: 'Secondary Modal', description: 'Δευτερεύον modal', colorValue: currentColors.secondary },
    { key: 'success', title: 'Success Modal', description: 'Modal επιτυχίας', colorValue: currentColors.success },
    { key: 'warning', title: 'Warning Modal', description: 'Modal προειδοποίησης', colorValue: currentColors.warning },
    { key: 'danger', title: 'Danger Modal', description: 'Modal κινδύνου', colorValue: currentColors.danger },
    { key: 'info', title: 'Info Modal', description: 'Modal πληροφοριών', colorValue: currentColors.info }
  ];

  // 🚨 DEBUG: Modal configs και sizes
  console.log('🚨 DEBUG Modal Configs:', modalConfigs.map(({key, title}) => ({
    key,
    title,
    dataVariant: key === 'danger' ? 'error' : key,
    className: `layera-modal-uniform layera-card ${getModalTextAlignClass(modalTextAlign)}`
  })));

  // ✅ NO INLINE STYLES - Using useCSSVariables hook
  const { actions } = useCSSVariables();

  React.useEffect(() => {
    modalConfigs.forEach(({ key, colorValue }) => {
      actions.applySpecificModalColor(key, colorValue);
    });
  }, [modalConfigs, actions]);

  return (
    <Box>
      <Box className="layera-text-center layera-padding--2xl layera-bg-surface--primary layera-border-radius--lg layera-margin-bottom--xl layera-border--dashed layera-border-width--2 layera-border-color--info">
        <h3 className="layera-typography layera-margin-bottom--sm layera-text--align-center" data-size="lg" data-weight="bold" data-color="primary">
          <CheckIcon size="sm" /> Live Preview: Modals
        </h3>
        <p className="layera-typography layera-margin-bottom--md layera-text--align-center" data-size="sm" data-color="secondary">
          {generateFullDescription()}
        </p>

        <Box className="global-display-flex global-justifyContent-center global-alignItems-center layera-flex--gap-md layera-padding-top--lg layera-padding-bottom--lg">
          {modalConfigs.map(({ key, title, description, colorValue }) => (
            <Box
              key={key}
              className={`layera-modal-uniform layera-card ${getModalTextAlignClass(modalTextAlign)}`}
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
      </Box>
    </Box>
  );
};