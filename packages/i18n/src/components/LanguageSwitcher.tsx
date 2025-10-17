import React from 'react';
import { useLayeraTranslation } from '../hooks/useLayeraTranslation';
import type { SupportedLanguage } from '../config';

interface LanguageSwitcherProps {
  className?: string;
  variant?: 'dropdown' | 'toggle' | 'buttons';
  showFlags?: boolean;
}

const languageLabels: Record<SupportedLanguage, string> = {
  el: 'Ελληνικά',
  en: 'English',
};

const languageFlags: Record<SupportedLanguage, string> = {
  el: '🇬🇷',
  en: '🇺🇸',
};

export function LanguageSwitcher({
  className = '',
  variant = 'dropdown',
  showFlags = true,
}: LanguageSwitcherProps) {
  const { currentLanguage, changeLanguage, availableLanguages } = useLayeraTranslation();

  const handleLanguageChange = (language: SupportedLanguage) => {
    changeLanguage(language);
  };

  if (variant === 'dropdown') {
    return (
      <select
        value={currentLanguage}
        onChange={(e) => handleLanguageChange(e.target.value as SupportedLanguage)}
        className={`language-switcher ${className}`}
        aria-label="Select language"
      >
        {availableLanguages.map((lang) => (
          <option key={lang} value={lang}>
            {showFlags && languageFlags[lang]} {languageLabels[lang]}
          </option>
        ))}
      </select>
    );
  }

  if (variant === 'toggle') {
    return (
      <button
        onClick={() => {
          const nextLang = currentLanguage === 'el' ? 'en' : 'el';
          handleLanguageChange(nextLang);
        }}
        className={`language-toggle ${className}`}
        aria-label="Toggle language"
      >
        {showFlags && languageFlags[currentLanguage]} {languageLabels[currentLanguage]}
      </button>
    );
  }

  if (variant === 'buttons') {
    return (
      <div className={`language-buttons ${className}`}>
        {availableLanguages.map((lang) => (
          <button
            key={lang}
            onClick={() => handleLanguageChange(lang)}
            className={`language-button ${currentLanguage === lang ? 'active' : ''}`}
            aria-label={`Switch to ${languageLabels[lang]}`}
          >
            {showFlags && languageFlags[lang]} {languageLabels[lang]}
          </button>
        ))}
      </div>
    );
  }

  return null;
}

export default LanguageSwitcher;