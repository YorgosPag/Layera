#!/usr/bin/env node

const fs = require('fs');
const { execSync } = require('child_process');

console.log('🔍 ΕΝΤΟΠΙΣΜΟΣ ΠΡΑΓΜΑΤΙΚΑ ΧΡΗΣΙΜΟΠΟΙΟΥΜΕΝΩΝ VARIABLES...\n');

// Βρες όλες τις variables που χρησιμοποιούνται στον κώδικα
const usedVariables = new Set();

console.log('📂 Σκανάρω όλα τα αρχεία για χρήση variables...');

// Scan όλων των αρχείων για var(--layera-*)
const patterns = [
  'packages/**/src/**/*.{ts,tsx,js,jsx}',
  'apps/**/src/**/*.{ts,tsx,js,jsx}',
  'packages/**/src/**/*.{css,json}'
];

patterns.forEach(pattern => {
  try {
    console.log(`🔎 Σκανάρω: ${pattern}`);

    // Χρήση find και grep για αναζήτηση
    const files = execSync(`find C:\\layera -path "**/node_modules" -prune -o -path "**/dist" -prune -o -name "*.ts" -o -name "*.tsx" -o -name "*.js" -o -name "*.jsx" -o -name "*.json" | grep -v node_modules | grep -v dist`).toString().split('\n').filter(f => f.trim());

    files.forEach(file => {
      if (!file.trim()) return;

      try {
        const content = fs.readFileSync(file, 'utf8');

        // Βρες όλες τις αναφορές σε --layera-* variables
        const matches = content.match(/var\(--layera-[^,)]+/g);
        if (matches) {
          matches.forEach(match => {
            const varName = match.replace('var(', '');
            usedVariables.add(varName);
          });
        }
      } catch (e) {
        // Skip files that can't be read
      }
    });

  } catch (error) {
    console.log(`⚠️ Σφάλμα στο pattern ${pattern}: ${error.message}`);
  }
});

console.log(`✅ Βρέθηκαν ${usedVariables.size} πραγματικά χρησιμοποιούμενες variables\n`);

// Βρες όλες τις ορισμένες variables
const tokensPath = 'C:\\layera\\packages\\tokens\\dist\\css\\tokens.css';
const tokensContent = fs.readFileSync(tokensPath, 'utf8');
const definedVariables = new Set();

const defineRegex = /^\s+(--layera-[^:]+):/gm;
let match;
while ((match = defineRegex.exec(tokensContent)) !== null) {
  definedVariables.add(match[1]);
}

console.log(`📋 Ορισμένες variables: ${definedVariables.size}`);
console.log(`✅ Χρησιμοποιούμενες: ${usedVariables.size}`);

// Βρες τις πραγματικά unused
const reallyUnused = [...definedVariables].filter(v => !usedVariables.has(v));
console.log(`❌ ΠΡΑΓΜΑΤΙΚΑ unused: ${reallyUnused.length}\n`);

// Αποθήκευσε τα αποτελέσματα
fs.writeFileSync('C:\\layera\\actually-used-variables.txt', [...usedVariables].sort().join('\n'));
fs.writeFileSync('C:\\layera\\actually-unused-variables.txt', reallyUnused.sort().join('\n'));

console.log('📊 ΛΕΠΤΟΜΕΡΙΕΣ:');
console.log(`💚 Χρησιμοποιούμενες variables (αποθηκεύτηκαν σε actually-used-variables.txt):`);
[...usedVariables].sort().slice(0, 10).forEach(v => console.log(`   ${v}`));
if (usedVariables.size > 10) console.log(`   ... και ${usedVariables.size - 10} ακόμα\n`);

console.log(`🗑️  Πραγματικά unused variables (αποθηκεύτηκαν σε actually-unused-variables.txt):`);
reallyUnused.slice(0, 10).forEach(v => console.log(`   ${v}`));
if (reallyUnused.length > 10) console.log(`   ... και ${reallyUnused.length - 10} ακόμα`);

console.log('\n✅ Ανάλυση ολοκληρώθηκε!');