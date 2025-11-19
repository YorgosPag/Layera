#!/usr/bin/env node
/**
 * Analyzer για unused variables στο Layera project
 * Αναλύει TypeScript compiler output και άλλες πηγές
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class UnusedVariableAnalyzer {
  constructor() {
    this.unusedItems = {
      imports: [],
      variables: [],
      functions: [],
      constants: [],
      types: [],
      components: []
    };
    this.totalCount = 0;
  }

  // Τρέχει TypeScript compiler για unused checks
  runTypeScriptAnalysis() {
    try {
      console.log('🔍 Τρέχω TypeScript analysis για unused variables...');
      const result = execSync('npx tsc --noUnusedLocals --noUnusedParameters --noEmit --project tsconfig.json', {
        encoding: 'utf8',
        stdio: 'pipe'
      });
    } catch (error) {
      // Το error output περιέχει τα unused variables
      return this.parseTypeScriptErrors(error.stdout || error.stderr || '');
    }
  }

  // Αναλύει τα errors του TypeScript compiler
  parseTypeScriptErrors(errorOutput) {
    const lines = errorOutput.split('\n');
    const patterns = {
      unusedImport: /error TS6133: '(.+)' is declared but its value is never read/,
      allImportsUnused: /error TS6192: All imports in import declaration are unused/,
      unusedParameter: /error TS6133: '(.+)' is declared but its value is never read/
    };

    for (const line of lines) {
      const trimmed = line.trim();

      // Βρίσκουμε το αρχείο και τη γραμμή
      const fileMatch = trimmed.match(/^([^(]+)\((\d+),(\d+)\):/);
      if (!fileMatch) continue;

      const [, filePath, lineNumber] = fileMatch;

      // Ελέγχουμε για unused imports
      if (patterns.unusedImport.test(trimmed)) {
        const match = trimmed.match(patterns.unusedImport);
        if (match) {
          this.unusedItems.imports.push({
            name: match[1],
            file: filePath,
            line: lineNumber,
            type: 'unused-import'
          });
        }
      }

      // Ελέγχουμε για όλα τα imports unused
      if (patterns.allImportsUnused.test(trimmed)) {
        this.unusedItems.imports.push({
          name: 'All imports',
          file: filePath,
          line: lineNumber,
          type: 'all-imports-unused'
        });
      }
    }
  }

  // Αναλύει συγκεκριμένα αρχεία για manual patterns
  analyzeSpecificPatterns() {
    const srcDir = 'C:\\layera\\apps\\layera\\src';
    this.searchInDirectory(srcDir);
  }

  // Αναζητάει σε directory
  searchInDirectory(dirPath) {
    if (!fs.existsSync(dirPath)) return;

    const files = fs.readdirSync(dirPath);
    for (const file of files) {
      const fullPath = path.join(dirPath, file);
      const stats = fs.statSync(fullPath);

      if (stats.isDirectory()) {
        this.searchInDirectory(fullPath);
      } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
        this.analyzeFile(fullPath);
      }
    }
  }

  // Αναλύει συγκεκριμένο αρχείο
  analyzeFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const lines = content.split('\n');

      lines.forEach((line, index) => {
        const lineNumber = index + 1;

        // Βρίσκουμε unused const declarations
        const constMatch = line.match(/const\s+(\w+)\s*=/);
        if (constMatch && !this.isVariableUsed(content, constMatch[1], lineNumber)) {
          this.unusedItems.constants.push({
            name: constMatch[1],
            file: filePath,
            line: lineNumber,
            type: 'unused-const'
          });
        }

        // Βρίσκουμε unused function declarations
        const funcMatch = line.match(/function\s+(\w+)\s*\(/);
        if (funcMatch && !this.isFunctionUsed(content, funcMatch[1], lineNumber)) {
          this.unusedItems.functions.push({
            name: funcMatch[1],
            file: filePath,
            line: lineNumber,
            type: 'unused-function'
          });
        }
      });
    } catch (error) {
      console.warn(`⚠️ Δεν μπόρεσα να διαβάσω το αρχείο: ${filePath}`);
    }
  }

  // Ελέγχει αν μια μεταβλητή χρησιμοποιείται
  isVariableUsed(content, variableName, declarationLine) {
    const lines = content.split('\n');
    for (let i = 0; i < lines.length; i++) {
      if (i + 1 === declarationLine) continue; // Skip declaration line
      if (lines[i].includes(variableName)) {
        return true;
      }
    }
    return false;
  }

  // Ελέγχει αν μια function χρησιμοποιείται
  isFunctionUsed(content, functionName, declarationLine) {
    const lines = content.split('\n');
    for (let i = 0; i < lines.length; i++) {
      if (i + 1 === declarationLine) continue; // Skip declaration line
      if (lines[i].includes(`${functionName}(`) || lines[i].includes(`${functionName} `)) {
        return true;
      }
    }
    return false;
  }

  // Υπολογίζει συνολικό αριθμό
  calculateTotal() {
    this.totalCount = Object.values(this.unusedItems).reduce((total, arr) => total + arr.length, 0);
  }

  // Εμφανίζει αποτελέσματα
  displayResults() {
    this.calculateTotal();

    console.log('\n🎯 ΑΝΑΛΥΣΗ UNUSED VARIABLES - LAYERA PROJECT');
    console.log('================================================');
    console.log(`📊 Συνολικός αριθμός unused items: ${this.totalCount}`);
    console.log();

    // Προβάλλουμε τα unused imports
    if (this.unusedItems.imports.length > 0) {
      console.log(`📦 UNUSED IMPORTS (${this.unusedItems.imports.length}):`);
      this.unusedItems.imports.slice(0, 10).forEach(item => {
        console.log(`  - ${item.name} στο ${path.relative('C:\\layera', item.file)}:${item.line}`);
      });
      if (this.unusedItems.imports.length > 10) {
        console.log(`  ... και ${this.unusedItems.imports.length - 10} ακόμα`);
      }
      console.log();
    }

    // Προβάλλουμε τις unused constants
    if (this.unusedItems.constants.length > 0) {
      console.log(`🔒 UNUSED CONSTANTS (${this.unusedItems.constants.length}):`);
      this.unusedItems.constants.slice(0, 10).forEach(item => {
        console.log(`  - ${item.name} στο ${path.relative('C:\\layera', item.file)}:${item.line}`);
      });
      if (this.unusedItems.constants.length > 10) {
        console.log(`  ... και ${this.unusedItems.constants.length - 10} ακόμα`);
      }
      console.log();
    }

    // Προβάλλουμε τις unused functions
    if (this.unusedItems.functions.length > 0) {
      console.log(`⚙️ UNUSED FUNCTIONS (${this.unusedItems.functions.length}):`);
      this.unusedItems.functions.slice(0, 10).forEach(item => {
        console.log(`  - ${item.name} στο ${path.relative('C:\\layera', item.file)}:${item.line}`);
      });
      if (this.unusedItems.functions.length > 10) {
        console.log(`  ... και ${this.unusedItems.functions.length - 10} ακόμα`);
      }
      console.log();
    }
  }

  // Δημιουργεί detailed report
  generateDetailedReport() {
    const report = {
      timestamp: new Date().toISOString(),
      total: this.totalCount,
      breakdown: {
        imports: this.unusedItems.imports.length,
        constants: this.unusedItems.constants.length,
        functions: this.unusedItems.functions.length,
        variables: this.unusedItems.variables.length,
        types: this.unusedItems.types.length
      },
      details: this.unusedItems
    };

    fs.writeFileSync('unused-variables-report.json', JSON.stringify(report, null, 2));
    console.log('📄 Detailed report αποθηκεύτηκε στο: unused-variables-report.json');
  }

  // Τρέχει πλήρη ανάλυση
  run() {
    console.log('🚀 Ξεκινάω ανάλυση unused variables για Layera...\n');

    this.runTypeScriptAnalysis();
    this.analyzeSpecificPatterns();
    this.displayResults();
    this.generateDetailedReport();

    console.log('\n✅ Ανάλυση ολοκληρώθηκε!');
  }
}

// Εκτέλεση
const analyzer = new UnusedVariableAnalyzer();
analyzer.run();