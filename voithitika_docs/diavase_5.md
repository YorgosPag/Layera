PS C:\layera> npm run validation:critical

> layera@1.0.0 validation:critical
> node scripts/domains/validation/critical-validation.js

🚨 CRITICAL VALIDATION - PRE-COMMIT
===================================
⚡ Fast validation for critical issues only

🔍 Scanning for critical violations...

📁 Scanning apps/...
📁 Scanning packages/...

📊 CRITICAL VALIDATION RESULTS
==============================
❌ Found 5 critical violations:

🏷️  CODE-QUALITY (1):
   📝 CRITICAL: TODO comments must be resolved in apps\layera-geoalert\src\components\steps\areaMethod\InteractiveAreaMeasurement.tsx (1 occurrences)

🏷️  SECURITY (4):
   🔐 CRITICAL: Hardcoded API keys detected in apps\layera-id\src\test-setup.ts (1 occurrences)
   🔐 CRITICAL: Hardcoded passwords detected in packages\auth-bridge\src\components\AuthProvider.tsx (1 occurrences)
   🔐 CRITICAL: Hardcoded API keys detected in packages\auth-bridge\src\utils\firebase.ts (1 occurrences)
   🔐 CRITICAL: Hardcoded passwords detected in packages\constants\src\forms.ts (3 occurrences)

🚨 COMMIT BLOCKED
❌ Fix critical violations before committing

💡 QUICK FIXES:
  npm run fix:any-types    # Fix TypeScript any types
  npm run fix:colors       # Fix hardcoded colors
  npm run enterprise:smart # Full validation
PS C:\layera> 