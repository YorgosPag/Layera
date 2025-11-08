// Codemod: Remove explicit `: void` return type from JSX/useMemo functions
const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Simple regex-based approach to avoid ts-morph dependency issues
function fixVoidReturns(content) {
  // Match functions with : void return type that contain JSX or useMemo
  // Pattern 1: Arrow functions with explicit void that return JSX
  content = content.replace(
    /(\w+\s*=\s*\([^)]*\)\s*:\s*void\s*=>\s*{[^}]*return\s*<)/g,
    (match, prefix) => {
      return prefix.replace('): void =>', ') =>');
    }
  );

  // Pattern 2: Regular functions with void that return JSX
  content = content.replace(
    /(function\s+\w+\s*\([^)]*\)\s*:\s*void\s*{[^}]*return\s*<)/g,
    (match, prefix) => {
      return prefix.replace('): void {', ') {');
    }
  );

  // Pattern 3: Component functions with void return type
  content = content.replace(
    /(\w+\s*:\s*\([^)]*\)\s*=>\s*void\s*=\s*\([^)]*\)\s*=>\s*{[^}]*return\s*<)/g,
    (match, prefix) => {
      return prefix.replace(') => void =', ') =>');
    }
  );

  return content;
}

// Find all TypeScript/TSX files - excluding node_modules, dist, build
const files = [
  ...glob.sync('packages/**/src/**/*.{ts,tsx}', {
    ignore: ['**/node_modules/**','**/dist/**','**/build/**']
  }),
  ...glob.sync('apps/**/src/**/*.{ts,tsx}', {
    ignore: ['**/node_modules/**','**/dist/**','**/build/**']
  })
];

console.log(`Processing ${files.length} files for void returns cleanup...`);

let changedFiles = 0;
files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const newContent = fixVoidReturns(content);

  if (content !== newContent) {
    fs.writeFileSync(file, newContent);
    changedFiles++;
    console.log(`Fixed: ${file}`);
  }
});

console.log(`Done! Modified ${changedFiles} files.`);