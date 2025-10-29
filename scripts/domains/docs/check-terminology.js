#!/usr/bin/env node

/**
 * 📝 ENTERPRISE TERMINOLOGY CONSISTENCY CHECKER
 * Γιώργου Παγώνη - Documentation Domain Tool
 *
 * Ensures consistent terminology across all documentation:
 * - Standardized naming conventions (GeoAlert vs Geo Alert)
 * - Prohibited terms detection (TODO, FIXME, etc.)
 * - Required enterprise terms presence
 * - Style guide compliance
 * - Brand consistency enforcement
 */

const fs = require('fs');
const path = require('path');

// Import shared utilities
const { findMarkdownFiles } = require('./shared/file-scanner');
const { TERMINOLOGY_RULES } = require('./shared/validation-rules');

class TerminologyChecker {
  constructor() {
    this.stats = {
      filesScanned: 0,
      totalWords: 0,
      inconsistencies: 0,
      prohibitedTerms: 0,
      missingTerms: 0,
      styleViolations: 0,
      totalViolations: 0
    };

    this.violations = [];
    this.terminologyReport = {};
    this.fileReports = [];
  }

  /**
   * 🔍 Main terminology validation orchestrator
   */
  async checkAllTerminology(rootPath = '.', options = {}) {
    console.log('📝 ENTERPRISE TERMINOLOGY CONSISTENCY CHECK');
    console.log('Analyzing documentation for terminology standards...\n');

    const files = findMarkdownFiles(rootPath, {
      excludeNodeModules: true,
      excludeBackups: true
    });

    this.stats.filesScanned = files.length;
    console.log(`📁 Found ${files.length} markdown files\n`);

    // Load terminology rules
    this.loadTerminologyRules(options);

    for (const file of files) {
      await this.checkFileTerminology(file.path);
    }

    this.generateReport();
    return this.fileReports;
  }

  /**
   * 📋 Load and merge terminology rules
   */
  loadTerminologyRules(options) {
    // Default rules from validation-rules.js plus custom options
    this.rules = {
      consistent: {
        ...TERMINOLOGY_RULES.consistent,
        ...(options.customConsistent || {})
      },
      prohibited: [
        ...TERMINOLOGY_RULES.prohibited,
        ...(options.customProhibited || [])
      ],
      required: [
        ...TERMINOLOGY_RULES.requiredTerms,
        ...(options.customRequired || [])
      ],
      styleGuide: {
        // Technical terms standardization
        'React': ['react', 'REACT', 'React.js'],
        'TypeScript': ['typescript', 'Typescript', 'TS', 'ts'],
        'JavaScript': ['javascript', 'Javascript', 'JS', 'js'],
        'CSS': ['css', 'Css'],
        'HTML': ['html', 'Html'],
        'API': ['api', 'Api'],
        'JSON': ['json', 'Json'],
        'URL': ['url', 'Url'],
        'HTTP': ['http', 'Http'],
        'HTTPS': ['https', 'Https'],
        'Git': ['git', 'GIT'],
        'GitHub': ['github', 'Github', 'GITHUB'],
        'npm': ['NPM', 'Npm'],
        'Node.js': ['nodejs', 'NodeJS', 'node'],
        ...(options.customStyleGuide || {})
      }
    };
  }

  /**
   * 📄 Check terminology in a single file
   */
  async checkFileTerminology(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const relativeFile = path.relative(process.cwd(), filePath);

      const fileReport = {
        file: relativeFile,
        wordCount: this.countWords(content),
        violations: [],
        terminologyUsage: {}
      };

      this.stats.totalWords += fileReport.wordCount;

      // 1. Check for inconsistent terminology
      this.checkConsistentTerminology(content, fileReport, filePath);

      // 2. Check for prohibited terms
      this.checkProhibitedTerms(content, fileReport, filePath);

      // 3. Check for required terms (in appropriate files)
      this.checkRequiredTerms(content, fileReport, filePath);

      // 4. Check style guide compliance
      this.checkStyleGuideCompliance(content, fileReport, filePath);

      // 5. Check for proper capitalization
      this.checkCapitalization(content, fileReport, filePath);

      this.stats.totalViolations += fileReport.violations.length;

      if (fileReport.violations.length > 0) {
        console.log(`📝 ${relativeFile}: ${fileReport.violations.length} terminology issues`);
      }

      this.fileReports.push(fileReport);
      this.violations.push(...fileReport.violations);

    } catch (error) {
      console.error(`❌ Error processing ${filePath}:`, error.message);
    }
  }

  /**
   * 📊 Count words in content
   */
  countWords(content) {
    // Remove code blocks and inline code
    const textOnly = content
      .replace(/```[\s\S]*?```/g, '') // Remove code blocks
      .replace(/`[^`]+`/g, '') // Remove inline code
      .replace(/!\[.*?\]\(.*?\)/g, '') // Remove images
      .replace(/\[.*?\]\(.*?\)/g, '') // Remove links
      .replace(/#+ /g, '') // Remove headers
      .replace(/[^\w\s]/g, ' ') // Replace punctuation with spaces
      .trim();

    return textOnly.split(/\s+/).filter(word => word.length > 0).length;
  }

  /**
   * 🔄 Check for consistent terminology
   */
  checkConsistentTerminology(content, fileReport, filePath) {
    Object.entries(this.rules.consistent).forEach(([preferred, alternatives]) => {
      // Track usage of preferred term
      const preferredMatches = this.findTermMatches(content, preferred);
      if (preferredMatches.length > 0) {
        fileReport.terminologyUsage[preferred] = preferredMatches.length;
      }

      // Check for alternative (inconsistent) usage
      alternatives.forEach(alternative => {
        const matches = this.findTermMatches(content, alternative);
        if (matches.length > 0) {
          this.stats.inconsistencies++;
          fileReport.violations.push({
            type: 'inconsistent-terminology',
            severity: 'MEDIUM',
            term: alternative,
            preferred: preferred,
            occurrences: matches.length,
            message: `Use "${preferred}" instead of "${alternative}"`,
            positions: matches
          });
        }
      });
    });
  }

  /**
   * 🚫 Check for prohibited terms
   */
  checkProhibitedTerms(content, fileReport, filePath) {
    this.rules.prohibited.forEach(term => {
      const matches = this.findTermMatches(content, term);
      if (matches.length > 0) {
        this.stats.prohibitedTerms++;
        fileReport.violations.push({
          type: 'prohibited-term',
          severity: this.getProhibitedTermSeverity(term),
          term: term,
          occurrences: matches.length,
          message: `Prohibited term "${term}" found - should be removed or replaced`,
          positions: matches
        });
      }
    });
  }

  /**
   * ✅ Check for required terms
   */
  checkRequiredTerms(content, fileReport, filePath) {
    // Only check certain files for required terms
    const shouldCheckRequired = this.shouldCheckRequiredTerms(filePath);
    if (!shouldCheckRequired) return;

    this.rules.required.forEach(term => {
      const matches = this.findTermMatches(content, term);
      if (matches.length === 0) {
        this.stats.missingTerms++;
        fileReport.violations.push({
          type: 'missing-required-term',
          severity: 'LOW',
          term: term,
          message: `Required enterprise term "${term}" not found`,
          suggestion: `Consider including "${term}" where appropriate`
        });
      } else {
        fileReport.terminologyUsage[term] = matches.length;
      }
    });
  }

  /**
   * 📏 Check style guide compliance
   */
  checkStyleGuideCompliance(content, fileReport, filePath) {
    Object.entries(this.rules.styleGuide).forEach(([correct, alternatives]) => {
      alternatives.forEach(alternative => {
        const matches = this.findTermMatches(content, alternative);
        if (matches.length > 0) {
          this.stats.styleViolations++;
          fileReport.violations.push({
            type: 'style-guide-violation',
            severity: 'LOW',
            term: alternative,
            correct: correct,
            occurrences: matches.length,
            message: `Style guide violation: use "${correct}" instead of "${alternative}"`,
            positions: matches
          });
        }
      });
    });
  }

  /**
   * 🔤 Check capitalization consistency
   */
  checkCapitalization(content, fileReport, filePath) {
    // Check for inconsistent capitalization of common terms
    const capitalizationRules = {
      'GitHub': /\bgithub\b/gi,
      'JavaScript': /\bjavascript\b/gi,
      'TypeScript': /\btypescript\b/gi,
      'LayeraID': /\blayera\s*id\b/gi,
      'GeoAlert': /\bgeo\s*alert\b/gi
    };

    Object.entries(capitalizationRules).forEach(([correct, pattern]) => {
      const matches = content.match(pattern) || [];
      const incorrectMatches = matches.filter(match =>
        match.trim().toLowerCase() !== correct.toLowerCase() && match !== correct
      );

      if (incorrectMatches.length > 0) {
        fileReport.violations.push({
          type: 'capitalization-inconsistency',
          severity: 'LOW',
          term: incorrectMatches[0],
          correct: correct,
          occurrences: incorrectMatches.length,
          message: `Inconsistent capitalization: use "${correct}"`,
          examples: incorrectMatches.slice(0, 3)
        });
      }
    });
  }

  /**
   * 🔍 Find term matches with line numbers
   */
  findTermMatches(content, term) {
    const matches = [];
    const lines = content.split('\n');

    // Create case-insensitive regex for whole words
    const regex = new RegExp(`\\b${this.escapeRegex(term)}\\b`, 'gi');

    lines.forEach((line, index) => {
      let match;
      while ((match = regex.exec(line)) !== null) {
        matches.push({
          lineNumber: index + 1,
          columnNumber: match.index,
          context: line.trim(),
          matchedText: match[0]
        });
      }
      regex.lastIndex = 0; // Reset for next line
    });

    return matches;
  }

  /**
   * 🔒 Escape regex special characters
   */
  escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  /**
   * ⚠️ Get severity for prohibited terms
   */
  getProhibitedTermSeverity(term) {
    const highSeverityTerms = ['TODO', 'FIXME', 'HACK', 'XXX'];
    return highSeverityTerms.includes(term.toUpperCase()) ? 'HIGH' : 'MEDIUM';
  }

  /**
   * 📋 Check if file should be checked for required terms
   */
  shouldCheckRequiredTerms(filePath) {
    // Only check main documentation files, not internal docs
    const checkPatterns = [
      /README\.md$/i,
      /docs\/.*\.md$/i,
      /enterprise.*\.md$/i,
      /architecture.*\.md$/i
    ];

    const skipPatterns = [
      /node_modules/,
      /\.backup\./,
      /temp/i,
      /test/i
    ];

    if (skipPatterns.some(pattern => pattern.test(filePath))) {
      return false;
    }

    return checkPatterns.some(pattern => pattern.test(filePath));
  }

  /**
   * 📊 Generate comprehensive report
   */
  generateReport() {
    const violationRate = this.stats.totalWords > 0
      ? Math.round((this.stats.totalViolations / this.stats.totalWords) * 1000) / 10 // violations per 100 words
      : 0;

    const complianceScore = Math.max(0, 100 - (violationRate * 10));

    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        ...this.stats,
        violationRate: violationRate,
        complianceScore: Math.round(complianceScore)
      },
      violations: this.violations,
      files: this.fileReports,
      terminologyUsage: this.aggregateTerminologyUsage(),
      complianceLevel: this.getComplianceLevel(complianceScore)
    };

    // Save detailed JSON report
    const reportPath = path.join(process.cwd(), 'TERMINOLOGY_VALIDATION_REPORT.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    // Print summary
    this.printSummary(report);

    return report;
  }

  /**
   * 📈 Aggregate terminology usage across files
   */
  aggregateTerminologyUsage() {
    const usage = {};

    this.fileReports.forEach(fileReport => {
      Object.entries(fileReport.terminologyUsage).forEach(([term, count]) => {
        usage[term] = (usage[term] || 0) + count;
      });
    });

    return Object.entries(usage)
      .sort(([, a], [, b]) => b - a)
      .reduce((obj, [term, count]) => {
        obj[term] = count;
        return obj;
      }, {});
  }

  /**
   * 🖨️ Print validation summary
   */
  printSummary(report) {
    console.log('\n📝 ENTERPRISE TERMINOLOGY CONSISTENCY REPORT');
    console.log('===============================================\n');

    console.log('📊 STATISTICS:');
    console.log(`├─ Files scanned: ${this.stats.filesScanned}`);
    console.log(`├─ Total words: ${this.stats.totalWords.toLocaleString()}`);
    console.log(`├─ Total violations: ${this.stats.totalViolations}`);
    console.log(`└─ Violation rate: ${report.summary.violationRate} per 100 words\n`);

    console.log('📝 VIOLATION BREAKDOWN:');
    console.log(`├─ Inconsistencies: ${this.stats.inconsistencies}`);
    console.log(`├─ Prohibited terms: ${this.stats.prohibitedTerms}`);
    console.log(`├─ Missing required terms: ${this.stats.missingTerms}`);
    console.log(`└─ Style guide violations: ${this.stats.styleViolations}\n`);

    // Show top violations
    if (this.violations.length > 0) {
      console.log('🔍 TOP VIOLATIONS:');
      const violationsByType = {};
      this.violations.forEach(v => {
        violationsByType[v.type] = (violationsByType[v.type] || 0) + 1;
      });

      Object.entries(violationsByType)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .forEach(([type, count]) => {
          console.log(`├─ ${type}: ${count} occurrences`);
        });

      console.log('\n📋 SAMPLE VIOLATIONS:');
      this.violations.slice(0, 3).forEach((violation, index) => {
        console.log(`${index + 1}. [${violation.severity}] ${violation.message}`);
        if (violation.positions && violation.positions.length > 0) {
          console.log(`   Found at line ${violation.positions[0].lineNumber}`);
        }
      });
      console.log();
    }

    // Show most used terms
    const topTerms = Object.entries(report.terminologyUsage).slice(0, 5);
    if (topTerms.length > 0) {
      console.log('📈 MOST USED ENTERPRISE TERMS:');
      topTerms.forEach(([term, count]) => {
        console.log(`├─ "${term}": ${count} times`);
      });
      console.log();
    }

    console.log(`🏆 TERMINOLOGY COMPLIANCE SCORE: ${report.summary.complianceScore}%`);
    console.log(report.summary.complianceScore >= 90
      ? '✅ EXCELLENT - Terminology is highly consistent!'
      : report.summary.complianceScore >= 75
        ? '⚠️ GOOD - Minor terminology improvements needed'
        : '❌ NEEDS WORK - Significant terminology inconsistencies found');

    console.log(`\n📄 Detailed report saved: TERMINOLOGY_VALIDATION_REPORT.json`);
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
    path: args.find(arg => arg.startsWith('--path='))?.split('=')[1] || '.',
    verbose: args.includes('--verbose'),
    strictMode: args.includes('--strict'),
    customTerms: args.find(arg => arg.startsWith('--terms='))?.split('=')[1]
  };

  // Load custom terminology file if provided
  if (options.customTerms && fs.existsSync(options.customTerms)) {
    try {
      const customRules = JSON.parse(fs.readFileSync(options.customTerms, 'utf8'));
      Object.assign(options, customRules);
    } catch (error) {
      console.warn('⚠️ Could not load custom terminology file:', error.message);
    }
  }

  const checker = new TerminologyChecker();

  checker.checkAllTerminology(options.path, options)
    .then(() => {
      const exitCode = checker.stats.totalViolations > 0 ? 1 : 0;
      process.exit(exitCode);
    })
    .catch(error => {
      console.error('❌ Terminology check failed:', error.message);
      process.exit(1);
    });
}

module.exports = TerminologyChecker;