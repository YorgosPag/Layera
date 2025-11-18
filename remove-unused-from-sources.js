#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 ΔΙΑΓΡΑΦΗ UNUSED VARIABLES ΑΠΟ SOURCE JSON FILES...\n');

// Διάβασε τη λίστα των unused variables
const unusedVars = fs.readFileSync('C:\\layera\\actually-unused-variables.txt', 'utf8')
  .split('\n')
  .map(v => v.trim())
  .filter(v => v.length > 0);

console.log(`📋 Θα διαγραφθούν ${unusedVars.length} unused variables από τα source JSON\n`);

// Βρες όλα τα JSON domain files
const domainsPath = 'C:\\layera\\packages\\tokens\\src\\domains';
const jsonFiles = fs.readdirSync(domainsPath)
  .filter(file => file.endsWith('.json'))
  .map(file => path.join(domainsPath, file));

console.log(`📂 Βρέθηκαν ${jsonFiles.length} JSON domain files:\n`);

let totalRemoved = 0;
let modifiedFiles = [];

// Επεξεργασία κάθε JSON file
jsonFiles.forEach(filePath => {
  const fileName = path.basename(filePath);
  console.log(`🔍 Επεξεργασία: ${fileName}...`);

  try {
    const content = fs.readFileSync(filePath, 'utf8');
    let jsonData = JSON.parse(content);
    let fileModified = false;
    let removedFromFile = 0;

    // Αναδρομική αναζήτηση και διαγραφή unused variables
    function removeUnusedFromObject(obj, path = '') {
      if (typeof obj !== 'object' || obj === null) return;

      for (const key in obj) {
        const currentPath = path ? `${path}-${key}` : key;
        const layeraVarName = `--layera-${currentPath}`;

        if (unusedVars.includes(layeraVarName)) {
          console.log(`   ❌ Διαγραφή: ${layeraVarName}`);
          delete obj[key];
          removedFromFile++;
          fileModified = true;
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
          removeUnusedFromObject(obj[key], currentPath);
        }
      }
    }

    removeUnusedFromObject(jsonData);

    if (fileModified) {
      // Αποθήκευση του τροποποιημένου JSON
      fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2));
      modifiedFiles.push({ file: fileName, removed: removedFromFile });
      totalRemoved += removedFromFile;
      console.log(`   ✅ ${fileName}: Διαγράφηκαν ${removedFromFile} variables`);
    } else {
      console.log(`   ⚪ ${fileName}: Δεν βρέθηκαν unused variables`);
    }

  } catch (error) {
    console.log(`   ❌ Σφάλμα στο ${fileName}: ${error.message}`);
  }

  console.log('');
});

// Αποτελέσματα
console.log('📊 ΑΠΟΤΕΛΕΣΜΑΤΑ:');
console.log(`   ✅ Συνολικά διαγράφηκαν: ${totalRemoved} variables`);
console.log(`   📁 Τροποποιημένα files: ${modifiedFiles.length}`);

if (modifiedFiles.length > 0) {
  console.log('\n📋 ΛΕΠΤΟΜΕΡΙΕΣ ΤΡΟΠΟΠΟΙΗΣΕΩΝ:');
  modifiedFiles.forEach(({ file, removed }) => {
    console.log(`   ${file}: -${removed} variables`);
  });
}

// Δημιουργία αναφοράς
const report = `# ΑΝΑΦΟΡΑ ΔΙΑΓΡΑΦΗΣ ΑΠΟ SOURCE JSON FILES

## Στατιστικά
- Συνολικές unused variables: ${unusedVars.length}
- Διαγράφηκαν από JSON sources: ${totalRemoved}
- Τροποποιημένα αρχεία: ${modifiedFiles.length}

## Τροποποιημένα Αρχεία
${modifiedFiles.map(({ file, removed }) => `- ${file}: -${removed} variables`).join('\n')}

## Ημερομηνία
${new Date().toLocaleString('el-GR')}
`;

fs.writeFileSync('C:\\layera\\source-cleanup-report.md', report);

if (totalRemoved > 0) {
  console.log('\n✅ ΔΙΑΓΡΑΦΗ ΑΠΟ SOURCES ΟΛΟΚΛΗΡΩΘΗΚΕ!');
  console.log('📋 Αναφορά: source-cleanup-report.md');
  console.log('⚡ Επόμενο: Rebuild tokens για τελικό έλεγχο...');
} else {
  console.log('\n⚠️ Δεν βρέθηκαν variables για διαγραφή στα JSON sources');
  console.log('💭 Οι variables ίσως έχουν διαφορετική δομή ή ονομασία');
}