/**
 * 🔧 Expert Script: Comprehensive Naming Compliance Validator
 *
 * Βάσει TERMINOLOGY_RULES.md ChatGPT Expert Guidance
 * Ολοκληρωμένος έλεγχος naming compliance σε όλο το enterprise project
 * Ελέγχει αρχεία, imports, exports, και παράγει λεπτομερή αναφορά
 *
 * Source: ChatGPT expert conversation στο TERMINOLOGY_RULES.md
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('🔍 COMPREHENSIVE NAMING COMPLIANCE VALIDATOR');
console.log('📋 Based on TERMINOLOGY_RULES.md ChatGPT expert guidance');
console.log('🏢 Enterprise-grade validation with detailed reporting');

// Expert naming rules από ChatGPT
const NAMING_RULES = {
  // Scripts should be kebab-case
  scripts: {
    pattern: /^[a-z0-9]+(-[a-z0-9]+)*\.(js|mjs|ts)$/,
    description: 'Scripts → kebab-case.{js,mjs,ts}',
    severity: 'high'
  },

  // TypeScript/JavaScript (non-React) should be kebab-case
  tsJs: {
    pattern: /^[a-z0-9]+(-[a-z0-9]+)*\.ts$/,
    description: 'TS/JS modules → kebab-case.ts',
    excludePatterns: [/\.test\./, /\.spec\./, /\.d\.ts$/],
    severity: 'high'
  },

  // React components should be PascalCase
  react: {
    pattern: /^[A-Z][A-Za-z0-9]*\.tsx$/,
    description: 'React components → PascalCase.tsx',
    excludePatterns: [/\.test\./, /\.spec\./, /\.stories\./],
    severity: 'critical'
  },

  // Test files should be kebab-case.test/spec
  tests: {
    pattern: /^[a-z0-9]+(-[a-z0-9]+)*\.(test|spec)\.(ts|tsx|js|jsx)$/,
    description: 'Tests → kebab-case.{test,spec}.{ts,tsx,js,jsx}',
    severity: 'medium'
  },

  // Documentation files (non-canonical)
  docs: {
    pattern: /^[a-z0-9]+(-[a-z0-9]+)*\.md$/,
    description: 'Documentation → kebab-case.md',
    canonical: ['README.md', 'CHANGELOG.md', 'CONTRIBUTING.md', 'CODE_OF_CONDUCT.md', 'LICENSE.md', 'SECURITY.md'],
    severity: 'low'
  },

  // Folders should be kebab-case
  folders: {
    pattern: /^[a-z0-9]+(-[a-z0-9]+)*$/,
    description: 'Folders → kebab-case',
    excludePatterns: [/^node_modules$/, /^\./, /^dist$/, /^build$/, /^coverage$/],
    severity: 'medium'
  }
};

// Expert severity levels από ChatGPT
const SEVERITY_WEIGHTS = {
  critical: 10,  // React components - breaks builds
  high: 7,       // Scripts, TS/JS - important for consistency
  medium: 4,     // Tests, folders - less critical
  low: 1         // Documentation - cosmetic
};

// Expert file scanner
function scanDirectory(dir, results = {
  files: { compliant: [], violations: [], skipped: [] },
  folders: { compliant: [], violations: [], skipped: [] },
  imports: { valid: [], broken: [], inconsistent: [] }
}) {
  try {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (entry.name.startsWith('.') || entry.name === 'node_modules') continue;

      const fullPath = path.join(dir, entry.name);
      const relativePath = path.relative(process.cwd(), fullPath);

      if (entry.isDirectory()) {
        checkFolder(relativePath, results.folders);
        scanDirectory(fullPath, results);
      } else {
        checkFile(relativePath, results.files);
        if (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx') ||
            entry.name.endsWith('.js') || entry.name.endsWith('.jsx')) {
          checkImports(fullPath, results.imports);
        }
      }
    }
  } catch (error) {
    console.warn(`⚠️ Could not scan ${dir}: ${error.message}`);
  }

  return results;
}

// Expert file checker
function checkFile(filePath, results) {
  const fileName = path.basename(filePath);
  const ext = path.extname(fileName);
  const dirName = path.dirname(filePath);

  // Skip certain files
  if (fileName === 'index.ts' || fileName === 'index.js' || fileName === 'index.tsx') {
    results.skipped.push({
      file: filePath,
      reason: 'index files excluded (expert advice)',
      severity: 'none'
    });
    return;
  }

  // Determine category and apply expert rules
  let category, rule;

  if (dirName.includes('scripts') && ['.js', '.mjs', '.ts'].includes(ext)) {
    category = 'scripts';
    rule = NAMING_RULES.scripts;
  } else if (ext === '.ts' && !fileName.includes('.test') && !fileName.includes('.spec') && !fileName.endsWith('.d.ts')) {
    category = 'tsJs';
    rule = NAMING_RULES.tsJs;
  } else if (ext === '.tsx') {
    if (fileName.includes('.test') || fileName.includes('.spec') || fileName.includes('.stories')) {
      results.skipped.push({
        file: filePath,
        reason: 'test/story files',
        severity: 'none'
      });
      return;
    }
    category = 'react';
    rule = NAMING_RULES.react;
  } else if (fileName.includes('.test') || fileName.includes('.spec')) {
    category = 'tests';
    rule = NAMING_RULES.tests;
  } else if (ext === '.md') {
    if (NAMING_RULES.docs.canonical.includes(fileName)) {
      results.skipped.push({
        file: filePath,
        reason: 'canonical GitHub file (expert advice)',
        severity: 'none'
      });
      return;
    }
    category = 'docs';
    rule = NAMING_RULES.docs;
  } else {
    results.skipped.push({
      file: filePath,
      reason: 'not covered by naming rules',
      severity: 'none'
    });
    return;
  }

  // Apply rule
  if (rule.pattern.test(fileName)) {
    results.compliant.push({
      file: filePath,
      category,
      rule: rule.description,
      severity: rule.severity
    });
  } else {
    results.violations.push({
      file: filePath,
      category,
      rule: rule.description,
      expected: rule.pattern.toString(),
      severity: rule.severity
    });
  }
}

// Expert folder checker
function checkFolder(folderPath, results) {
  const folderName = path.basename(folderPath);
  const rule = NAMING_RULES.folders;

  // Skip excluded patterns
  for (const excludePattern of rule.excludePatterns) {
    if (excludePattern.test(folderName)) {
      results.skipped.push({
        folder: folderPath,
        reason: 'excluded pattern',
        severity: 'none'
      });
      return;
    }
  }

  if (rule.pattern.test(folderName)) {
    results.compliant.push({
      folder: folderPath,
      rule: rule.description,
      severity: rule.severity
    });
  } else {
    results.violations.push({
      folder: folderPath,
      rule: rule.description,
      expected: rule.pattern.toString(),
      severity: rule.severity
    });
  }
}

// Expert import checker
function checkImports(filePath, results) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const importLines = content.match(/^import.*from\s+['"][^'"]*['"];?$/gm) || [];

    for (const importLine of importLines) {
      const match = importLine.match(/from\s+['"]([^'"]*)['"]/);
      if (match) {
        const importPath = match[1];

        // Only check relative imports
        if (importPath.startsWith('.')) {
          const resolvedPath = path.resolve(path.dirname(filePath), importPath);

          // Check if imported file exists
          const possibleExtensions = ['', '.ts', '.tsx', '.js', '.jsx'];
          let exists = false;

          for (const ext of possibleExtensions) {
            if (fs.existsSync(resolvedPath + ext)) {
              exists = true;
              break;
            }
          }

          if (!exists && !fs.existsSync(resolvedPath + '/index.ts') && !fs.existsSync(resolvedPath + '/index.tsx')) {
            results.broken.push({
              file: filePath,
              importPath,
              line: importLine.trim(),
              severity: 'high'
            });
          } else {
            results.valid.push({
              file: filePath,
              importPath,
              severity: 'none'
            });
          }
        }
      }
    }
  } catch (error) {
    console.warn(`⚠️ Could not check imports in ${filePath}: ${error.message}`);
  }
}

// Expert compliance calculator
function calculateCompliance(results) {
  const fileResults = results.files;
  const folderResults = results.folders;

  const totalFiles = fileResults.compliant.length + fileResults.violations.length;
  const totalFolders = folderResults.compliant.length + folderResults.violations.length;

  if (totalFiles === 0 && totalFolders === 0) return 100;

  // Weighted compliance based on severity
  let totalWeight = 0;
  let compliantWeight = 0;

  // File compliance
  for (const item of fileResults.compliant) {
    const weight = SEVERITY_WEIGHTS[item.severity] || 1;
    totalWeight += weight;
    compliantWeight += weight;
  }

  for (const item of fileResults.violations) {
    const weight = SEVERITY_WEIGHTS[item.severity] || 1;
    totalWeight += weight;
  }

  // Folder compliance (lower weight)
  for (const item of folderResults.compliant) {
    totalWeight += 2;
    compliantWeight += 2;
  }

  for (const item of folderResults.violations) {
    totalWeight += 2;
  }

  if (totalWeight === 0) return 100;

  const compliance = (compliantWeight / totalWeight) * 100;
  return Math.round(compliance * 100) / 100;
}

// Expert compliance grading από TERMINOLOGY_RULES.md
function getComplianceGrade(compliance) {
  if (compliance >= 95) return { grade: '🥇 GOLD', description: 'Excellent Enterprise Standard', color: 'green' };
  if (compliance >= 85) return { grade: '🥈 SILVER', description: 'Good Enterprise Compliance - PASS', color: 'blue' };
  if (compliance >= 75) return { grade: '🥉 BRONZE', description: 'Minimum Acceptable', color: 'orange' };
  return { grade: '❌ FAILED', description: 'Unacceptable για Enterprise', color: 'red' };
}

// Expert critical issues detector
function detectCriticalIssues(results) {
  const criticalIssues = [];

  // Critical naming violations
  const criticalViolations = results.files.violations.filter(v => v.severity === 'critical');
  if (criticalViolations.length > 0) {
    criticalIssues.push({
      type: 'critical_naming',
      count: criticalViolations.length,
      description: 'Critical React component naming violations',
      impact: 'Build failures, inconsistent imports'
    });
  }

  // Broken imports
  if (results.imports.broken.length > 0) {
    criticalIssues.push({
      type: 'broken_imports',
      count: results.imports.broken.length,
      description: 'Broken import references',
      impact: 'Runtime errors, build failures'
    });
  }

  // High severity violations count
  const highViolations = results.files.violations.filter(v => v.severity === 'high').length;
  if (highViolations > 10) {
    criticalIssues.push({
      type: 'high_violations',
      count: highViolations,
      description: 'Too many high-severity naming violations',
      impact: 'Maintenance overhead, developer confusion'
    });
  }

  return criticalIssues;
}

// Main execution
console.log('\n🔍 Starting comprehensive naming compliance validation...');

const scanDirs = ['apps', 'packages', 'scripts', 'docs', 'docs-enterprise'];
const allResults = {
  files: { compliant: [], violations: [], skipped: [] },
  folders: { compliant: [], violations: [], skipped: [] },
  imports: { valid: [], broken: [], inconsistent: [] }
};

for (const dir of scanDirs) {
  if (fs.existsSync(dir)) {
    console.log(`📁 Scanning: ${dir}`);
    scanDirectory(dir, allResults);
  }
}

// Calculate expert compliance metrics
const compliance = calculateCompliance(allResults);
const grade = getComplianceGrade(compliance);
const criticalIssues = detectCriticalIssues(allResults);

// Expert results display
console.log('\n' + '='.repeat(80));
console.log('📊 COMPREHENSIVE NAMING COMPLIANCE REPORT');
console.log('='.repeat(80));

console.log(`\n🎯 OVERALL COMPLIANCE: ${compliance}% ${grade.grade}`);
console.log(`📋 Grade Description: ${grade.description}`);

if (criticalIssues.length > 0) {
  console.log(`\n🚨 CRITICAL ISSUES DETECTED (${criticalIssues.length}):`);
  criticalIssues.forEach(issue => {
    console.log(`   ❌ ${issue.description}: ${issue.count} items`);
    console.log(`      Impact: ${issue.impact}`);
  });
}

console.log(`\n📈 DETAILED METRICS:`);
console.log(`📁 FILES:`);
console.log(`   ✅ Compliant: ${allResults.files.compliant.length}`);
console.log(`   ❌ Violations: ${allResults.files.violations.length}`);
console.log(`   ⏭️ Skipped: ${allResults.files.skipped.length}`);

console.log(`📂 FOLDERS:`);
console.log(`   ✅ Compliant: ${allResults.folders.compliant.length}`);
console.log(`   ❌ Violations: ${allResults.folders.violations.length}`);
console.log(`   ⏭️ Skipped: ${allResults.folders.skipped.length}`);

console.log(`🔗 IMPORTS:`);
console.log(`   ✅ Valid: ${allResults.imports.valid.length}`);
console.log(`   ❌ Broken: ${allResults.imports.broken.length}`);

// Show violations by severity
if (allResults.files.violations.length > 0) {
  console.log(`\n❌ NAMING VIOLATIONS BY SEVERITY:`);

  const violationsBySeverity = {};
  allResults.files.violations.forEach(v => {
    if (!violationsBySeverity[v.severity]) violationsBySeverity[v.severity] = [];
    violationsBySeverity[v.severity].push(v);
  });

  // Sort by severity
  const severityOrder = ['critical', 'high', 'medium', 'low'];
  for (const severity of severityOrder) {
    if (violationsBySeverity[severity]) {
      const violations = violationsBySeverity[severity];
      console.log(`\n🔥 ${severity.toUpperCase()} violations (${violations.length}):`);
      violations.slice(0, 5).forEach(v => {
        console.log(`   ❌ ${v.file}`);
        console.log(`      Expected: ${v.rule}`);
      });
      if (violations.length > 5) {
        console.log(`   ... and ${violations.length - 5} more`);
      }
    }
  }
}

// Show broken imports
if (allResults.imports.broken.length > 0) {
  console.log(`\n🔗 BROKEN IMPORTS (${allResults.imports.broken.length}):`);
  allResults.imports.broken.slice(0, 10).forEach(imp => {
    console.log(`   ❌ ${imp.file}`);
    console.log(`      Broken: ${imp.importPath}`);
  });
  if (allResults.imports.broken.length > 10) {
    console.log(`   ... and ${allResults.imports.broken.length - 10} more`);
  }
}

// Expert recommendations
console.log(`\n💡 EXPERT RECOMMENDATIONS:`);

if (compliance >= 95) {
  console.log(`🎉 Excellent compliance! Consider automation to maintain standards.`);
} else if (compliance >= 85) {
  console.log(`👍 Good compliance! Address critical issues first, then improve to GOLD.`);
} else if (compliance >= 75) {
  console.log(`⚠️ Minimum compliance achieved. Focus on critical and high-severity issues.`);
} else {
  console.log(`🚨 Below enterprise standards. Immediate action required!`);
}

console.log(`\n🔧 EXPERT REMEDIATION PLAN:`);
if (criticalIssues.length > 0) {
  console.log(`1. 🚨 Address critical issues first:`);
  criticalIssues.forEach(issue => {
    console.log(`   • ${issue.description} (${issue.count} items)`);
  });
}

console.log(`2. 🛠️ Run expert migration tools:`);
console.log(`   • React components: node scripts/refactor/tsx-rename-to-pascal.mjs`);
console.log(`   • JS/TS files: node scripts/refactor/rename-js-ts-to-kebab.mjs`);
console.log(`   • Documentation: node scripts/refactor/md-rename-to-kebab.mjs`);
console.log(`   • Complete migration: node scripts/refactor/master-naming-migration.mjs`);

console.log(`\n3. 🔍 Validation cycle:`);
console.log(`   • Run: node scripts/refactor/comprehensive-naming-validator.mjs`);
console.log(`   • Aim for: 95%+ compliance (GOLD standard)`);
console.log(`   • Automate: npm run naming:validate in CI/CD`);

// Write detailed report
const reportData = {
  timestamp: new Date().toISOString(),
  compliance: compliance,
  grade: grade,
  criticalIssues: criticalIssues,
  summary: {
    files: {
      compliant: allResults.files.compliant.length,
      violations: allResults.files.violations.length,
      skipped: allResults.files.skipped.length
    },
    folders: {
      compliant: allResults.folders.compliant.length,
      violations: allResults.folders.violations.length,
      skipped: allResults.folders.skipped.length
    },
    imports: {
      valid: allResults.imports.valid.length,
      broken: allResults.imports.broken.length
    }
  },
  violations: {
    files: allResults.files.violations,
    folders: allResults.folders.violations.slice(0, 50),
    imports: allResults.imports.broken
  },
  expertRules: NAMING_RULES
};

const reportFile = 'comprehensive-naming-report.json';
fs.writeFileSync(reportFile, JSON.stringify(reportData, null, 2));
console.log(`\n📄 Detailed report written: ${reportFile}`);

console.log(`\n📋 BASED ON: TERMINOLOGY_RULES.md expert guidance`);
console.log(`🏆 Comprehensive validation completed!`);

// Exit with appropriate code
const exitCode = criticalIssues.length > 0 ? 2 : (compliance >= 75 ? 0 : 1);
console.log(`\n🚪 Exit code: ${exitCode} (0=ok, 1=warnings, 2=critical)`);
process.exit(exitCode);