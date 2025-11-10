'use client';

import React, { forwardRef } from 'react';
import { Box } from '@layera/layout';
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

const SunIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="5"/>
    <path d="M12 1v2"/>
    <path d="M12 21v2"/>
    <path d="m4.22 4.22 1.42 1.42"/>
    <path d="m18.36 18.36 1.42 1.42"/>
    <path d="M1 12h2"/>
    <path d="M21 12h2"/>
    <path d="m4.22 19.78 1.42-1.42"/>
    <path d="m18.36 5.64 1.42-1.42"/>
  </svg>
);

const MoonIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

const SystemIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
    <line x1="8" y1="21" x2="16" y2="21"/>
    <line x1="12" y1="17" x2="12" y2="21"/>
  </svg>
);

export const ThemeSwitcher = forwardRef<HTMLButtonElement, ThemeSwitcherProps>(({
  variant = 'icon',
  size = 'md',
  className = '',
  labels = {
    light: 'Φωτεινό θέμα',
    dark: 'Σκοτεινό θέμα',
    system: 'Σύστημα'
  },
  showLabels = false,
  icons = {
    light: <SunIcon />,
    dark: <MoonIcon />,
    system: <SystemIcon />
  },
  align = 'right',
  ...props
}, ref) => {
  const { theme, resolvedTheme, setTheme, cycleTheme, toggleTheme } = useTheme();

  const [isOpen, setIsOpen] = React.useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (selectedTheme: Theme) => {
    setTheme(selectedTheme);
    setIsOpen(false);
  };

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

  const sizeClasses = {
    sm: 'layera-theme-switcher--sm',
    md: 'layera-theme-switcher--md',
    lg: 'layera-theme-switcher--lg'
  };

  const variantClasses = {
    icon: 'layera-theme-switcher--icon',
    button: 'layera-theme-switcher--button',
    dropdown: 'layera-theme-switcher--dropdown'
  };

  const getCurrentIcon = () => {
    if (theme === 'system') {
      return icons.system;
    }
    return resolvedTheme === 'light' ? icons.light : icons.dark;
  };

  const getCurrentLabel = () => {
    if (theme === 'system') {
      return labels.system;
    }
    return resolvedTheme === 'light' ? labels.light : labels.dark;
  };

  const handleClick = () => {
    if (variant === 'icon') {
      toggleTheme();
    } else {
      cycleTheme();
    }
  };

  const classes = [
    'layera-theme-switcher',
    variantClasses[variant],
    sizeClasses[size],
    className
  ].filter(Boolean).join(' ');

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
              onClick={() => handleSelect('light')}
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
              onClick={() => handleSelect('dark')}
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
              onClick={() => handleSelect('system')}
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