#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

console.log('🔍 SAFE NAMING TEST - ROUND 2');
console.log('📋 Testing safer utility file');

// Test με ασφαλέστερο αρχείο
const testFile = 'packages/address-breakdown/src/utils/addressParser.ts';

if (fs.existsSync(testFile)) {
  const fileName = path.basename(testFile);
  const ext = path.extname(fileName);

  console.log(`\n📁 Testing file: ${testFile}`);
  console.log(`📄 File name: ${fileName}`);
  console.log(`🔧 Extension: ${ext}`);

  // Έλεγχος naming pattern
  if (ext === '.ts' && !fileName.includes('.test')) {
    const kebabPattern = /^[a-z0-9]+(-[a-z0-9]+)*\.ts$/;
    const isCompliant = kebabPattern.test(fileName);

    console.log(`\n🎯 Expected pattern: kebab-case.ts`);
    console.log(`✅ Is compliant: ${isCompliant ? 'YES' : 'NO'}`);

    if (!isCompliant) {
      console.log(`❌ Current: ${fileName}`);
      console.log(`✅ Should be: address-parser.ts`);
      console.log(`🛡️ Risk level: LOW (utility file)`);
    }
  }

  console.log(`\n✅ Test completed successfully!`);
} else {
  console.log(`❌ Test file not found: ${testFile}`);
}