/**
 * 🔍 Expert Script: Single File Report Viewer
 *
 * Βάσει TERMINOLOGY_RULES.md ChatGPT Expert Guidance
 * Εμφανίζει τα αποτελέσματα του single-file-naming-orchestrator
 * User-friendly visualization των JSON reports
 *
 * Source: ChatGPT expert conversation στο TERMINOLOGY_RULES.md
 */

import fs from 'node:fs';
import path from 'node:path';

console.log('🔍 SINGLE FILE REPORT VIEWER');
console.log('📋 Based on TERMINOLOGY_RULES.md ChatGPT expert guidance');

function formatRiskLevel(level) {
  switch (level) {
    case 'SAFE': return '✅ SAFE';
    case 'LOW': return '💡 LOW';
    case 'MEDIUM': return '⚠️ MEDIUM';
    case 'HIGH': return '🚨 HIGH';
    default: return `❓ ${level}`;
  }
}

function formatCompliance(compliant) {
  return compliant ? '✅ COMPLIANT' : '❌ NEEDS FIXES';
}

function viewReport(reportFile) {
  if (!fs.existsSync(reportFile)) {
    console.error(`❌ Report file not found: ${reportFile}`);
    process.exit(1);
  }

  try {
    const report = JSON.parse(fs.readFileSync(reportFile, 'utf8'));

    console.log('\n' + '='.repeat(80));
    console.log('📊 SINGLE FILE NAMING ANALYSIS REPORT');
    console.log('='.repeat(80));

    console.log(`📁 File: ${report.targetFile}`);
    console.log(`🕒 Analyzed: ${new Date(report.timestamp).toLocaleString()}`);
    console.log(`🎯 Category: ${report.analysis?.analysis?.category || 'unknown'}`);
    console.log(`📏 Rule: ${report.analysis?.analysis?.rule || 'none'}`);
    console.log(`${formatCompliance(report.analysis?.analysis?.compliant)}`);
    console.log(`${formatRiskLevel(report.riskAssessment?.level)}`);

    if (report.analysis?.analysis?.violation) {
      console.log('\n❌ NAMING VIOLATION DETAILS:');
      console.log(`   Current: ${report.analysis.analysis.violation.current}`);
      console.log(`   Expected: ${report.analysis.analysis.violation.description}`);
      console.log(`   Severity: ${report.analysis.analysis.severity.toUpperCase()}`);
    }

    if (report.analysis?.imports?.count > 0) {
      console.log(`\n🔗 IMPORTS ANALYSIS:`);
      console.log(`   Total imports: ${report.analysis.imports.count}`);
      console.log(`   Relative imports: ${report.analysis.imports.relative.length}`);
      if (report.analysis.imports.broken.length > 0) {
        console.log(`   ❌ Broken imports: ${report.analysis.imports.broken.length}`);
        report.analysis.imports.broken.forEach(broken => {
          console.log(`      • ${broken.path} → ${broken.resolvedPath}`);
        });
      }
    }

    if (report.analysis?.exports) {
      console.log(`\n📤 EXPORTS ANALYSIS:`);
      console.log(`   Has default export: ${report.analysis.exports.hasDefaultExport ? 'YES' : 'NO'}`);
      console.log(`   Has named exports: ${report.analysis.exports.hasNamedExport ? 'YES' : 'NO'}`);
      if (report.analysis.exports.isAnonymousDefault) {
        console.log(`   ⚠️ Anonymous default export detected`);
      }
    }

    if (report.actionPlan?.length > 0) {
      console.log(`\n📋 ACTION PLAN (${report.actionPlan.length} actions):`);
      report.actionPlan.forEach((action, i) => {
        console.log(`\n   ${i + 1}. ${action.description}`);
        console.log(`      Risk: ${formatRiskLevel(action.risk)}`);
        console.log(`      Automated: ${action.automated ? 'YES' : 'NO'}`);
        if (action.command) {
          console.log(`      Command: ${action.command}`);
        }
        if (action.script) {
          console.log(`      Script: ${action.script}`);
        }
        if (action.manual) {
          console.log(`      ⚠️ Manual review required`);
        }
        if (action.note) {
          console.log(`      Note: ${action.note}`);
        }
      });
    }

    if (report.riskAssessment?.issues?.length > 0) {
      console.log(`\n🛡️ RISK ASSESSMENT:`);
      console.log(`   Overall Risk: ${formatRiskLevel(report.riskAssessment.level)}`);
      console.log(`   Safe to Process: ${report.riskAssessment.safeToProcess ? 'YES' : 'NO'}`);
      console.log(`   Issues Found:`);
      report.riskAssessment.issues.forEach(issue => {
        console.log(`      • ${issue}`);
      });
    }

    if (report.recommendations?.length > 0) {
      console.log(`\n💡 RECOMMENDATIONS:`);
      report.recommendations.forEach(rec => {
        console.log(`   • ${rec}`);
      });
    }

    if (report.nextSteps?.length > 0) {
      console.log(`\n🔄 NEXT STEPS:`);
      report.nextSteps.forEach(step => {
        console.log(`   • ${step}`);
      });
    }

    if (report.error) {
      console.log(`\n❌ ERROR:`);
      console.log(`   Type: ${report.error.type}`);
      console.log(`   Message: ${report.error.message}`);
    }

    console.log(`\n📋 Report based on: TERMINOLOGY_RULES.md expert guidance`);
    console.log(`🛡️ Safety-first analysis approach`);

  } catch (error) {
    console.error(`❌ Could not read report: ${error.message}`);
    process.exit(1);
  }
}

function main() {
  if (process.argv.length < 3) {
    console.log('\n❌ Usage: node view-single-file-report.mjs <report-file.json>');
    console.log('\nExamples:');
    console.log('  node scripts/refactor/view-single-file-report.mjs single-file-analysis-1698675123456.json');

    // Look for recent reports
    const files = fs.readdirSync('.').filter(f => f.startsWith('single-file-analysis-') && f.endsWith('.json'));
    if (files.length > 0) {
      console.log('\n📄 Recent reports found:');
      files.sort().reverse().slice(0, 5).forEach(f => {
        const stats = fs.statSync(f);
        console.log(`   ${f} (${stats.mtime.toLocaleString()})`);
      });
    }
    process.exit(1);
  }

  const reportFile = process.argv[2];
  viewReport(reportFile);
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}