#!/usr/bin/env node
/**
 * Detailed analysis για unused variables στο Layera
 * Αναλύει συγκεκριμένα patterns και κατηγοριοποιεί τα αποτελέσματα
 */

const fs = require('fs');
const path = require('path');

class DetailedUnusedAnalysis {
  constructor() {
    this.results = {
      criticalIssues: [],
      moderateIssues: [],
      minorIssues: [],
      statistics: {
        totalUnusedImports: 0,
        totalUnusedVariables: 0,
        totalUnusedFunctions: 0,
        filesMostAffected: []
      }
    };
  }

  // Αναλύει τα κύρια αρχεία που έχουν προβλήματα
  analyzeMainFiles() {
    const problematicFiles = [
      'C:\\layera\\apps\\layera\\src\\components\\AppContent.tsx',
      'C:\\layera\\apps\\layera\\src\\components\\LivePlayground.tsx',
      'C:\\layera\\apps\\layera\\src\\components\\HomePage.tsx'
    ];

    console.log('🔍 Αναλύω τα κύρια αρχεία με προβλήματα...\n');

    for (const filePath of problematicFiles) {
      if (fs.existsSync(filePath)) {
        this.analyzeSpecificFile(filePath);
      }
    }
  }

  // Αναλύει συγκεκριμένο αρχείο
  analyzeSpecificFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const lines = content.split('\n');
      const fileName = path.relative('C:\\layera', filePath);

      console.log(`📁 Αναλύω: ${fileName}`);

      const fileIssues = {
        fileName,
        unusedImports: [],
        unusedVariables: [],
        suggestions: []
      };

      // Βρίσκουμε imports
      lines.forEach((line, index) => {
        const lineNumber = index + 1;

        // Ελέγχουμε για imports που ίσως δεν χρησιμοποιούνται
        if (line.trim().startsWith('import ')) {
          this.analyzeImportLine(line, lineNumber, content, fileIssues);
        }

        // Ελέγχουμε για const declarations
        if (line.includes('const ') && !line.includes('useState') && !line.includes('useEffect')) {
          this.analyzeConstLine(line, lineNumber, content, fileIssues);
        }
      });

      // Κατηγοριοποίηση σοβαρότητας
      if (fileIssues.unusedImports.length > 10 || fileIssues.unusedVariables.length > 5) {
        this.results.criticalIssues.push(fileIssues);
      } else if (fileIssues.unusedImports.length > 5 || fileIssues.unusedVariables.length > 2) {
        this.results.moderateIssues.push(fileIssues);
      } else if (fileIssues.unusedImports.length > 0 || fileIssues.unusedVariables.length > 0) {
        this.results.minorIssues.push(fileIssues);
      }

      this.displayFileResults(fileIssues);

    } catch (error) {
      console.warn(`⚠️ Σφάλμα κατά την ανάλυση: ${filePath}`);
    }
  }

  // Αναλύει import line
  analyzeImportLine(line, lineNumber, content, fileIssues) {
    // Βρίσκουμε imported names
    const importMatch = line.match(/import\s*{([^}]+)}\s*from/);
    if (importMatch) {
      const imports = importMatch[1].split(',').map(imp => imp.trim());

      for (const importName of imports) {
        // Ελέγχουμε αν το import χρησιμοποιείται
        const usageCount = this.countUsages(content, importName, lineNumber);

        if (usageCount === 0) {
          fileIssues.unusedImports.push({
            name: importName,
            line: lineNumber,
            severity: this.getImportSeverity(importName)
          });
        }
      }
    }

    // Ελέγχουμε για default imports
    const defaultImportMatch = line.match(/import\s+(\w+)\s+from/);
    if (defaultImportMatch) {
      const importName = defaultImportMatch[1];
      const usageCount = this.countUsages(content, importName, lineNumber);

      if (usageCount === 0) {
        fileIssues.unusedImports.push({
          name: importName,
          line: lineNumber,
          severity: 'moderate'
        });
      }
    }
  }

  // Αναλύει const declarations
  analyzeConstLine(line, lineNumber, content, fileIssues) {
    const constMatch = line.match(/const\s+(\w+)\s*=/);
    if (constMatch) {
      const varName = constMatch[1];
      const usageCount = this.countUsages(content, varName, lineNumber);

      if (usageCount === 0) {
        fileIssues.unusedVariables.push({
          name: varName,
          line: lineNumber,
          type: 'const',
          severity: 'moderate'
        });
      }
    }
  }

  // Μετράει χρήσεις μιας μεταβλητής
  countUsages(content, name, declarationLine) {
    const lines = content.split('\n');
    let count = 0;

    for (let i = 0; i < lines.length; i++) {
      if (i + 1 === declarationLine) continue; // Skip declaration line

      // Ψάχνουμε για αναφορές στο name
      if (lines[i].includes(name)) {
        // Βεβαιώνουμε ότι δεν είναι comment ή string
        if (!lines[i].trim().startsWith('//') && !lines[i].trim().startsWith('*')) {
          count++;
        }
      }
    }

    return count;
  }

  // Καθορίζει τη σοβαρότητα ενός unused import
  getImportSeverity(importName) {
    const critical = ['React', 'useState', 'useEffect', 'useCallback'];
    const moderate = ['Box', 'Text', 'Button', 'Modal'];
    const minor = ['Icon', 'Helper', 'Utility'];

    if (critical.some(c => importName.includes(c))) return 'critical';
    if (moderate.some(m => importName.includes(m))) return 'moderate';
    return 'minor';
  }

  // Εμφανίζει αποτελέσματα για αρχείο
  displayFileResults(fileIssues) {
    if (fileIssues.unusedImports.length > 0) {
      console.log(`  📦 Unused imports (${fileIssues.unusedImports.length}):`);
      fileIssues.unusedImports.slice(0, 5).forEach(imp => {
        console.log(`    - ${imp.name} (γραμμή ${imp.line}) [${imp.severity}]`);
      });
      if (fileIssues.unusedImports.length > 5) {
        console.log(`    ... και ${fileIssues.unusedImports.length - 5} ακόμα`);
      }
    }

    if (fileIssues.unusedVariables.length > 0) {
      console.log(`  🔒 Unused variables (${fileIssues.unusedVariables.length}):`);
      fileIssues.unusedVariables.slice(0, 5).forEach(v => {
        console.log(`    - ${v.name} (γραμμή ${v.line})`);
      });
    }

    console.log('');
  }

  // Υπολογίζει στατιστικά
  calculateStatistics() {
    let totalImports = 0;
    let totalVariables = 0;

    [...this.results.criticalIssues, ...this.results.moderateIssues, ...this.results.minorIssues].forEach(file => {
      totalImports += file.unusedImports.length;
      totalVariables += file.unusedVariables.length;
    });

    this.results.statistics.totalUnusedImports = totalImports;
    this.results.statistics.totalUnusedVariables = totalVariables;

    // Βρίσκουμε τα αρχεία με τα περισσότερα προβλήματα
    const allIssues = [...this.results.criticalIssues, ...this.results.moderateIssues, ...this.results.minorIssues];
    this.results.statistics.filesMostAffected = allIssues
      .sort((a, b) => (b.unusedImports.length + b.unusedVariables.length) - (a.unusedImports.length + a.unusedVariables.length))
      .slice(0, 5);
  }

  // Δίνει συστάσεις
  generateRecommendations() {
    console.log('💡 ΣΥΣΤΑΣΕΙΣ ΚΑΘΑΡΙΣΜΟΥ:\n');

    if (this.results.criticalIssues.length > 0) {
      console.log('🔴 ΚΡΙΤΙΚΑ ΑΡΧΕΙΑ (άμεση παρέμβαση):');
      this.results.criticalIssues.forEach(file => {
        console.log(`  - ${file.fileName}: ${file.unusedImports.length} unused imports, ${file.unusedVariables.length} unused variables`);
      });
      console.log();
    }

    if (this.results.moderateIssues.length > 0) {
      console.log('🟡 ΜΕΤΡΙΑ ΠΡΟΒΛΗΜΑΤΑ (προτεραιότητα μέση):');
      this.results.moderateIssues.forEach(file => {
        console.log(`  - ${file.fileName}: ${file.unusedImports.length} unused imports, ${file.unusedVariables.length} unused variables`);
      });
      console.log();
    }

    console.log('📋 ΠΡΟΤΕΙΝΟΜΕΝΗ ΣΕΙΡΑ ΔΡΑΣΗΣ:');
    console.log('1. Καθάρισε τα κρίσιμα αρχεία (AppContent.tsx, LivePlayground.tsx)');
    console.log('2. Αφαίρεσε unused imports από components');
    console.log('3. Αφαίρεσε unused variables και constants');
    console.log('4. Ελέγξε για unused functions στα services');
    console.log('5. Τρέξε τελικό lint check');
  }

  // Εμφανίζει τελικά αποτελέσματα
  displayFinalResults() {
    console.log('\n' + '='.repeat(60));
    console.log('🎯 ΣΥΝΟΛΙΚΑ ΑΠΟΤΕΛΕΣΜΑΤΑ ΑΝΑΛΥΣΗΣ');
    console.log('='.repeat(60));

    console.log(`📊 Συνολικά unused imports: ${this.results.statistics.totalUnusedImports}`);
    console.log(`🔒 Συνολικά unused variables: ${this.results.statistics.totalUnusedVariables}`);
    console.log(`📁 Κρίσιμα αρχεία: ${this.results.criticalIssues.length}`);
    console.log(`📄 Αρχεία με μέτρια προβλήματα: ${this.results.moderateIssues.length}`);
    console.log(`📑 Αρχεία με μικρά προβλήματα: ${this.results.minorIssues.length}`);

    console.log('\n🏆 TOP 3 ΑΡΧΕΙΑ ΜΕ ΠΕΡΙΣΣΟΤΕΡΑ ΠΡΟΒΛΗΜΑΤΑ:');
    this.results.statistics.filesMostAffected.slice(0, 3).forEach((file, index) => {
      const total = file.unusedImports.length + file.unusedVariables.length;
      console.log(`${index + 1}. ${file.fileName}: ${total} συνολικά προβλήματα`);
    });
  }

  // Εκτέλεση πλήρους ανάλυσης
  run() {
    console.log('🚀 Ξεκινάω detailed ανάλυση unused variables...\n');

    this.analyzeMainFiles();
    this.calculateStatistics();
    this.displayFinalResults();
    this.generateRecommendations();

    console.log('\n✅ Detailed ανάλυση ολοκληρώθηκε!');
  }
}

// Εκτέλεση
const analyzer = new DetailedUnusedAnalysis();
analyzer.run();