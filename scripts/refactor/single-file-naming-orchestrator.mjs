/**
 * 🛡️ ΑΣΦΑΛΗΣ Single-File Naming Orchestrator
 *
 * Βάσει TERMINOLOGY_RULES.md ChatGPT Expert Guidance
 * ΕΛΕΓΧΕΙ ΚΑΘΕ ΑΡΧΕΙΟ ΞΕΧΩΡΙΣΤΑ για maximum safety
 * Δημιουργεί λεπτομερή JSON reports με όλα τα ευρήματα
 *
 * Source: ChatGPT expert conversation στο TERMINOLOGY_RULES.md
 * CRITICAL: Created after naming script failures που έσπασαν την εφαρμογή
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('🛡️ ΑΣΦΑΛΗΣ SINGLE-FILE NAMING ORCHESTRATOR');
console.log('📋 Based on TERMINOLOGY_RULES.md ChatGPT expert guidance');
console.log('🚨 SAFETY-FIRST: One file at a time validation');

// Expert naming rules από ChatGPT
const NAMING_RULES = {
  scripts: {
    pattern: /^[a-z0-9]+(-[a-z0-9]+)*\.(js|mjs|ts)$/,
    description: 'Scripts → kebab-case.{js,mjs,ts}',
    severity: 'high',
    expectedAction: 'rename to kebab-case'
  },

  tsJs: {
    pattern: /^[a-z0-9]+(-[a-z0-9]+)*\.ts$/,
    description: 'TS/JS modules → kebab-case.ts',
    excludePatterns: [/\.test\./, /\.spec\./, /\.d\.ts$/],
    severity: 'high',
    expectedAction: 'rename to kebab-case'
  },

  react: {
    pattern: /^[A-Z][A-Za-z0-9]*\.tsx$/,
    description: 'React components → PascalCase.tsx',
    excludePatterns: [/\.test\./, /\.spec\./, /\.stories\./],
    severity: 'critical',
    expectedAction: 'rename to PascalCase and ensure named default export'
  },

  tests: {
    pattern: /^[a-z0-9]+(-[a-z0-9]+)*\.(test|spec)\.(ts|tsx|js|jsx)$/,
    description: 'Tests → kebab-case.{test,spec}.{ts,tsx,js,jsx}',
    severity: 'medium',
    expectedAction: 'rename to kebab-case with .test/.spec suffix'
  },

  docs: {
    pattern: /^[a-z0-9]+(-[a-z0-9]+)*\.md$/,
    description: 'Documentation → kebab-case.md',
    canonical: ['README.md', 'CHANGELOG.md', 'CONTRIBUTING.md', 'CODE_OF_CONDUCT.md', 'LICENSE.md', 'SECURITY.md'],
    severity: 'low',
    expectedAction: 'rename to kebab-case (preserve canonical files)'
  }
};

// Expert file analyzer
function analyzeFile(filePath) {
  const fileName = path.basename(filePath);
  const ext = path.extname(fileName);
  const dirName = path.dirname(filePath);
  const baseWithoutExt = path.basename(fileName, ext);

  const result = {
    filePath,
    fileName,
    extension: ext,
    directory: dirName,
    baseWithoutExt,
    analysis: {
      category: null,
      rule: null,
      compliant: false,
      violation: null,
      severity: 'none',
      expectedAction: null,
      riskLevel: 'safe',
      canAutoFix: false
    },
    imports: {
      count: 0,
      relative: [],
      broken: [],
      hasImportIssues: false
    },
    exports: {
      hasDefaultExport: false,
      hasNamedExport: false,
      isAnonymousDefault: false,
      exportAnalysis: null
    },
    recommendations: []
  };

  // Skip certain files
  if (fileName === 'index.ts' || fileName === 'index.js' || fileName === 'index.tsx') {
    result.analysis.category = 'index';
    result.analysis.compliant = true;
    result.analysis.riskLevel = 'safe';
    result.recommendations.push('Index files are excluded from naming rules (expert advice)');
    return result;
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
      result.analysis.category = 'test-story';
      result.analysis.compliant = true;
      result.analysis.riskLevel = 'safe';
      result.recommendations.push('Test/story files excluded from rename rules');
      return result;
    }
    category = 'react';
    rule = NAMING_RULES.react;
  } else if (fileName.includes('.test') || fileName.includes('.spec')) {
    category = 'tests';
    rule = NAMING_RULES.tests;
  } else if (ext === '.md') {
    if (NAMING_RULES.docs.canonical.includes(fileName)) {
      result.analysis.category = 'canonical-docs';
      result.analysis.compliant = true;
      result.analysis.riskLevel = 'safe';
      result.recommendations.push('Canonical GitHub file - preserve as-is');
      return result;
    }
    category = 'docs';
    rule = NAMING_RULES.docs;
  } else {
    result.analysis.category = 'uncovered';
    result.analysis.compliant = true;
    result.analysis.riskLevel = 'safe';
    result.recommendations.push('File type not covered by naming rules');
    return result;
  }

  // Apply rule analysis
  result.analysis.category = category;
  result.analysis.rule = rule.description;
  result.analysis.severity = rule.severity;
  result.analysis.expectedAction = rule.expectedAction;

  if (rule.pattern.test(fileName)) {
    result.analysis.compliant = true;
    result.analysis.riskLevel = 'safe';
    result.recommendations.push('✅ File already follows naming conventions');
  } else {
    result.analysis.compliant = false;
    result.analysis.violation = {
      current: fileName,
      expected: rule.pattern.toString(),
      description: rule.description
    };

    // Risk assessment
    if (rule.severity === 'critical') {
      result.analysis.riskLevel = 'high';
      result.analysis.canAutoFix = true;
      result.recommendations.push('🚨 CRITICAL: React component needs PascalCase naming');
      result.recommendations.push('📝 Action: Run tsx-rename-to-pascal.mjs on this file');
    } else if (rule.severity === 'high') {
      result.analysis.riskLevel = 'medium';
      result.analysis.canAutoFix = true;
      result.recommendations.push('⚠️ HIGH: File needs kebab-case naming');
      result.recommendations.push('📝 Action: Run rename-js-ts-to-kebab.mjs on this file');
    } else {
      result.analysis.riskLevel = 'low';
      result.analysis.canAutoFix = true;
      result.recommendations.push('💡 MEDIUM/LOW: File naming improvement needed');
    }
  }

  // Analyze imports and exports if it's a code file
  if (['.ts', '.tsx', '.js', '.jsx'].includes(ext)) {
    analyzeImportsExports(filePath, result);
  }

  return result;
}

// Expert imports/exports analyzer
function analyzeImportsExports(filePath, result) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');

    // Analyze imports
    const importLines = content.match(/^import.*from\s+['"][^'"]*['"];?$/gm) || [];
    result.imports.count = importLines.length;

    for (const importLine of importLines) {
      const match = importLine.match(/from\s+['"]([^'"]*)['"]/);
      if (match) {
        const importPath = match[1];

        if (importPath.startsWith('.')) {
          result.imports.relative.push({
            path: importPath,
            line: importLine.trim()
          });

          // Check if import exists
          const resolvedPath = path.resolve(path.dirname(filePath), importPath);
          const possibleExtensions = ['', '.ts', '.tsx', '.js', '.jsx'];
          let exists = false;

          for (const ext of possibleExtensions) {
            if (fs.existsSync(resolvedPath + ext)) {
              exists = true;
              break;
            }
          }

          if (!exists && !fs.existsSync(resolvedPath + '/index.ts') && !fs.existsSync(resolvedPath + '/index.tsx')) {
            result.imports.broken.push({
              path: importPath,
              line: importLine.trim(),
              resolvedPath: resolvedPath
            });
            result.imports.hasImportIssues = true;
          }
        }
      }
    }

    // Analyze exports
    const hasDefaultExport = /export\s+default\s+/.test(content) || /export\s*{\s*\w+\s+as\s+default\s*}/.test(content);
    const hasNamedExport = /export\s+(const|function|class|interface|type)/.test(content) || /export\s*{/.test(content);

    result.exports.hasDefaultExport = hasDefaultExport;
    result.exports.hasNamedExport = hasNamedExport;

    // Check for anonymous default exports
    if (hasDefaultExport) {
      const anonymousPatterns = [
        /export\s+default\s+(function\s*\(|class\s*{|\(\s*\w*\s*\)\s*=>|async\s*\(\s*\w*\s*\)\s*=>)/,
        /export\s+default\s+\(/
      ];

      result.exports.isAnonymousDefault = anonymousPatterns.some(pattern => pattern.test(content));

      if (result.exports.isAnonymousDefault) {
        result.exports.exportAnalysis = 'Anonymous default export detected';
        result.recommendations.push('🔧 Consider naming anonymous default export');
        result.recommendations.push('📝 Action: Run tsx-name-anonymous-defaults.mjs');
      }
    }

  } catch (error) {
    result.imports.hasImportIssues = true;
    result.recommendations.push(`❌ Could not analyze file content: ${error.message}`);
  }
}

// Expert risk assessment
function assessOverallRisk(analysisResult) {
  const risks = [];

  if (analysisResult.analysis.riskLevel === 'high') {
    risks.push('HIGH: Critical naming violation');
  }

  if (analysisResult.imports.hasImportIssues) {
    risks.push('MEDIUM: Import issues detected');
  }

  if (analysisResult.exports.isAnonymousDefault) {
    risks.push('LOW: Anonymous default export');
  }

  if (analysisResult.analysis.riskLevel === 'medium') {
    risks.push('MEDIUM: Naming convention violation');
  }

  const overallRisk = risks.length === 0 ? 'SAFE' :
                     risks.some(r => r.startsWith('HIGH')) ? 'HIGH' :
                     risks.some(r => r.startsWith('MEDIUM')) ? 'MEDIUM' : 'LOW';

  return {
    level: overallRisk,
    issues: risks,
    safeToProcess: overallRisk !== 'HIGH' || analysisResult.analysis.canAutoFix
  };
}

// Expert single file orchestrator
function orchestrateSingleFile(targetFile) {
  console.log(`\n🔍 ANALYZING SINGLE FILE: ${targetFile}`);

  if (!fs.existsSync(targetFile)) {
    const error = {
      error: 'FILE_NOT_FOUND',
      message: `File does not exist: ${targetFile}`,
      timestamp: new Date().toISOString()
    };
    console.error(`❌ File not found: ${targetFile}`);
    return error;
  }

  const result = {
    timestamp: new Date().toISOString(),
    targetFile: targetFile,
    analysis: null,
    riskAssessment: null,
    actionPlan: [],
    safetyChecks: {
      fileExists: true,
      isReadable: true,
      hasBackup: false,
      riskLevel: 'unknown'
    },
    recommendations: [],
    nextSteps: []
  };

  try {
    // Analyze the file
    console.log('  📊 Running naming analysis...');
    result.analysis = analyzeFile(targetFile);

    // Assess risks
    console.log('  🛡️ Assessing risks...');
    result.riskAssessment = assessOverallRisk(result.analysis);
    result.safetyChecks.riskLevel = result.riskAssessment.level;

    // Generate action plan
    console.log('  📋 Generating action plan...');
    if (result.analysis.analysis.compliant) {
      result.actionPlan.push({
        action: 'NO_ACTION_NEEDED',
        description: 'File already follows naming conventions',
        risk: 'NONE',
        automated: false
      });
    } else {
      // Specific actions based on file type
      if (result.analysis.analysis.category === 'react') {
        result.actionPlan.push({
          action: 'REACT_PASCAL_CASE',
          description: 'Rename React component to PascalCase',
          script: 'tsx-rename-to-pascal.mjs',
          risk: 'MEDIUM',
          automated: true,
          command: `node scripts/refactor/tsx-rename-to-pascal.mjs --single-file "${targetFile}"`
        });

        if (result.analysis.exports.isAnonymousDefault) {
          result.actionPlan.push({
            action: 'NAME_ANONYMOUS_EXPORT',
            description: 'Name anonymous default export',
            script: 'tsx-name-anonymous-defaults.mjs',
            risk: 'LOW',
            automated: true,
            command: `node scripts/refactor/tsx-name-anonymous-defaults.mjs --single-file "${targetFile}"`
          });
        }
      } else if (result.analysis.analysis.category === 'tsJs') {
        result.actionPlan.push({
          action: 'TS_JS_KEBAB_CASE',
          description: 'Rename TS/JS file to kebab-case',
          script: 'rename-js-ts-to-kebab.mjs',
          risk: 'MEDIUM',
          automated: true,
          command: `node scripts/refactor/rename-js-ts-to-kebab.mjs --single-file "${targetFile}"`
        });
      } else if (result.analysis.analysis.category === 'docs') {
        result.actionPlan.push({
          action: 'DOCS_KEBAB_CASE',
          description: 'Rename documentation to kebab-case',
          script: 'md-rename-to-kebab.mjs',
          risk: 'LOW',
          automated: true,
          command: `node scripts/refactor/md-rename-to-kebab.mjs --single-file "${targetFile}"`
        });
      }
    }

    // Handle import issues
    if (result.analysis.imports.hasImportIssues) {
      result.actionPlan.push({
        action: 'FIX_IMPORTS',
        description: 'Fix broken import references',
        script: 'update-imports-from-map-pascal.mjs',
        risk: 'HIGH',
        automated: false,
        manual: true,
        note: 'May require manual review of import paths'
      });
    }

    // Generate recommendations
    if (result.riskAssessment.level === 'SAFE') {
      result.recommendations.push('✅ File is safe and follows naming conventions');
      result.nextSteps.push('No action required - file already compliant');
    } else if (result.riskAssessment.safeToProcess) {
      result.recommendations.push('🔧 File can be safely auto-fixed with available scripts');
      result.nextSteps.push('Execute the action plan scripts in order');
      result.nextSteps.push('Validate results after each step');
    } else {
      result.recommendations.push('🚨 File requires careful manual review before processing');
      result.nextSteps.push('Manual inspection recommended');
      result.nextSteps.push('Create backup before any changes');
    }

    // Safety recommendations
    result.recommendations.push('💾 Always commit changes to Git before running scripts');
    result.recommendations.push('🔍 Test build after any naming changes');

    console.log(`  ✅ Analysis completed - Risk: ${result.riskAssessment.level}`);

  } catch (error) {
    result.error = {
      type: 'ANALYSIS_ERROR',
      message: error.message,
      stack: error.stack
    };
    console.error(`  ❌ Analysis failed: ${error.message}`);
  }

  return result;
}

// Main function
function main() {
  if (process.argv.length < 3) {
    console.log('\n❌ Usage: node single-file-naming-orchestrator.mjs <file-path>');
    console.log('\nExamples:');
    console.log('  node scripts/refactor/single-file-naming-orchestrator.mjs "apps/layera-geoalert/src/App.tsx"');
    console.log('  node scripts/refactor/single-file-naming-orchestrator.mjs "packages/auth-bridge/src/utils/helper.ts"');
    process.exit(1);
  }

  const targetFile = process.argv[2];
  const result = orchestrateSingleFile(targetFile);

  // Generate JSON report
  const reportFileName = `single-file-analysis-${Date.now()}.json`;
  const reportPath = path.join(process.cwd(), reportFileName);

  try {
    fs.writeFileSync(reportPath, JSON.stringify(result, null, 2));
    console.log(`\n📄 Detailed JSON report: ${reportFileName}`);
  } catch (error) {
    console.error(`❌ Could not write report: ${error.message}`);
  }

  // Display summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 SINGLE FILE ANALYSIS SUMMARY');
  console.log('='.repeat(60));

  console.log(`📁 File: ${targetFile}`);
  console.log(`🎯 Category: ${result.analysis?.analysis?.category || 'unknown'}`);
  console.log(`✅ Compliant: ${result.analysis?.analysis?.compliant ? 'YES' : 'NO'}`);
  console.log(`🛡️ Risk Level: ${result.riskAssessment?.level || 'unknown'}`);
  console.log(`🔧 Actions Needed: ${result.actionPlan?.length || 0}`);

  if (result.actionPlan?.length > 0) {
    console.log('\n📋 ACTION PLAN:');
    result.actionPlan.forEach((action, i) => {
      console.log(`  ${i + 1}. ${action.description} (Risk: ${action.risk})`);
      if (action.command) {
        console.log(`     Command: ${action.command}`);
      }
    });
  }

  console.log('\n💡 RECOMMENDATIONS:');
  result.recommendations?.forEach(rec => {
    console.log(`  • ${rec}`);
  });

  console.log('\n🔄 NEXT STEPS:');
  result.nextSteps?.forEach(step => {
    console.log(`  • ${step}`);
  });

  console.log(`\n📋 Based on: TERMINOLOGY_RULES.md expert guidance`);
  console.log(`🛡️ Safety-first single file analysis completed!`);

  // Exit with appropriate code
  const exitCode = result.error ? 2 :
                   result.riskAssessment?.level === 'HIGH' ? 1 : 0;
  process.exit(exitCode);
}

// Export for use in other scripts
export { orchestrateSingleFile, analyzeFile };

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}