C:\Layera\.claude\settings.local.json
  35,71:       "Bash(del \"C:\\Layera\\apps\\layera-geoalert\\src\\components\\LanguageSwitcher.tsx\")",

C:\Layera\apps\layera-geoalert\docs\DETAILED_IMPLEMENTATION_STEPS.md
  53,5: - ✅ LanguageSwitcher component
  65,9:     └── LanguageSwitcher.tsx ✅ Language toggle component
  207,3: - LanguageSwitcher component στα headers

C:\Layera\apps\layera-geoalert\docs\ENTERPRISE_ARCHITECTURE.md
  50,13:         └── LanguageSwitcher.tsx    # ✅ Language toggle component
  194,5: ### LanguageSwitcher Component
  198,7: const LanguageSwitcher = () => {

C:\Layera\apps\layera-geoalert\docs\I18N_IMPLEMENTATION.md
  35,5: └── LanguageSwitcher.tsx            # ✅ Language toggle component
  87,8: import LanguageSwitcher from './components/LanguageSwitcher';
  87,44: import LanguageSwitcher from './components/LanguageSwitcher';
  98,10:         <LanguageSwitcher />
  153,8: ## 🎛️ LanguageSwitcher Component
  155,36: ### Implementation (src/components/LanguageSwitcher.tsx)
  159,7: const LanguageSwitcher = () => {
  196,16: export default LanguageSwitcher;

C:\Layera\apps\layera-geoalert\docs\IMPLEMENTATION_PLAN.md
  136,30: 6. ✅ **Language Switching:** LanguageSwitcher component με react-i18next

C:\Layera\apps\layera-geoalert\docs\LAYOUT_MIGRATION_PLAN.md
  11,8:       <LanguageSwitcher />    {/* Custom positioned */}
  43,16:               <LanguageSwitcher />
  77,8:       <LanguageSwitcher />
  129,10: import { LanguageSwitcher } from './LanguageSwitcher';
  129,37: import { LanguageSwitcher } from './LanguageSwitcher';
  142,12:           <LanguageSwitcher />
  186,9: - Check LanguageSwitcher functionality
  209,7: - [ ] LanguageSwitcher changes app language

C:\Layera\apps\layera-geoalert\src\components\GeoHeader.tsx
  5,10: import { LanguageSwitcher } from '@layera/i18n';
  20,12:           <LanguageSwitcher />

C:\Layera\apps\layera-geoalert\src\App-simple.tsx
  3,8: import LanguageSwitcher from './components/LanguageSwitcher';
  3,44: import LanguageSwitcher from './components/LanguageSwitcher';
  12,10:         <LanguageSwitcher />

C:\Layera\apps\layera-geoalert\src\App.tsx
  15,10: import { LanguageSwitcher } from '@layera/i18n';
  253,20:                   <LanguageSwitcher />

C:\Layera\apps\layera-id\src\components\Dashboard.jsx
  4,10: import { LanguageSwitcher, useLayeraTranslation } from '@layera/i18n';
  37,16:               <LanguageSwitcher

C:\Layera\apps\layera-id\src\components\Login.jsx
  6,10: import { LanguageSwitcher, useLayeraTranslation } from '@layera/i18n';
  59,8:       <LanguageSwitcher variant="toggle" showFlags={true} />

C:\Layera\apps\layera-id\src\components\MfaEnroll.jsx
  6,10: import { LanguageSwitcher, useLayeraTranslation } from '@layera/i18n';
  80,8:       <LanguageSwitcher variant="toggle" showFlags={true} />

C:\Layera\apps\layera-id\src\components\NewDashboard.tsx
  4,10: import { LanguageSwitcher, useLayeraTranslation } from '@layera/i18n';
  35,8:       <LanguageSwitcher variant="toggle" showFlags={true} />

C:\Layera\apps\layera-id\src\pages\Account.jsx
  6,10: import { LanguageSwitcher, useLayeraTranslation } from '@layera/i18n';
  35,8:       <LanguageSwitcher variant="toggle" showFlags={true} />

C:\Layera\apps\layera-id\src\pages\AdminRoles.jsx
  6,10: import { LanguageSwitcher, useLayeraTranslation } from '@layera/i18n';
  136,8:       <LanguageSwitcher variant="toggle" showFlags={true} />

C:\Layera\apps\layera-id\src\pages\Data.jsx
  4,10: import { LanguageSwitcher, useLayeraTranslation } from '@layera/i18n';
  38,8:       <LanguageSwitcher variant="toggle" showFlags={true} />

C:\Layera\apps\layera-id\src\pages\Settings.jsx
  4,10: import { LanguageSwitcher, useLayeraTranslation } from '@layera/i18n';
  43,8:       <LanguageSwitcher variant="toggle" showFlags={true} />
  209,18:                 <LanguageSwitcher variant="dropdown" showFlags={true} align="center" />

C:\Layera\apps\layera-id\README.md
  25,33: - Dynamic language switching με LanguageSwitcher component
  112,26: Κάθε σελίδα περιλαμβάνει LanguageSwitcher component στο header:
  114,2: <LanguageSwitcher
  190,5: - ✅ LanguageSwitcher integration σε όλες τις σελίδες

C:\Layera\docs\core-systems\components\components\i18n\LanguageSwitcher.md
  1,3: # LanguageSwitcher Component
  7,4: Το LanguageSwitcher component είναι μέρος του @layera/i18n package και παρέχει μια ολοκληρωμένη λύση για language switching σε Layera applications. Υποστηρίζει multiple display modes και automatic flag detection.
  29,10: import { LanguageSwitcher, LayeraI18nProvider } from '@layera/i18n';
  35,10:         <LanguageSwitcher mode="dropdown" />
  44,5: ### LanguageSwitcherProps
  47,11: interface LanguageSwitcherProps {
  64,10: import { LanguageSwitcher } from '@layera/i18n';
  67,2: <LanguageSwitcher mode="icon" />
  70,2: <LanguageSwitcher mode="button" />
  73,2: <LanguageSwitcher mode="dropdown" />

C:\Layera\docs\core-systems\components\components\README.md
  81,4: | [LanguageSwitcher](./i18n/LanguageSwitcher.md) | ✅ Complete | Language selection με flags | [View Docs](./i18n/LanguageSwitcher.md) |
  81,29: | [LanguageSwitcher](./i18n/LanguageSwitcher.md) | ✅ Complete | Language selection με flags | [View Docs](./i18n/LanguageSwitcher.md) |
  81,114: | [LanguageSwitcher](./i18n/LanguageSwitcher.md) | ✅ Complete | Language selection με flags | [View Docs](./i18n/LanguageSwitcher.md) |
  91,10: import { LanguageSwitcher, useLayeraTranslation } from '@layera/i18n';
  99,8:       <LanguageSwitcher mode="dropdown" showFlags />

C:\Layera\docs\enterprise\ENTERPRISE_COMPONENT_AUDIT.md
  62,3: ❌ LanguageSwitcher: Mixed native HTML select + React dropdown
  79,3: ❌ LanguageSwitcher: native <select> για dropdown variant
  230,3: - LanguageSwitcher dropdown
  293,16: #### **Week 2: LanguageSwitcher Standardization**
  295,22: 🔧 Task 2.1: Upgrade LanguageSwitcher dropdown variant
  409,6: 3. **LanguageSwitcher standardization** - Used globally

C:\Layera\docs\meta\DOCUMENTATION_INDEX.md
  78,72: 47. **[🌍 Language Switcher Component](../core-systems/components/i18n/LanguageSwitcher.md)** - Multi-language Support

C:\Layera\docs\I18N_ROADMAP.md
  21,7: - ✅ **LanguageSwitcher**: Multi-variant component (toggle, dropdown, buttons)

C:\Layera\packages\i18n\dist\components\LanguageSwitcher.d.ts
  1,11: interface LanguageSwitcherProps {
  7,25: export declare function LanguageSwitcher({ className, variant, showFlags, align, }: LanguageSwitcherProps): import("react/jsx-runtime").JSX.Element | null;
  7,85: export declare function LanguageSwitcher({ className, variant, showFlags, align, }: LanguageSwitcherProps): import("react/jsx-runtime").JSX.Element | null;
  8,16: export default LanguageSwitcher;
  9,22: //# sourceMappingURL=LanguageSwitcher.d.ts.map

C:\Layera\packages\i18n\dist\components\LanguageSwitcher.d.ts.map
  1,22: {"version":3,"file":"LanguageSwitcher.d.ts","sourceRoot":"","sources":["../../src/components/LanguageSwitcher.tsx"],"names":[],"mappings":"AAIA,UAAU,qBAAqB;IAC7B,SAAS,CAAC,EAAE,MAAM,CAAC;IACnB,OAAO,CAAC,EAAE,UAAU,GAAG,QAAQ,GAAG,SAAS,CAAC;IAC5C,SAAS,CAAC,EAAE,OAAO,CAAC;IACpB,KAAK,CAAC,EAAE,MAAM,GAAG,OAAO,GAAG,QAAQ,CAAC;CACrC;AAYD,wBAAgB,gBAAgB,CAAC,EAC/B,SAAc,EACd,OAAoB,EACpB,SAAgB,EAChB,KAAe,GAChB,EAAE,qBAAqB,kDAuGvB;AAED,eAAe,gBAAgB,CAAC"}
  1,94: {"version":3,"file":"LanguageSwitcher.d.ts","sourceRoot":"","sources":["../../src/components/LanguageSwitcher.tsx"],"names":[],"mappings":"AAIA,UAAU,qBAAqB;IAC7B,SAAS,CAAC,EAAE,MAAM,CAAC;IACnB,OAAO,CAAC,EAAE,UAAU,GAAG,QAAQ,GAAG,SAAS,CAAC;IAC5C,SAAS,CAAC,EAAE,OAAO,CAAC;IACpB,KAAK,CAAC,EAAE,MAAM,GAAG,OAAO,GAAG,QAAQ,CAAC;CACrC;AAYD,wBAAgB,gBAAgB,CAAC,EAC/B,SAAc,EACd,OAAoB,EACpB,SAAgB,EAChB,KAAe,GAChB,EAAE,qBAAqB,kDAuGvB;AAED,eAAe,gBAAgB,CAAC"}

C:\Layera\packages\i18n\dist\index.d.ts
  4,10: export { LanguageSwitcher } from './components/LanguageSwitcher';
  4,48: export { LanguageSwitcher } from './components/LanguageSwitcher';

C:\Layera\packages\i18n\dist\index.js
  1104,10: function LanguageSwitcher({ className = '', variant = 'dropdown', showFlags = true, align = 'right', }) {
  1219,10: export { LanguageSwitcher, LayeraI18nProvider, defaultNS, i18nConfig, namespaces, supportedLngs, useLayeraI18nContext, useLayeraTranslation, withLayeraI18n };

C:\Layera\packages\i18n\dist\index.js.map
  1,120: {"version":3,"file":"index.js","sources":["../src/config.ts","../src/hooks/useLayeraTranslation.ts","../src/components/LanguageSwitcher.tsx","../src/components/LayeraI18nProvider.tsx"],"sourcesContent":[null,null,null,null],"names":["_jsxs","_jsx"],"mappings":";;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

C:\Layera\packages\i18n\src\components\LanguageSwitcher.tsx
  5,11: interface LanguageSwitcherProps {
  22,17: export function LanguageSwitcher({
  27,4: }: LanguageSwitcherProps) {
  132,16: export default LanguageSwitcher;

C:\Layera\packages\i18n\src\index.ts
  9,10: export { LanguageSwitcher } from './components/LanguageSwitcher';
  9,48: export { LanguageSwitcher } from './components/LanguageSwitcher';

C:\Layera\packages\i18n\README.md
  65,10: import { LanguageSwitcher } from '@layera/i18n';
  70,8:       <LanguageSwitcher variant="dropdown" showFlags={true} />
  126,5: ### LanguageSwitcher Props

C:\Layera\packages\layout\README.md
  221,17:       actions={<LanguageSwitcher />}

C:\Layera\voithitika_docs\diavase_3.md
  1,59: [plugin:vite:import-analysis] Failed to resolve import "./LanguageSwitcher" from "src\components\GeoHeader.tsx". Does the file exist?
  5,14: 21 |  import LanguageSwitcher from "./LanguageSwitcher";
  5,39: 21 |  import LanguageSwitcher from "./LanguageSwitcher";