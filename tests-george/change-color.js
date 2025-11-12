#!/usr/bin/env node

/**
 * 🧪 George's Automatic Color Changer
 *
 * Αλλάζει αυτόματα τα χρώματα και κάνει rebuild
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Πάρε το χρώμα από command line argument
const newColor = process.argv[2];

if (!newColor) {
  console.log('❌ Παρακαλώ δώστε χρώμα! Παράδειγμα: node change-color.js #3b82f6');
  process.exit(1);
}

// Validate hex color format
if (!/^#[0-9A-F]{6}$/i.test(newColor)) {
  console.log('❌ Λάθος format χρώματος! Χρησιμοποιήστε #RRGGBB format (π.χ. #3b82f6)');
  process.exit(1);
}

try {
  console.log(`🧪 George's Color Changer Started!`);
  console.log(`🎨 Changing to color: ${newColor}`);

  // Βήμα 1: Διάβασε το current test config
  const testFilePath = path.join(__dirname, 'theme-test-george.json');
  console.log(`📂 Reading: ${testFilePath}`);

  const testConfig = JSON.parse(fs.readFileSync(testFilePath, 'utf8'));

  // Βήμα 2: Άλλαξε τα χρώματα
  testConfig.colors.cards.value = newColor;
  testConfig.colors.modal.value = newColor;
  testConfig.colors.header.value = newColor;

  // Βήμα 3: Γράψε το αρχείο πίσω
  console.log(`💾 Writing updated config...`);
  fs.writeFileSync(testFilePath, JSON.stringify(testConfig, null, 2), 'utf8');

  // Βήμα 4: Rebuild τα CSS
  console.log(`🔨 Rebuilding CSS tokens...`);
  const tokensPath = path.join(__dirname, '../packages/tokens');

  process.chdir(tokensPath);
  execSync('pnpm build', { stdio: 'inherit' });

  // Βήμα 5: Τέλος!
  console.log(`✅ SUCCESS! Color changed to ${newColor}`);
  console.log(`🔄 Please refresh your browser to see the changes!`);

} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}