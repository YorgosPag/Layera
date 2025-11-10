#!/usr/bin/env node

/**
 * 🔍 LAYERA QUICK HARDCODED VALUES CHECK
 * Cross-platform γρήγορος έλεγχος για Windows/Mac/Linux
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 LAYERA QUICK HARDCODED VALUES CHECK');
console.log('======================================');

// Patterns to check
const PATTERNS = {
  hexColors: {
    regex: /#[0-9a-fA-F]{3,6}\b/g,
    description: 'Hex colors'
  },
  cssUnits: {
    regex: /\b\d+\.?\d*(px|rem|em)\b/g,
    description: 'CSS units (px/rem/em)'
  },
  rgbColors: {
    regex: /rgba?\s*\(/g,
    description: 'RGB colors'
  },
  inlineStyles: {
    regex: /style\s*=\s*\{/g,
    description: 'Inline styles'
  }
};

// Directories to check
const CHECK_DIRS = [
  'apps/layera/src',
  'packages/icons/src',
  'packages/typography/src'
];

// Files to exclude
const EXCLUDED_FILES = [
  'node_modules',
  'DON_T_TOUCH-Layera_OLD',
  'dist',
  'build',
  '.git'
];

/**
 * Get all files to check
 */
function getFilesToCheck() {
  const files = [];

  function walkDir(dir) {
    if (!fs.existsSync(dir)) return;

    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      // Skip excluded directories
      if (EXCLUDED_FILES.some(excluded => fullPath.includes(excluded))) {
        continue;
      }

      if (entry.isDirectory()) {
        walkDir(fullPath);
      } else if (/\.(ts|tsx|js|jsx)$/.test(entry.name)) {
        files.push(fullPath);
      }
    }
  }

  CHECK_DIRS.forEach(dir => {
    if (fs.existsSync(dir)) {
      walkDir(dir);
    }
  });

  return files;
}

/**
 * Check a single file for violations
 */
function checkFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const violations = [];

    for (const [type, pattern] of Object.entries(PATTERNS)) {
      const matches = content.match(pattern.regex);
      if (matches) {
        // Filter out comments and SVG paths for CSS units
        let actualMatches = matches;
        if (type === 'cssUnits') {
          const lines = content.split('\n');
          actualMatches = [];

          matches.forEach(match => {
            const index = content.indexOf(match);
            const lineNumber = content.substring(0, index).split('\n').length - 1;
            const line = lines[lineNumber] || '';

            // Skip comments and SVG paths
            if (!line.includes('//') && !line.includes('/*') && !line.includes('d=')) {
              actualMatches.push(match);
            }
          });
        }

        if (actualMatches.length > 0) {
          violations.push({
            type,
            description: pattern.description,
            examples: actualMatches.slice(0, 2), // First 2 examples
            count: actualMatches.length
          });
        }
      }
    }

    return violations;
  } catch (error) {
    return [];
  }
}

/**
 * Main function
 */
function main() {
  const files = getFilesToCheck();
  console.log(`🔍 Checking ${files.length} files...\n`);

  let totalViolations = 0;
  const violationsByType = {};

  // Check each pattern
  for (const [type, pattern] of Object.entries(PATTERNS)) {
    process.stdout.write(`   • ${pattern.description}... `);

    let foundInFiles = 0;
    let examples = [];

    files.forEach(filePath => {
      const violations = checkFile(filePath);
      const violation = violations.find(v => v.type === type);
      if (violation) {
        foundInFiles++;
        examples = examples.concat(violation.examples);
        totalViolations += violation.count;
      }
    });

    if (foundInFiles > 0) {
      console.log('❌ FOUND');
      console.log(`     Examples: ${examples.slice(0, 3).join(', ')}`);
      violationsByType[type] = { count: foundInFiles, examples: examples.slice(0, 3) };
    } else {
      console.log('✅ CLEAN');
    }
  }

  console.log('');

  if (totalViolations === 0) {
    console.log('✅ SUCCESS: No hardcoded values found!');
    console.log('🚀 Your code follows enterprise standards.');
    process.exit(0);
  } else {
    console.log('❌ VIOLATIONS DETECTED');
    console.log('');
    console.log('🔧 Quick fixes:');
    console.log('   • Replace hex colors with: var(--la-color-primary)');
    console.log('   • Replace px values with design tokens');
    console.log('   • Remove inline styles, use CSS classes');
    console.log('');
    console.log('📖 For details run:');
    console.log('   npm run validate:staged');
    process.exit(1);
  }
}

main();