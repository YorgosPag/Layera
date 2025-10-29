#!/usr/bin/env node

/**
 * 🛡️ ENTERPRISE DOCUMENTATION VALIDATION SYSTEM
 * Γιώργου Παγώνη - Single Source of Truth για Documentation
 *
 * Σκοπός: Εξάλειψη hardcoded values και deprecated patterns από .md αρχεία
 * Στόχος: 100% compliance με LEGO Systems σε όλη την τεκμηρίωση
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 🎯 ENTERPRISE STANDARDS - Single Sources of Truth
const LEGO_IMPORTS = {
  // Tier 1: Κρίσιμα Enterprise Systems
  buttons: "import { Button, IconButton, PrimaryButton, SecondaryButton } from '@layera/buttons';",
  icons: "import { HomeIcon, UserIcon, SettingsIcon, WorkIcon, TrashIcon, SearchIcon, EditIcon } from '@layera/icons';",
  layout: "import { AppShell, LayeraHeader, PageContainer, Flex, FlexColumn, Box } from '@layera/layout';",
  cards: "import { DashboardCard, BaseCard, InfoCard } from '@layera/cards';",
  constants: "import { SPACING_SCALE, BORDER_RADIUS_SCALE, Z_INDEX } from '@layera/constants';",

  // Tier 2: High-Frequency Systems
  typography: "import { Text, Heading } from '@layera/typography';",
  forms: "import { FormField, FormSection, Input, Select } from '@layera/forms';",
  tolgee: "import { useLayeraTranslation } from '@layera/tolgee';",

  // Design Tokens - ΜΟΝΑΔΙΚΗ ΠΗΓΗ ΑΛΗΘΕΙΑΣ
  tokens: "import '@layera/tokens/dist/tokens.css';"
};

// 🚫 FORBIDDEN PATTERNS - Αυτά πρέπει να εξαλειφθούν
const FORBIDDEN_PATTERNS = [
  // Hardcoded colors
  {
    pattern: /#[0-9a-fA-F]{3,6}\b/g,
    replacement: "var(--la-color-primary)",
    description: "Hardcoded hex colors → design tokens",
    severity: "CRITICAL"
  },

  // Custom styled components
  {
    pattern: /styled\.\w+`[^`]*`/g,
    replacement: "// ✅ Use @layera/components instead",
    description: "styled-components → LEGO components",
    severity: "CRITICAL"
  },

  // Custom component definitions
  {
    pattern: /const\s+\w*(?:Button|Card|Icon|Form)\w*\s*=\s*\(/g,
    replacement: "// ✅ Import from @layera packages",
    description: "Custom components → LEGO imports",
    severity: "HIGH"
  },

  // Direct React imports (should use LEGO hooks)
  {
    pattern: /import React,?\s*\{[^}]*\}\s*from\s*['"]react['"]/g,
    replacement: LEGO_IMPORTS.tolgee + "\n// ✅ Use LEGO hooks and utilities",
    description: "Direct React imports → LEGO abstractions",
    severity: "MEDIUM"
  },

  // Custom CSS classes
  {
    pattern: /className=['"][^'"]*custom[^'"]*['"]/g,
    replacement: 'className="la-component"',
    description: "Custom CSS classes → design system classes",
    severity: "MEDIUM"
  },

  // Magic numbers in styles
  {
    pattern: /padding:\s*['"]?\d+px['"]?/g,
    replacement: "padding: var(--la-space-md)",
    description: "Magic padding values → spacing scale",
    severity: "MEDIUM"
  },

  {
    pattern: /margin:\s*['"]?\d+px['"]?/g,
    replacement: "margin: var(--la-space-md)",
    description: "Magic margin values → spacing scale",
    severity: "MEDIUM"
  },

  // Inline styles without design tokens
  {
    pattern: /style=\{\{\s*[^}]*:\s*['"][^'"]*px['"][^}]*\}\}/g,
    replacement: "style={{ padding: 'var(--la-space-md)' }}",
    description: "Inline pixel values → design tokens",
    severity: "LOW"
  }
];

// 📋 EDUCATIONAL REPLACEMENTS - Διδακτικές βελτιώσεις
const EDUCATIONAL_PATTERNS = [
  {
    pattern: /\/\/ ❌ ΛΑΘΟΣ[\s\S]*?(?=\/\/ ✅|$)/g,
    replacement: `// ❌ ΛΑΘΟΣ - Deprecated Pattern
// Αυτό το pattern δεν πρέπει να χρησιμοποιείται πλέον

// ✅ ΣΩΣΤΟ - LEGO System`,
    description: "Enhanced educational examples"
  }
];

// 🔍 VALIDATION RULES
class DocumentationValidator {
  constructor() {
    this.violations = [];
    this.stats = {
      filesScanned: 0,
      violationsFound: 0,
      violationsFixed: 0,
      criticalViolations: 0,
      highViolations: 0,
      mediumViolations: 0,
      lowViolations: 0
    };
  }

  scanFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      this.stats.filesScanned++;

      const violations = this.findViolations(filePath, content);
      this.violations.push(...violations);

      return violations;
    } catch (error) {
      console.error(`❌ Error scanning ${filePath}:`, error.message);
      return [];
    }
  }

  findViolations(filePath, content) {
    const violations = [];

    FORBIDDEN_PATTERNS.forEach((pattern, index) => {
      const matches = content.match(pattern.pattern) || [];

      matches.forEach(match => {
        violations.push({
          file: filePath,
          pattern: pattern.description,
          match: match,
          severity: pattern.severity,
          replacement: pattern.replacement,
          line: this.getLineNumber(content, match)
        });

        this.stats.violationsFound++;
        this.stats[`${pattern.severity.toLowerCase()}Violations`]++;
      });
    });

    return violations;
  }

  getLineNumber(content, match) {
    const index = content.indexOf(match);
    if (index === -1) return 0;

    return content.substring(0, index).split('\n').length;
  }

  fixViolations(filePath, dryRun = false) {
    try {
      let content = fs.readFileSync(filePath, 'utf8');
      let modified = false;

      FORBIDDEN_PATTERNS.forEach(pattern => {
        if (pattern.pattern.test(content)) {
          if (!dryRun) {
            content = content.replace(pattern.pattern, pattern.replacement);
            modified = true;
            this.stats.violationsFixed++;
          }
        }
      });

      // Apply educational improvements
      EDUCATIONAL_PATTERNS.forEach(pattern => {
        if (pattern.pattern.test(content)) {
          if (!dryRun) {
            content = content.replace(pattern.pattern, pattern.replacement);
            modified = true;
          }
        }
      });

      if (modified && !dryRun) {
        // Backup original file
        const backupPath = `${filePath}.backup.${Date.now()}`;
        fs.copyFileSync(filePath, backupPath);

        // Write fixed content
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Fixed: ${filePath}`);
        console.log(`📄 Backup: ${backupPath}`);
      }

      return modified;
    } catch (error) {
      console.error(`❌ Error fixing ${filePath}:`, error.message);
      return false;
    }
  }

  generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      summary: this.stats,
      violations: this.violations,
      recommendations: this.generateRecommendations()
    };

    return report;
  }

  generateRecommendations() {
    const recommendations = [];

    if (this.stats.criticalViolations > 0) {
      recommendations.push({
        priority: "URGENT",
        action: "Αμεση αντικατάσταση hardcoded values με design tokens",
        impact: "Σπάει το Single Source of Truth principle"
      });
    }

    if (this.stats.highViolations > 0) {
      recommendations.push({
        priority: "HIGH",
        action: "Migration σε LEGO components από custom implementations",
        impact: "Technical debt και inconsistency"
      });
    }

    if (this.stats.mediumViolations > 0) {
      recommendations.push({
        priority: "MEDIUM",
        action: "Standardization της τεκμηρίωσης με enterprise patterns",
        impact: "Developer confusion και μη συμβατά examples"
      });
    }

    return recommendations;
  }

  printReport() {
    console.log('\n🛡️ ENTERPRISE DOCUMENTATION VALIDATION REPORT');
    console.log('='.repeat(50));

    console.log(`\n📊 STATISTICS:`);
    console.log(`├─ Files scanned: ${this.stats.filesScanned}`);
    console.log(`├─ Violations found: ${this.stats.violationsFound}`);
    console.log(`├─ Violations fixed: ${this.stats.violationsFixed}`);
    console.log(`└─ Success rate: ${this.stats.violationsFound > 0 ?
      Math.round((this.stats.violationsFixed / this.stats.violationsFound) * 100) : 100}%`);

    console.log(`\n🚨 SEVERITY BREAKDOWN:`);
    console.log(`├─ CRITICAL: ${this.stats.criticalViolations}`);
    console.log(`├─ HIGH: ${this.stats.highViolations}`);
    console.log(`├─ MEDIUM: ${this.stats.mediumViolations}`);
    console.log(`└─ LOW: ${this.stats.lowViolations}`);

    if (this.violations.length > 0) {
      console.log(`\n🔍 TOP VIOLATIONS:`);
      const topViolations = this.violations
        .slice(0, 10)
        .forEach((violation, index) => {
          console.log(`${index + 1}. [${violation.severity}] ${violation.file}:${violation.line}`);
          console.log(`   Pattern: ${violation.pattern}`);
          console.log(`   Found: ${violation.match.substring(0, 80)}...`);
          console.log('');
        });
    }

    const recommendations = this.generateRecommendations();
    if (recommendations.length > 0) {
      console.log(`\n💡 RECOMMENDATIONS:`);
      recommendations.forEach((rec, index) => {
        console.log(`${index + 1}. [${rec.priority}] ${rec.action}`);
        console.log(`   Impact: ${rec.impact}\n`);
      });
    }

    // ENTERPRISE COMPLIANCE SCORE
    const totalPossibleScore = this.stats.filesScanned * 100;
    const penaltyPoints = (this.stats.criticalViolations * 25) +
                         (this.stats.highViolations * 15) +
                         (this.stats.mediumViolations * 10) +
                         (this.stats.lowViolations * 5);
    const complianceScore = Math.max(0, totalPossibleScore - penaltyPoints);
    const compliancePercent = totalPossibleScore > 0 ?
      Math.round((complianceScore / totalPossibleScore) * 100) : 100;

    console.log(`\n🏆 ENTERPRISE COMPLIANCE SCORE: ${compliancePercent}%`);

    if (compliancePercent >= 95) {
      console.log('✅ GOLD STANDARD - Enterprise ready!');
    } else if (compliancePercent >= 85) {
      console.log('🥈 SILVER STANDARD - Minor improvements needed');
    } else if (compliancePercent >= 70) {
      console.log('🥉 BRONZE STANDARD - Significant work required');
    } else {
      console.log('❌ BELOW STANDARD - Critical issues must be resolved');
    }
  }
}

// 🚀 MAIN EXECUTION
function main() {
  const args = process.argv.slice(2);
  const options = {
    dryRun: args.includes('--dry-run') && !args.includes('--fix'), // Fix mode overrides dry-run
    fix: args.includes('--fix'),
    path: args.find(arg => arg.startsWith('--path='))?.split('=')[1] || '.',
    excludeNodeModules: !args.includes('--include-node-modules'),
    excludeBackups: !args.includes('--include-backups')
  };

  console.log('🛡️ ENTERPRISE DOCUMENTATION VALIDATION SYSTEM');
  console.log('Γιώργου Παγώνη - Single Source of Truth Enforcement\n');

  if (options.dryRun) {
    console.log('🔍 DRY RUN MODE - No files will be modified\n');
  } else if (options.fix) {
    console.log('🛠️ FIX MODE - Files will be modified automatically\n');
  }

  const validator = new DocumentationValidator();

  // Find all markdown files - Windows compatible approach
  const files = [];

  function findMarkdownFiles(dir, basePath = '') {
    try {
      const entries = fs.readdirSync(dir, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        const relativePath = basePath ? path.join(basePath, entry.name) : entry.name;

        // Skip excluded directories
        if (entry.isDirectory()) {
          if (options.excludeNodeModules && entry.name === 'node_modules') continue;
          if (entry.name === 'tools') continue;
          if (entry.name === '.git') continue;

          findMarkdownFiles(fullPath, relativePath);
        } else if (entry.isFile() && entry.name.endsWith('.md')) {
          // Skip backup files
          if (options.excludeBackups && entry.name.includes('.backup.')) continue;

          files.push(fullPath);
        }
      }
    } catch (error) {
      console.warn(`⚠️  Could not scan ${dir}:`, error.message);
    }
  }

  try {
    findMarkdownFiles(options.path);
    console.log(`📁 Found ${files.length} markdown files\n`);

    // Scan all files
    files.forEach(file => {
      const violations = validator.scanFile(file);

      if (violations.length > 0) {
        console.log(`🔍 ${file}: ${violations.length} violations`);

        if (options.fix) {
          validator.fixViolations(file, false); // Always fix when --fix is specified
        }
      }
    });

    // Generate and save report
    const report = validator.generateReport();
    const reportPath = path.join(process.cwd(), 'DOCUMENTATION_VALIDATION_REPORT.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    // Print summary
    validator.printReport();

    console.log(`\n📄 Detailed report saved: ${reportPath}`);

    // Exit with appropriate code
    const exitCode = validator.stats.criticalViolations > 0 ? 1 : 0;
    process.exit(exitCode);

  } catch (error) {
    console.error('❌ Execution failed:', error.message);
    process.exit(1);
  }
}

// Help message
if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log(`
🛡️ ENTERPRISE DOCUMENTATION VALIDATION SYSTEM
Usage: node fix-docs-violations.js [options]

Options:
  --dry-run              Scan only, don't fix files
  --fix                  Fix violations automatically
  --path=<path>          Target directory (default: current)
  --include-node-modules Include node_modules in scan
  --include-backups      Include backup files in scan
  --help, -h             Show this help message

Examples:
  node fix-docs-violations.js --dry-run
  node fix-docs-violations.js --fix --path=./docs
  node fix-docs-violations.js --fix --dry-run

🎯 Enterprise Standards Enforced:
  ✅ LEGO Systems compliance (100% @layera imports)
  ✅ Design tokens (no hardcoded colors/spacing)
  ✅ Single Source of Truth (no custom components)
  ✅ Educational accuracy (correct examples only)
`);
  process.exit(0);
}

// Run the validator
main();