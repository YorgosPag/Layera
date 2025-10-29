#!/usr/bin/env node

/**
 * 🔧 ENTERPRISE NAMING VIOLATIONS AUTO-FIX
 * Γιώργου Παγώνη - Documentation Domain Tool
 *
 * Automated fixing of naming convention violations:
 * - File renaming with git-safe operations
 * - Import path updates after renames
 * - Package.json name corrections
 * - Directory structure fixes
 * - Batch operations with rollback capability
 *
 * Based on Fortune 500 automation standards
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Import validation engine
const NamingConventionsValidator = require('./validate-naming-conventions');
const { findAllFiles } = require('./shared/file-scanner');

class NamingViolationsFixer {
  constructor() {
    this.stats = {
      filesRenamed: 0,
      directoriesRenamed: 0,
      importsUpdated: 0,
      packagesUpdated: 0,
      totalChanges: 0,
      errors: 0
    };

    this.changes = [];
    this.errors = [];
    this.rollbackOperations = [];
  }

  /**
   * 🔧 Main auto-fix orchestrator
   */
  async fixAllNamingViolations(rootPath = '.', options = {}) {
    console.log('🔧 ENTERPRISE NAMING VIOLATIONS AUTO-FIX');
    console.log('Automatically correcting naming convention violations...\n');

    // First, run validation to get violations
    const validator = new NamingConventionsValidator();
    const report = await validator.validateAllNamingConventions(rootPath, { silent: true });

    if (validator.stats.totalViolations === 0) {
      console.log('✅ No naming violations found - nothing to fix!');
      return;
    }

    console.log(`🔍 Found ${validator.stats.totalViolations} violations to fix\n`);

    try {
      // Create backup before starting
      if (options.backup !== false) {
        await this.createBackup(rootPath);
      }

      // Fix violations by category
      await this.fixFileNamingViolations(validator.violations, rootPath, options);
      await this.fixDirectoryNamingViolations(validator.violations, rootPath, options);
      await this.fixImportPathsAfterRenames(rootPath, options);
      await this.fixPackageNamingViolations(validator.violations, rootPath, options);

      // Update git index if in git repo
      if (this.isGitRepo(rootPath)) {
        await this.updateGitIndex(rootPath);
      }

      this.printSummary();

    } catch (error) {
      console.error(`❌ Auto-fix failed: ${error.message}`);

      if (options.rollback !== false) {
        console.log('🔄 Rolling back changes...');
        await this.rollbackChanges();
      }

      throw error;
    }
  }

  /**
   * 📄 Fix file naming violations
   */
  async fixFileNamingViolations(violations, rootPath, options) {
    const fileViolations = violations.filter(v => v.type === 'file-naming-violation');

    if (fileViolations.length === 0) return;

    console.log(`📄 Fixing ${fileViolations.length} file naming violations...`);

    for (const violation of fileViolations) {
      try {
        const oldPath = path.resolve(rootPath, violation.file);
        const newFileName = this.generateCorrectFileName(violation);
        const newPath = path.join(path.dirname(oldPath), newFileName);

        if (fs.existsSync(oldPath) && oldPath !== newPath) {
          // Check if target file already exists
          if (fs.existsSync(newPath)) {
            console.warn(`⚠️ Target file already exists, skipping: ${newFileName}`);
            continue;
          }

          // Perform the rename
          if (options.dryRun) {
            console.log(`   🔄 [DRY RUN] Would rename: ${violation.file} → ${newFileName}`);
          } else {
            fs.renameSync(oldPath, newPath);

            this.stats.filesRenamed++;
            this.stats.totalChanges++;

            this.changes.push({
              type: 'file-rename',
              oldPath: oldPath,
              newPath: newPath,
              oldRelative: violation.file,
              newRelative: path.relative(rootPath, newPath)
            });

            this.rollbackOperations.push({
              type: 'rename-back',
              from: newPath,
              to: oldPath
            });

            console.log(`   ✅ Renamed: ${violation.file} → ${newFileName}`);
          }
        }
      } catch (error) {
        this.errors.push({
          type: 'file-rename-error',
          file: violation.file,
          error: error.message
        });
        this.stats.errors++;
        console.error(`   ❌ Failed to rename ${violation.file}: ${error.message}`);
      }
    }
  }

  /**
   * 📁 Fix directory naming violations
   */
  async fixDirectoryNamingViolations(violations, rootPath, options) {
    const dirViolations = violations.filter(v => v.type === 'directory-naming-violation');

    if (dirViolations.length === 0) return;

    console.log(`📁 Fixing ${dirViolations.length} directory naming violations...`);

    // Sort by depth (deepest first) to avoid conflicts
    dirViolations.sort((a, b) => b.directory.split('/').length - a.directory.split('/').length);

    for (const violation of dirViolations) {
      try {
        const oldPath = path.resolve(rootPath, violation.directory);
        const newDirName = this.generateCorrectDirectoryName(violation);
        const newPath = path.join(path.dirname(oldPath), newDirName);

        if (fs.existsSync(oldPath) && oldPath !== newPath) {
          // Check if target directory already exists
          if (fs.existsSync(newPath)) {
            console.warn(`⚠️ Target directory already exists, skipping: ${newDirName}`);
            continue;
          }

          if (options.dryRun) {
            console.log(`   🔄 [DRY RUN] Would rename directory: ${violation.directory} → ${newDirName}`);
          } else {
            fs.renameSync(oldPath, newPath);

            this.stats.directoriesRenamed++;
            this.stats.totalChanges++;

            this.changes.push({
              type: 'directory-rename',
              oldPath: oldPath,
              newPath: newPath,
              oldRelative: violation.directory,
              newRelative: path.relative(rootPath, newPath)
            });

            this.rollbackOperations.push({
              type: 'rename-back',
              from: newPath,
              to: oldPath
            });

            console.log(`   ✅ Renamed directory: ${violation.directory} → ${newDirName}`);
          }
        }
      } catch (error) {
        this.errors.push({
          type: 'directory-rename-error',
          directory: violation.directory,
          error: error.message
        });
        this.stats.errors++;
        console.error(`   ❌ Failed to rename directory ${violation.directory}: ${error.message}`);
      }
    }
  }

  /**
   * 📦 Fix import paths after file/directory renames
   */
  async fixImportPathsAfterRenames(rootPath, options) {
    if (this.changes.length === 0) return;

    console.log(`📦 Updating import paths after renames...`);

    const sourceFiles = findAllFiles(rootPath, {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
      excludeNodeModules: true,
      excludeBackups: true
    });

    for (const file of sourceFiles) {
      try {
        const content = fs.readFileSync(file.path, 'utf8');
        let updatedContent = content;
        let hasChanges = false;

        // Update import paths based on our changes
        for (const change of this.changes) {
          if (change.type === 'file-rename' || change.type === 'directory-rename') {
            const oldImportPath = this.pathToImportPath(change.oldRelative, file.path, rootPath);
            const newImportPath = this.pathToImportPath(change.newRelative, file.path, rootPath);

            if (oldImportPath && newImportPath && oldImportPath !== newImportPath) {
              // Replace import statements
              const importPattern = new RegExp(
                `(import\\s+.*?\\s+from\\s+['"])${this.escapeRegex(oldImportPath)}(['"])`,
                'g'
              );

              const newContent = updatedContent.replace(importPattern, `$1${newImportPath}$2`);

              if (newContent !== updatedContent) {
                updatedContent = newContent;
                hasChanges = true;
                this.stats.importsUpdated++;
              }
            }
          }
        }

        // Write updated content
        if (hasChanges && !options.dryRun) {
          fs.writeFileSync(file.path, updatedContent);
          console.log(`   ✅ Updated imports in: ${path.relative(rootPath, file.path)}`);

          this.rollbackOperations.push({
            type: 'restore-content',
            file: file.path,
            originalContent: content
          });
        } else if (hasChanges && options.dryRun) {
          console.log(`   🔄 [DRY RUN] Would update imports in: ${path.relative(rootPath, file.path)}`);
        }

      } catch (error) {
        this.errors.push({
          type: 'import-update-error',
          file: file.path,
          error: error.message
        });
        this.stats.errors++;
        console.error(`   ❌ Failed to update imports in ${file.path}: ${error.message}`);
      }
    }
  }

  /**
   * 📦 Fix package.json naming violations
   */
  async fixPackageNamingViolations(violations, rootPath, options) {
    const packageViolations = violations.filter(v => v.type === 'package-naming-violation');

    if (packageViolations.length === 0) return;

    console.log(`📦 Fixing ${packageViolations.length} package naming violations...`);

    for (const violation of packageViolations) {
      try {
        const packagePath = path.resolve(rootPath, violation.file);
        const packageContent = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
        const newPackageName = this.generateCorrectPackageName(violation);

        if (packageContent.name !== newPackageName) {
          if (options.dryRun) {
            console.log(`   🔄 [DRY RUN] Would update package name: ${packageContent.name} → ${newPackageName}`);
          } else {
            const originalContent = fs.readFileSync(packagePath, 'utf8');
            packageContent.name = newPackageName;

            fs.writeFileSync(packagePath, JSON.stringify(packageContent, null, 2) + '\n');

            this.stats.packagesUpdated++;
            this.stats.totalChanges++;

            this.rollbackOperations.push({
              type: 'restore-content',
              file: packagePath,
              originalContent: originalContent
            });

            console.log(`   ✅ Updated package name: ${violation.packageName} → ${newPackageName}`);
          }
        }
      } catch (error) {
        this.errors.push({
          type: 'package-update-error',
          file: violation.file,
          error: error.message
        });
        this.stats.errors++;
        console.error(`   ❌ Failed to update package ${violation.file}: ${error.message}`);
      }
    }
  }

  /**
   * 📄 Generate correct file name based on violation
   */
  generateCorrectFileName(violation) {
    const originalName = path.basename(violation.file);
    const extension = path.extname(originalName);
    const baseName = path.basename(originalName, extension);

    switch (violation.category) {
      case 'components':
        // PascalCase for components
        return this.toPascalCase(baseName) + extension;

      case 'hooks':
        // useHookName for hooks
        if (!baseName.startsWith('use')) {
          return 'use' + this.toPascalCase(baseName) + extension;
        }
        return this.toCamelCase(baseName) + extension;

      case 'constants':
        // SCREAMING_SNAKE_CASE for constants
        return this.toScreamingSnakeCase(baseName) + extension;

      case 'styles':
        // kebab-case for styles
        return this.toKebabCase(baseName) + extension;

      case 'documentation':
        // CAPS_WITH_UNDERSCORES for docs
        return this.toScreamingSnakeCase(baseName) + extension;

      case 'utilities':
      default:
        // camelCase for utilities
        return this.toCamelCase(baseName) + extension;
    }
  }

  /**
   * 📁 Generate correct directory name based on violation
   */
  generateCorrectDirectoryName(violation) {
    const dirName = path.basename(violation.directory);
    return this.toKebabCase(dirName);
  }

  /**
   * 📦 Generate correct package name based on violation
   */
  generateCorrectPackageName(violation) {
    const packageName = violation.packageName;

    if (packageName.startsWith('@layera/')) {
      const packagePart = packageName.replace('@layera/', '');
      return '@layera/' + this.toKebabCase(packagePart);
    }

    if (violation.file.includes('/apps/')) {
      if (!packageName.startsWith('layera-')) {
        return 'layera-' + this.toKebabCase(packageName);
      }
      return this.toKebabCase(packageName);
    }

    return this.toKebabCase(packageName);
  }

  /**
   * 🔄 Convert to PascalCase
   */
  toPascalCase(str) {
    return str.replace(/[^a-zA-Z0-9]/g, ' ')
              .split(' ')
              .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
              .join('');
  }

  /**
   * 🔄 Convert to camelCase
   */
  toCamelCase(str) {
    const pascal = this.toPascalCase(str);
    return pascal.charAt(0).toLowerCase() + pascal.slice(1);
  }

  /**
   * 🔄 Convert to kebab-case
   */
  toKebabCase(str) {
    return str.replace(/[^a-zA-Z0-9]/g, '-')
              .replace(/([a-z])([A-Z])/g, '$1-$2')
              .toLowerCase()
              .replace(/-+/g, '-')
              .replace(/^-|-$/g, '');
  }

  /**
   * 🔄 Convert to SCREAMING_SNAKE_CASE
   */
  toScreamingSnakeCase(str) {
    return str.replace(/[^a-zA-Z0-9]/g, '_')
              .replace(/([a-z])([A-Z])/g, '$1_$2')
              .toUpperCase()
              .replace(/_+/g, '_')
              .replace(/^_|_$/g, '');
  }

  /**
   * 🔗 Convert file path to import path
   */
  pathToImportPath(filePath, fromFile, rootPath) {
    const fromDir = path.dirname(path.resolve(rootPath, fromFile));
    const toFile = path.resolve(rootPath, filePath);

    let relativePath = path.relative(fromDir, toFile);

    // Remove extension for imports
    relativePath = relativePath.replace(/\.(ts|tsx|js|jsx)$/, '');

    // Convert to forward slashes for imports
    relativePath = relativePath.replace(/\\/g, '/');

    // Add ./ prefix for relative imports
    if (!relativePath.startsWith('.')) {
      relativePath = './' + relativePath;
    }

    return relativePath;
  }

  /**
   * 🔒 Escape regex special characters
   */
  escapeRegex(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  /**
   * 💾 Create backup before making changes
   */
  async createBackup(rootPath) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupDir = path.join(rootPath, `.backup-naming-fix-${timestamp}`);

    console.log(`💾 Creating backup at: ${backupDir}`);

    try {
      if (this.isGitRepo(rootPath)) {
        // Use git to create backup
        execSync(`git stash push -m "Backup before naming fix ${timestamp}"`, { cwd: rootPath });
        console.log('   ✅ Git stash created');
      } else {
        // Create file system backup
        execSync(`cp -r . "${backupDir}"`, { cwd: rootPath });
        console.log('   ✅ File system backup created');
      }
    } catch (error) {
      console.warn(`⚠️ Backup creation failed: ${error.message}`);
    }
  }

  /**
   * 🔄 Rollback changes
   */
  async rollbackChanges() {
    console.log('🔄 Rolling back changes...');

    for (const operation of this.rollbackOperations.reverse()) {
      try {
        switch (operation.type) {
          case 'rename-back':
            if (fs.existsSync(operation.from)) {
              fs.renameSync(operation.from, operation.to);
              console.log(`   ↩️ Rolled back: ${operation.from} → ${operation.to}`);
            }
            break;

          case 'restore-content':
            fs.writeFileSync(operation.file, operation.originalContent);
            console.log(`   ↩️ Restored content: ${operation.file}`);
            break;
        }
      } catch (error) {
        console.error(`   ❌ Rollback failed for ${operation.type}: ${error.message}`);
      }
    }
  }

  /**
   * 📝 Update git index after changes
   */
  async updateGitIndex(rootPath) {
    try {
      console.log('📝 Updating git index...');
      execSync('git add .', { cwd: rootPath });
      console.log('   ✅ Git index updated');
    } catch (error) {
      console.warn(`⚠️ Git index update failed: ${error.message}`);
    }
  }

  /**
   * 🔍 Check if directory is a git repository
   */
  isGitRepo(rootPath) {
    try {
      execSync('git rev-parse --git-dir', { cwd: rootPath, stdio: 'ignore' });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * 🖨️ Print fix summary
   */
  printSummary() {
    console.log('\n🔧 ENTERPRISE NAMING VIOLATIONS AUTO-FIX SUMMARY');
    console.log('=================================================\n');

    console.log('📊 CHANGES MADE:');
    console.log(`├─ Files renamed: ${this.stats.filesRenamed}`);
    console.log(`├─ Directories renamed: ${this.stats.directoriesRenamed}`);
    console.log(`├─ Imports updated: ${this.stats.importsUpdated}`);
    console.log(`├─ Packages updated: ${this.stats.packagesUpdated}`);
    console.log(`├─ Total changes: ${this.stats.totalChanges}`);
    console.log(`└─ Errors: ${this.stats.errors}\n`);

    if (this.changes.length > 0) {
      console.log('📋 SUMMARY OF CHANGES:');
      this.changes.slice(0, 10).forEach((change, index) => {
        const oldName = path.basename(change.oldRelative);
        const newName = path.basename(change.newRelative);
        console.log(`${index + 1}. ${oldName} → ${newName} (${change.type})`);
      });

      if (this.changes.length > 10) {
        console.log(`   ... and ${this.changes.length - 10} more changes`);
      }
      console.log();
    }

    if (this.errors.length > 0) {
      console.log('❌ ERRORS ENCOUNTERED:');
      this.errors.slice(0, 5).forEach((error, index) => {
        console.log(`${index + 1}. ${error.type}: ${error.error}`);
      });

      if (this.errors.length > 5) {
        console.log(`   ... and ${this.errors.length - 5} more errors`);
      }
      console.log();
    }

    if (this.stats.totalChanges > 0) {
      console.log('💡 NEXT STEPS:');
      console.log('1. Review the changes made');
      console.log('2. Run tests to ensure nothing is broken');
      console.log('3. Run validation again: npm run naming:validate');
      console.log('4. Commit the changes if everything looks good');
    }

    console.log(`\n${this.stats.errors > 0 ? '⚠️' : '✅'} Auto-fix completed`);
  }
}

// CLI execution
if (require.main === module) {
  const args = process.argv.slice(2);
  const options = {
    path: args.find(arg => arg.startsWith('--path='))?.split('=')[1] || '.',
    dryRun: args.includes('--dry-run'),
    backup: !args.includes('--no-backup'),
    rollback: !args.includes('--no-rollback'),
    files: args.includes('--files'),
    directories: args.includes('--directories'),
    imports: args.includes('--imports'),
    packages: args.includes('--packages')
  };

  const fixer = new NamingViolationsFixer();

  fixer.fixAllNamingViolations(options.path, options)
    .then(() => {
      const exitCode = fixer.stats.errors > 0 ? 1 : 0;
      process.exit(exitCode);
    })
    .catch(error => {
      console.error('❌ Auto-fix failed:', error.message);
      process.exit(1);
    });
}

module.exports = NamingViolationsFixer;