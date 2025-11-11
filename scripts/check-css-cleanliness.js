#!/usr/bin/env node

/**
 * LAYERA CSS CLEANLINESS VALIDATION SYSTEM
 * Comprehensive έλεγχος για CSS καθαρότητα και συνέπεια
 *
 * Ελέγχει:
 * 1. Διπλότυπες CSS κλάσεις
 * 2. Διπλότυπα CSS variables
 * 3. Διπλότυπα variants (data-attributes)
 * 4. Χρήση κλάσεων που δεν υπάρχουν στο σύστημα
 * 5. Χρήση variables που δεν υπάρχουν στα tokens
 * 6. Χρήση variants που δεν είναι καθορισμένα
 *
 * 🎯 Στόχος: Καθαρή, unified εφαρμογή χωρίς διπλότυπα
 */

const fs = require('fs');
const path = require('path');

console.log('🛡️ LAYERA CSS CLEANLINESS VALIDATION SYSTEM');
console.log('==============================================');

let validationPassed = true;
const errors = [];
const warnings = [];

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
 * 1. Εξαγωγή όλων των διαθέσιμων CSS κλάσεων από το σύστημα
 */
function extractAvailableClasses() {
  console.log('\n🎨 Εξαγωγή διαθέσιμων CSS κλάσεων...');

  const availableClasses = new Set();
  const utilitiesPath = path.join(__dirname, '..', 'packages', 'tokens', 'dist', 'css', 'utilities.css');

  if (fs.existsSync(utilitiesPath)) {
    try {
      const content = fs.readFileSync(utilitiesPath, 'utf8');

      // Εξαγωγή .layera-* κλάσεων
      const classMatches = content.match(/\.layera-[a-zA-Z0-9_-]+/g);
      if (classMatches) {
        classMatches.forEach(match => {
          const className = match.replace('.', '');
          availableClasses.add(className);
        });
      }

      // Εξαγωγή data-attribute variants
      const dataAttributeMatches = content.match(/\[data-[a-zA-Z0-9_-]+="[^"]+"\]/g);
      if (dataAttributeMatches) {
        dataAttributeMatches.forEach(match => {
          const dataMatch = match.match(/data-([a-zA-Z0-9_-]+)="([^"]+)"/);
          if (dataMatch) {
            availableClasses.add(`data-${dataMatch[1]}="${dataMatch[2]}"`);
          }
        });
      }

      logInfo(`Βρέθηκαν ${availableClasses.size} διαθέσιμες κλάσεις/variants`);
    } catch (error) {
      logWarning(`Δεν μπόρεσα να διαβάσω το utilities.css: ${error.message}`);
    }
  }

  return availableClasses;
}

/**
 * 2. Εξαγωγή όλων των διαθέσιμων CSS variables από tokens
 */
function extractAvailableVariables() {
  console.log('\n🔧 Εξαγωγή διαθέσιμων CSS variables...');

  const availableVariables = new Set();
  const tokensPath = path.join(__dirname, '..', 'packages', 'tokens', 'dist', 'css', 'tokens.css');

  if (fs.existsSync(tokensPath)) {
    try {
      const content = fs.readFileSync(tokensPath, 'utf8');

      // Εξαγωγή --layera-* variables
      const variableMatches = content.match(/--layera-[a-zA-Z0-9_-]+/g);
      if (variableMatches) {
        variableMatches.forEach(variable => {
          availableVariables.add(variable);
        });
      }

      logInfo(`Βρέθηκαν ${availableVariables.size} διαθέσιμα CSS variables`);
    } catch (error) {
      logWarning(`Δεν μπόρεσα να διαβάσω το tokens.css: ${error.message}`);
    }
  }

  return availableVariables;
}

/**
 * 3. Έλεγχος για διπλότυπες CSS κλάσεις σε όλο το σύστημα
 */
function checkDuplicateClasses() {
  console.log('\n🔍 Έλεγχος για διπλότυπες CSS κλάσεις...');

  const classDefinitions = new Map(); // className -> [files]
  const appDir = path.join(__dirname, '..', 'apps', 'layera', 'src');
  const packagesDir = path.join(__dirname, '..', 'packages');

  function scanForClasses(dir, depth = 0) {
    if (depth > 8) return;

    try {
      const items = fs.readdirSync(dir);
      items.forEach(item => {
        if (item === 'node_modules' || item === '.git' || item === 'dist') return;

        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
          scanForClasses(fullPath, depth + 1);
        } else if (item.endsWith('.css') || item.endsWith('.scss')) {
          try {
            const content = fs.readFileSync(fullPath, 'utf8');

            // Εξαγωγή μόνο των βασικών CSS κλάσεων (όχι variants)
            const classMatches = content.match(/\.layera-[a-zA-Z0-9_-]+(?:\s*\{)/g);
            if (classMatches) {
              classMatches.forEach(match => {
                const className = match.replace('.', '').replace(/\s*\{.*/, '').trim();

                // Αγνόησε variants με data-attributes
                if (!className.includes('[')) {
                  if (classDefinitions.has(className)) {
                    classDefinitions.get(className).push(fullPath);
                  } else {
                    classDefinitions.set(className, [fullPath]);
                  }
                }
              });
            }

          } catch (error) {
            // Αγνόησε αρχεία που δεν μπορούν να διαβαστούν
          }
        }
      });
    } catch (error) {
      // Αγνόησε directories που δεν υπάρχουν
    }
  }

  scanForClasses(appDir);
  scanForClasses(packagesDir);

  // Έλεγχος για διπλότυπα
  let duplicatesFound = 0;
  classDefinitions.forEach((files, className) => {
    if (files.length > 1) {
      logError(`Διπλότυπη CSS κλάση: ${className} βρέθηκε σε: ${files.join(', ')}`);
      duplicatesFound++;
    }
  });

  if (duplicatesFound === 0) {
    logSuccess('Δεν βρέθηκαν διπλότυπες CSS κλάσεις');
  }

  return classDefinitions;
}

/**
 * 4. Έλεγχος για διπλότυπα CSS variables
 */
function checkDuplicateVariables() {
  console.log('\n🔧 Έλεγχος για διπλότυπα CSS variables...');

  const variableDefinitions = new Map();
  const tokensDir = path.join(__dirname, '..', 'packages', 'tokens');

  function scanForVariables(dir, depth = 0) {
    if (depth > 8) return;

    try {
      const items = fs.readdirSync(dir);
      items.forEach(item => {
        if (item === 'node_modules' || item === '.git') return;

        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
          scanForVariables(fullPath, depth + 1);
        } else if (item.endsWith('.css')) {
          try {
            const content = fs.readFileSync(fullPath, 'utf8');

            // Εξαγωγή CSS variables definitions
            const variableMatches = content.match(/--layera-[a-zA-Z0-9_-]+\s*:/g);
            if (variableMatches) {
              variableMatches.forEach(match => {
                const variable = match.replace(':', '').trim();

                if (variableDefinitions.has(variable)) {
                  variableDefinitions.get(variable).push(fullPath);
                } else {
                  variableDefinitions.set(variable, [fullPath]);
                }
              });
            }

          } catch (error) {
            // Αγνόησε αρχεία που δεν μπορούν να διαβαστούν
          }
        }
      });
    } catch (error) {
      // Αγνόησε directories που δεν υπάρχουν
    }
  }

  scanForVariables(tokensDir);

  // Έλεγχος για διπλότυπα (αγνοώντας theme-aware variables)
  let duplicatesFound = 0;
  variableDefinitions.forEach((files, variable) => {
    if (files.length > 1) {
      // 🎨 SMART FILTERING: Αγνόησε theme-aware duplicates
      const isThemeAware = files.some(file => {
        try {
          const content = fs.readFileSync(file, 'utf8');
          return content.includes(':root.light') || content.includes(':root.dark');
        } catch {
          return false;
        }
      });

      if (!isThemeAware) {
        logError(`Διπλότυπο CSS variable: ${variable} βρέθηκε σε: ${files.join(', ')}`);
        duplicatesFound++;
      } else {
        // Theme-aware variables are expected duplicates
        logInfo(`ℹ️  Theme-aware variable: ${variable} (αναμενόμενο για light/dark mode)`);
      }
    }
  });

  if (duplicatesFound === 0) {
    logSuccess('Δεν βρέθηκαν διπλότυπα CSS variables');
  }
}

/**
 * 5. Έλεγχος για χρήση κλάσεων που δεν υπάρχουν
 */
function checkUndefinedClassUsage(availableClasses) {
  console.log('\n🚫 Έλεγχος για χρήση ανύπαρκτων κλάσεων...');

  const appDir = path.join(__dirname, '..', 'apps', 'layera', 'src');
  let undefinedUsageFound = 0;

  function scanForUsage(dir, depth = 0) {
    if (depth > 8) return;

    try {
      const items = fs.readdirSync(dir);
      items.forEach(item => {
        if (item === 'node_modules' || item === '.git') return;

        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
          scanForUsage(fullPath, depth + 1);
        } else if (item.endsWith('.tsx') || item.endsWith('.ts') || item.endsWith('.jsx') || item.endsWith('.js')) {
          try {
            const content = fs.readFileSync(fullPath, 'utf8');

            // Αναζήτηση για layera- κλάσεις σε className και class attributes
            const classUsageMatches = content.match(/(?:className|class)=["']([^"']*layera-[^"']*)["']/g);
            if (classUsageMatches) {
              classUsageMatches.forEach(match => {
                const classNames = match.match(/["']([^"']*)["']/)[1].split(/\s+/);

                classNames.forEach(className => {
                  if (className.startsWith('layera-') && !availableClasses.has(className)) {
                    logError(`Ανύπαρκτη κλάση: ${className} στο αρχείο ${fullPath}`);
                    undefinedUsageFound++;
                  }
                });
              });
            }

            // Αναζήτηση για data-* attributes
            const dataAttributeMatches = content.match(/data-[a-zA-Z0-9_-]+="[^"]+"/g);
            if (dataAttributeMatches) {
              dataAttributeMatches.forEach(match => {
                if (!availableClasses.has(match)) {
                  logWarning(`Πιθανά ανύπαρκτο variant: ${match} στο αρχείο ${fullPath}`);
                }
              });
            }

          } catch (error) {
            // Αγνόησε αρχεία που δεν μπορούν να διαβαστούν
          }
        }
      });
    } catch (error) {
      // Αγνόησε directories που δεν υπάρχουν
    }
  }

  scanForUsage(appDir);

  if (undefinedUsageFound === 0) {
    logSuccess('Δεν βρέθηκε χρήση ανύπαρκτων κλάσεων');
  }
}

/**
 * 6. Έλεγχος για χρήση ανύπαρκτων CSS variables
 */
function checkUndefinedVariableUsage(availableVariables) {
  console.log('\n🚫 Έλεγχος για χρήση ανύπαρκτων CSS variables...');

  const appDir = path.join(__dirname, '..', 'apps', 'layera', 'src');
  let undefinedUsageFound = 0;

  function scanForVariableUsage(dir, depth = 0) {
    if (depth > 8) return;

    try {
      const items = fs.readdirSync(dir);
      items.forEach(item => {
        if (item === 'node_modules' || item === '.git') return;

        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
          scanForVariableUsage(fullPath, depth + 1);
        } else if (item.endsWith('.css') || item.endsWith('.tsx') || item.endsWith('.ts')) {
          try {
            const content = fs.readFileSync(fullPath, 'utf8');

            // Αναζήτηση για var(--layera-*) usage
            const variableUsageMatches = content.match(/var\(--layera-[a-zA-Z0-9_-]+/g);
            if (variableUsageMatches) {
              variableUsageMatches.forEach(match => {
                const variable = match.replace('var(', '');

                if (!availableVariables.has(variable)) {
                  logError(`Ανύπαρκτο CSS variable: ${variable} στο αρχείο ${fullPath}`);
                  undefinedUsageFound++;
                }
              });
            }

          } catch (error) {
            // Αγνόησε αρχεία που δεν μπορούν να διαβαστούν
          }
        }
      });
    } catch (error) {
      // Αγνόησε directories που δεν υπάρχουν
    }
  }

  scanForVariableUsage(appDir);

  if (undefinedUsageFound === 0) {
    logSuccess('Δεν βρέθηκε χρήση ανύπαρκτων CSS variables');
  }
}

/**
 * 7. MAIN EXECUTION
 */
function runCssCleanlinessCheck() {
  console.log('\n🎯 Ξεκινώντας comprehensive CSS cleanliness check...\n');

  // Εξαγωγή διαθέσιμων resources
  const availableClasses = extractAvailableClasses();
  const availableVariables = extractAvailableVariables();

  // Εκτέλεση όλων των ελέγχων
  checkDuplicateClasses();
  checkDuplicateVariables();
  checkUndefinedClassUsage(availableClasses);
  checkUndefinedVariableUsage(availableVariables);
}

function printSummary() {
  console.log('\n📊 ΑΠΟΤΕΛΕΣΜΑΤΑ CSS CLEANLINESS CHECK');
  console.log('====================================');

  if (validationPassed && errors.length === 0) {
    console.log('✅ ΠΛΗΡΗΣ ΕΠΙΤΥΧΙΑ!');
    console.log('🎯 Δεν βρέθηκαν CSS προβλήματα');
    console.log('🚀 ΚΑΘΑΡΟ ΣΥΣΤΗΜΑ - ΕΤΟΙΜΟ ΓΙΑ PRODUCTION!');
    return 0;
  } else {
    console.log('❌ ΒΡΕΘΗΚΑΝ CSS ΠΡΟΒΛΗΜΑΤΑ!');
    console.log(`\n📈 Στατιστικά:`);
    console.log(`  - Σφάλματα: ${errors.length}`);
    console.log(`  - Προειδοποιήσεις: ${warnings.length}`);

    if (errors.length > 0) {
      console.log('\n🚨 ΣΦΑΛΜΑΤΑ (ΑΜΕΣ ΔΙΟΡΘΩΣΗ):');
      errors.forEach(error => console.log(`  - ${error}`));
    }

    if (warnings.length > 0) {
      console.log('\n⚠️  ΠΡΟΕΙΔΟΠΟΙΗΣΕΙΣ (ΠΡΟΣΟΧΗ):');
      warnings.forEach(warning => console.log(`  - ${warning}`));
    }

    return errors.length > 0 ? 1 : 0;
  }
}

// Auto-run
try {
  runCssCleanlinessCheck();
  const exitCode = printSummary();
  process.exit(exitCode);
} catch (error) {
  console.error('💥 ΚΡΙΣΙΜΟ ΣΦΑΛΜΑ:', error.message);
  console.error(error.stack);
  process.exit(1);
}