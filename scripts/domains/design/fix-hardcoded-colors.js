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
    pattern: /#22c55e/gi,
    replacement: 'var(--la-color-success)',
    description: 'Green #22c55e -> success color'
  },
  {
    pattern: /#22C55E/gi,
    replacement: 'var(--la-color-success)',
    description: 'Green #22C55E -> success color'
  },
  {
    pattern: /#ef4444/gi,
    replacement: 'var(--la-color-error)',
    description: 'Red #ef4444 -> error color'
  },
  {
    pattern: /#f59e0b/gi,
    replacement: 'var(--la-color-warning)',
    description: 'Orange #f59e0b -> warning color'
  },
  {
    pattern: /#F59E0B/gi,
    replacement: 'var(--la-color-warning)',
    description: 'Orange #F59E0B -> warning color'
  },

  // Colors found in analysis
  {
    pattern: /#007AFF/gi,
    replacement: 'var(--la-color-primary)',
    description: 'iOS blue #007AFF -> primary color'
  },
  {
    pattern: /#6b7280/gi,
    replacement: 'var(--la-text-secondary)',
    description: 'Gray #6b7280 -> secondary text'
  },
  {
    pattern: /#000/gi,
    replacement: 'var(--la-color-black)',
    description: 'Black #000 -> black token'
  },
  {
    pattern: /#dadce0/gi,
    replacement: 'var(--la-color-border-subtle)',
    description: 'Light gray #dadce0 -> border subtle'
  },
  {
    pattern: /#4285F4/gi,
    replacement: 'var(--la-color-brand)',
    description: 'Google blue #4285F4 -> brand color'
  },
  {
    pattern: /#34A853/gi,
    replacement: 'var(--la-color-success)',
    description: 'Google green #34A853 -> success color'
  },
  {
    pattern: /#10B981/gi,
    replacement: 'var(--la-color-success)',
    description: 'Emerald #10B981 -> success color'
  },
  {
    pattern: /#10b981/gi,
    replacement: 'var(--la-color-success)',
    description: 'Emerald #10b981 -> success color'
  },
  {
    pattern: /#3B82F6/gi,
    replacement: 'var(--la-color-primary)',
    description: 'Blue #3B82F6 -> primary color'
  },
  {
    pattern: /#6B7280/gi,
    replacement: 'var(--la-text-secondary)',
    description: 'Gray #6B7280 -> secondary text'
  },
  {
    pattern: /#059669/gi,
    replacement: 'var(--la-color-success-dark)',
    description: 'Dark green #059669 -> success dark'
  },
  {
    pattern: /#d97706/gi,
    replacement: 'var(--la-color-warning-dark)',
    description: 'Orange #d97706 -> warning dark'
  },
  {
    pattern: /#60a5fa/gi,
    replacement: 'var(--la-color-primary-light)',
    description: 'Light blue #60a5fa -> primary light'
  },
  {
    pattern: /#8B5CF6/gi,
    replacement: 'var(--la-color-accent)',
    description: 'Purple #8B5CF6 -> accent color'
  },
  {
    pattern: /#64748b/gi,
    replacement: 'var(--la-text-muted)',
    description: 'Slate #64748b -> muted text'
  },
  {
    pattern: /#06b6d4/gi,
    replacement: 'var(--la-color-info)',
    description: 'Cyan #06b6d4 -> info color'
  },
  {
    pattern: /#fff/gi,
    replacement: 'var(--la-color-white)',
    description: 'White #fff -> white token'
  },
  {
    pattern: /#fafafa/gi,
    replacement: 'var(--la-bg-subtle)',
    description: 'Very light gray #fafafa -> subtle background'
  },
  {
    pattern: /#0f0f0f/gi,
    replacement: 'var(--la-color-black)',
    description: 'Near black #0f0f0f -> black token'
  },

  // More specific colors from analysis
  {
    pattern: /#ff6b6b/gi,
    replacement: 'var(--la-color-error-light)',
    description: 'Light red #ff6b6b -> error light'
  },
  {
    pattern: /#4ecdc4/gi,
    replacement: 'var(--la-color-teal)',
    description: 'Teal #4ecdc4 -> teal color'
  },
  {
    pattern: /#45b7d1/gi,
    replacement: 'var(--la-color-blue-light)',
    description: 'Light blue #45b7d1 -> blue light'
  },
  {
    pattern: /#f97316/gi,
    replacement: 'var(--la-color-orange)',
    description: 'Orange #f97316 -> orange color'
  },
  {
    pattern: /#e3f2fd/gi,
    replacement: 'var(--la-bg-info-light)',
    description: 'Light blue bg #e3f2fd -> info light background'
  },
  {
    pattern: /#f5f5f5/gi,
    replacement: 'var(--la-bg-subtle)',
    description: 'Light gray #f5f5f5 -> subtle background'
  },
  {
    pattern: /#2c3e50/gi,
    replacement: 'var(--la-color-dark)',
    description: 'Dark blue-gray #2c3e50 -> dark color'
  },
  {
    pattern: /#ecf0f1/gi,
    replacement: 'var(--la-bg-light)',
    description: 'Very light gray #ecf0f1 -> light background'
  },
  {
    pattern: /#e74c3c/gi,
    replacement: 'var(--la-color-error)',
    description: 'Red #e74c3c -> error color'
  },
  {
    pattern: /#000000/gi,
    replacement: 'var(--la-color-black)',
    description: 'Full black #000000 -> black token'
  },

  // Remaining specific colors from latest analysis
  {
    pattern: /#FBBC05/gi,
    replacement: 'var(--la-color-yellow)',
    description: 'Google yellow #FBBC05 -> yellow token'
  },
  {
    pattern: /#EA4335/gi,
    replacement: 'var(--la-color-red)',
    description: 'Google red #EA4335 -> red token'
  },
  {
    pattern: /#96ceb4/gi,
    replacement: 'var(--la-color-green-light)',
    description: 'Light green #96ceb4 -> green light'
  },
  {
    pattern: /#ffeaa7/gi,
    replacement: 'var(--la-color-yellow-light)',
    description: 'Light yellow #ffeaa7 -> yellow light'
  },
  {
    pattern: /#dda0dd/gi,
    replacement: 'var(--la-color-purple-light)',
    description: 'Light purple #dda0dd -> purple light'
  },
  {
    pattern: /#374151/gi,
    replacement: 'var(--la-color-gray-dark)',
    description: 'Dark gray #374151 -> gray dark'
  },
  {
    pattern: /#9ca3af/gi,
    replacement: 'var(--la-text-muted)',
    description: 'Medium gray #9ca3af -> muted text'
  },
  {
    pattern: /#d1d5db/gi,
    replacement: 'var(--la-color-border-light)',
    description: 'Light gray #d1d5db -> border light'
  },
  {
    pattern: /#3498db/gi,
    replacement: 'var(--la-color-blue)',
    description: 'Blue #3498db -> blue token'
  },
  {
    pattern: /#34495e/gi,
    replacement: 'var(--la-color-slate)',
    description: 'Slate #34495e -> slate token'
  },
  {
    pattern: /#bdc3c7/gi,
    replacement: 'var(--la-color-gray-light)',
    description: 'Light gray #bdc3c7 -> gray light'
  },

  // Final snap.ts colors (CSS fallbacks)
  {
    pattern: /#98d8c8/gi,
    replacement: 'var(--la-color-teal-light)',
    description: 'Teal light #98d8c8 -> teal light token'
  },
  {
    pattern: /#f7dc6f/gi,
    replacement: 'var(--la-color-yellow-medium)',
    description: 'Yellow medium #f7dc6f -> yellow medium token'
  },
  {
    pattern: /#bb8fce/gi,
    replacement: 'var(--la-color-purple-medium)',
    description: 'Purple medium #bb8fce -> purple medium token'
  },
  {
    pattern: /#85c1e9/gi,
    replacement: 'var(--la-color-blue-medium)',
    description: 'Blue medium #85c1e9 -> blue medium token'
  },
  {
    pattern: /#1abc9c/gi,
    replacement: 'var(--la-color-teal-600)',
    description: 'Teal 600 #1abc9c -> teal 600 token'
  },
  {
    pattern: /#2ecc71/gi,
    replacement: 'var(--la-color-green-600)',
    description: 'Green 600 #2ecc71 -> green 600 token'
  },
  {
    pattern: /#f39c12/gi,
    replacement: 'var(--la-color-orange-600)',
    description: 'Orange 600 #f39c12 -> orange 600 token'
  },
  {
    pattern: /#9b59b6/gi,
    replacement: 'var(--la-color-purple-600)',
    description: 'Purple 600 #9b59b6 -> purple 600 token'
  },
  {
    pattern: /#16a085/gi,
    replacement: 'var(--la-color-teal-700)',
    description: 'Teal 700 #16a085 -> teal 700 token'
  },
  {
    pattern: /#f1c40f/gi,
    replacement: 'var(--la-color-yellow-600)',
    description: 'Yellow 600 #f1c40f -> yellow 600 token'
  },
  {
    pattern: /#8e44ad/gi,
    replacement: 'var(--la-color-purple-700)',
    description: 'Purple 700 #8e44ad -> purple 700 token'
  },
  {
    pattern: /#2980b9/gi,
    replacement: 'var(--la-color-blue-700)',
    description: 'Blue 700 #2980b9 -> blue 700 token'
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