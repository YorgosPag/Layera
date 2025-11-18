#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🗑️  ΔΙΑΓΡΑΦΗ DEAD CSS VARIABLES...\n');

// Λίστα dead variables που θα διαγραφθούν
const deadVariables = [
  '--layera-bg-accent-blue', '--layera-bg-accent-green', '--layera-bg-accent-purple',
  '--layera-bg-dark', '--layera-bg-secondary', '--layera-bg-surface-light',
  '--layera-bg-surface-medium', '--layera-border-error', '--layera-border-info',
  '--layera-border-primary', '--layera-border-radius-lg', '--layera-border-radius-md',
  '--layera-border-radius-none', '--layera-border-radius-pill', '--layera-border-radius-sm',
  '--layera-border-radius-xl', '--layera-border-radius-xs', '--layera-border-width-xxs',
  '--layera-button-padding-sm', '--layera-button-padding-xl', '--layera-cardTitleColor',
  '--layera-cardTitleFontSize', '--layera-cardTitleFontWeight', '--layera-cardTitleLineHeight',
  '--layera-color-bg-danger', '--layera-color-bg-info', '--layera-color-bg-primary',
  '--layera-color-bg-secondary', '--layera-color-bg-success', '--layera-color-bg-warning',
  '--layera-color-border-default', '--layera-color-border-focus', '--layera-color-border-light',
  '--layera-color-brand', '--layera-color-brand-background', '--layera-color-brand-light',
  '--layera-color-dark-border-primary', '--layera-color-dark-border-secondary',
  '--layera-color-dark-surface-overlay', '--layera-color-dark-surface-primary',
  '--layera-color-dark-surface-secondary', '--layera-color-dark-text-primary',
  '--layera-color-dark-text-secondary', '--layera-color-error', '--layera-color-info',
  '--layera-color-light-border-primary', '--layera-color-light-border-secondary',
  '--layera-color-light-surface-primary', '--layera-color-light-surface-secondary',
  '--layera-color-light-text-primary', '--layera-color-light-text-secondary',
  '--layera-color-primary', '--layera-color-semantic-error-dark', '--layera-color-semantic-error-light',
  '--layera-color-semantic-error-primary', '--layera-color-semantic-info-primary',
  '--layera-color-semantic-neutral-dark', '--layera-color-semantic-neutral-light',
  '--layera-color-semantic-warning-primary', '--layera-color-success', '--layera-color-surface-hover',
  '--layera-color-surface-overlay', '--layera-color-surface-primary', '--layera-color-surface-secondary',
  '--layera-color-surface-tertiary', '--layera-color-text-inverse', '--layera-color-text-muted',
  '--layera-color-text-on-dark', '--layera-color-text-tertiary', '--layera-color-transition-border',
  '--layera-color-transition-normal', '--layera-color-transition-slow', '--layera-color-warning'
  // Θα συνεχίσω με τις υπόλοιπες σε επόμενο βήμα για να μην γίνει πολύ μεγάλο το αρχείο
];

console.log(`📋 Θα διαγραφθούν ${deadVariables.length} variables από τα πρώτα...\n`);

// Εύρεση όλων των JSON αρχείων στο tokens/src/domains/
const domainsPath = 'C:\\layera\\packages\\tokens\\src\\domains';
const jsonFiles = fs.readdirSync(domainsPath).filter(f => f.endsWith('.json'));

console.log(`📁 Βρέθηκαν ${jsonFiles.length} JSON αρχεία για επεξεργασία:\n`);

let totalRemoved = 0;
const changes = [];

jsonFiles.forEach(filename => {
  const filepath = path.join(domainsPath, filename);
  console.log(`🔍 Επεξεργάζομαι: ${filename}`);

  try {
    const content = fs.readFileSync(filepath, 'utf8');
    let modified = content;
    let fileChanges = 0;

    // Για κάθε dead variable, βρες και διέγραψε τον ορισμό του
    deadVariables.forEach(varName => {
      const cleanVarName = varName.replace('--layera-', '');

      // Pattern για εύρεση του property στο JSON
      const patterns = [
        // Direct property match
        new RegExp(`"${cleanVarName}"\\s*:\\s*{[^}]*}(?:,?)`, 'g'),
        // Nested property match
        new RegExp(`"${cleanVarName}"\\s*:\\s*"[^"]*"(?:,?)`, 'g'),
        // Value object match
        new RegExp(`"${cleanVarName}"\\s*:\\s*{[^}]*"value"[^}]*}(?:,?)`, 'g')
      ];

      patterns.forEach(pattern => {
        const beforeLength = modified.length;
        modified = modified.replace(pattern, '');
        if (modified.length < beforeLength) {
          fileChanges++;
          console.log(`  ✅ Διαγράφηκε: ${varName}`);
        }
      });
    });

    // Καθαρισμός κενών γραμμών και κόμματα
    modified = modified.replace(/,(\s*[}\]])/g, '$1'); // Αφαίρεση trailing commas
    modified = modified.replace(/\n\s*\n\s*\n/g, '\n\n'); // Αφαίρεση πολλαπλών κενών γραμμών

    if (fileChanges > 0) {
      fs.writeFileSync(filepath, modified);
      changes.push({ file: filename, changes: fileChanges });
      totalRemoved += fileChanges;
      console.log(`  💾 Αποθήκευση: ${fileChanges} αλλαγές\n`);
    } else {
      console.log(`  ⏭️  Καμία αλλαγή\n`);
    }

  } catch (error) {
    console.log(`  ❌ Σφάλμα: ${error.message}\n`);
  }
});

console.log('📊 ΣΥΝΟΨΗ ΑΛΛΑΓΩΝ:\n');
console.log(`🗑️  Συνολικές διαγραφές: ${totalRemoved}`);
console.log(`📝 Αρχεία που άλλαξαν: ${changes.length}\n`);

if (changes.length > 0) {
  console.log('📋 Λεπτομέρειες αλλαγών:');
  changes.forEach(c => console.log(`   ${c.file}: ${c.changes} διαγραφές`));
}

console.log('\n✅ ΒΗΜΑ 1 ΟΛΟΚΛΗΡΩΘΗΚΕ!');
console.log('⚡ Επόμενο: Rebuild tokens και testing...');