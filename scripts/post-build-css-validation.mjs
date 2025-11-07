#!/usr/bin/env node
/**
 * 🔍 Post-Build CSS Artifact Validation
 *
 * Validates final built CSS artifacts for SSOT compliance
 * Catches issues that might slip through bundling/processing
 * CRITICAL: Fails build on violations - no continue-on-error
 */

import { execSync } from 'node:child_process';

console.log('🔍 POST-BUILD CSS VALIDATION');
console.log('============================');

const patterns = [
  'apps/**/{dist,build}/**/*.css',
  'packages/**/dist/**/*.css',
  '.next/**/*.css',
  'build/**/*.css'
].join(' ');

try {
  console.log('🎨 Running stylelint on built CSS artifacts...');

  // stylelint σε artifacts με το ίδιο .stylelintrc - STRICT enforcement
  execSync(`npx stylelint ${patterns} --max-warnings 0`, {
    stdio: 'inherit'
  });

  console.log('✅ Stylelint: All built artifacts comply with SSOT rules');

} catch (error) {
  console.log('❌ CRITICAL: Stylelint violations found in built artifacts');
  console.log('💥 Build artifacts contain hardcoded values or non-compliant CSS');
  process.exit(1);
}

try {
  console.log('\n🔎 Running no-literals check on built artifacts...');

  // έξτρα φραγμός: no-literals πάνω στα artifacts
  execSync(`node scripts/no-literals-check.mjs`, {
    stdio: 'inherit'
  });

  console.log('✅ No-literals: All built artifacts are clean');

} catch (error) {
  console.log('❌ CRITICAL: Literal values detected in built artifacts');
  console.log('💥 Build process introduced hardcoded CSS values');
  process.exit(1);
}

console.log('\n🎉 POST-BUILD VALIDATION PASSED');
console.log('All CSS artifacts comply with SSOT requirements');
console.log('🔒 Ready for production deployment!');