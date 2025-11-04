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
❌ Found 11 critical violations:

🏷️  PRODUCTION (11):
   🚨 CRITICAL: Remove console.log statements in apps\layera-geoalert\src\App.tsx (3 occurrences)
   🚨 CRITICAL: Remove console.log statements in apps\layera-geoalert\src\components\GeoHeader.tsx (1 occurrences)
   🚨 CRITICAL: Remove console.log statements in apps\layera-geoalert\src\components\GeoMapNew.tsx (2 occurrences)
   🚨 CRITICAL: Remove console.log statements in apps\layera-geoalert\src\components\map\MapContainer.tsx (1 occurrences)  
   🚨 CRITICAL: Remove console.log statements in apps\layera-geoalert\src\components\steps\areaMethod\AreaMethodStep.tsx (4 occurrences)
   ... and 6 more files

🚨 COMMIT BLOCKED
❌ Fix critical violations before committing

💡 QUICK FIXES:
  npm run fix:any-types    # Fix TypeScript any types
  npm run fix:colors       # Fix hardcoded colors
  npm run enterprise:smart # Full validation
PS C:\layera> 