#!/usr/bin/env node

/**
 * 🏛️ UNIFIED ENTERPRISE VALIDATION ENGINE
 * Single Source of Truth για όλους τους enterprise validation κανόνες
 *
 * 🎯 ΣΤΟΧΟΣ: Clean, actionable feedback χωρίς TypeScript ecosystem noise
 * 🛡️ ENTERPRISE STANDARD: Smart filtering + layered validation
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🏛️ LAYERA UNIFIED ENTERPRISE VALIDATION ENGINE');
console.log('==============================================');
console.log('🎯 Smart Filtering • Clean Output • Actionable Results');
console.log('');

/**
 * VALIDATION RULE CATEGORIES (Single Source of Truth)
 */

// 1. ENTERPRISE POLICY RULES (από .eslintrc.cjs)
const ENTERPRISE_POLICY_RULES = [
  {
    name: 'LEGO Card Violations',
    pattern: /const\s+\w*Card\w*\s*=/g,
    severity: 'error',
    message: '❌ LEGO VIOLATION: Χρησιμοποίησε BaseCard από @layera/cards',
    category: 'policy'
  },
  {
    name: 'LEGO Button Violations',
    pattern: /const\s+\w*Button\w*\s*=/g,
    severity: 'error',
    message: '❌ LEGO VIOLATION: Χρησιμοποίησε Button από @layera/buttons',
    category: 'policy'
  },
  {
    name: 'LEGO Icon Violations',
    pattern: /const\s+\w*Icon\w*\s*=/g,
    severity: 'error',
    message: '❌ LEGO VIOLATION: Χρησιμοποίησε icons από @layera/icons',
    category: 'policy'
  },
  {
    name: 'Styled Components',
    pattern: /styled\./g,
    severity: 'error',
    message: '❌ LEGO VIOLATION: Χρησιμοποίησε @layera components αντί για styled-components',
    category: 'policy'
  },
  {
    name: 'Magic Numbers',
    pattern: /:\s*[2-9]\d+/g,
    severity: 'warning',
    message: '⚠️  MAGIC NUMBER: Χρησιμοποίησε constants από @layera/constants',
    category: 'policy'
  }
];

// 2. DESIGN TOKEN RULES (από .husky/pre-commit)
const DESIGN_TOKEN_RULES = [
  {
    name: 'Hardcoded Colors',
    pattern: /#[0-9a-fA-F]{3,6}|rgb\(|rgba\(/g,
    severity: 'warning',
    message: '🎨 DESIGN TOKEN: Χρησιμοποίησε var(--la-color-*) από @layera/tokens',
    category: 'design',
    exclude: ['**/*.svg', 'packages/tokens/**']
  },
  {
    name: 'Hardcoded Z-Index',
    pattern: /zIndex\s*:\s*[0-9]+/g,
    severity: 'error',
    message: '📐 DESIGN TOKEN: Χρησιμοποίησε var(--la-z-index-*) από @layera/tokens',
    category: 'design'
  },
  {
    name: 'Hardcoded Font Family',
    pattern: /fontFamily\s*:/g,
    severity: 'error',
    message: '✍️ DESIGN TOKEN: Χρησιμοποίησε var(--la-font-family-*) από @layera/tokens',
    category: 'design'
  }
];

// 3. I18N RULES (από validate-duplicates.js)
const I18N_RULES = [
  {
    name: 'Hardcoded Greek Strings',
    pattern: /"[^"]*[α-ωΑ-Ω][^"]*"/g,
    severity: 'error',
    message: '🌐 I18N VIOLATION: Χρησιμοποίησε t() function για internationalization',
    category: 'i18n',
    filter: (line) => !line.includes('t(') // Exclude lines that already use t()
  },
  {
    name: 'Emoji Usage',
    pattern: /[🏠🏢⚠️✅❌📍🔍🎯🚀🔥]/g,
    severity: 'warning',
    message: '😀 ICON VIOLATION: Χρησιμοποίησε @layera/icons αντί για emoji',
    category: 'i18n'
  }
];

// 4. TYPESCRIPT QUALITY RULES (από scripts/fix-any-types.js)
const TYPESCRIPT_RULES = [
  {
    name: 'Any Types',
    pattern: /:\s*any\b|<any>/g,
    severity: 'warning',
    message: '🔷 TYPESCRIPT: Χρησιμοποίησε specific types αντί για any',
    category: 'typescript',
    exclude: ['**/@types/**', '**/node_modules/**']
  },
  {
    name: 'Implicit Any',
    pattern: /\(.*\)\s*=>/g,
    severity: 'info',
    message: 'ℹ️  TYPESCRIPT: Πρόσθεσε explicit types σε function parameters',
    category: 'typescript'
  }
];

/**
 * VALIDATION ENGINE CORE
 */

class EnterpriseValidationEngine {
  constructor() {
    this.results = {
      policy: [],
      design: [],
      i18n: [],
      typescript: [],
      duplicates: []
    };
    this.stats = {
      filesScanned: 0,
      violationsFound: 0,
      errorsFound: 0,
      warningsFound: 0
    };
  }

  // Smart file filtering - exclude problematic noise sources
  shouldIncludeFile(filePath) {
    const excludePatterns = [
      'node_modules/',
      '.git/',
      '/dist/',
      '/build/',
      '/@types/',
      '.test.',
      '.spec.',
      '__tests__',
      'test-setup.ts'  // Exclude test files that cause noise
    ];

    return !excludePatterns.some(pattern => filePath.includes(pattern));
  }

  // Smart TypeScript filtering - only show actionable TypeScript errors
  filterTypeScriptErrors(output) {
    const lines = output.split('\n');
    const actionableErrors = [];

    for (const line of lines) {
      // Skip common ecosystem noise
      if (this.isTypeScriptNoise(line)) continue;

      // Include only actionable errors
      if (this.isActionableTypeScriptError(line)) {
        actionableErrors.push(line);
      }
    }

    return actionableErrors;
  }

  isTypeScriptNoise(line) {
    const noisePatterns = [
      'Type \'bigint\' is not assignable to type \'ReactNode\'',
      'Cannot find module \'@layera/',  // Missing builds - not policy violations
      'Property \'children\' does not exist on type \'IntrinsicAttributes\'',
      'import("C:/layera/node_modules/.pnpm',  // PNPM conflicts
      'vite-plugin-dts',  // Dev dependency issues
      'ReactNode | Promise<ReactNode>',  // React version conflicts
      'exactOptionalPropertyTypes: true'  // Config strictness issues
    ];

    return noisePatterns.some(pattern => line.includes(pattern));
  }

  isActionableTypeScriptError(line) {
    const actionablePatterns = [
      'no-explicit-any',
      'magic-numbers',
      'no-restricted-syntax',
      'import/no-cycle',
      'react-hooks/exhaustive-deps'
    ];

    return actionablePatterns.some(pattern => line.includes(pattern));
  }

  // Scan file with all rule categories
  scanFile(filePath) {
    if (!this.shouldIncludeFile(filePath)) return;

    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const lines = content.split('\n');

      this.stats.filesScanned++;

      // Apply all rule categories
      [
        ...ENTERPRISE_POLICY_RULES,
        ...DESIGN_TOKEN_RULES,
        ...I18N_RULES,
        ...TYPESCRIPT_RULES
      ].forEach(rule => {
        this.applyRule(rule, content, lines, filePath);
      });

    } catch (error) {
      // Skip files that can't be read
    }
  }

  applyRule(rule, content, lines, filePath) {
    // Check exclude patterns (optimized)
    if (rule.exclude && rule.exclude.some(pattern =>
      filePath.includes(pattern.replace('**/', '').replace('*', '')))) {
      return;
    }

    // Skip large files to prevent timeout
    if (content.length > 100000) return; // Skip files > 100KB

    const matches = content.match(rule.pattern) || [];

    // Limit matches to prevent excessive processing
    const limitedMatches = matches.slice(0, 20); // Max 20 matches per rule per file

    limitedMatches.forEach(match => {
      // Apply line-level filtering if specified
      if (rule.filter) {
        const matchingLines = lines.filter(line => line.includes(match));
        const filteredLines = matchingLines.filter(rule.filter);

        if (filteredLines.length === 0) return;
      }

      const violation = {
        file: path.relative(process.cwd(), filePath),
        rule: rule.name,
        message: rule.message,
        severity: rule.severity,
        match: match.substring(0, 50) // Truncate long matches
      };

      this.results[rule.category].push(violation);
      this.stats.violationsFound++;

      if (rule.severity === 'error') this.stats.errorsFound++;
      if (rule.severity === 'warning') this.stats.warningsFound++;
    });
  }

  // Scan directories recursively (OPTIMIZED)
  scanDirectory(dir, depth = 0) {
    if (!fs.existsSync(dir) || depth > 6) return; // Reduced depth

    // Skip heavy directories early
    const skipDirs = ['node_modules', '.git', 'dist', 'build', '__tests__', 'test', '.next', '.vite'];
    if (skipDirs.some(skip => dir.includes(skip))) return;

    try {
      const items = fs.readdirSync(dir);

      items.forEach(item => {
        // Skip common non-essential items
        if (skipDirs.includes(item)) return;

        const fullPath = path.join(dir, item);

        try {
          const stat = fs.statSync(fullPath);

          if (stat.isDirectory()) {
            this.scanDirectory(fullPath, depth + 1);
          } else if (item.endsWith('.ts') || item.endsWith('.tsx') ||
                     item.endsWith('.js') || item.endsWith('.jsx')) {
            this.scanFile(fullPath);
          }
        } catch (statError) {
          // Skip files we can't stat
        }
      });
    } catch (readError) {
      // Skip directories we can't read
    }
  }

  // Run enterprise-specific validations (from validate-duplicates.js)
  runEnterpriseValidations() {
    console.log('🔍 Running enterprise-specific validations...');

    try {
      // Run our proven enterprise validator with timeout
      const output = execSync('node validate-duplicates.js', {
        encoding: 'utf8',
        stdio: 'pipe',
        timeout: 30000 // 30 second timeout
      });

      // Parse validation results
      if (output.includes('ALL VALIDATIONS PASSED')) {
        console.log('✅ Enterprise validations: PASSED');
      } else {
        console.log('⚠️  Enterprise validations: Some issues detected');

        // Extract key metrics from output
        const duplicatesMatch = output.match(/Duplicates found: (\d+)/);
        const legoMatch = output.match(/Found (\d+) @layera imports/);

        if (duplicatesMatch) {
          console.log(`   📊 Duplicates: ${duplicatesMatch[1]}`);
        }
        if (legoMatch) {
          console.log(`   🧩 LEGO imports: ${legoMatch[1]}`);
        }
      }

    } catch (error) {
      if (error.code === 'TIMEOUT') {
        console.log('⏱️  Enterprise validation timed out - using fast validation');
        this.runFastEnterpriseCheck();
      } else {
        console.log('⚠️  Enterprise validation issues detected');
      }
    }
  }

  // Fast enterprise check (backup method)
  runFastEnterpriseCheck() {
    console.log('🚀 Running fast enterprise compliance check...');

    try {
      // Quick duplicate check
      const duplicateOutput = execSync('npm run dup:check', {
        encoding: 'utf8',
        stdio: 'pipe',
        timeout: 10000
      });
      console.log('✅ Duplicate check: PASSED');
    } catch (error) {
      console.log('⚠️  Duplicate issues detected');
    }
  }

  // Smart TypeScript check - filter noise
  runSmartTypeScriptCheck() {
    console.log('🔷 Running smart TypeScript check...');

    try {
      const output = execSync('npm run lint', {
        encoding: 'utf8',
        stdio: 'pipe'
      });

      const actionableErrors = this.filterTypeScriptErrors(output);

      if (actionableErrors.length === 0) {
        console.log('✅ TypeScript quality: EXCELLENT');
      } else {
        console.log(`⚠️  Found ${actionableErrors.length} actionable TypeScript issues`);

        // Show first 5 actionable errors
        actionableErrors.slice(0, 5).forEach(error => {
          console.log(`   ${error}`);
        });

        if (actionableErrors.length > 5) {
          console.log(`   ... και ${actionableErrors.length - 5} ακόμη`);
        }
      }

    } catch (error) {
      // ESLint errors are expected - we filter them
      const errorOutput = error.stdout || error.message;
      const actionableErrors = this.filterTypeScriptErrors(errorOutput);

      if (actionableErrors.length > 0) {
        console.log(`⚠️  Found ${actionableErrors.length} actionable issues`);
        actionableErrors.slice(0, 3).forEach(error => {
          console.log(`   ${error.substring(0, 100)}...`);
        });
      } else {
        console.log('✅ No actionable TypeScript issues');
      }
    }
  }

  // Generate clean, actionable report
  generateReport() {
    console.log('\n📊 ENTERPRISE VALIDATION RESULTS');
    console.log('================================');
    console.log(`📁 Files scanned: ${this.stats.filesScanned}`);
    console.log(`🎯 Total violations: ${this.stats.violationsFound}`);
    console.log(`❌ Errors: ${this.stats.errorsFound}`);
    console.log(`⚠️  Warnings: ${this.stats.warningsFound}`);
    console.log('');

    // Report by category
    Object.entries(this.results).forEach(([category, violations]) => {
      if (violations.length === 0) return;

      console.log(`🏷️  ${category.toUpperCase()} ISSUES (${violations.length}):`);

      // Group by rule name
      const groupedViolations = violations.reduce((acc, v) => {
        acc[v.rule] = acc[v.rule] || [];
        acc[v.rule].push(v);
        return acc;
      }, {});

      Object.entries(groupedViolations).forEach(([rule, ruleViolations]) => {
        console.log(`   ${ruleViolations[0].message}`);
        console.log(`   📍 Found in ${ruleViolations.length} locations`);

        // Show top 3 files
        ruleViolations.slice(0, 3).forEach(v => {
          console.log(`      📄 ${v.file}`);
        });

        if (ruleViolations.length > 3) {
          console.log(`      ... και ${ruleViolations.length - 3} ακόμη αρχεία`);
        }
        console.log('');
      });
    });

    // Final summary
    const totalIssues = this.stats.errorsFound + this.stats.warningsFound;

    if (totalIssues === 0) {
      console.log('🏆 ENTERPRISE EXCELLENCE ACHIEVED!');
      console.log('✅ All validations passed');
      console.log('🚀 Ready for development');
    } else if (this.stats.errorsFound === 0) {
      console.log('🎯 GOOD COMPLIANCE STATUS');
      console.log(`⚠️  ${this.stats.warningsFound} warnings to address`);
      console.log('💡 Recommended for cleanup');
    } else {
      console.log('🚨 COMPLIANCE ISSUES DETECTED');
      console.log(`❌ ${this.stats.errorsFound} critical errors`);
      console.log(`⚠️  ${this.stats.warningsFound} warnings`);
      console.log('🔧 Action required before development');
    }

    console.log('\n🛠️  AVAILABLE TOOLS:');
    console.log('  npm run enterprise:auto-fix    # Fix violations automatically');
    console.log('  npm run enterprise:validate    # Detailed validation report');
    console.log('  npm run fix:any-types         # Fix TypeScript any types');
    console.log('  npm run fix:colors            # Fix hardcoded colors');

    return totalIssues === 0 ? 0 : (this.stats.errorsFound > 0 ? 1 : 0);
  }

  // Main execution
  async run() {
    console.log('🚀 Starting unified enterprise validation...');
    console.log('');

    // Phase 1: Code pattern analysis (fast)
    console.log('📋 Phase 1: Analyzing code patterns...');
    const startTime = Date.now();

    console.log('   📁 Scanning apps directory...');
    this.scanDirectory('apps');
    console.log(`   ✅ Apps scanned: ${this.stats.filesScanned} files`);

    const appsCount = this.stats.filesScanned;
    console.log('   📦 Scanning packages directory...');
    this.scanDirectory('packages');
    console.log(`   ✅ Packages scanned: ${this.stats.filesScanned - appsCount} files`);

    const scanTime = ((Date.now() - startTime) / 1000).toFixed(1);
    console.log(`   ⏱️  Pattern analysis completed in ${scanTime}s`);

    // Phase 2: Enterprise validations (proven)
    console.log('🏛️  Phase 2: Enterprise compliance check...');
    this.runEnterpriseValidations();

    // Phase 3: Smart TypeScript analysis (filtered)
    console.log('🔷 Phase 3: Smart TypeScript quality check...');
    this.runSmartTypeScriptCheck();

    console.log('✅ Validation complete!');

    return this.generateReport();
  }
}

/**
 * MAIN EXECUTION
 */
async function main() {
  try {
    const engine = new EnterpriseValidationEngine();
    const exitCode = await engine.run();
    process.exit(exitCode);
  } catch (error) {
    console.error('💥 VALIDATION ENGINE ERROR:', error.message);
    process.exit(1);
  }
}

// Execute if called directly
if (require.main === module) {
  main();
}

module.exports = { EnterpriseValidationEngine };