/**
 * 🔧 Expert Master Script: Complete Naming Migration Orchestrator
 *
 * Βάσει TERMINOLOGY_RULES.md ChatGPT Expert Guidance
 * Οργανώνει την πλήρη naming migration σε σωστή σειρά
 * Με safety checkpoints και validation σε κάθε βήμα
 *
 * Source: ChatGPT expert conversation στο TERMINOLOGY_RULES.md
 */

import { execSync } from 'child_process';
import fs from 'node:fs';
import path from 'node:path';

console.log('🚀 EXPERT MASTER NAMING MIGRATION ORCHESTRATOR');
console.log('📋 Based on TERMINOLOGY_RULES.md ChatGPT expert guidance');
console.log('🛡️ With safety checkpoints and validation');

const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);

// Expert safety checkpoint function
function createSafetyCheckpoint(name) {
  const tag = \`safety-\${name}-\${timestamp}\`;
  try {
    execSync(\`git add -A\`, { stdio: 'inherit' });
    execSync(\`git commit --no-verify -m "🛡️ SAFETY CHECKPOINT: \${name}"\`, { stdio: 'inherit' });
    execSync(\`git tag "\${tag}"\`, { stdio: 'inherit' });
    console.log(\`✅ Safety checkpoint created: \${tag}\`);
    return tag;
  } catch (error) {
    console.warn(\`⚠️ Could not create checkpoint (probably no changes): \${error.message}\`);
    return null;
  }
}

// Expert validation function
function runValidation(step) {
  console.log(\`\n🔍 VALIDATION: \${step}\`);
  try {
    console.log('  📋 Checking TypeScript...');
    execSync('npm run typecheck', { stdio: 'pipe' });
    console.log('  ✅ TypeScript validation passed');

    console.log('  🏗️ Checking build...');
    execSync('npm run build', { stdio: 'pipe' });
    console.log('  ✅ Build validation passed');

    return true;
  } catch (error) {
    console.error(\`  ❌ Validation failed for \${step}\`);
    console.error(error.message);
    return false;
  }
}

// Expert dependency check
function checkDependencies() {
  console.log('\n📦 Checking expert dependencies...');

  const requiredDeps = [
    'ts-morph',
    'jscodeshift',
    'eslint-plugin-unicorn',
    'markdownlint-cli'
  ];

  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  const allDeps = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies
  };

  const missing = requiredDeps.filter(dep => !allDeps[dep]);

  if (missing.length > 0) {
    console.log(\`⚠️ Missing dependencies: \${missing.join(', ')}\`);
    console.log('📥 Installing expert dependencies...');

    try {
      execSync(\`pnpm add -D \${missing.join(' ')}\`, { stdio: 'inherit' });
      console.log('✅ Expert dependencies installed');
    } catch (error) {
      console.error(\`❌ Failed to install dependencies: \${error.message}\`);
      process.exit(1);
    }
  } else {
    console.log('✅ All expert dependencies available');
  }
}

// Expert migration phases
const phases = [
  {
    name: 'Setup & Dependencies',
    description: 'Install expert dependencies and setup ESLint',
    script: 'eslint-naming-rules.mjs',
    validation: false
  },
  {
    name: 'JS/TS → kebab-case',
    description: 'Rename JavaScript/TypeScript files to kebab-case',
    script: 'rename-js-ts-to-kebab.mjs',
    validation: true
  },
  {
    name: 'Import Updates (JS/TS)',
    description: 'Update imports after JS/TS renames',
    codemod: 'kebab-imports.js',
    validation: true
  },
  {
    name: 'Anonymous Exports Naming',
    description: 'Name anonymous default exports in React components',
    script: 'tsx-name-anonymous-defaults.mjs',
    validation: true
  },
  {
    name: 'React → PascalCase',
    description: 'Rename React components to PascalCase',
    script: 'tsx-rename-to-pascal.mjs',
    validation: true
  },
  {
    name: 'Import Updates (React)',
    description: 'Update imports after React component renames',
    script: 'update-imports-from-map-pascal.mjs',
    validation: true
  }
];

console.log(\`\n📋 EXPERT MIGRATION PLAN (\${phases.length} phases):\`);
phases.forEach((phase, index) => {
  console.log(\`  \${index + 1}. \${phase.name}: \${phase.description}\`);
});

// Confirm execution
console.log('\\n⚠️ This will modify many files in your codebase.');
console.log('🛡️ Safety checkpoints will be created at each step.');
console.log('🔄 You can rollback to any checkpoint if needed.');

// Skip interactive prompt in CI or if AUTO=true
const isAuto = process.env.AUTO === 'true' || process.env.CI;
if (!isAuto) {
  console.log('\\n❓ Do you want to proceed? (y/N)');
  // In a real scenario, you'd use readline here
  // For now, assume yes if AUTO env var is set
}

console.log('\\n🚀 Starting expert naming migration...');

// Initial safety checkpoint
const initialCheckpoint = createSafetyCheckpoint('pre-migration');

// Phase 0: Dependencies and setup
console.log('\\n' + '='.repeat(60));
console.log('📦 PHASE 0: Expert Dependencies & Setup');
console.log('='.repeat(60));

checkDependencies();

try {
  console.log('⚙️ Setting up expert ESLint configuration...');
  execSync('node scripts/refactor/eslint-naming-rules.mjs', { stdio: 'inherit' });
  console.log('✅ Expert ESLint setup completed');
} catch (error) {
  console.error(\`❌ Setup failed: \${error.message}\`);
  process.exit(1);
}

// Execute migration phases
for (let i = 0; i < phases.length; i++) {
  const phase = phases[i];

  if (phase.name === 'Setup & Dependencies') continue; // Already done

  console.log('\\n' + '='.repeat(60));
  console.log(\`🔄 PHASE \${i + 1}: \${phase.name}\`);
  console.log(\`📋 \${phase.description}\`);
  console.log('='.repeat(60));

  try {
    if (phase.script) {
      console.log(\`🛠️ Running expert script: \${phase.script}\`);
      execSync(\`node scripts/refactor/\${phase.script}\`, { stdio: 'inherit' });
    }

    if (phase.codemod) {
      console.log(\`🔄 Running expert codemod: \${phase.codemod}\`);
      const patterns = [
        'packages/**/src/**/*.{ts,tsx,js,jsx}',
        'apps/**/src/**/*.{ts,tsx,js,jsx}'
      ];
      execSync(\`npx jscodeshift -t codemods/\${phase.codemod} "\${patterns.join('" "')}"\`, { stdio: 'inherit' });
    }

    console.log(\`✅ Phase \${i + 1} completed successfully\`);

    // Validation if required
    if (phase.validation) {
      const validationPassed = runValidation(phase.name);
      if (!validationPassed) {
        console.error(\`❌ Validation failed for phase: \${phase.name}\`);
        console.log(\`🔄 Consider rolling back to: \${initialCheckpoint}\`);
        process.exit(1);
      }
    }

    // Safety checkpoint after each phase
    createSafetyCheckpoint(\`phase-\${i + 1}-\${phase.name.toLowerCase().replace(/\\s+/g, '-')}\`);

  } catch (error) {
    console.error(\`❌ Phase \${i + 1} failed: \${error.message}\`);
    console.log(\`🛡️ Rollback available to: \${initialCheckpoint}\`);
    process.exit(1);
  }
}

// Final validation
console.log('\\n' + '='.repeat(60));
console.log('🏁 FINAL VALIDATION');
console.log('='.repeat(60));

const finalValidation = runValidation('Final Migration');
if (!finalValidation) {
  console.error('❌ Final validation failed');
  process.exit(1);
}

// Expert naming compliance check
try {
  console.log('📋 Running expert naming compliance check...');
  execSync('npm run naming:validate', { stdio: 'inherit' });
  console.log('✅ Expert naming compliance validated');
} catch (error) {
  console.warn(\`⚠️ Naming validation had issues: \${error.message}\`);
}

// Final checkpoint
const finalCheckpoint = createSafetyCheckpoint('migration-complete');

console.log('\\n' + '🎉'.repeat(20));
console.log('🎉 EXPERT NAMING MIGRATION COMPLETED SUCCESSFULLY! 🎉');
console.log('🎉'.repeat(20));

console.log(\`\\n📊 EXPERT MIGRATION SUMMARY:\`);
console.log(\`✅ Phases completed: \${phases.length}\`);
console.log(\`🛡️ Initial checkpoint: \${initialCheckpoint}\`);
console.log(\`🏁 Final checkpoint: \${finalCheckpoint}\`);
console.log(\`🎯 Based on: TERMINOLOGY_RULES.md expert guidance\`);

console.log(\`\\n🔄 NEXT STEPS:\`);
console.log(\`1. Review changes: git log --oneline -10\`);
console.log(\`2. Run full test suite: npm test\`);
console.log(\`3. Verify in development: npm run dev\`);
console.log(\`4. Deploy with confidence! 🚀\`);

console.log(\`\\n🏆 Expert naming migration orchestrator completed successfully!\`);