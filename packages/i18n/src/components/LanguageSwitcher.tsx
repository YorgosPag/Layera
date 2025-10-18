import React, { useState, useEffect } from 'react';
import { useLayeraTranslation } from '../hooks/useLayeraTranslation';
import type { SupportedLanguage } from '../config';

interface LanguageSwitcherProps {
  className?: string;
  variant?: 'dropdown' | 'toggle' | 'buttons';
  showFlags?: boolean;
  align?: 'left' | 'right' | 'center';
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
  align = 'right',
}: LanguageSwitcherProps) {
  const { currentLanguage, changeLanguage, availableLanguages } = useLayeraTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (language: SupportedLanguage) => {
    changeLanguage(language);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.language-switcher-dropdown-container')) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [isOpen]);

  if (variant === 'dropdown') {
    return (
      <div className={`language-switcher-dropdown-container ${className} ${isOpen ? 'language-switcher--open' : ''}`}>
        <button
          type="button"
          className="language-switcher__trigger"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={`Select language. Current: ${languageLabels[currentLanguage]}`}
          aria-expanded={isOpen}
          aria-haspopup="menu"
        >
          <span className="language-switcher__icon" aria-hidden="true">
            {showFlags && languageFlags[currentLanguage]}
          </span>
          <span className="language-switcher__label">
            {languageLabels[currentLanguage]}
          </span>
          <span className="language-switcher__arrow" aria-hidden="true">
            ▼
          </span>
        </button>

        {isOpen && (
          <div className={`language-switcher__dropdown language-switcher__dropdown--${align}`}>
            {availableLanguages.map((lang) => (
              <button
                key={lang}
                type="button"
                className={`language-switcher__option ${currentLanguage === lang ? 'language-switcher__option--active' : ''}`}
                onClick={() => handleLanguageChange(lang)}
                role="menuitem"
              >
                <span className="language-switcher__option-icon" aria-hidden="true">
                  {showFlags && languageFlags[lang]}
                </span>
                <span className="language-switcher__option-label">
                  {languageLabels[lang]}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
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