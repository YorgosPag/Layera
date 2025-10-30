/**
 * 🔧 Expert Script: Import Updates μετά PascalCase Rename
 *
 * Βάσει TERMINOLOGY_RULES.md ChatGPT Expert Guidance
 * Ενημερώνει imports μετά από React component renames
 * Χρησιμοποιεί ts-morph για exact resolution με TypeScript compiler API
 *
 * Source: ChatGPT expert conversation στο TERMINOLOGY_RULES.md
 */

import { Project } from 'ts-morph';
import fs from 'node:fs';
import path from 'node:path';

console.log('🔄 Expert Import Updates → PascalCase Mappings Starting...');
console.log('📋 Based on TERMINOLOGY_RULES.md ChatGPT expert guidance');
console.log('🛠️ Using ts-morph for exact resolution');

// Check for mapping file
const mappingFile = 'tsx-rename-map.json';
if (!fs.existsSync(mappingFile)) {
  console.error(`❌ Mapping file not found: ${mappingFile}`);
  console.log(`ℹ️ Run tsx-rename-to-pascal.mjs or tsx-name-anonymous-defaults.mjs first.`);
  process.exit(1);
}

const mapping = JSON.parse(fs.readFileSync(mappingFile, 'utf8'));
const renamedSet = new Set(mapping.map(m => path.resolve(m.from)));

console.log(`📄 Loaded mapping: ${mapping.length} renamed files`);

// Expert ts-morph project setup από ChatGPT
const ROOT_TSCONFIGS = [
  'tsconfig.json',
  'packages/tsconfig.json',
  'apps/tsconfig.json'
].filter(fs.existsSync);

const project = new Project({
  tsConfigFilePath: ROOT_TSCONFIGS[0] ?? undefined,
  skipAddingFilesFromTsConfig: !ROOT_TSCONFIGS[0]
});

project.addSourceFilesAtPaths(['apps/**/*.{ts,tsx,js,jsx}', 'packages/**/*.{ts,tsx,js,jsx}']);

const mapByOldAbs = new Map(mapping.map(m => [path.resolve(m.from), path.resolve(m.to)]));

// Expert relative path helper από ChatGPT
function toPosixRelative(fromFile, toFileNoExt) {
  const fromDir = path.dirname(fromFile);
  const rel = path.relative(fromDir, toFileNoExt);
  let spec = rel.split(path.sep).join('/');
  if (!spec.startsWith('.')) spec = './' + spec;
  return spec;
}

let updated = 0;
let totalImports = 0;

console.log(`\n🔍 Processing source files...`);

for (const sf of project.getSourceFiles()) {
  const filePath = sf.getFilePath();
  let dirty = false;

  console.log(`📄 Checking: ${path.relative(process.cwd(), filePath)}`);

  // Expert import/export processor από ChatGPT
  const editSpec = (decl) => {
    const mod = decl.getModuleSpecifierValue?.();
    if (!mod || !mod.startsWith('.')) return;

    totalImports++;

    // Expert ts-morph resolution από ChatGPT
    const resolved = decl.getModuleSpecifierSourceFile?.();
    if (!resolved) {
      console.log(`    ⚠️ Unresolved import: ${mod}`);
      return;
    }

    const resolvedPath = resolved.getFilePath();
    if (!renamedSet.has(resolvedPath)) return;

    const newAbs = mapByOldAbs.get(resolvedPath);
    if (!newAbs) {
      console.log(`    ⚠️ No mapping found for: ${resolvedPath}`);
      return;
    }

    const noExt = newAbs.replace(/\.(ts|tsx|js|jsx)$/, '');
    const next = toPosixRelative(sf.getFilePath(), noExt);

    // Expert extension preservation από ChatGPT
    const hadExt = /\.\w+$/.test(mod);
    const finalSpec = hadExt ? next + path.extname(newAbs) : next;

    if (mod !== finalSpec) {
      console.log(`    ✅ Update: ${mod} → ${finalSpec}`);
      decl.setModuleSpecifier(finalSpec);
      dirty = true;
    }
  };

  // Process imports
  sf.getImportDeclarations().forEach(editSpec);

  // Process re-exports
  sf.getExportDeclarations().forEach(d => {
    if (d.getModuleSpecifierValue()) editSpec(d);
  });

  if (dirty) {
    updated++;
    console.log(`  📝 Updated imports in: ${path.relative(process.cwd(), filePath)}`);
  }
}

console.log(`\n💾 Saving changes...`);
await project.save();

console.log(`\n📊 EXPERT IMPORT UPDATE SUMMARY:`);
console.log(`✅ Total imports checked: ${totalImports}`);
console.log(`✅ Files with updates: ${updated}`);
console.log(`✅ Mapping entries processed: ${mapping.length}`);
console.log(`🎯 Based on: TERMINOLOGY_RULES.md expert guidance`);

if (updated > 0) {
  console.log(`\n🔄 NEXT STEPS (expert workflow):`);
  console.log(`1. Review the changes with: git status`);
  console.log(`2. Test the build: npm run typecheck && npm run build`);
  console.log(`3. Run tests: npm run test`);
  console.log(`4. Commit the import updates: git add -A && git commit -m "codemod: fix imports after PascalCase rename"`);
} else {
  console.log(`\n✨ No import updates needed - all imports already correct!`);
}

console.log(`\n🏆 Expert import update script completed successfully!`);