'use client';

import React, { forwardRef } from 'react';
import { Box } from '@layera/layout';
// Προσωρινή λύση - χρήση text αντί για icons μέχρι να λυθεί το cache πρόβλημα
// import { HomeIcon, UserIcon, SettingsIcon } from '@layera/icons';
import { useTheme } from '../hooks/useTheme';
import type { ThemeSwitcherProps, Theme } from '../types';

/**
 * ThemeSwitcher Component - Enterprise Theme Toggle για Headers
 *
 * Features:
 * - Πολλαπλά variants: icon, button, dropdown
 * - WCAG 2.1 compliant με proper focus management
 * - Touch-friendly με 44x44px minimum
 * - Built-in icons με fallback στο text
 * - Accessible labels και tooltips
 * - Enterprise styling που integrate με άλλα Layera components
 */

// SST Icons από @layera/icons - Enterprise-grade consistency

export const ThemeSwitcher = forwardRef<HTMLButtonElement, ThemeSwitcherProps>(({
  variant = 'icon',
  size = 'md',
  className = '',
  labels,
  showLabels = false,
  icons = {
    light: <span>☀️</span>,
    dark: <span>🌙</span>,
    system: <span>⚙️</span>
  },
  align = 'right',
  ...props
}, ref) => {
  const { theme, resolvedTheme, setTheme, cycleTheme, toggleTheme } = useTheme();

  // State για dropdown variant - πρέπει να είναι στην αρχή του component
  const [isOpen, setIsOpen] = React.useState(false);

  // Dropdown functions
  const handleToggle = (): void => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (selectedTheme: Theme) => {
    setTheme(selectedTheme);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.layera-theme-switcher--dropdown-container')) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isOpen]);

  // Size classes
  const sizeClasses = {
    sm: 'layera-theme-switcher--sm',
    md: 'layera-theme-switcher--md',
    lg: 'layera-theme-switcher--lg'
  };

  // Variant classes
  const variantClasses = {
    icon: 'layera-theme-switcher--icon',
    button: 'layera-theme-switcher--button',
    dropdown: 'layera-theme-switcher--dropdown'
  };

  // Current theme display
  const getCurrentIcon = (): React.ReactElement => {
    if (theme === 'system') {
      return icons.system;
    }
    return resolvedTheme === 'light' ? icons.light : icons.dark;
  };

  const getCurrentLabel = (): string => {
    if (theme === 'system') {
      return labels?.system || 'System';
    }
    return resolvedTheme === 'light' ? (labels?.light || 'Light') : (labels?.dark || 'Dark');
  };

  // Handle click based on variant
  const handleClick = (): void => {
    if (variant === 'icon') {
      toggleTheme(); // Simple toggle για icon variant
    } else {
      cycleTheme(); // Cycle για button/dropdown variants
    }
  };

  // Base classes
  const classes = [
    'layera-theme-switcher',
    variantClasses[variant],
    sizeClasses[size],
    className
  ].filter(Boolean).join(' ');

  // Icon-only variant (για headers)
  if (variant === 'icon') {
    return (
      <button
        ref={ref}
        type="button"
        className={classes}
        onClick={handleClick}
        aria-label={`Αλλαγή σε ${resolvedTheme === 'light' ? 'σκοτεινό' : 'φωτεινό'} θέμα`}
        title={getCurrentLabel()}
        {...props}
      >
        <span className="layera-theme-switcher__icon" aria-hidden="true">
          {getCurrentIcon()}
        </span>
      </button>
    );
  }

  // Button variant
  if (variant === 'button') {
    return (
      <button
        ref={ref}
        type="button"
        className={classes}
        onClick={handleClick}
        aria-label={`Τρέχον θέμα: ${getCurrentLabel()}. Κλικ για αλλαγή.`}
        {...props}
      >
        <span className="layera-theme-switcher__icon" aria-hidden="true">
          {getCurrentIcon()}
        </span>
        {showLabels && (
          <span className="layera-theme-switcher__label">
            {getCurrentLabel()}
          </span>
        )}
      </button>
    );
  }

  // Dropdown variant (advanced - για settings pages)
  if (variant === 'dropdown') {

    return (
      <Box className={`layera-theme-switcher--dropdown-container ${classes} ${isOpen ? 'layera-theme-switcher--open' : ''}`}>
        <button
          ref={ref}
          type="button"
          className="layera-theme-switcher__trigger"
          onClick={handleToggle}
          aria-label={`Επιλογή θέματος. Τρέχον: ${getCurrentLabel()}`}
          aria-expanded={isOpen}
          aria-haspopup="menu"
          {...props}
        >
          <span className="layera-theme-switcher__icon" aria-hidden="true">
            {getCurrentIcon()}
          </span>
          <span className="layera-theme-switcher__label">
            {getCurrentLabel()}
          </span>
          <span className="layera-theme-switcher__arrow" aria-hidden="true">
            ▼
          </span>
        </button>

        {isOpen && (
          <Box className={`layera-theme-switcher__dropdown layera-theme-switcher__dropdown--${align}`}>
            <button
              type="button"
              className={`layera-theme-switcher__option ${theme === 'light' ? 'layera-theme-switcher__option--active' : ''}`}
              onClick={(): void => handleSelect('light')}
              role="menuitem"
            >
              <span className="layera-theme-switcher__option-icon" aria-hidden="true">
                {icons.light}
              </span>
              <span className="layera-theme-switcher__option-label">
                {labels.light}
              </span>
            </button>

            <button
              type="button"
              className={`layera-theme-switcher__option ${theme === 'dark' ? 'layera-theme-switcher__option--active' : ''}`}
              onClick={(): void => handleSelect('dark')}
              role="menuitem"
            >
              <span className="layera-theme-switcher__option-icon" aria-hidden="true">
                {icons.dark}
              </span>
              <span className="layera-theme-switcher__option-label">
                {labels.dark}
              </span>
            </button>

            <button
              type="button"
              className={`layera-theme-switcher__option ${theme === 'system' ? 'layera-theme-switcher__option--active' : ''}`}
              onClick={(): void => handleSelect('system')}
              role="menuitem"
            >
              <span className="layera-theme-switcher__option-icon" aria-hidden="true">
                {icons.system}
              </span>
              <span className="layera-theme-switcher__option-label">
                {labels.system}
              </span>
            </button>
          </Box>
        )}
      </Box>
    );
  }

  return null;
});

ThemeSwitcher.displayName = 'LayeraThemeSwitcher';