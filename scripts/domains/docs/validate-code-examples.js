#!/usr/bin/env node

/**
 * 🔍 ENTERPRISE CODE EXAMPLES VALIDATOR
 * Γιώργου Παγώνη - Documentation Domain Tool
 *
 * Validates all code examples in markdown files to ensure they:
 * - Are syntactically correct (TypeScript/JavaScript)
 * - Have valid imports that exist in actual packages
 * - Use only approved LEGO Systems
 * - Follow enterprise coding standards
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Import shared utilities
const { findMarkdownFiles, createBackup } = require('./shared/file-scanner');
const { extractCodeBlocks, extractImports } = require('./shared/markdown-parser');
const { LEGO_IMPORTS, checkForbiddenPatterns } = require('./shared/validation-rules');

class CodeExamplesValidator {
  constructor() {
    this.stats = {
      filesScanned: 0,
      codeBlocksFound: 0,
      codeBlocksValid: 0,
      syntaxErrors: 0,
      importErrors: 0,
      legoViolations: 0,
      totalViolations: 0
    };

    this.violations = [];
    this.validationResults = [];
  }

  /**
   * 🔍 Main validation orchestrator
   */
  async validateAllCodeExamples(rootPath = '.', options = {}) {
    console.log('🔍 ENTERPRISE CODE EXAMPLES VALIDATION');
    console.log('Scanning all documentation for code quality...\n');

    const files = findMarkdownFiles(rootPath, {
      excludeNodeModules: true,
      excludeBackups: true,
      includePatterns: ['**/*.md']
    });

    this.stats.filesScanned = files.length;
    console.log(`📁 Found ${files.length} markdown files\n`);

    for (const file of files) {
      await this.validateFileCodeExamples(file.path);
    }

    this.generateReport();
    return this.validationResults;
  }

  /**
   * 📄 Validate code examples in a single file
   */
  async validateFileCodeExamples(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const codeBlocks = extractCodeBlocks(content);

      if (codeBlocks.length === 0) return;

      this.stats.codeBlocksFound += codeBlocks.length;
      let fileHasViolations = false;

      for (const block of codeBlocks) {
        const result = await this.validateCodeBlock(block, filePath);
        if (result.violations.length > 0) {
          fileHasViolations = true;
          this.violations.push(...result.violations);
        }
      }

      if (fileHasViolations) {
        const relativeFile = path.relative(process.cwd(), filePath);
        console.log(`🔍 ${relativeFile}: ${codeBlocks.length} code blocks analyzed`);
      }

    } catch (error) {
      console.error(`❌ Error processing ${filePath}:`, error.message);
    }
  }

  /**
   * 🧩 Validate individual code block
   */
  async validateCodeBlock(codeBlock, filePath) {
    const violations = [];
    let isValid = true;

    // Skip non-code languages
    if (!['typescript', 'javascript', 'ts', 'js', 'tsx', 'jsx'].includes(codeBlock.language)) {
      return { isValid: true, violations: [] };
    }

    // 1. Syntax validation
    const syntaxResult = this.validateSyntax(codeBlock);
    if (!syntaxResult.isValid) {
      isValid = false;
      violations.push({
        type: 'syntax-error',
        severity: 'CRITICAL',
        message: syntaxResult.error,
        file: filePath,
        line: codeBlock.lineStart,
        codeBlock: codeBlock
      });
      this.stats.syntaxErrors++;
    }

    // 2. Import validation
    const importResult = this.validateImports(codeBlock);
    if (!importResult.isValid) {
      isValid = false;
      violations.push(...importResult.violations.map(v => ({
        ...v,
        file: filePath,
        line: codeBlock.lineStart
      })));
      this.stats.importErrors++;
    }

    // 3. LEGO Systems compliance
    const legoResult = this.validateLegoCompliance(codeBlock);
    if (!legoResult.isValid) {
      isValid = false;
      violations.push(...legoResult.violations.map(v => ({
        ...v,
        file: filePath,
        line: codeBlock.lineStart
      })));
      this.stats.legoViolations++;
    }

    if (isValid) {
      this.stats.codeBlocksValid++;
    }

    this.stats.totalViolations += violations.length;

    return { isValid, violations };
  }

  /**
   * ✅ Validate TypeScript/JavaScript syntax
   */
  validateSyntax(codeBlock) {
    try {
      // Create temporary file for syntax checking
      const tempDir = path.join(process.cwd(), 'temp');
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
      }

      const extension = ['tsx', 'jsx'].includes(codeBlock.language) ? '.tsx' :
                       ['ts', 'typescript'].includes(codeBlock.language) ? '.ts' : '.js';
      const tempFile = path.join(tempDir, `validation_${Date.now()}${extension}`);

      // Add common imports if missing
      let codeToValidate = codeBlock.code;
      if (!codeToValidate.includes('import React') && extension.includes('x')) {
        codeToValidate = `import React from 'react';\n${codeToValidate}`;
      }

      fs.writeFileSync(tempFile, codeToValidate);

      // Use TypeScript compiler API for syntax checking
      if (extension === '.ts' || extension === '.tsx') {
        try {
          execSync(`npx tsc --noEmit --skipLibCheck ${tempFile}`, {
            stdio: 'pipe',
            cwd: process.cwd()
          });
        } catch (error) {
          // Clean up temp file
          if (fs.existsSync(tempFile)) fs.unlinkSync(tempFile);

          return {
            isValid: false,
            error: `TypeScript compilation error: ${error.stdout?.toString() || error.message}`
          };
        }
      }

      // Clean up temp file
      if (fs.existsSync(tempFile)) fs.unlinkSync(tempFile);

      return { isValid: true };

    } catch (error) {
      return {
        isValid: false,
        error: `Syntax validation failed: ${error.message}`
      };
    }
  }

  /**
   * 📦 Validate import statements
   */
  validateImports(codeBlock) {
    const imports = extractImports(codeBlock.code);
    const violations = [];

    for (const importStatement of imports) {
      // Check if it's a @layera package import
      if (importStatement.module.startsWith('@layera/')) {
        const packageName = importStatement.module.replace('@layera/', '');
        const packagePath = path.join(process.cwd(), 'packages', packageName);

        // Verify package exists
        if (!fs.existsSync(packagePath)) {
          violations.push({
            type: 'invalid-import',
            severity: 'HIGH',
            message: `Package @layera/${packageName} does not exist`,
            importStatement: importStatement.statement
          });
        } else {
          // Verify package has proper index.ts
          const indexPath = path.join(packagePath, 'src', 'index.ts');
          if (!fs.existsSync(indexPath)) {
            violations.push({
              type: 'missing-index',
              severity: 'MEDIUM',
              message: `Package @layera/${packageName} missing src/index.ts`,
              importStatement: importStatement.statement
            });
          }
        }
      }

      // Check for deprecated imports
      if (importStatement.module.includes('LayeraIcons')) {
        violations.push({
          type: 'deprecated-import',
          severity: 'CRITICAL',
          message: 'LayeraIcons is deprecated. Use @layera/icons instead',
          importStatement: importStatement.statement
        });
      }
    }

    return {
      isValid: violations.length === 0,
      violations
    };
  }

  /**
   * 🧩 Validate LEGO Systems compliance
   */
  validateLegoCompliance(codeBlock) {
    const violations = [];

    // Check for forbidden patterns
    const forbiddenViolations = checkForbiddenPatterns(codeBlock.code);
    violations.push(...forbiddenViolations.map(v => ({
      type: 'lego-violation',
      severity: v.severity,
      message: `LEGO violation: ${v.description}`,
      pattern: v.match,
      suggestion: v.replacement
    })));

    // Check for missing LEGO imports when using components
    const hasComponentUsage = /\<[A-Z]\w*/.test(codeBlock.code);
    const hasLegoImports = Object.keys(LEGO_IMPORTS).some(system =>
      codeBlock.code.includes(`@layera/${system}`)
    );

    if (hasComponentUsage && !hasLegoImports) {
      violations.push({
        type: 'missing-lego-imports',
        severity: 'HIGH',
        message: 'Components used without proper @layera imports',
        suggestion: 'Add appropriate @layera package imports'
      });
    }

    return {
      isValid: violations.length === 0,
      violations
    };
  }

  /**
   * 📊 Generate comprehensive report
   */
  generateReport() {
    const successRate = this.stats.codeBlocksFound > 0
      ? Math.round((this.stats.codeBlocksValid / this.stats.codeBlocksFound) * 100)
      : 100;

    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        ...this.stats,
        successRate: successRate
      },
      violations: this.violations,
      complianceLevel: this.getComplianceLevel(successRate)
    };

    // Save detailed JSON report
    const reportPath = path.join(process.cwd(), 'CODE_EXAMPLES_VALIDATION_REPORT.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    // Print summary
    this.printSummary(report);

    return report;
  }

  /**
   * 🖨️ Print validation summary
   */
  printSummary(report) {
    console.log('\n🔍 ENTERPRISE CODE EXAMPLES VALIDATION REPORT');
    console.log('==================================================\n');

    console.log('📊 STATISTICS:');
    console.log(`├─ Files scanned: ${this.stats.filesScanned}`);
    console.log(`├─ Code blocks found: ${this.stats.codeBlocksFound}`);
    console.log(`├─ Valid code blocks: ${this.stats.codeBlocksValid}`);
    console.log(`└─ Success rate: ${report.summary.successRate}%\n`);

    console.log('🚨 VIOLATIONS BREAKDOWN:');
    console.log(`├─ Syntax errors: ${this.stats.syntaxErrors}`);
    console.log(`├─ Import errors: ${this.stats.importErrors}`);
    console.log(`├─ LEGO violations: ${this.stats.legoViolations}`);
    console.log(`└─ Total violations: ${this.stats.totalViolations}\n`);

    // Show top violations
    if (this.violations.length > 0) {
      console.log('🔍 TOP VIOLATIONS:');
      this.violations.slice(0, 5).forEach((violation, index) => {
        console.log(`${index + 1}. [${violation.severity}] ${violation.message}`);
        if (violation.suggestion) {
          console.log(`   Suggestion: ${violation.suggestion}`);
        }
      });
      console.log();
    }

    console.log(`🏆 CODE QUALITY SCORE: ${report.summary.successRate}%`);
    console.log(report.summary.successRate >= 95
      ? '✅ EXCELLENT - Enterprise ready!'
      : report.summary.successRate >= 80
        ? '⚠️ GOOD - Minor improvements needed'
        : '❌ NEEDS WORK - Major issues found');

    console.log(`\n📄 Detailed report saved: CODE_EXAMPLES_VALIDATION_REPORT.json`);
  }

  /**
   * 📈 Get compliance level
   */
  getComplianceLevel(successRate) {
    if (successRate >= 95) return 'EXCELLENT';
    if (successRate >= 80) return 'GOOD';
    if (successRate >= 60) return 'FAIR';
    return 'NEEDS_WORK';
  }
}

// CLI execution
if (require.main === module) {
  const args = process.argv.slice(2);
  const options = {
    path: args.find(arg => arg.startsWith('--path='))?.split('=')[1] || '.',
    verbose: args.includes('--verbose'),
    fixable: args.includes('--fix-imports')
  };

  const validator = new CodeExamplesValidator();

  validator.validateAllCodeExamples(options.path, options)
    .then(() => {
      const exitCode = validator.stats.totalViolations > 0 ? 1 : 0;
      process.exit(exitCode);
    })
    .catch(error => {
      console.error('❌ Validation failed:', error.message);
      process.exit(1);
    });
}

module.exports = CodeExamplesValidator;