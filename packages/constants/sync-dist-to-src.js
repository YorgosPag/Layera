#!/usr/bin/env node

/**
 * Sync script για development - αντιγράφει dist files στο src
 * Αυτό επιλύει το Vite module resolution issue σε dev mode
 */

const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'dist');
const srcDir = path.join(__dirname, 'src');

function syncFiles() {
  try {
    // Αντιγραφή index.js
    if (fs.existsSync(path.join(distDir, 'index.js'))) {
      fs.copyFileSync(
        path.join(distDir, 'index.js'),
        path.join(srcDir, 'index.js')
      );
      console.log('✅ Synced index.js');
    }

    // Αντιγραφή index.d.ts
    if (fs.existsSync(path.join(distDir, 'index.d.ts'))) {
      fs.copyFileSync(
        path.join(distDir, 'index.d.ts'),
        path.join(srcDir, 'index.d.ts')
      );
      console.log('✅ Synced index.d.ts');
    }

    console.log('🎯 Constants sync completed');
  } catch (error) {
    console.error('❌ Sync failed:', error.message);
  }
}

// Run sync
syncFiles();

// Watch για changes αν το script τρέχει σε watch mode
if (process.argv.includes('--watch')) {
  console.log('👀 Watching dist folder for changes...');
  fs.watch(distDir, { recursive: false }, (eventType, filename) => {
    if (filename === 'index.js' || filename === 'index.d.ts') {
      console.log(`🔄 ${filename} changed, syncing...`);
      setTimeout(syncFiles, 100); // Small delay to ensure file write is complete
    }
  });
}