/**
 * 🔧 Expert Script: Anonymous Default Exports → Named Components
 *
 * Βάσει TERMINOLOGY_RULES.md ChatGPT Expert Guidance
 * Ονομάζει ανώνυμα default exports με PascalCase βάσει φακέλου/αρχείου
 * Προαιρετικά μετονομάζει το αρχείο αν δεν είναι index
 *
 * Source: ChatGPT expert conversation στο TERMINOLOGY_RULES.md
 */

import { Project, SyntaxKind, Node } from 'ts-morph';
import fs from 'node:fs';
import path from 'node:path';

console.log('🔄 Expert Anonymous Default Exports → Named Components Starting...');
console.log('📋 Based on TERMINOLOGY_RULES.md ChatGPT expert guidance');
console.log('🛠️ Using ts-morph for AST processing');

// Expert ts-morph setup από ChatGPT
const ROOT_TSCONFIGS = [
  'tsconfig.json',
  'packages/tsconfig.json',
  'apps/tsconfig.json'
].filter(fs.existsSync);

const project = new Project({
  tsConfigFilePath: ROOT_TSCONFIGS[0] ?? undefined,
  skipAddingFilesFromTsConfig: !ROOT_TSCONFIGS[0]
});

project.addSourceFilesAtPaths(['apps/**/*.{ts,tsx}', 'packages/**/*.{ts,tsx}']);

// Expert helper functions από ChatGPT
const isPascal = (s) => /^[A-Z][A-Za-z0-9]*$/.test(s);
const toWords = (s) =>
  s.replace(/([a-z0-9])([A-Z])/g, '$1 $2').replace(/[^A-Za-z0-9]+/g, ' ').trim();
const toPascal = (s) =>
  toWords(s).split(/\s+/).filter(Boolean).map(w => w[0].toUpperCase() + w.slice(1)).join('');
const toValidIdent = (s) => {
  let x = s.replace(/[^A-Za-z0-9]/g, '');
  if (!/^[A-Za-z_]/.test(x)) x = 'X' + x;
  return x || 'Component';
};

// Expert naming logic από ChatGPT
function desiredNameFor(sf) {
  const filepath = sf.getFilePath();
  const base = path.basename(filepath, '.tsx');
  if (base === 'index') {
    // For index.tsx, use folder name
    const folder = path.basename(path.dirname(filepath));
    return toValidIdent(toPascal(folder));
  }
  // For other files, use filename
  return toValidIdent(toPascal(base));
}

// Expert default export detection από ChatGPT
function hasNamedDefault(sf) {
  const fd = sf.getFunctions().find(fn => fn.isDefaultExport() && !!fn.getName());
  if (fd) return true;
  const cd = sf.getClasses().find(cl => cl.isDefaultExport() && !!cl.getName());
  if (cd) return true;

  // export { Name as default }
  const def = sf.getExportSymbols().find(s => s.getName() === 'default');
  if (def) {
    const aliased = def.getAliasedSymbol();
    if (aliased?.getName() && aliased.getName() !== 'default') return true;
  }
  return false;
}

// Expert AST manipulation από ChatGPT
function ensureNamedDefault(sf, targetName) {
  let changed = false;

  // Case 1: default function/class declaration without name
  for (const fn of sf.getFunctions()) {
    if (fn.isDefaultExport() && !fn.getName()) {
      fn.setName(targetName);
      changed = true;
      console.log(`  ✅ Named default function: ${targetName}`);
    }
  }
  for (const cl of sf.getClasses()) {
    if (cl.isDefaultExport() && !cl.getName()) {
      cl.setName(targetName);
      changed = true;
      console.log(`  ✅ Named default class: ${targetName}`);
    }
  }

  // Case 2: export default <expr> (arrow func, class expr, identifier, JSX, etc.)
  const ea = sf.getFirstDescendantByKind(SyntaxKind.ExportAssignment);
  if (ea) {
    const expr = ea.getExpression();

    // If it's already an identifier, keep as-is
    if (Node.isIdentifier(expr)) {
      console.log(`  ℹ️ Already named identifier: ${expr.getText()}`);
    } else if (Node.isArrowFunction(expr) || Node.isFunctionExpression(expr)) {
      // const Name = <expr>; export default Name;
      const body = expr.getText();
      sf.insertStatements(0, `const ${targetName} = ${body};`);
      ea.replaceWithText(`export default ${targetName};`);
      changed = true;
      console.log(`  ✅ Named arrow/function expression: ${targetName}`);
    } else if (Node.isClassExpression(expr)) {
      // export default class Name extends ... {}
      const text = expr.getText();
      sf.insertStatements(0, `${text.replace(/^class\b/, `class ${targetName}`)};`);
      ea.replaceWithText(`export default ${targetName};`);
      changed = true;
      console.log(`  ✅ Named class expression: ${targetName}`);
    } else {
      // wrap generic expression
      sf.insertStatements(0, `const ${targetName} = ${expr.getText()};`);
      ea.replaceWithText(`export default ${targetName};`);
      changed = true;
      console.log(`  ✅ Named generic expression: ${targetName}`);
    }
  }

  return changed;
}

const renameMap = []; // { from, to }
let processedCount = 0;
let namedCount = 0;

for (const sf of project.getSourceFiles('**/*.tsx')) {
  const filePath = sf.getFilePath();
  const base = path.basename(filePath, '.tsx');

  // Skip tests/stories
  if (base.endsWith('.test') || base.endsWith('.spec') || base.endsWith('.stories')) {
    continue;
  }

  console.log(`\n🔍 Processing: ${path.relative(process.cwd(), filePath)}`);
  processedCount++;

  const targetName = desiredNameFor(sf);
  console.log(`  🎯 Target name: ${targetName}`);

  const alreadyNamed = hasNamedDefault(sf);
  if (alreadyNamed) {
    console.log(`  ✅ Already has named default export`);
  } else {
    const did = ensureNamedDefault(sf, targetName);
    if (did) {
      namedCount++;
      console.log(`  ✅ Named default export in: ${path.relative(process.cwd(), filePath)}`);
    }
  }

  // Optional rename: only if not index (expert advice)
  if (base !== 'index') {
    const desiredFile = path.join(path.dirname(filePath), `${targetName}.tsx`);
    if (path.resolve(desiredFile) !== path.resolve(filePath)) {
      try {
        // Expert Windows/macOS safe two-step rename
        const tmp = `${filePath}.__tmp__ren`;
        fs.renameSync(filePath, tmp);
        fs.renameSync(tmp, desiredFile);
        renameMap.push({ from: filePath, to: desiredFile });
        console.log(`  📁 Renamed file: ${path.relative(process.cwd(), filePath)} → ${path.relative(process.cwd(), desiredFile)}`);

        // Update project source file path
        sf.move(desiredFile);
      } catch (error) {
        console.error(`  ❌ Failed to rename file: ${error.message}`);
      }
    }
  } else {
    console.log(`  ℹ️ Keeping index.tsx as-is (expert advice)`);
  }
}

// Save all changes
await project.save();

// Write rename map if there were file renames
if (renameMap.length) {
  const mappingFile = 'tsx-rename-map.json';
  fs.writeFileSync(mappingFile, JSON.stringify(renameMap, null, 2));
  console.log(`\n📄 Mapping written: ${mappingFile} (${renameMap.length} entries)`);
} else {
  console.log(`\n📄 No file renames needed (index files kept as-is)`);
}

console.log(`\n📊 EXPERT ANONYMOUS DEFAULTS SUMMARY:`);
console.log(`✅ Files processed: ${processedCount}`);
console.log(`✅ Anonymous exports named: ${namedCount}`);
console.log(`✅ Files renamed: ${renameMap.length}`);
console.log(`🎯 Based on: TERMINOLOGY_RULES.md expert guidance`);

if (namedCount > 0 || renameMap.length > 0) {
  console.log(`\n🔄 NEXT STEPS (expert workflow):`);
  console.log(`1. Review the changes with: git status`);
  console.log(`2. Commit the changes: git add -A && git commit -m "refactor(tsx): named defaults + PascalCase"`);
  if (renameMap.length > 0) {
    console.log(`3. Update imports: node scripts/refactor/update-imports-from-map-pascal.mjs`);
  }
} else {
  console.log(`\n✨ All components already have named exports and correct names!`);
}

console.log(`\n🏆 Expert anonymous defaults script completed successfully!`);