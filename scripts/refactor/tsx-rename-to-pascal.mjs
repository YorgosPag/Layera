/**
 * 🔧 Expert Script: React Components → PascalCase Renamer
 *
 * Βάσει TERMINOLOGY_RULES.md ChatGPT Expert Guidance
 * Μετονομάζει .tsx files σε PascalCase βάσει default export name
 * Χρησιμοποιεί ts-morph για sophisticated AST analysis
 *
 * Source: ChatGPT expert conversation στο TERMINOLOGY_RULES.md
 */

import { Project, SyntaxKind, Node } from 'ts-morph';
import fs from 'node:fs';
import path from 'node:path';

console.log('🔄 Expert React Components → PascalCase Renamer Starting...');
console.log('📋 Based on TERMINOLOGY_RULES.md ChatGPT expert guidance');
console.log('🛠️ Using ts-morph for AST analysis');

// Expert ts-morph project setup από ChatGPT
const ROOT_TSCONFIGS = [
  'tsconfig.json',
  'packages/tsconfig.json',
  'apps/tsconfig.json'
].filter(fs.existsSync);

const globs = ['apps/**/*.{ts,tsx}', 'packages/**/*.{ts,tsx}'];

const project = new Project({
  tsConfigFilePath: ROOT_TSCONFIGS[0] ?? undefined,
  skipAddingFilesFromTsConfig: !ROOT_TSCONFIGS[0]
});

console.log(`📁 Adding source files from globs: ${globs.join(', ')}`);
project.addSourceFilesAtPaths(globs);

// Expert helper functions από ChatGPT
const isPascal = (s) => /^[A-Z][A-Za-z0-9]*$/.test(s);
const toPascal = (s) =>
  s
    .replace(/[^A-Za-z0-9]+/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map(w => w[0].toUpperCase() + w.slice(1))
    .join('');

// Expert default export detection από ChatGPT
function getDefaultExportName(sf) {
  // 1) export default function/class Name
  const f = sf.getFunctions().find(fn => fn.isDefaultExport() && fn.getName());
  if (f) return f.getName();
  const c = sf.getClasses().find(cl => cl.isDefaultExport() && cl.getName());
  if (c) return c.getName();

  // 2) export default Identifier;
  const ea = sf.getFirstDescendantByKind(SyntaxKind.ExportAssignment);
  if (ea) {
    const expr = ea.getExpression();
    if (Node.isIdentifier(expr)) return expr.getText();
  }

  // 3) export { Name as default }
  const ens = sf.getExportSymbols();
  const def = ens.find(s => s.getName() === 'default');
  if (def) {
    const aliased = def.getAliasedSymbol();
    if (aliased?.getName() && aliased.getName() !== 'default') return aliased.getName();
  }

  return undefined;
}

const map = []; // { from, to }
const files = project.getSourceFiles('**/*.tsx');

console.log(`📊 Found ${files.length} .tsx files to analyze`);

for (const sf of files) {
  const filePath = sf.getFilePath();
  const base = path.basename(filePath, '.tsx');

  // Expert skip patterns από ChatGPT
  if (base === 'index' || base.endsWith('.stories') || base.endsWith('.test') || base.endsWith('.spec')) {
    console.log(`⏭️ Skipping: ${path.relative(process.cwd(), filePath)} (${base})`);
    continue;
  }

  const name = getDefaultExportName(sf);
  if (!name) {
    console.warn(`⚠️ Skip (no default export): ${path.relative(process.cwd(), filePath)}`);
    continue;
  }

  const pascal = isPascal(name) ? name : toPascal(name);
  if (pascal === base) {
    console.log(`✅ Already correct: ${path.relative(process.cwd(), filePath)} (${pascal})`);
    continue;
  }

  const dir = path.dirname(filePath);
  const target = path.join(dir, `${pascal}.tsx`);

  try {
    // Expert Windows/macOS case-insensitive safeguard από ChatGPT
    const tmp = path.join(dir, `${base}.tsx.__tmp__ren`);
    fs.renameSync(filePath, tmp);
    fs.renameSync(tmp, target);

    map.push({ from: filePath, to: target });
    console.log(`✅ Renamed: ${path.relative(process.cwd(), filePath)} → ${path.relative(process.cwd(), target)}`);
  } catch (error) {
    console.error(`❌ Failed to rename ${filePath}: ${error.message}`);
  }
}

// Expert mapping file creation
const mappingFile = 'tsx-rename-map.json';
fs.writeFileSync(mappingFile, JSON.stringify(map, null, 2));

console.log(`\n📊 EXPERT REACT RENAME SUMMARY:`);
console.log(`✅ Components renamed: ${map.length}`);
console.log(`📄 Mapping written: ${mappingFile}`);
console.log(`🎯 Based on: TERMINOLOGY_RULES.md expert guidance`);

if (map.length > 0) {
  console.log(`\n🔄 NEXT STEPS (expert workflow):`);
  console.log(`1. Review the changes with: git status`);
  console.log(`2. Commit the renames: git add -A && git commit -m "rename(tsx): PascalCase by default export"`);
  console.log(`3. Update imports: node scripts/refactor/update-imports-from-map-pascal.mjs`);
} else {
  console.log(`\n✨ No components needed renaming - already PascalCase compliant!`);
}

console.log(`\n🏆 Expert React script completed successfully!`);