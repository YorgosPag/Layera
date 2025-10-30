# 🔧 ENTERPRISE NAMING IMPLEMENTATION GUIDE

**📅 Έκδοση**: 1.0.0
**👨‍💻 Επιβλέπων Αρχιτέκτονας**: Γιώργος Παγώνης
**🎯 Σκοπός**: Βήμα-προς-βήμα υλοποίηση Enterprise Naming System
**⚠️ Προαπαιτούμενο**: Διάβασε πρώτα το `ENTERPRISE_NAMING_SYSTEM_OVERVIEW.md`

---

## 📑 ΠΙΝΑΚΑΣ ΠΕΡΙΕΧΟΜΕΝΩΝ

1. [🎯 Pre-Implementation Checklist](#pre-implementation-checklist)
2. [🛠️ Phase 1: Εργαλεία & Automation Setup](#phase-1-εργαλεία--automation-setup)
3. [📋 Phase 2: Scripts & CLI Tools](#phase-2-scripts--cli-tools)
4. [📚 Phase 3: Documentation Structure](#phase-3-documentation-structure)
5. [💻 Phase 4: TypeScript/JavaScript Files](#phase-4-typescriptjavascript-files)
6. [⚛️ Phase 5: React Components](#phase-5-react-components)
7. [🎨 Phase 6: Assets & Resources](#phase-6-assets--resources)
8. [✅ Phase 7: Validation & Compliance](#phase-7-validation--compliance)
9. [🚨 Troubleshooting Guide](#troubleshooting-guide)

---

## 🎯 PRE-IMPLEMENTATION CHECKLIST

### **📋 Απαραίτητες Προετοιμασίες**

```bash
# 1. ΥΠΟΧΡΕΩΤΙΚΟ: Δημιουργία Safety Backup
git add -A
git commit -m "🛡️ SAFETY CHECKPOINT: Pre-naming-migration backup"
git tag "safety-pre-naming-migration-$(date +%Y%m%d-%H%M%S)"

# 2. Clean Working Directory
git status  # Πρέπει να είναι clean

# 3. Verify Repository Health
npm run typecheck  # Πρέπει να περνάει
npm run lint       # Πρέπει να περνάει
npm run build      # Πρέπει να περνάει
```

### **🔧 Required Dependencies**
```bash
# Install development dependencies για automation
pnpm add -D eslint eslint-plugin-unicorn eslint-plugin-import \
            ts-morph jscodeshift markdownlint husky \
            @types/node typescript
```

### **⚠️ Critical Pre-Checks**
- [ ] **Backup Created**: Git tag για rollback
- [ ] **Clean State**: Καμία uncommitted αλλαγή
- [ ] **Team Notification**: Όλοι οι developers ενημερωμένοι
- [ ] **Dependencies Updated**: Όλα τα tools εγκατεστημένα
- [ ] **Time Allocation**: 2-3 εβδομάδες για full implementation

---

## 🛠️ PHASE 1: ΕΡΓΑΛΕΙΑ & AUTOMATION SETUP

### **📝 Step 1.1: ESLint Configuration Update**

Δημιούργησε ή ενημέρωσε το `.eslintrc.cjs`:

```javascript
// .eslintrc.cjs - Enterprise Naming Enforcement
module.exports = {
  plugins: ['unicorn', 'import'],
  settings: {
    'import/resolver': {
      typescript: {
        project: ['./tsconfig.json', './packages/*/tsconfig.json', './apps/*/tsconfig.json']
      },
      node: { extensions: ['.js', '.jsx', '.ts', '.tsx'] }
    }
  },
  overrides: [
    // JS/TS αρχεία: kebab-case (εξαιρεί index)
    {
      files: ['**/*.{js,ts}'],
      rules: {
        'unicorn/filename-case': ['error', {
          case: 'kebabCase',
          ignore: ['^index\\.[jt]s$']
        }],
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
    },
    // Scripts: kebab-case
    {
      files: ['scripts/**/*.{js,mjs,ts}'],
      rules: {
        'unicorn/filename-case': ['error', { case: 'kebabCase' }]
      }
    },
    // Tests: kebab-case με .test/.spec suffix
    {
      files: ['**/*.{test,spec}.{js,ts,tsx}'],
      rules: {
        'unicorn/filename-case': ['error', {
          case: 'kebabCase',
          ignore: ['\\.test\\.[jt]sx?$', '\\.spec\\.[jt]sx?$']
        }]
      }
    }
  ]
};
```

### **📋 Step 1.2: Markdownlint Configuration**

```json
// .markdownlint.json - Documentation Standards
{
  "default": true,
  "MD013": false,  // Line length (disable for code blocks)
  "MD041": false,  // First line in file should be H1 (flexible)
  "MD033": false   // Allow inline HTML for enhanced formatting
}
```

### **🔄 Step 1.3: Package.json Scripts Update**

```json
{
  "scripts": {
    "naming:validate": "node scripts/domains/docs/validate-naming-conventions.js",
    "naming:fix-preview": "node scripts/domains/docs/fix-naming-violations.js --dry-run",
    "naming:fix": "node scripts/domains/docs/fix-naming-violations.js",
    "lint:naming": "eslint . --ext .js,.jsx,.ts,.tsx",
    "lint:md": "markdownlint '**/*.md' -i node_modules -i coverage -i dist",
    "precommit": "npm run lint:naming && npm run lint:md",
    "prepare": "husky"
  }
}
```

### **🪝 Step 1.4: Husky Pre-commit Setup**

```bash
# Install και configure husky
npx husky init

# .husky/pre-commit
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"
npm run precommit
```

---

## 📋 PHASE 2: SCRIPTS & CLI TOOLS

### **🎯 Priority 1: Script Files Rename**

#### **Step 2.1: Δημιουργία Automation Script**

```javascript
// scripts/refactor/rename-scripts-to-kebab.mjs
import fs from 'node:fs';
import path from 'node:path';

const TARGET_DIRS = ['scripts', 'tools', 'bin'];
const EXTENSIONS = ['.js', '.mjs', '.ts'];

const toKebab = (str) =>
  str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[_\s]+/g, '-')
    .toLowerCase();

function renameInDirectory(dir) {
  if (!fs.existsSync(dir)) return;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const renames = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      // Recursively process subdirectories
      renameInDirectory(fullPath);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name);
      if (!EXTENSIONS.includes(ext)) continue;

      const baseName = path.basename(entry.name, ext);
      const kebabName = toKebab(baseName);

      if (baseName !== kebabName) {
        const newPath = path.join(dir, `${kebabName}${ext}`);

        // Windows/macOS safe rename (two-step για case-only αλλαγές)
        const tempPath = `${fullPath}.tmp`;
        fs.renameSync(fullPath, tempPath);
        fs.renameSync(tempPath, newPath);

        renames.push({ from: fullPath, to: newPath });
        console.log(`✅ Renamed: ${fullPath} → ${newPath}`);
      }
    }
  }

  return renames;
}

// Execute renames
const allRenames = [];
for (const dir of TARGET_DIRS) {
  console.log(`\n🔍 Processing directory: ${dir}`);
  const dirRenames = renameInDirectory(dir);
  allRenames.push(...dirRenames);
}

// Save mapping for potential package.json updates
fs.writeFileSync('script-rename-mapping.json', JSON.stringify(allRenames, null, 2));
console.log(`\n📄 Mapping saved: script-rename-mapping.json (${allRenames.length} renames)`);
```

#### **Step 2.2: Update Package.json References**

```javascript
// scripts/refactor/update-package-json-scripts.mjs
import fs from 'node:fs';
import path from 'node:path';

const MAPPING_FILE = 'script-rename-mapping.json';

if (!fs.existsSync(MAPPING_FILE)) {
  console.error(`❌ ${MAPPING_FILE} not found. Run rename-scripts-to-kebab.mjs first.`);
  process.exit(1);
}

const renames = JSON.parse(fs.readFileSync(MAPPING_FILE, 'utf8'));
const pathMap = new Map(renames.map(r => [r.from, r.to]));

function updatePackageJson(packagePath) {
  const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  let updated = false;

  if (pkg.scripts) {
    for (const [scriptName, scriptValue] of Object.entries(pkg.scripts)) {
      let newValue = scriptValue;

      for (const [oldPath, newPath] of pathMap) {
        if (scriptValue.includes(oldPath)) {
          newValue = newValue.replace(oldPath, newPath);
          updated = true;
        }
      }

      if (newValue !== scriptValue) {
        pkg.scripts[scriptName] = newValue;
        console.log(`📋 Updated script "${scriptName}" in ${packagePath}`);
      }
    }
  }

  if (updated) {
    fs.writeFileSync(packagePath, JSON.stringify(pkg, null, 2) + '\n');
  }
}

// Update root package.json
updatePackageJson('package.json');

// Update workspace package.json files
const workspaces = ['packages', 'apps'];
for (const workspace of workspaces) {
  if (!fs.existsSync(workspace)) continue;

  const entries = fs.readdirSync(workspace, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      const pkgPath = path.join(workspace, entry.name, 'package.json');
      if (fs.existsSync(pkgPath)) {
        updatePackageJson(pkgPath);
      }
    }
  }
}

console.log('✅ Package.json script references updated');
```

#### **Step 2.3: Execution Commands**

```bash
# Execute script renames
node scripts/refactor/rename-scripts-to-kebab.mjs

# Update package.json references
node scripts/refactor/update-package-json-scripts.mjs

# Commit changes
git add -A
git commit -m "🔧 PHASE 2: Rename scripts to kebab-case"

# Verify everything still works
npm run typecheck
npm run lint
npm run build
```

---

## 📚 PHASE 3: DOCUMENTATION STRUCTURE

### **📖 Step 3.1: Canonical Files (NO CHANGES)**

**⚠️ ΣΗΜΑΝΤΙΚΟ**: Αυτά τα αρχεία δεν αλλάζουν ΠΟΤΕ:

```bash
✅ ΜΕΝΟΥΝ ΩΣ ΕΧΟΥΝ:
README.md
LICENSE
CONTRIBUTING.md
CODE_OF_CONDUCT.md
SECURITY.md
CHANGELOG.md
```

### **📝 Step 3.2: Enterprise Documentation Rename**

```javascript
// scripts/refactor/rename-docs-to-kebab.mjs
import fs from 'node:fs';
import path from 'node:path';

const DOC_DIRECTORIES = ['docs', 'docs-enterprise', 'documentation'];
const CANONICAL_FILES = new Set([
  'README.md', 'LICENSE', 'CONTRIBUTING.md',
  'CODE_OF_CONDUCT.md', 'SECURITY.md', 'CHANGELOG.md'
]);

const toKebab = (str) =>
  str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[_\s]+/g, '-')
    .toLowerCase();

function renameDocsInDirectory(dir) {
  if (!fs.existsSync(dir)) return [];

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const renames = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      // Recursively process subdirectories
      renames.push(...renameDocsInDirectory(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      // Skip canonical files
      if (CANONICAL_FILES.has(entry.name)) {
        console.log(`⏭️  Skipping canonical file: ${fullPath}`);
        continue;
      }

      const baseName = path.basename(entry.name, '.md');
      const kebabName = toKebab(baseName);

      if (baseName !== kebabName) {
        const newPath = path.join(dir, `${kebabName}.md`);

        // Safe rename for case-only changes
        const tempPath = `${fullPath}.tmp`;
        fs.renameSync(fullPath, tempPath);
        fs.renameSync(tempPath, newPath);

        renames.push({ from: fullPath, to: newPath });
        console.log(`✅ Renamed: ${fullPath} → ${newPath}`);
      }
    }
  }

  return renames;
}

// Execute renames
const allRenames = [];
for (const dir of DOC_DIRECTORIES) {
  if (fs.existsSync(dir)) {
    console.log(`\n📚 Processing docs directory: ${dir}`);
    const dirRenames = renameDocsInDirectory(dir);
    allRenames.push(...dirRenames);
  }
}

// Save mapping για potential link updates
fs.writeFileSync('docs-rename-mapping.json', JSON.stringify(allRenames, null, 2));
console.log(`\n📄 Documentation mapping saved (${allRenames.length} renames)`);
```

### **🔗 Step 3.3: Update Internal Documentation Links**

```javascript
// scripts/refactor/update-doc-links.mjs
import fs from 'node:fs';
import path from 'node:path';

const MAPPING_FILE = 'docs-rename-mapping.json';

if (!fs.existsSync(MAPPING_FILE)) {
  console.log('ℹ️  No docs-rename-mapping.json found. Skipping link updates.');
  process.exit(0);
}

const renames = JSON.parse(fs.readFileSync(MAPPING_FILE, 'utf8'));
const linkMap = new Map();

// Build link mapping
for (const rename of renames) {
  const oldName = path.basename(rename.from);
  const newName = path.basename(rename.to);
  linkMap.set(oldName, newName);
}

function updateLinksInFile(filePath) {
  if (!filePath.endsWith('.md')) return;

  let content = fs.readFileSync(filePath, 'utf8');
  let updated = false;

  for (const [oldName, newName] of linkMap) {
    // Update markdown links [text](old-name.md)
    const linkRegex = new RegExp(`\\[([^\\]]*)\\]\\(([^\\)]*)${oldName.replace('.', '\\.')}\\)`, 'g');
    const newContent = content.replace(linkRegex, (match, text, prefix) => {
      updated = true;
      return `[${text}](${prefix}${newName})`;
    });
    content = newContent;
  }

  if (updated) {
    fs.writeFileSync(filePath, content);
    console.log(`🔗 Updated links in: ${filePath}`);
  }
}

// Update links in all markdown files
function updateLinksInDirectory(dir) {
  if (!fs.existsSync(dir)) return;

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      updateLinksInDirectory(fullPath);
    } else if (entry.isFile()) {
      updateLinksInFile(fullPath);
    }
  }
}

// Process all documentation directories
const DOC_DIRS = ['docs', 'docs-enterprise', 'documentation'];
for (const dir of DOC_DIRS) {
  if (fs.existsSync(dir)) {
    updateLinksInDirectory(dir);
  }
}

console.log('✅ Documentation link updates completed');
```

#### **Step 3.4: Execute Documentation Phase**

```bash
# Execute documentation renames
node scripts/refactor/rename-docs-to-kebab.mjs

# Update internal links
node scripts/refactor/update-doc-links.mjs

# Commit changes
git add -A
git commit -m "📚 PHASE 3: Rename documentation to kebab-case"

# Verify markdown lint
npm run lint:md
```

---

## 💻 PHASE 4: TYPESCRIPT/JAVASCRIPT FILES

### **🔧 Step 4.1: Non-React Files Rename**

```javascript
// scripts/refactor/rename-ts-js-to-kebab.mjs
import fs from 'node:fs';
import path from 'node:path';

const TARGET_DIRS = ['packages', 'apps', 'src'];
const EXTENSIONS = ['.js', '.ts'];  // Εξαιρούμε .tsx (React components)
const SKIP_PATTERNS = [
  'node_modules',
  'dist',
  'build',
  'coverage',
  '.git'
];

const toKebab = (str) =>
  str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[_\s]+/g, '-')
    .toLowerCase();

function shouldSkip(dirPath) {
  return SKIP_PATTERNS.some(pattern => dirPath.includes(pattern));
}

function renameFilesInDirectory(dir) {
  if (!fs.existsSync(dir) || shouldSkip(dir)) return [];

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const renames = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      renames.push(...renameFilesInDirectory(fullPath));
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name);
      if (!EXTENSIONS.includes(ext)) continue;

      const baseName = path.basename(entry.name, ext);

      // Skip index files και test files (handled separately)
      if (baseName === 'index' || baseName.includes('.test') || baseName.includes('.spec')) {
        continue;
      }

      const kebabName = toKebab(baseName);

      if (baseName !== kebabName) {
        const newPath = path.join(dir, `${kebabName}${ext}`);

        // Safe rename
        const tempPath = `${fullPath}.tmp`;
        fs.renameSync(fullPath, tempPath);
        fs.renameSync(tempPath, newPath);

        renames.push({ from: fullPath, to: newPath });
        console.log(`✅ Renamed: ${fullPath} → ${newPath}`);
      }
    }
  }

  return renames;
}

// Execute renames
const allRenames = [];
for (const dir of TARGET_DIRS) {
  if (fs.existsSync(dir)) {
    console.log(`\n💻 Processing directory: ${dir}`);
    const dirRenames = renameFilesInDirectory(dir);
    allRenames.push(...dirRenames);
  }
}

fs.writeFileSync('ts-js-rename-mapping.json', JSON.stringify(allRenames, null, 2));
console.log(`\n📄 TS/JS mapping saved (${allRenames.length} renames)`);
```

### **🔗 Step 4.2: Update Import Statements**

```javascript
// scripts/refactor/update-imports-ts-js.mjs
import { Project } from 'ts-morph';
import fs from 'node:fs';
import path from 'node:path';

const MAPPING_FILE = 'ts-js-rename-mapping.json';

if (!fs.existsSync(MAPPING_FILE)) {
  console.log('ℹ️  No ts-js-rename-mapping.json found. Skipping import updates.');
  process.exit(0);
}

const renames = JSON.parse(fs.readFileSync(MAPPING_FILE, 'utf8'));
const pathMap = new Map(renames.map(r => [path.resolve(r.from), path.resolve(r.to)]));

// Initialize TypeScript project
const project = new Project({
  tsConfigFilePath: 'tsconfig.json'
});

project.addSourceFilesAtPaths([
  'packages/**/*.{ts,tsx,js,jsx}',
  'apps/**/*.{ts,tsx,js,jsx}',
  'src/**/*.{ts,tsx,js,jsx}'
]);

let updatedFiles = 0;

for (const sourceFile of project.getSourceFiles()) {
  let hasChanges = false;

  // Update import declarations
  for (const importDecl of sourceFile.getImportDeclarations()) {
    const moduleSpecifier = importDecl.getModuleSpecifierValue();

    if (moduleSpecifier && moduleSpecifier.startsWith('.')) {
      // Handle relative imports
      const resolvedFile = importDecl.getModuleSpecifierSourceFile();
      if (resolvedFile) {
        const resolvedPath = resolvedFile.getFilePath();
        const newPath = pathMap.get(resolvedPath);

        if (newPath) {
          const relativePath = path.relative(
            path.dirname(sourceFile.getFilePath()),
            newPath.replace(/\.(ts|js)$/, '')  // Remove extension
          );

          let newModuleSpecifier = relativePath.split(path.sep).join('/');
          if (!newModuleSpecifier.startsWith('.')) {
            newModuleSpecifier = './' + newModuleSpecifier;
          }

          importDecl.setModuleSpecifier(newModuleSpecifier);
          hasChanges = true;
        }
      }
    }
  }

  // Update export declarations
  for (const exportDecl of sourceFile.getExportDeclarations()) {
    const moduleSpecifier = exportDecl.getModuleSpecifierValue();

    if (moduleSpecifier && moduleSpecifier.startsWith('.')) {
      const resolvedFile = exportDecl.getModuleSpecifierSourceFile();
      if (resolvedFile) {
        const resolvedPath = resolvedFile.getFilePath();
        const newPath = pathMap.get(resolvedPath);

        if (newPath) {
          const relativePath = path.relative(
            path.dirname(sourceFile.getFilePath()),
            newPath.replace(/\.(ts|js)$/, '')
          );

          let newModuleSpecifier = relativePath.split(path.sep).join('/');
          if (!newModuleSpecifier.startsWith('.')) {
            newModuleSpecifier = './' + newModuleSpecifier;
          }

          exportDecl.setModuleSpecifier(newModuleSpecifier);
          hasChanges = true;
        }
      }
    }
  }

  if (hasChanges) {
    updatedFiles++;
  }
}

// Save all changes
await project.save();
console.log(`✅ Updated imports in ${updatedFiles} files`);
```

#### **Step 4.3: Execute TypeScript/JavaScript Phase**

```bash
# Execute TS/JS renames
node scripts/refactor/rename-ts-js-to-kebab.mjs

# Update import statements
node scripts/refactor/update-imports-ts-js.mjs

# Commit changes
git add -A
git commit -m "💻 PHASE 4: Rename TS/JS files to kebab-case"

# Verify compilation
npm run typecheck
npm run lint
npm run build
```

---

## ⚛️ PHASE 5: REACT COMPONENTS

### **🎨 Step 5.1: React Components to PascalCase**

Χρησιμοποίησε το script από το TERMINOLOGY_RULES.md:

```bash
# Create το tsx rename script (από το original αρχείο)
# scripts/refactor/tsx-rename-to-pascal.mjs
# (Copy το code από lines 460-541 του TERMINOLOGY_RULES.md)

# Execute React component renames
node scripts/refactor/tsx-rename-to-pascal.mjs

# Update imports για React components
node scripts/refactor/update-imports-from-map-pascal.mjs

# Commit changes
git add -A
git commit -m "⚛️ PHASE 5: Rename React components to PascalCase"

# Verify everything compiles
npm run typecheck
npm run lint
npm run build
```

### **🧪 Step 5.2: Update Test Files**

```javascript
// scripts/refactor/rename-test-files.mjs
import fs from 'node:fs';
import path from 'node:path';

const TARGET_DIRS = ['packages', 'apps', 'src'];
const TEST_EXTENSIONS = ['.test.ts', '.test.tsx', '.spec.ts', '.spec.tsx'];

const toKebab = (str) =>
  str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[_\s]+/g, '-')
    .toLowerCase();

function renameTestFiles(dir) {
  if (!fs.existsSync(dir)) return [];

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const renames = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      renames.push(...renameTestFiles(fullPath));
    } else if (entry.isFile()) {
      // Check if it's a test file
      const isTestFile = TEST_EXTENSIONS.some(ext => entry.name.endsWith(ext));
      if (!isTestFile) continue;

      // Extract base name without test suffix
      let baseName = entry.name;
      for (const ext of TEST_EXTENSIONS) {
        if (baseName.endsWith(ext)) {
          baseName = baseName.slice(0, -ext.length);
          break;
        }
      }

      const kebabName = toKebab(baseName);

      if (baseName !== kebabName) {
        // Determine correct extension based on original
        const originalExt = TEST_EXTENSIONS.find(ext => entry.name.endsWith(ext));
        const newName = `${kebabName}${originalExt}`;
        const newPath = path.join(dir, newName);

        const tempPath = `${fullPath}.tmp`;
        fs.renameSync(fullPath, tempPath);
        fs.renameSync(tempPath, newPath);

        renames.push({ from: fullPath, to: newPath });
        console.log(`🧪 Renamed test: ${fullPath} → ${newPath}`);
      }
    }
  }

  return renames;
}

const allRenames = [];
for (const dir of TARGET_DIRS) {
  if (fs.existsSync(dir)) {
    console.log(`\n🧪 Processing test files in: ${dir}`);
    const dirRenames = renameTestFiles(dir);
    allRenames.push(...dirRenames);
  }
}

fs.writeFileSync('test-rename-mapping.json', JSON.stringify(allRenames, null, 2));
console.log(`\n📄 Test file mapping saved (${allRenames.length} renames)`);
```

---

## 🎨 PHASE 6: ASSETS & RESOURCES

### **🖼️ Step 6.1: Assets Rename**

```bash
# Simple bash script για assets
find . -name "*.png" -o -name "*.jpg" -o -name "*.svg" -o -name "*.css" | \
grep -v node_modules | \
while read file; do
  dir=$(dirname "$file")
  base=$(basename "$file")
  ext="${base##*.}"
  name="${base%.*}"

  # Convert to kebab-case (basic approach)
  kebab_name=$(echo "$name" | sed 's/\([a-z0-9]\)\([A-Z]\)/\1-\2/g' | tr '[:upper:]' '[:lower:]' | tr '_' '-')

  if [ "$name" != "$kebab_name" ]; then
    new_file="$dir/$kebab_name.$ext"
    echo "🎨 Renaming: $file → $new_file"
    mv "$file" "$new_file"
  fi
done
```

### **📁 Step 6.2: Directory Structure**

```bash
# Rename directories to kebab-case (manual validation required)
# NOTE: Αυτό πρέπει να γίνει προσεκτικά γιατί επηρεάζει paths

# Example renames (adjust based on your structure):
# mv src/components/UserInterface src/components/user-interface
# mv src/utils/ApiHelpers src/utils/api-helpers
# mv public/staticAssets public/static-assets
```

---

## ✅ PHASE 7: VALIDATION & COMPLIANCE

### **🔍 Step 7.1: Run Complete Validation**

```bash
# Complete naming validation
npm run naming:validate

# Lint all files
npm run lint:naming
npm run lint:md

# Type checking
npm run typecheck

# Build verification
npm run build

# Test verification
npm run test
```

### **📊 Step 7.2: Generate Compliance Report**

```bash
# Generate detailed compliance report
npm run naming:validate --detailed > naming-compliance-report.json

# Check compliance score
echo "📊 Compliance Score:"
cat naming-compliance-report.json | grep -o '"score":[0-9]*' | head -1
```

### **🔄 Step 7.3: CI/CD Integration**

```yaml
# .github/workflows/naming-compliance.yml
name: Naming Compliance Check
on: [push, pull_request]

jobs:
  naming-compliance:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - run: pnpm install --frozen-lockfile
      - run: pnpm naming:validate
      - run: pnpm lint:naming
      - run: pnpm lint:md
```

---

## 🚨 TROUBLESHOOTING GUIDE

### **⚠️ Common Issues & Solutions**

#### **🔴 Issue: Case-only Rename Failures (Windows/macOS)**
```bash
# Solution: Two-step rename
mv originalFile.ts tempFile.ts
mv tempFile.ts correct-file.ts
```

#### **🔴 Issue: Import Resolution Failures**
```bash
# Solution: Clear cache and rebuild
rm -rf node_modules/.cache
npm run typecheck
npm run build
```

#### **🔴 Issue: Git History Loss**
```bash
# Solution: Use git mv instead of regular mv
git mv originalFile.ts correct-file.ts
```

#### **🔴 Issue: Broken Package.json Scripts**
```bash
# Solution: Manual verification
grep -r "scripts/.*\.js" package.json
# Update any remaining hardcoded paths
```

### **🛡️ Emergency Rollback**

```bash
# If anything goes wrong, rollback to safety checkpoint
git log --oneline | grep "SAFETY CHECKPOINT"
git reset --hard <safety-checkpoint-hash>

# Or restore from tag
git checkout safety-pre-naming-migration-<timestamp>
```

### **📞 Support Escalation**

**Αν συναντήσεις προβλήματα:**
1. **📋 Τεκμηρίωσε το error**: Copy exact error messages
2. **🔍 Check compliance report**: `npm run naming:validate --detailed`
3. **📞 Escalate**: Contact Γιώργος Παγώνης, Enterprise Architecture Supervisor
4. **🛡️ Rollback if critical**: Χρησιμοποίησε safety checkpoint

---

**🎯 FINAL VERIFICATION CHECKLIST**

- [ ] **All phases completed**: Scripts → Docs → TS/JS → React → Assets
- [ ] **Naming compliance**: ≥85% score required για production
- [ ] **Build successful**: npm run build passes
- [ ] **Tests passing**: npm run test passes
- [ ] **Lint clean**: npm run lint passes
- [ ] **TypeScript clean**: npm run typecheck passes
- [ ] **CI/CD setup**: Automated validation configured
- [ ] **Team trained**: All developers know new conventions

**🚀 READY FOR PRODUCTION: Enterprise Naming System Activated! 🏆**