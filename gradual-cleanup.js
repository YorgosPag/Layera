#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 ΣΤΑΔΙΑΚΗ ΔΙΑΓΡΑΦΗ - 10 UNUSED VARIABLES ΚΑΘΕ ΦΟΡΑ...\n');

// Διάβασε τη λίστα των unused variables
const unusedVars = fs.readFileSync('C:\\layera\\actually-unused-variables.txt', 'utf8')
  .split('\n')
  .map(v => v.trim())
  .filter(v => v.length > 0);

console.log(`📋 Συνολικά unused variables: ${unusedVars.length}`);

// Πάρε τις πρώτες 10 variables για διαγραφή
const varsToDelete = unusedVars.slice(0, 10);
console.log(`🎯 Θα διαγραφθούν τα επόμενα 10 variables:\n`);
varsToDelete.forEach((v, i) => console.log(`   ${i+1}. ${v}`));

// Βρες όλα τα JSON domain files
const domainsPath = 'C:\\layera\\packages\\tokens\\src\\domains';
const jsonFiles = fs.readdirSync(domainsPath)
  .filter(file => file.endsWith('.json'))
  .map(file => path.join(domainsPath, file));

console.log(`\n📂 Ελέγχω ${jsonFiles.length} JSON domain files...\n`);

let totalRemoved = 0;
let modifiedFiles = [];

// Επεξεργασία κάθε JSON file
jsonFiles.forEach(filePath => {
  const fileName = path.basename(filePath);

  try {
    const content = fs.readFileSync(filePath, 'utf8');
    let jsonData = JSON.parse(content);
    let fileModified = false;
    let removedFromFile = 0;

    // Αναδρομική αναζήτηση και διαγραφή ΜΟΝΟ των 10 variables
    function removeSpecificVars(obj, path = '') {
      if (typeof obj !== 'object' || obj === null) return;

      for (const key in obj) {
        const currentPath = path ? `${path}-${key}` : key;
        const layeraVarName = `--layera-${currentPath}`;

        if (varsToDelete.includes(layeraVarName)) {
          console.log(`   ❌ ${fileName}: Διαγραφή ${layeraVarName}`);
          delete obj[key];
          removedFromFile++;
          fileModified = true;
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
          removeSpecificVars(obj[key], currentPath);
        }
      }
    }

    removeSpecificVars(jsonData);

    if (fileModified) {
      fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));
      modifiedFiles.push({ file: fileName, removed: removedFromFile });
      totalRemoved += removedFromFile;
    }

  } catch (error) {
    console.log(`   ❌ Σφάλμα στο ${fileName}: ${error.message}`);
  }
});

// Ενημέρωση της λίστας unused variables (αφαίρεση των διαγραμμένων)
const remainingVars = unusedVars.slice(10); // Αφαιρώ τις πρώτες 10
fs.writeFileSync('C:\\layera\\actually-unused-variables.txt', remainingVars.join('\\n'));

console.log('\\n📊 ΑΠΟΤΕΛΕΣΜΑΤΑ:');
console.log(`   ✅ Διαγράφηκαν: ${totalRemoved} variables`);
console.log(`   📁 Τροποποιημένα files: ${modifiedFiles.length}`);
console.log(`   🔄 Απομένουν: ${remainingVars.length} unused variables`);

if (modifiedFiles.length > 0) {
  console.log('\\n📋 ΤΡΟΠΟΠΟΙΗΣΕΙΣ:');
  modifiedFiles.forEach(({ file, removed }) => {
    console.log(`   ${file}: -${removed} variables`);
  });
}

console.log('\\n✅ ΣΤΑΔΙΑΚΗ ΔΙΑΓΡΑΦΗ ΟΛΟΚΛΗΡΩΘΗΚΕ!');
console.log('⚡ Επόμενο βήμα: Rebuild tokens και testing...');
console.log(`📈 Πρόοδος: ${10 - remainingVars.length}/${unusedVars.length} variables καθαρίστηκαν`);