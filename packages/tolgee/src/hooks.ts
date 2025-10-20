/**
 * @layera/tolgee - React Hooks
 * Custom hooks for Tolgee integration
 */

import { useTranslate, useTolgee } from '@tolgee/react';
import { useCallback } from 'react';

/**
 * Enhanced translation hook with Layera-specific features
 * ΑΝΤΙΚΑΘΙΣΤΑ το παλιό useLayeraTranslation
 */
export function useLayeraTranslation() {
  const { t } = useTranslate('common');
  const tolgee = useTolgee(['language']);
  const lang = tolgee.getLanguage() || 'el';

  // Language switcher function
  const changeLanguage = useCallback(async (newLang: string) => {
    // Store in both keys for compatibility during migration
    localStorage.setItem('i18nextLng', newLang);
    localStorage.setItem('tolgee_language', newLang);

    // Change language in Tolgee WITHOUT reload
    await tolgee.changeLanguage(newLang);

    // Dispatch custom event for other components
    window.dispatchEvent(new CustomEvent('languagechange', {
      detail: { language: newLang }
    }));
  }, [tolgee]);

  // Get available languages
  const languages = {
    el: 'Ελληνικά',
    en: 'English'
  };

  return {
    t,
    i18n: {
      language: lang || 'el',
      changeLanguage,
      languages
    }
  };
}

/**
 * Hook για language detection
 */
export function useDetectedLanguage() {
  // Get language from localStorage or browser
  // Priority:
  // 1. localStorage (for migration compatibility)
  // 2. Browser language
  // 3. Default (Greek)

  const detectedLang =
    localStorage.getItem('tolgee_language') ||
    localStorage.getItem('i18nextLng') ||
    (navigator.language?.startsWith('el') ? 'el' : 'en') ||
    'el';

  return detectedLang;
}

/**
 * Hook για dynamic translations με parameters
 */
export function useDynamicTranslation() {
  const { t } = useTranslate('common');

  const tDynamic = useCallback((key: string, params?: Record<string, any>) => {
    return t(key, params);
  }, [t]);

  return tDynamic;
}

/**
 * Hook για pluralization
 */
export function usePluralTranslation() {
  const { t } = useTranslate('common');

  const tPlural = useCallback((key: string, count: number) => {
    return t(key, { count });
  }, [t]);

  return tPlural;
}

/**
 * Hook για formatted dates/numbers με locale
 */
export function useFormattedTranslation() {
  const lang = useDetectedLanguage();

  const formatDate = useCallback((date: Date) => {
    const locale = lang === 'el' ? 'el-GR' : 'en-US';
    return new Intl.DateTimeFormat(locale).format(date);
  }, [lang]);

  const formatNumber = useCallback((num: number) => {
    const locale = lang === 'el' ? 'el-GR' : 'en-US';
    return new Intl.NumberFormat(locale).format(num);
  }, [lang]);

  const formatCurrency = useCallback((amount: number) => {
    const locale = lang === 'el' ? 'el-GR' : 'en-US';
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  }, [lang]);

  return {
    formatDate,
    formatNumber,
    formatCurrency
  };
}