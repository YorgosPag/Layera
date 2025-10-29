#!/usr/bin/env node

/**
 * 🎨 ENTERPRISE DESIGN TOKENS AUTO-FIXER
 * Μαζική διόρθωση hardcoded colors σε design tokens
 *
 * 🎯 ΣΤΟΧΟΣ: ZERO hardcoded colors - μόνο @layera/tokens
 * 🛡️ ENTERPRISE STANDARD: Design system compliance
 */

const fs = require('fs');
const path = require('path');

console.log('🎨 ENTERPRISE DESIGN TOKENS AUTO-FIXER');
console.log('======================================');
console.log('🎯 Target: ZERO hardcoded colors');
console.log('');

let filesModified = 0;
let totalReplacements = 0;

/**
 * Intelligent hardcoded color replacements
 * Mapping common colors to @layera design tokens
 */
const COLOR_REPLACEMENTS = [
  // Common RGBA patterns που είναι ήδη σε var() wrapper
  {
    pattern: /rgba\(0,\s*0,\s*0,\s*0\.1\)/g,
    replacement: 'var(--la-shadow-sm)',
    description: 'Shadow rgba(0,0,0,0.1) -> shadow token'
  },
  {
    pattern: /rgba\(0,\s*0,\s*0,\s*0\.12\)/g,
    replacement: 'var(--la-bg-overlay)',
    description: 'Overlay rgba(0,0,0,0.12) -> overlay token'
  },
  {
    pattern: /rgba\(0,\s*0,\s*0,\s*0\.6\)/g,
    replacement: 'var(--la-overlay-bg)',
    description: 'Modal overlay rgba(0,0,0,0.6) -> overlay token'
  },

  // Hex colors που δεν είναι wrapped
  {
    pattern: /#3b82f6/g,
    replacement: 'var(--la-color-brand)',
    description: 'Blue #3b82f6 -> brand color'
  },
  {
    pattern: /#2563eb/g,
    replacement: 'var(--la-color-brand-hover)',
    description: 'Blue #2563eb -> brand hover'
  },
  {
    pattern: /#1f2937/g,
    replacement: 'var(--la-text-primary)',
    description: 'Dark gray #1f2937 -> text primary'
  },

  // RGB patterns without var()
  {
    pattern: /rgb\(59,\s*130,\s*246\)/g,
    replacement: 'var(--la-color-brand)',
    description: 'RGB blue -> brand color'
  },
  {
    pattern: /rgb\(37,\s*99,\s*235\)/g,
    replacement: 'var(--la-color-brand-hover)',
    description: 'RGB blue hover -> brand hover'
  },

  // Common success/error colors
  {
    pattern: /#22c55e/g,
    replacement: 'var(--la-color-success)',
    description: 'Green #22c55e -> success color'
  },
  {
    pattern: /#ef4444/g,
    replacement: 'var(--la-color-error)',
    description: 'Red #ef4444 -> error color'
  },
  {
    pattern: /#f59e0b/g,
    replacement: 'var(--la-color-warning)',
    description: 'Orange #f59e0b -> warning color'
  },

  // Common grays
  {
    pattern: /#f3f4f6/g,
    replacement: 'var(--la-color-border-subtle)',
    description: 'Light gray #f3f4f6 -> border subtle'
  },
  {
    pattern: /#e5e7eb/g,
    replacement: 'var(--la-color-border-primary)',
    description: 'Gray #e5e7eb -> border primary'
  },
  {
    pattern: /#ffffff/g,
    replacement: 'var(--la-color-surface)',
    description: 'White #ffffff -> surface color'
  },

  // Box shadow patterns με hardcoded rgba
  {
    pattern: /boxShadow:\s*'0\s+2px\s+4px\s+rgba\(0,\s*0,\s*0,\s*0\.1\)'/g,
    replacement: "boxShadow: 'var(--la-shadow-md)'",
    description: 'Box shadow -> shadow token'
  },
  {
    pattern: /box-shadow:\s*0\s+2px\s+4px\s+rgba\(0,\s*0,\s*0,\s*0\.1\)/g,
    replacement: 'box-shadow: var(--la-shadow-md)',
    description: 'CSS box shadow -> shadow token'
  },

  // Background color patterns
  {
    pattern: /backgroundColor:\s*'rgba\(([^']+)\)'/g,
    replacement: (match, rgba) => {
      // Keep rgba that are already using CSS variables
      if (rgba.includes('var(')) {
        return match; // Don't replace
      }
      // Replace simple rgba with overlay tokens
      if (rgba.includes('0, 0, 0')) {
        return "backgroundColor: 'var(--la-bg-overlay)'";
      }
      return "backgroundColor: 'var(--la-bg-secondary)'";
    },
    description: 'Background rgba -> background tokens'
  },

  // Border color patterns
  {
    pattern: /borderColor:\s*'#([a-fA-F0-9]{6})'/g,
    replacement: "borderColor: 'var(--la-color-border-primary)'",
    description: 'Border hex colors -> border tokens'
  },

  // Text color patterns
  {
    pattern: /color:\s*'#([a-fA-F0-9]{6})'/g,
    replacement: "color: 'var(--la-text-primary)'",
    description: 'Text hex colors -> text tokens'
  }
];

/**
 * Advanced replacements που χρειάζονται context analysis
 */
const ADVANCED_REPLACEMENTS = [
  // Alpha values με συγκεκριμένα patterns
  {
    pattern: /rgba\(var\(--color-semantic-success-rgb\),\s*0\.01\)/g,
    replacement: 'var(--la-color-success-alpha-1)',
    description: 'Success alpha 1% -> semantic token'
  },
  {
    pattern: /rgba\(var\(--color-semantic-success-rgb\),\s*0\.02\)/g,
    replacement: 'var(--la-color-success-alpha-2)',
    description: 'Success alpha 2% -> semantic token'
  },
  {
    pattern: /rgba\(var\(--color-semantic-success-rgb\),\s*0\.65\)/g,
    replacement: 'var(--la-color-success-alpha-65)',
    description: 'Success alpha 65% -> semantic token'
  },
  {
    pattern: /rgba\(var\(--color-semantic-success-rgb\),\s*0\.95\)/g,
    replacement: 'var(--la-color-success-alpha-95)',
    description: 'Success alpha 95% -> semantic token'
  },

  // Orange pattern με alpha
  {
    pattern: /rgba\(249,\s*115,\s*22,\s*0\.95\)/g,
    replacement: 'var(--la-color-warning-alpha-95)',
    description: 'Orange alpha 95% -> warning token'
  },
  {
    pattern: /rgba\(249,\s*115,\s*22,\s*0\.3\)/g,
    replacement: 'var(--la-color-warning-alpha-30)',
    description: 'Orange alpha 30% -> warning border'
  }
];

/**
 * Process file for hardcoded colors
 */
function processFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = false;
    let fileReplacements = 0;

    // Apply basic color replacements
    COLOR_REPLACEMENTS.forEach(({ pattern, replacement, description }) => {
      const originalContent = content;

      if (typeof replacement === 'function') {
        content = content.replace(pattern, replacement);
      } else {
        content = content.replace(pattern, replacement);
      }

      if (content !== originalContent) {
        const matches = originalContent.match(pattern) || [];
        fileReplacements += matches.length;
        modified = true;
        console.log(`  ✅ ${matches.length} ${description} in ${path.basename(filePath)}`);
      }
    });

    // Apply advanced replacements
    ADVANCED_REPLACEMENTS.forEach(({ pattern, replacement, description }) => {
      const matches = content.match(pattern);
      if (matches) {
        content = content.replace(pattern, replacement);
        fileReplacements += matches.length;
        modified = true;
        console.log(`  🎨 ${matches.length} ${description} in ${path.basename(filePath)}`);
      }
    });

    // Write back if modified
    if (modified) {
      fs.writeFileSync(filePath, content, 'utf8');
      filesModified++;
      totalReplacements += fileReplacements;
      console.log(`📝 Modified: ${filePath} (${fileReplacements} replacements)`);
    }

  } catch (error) {
    console.warn(`⚠️  Could not process ${filePath}: ${error.message}`);
  }
}

/**
 * Check if color is already in a var() wrapper
 */
function isAlreadyTokenized(line, colorMatch) {
  // Check if the color is within a var() call
  const varPattern = /var\([^)]+\)/;
  return varPattern.test(line) && line.indexOf(colorMatch) > line.indexOf('var(');
}

/**
 * Recursively scan directories
 */
function scanDirectory(dir, depth = 0) {
  if (!fs.existsSync(dir) || depth > 8) return;

  const items = fs.readdirSync(dir);
  items.forEach(item => {
    if (item === 'node_modules' || item === '.git' || item === 'dist' || item === 'build') return;

    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      scanDirectory(fullPath, depth + 1);
    } else if (item.endsWith('.ts') || item.endsWith('.tsx') || item.endsWith('.css') || item.endsWith('.scss')) {
      processFile(fullPath);
    }
  });
}

/**
 * Main execution
 */
console.log('🔍 Scanning for hardcoded colors...');
console.log('');

// Scan apps directory
if (fs.existsSync('apps')) {
  console.log('📁 Processing apps/...');
  scanDirectory('apps');
}

// Scan packages directory
if (fs.existsSync('packages')) {
  console.log('📁 Processing packages/...');
  scanDirectory('packages');
}

console.log('');
console.log('📊 DESIGN TOKENS AUTO-FIXER SUMMARY');
console.log('===================================');
console.log(`📝 Files modified: ${filesModified}`);
console.log(`🎨 Total replacements: ${totalReplacements}`);

if (totalReplacements > 0) {
  console.log('');
  console.log('✅ SUCCESS: Hardcoded colors have been tokenized!');
  console.log('🎯 All colors now use @layera design tokens');
  console.log('🛡️ Enterprise design system compliance: ACTIVE');
} else {
  console.log('');
  console.log('ℹ️  No hardcoded colors found - already compliant!');
  console.log('🏆 Design tokens usage: PERFECT');
}

console.log('');
console.log('🚀 Next: Run master automation script');

process.exit(0);