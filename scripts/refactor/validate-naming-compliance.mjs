`/**
` * 🔧 Expert Script: Naming Compliance Validator
` *
` * Βάσει TERMINOLOGY_RULES.md ChatGPT Expert Guidance
` * Ελέγχει compliance με expert naming standards
` * Παράγει λεπτομερή αναφορά συμμόρφωσης
` *
` * Source: ChatGPT expert conversation στο TERMINOLOGY_RULES.md
` */
`
`import fs from 'node:fs';
`import path from 'node:path';
`import { fileURLToPath } from 'node:url';
`
`const __dirname = path.dirname(fileURLToPath(import.meta.url));
`
`console.log('🔍 EXPERT NAMING COMPLIANCE VALIDATOR');
`console.log('📋 Based on TERMINOLOGY_RULES.md ChatGPT expert guidance');
`
`// Expert naming rules από ChatGPT
`const rules = {
`  // Scripts should be kebab-case
`  scripts: {
`    pattern: /^[a-z0-9]+(-[a-z0-9]+)*\.(js|mjs|ts)$/,
`    description: 'Scripts should be kebab-case.{js,mjs,ts}'
`  },
`
`  // TypeScript/JavaScript (non-React) should be kebab-case
`  tsJs: {
`    pattern: /^[a-z0-9]+(-[a-z0-9]+)*\.ts$/,
`    description: 'TS/JS modules should be kebab-case.ts',
`    excludePatterns: [/\.test\./, /\.spec\./]
`  },
`
`  // React components should be PascalCase
`  react: {
`    pattern: /^[A-Z][A-Za-z0-9]*\.tsx$/,
`    description: 'React components should be PascalCase.tsx',
`    excludePatterns: [/\.test\./, /\.spec\./, /\.stories\./]
`  },
`
`  // Test files should be kebab-case.test/spec
`  tests: {
`    pattern: /^[a-z0-9]+(-[a-z0-9]+)*\.(test|spec)\.(ts|tsx|js|jsx)$/,
`    description: 'Test files should be kebab-case.{test,spec}.{ts,tsx,js,jsx}'
`  },
`
`  // Documentation files (non-canonical)
`  docs: {
`    pattern: /^[a-z0-9]+(-[a-z0-9]+)*\.md$/,
`    description: 'Documentation should be kebab-case.md',
`    canonical: ['README.md', 'CHANGELOG.md', 'CONTRIBUTING.md', 'CODE_OF_CONDUCT.md', 'LICENSE.md', 'SECURITY.md']
`  }
`};
`
`// Expert file scanner
`function scanDirectory(dir, results = { compliant: [], violations: [], skipped: [] }) {
`  try {
`    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
`      if (entry.name.startsWith('.') || entry.name === 'node_modules') continue;
`
`      const fullPath = path.join(dir, entry.name);
`      const relativePath = path.relative(process.cwd(), fullPath);
`
`      if (entry.isDirectory()) {
`        scanDirectory(fullPath, results);
`      } else {
`        checkFile(relativePath, results);
`      }
`    }
`  } catch (error) {
`    console.warn(`⚠️ Could not scan ${dir}: ${error.message}`);
`  }
`
`  return results;
`}
`
`// Expert file checker
`function checkFile(filePath, results) {
`  const fileName = path.basename(filePath);
`  const ext = path.extname(fileName);
`  const dirName = path.dirname(filePath);
`
`  // Skip certain files/directories
`  if (fileName === 'index.ts' || fileName === 'index.js' || fileName === 'index.tsx') {
`    results.skipped.push({ file: filePath, reason: 'index files excluded (expert advice)' });
`    return;
`  }
`
`  // Determine category and apply expert rules
`  let category, rule;
`
`  if (dirName.includes('scripts') && ['.js', '.mjs', '.ts'].includes(ext)) {
`    category = 'scripts';
`    rule = rules.scripts;
`  } else if (ext === '.ts' && !fileName.includes('.test') && !fileName.includes('.spec')) {
`    category = 'tsJs';
`    rule = rules.tsJs;
`  } else if (ext === '.tsx') {
`    if (fileName.includes('.test') || fileName.includes('.spec') || fileName.includes('.stories')) {
`      results.skipped.push({ file: filePath, reason: 'test/story files' });
`      return;
`    }
`    category = 'react';
`    rule = rules.react;
`  } else if (fileName.includes('.test') || fileName.includes('.spec')) {
`    category = 'tests';
`    rule = rules.tests;
`  } else if (ext === '.md') {
`    // Check if canonical file
`    if (rules.docs.canonical.includes(fileName)) {
`      results.skipped.push({ file: filePath, reason: 'canonical GitHub file (expert advice)' });
`      return;
`    }
`    category = 'docs';
`    rule = rules.docs;
`  } else {
`    results.skipped.push({ file: filePath, reason: 'not covered by naming rules' });
`    return;
`  }
`
`  // Apply rule
`  if (rule.pattern.test(fileName)) {
`    results.compliant.push({ file: filePath, category, rule: rule.description });
`  } else {
`    results.violations.push({ file: filePath, category, rule: rule.description, expected: rule.pattern.toString() });
`  }
`}
`
`// Expert compliance calculator
`function calculateCompliance(results) {
`  const total = results.compliant.length + results.violations.length;
`  if (total === 0) return 100;
`
`  const compliance = (results.compliant.length / total) * 100;
`  return Math.round(compliance * 100) / 100;
`}
`
`// Expert compliance grading από TERMINOLOGY_RULES.md
`function getComplianceGrade(compliance) {
`  if (compliance >= 95) return { grade: '🥇 GOLD', description: 'Excellent Enterprise Standard' };
`  if (compliance >= 85) return { grade: '🥈 SILVER', description: 'Good Enterprise Compliance - PASS' };
`  if (compliance >= 75) return { grade: '🥉 BRONZE', description: 'Minimum Acceptable' };
`  return { grade: '❌ FAILED', description: 'Unacceptable για Enterprise' };
`}
`
`// Main execution
`console.log('\\n🔍 Scanning codebase for naming compliance...');
`
`const scanDirs = ['apps', 'packages', 'scripts', 'docs', 'docs-enterprise'];
`const allResults = { compliant: [], violations: [], skipped: [] };
`
`for (const dir of scanDirs) {
`  if (fs.existsSync(dir)) {
`    console.log(\`📁 Scanning: \${dir}\`);
`    scanDirectory(dir, allResults);
`  }
`}
`
`// Calculate expert compliance metrics
`const compliance = calculateCompliance(allResults);
`const grade = getComplianceGrade(compliance);
`
`// Expert results display
`console.log('\\n' + '='.repeat(60));
`console.log('📊 EXPERT NAMING COMPLIANCE REPORT');
`console.log('='.repeat(60));
`
`console.log(\`\\n🎯 OVERALL COMPLIANCE: \${compliance}% \${grade.grade}\`);
`console.log(\`📋 Grade Description: \${grade.description}\`);
`
`console.log(\`\\n📈 DETAILED METRICS:\`);
`console.log(\`✅ Compliant files: \${allResults.compliant.length}\`);
`console.log(\`❌ Violations: \${allResults.violations.length}\`);
`console.log(\`⏭️ Skipped: \${allResults.skipped.length}\`);
`console.log(\`📊 Total evaluated: \${allResults.compliant.length + allResults.violations.length}\`);
`
`// Show violations if any
`if (allResults.violations.length > 0) {
`  console.log(\`\\n❌ NAMING VIOLATIONS (\${allResults.violations.length}):\`);
`
`  // Group by category
`  const violationsByCategory = {};
`  allResults.violations.forEach(v => {
`    if (!violationsByCategory[v.category]) violationsByCategory[v.category] = [];
`    violationsByCategory[v.category].push(v);
`  });
`
`  for (const [category, violations] of Object.entries(violationsByCategory)) {
`    console.log(\`\\n📂 \${category.toUpperCase()} violations (\${violations.length}):\`);
`    violations.slice(0, 10).forEach(v => { // Show max 10 per category
`      console.log(\`   ❌ \${v.file}\`);
`      console.log(\`      Expected: \${v.rule}\`);
`    });
`    if (violations.length > 10) {
`      console.log(\`   ... and \${violations.length - 10} more\`);
`    }
`  }
`}
`
`// Expert recommendations
`console.log(\`\\n💡 EXPERT RECOMMENDATIONS:\`);
`
`if (compliance >= 95) {
`  console.log(\`🎉 Excellent compliance! Consider automation to maintain standards.\`);
`} else if (compliance >= 85) {
`  console.log(\`👍 Good compliance! Address remaining violations for GOLD standard.\`);
`} else if (compliance >= 75) {
`  console.log(\`⚠️ Minimum compliance achieved. Focus on systematic improvements.\`);
`} else {
`  console.log(\`🚨 Below enterprise standards. Run master-naming-migration.mjs\`);
`}
`
`console.log(\`\\n🔧 EXPERT TOOLS TO FIX VIOLATIONS:\`);
`console.log(\`• JS/TS files: node scripts/refactor/rename-js-ts-to-kebab.mjs\`);
`console.log(\`• React components: node scripts/refactor/tsx-rename-to-pascal.mjs\`);
`console.log(\`• Anonymous exports: node scripts/refactor/tsx-name-anonymous-defaults.mjs\`);
`console.log(\`• Complete migration: node scripts/refactor/master-naming-migration.mjs\`);
`
`console.log(\`\\n📋 BASED ON: TERMINOLOGY_RULES.md expert guidance\`);
`console.log(\`🏆 Expert validation completed!\`);
`
`// Write detailed report
`const reportData = {
`  timestamp: new Date().toISOString(),
`  compliance: compliance,
`  grade: grade,
`  summary: {
`    compliant: allResults.compliant.length,
`    violations: allResults.violations.length,
`    skipped: allResults.skipped.length
`  },
`  violations: allResults.violations,
`  compliant: allResults.compliant.slice(0, 50), // Limit for file size
`  expertRules: rules
`};
`
`const reportFile = 'naming-compliance-report.json';
`fs.writeFileSync(reportFile, JSON.stringify(reportData, null, 2));
`console.log(\`\\n📄 Detailed report written: \${reportFile}\`);
`
`// Exit with appropriate code
`process.exit(compliance >= 75 ? 0 : 1);