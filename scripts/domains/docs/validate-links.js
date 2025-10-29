#!/usr/bin/env node

/**
 * 🔗 ENTERPRISE LINK INTEGRITY VALIDATOR
 * Γιώργου Παγώνη - Documentation Domain Tool
 *
 * Validates all links in documentation to ensure:
 * - Internal links point to existing files
 * - External URLs are reachable (optional)
 * - Anchor links work correctly
 * - Image paths are valid
 * - No broken or outdated references
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { URL } = require('url');

// Import shared utilities
const { findMarkdownFiles } = require('./shared/file-scanner');
const { extractLinks } = require('./shared/markdown-parser');

class LinkIntegrityValidator {
  constructor() {
    this.stats = {
      filesScanned: 0,
      linksFound: 0,
      internalLinks: 0,
      externalLinks: 0,
      imageLinks: 0,
      anchorLinks: 0,
      brokenLinks: 0,
      validLinks: 0,
      skippedLinks: 0
    };

    this.violations = [];
    this.linkCache = new Map(); // Cache external URL checks
    this.validationResults = [];
  }

  /**
   * 🔍 Main link validation orchestrator
   */
  async validateAllLinks(rootPath = '.', options = {}) {
    console.log('🔗 ENTERPRISE LINK INTEGRITY VALIDATION');
    console.log('Checking all documentation links for integrity...\n');

    const defaultOptions = {
      checkExternal: false, // External URL checking disabled by default (slow)
      timeout: 5000,
      allowedDomains: [
        'github.com',
        'npmjs.com',
        'typescript.org',
        'react.dev',
        'developer.mozilla.org',
        'layera.ai'
      ],
      skipPatterns: [
        'mailto:',
        'tel:',
        'javascript:',
        'data:',
        '#top',
        '#'
      ]
    };

    this.options = { ...defaultOptions, ...options };

    const files = findMarkdownFiles(rootPath, {
      excludeNodeModules: true,
      excludeBackups: true
    });

    this.stats.filesScanned = files.length;
    console.log(`📁 Found ${files.length} markdown files\n`);

    for (const file of files) {
      await this.validateFileLinks(file.path, rootPath);
    }

    this.generateReport();
    return this.validationResults;
  }

  /**
   * 📄 Validate links in a single file
   */
  async validateFileLinks(filePath, rootPath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const links = extractLinks(content);

      if (links.length === 0) return;

      const relativeFile = path.relative(process.cwd(), filePath);
      const fileResults = {
        file: relativeFile,
        totalLinks: links.length,
        brokenLinks: [],
        validLinks: [],
        skippedLinks: []
      };

      for (const link of links) {
        const result = await this.validateLink(link, filePath, rootPath);
        this.stats.linksFound++;

        if (result.status === 'broken') {
          this.stats.brokenLinks++;
          fileResults.brokenLinks.push(result);
          this.violations.push({
            type: 'broken-link',
            severity: this.getSeverity(result.linkType),
            message: result.error,
            file: relativeFile,
            line: link.lineNumber,
            url: link.url || link.reference,
            linkType: result.linkType
          });
        } else if (result.status === 'valid') {
          this.stats.validLinks++;
          fileResults.validLinks.push(result);
        } else {
          this.stats.skippedLinks++;
          fileResults.skippedLinks.push(result);
        }

        // Update type-specific stats
        this.updateTypeStats(result.linkType);
      }

      if (fileResults.brokenLinks.length > 0) {
        console.log(`🔍 ${relativeFile}: ${fileResults.brokenLinks.length}/${fileResults.totalLinks} broken links`);
      }

      this.validationResults.push(fileResults);

    } catch (error) {
      console.error(`❌ Error processing ${filePath}:`, error.message);
    }
  }

  /**
   * 🔗 Validate individual link
   */
  async validateLink(link, currentFile, rootPath) {
    const url = link.url || link.reference;

    // Skip certain patterns
    if (this.shouldSkipLink(url)) {
      return {
        status: 'skipped',
        linkType: 'skipped',
        url: url,
        reason: 'Pattern skipped'
      };
    }

    // Determine link type and validate accordingly
    if (this.isExternalUrl(url)) {
      return await this.validateExternalLink(url);
    } else if (this.isImageLink(url)) {
      return this.validateImageLink(url, currentFile, rootPath);
    } else if (this.isAnchorLink(url)) {
      return this.validateAnchorLink(url, currentFile);
    } else {
      return this.validateInternalLink(url, currentFile, rootPath);
    }
  }

  /**
   * 🌐 Check if URL should be skipped
   */
  shouldSkipLink(url) {
    if (!url) return true;
    return this.options.skipPatterns.some(pattern => url.startsWith(pattern));
  }

  /**
   * 🌍 Check if URL is external
   */
  isExternalUrl(url) {
    try {
      const parsed = new URL(url);
      return parsed.protocol === 'http:' || parsed.protocol === 'https:';
    } catch {
      return false;
    }
  }

  /**
   * 🖼️ Check if URL is an image
   */
  isImageLink(url) {
    return /\.(png|jpg|jpeg|gif|svg|webp|ico)(\?.*)?$/i.test(url);
  }

  /**
   * ⚓ Check if URL is an anchor link
   */
  isAnchorLink(url) {
    return url.startsWith('#');
  }

  /**
   * 🌐 Validate external URL
   */
  async validateExternalLink(url) {
    if (!this.options.checkExternal) {
      return {
        status: 'skipped',
        linkType: 'external',
        url: url,
        reason: 'External checking disabled'
      };
    }

    // Check cache first
    if (this.linkCache.has(url)) {
      return this.linkCache.get(url);
    }

    try {
      const isReachable = await this.checkUrlReachability(url);
      const result = {
        status: isReachable ? 'valid' : 'broken',
        linkType: 'external',
        url: url,
        error: isReachable ? null : 'URL not reachable'
      };

      this.linkCache.set(url, result);
      return result;

    } catch (error) {
      const result = {
        status: 'broken',
        linkType: 'external',
        url: url,
        error: `External link error: ${error.message}`
      };

      this.linkCache.set(url, result);
      return result;
    }
  }

  /**
   * 📁 Validate internal file link
   */
  validateInternalLink(url, currentFile, rootPath) {
    try {
      // Resolve relative path
      const currentDir = path.dirname(currentFile);
      let targetPath;

      if (url.startsWith('/')) {
        // Absolute path from root
        targetPath = path.join(rootPath, url.substring(1));
      } else {
        // Relative path from current file
        targetPath = path.resolve(currentDir, url);
      }

      // Handle anchor in the URL
      const [filePart, anchor] = url.split('#');
      if (filePart) {
        targetPath = path.resolve(currentDir, filePart);
      }

      // Check if file exists
      if (!fs.existsSync(targetPath)) {
        return {
          status: 'broken',
          linkType: 'internal',
          url: url,
          error: `File not found: ${path.relative(rootPath, targetPath)}`
        };
      }

      // If there's an anchor, validate it
      if (anchor) {
        const anchorResult = this.validateAnchorInFile(anchor, targetPath);
        if (!anchorResult.isValid) {
          return {
            status: 'broken',
            linkType: 'internal-anchor',
            url: url,
            error: `Anchor #${anchor} not found in ${path.relative(rootPath, targetPath)}`
          };
        }
      }

      return {
        status: 'valid',
        linkType: 'internal',
        url: url,
        resolvedPath: targetPath
      };

    } catch (error) {
      return {
        status: 'broken',
        linkType: 'internal',
        url: url,
        error: `Internal link error: ${error.message}`
      };
    }
  }

  /**
   * 🖼️ Validate image link
   */
  validateImageLink(url, currentFile, rootPath) {
    if (this.isExternalUrl(url)) {
      return this.validateExternalLink(url);
    }

    // Handle internal image
    const result = this.validateInternalLink(url, currentFile, rootPath);
    return {
      ...result,
      linkType: 'image'
    };
  }

  /**
   * ⚓ Validate anchor link within current file
   */
  validateAnchorLink(url, currentFile) {
    if (url === '#' || url === '#top') {
      return {
        status: 'valid',
        linkType: 'anchor',
        url: url
      };
    }

    const anchor = url.substring(1);
    const result = this.validateAnchorInFile(anchor, currentFile);

    return {
      status: result.isValid ? 'valid' : 'broken',
      linkType: 'anchor',
      url: url,
      error: result.isValid ? null : `Anchor #${anchor} not found in current file`
    };
  }

  /**
   * 🎯 Validate anchor exists in file
   */
  validateAnchorInFile(anchor, filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');

      // Check for markdown headers that would generate this anchor
      const lines = content.split('\n');
      for (const line of lines) {
        if (line.startsWith('#')) {
          // Generate anchor from header
          const headerText = line.replace(/^#+\s*/, '').trim();
          const generatedAnchor = this.generateAnchorFromHeader(headerText);

          if (generatedAnchor === anchor) {
            return { isValid: true };
          }
        }

        // Check for explicit HTML anchors
        if (line.includes(`id="${anchor}"`) || line.includes(`name="${anchor}"`)) {
          return { isValid: true };
        }
      }

      return { isValid: false };

    } catch (error) {
      return { isValid: false, error: error.message };
    }
  }

  /**
   * 🔗 Generate anchor from header text (GitHub-style)
   */
  generateAnchorFromHeader(headerText) {
    return headerText
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/--+/g, '-') // Replace multiple hyphens with single
      .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
  }

  /**
   * 🌐 Check URL reachability
   */
  checkUrlReachability(url) {
    return new Promise((resolve) => {
      try {
        const urlObj = new URL(url);
        const client = urlObj.protocol === 'https:' ? https : http;

        const request = client.request({
          hostname: urlObj.hostname,
          port: urlObj.port,
          path: urlObj.pathname + urlObj.search,
          method: 'HEAD',
          timeout: this.options.timeout,
          headers: {
            'User-Agent': 'LayeraLinkValidator/1.0'
          }
        }, (response) => {
          resolve(response.statusCode < 400);
        });

        request.on('error', () => resolve(false));
        request.on('timeout', () => {
          request.destroy();
          resolve(false);
        });

        request.end();

      } catch (error) {
        resolve(false);
      }
    });
  }

  /**
   * 📊 Update type-specific statistics
   */
  updateTypeStats(linkType) {
    switch (linkType) {
      case 'internal':
      case 'internal-anchor':
        this.stats.internalLinks++;
        break;
      case 'external':
        this.stats.externalLinks++;
        break;
      case 'image':
        this.stats.imageLinks++;
        break;
      case 'anchor':
        this.stats.anchorLinks++;
        break;
    }
  }

  /**
   * ⚠️ Get severity based on link type
   */
  getSeverity(linkType) {
    switch (linkType) {
      case 'internal':
      case 'internal-anchor':
        return 'HIGH';
      case 'image':
        return 'MEDIUM';
      case 'external':
        return 'LOW';
      case 'anchor':
        return 'MEDIUM';
      default:
        return 'LOW';
    }
  }

  /**
   * 📊 Generate comprehensive report
   */
  generateReport() {
    const successRate = this.stats.linksFound > 0
      ? Math.round((this.stats.validLinks / this.stats.linksFound) * 100)
      : 100;

    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        ...this.stats,
        successRate: successRate
      },
      violations: this.violations,
      files: this.validationResults,
      complianceLevel: this.getComplianceLevel(successRate)
    };

    // Save detailed JSON report
    const reportPath = path.join(process.cwd(), 'LINK_INTEGRITY_VALIDATION_REPORT.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    // Print summary
    this.printSummary(report);

    return report;
  }

  /**
   * 🖨️ Print validation summary
   */
  printSummary(report) {
    console.log('\n🔗 ENTERPRISE LINK INTEGRITY VALIDATION REPORT');
    console.log('================================================\n');

    console.log('📊 STATISTICS:');
    console.log(`├─ Files scanned: ${this.stats.filesScanned}`);
    console.log(`├─ Links found: ${this.stats.linksFound}`);
    console.log(`├─ Valid links: ${this.stats.validLinks}`);
    console.log(`├─ Broken links: ${this.stats.brokenLinks}`);
    console.log(`├─ Skipped links: ${this.stats.skippedLinks}`);
    console.log(`└─ Success rate: ${report.summary.successRate}%\n`);

    console.log('🔗 LINK TYPES:');
    console.log(`├─ Internal links: ${this.stats.internalLinks}`);
    console.log(`├─ External links: ${this.stats.externalLinks}`);
    console.log(`├─ Image links: ${this.stats.imageLinks}`);
    console.log(`└─ Anchor links: ${this.stats.anchorLinks}\n`);

    // Show broken links by type
    if (this.violations.length > 0) {
      console.log('🚨 BROKEN LINKS BY TYPE:');
      const byType = {};
      this.violations.forEach(v => {
        byType[v.linkType] = (byType[v.linkType] || 0) + 1;
      });

      Object.entries(byType).forEach(([type, count]) => {
        console.log(`├─ ${type}: ${count}`);
      });

      console.log('\n🔍 TOP BROKEN LINKS:');
      this.violations.slice(0, 5).forEach((violation, index) => {
        console.log(`${index + 1}. [${violation.severity}] ${violation.file}:${violation.line}`);
        console.log(`   ${violation.url} - ${violation.message}`);
      });
      console.log();
    }

    console.log(`🏆 LINK INTEGRITY SCORE: ${report.summary.successRate}%`);
    console.log(report.summary.successRate >= 95
      ? '✅ EXCELLENT - All documentation links are working!'
      : report.summary.successRate >= 80
        ? '⚠️ GOOD - Minor link issues found'
        : '❌ NEEDS WORK - Significant broken links detected');

    if (!this.options.checkExternal) {
      console.log('\n💡 TIP: Run with --check-external to validate external URLs (slower)');
    }

    console.log(`\n📄 Detailed report saved: LINK_INTEGRITY_VALIDATION_REPORT.json`);
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
    checkExternal: args.includes('--check-external'),
    timeout: parseInt(args.find(arg => arg.startsWith('--timeout='))?.split('=')[1]) || 5000,
    verbose: args.includes('--verbose')
  };

  console.log('🔗 Link Integrity Validation Starting...');
  if (options.checkExternal) {
    console.log('⚠️ External URL checking enabled - this may take several minutes');
  }
  console.log();

  const validator = new LinkIntegrityValidator();

  validator.validateAllLinks(options.path, options)
    .then(() => {
      const exitCode = validator.stats.brokenLinks > 0 ? 1 : 0;
      process.exit(exitCode);
    })
    .catch(error => {
      console.error('❌ Link validation failed:', error.message);
      process.exit(1);
    });
}

module.exports = LinkIntegrityValidator;