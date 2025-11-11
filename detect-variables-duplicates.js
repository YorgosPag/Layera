#!/usr/bin/env node

/**
 * CSS Variables Duplicate Detector για Layera Project
 * Βρίσκει διπλότυπα CSS custom properties (--var: value;)
 *
 * Usage: node detect-variables-duplicates.js
 */

const fs = require('fs');
const path = require('path');

// Χρώματα για console output
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

console.log(`${colors.bold}${colors.blue}🔍 CSS Variables Duplicate Detector${colors.reset}\n`);

// Map για αποθήκευση variables
const variableMap = new Map();
const duplicates = new Map();

/**
 * Απλή αναζήτηση αρχείων χωρίς glob dependency
 */
function findCSSFiles() {
  console.log(`${colors.cyan}📁 Αναζήτηση CSS files...${colors.reset}`);

  function walkDir(dir, fileList = []) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        // Αποκλείουμε node_modules, dist, .git, DON_T_TOUCH
        if (!['node_modules', 'dist', '.git', 'DON_T_TOUCH-Layera_OLD'].includes(file)) {
          walkDir(filePath, fileList);
        }
      } else if (stat.isFile()) {
        // Κρατάμε CSS και TSX files
        if (file.endsWith('.css') || file.endsWith('.tsx')) {
          fileList.push(filePath.replace(process.cwd(), '').replace(/^[\\/]/, ''));
        }
      }
    }

    return fileList;
  }

  const allFiles = walkDir(process.cwd());
  console.log(`${colors.green}✅ Βρέθηκαν ${allFiles.length} αρχεία${colors.reset}\n`);
  return allFiles;
}

/**
 * Εξαγωγή CSS variables από αρχείο
 */
function extractVariables(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');

    // Regex για CSS custom properties: --variable-name: value;
    const variableRegex = /--([a-zA-Z][a-zA-Z0-9-]*)\s*:\s*([^;}]+);/g;

    let match;
    const fileVariables = [];

    while ((match = variableRegex.exec(content)) !== null) {
      const varName = `--${match[1]}`;
      const value = match[2].trim();
      const lineNumber = content.substring(0, match.index).split('\n').length;

      fileVariables.push({
        name: varName,
        value: value,
        line: lineNumber,
        file: filePath
      });

      // Αποθήκευση στο global map
      if (!variableMap.has(varName)) {
        variableMap.set(varName, []);
      }

      variableMap.get(varName).push({
        value: value,
        line: lineNumber,
        file: filePath
      });
    }

    return fileVariables;
  } catch (error) {
    console.error(`${colors.red}❌ Σφάλμα κατά την ανάλυση του ${filePath}:${colors.reset}`, error.message);
    return [];
  }
}

/**
 * Ανίχνευση διπλοτύπων
 */
function detectDuplicates() {
  console.log(`${colors.cyan}🔍 Ανίχνευση διπλοτύπων...${colors.reset}\n`);

  for (const [varName, occurrences] of variableMap.entries()) {
    if (occurrences.length > 1) {
      // Έλεγχος αν έχουν διαφορετικές τιμές
      const uniqueValues = [...new Set(occurrences.map(occ => occ.value))];

      if (uniqueValues.length > 1) {
        // Διαφορετικές τιμές - ΚΡΙΤΙΚΟ
        duplicates.set(varName, {
          type: 'CRITICAL',
          occurrences: occurrences,
          values: uniqueValues
        });
      } else {
        // Ίδιες τιμές - WARNING
        duplicates.set(varName, {
          type: 'WARNING',
          occurrences: occurrences,
          values: uniqueValues
        });
      }
    }
  }
}

/**
 * Αναφορά αποτελεσμάτων
 */
function generateReport() {
  console.log(`${colors.bold}${colors.magenta}📊 ΑΝΑΛΥΤΙΚΗ ΑΝΑΦΟΡΑ${colors.reset}\n`);

  console.log(`${colors.cyan}📈 Συνολικά CSS Variables: ${colors.bold}${variableMap.size}${colors.reset}`);
  console.log(`${colors.yellow}⚠️  Διπλότυπα Variables: ${colors.bold}${duplicates.size}${colors.reset}\n`);

  if (duplicates.size === 0) {
    console.log(`${colors.green}${colors.bold}✅ Δεν βρέθηκαν διπλότυπα!${colors.reset}`);
    return;
  }

  // Ταξινόμηση κατά κρισιμότητα
  const critical = [];
  const warnings = [];

  for (const [varName, data] of duplicates.entries()) {
    if (data.type === 'CRITICAL') {
      critical.push({ name: varName, data });
    } else {
      warnings.push({ name: varName, data });
    }
  }

  // CRITICAL duplicates
  if (critical.length > 0) {
    console.log(`${colors.red}${colors.bold}🚨 ΚΡΙΤΙΚΑ ΔΙΠΛΟΤΥΠΑ (διαφορετικές τιμές):${colors.reset}\n`);

    critical.forEach(({ name, data }) => {
      console.log(`${colors.red}├── ${colors.bold}${name}${colors.reset}`);
      console.log(`${colors.red}│   Τιμές: ${data.values.join(' | ')}${colors.reset}`);
      data.occurrences.forEach((occ, index) => {
        const symbol = index === data.occurrences.length - 1 ? '└──' : '├──';
        console.log(`${colors.red}│   ${symbol} ${occ.file}:${occ.line} → "${occ.value}"${colors.reset}`);
      });
      console.log('');
    });
  }

  // WARNING duplicates
  if (warnings.length > 0) {
    console.log(`${colors.yellow}${colors.bold}⚠️  WARNING ΔΙΠΛΟΤΥΠΑ (ίδιες τιμές):${colors.reset}\n`);

    warnings.forEach(({ name, data }) => {
      console.log(`${colors.yellow}├── ${colors.bold}${name}${colors.reset} → "${data.values[0]}"`);
      data.occurrences.forEach((occ, index) => {
        const symbol = index === data.occurrences.length - 1 ? '└──' : '├──';
        console.log(`${colors.yellow}│   ${symbol} ${occ.file}:${occ.line}${colors.reset}`);
      });
      console.log('');
    });
  }

  // Στατιστικά
  console.log(`${colors.bold}${colors.cyan}📊 ΣΤΑΤΙΣΤΙΚΑ:${colors.reset}`);
  console.log(`${colors.red}🚨 Κρίσιμα: ${critical.length}${colors.reset}`);
  console.log(`${colors.yellow}⚠️  Προειδοποιήσεις: ${warnings.length}${colors.reset}`);

  // JSON export για automation
  const reportData = {
    timestamp: new Date().toISOString(),
    total_variables: variableMap.size,
    total_duplicates: duplicates.size,
    critical_count: critical.length,
    warning_count: warnings.length,
    critical_duplicates: critical,
    warning_duplicates: warnings
  };

  fs.writeFileSync('variables-duplicates-report.json', JSON.stringify(reportData, null, 2));
  console.log(`\n${colors.green}✅ Αναφορά αποθηκεύθηκε: variables-duplicates-report.json${colors.reset}`);
}

/**
 * Main execution
 */
function main() {
  try {
    const files = findCSSFiles();

    console.log(`${colors.cyan}📝 Ανάλυση αρχείων...${colors.reset}`);

    files.forEach(file => {
      const variables = extractVariables(file);
      if (variables.length > 0) {
        console.log(`${colors.green}   ✓ ${file}: ${variables.length} variables${colors.reset}`);
      }
    });

    console.log('');
    detectDuplicates();
    generateReport();

  } catch (error) {
    console.error(`${colors.red}❌ Κρίσιμο σφάλμα:${colors.reset}`, error);
    process.exit(1);
  }
}

// Έλεγχος αν εκτελείται απευθείας
if (require.main === module) {
  main();
}

module.exports = { main };