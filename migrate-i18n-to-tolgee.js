#!/usr/bin/env node

/**
 * LAYERA ENTERPRISE MIGRATION SCRIPT
 *
 * Αντικαθιστά όλα τα @layera/i18n imports με @layera/tolgee
 * Single Source of Truth για translation system
 *
 * Γιώργος Παγώνης - Enterprise Architecture
 */

const fs = require('fs');
const path = require('path');

// Αρχεία που θα μετατραπούν
const FILES_TO_MIGRATE = [
  'apps/layera-id/src/components/Login.jsx',
  'packages/address-breakdown/src/components/AddressBreakdownCard.tsx',
  'apps/layera-id/src/components/Verify.jsx',
  'packages/forms/src/components/FormSection/FormSection.tsx',
  'apps/layera-id/src/pages/Data.jsx',
  'apps/layera-id/src/pages/Account.jsx',
  'apps/layera-id/src/components/Register.jsx',
  'apps/layera-id/src/components/Support.jsx',
  'apps/layera-id/src/components/Dashboard.jsx',
  'apps/layera-id/src/pages/AdminRoles.jsx',
  'apps/layera-id/src/pages/Settings.jsx',
  'apps/layera-id/src/components/MfaEnroll.jsx',
  'apps/layera-id/src/components/QuickActions.jsx'
];

console.log('🚀 LAYERA i18n → tolgee MIGRATION SCRIPT');
console.log('=======================================');

let totalFiles = 0;
let totalReplacements = 0;

FILES_TO_MIGRATE.forEach(relativePath => {
  const filePath = path.join(__dirname, relativePath);

  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  File not found: ${relativePath}`);
    return;
  }

  try {
    const content = fs.readFileSync(filePath, 'utf8');
    let newContent = content;
    let fileReplacements = 0;

    // Αντικατάσταση import statements
    const importPattern = /from ['"]@layera\/i18n['"]/g;
    newContent = newContent.replace(importPattern, "from '@layera/tolgee'");
    fileReplacements += (content.match(importPattern) || []).length;

    // Αντικατάσταση named imports αν χρειάζεται
    const namedImportPattern = /import\s*\{\s*([^}]+)\s*\}\s*from\s*['"]@layera\/i18n['"]/g;
    newContent = newContent.replace(namedImportPattern, "import { $1 } from '@layera/tolgee'");

    if (fileReplacements > 0) {
      fs.writeFileSync(filePath, newContent, 'utf8');
      console.log(`✅ ${relativePath}: ${fileReplacements} replacements`);
      totalFiles++;
      totalReplacements += fileReplacements;
    } else {
      console.log(`ℹ️  ${relativePath}: No changes needed`);
    }

  } catch (error) {
    console.error(`❌ Error processing ${relativePath}:`, error.message);
  }
});

console.log('\n📊 MIGRATION SUMMARY:');
console.log(`✅ Files processed: ${totalFiles}`);
console.log(`🔄 Total replacements: ${totalReplacements}`);
console.log('\n🎯 @layera/tolgee = SINGLE SOURCE OF TRUTH for translations');

if (totalReplacements > 0) {
  console.log('\n🚨 ΕΠΟΜΕΝΑ ΒΗΜΑΤΑ:');
  console.log('1. Ελέγξε ότι όλα τα imports είναι σωστά');
  console.log('2. Τρέξε npm run typecheck');
  console.log('3. Τέστ εφαρμογής στο localhost:3000 και localhost:3001');
  console.log('4. Commit αλλαγές στο repository');
  console.log('\n✨ ENTERPRISE SINGLE SOURCE OF TRUTH ACHIEVED!');
}