#!/usr/bin/env node

/**
 * 🧹 PRODUCTION CONSOLE.LOG CLEANUP
 * Αφαιρεί console.log statements από production code (όχι από docs)
 *
 * 🎯 ΣΤΟΧΟΣ: Enterprise-grade production χωρίς debug logging
 * ⚡ SPEED: Smart filtering - αφαίρεση μόνο από .tsx/.ts/.js files
 */

const fs = require('fs');
const path = require('path');

console.log('🧹 PRODUCTION CONSOLE.LOG CLEANUP');
console.log('=====================================');
console.log('⚡ Αφαιρώ console.log από production code...');
console.log('');

let totalFixed = 0;
const fixedFiles = [];

/**
 * Process file for console.log removal
 */
function processFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;

    // Patterns για console.log removal
    const patterns = [
      // Standard console.log με περιεχόμενο
      /^\s*console\.log\(.*?\);\s*$/gm,
      // Console.log χωρίς semicolon
      /^\s*console\.log\(.*?\)\s*$/gm,
      // Inline console.log μέσα σε code
      /\s*console\.log\([^)]*\);\s*/g
    ];

    let newContent = content;
    let fileChanged = false;
    let removedCount = 0;

    patterns.forEach(pattern => {
      const matches = newContent.match(pattern);
      if (matches) {
        removedCount += matches.length;
        newContent = newContent.replace(pattern, '');
        fileChanged = true;
      }
    });

    // Καθάρισε extra empty lines που μένουν
    newContent = newContent.replace(/\n\s*\n\s*\n/g, '\n\n');

    if (fileChanged) {
      fs.writeFileSync(filePath, newContent);
      fixedFiles.push({
        file: path.relative(process.cwd(), filePath),
        removedCount
      });
      totalFixed += removedCount;
      console.log(`✅ ${path.relative(process.cwd(), filePath)} - Αφαίρεσα ${removedCount} console.log`);
    }

  } catch (error) {
    console.warn(`⚠️  Could not process ${filePath}: ${error.message}`);
  }
}

/**
 * Scan directory for production files
 */
function scanDirectory(dir, depth = 0) {
  if (!fs.existsSync(dir) || depth > 8) return;

  const items = fs.readdirSync(dir);

  items.forEach(item => {
    // Skip directories that shouldn't be processed
    if (item === 'node_modules' || item === '.git' || item === 'dist' || item === 'build' || item === 'docs') return;

    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      scanDirectory(fullPath, depth + 1);
    } else if (item.endsWith('.ts') || item.endsWith('.tsx') || item.endsWith('.js') || item.endsWith('.jsx')) {
      // Process μόνο production code files
      processFile(fullPath);
    }
  });
}

/**
 * Main execution
 */
console.log('🔍 Σαρώνω για console.log statements...');
console.log('');

// Scan apps και packages directories
if (fs.existsSync('apps')) {
  console.log('📁 Καθαρίζω apps/...');
  scanDirectory('apps');
}

if (fs.existsSync('packages')) {
  console.log('📁 Καθαρίζω packages/...');
  scanDirectory('packages');
}

console.log('');
console.log('📊 PRODUCTION CLEANUP RESULTS');
console.log('=============================');

if (totalFixed === 0) {
  console.log('✅ Δεν βρέθηκαν console.log statements!');
  console.log('🚀 Production code είναι καθαρός');
} else {
  console.log(`✅ Αφαίρεσα ${totalFixed} console.log statements από ${fixedFiles.length} files:`);
  console.log('');

  fixedFiles.slice(0, 10).forEach(({ file, removedCount }) => {
    console.log(`   📄 ${file} (${removedCount} αφαιρέσεις)`);
  });

  if (fixedFiles.length > 10) {
    console.log(`   ... και ${fixedFiles.length - 10} ακόμη files`);
  }
}

console.log('');
console.log('🎯 Production code είναι τώρα καθαρός από console.log statements!');

process.exit(0);