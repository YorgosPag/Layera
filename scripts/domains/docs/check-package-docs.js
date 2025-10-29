#!/usr/bin/env node

/**
 * 📦 ENTERPRISE PACKAGE DOCUMENTATION CHECKER
 * Γιώργου Παγώνη - Documentation Domain Tool
 *
 * Ensures all @layera packages have comprehensive documentation:
 * - README.md completeness
 * - JSDoc comments coverage
 * - API documentation generation
 * - Usage examples availability
 * - Export documentation consistency
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Import shared utilities
const { getDirectoryStats } = require('./shared/file-scanner');
const { getMarkdownStats, extractHeaders } = require('./shared/markdown-parser');

class PackageDocumentationChecker {
  constructor() {
    this.stats = {
      packagesScanned: 0,
      packagesWithDocs: 0,
      missingReadmes: 0,
      incompleteReadmes: 0,
      missingJsDocs: 0,
      undocumentedExports: 0,
      totalViolations: 0
    };

    this.violations = [];
    this.packageReports = [];
  }

  /**
   * 🔍 Main package documentation audit
   */
  async checkAllPackages(packagesPath = './packages', options = {}) {
    console.log('📦 ENTERPRISE PACKAGE DOCUMENTATION AUDIT');
    console.log('Analyzing all @layera packages for documentation completeness...\n');

    if (!fs.existsSync(packagesPath)) {
      console.error(`❌ Packages directory not found: ${packagesPath}`);
      process.exit(1);
    }

    const packages = this.discoverPackages(packagesPath);
    this.stats.packagesScanned = packages.length;

    console.log(`📁 Found ${packages.length} packages to analyze\n`);

    for (const pkg of packages) {
      await this.checkPackageDocumentation(pkg);
    }

    this.generateReport();
    return this.packageReports;
  }

  /**
   * 📂 Discover all packages in packages directory
   */
  discoverPackages(packagesPath) {
    const packages = [];

    try {
      const entries = fs.readdirSync(packagesPath, { withFileTypes: true });

      for (const entry of entries) {
        if (entry.isDirectory()) {
          const packagePath = path.join(packagesPath, entry.name);
          const packageJsonPath = path.join(packagePath, 'package.json');

          // Verify it's a valid package
          if (fs.existsSync(packageJsonPath)) {
            try {
              const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
              packages.push({
                name: entry.name,
                fullName: packageJson.name || `@layera/${entry.name}`,
                path: packagePath,
                packageJson: packageJson
              });
            } catch (error) {
              console.warn(`⚠️ Invalid package.json in ${entry.name}:`, error.message);
            }
          }
        }
      }
    } catch (error) {
      console.error(`❌ Error reading packages directory:`, error.message);
    }

    return packages.sort((a, b) => a.name.localeCompare(b.name));
  }

  /**
   * 📄 Check documentation for a single package
   */
  async checkPackageDocumentation(pkg) {
    console.log(`🔍 Analyzing ${pkg.fullName}...`);

    const report = {
      package: pkg,
      violations: [],
      scores: {
        readme: 0,
        jsdoc: 0,
        examples: 0,
        api: 0,
        overall: 0
      },
      files: {}
    };

    // 1. Check README.md
    await this.checkReadmeDocumentation(pkg, report);

    // 2. Check JSDoc coverage
    await this.checkJSDocCoverage(pkg, report);

    // 3. Check API documentation
    await this.checkApiDocumentation(pkg, report);

    // 4. Check usage examples
    await this.checkUsageExamples(pkg, report);

    // Calculate overall score
    const scores = Object.values(report.scores).filter(s => s > 0);
    report.scores.overall = scores.length > 0
      ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
      : 0;

    // Track violations
    this.violations.push(...report.violations);
    this.stats.totalViolations += report.violations.length;

    if (report.violations.length > 0) {
      console.log(`   ⚠️ ${report.violations.length} documentation issues found`);
    } else {
      console.log(`   ✅ Documentation complete`);
      this.stats.packagesWithDocs++;
    }

    this.packageReports.push(report);
  }

  /**
   * 📖 Check README.md completeness
   */
  async checkReadmeDocumentation(pkg, report) {
    const readmePath = path.join(pkg.path, 'README.md');

    if (!fs.existsSync(readmePath)) {
      this.stats.missingReadmes++;
      report.violations.push({
        type: 'missing-readme',
        severity: 'CRITICAL',
        message: 'Missing README.md file',
        file: 'README.md'
      });
      report.scores.readme = 0;
      return;
    }

    try {
      const content = fs.readFileSync(readmePath, 'utf8');
      const stats = getMarkdownStats(content);
      const headers = extractHeaders(content);

      report.files.readme = { stats, headers };

      // Required sections for enterprise packages
      const requiredSections = [
        /^#.*package.*name/i,
        /^##.*installation/i,
        /^##.*usage/i,
        /^##.*api/i,
        /^##.*examples/i
      ];

      const missingSections = [];
      let score = 100;

      for (const [index, pattern] of requiredSections.entries()) {
        const found = headers.some(h => pattern.test(h.text));
        if (!found) {
          const sectionNames = ['Package Title', 'Installation', 'Usage', 'API Reference', 'Examples'];
          missingSections.push(sectionNames[index]);
          score -= 20;
        }
      }

      if (missingSections.length > 0) {
        this.stats.incompleteReadmes++;
        report.violations.push({
          type: 'incomplete-readme',
          severity: 'HIGH',
          message: `Missing sections: ${missingSections.join(', ')}`,
          file: 'README.md',
          suggestions: missingSections
        });
      }

      // Check for minimal content
      if (stats.words < 50) {
        score -= 30;
        report.violations.push({
          type: 'insufficient-content',
          severity: 'MEDIUM',
          message: `README too short: ${stats.words} words (minimum 50)`,
          file: 'README.md'
        });
      }

      report.scores.readme = Math.max(0, score);

    } catch (error) {
      report.violations.push({
        type: 'readme-read-error',
        severity: 'MEDIUM',
        message: `Failed to read README.md: ${error.message}`,
        file: 'README.md'
      });
      report.scores.readme = 0;
    }
  }

  /**
   * 📝 Check JSDoc coverage
   */
  async checkJSDocCoverage(pkg, report) {
    const srcPath = path.join(pkg.path, 'src');

    if (!fs.existsSync(srcPath)) {
      report.violations.push({
        type: 'missing-src',
        severity: 'HIGH',
        message: 'Missing src directory',
        file: 'src/'
      });
      report.scores.jsdoc = 0;
      return;
    }

    try {
      // Find all TypeScript/JavaScript files
      const sourceFiles = this.findSourceFiles(srcPath);
      let totalFunctions = 0;
      let documentedFunctions = 0;

      for (const file of sourceFiles) {
        const result = this.analyzeJSDocInFile(file);
        totalFunctions += result.totalFunctions;
        documentedFunctions += result.documentedFunctions;
      }

      if (totalFunctions === 0) {
        report.scores.jsdoc = 100; // No functions to document
      } else {
        const coverage = Math.round((documentedFunctions / totalFunctions) * 100);
        report.scores.jsdoc = coverage;

        if (coverage < 80) {
          this.stats.missingJsDocs++;
          report.violations.push({
            type: 'low-jsdoc-coverage',
            severity: coverage < 50 ? 'HIGH' : 'MEDIUM',
            message: `JSDoc coverage: ${coverage}% (${documentedFunctions}/${totalFunctions} functions)`,
            file: 'src/',
            coverage: coverage
          });
        }
      }

    } catch (error) {
      report.violations.push({
        type: 'jsdoc-analysis-error',
        severity: 'MEDIUM',
        message: `JSDoc analysis failed: ${error.message}`,
        file: 'src/'
      });
      report.scores.jsdoc = 0;
    }
  }

  /**
   * 🔍 Find source files in directory
   */
  findSourceFiles(dirPath) {
    const files = [];

    function scanDir(dir) {
      try {
        const entries = fs.readdirSync(dir, { withFileTypes: true });

        for (const entry of entries) {
          const fullPath = path.join(dir, entry.name);

          if (entry.isDirectory()) {
            scanDir(fullPath);
          } else if (entry.isFile() && /\.(ts|tsx|js|jsx)$/.test(entry.name)) {
            files.push(fullPath);
          }
        }
      } catch (error) {
        console.warn(`⚠️ Could not scan ${dir}:`, error.message);
      }
    }

    scanDir(dirPath);
    return files;
  }

  /**
   * 📊 Analyze JSDoc in a file
   */
  analyzeJSDocInFile(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');

      // Simple regex patterns for function detection
      const functionPatterns = [
        /(?:export\s+)?(?:async\s+)?function\s+\w+/g,
        /(?:export\s+)?const\s+\w+\s*=\s*(?:async\s+)?\(/g,
        /(?:export\s+)?\w+\s*:\s*(?:async\s+)?\(/g, // Object methods
        /(?:public|private|protected)\s+(?:async\s+)?\w+\s*\(/g // Class methods
      ];

      const jsdocPattern = /\/\*\*[\s\S]*?\*\//g;

      // Count functions
      let totalFunctions = 0;
      functionPatterns.forEach(pattern => {
        const matches = content.match(pattern) || [];
        totalFunctions += matches.length;
      });

      // Count JSDoc comments
      const jsdocComments = content.match(jsdocPattern) || [];

      // Estimate documented functions (heuristic approach)
      const documentedFunctions = Math.min(jsdocComments.length, totalFunctions);

      return { totalFunctions, documentedFunctions };

    } catch (error) {
      console.warn(`⚠️ Could not analyze ${filePath}:`, error.message);
      return { totalFunctions: 0, documentedFunctions: 0 };
    }
  }

  /**
   * 📋 Check API documentation
   */
  async checkApiDocumentation(pkg, report) {
    const indexPath = path.join(pkg.path, 'src', 'index.ts');

    if (!fs.existsSync(indexPath)) {
      report.violations.push({
        type: 'missing-index',
        severity: 'CRITICAL',
        message: 'Missing src/index.ts file',
        file: 'src/index.ts'
      });
      report.scores.api = 0;
      return;
    }

    try {
      const content = fs.readFileSync(indexPath, 'utf8');

      // Count exports
      const exportPatterns = [
        /export\s+\{[^}]+\}/g,
        /export\s+(?:default\s+)?(?:class|function|const|let|var|interface|type|enum)\s+\w+/g,
        /export\s+\*\s+from/g
      ];

      let totalExports = 0;
      exportPatterns.forEach(pattern => {
        const matches = content.match(pattern) || [];
        totalExports += matches.length;
      });

      if (totalExports === 0) {
        report.violations.push({
          type: 'no-exports',
          severity: 'HIGH',
          message: 'No exports found in index.ts',
          file: 'src/index.ts'
        });
        report.scores.api = 0;
      } else {
        // Score based on export presence and README API section
        let score = 70; // Base score for having exports

        if (report.files.readme?.headers?.some(h => /api/i.test(h.text))) {
          score += 30; // Bonus for API documentation section
        }

        report.scores.api = score;
      }

    } catch (error) {
      report.violations.push({
        type: 'api-analysis-error',
        severity: 'MEDIUM',
        message: `API analysis failed: ${error.message}`,
        file: 'src/index.ts'
      });
      report.scores.api = 0;
    }
  }

  /**
   * 💡 Check usage examples
   */
  async checkUsageExamples(pkg, report) {
    let score = 0;
    let hasExamples = false;

    // Check for examples in README
    if (report.files.readme) {
      const content = fs.readFileSync(path.join(pkg.path, 'README.md'), 'utf8');
      const codeBlocks = content.match(/```[\s\S]*?```/g) || [];

      if (codeBlocks.length > 0) {
        score += 40;
        hasExamples = true;
      }

      if (content.includes('import') && content.includes(pkg.fullName)) {
        score += 30; // Bonus for showing actual package imports
      }
    }

    // Check for examples directory
    const examplesPath = path.join(pkg.path, 'examples');
    if (fs.existsSync(examplesPath)) {
      score += 30;
      hasExamples = true;
    }

    // Check for storybook stories
    const storiesPath = path.join(pkg.path, 'stories');
    if (fs.existsSync(storiesPath)) {
      score += 20;
      hasExamples = true;
    }

    if (!hasExamples) {
      report.violations.push({
        type: 'missing-examples',
        severity: 'MEDIUM',
        message: 'No usage examples found (README code blocks, examples/, or stories/)',
        file: 'examples'
      });
    }

    report.scores.examples = Math.min(100, score);
  }

  /**
   * 📊 Generate comprehensive report
   */
  generateReport() {
    const averageScore = this.packageReports.length > 0
      ? Math.round(this.packageReports.reduce((sum, pkg) => sum + pkg.scores.overall, 0) / this.packageReports.length)
      : 0;

    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        ...this.stats,
        averageScore: averageScore,
        packagesAnalyzed: this.packageReports.length
      },
      packages: this.packageReports,
      complianceLevel: this.getComplianceLevel(averageScore)
    };

    // Save detailed JSON report
    const reportPath = path.join(process.cwd(), 'PACKAGE_DOCS_VALIDATION_REPORT.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    // Print summary
    this.printSummary(report);

    return report;
  }

  /**
   * 🖨️ Print validation summary
   */
  printSummary(report) {
    console.log('\n📦 ENTERPRISE PACKAGE DOCUMENTATION REPORT');
    console.log('================================================\n');

    console.log('📊 STATISTICS:');
    console.log(`├─ Packages analyzed: ${this.stats.packagesScanned}`);
    console.log(`├─ Fully documented: ${this.stats.packagesWithDocs}`);
    console.log(`├─ Missing READMEs: ${this.stats.missingReadmes}`);
    console.log(`├─ Incomplete READMEs: ${this.stats.incompleteReadmes}`);
    console.log(`├─ Low JSDoc coverage: ${this.stats.missingJsDocs}`);
    console.log(`└─ Total violations: ${this.stats.totalViolations}\n`);

    console.log('🏆 PACKAGE SCORES:');
    this.packageReports
      .sort((a, b) => b.scores.overall - a.scores.overall)
      .slice(0, 10)
      .forEach(pkg => {
        const status = pkg.scores.overall >= 80 ? '✅' :
                      pkg.scores.overall >= 60 ? '⚠️' : '❌';
        console.log(`${status} ${pkg.package.fullName}: ${pkg.scores.overall}%`);
      });

    if (this.packageReports.length > 10) {
      console.log(`   ... and ${this.packageReports.length - 10} more packages`);
    }

    console.log(`\n📈 AVERAGE DOCUMENTATION SCORE: ${report.summary.averageScore}%`);
    console.log(report.summary.averageScore >= 80
      ? '✅ EXCELLENT - Enterprise documentation standards met!'
      : report.summary.averageScore >= 60
        ? '⚠️ GOOD - Minor documentation improvements needed'
        : '❌ NEEDS WORK - Significant documentation gaps found');

    console.log(`\n📄 Detailed report saved: PACKAGE_DOCS_VALIDATION_REPORT.json`);
  }

  /**
   * 📈 Get compliance level
   */
  getComplianceLevel(score) {
    if (score >= 90) return 'EXCELLENT';
    if (score >= 75) return 'GOOD';
    if (score >= 60) return 'FAIR';
    return 'NEEDS_WORK';
  }
}

// CLI execution
if (require.main === module) {
  const args = process.argv.slice(2);
  const options = {
    path: args.find(arg => arg.startsWith('--path='))?.split('=')[1] || './packages',
    verbose: args.includes('--verbose'),
    packageFilter: args.find(arg => arg.startsWith('--package='))?.split('=')[1]
  };

  const checker = new PackageDocumentationChecker();

  checker.checkAllPackages(options.path, options)
    .then(() => {
      const exitCode = checker.stats.totalViolations > 0 ? 1 : 0;
      process.exit(exitCode);
    })
    .catch(error => {
      console.error('❌ Package documentation check failed:', error.message);
      process.exit(1);
    });
}

module.exports = PackageDocumentationChecker;