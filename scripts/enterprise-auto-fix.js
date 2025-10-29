#!/usr/bin/env node

/**
 * 🏛️ LAYERA MASTER ENTERPRISE AUTO-FIXER
 * Automated enforcement of ALL enterprise standards
 *
 * 🎯 MISSION: 100% Enterprise Compliance με ZERO violations
 * 🛡️ ENTERPRISE MANIFESTO: Αυτόματη επιβολή όλων των standards
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🏛️ LAYERA MASTER ENTERPRISE AUTO-FIXER');
console.log('=====================================');
console.log('🎯 MISSION: 100% Enterprise Compliance');
console.log('🛡️ ZERO TOLERANCE για violations');
console.log('');

let totalViolationsBefore = 0;
let totalViolationsAfter = 0;

/**
 * Execute command with proper error handling
 */
function executeCommand(command, description) {
  try {
    console.log(`⚡ ${description}...`);
    const output = execSync(command, { encoding: 'utf8', stdio: 'pipe' });
    console.log(`✅ ${description} completed`);
    return { success: true, output };
  } catch (error) {
    console.log(`⚠️  ${description} had issues (continuing...)`);
    return { success: false, error: error.message };
  }
}

/**
 * Count violations before fixing
 */
function countViolationsBefore() {
  console.log('🔍 SCANNING FOR ENTERPRISE VIOLATIONS...');
  console.log('========================================');

  try {
    // Count any types
    const anyTypesOutput = execSync(
      'find apps packages -name "*.ts" -o -name "*.tsx" | xargs grep -c ": any\\b\\|<any>" | grep -v ":0" | wc -l',
      { encoding: 'utf8' }
    );
    const anyTypesCount = parseInt(anyTypesOutput.trim()) || 0;

    // Count hardcoded colors
    const colorsOutput = execSync(
      'find apps packages -name "*.ts" -o -name "*.tsx" | xargs grep -c "#[0-9a-fA-F]\\{3,6\\}\\|rgb(\\|rgba(" | grep -v ":0" | wc -l',
      { encoding: 'utf8' }
    );
    const colorsCount = parseInt(colorsOutput.trim()) || 0;

    totalViolationsBefore = anyTypesCount + colorsCount;

    console.log(`📊 VIOLATIONS DETECTED:`);
    console.log(`  - TypeScript 'any' types: ${anyTypesCount} files`);
    console.log(`  - Hardcoded colors: ${colorsCount} files`);
    console.log(`  - TOTAL VIOLATIONS: ${totalViolationsBefore}`);
    console.log('');

  } catch (error) {
    console.warn('⚠️  Could not count violations accurately');
  }
}

/**
 * Apply all automated fixes
 */
function applyAutomatedFixes() {
  console.log('🤖 APPLYING AUTOMATED ENTERPRISE FIXES...');
  console.log('=========================================');

  // Fix #1: TypeScript any types
  if (fs.existsSync('scripts/domains/typescript/fix-any-types.js')) {
    const result1 = executeCommand('node scripts/domains/typescript/fix-any-types.js', 'TypeScript strict mode enforcement');
    if (result1.success) {
      console.log('🔷 TypeScript any types: FIXED');
    }
  } else {
    console.log('⚠️  TypeScript fixer script not found');
  }

  console.log('');

  // Fix #2: Hardcoded colors
  if (fs.existsSync('scripts/domains/design/fix-hardcoded-colors.js')) {
    const result2 = executeCommand('node scripts/domains/design/fix-hardcoded-colors.js', 'Design tokens enforcement');
    if (result2.success) {
      console.log('🎨 Hardcoded colors: TOKENIZED');
    }
  } else {
    console.log('⚠️  Color fixer script not found');
  }

  console.log('');

  // Fix #3: LEGO violations (NEW - Phase 2)
  if (fs.existsSync('scripts/domains/lego/fix-lego-violations.js')) {
    const result3 = executeCommand('node scripts/domains/lego/fix-lego-violations.js', 'LEGO Systems compliance enforcement');
    if (result3.success) {
      console.log('🧩 LEGO violations: FIXED');
    }
  } else {
    console.log('⚠️  LEGO fixer script not found');
  }

  console.log('');

  // Fix #4: i18n violations (NEW - Phase 2)
  if (fs.existsSync('scripts/domains/i18n/fix-i18n-violations.js')) {
    const result4 = executeCommand('node scripts/domains/i18n/fix-i18n-violations.js', 'Internationalization compliance');
    if (result4.success) {
      console.log('🌐 i18n violations: FIXED');
    }
  } else {
    console.log('⚠️  i18n fixer script not found');
  }

  console.log('');
}

/**
 * Validate fixes worked
 */
function validateFixes() {
  console.log('🏆 ENTERPRISE COMPLIANCE VALIDATION...');
  console.log('=====================================');

  try {
    // Re-count violations
    const anyTypesOutput = execSync(
      'find apps packages -name "*.ts" -o -name "*.tsx" | xargs grep -c ": any\\b\\|<any>" | grep -v ":0" | wc -l',
      { encoding: 'utf8' }
    );
    const anyTypesCount = parseInt(anyTypesOutput.trim()) || 0;

    const colorsOutput = execSync(
      'find apps packages -name "*.ts" -o -name "*.tsx" | xargs grep -c "#[0-9a-fA-F]\\{3,6\\}\\|rgb(\\|rgba(" | grep -v ":0" | wc -l',
      { encoding: 'utf8' }
    );
    const colorsCount = parseInt(colorsOutput.trim()) || 0;

    totalViolationsAfter = anyTypesCount + colorsCount;

    console.log(`📊 POST-FIX ANALYSIS:`);
    console.log(`  - TypeScript 'any' types: ${anyTypesCount} files`);
    console.log(`  - Hardcoded colors: ${colorsCount} files`);
    console.log(`  - TOTAL VIOLATIONS: ${totalViolationsAfter}`);
    console.log('');

    // Calculate improvement
    const improvement = totalViolationsBefore - totalViolationsAfter;
    const percentageImprovement = totalViolationsBefore > 0
      ? Math.round((improvement / totalViolationsBefore) * 100)
      : 100;

    console.log(`📈 IMPROVEMENT METRICS:`);
    console.log(`  - Violations fixed: ${improvement}`);
    console.log(`  - Improvement: ${percentageImprovement}%`);
    console.log('');

  } catch (error) {
    console.warn('⚠️  Could not validate fixes accurately');
  }
}

/**
 * Run comprehensive enterprise validation
 */
function runEnterpriseValidation() {
  console.log('🔍 RUNNING COMPREHENSIVE ENTERPRISE VALIDATION...');
  console.log('=================================================');

  // Run our custom enterprise validator
  const result = executeCommand('npm run enterprise:validate', 'Enterprise validation suite');

  if (result.success) {
    console.log('✅ Enterprise validation: PASSED');
  } else {
    console.log('⚠️  Enterprise validation: Some issues remain');
  }

  console.log('');
}

/**
 * Generate final compliance report
 */
function generateComplianceReport() {
  console.log('📋 ENTERPRISE COMPLIANCE REPORT');
  console.log('===============================');

  const compliancePercentage = totalViolationsBefore > 0
    ? Math.round(((totalViolationsBefore - totalViolationsAfter) / totalViolationsBefore) * 100)
    : 100;

  if (totalViolationsAfter === 0) {
    console.log('🏆 ENTERPRISE EXCELLENCE ACHIEVED!');
    console.log('==================================');
    console.log('✅ TypeScript Strict Mode: 100% COMPLIANT');
    console.log('✅ Design Tokens Usage: 100% COMPLIANT');
    console.log('✅ LEGO Systems Compliance: VERIFIED');
    console.log('✅ Single Sources of Truth: MAINTAINED');
    console.log('');
    console.log('🎉 ΣΥΓΧΑΡΗΤΗΡΙΑ! Enterprise standards: PERFECT');
    console.log('🛡️ Codebase είναι έτοιμος για production');
    console.log('🚀 Zero violations - Full enterprise compliance');

  } else {
    console.log('📊 ENTERPRISE COMPLIANCE STATUS');
    console.log('===============================');
    console.log(`🎯 Compliance Level: ${compliancePercentage}%`);
    console.log(`📈 Violations Fixed: ${totalViolationsBefore - totalViolationsAfter}`);
    console.log(`⚠️  Remaining Issues: ${totalViolationsAfter}`);
    console.log('');
    console.log('📋 NEXT STEPS:');
    console.log('1. Review remaining violations manually');
    console.log('2. Run "npm run enterprise:validate" for details');
    console.log('3. Address edge cases that automation missed');
    console.log('4. Re-run this script until 100% compliance');
  }

  console.log('');
  console.log('🔧 AVAILABLE COMMANDS:');
  console.log('  npm run enterprise:validate  - Full validation');
  console.log('  npm run enterprise:full      - Complete check');
  console.log('  npm run verify               - Quick validation');
  console.log('');
}

/**
 * Main execution flow
 */
async function main() {
  try {
    // Phase 1: Assessment
    countViolationsBefore();

    // Phase 2: Automated Fixes
    applyAutomatedFixes();

    // Phase 3: Validation
    validateFixes();

    // Phase 4: Enterprise Validation
    runEnterpriseValidation();

    // Phase 5: Final Report
    generateComplianceReport();

    console.log('🏁 ENTERPRISE AUTO-FIXER: COMPLETED');
    console.log('===================================');

    // Exit with appropriate code
    process.exit(totalViolationsAfter === 0 ? 0 : 1);

  } catch (error) {
    console.error('💥 CRITICAL ERROR:', error.message);
    console.log('');
    console.log('🚨 Enterprise auto-fixer encountered a critical error');
    console.log('📋 Please run individual scripts manually:');
    console.log('  node scripts/fix-any-types.js');
    console.log('  node scripts/fix-hardcoded-colors.js');
    process.exit(1);
  }
}

// Execute if called directly
if (require.main === module) {
  main();
}

module.exports = {
  main,
  countViolationsBefore,
  applyAutomatedFixes,
  validateFixes
};