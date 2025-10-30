/**
 * 🔧 Expert ESLint Naming Configuration Generator
 *
 * Βάσει TERMINOLOGY_RULES.md ChatGPT Expert Guidance
 * Δημιουργεί .eslintrc.naming.cjs με expert naming rules
 * Για integration με υπάρχον ESLint setup
 *
 * Source: ChatGPT expert conversation στο TERMINOLOGY_RULES.md
 */

import fs from 'node:fs';
import path from 'node:path';

console.log('🔄 Expert ESLint Naming Configuration Generator Starting...');
console.log('📋 Based on TERMINOLOGY_RULES.md ChatGPT expert guidance');

// Expert ESLint configuration από ChatGPT
const expertConfig = `/**
 * 🔧 Expert ESLint Naming Rules Configuration
 *
 * Βάσει TERMINOLOGY_RULES.md ChatGPT Expert Guidance
 * Enforces hybrid naming model: kebab-case για scripts, PascalCase για React
 *
 * Source: ChatGPT expert conversation
 */
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
    // Expert Rule 1: JS/TS files → kebab-case (excludes index)
    {
      files: ['**/*.{js,ts}'],
      rules: {
        'unicorn/filename-case': [
          'error',
          {
            case: 'kebabCase',
            ignore: ['^index\\\\.[jt]s$']
          }
        ],
        'import/no-unresolved': ['error', { caseSensitive: true }]
      }
    },

    // Expert Rule 2: React components → PascalCase.tsx
    {
      files: ['**/*.tsx'],
      rules: {
        'unicorn/filename-case': ['error', { case: 'pascalCase' }],
        'import/no-unresolved': ['error', { caseSensitive: true }]
      }
    },

    // Expert Rule 3: Scripts directory → kebab-case (strict)
    {
      files: ['scripts/**/*.{js,mjs,ts}'],
      rules: {
        'unicorn/filename-case': ['error', { case: 'kebabCase' }]
      }
    },

    // Expert Rule 4: Test files → kebab-case.test.{ts,tsx}
    {
      files: ['**/*.{test,spec}.{ts,tsx,js,jsx}'],
      rules: {
        'unicorn/filename-case': [
          'error',
          {
            case: 'kebabCase',
            ignore: ['\\\\.test\\\\.(ts|tsx|js|jsx)$', '\\\\.spec\\\\.(ts|tsx|js|jsx)$']
          }
        ]
      }
    }
  ]
};`;

// Expert markdownlint configuration από ChatGPT
const markdownlintConfig = `{
  "default": true,
  "MD013": false,
  "MD041": false
}`;

// Expert package.json scripts από ChatGPT
const packageJsonScripts = `{
  "scripts": {
    "lint:naming": "eslint . --config .eslintrc.naming.cjs --ext .js,.jsx,.ts,.tsx",
    "lint:md": "markdownlint '**/*.md' -i node_modules -i coverage -i dist",
    "naming:validate": "npm run lint:naming && npm run lint:md",
    "naming:fix": "npm run lint:naming -- --fix"
  }
}`;

// Write expert configurations
try {
  // ESLint naming rules
  fs.writeFileSync('.eslintrc.naming.cjs', expertConfig);
  console.log('✅ Created: .eslintrc.naming.cjs (expert naming rules)');

  // Markdownlint config
  fs.writeFileSync('.markdownlint.json', markdownlintConfig);
  console.log('✅ Created: .markdownlint.json (expert markdown rules)');

  // Package.json scripts template
  fs.writeFileSync('package.scripts.naming.json', packageJsonScripts);
  console.log('✅ Created: package.scripts.naming.json (template scripts)');

  console.log(`\n📋 EXPERT ESLINT SETUP SUMMARY:`);
  console.log(`✅ Expert naming rules: .eslintrc.naming.cjs`);
  console.log(`✅ Markdown linting: .markdownlint.json`);
  console.log(`✅ Package scripts template: package.scripts.naming.json`);
  console.log(`🎯 Based on: TERMINOLOGY_RULES.md expert guidance`);

  console.log(`\n🔄 INTEGRATION STEPS:`);
  console.log(`1. Install dependencies:`);
  console.log(`   pnpm add -D eslint-plugin-unicorn eslint-plugin-import markdownlint-cli`);
  console.log(`2. Merge package.scripts.naming.json scripts into your package.json`);
  console.log(`3. Test the rules: npm run naming:validate`);
  console.log(`4. Add to CI/CD: npm run naming:validate in your workflows`);

  console.log(`\n📚 EXPERT RULES SUMMARY:`);
  console.log(`• Scripts → kebab-case.js/mjs/ts`);
  console.log(`• Utilities → kebab-case.ts (no React)`);
  console.log(`• React Components → PascalCase.tsx`);
  console.log(`• Tests → kebab-case.test.ts/tsx`);
  console.log(`• Index files → index.{ts,js} (excluded from rules)`);
  console.log(`• Case-sensitive imports enforced`);

} catch (error) {
  console.error(`❌ Failed to write configuration files: ${error.message}`);
  process.exit(1);
}

console.log(`\n🏆 Expert ESLint configuration generator completed successfully!`);