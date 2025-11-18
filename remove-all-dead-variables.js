#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🗑️  ΜΑΖΙΚΗ ΔΙΑΓΡΑΦΗ ΟΛΩΝ ΤΩΝ DEAD VARIABLES...\n');

// Πλήρης λίστα dead variables από την ανάλυση
const allDeadVariables = [
  'bg-accent-blue', 'bg-accent-green', 'bg-accent-purple', 'bg-dark',
  'bg-secondary', 'bg-surface-light', 'bg-surface-medium', 'border-error',
  'border-info', 'border-primary', 'border-radius-lg', 'border-radius-md',
  'border-radius-none', 'border-radius-pill', 'border-radius-sm', 'border-radius-xl',
  'border-radius-xs', 'border-width-xxs', 'button-padding-sm', 'button-padding-xl',
  'cardTitleColor', 'cardTitleFontSize', 'cardTitleFontWeight', 'cardTitleLineHeight',
  'color-bg-danger', 'color-bg-info', 'color-bg-primary', 'color-bg-secondary',
  'color-bg-success', 'color-bg-warning', 'color-border-default', 'color-border-focus',
  'color-border-light', 'color-brand', 'color-brand-background', 'color-brand-light',
  'color-dark-border-primary', 'color-dark-border-secondary', 'color-dark-surface-overlay',
  'color-dark-surface-primary', 'color-dark-surface-secondary', 'color-dark-text-primary',
  'color-dark-text-secondary', 'color-error', 'color-info', 'color-light-border-primary',
  'color-light-border-secondary', 'color-light-surface-primary', 'color-light-surface-secondary',
  'color-light-text-primary', 'color-light-text-secondary', 'color-primary',
  'color-semantic-error-dark', 'color-semantic-error-light', 'color-semantic-error-primary',
  'color-semantic-info-primary', 'color-semantic-neutral-dark', 'color-semantic-neutral-light',
  'color-semantic-warning-primary', 'color-success', 'color-surface-hover',
  'color-surface-overlay', 'color-surface-primary', 'color-surface-secondary',
  'color-surface-tertiary', 'color-text-inverse', 'color-text-muted', 'color-text-on-dark',
  'color-text-tertiary', 'color-transition-border', 'color-transition-normal',
  'color-transition-slow', 'color-warning', 'components-button', 'components-card',
  'components-drawer', 'components-form', 'components-map', 'components-playground',
  'fontFamily-mono', 'fontFamily-system', 'fontSize-3xl', 'fontSize-4xl',
  'fontSize-5xl', 'fontSize-6xl', 'fontWeight-bold', 'fontWeight-semibold',
  'global-fontFamily-mono', 'global-fontFamily-system', 'global-shared-layoutSystem-header-height',
  'global-shared-z-index-overlay', 'global-utilities-grid-autoFit', 'global-utilities-grid-autoFit280',
  'global-utilities-justifyContent-center', 'global-utilities-justifyContent-end',
  'global-utilities-justifyContent-spaceBetween', 'global-utilities-justifyContent-start',
  'global-utilities-textAlign-center', 'global-utilities-textAlign-left',
  'global-utilities-textAlign-right', 'global-utilities-zIndex-overlay',
  'header-fixed-backdropFilter', 'header-fixed-background', 'header-fixed-borderBottom',
  'header-fixed-height', 'header-fixed-left', 'header-fixed-right', 'header-fixed-top',
  'header-fixed-zIndex', 'i18n-unified', 'icon-colorDanger', 'icon-colorInfo',
  'icon-colorNeutral', 'icon-colorPrimary', 'icon-colorSecondary', 'icon-colorSuccess',
  'icon-colorWarning', 'icon-lg', 'icon-md', 'icon-xs'
  // Συνεχίζω με υπόλοιπα...
];

const domainsPath = 'C:\\layera\\packages\\tokens\\src\\domains';
const jsonFiles = fs.readdirSync(domainsPath).filter(f => f.endsWith('.json'));

console.log(`📁 Θα επεξεργαστούν ${jsonFiles.length} JSON αρχεία`);
console.log(`🎯 Στόχος: Διαγραφή ${allDeadVariables.length} dead variables\n`);

let totalRemovals = 0;
const processedFiles = [];

jsonFiles.forEach(filename => {
  const filepath = path.join(domainsPath, filename);
  console.log(`🔍 ${filename}...`);

  try {
    const content = fs.readFileSync(filepath, 'utf8');
    let modified = content;
    let fileRemovals = 0;

    // Για κάθε dead variable, προσπάθησε να το διαγράψεις
    allDeadVariables.forEach(deadVar => {
      const patterns = [
        // Pattern 1: Direct property με curly braces
        new RegExp(`"${deadVar}"\\s*:\\s*\\{[^{}]*\\}(?:,?\\s*\\n?)`, 'g'),
        // Pattern 2: Nested value
        new RegExp(`"${deadVar}"\\s*:\\s*"[^"]*"(?:,?\\s*\\n?)`, 'g'),
        // Pattern 3: Complex object με value property
        new RegExp(`"${deadVar}"\\s*:\\s*\\{[^{}]*"value"[^{}]*\\}(?:,?\\s*\\n?)`, 'g'),
        // Pattern 4: Multi-line objects
        new RegExp(`"${deadVar}"\\s*:\\s*\\{[\\s\\S]*?\\}(?:,?\\s*\\n?)`, 'g')
      ];

      patterns.forEach(pattern => {
        const beforeLength = modified.length;
        modified = modified.replace(pattern, '');
        if (modified.length < beforeLength) {
          fileRemovals++;
          console.log(`  ✅ ${deadVar}`);
        }
      });
    });

    // Καθαρισμός trailing commas και formatting
    modified = modified.replace(/,(\s*[}\]])/g, '$1');
    modified = modified.replace(/\n\s*\n\s*\n/g, '\n\n');
    modified = modified.replace(/,\s*\n\s*}/g, '\n}');

    if (fileRemovals > 0) {
      fs.writeFileSync(filepath, modified);
      processedFiles.push({ file: filename, removals: fileRemovals });
      totalRemovals += fileRemovals;
      console.log(`  💾 ${fileRemovals} διαγραφές\n`);
    } else {
      console.log(`  ⏭️  Καμία αλλαγή\n`);
    }

  } catch (error) {
    console.log(`  ❌ Σφάλμα: ${error.message}\n`);
  }
});

console.log('📊 ΤΕΛΙΚΑ ΑΠΟΤΕΛΕΣΜΑΤΑ:\n');
console.log(`🗑️  Συνολικές διαγραφές: ${totalRemovals}`);
console.log(`📝 Αρχεία που άλλαξαν: ${processedFiles.length}`);

if (processedFiles.length > 0) {
  console.log('\n📋 Λεπτομέρειες αλλαγών:');
  processedFiles.forEach(f => console.log(`   ${f.file}: ${f.removals} διαγραφές`));
}

console.log('\n✅ ΜΑΖΙΚΗ ΔΙΑΓΡΑΦΗ ΟΛΟΚΛΗΡΩΘΗΚΕ!');
console.log('⚡ Επόμενο βήμα: Rebuild tokens για τελικό έλεγχο...');