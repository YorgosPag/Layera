/**
 * @layera/tolgee - Language Switcher Component
 * Dropdown component για αλλαγή γλώσσας
 */

import React from 'react';
import { useLayeraTranslation, useDetectedLanguage } from '../hooks-minimal';
import { LANGUAGES } from '../index';

interface LanguageSwitcherProps {
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ className }) => {
  const { i18n } = useLayeraTranslation();
  const currentLang = useDetectedLanguage();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value;
    i18n.changeLanguage(newLang);
  };

  return (
    <select
      value={currentLang}
      onChange={handleLanguageChange}
      className={`
        px-3 py-1.5 rounded-lg border border-gray-300 dark:border-gray-600
        bg-white dark:bg-gray-800
        text-sm font-medium text-gray-700 dark:text-gray-200
        hover:bg-gray-50 dark:hover:bg-gray-700
        focus:outline-none focus:ring-2 focus:ring-blue-500
        cursor-pointer transition-colors
        ${className || ''}
      `}
    >
      {Object.entries(LANGUAGES).map(([code, label]) => (
        <option key={code} value={code}>
          {label}
        </option>
      ))}
    </select>
  );
};