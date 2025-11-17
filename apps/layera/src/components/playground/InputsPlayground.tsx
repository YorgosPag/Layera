import React from 'react';
import { Box } from '@layera/layout';
import { Text } from '@layera/typography';
import { CheckIcon } from '@layera/icons';

interface InputsPlaygroundProps {
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
  /** Input radius for styling */
  inputRadius?: string;
  /** Input size for styling */
  inputSize?: string;
  /** Hover effect for interactive elements */
  hoverEffect?: string;
  /** Active effect for interactive elements */
  activeEffect?: string;
}

export const InputsPlayground: React.FC<InputsPlaygroundProps> = ({
  currentColors,
  colorCategory,
  borderWidth = 2,
  inputRadius = 'md',
  inputSize = 'md',
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
      'για πεδία εισόδου',
      `μεγέθους ${getSizeInGreek(inputSize)}`
    ];

    // Προσθέτουμε επιπλέον πληροφορίες για borders category
    if (colorCategory === 'borders') {
      parts.push(`με πάχος περιγράμματος ${borderWidth}px`);
    }

    // Προσθέτουμε radius information - ΠΑΝΤΑ
    parts.push(`με ${getRadiusInGreek(inputRadius)}`);

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

  // Input field configurations
  const inputConfigs = [
    { key: 'primary', label: 'Primary Input', placeholder: 'Primary πεδίο', colorValue: currentColors.primary },
    { key: 'secondary', label: 'Secondary Input', placeholder: 'Secondary πεδίο', colorValue: currentColors.secondary },
    { key: 'success', label: 'Success Input', placeholder: 'Success πεδίο', colorValue: currentColors.success },
    { key: 'warning', label: 'Warning Input', placeholder: 'Warning πεδίο', colorValue: currentColors.warning },
    { key: 'danger', label: 'Danger Input', placeholder: 'Danger πεδίο', colorValue: currentColors.danger },
    { key: 'info', label: 'Info Input', placeholder: 'Info πεδίο', colorValue: currentColors.info }
  ];

  // Helper function για conversion του inputRadius σε tokens
  const getInputRadiusToken = (radius: string) => {
    switch(radius) {
      case 'none': return '0px';                        // 0px
      case 'sm': return 'var(--layera-radius-sm)';      // 4px
      case 'lg': return 'var(--layera-radius-lg)';      // 8px - default για inputs
      case 'xl': return 'var(--layera-radius-xl)';      // 12px
      case 'xxl': return 'var(--layera-radius-xxl)';    // 16px
      default: return 'var(--layera-radius-lg)';        // 8px fallback
    }
  };

  const getInputStyle = (colorValue: string) => {
    const baseStyle = {
      padding: 'var(--layera-global-spacing-4)',
      borderRadius: getInputRadiusToken(inputRadius),
      fontSize: 'var(--layera-fontSize-md)',
      width: '100%',
      minWidth: '180px',
      height: '48px',
      outline: 'none',
      textAlign: 'center' as const
    };

    switch (colorCategory) {
      case 'backgrounds':
        return {
          ...baseStyle,
          backgroundColor: colorValue,
          color: colorValue === 'var(--layera-icon-colorWarning)' ? 'var(--layera-color-text-primary)' : 'var(--layera-color-text-on-dark)',
          border: 'var(--layera-global-borderWidth-1) solid var(--layera-border-primary)'
        };
      case 'text':
        return {
          ...baseStyle,
          backgroundColor: 'var(--layera-color-surface-primary)',
          color: colorValue,
          border: 'var(--layera-global-borderWidth-1) solid var(--layera-border-primary)'
        };
      case 'borders':
        return {
          ...baseStyle,
          backgroundColor: 'var(--layera-color-surface-primary)',
          color: 'var(--layera-color-text-primary)',
          border: `var(--layera-global-borderWidth-${borderWidth}) solid ${colorValue}`
        };
      default:
        return baseStyle;
    }
  };

  return (
    <Box
      style={{
        paddingLeft: 'var(--layera-size-6)',
        paddingRight: 'var(--layera-size-6)'
      } as React.CSSProperties}
    >
      <Box className="layera-text-center layera-padding--2xl layera-bg-surface--primary layera-border-radius--lg layera-margin-bottom--xl layera-border--dashed layera-border-width--2 layera-border-color--info">
        <h3 className="layera-typography layera-margin-bottom--sm layera-text--align-center" data-size="lg" data-weight="bold" data-color="primary">
          <CheckIcon size="sm" /> Live Preview: Πεδία
        </h3>
        <p className="layera-typography layera-margin-bottom--md layera-text--align-center" data-size="sm" data-color="secondary">
          {generateFullDescription()}
        </p>

        <Box
          className="layera-flex layera-flex--wrap-wrap layera-flex--gap-lg layera-flex--justify-center layera-flex--align-center layera-padding--lg layera-width--full"
        >
          {inputConfigs.map(({ key, label, placeholder, colorValue }, index) => (
            <Box
              key={key}
              className="layera-width--200 layera-text-align--center layera-margin-bottom--md"
            >
              <input
                type="text"
                placeholder={placeholder}
                style={getInputStyle(colorValue)}
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};