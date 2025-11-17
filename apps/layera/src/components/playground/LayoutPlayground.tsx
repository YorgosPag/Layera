import React from 'react';
import { Box } from '@layera/layout';
import { Text } from '@layera/typography';
import { CheckIcon } from '@layera/icons';

interface LayoutPlaygroundProps {
  currentColors: {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    danger: string;
    info: string;
  };
  colorCategory: string;
  /** Border width for borders category (0, 1, 2, or 3) */
  borderWidth?: number;
  /** Border radius for borders category ('none', 'xs', 'md', 'lg') */
  borderRadius?: string;
  /** Layout radius for styling */
  layoutRadius?: string;
  /** Layout size for styling */
  layoutSize?: string;
  /** Hover effect for interactive elements */
  hoverEffect?: string;
  /** Active effect for interactive elements */
  activeEffect?: string;
}

export const LayoutPlayground: React.FC<LayoutPlaygroundProps> = ({
  currentColors,
  colorCategory,
  borderWidth = 2,
  borderRadius = 'md',
  layoutRadius = 'md',
  layoutSize = 'md',
  hoverEffect = 'normal',
  activeEffect = 'scale'
}) => {

  // Helper function για translation των radius values
  const getRadiusInGreek = (radius: string) => {
    switch(radius) {
      case 'none': return 'χωρίς καμπυλότητα (0px)';
      case 'sm': return 'ελαφρά καμπυλότητα (4px)';
      case 'lg': return 'μεσαία καμπυλότητα (8px)';
      case 'xl': return 'πολλή καμπυλότητα (12px)';
      case 'xxl': return 'μεγάλη καμπυλότητα (16px)';
      case 'round': return 'πλήρως στρογγυλά';
      default: return radius;
    }
  };

  // Helper function για μετατροπή radius values σε tokens
  const getRadiusToken = (radius: string) => {
    switch(radius) {
      case 'none': return '0px';                        // 0px
      case 'sm': return 'var(--layera-radius-sm)';      // 4px
      case 'lg': return 'var(--layera-radius-lg)';      // 8px - default για layout
      case 'xl': return 'var(--layera-radius-xl)';      // 12px
      case 'xxl': return 'var(--layera-radius-xxl)';    // 16px
      case 'round': return 'var(--layera-radius-full)'; // πλήρως στρογγυλά
      default: return 'var(--layera-radius-lg)';        // 8px fallback
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
      'για τμήματα layout',
      `μεγέθους ${getSizeInGreek(layoutSize)}`
    ];

    // Προσθέτουμε επιπλέον πληροφορίες για borders category
    if (colorCategory === 'borders') {
      parts.push(`με πάχος περιγράμματος ${borderWidth}px`);
    }

    // Προσθέτουμε radius information - ΠΑΝΤΑ
    parts.push(`με ${getRadiusInGreek(layoutRadius)}`);

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

  // Layout section configurations
  // Helper to get text color based on category and color
  const getTextColor = (colorValue: string) => {
    if (colorCategory === 'text') return colorValue;
    if (colorCategory === 'backgrounds') {
      // Dark backgrounds need white text, light backgrounds need black text
      return colorValue === '#f59e0b' ? '#000000' : '#ffffff'; // warning is light, others dark
    }
    return '#333333'; // default for borders
  };

  // Helper to get background color
  const getBackgroundColor = (colorValue: string) => {
    if (colorCategory === 'backgrounds') return colorValue;
    return '#ffffff'; // white background for text and borders
  };

  // Helper to get border style
  const getBorderStyle = (colorValue: string) => {
    if (colorCategory === 'borders') {
      const borderWidthToken = `var(--layera-global-borderWidth-${borderWidth})`;
      return `${borderWidthToken} solid ${colorValue}`;
    }
    return '1px solid #e5e5e5'; // subtle border for others
  };

  const layoutConfigs = [
    { key: 'primary', title: 'Primary', description: 'Layout Section', colorValue: currentColors.primary },
    { key: 'secondary', title: 'Secondary', description: 'Layout Section', colorValue: currentColors.secondary },
    { key: 'success', title: 'Success', description: 'Layout Section', colorValue: currentColors.success },
    { key: 'warning', title: 'Warning', description: 'Layout Section', colorValue: currentColors.warning },
    { key: 'danger', title: 'Danger', description: 'Layout Section', colorValue: currentColors.danger },
    { key: 'info', title: 'Info', description: 'Layout Section', colorValue: currentColors.info }
  ];

  // Initialize CSS variables for fallback values - ensure real-time preview has defaults
  React.useEffect(() => {
    const root = document.documentElement;
    layoutConfigs.forEach(({ key, colorValue }) => {
      // Set initial CSS variables if not already set by real-time preview
      if (!root.style.getPropertyValue(`--layera-layout-bg-${key}`)) {
        root.style.setProperty(`--layera-layout-bg-${key}`, getBackgroundColor(colorValue));
        root.style.setProperty(`--layera-layout-text-${key}`, getTextColor(colorValue));
        root.style.setProperty(`--layera-layout-border-${key}`, getBorderStyle(colorValue));
      }
    });
  }, [layoutConfigs, colorCategory, borderWidth]);

  return (
    <Box
      style={{
        paddingLeft: 'var(--layera-size-6)',
        paddingRight: 'var(--layera-size-6)'
      } as React.CSSProperties}
    >
      <Box className="layera-text-center layera-padding--2xl layera-bg-surface--primary layera-border-radius--lg layera-margin-bottom--xl layera-border--dashed layera-border-width--2 layera-border-color--info">
        <h3 className="layera-typography layera-margin-bottom--sm layera-text--align-center" data-size="lg" data-weight="bold" data-color="primary">
          <CheckIcon size="sm" /> Live Preview: Layout
        </h3>
        <p className="layera-typography layera-margin-bottom--md layera-text--align-center" data-size="sm" data-color="secondary">
          {generateFullDescription()}
        </p>

        <Box className="layera-flex layera-flex--wrap-wrap layera-flex--justify-center layera-flex--align-center layera-flex--gap-md layera-padding-top--lg layera-padding-bottom--lg layera-width--full">
          {layoutConfigs.map(({ key, title, description, colorValue }) => {
            // Debug logging
            console.log('📐 LayoutPlayground: layoutRadius prop =', layoutRadius);
            console.log('📐 LayoutPlayground: Final borderRadius =', getRadiusToken(layoutRadius));

            const baseStyle = {
              padding: 'var(--layera-global-spacing-3)',
              borderRadius: getRadiusToken(layoutRadius),
              height: 'var(--layera-fontSize-6xl)',
              width: 'calc(var(--layera-fontSize-6xl) * 3)',
              minWidth: 'calc(var(--layera-fontSize-6xl) * 3)',
              maxWidth: 'calc(var(--layera-fontSize-6xl) * 3)',
              flex: '0 0 calc(var(--layera-fontSize-6xl) * 3)',
              display: 'flex',
              alignItems: 'var(--layera-global-alignItems-center)',
              justifyContent: 'var(--layera-global-justifyContent-center)',
              // Χρήση CSS variables για real-time preview support
              backgroundColor: `var(--layera-layout-bg-${key}, ${getBackgroundColor(colorValue)})`,
              color: `var(--layera-layout-text-${key}, ${getTextColor(colorValue)})`,
              border: `var(--layera-layout-border-${key}, ${getBorderStyle(colorValue)})`
            };

            return (
              <Box key={key} style={baseStyle}>
                <Box>
                  <Text
                    className="layera-typography layera-margin-bottom--xs"
                    data-size="sm"
                    data-weight="bold"
                  >
                    {title}
                  </Text>
                  <Text
                    className="layera-typography layera-opacity--80"
                    data-size="xs"
                  >
                    {description}
                  </Text>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};