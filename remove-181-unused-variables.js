#!/usr/bin/env node

const fs = require('fs');

console.log('🗑️  ΔΙΑΓΡΑΦΗ 181 UNUSED CSS VARIABLES...\n');

// Διάβασε τη λίστα των unused variables
const unusedVars = fs.readFileSync('C:\\layera\\actually-unused-variables.txt', 'utf8')
  .split('\n')
  .map(v => v.trim())
  .filter(v => v.length > 0);

console.log(`📋 Θα διαγραφθούν ${unusedVars.length} unused variables\n`);

// Διάβασε το τρέχον tokens.css
const tokensPath = 'C:\\layera\\packages\\tokens\\dist\\css\\tokens.css';
const originalContent = fs.readFileSync(tokensPath, 'utf8');

console.log('🔍 Αρχικό αρχείο:');
const originalLines = originalContent.split('\n');
const originalVarCount = originalLines.filter(line => line.match(/^\s*--layera-.*:/)).length;
console.log(`   Συνολικές γραμμές: ${originalLines.length}`);
console.log(`   CSS variables: ${originalVarCount}\n`);

let modifiedContent = originalContent;
let removedCount = 0;

console.log('🗑️  Διαγραφή variables...');

// Για κάθε unused variable, διέγραψε την γραμμή του
unusedVars.forEach((varName, index) => {
  // Δημιουργία regex για την ακριβή γραμμή
  const escapedVarName = varName.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
  const lineRegex = new RegExp(`^\\s*${escapedVarName}:\\s*[^;]*;.*$`, 'gm');

  const beforeLength = modifiedContent.length;
  modifiedContent = modifiedContent.replace(lineRegex, '');

  if (modifiedContent.length < beforeLength) {
    removedCount++;
    if (removedCount % 20 === 0) {
      console.log(`   ✅ ${removedCount}/${unusedVars.length} variables διαγράφηκαν...`);
    }
  }
});

// Καθαρισμός κενών γραμμών
console.log('\n🧹 Καθαρισμός κενών γραμμών...');
modifiedContent = modifiedContent.replace(/\n\s*\n\s*\n/g, '\n\n');
modifiedContent = modifiedContent.replace(/\n{3,}/g, '\n\n');

// Έλεγχος αποτελεσμάτων
const modifiedLines = modifiedContent.split('\n');
const finalVarCount = modifiedLines.filter(line => line.match(/^\s*--layera-.*:/)).length;

console.log('📊 ΑΠΟΤΕΛΕΣΜΑΤΑ:');
console.log(`   ✅ Διαγράφηκαν: ${removedCount} variables`);
console.log(`   📊 Πριν: ${originalVarCount} variables`);
console.log(`   📊 Μετά: ${finalVarCount} variables`);
console.log(`   📉 Μείωση: ${originalVarCount - finalVarCount} variables (${((originalVarCount - finalVarCount) / originalVarCount * 100).toFixed(1)}%)\n`);

// Αποθήκευση του νέου αρχείου
if (removedCount > 0) {
  console.log('💾 Αποθήκευση νέου tokens.css...');
  fs.writeFileSync(tokensPath, modifiedContent);

  // Δημιουργία αναφοράς
  const report = `# ΑΝΑΦΟΡΑ ΔΙΑΓΡΑΦΗΣ UNUSED CSS VARIABLES

## Στατιστικά
- Αρχικές variables: ${originalVarCount}
- Διαγράφηκαν: ${removedCount}
- Τελικές variables: ${finalVarCount}
- Ποσοστό μείωσης: ${((originalVarCount - finalVarCount) / originalVarCount * 100).toFixed(1)}%

## Διαγραμμένες Variables
${unusedVars.slice(0, removedCount).map(v => `- ${v}`).join('\n')}

## Ημερομηνία
${new Date().toLocaleString('el-GR')}
`;

  fs.writeFileSync('C:\\layera\\removal-report.md', report);
  console.log('📋 Αναφορά αποθηκεύτηκε: removal-report.md\n');

  console.log('✅ ΔΙΑΓΡΑΦΗ ΟΛΟΚΛΗΡΩΘΗΚΕ ΕΠΙΤΥΧΩΣ!');
  console.log('⚡ Επόμενο: Rebuild tokens και testing...');
} else {
  console.log('❌ Δεν διαγράφηκε καμία variable. Ελέγξτε το format του αρχείου.');
}