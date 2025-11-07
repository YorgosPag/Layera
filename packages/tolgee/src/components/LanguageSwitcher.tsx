/**
 * @layera/tolgee - Language Switcher Component
 * Dropdown component για αλλαγή γλώσσας με SST Select integration
 */

import React from 'react';
import { useLayeraTranslation, useDetectedLanguage } from '../hooks-minimal';
import { LANGUAGES } from '../index';
import { Select } from '@layera/forms';

interface LanguageSwitcherProps {
  className?: string;
  variant?: 'toggle' | 'dropdown';
  showFlags?: boolean;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  className,
  variant = 'dropdown',
  showFlags = false
}) => {
  const { i18n } = useLayeraTranslation();
  const currentLang = useDetectedLanguage();

  const handleLanguageChange = (value: string) => {
    i18n.changeLanguage(value);
  };

  // Convert LANGUAGES object to Select options format
  const languageOptions = Object.entries(LANGUAGES).map(([code, label]) => ({
    value: code,
    label: showFlags ? `${code === 'el' ? '🇬🇷' : '🇺🇸'} ${label}` : label
  }));

  return (
    <Select
      value={currentLang}
      onChange={handleLanguageChange}
      options={languageOptions}
      className={className}
      size="medium"
      variant="outline"
    />
  );
};