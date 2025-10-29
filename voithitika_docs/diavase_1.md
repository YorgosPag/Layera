🏆 ENTERPRISE COMPLIANCE SCORE: 100%
✅ GOLD STANDARD - Enterprise ready!

📄 Detailed report saved: C:\layera\DOCUMENTATION_VALIDATION_REPORT.json

> layera@1.0.0 docs:code-examples
> node scripts/domains/docs/validate-code-examples.js

🔍 ENTERPRISE CODE EXAMPLES VALIDATION
Scanning all documentation for code quality...

📁 Found 155 markdown files

🔍 apps\layera-id\README.md: 6 code blocks analyzed
🔍 packages\constants\README.md: 13 code blocks analyzed
🔍 packages\file-upload\README.md: 22 code blocks analyzed
🔍 packages\forms\README.md: 11 code blocks analyzed
🔍 README.md: 8 code blocks analyzed

🔍 ENTERPRISE CODE EXAMPLES VALIDATION REPORT
==================================================

📊 STATISTICS:
├─ Files scanned: 155
├─ Code blocks found: 102
├─ Valid code blocks: 10
└─ Success rate: 10%

🚨 VIOLATIONS BREAKDOWN:
├─ Syntax errors: 39
├─ Import errors: 0
├─ LEGO violations: 23
└─ Total violations: 63

🔍 TOP VIOLATIONS:
1. [CRITICAL] TypeScript compilation error: temp/validation_1761779109119.tsx(1,8): error TS1259: Module '"C:/layera/node_modules/.pnpm/@types+react@19.2.2/node_modules/@types/react/index"' can only be default-imported using the 'esModuleInterop' flag
temp/validation_1761779109119.tsx(2,34): error TS2307: Cannot find module '@layera/tolgee' or its corresponding type declarations.
temp/validation_1761779109119.tsx(4,1): error TS17004: Cannot use JSX unless the '--jsx' flag is provided.  

2. [HIGH] LEGO violation: Direct React imports → LEGO system
   Suggestion: // ✅ Use LEGO system hooks instead
3. [CRITICAL] TypeScript compilation error: temp/validation_1761779126625.ts(13,15): error TS1005: '>' expected.
temp/validation_1761779126625.ts(13,19): error TS1005: ')' expected.
temp/validation_1761779126625.ts(13,33): error TS1005: ',' expected.
temp/validation_1761779126625.ts(14,19): error TS1005: '>' expected.
temp/validation_1761779126625.ts(14,23): error TS1005: ';' expected.
temp/validation_1761779126625.ts(14,40): error TS1161: Unterminated regular expression literal.
temp/validation_1761779126625.ts(16,8): error TS1161: Unterminated regular expression literal.
temp/validation_1761779126625.ts(17,6): error TS1161: Unterminated regular expression literal.
temp/validation_1761779126625.ts(18,3): error TS1128: Declaration or statement expected.
temp/validation_1761779126625.ts(19,1): error TS1128: Declaration or statement expected.

4. [CRITICAL] TypeScript compilation error: temp/validation_1761779130057.ts(10,7): error TS1005: '>' expected.
temp/validation_1761779130057.ts(10,12): error TS1005: ')' expected.
temp/validation_1761779130057.ts(10,14): error TS1136: Property assignment expected.
temp/validation_1761779130057.ts(12,15): error TS1005: ';' expected.
temp/validation_1761779130057.ts(13,12): error TS1005: ';' expected.
temp/validation_1761779130057.ts(15,5): error TS1109: Expression expected.
temp/validation_1761779130057.ts(17,6): error TS1161: Unterminated regular expression literal.
temp/validation_1761779130057.ts(18,3): error TS1128: Declaration or statement expected.
temp/validation_1761779130057.ts(19,1): error TS1128: Declaration or statement expected.

5. [CRITICAL] TypeScript compilation error: temp/validation_1761779134482.ts(1,10): error TS2305: Module '"@layera/constants"' has no exported member 'FORM_VALIDATION'.
temp/validation_1761779134482.ts(2,38): error TS2307: Cannot find module '@layera/tolgee' or its corresponding type declarations.


🏆 CODE QUALITY SCORE: 10%
❌ NEEDS WORK - Major issues found

📄 Detailed report saved: CODE_EXAMPLES_VALIDATION_REPORT.json
PS C:\layera> 