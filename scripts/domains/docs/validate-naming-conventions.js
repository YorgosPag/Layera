#!/usr/bin/env node

/**
 * 🏷️ ENTERPRISE NAMING CONVENTIONS VALIDATOR
 * Γιώργου Παγώνη - Documentation Domain Tool
 *
 * Fortune 500 inspired naming conventions validation:
 * - File naming patterns (components, hooks, utilities, styles)
 * - Directory structure compliance
 * - Import/export naming consistency
 * - Package naming standards
 * - API endpoint naming validation
 * - i18n key structure validation
 *
 * Based on Microsoft Azure DevOps Guardrails & Google Engineering Standards
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Import shared utilities
const { findAllFiles } = require('./shared/file-scanner');
const { LEGO_IMPORTS } = require('./shared/validation-rules');

class NamingConventionsValidator {
  constructor() {
    this.stats = {
      filesScanned: 0,
      directoriesScanned: 0,
      totalViolations: 0,
      criticalViolations: 0,
      fileNamingIssues: 0,
      directoryNamingIssues: 0,
      importNamingIssues: 0,
      packageNamingIssues: 0,
      i18nNamingIssues: 0,
      apiNamingIssues: 0
    };

    this.violations = [];
    this.complianceReport = {
      fileNaming: { score: 0, violations: [] },
      directoryNaming: { score: 0, violations: [] },
      importNaming: { score: 0, violations: [] },
      packageNaming: { score: 0, violations: [] },
      i18nNaming: { score: 0, violations: [] },
      apiNaming: { score: 0, violations: [] }
    };
  }

  /**
   * 🔍 Main naming conventions validation orchestrator
   */
  async validateAllNamingConventions(rootPath = '.', options = {}) {
    console.log('🏷️ ENTERPRISE NAMING CONVENTIONS VALIDATION');
    console.log('Analyzing codebase for Fortune 500 naming standards compliance...\n');

    // 1. Validate file naming patterns
    await this.validateFileNaming(rootPath);

    // 2. Validate directory structure
    await this.validateDirectoryNaming(rootPath);

    // 3. Validate import/export naming
    await this.validateImportNaming(rootPath);

    // 4. Validate package naming
    await this.validatePackageNaming(rootPath);

    // 5. Validate i18n key structure
    await this.validateI18nNaming(rootPath);

    // 6. Validate API endpoint naming (if APIs exist)
    await this.validateApiNaming(rootPath);

    this.generateComplianceReport();
    return this.complianceReport;
  }

  /**
   * 📄 Validate file naming patterns
   */
  async validateFileNaming(rootPath) {
    console.log('📄 Validating file naming patterns...');

    const files = findAllFiles(rootPath, {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.css', '.scss', '.md'],
      excludeNodeModules: true,
      excludeBackups: true
    });

    this.stats.filesScanned = files.length;

    const patterns = {
      // ✅ ENTERPRISE STANDARDS
      components: {
        pattern: /^[A-Z][a-zA-Z0-9]*\.(tsx|jsx)$/,
        description: 'Components: PascalCase.tsx',
        examples: ['LayeraHeader.tsx', 'GeoAlertCard.tsx', 'UserProfileModal.tsx']
      },
      hooks: {
        pattern: /^use[A-Z][a-zA-Z0-9]*\.(ts|js)$/,
        description: 'Hooks: useHookName.ts',
        examples: ['useLayeraAuth.ts', 'useGeoAlertState.ts', 'useMapInteraction.ts']
      },
      utilities: {
        pattern: /^[a-z][a-zA-Z0-9]*\.(ts|js)$/,
        description: 'Utilities: camelCase.ts',
        examples: ['formatCoordinates.ts', 'validateUserInput.ts', 'parseGeoData.ts']
      },
      constants: {
        pattern: /^[A-Z_]+\.(ts|js)$/,
        description: 'Constants: SCREAMING_SNAKE_CASE.ts',
        examples: ['API_ENDPOINTS.ts', 'USER_ROLES.ts', 'VALIDATION_RULES.ts']
      },
      styles: {
        pattern: /^[a-z-]+\.(css|scss)$/,
        description: 'Styles: kebab-case.css',
        examples: ['layera-header.css', 'geo-alert-card.css', 'user-profile-modal.css']
      },
      documentation: {
        pattern: /^[A-Z_]+\.md$/,
        description: 'Docs: CAPS_WITH_UNDERSCORES.md',
        examples: ['TERMINOLOGY_CONVENTIONS.md', 'LEGO_SYSTEMS_REGISTRY.md']
      }
    };

    for (const file of files) {
      const fileName = path.basename(file.path);
      const fileExt = path.extname(fileName);
      const relativePath = path.relative(rootPath, file.path);

      let matched = false;
      let violation = null;

      // Determine expected pattern based on file type and location
      if (fileExt === '.tsx' || fileExt === '.jsx') {
        // Components should be PascalCase
        if (!patterns.components.pattern.test(fileName)) {
          violation = {
            type: 'file-naming-violation',
            severity: 'HIGH',
            file: relativePath,
            category: 'components',
            current: fileName,
            expected: patterns.components.description,
            examples: patterns.components.examples,
            message: `Component file should use PascalCase: ${fileName}`
          };
        } else {
          matched = true;
        }
      } else if (fileName.startsWith('use') && (fileExt === '.ts' || fileExt === '.js')) {
        // Hooks should follow useHookName pattern
        if (!patterns.hooks.pattern.test(fileName)) {
          violation = {
            type: 'file-naming-violation',
            severity: 'HIGH',
            file: relativePath,
            category: 'hooks',
            current: fileName,
            expected: patterns.hooks.description,
            examples: patterns.hooks.examples,
            message: `Hook file should follow useHookName pattern: ${fileName}`
          };
        } else {
          matched = true;
        }
      } else if (fileName.toUpperCase() === fileName && (fileExt === '.ts' || fileExt === '.js')) {
        // Constants should be SCREAMING_SNAKE_CASE
        if (!patterns.constants.pattern.test(fileName)) {
          violation = {
            type: 'file-naming-violation',
            severity: 'MEDIUM',
            file: relativePath,
            category: 'constants',
            current: fileName,
            expected: patterns.constants.description,
            examples: patterns.constants.examples,
            message: `Constants file should use SCREAMING_SNAKE_CASE: ${fileName}`
          };
        } else {
          matched = true;
        }
      } else if (fileExt === '.css' || fileExt === '.scss') {
        // Styles should be kebab-case
        if (!patterns.styles.pattern.test(fileName)) {
          violation = {
            type: 'file-naming-violation',
            severity: 'MEDIUM',
            file: relativePath,
            category: 'styles',
            current: fileName,
            expected: patterns.styles.description,
            examples: patterns.styles.examples,
            message: `Style file should use kebab-case: ${fileName}`
          };
        } else {
          matched = true;
        }
      } else if (fileExt === '.md') {
        // Documentation should be CAPS_WITH_UNDERSCORES (except README)
        if (fileName !== 'README.md' && !patterns.documentation.pattern.test(fileName)) {
          violation = {
            type: 'file-naming-violation',
            severity: 'LOW',
            file: relativePath,
            category: 'documentation',
            current: fileName,
            expected: patterns.documentation.description,
            examples: patterns.documentation.examples,
            message: `Documentation file should use CAPS_WITH_UNDERSCORES: ${fileName}`
          };
        } else {
          matched = true;
        }
      } else if (fileExt === '.ts' || fileExt === '.js') {
        // General utilities should be camelCase
        if (!patterns.utilities.pattern.test(fileName)) {
          violation = {
            type: 'file-naming-violation',
            severity: 'MEDIUM',
            file: relativePath,
            category: 'utilities',
            current: fileName,
            expected: patterns.utilities.description,
            examples: patterns.utilities.examples,
            message: `Utility file should use camelCase: ${fileName}`
          };
        } else {
          matched = true;
        }
      }

      if (violation) {
        this.stats.fileNamingIssues++;
        this.stats.totalViolations++;
        this.violations.push(violation);
        this.complianceReport.fileNaming.violations.push(violation);
      }
    }

    // Calculate file naming score
    const totalFiles = this.stats.filesScanned;
    const violatingFiles = this.stats.fileNamingIssues;
    this.complianceReport.fileNaming.score = totalFiles > 0
      ? Math.round((1 - violatingFiles / totalFiles) * 100)
      : 100;

    console.log(`   📊 Scanned ${totalFiles} files, found ${violatingFiles} naming violations`);
  }

  /**
   * 📁 Validate directory structure naming
   */
  async validateDirectoryNaming(rootPath) {
    console.log('📁 Validating directory naming patterns...');

    const directories = this.findDirectories(rootPath);
    this.stats.directoriesScanned = directories.length;

    const directoryPatterns = {
      packages: /^@?[a-z-]+$/,                    // @layera/package-name
      apps: /^[a-z-]+$/,                         // layera-geoalert
      components: /^[a-z-]+$/,                   // kebab-case
      docs: /^[a-z-]+$/,                         // kebab-case
      scripts: /^[a-z-]+$/,                      // kebab-case
      utils: /^[a-z-]+$/                         // kebab-case
    };

    for (const dir of directories) {
      const dirName = path.basename(dir);
      const relativePath = path.relative(rootPath, dir);
      const parentDir = path.basename(path.dirname(dir));

      // Skip node_modules and dist directories
      if (dirName === 'node_modules' || dirName === 'dist' || dirName === 'build') {
        continue;
      }

      let violation = null;

      // Check directory naming based on context
      if (parentDir === 'packages' && !directoryPatterns.packages.test(dirName)) {
        violation = {
          type: 'directory-naming-violation',
          severity: 'HIGH',
          directory: relativePath,
          current: dirName,
          expected: 'kebab-case (e.g., @layera/package-name)',
          message: `Package directory should use kebab-case: ${dirName}`
        };
      } else if (parentDir === 'apps' && !directoryPatterns.apps.test(dirName)) {
        violation = {
          type: 'directory-naming-violation',
          severity: 'HIGH',
          directory: relativePath,
          current: dirName,
          expected: 'kebab-case (e.g., layera-geoalert)',
          message: `App directory should use kebab-case: ${dirName}`
        };
      } else if (
        (parentDir === 'components' || relativePath.includes('components')) &&
        !directoryPatterns.components.test(dirName)
      ) {
        violation = {
          type: 'directory-naming-violation',
          severity: 'MEDIUM',
          directory: relativePath,
          current: dirName,
          expected: 'kebab-case',
          message: `Component directory should use kebab-case: ${dirName}`
        };
      }

      if (violation) {
        this.stats.directoryNamingIssues++;
        this.stats.totalViolations++;
        this.violations.push(violation);
        this.complianceReport.directoryNaming.violations.push(violation);
      }
    }

    // Calculate directory naming score
    const totalDirs = this.stats.directoriesScanned;
    const violatingDirs = this.stats.directoryNamingIssues;
    this.complianceReport.directoryNaming.score = totalDirs > 0
      ? Math.round((1 - violatingDirs / totalDirs) * 100)
      : 100;

    console.log(`   📊 Scanned ${totalDirs} directories, found ${violatingDirs} naming violations`);
  }

  /**
   * 📦 Validate import/export naming
   */
  async validateImportNaming(rootPath) {
    console.log('📦 Validating import/export naming...');

    const sourceFiles = findAllFiles(rootPath, {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      excludeNodeModules: true,
      excludeBackups: true
    });

    for (const file of sourceFiles) {
      const content = fs.readFileSync(file.path, 'utf8');
      const relativePath = path.relative(rootPath, file.path);

      // Check import statements
      const importPattern = /import\s+.*?\s+from\s+['"](.+?)['"];?/g;
      let match;

      while ((match = importPattern.exec(content)) !== null) {
        const importPath = match[1];

        // Check for non-LEGO imports that should be LEGO
        if (this.isNonLegoImportViolation(importPath)) {
          const violation = {
            type: 'import-naming-violation',
            severity: 'CRITICAL',
            file: relativePath,
            import: importPath,
            line: this.getLineNumber(content, match.index),
            expected: this.suggestLegoAlternative(importPath),
            message: `Should use @layera package instead of: ${importPath}`
          };

          this.stats.importNamingIssues++;
          this.stats.totalViolations++;
          this.violations.push(violation);
          this.complianceReport.importNaming.violations.push(violation);
        }

        // Check for incorrect @layera import paths
        if (importPath.startsWith('@layera/') && this.isIncorrectLegoImport(importPath)) {
          const violation = {
            type: 'import-naming-violation',
            severity: 'HIGH',
            file: relativePath,
            import: importPath,
            line: this.getLineNumber(content, match.index),
            expected: this.correctLegoImportPath(importPath),
            message: `Incorrect @layera import path: ${importPath}`
          };

          this.stats.importNamingIssues++;
          this.stats.totalViolations++;
          this.violations.push(violation);
          this.complianceReport.importNaming.violations.push(violation);
        }
      }
    }

    // Calculate import naming score
    const totalImportViolations = this.stats.importNamingIssues;
    this.complianceReport.importNaming.score = Math.max(0, 100 - (totalImportViolations * 5));

    console.log(`   📊 Found ${totalImportViolations} import naming violations`);
  }

  /**
   * 📦 Validate package naming in package.json files
   */
  async validatePackageNaming(rootPath) {
    console.log('📦 Validating package naming...');

    const packageFiles = findAllFiles(rootPath, {
      patterns: ['**/package.json'],
      excludeNodeModules: true
    });

    for (const file of packageFiles) {
      try {
        const content = JSON.parse(fs.readFileSync(file.path, 'utf8'));
        const relativePath = path.relative(rootPath, file.path);

        if (content.name) {
          const packageName = content.name;

          // Check @layera package naming
          if (packageName.startsWith('@layera/')) {
            const packagePart = packageName.replace('@layera/', '');

            // Should be kebab-case
            if (!/^[a-z-]+$/.test(packagePart)) {
              const violation = {
                type: 'package-naming-violation',
                severity: 'CRITICAL',
                file: relativePath,
                packageName: packageName,
                expected: '@layera/kebab-case-name',
                message: `@layera package should use kebab-case: ${packageName}`
              };

              this.stats.packageNamingIssues++;
              this.stats.totalViolations++;
              this.violations.push(violation);
              this.complianceReport.packageNaming.violations.push(violation);
            }
          }

          // Check app naming (should have clear prefix)
          if (file.path.includes('/apps/')) {
            if (!packageName.startsWith('layera-')) {
              const violation = {
                type: 'package-naming-violation',
                severity: 'HIGH',
                file: relativePath,
                packageName: packageName,
                expected: 'layera-app-name',
                message: `App package should start with 'layera-': ${packageName}`
              };

              this.stats.packageNamingIssues++;
              this.stats.totalViolations++;
              this.violations.push(violation);
              this.complianceReport.packageNaming.violations.push(violation);
            }
          }
        }
      } catch (error) {
        console.warn(`⚠️ Could not parse ${file.path}:`, error.message);
      }
    }

    // Calculate package naming score
    const totalPackageViolations = this.stats.packageNamingIssues;
    this.complianceReport.packageNaming.score = Math.max(0, 100 - (totalPackageViolations * 10));

    console.log(`   📊 Found ${totalPackageViolations} package naming violations`);
  }

  /**
   * 🌍 Validate i18n key structure
   */
  async validateI18nNaming(rootPath) {
    console.log('🌍 Validating i18n key structure...');

    const i18nFiles = findAllFiles(rootPath, {
      patterns: ['**/locales/**/*.json', '**/i18n/**/*.json'],
      excludeNodeModules: true
    });

    for (const file of i18nFiles) {
      try {
        const content = JSON.parse(fs.readFileSync(file.path, 'utf8'));
        const relativePath = path.relative(rootPath, file.path);

        this.validateI18nKeyStructure(content, '', relativePath);
      } catch (error) {
        console.warn(`⚠️ Could not parse i18n file ${file.path}:`, error.message);
      }
    }

    // Calculate i18n naming score
    const totalI18nViolations = this.stats.i18nNamingIssues;
    this.complianceReport.i18nNaming.score = Math.max(0, 100 - (totalI18nViolations * 5));

    console.log(`   📊 Found ${totalI18nViolations} i18n naming violations`);
  }

  /**
   * 🌐 Validate API endpoint naming (if OpenAPI specs exist)
   */
  async validateApiNaming(rootPath) {
    console.log('🌐 Validating API endpoint naming...');

    // Look for OpenAPI/Swagger specs or API route definitions
    const apiFiles = findAllFiles(rootPath, {
      patterns: ['**/openapi.json', '**/swagger.json', '**/api/**/*.ts', '**/routes/**/*.ts'],
      excludeNodeModules: true
    });

    for (const file of apiFiles) {
      const content = fs.readFileSync(file.path, 'utf8');
      const relativePath = path.relative(rootPath, file.path);

      // Look for route definitions or API paths
      const routePatterns = [
        /app\.(get|post|put|delete|patch)\(['"`]([^'"`]+)['"`]/g,
        /router\.(get|post|put|delete|patch)\(['"`]([^'"`]+)['"`]/g,
        /'([^']+)':\s*\{/g  // OpenAPI paths
      ];

      for (const pattern of routePatterns) {
        let match;
        while ((match = pattern.exec(content)) !== null) {
          const apiPath = match[2] || match[1];

          if (apiPath && apiPath.startsWith('/')) {
            if (!this.isValidApiPath(apiPath)) {
              const violation = {
                type: 'api-naming-violation',
                severity: 'MEDIUM',
                file: relativePath,
                apiPath: apiPath,
                line: this.getLineNumber(content, match.index),
                expected: 'RESTful kebab-case paths',
                message: `API path should follow RESTful conventions: ${apiPath}`
              };

              this.stats.apiNamingIssues++;
              this.stats.totalViolations++;
              this.violations.push(violation);
              this.complianceReport.apiNaming.violations.push(violation);
            }
          }
        }
      }
    }

    // Calculate API naming score
    const totalApiViolations = this.stats.apiNamingIssues;
    this.complianceReport.apiNaming.score = Math.max(0, 100 - (totalApiViolations * 5));

    console.log(`   📊 Found ${totalApiViolations} API naming violations`);
  }

  /**
   * 🗂️ Helper: Find directories recursively
   */
  findDirectories(rootPath) {
    const directories = [];

    function scanDir(dirPath) {
      try {
        const entries = fs.readdirSync(dirPath, { withFileTypes: true });

        for (const entry of entries) {
          if (entry.isDirectory()) {
            const fullPath = path.join(dirPath, entry.name);
            directories.push(fullPath);

            // Recursively scan subdirectories
            if (entry.name !== 'node_modules' && entry.name !== '.git') {
              scanDir(fullPath);
            }
          }
        }
      } catch (error) {
        // Skip directories we can't read
      }
    }

    scanDir(rootPath);
    return directories;
  }

  /**
   * 🔍 Helper: Check if import violates LEGO principles
   */
  isNonLegoImportViolation(importPath) {
    const violatingPatterns = [
      /^react-bootstrap/,
      /^antd/,
      /^@mui\/material/,
      /^styled-components/,
      /^@emotion\/styled/,
      // Add more patterns for libraries that should be replaced with LEGO
    ];

    return violatingPatterns.some(pattern => pattern.test(importPath));
  }

  /**
   * 💡 Helper: Suggest LEGO alternative
   */
  suggestLegoAlternative(importPath) {
    const suggestions = {
      'react-bootstrap': '@layera/buttons, @layera/cards, @layera/layout',
      'antd': '@layera/buttons, @layera/forms, @layera/layout',
      '@mui/material': '@layera/buttons, @layera/typography, @layera/layout',
      'styled-components': '@layera design tokens + CSS modules'
    };

    for (const [pattern, suggestion] of Object.entries(suggestions)) {
      if (importPath.includes(pattern)) {
        return suggestion;
      }
    }

    return '@layera/* packages';
  }

  /**
   * 🔍 Helper: Check if @layera import is incorrect
   */
  isIncorrectLegoImport(importPath) {
    // Add validation for known @layera packages
    const validLegoPackages = Object.keys(LEGO_IMPORTS);
    const packageName = importPath.replace('@layera/', '');

    return !validLegoPackages.includes(packageName);
  }

  /**
   * 🔧 Helper: Correct LEGO import path
   */
  correctLegoImportPath(importPath) {
    // Suggest closest match from valid LEGO packages
    const validPackages = Object.keys(LEGO_IMPORTS);
    return `@layera/${validPackages[0]} (check LEGO_SYSTEMS_REGISTRY.md)`;
  }

  /**
   * 🔍 Helper: Validate i18n key structure recursively
   */
  validateI18nKeyStructure(obj, keyPath, file) {
    for (const [key, value] of Object.entries(obj)) {
      const fullKey = keyPath ? `${keyPath}.${key}` : key;

      // Check key naming convention
      if (!/^[a-z][a-zA-Z0-9]*$/.test(key)) {
        const violation = {
          type: 'i18n-naming-violation',
          severity: 'MEDIUM',
          file: file,
          key: fullKey,
          expected: 'camelCase keys',
          message: `i18n key should use camelCase: ${key}`
        };

        this.stats.i18nNamingIssues++;
        this.stats.totalViolations++;
        this.violations.push(violation);
        this.complianceReport.i18nNaming.violations.push(violation);
      }

      // Recursively check nested objects
      if (typeof value === 'object' && value !== null) {
        this.validateI18nKeyStructure(value, fullKey, file);
      }
    }
  }

  /**
   * 🌐 Helper: Validate API path follows RESTful conventions
   */
  isValidApiPath(apiPath) {
    // RESTful API naming conventions
    const validPatterns = [
      /^\/api\/v\d+\/[a-z-]+$/,                  // /api/v1/users
      /^\/api\/v\d+\/[a-z-]+\/\{[a-z]+\}$/,      // /api/v1/users/{id}
      /^\/api\/v\d+\/[a-z-]+\/\{[a-z]+\}\/[a-z-]+$/, // /api/v1/users/{id}/orders
      /^\/api\/v\d+\/[a-z-]+\/\{[a-z]+\}\/actions\/[a-z-]+$/ // /api/v1/users/{id}/actions/reset-password
    ];

    return validPatterns.some(pattern => pattern.test(apiPath));
  }

  /**
   * 📍 Helper: Get line number for position in content
   */
  getLineNumber(content, position) {
    return content.substring(0, position).split('\n').length;
  }

  /**
   * 📊 Generate comprehensive compliance report
   */
  generateComplianceReport() {
    const overallScore = Math.round(
      (this.complianceReport.fileNaming.score +
       this.complianceReport.directoryNaming.score +
       this.complianceReport.importNaming.score +
       this.complianceReport.packageNaming.score +
       this.complianceReport.i18nNaming.score +
       this.complianceReport.apiNaming.score) / 6
    );

    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        ...this.stats,
        overallScore: overallScore,
        complianceLevel: this.getComplianceLevel(overallScore)
      },
      categories: this.complianceReport,
      violations: this.violations,
      recommendations: this.generateRecommendations()
    };

    // Save detailed JSON report
    const reportPath = path.join(process.cwd(), 'NAMING_CONVENTIONS_VALIDATION_REPORT.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    // Print summary
    this.printSummary(report);

    return report;
  }

  /**
   * 💡 Generate actionable recommendations
   */
  generateRecommendations() {
    const recommendations = [];

    if (this.stats.fileNamingIssues > 0) {
      recommendations.push({
        category: 'File Naming',
        priority: 'HIGH',
        action: 'Rename files to follow Enterprise conventions',
        command: 'node scripts/domains/docs/fix-naming-violations.js --files'
      });
    }

    if (this.stats.importNamingIssues > 0) {
      recommendations.push({
        category: 'Import Naming',
        priority: 'CRITICAL',
        action: 'Replace non-LEGO imports with @layera packages',
        command: 'node scripts/domains/lego/fix-lego-violations.js'
      });
    }

    if (this.stats.packageNamingIssues > 0) {
      recommendations.push({
        category: 'Package Naming',
        priority: 'CRITICAL',
        action: 'Update package.json names to follow conventions',
        command: 'Manual update required for package.json files'
      });
    }

    return recommendations;
  }

  /**
   * 🖨️ Print validation summary
   */
  printSummary(report) {
    console.log('\n🏷️ ENTERPRISE NAMING CONVENTIONS VALIDATION REPORT');
    console.log('=====================================================\n');

    console.log('📊 OVERALL COMPLIANCE:');
    console.log(`🎯 Overall Score: ${report.summary.overallScore}% (${report.summary.complianceLevel})\n`);

    console.log('📋 CATEGORY BREAKDOWN:');
    console.log(`├─ File Naming: ${this.complianceReport.fileNaming.score}%`);
    console.log(`├─ Directory Naming: ${this.complianceReport.directoryNaming.score}%`);
    console.log(`├─ Import Naming: ${this.complianceReport.importNaming.score}%`);
    console.log(`├─ Package Naming: ${this.complianceReport.packageNaming.score}%`);
    console.log(`├─ i18n Naming: ${this.complianceReport.i18nNaming.score}%`);
    console.log(`└─ API Naming: ${this.complianceReport.apiNaming.score}%\n`);

    console.log('🔍 VIOLATIONS SUMMARY:');
    console.log(`├─ Total violations: ${this.stats.totalViolations}`);
    console.log(`├─ File naming issues: ${this.stats.fileNamingIssues}`);
    console.log(`├─ Directory naming issues: ${this.stats.directoryNamingIssues}`);
    console.log(`├─ Import naming issues: ${this.stats.importNamingIssues}`);
    console.log(`├─ Package naming issues: ${this.stats.packageNamingIssues}`);
    console.log(`├─ i18n naming issues: ${this.stats.i18nNamingIssues}`);
    console.log(`└─ API naming issues: ${this.stats.apiNamingIssues}\n`);

    // Show sample violations
    if (this.violations.length > 0) {
      console.log('🚨 SAMPLE VIOLATIONS:');
      this.violations.slice(0, 5).forEach((violation, index) => {
        console.log(`${index + 1}. [${violation.severity}] ${violation.message}`);
        console.log(`   File: ${violation.file || violation.directory}`);
      });
      console.log();
    }

    // Show recommendations
    if (report.recommendations.length > 0) {
      console.log('💡 RECOMMENDATIONS:');
      report.recommendations.forEach((rec, index) => {
        console.log(`${index + 1}. [${rec.priority}] ${rec.action}`);
        console.log(`   Command: ${rec.command}`);
      });
      console.log();
    }

    console.log(`📄 Detailed report saved: NAMING_CONVENTIONS_VALIDATION_REPORT.json`);

    // Exit code based on compliance
    if (report.summary.overallScore < 80) {
      console.log('\n❌ NAMING CONVENTIONS COMPLIANCE FAILED');
      console.log('Enterprise standards require 80%+ compliance');
    } else {
      console.log('\n✅ NAMING CONVENTIONS COMPLIANCE PASSED');
    }
  }

  /**
   * 📈 Get compliance level
   */
  getComplianceLevel(score) {
    if (score >= 95) return 'GOLD';
    if (score >= 85) return 'SILVER';
    if (score >= 75) return 'BRONZE';
    return 'NEEDS_WORK';
  }
}

// CLI execution
if (require.main === module) {
  const args = process.argv.slice(2);
  const options = {
    path: args.find(arg => arg.startsWith('--path='))?.split('=')[1] || '.',
    fix: args.includes('--fix'),
    strict: args.includes('--strict'),
    category: args.find(arg => arg.startsWith('--category='))?.split('=')[1]
  };

  const validator = new NamingConventionsValidator();

  validator.validateAllNamingConventions(options.path, options)
    .then(() => {
      // Exit with error code if violations found (for CI/CD)
      const exitCode = validator.stats.totalViolations > 0 ? 1 : 0;
      process.exit(exitCode);
    })
    .catch(error => {
      console.error('❌ Naming conventions validation failed:', error.message);
      process.exit(1);
    });
}

module.exports = NamingConventionsValidator;