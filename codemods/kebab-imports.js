/**
 * 🔧 Expert Codemod: Relative Imports → kebab-case
 *
 * Βάσει TERMINOLOGY_RULES.md ChatGPT Expert Guidance
 * jscodeshift codemod που μετατρέπει './fooBar' → './foo-bar' για relative imports
 * Τρέχει μετά τα renames αρχείων
 *
 * Source: ChatGPT expert conversation στο TERMINOLOGY_RULES.md
 *
 * Usage:
 * npx jscodeshift -t codemods/kebab-imports.js "packages/**/src/**/*.{ts,tsx,js,jsx}" "apps/**/src/**/*.{ts,tsx,js,jsx}"
 */

const path = require('path');

// Expert toKebab function από ChatGPT
const toKebab = (s) =>
  s.replace(/([a-z0-9])([A-Z])/g, '$1-$2').replace(/[_\s]+/g, '-').toLowerCase();

module.exports = function transformer(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);

  console.log(`🔄 Processing: ${file.path}`);

  // Expert import path fixer function από TERMINOLOGY_RULES.md
  const fix = (v) => {
    if (!v || typeof v.value !== 'string') return;
    const s = v.value;

    // Only process relative imports (expert guidance)
    if (!s.startsWith('.')) return;

    const dir = path.posix.dirname(s);
    const base = path.posix.basename(s);

    // Skip empty, current dir, parent dir (expert safety)
    if (base === '' || base === '.' || base === '..') return;

    // Skip index imports (expert advice)
    if (base === 'index') return;

    const ext = path.posix.extname(base);
    const name = ext ? base.slice(0, -ext.length) : base;
    const kebab = toKebab(name);

    if (kebab !== name) {
      const nextBase = ext ? `${kebab}${ext}` : kebab;
      const newPath = dir === '.' ? `./${nextBase}` : `${dir}/${nextBase}`;

      console.log(`  ✅ ${s} → ${newPath}`);
      v.value = newPath;
    }
  };

  // Expert AST processing από ChatGPT guidance
  let hasChanges = false;

  // Process import declarations
  root.find(j.ImportDeclaration).forEach(p => {
    const oldValue = p.value.source.value;
    fix(p.value.source);
    if (p.value.source.value !== oldValue) hasChanges = true;
  });

  // Process export all declarations
  root.find(j.ExportAllDeclaration).forEach(p => {
    const oldValue = p.value.source.value;
    fix(p.value.source);
    if (p.value.source.value !== oldValue) hasChanges = true;
  });

  // Process export named declarations with source
  root.find(j.ExportNamedDeclaration, n => !!n.source).forEach(p => {
    const oldValue = p.value.source.value;
    fix(p.value.source);
    if (p.value.source.value !== oldValue) hasChanges = true;
  });

  if (hasChanges) {
    console.log(`  📝 Updated imports in: ${file.path}`);
  }

  return root.toSource();
};