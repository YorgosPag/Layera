#!/usr/bin/env node

/**
 * Data-Variants Duplicate Detector για Layera Project
 * Βρίσκει διπλότυπα data-variant attributes και inconsistent usage
 *
 * Usage: node detect-variants-duplicates.js
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

console.log(`${colors.bold}${colors.blue}🎨 Data-Variants Duplicate Detector${colors.reset}\n`);

// Maps για αποθήκευση variants
const variantMap = new Map(); // component → variant values
const cssRulesMap = new Map(); // CSS rules per variant
const jsxUsageMap = new Map(); // JSX usage per variant

/**
 * Απλή αναζήτηση αρχείων χωρίς glob dependency
 */
function findFiles() {
  console.log(`${colors.cyan}📁 Αναζήτηση αρχείων...${colors.reset}`);

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
        // Κρατάμε relevant files
        if (file.endsWith('.css') || file.endsWith('.tsx') || file.endsWith('.jsx') || file.endsWith('.ts')) {
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
 * Εξαγωγή CSS variant rules
 */
function extractCSSVariants(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');

    // Regex για CSS rules με data-variant
    // π.χ. .layera-button[data-variant="primary"]
    const cssVariantRegex = /\.([a-zA-Z][a-zA-Z0-9-]*)\[data-variant="([^"]+)"\]/g;

    let match;
    const cssVariants = [];

    while ((match = cssVariantRegex.exec(content)) !== null) {
      const component = match[1];
      const variant = match[2];
      const lineNumber = content.substring(0, match.index).split('\n').length;

      cssVariants.push({
        component: component,
        variant: variant,
        line: lineNumber,
        file: filePath,
        type: 'CSS_RULE'
      });

      // Αποθήκευση στο cssRulesMap
      const key = `${component}::${variant}`;
      if (!cssRulesMap.has(key)) {
        cssRulesMap.set(key, []);
      }
      cssRulesMap.get(key).push({
        line: lineNumber,
        file: filePath
      });
    }

    return cssVariants;
  } catch (error) {
    console.error(`${colors.red}❌ Σφάλμα CSS ανάλυσης ${filePath}:${colors.reset}`, error.message);
    return [];
  }
}

/**
 * Εξαγωγή JSX variant usage
 */
function extractJSXVariants(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');

    const jsxVariants = [];

    // Regex για data-variant στο JSX
    // π.χ. data-variant="primary"
    const jsxDataVariantRegex = /data-variant=["']([^"']+)["']/g;

    let match;
    while ((match = jsxDataVariantRegex.exec(content)) !== null) {
      const variant = match[1];
      const lineNumber = content.substring(0, match.index).split('\n').length;

      // Προσπάθεια να βρούμε το component από την γραμμή
      const lines = content.split('\n');
      const currentLine = lines[lineNumber - 1] || '';

      // Simple heuristic για component detection
      const componentMatch = currentLine.match(/className=["']([^"']*layera-[a-zA-Z0-9-]+)[^"']*["']/);
      const component = componentMatch ? componentMatch[1].split(' ')[0].replace('layera-', '') : 'unknown';

      jsxVariants.push({
        component: component,
        variant: variant,
        line: lineNumber,
        file: filePath,
        type: 'JSX_USAGE',
        context: currentLine.trim()
      });

      // Αποθήκευση στο jsxUsageMap
      const key = `${component}::${variant}`;
      if (!jsxUsageMap.has(key)) {
        jsxUsageMap.set(key, []);
      }
      jsxUsageMap.get(key).push({
        line: lineNumber,
        file: filePath,
        context: currentLine.trim()
      });
    }

    // Regex για variant prop στο JSX
    // π.χ. variant="primary"
    const jsxPropVariantRegex = /variant=["']([^"']+)["']/g;

    while ((match = jsxPropVariantRegex.exec(content)) !== null) {
      const variant = match[1];
      const lineNumber = content.substring(0, match.index).split('\n').length;

      const lines = content.split('\n');
      const currentLine = lines[lineNumber - 1] || '';

      // Βρες το component tag
      const componentMatch = currentLine.match(/<([A-Z][a-zA-Z0-9]*)/);
      const component = componentMatch ? componentMatch[1] : 'unknown';

      jsxVariants.push({
        component: component.toLowerCase(),
        variant: variant,
        line: lineNumber,
        file: filePath,
        type: 'PROP_USAGE',
        context: currentLine.trim()
      });
    }

    return jsxVariants;
  } catch (error) {
    console.error(`${colors.red}❌ Σφάλμα JSX ανάλυσης ${filePath}:${colors.reset}`, error.message);
    return [];
  }
}

/**
 * Ανάλυση inconsistencies
 */
function analyzeInconsistencies() {
  console.log(`${colors.cyan}🔍 Ανάλυση ασυνεπειών...${colors.reset}\n`);

  const issues = {
    orphanedCSS: [], // CSS rules χωρίς JSX usage
    orphanedJSX: [], // JSX usage χωρίς CSS rules
    duplicateCSS: [], // Πολλαπλά CSS rules για το ίδιο variant
    inconsistentNaming: [] // Ασυνεπή ονόματα
  };

  // Βρες όλα τα unique component::variant combinations
  const allCombinations = new Set([
    ...cssRulesMap.keys(),
    ...jsxUsageMap.keys()
  ]);

  for (const combination of allCombinations) {
    const [component, variant] = combination.split('::');
    const cssOccurrences = cssRulesMap.get(combination) || [];
    const jsxOccurrences = jsxUsageMap.get(combination) || [];

    // Orphaned CSS rules
    if (cssOccurrences.length > 0 && jsxOccurrences.length === 0) {
      issues.orphanedCSS.push({
        component,
        variant,
        cssOccurrences
      });
    }

    // Orphaned JSX usage
    if (jsxOccurrences.length > 0 && cssOccurrences.length === 0) {
      issues.orphanedJSX.push({
        component,
        variant,
        jsxOccurrences
      });
    }

    // Duplicate CSS rules
    if (cssOccurrences.length > 1) {
      issues.duplicateCSS.push({
        component,
        variant,
        cssOccurrences
      });
    }
  }

  return issues;
}

/**
 * Γενερικά στατιστικά
 */
function generateStatistics() {
  const stats = {
    uniqueComponents: new Set(),
    uniqueVariants: new Set(),
    totalCSSRules: 0,
    totalJSXUsages: 0
  };

  // Μέτρηση από CSS rules
  for (const [combination, occurrences] of cssRulesMap.entries()) {
    const [component, variant] = combination.split('::');
    stats.uniqueComponents.add(component);
    stats.uniqueVariants.add(variant);
    stats.totalCSSRules += occurrences.length;
  }

  // Μέτρηση από JSX usage
  for (const [combination, occurrences] of jsxUsageMap.entries()) {
    const [component, variant] = combination.split('::');
    stats.uniqueComponents.add(component);
    stats.uniqueVariants.add(variant);
    stats.totalJSXUsages += occurrences.length;
  }

  return {
    uniqueComponents: stats.uniqueComponents.size,
    uniqueVariants: stats.uniqueVariants.size,
    totalCSSRules: stats.totalCSSRules,
    totalJSXUsages: stats.totalJSXUsages,
    componentsList: Array.from(stats.uniqueComponents),
    variantsList: Array.from(stats.uniqueVariants)
  };
}

/**
 * Αναφορά αποτελεσμάτων
 */
function generateReport(issues, stats) {
  console.log(`${colors.bold}${colors.magenta}📊 ΑΝΑΛΥΤΙΚΗ ΑΝΑΦΟΡΑ VARIANTS${colors.reset}\n`);

  // Στατιστικά
  console.log(`${colors.cyan}📈 ΓΕΝΙΚΑ ΣΤΑΤΙΣΤΙΚΑ:${colors.reset}`);
  console.log(`${colors.white}   Components: ${colors.bold}${stats.uniqueComponents}${colors.reset}`);
  console.log(`${colors.white}   Variants: ${colors.bold}${stats.uniqueVariants}${colors.reset}`);
  console.log(`${colors.white}   CSS Rules: ${colors.bold}${stats.totalCSSRules}${colors.reset}`);
  console.log(`${colors.white}   JSX Usages: ${colors.bold}${stats.totalJSXUsages}${colors.reset}\n`);

  // Components και Variants lists
  console.log(`${colors.cyan}📋 COMPONENTS: ${colors.white}${stats.componentsList.join(', ')}${colors.reset}`);
  console.log(`${colors.cyan}🎨 VARIANTS: ${colors.white}${stats.variantsList.join(', ')}${colors.reset}\n`);

  // Issues
  let totalIssues = 0;

  // Orphaned CSS
  if (issues.orphanedCSS.length > 0) {
    totalIssues += issues.orphanedCSS.length;
    console.log(`${colors.red}${colors.bold}🚨 ORPHANED CSS RULES (${issues.orphanedCSS.length}):${colors.reset}`);
    issues.orphanedCSS.forEach(issue => {
      console.log(`${colors.red}├── ${issue.component}[data-variant="${issue.variant}"]${colors.reset}`);
      issue.cssOccurrences.forEach((occ, index) => {
        const symbol = index === issue.cssOccurrences.length - 1 ? '└──' : '├──';
        console.log(`${colors.red}│   ${symbol} ${occ.file}:${occ.line}${colors.reset}`);
      });
    });
    console.log('');
  }

  // Orphaned JSX
  if (issues.orphanedJSX.length > 0) {
    totalIssues += issues.orphanedJSX.length;
    console.log(`${colors.yellow}${colors.bold}⚠️  ORPHANED JSX USAGE (${issues.orphanedJSX.length}):${colors.reset}`);
    issues.orphanedJSX.forEach(issue => {
      console.log(`${colors.yellow}├── ${issue.component} variant="${issue.variant}"${colors.reset}`);
      issue.jsxOccurrences.forEach((occ, index) => {
        const symbol = index === issue.jsxOccurrences.length - 1 ? '└──' : '├──';
        console.log(`${colors.yellow}│   ${symbol} ${occ.file}:${occ.line}${colors.reset}`);
      });
    });
    console.log('');
  }

  // Duplicate CSS
  if (issues.duplicateCSS.length > 0) {
    totalIssues += issues.duplicateCSS.length;
    console.log(`${colors.magenta}${colors.bold}🔄 DUPLICATE CSS RULES (${issues.duplicateCSS.length}):${colors.reset}`);
    issues.duplicateCSS.forEach(issue => {
      console.log(`${colors.magenta}├── ${issue.component}[data-variant="${issue.variant}"]${colors.reset}`);
      issue.cssOccurrences.forEach((occ, index) => {
        const symbol = index === issue.cssOccurrences.length - 1 ? '└──' : '├──';
        console.log(`${colors.magenta}│   ${symbol} ${occ.file}:${occ.line}${colors.reset}`);
      });
    });
    console.log('');
  }

  // Σύνοψη
  console.log(`${colors.bold}${colors.cyan}📊 ΣΥΝΟΨΗ ΠΡΟΒΛΗΜΑΤΩΝ:${colors.reset}`);
  console.log(`${colors.red}🚨 Orphaned CSS: ${issues.orphanedCSS.length}${colors.reset}`);
  console.log(`${colors.yellow}⚠️  Orphaned JSX: ${issues.orphanedJSX.length}${colors.reset}`);
  console.log(`${colors.magenta}🔄 Duplicate CSS: ${issues.duplicateCSS.length}${colors.reset}`);
  console.log(`${colors.bold}📊 Συνολικά προβλήματα: ${totalIssues}${colors.reset}`);

  if (totalIssues === 0) {
    console.log(`${colors.green}${colors.bold}✅ Δεν βρέθηκαν προβλήματα στα variants!${colors.reset}`);
  }

  // JSON export
  const reportData = {
    timestamp: new Date().toISOString(),
    statistics: stats,
    issues: issues,
    total_issues: totalIssues
  };

  fs.writeFileSync('variants-duplicates-report.json', JSON.stringify(reportData, null, 2));
  console.log(`\n${colors.green}✅ Αναφορά αποθηκεύθηκε: variants-duplicates-report.json${colors.reset}`);
}

/**
 * Main execution
 */
function main() {
  try {
    const files = findFiles();

    console.log(`${colors.cyan}📝 Ανάλυση CSS αρχείων...${colors.reset}`);
    let totalCSSVariants = 0;

    files.filter(f => f.endsWith('.css')).forEach(file => {
      const variants = extractCSSVariants(file);
      totalCSSVariants += variants.length;
      if (variants.length > 0) {
        console.log(`${colors.green}   ✓ ${file}: ${variants.length} CSS variants${colors.reset}`);
      }
    });

    console.log(`\n${colors.cyan}📝 Ανάλυση JSX/TSX αρχείων...${colors.reset}`);
    let totalJSXVariants = 0;

    files.filter(f => f.endsWith('.tsx') || f.endsWith('.jsx')).forEach(file => {
      const variants = extractJSXVariants(file);
      totalJSXVariants += variants.length;
      if (variants.length > 0) {
        console.log(`${colors.green}   ✓ ${file}: ${variants.length} JSX variants${colors.reset}`);
      }
    });

    console.log('');

    const issues = analyzeInconsistencies();
    const stats = generateStatistics();
    generateReport(issues, stats);

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