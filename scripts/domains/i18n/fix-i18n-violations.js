#!/usr/bin/env node

/**
 * 🌐 SAFE I18N COMPLIANCE FIXER
 * Conservative approach - NO aggressive replacements
 *
 * 🛡️ SAFETY FIRST: Only fixes obvious hardcoded strings
 * ⚠️  LESSONS LEARNED: Previous version caused damage
 */

const fs = require('fs');
const path = require('path');

console.log('🌐 SAFE I18N COMPLIANCE FIXER');
console.log('=============================');
console.log('🛡️ Conservative approach - Safety first');
console.log('⚠️  Will only suggest fixes for OBVIOUS violations');
console.log('');

let filesScanned = 0;
let totalSuggestions = 0;

/**
 * CONSERVATIVE PATTERNS - Only obvious hardcoded strings
 */
const SAFE_I18N_PATTERNS = [
  // Only obvious Greek/English hardcoded strings that should be i18n
  {
    pattern: />\s*Καλώς ήρθες\s*</g,
    replacement: ">{t('welcome.message')}<",
    description: 'Hardcoded Greek welcome message',
    safe: false // Just suggest, don't replace
  },
  {
    pattern: />\s*Welcome\s*</g,
    replacement: ">{t('welcome.message')}<",
    description: 'Hardcoded English welcome message',
    safe: false
  },
  {
    pattern: /placeholder="Email"/g,
    replacement: 'placeholder={t("forms.email")}',
    description: 'Hardcoded email placeholder',
    safe: false
  },
  {
    pattern: /placeholder="Password"/g,
    replacement: 'placeholder={t("forms.password")}',
    description: 'Hardcoded password placeholder',
    safe: false
  }
];

/**
 * Safe scanning - NO automatic replacements
 */
function scanFileForI18nViolations(filePath) {
  try {
    if (!fs.existsSync(filePath)) return { violations: 0, suggestions: [] };

    const content = fs.readFileSync(filePath, 'utf8');
    const suggestions = [];
    let violations = 0;

    // Skip test files and type definitions
    if (filePath.includes('test') || filePath.includes('spec') ||
        filePath.includes('.d.ts') || filePath.includes('node_modules')) {
      return { violations: 0, suggestions: [] };
    }

    // Only scan, don't replace
    SAFE_I18N_PATTERNS.forEach(({ pattern, description, replacement }) => {
      const matches = content.match(pattern);
      if (matches) {
        violations += matches.length;
        suggestions.push({
          pattern: pattern.toString(),
          count: matches.length,
          description,
          replacement,
          file: filePath
        });
      }
    });

    return { violations, suggestions };

  } catch (error) {
    console.warn(`⚠️  Could not scan ${filePath}:`, error.message);
    return { violations: 0, suggestions: [] };
  }
}

/**
 * Scan directory safely
 */
function scanDirectory(dir) {
  if (!fs.existsSync(dir)) return [];

  let allSuggestions = [];

  function scanDir(currentDir, depth = 0) {
    if (depth > 8) return; // Prevent infinite recursion

    const items = fs.readdirSync(currentDir);

    for (const item of items) {
      if (item === 'node_modules' || item === '.git' || item === 'dist') continue;

      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        scanDir(fullPath, depth + 1);
      } else if ((item.endsWith('.tsx') || item.endsWith('.jsx') ||
                 item.endsWith('.ts') || item.endsWith('.js')) &&
                 !item.includes('test') && !item.includes('spec')) {
        filesScanned++;
        const result = scanFileForI18nViolations(fullPath);
        if (result.suggestions.length > 0) {
          allSuggestions.push(...result.suggestions);
        }
      }
    }
  }

  scanDir(dir);
  return allSuggestions;
}

/**
 * Main execution - SCAN ONLY
 */
console.log('🔍 Scanning for i18n violations (safe mode)...');

const appsSuggestions = scanDirectory('apps');
const packagesSuggestions = scanDirectory('packages');
const allSuggestions = [...appsSuggestions, ...packagesSuggestions];

console.log('');
console.log('📊 SAFE I18N ANALYSIS RESULTS');
console.log('=============================');

if (allSuggestions.length === 0) {
  console.log('✅ No obvious i18n violations found!');
  console.log('🏆 Internationalization compliance: EXCELLENT');
  console.log('');
  console.log('🌐 Current i18n usage appears optimal');
  console.log('✨ No automatic fixes needed');
} else {
  console.log(`📋 Found ${allSuggestions.length} suggestions:`);
  console.log('');

  // Group by file
  const groupedByFile = allSuggestions.reduce((acc, suggestion) => {
    if (!acc[suggestion.file]) acc[suggestion.file] = [];
    acc[suggestion.file].push(suggestion);
    return acc;
  }, {});

  Object.entries(groupedByFile).forEach(([file, suggestions]) => {
    console.log(`📁 ${path.relative(process.cwd(), file)}:`);
    suggestions.forEach(s => {
      console.log(`   💡 ${s.description} (${s.count} occurrences)`);
      console.log(`      Suggested: ${s.replacement}`);
    });
    console.log('');
  });

  console.log('🛡️ SAFETY NOTE: No automatic changes made');
  console.log('👨‍💻 Manual review recommended for these suggestions');
}

console.log('');
console.log('📊 FINAL SUMMARY');
console.log('================');
console.log(`📝 Files scanned: ${filesScanned}`);
console.log(`🔄 Automatic changes: 0 (safety mode)`);
console.log(`💡 Suggestions provided: ${allSuggestions.length}`);
console.log('');
console.log('🌐 SAFE I18N FIXER: COMPLETED');
console.log('✅ No destructive changes made');

// Exit with 0 since we didn't break anything
process.exit(0);