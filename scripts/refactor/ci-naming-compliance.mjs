/**
 * 🔧 Expert Script: CI/CD Naming Compliance Integration
 *
 * Βάσει TERMINOLOGY_RULES.md ChatGPT Expert Guidance
 * Δημιουργεί CI/CD workflows και pre-commit hooks για naming compliance
 * Enterprise-grade integration με GitHub Actions και Git hooks
 *
 * Source: ChatGPT expert conversation στο TERMINOLOGY_RULES.md
 */

import fs from 'node:fs';
import path from 'node:path';

console.log('🔧 CI/CD NAMING COMPLIANCE INTEGRATION GENERATOR');
console.log('📋 Based on TERMINOLOGY_RULES.md ChatGPT expert guidance');
console.log('🏢 Enterprise GitHub Actions + Git Hooks + Package Scripts');

// Expert GitHub Actions workflow από ChatGPT
const githubActionsWorkflow = `name: 🔍 Naming Compliance Validation

# Expert ChatGPT guidance: Run on all critical events
on:
  push:
    branches: [ main, develop, feature/*, hotfix/* ]
  pull_request:
    branches: [ main, develop ]
  workflow_dispatch:

jobs:
  naming-compliance:
    name: 🎯 Enterprise Naming Standards
    runs-on: ubuntu-latest

    steps:
      - name: 📥 Checkout Code
        uses: actions/checkout@v4
        with:
          fetch-depth: 0  # Full history for comprehensive analysis

      - name: ⚙️ Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'pnpm'

      - name: 📦 Install PNPM
        uses: pnpm/action-setup@v2
        with:
          version: 8

      - name: 📦 Install Dependencies
        run: pnpm install --frozen-lockfile

      - name: 🔍 Expert Naming Compliance Check
        run: |
          echo "🔍 Running comprehensive naming validation..."
          node scripts/refactor/comprehensive-naming-validator.mjs
        continue-on-error: true
        id: naming-check

      - name: 📊 Generate Compliance Report
        run: |
          echo "📊 Generating detailed compliance metrics..."
          node scripts/refactor/validate-naming-compliance.mjs > naming-report.txt
        continue-on-error: true

      - name: 🔧 ESLint Naming Rules Check
        run: |
          echo "🔧 Validating ESLint naming configuration..."
          if [ -f .eslintrc.naming.cjs ]; then
            npx eslint . --config .eslintrc.naming.cjs --ext .js,.jsx,.ts,.tsx --max-warnings 0
          else
            echo "⚠️ ESLint naming config not found - run: node scripts/refactor/eslint-naming-rules.mjs"
            exit 1
          fi
        continue-on-error: true

      - name: 📚 Markdown Lint Check
        run: |
          echo "📚 Validating markdown naming standards..."
          if [ -f .markdownlint.json ]; then
            npx markdownlint '**/*.md' -i node_modules -i coverage -i dist
          else
            echo "⚠️ Markdownlint config not found"
          fi
        continue-on-error: true

      - name: 🚨 Critical Issues Detection
        run: |
          echo "🚨 Checking for critical naming violations..."

          # Check for React components not in PascalCase
          REACT_VIOLATIONS=$(find apps packages -name "*.tsx" -not -path "*/node_modules/*" -not -name "index.tsx" | grep -v "^[A-Z]" | wc -l)

          # Check for broken imports (basic check)
          BROKEN_IMPORTS=$(grep -r "from.*'./" apps packages --include="*.ts" --include="*.tsx" | grep -v node_modules | wc -l)

          echo "📊 Critical Issues Summary:"
          echo "   React violations: $REACT_VIOLATIONS"
          echo "   Potential broken imports: $BROKEN_IMPORTS"

          if [ "$REACT_VIOLATIONS" -gt 0 ] || [ "$BROKEN_IMPORTS" -gt 50 ]; then
            echo "❌ Critical naming issues detected!"
            echo "🔧 Run: node scripts/refactor/master-naming-migration.mjs"
            exit 1
          fi

      - name: 📄 Upload Compliance Report
        uses: actions/upload-artifact@v3
        if: always()
        with:
          name: naming-compliance-report
          path: |
            naming-report.txt
            comprehensive-naming-report.json
            naming-compliance-report.json
          retention-days: 30

      - name: 💬 Comment PR with Results
        if: github.event_name == 'pull_request'
        uses: actions/github-script@v7
        with:
          script: |
            const fs = require('fs');

            let comment = '## 🔍 Naming Compliance Report\\n\\n';

            try {
              const report = fs.readFileSync('naming-report.txt', 'utf8');
              comment += \`\\\`\\\`\\\`\\n\${report}\\n\\\`\\\`\\\`\\n\`;
            } catch (e) {
              comment += '⚠️ Could not read compliance report\\n';
            }

            comment += '\\n📋 **Based on**: TERMINOLOGY_RULES.md expert guidance\\n';
            comment += '🎯 **Target**: 95%+ compliance (GOLD standard)\\n';

            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: comment
            });

  # Expert dependency installation job από ChatGPT
  install-naming-tools:
    name: 🛠️ Install Naming Tools
    runs-on: ubuntu-latest
    if: github.event_name == 'workflow_dispatch'

    steps:
      - name: 📥 Checkout Code
        uses: actions/checkout@v4

      - name: ⚙️ Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'pnpm'

      - name: 📦 Install PNPM
        uses: pnpm/action-setup@v2
        with:
          version: 8

      - name: 🔧 Install Expert Naming Dependencies
        run: |
          echo "🔧 Installing expert naming tools..."
          pnpm add -D ts-morph jscodeshift eslint-plugin-unicorn eslint-plugin-import markdownlint-cli

          echo "⚙️ Setting up ESLint naming configuration..."
          node scripts/refactor/eslint-naming-rules.mjs

          echo "✅ Expert naming tools installed successfully!"

      - name: 💾 Commit Configuration
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add .eslintrc.naming.cjs .markdownlint.json package.json pnpm-lock.yaml
          git commit -m "🔧 Add expert naming tools configuration

          🎯 Based on: TERMINOLOGY_RULES.md ChatGPT expert guidance
          ✅ ESLint naming rules configured
          ✅ Markdownlint configuration added
          ✅ Expert dependencies installed

          🤖 Generated with Claude Code" || echo "No changes to commit"
          git push
`;

// Expert pre-commit hook από ChatGPT
const preCommitHook = `#!/bin/bash
#
# 🔧 Expert Pre-Commit Hook: Naming Compliance Enforcer
#
# Βάσει TERMINOLOGY_RULES.md ChatGPT Expert Guidance
# Prevents commits that violate enterprise naming standards
# Fast checks to maintain developer velocity
#

echo "🔍 Expert Pre-Commit: Naming Compliance Check..."

# Expert quick validation functions από ChatGPT
validate_react_components() {
  echo "⚛️ Checking React component naming..."

  # Find React components that don't follow PascalCase
  VIOLATIONS=$(git diff --cached --name-only --diff-filter=ACM | \
    grep '\\.tsx$' | \
    grep -v 'index\\.tsx$' | \
    grep -v '\\.test\\.' | \
    grep -v '\\.spec\\.' | \
    grep -v '\\.stories\\.' | \
    while read file; do
      basename=\$(basename "\$file" .tsx)
      if [[ ! \$basename =~ ^[A-Z][A-Za-z0-9]*$ ]]; then
        echo "\$file"
      fi
    done)

  if [ -n "\$VIOLATIONS" ]; then
    echo "❌ React component naming violations:"
    echo "\$VIOLATIONS" | sed 's/^/   /'
    echo ""
    echo "🔧 Fix with: node scripts/refactor/tsx-rename-to-pascal.mjs"
    echo "📋 Rule: React components → PascalCase.tsx"
    return 1
  fi

  echo "✅ React components: OK"
  return 0
}

validate_ts_js_files() {
  echo "📄 Checking TS/JS file naming..."

  # Find TS/JS files that don't follow kebab-case
  VIOLATIONS=$(git diff --cached --name-only --diff-filter=ACM | \
    grep -E '\\.(ts|js|mjs)$' | \
    grep -v 'index\\.' | \
    grep -v '\\.test\\.' | \
    grep -v '\\.spec\\.' | \
    grep -v '\\.d\\.ts$' | \
    while read file; do
      basename=\$(basename "\$file")
      name_without_ext=\${basename%.*}
      if [[ ! \$name_without_ext =~ ^[a-z0-9]+(-[a-z0-9]+)*$ ]]; then
        echo "\$file"
      fi
    done)

  if [ -n "\$VIOLATIONS" ]; then
    echo "❌ TS/JS naming violations:"
    echo "\$VIOLATIONS" | sed 's/^/   /'
    echo ""
    echo "🔧 Fix with: node scripts/refactor/rename-js-ts-to-kebab.mjs"
    echo "📋 Rule: TS/JS files → kebab-case.{ts,js,mjs}"
    return 1
  fi

  echo "✅ TS/JS files: OK"
  return 0
}

validate_documentation() {
  echo "📚 Checking documentation naming..."

  # Canonical files to exclude
  CANONICAL="README\\.md|CHANGELOG\\.md|CONTRIBUTING\\.md|CODE_OF_CONDUCT\\.md|LICENSE\\.md|SECURITY\\.md"

  VIOLATIONS=$(git diff --cached --name-only --diff-filter=ACM | \
    grep '\\.md$' | \
    grep -vE "\$CANONICAL" | \
    while read file; do
      basename=\$(basename "\$file" .md)
      if [[ ! \$basename =~ ^[a-z0-9]+(-[a-z0-9]+)*$ ]]; then
        echo "\$file"
      fi
    done)

  if [ -n "\$VIOLATIONS" ]; then
    echo "❌ Documentation naming violations:"
    echo "\$VIOLATIONS" | sed 's/^/   /'
    echo ""
    echo "🔧 Fix with: node scripts/refactor/md-rename-to-kebab.mjs"
    echo "📋 Rule: Documentation → kebab-case.md (except canonical)"
    return 1
  fi

  echo "✅ Documentation: OK"
  return 0
}

validate_imports() {
  echo "🔗 Checking for obvious import issues..."

  # Quick check for import paths that might be broken
  STAGED_FILES=$(git diff --cached --name-only --diff-filter=ACM | grep -E '\\.(ts|tsx|js|jsx)$')

  if [ -n "\$STAGED_FILES" ]; then
    IMPORT_ISSUES=$(echo "\$STAGED_FILES" | xargs grep -l "from.*'\\./" 2>/dev/null | \
      xargs grep "from.*'\\./" | \
      grep -v node_modules | \
      wc -l)

    if [ "\$IMPORT_ISSUES" -gt 100 ]; then
      echo "⚠️ High number of relative imports detected (\$IMPORT_ISSUES)"
      echo "💡 Consider running: node scripts/refactor/comprehensive-naming-validator.mjs"
    fi
  fi

  echo "✅ Imports: Basic check passed"
  return 0
}

# Expert execution sequence από ChatGPT
ERRORS=0

validate_react_components || ERRORS=$((ERRORS + 1))
validate_ts_js_files || ERRORS=$((ERRORS + 1))
validate_documentation || ERRORS=$((ERRORS + 1))
validate_imports || ERRORS=$((ERRORS + 1))

if [ \$ERRORS -gt 0 ]; then
  echo ""
  echo "❌ Pre-commit check failed with \$ERRORS error(s)"
  echo ""
  echo "🔧 EXPERT REMEDIATION OPTIONS:"
  echo "1. 🚀 Full migration: node scripts/refactor/master-naming-migration.mjs"
  echo "2. 🎯 Specific fixes: Use the suggested commands above"
  echo "3. 🔍 Analysis: node scripts/refactor/comprehensive-naming-validator.mjs"
  echo ""
  echo "💡 Or commit with --no-verify to skip (not recommended for production)"
  echo ""
  echo "📋 Based on: TERMINOLOGY_RULES.md expert guidance"
  exit 1
fi

echo ""
echo "✅ All naming compliance checks passed!"
echo "🎯 Expert validation completed successfully"
echo "📋 Based on: TERMINOLOGY_RULES.md expert guidance"
`;

// Expert package.json scripts από ChatGPT
const packageScripts = `{
  "scripts": {
    "naming:validate": "node scripts/refactor/comprehensive-naming-validator.mjs",
    "naming:validate:basic": "node scripts/refactor/validate-naming-compliance.mjs",
    "naming:fix:all": "node scripts/refactor/master-naming-migration.mjs",
    "naming:fix:react": "node scripts/refactor/tsx-rename-to-pascal.mjs",
    "naming:fix:ts": "node scripts/refactor/rename-js-ts-to-kebab.mjs",
    "naming:fix:docs": "node scripts/refactor/md-rename-to-kebab.mjs",
    "naming:fix:imports": "node scripts/refactor/update-imports-from-map-pascal.mjs",
    "naming:setup": "node scripts/refactor/eslint-naming-rules.mjs",
    "naming:install-tools": "pnpm add -D ts-morph jscodeshift eslint-plugin-unicorn eslint-plugin-import markdownlint-cli",
    "lint:naming": "eslint . --config .eslintrc.naming.cjs --ext .js,.jsx,.ts,.tsx",
    "lint:naming:fix": "eslint . --config .eslintrc.naming.cjs --ext .js,.jsx,.ts,.tsx --fix",
    "lint:md": "markdownlint '**/*.md' -i node_modules -i coverage -i dist",
    "lint:md:fix": "markdownlint '**/*.md' -i node_modules -i coverage -i dist --fix",
    "pre-commit": "bash .husky/pre-commit",
    "postinstall": "husky install"
  },
  "devDependencies": {
    "ts-morph": "^20.0.0",
    "jscodeshift": "^0.15.0",
    "eslint-plugin-unicorn": "^49.0.0",
    "eslint-plugin-import": "^2.29.0",
    "markdownlint-cli": "^0.37.0",
    "husky": "^8.0.3"
  }
}`;

// Expert Husky setup script από ChatGPT
const huskySetup = `#!/bin/bash
#
# 🔧 Expert Husky Setup Script
# Βάσει TERMINOLOGY_RULES.md ChatGPT Expert Guidance
#

echo "🔧 Setting up expert Git hooks with Husky..."

# Install husky if not present
if ! command -v husky &> /dev/null; then
  echo "📦 Installing Husky..."
  pnpm add -D husky
fi

# Initialize husky
echo "⚙️ Initializing Husky..."
npx husky install

# Create .husky directory if it doesn't exist
mkdir -p .husky

echo "🔧 Expert naming compliance Git hooks setup completed!"
echo "✅ Pre-commit hook will validate naming standards"
echo "📋 Based on: TERMINOLOGY_RULES.md expert guidance"
`;

// Expert VS Code settings από ChatGPT
const vscodeSettings = `{
  "files.watcherExclude": {
    "**/node_modules/**": true,
    "**/coverage/**": true,
    "**/dist/**": true,
    "**/*.log": true
  },
  "eslint.workingDirectories": [
    "apps/*",
    "packages/*"
  ],
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ],
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true,
    "source.fixAll.markdownlint": true
  },
  "files.associations": {
    "*.mjs": "javascript"
  },
  "search.exclude": {
    "**/node_modules": true,
    "**/coverage": true,
    "**/dist": true,
    "**/*.log": true,
    "**/pnpm-lock.yaml": true
  },
  "[markdown]": {
    "editor.defaultFormatter": "DavidAnson.vscode-markdownlint"
  },
  "markdownlint.config": {
    "MD013": false,
    "MD041": false
  }
}`;

try {
  // Create .github/workflows directory
  const workflowsDir = '.github/workflows';
  if (!fs.existsSync(workflowsDir)) {
    fs.mkdirSync(workflowsDir, { recursive: true });
  }

  // Write GitHub Actions workflow
  fs.writeFileSync(path.join(workflowsDir, 'naming-compliance.yml'), githubActionsWorkflow);
  console.log('✅ Created: .github/workflows/naming-compliance.yml');

  // Create .husky directory and pre-commit hook
  const huskyDir = '.husky';
  if (!fs.existsSync(huskyDir)) {
    fs.mkdirSync(huskyDir, { recursive: true });
  }

  fs.writeFileSync(path.join(huskyDir, 'pre-commit'), preCommitHook);
  console.log('✅ Created: .husky/pre-commit');

  // Make pre-commit executable (Linux/macOS)
  try {
    fs.chmodSync(path.join(huskyDir, 'pre-commit'), '755');
  } catch (e) {
    console.log('ℹ️ Note: chmod not available (Windows)');
  }

  // Write package.json scripts template
  fs.writeFileSync('package.scripts.naming-complete.json', packageScripts);
  console.log('✅ Created: package.scripts.naming-complete.json');

  // Write Husky setup script
  fs.writeFileSync('setup-git-hooks.sh', huskySetup);
  console.log('✅ Created: setup-git-hooks.sh');

  // Create .vscode directory and settings
  const vscodeDir = '.vscode';
  if (!fs.existsSync(vscodeDir)) {
    fs.mkdirSync(vscodeDir, { recursive: true });
  }

  const existingSettings = path.join(vscodeDir, 'settings.json');
  if (fs.existsSync(existingSettings)) {
    // Backup existing settings
    fs.copyFileSync(existingSettings, existingSettings + '.backup');
    console.log('📄 Backed up existing VS Code settings');
  }

  fs.writeFileSync(path.join(vscodeDir, 'settings.naming.json'), vscodeSettings);
  console.log('✅ Created: .vscode/settings.naming.json');

  console.log(`\n📊 CI/CD INTEGRATION SUMMARY:`);
  console.log(`✅ GitHub Actions workflow: .github/workflows/naming-compliance.yml`);
  console.log(`✅ Pre-commit hook: .husky/pre-commit`);
  console.log(`✅ Package scripts: package.scripts.naming-complete.json`);
  console.log(`✅ Husky setup: setup-git-hooks.sh`);
  console.log(`✅ VS Code settings: .vscode/settings.naming.json`);
  console.log(`🎯 Based on: TERMINOLOGY_RULES.md expert guidance`);

  console.log(`\n🔄 INTEGRATION STEPS:`);
  console.log(`1. Merge package scripts:`);
  console.log(`   # Copy scripts from package.scripts.naming-complete.json to package.json`);
  console.log(`2. Install expert dependencies:`);
  console.log(`   npm run naming:install-tools`);
  console.log(`3. Setup Git hooks:`);
  console.log(`   bash setup-git-hooks.sh`);
  console.log(`4. Configure ESLint:`);
  console.log(`   npm run naming:setup`);
  console.log(`5. Test the setup:`);
  console.log(`   npm run naming:validate`);

  console.log(`\n📋 ENTERPRISE FEATURES:`);
  console.log(`• 🔍 Comprehensive validation in CI/CD`);
  console.log(`• ⚡ Fast pre-commit checks for developer velocity`);
  console.log(`• 📊 Detailed compliance reports with artifacts`);
  console.log(`• 💬 Automatic PR comments with results`);
  console.log(`• 🛠️ Integration with VS Code for seamless development`);
  console.log(`• 🎯 Based on proven ChatGPT expert guidance`);

} catch (error) {
  console.error(`❌ Failed to create CI/CD integration files: ${error.message}`);
  process.exit(1);
}

console.log(`\n🏆 CI/CD naming compliance integration completed successfully!`);