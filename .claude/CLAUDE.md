Θέλω να μου μιλάς πάντοτε στα ελληνικά

Μη χρησιμοποιείς `any`. Εφάρμοσε απαγόρευση και διόρθωσε ό,τι σπάσει.

1) tsconfig.json → compilerOptions:
{
  "strict": true,
  "noImplicitAny": true,
  "noUncheckedIndexedAccess": true,
  "exactOptionalPropertyTypes": true
}

2) .eslintrc.* → rules:
{ "@typescript-eslint/no-explicit-any": "error" }

3) package.json → scripts:
"typecheck": "tsc --noEmit",
"lint": "eslint \"src/**/*.{ts,tsx}\"",
"verify": "npm run typecheck && npm run lint --max-warnings=0"

4) Τρέξε: npm run verify. Όπου υπήρχε `any`, βάλε συγκεκριμένους τύπους ή `unknown` + type guards. Απέτυχε το build αν μείνει `any`.
