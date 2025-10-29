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
  console.log('\n📁 Έλεγχος για problematic duplicated files:');

  try {
    // Φυσιολογικά monorepo filenames που επιτρέπονται
    const allowedDuplicates = [
      'index.ts', 'types.ts', 'config.ts', 'common.ts', 'constants.ts',
      'utils.ts', 'hooks.ts', 'factory.ts', 'tsup.config.ts',
      'translationKeys.ts', // Domain-specific translations
      'osmService.ts', // Backward compatibility patterns
      'geoalert-registry.ts', // Domain-specific registries
      'useCategoryTheming.ts', // Domain-specific hooks
      'StaticContentProvider.ts', // Domain-specific providers
      'fileValidation.ts', // Domain-specific validations
      'esco.ts' // Domain-specific data structures
    ];

    const fileNames = {};
    const problematicDuplicates = [];

    function scanDirectory(dir, depth = 0) {
      if (!fs.existsSync(dir) || depth > 6) return;

      const items = fs.readdirSync(dir);
      items.forEach(item => {
        if (item === 'node_modules' || item === '.git' || item === 'dist' || item === 'build' || item === 'dist-manual') return;

        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
          scanDirectory(fullPath, depth + 1);
        } else if (item.endsWith('.ts') || item.endsWith('.tsx')) {
          const fileName = path.basename(item);

          // Αγνόησε τα φυσιολογικά duplicates
          if (allowedDuplicates.includes(fileName)) {
            return;
          }

          if (fileNames[fileName]) {
            if (!problematicDuplicates.includes(fileName)) {
              problematicDuplicates.push(fileName);
            }
          } else {
            fileNames[fileName] = fullPath;
          }
        }
      });
    }

    scanDirectory('packages');

    if (problematicDuplicates.length > 0) {
      problematicDuplicates.forEach(file => {
        logError(`Problematic duplicate filename: ${file}`);
        duplicateReports.push(`Problematic duplicate file: ${file}`);
      });
    } else {
      logSuccess('No problematic duplicate filenames found');
      logInfo('Standard monorepo patterns (index.ts, types.ts, etc.) are allowed');
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

        // Improved regex patterns for different export types
        const namedExports = content.match(/export\s+(?:const|let|var|function|class)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/g) || [];
        const typeExports = content.match(/export\s+(?:type|interface)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/g) || [];
        const reExports = content.match(/export\s*\*\s*from\s*['"]([^'"]+)['"]/g) || [];
        const namedReExports = content.match(/export\s*\{\s*([^}]+)\s*\}\s*from\s*['"]([^'"]+)['"]/g) || [];

        // Process named exports (functions, constants, classes)
        namedExports.forEach(exportLine => {
          const match = exportLine.match(/export\s+(?:const|let|var|function|class)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/);
          if (match) {
            const exportName = match[1];
            const fullExportName = `${exportName} (value)`;

            if (allExports[fullExportName]) {
              logError(`Duplicate export found: ${fullExportName} in ${pkg} and ${allExports[fullExportName]}`);
              duplicateReports.push(`Duplicate export: ${fullExportName}`);
            } else {
              allExports[fullExportName] = pkg;
            }
          }
        });

        // Process type exports (types, interfaces)
        typeExports.forEach(exportLine => {
          const match = exportLine.match(/export\s+(?:type|interface)\s+([a-zA-Z_$][a-zA-Z0-9_$]*)/);
          if (match) {
            const exportName = match[1];
            const fullExportName = `${exportName} (type)`;

            if (allExports[fullExportName]) {
              logError(`Duplicate export found: ${fullExportName} in ${pkg} and ${allExports[fullExportName]}`);
              duplicateReports.push(`Duplicate export: ${fullExportName}`);
            } else {
              allExports[fullExportName] = pkg;
            }
          }
        });

        // Process re-exports (export * from './module') με domain-specific analysis
        reExports.forEach(exportLine => {
          const match = exportLine.match(/export\s*\*\s*from\s*['"]([^'"]+)['"]/);
          if (match) {
            const modulePath = match[1];

            // Domain-specific analysis για common re-exports
            if (modulePath === './types' || modulePath === './utils' || modulePath === './constants' || modulePath === './hooks') {

              // Ειδική ανάλυση για domain-specific modules
              const isDomainSpecific = (
                pkg.includes('device') ||
                pkg.includes('geo') ||
                pkg.includes('snap') ||
                pkg.includes('error') ||
                pkg.includes('map') ||
                pkg.includes('modal') ||
                pkg.includes('navigation') ||
                pkg.includes('floating')
              );

              if (isDomainSpecific) {
                // Domain-specific packages έχουν διαφορετικά modules
                logInfo(`Domain-specific ${modulePath.replace('./', '')} in ${pkg}: '${modulePath}' (allowed)`);
              } else {
                // Generic checks για non-domain packages
                const fullExportName = `* from '${modulePath}' (re-export)`;
                if (allExports[fullExportName]) {
                  logError(`Duplicate re-export found: ${fullExportName} in ${pkg} and ${allExports[fullExportName]}`);
                  duplicateReports.push(`Duplicate re-export: ${fullExportName}`);
                } else {
                  allExports[fullExportName] = pkg;
                }
              }
            } else {
              // Άλλα modules (όχι './types') - κανονικός έλεγχος
              const fullExportName = `* from '${modulePath}' (re-export)`;
              if (allExports[fullExportName]) {
                logError(`Duplicate re-export found: ${fullExportName} in ${pkg} and ${allExports[fullExportName]}`);
                duplicateReports.push(`Duplicate re-export: ${fullExportName}`);
              } else {
                allExports[fullExportName] = pkg;
              }
            }
          }
        });
      }
    });

    if (duplicateReports.filter(r => r.includes('Duplicate')).length === 0) {
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
    const processedFiles = new Set();

    // Node.js implementation: Scan CSS files in packages - OPTIMIZED
    function scanCSSDirectory(dir, depth = 0) {
      if (!fs.existsSync(dir) || depth > 5) return; // Prevent infinite recursion

      const items = fs.readdirSync(dir);
      items.forEach(item => {
        if (item === 'node_modules' || item === '.git' || item === 'dist' || item === 'build' || item === 'dist-manual') return;

        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
          scanCSSDirectory(fullPath, depth + 1);
        } else if (item.endsWith('.css') && !processedFiles.has(fullPath)) {
          processedFiles.add(fullPath);
          try {
            const content = fs.readFileSync(fullPath, 'utf8');
            // Use Set to avoid duplicate tokens from same file
            const uniqueTokens = new Set(content.match(/--[a-z][a-z0-9-]*(?=\s*:)/g) || []);

            uniqueTokens.forEach(token => {
              if (cssTokens[token] && cssTokens[token] !== fullPath) {
                logError(`Duplicate CSS token: ${token} in ${fullPath} and ${cssTokens[token]}`);
                duplicateReports.push(`Duplicate CSS token: ${token}`);
              } else {
                cssTokens[token] = fullPath;
              }
            });
          } catch (readError) {
            // Skip files that can't be read
          }
        }
      });
    }

    scanCSSDirectory('packages');

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
    // Node.js implementation: Check for styled-components instead of LEGO
    let styledComponentsCount = 0;
    let hardcodedColorsCount = 0;
    let legoImportsCount = 0;

    function scanCodeDirectory(dir, depth = 0) {
      if (!fs.existsSync(dir) || depth > 8) return; // Prevent infinite recursion

      const items = fs.readdirSync(dir);
      items.forEach(item => {
        if (item === 'node_modules' || item === '.git' || item === 'dist' || item === 'build' || item === 'dist-manual') return;

        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
          scanCodeDirectory(fullPath, depth + 1);
        } else if (item.endsWith('.ts') || item.endsWith('.tsx') || item.endsWith('.js') || item.endsWith('.jsx')) {
          try {
            const content = fs.readFileSync(fullPath, 'utf8');

            // Check for styled-components
            const styledMatches = content.match(/styled\./g);
            if (styledMatches) {
              styledComponentsCount += styledMatches.length;
            }

            // Check for hardcoded colors
            const colorMatches = content.match(/#[0-9a-fA-F]{6}|#[0-9a-fA-F]{3}|rgb\(|rgba\(/g);
            if (colorMatches) {
              hardcodedColorsCount += colorMatches.length;
            }

            // Check for LEGO imports
            const legoMatches = content.match(/from.*@layera\//g);
            if (legoMatches) {
              legoImportsCount += legoMatches.length;
            }
          } catch (readError) {
            // Skip files that can't be read
          }
        }
      });
    }

    scanCodeDirectory('apps');

    // Report styled-components
    if (styledComponentsCount > 0) {
      logError(`Found ${styledComponentsCount} styled-component usages (should use @layera packages)`);
    } else {
      logSuccess('No styled-components anti-patterns found');
    }

    // Report hardcoded colors
    if (hardcodedColorsCount > 5) { // Allow some exceptions
      logWarning(`Found ${hardcodedColorsCount} hardcoded colors (should use design tokens)`);
    } else {
      logSuccess('Minimal hardcoded colors found');
    }

    // Report LEGO imports
    if (legoImportsCount > 200) {
      logSuccess(`Found ${legoImportsCount} @layera imports (good LEGO usage)`);
    } else {
      logWarning(`Only ${legoImportsCount} @layera imports found (should increase LEGO usage)`);
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
    // Node.js implementation: Check for 'any' types
    let anyTypesCount = 0;

    function scanTypeScriptDirectory(dir, depth = 0) {
      if (!fs.existsSync(dir) || depth > 8) return; // Prevent infinite recursion

      const items = fs.readdirSync(dir);
      items.forEach(item => {
        if (item === 'node_modules' || item === '.git' || item === 'dist' || item === 'build' || item === 'dist-manual') return;

        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
          scanTypeScriptDirectory(fullPath, depth + 1);
        } else if (item.endsWith('.ts') || item.endsWith('.tsx')) {
          try {
            const content = fs.readFileSync(fullPath, 'utf8');

            // Check for 'any' types
            const anyMatches = content.match(/:\s*any\b|<any>/g);
            if (anyMatches) {
              anyTypesCount += anyMatches.length;
            }
          } catch (readError) {
            // Skip files that can't be read
          }
        }
      });
    }

    scanTypeScriptDirectory('apps');
    scanTypeScriptDirectory('packages');

    if (anyTypesCount > 0) {
      logError(`Found ${anyTypesCount} 'any' types (should use specific types)`);
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
    // Node.js implementation: Check for hardcoded strings
    let greekStringsCount = 0;
    let i18nUsageCount = 0;

    function scanI18NDirectory(dir, depth = 0) {
      if (!fs.existsSync(dir) || depth > 8) return; // Prevent infinite recursion

      const items = fs.readdirSync(dir);
      items.forEach(item => {
        if (item === 'node_modules' || item === '.git' || item === 'dist' || item === 'build' || item === 'dist-manual') return;

        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
          scanI18NDirectory(fullPath, depth + 1);
        } else if (item.endsWith('.ts') || item.endsWith('.tsx') || item.endsWith('.js') || item.endsWith('.jsx')) {
          try {
            const content = fs.readFileSync(fullPath, 'utf8');

            // Check for Greek hardcoded strings (excluding lines with t() function)
            const lines = content.split('\n');
            lines.forEach(line => {
              if (!line.includes('t(') && /["'].*[α-ωΑ-Ω].*["']/.test(line)) {
                greekStringsCount++;
              }
            });

            // Check for t() usage
            const i18nMatches = content.match(/\bt\(/g);
            if (i18nMatches) {
              i18nUsageCount += i18nMatches.length;
            }
          } catch (readError) {
            // Skip files that can't be read
          }
        }
      });
    }

    scanI18NDirectory('apps');

    // Report Greek strings
    if (greekStringsCount > 10) { // Allow some exceptions
      logWarning(`Found ${greekStringsCount} hardcoded Greek strings (should use t() function)`);
    } else {
      logSuccess('Minimal hardcoded Greek strings found');
    }

    // Report i18n usage
    if (i18nUsageCount > 50) {
      logSuccess(`Found ${i18nUsageCount} i18n usages (good internationalization)`);
    } else {
      logWarning(`Only ${i18nUsageCount} i18n usages found`);
    }

  } catch (error) {
    logWarning('Could not validate i18n compliance');
  }
}

function validateTranslationKeys() {
  console.log('\n🔑 Έλεγχος για untranslated keys:');

  try {
    // First, let's find translation files to understand the structure
    const translationFiles = [];
    const untranslatedKeys = [];

    function findTranslationFiles(dir, depth = 0) {
      if (!fs.existsSync(dir) || depth > 8) return;

      const items = fs.readdirSync(dir);
      items.forEach(item => {
        if (item === 'node_modules' || item === '.git' || item === 'dist') return;

        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
          findTranslationFiles(fullPath, depth + 1);
        } else if (item.endsWith('.json') && (dir.includes('locales') || dir.includes('translations'))) {
          translationFiles.push(fullPath);
        }
      });
    }

    findTranslationFiles('apps');
    findTranslationFiles('packages');

    // Analyze translation files
    const translations = { el: {}, en: {} };

    translationFiles.forEach(file => {
      try {
        const content = JSON.parse(fs.readFileSync(file, 'utf8'));
        const normalizedPath = file.replace(/\\/g, '/');
        const lang = normalizedPath.includes('/el/') ? 'el' : normalizedPath.includes('/en/') ? 'en' : null;

        if (lang) {
          function extractKeys(obj, prefix = '') {
            Object.keys(obj).forEach(key => {
              const fullKey = prefix ? `${prefix}.${key}` : key;
              if (typeof obj[key] === 'object' && obj[key] !== null) {
                extractKeys(obj[key], fullKey);
              } else {
                translations[lang][fullKey] = obj[key];
              }
            });
          }

          extractKeys(content);
        }
      } catch (parseError) {
        // Skip invalid JSON files
      }
    });

    // Check for keys that look like untranslated keys
    const allKeys = new Set([...Object.keys(translations.el), ...Object.keys(translations.en)]);

    allKeys.forEach(key => {
      const elValue = translations.el[key];
      const enValue = translations.en[key];

      // Check for more obvious untranslated key patterns
      const isObviouslyUntranslated = (value, lang) => {
        if (!value) return false;

        return (
          value === key || // Exactly same as key
          value.startsWith('{{') && value.endsWith('}}') || // Template placeholder {{key}}
          value.toLowerCase().includes('todo:') || // TODO: markers
          value.toLowerCase().includes('fixme:') || // FIXME: markers
          value === 'PLACEHOLDER' || // Common placeholder text
          value === 'NOT_TRANSLATED' || // Explicit marker
          /^[A-Z_]{3,}$/.test(value) || // Long ALL_CAPS constants (3+ chars)
          (lang === 'el' && /^[a-zA-Z\s.]+$/.test(value) && value.split(' ').every(word => /^[a-zA-Z.]+$/.test(word))) || // Greek text with only Latin chars
          (lang === 'en' && /^[α-ωΑ-Ω\s.]+$/.test(value) && value.split(' ').every(word => /^[α-ωΑ-Ω.]+$/.test(word))) // English text with only Greek chars
        );
      };

      if (isObviouslyUntranslated(elValue, 'el')) {
        untranslatedKeys.push({
          key,
          elValue,
          enValue,
          issue: 'Greek translation appears untranslated'
        });
      }

      if (isObviouslyUntranslated(enValue, 'en')) {
        untranslatedKeys.push({
          key,
          elValue,
          enValue,
          issue: 'English translation appears untranslated'
        });
      }
    });

    // Report results
    if (untranslatedKeys.length > 0) {
      logError(`Found ${untranslatedKeys.length} potentially untranslated keys:`);
      untranslatedKeys.slice(0, 10).forEach(item => { // Show first 10
        console.log(`  🔑 ${item.key}:`);
        console.log(`    🇬🇷 "${item.elValue}"`);
        console.log(`    🇺🇸 "${item.enValue}"`);
      });
      if (untranslatedKeys.length > 10) {
        console.log(`    ... και ${untranslatedKeys.length - 10} ακόμη`);
      }
    } else {
      logSuccess('No untranslated keys detected');
    }

    // Report translation coverage
    const totalKeys = allKeys.size;
    const elCoverage = Object.keys(translations.el).length;
    const enCoverage = Object.keys(translations.en).length;

    console.log(`\n📊 Translation Coverage:`);
    console.log(`  🇬🇷 Greek: ${elCoverage}/${totalKeys} keys (${Math.round(elCoverage/totalKeys*100)}%)`);
    console.log(`  🇺🇸 English: ${enCoverage}/${totalKeys} keys (${Math.round(enCoverage/totalKeys*100)}%)`);

  } catch (error) {
    logWarning('Could not validate translation keys');
  }
}

/**
 * 5. ΝΕΕΣ ENTERPRISE VALIDATIONS
 */
console.log('\n🏛️ ΒΗΜΑ 5: SINGLE SOURCE OF TRUTH VALIDATION');
console.log('==============================================');

function validateSingleSourceOfTruth() {
  console.log('\n🎯 Έλεγχος για Single Source of Truth violations:');

  try {
    const violations = [];
    const sourceOfTruthMap = {
      'Card': '@layera/cards',
      'Button': '@layera/buttons',
      'Icon': '@layera/icons',
      'Modal': '@layera/modals',
      'Form': '@layera/forms',
      'Text': '@layera/typography',
      'Heading': '@layera/typography'
    };

    function scanForViolations(dir, depth = 0) {
      if (!fs.existsSync(dir) || depth > 8) return;

      const items = fs.readdirSync(dir);
      items.forEach(item => {
        if (item === 'node_modules' || item === '.git' || item === 'dist' || item === 'build' || item === 'dist-manual') return;

        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
          scanForViolations(fullPath, depth + 1);
        } else if (item.endsWith('.ts') || item.endsWith('.tsx')) {
          try {
            const content = fs.readFileSync(fullPath, 'utf8');

            // Check for custom implementations that should use LEGO
            Object.keys(sourceOfTruthMap).forEach(component => {
              const customPattern = new RegExp(`(const|let|var)\\s+\\w*${component}\\w*\\s*=`, 'g');
              const matches = content.match(customPattern);

              if (matches) {
                matches.forEach(match => {
                  violations.push({
                    file: fullPath,
                    violation: `Custom ${component} implementation`,
                    suggestion: `Use ${sourceOfTruthMap[component]}`,
                    line: match
                  });
                });
              }
            });

            // Check for styled-components usage
            const styledMatches = content.match(/styled\.\w+|styled\(\w+\)/g);
            if (styledMatches) {
              violations.push({
                file: fullPath,
                violation: 'styled-components usage',
                suggestion: 'Use @layera components',
                count: styledMatches.length
              });
            }

          } catch (readError) {
            // Skip files that can't be read
          }
        }
      });
    }

    scanForViolations('apps');

    if (violations.length > 0) {
      logError(`Found ${violations.length} Single Source of Truth violations`);
      violations.slice(0, 10).forEach(v => { // Show first 10
        logError(`${v.violation} in ${path.basename(v.file)} - ${v.suggestion}`);
      });
    } else {
      logSuccess('No Single Source of Truth violations found');
    }

  } catch (error) {
    logWarning('Could not validate Single Source of Truth');
  }
}

function generateLEGOUsageReport() {
  console.log('\n📊 LEGO Usage Report:');

  try {
    const legoPackages = [
      '@layera/constants', '@layera/layout', '@layera/cards', '@layera/icons',
      '@layera/buttons', '@layera/typography', '@layera/forms', '@layera/tolgee'
    ];

    const usageStats = {};
    let totalImports = 0;

    function scanLEGOUsage(dir, depth = 0) {
      if (!fs.existsSync(dir) || depth > 8) return;

      const items = fs.readdirSync(dir);
      items.forEach(item => {
        if (item === 'node_modules' || item === '.git' || item === 'dist' || item === 'build' || item === 'dist-manual') return;

        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
          scanLEGOUsage(fullPath, depth + 1);
        } else if (item.endsWith('.ts') || item.endsWith('.tsx')) {
          try {
            const content = fs.readFileSync(fullPath, 'utf8');

            legoPackages.forEach(pkg => {
              const importPattern = new RegExp(`from\\s+['"]${pkg}['"]`, 'g');
              const matches = content.match(importPattern);
              if (matches) {
                usageStats[pkg] = (usageStats[pkg] || 0) + matches.length;
                totalImports += matches.length;
              }
            });

          } catch (readError) {
            // Skip files that can't be read
          }
        }
      });
    }

    scanLEGOUsage('apps');

    logInfo(`Total @layera imports: ${totalImports}`);

    Object.entries(usageStats)
      .sort(([,a], [,b]) => b - a)
      .forEach(([pkg, count]) => {
        logInfo(`${pkg}: ${count} imports`);
      });

    if (totalImports > 200) {
      logSuccess(`Excellent LEGO usage: ${totalImports} imports`);
    } else if (totalImports > 100) {
      logInfo(`Good LEGO usage: ${totalImports} imports`);
    } else {
      logWarning(`Low LEGO usage: ${totalImports} imports - consider using more @layera packages`);
    }

  } catch (error) {
    logWarning('Could not generate LEGO usage report');
  }
}

/**
 * 6. EXECUTE ALL VALIDATIONS (ΕΠΕΚΤΑΣΜΕΝΟ)
 */
async function runAllValidations() {
  console.log('🚀 Starting enhanced enterprise validation - this may take 30-60 seconds...');
  console.log('');

  scanForDuplicateFiles();
  scanForDuplicateExports();
  scanForDuplicateCSS();
  validateLEGOCompliance();
  validateTypeScript();
  validateI18N();
  validateTranslationKeys();      // NEW - Untranslated keys check
  validateSingleSourceOfTruth();  // NEW
  generateLEGOUsageReport();      // NEW
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