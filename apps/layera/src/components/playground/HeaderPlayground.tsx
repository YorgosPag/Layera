import React, { useState } from 'react';
import { Box } from '@layera/layout';
import { Text } from '@layera/typography';
import { Button, SquareButton } from '@layera/buttons';
import { CheckIcon, PlusIcon, LocationIcon, MenuIcon, UserIcon, SettingsIcon, SearchIcon, BellIcon, CloseIcon } from '@layera/icons';
import { PLAYGROUND_HELPERS } from '../../constants/ui-utilities';
import { VariablesInfoAccordion } from './shared/VariablesInfoAccordion';
import { createHeaderVariablesData } from './shared/HeaderVariablesData';

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
  /** ENTERPRISE: Optional dynamic start items (left side) */
  dynamicStartItems?: React.ReactNode[];
  /** ENTERPRISE: Optional dynamic center items (middle) */
  dynamicCenterItems?: React.ReactNode[];
  /** ENTERPRISE: Optional dynamic end items (right side) */
  dynamicEndItems?: React.ReactNode[];
}

export const HeaderPlayground: React.FC<HeaderPlaygroundProps> = ({
  currentColors,
  colorCategory,
  borderWidth = 2,
  headerRadius = 'md',
  headerSize = 'md',
  hoverEffect = 'normal',
  activeEffect = 'scale',
  dynamicStartItems: _dynamicStartItems,
  dynamicCenterItems: _dynamicCenterItems,
  dynamicEndItems: _dynamicEndItems
}) => {
  // State για το Variables Info Popup
  const [showVariablesPopup, setShowVariablesPopup] = useState(false);

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
    return 'var(--layera-color-surface-primary)'; // white background for text and borders
  };

  // Helper to get border style
  const getBorderStyle = (colorValue: string) => {
    if (colorCategory === 'borders') {
      const borderWidthToken = `var(--layera-spacing-scale-${borderWidth})`;
      return `${borderWidthToken} solid ${colorValue}`;
    }
    return 'var(--layera-spacing-scale-1) solid var(--layera-color-border-primary)'; // subtle border for others
  };

  // ENTERPRISE: Helper to render flexible header sections
  const renderHeaderSection = (
    position: 'start' | 'center' | 'end',
    dynamicItems: React.ReactNode[] | undefined,
    fallbackContent: React.ReactNode,
    justifyClass: string
  ) => {
    return (
      <Box className={`layera-flex layera-flex--align-center layera-flex--gap-2 ${justifyClass}`}>
        {dynamicItems && dynamicItems.length > 0 ? (
          // ENTERPRISE: Use dynamic items when provided
          dynamicItems.map((item, index) => (
            <Box key={`dynamic-${position}-${index}`} className="layera-flex--shrink-0">
              {item}
            </Box>
          ))
        ) : (
          // FALLBACK: Use existing hardcoded content
          fallbackContent
        )}
      </Box>
    );
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
      <Box className="layera-padding--lg layera-text--align-center layera-margin-top--2xl layera-margin-bottom--xl">
        <h3 className="layera-typography layera-margin-bottom--sm layera-text--align-center" data-size="xs" data-weight="bold" data-color="primary">
          <CheckIcon size="sm" /> Live Preview: Headers
        </h3>
        <p className="layera-typography layera-margin-bottom--md layera-text--align-center" data-size="xs" data-color="secondary">
          {generateFullDescription()}
        </p>

        <Box className="layera-flex layera-flex--direction-column layera-space-y--md layera-padding-top--lg layera-padding-bottom--lg">
          {headerConfigs.map(({ key, title, description: _description, colorValue }) => {


            return (
              <Box
                key={key}
                data-header-key={key}
                className="layera-padding-y--1 layera-padding-x--2 layera-margin-x--2 layera-margin-top--0 layera-flex layera-flex--align-center layera-flex--justify-space-between layera-margin-bottom--0 layera-border-radius--md layera-bg--surface-primary layera-position--relative layera-width--full"
                data-background-color={getBackgroundColor(colorValue)}
                data-text-color={getTextColor(colorValue)}
                data-border-style={getBorderStyle(colorValue)}
                data-border-radius={getRadiusToken(headerRadius)}
              >
                {/* ENTERPRISE: 3-Zone Header Structure */}
                {renderHeaderSection(
                  'start',
                  _dynamicStartItems,
                  <>
                    <SquareButton icon={<PlusIcon size="xs" />} size="xs" aria-label="Add" />
                    <Text className="layera-typography" data-size="xs" data-weight="bold">{title}</Text>
                  </>,
                  'layera-flex--shrink-0 layera-min-width--24'
                )}

                {renderHeaderSection(
                  'center',
                  _dynamicCenterItems,
                  <>
                    <SquareButton icon={<SearchIcon size="xs" />} size="xs" aria-label="Search" />
                    <SquareButton icon={<LocationIcon size="xs" />} size="xs" aria-label="Location" />
                    <SquareButton icon={key === 'primary' ? <MenuIcon size="xs" /> : <BellIcon size="xs" />} size="xs" aria-label={key === 'primary' ? 'Menu' : 'Notifications'} />
                  </>,
                  'layera-position--absolute layera-left--50 layera-transform--translateX-neg-50'
                )}

                {renderHeaderSection(
                  'end',
                  _dynamicEndItems,
                  <>
                    <SquareButton icon={<UserIcon size="xs" />} size="xs" aria-label="User" />
                  </>,
                  'layera-flex--shrink-0 layera-min-width--12'
                )}
              </Box>
            );
          })}
        </Box>

        {/* Information Icon για Header Variables */}
        <Box className="layera-text-center layera-margin-top--md">
          <Button
            variant="ghost"
            size="xs"
            icon={<SettingsIcon size="sm" />}
            onClick={() => setShowVariablesPopup(true)}
            className="layera-text--align-center layera-opacity--70 layera-hover--opacity-100"
          >
            Όλες οι Μεταβλητές Headers
          </Button>
        </Box>
      </Box>

      {/* Variables Info Section */}
      {showVariablesPopup && (
        <Box className="layera-margin-top--xl layera-padding--lg layera-bg--surface-primary layera-border-radius--lg layera-border--solid layera-border-width--2 layera-border-color--primary">
            {/* Header */}
            <Box className="layera-flex layera-flex--justify-between layera-flex--align-center layera-margin-bottom--lg">
              <Text className="layera-typography" data-size="2xl" data-weight="bold" data-color="primary">
                <LocationIcon size="xs" /> Όλες οι Μεταβλητές Headers
              </Text>
              <Button
                variant="ghost"
                size="xs"
                icon={<CloseIcon size="xs" />}
                onClick={() => setShowVariablesPopup(false)}
                className="layera-opacity--70 layera-hover--opacity-100"
              >
                ✕
              </Button>
            </Box>

            {/* Accordion Structure για Variables */}
            <Box className="layera-space-y--md layera-margin-bottom--lg">
              <VariablesInfoAccordion
                categories={createHeaderVariablesData(
                  colorCategory,
                  borderWidth,
                  headerRadius,
                  headerSize,
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

/**
 * ENTERPRISE HELPER FUNCTIONS
 * Για εύκολη δημιουργία dynamic header content
 * Χρησιμοποιούν ΜΟΝΟ υπάρχουσες @layera μεταβλητές
 */

// Helper για δημιουργία εικονιδίων
export const createHeaderIcon = (icon: React.ReactNode, ariaLabel: string, onClick?: () => void): React.ReactNode => (
  <SquareButton
    icon={icon}
    onClick={onClick}
    size="xs"
    aria-label={ariaLabel}
  />
);

// Helper για δημιουργία κειμένων
export const createHeaderText = (text: string, size: 'xs' | 'sm' | 'md' | 'lg' = 'sm', weight: 'normal' | 'medium' | 'bold' = 'medium'): React.ReactNode => (
  <Text
    className="layera-typography"
    data-size={size}
    data-weight={weight}
  >
    {text}
  </Text>
);

// Helper για δημιουργία inputs
export const createHeaderInput = (
  placeholder: string,
  onChange?: (value: string) => void,
  type: 'text' | 'search' | 'email' = 'text'
): React.ReactNode => (
  <input
    type={type}
    placeholder={placeholder}
    className="layera-input layera-input--sm layera-min-width--20 layera-max-width--32 layera-border--solid layera-border-width--1 layera-border-color--primary layera-border-radius--md layera-padding-y--1 layera-padding-x--2 layera-font-size--sm layera-bg--surface-primary"
    onChange={(e) => onChange?.(e.target.value)}
  />
);

// Helper για δημιουργία custom button
export const createHeaderButton = (
  text: string,
  onClick?: () => void,
  variant: 'primary' | 'secondary' | 'outline' | 'ghost' = 'outline',
  size: 'xs' | 'sm' | 'md' = 'sm'
): React.ReactNode => (
  <Button
    variant={variant}
    size={size}
    onClick={onClick}
    className="layera-button"
  >
    {text}
  </Button>
);