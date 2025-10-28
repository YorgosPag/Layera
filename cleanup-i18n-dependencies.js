#!/usr/bin/env node

/**
 * LAYERA ENTERPRISE CLEANUP SCRIPT
 *
 * Αφαιρεί περιττές @layera/i18n dependencies από package.json files
 * Single Source of Truth maintenance
 *
 * Γιώργος Παγώνης - Enterprise Architecture
 */

const fs = require('fs');
const path = require('path');

// Packages που πρέπει να ελεγχθούν για περιττές @layera/i18n dependencies
const PACKAGE_JSON_FILES = [
  'packages/tables/package.json',
  'packages/snap-interactions/package.json',
  'packages/geo-drawing/package.json',
  'packages/file-upload/package.json',
  'packages/file-transformation/package.json',
  'packages/file-import/package.json',
  'packages/file-compression/package.json',
  'packages/map-labels/package.json',
  'packages/cad-processing/package.json'
];

console.log('🧹 LAYERA i18n DEPENDENCIES CLEANUP SCRIPT');
console.log('==========================================');

let totalFiles = 0;
let totalRemovals = 0;

PACKAGE_JSON_FILES.forEach(relativePath => {
  const filePath = path.join(__dirname, relativePath);

  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  File not found: ${relativePath}`);
    return;
  }

  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const packageJson = JSON.parse(content);

    let modified = false;

    // Έλεγχος και αφαίρεση από dependencies
    if (packageJson.dependencies && packageJson.dependencies['@layera/i18n']) {
      delete packageJson.dependencies['@layera/i18n'];
      modified = true;
      totalRemovals++;
      console.log(`✅ Removed @layera/i18n dependency from ${relativePath}`);
    }

    // Έλεγχος και αφαίρεση από devDependencies
    if (packageJson.devDependencies && packageJson.devDependencies['@layera/i18n']) {
      delete packageJson.devDependencies['@layera/i18n'];
      modified = true;
      totalRemovals++;
      console.log(`✅ Removed @layera/i18n devDependency from ${relativePath}`);
    }

    // Έλεγχος και αφαίρεση από peerDependencies
    if (packageJson.peerDependencies && packageJson.peerDependencies['@layera/i18n']) {
      delete packageJson.peerDependencies['@layera/i18n'];
      modified = true;
      totalRemovals++;
      console.log(`✅ Removed @layera/i18n peerDependency from ${relativePath}`);
    }

    if (modified) {
      fs.writeFileSync(filePath, JSON.stringify(packageJson, null, 2) + '\n', 'utf8');
      totalFiles++;
      console.log(`📝 Updated: ${relativePath}`);
    } else {
      console.log(`ℹ️  ${relativePath}: No @layera/i18n dependencies found`);
    }

  } catch (error) {
    console.error(`❌ Error processing ${relativePath}:`, error.message);
  }
});

console.log('\n📊 CLEANUP SUMMARY:');
console.log(`🗑️  Files modified: ${totalFiles}`);
console.log(`❌ Dependencies removed: ${totalRemovals}`);
console.log('\n🎯 @layera/tolgee = CLEAN SINGLE SOURCE OF TRUTH');

if (totalRemovals > 0) {
  console.log('\n🚨 ΕΠΟΜΕΝΑ ΒΗΜΑΤΑ:');
  console.log('1. Ελέγξε ότι όλα τα packages κάνουν build');
  console.log('2. Τρέξε npm run typecheck');
  console.log('3. Ελέγξε ότι δεν υπάρχουν broken imports');
  console.log('4. Commit τις αλλαγές');
  console.log('\n✨ ENTERPRISE DEPENDENCY CLEANUP COMPLETE!');
} else {
  console.log('\n✅ NO CLEANUP NEEDED - All packages are already clean!');
}