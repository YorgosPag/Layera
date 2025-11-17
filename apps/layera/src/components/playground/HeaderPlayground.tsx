import React from 'react';
import { Box } from '@layera/layout';
import { Text } from '@layera/typography';
import { CheckIcon, PlusIcon, LocationIcon, MenuIcon, UserIcon, SettingsIcon, SearchIcon } from '@layera/icons';
import { SquareButton } from '@layera/buttons';

/**
 * HeaderPlayground Component
 *
 * Live Preview για headers με δυναμικά χρώματα
 * Εμφανίζει 6 χρωματιστά header sections (P, S, Su, W, D, I)
 */

interface HeaderPlaygroundProps {
  /** Current colors for the selected category */
  currentColors: {
    primary: string;
    secondary: string;
    success: string;
    warning: string;
    danger: string;
    info: string;
  };
  /** Color category for proper styling */
  colorCategory: string;
  /** Border width for borders category (1, 2, or 3) */
  borderWidth?: number;
  /** Header radius for styling */
  headerRadius?: string;
  /** Header size for styling */
  headerSize?: string;
  /** Hover effect for interactive elements */
  hoverEffect?: string;
  /** Active effect for interactive elements */
  activeEffect?: string;
}

export const HeaderPlayground: React.FC<HeaderPlaygroundProps> = ({
  currentColors,
  colorCategory,
  borderWidth = 2,
  headerRadius = 'md',
  headerSize = 'md',
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
      'για headers',
      `μεγέθους ${getSizeInGreek(headerSize)}`
    ];

    // Προσθέτουμε επιπλέον πληροφορίες για borders category
    if (colorCategory === 'borders') {
      parts.push(`με πάχος περιγράμματος ${borderWidth}px`);
    }

    // Προσθέτουμε radius information - ΠΑΝΤΑ
    parts.push(`με ${getRadiusInGreek(headerRadius)}`);

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

  const headerConfigs = [
    { key: 'primary', title: 'Primary Header', description: 'Κύρια επικεφαλίδα', colorValue: currentColors.primary },
    { key: 'secondary', title: 'Secondary Header', description: 'Δευτερεύουσα επικεφαλίδα', colorValue: currentColors.secondary },
    { key: 'success', title: 'Success Header', description: 'Επικεφαλίδα επιτυχίας', colorValue: currentColors.success },
    { key: 'warning', title: 'Warning Header', description: 'Επικεφαλίδα προειδοποίησης', colorValue: currentColors.warning },
    { key: 'danger', title: 'Danger Header', description: 'Επικεφαλίδα κινδύνου', colorValue: currentColors.danger },
    { key: 'info', title: 'Info Header', description: 'Επικεφαλίδα πληροφοριών', colorValue: currentColors.info }
  ];

  // Initialize CSS variables for fallback values - ensure real-time preview has defaults
  React.useEffect(() => {
    const root = document.documentElement;
    headerConfigs.forEach(({ key, colorValue }) => {
      // Set initial CSS variables if not already set by real-time preview
      if (!root.style.getPropertyValue(`--layera-header-bg-${key}`)) {
        root.style.setProperty(`--layera-header-bg-${key}`, getBackgroundColor(colorValue));
        root.style.setProperty(`--layera-header-text-${key}`, getTextColor(colorValue));
        root.style.setProperty(`--layera-header-border-${key}`, getBorderStyle(colorValue));
      }
    });
  }, [headerConfigs, colorCategory, borderWidth]);

  return (
    <Box
      style={{
        paddingLeft: 'var(--layera-size-6)',
        paddingRight: 'var(--layera-size-6)'
      } as React.CSSProperties}
    >
      <Box className="layera-text-center layera-padding--2xl layera-bg-surface--primary layera-border-radius--lg layera-margin-bottom--xl layera-border--dashed layera-border-width--2 layera-border-color--info">
        <h3 className="layera-typography layera-margin-bottom--sm layera-text--align-center" data-size="lg" data-weight="bold" data-color="primary">
          <CheckIcon size="sm" /> Live Preview: Headers
        </h3>
        <p className="layera-typography layera-margin-bottom--md layera-text--align-center" data-size="sm" data-color="secondary">
          {generateFullDescription()}
        </p>

        <Box className="layera-flex layera-flex-column layera-flex--gap-md layera-padding-top--lg layera-padding-bottom--lg layera-width--full">
          {headerConfigs.map(({ key, title, description, colorValue }) => {
            const headerStyle = {
              height: 'var(--layera-fontSize-6xl)',
              borderRadius: `var(--layera-global-borderRadius-${headerRadius})`,
              display: 'flex',
              alignItems: 'var(--layera-global-alignItems-center)',
              justifyContent: 'var(--layera-global-justifyContent-space-between)',
              padding: 'var(--layera-global-spacing-3)',
              // Χρήση CSS variables για real-time preview support
              backgroundColor: `var(--layera-header-bg-${key}, ${getBackgroundColor(colorValue)})`,
              color: `var(--layera-header-text-${key}, ${getTextColor(colorValue)})`,
              border: `var(--layera-header-border-${key}, ${getBorderStyle(colorValue)})`
            };

            return (
              <Box key={key} style={headerStyle}>
                {/* Left section - Logo + Title */}
                <Box className="layera-flex layera-flex--align-center layera-flex--gap-sm">
                  <SquareButton
                    icon={<PlusIcon size="sm" />}
                    aria-label="Προσθήκη"
                    size="md"
                  />
                  <Text
                    className="layera-typography"
                    data-size="sm"
                    data-weight="bold"
                  >
                    {title}
                  </Text>
                </Box>

                {/* Center section - Navigation icons */}
                <Box className="layera-flex layera-flex--align-center layera-flex--gap-sm">
                  <SquareButton
                    icon={<SearchIcon size="md" />}
                    aria-label="Αναζήτηση"
                    size="md"
                  />
                  <SquareButton
                    icon={<LocationIcon size="md" />}
                    aria-label="Τοποθεσία"
                    size="md"
                  />
                  <SquareButton
                    icon={<MenuIcon size="md" />}
                    aria-label="Μενού"
                    size="md"
                  />
                </Box>

                {/* Right section - User actions */}
                <Box className="layera-flex layera-flex--align-center layera-flex--gap-sm">
                  <Text
                    className="layera-typography layera-opacity--80"
                    data-size="xs"
                  >
                    {description}
                  </Text>
                  <SquareButton
                    icon={<UserIcon size="md" />}
                    aria-label="Χρήστης"
                    size="md"
                  />
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};