import React from 'react';
import { Box } from '@layera/layout';
import { CheckIcon } from '@layera/icons';

// ✅ NO INLINE STYLES - Using only @layera tokens and CSS classes

interface TablesPlaygroundProps {
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
  /** Table radius for styling */
  tableRadius?: string;
  /** Table size for styling */
  tableSize?: string;
  /** Hover effect for interactive elements */
  hoverEffect?: string;
  /** Active effect for interactive elements */
  activeEffect?: string;
}

export const TablesPlayground: React.FC<TablesPlaygroundProps> = ({
  currentColors,
  colorCategory,
  borderWidth = 2,
  tableRadius = 'md',
  tableSize = 'md',
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
      case 'xs': return 'πολύ μικροί';
      case 'sm': return 'μικροί';
      case 'md': return 'μεσαίοι';
      case 'lg': return 'μεγάλοι';
      case 'xl': return 'πολύ μεγάλοι';
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
      'για πίνακες',
      `μεγέθους ${getSizeInGreek(tableSize)}`
    ];

    // Προσθέτουμε επιπλέον πληροφορίες για borders category
    if (colorCategory === 'borders') {
      parts.push(`με πάχος περιγράμματος ${borderWidth}px`);
    }

    // Προσθέτουμε radius information - ΠΑΝΤΑ
    parts.push(`με ${getRadiusInGreek(tableRadius)}`);

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

  // ✅ NO INLINE STYLES - Using CSS classes with @layera tokens
  const getDynamicTableClasses = (colorName: string) => {
    const baseClasses = "layera-box-border layera-border--solid layera-border-color--transparent layera-padding--md layera-border-radius--md layera-flex layera-flex--justify-space-between layera-flex--align-center layera-text--size-sm layera-font-weight--medium";

    switch (colorCategory) {
      case 'backgrounds':
        return `${baseClasses} layera-dynamic-bg layera-text-color--on-dark`;
      case 'text':
        return `${baseClasses} layera-bg--surface-primary layera-dynamic-text`;
      case 'borders':
        return `${baseClasses} layera-bg--surface-primary layera-text-color--primary layera-dynamic-border`;
      default:
        return baseClasses;
    }
  };

  const colors = [
    { name: 'Primary', value: currentColors.primary },
    { name: 'Secondary', value: currentColors.secondary },
    { name: 'Success', value: currentColors.success },
    { name: 'Warning', value: currentColors.warning },
    { name: 'Danger', value: currentColors.danger },
    { name: 'Info', value: currentColors.info }
  ];

  return (
    <Box
      className="layera-padding-left--lg layera-padding-right--lg"
    >
      <Box className="layera-text-center layera-padding--2xl layera-bg-surface--primary layera-border-radius--lg layera-margin-bottom--xl layera-border--dashed layera-border-width--2 layera-border-color--info">
        <h3 className="layera-typography layera-margin-bottom--sm layera-text--align-center" data-size="lg" data-weight="bold" data-color="primary">
          <CheckIcon size="sm" /> Live Preview: Πίνακες
        </h3>
        <p className="layera-typography layera-margin-bottom--md layera-text--align-center" data-size="sm" data-color="secondary">
          {generateFullDescription()}
        </p>

        <Box className="layera-flex layera-flex--column">
          {colors.map((color, index) => (
            <Box
              key={color.name}
              className={`${getDynamicTableClasses(color.name)} ${index === colors.length - 1 ? "" : "layera-margin-bottom--xs"}`}
              data-color-category={colorCategory}
              data-dynamic-color={color.value}
            >
              <span>{color.name} Row</span>
              <span className="layera-opacity--80 layera-fontSize--xs">
                Γραμμή {index + 1}
              </span>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};