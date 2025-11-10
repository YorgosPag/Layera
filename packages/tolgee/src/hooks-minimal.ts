/**
 * @layera/tolgee - Minimal Hooks
 * Hooks που χρησιμοποιούν το minimal context
 */

import { useCallback } from 'react';
import { useMinimalTolgee } from './provider-minimal';

/**
 * Enhanced translation hook with Layera-specific features
 * ΑΝΤΙΚΑΘΙΣΤΑ το παλιό useLayeraTranslation
 */
export function useLayeraTranslation() {
  const { t, language, changeLanguage } = useMinimalTolgee();

  return {
    t,
    i18n: {
      language,
      changeLanguage,
      languages: {
        el: 'Ελληνικά',
        en: 'English'
      }
    }
  };
}

/**
 * Hook για language detection
 */
export function useDetectedLanguage() {
  const { language } = useMinimalTolgee();
  return language;
}

/**
 * Hook για dynamic translations με parameters
 */
export function useDynamicTranslation() {
  const { t } = useMinimalTolgee();

  const tDynamic = useCallback((key: string, params?: Record<string, unknown>) => {
    return t(key, params);
  }, [t]);

  return tDynamic;
}

/**
 * Hook για pluralization
 */
export function usePluralTranslation() {
  const { t } = useMinimalTolgee();

  const tPlural = useCallback((key: string, count: number) => {
    return t(key, { count });
  }, [t]);

  return tPlural;
}

/**
 * Hook για formatted dates/numbers με locale
 */
export function useFormattedTranslation() {
  const { language } = useMinimalTolgee();

  const formatDate = useCallback((date: Date) => {
    const locale = language === 'el' ? 'el-GR' : 'en-US';
    return new Intl.DateTimeFormat(locale).format(date);
  }, [language]);

  const formatNumber = useCallback((num: number) => {
    const locale = language === 'el' ? 'el-GR' : 'en-US';
    return new Intl.NumberFormat(locale).format(num);
  }, [language]);

  const formatCurrency = useCallback((amount: number) => {
    const locale = language === 'el' ? 'el-GR' : 'en-US';
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  }, [language]);

  return {
    formatDate,
    formatNumber,
    formatCurrency
  };
}