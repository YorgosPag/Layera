#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const ROOT = process.argv[2] || process.cwd();         // π.χ. "." ή path
const ONLY_PREFIX = process.argv[3] || "";              // προαιρετικό: π.χ. "la-" ή "layera-"
const EXTS = new Set(['.css', '.scss', '.sass']);
const SKIP = new Set(['node_modules', '.git', 'dist', 'build', '.next', 'out', 'coverage']);

function walk(dir, out) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ent.isDirectory()) {
      if (SKIP.has(ent.name)) continue;
      walk(path.join(dir, ent.name), out);
    } else {
      const ext = path.extname(ent.name).toLowerCase();
      if (EXTS.has(ext)) out.push(path.join(dir, ent.name));
    }
  }
}

const files = [];
walk(ROOT, files);

const varLocs = new Map();
const defRe = /(--[A-Za-z0-9_-]+)\s*:/g;

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split(/\r?\n/);
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    let m;
    defRe.lastIndex = 0;
    while ((m = defRe.exec(line)) !== null) {
      const varName = m[1]; // π.χ. --la-color-text
      const before = line.slice(Math.max(0, m.index - 4), m.index);
      if (before === 'var(') continue;                 // αγνόησε χρήσεις var(--x), κράτα μόνο ορισμούς
      if (ONLY_PREFIX && !varName.startsWith(`--${ONLY_PREFIX}`)) continue;
      const arr = varLocs.get(varName) || [];
      arr.push({ file, line: i + 1 });
      varLocs.set(varName, arr);
    }
  }
}

const dups = [...varLocs.entries()]
  .filter(([, locs]) => locs.length > 1)
  .sort((a, b) => b[1].length - a[1].length);

if (dups.length === 0) {
  console.log('No duplicate CSS custom property definitions found.');
  process.exit(0);
}

for (const [name, locs] of dups) {
  console.log(`${name} -> ${locs.length} definitions`);
  for (const { file, line } of locs) {
    console.log(`  ${path.relative(ROOT, file)}:${line}`);
  }
}
console.log(`\nTotal duplicates: ${dups.length}`);
