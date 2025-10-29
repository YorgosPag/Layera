PS C:\layera> npm run naming:validate

> layera@1.0.0 naming:validate
> node scripts/domains/docs/validate-naming-conventions.js

🏷️ ENTERPRISE NAMING CONVENTIONS VALIDATION
Analyzing codebase for Fortune 500 naming standards compliance...

📄 Validating file naming patterns...
   📊 Scanned 19872 files, found 14625 naming violations
📁 Validating directory naming patterns...
   📊 Scanned 590 directories, found 54 naming violations
📦 Validating import/export naming...
   📊 Found 141 import naming violations
📦 Validating package naming...
   📊 Found 0 package naming violations
🌍 Validating i18n key structure...
   📊 Found 0 i18n naming violations
🌐 Validating API endpoint naming...
   📊 Found 0 API naming violations

🏷️ ENTERPRISE NAMING CONVENTIONS VALIDATION REPORT
=====================================================

📊 OVERALL COMPLIANCE:
🎯 Overall Score: 70% (NEEDS_WORK)

📋 CATEGORY BREAKDOWN:
├─ File Naming: 26%
├─ Directory Naming: 91%
├─ Import Naming: 0%
├─ Package Naming: 100%
├─ i18n Naming: 100%
└─ API Naming: 100%

🔍 VIOLATIONS SUMMARY:
├─ Total violations: 14820
├─ File naming issues: 14625
├─ Directory naming issues: 54
├─ Import naming issues: 141
├─ Package naming issues: 0
├─ i18n naming issues: 0
└─ API naming issues: 0

🚨 SAMPLE VIOLATIONS:
1. [LOW] Documentation file should use CAPS_WITH_UNDERSCORES: ΕΝΤΟΛΕΣ_ΕΛΕΓΧΟΥ_ΓΙΩΡΓΟΣ.md
   File: ΕΝΤΟΛΕΣ_ΕΛΕΓΧΟΥ_ΓΙΩΡΓΟΣ.md
2. [LOW] Documentation file should use CAPS_WITH_UNDERSCORES: I18N_IMPLEMENTATION.md
   File: apps\layera-geoalert\docs\I18N_IMPLEMENTATION.md
3. [LOW] Documentation file should use CAPS_WITH_UNDERSCORES: IPHONE_14_PRO_MAX_PIPELINE_AUDIT.md
   File: apps\layera-geoalert\docs\IPHONE_14_PRO_MAX_PIPELINE_AUDIT.md
4. [MEDIUM] Utility file should use camelCase: test-index.ts
   File: apps\layera-geoalert\src\components\steps\occupation\test-index.ts
5. [MEDIUM] Utility file should use camelCase: StepRegistry.ts
   File: apps\layera-geoalert\src\components\steps\StepRegistry.ts

💡 RECOMMENDATIONS:
1. [HIGH] Rename files to follow Enterprise conventions
   Command: node scripts/domains/docs/fix-naming-violations.js --files
2. [CRITICAL] Replace non-LEGO imports with @layera packages
   Command: node scripts/domains/lego/fix-lego-violations.js

📄 Detailed report saved: NAMING_CONVENTIONS_VALIDATION_REPORT.json

❌ NAMING CONVENTIONS COMPLIANCE FAILED
Enterprise standards require 80%+ compliance
PS C:\layera> 