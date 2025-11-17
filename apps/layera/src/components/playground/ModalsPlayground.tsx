import React from 'react';
import { Box } from '@layera/layout';
import { Text } from '@layera/typography';
import { CheckIcon, CloseIcon } from '@layera/icons';

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
  hoverEffect = 'normal',
  activeEffect = 'scale'
}) => {

  // Helper function για translation των radius values
  const getRadiusInGreek = (radius: string) => {
    switch(radius) {
      case 'none': return 'χωρίς καμπυλότητα';
      case 'xs': return 'ελαφρά καμπυλότητα';
      case 'sm': return 'μικρή καμπυλότητα';
      case 'md': return 'μεσαία καμπυλότητα';
      case 'lg': return 'μεγάλη καμπυλότητα';
      case 'xl': return 'πολύ μεγάλη καμπυλότητα';
      case 'round': return 'πλήρως στρογγυλά';
      default: return radius;
    }
  };

  // Helper function για translation των hover effects
  const getHoverEffectInGreek = (effect: string) => {
    switch(effect) {
      case 'none': return 'χωρίς hover effect';
      case 'normal': return 'κανονικό hover effect';
      case 'glow': return 'φωτεινό hover effect';
      case 'shadow': return 'σκιώδες hover effect';
      default: return effect;
    }
  };

  // Helper function για translation των active effects
  const getActiveEffectInGreek = (effect: string) => {
    switch(effect) {
      case 'none': return 'χωρίς active effect';
      case 'scale': return 'μεγέθυνση κατά το πάτημα';
      case 'press': return 'πίεση κατά το πάτημα';
      case 'ripple': return 'κύματα κατά το πάτημα';
      default: return effect;
    }
  };

  // Helper function για size translation
  const getSizeInGreek = (size: string) => {
    switch(size) {
      case 'xs': return 'πολύ μικρά';
      case 'sm': return 'μικρά';
      case 'md': return 'μεσαία';
      case 'lg': return 'μεγάλα';
      case 'xl': return 'πολύ μεγάλα';
      default: return size;
    }
  };

  // Helper function για category translation
  const getCategoryInGreek = (category: string) => {
    switch(category.toLowerCase()) {
      case 'backgrounds': return 'ΦΟΝΤΑ';
      case 'text': return 'ΚΕΙΜΕΝΑ';
      case 'borders': return 'ΠΕΡΙΓΡΑΜΜΑΤΑ';
      default: return category.toUpperCase();
    }
  };

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

  // Helper functions same as CardsPlayground
  const getTextColor = (colorValue: string) => {
    if (colorCategory === 'text') return colorValue;
    if (colorCategory === 'backgrounds') {
      return colorValue === '#f59e0b' ? '#000000' : '#ffffff';
    }
    return '#333333';
  };

  const getBackgroundColor = (colorValue: string) => {
    if (colorCategory === 'backgrounds') return colorValue;
    return '#ffffff';
  };

  const getBorderStyle = (colorValue: string) => {
    if (colorCategory === 'borders') {
      const borderWidthToken = `var(--layera-global-borderWidth-${borderWidth})`;
      return `${borderWidthToken} solid ${colorValue}`;
    }
    return '1px solid #e5e5e5';
  };

  const modalStyle = {
    height: 'var(--layera-fontSize-6xl)',
    width: 'calc(var(--layera-fontSize-6xl) * 3)',
    minWidth: 'calc(var(--layera-fontSize-6xl) * 3)',
    maxWidth: 'calc(var(--layera-fontSize-6xl) * 3)',
    borderRadius: 'var(--layera-radius-lg)',
    display: 'flex',
    flexDirection: 'column' as const,
    justifyContent: 'var(--layera-global-justifyContent-center)',
    alignItems: 'var(--layera-global-alignItems-center)',
    position: 'relative' as const,
    boxShadow: 'var(--layera-shadow-md)',
    flex: '0 0 calc(var(--layera-fontSize-6xl) * 3)'
  };

  const modalConfigs = [
    { key: 'primary', title: 'Primary Modal', description: 'Κύριο modal', colorValue: currentColors.primary },
    { key: 'secondary', title: 'Secondary Modal', description: 'Δευτερεύον modal', colorValue: currentColors.secondary },
    { key: 'success', title: 'Success Modal', description: 'Modal επιτυχίας', colorValue: currentColors.success },
    { key: 'warning', title: 'Warning Modal', description: 'Modal προειδοποίησης', colorValue: currentColors.warning },
    { key: 'danger', title: 'Danger Modal', description: 'Modal κινδύνου', colorValue: currentColors.danger },
    { key: 'info', title: 'Info Modal', description: 'Modal πληροφοριών', colorValue: currentColors.info }
  ];

  return (
    <Box>
      <Box className="layera-text-center layera-padding--2xl layera-bg-surface--primary layera-border-radius--lg layera-margin-bottom--xl layera-border--dashed layera-border-width--2 layera-border-color--info">
        <h3 className="layera-typography layera-margin-bottom--sm layera-text--align-center" data-size="lg" data-weight="bold" data-color="primary">
          <CheckIcon size="sm" /> Live Preview: Modals
        </h3>
        <p className="layera-typography layera-margin-bottom--md layera-text--align-center" data-size="sm" data-color="secondary">
          {generateFullDescription()}
        </p>

        <Box className="layera-flex layera-flex--wrap-wrap layera-flex--justify-center layera-flex--align-center layera-flex--gap-md layera-padding-top--lg layera-padding-bottom--lg layera-width--full">
          {modalConfigs.map(({ key, title, description, colorValue }) => (
            <Box
              key={key}
              className="layera-padding--md"
              style={{
                ...modalStyle,
                backgroundColor: getBackgroundColor(colorValue),
                color: getTextColor(colorValue),
                border: getBorderStyle(colorValue)
              }}
            >
              <Box className="layera-flex layera-flex--justify-between layera-flex--align-center">
                <Text className="layera-typography" data-size="sm" data-weight="bold">
                  {title}
                </Text>
                <CloseIcon size="sm" />
              </Box>
              <Text className="layera-typography layera-margin-top--sm layera-opacity--80" data-size="xs">
                {description}
              </Text>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};