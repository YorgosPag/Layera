/**
 * @layera/tolgee - Language Switcher Component
 * Dropdown component για αλλαγή γλώσσας
 * ARXES Compliant - No inline styles, uses CSS classes only
 */

import React from 'react';
import { useLayeraTranslation, useDetectedLanguage } from '../hooks-minimal';
import { LANGUAGES } from '../index';

interface LanguageSwitcherProps {
  className?: string;
  variant?: 'default' | 'compact' | 'button';
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  className,
  variant = 'default'
}) => {
  const { i18n } = useLayeraTranslation();
  const currentLang = useDetectedLanguage();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    i18n.changeLanguage(newLang);
  };

  // ARXES Compliant: Use CSS classes instead of inline styles
  const baseClasses = [
    'layera-language-switcher',
    variant === 'compact' && 'layera-language-switcher--compact',
    variant === 'button' && 'layera-language-switcher--button',
    className
  ].filter(Boolean).join(' ');

  return (
    <select
      value={currentLang}
      onChange={handleLanguageChange}
      className={baseClasses}
      aria-label="Επιλογή γλώσσας"
    >
      {Object.entries(LANGUAGES).map(([code, label]) => (
        <option key={code} value={code}>
          {label}
        </option>
      ))}
    </select>
  );
};