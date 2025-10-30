/**
 * 🔧 Expert Script: JS/TS Files → kebab-case Renamer
 *
 * Βάσει TERMINOLOGY_RULES.md ChatGPT Expert Guidance
 * Μετονομάζει JS/TS files (εκτός .tsx) σε kebab-case
 * Δημιουργεί mapping file για import updates
 *
 * Source: ChatGPT expert conversation στο TERMINOLOGY_RULES.md
 */

import fs from 'node:fs';
import path from 'node:path';

console.log('🔄 Expert JS/TS → kebab-case Renamer Starting...');
console.log('📋 Based on TERMINOLOGY_RULES.md ChatGPT expert guidance');

const roots = ['packages', 'apps', 'scripts'];
const exts = new Set(['.js', '.ts']); // όχι .tsx - αυτά θα γίνουν PascalCase
const map = []; // { from, to }

// Expert toKebab function από ChatGPT
const toKebab = (s) =>
  s
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[_\s]+/g, '-')
    .toLowerCase();

function walk(dir) {
  console.log(`🔍 Scanning: ${dir}`);

  try {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.name === 'node_modules' || entry.name.startsWith('.')) continue;

      const p = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        walk(p);
      } else {
        const ext = path.extname(entry.name);
        if (!exts.has(ext)) continue;

        const base = path.basename(entry.name, ext);

        // Skip index files (expert advice από TERMINOLOGY_RULES.md)
        if (base === 'index') continue;

        const kebab = toKebab(base);

        if (base !== kebab) {
          const to = path.join(dir, `${kebab}${ext}`);

          // Expert Windows/macOS safety: double-step rename
          // Από TERMINOLOGY_RULES.md expert guidance
          try {
            const temp = `${p}.tmp`;
            fs.renameSync(p, temp);
            fs.renameSync(temp, to);

            map.push({ from: p, to });
            console.log(`✅ Renamed: ${path.relative(process.cwd(), p)} → ${path.relative(process.cwd(), to)}`);
          } catch (error) {
            console.error(`❌ Failed to rename ${p}: ${error.message}`);
          }
        }
      }
    }
  } catch (error) {
    console.warn(`⚠️ Could not scan ${dir}: ${error.message}`);
  }
}

// Process all root directories
for (const r of roots) {
  if (fs.existsSync(r)) {
    console.log(`\n📁 Processing root: ${r}`);
    walk(r);
  } else {
    console.warn(`⚠️ Root directory not found: ${r}`);
  }
}

// Expert mapping file creation για import updates
const mappingFile = 'import-rename-map.json';
fs.writeFileSync(mappingFile, JSON.stringify(map, null, 2));

console.log(`\n📊 EXPERT RENAME SUMMARY:`);
console.log(`✅ Files renamed: ${map.length}`);
console.log(`📄 Mapping written: ${mappingFile}`);
console.log(`🎯 Based on: TERMINOLOGY_RULES.md expert guidance`);

if (map.length > 0) {
  console.log(`\n🔄 NEXT STEPS (expert workflow):`);
  console.log(`1. Review the changes with: git status`);
  console.log(`2. Commit the renames: git add -A && git commit -m "rename: js/ts to kebab-case"`);
  console.log(`3. Update imports: npx jscodeshift -t codemods/kebab-imports.js`);
  console.log(`4. Or use mapping: node scripts/refactor/update-imports-from-map.mjs`);
} else {
  console.log(`\n✨ No files needed renaming - already kebab-case compliant!`);
}

console.log(`\n🏆 Expert script completed successfully!`);