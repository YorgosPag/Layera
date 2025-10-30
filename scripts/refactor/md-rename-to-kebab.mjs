/**
 * 🔧 Expert Script: Documentation → kebab-case.md
 *
 * Βάσει TERMINOLOGY_RULES.md ChatGPT Expert Guidance
 * Μετονομάζει documentation files σε kebab-case εκτός από canonical GitHub files
 * Ενημερώνει markdown links και references
 *
 * Source: ChatGPT expert conversation στο TERMINOLOGY_RULES.md
 */

import fs from 'node:fs';
import path from 'node:path';

console.log('🔄 Expert Documentation → kebab-case Renamer Starting...');
console.log('📋 Based on TERMINOLOGY_RULES.md ChatGPT expert guidance');
console.log('📚 Canonical files excluded (README.md, CHANGELOG.md, etc.)');

// Expert canonical files από ChatGPT
const CANONICAL_FILES = new Set([
  'README.md',
  'CHANGELOG.md',
  'CONTRIBUTING.md',
  'CODE_OF_CONDUCT.md',
  'LICENSE.md',
  'SECURITY.md',
  'NOTICE.md',
  'AUTHORS.md',
  'CONTRIBUTORS.md'
]);

// Expert helper functions από ChatGPT
const toWords = (s) =>
  s.replace(/([a-z0-9])([A-Z])/g, '$1 $2').replace(/[^A-Za-z0-9]+/g, ' ').trim();
const toKebab = (s) =>
  toWords(s).split(/\s+/).filter(Boolean).map(w => w.toLowerCase()).join('-');
const isKebab = (s) => /^[a-z0-9]+(-[a-z0-9]+)*$/.test(s);

// Expert file scanner
function scanMarkdownFiles(dir, results = []) {
  try {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.name.startsWith('.') || entry.name === 'node_modules') continue;

      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        scanMarkdownFiles(fullPath, results);
      } else if (entry.name.endsWith('.md')) {
        results.push(fullPath);
      }
    }
  } catch (error) {
    console.warn(`⚠️ Could not scan ${dir}: ${error.message}`);
  }

  return results;
}

// Expert link updater από ChatGPT
function updateMarkdownLinks(filePath, renameMap) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    // Update markdown links [text](./file.md)
    content = content.replace(/\[([^\]]*)\]\(([^)]*\.md)\)/g, (match, text, link) => {
      const resolvedPath = path.resolve(path.dirname(filePath), link);
      const newPath = renameMap.get(resolvedPath);

      if (newPath) {
        const newRelativeLink = path.relative(path.dirname(filePath), newPath).replace(/\\/g, '/');
        changed = true;
        console.log(`    📝 Link update: ${link} → ${newRelativeLink}`);
        return `[${text}](${newRelativeLink})`;
      }
      return match;
    });

    // Update reference links [text]: ./file.md
    content = content.replace(/^\[([^\]]*)\]:\s*([^)]*\.md)/gm, (match, ref, link) => {
      const resolvedPath = path.resolve(path.dirname(filePath), link);
      const newPath = renameMap.get(resolvedPath);

      if (newPath) {
        const newRelativeLink = path.relative(path.dirname(filePath), newPath).replace(/\\/g, '/');
        changed = true;
        console.log(`    📝 Reference update: ${link} → ${newRelativeLink}`);
        return `[${ref}]: ${newRelativeLink}`;
      }
      return match;
    });

    if (changed) {
      fs.writeFileSync(filePath, content);
      console.log(`  ✅ Updated links in: ${path.relative(process.cwd(), filePath)}`);
    }

  } catch (error) {
    console.error(`  ❌ Failed to update links in ${filePath}: ${error.message}`);
  }
}

// Expert renaming logic από ChatGPT
const renameMap = new Map(); // old path → new path
let processedCount = 0;
let renamedCount = 0;
let skippedCount = 0;

console.log('\n🔍 Scanning for markdown files...');

const scanDirs = ['docs', 'docs-enterprise', 'packages'];
const allFiles = [];

for (const dir of scanDirs) {
  if (fs.existsSync(dir)) {
    console.log(`📁 Scanning: ${dir}`);
    scanMarkdownFiles(dir, allFiles);
  }
}

console.log(`\n📊 Found ${allFiles.length} markdown files`);

console.log('\n🔄 Processing files...');

for (const filePath of allFiles) {
  const fileName = path.basename(filePath);
  const baseWithoutExt = path.basename(filePath, '.md');

  console.log(`\n📄 Processing: ${path.relative(process.cwd(), filePath)}`);
  processedCount++;

  // Skip canonical GitHub files
  if (CANONICAL_FILES.has(fileName)) {
    console.log(`  ⏭️ Skipped (canonical GitHub file): ${fileName}`);
    skippedCount++;
    continue;
  }

  // Check if already kebab-case
  if (isKebab(baseWithoutExt)) {
    console.log(`  ✅ Already kebab-case: ${baseWithoutExt}`);
    skippedCount++;
    continue;
  }

  // Generate kebab-case name
  const kebabName = toKebab(baseWithoutExt);
  const newFileName = `${kebabName}.md`;
  const newFilePath = path.join(path.dirname(filePath), newFileName);

  console.log(`  🎯 Target: ${baseWithoutExt} → ${kebabName}`);

  // Check for conflicts
  if (fs.existsSync(newFilePath)) {
    console.log(`  ❌ Conflict: ${newFileName} already exists`);
    skippedCount++;
    continue;
  }

  try {
    // Expert Windows/macOS safe two-step rename
    const tmp = `${filePath}.__tmp__ren`;
    fs.renameSync(filePath, tmp);
    fs.renameSync(tmp, newFilePath);

    renameMap.set(path.resolve(filePath), path.resolve(newFilePath));
    renamedCount++;

    console.log(`  ✅ Renamed: ${fileName} → ${newFileName}`);
  } catch (error) {
    console.error(`  ❌ Failed to rename: ${error.message}`);
    skippedCount++;
  }
}

// Update markdown links if there were renames
if (renameMap.size > 0) {
  console.log('\n🔗 Updating markdown links...');

  for (const filePath of allFiles) {
    // Get current path (might have been renamed)
    let currentPath = filePath;
    const newPath = renameMap.get(path.resolve(filePath));
    if (newPath) {
      currentPath = newPath;
    }

    if (fs.existsSync(currentPath)) {
      console.log(`📝 Checking links in: ${path.relative(process.cwd(), currentPath)}`);
      updateMarkdownLinks(currentPath, renameMap);
    }
  }
}

// Write rename mapping if there were renames
if (renameMap.size > 0) {
  const mappingArray = Array.from(renameMap.entries()).map(([from, to]) => ({
    from: path.relative(process.cwd(), from),
    to: path.relative(process.cwd(), to)
  }));

  const mappingFile = 'md-rename-map.json';
  fs.writeFileSync(mappingFile, JSON.stringify(mappingArray, null, 2));
  console.log(`\n📄 Mapping written: ${mappingFile} (${mappingArray.length} entries)`);
}

console.log(`\n📊 EXPERT DOCUMENTATION RENAME SUMMARY:`);
console.log(`✅ Files processed: ${processedCount}`);
console.log(`✅ Files renamed: ${renamedCount}`);
console.log(`⏭️ Files skipped: ${skippedCount} (canonical or already kebab-case)`);
console.log(`🔗 Links updated: ${renameMap.size > 0 ? 'Yes' : 'No'}`);
console.log(`🎯 Based on: TERMINOLOGY_RULES.md expert guidance`);

if (renamedCount > 0) {
  console.log(`\n🔄 NEXT STEPS (expert workflow):`);
  console.log(`1. Review the changes with: git status`);
  console.log(`2. Test markdown rendering: npm run docs:build (if available)`);
  console.log(`3. Commit the changes: git add -A && git commit -m "refactor(docs): rename to kebab-case"`);
  console.log(`4. Verify all links work correctly`);
} else {
  console.log(`\n✨ All documentation files already follow kebab-case naming!`);
}

console.log(`\n🏆 Expert documentation rename script completed successfully!`);