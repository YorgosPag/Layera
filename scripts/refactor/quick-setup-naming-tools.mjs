/**
 * 🚀 Expert Script: Quick Setup για Naming Tools
 *
 * Βάσει TERMINOLOGY_RULES.md ChatGPT Expert Guidance
 * One-click setup για όλα τα expert naming tools
 * Enterprise-ready configuration σε λίγα δευτερόλεπτα
 *
 * Source: ChatGPT expert conversation στο TERMINOLOGY_RULES.md
 */

import { execSync } from 'child_process';
import fs from 'node:fs';
import path from 'node:path';

console.log('🚀 EXPERT NAMING TOOLS: QUICK SETUP');
console.log('📋 Based on TERMINOLOGY_RULES.md ChatGPT expert guidance');
console.log('⚡ One-click enterprise configuration');

const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);

// Expert status checker
function checkStatus() {
  console.log('\n🔍 Checking current status...');

  const checks = {
    dependencies: checkDependencies(),
    eslintConfig: fs.existsSync('.eslintrc.naming.cjs'),
    markdownlintConfig: fs.existsSync('.markdownlint.json'),
    huskySetup: fs.existsSync('.husky/pre-commit'),
    githubActions: fs.existsSync('.github/workflows/naming-compliance.yml'),
    vscodeSettings: fs.existsSync('.vscode/settings.naming.json')
  };

  console.log('📊 Status Check:');
  Object.entries(checks).forEach(([key, status]) => {
    console.log(`   ${status ? '✅' : '❌'} ${key}: ${status ? 'OK' : 'Missing'}`);
  });

  return checks;
}

function checkDependencies() {
  try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const allDeps = { ...packageJson.dependencies, ...packageJson.devDependencies };

    const required = ['ts-morph', 'jscodeshift', 'eslint-plugin-unicorn', 'markdownlint-cli'];
    return required.every(dep => allDeps[dep]);
  } catch {
    return false;
  }
}

// Expert setup sequence
async function runSetup() {
  console.log('\n🛠️ Starting expert setup sequence...');

  const status = checkStatus();
  const steps = [];

  // Step 1: Dependencies
  if (!status.dependencies) {
    steps.push({
      name: 'Install Expert Dependencies',
      command: 'pnpm add -D ts-morph jscodeshift eslint-plugin-unicorn eslint-plugin-import markdownlint-cli husky',
      critical: true
    });
  }

  // Step 2: ESLint Configuration
  if (!status.eslintConfig) {
    steps.push({
      name: 'Setup ESLint Naming Rules',
      command: 'node scripts/refactor/eslint-naming-rules.mjs',
      critical: true
    });
  }

  // Step 3: CI/CD Integration
  if (!status.githubActions || !status.huskySetup || !status.vscodeSettings) {
    steps.push({
      name: 'Setup CI/CD Integration',
      command: 'node scripts/refactor/ci-naming-compliance.mjs',
      critical: false
    });
  }

  // Step 4: Git Hooks
  if (!status.huskySetup) {
    steps.push({
      name: 'Setup Git Hooks',
      command: 'npx husky install && npx husky add .husky/pre-commit "bash .husky/pre-commit"',
      critical: false
    });
  }

  if (steps.length === 0) {
    console.log('✅ All expert tools already configured!');
    return runValidation();
  }

  console.log(`\n📋 Setup plan: ${steps.length} steps`);
  steps.forEach((step, i) => {
    console.log(`  ${i + 1}. ${step.name} ${step.critical ? '(Critical)' : '(Optional)'}`);
  });

  // Execute steps
  for (const [index, step] of steps.entries()) {
    console.log(`\n⚙️ Step ${index + 1}: ${step.name}`);

    try {
      execSync(step.command, { stdio: 'inherit' });
      console.log(`✅ Completed: ${step.name}`);
    } catch (error) {
      console.error(`❌ Failed: ${step.name}`);
      if (step.critical) {
        console.error('🚨 Critical step failed - aborting setup');
        process.exit(1);
      } else {
        console.log('⚠️ Optional step failed - continuing...');
      }
    }
  }

  console.log('\n✅ Expert setup sequence completed!');
  return runValidation();
}

// Expert validation
function runValidation() {
  console.log('\n🔍 Running validation...');

  try {
    console.log('📊 Basic compliance check:');
    execSync('node scripts/refactor/validate-naming-compliance.mjs', { stdio: 'inherit' });

    console.log('\n🎯 Current naming status:');
    execSync('node scripts/refactor/comprehensive-naming-validator.mjs', { stdio: 'pipe' });

    return true;
  } catch (error) {
    console.log('⚠️ Validation found issues - tools are ready για fixes');
    return false;
  }
}

// Expert recommendations
function showRecommendations(validationPassed) {
  console.log('\n💡 EXPERT RECOMMENDATIONS:');

  if (validationPassed) {
    console.log('🎉 Excellent! Your codebase meets enterprise naming standards.');
    console.log('🔄 Regular maintenance:');
    console.log('   • npm run naming:validate (daily checks)');
    console.log('   • Pre-commit hooks will prevent violations');
    console.log('   • CI/CD will catch any issues automatically');
  } else {
    console.log('🛠️ Ready για naming improvements! Next steps:');
    console.log('');
    console.log('🚀 OPTION 1: Full Migration (Recommended)');
    console.log('   node scripts/refactor/master-naming-migration.mjs');
    console.log('');
    console.log('🎯 OPTION 2: Targeted Fixes');
    console.log('   • React components: node scripts/refactor/tsx-rename-to-pascal.mjs');
    console.log('   • TS/JS files: node scripts/refactor/rename-js-ts-to-kebab.mjs');
    console.log('   • Documentation: node scripts/refactor/md-rename-to-kebab.mjs');
    console.log('');
    console.log('🔍 OPTION 3: Analysis First');
    console.log('   node scripts/refactor/comprehensive-naming-validator.mjs');
  }

  console.log('\n📚 Documentation:');
  console.log('   📄 Full guide: scripts/refactor/README-EXPERT-NAMING-TOOLS.md');
  console.log('   📋 Rules: docs-enterprise/10-references/terminology/TERMINOLOGY_RULES.md');
}

// Main execution
async function main() {
  try {
    console.log('\n🔧 Expert Naming Tools Quick Setup Starting...');

    const validationPassed = await runSetup();

    showRecommendations(validationPassed);

    console.log('\n🏆 Expert naming tools setup completed successfully!');
    console.log('📋 Based on: TERMINOLOGY_RULES.md ChatGPT expert guidance');

  } catch (error) {
    console.error(`❌ Setup failed: ${error.message}`);
    console.log('\n🔧 Manual setup instructions:');
    console.log('1. Install dependencies: pnpm add -D ts-morph jscodeshift eslint-plugin-unicorn markdownlint-cli');
    console.log('2. Setup ESLint: node scripts/refactor/eslint-naming-rules.mjs');
    console.log('3. Setup CI/CD: node scripts/refactor/ci-naming-compliance.mjs');
    console.log('4. Read the guide: scripts/refactor/README-EXPERT-NAMING-TOOLS.md');
    process.exit(1);
  }
}

// Check if running directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}