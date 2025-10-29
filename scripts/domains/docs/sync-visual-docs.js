#!/usr/bin/env node

/**
 * 🎨 ENTERPRISE VISUAL DOCUMENTATION SYNC
 * Γιώργου Παγώνη - Documentation Domain Tool
 *
 * Ensures visual documentation stays in sync with application state:
 * - Detects outdated screenshots in documentation
 * - Validates image references and accessibility
 * - Reports on visual documentation coverage
 * - Provides recommendations for visual updates
 * - Checks for broken image links
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Import shared utilities
const { findMarkdownFiles } = require('./shared/file-scanner');
const { extractLinks } = require('./shared/markdown-parser');

class VisualDocumentationSync {
  constructor() {
    this.stats = {
      filesScanned: 0,
      imagesFound: 0,
      brokenImages: 0,
      outdatedImages: 0,
      missingAltText: 0,
      validImages: 0,
      totalViolations: 0
    };

    this.violations = [];
    this.imageInventory = [];
    this.fileReports = [];
    this.supportedFormats = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.ico'];
  }

  /**
   * 🔍 Main visual documentation analysis
   */
  async syncAllVisualDocs(rootPath = '.', options = {}) {
    console.log('🎨 ENTERPRISE VISUAL DOCUMENTATION SYNC');
    console.log('Analyzing visual content in documentation...\n');

    const defaultOptions = {
      checkImageAccessibility: true,
      generateMissingAltText: false,
      validateImageSizes: true,
      maxImageSize: 2 * 1024 * 1024, // 2MB
      preferredFormats: ['.png', '.jpg', '.svg'],
      screenshotPatterns: [
        /screenshot/i,
        /screen-shot/i,
        /capture/i,
        /demo/i,
        /example/i
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
      await this.analyzeFileVisuals(file.path, rootPath);
    }

    // Analyze image directory structure
    await this.analyzeImageDirectories(rootPath);

    this.generateReport();
    return this.fileReports;
  }

  /**
   * 📄 Analyze visual content in a single file
   */
  async analyzeFileVisuals(filePath, rootPath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const relativeFile = path.relative(process.cwd(), filePath);

      const fileReport = {
        file: relativeFile,
        images: [],
        violations: [],
        visualCoverage: 0
      };

      // Extract all image references
      const images = this.extractImageReferences(content, filePath);
      fileReport.images = images;
      this.stats.imagesFound += images.length;

      // Analyze each image
      for (const image of images) {
        await this.analyzeImage(image, fileReport, rootPath);
      }

      // Calculate visual coverage score
      fileReport.visualCoverage = this.calculateVisualCoverage(content, images);

      this.stats.totalViolations += fileReport.violations.length;

      if (fileReport.violations.length > 0 || images.length > 0) {
        console.log(`🎨 ${relativeFile}: ${images.length} images, ${fileReport.violations.length} issues`);
      }

      this.fileReports.push(fileReport);
      this.violations.push(...fileReport.violations);

    } catch (error) {
      console.error(`❌ Error processing ${filePath}:`, error.message);
    }
  }

  /**
   * 🖼️ Extract image references from markdown
   */
  extractImageReferences(content, filePath) {
    const images = [];
    const lines = content.split('\n');

    lines.forEach((line, index) => {
      // Markdown image syntax: ![alt](src "title")
      const markdownImageRegex = /!\[([^\]]*)\]\(([^)]+?)(?:\s+"([^"]*)")?\)/g;
      let match;

      while ((match = markdownImageRegex.exec(line)) !== null) {
        images.push({
          type: 'markdown',
          altText: match[1] || '',
          src: match[2].trim(),
          title: match[3] || '',
          lineNumber: index + 1,
          context: line.trim(),
          syntax: match[0]
        });
      }

      // HTML img tags
      const htmlImageRegex = /<img\s+([^>]*?)src=["']([^"']+)["']([^>]*?)>/gi;
      while ((match = htmlImageRegex.exec(line)) !== null) {
        const beforeSrc = match[1];
        const src = match[2];
        const afterSrc = match[3];

        // Extract alt text if present
        const altMatch = (beforeSrc + afterSrc).match(/alt=["']([^"']*)["']/i);
        const altText = altMatch ? altMatch[1] : '';

        images.push({
          type: 'html',
          altText: altText,
          src: src,
          title: '',
          lineNumber: index + 1,
          context: line.trim(),
          syntax: match[0]
        });
      }
    });

    return images;
  }

  /**
   * 🔍 Analyze individual image
   */
  async analyzeImage(image, fileReport, rootPath) {
    const imageInfo = {
      ...image,
      exists: false,
      size: 0,
      format: '',
      dimensions: null,
      lastModified: null,
      violations: []
    };

    // Check if image is external URL
    if (this.isExternalUrl(image.src)) {
      imageInfo.isExternal = true;
      imageInfo.exists = true; // Assume external images exist (we could check but it's slow)
    } else {
      // Resolve local image path
      const imagePath = this.resolveImagePath(image.src, fileReport.file, rootPath);
      imageInfo.resolvedPath = imagePath;

      if (fs.existsSync(imagePath)) {
        imageInfo.exists = true;
        const stats = fs.statSync(imagePath);
        imageInfo.size = stats.size;
        imageInfo.lastModified = stats.mtime;
        imageInfo.format = path.extname(imagePath).toLowerCase();

        // Validate image
        this.validateImageFile(imageInfo, imagePath);
      } else {
        imageInfo.exists = false;
        this.stats.brokenImages++;
        imageInfo.violations.push({
          type: 'missing-image',
          severity: 'HIGH',
          message: `Image file not found: ${image.src}`,
          suggestion: 'Check the file path or add the missing image'
        });
      }
    }

    // Check accessibility
    if (this.options.checkImageAccessibility) {
      this.checkImageAccessibility(imageInfo);
    }

    // Check if image might be outdated
    if (imageInfo.exists && !imageInfo.isExternal) {
      this.checkImageFreshness(imageInfo);
    }

    // Add violations to file report
    fileReport.violations.push(...imageInfo.violations);
    this.violations.push(...imageInfo.violations.map(v => ({
      ...v,
      file: fileReport.file,
      line: image.lineNumber,
      image: image.src
    })));

    // Track stats
    if (imageInfo.exists) {
      this.stats.validImages++;
    }

    if (!image.altText.trim()) {
      this.stats.missingAltText++;
    }

    this.imageInventory.push(imageInfo);
  }

  /**
   * 🌐 Check if URL is external
   */
  isExternalUrl(src) {
    try {
      const url = new URL(src);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch {
      return false;
    }
  }

  /**
   * 📁 Resolve image path relative to markdown file
   */
  resolveImagePath(src, markdownFile, rootPath) {
    if (path.isAbsolute(src)) {
      return path.join(rootPath, src);
    }

    const markdownDir = path.dirname(path.join(process.cwd(), markdownFile));
    return path.resolve(markdownDir, src);
  }

  /**
   * ✅ Validate image file properties
   */
  validateImageFile(imageInfo, imagePath) {
    // Check file format
    if (!this.supportedFormats.includes(imageInfo.format)) {
      imageInfo.violations.push({
        type: 'unsupported-format',
        severity: 'MEDIUM',
        message: `Unsupported image format: ${imageInfo.format}`,
        suggestion: `Use one of: ${this.options.preferredFormats.join(', ')}`
      });
    }

    // Check file size
    if (imageInfo.size > this.options.maxImageSize) {
      const sizeMB = (imageInfo.size / (1024 * 1024)).toFixed(2);
      const maxMB = (this.options.maxImageSize / (1024 * 1024)).toFixed(2);

      imageInfo.violations.push({
        type: 'large-image',
        severity: 'MEDIUM',
        message: `Image too large: ${sizeMB}MB (max: ${maxMB}MB)`,
        suggestion: 'Optimize image size for web'
      });
    }

    // Try to get image dimensions (basic attempt)
    try {
      if (imageInfo.format === '.svg') {
        const svgContent = fs.readFileSync(imagePath, 'utf8');
        const widthMatch = svgContent.match(/width=["']?(\d+)/);
        const heightMatch = svgContent.match(/height=["']?(\d+)/);

        if (widthMatch && heightMatch) {
          imageInfo.dimensions = {
            width: parseInt(widthMatch[1]),
            height: parseInt(heightMatch[1])
          };
        }
      }
    } catch (error) {
      // Silently ignore dimension extraction errors
    }
  }

  /**
   * ♿ Check image accessibility
   */
  checkImageAccessibility(imageInfo) {
    // Check for missing alt text
    if (!imageInfo.altText.trim()) {
      imageInfo.violations.push({
        type: 'missing-alt-text',
        severity: 'HIGH',
        message: 'Image missing alt text for accessibility',
        suggestion: 'Add descriptive alt text for screen readers'
      });
    }

    // Check for poor alt text
    const poorAltPatterns = [
      /^image$/i,
      /^picture$/i,
      /^photo$/i,
      /^screenshot$/i,
      /^img$/i,
      /^logo$/i
    ];

    if (imageInfo.altText.trim() && poorAltPatterns.some(pattern => pattern.test(imageInfo.altText))) {
      imageInfo.violations.push({
        type: 'poor-alt-text',
        severity: 'MEDIUM',
        message: 'Alt text is not descriptive enough',
        suggestion: 'Use more descriptive alt text that explains the image content'
      });
    }

    // Check for very long alt text
    if (imageInfo.altText.length > 125) {
      imageInfo.violations.push({
        type: 'long-alt-text',
        severity: 'LOW',
        message: 'Alt text is very long (>125 characters)',
        suggestion: 'Consider shorter, more concise alt text'
      });
    }
  }

  /**
   * 📅 Check if image might be outdated
   */
  checkImageFreshness(imageInfo) {
    if (!imageInfo.lastModified) return;

    const now = new Date();
    const imageAge = now - imageInfo.lastModified;
    const sixMonthsAgo = 6 * 30 * 24 * 60 * 60 * 1000; // 6 months in milliseconds

    // Check if image looks like a screenshot and is old
    const isScreenshot = this.options.screenshotPatterns.some(pattern =>
      pattern.test(imageInfo.src) || pattern.test(imageInfo.altText)
    );

    if (isScreenshot && imageAge > sixMonthsAgo) {
      this.stats.outdatedImages++;
      imageInfo.violations.push({
        type: 'potentially-outdated',
        severity: 'LOW',
        message: `Screenshot is ${Math.round(imageAge / (30 * 24 * 60 * 60 * 1000))} months old`,
        suggestion: 'Verify screenshot shows current UI and update if needed'
      });
    }
  }

  /**
   * 📊 Calculate visual coverage score for file
   */
  calculateVisualCoverage(content, images) {
    const wordCount = content.split(/\s+/).length;
    const imageCount = images.length;

    // Rough heuristic: good documentation has ~1 image per 200-500 words
    const idealRatio = 1 / 300; // 1 image per 300 words
    const actualRatio = wordCount > 0 ? imageCount / wordCount : 0;

    const coverage = Math.min(100, (actualRatio / idealRatio) * 100);
    return Math.round(coverage);
  }

  /**
   * 📁 Analyze image directory structure
   */
  async analyzeImageDirectories(rootPath) {
    const commonImageDirs = [
      'docs/images',
      'docs/assets',
      'images',
      'assets',
      'static/images',
      'public/images'
    ];

    const foundDirs = [];
    const orphanedImages = [];

    for (const dir of commonImageDirs) {
      const fullPath = path.join(rootPath, dir);
      if (fs.existsSync(fullPath)) {
        foundDirs.push(dir);

        // Find orphaned images (not referenced in any markdown)
        const images = this.findImagesInDirectory(fullPath);
        for (const img of images) {
          const isReferenced = this.imageInventory.some(ref =>
            ref.resolvedPath && path.resolve(ref.resolvedPath) === path.resolve(img)
          );

          if (!isReferenced) {
            orphanedImages.push(path.relative(rootPath, img));
          }
        }
      }
    }

    // Report findings
    if (foundDirs.length > 0) {
      console.log(`📁 Found image directories: ${foundDirs.join(', ')}`);
    }

    if (orphanedImages.length > 0) {
      console.log(`🗑️ Found ${orphanedImages.length} orphaned images (not referenced in docs)`);

      this.violations.push({
        type: 'orphaned-images',
        severity: 'LOW',
        message: `${orphanedImages.length} images found that are not referenced in documentation`,
        orphanedFiles: orphanedImages.slice(0, 10), // Show first 10
        suggestion: 'Review and remove unused images or add them to documentation'
      });
    }
  }

  /**
   * 🔍 Find all images in directory
   */
  findImagesInDirectory(dirPath) {
    const images = [];

    function scanDir(dir) {
      try {
        const entries = fs.readdirSync(dir, { withFileTypes: true });

        for (const entry of entries) {
          const fullPath = path.join(dir, entry.name);

          if (entry.isDirectory()) {
            scanDir(fullPath);
          } else if (entry.isFile()) {
            const ext = path.extname(entry.name).toLowerCase();
            if (this.supportedFormats.includes(ext)) {
              images.push(fullPath);
            }
          }
        }
      } catch (error) {
        console.warn(`⚠️ Could not scan ${dir}:`, error.message);
      }
    }

    scanDir.call(this, dirPath);
    return images;
  }

  /**
   * 📊 Generate comprehensive report
   */
  generateReport() {
    const imageSuccessRate = this.stats.imagesFound > 0
      ? Math.round((this.stats.validImages / this.stats.imagesFound) * 100)
      : 100;

    const accessibilityScore = this.stats.imagesFound > 0
      ? Math.round(((this.stats.imagesFound - this.stats.missingAltText) / this.stats.imagesFound) * 100)
      : 100;

    const averageVisualCoverage = this.fileReports.length > 0
      ? Math.round(this.fileReports.reduce((sum, file) => sum + file.visualCoverage, 0) / this.fileReports.length)
      : 0;

    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        ...this.stats,
        imageSuccessRate,
        accessibilityScore,
        averageVisualCoverage
      },
      violations: this.violations,
      files: this.fileReports,
      imageInventory: this.imageInventory,
      complianceLevel: this.getComplianceLevel(imageSuccessRate, accessibilityScore)
    };

    // Save detailed JSON report
    const reportPath = path.join(process.cwd(), 'VISUAL_DOCS_SYNC_REPORT.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    // Print summary
    this.printSummary(report);

    return report;
  }

  /**
   * 🖨️ Print validation summary
   */
  printSummary(report) {
    console.log('\n🎨 ENTERPRISE VISUAL DOCUMENTATION SYNC REPORT');
    console.log('===============================================\n');

    console.log('📊 STATISTICS:');
    console.log(`├─ Files scanned: ${this.stats.filesScanned}`);
    console.log(`├─ Images found: ${this.stats.imagesFound}`);
    console.log(`├─ Valid images: ${this.stats.validImages}`);
    console.log(`├─ Broken images: ${this.stats.brokenImages}`);
    console.log(`├─ Missing alt text: ${this.stats.missingAltText}`);
    console.log(`├─ Potentially outdated: ${this.stats.outdatedImages}`);
    console.log(`└─ Total violations: ${this.stats.totalViolations}\n`);

    console.log('📈 SCORES:');
    console.log(`├─ Image integrity: ${report.summary.imageSuccessRate}%`);
    console.log(`├─ Accessibility: ${report.summary.accessibilityScore}%`);
    console.log(`└─ Visual coverage: ${report.summary.averageVisualCoverage}%\n`);

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
      console.log();
    }

    // Show image format distribution
    const formatStats = {};
    this.imageInventory.forEach(img => {
      if (img.format) {
        formatStats[img.format] = (formatStats[img.format] || 0) + 1;
      }
    });

    if (Object.keys(formatStats).length > 0) {
      console.log('📊 IMAGE FORMATS:');
      Object.entries(formatStats)
        .sort(([, a], [, b]) => b - a)
        .forEach(([format, count]) => {
          console.log(`├─ ${format}: ${count} images`);
        });
      console.log();
    }

    const overallScore = Math.round((report.summary.imageSuccessRate + report.summary.accessibilityScore) / 2);

    console.log(`🏆 OVERALL VISUAL DOCUMENTATION SCORE: ${overallScore}%`);
    console.log(overallScore >= 90
      ? '✅ EXCELLENT - Visual documentation is well maintained!'
      : overallScore >= 75
        ? '⚠️ GOOD - Minor visual documentation improvements needed'
        : '❌ NEEDS WORK - Significant visual documentation issues found');

    console.log(`\n📄 Detailed report saved: VISUAL_DOCS_SYNC_REPORT.json`);
  }

  /**
   * 📈 Get compliance level
   */
  getComplianceLevel(imageScore, accessibilityScore) {
    const overallScore = (imageScore + accessibilityScore) / 2;

    if (overallScore >= 90) return 'EXCELLENT';
    if (overallScore >= 75) return 'GOOD';
    if (overallScore >= 60) return 'FAIR';
    return 'NEEDS_WORK';
  }
}

// CLI execution
if (require.main === module) {
  const args = process.argv.slice(2);
  const options = {
    path: args.find(arg => arg.startsWith('--path='))?.split('=')[1] || '.',
    checkImageAccessibility: !args.includes('--skip-accessibility'),
    validateImageSizes: !args.includes('--skip-size-check'),
    maxImageSize: parseInt(args.find(arg => arg.startsWith('--max-size='))?.split('=')[1]) || (2 * 1024 * 1024),
    verbose: args.includes('--verbose')
  };

  const sync = new VisualDocumentationSync();

  sync.syncAllVisualDocs(options.path, options)
    .then(() => {
      const exitCode = sync.stats.totalViolations > 0 ? 1 : 0;
      process.exit(exitCode);
    })
    .catch(error => {
      console.error('❌ Visual documentation sync failed:', error.message);
      process.exit(1);
    });
}

module.exports = VisualDocumentationSync;