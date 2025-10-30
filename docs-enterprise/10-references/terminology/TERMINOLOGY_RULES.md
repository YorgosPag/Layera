Μετάβαση στο περιεχόμενο
Ιστορικό συνομιλιών

Είπες:
● 🎯 ΕΡΩΤΗΣΗ ΓΙΑ SENIOR DEVELOPERS - NAMING CONVENTIONS STANDARDS

  📋 ΠΕΡΙΓΡΑΦΗ ΠΡΟΒΛΗΜΑΤΟΣ

  Έχω ένα enterprise monorepo (Node.js/TypeScript/React) και υπάρχει σύγκρουση στα naming conventions
  μεταξύ της εσωτερικής τεκμηρίωσης και των διεθνών standards. Χρειάζομαι την εμπειρία σας για να    
  καθορίσω το σωστό approach.

  🤔 Η ΣΥΓΚΕΚΡΙΜΕΝΗ ΕΡΩΤΗΣΗ

  1. UTILITY/SCRIPT FILES NAMING:

  Σενάριο: Έχω scripts στον φάκελο scripts/domains/ που εκτελούνται από npm commands.

  Διλλημα:
  # Option A: camelCase (εσωτερική τεκμηρίωση)
  scripts/domains/design/fixHardcodedColors.js
  package.json: "fix:colors": "node scripts/domains/design/fixHardcodedColors.js"

  # Option B: kebab-case (Unix/npm tradition)  
  scripts/domains/design/fix-hardcoded-colors.js
  package.json: "fix:colors": "node scripts/domains/design/fix-hardcoded-colors.js"

  Ερώτηση: Ποιο είναι το industry standard για script files που καλούνται από npm? camelCase ή
  kebab-case;

  ---
  2. DOCUMENTATION FILES NAMING:

  Σενάριο: Enterprise documentation files.

  Διλλημα:
  # Option A: CAPS_WITH_UNDERSCORES (εσωτερική τεκμηρίωση)
  TERMINOLOGY_CONVENTIONS.md
  LEGO_SYSTEMS_REGISTRY.md
  ENTERPRISE_STANDARDS.md

  # Option B: Mixed case (GitHub standard)
  README.md
  CHANGELOG.md
  CODE_OF_CONDUCT.md

  Ερώτηση: Ποιο είναι το industry standard για enterprise documentation? Υπάρχει συγκεκριμένο
  convention;

  ---
  3. CONSISTENCY vs STANDARDS:

  Κεντρική ερώτηση:

  Σε ένα enterprise project, τι είναι πιο σημαντικό:

  A) Να ακολουθούμε αυστηρά τα διεθνή standards (Unix conventions, npm patterns) ακόμα και αν σημαίνει      
  αλλαγή υπάρχουσας τεκμηρίωσης;

  B) Να διατηρούμε εσωτερική συνέπεια στο project, ακόμα και αν παραβιάζει κάποια διεθνή conventions;       

  C) Υβριδική προσέγγιση: Διαφορετικά conventions για διαφορετικά types αρχείων (π.χ. kebab για scripts,    
   camelCase για utilities);

  ---
  4. ENTERPRISE CONTEXT:

  Επιπλέον πληροφορίες:
  - Μέγεθος: 54 packages, 2 apps, πολλαπλοί developers
  - Stack: TypeScript/React/Node.js monorepo
  - Audience: Enterprise χρήση, όχι public library
  - CI/CD: Automated validation με scripts
  - Team: Mixed seniority levels

  Ερώτηση: Στο enterprise context, ποια approaches έχετε δει να δουλεύουν καλύτερα στην πράξη;

  ---
  🎯 ΤΙ ΘΕΛΩ ΝΑ ΜΑΘΩ

  1. Συγκεκριμένα standards για κάθε type αρχείου
  2. Best practices από μεγάλα projects που έχετε δουλέψει
  3. Tradeoffs μεταξύ consistency vs standards compliance
  4. Practical advice για migration (αν χρειάζεται)
  5. Tools/linters που enforce τα σωστά conventions

  💬 ΕΡΩΤΗΣΗ BONUS

  Έχετε δει enterprise projects που άλλαξαν naming conventions στο μέσον του development; Πόσο
  disruptive ήταν και άξιζε τον κόπο;

  ---
  Ευχαριστώ για τον χρόνο σας! Κάθε εμπειρία και perspective είναι πολύτιμη για αυτή την απόφαση.
Το ChatGPT είπε:

Σκέφτηκε για 47s
Σύντομη απάντηση:

Scripts που καλούνται από npm → kebab-case.

Docs → τα “γνωστά” αρχεία σε κεφαλαία fixed ονόματα (README.md κ.λπ.), όλα τα υπόλοιπα lower-kebab-case.

Προσέγγιση → Υβριδική (C) με ρητό RFC· προτεραιότητα στα καθιερωμένα conventions του οικοσυστήματος.

1) Scripts που τρέχουν από npm
Standard: kebab-case. Παίζει καλύτερα στην CLI, ταιριάζει με Unix/npm κουλτούρα, ευανάγνωστο σε package.json.

Παράδειγμα:

scripts/domains/design/fix-hardcoded-colors.js

package.json: "fix:colors": "node scripts/domains/design/fix-hardcoded-colors.js"

Απόφυγε camelCase για εκτελέσιμα scripts. Κράτησέ το μόνο για JS/TS identifiers, όχι filenames CLI.

2) Documentation files
Canonical αρχεία που αναγνωρίζει το GitHub: πάντα έτσι και μόνο έτσι:

README.md, LICENSE, CONTRIBUTING.md, CODE_OF_CONDUCT.md, SECURITY.md, CHANGELOG.md

Όλα τα υπόλοιπα docs: lower-kebab-case.md μέσα σε docs/ ή αντίστοιχο φάκελο.

Παράδειγμα: docs/terminology-conventions.md, docs/lego-systems-registry.md

Απόφυγε CAPS_WITH_UNDERSCORES.md για μη-canonical αρχεία. Δεν είναι συνηθισμένο, δυσκολεύει τα URLs.

3) Consistency vs standards
Κανόνας προτεραιότητας:

Οικοσύστημα/βιομηχανικά conventions (npm/Unix, GitHub canonical names).

Τοπικό RFC του repo.

Τεκμηριωμένες εξαιρέσεις ανά φάκελο.

Επιλογή: Υβριδικό. Scripts/CLI → kebab. React Components → PascalCase. Βοηθητικά modules → kebab. Docs → κανόνας παραπάνω.

4) Enterprise context που “δουλεύει”
Ελάχιστος, ξεκάθαρος χάρτης ονοματοδοσίας:

Φάκελοι: kebab-case

TS/JS modules (μη React): kebab-case.ts

React components: PascalCase.tsx (ένα component ανά αρχείο)

Tests: something.test.ts ή something.spec.ts δίπλα στο αρχείο

Barrels: index.ts μόνο όταν υπάρχει ξεκάθαρο public surface

Assets: kebab-case.ext

CLI/bin: ονόματα με παύλες, π.χ. geo-alert-sync

npm scripts keys: ομαδοποίηση με : π.χ. fix:colors, build:packages

5) Trade-offs
Υπέρ standards: μικρό cognitive load για νέους devs, λιγότερα λάθη στα scripts/paths, συμβατότητα εργαλείων.

Υπέρ απόλυτης εσωτερικής συνέπειας: λιγότερα rewrites, αλλά αποκλίνεις από το αναμενόμενο.

Ρεαλιστικό: ακολούθα τα standards όπου είναι ορατά/εκτελούμενα (CLI, canonical docs). Στα εσωτερικά modules κράτα ενιαίο κανόνα που ταιριάζει στο tooling σου.

6) Migration πρακτικά
Φτιάξε μικρό RFC “Naming” και κλείδωσέ το στην κορυφή του repo.

Κάνε batch renames με git mv για να κρατήσεις ιστορικό. Σε case-only αλλαγές σε Windows/macOS, κάνε διπλό βήμα:

git mv file.ts file.tmp && git mv file.tmp new-name.ts

Τρέξε codemod για imports (π.χ. με ts-morph ή jscodeshift) ώστε να ενημερωθούν όλα τα relative paths.

Σπάσε τη μετανάστευση σε πακέτο-πακέτο. Πρώτα τα scripts και τα canonical docs, μετά τα modules.

Κλείδωσε με CI ώστε νέα PRs να περνούν μόνο αν συμμορφώνονται.

7) Εργαλεία enforcement
ESLint:

eslint-plugin-unicorn → unicorn/filename-case: ["error", { "case": "kebabCase", "ignore": ["^README\\.md$", "^LICENSE$", "^CHANGELOG\\.md$", "^CONTRIBUTING\\.md$", "^CODE_OF_CONDUCT\\.md$", "^SECURITY\\.md$"] }]

import/no-unresolved με resolver node ή typescript και caseSensitive: true για να πιάνει case-mismatch.

markdownlint ή remark-lint για κανόνες σε .md.

Husky + lint-staged ή lefthook για pre-commit checks.

EditorConfig για βασική συνέπεια, αν δεν το έχεις.

CI: τρέξε ESLint + markdownlint σε όλα τα πακέτα. Προαιρετικά, έλεγχος με Linux runner για case-sensitivity.

8) Απαντήσεις στα “ΤΙ ΘΕΛΩ ΝΑ ΜΑΘΩ”
Standards ανά type: όπως οι ενότητες 1, 2 και 4.

Best practices: υβριδικό μοντέλο, RFC στο root, tooling enforcement, μικρά batch migrations.

Tradeoffs: περιγράφονται στην ενότητα 5.

Migration: βήματα στην ενότητα 6.

Tools/linters: ενότητα 7.

9) Bonus
Ναι, έχει συμβεί σε πολλά enterprise/OSS projects. Είναι disruptive αν αφεθεί αδόμητα. Με αυτοματισμούς, μικρά batches, και CI gates, η επίπτωση μένει χαμηλή. Όσο νωρίτερα γίνει, τόσο καλύτερα.

Προτειγμένο mini-RFC (copy/paste)
# Naming RFC

Folders: kebab-case
General TS/JS files: kebab-case.ts
React components: PascalCase.tsx
Tests: *.test.ts[x] (δίπλα στο αρχείο)
Barrels: index.ts μόνο για δημόσια surface
CLI/scripts: kebab-case filenames, npm scripts με groups (build:*, test:*)
Docs (canonical): README.md, LICENSE, CONTRIBUTING.md, CODE_OF_CONDUCT.md, SECURITY.md, CHANGELOG.md
Docs (λοιπά): docs/lower-kebab-case.md

Rationale: συμμόρφωση με npm/Unix & GitHub conventions, ελαχιστοποίηση cognitive load, εύκολη κλιμάκωση σε monorepo.
Αν θέλεις, δίνω έτοιμο .eslintrc απόσπασμα και sample codemod για rename/import updates.

Είπες:
ΝΑΙ ΘΑ ΗΘΕΛΑ
Το ChatGPT είπε:

Σκέφτηκε για 1m 1s
Έτοιμα αποσπάσματα και codemods. Copy/paste.

1) .eslintrc.cjs
/** Root ESLint snippet: filenames + imports */
module.exports = {
  plugins: ['unicorn', 'import'],
  settings: {
    'import/resolver': {
      typescript: { project: ['./tsconfig.json', './packages/*/tsconfig.json', './apps/*/tsconfig.json'] },
      node: { extensions: ['.js', '.jsx', '.ts', '.tsx'] }
    }
  },
  overrides: [
    // JS/TS αρχεία: kebab-case (εξαιρεί index)
    {
      files: ['**/*.{js,ts}'],
      rules: {
        'unicorn/filename-case': ['error', { case: 'kebabCase', ignore: ['^index\\.[jt]s$'] }],
        'import/no-unresolved': ['error', { caseSensitive: true }]
      }
    },
    // React components: PascalCase.tsx
    {
      files: ['**/*.tsx'],
      rules: {
        'unicorn/filename-case': ['error', { case: 'pascalCase' }],
        'import/no-unresolved': ['error', { caseSensitive: true }]
      }
    }
  ]
};
2) .markdownlint.json
{
  "default": true,
  "MD013": false,
  "MD041": false
}
Canonical αρχεία μένουν: README.md, LICENSE, CONTRIBUTING.md, CODE_OF_CONDUCT.md, SECURITY.md, CHANGELOG.md.

3) Husky pre-commit
# package.json (scripts)
{
  "scripts": {
    "prepare": "husky",
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx",
    "lint:md": "markdownlint '**/*.md' -i node_modules -i coverage -i dist",
    "precommit": "pnpm lint && pnpm lint:md"
  }
}
# .husky/pre-commit
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"
pnpm precommit
4) Μαζικό rename σε kebab-case (JS/TS μόνο)
Αφήνει τα .tsx για τα components. Γράφει mapping για imports.

scripts/refactor/rename-js-ts-to-kebab.mjs

import fs from 'node:fs';
import path from 'node:path';

const roots = ['packages', 'apps', 'scripts'];
const exts = new Set(['.js', '.ts']); // όχι .tsx
const map = []; // { from, to }

const toKebab = (s) =>
  s
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[_\s]+/g, '-')
    .toLowerCase();

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === 'node_modules' || entry.name.startsWith('.')) continue;
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p);
    else {
      const ext = path.extname(entry.name);
      if (!exts.has(ext)) continue;
      const base = path.basename(entry.name, ext);
      const kebab = toKebab(base);
      if (base !== kebab) {
        const to = path.join(dir, `${kebab}${ext}`);
        fs.renameSync(p, to);
        map.push({ from: p, to });
        console.log(`renamed: ${p} -> ${to}`);
      }
    }
  }
}

for (const r of roots) if (fs.existsSync(r)) walk(r);

fs.writeFileSync('import-rename-map.json', JSON.stringify(map, null, 2));
console.log(`map written: import-rename-map.json (${map.length} entries)`);
Χρήση:

# 1) Καθάρισμα
git add -A && git commit -m "pre-rename checkpoint"
# 2) Τρέξε το rename
node scripts/refactor/rename-js-ts-to-kebab.mjs
git add -A && git commit -m "rename: js/ts to kebab-case"
Σημείωση Windows/macOS για case-only αλλαγές: κάνε διπλό βήμα git mv file tmp && git mv tmp File αν χρειαστεί.

5) Codemod για imports μετά το rename
Απλό codemod με jscodeshift. Κεμπαροποιεί το τελευταίο segment των σχετικών imports.

codemods/kebab-imports.js

/**
 * jscodeshift - μετατρέπει './fooBar' -> './foo-bar' για relative imports.
 * Τρέξε μετά τα renames αρχείων.
 */
const path = require('path');

const toKebab = (s) =>
  s.replace(/([a-z0-9])([A-Z])/g, '$1-$2').replace(/[_\s]+/g, '-').toLowerCase();

module.exports = function transformer(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);

  const fix = (v) => {
    if (!v || typeof v.value !== 'string') return;
    const s = v.value;
    if (!s.startsWith('.')) return;
    const dir = path.posix.dirname(s);
    const base = path.posix.basename(s);
    if (base === '' || base === '.' || base === '..') return;
    if (base === 'index') return;
    const ext = path.posix.extname(base);
    const name = ext ? base.slice(0, -ext.length) : base;
    const kebab = toKebab(name);
    if (kebab !== name) {
      const nextBase = ext ? `${kebab}${ext}` : kebab;
      v.value = dir === '.' ? `./${nextBase}` : `${dir}/${nextBase}`;
    }
  };

  root.find(j.ImportDeclaration).forEach(p => fix(p.value.source));
  root.find(j.ExportAllDeclaration).forEach(p => fix(p.value.source));
  root.find(j.ExportNamedDeclaration, n => !!n.source).forEach(p => fix(p.value.source));

  return root.toSource();
};
Χρήση:

# εγκατάσταση
pnpm add -D jscodeshift
# τρέξιμο σε monorepo
npx jscodeshift -t codemods/kebab-imports.js "packages/**/src/**/*.{ts,tsx,js,jsx}" "apps/**/src/**/*.{ts,tsx,js,jsx}"
git add -A && git commit -m "codemod: update relative imports to kebab-case"
Προαιρετικά: αν θέλεις αυστηρή ενημέρωση βάσει mapping, χρησιμοποίησε το JSON από το rename script.

scripts/refactor/update-imports-from-map.mjs

import fs from 'node:fs';
import path from 'node:path';

const map = JSON.parse(fs.readFileSync('import-rename-map.json','utf8')); // [{from,to}]
const byDir = new Map(); // key: dir, val: [{oldBase,newBase,oldExt,newExt}]
for (const {from,to} of map) {
  const d = path.dirname(from);
  const arr = byDir.get(d) ?? [];
  arr.push({
    oldBase: path.basename(from, path.extname(from)),
    newBase: path.basename(to, path.extname(to)),
    oldExt: path.extname(from),
    newExt: path.extname(to)
  });
  byDir.set(d, arr);
}

const roots = ['packages','apps'];
function walk(dir) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ent.name === 'node_modules' || ent.name.startsWith('.')) continue;
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p);
    else if (/\.(ts|tsx|js|jsx)$/.test(ent.name)) {
      let src = fs.readFileSync(p,'utf8');
      const here = path.dirname(p);
      const replacements = [
        ... (byDir.get(here) ?? [])
      ];
      // επίσης δες γείτονες 1-2 επίπεδα πάνω
      const parent = path.dirname(here);
      if (byDir.get(parent)) replacements.push(...byDir.get(parent));

      src = src.replace(/(from|export\s+\*?\s+from)\s+['"](.+?)['"]/g, (m, kw, spec) => {
        if (!spec.startsWith('.')) return m;
        const dirPart = path.dirname(spec);
        const basePart = path.basename(spec);
        const noExt = basePart.replace(/\.(ts|tsx|js|jsx)$/,'');
        const hit = replacements.find(r => r.oldBase === noExt);
        if (!hit) return m;
        const nextBase = hit.newBase + (/\.(ts|tsx|js|jsx)$/.test(basePart) ? hit.newExt : '');
        const next = (dirPart === '.' ? `./${nextBase}` : `${dirPart}/${nextBase}`);
        return `${kw} '${next}'`;
      });

      fs.writeFileSync(p, src);
    }
  }
}
for (const r of roots) if (fs.existsSync(r)) walk(r);
console.log('imports updated using mapping');
6) Προτεινόμενα dev-deps
pnpm add -D eslint eslint-plugin-unicorn eslint-plugin-import @types/node typescript \
markdownlint jscodeshift husky
7) CI check (Linux runner)
# .github/workflows/lint.yml
name: lint
on: [push, pull_request]
jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint
      - run: pnpm lint:md
Αν θες και script για μετονομασία .tsx σε PascalCase βάσει default export, πες το και θα δώσω AST-based λύση.

Είπες:
ΝΑΙ ΘΑ ΗΘΕΛΑ ΕΥΧΑΡΙΣΤΩ
Το ChatGPT είπε:

Σκέφτηκε για 44s
Παρέχω renamer για .tsx → PascalCase βάσει default export και ασφαλές update imports με ts-morph.

1) Εγκατάσταση
pnpm add -D ts-morph
2) Rename .tsx σε PascalCase βάσει default export
scripts/refactor/tsx-rename-to-pascal.mjs

import { Project, SyntaxKind, Node } from 'ts-morph';
import fs from 'node:fs';
import path from 'node:path';

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
project.addSourceFilesAtPaths(globs);

const isPascal = (s) => /^[A-Z][A-Za-z0-9]*$/.test(s);
const toPascal = (s) =>
  s
    .replace(/[^A-Za-z0-9]+/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map(w => w[0].toUpperCase() + w.slice(1))
    .join('');

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

for (const sf of files) {
  const filePath = sf.getFilePath();
  const base = path.basename(filePath, '.tsx');
  if (base === 'index' || base.endsWith('.stories') || base.endsWith('.test') || base.endsWith('.spec')) continue;

  const name = getDefaultExportName(sf);
  if (!name) { console.warn(`skip(no default export): ${filePath}`); continue; }

  const pascal = isPascal(name) ? name : toPascal(name);
  if (pascal === base) continue;

  const dir = path.dirname(filePath);
  const target = path.join(dir, `${pascal}.tsx`);

  // Windows/macOS case-insensitive safeguard
  const tmp = path.join(dir, `${base}.tsx.__tmp__ren`);
  fs.renameSync(filePath, tmp);
  fs.renameSync(tmp, target);

  map.push({ from: filePath, to: target });
  console.log(`renamed: ${filePath} -> ${target}`);
}

fs.writeFileSync('tsx-rename-map.json', JSON.stringify(map, null, 2));
console.log(`map written: tsx-rename-map.json (${map.length} entries)`);
Χρήση:

git add -A && git commit -m "checkpoint before tsx rename"
node scripts/refactor/tsx-rename-to-pascal.mjs
git add -A && git commit -m "rename(tsx): PascalCase by default export"
3) Update relative imports βάσει mapping (ακριβές resolution)
scripts/refactor/update-imports-from-map-pascal.mjs

import { Project } from 'ts-morph';
import fs from 'node:fs';
import path from 'node:path';

if (!fs.existsSync('tsx-rename-map.json')) {
  console.error('tsx-rename-map.json not found. Run tsx-rename-to-pascal first.');
  process.exit(1);
}
const mapping = JSON.parse(fs.readFileSync('tsx-rename-map.json', 'utf8'));
const renamedSet = new Set(mapping.map(m => path.resolve(m.from)));

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

function toPosixRelative(fromFile, toFileNoExt) {
  const fromDir = path.dirname(fromFile);
  const rel = path.relative(fromDir, toFileNoExt);
  let spec = rel.split(path.sep).join('/');
  if (!spec.startsWith('.')) spec = './' + spec;
  return spec;
}

let updated = 0;

for (const sf of project.getSourceFiles()) {
  let dirty = false;

  const editSpec = (decl) => {
    const mod = decl.getModuleSpecifierValue?.();
    if (!mod || !mod.startsWith('.')) return;

    const resolved = decl.getModuleSpecifierSourceFile?.();
    if (!resolved) return; // non-local or unresolved
    const resolvedPath = resolved.getFilePath();
    if (!renamedSet.has(resolvedPath)) return;

    const newAbs = mapByOldAbs.get(resolvedPath);
    const noExt = newAbs.replace(/\.(ts|tsx|js|jsx)$/, '');
    const next = toPosixRelative(sf.getFilePath(), noExt);

    // preserve extension presence
    const hadExt = /\.\w+$/.test(mod);
    const finalSpec = hadExt ? next + path.extname(newAbs) : next;

    if (mod !== finalSpec) {
      decl.setModuleSpecifier(finalSpec);
      dirty = true;
    }
  };

  sf.getImportDeclarations().forEach(editSpec);
  sf.getExportDeclarations().forEach(d => { if (d.getModuleSpecifierValue()) editSpec(d); });

  if (dirty) { updated++; }
}

await project.save();
console.log(`imports updated in ${updated} files`);
Χρήση:

node scripts/refactor/update-imports-from-map-pascal.mjs
git add -A && git commit -m "codemod: fix imports after PascalCase rename"
4) ESLint κανόνας για .tsx
Σε root .eslintrc πρόσθεσε override:

{
  files: ['**/*.tsx'],
  rules: {
    'unicorn/filename-case': ['error', { case: 'pascalCase' }]
  }
}
5) Ροή με ασφάλεια
Checkpoint commit.

Τρέξε renamer.

Τρέξε codemod imports.

pnpm lint && pnpm build.

Μικρά PRs ανά πακέτο αν προτιμάς.

Θες και script που παράγει PascalCase από τον φάκελο όταν το default export είναι ανώνυμο; Θα δώσω heuristics βάσει FolderName + Component.

Είπες:
ΝΑΙ ΕΥΧΑΡΙΣΤΩ
Το ChatGPT είπε:

Σκέφτηκε για 48s
Παρακάτω script για ανώνυμο default export σε .tsx: ονομάζει το export με PascalCase βάσει φακέλου όταν το αρχείο είναι index.tsx, ή βάσει ονόματος αρχείου όταν δεν είναι index. Προαιρετικά μετονομάζει το αρχείο αν δεν είναι index. Ενημερώνει mapping για επόμενο codemod imports.

1) Εγκατάσταση
pnpm add -D ts-morph
2) Script: ονοματοδοσία ανώνυμων default exports και προαιρετικό rename
scripts/refactor/tsx-name-anonymous-defaults.mjs

import { Project, SyntaxKind, Node } from 'ts-morph';
import fs from 'node:fs';
import path from 'node:path';

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

function desiredNameFor(sf) {
  const filepath = sf.getFilePath();
  const base = path.basename(filepath, '.tsx');
  if (base === 'index') {
    const folder = path.basename(path.dirname(filepath));
    return toValidIdent(toPascal(folder));
  }
  return toValidIdent(toPascal(base));
}

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

function ensureNamedDefault(sf, targetName) {
  let changed = false;

  // Case 1: default function/class declaration without name
  for (const fn of sf.getFunctions()) {
    if (fn.isDefaultExport() && !fn.getName()) {
      fn.setName(targetName);
      changed = true;
    }
  }
  for (const cl of sf.getClasses()) {
    if (cl.isDefaultExport() && !cl.getName()) {
      cl.setName(targetName);
      changed = true;
    }
  }

  // Case 2: export default <expr>  (arrow func, class expr, identifier, JSX, etc.)
  const ea = sf.getFirstDescendantByKind(SyntaxKind.ExportAssignment);
  if (ea) {
    const expr = ea.getExpression();

    // If it's already an identifier, keep as-is but we still may rename file later
    if (Node.isIdentifier(expr)) {
      // nothing to do here
    } else if (Node.isArrowFunction(expr) || Node.isFunctionExpression(expr)) {
      // const Name = <expr>; export default Name;
      const body = expr.getText();
      sf.insertStatements(0, `const ${targetName} = ${body};`);
      ea.replaceWithText(`export default ${targetName};`);
      changed = true;
    } else if (Node.isClassExpression(expr)) {
      // export default class Name extends ... {}
      const text = expr.getText();
      // safer: replace with named class decl then default export
      sf.insertStatements(0, `${text.replace(/^class\b/, `class ${targetName}`)};`);
      ea.replaceWithText(`export default ${targetName};`);
      changed = true;
    } else {
      // wrap generic expression
      sf.insertStatements(0, `const ${targetName} = ${expr.getText()};`);
      ea.replaceWithText(`export default ${targetName};`);
      changed = true;
    }
  }

  return changed;
}

const renameMap = []; // { from, to }

for (const sf of project.getSourceFiles('**/*.tsx')) {
  const filePath = sf.getFilePath();
  const base = path.basename(filePath, '.tsx');

  // Skip tests/stories
  if (base.endsWith('.test') || base.endsWith('.spec') || base.endsWith('.stories')) continue;

  const targetName = desiredNameFor(sf);

  const alreadyNamed = hasNamedDefault(sf);
  const did = ensureNamedDefault(sf, targetName);
  if (did) console.log(`named default export in: ${filePath}`);

  // Optional rename: only if not index
  if (base !== 'index') {
    const desiredFile = path.join(path.dirname(filePath), `${targetName}.tsx`);
    if (path.resolve(desiredFile) !== path.resolve(filePath)) {
      // Windows/macOS safe two-step
      const tmp = `${filePath}.__tmp__ren`;
      fs.renameSync(filePath, tmp);
      fs.renameSync(tmp, desiredFile);
      renameMap.push({ from: filePath, to: desiredFile });
      console.log(`renamed file: ${filePath} -> ${desiredFile}`);
      // Update project to point to new path
      sf.replaceWithText(fs.readFileSync(desiredFile, 'utf8'));
      sf.saveSync();
    }
  }
}

await project.save();
if (renameMap.length) {
  fs.writeFileSync('tsx-rename-map.json', JSON.stringify(renameMap, null, 2));
  console.log(`map written: tsx-rename-map.json (${renameMap.length} entries)`);
} else {
  console.log('no file renames needed (index files kept as-is)');
}
3) Χρήση
git add -A && git commit -m "checkpoint before anonymous default normalization"
node scripts/refactor/tsx-name-anonymous-defaults.mjs
# Αν δημιουργήθηκε tsx-rename-map.json:
node scripts/refactor/update-imports-from-map-pascal.mjs
pnpm lint && pnpm build && pnpm test
git add -A && git commit -m "refactor(tsx): named defaults + PascalCase"
Σημειώσεις:

Τα index.tsx δεν μετονομάζονται. Μόνο ονομάζεται το default export βάσει φακέλου για να μην σπάσουν imports τύπου ./Button.

Μη‐index .tsx μπορούν να μετονομαστούν σε PascalCase.tsx. Το mapping καλύπτεται από το script imports που έδωσα πριν.




Δεν επιλέχθηκε κανένα αρχείο.Δεν επιλέχθηκε κανένα αρχείο.
Το ChatGPT μπορεί να κάνει λάθη. Να ελέγχεις τις σημαντικές πληροφορίες. Βλέπε Προτιμήσεις cookie.
