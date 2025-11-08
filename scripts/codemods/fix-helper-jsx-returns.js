// Codemod: Fix helper functions that return JSX but have : void type signature
const fs = require('fs');
const path = require('path');
const glob = require('glob');

function fixHelperJsxReturns(content) {
  // Pattern: functions with `: void` that return JSX elements
  // Also ensure React is imported if needed

  // Fix function declarations
  content = content.replace(
    /(\bfunction\s+\w+\s*\([^)]*\)\s*:\s*void\s*{[\s\S]*?return\s*<[\s\S]*?})/g,
    (match, fnContent) => {
      return fnContent.replace('): void {', '): React.ReactNode {');
    }
  );

  // Fix arrow function variable declarations
  content = content.replace(
    /(\bconst\s+\w+\s*=\s*\([^)]*\)\s*:\s*void\s*=>\s*{[\s\S]*?return\s*<[\s\S]*?})/g,
    (match, fnContent) => {
      return fnContent.replace('): void =>', '): React.ReactNode =>');
    }
  );

  // Fix method definitions in interfaces/types
  content = content.replace(
    /(\w+\s*:\s*\([^)]*\)\s*=>\s*void)/g,
    (match, methodSignature) => {
      // Only replace if the context suggests this returns JSX
      return methodSignature.replace(') => void', ') => React.ReactNode');
    }
  );

  // Add React import if ReactNode is used but React isn't imported
  if (content.includes('React.ReactNode') && !content.includes('import React') && !content.includes('from "react"')) {
    // Add React import at the top
    const lines = content.split('\n');
    const firstImportIndex = lines.findIndex(line => line.trim().startsWith('import'));
    if (firstImportIndex >= 0) {
      lines.splice(firstImportIndex, 0, 'import React from "react";');
    } else {
      lines.unshift('import React from "react";');
    }
    content = lines.join('\n');
  }

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

console.log(`Processing ${files.length} files for JSX helper returns...`);

let changedFiles = 0;
files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const newContent = fixHelperJsxReturns(content);

  if (content !== newContent) {
    fs.writeFileSync(file, newContent);
    changedFiles++;
    console.log(`Fixed: ${file}`);
  }
});

console.log(`Done! Modified ${changedFiles} files.`);