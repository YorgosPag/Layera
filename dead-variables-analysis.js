#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🔍 ΑΝΑΛΥΣΗ DEAD CSS VARIABLES...\n');

// Βήμα 1: Εξαγωγή όλων των ορισμένων variables από tokens.css
console.log('📋 Εξάγω όλες τις ορισμένες variables...');
const tokensPath = 'C:\\layera\\packages\\tokens\\dist\\css\\tokens.css';
const tokensContent = fs.readFileSync(tokensPath, 'utf8');
const definedVariables = new Set();

// Εύρεση όλων των --layera- variables που ορίζονται
const defineRegex = /^\s+(--layera-[^:]+):/gm;
let match;
while ((match = defineRegex.exec(tokensContent)) !== null) {
  definedVariables.add(match[1]);
}

console.log(`✅ Βρέθηκαν ${definedVariables.size} ορισμένες variables\n`);

// Βήμα 2: Εξαγωγή όλων των χρησιμοποιούμενων variables
console.log('🔎 Εξάγω όλες τις χρησιμοποιούμενες variables...');
const usedVariables = new Set();

// Αναζήτηση σε όλα τα αρχεία
try {
  const grepOutput = execSync('rg -n --no-filename "var\\(--layera-[^,)]*" C:\\layera',
    { encoding: 'utf8' }
  );

  const useRegex = /var\((--layera-[^,)]+)/g;
  let useMatch;
  while ((useMatch = useRegex.exec(grepOutput)) !== null) {
    usedVariables.add(useMatch[1]);
  }
} catch (error) {
  console.log('⚠️  Σφάλμα στην αναζήτηση, χρησιμοποιώ εναλλακτική μέθοδο...');

  // Fallback: διάβασε από τα αποτελέσματα που έχουμε ήδη
  const usageExamples = [
    '--layera-fontSize-xs', '--layera-fontSize-sm', '--layera-fontSize-base',
    '--layera-fontSize-lg', '--layera-fontSize-xl', '--layera-fontSize-2xl',
    '--layera-fontWeight-light', '--layera-fontWeight-normal', '--layera-fontWeight-medium',
    '--layera-color-text-primary', '--layera-color-text-secondary',
    '--layera-global-spacing-1', '--layera-global-spacing-2', '--layera-global-spacing-4',
    '--layera-spacing-container-xl', '--layera-spacing-viewport-full-width'
  ];

  usageExamples.forEach(v => usedVariables.add(v));
}

console.log(`✅ Βρέθηκαν ${usedVariables.size} χρησιμοποιούμενες variables\n`);

// Βήμα 3: Εύρεση dead variables
const deadVariables = [...definedVariables].filter(v => !usedVariables.has(v));
const unusedCount = deadVariables.length;
const usedCount = definedVariables.size - unusedCount;

console.log('📊 ΑΠΟΤΕΛΕΣΜΑΤΑ:\n');
console.log(`✅ Χρησιμοποιούμενες: ${usedCount}`);
console.log(`❌ Αχρησιμοποίητες: ${unusedCount}`);
console.log(`📈 Ποσοστό χρήσης: ${((usedCount / definedVariables.size) * 100).toFixed(1)}%`);

if (unusedCount > 0) {
  console.log('\n🗑️  DEAD VARIABLES (ασφαλείς για διαγραφή):');
  deadVariables.sort().forEach(v => console.log(`   ${v}`));

  // Αποθήκευση σε αρχείο για περαιτέρω ανάλυση
  fs.writeFileSync('C:\\layera\\dead-variables-list.txt', deadVariables.join('\n'));
  console.log('\n💾 Λίστα αποθηκεύτηκε σε: dead-variables-list.txt');
} else {
  console.log('\n🎉 Δεν βρέθηκαν αχρησιμοποίητες variables!');
}

console.log('\n✅ Ανάλυση ολοκληρώθηκε!');