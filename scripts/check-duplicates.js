#!/usr/bin/env node

/**
 * LAYERA DUPLICATE PREVENTION SYSTEM
 * Απλός έλεγχος για διπλότυπα στη νέα Layera εφαρμογή
 * Ελέγχει μόνο: C:\layera\apps\layera\
 */

const fs = require('fs');
const path = require('path');

console.log('🛡️ LAYERA DUPLICATE PREVENTION SYSTEM');
console.log('=====================================');

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
 * 1. Έλεγχος για duplicate components/functions
 */
function checkDuplicateComponents() {
  console.log('\n🔍 Έλεγχος για διπλότυπα components και functions...');

  const components = {};
  const functions = {};
  const appDir = path.join(__dirname, '..', 'apps', 'layera', 'src');

  if (!fs.existsSync(appDir)) {
    logWarning('Δεν βρέθηκε ο φάκελος src');
    return;
  }

  function scanDirectory(dir, depth = 0) {
    if (depth > 8) return; // Αποφυγή βαθιάς αναδρομής

    const items = fs.readdirSync(dir);
    items.forEach(item => {
      if (item === 'node_modules' || item === '.git' || item === 'dist') return;

      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        scanDirectory(fullPath, depth + 1);
      } else if (item.endsWith('.ts') || item.endsWith('.tsx')) {
        try {
          const content = fs.readFileSync(fullPath, 'utf8');

          // Έλεγχος για React components
          const componentMatches = content.match(/(?:function|const)\s+([A-Z][a-zA-Z0-9]*)\s*(?:\(.*?\)|=.*?=>)/g);
          if (componentMatches) {
            componentMatches.forEach(match => {
              const nameMatch = match.match(/(?:function|const)\s+([A-Z][a-zA-Z0-9]*)/);
              if (nameMatch) {
                const componentName = nameMatch[1];
                if (components[componentName]) {
                  logError(`Διπλότυπο component: ${componentName} βρέθηκε σε ${fullPath} και ${components[componentName]}`);
                } else {
                  components[componentName] = fullPath;
                }
              }
            });
          }

          // Έλεγχος για functions
          const functionMatches = content.match(/(?:function|const)\s+([a-z][a-zA-Z0-9]*)\s*(?:\(.*?\)|=.*?=>)/g);
          if (functionMatches) {
            functionMatches.forEach(match => {
              const nameMatch = match.match(/(?:function|const)\s+([a-z][a-zA-Z0-9]*)/);
              if (nameMatch) {
                const functionName = nameMatch[1];
                // Αγνόησε κοινές functions όπως useState, useEffect κλπ
                if (!functionName.startsWith('use') && functionName.length > 3) {
                  if (functions[functionName]) {
                    logWarning(`Πιθανό διπλότυπο function: ${functionName} σε ${fullPath} και ${functions[functionName]}`);
                  } else {
                    functions[functionName] = fullPath;
                  }
                }
              }
            });
          }

        } catch (error) {
          // Αγνόησε αρχεία που δεν μπορούν να διαβαστούν
        }
      }
    });
  }

  scanDirectory(appDir);

  if (errors.filter(e => e.includes('Διπλότυπο component')).length === 0) {
    logSuccess('Δεν βρέθηκαν διπλότυπα components');
  }
}

/**
 * 2. Έλεγχος για duplicate CSS/styles
 */
function checkDuplicateStyles() {
  console.log('\n🎨 Έλεγχος για διπλότυπα CSS classes και styles...');

  const cssClasses = {};
  const appDir = path.join(__dirname, '..', 'apps', 'layera', 'src');

  function scanForStyles(dir, depth = 0) {
    if (depth > 8) return;

    const items = fs.readdirSync(dir);
    items.forEach(item => {
      if (item === 'node_modules' || item === '.git') return;

      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        scanForStyles(fullPath, depth + 1);
      } else if (item.endsWith('.css') || item.endsWith('.scss') || item.endsWith('.module.css')) {
        try {
          const content = fs.readFileSync(fullPath, 'utf8');

          // Έλεγχος για CSS classes
          const classMatches = content.match(/\.([a-zA-Z][a-zA-Z0-9_-]*)\s*\{/g);
          if (classMatches) {
            classMatches.forEach(match => {
              const className = match.replace('.', '').replace('{', '').trim();
              if (cssClasses[className]) {
                logWarning(`Πιθανό διπλότυπο CSS class: ${className} σε ${fullPath} και ${cssClasses[className]}`);
              } else {
                cssClasses[className] = fullPath;
              }
            });
          }

        } catch (error) {
          // Αγνόησε αρχεία που δεν μπορούν να διαβαστούν
        }
      }
    });
  }

  scanForStyles(appDir);

  if (warnings.filter(w => w.includes('διπλότυπο CSS class')).length === 0) {
    logSuccess('Δεν βρέθηκαν προβληματικά διπλότυπα CSS classes');
  }
}

/**
 * 3. Έλεγχος για duplicate imports
 */
function checkDuplicateImports() {
  console.log('\n📦 Έλεγχος για άχρηστα duplicate imports...');

  const appDir = path.join(__dirname, '..', 'apps', 'layera', 'src');
  let duplicateImportsFound = 0;

  function scanForImports(dir, depth = 0) {
    if (depth > 8) return;

    const items = fs.readdirSync(dir);
    items.forEach(item => {
      if (item === 'node_modules') return;

      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        scanForImports(fullPath, depth + 1);
      } else if (item.endsWith('.ts') || item.endsWith('.tsx')) {
        try {
          const content = fs.readFileSync(fullPath, 'utf8');
          const lines = content.split('\n');

          const imports = [];
          lines.forEach((line, lineNum) => {
            if (line.trim().startsWith('import ')) {
              const importMatch = line.match(/import.*from\s+['"]([^'"]+)['"]/);
              if (importMatch) {
                const importPath = importMatch[1];
                if (imports.includes(importPath)) {
                  logWarning(`Διπλότυπο import στη γραμμή ${lineNum + 1} του ${fullPath}: ${importPath}`);
                  duplicateImportsFound++;
                } else {
                  imports.push(importPath);
                }
              }
            }
          });

        } catch (error) {
          // Αγνόησε αρχεία που δεν μπορούν να διαβαστούν
        }
      }
    });
  }

  scanForImports(appDir);

  if (duplicateImportsFound === 0) {
    logSuccess('Δεν βρέθηκαν διπλότυπα imports');
  }
}

/**
 * 4. MAIN EXECUTION
 */
function runDuplicateCheck() {
  checkDuplicateComponents();
  checkDuplicateStyles();
  checkDuplicateImports();
}

function printSummary() {
  console.log('\n📊 ΑΠΟΤΕΛΕΣΜΑΤΑ ΕΛΕΓΧΟΥ');
  console.log('========================');

  if (validationPassed && errors.length === 0) {
    console.log('✅ ΟΛΟΣ Ο ΕΛΕΓΧΟΣ ΠΕΡΑΣΕ!');
    console.log('🎯 Δεν βρέθηκαν διπλότυπα');
    console.log('🚀 ΕΤΟΙΜΟΣ ΓΙΑ DEVELOPMENT!');
    return 0;
  } else {
    console.log('❌ ΒΡΕΘΗΚΑΝ ΠΡΟΒΛΗΜΑΤΑ!');
    console.log(`\n📈 Στατιστικά:`);
    console.log(`  - Σφάλματα: ${errors.length}`);
    console.log(`  - Προειδοποιήσεις: ${warnings.length}`);

    if (errors.length > 0) {
      console.log('\n🚨 ΣΦΑΛΜΑΤΑ:');
      errors.forEach(error => console.log(`  - ${error}`));
    }

    if (warnings.length > 0) {
      console.log('\n⚠️  ΠΡΟΕΙΔΟΠΟΙΗΣΕΙΣ:');
      warnings.forEach(warning => console.log(`  - ${warning}`));
    }

    return warnings.length > 0 ? 1 : 0;
  }
}

// Auto-run
try {
  runDuplicateCheck();
  const exitCode = printSummary();
  process.exit(exitCode);
} catch (error) {
  console.error('💥 ΣΦΑΛΜΑ:', error.message);
  process.exit(1);
}