# 🔧 Expert Naming Tools Suite

**Βάσει TERMINOLOGY_RULES.md ChatGPT Expert Guidance**
Ολοκληρωμένη σουίτα automation tools για Enterprise Naming System implementation

---

## 📋 Πλήρης Λίστα Expert Tools

### 🚀 **TIER 1: CORE MIGRATION TOOLS**

#### 1. **master-naming-migration.mjs** 🎯
**Master orchestrator για πλήρη migration**
```bash
node scripts/refactor/master-naming-migration.mjs
```
- ✅ Ολοκληρωμένη 6-phase migration
- ✅ Safety checkpoints σε κάθε βήμα
- ✅ Validation και rollback capabilities
- ✅ Dependency management
- 🎯 **Χρήση**: Πρώτη φορά ή πλήρης migration

---

#### 2. **validate-naming-compliance.mjs** 📊
**Γρήγορος compliance έλεγχος**
```bash
node scripts/refactor/validate-naming-compliance.mjs
```
- ✅ Expert grading (Gold/Silver/Bronze/Failed)
- ✅ Γρήγορη αναφορά συμμόρφωσης
- ✅ Specific violation counts
- 🎯 **Χρήση**: Καθημερινός έλεγχος

---

#### 3. **comprehensive-naming-validator.mjs** 🔍
**Ολοκληρωμένη enterprise validation**
```bash
node scripts/refactor/comprehensive-naming-validator.mjs
```
- ✅ Files, folders, imports analysis
- ✅ Severity-based scoring
- ✅ Critical issues detection
- ✅ Broken imports identification
- 🎯 **Χρήση**: Βαθιά ανάλυση προβλημάτων

---

### 🛠️ **TIER 2: SPECIALIZED RENAME TOOLS**

#### 4. **tsx-rename-to-pascal.mjs** ⚛️
**React components → PascalCase**
```bash
node scripts/refactor/tsx-rename-to-pascal.mjs
```
- ✅ Bulk rename React components
- ✅ Anonymous default export detection
- ✅ Safe Windows/macOS rename
- ✅ Creates mapping για import updates

---

#### 5. **rename-js-ts-to-kebab.mjs** 📄
**JS/TS files → kebab-case**
```bash
node scripts/refactor/rename-js-ts-to-kebab.mjs
```
- ✅ Bulk rename TS/JS files
- ✅ Excludes tests and index files
- ✅ Creates mapping file
- ✅ Windows/macOS compatible

---

#### 6. **md-rename-to-kebab.mjs** 📚
**Documentation → kebab-case**
```bash
node scripts/refactor/md-rename-to-kebab.mjs
```
- ✅ Markdown files → kebab-case
- ✅ Excludes canonical GitHub files
- ✅ Updates internal links
- ✅ Reference link updates

---

#### 7. **tsx-name-anonymous-defaults.mjs** 🏷️
**Anonymous exports → Named components**
```bash
node scripts/refactor/tsx-name-anonymous-defaults.mjs
```
- ✅ Names anonymous default exports
- ✅ Smart component naming
- ✅ Preserves index.tsx files
- ✅ Optional file renaming

---

### 🔗 **TIER 3: IMPORT UPDATE TOOLS**

#### 8. **update-imports-from-map-pascal.mjs** 🔄
**Import updates μετά PascalCase rename**
```bash
node scripts/refactor/update-imports-from-map-pascal.mjs
```
- ✅ Uses ts-morph για exact resolution
- ✅ Relative path calculations
- ✅ Extension preservation
- 🎯 **Χρήση**: Μετά React component renames

---

#### 9. **kebab-imports.js** (codemod) 🔧
**jscodeshift codemod για kebab-case imports**
```bash
npx jscodeshift -t codemods/kebab-imports.js "apps/**/src/**/*.{ts,tsx}"
```
- ✅ Bulk import path updates
- ✅ Transform pipeline
- ✅ Safe path transformations

---

### ⚙️ **TIER 4: CONFIGURATION & SETUP**

#### 10. **eslint-naming-rules.mjs** 🔧
**ESLint configuration generator**
```bash
node scripts/refactor/eslint-naming-rules.mjs
```
- ✅ Creates .eslintrc.naming.cjs
- ✅ Unicorn plugin setup
- ✅ Markdownlint configuration
- ✅ Package.json scripts template

---

#### 11. **ci-naming-compliance.mjs** 🏢
**CI/CD integration generator**
```bash
node scripts/refactor/ci-naming-compliance.mjs
```
- ✅ GitHub Actions workflow
- ✅ Pre-commit hooks (Husky)
- ✅ VS Code settings
- ✅ Package.json scripts

---

## 🎯 Expert Usage Workflows

### 🚀 **WORKFLOW 1: First-Time Setup**
```bash
# 1. Install dependencies
pnpm add -D ts-morph jscodeshift eslint-plugin-unicorn markdownlint-cli

# 2. Setup configurations
node scripts/refactor/eslint-naming-rules.mjs
node scripts/refactor/ci-naming-compliance.mjs

# 3. Run full migration
node scripts/refactor/master-naming-migration.mjs

# 4. Validate results
node scripts/refactor/comprehensive-naming-validator.mjs
```

### 🔍 **WORKFLOW 2: Daily Validation**
```bash
# Quick compliance check
node scripts/refactor/validate-naming-compliance.mjs

# If issues found, run specific fixes:
node scripts/refactor/tsx-rename-to-pascal.mjs        # React issues
node scripts/refactor/rename-js-ts-to-kebab.mjs      # TS/JS issues
node scripts/refactor/md-rename-to-kebab.mjs         # Documentation issues
```

### 🛠️ **WORKFLOW 3: Targeted Fixes**
```bash
# React components only
node scripts/refactor/tsx-name-anonymous-defaults.mjs
node scripts/refactor/tsx-rename-to-pascal.mjs
node scripts/refactor/update-imports-from-map-pascal.mjs

# TS/JS files only
node scripts/refactor/rename-js-ts-to-kebab.mjs
npx jscodeshift -t codemods/kebab-imports.js "apps/**/src/**/*.{ts,tsx}"

# Documentation only
node scripts/refactor/md-rename-to-kebab.mjs
```

### 📊 **WORKFLOW 4: Enterprise Monitoring**
```bash
# Comprehensive analysis
node scripts/refactor/comprehensive-naming-validator.mjs

# Check exit codes:
# 0 = Success (95%+ compliance)
# 1 = Warnings (75-94% compliance)
# 2 = Critical issues detected

# Integration with CI/CD
npm run naming:validate              # Basic check
npm run naming:validate:comprehensive # Full analysis
```

---

## 📋 Expert Script Features

### ✅ **Safety & Reliability**
- **Two-step rename** για Windows/macOS compatibility
- **Safety checkpoints** με Git tags
- **Validation στο κάθε βήμα**
- **Rollback capabilities**

### 🎯 **Precision & Intelligence**
- **ts-morph AST analysis** για exact resolution
- **Smart component naming** βάσει folder/file structure
- **Canonical file preservation** (README.md, etc.)
- **Extension handling** για imports

### 📊 **Enterprise Integration**
- **Severity-based scoring** (Critical/High/Medium/Low)
- **Compliance grading** (Gold/Silver/Bronze/Failed)
- **CI/CD workflows** με GitHub Actions
- **Pre-commit hooks** για prevention

### 🔧 **Developer Experience**
- **Detailed progress reporting**
- **Clear error messages**
- **Next steps recommendations**
- **VS Code integration**

---

## 🏆 Expert Validation Levels

### 🥇 **GOLD Standard (95%+ compliance)**
- Zero critical violations
- Minimal high-severity issues
- Enterprise-ready codebase
- Automated maintenance

### 🥈 **SILVER Standard (85-94% compliance)**
- Few critical violations
- Some high-severity issues
- Production-acceptable
- Systematic improvement needed

### 🥉 **BRONZE Standard (75-84% compliance)**
- Multiple critical violations
- Many high-severity issues
- Minimum acceptable
- Focused remediation required

### ❌ **FAILED (< 75% compliance)**
- Numerous critical violations
- Unacceptable για enterprise
- Immediate migration required
- Full tool suite deployment

---

## 📋 Dependencies Required

```json
{
  "devDependencies": {
    "ts-morph": "^20.0.0",
    "jscodeshift": "^0.15.0",
    "eslint-plugin-unicorn": "^49.0.0",
    "eslint-plugin-import": "^2.29.0",
    "markdownlint-cli": "^0.37.0",
    "husky": "^8.0.3"
  }
}
```

---

## 🎯 Based On

**Source**: `docs-enterprise/10-references/terminology/TERMINOLOGY_RULES.md`
**Expert Guidance**: ChatGPT conversation και proven patterns
**Architecture**: Fortune 500 enterprise standards
**Implementation**: Claude Code collaboration

---

**🏢 Enterprise-Grade | 🛡️ Safety-First | 🎯 Expert-Validated | ⚡ Developer-Friendly**