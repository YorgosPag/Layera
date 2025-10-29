PS C:\layera> npm run enterprise:validate

> layera@1.0.0 enterprise:validate
> node scripts/domains/validation/validate-duplicates.js

🛡️ LAYERA ENTERPRISE DUPLICATE PREVENTION SYSTEM
================================================
⚡ Powered by existing validation infrastructure
📋 Based on DUPLICATE_PREVENTION_PROTOCOL.md


🔍 ΒΗΜΑ 1: ΥΠΟΧΡΕΩΤΙΚΗ ΠΡΟΣΑΡΩΣΗ ΠΡΙΝ ΓΡΑΦΩ ΚΩΔΙΚΑ
====================================================

🧩 ΒΗΜΑ 2: LEGO SYSTEMS COMPLIANCE VALIDATION
==============================================

🔷 ΒΗΜΑ 3: TYPESCRIPT STRICT VALIDATION
=======================================

🌍 ΒΗΜΑ 4: I18N COMPLIANCE VALIDATION
====================================

🏛️ ΒΗΜΑ 5: SINGLE SOURCE OF TRUTH VALIDATION
==============================================
🚀 Starting enhanced enterprise validation - this may take 30-60 seconds...


📁 Έλεγχος για problematic duplicated files:
✅ No problematic duplicate filenames found
ℹ️  Standard monorepo patterns (index.ts, types.ts, etc.) are allowed

📤 Έλεγχος για duplicated exports:
ℹ️  Domain-specific types in device-detection: './types' (allowed)
ℹ️  Domain-specific hooks in device-detection: './hooks' (allowed)
ℹ️  Domain-specific types in device-layouts: './types' (allowed)
ℹ️  Domain-specific utils in error-boundary: './utils' (allowed)
ℹ️  Domain-specific constants in error-boundary: './constants' (allowed)
ℹ️  Domain-specific types in floating-action-buttons: './types' (allowed)
ℹ️  Domain-specific types in geo-core: './types' (allowed)
ℹ️  Domain-specific utils in geo-core: './utils' (allowed)
ℹ️  Domain-specific hooks in geocoding: './hooks' (allowed)
ℹ️  Domain-specific types in map-core: './types' (allowed)
ℹ️  Domain-specific constants in modals: './constants' (allowed)
ℹ️  Domain-specific types in navigation-handlers: './types' (allowed)
✅ No duplicate exports found

🎨 Έλεγχος για duplicated CSS tokens:
✅ No duplicate CSS tokens found

🔍 Έλεγχος για anti-patterns:
✅ No styled-components anti-patterns found
✅ Minimal hardcoded colors found
✅ Found 383 @layera imports (good LEGO usage)

📝 Έλεγχος για any types:
❌ Found 5 'any' types (should use specific types)
❌ TypeScript compilation failed

🔤 Έλεγχος για hardcoded strings:
⚠️  Found 194 hardcoded Greek strings (should use t() function)
✅ Found 438 i18n usages (good internationalization)

🔑 Έλεγχος για untranslated keys:
❌ Found 19 potentially untranslated keys:
  🔑 app.name:
    🇬🇷 "Layera"
    🇺🇸 "Layera"
  🔑 app.title.geoAlert:
    🇬🇷 "Layera GeoAlert"
    🇺🇸 "Layera GeoAlert"
  🔑 app.title.layeraId:
    🇬🇷 "Layera ID"
    🇺🇸 "Layera ID"
  🔑 auth.email:
    🇬🇷 "Email"
    🇺🇸 "Email"
  🔑 settings.items.language.options.en:
    🇬🇷 "English"
    🇺🇸 "English"
  🔑 data.fields.email:
    🇬🇷 "Email"
    🇺🇸 "Email"
  🔑 data.fields.userId:
    🇬🇷 "User ID"
    🇺🇸 "User ID"
  🔑 data.fields.ipAddress:
    🇬🇷 "IP Address"
    🇺🇸 "IP Address"
  🔑 data.fields.webBrowser:
    🇬🇷 "Web Browser"
    🇺🇸 "Web Browser"
  🔑 geoalert.title:
    🇬🇷 "Layera GeoAlert"
    🇺🇸 "Layera GeoAlert"
    ... και 9 ακόμη

📊 Translation Coverage:
  🇬🇷 Greek: 544/561 keys (97%)
  🇺🇸 English: 548/561 keys (98%)

🎯 Έλεγχος για Single Source of Truth violations:
❌ Found 33 Single Source of Truth violations
❌ Custom Card implementation in cardData.ts - Use @layera/cards
❌ Custom Card implementation in cardData.ts - Use @layera/cards
❌ Custom Button implementation in FloatingStepper.tsx - Use @layera/buttons
❌ Custom Button implementation in LayoutStepCard.tsx - Use @layera/buttons
❌ Custom Button implementation in LayoutStepCard.tsx - Use @layera/buttons
❌ Custom Form implementation in PropertyDetailsForm.tsx - Use @layera/forms
❌ Custom Icon implementation in GeoHeader.tsx - Use @layera/icons
❌ Custom Icon implementation in MapContainer.tsx - Use @layera/icons
❌ Custom Icon implementation in AreaMethodCard.tsx - Use @layera/icons
❌ Custom Icon implementation in AvailabilityCard.tsx - Use @layera/icons

📊 LEGO Usage Report:
ℹ️  Total @layera imports: 226
ℹ️  @layera/layout: 52 imports
ℹ️  @layera/tolgee: 36 imports
ℹ️  @layera/cards: 34 imports
ℹ️  @layera/constants: 33 imports
ℹ️  @layera/icons: 28 imports
ℹ️  @layera/typography: 21 imports
ℹ️  @layera/buttons: 15 imports
ℹ️  @layera/forms: 7 imports
✅ Excellent LEGO usage: 226 imports

📊 ENTERPRISE VALIDATION SUMMARY
================================
❌ VALIDATION ISSUES DETECTED!

📈 Statistics:
  - Errors: 14
  - Warnings: 1
  - Duplicates: 0

🚨 CRITICAL ERRORS:
  - Found 5 'any' types (should use specific types)
  - TypeScript compilation failed
  - Found 19 potentially untranslated keys:
  - Found 33 Single Source of Truth violations
  - Custom Card implementation in cardData.ts - Use @layera/cards
  - Custom Card implementation in cardData.ts - Use @layera/cards
  - Custom Button implementation in FloatingStepper.tsx - Use @layera/buttons
  - Custom Button implementation in LayoutStepCard.tsx - Use @layera/buttons
  - Custom Button implementation in LayoutStepCard.tsx - Use @layera/buttons
  - Custom Form implementation in PropertyDetailsForm.tsx - Use @layera/forms
  - Custom Icon implementation in GeoHeader.tsx - Use @layera/icons
  - Custom Icon implementation in MapContainer.tsx - Use @layera/icons
  - Custom Icon implementation in AreaMethodCard.tsx - Use @layera/icons
  - Custom Icon implementation in AvailabilityCard.tsx - Use @layera/icons

⚠️  WARNINGS:
  - Found 194 hardcoded Greek strings (should use t() function)

📋 NEXT STEPS:
1. Fix all duplicates before proceeding
2. Follow DUPLICATE_PREVENTION_PROTOCOL.md
3. Use only @layera LEGO systems
4. Re-run this validation after fixes
PS C:\layera> 