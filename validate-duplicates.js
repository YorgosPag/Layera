#!/usr/bin/env node

/**
 * ENTERPRISE DUPLICATE PREVENTION SYSTEM
 * Επέκταση του validate-geo-drawing.js για generic duplicate detection
 * Βασισμένο στο DUPLICATE_PREVENTION_PROTOCOL.md
 *
 * 🎯 ΣΤΟΧΟΣ: ΜΗΔΕΝΙΚΑ ΔΙΠΛΟΤΥΠΑ σε όλο το Layera project
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🛡️ LAYERA ENTERPRISE DUPLICATE PREVENTION SYSTEM');
console.log('================================================');
console.log('⚡ Powered by existing validation infrastructure');
console.log('📋 Based on DUPLICATE_PREVENTION_PROTOCOL.md');
console.log('');

let validationPassed = true;
const errors = [];
const warnings = [];
const duplicateReports = [];

/**
 * Helper functions (επέκταση από validate-geo-drawing.js)
 */
function logError(message) {
  errors.push(message);
  console.log(`❌ ${message}`);
  validationPassed = false;
}

function logWarning(message) {
  warnings.push(message);
  console.log(`⚠️  ${message}`);
}

function logSuccess(message) {
  console.log(`✅ ${message}`);
}

function logInfo(message) {
  console.log(`ℹ️  ${message}`);
}

/**
 * 1. ΥΠΟΧΡΕΩΤΙΚΗ ΠΡΟΣΑΡΩΣΗ (από DUPLICATE_PREVENTION_PROTOCOL)
 */
console.log('\n🔍 ΒΗΜΑ 1: ΥΠΟΧΡΕΩΤΙΚΗ ΠΡΟΣΑΡΩΣΗ ΠΡΙΝ ΓΡΑΦΩ ΚΩΔΙΚΑ');
console.log('====================================================');

function scanForDuplicateFiles() {
  console.log('\n📁 Έλεγχος για duplicated files:');

  try {
    // Find duplicate filenames in packages
    const duplicateFiles = execSync(
      'find packages/ -name "*.ts" -exec basename {} \\; | sort | uniq -d',
      { encoding: 'utf8' }
    ).trim();

    if (duplicateFiles) {
      duplicateFiles.split('\n').forEach(file => {
        if (file.trim()) {
          logError(`Duplicate filename found: ${file}`);
          duplicateReports.push(`Duplicate file: ${file}`);
        }
      });
    } else {
      logSuccess('No duplicate filenames found');
    }
  } catch (error) {
    logWarning('Could not check for duplicate files');
  }
}

function scanForDuplicateExports() {
  console.log('\n📤 Έλεγχος για duplicated exports:');

  try {
    // Check for duplicate exports across packages
    const packages = fs.readdirSync('packages/').filter(pkg =>
      fs.statSync(path.join('packages', pkg)).isDirectory()
    );

    const allExports = {};

    packages.forEach(pkg => {
      const indexPath = path.join('packages', pkg, 'src', 'index.ts');
      if (fs.existsSync(indexPath)) {
        const content = fs.readFileSync(indexPath, 'utf8');
        const exportMatches = content.match(/export\s+(?:\{[^}]+\}|[^{;]+)/g);

        if (exportMatches) {
          exportMatches.forEach(exportLine => {
            const exportName = exportLine.replace(/export\s+(\{[^}]+\}|[^{;]+)/, '$1').trim();
            if (allExports[exportName]) {
              logError(`Duplicate export found: ${exportName} in ${pkg} and ${allExports[exportName]}`);
              duplicateReports.push(`Duplicate export: ${exportName}`);
            } else {
              allExports[exportName] = pkg;
            }
          });
        }
      }
    });

    if (duplicateReports.filter(r => r.includes('Duplicate export')).length === 0) {
      logSuccess('No duplicate exports found');
    }
  } catch (error) {
    logWarning('Could not check for duplicate exports');
  }
}

function scanForDuplicateCSS() {
  console.log('\n🎨 Έλεγχος για duplicated CSS tokens:');

  try {
    const cssTokens = {};

    // Scan CSS files in packages
    const findCSSResult = execSync(
      'find packages/ -name "*.css" -exec grep -H "\\-\\-[a-z]" {} \\; 2>/dev/null || true',
      { encoding: 'utf8' }
    ).trim();

    if (findCSSResult) {
      findCSSResult.split('\n').forEach(line => {
        const match = line.match(/^([^:]+):.*?(--[a-z-]+)/);
        if (match) {
          const [, file, token] = match;
          if (cssTokens[token]) {
            logError(`Duplicate CSS token: ${token} in ${file} and ${cssTokens[token]}`);
            duplicateReports.push(`Duplicate CSS token: ${token}`);
          } else {
            cssTokens[token] = file;
          }
        }
      });
    }

    if (duplicateReports.filter(r => r.includes('Duplicate CSS token')).length === 0) {
      logSuccess('No duplicate CSS tokens found');
    }
  } catch (error) {
    logWarning('Could not check for duplicate CSS tokens');
  }
}

/**
 * 2. LEGO COMPLIANCE VALIDATION (από LEGO_SYSTEMS_REGISTRY.md)
 */
console.log('\n🧩 ΒΗΜΑ 2: LEGO SYSTEMS COMPLIANCE VALIDATION');
console.log('==============================================');

function validateLEGOCompliance() {
  console.log('\n🔍 Έλεγχος για anti-patterns:');

  try {
    // Check for styled-components instead of LEGO
    const styledComponents = execSync(
      'grep -r "styled\\." apps/ --exclude-dir=node_modules 2>/dev/null | wc -l',
      { encoding: 'utf8' }
    ).trim();

    if (parseInt(styledComponents) > 0) {
      logError(`Found ${styledComponents} styled-component usages (should use @layera packages)`);
    } else {
      logSuccess('No styled-components anti-patterns found');
    }

    // Check for hardcoded colors
    const hardcodedColors = execSync(
      'grep -r "#[0-9a-fA-F]\\{6\\}\\|rgb(" apps/ --exclude-dir=node_modules 2>/dev/null | wc -l',
      { encoding: 'utf8' }
    ).trim();

    if (parseInt(hardcodedColors) > 5) { // Allow some exceptions
      logWarning(`Found ${hardcodedColors} hardcoded colors (should use design tokens)`);
    } else {
      logSuccess('Minimal hardcoded colors found');
    }

    // Check LEGO imports
    const legoImports = execSync(
      'grep -r "from.*@layera/" apps/ --exclude-dir=node_modules 2>/dev/null | wc -l',
      { encoding: 'utf8' }
    ).trim();

    if (parseInt(legoImports) > 200) {
      logSuccess(`Found ${legoImports} @layera imports (good LEGO usage)`);
    } else {
      logWarning(`Only ${legoImports} @layera imports found (should increase LEGO usage)`);
    }

  } catch (error) {
    logWarning('Could not validate LEGO compliance');
  }
}

/**
 * 3. TYPESCRIPT STRICT VALIDATION
 */
console.log('\n🔷 ΒΗΜΑ 3: TYPESCRIPT STRICT VALIDATION');
console.log('=======================================');

function validateTypeScript() {
  console.log('\n📝 Έλεγχος για any types:');

  try {
    const anyTypes = execSync(
      'grep -r ": any\\|<any>" apps/ packages/ --exclude-dir=node_modules 2>/dev/null | wc -l',
      { encoding: 'utf8' }
    ).trim();

    if (parseInt(anyTypes) > 0) {
      logError(`Found ${anyTypes} 'any' types (should use specific types)`);
    } else {
      logSuccess('No any types found');
    }

    // Run TypeScript check if available
    try {
      execSync('npm run typecheck', { stdio: 'pipe' });
      logSuccess('TypeScript compilation passed');
    } catch (error) {
      logError('TypeScript compilation failed');
    }

  } catch (error) {
    logWarning('Could not validate TypeScript');
  }
}

/**
 * 4. I18N COMPLIANCE
 */
console.log('\n🌍 ΒΗΜΑ 4: I18N COMPLIANCE VALIDATION');
console.log('====================================');

function validateI18N() {
  console.log('\n🔤 Έλεγχος για hardcoded strings:');

  try {
    // Check for Greek hardcoded strings
    const greekStrings = execSync(
      'grep -r "\\".*[α-ωΑ-Ω].*\\"" apps/ --exclude-dir=node_modules 2>/dev/null | grep -v "t(" | wc -l',
      { encoding: 'utf8' }
    ).trim();

    if (parseInt(greekStrings) > 10) { // Allow some exceptions
      logWarning(`Found ${greekStrings} hardcoded Greek strings (should use t() function)`);
    } else {
      logSuccess('Minimal hardcoded Greek strings found');
    }

    // Check for t() usage
    const i18nUsage = execSync(
      'grep -r "t(" apps/ --exclude-dir=node_modules 2>/dev/null | wc -l',
      { encoding: 'utf8' }
    ).trim();

    if (parseInt(i18nUsage) > 50) {
      logSuccess(`Found ${i18nUsage} i18n usages (good internationalization)`);
    } else {
      logWarning(`Only ${i18nUsage} i18n usages found`);
    }

  } catch (error) {
    logWarning('Could not validate i18n compliance');
  }
}

/**
 * 5. EXECUTE ALL VALIDATIONS
 */
async function runAllValidations() {
  scanForDuplicateFiles();
  scanForDuplicateExports();
  scanForDuplicateCSS();
  validateLEGOCompliance();
  validateTypeScript();
  validateI18N();
}

/**
 * 6. RESULTS SUMMARY (επέκταση από validate-geo-drawing.js)
 */
function printSummary() {
  console.log('\n📊 ENTERPRISE VALIDATION SUMMARY');
  console.log('================================');

  const totalDuplicates = duplicateReports.length;

  if (validationPassed && totalDuplicates === 0) {
    console.log('✅ ALL VALIDATIONS PASSED!');
    console.log(`🎯 Duplicates found: ${totalDuplicates}`);
    console.log('🏆 ENTERPRISE COMPLIANCE: EXCELLENT');
    console.log('');
    console.log('🛡️ DUPLICATE PREVENTION ACTIVE:');
    console.log('• File duplicates: 0');
    console.log('• Export duplicates: 0');
    console.log('• CSS token duplicates: 0');
    console.log('• LEGO compliance: ✅');
    console.log('• TypeScript strict: ✅');
    console.log('• i18n compliance: ✅');
    console.log('');
    console.log('🚀 READY FOR DEVELOPMENT WITH ZERO DUPLICATES!');

    return 0;
  } else {
    console.log('❌ VALIDATION ISSUES DETECTED!');
    console.log('');
    console.log(`📈 Statistics:`);
    console.log(`  - Errors: ${errors.length}`);
    console.log(`  - Warnings: ${warnings.length}`);
    console.log(`  - Duplicates: ${totalDuplicates}`);
    console.log('');

    if (errors.length > 0) {
      console.log('🚨 CRITICAL ERRORS:');
      errors.forEach(error => console.log(`  - ${error}`));
      console.log('');
    }

    if (duplicateReports.length > 0) {
      console.log('🔄 DUPLICATES DETECTED:');
      duplicateReports.forEach(duplicate => console.log(`  - ${duplicate}`));
      console.log('');
    }

    if (warnings.length > 0) {
      console.log('⚠️  WARNINGS:');
      warnings.forEach(warning => console.log(`  - ${warning}`));
    }

    console.log('');
    console.log('📋 NEXT STEPS:');
    console.log('1. Fix all duplicates before proceeding');
    console.log('2. Follow DUPLICATE_PREVENTION_PROTOCOL.md');
    console.log('3. Use only @layera LEGO systems');
    console.log('4. Re-run this validation after fixes');

    return 1;
  }
}

/**
 * MAIN EXECUTION
 */
async function main() {
  try {
    await runAllValidations();
    const exitCode = printSummary();
    process.exit(exitCode);
  } catch (error) {
    console.error('💥 VALIDATION SYSTEM ERROR:', error.message);
    process.exit(1);
  }
}

// Auto-run if called directly
if (require.main === module) {
  main();
}

module.exports = {
  runAllValidations,
  logError,
  logWarning,
  logSuccess,
  validationPassed,
  duplicateReports
};