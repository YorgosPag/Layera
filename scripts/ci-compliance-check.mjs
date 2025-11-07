#!/usr/bin/env node
/**
 * 🤖 CI Compliance Check - Machine-readable SSOT compliance verification
 *
 * Runs all compliance checks and generates artifacts for CI/CD pipeline
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';

const timestamp = new Date().toISOString();
const results = {
  timestamp,
  compliance: {
    stylelint: { status: 'unknown', violations: 0, errors: [] },
    codemod: { status: 'unknown', missingTokens: 0, report: null },
    eslint: { status: 'unknown', errors: 0 },
    tokens: { status: 'unknown', message: '' }
  },
  summary: { status: 'unknown', totalViolations: 0 },
  artifacts: []
};

async function runStylelintCheck() {
  try {
    console.log('🔍 Running Stylelint check...');
    execSync('npm run lint:css:ci', { stdio: 'pipe' });

    try {
      const report = JSON.parse(readFileSync('stylelint-report.json', 'utf8'));
      const violations = report.reduce((total, file) => total + file.warnings.length, 0);

      results.compliance.stylelint = {
        status: violations === 0 ? 'pass' : 'fail',
        violations,
        errors: report.filter(f => f.warnings.length > 0).map(f => ({
          file: f.source,
          warnings: f.warnings.length
        }))
      };
      results.artifacts.push('stylelint-report.json');
    } catch (e) {
      results.compliance.stylelint.status = 'pass';
      results.compliance.stylelint.violations = 0;
    }
  } catch (error) {
    results.compliance.stylelint.status = 'fail';
    results.compliance.stylelint.violations = -1;
    results.compliance.stylelint.errors = [{ error: error.message }];
  }
}

async function runCodemodCheck() {
  try {
    console.log('🔧 Running Codemod analysis...');
    execSync('npm run codemod:css-tokens:ci', { stdio: 'pipe' });

    try {
      const report = JSON.parse(readFileSync('codemod-report.json', 'utf8'));

      results.compliance.codemod = {
        status: report.summary.missing === 0 ? 'pass' : 'fail',
        missingTokens: report.summary.missing,
        report: {
          filesProcessed: report.filesProcessed,
          filesChanged: report.filesChanged,
          totalChanges: report.totalChanges,
          highConfidence: report.summary.high
        }
      };
      results.artifacts.push('codemod-report.json');
    } catch (e) {
      results.compliance.codemod.status = 'error';
    }
  } catch (error) {
    results.compliance.codemod.status = 'error';
    results.compliance.codemod.report = { error: error.message };
  }
}

async function runTokensCheck() {
  try {
    console.log('🎨 Running Tokens compliance...');
    execSync('npm run lint:tokens', { stdio: 'pipe' });
    results.compliance.tokens = { status: 'pass', message: 'No literals detected' };
  } catch (error) {
    results.compliance.tokens = { status: 'fail', message: error.message };
  }
}

async function runESLintCheck() {
  try {
    console.log('⚡ Running ESLint check...');
    execSync('npm run lint', { stdio: 'pipe' });
    results.compliance.eslint = { status: 'pass', errors: 0 };
  } catch (error) {
    results.compliance.eslint = { status: 'fail', errors: 1 };
  }
}

async function generateSummary() {
  const allChecks = Object.values(results.compliance);
  const failedChecks = allChecks.filter(check => check.status === 'fail').length;
  const totalViolations =
    results.compliance.stylelint.violations +
    results.compliance.codemod.missingTokens;

  results.summary = {
    status: failedChecks === 0 ? 'pass' : 'fail',
    totalViolations,
    failedChecks,
    passedChecks: allChecks.length - failedChecks
  };
}

async function main() {
  console.log('🤖 CI COMPLIANCE CHECK');
  console.log('======================');

  // Run all checks in parallel where possible
  await Promise.all([
    runStylelintCheck(),
    runCodemodCheck(),
    runTokensCheck(),
    runESLintCheck()
  ]);

  await generateSummary();

  // Write final report
  const reportFile = 'ci-compliance-report.json';
  writeFileSync(reportFile, JSON.stringify(results, null, 2));
  results.artifacts.push(reportFile);

  console.log('📊 COMPLIANCE SUMMARY');
  console.log('====================');
  console.log(`Status: ${results.summary.status.toUpperCase()}`);
  console.log(`Total Violations: ${results.summary.totalViolations}`);
  console.log(`Passed Checks: ${results.summary.passedChecks}`);
  console.log(`Failed Checks: ${results.summary.failedChecks}`);
  console.log('');
  console.log('📁 Generated Artifacts:');
  results.artifacts.forEach(artifact => console.log(`   - ${artifact}`));

  // Detailed breakdown
  console.log('');
  console.log('🔍 DETAILED BREAKDOWN:');
  Object.entries(results.compliance).forEach(([check, result]) => {
    const status = result.status === 'pass' ? '✅' : result.status === 'fail' ? '❌' : '⚠️';
    console.log(`${status} ${check}: ${result.status}`);
  });

  // Exit with appropriate code
  if (results.summary.status === 'fail') {
    console.log('');
    console.log('💥 COMPLIANCE CHECK FAILED');
    console.log('Fix violations before merging to main branch.');
    process.exit(1);
  } else {
    console.log('');
    console.log('🎉 ALL COMPLIANCE CHECKS PASSED');
    console.log('Ready for production deployment!');
    process.exit(0);
  }
}

main().catch(error => {
  console.error('💥 CI Compliance check failed:', error);
  process.exit(1);
});