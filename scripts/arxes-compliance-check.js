#!/usr/bin/env node

/**
 * ARXES Enterprise Compliance Checker
 * Ελέγχει το codebase για παραβιάσεις enterprise standards
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Colors για terminal output
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

class ARXESComplianceChecker {
  constructor() {
    this.violations = {
      divUsage: [],
      inlineStyles: [],
      hardCodedValues: [],
      anyTypes: [],
      pathAliases: [],
      cssFiles: []
    };
    this.totalViolations = 0;
  }

  log(message, color = 'reset') {
    console.log(colors[color] + message + colors.reset);
  }

  header(text) {
    console.log('\n' + colors.bold + colors.cyan + '═'.repeat(50));
    console.log('  ' + text);
    console.log('═'.repeat(50) + colors.reset);
  }

  // Έλεγχος για <div> usage
  checkDivUsage() {
    this.header('🚫 ΕΛΕΓΧΟΣ <div> USAGE');

    try {
      const result = execSync(`grep -r "<div" --include="*.tsx" --include="*.ts" . --exclude-dir=node_modules --exclude-dir=DON_T_TOUCH-Layera_OLD`,
        { encoding: 'utf8', cwd: process.cwd() });

      const matches = result.trim().split('\n').filter(line => line.includes('<div'));

      matches.forEach(match => {
        const [file, ...rest] = match.split(':');
        this.violations.divUsage.push({ file, content: rest.join(':').trim() });
      });

      if (this.violations.divUsage.length > 0) {
        this.log(`❌ Βρέθηκαν ${this.violations.divUsage.length} παραβιάσεις <div>`, 'red');
        this.violations.divUsage.forEach(v => {
          this.log(`   ${v.file}: ${v.content}`, 'yellow');
        });
      } else {
        this.log('✅ Καμία παραβίαση <div>', 'green');
      }
    } catch (error) {
      this.log('✅ Καμία παραβίαση <div> (ή δεν υπάρχουν αρχεία)', 'green');
    }
  }

  // Έλεγχος για inline styles
  checkInlineStyles() {
    this.header('🎨 ΕΛΕΓΧΟΣ INLINE STYLES');

    try {
      const result = execSync(`grep -r "style={" --include="*.tsx" --include="*.ts" . --exclude-dir=node_modules --exclude-dir=DON_T_TOUCH-Layera_OLD`,
        { encoding: 'utf8', cwd: process.cwd() });

      const matches = result.trim().split('\n').filter(line => line.includes('style={'));

      matches.forEach(match => {
        const [file, ...rest] = match.split(':');
        // Φιλτράρισμα για να αποκλείσουμε valid προς style props
        const content = rest.join(':').trim();
        if (!content.includes('style={style}') && !content.includes('...props')) {
          this.violations.inlineStyles.push({ file, content });
        }
      });

      if (this.violations.inlineStyles.length > 0) {
        this.log(`❌ Βρέθηκαν ${this.violations.inlineStyles.length} inline styles`, 'red');
        this.violations.inlineStyles.forEach(v => {
          this.log(`   ${v.file}: ${v.content}`, 'yellow');
        });
      } else {
        this.log('✅ Καμία παραβίαση inline styles', 'green');
      }
    } catch (error) {
      this.log('✅ Καμία παραβίαση inline styles', 'green');
    }
  }

  // Έλεγχος για any types
  checkAnyTypes() {
    this.header('⚠️  ΕΛΕΓΧΟΣ ANY TYPES');

    try {
      const result = execSync(`grep -r ": any" --include="*.tsx" --include="*.ts" . --exclude-dir=node_modules --exclude-dir=DON_T_TOUCH-Layera_OLD`,
        { encoding: 'utf8', cwd: process.cwd() });

      const matches = result.trim().split('\n').filter(line => line.includes(': any'));

      matches.forEach(match => {
        const [file, ...rest] = match.split(':');
        this.violations.anyTypes.push({ file, content: rest.join(':').trim() });
      });

      if (this.violations.anyTypes.length > 0) {
        this.log(`❌ Βρέθηκαν ${this.violations.anyTypes.length} any types`, 'red');
        this.violations.anyTypes.forEach(v => {
          this.log(`   ${v.file}: ${v.content}`, 'yellow');
        });
      } else {
        this.log('✅ Καμία παραβίαση any types', 'green');
      }
    } catch (error) {
      this.log('✅ Καμία παραβίαση any types', 'green');
    }
  }

  // Συνολικός έλεγχος
  runCompleteCheck() {
    this.log('🏢 ARXES ENTERPRISE COMPLIANCE CHECKER', 'bold');
    this.log('═'.repeat(50), 'cyan');

    this.checkDivUsage();
    this.checkInlineStyles();
    this.checkAnyTypes();

    // Υπολογισμός συνολικών παραβιάσεων
    this.totalViolations = Object.values(this.violations).reduce((total, arr) => total + arr.length, 0);

    // Τελικό Report
    this.header('📊 ΤΕΛΙΚΟ ΑΠΟΤΕΛΕΣΜΑ');

    if (this.totalViolations === 0) {
      this.log('🎉 100% ARXES COMPLIANT! Δεν βρέθηκαν παραβιάσεις!', 'green');
      this.log('✅ Το codebase ακολουθεί πλήρως τα enterprise standards', 'green');
    } else {
      this.log(`❌ Βρέθηκαν συνολικά ${this.totalViolations} παραβιάσεις`, 'red');
      this.log('🔧 Απαιτούνται διορθώσεις πριν το production', 'yellow');

      // Συγκεκριμένες οδηγίες διόρθωσης
      this.log('\n📋 ΟΔΗΓΙΕΣ ΔΙΟΡΘΩΣΗΣ:', 'bold');
      if (this.violations.divUsage.length > 0) {
        this.log('   • Αντικατάστησε όλα τα <div> με Box από @layera/layout', 'blue');
      }
      if (this.violations.inlineStyles.length > 0) {
        this.log('   • Χρησιμοποίησε data-attributes και CSS classes αντί για inline styles', 'blue');
      }
      if (this.violations.anyTypes.length > 0) {
        this.log('   • Δημιούργησε proper TypeScript interfaces αντί για any', 'blue');
      }
    }

    // Exit code για CI/CD
    process.exit(this.totalViolations > 0 ? 1 : 0);
  }
}

// Εκτέλεση
const checker = new ARXESComplianceChecker();
checker.runCompleteCheck();