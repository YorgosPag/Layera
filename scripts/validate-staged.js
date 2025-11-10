#!/usr/bin/env node

/**
 * 🚨 FAST LAYERA HARDCODED VALUES VALIDATOR
 * Γρήγορη έκδοση για pre-commit hooks - ελέγχει μόνο staged files
 */

const fs = require('fs');
const { execSync } = require('child_process');

// Κανόνες ελέγχου
const PATTERNS = {
  hexColors: /#[0-9a-fA-F]{3,6}\b/g,
  cssUnits: /\b\d+\.?\d*(px|rem|em)\b/g,
  rgbColors: /rgba?\s*\(\s*\d+\s*,\s*\d+\s*,\s*\d+/g,
  inlineStyles: /style\s*=\s*\{[^}]*\d+[^}]*\}/g,
  transitions: /\b\d+\.?\d*(s|ms)\b/g
};

// Επιτρεπόμενα paths
const ALLOWED_PATHS = [
  'packages/tokens/src/domains/',
  'packages/tokens/dist/css/tokens.css',
  'constants/config.ts' // Business logic OK
];

function getStagedFiles() {
  try {
    const output = execSync('git diff --cached --name-only', { encoding: 'utf8' });
    return output.trim().split('\n').filter(file =>
      file &&
      fs.existsSync(file) &&
      /\.(js|ts|jsx|tsx)$/.test(file) &&
      !file.includes('node_modules/') &&
      !file.includes('DON_T_TOUCH-Layera_OLD/')
    );
  } catch (error) {
    return [];
  }
}

function isFileAllowed(filePath) {
  return ALLOWED_PATHS.some(allowed => filePath.includes(allowed));
}

function validateFile(filePath) {
  if (isFileAllowed(filePath)) return [];

  const content = fs.readFileSync(filePath, 'utf8');
  const violations = [];

  for (const [type, pattern] of Object.entries(PATTERNS)) {
    const matches = content.match(pattern);
    if (matches) {
      // Skip transitions in config.ts (business logic)
      if (type === 'transitions' && filePath.includes('config.ts')) continue;

      // Skip CSS units in comments
      if (type === 'cssUnits') {
        const actualMatches = [];
        matches.forEach(match => {
          const index = content.indexOf(match);
          const lineStart = content.lastIndexOf('\n', index);
          const lineEnd = content.indexOf('\n', index);
          const line = content.substring(lineStart, lineEnd);

          // Skip if in comment or SVG path
          if (!line.includes('//') && !line.includes('/*') && !line.includes('d=')) {
            actualMatches.push(match);
          }
        });
        if (actualMatches.length === 0) continue;
      }

      violations.push({
        type,
        matches: matches.slice(0, 3), // First 3 examples
        count: matches.length
      });
    }
  }

  return violations;
}

function main() {
  console.log('🚨 LAYERA STAGED FILES VALIDATOR');
  console.log('=================================');

  const stagedFiles = getStagedFiles();

  if (stagedFiles.length === 0) {
    console.log('📝 No staged TypeScript/React files to check');
    return;
  }

  console.log(`🔍 Checking ${stagedFiles.length} staged files...`);

  let totalViolations = 0;
  const violationsByFile = {};

  stagedFiles.forEach(filePath => {
    try {
      const violations = validateFile(filePath);
      if (violations.length > 0) {
        violationsByFile[filePath] = violations;
        totalViolations += violations.reduce((sum, v) => sum + v.count, 0);
      }
    } catch (error) {
      console.warn(`⚠️  Could not check: ${filePath}`);
    }
  });

  if (totalViolations === 0) {
    console.log('✅ SUCCESS: No hardcoded values in staged files!');
    console.log('🚀 Ready to commit.');
    return;
  }

  console.log(`\n🚨 COMMIT BLOCKED: ${totalViolations} hardcoded values found!\n`);

  for (const [filePath, violations] of Object.entries(violationsByFile)) {
    console.log(`📁 ${filePath}:`);
    violations.forEach(violation => {
      console.log(`   ❌ ${violation.type}: ${violation.matches.join(', ')}`);
    });
  }

  console.log('\n🔧 QUICK FIXES:');
  console.log('   • Hex colors: Use var(--la-color-primary)');
  console.log('   • CSS units: Use design tokens');
  console.log('   • Inline styles: Use CSS classes');
  console.log('\n📖 Guide: docs/HARDCODED-VALUES-PROTECTION.md');

  process.exit(1);
}

main();