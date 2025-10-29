#!/usr/bin/env node

/**
 * 🚨 CRITICAL VALIDATION SCRIPT
 * Fast pre-commit validation for BLOCKING issues only
 *
 * 🎯 ΣΤΟΧΟΣ: Block critical violations that break enterprise standards
 * ⚡ SPEED: <30 seconds execution time
 */

const fs = require('fs');
const path = require('path');

console.log('🚨 CRITICAL VALIDATION - PRE-COMMIT');
console.log('===================================');
console.log('⚡ Fast validation for critical issues only');
console.log('');

let validationPassed = true;
const criticalErrors = [];

/**
 * CRITICAL RULES - BLOCKING ONLY
 * These will prevent commits if found
 */
const CRITICAL_RULES = [
  {
    name: 'TypeScript any types',
    pattern: /:\s*any\b/g,
    severity: 'error',
    message: '🔷 CRITICAL: Remove TypeScript any types',
    category: 'typescript'
  },
  {
    name: 'Console.log in production',
    pattern: /^(?!\s*[*\/]).+console\.log\(/gm, // Ignore lines starting with comment chars
    severity: 'error',
    message: '🚨 CRITICAL: Remove console.log statements',
    category: 'production'
  },
  {
    name: 'Hardcoded API keys',
    pattern: /^(?!\s*[*\/]).+api[_-]?key\s*[=:]\s*["'][^"']+["']/gmi, // Ignore comment lines
    severity: 'error',
    message: '🔐 CRITICAL: Hardcoded API keys detected',
    category: 'security'
  },
  {
    name: 'TODO comments',
    pattern: /\/\/\s*TODO:|\/\*\s*TODO:/gi,
    severity: 'error',
    message: '📝 CRITICAL: TODO comments must be resolved',
    category: 'code-quality'
  },
  {
    name: 'Hardcoded passwords',
    pattern: /^(?!\s*[*\/]).+password\s*[=:]\s*["'](?!password|new-password|current-password)[^"'\s]{8,}["']/gmi, // Ignore HTML constants & comments
    severity: 'error',
    message: '🔐 CRITICAL: Hardcoded passwords detected',
    category: 'security'
  }
];

/**
 * Process file for critical violations
 */
function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    let fileViolations = [];

    CRITICAL_RULES.forEach(({ name, pattern, message, category }) => {
      const matches = content.match(pattern);
      if (matches) {
        fileViolations.push({
          file: path.relative(process.cwd(), filePath),
          rule: name,
          count: matches.length,
          message,
          category
        });
      }
    });

    return fileViolations;
  } catch (error) {
    console.warn(`⚠️  Could not process ${filePath}: ${error.message}`);
    return [];
  }
}

/**
 * Scan directory for critical violations
 */
function scanDirectory(dir, depth = 0) {
  if (!fs.existsSync(dir) || depth > 8) return [];

  let violations = [];
  const items = fs.readdirSync(dir);

  items.forEach(item => {
    if (item === 'node_modules' || item === '.git' || item === 'dist' || item === 'build') return;

    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      violations = violations.concat(scanDirectory(fullPath, depth + 1));
    } else if ((item.endsWith('.ts') || item.endsWith('.tsx') || item.endsWith('.js') || item.endsWith('.jsx'))
               && !item.includes('test') && !item.includes('spec') && !item.includes('.d.ts')) {
      violations = violations.concat(processFile(fullPath));
    }
  });

  return violations;
}

/**
 * Main execution
 */
console.log('🔍 Scanning for critical violations...');
console.log('');

// Scan apps and packages directories
let allViolations = [];

if (fs.existsSync('apps')) {
  console.log('📁 Scanning apps/...');
  allViolations = allViolations.concat(scanDirectory('apps'));
}

if (fs.existsSync('packages')) {
  console.log('📁 Scanning packages/...');
  allViolations = allViolations.concat(scanDirectory('packages'));
}

console.log('');
console.log('📊 CRITICAL VALIDATION RESULTS');
console.log('==============================');

if (allViolations.length === 0) {
  console.log('✅ No critical violations found!');
  console.log('🚀 Ready for commit');
} else {
  console.log(`❌ Found ${allViolations.length} critical violations:`);
  console.log('');

  // Group by category
  const grouped = allViolations.reduce((acc, violation) => {
    if (!acc[violation.category]) acc[violation.category] = [];
    acc[violation.category].push(violation);
    return acc;
  }, {});

  Object.entries(grouped).forEach(([category, violations]) => {
    console.log(`🏷️  ${category.toUpperCase()} (${violations.length}):`);
    violations.slice(0, 5).forEach(v => {
      console.log(`   ${v.message} in ${v.file} (${v.count} occurrences)`);
    });
    if (violations.length > 5) {
      console.log(`   ... and ${violations.length - 5} more files`);
    }
    console.log('');
  });

  console.log('🚨 COMMIT BLOCKED');
  console.log('❌ Fix critical violations before committing');
  validationPassed = false;
}

console.log('');
console.log('💡 QUICK FIXES:');
console.log('  npm run fix:any-types    # Fix TypeScript any types');
console.log('  npm run fix:colors       # Fix hardcoded colors');
console.log('  npm run enterprise:smart # Full validation');

// Exit with error code if validation failed
process.exit(validationPassed ? 0 : 1);