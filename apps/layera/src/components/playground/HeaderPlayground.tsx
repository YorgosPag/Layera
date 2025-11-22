import React from 'react';
import { Box } from '@layera/layout';
import { Text } from '@layera/typography';
import { CheckIcon, PlusIcon, LocationIcon, MenuIcon, UserIcon, SettingsIcon, SearchIcon } from '@layera/icons';
import { SquareButton } from '@layera/buttons';
import { PLAYGROUND_HELPERS } from '../../constants/ui-utilities';

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

  // Χρησιμοποιούμε τις κεντρικές helper functions από το PLAYGROUND_HELPERS utility
  const { getRadiusInGreek, getRadiusToken, getHoverEffectInGreek, getActiveEffectInGreek, getSizeInGreek, getCategoryInGreek } = PLAYGROUND_HELPERS;

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
      return colorValue === 'var(--layera-colors-primary-warning)' ? 'var(--layera-colors-text-primary)' : 'var(--layera-colors-text-primary)'; // warning is light, others dark
    }
    return 'var(--layera-colors-text-secondary)'; // default for borders
  };

  // Helper to get background color
  const getBackgroundColor = (colorValue: string) => {
    if (colorCategory === 'backgrounds') return colorValue;
    return 'var(--layera-colors-surface-light)'; // white background for text and borders
  };

  // Helper to get border style
  const getBorderStyle = (colorValue: string) => {
    if (colorCategory === 'borders') {
      const borderWidthToken = `var(--layera-spacing-scale-${borderWidth})`;
      return `${borderWidthToken} solid ${colorValue}`;
    }
    return 'var(--layera-spacing-scale-1) solid var(--layera-color-border-primary)'; // subtle border for others
  };

  const headerConfigs = [
    { key: 'primary', title: 'Primary Header', description: 'Κύρια επικεφαλίδα', colorValue: currentColors.primary },
    { key: 'secondary', title: 'Secondary Header', description: 'Δευτερεύουσα επικεφαλίδα', colorValue: currentColors.secondary },
    { key: 'success', title: 'Success Header', description: 'Επικεφαλίδα επιτυχίας', colorValue: currentColors.success },
    { key: 'warning', title: 'Warning Header', description: 'Επικεφαλίδα προειδοποίησης', colorValue: currentColors.warning },
    { key: 'danger', title: 'Danger Header', description: 'Επικεφαλίδα κινδύνου', colorValue: currentColors.danger },
    { key: 'info', title: 'Info Header', description: 'Επικεφαλίδα πληροφοριών', colorValue: currentColors.info }
  ];

  // ✅ ARXES COMPLIANT: NO CSS injection - Using only @layera tokens
  // Headers use predefined CSS classes with data attributes for theming
  // NO style.setProperty() - ZERO DOM manipulation

  return (
    <Box>
      <Box className="layera-text-center layera-padding--2xl layera-bg-surface--primary layera-border-radius--lg layera-margin-bottom--xl layera-border--dashed layera-border-width--2 layera-border-color--info">
        <h3 className="layera-typography layera-margin-bottom--sm layera-text--align-center" data-size="lg" data-weight="bold" data-color="primary">
          <CheckIcon size="sm" /> Live Preview: Headers
        </h3>
        <p className="layera-typography layera-margin-bottom--md layera-text--align-center" data-size="sm" data-color="secondary">
          {generateFullDescription()}
        </p>

        <Box className="layera-flex layera-flex-column layera-flex--gap-md layera-padding-top--lg layera-padding-bottom--lg layera-width--full">
          {headerConfigs.map(({ key, title, description, colorValue }) => {
            // Debug logging
            console.log('HeaderPlayground: headerRadius prop =', headerRadius);
            console.log('HeaderPlayground: Final borderRadius =', getRadiusToken(headerRadius));


            return (
              <Box
                key={key}
                className="layera-height--6xl layera-flex layera-flex--align-center layera-flex--justify-space-between layera-padding--md layera-header--dynamic"
                data-dynamic-bg={getBackgroundColor(colorValue)}
                data-dynamic-text={getTextColor(colorValue)}
                data-dynamic-border={getBorderStyle(colorValue)}
                data-dynamic-radius={getRadiusToken(headerRadius)}
              >
                {/* Left section - Logo + Title */}
                <Box className="layera-flex layera-flex--align-center layera-flex--gap-sm">
                  <SquareButton
                    icon={<PlusIcon size="sm" />}
                    aria-label="Προσθήκη"
                    size="md"
                  />
                  <Text
                    className="layera-typography layera-text--align-center"
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
                    className="layera-typography layera-opacity--80 layera-text--align-center"
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