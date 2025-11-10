#!/usr/bin/env node

/**
 * 🚨 LAYERA HARDCODED VALUES VALIDATOR
 *
 * Ελέγχει για σκληρές τιμές πριν από κάθε commit
 * Αποτρέπει commits που περιέχουν απαγορευμένες hardcoded values
 *
 * Usage: node scripts/validate-hardcoded-values.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔍 LAYERA HARDCODED VALUES VALIDATOR');
console.log('=====================================');

// Κανόνες ελέγχου για σκληρές τιμές
const VALIDATION_RULES = {
  // Hex colors: #fff, #000000, etc
  hexColors: {
    pattern: /#[0-9a-fA-F]{3,6}\b/g,
    description: 'Hex colors (#fff, #000, etc)',
    allowedFiles: ['tokens.css', '*.json'], // Επιτρεπόμενα μόνο στα tokens
  },

  // CSS units: px, rem, em
  cssUnits: {
    pattern: /\b\d+\.?\d*(px|rem|em)\b/g,
    description: 'CSS units (px, rem, em)',
    allowedFiles: ['tokens.css', '*.json'],
  },

  // RGB/RGBA colors
  rgbColors: {
    pattern: /rgba?\s*\(\s*\d+\s*,\s*\d+\s*,\s*\d+/g,
    description: 'RGB/RGBA colors',
    allowedFiles: ['tokens.css', '*.json'],
  },

  // Inline styles with numbers
  inlineStyles: {
    pattern: /style\s*=\s*\{[^}]*\d+[^}]*\}/g,
    description: 'Inline styles with hardcoded values',
    allowedFiles: [], // Απαγορεύεται παντού
  },

  // Transition timings
  transitions: {
    pattern: /\b\d+\.?\d*(s|ms)\b(?![^/]*\*\/)/g, // Exclude comments
    description: 'Transition/animation timings',
    allowedFiles: ['config.ts', 'tokens.css', '*.json'], // Business logic OK
  }
};

// Αρχεία που εξαιρούνται από τον έλεγχο
const EXCLUDED_PATHS = [
  'node_modules/',
  'dist/',
  'build/',
  '.git/',
  'DON_T_TOUCH-Layera_OLD/',
  'coverage/',
  '.pnpm/',
  '.next/',
  '*.min.js',
  '*.min.css',
  'package-lock.json',
  'pnpm-lock.yaml',
  '.husky/'
];

// Domain token files που επιτρέπονται να έχουν σκληρές τιμές
const ALLOWED_TOKEN_PATHS = [
  'packages/tokens/src/domains/',
  'packages/tokens/dist/css/tokens.css'
];

/**
 * Ελέγχει αν ένα αρχείο επιτρέπεται να έχει σκληρές τιμές
 */
function isFileAllowed(filePath, rule) {
  // Token domains πάντα επιτρεπόμενα
  if (ALLOWED_TOKEN_PATHS.some(allowed => filePath.includes(allowed))) {
    return true;
  }

  // Έλεγχος allowed files για συγκεκριμένο κανόνα
  return rule.allowedFiles.some(pattern => {
    if (pattern.includes('*')) {
      const regex = new RegExp(pattern.replace('*', '.*'));
      return regex.test(path.basename(filePath));
    }
    return filePath.includes(pattern);
  });
}

/**
 * Ελέγχει ένα αρχείο για σκληρές τιμές
 */
function validateFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const violations = [];

  for (const [ruleName, rule] of Object.entries(VALIDATION_RULES)) {
    const matches = content.match(rule.pattern);

    if (matches && !isFileAllowed(filePath, rule)) {
      // Φιλτράρισμα σχολίων για transitions
      let actualMatches = matches;
      if (ruleName === 'transitions') {
        const lines = content.split('\n');
        actualMatches = [];

        matches.forEach(match => {
          const lineIndex = content.indexOf(match);
          const lineNumber = content.substring(0, lineIndex).split('\n').length - 1;
          const line = lines[lineNumber];

          // Αγνόηση αν είναι σε σχόλιο
          if (!line.trim().startsWith('//') && !line.includes('/*')) {
            actualMatches.push(match);
          }
        });
      }

      if (actualMatches.length > 0) {
        violations.push({
          rule: ruleName,
          description: rule.description,
          matches: actualMatches.slice(0, 5), // Μόνο τα πρώτα 5
          count: actualMatches.length
        });
      }
    }
  }

  return violations;
}

/**
 * Παίρνει τα modified αρχεία από το git staging area
 */
function getStagedFiles() {
  try {
    const output = execSync('git diff --cached --name-only', { encoding: 'utf8' });
    return output.trim().split('\n').filter(file => file && fs.existsSync(file));
  } catch (error) {
    console.warn('⚠️  Warning: Could not get staged files, checking working directory');
    return [];
  }
}

/**
 * Ελέγχει όλα τα relevantσα αρχεία
 */
function validateProject() {
  const stagedFiles = getStagedFiles();
  let filesToCheck = stagedFiles.length > 0 ? stagedFiles : getAllProjectFiles();

  // Φιλτράρισμα excluded paths
  filesToCheck = filesToCheck.filter(file =>
    !EXCLUDED_PATHS.some(excluded => file.includes(excluded.replace('*', '')))
  );

  console.log(`🔍 Checking ${filesToCheck.length} files...`);

  let totalViolations = 0;
  const violationsByFile = {};

  for (const filePath of filesToCheck) {
    // Παράλειψη excluded paths
    if (EXCLUDED_PATHS.some(excluded => filePath.includes(excluded))) {
      continue;
    }

    // Έλεγχος μόνο για relevant file types
    if (!/\.(js|ts|jsx|tsx|css|scss|json)$/.test(filePath)) {
      continue;
    }

    try {
      const violations = validateFile(filePath);
      if (violations.length > 0) {
        violationsByFile[filePath] = violations;
        totalViolations += violations.reduce((sum, v) => sum + v.count, 0);
      }
    } catch (error) {
      console.warn(`⚠️  Could not check file: ${filePath}`);
    }
  }

  return { violationsByFile, totalViolations };
}

/**
 * Παίρνει όλα τα αρχεία του project
 */
function getAllProjectFiles() {
  const files = [];

  function walkDir(dir) {
    if (EXCLUDED_PATHS.some(excluded => dir.includes(excluded))) {
      return;
    }

    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          walkDir(fullPath);
        } else if (/\.(js|ts|jsx|tsx|css|scss)$/.test(entry.name)) {
          files.push(fullPath);
        }
      }
    } catch (error) {
      // Ignore permission errors
    }
  }

  walkDir('.');
  return files;
}

/**
 * Εμφανίζει αποτελέσματα validation
 */
function reportResults(violationsByFile, totalViolations) {
  if (totalViolations === 0) {
    console.log('✅ SUCCESS: No hardcoded values found!');
    console.log('🚀 Your code follows enterprise standards.');
    return true;
  }

  console.log(`\n🚨 VALIDATION FAILED: ${totalViolations} hardcoded values found!\n`);

  for (const [filePath, violations] of Object.entries(violationsByFile)) {
    console.log(`📁 ${filePath}:`);

    violations.forEach(violation => {
      console.log(`   ❌ ${violation.description} (${violation.count} instances)`);
      console.log(`      Examples: ${violation.matches.join(', ')}`);
    });
    console.log('');
  }

  console.log('🔧 FIX REQUIRED:');
  console.log('   • Use CSS variables: var(--la-color-primary)');
  console.log('   • Use design tokens from Style Dictionary');
  console.log('   • Move hardcoded values to packages/tokens/src/domains/');
  console.log('');
  console.log('📖 For help: See CLAUDE.md rules for hardcoded values');

  return false;
}

// Εκτέλεση validation
function main() {
  const { violationsByFile, totalViolations } = validateProject();
  const success = reportResults(violationsByFile, totalViolations);

  if (!success) {
    process.exit(1); // Fail the commit/CI
  }
}

// Εκτέλεση μόνο αν καλείται απευθείας
if (require.main === module) {
  main();
}

module.exports = { validateProject, VALIDATION_RULES };