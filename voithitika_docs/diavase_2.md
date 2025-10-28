C:\layera\packages\error-boundary\src\constants\i18nKeys.ts
  5,20: export const ERROR_I18N_KEYS = {

C:\layera\packages\error-boundary\src\constants\index.ts
  6,18: export * from './i18nKeys';

C:\layera\packages\geocoding\src\hooks\useGeocode.ts
  31,36:       return localStorage.getItem('i18nextLng') || 'el';
  65,24:       // ΣΗΜΑΝΤΙΚΟ: Το i18nextLng (legacy key) μπορεί να είναι 'el' ή 'en', όχι 'el-GR' ή 'en-US'
  66,80:       const storedLang = typeof window !== 'undefined' ? localStorage.getItem('i18nextLng') : null;
  140,49:       const newLanguage = localStorage.getItem('i18nextLng') || 'el';
  162,45:       const newLang = localStorage.getItem('i18nextLng') || 'el';

C:\layera\packages\modals\src\constants\i18nKeys.ts
  5,20: export const MODAL_I18N_KEYS = {

C:\layera\packages\modals\src\constants\index.ts
  6,18: export * from './i18nKeys';

C:\layera\packages\notifications\src\constants\i18nKeys.ts
  5,27: export const NOTIFICATION_I18N_KEYS = {

C:\layera\packages\notifications\src\constants\index.ts
  6,18: export * from './i18nKeys';

C:\layera\packages\tolgee\src\components\LanguageSwitcher.tsx
  15,11:   const { i18n } = useLayeraTranslation();
  20,5:     i18n.changeLanguage(newLang);

C:\layera\packages\tolgee\src\hooks-minimal.ts
  18,5:     i18n: {

C:\layera\packages\tolgee\src\hooks.ts
  21,27:     localStorage.setItem('i18nextLng', newLang);
  41,5:     i18n: {
  61,27:     localStorage.getItem('i18nextLng') ||

C:\layera\packages\tolgee\src\index.ts
  5,34:  * ΑΝΤΙΚΑΘΙΣΤΑ ΠΛΗΡΩΣ το @layera/i18n
  11,41: export { MinimalTolgeeProvider as LayeraI18nProvider } from './provider-minimal'; // Alias για compatibility

C:\layera\packages\tolgee\src\provider-minimal.tsx
  38,39:     language || localStorage.getItem('i18nextLng') || 'el'
  71,27:     localStorage.setItem('i18nextLng', newLang);

C:\layera\packages\tolgee\src\provider-simple.tsx
  31,53:         language: language || localStorage.getItem('i18nextLng') || 'el',
  46,45:       const newLang = localStorage.getItem('i18nextLng') || 'el';

C:\layera\packages\tolgee\src\provider.tsx
  61,29:       localStorage.setItem('i18nextLng', language); // Keep compatibility
  69,53:       if (e.key === 'tolgee_language' || e.key === 'i18nextLng') {

C:\layera\validate-geo-drawing.js
  263,18:   console.log('• i18n Ready: Internationalization support (via @layera/tolgee)');