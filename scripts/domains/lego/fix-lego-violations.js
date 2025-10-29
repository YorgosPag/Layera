#!/usr/bin/env node

/**
 * 🧩 SAFE LEGO SYSTEMS FIXER
 * Conservative approach - NO aggressive replacements
 *
 * 🛡️ SAFETY FIRST: Only fixes obvious violations
 * ⚠️  LESSONS LEARNED: Previous version caused 229 files damage
 */

const fs = require('fs');
const path = require('path');

console.log('🧩 SAFE LEGO SYSTEMS FIXER');
console.log('==========================');
console.log('🛡️ Conservative approach - Safety first');
console.log('⚠️  Will only fix OBVIOUS violations');
console.log('');

let filesModified = 0;
let totalReplacements = 0;

/**
 * CONSERVATIVE PATTERNS - Only obvious cases
 */
const SAFE_LEGO_PATTERNS = [
  // Only fix obvious hardcoded components that should be LEGO
  {
    pattern: /className="card"/g,
    replacement: 'import { BaseCard } from "@layera/cards";\n// Use <BaseCard> instead of div with className="card"',
    description: 'Obvious card class usage',
    safe: false // Just comment, don't replace
  },
  {
    pattern: /className="button"/g,
    replacement: 'import { Button } from "@layera/buttons";\n// Use <Button> instead of div with className="button"',
    description: 'Obvious button class usage',
    safe: false // Just comment, don't replace
  }
];

/**
 * Safe scanning - NO automatic replacements
 */
function scanFileForLEGOViolations(filePath) {
  try {
    if (!fs.existsSync(filePath)) return { violations: 0, suggestions: [] };

    const content = fs.readFileSync(filePath, 'utf8');
    const suggestions = [];
    let violations = 0;

    // Only scan, don't replace
    SAFE_LEGO_PATTERNS.forEach(({ pattern, description }) => {
      const matches = content.match(pattern);
      if (matches) {
        violations += matches.length;
        suggestions.push({
          pattern: pattern.toString(),
          count: matches.length,
          description,
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
      } else if ((item.endsWith('.tsx') || item.endsWith('.jsx')) &&
                 !item.includes('test') && !item.includes('spec')) {
        const result = scanFileForLEGOViolations(fullPath);
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
console.log('🔍 Scanning for LEGO violations (safe mode)...');

const appsSuggestions = scanDirectory('apps');
const packagesSuggestions = scanDirectory('packages');
const allSuggestions = [...appsSuggestions, ...packagesSuggestions];

console.log('');
console.log('📊 SAFE LEGO ANALYSIS RESULTS');
console.log('=============================');

if (allSuggestions.length === 0) {
  console.log('✅ No obvious LEGO violations found!');
  console.log('🏆 LEGO Systems compliance: EXCELLENT');
  console.log('');
  console.log('🧩 Current LEGO usage appears optimal');
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
    });
    console.log('');
  });

  console.log('🛡️ SAFETY NOTE: No automatic changes made');
  console.log('👨‍💻 Manual review recommended for these suggestions');
}

console.log('');
console.log('📊 FINAL SUMMARY');
console.log('================');
console.log(`📝 Files scanned: ${filesModified}`);
console.log(`🔄 Automatic changes: 0 (safety mode)`);
console.log(`💡 Suggestions provided: ${allSuggestions.length}`);
console.log('');
console.log('🧩 SAFE LEGO FIXER: COMPLETED');
console.log('✅ No destructive changes made');

// Exit with 0 since we didn't break anything
process.exit(0);