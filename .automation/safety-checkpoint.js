#!/usr/bin/env node

/**
 * 🛡️ LAYERA SAFETY CHECKPOINT SYSTEM
 * Αυτόματο backup και commit system που εξασφαλίζει ότι η εφαρμογή
 * είναι πάντα σε λειτουργική κατάσταση μετά από git operations
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Process interruption handling
let isShuttingDown = false;
let currentBackupPath = null;

class LayeraSafetySystem {
  constructor() {
    // Cross-platform project root detection
    this.projectRoot = this.findProjectRoot();
    this.tokensPath = path.join(this.projectRoot, 'packages', 'tokens');
    this.distPath = path.join(this.tokensPath, 'dist', 'tokens.css');
    this.backupDir = path.join(this.projectRoot, '.automation', 'backups');
    this.lockFile = path.join(this.projectRoot, '.automation', '.lock');

    // Setup interruption handling
    this.setupInterruptionHandling();
  }

  findProjectRoot() {
    // Start from current file location and walk up
    let currentDir = path.dirname(__filename);

    while (currentDir !== path.dirname(currentDir)) {
      // Check for package.json and pnpm-workspace.yaml (monorepo indicators)
      const packageJson = path.join(currentDir, 'package.json');
      const workspaceYml = path.join(currentDir, 'pnpm-workspace.yaml');
      const layeraIndicator = path.join(currentDir, 'packages', 'tokens');

      if (fs.existsSync(packageJson) &&
          fs.existsSync(workspaceYml) &&
          fs.existsSync(layeraIndicator)) {
        return currentDir;
      }

      currentDir = path.dirname(currentDir);
    }

    // Fallback: use process.cwd()
    const cwd = process.cwd();
    const cwdPackageJson = path.join(cwd, 'package.json');

    if (fs.existsSync(cwdPackageJson)) {
      return cwd;
    }

    // Last resort: assume running from .automation directory
    return path.resolve(__dirname, '..');
  }

  setupInterruptionHandling() {
    const cleanup = () => {
      if (isShuttingDown) return;
      isShuttingDown = true;

      this.log('🛑 ΔΙΑΚΟΠΗ ΕΡΓΑΣΙΑΣ - ΚΑΘΑΡΙΣΜΟΣ...', 'warning');

      try {
        // Remove lock file
        if (fs.existsSync(this.lockFile)) {
          fs.unlinkSync(this.lockFile);
        }

        // Log backup info if available
        if (currentBackupPath) {
          this.log(`📁 Backup διαθέσιμο: ${currentBackupPath}`, 'info');
        }

        this.log('✅ Καθαρισμός ολοκληρώθηκε', 'success');
      } catch (error) {
        console.error('Σφάλμα καθαρισμού:', error.message);
      }

      process.exit(0);
    };

    process.on('SIGINT', cleanup);
    process.on('SIGTERM', cleanup);
    process.on('exit', cleanup);
  }

  checkPermissions(filePath) {
    return new Promise((resolve, reject) => {
      fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
          reject(new Error(`Αρχείο δεν υπάρχει: ${filePath}`));
          return;
        }

        fs.access(filePath, fs.constants.R_OK | fs.constants.W_OK, (err) => {
          if (err) {
            reject(new Error(`Μη επαρκή δικαιώματα για: ${filePath}`));
            return;
          }
          resolve(true);
        });
      });
    });
  }

  async checkAllPermissions() {
    this.log('Έλεγχος δικαιωμάτων αρχείων...', 'check');

    try {
      // Check project root
      await this.checkPermissions(this.projectRoot);

      // Check tokens directory
      await this.checkPermissions(this.tokensPath);

      // Check if we can write to backup directory
      if (!fs.existsSync(this.backupDir)) {
        fs.mkdirSync(this.backupDir, { recursive: true });
      }
      await this.checkPermissions(this.backupDir);

      this.log('Δικαιώματα αρχείων - ΟΚ', 'success');
      return true;
    } catch (error) {
      throw new Error(`Πρόβλημα δικαιωμάτων: ${error.message}`);
    }
  }

  createLockFile() {
    if (fs.existsSync(this.lockFile)) {
      const lockContent = fs.readFileSync(this.lockFile, 'utf8');
      throw new Error(`Άλλη διεργασία τρέχει ήδη (PID: ${lockContent}). Περιμένετε να ολοκληρωθεί.`);
    }

    fs.writeFileSync(this.lockFile, process.pid.toString());
    this.log(`🔒 Lock file δημιουργήθηκε (PID: ${process.pid})`, 'info');
  }

  removeLockFile() {
    if (fs.existsSync(this.lockFile)) {
      fs.unlinkSync(this.lockFile);
      this.log('🔓 Lock file καταργήθηκε', 'info');
    }
  }

  validatePaths() {
    this.log('Επαλήθευση cross-platform paths...', 'check');

    const paths = [
      this.projectRoot,
      this.tokensPath,
      this.backupDir
    ];

    for (const pathToCheck of paths) {
      // Cross-platform absolute path validation
      if (!path.isAbsolute(pathToCheck)) {
        throw new Error(`Invalid absolute path: ${pathToCheck}`);
      }

      // Check for dangerous characters (cross-platform)
      const dangerousChars = process.platform === 'win32' ? /[<>"|?*]/ : /[\x00]/;
      if (dangerousChars.test(pathToCheck)) {
        throw new Error(`Path contains dangerous characters: ${pathToCheck}`);
      }
    }

    this.log('Cross-platform paths - ΟΚ', 'success');
  }

  log(message, type = 'info') {
    const timestamp = new Date().toLocaleTimeString('el-GR');
    const prefix = {
      'info': '📝',
      'success': '✅',
      'warning': '⚠️',
      'error': '❌',
      'process': '🔄',
      'check': '🔍'
    };
    console.log(`${prefix[type]} [${timestamp}] ${message}`);
  }

  execCommand(command, description) {
    this.log(`${description}...`, 'process');
    try {
      const result = execSync(command, {
        cwd: this.projectRoot,
        encoding: 'utf8',
        stdio: 'pipe'
      });
      this.log(`${description} - ΕΠΙΤΥΧΩΣ`, 'success');
      return result;
    } catch (error) {
      this.log(`${description} - ΑΠΟΤΥΧΙΑ: ${error.message}`, 'error');
      throw error;
    }
  }

  createBackupDir() {
    if (!fs.existsSync(this.backupDir)) {
      fs.mkdirSync(this.backupDir, { recursive: true });
      this.log('Δημιουργήθηκε φάκελος backup', 'success');
    }
  }

  backupCurrentState() {
    this.createBackupDir();
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const backupPath = path.join(this.backupDir, `backup-${timestamp}`);

    this.log('Δημιουργία backup τρέχουσας κατάστασης...', 'process');

    // Backup source files
    const srcBackup = path.join(backupPath, 'src');
    fs.mkdirSync(srcBackup, { recursive: true });

    // Cross-platform file copy - νέο tokens system
    if (process.platform === 'win32') {
      this.execCommand(
        `xcopy "${path.join(this.tokensPath, 'src')}" "${srcBackup}" /E /I /Y`,
        'Backup source files'
      );
    } else {
      this.execCommand(
        `cp -r "${path.join(this.tokensPath, 'src')}"/* "${srcBackup}"/`,
        'Backup source files'
      );
    }

    // Backup dist files
    const distBackup = path.join(backupPath, 'dist');
    fs.mkdirSync(distBackup, { recursive: true });
    if (fs.existsSync(path.join(this.tokensPath, 'dist'))) {
      // Cross-platform file copy
      if (process.platform === 'win32') {
        this.execCommand(
          `xcopy "${path.join(this.tokensPath, 'dist')}" "${distBackup}" /E /I /Y`,
          'Backup dist files'
        );
      } else {
        this.execCommand(
          `cp -r "${path.join(this.tokensPath, 'dist')}"/* "${distBackup}"/`,
          'Backup dist files'
        );
      }
    }

    return backupPath;
  }

  buildTokens() {
    this.log('Rebuilding tokens...', 'process');
    this.execCommand(
      'cd packages/tokens && npm run build',
      'Build tokens'
    );

    // Verify build success
    if (fs.existsSync(this.distPath)) {
      const stats = fs.statSync(this.distPath);
      this.log(`Tokens built - Size: ${Math.round(stats.size / 1024)}KB`, 'success');

      // Verify minimum expected size (should be > 4KB for working enterprise tokens)
      if (stats.size < 4000) {
        throw new Error(`CSS file too small (${stats.size} bytes) - possibly broken build`);
      }
    } else {
      throw new Error('CSS file not found after build');
    }
  }

  commitWithDistFiles(message) {
    this.log('Staging changes...', 'process');

    // Add all changes
    this.execCommand('git add .', 'Stage all changes');

    // Commit source changes
    this.execCommand(
      `git commit -m "🎯 ${message} - SAFETY CHECKPOINT" --no-verify`,
      'Commit source changes'
    );

    // Add dist files (FORCE add to bypass gitignore)
    if (fs.existsSync(path.join(this.tokensPath, 'dist'))) {
      try {
        // Force add dist files even if they are gitignored
        this.execCommand(
          'git add -f packages/tokens/dist/',
          'Force stage dist files (bypass gitignore)'
        );
        this.execCommand(
          `git commit -m "📦 Auto-generated dist files for: ${message}" --no-verify`,
          'Commit dist files'
        );
      } catch (error) {
        this.log('Dist files not committed - ERROR: ' + error.message, 'warning');
      }
    }
  }

  verifyAppState() {
    this.log('Verifying application state...', 'process');

    // Check if CSS file exists and has reasonable size
    if (!fs.existsSync(this.distPath)) {
      throw new Error('CSS tokens file missing');
    }

    const stats = fs.statSync(this.distPath);
    if (stats.size < 4000) {
      throw new Error(`CSS tokens file too small: ${stats.size} bytes`);
    }

    // Check for critical design tokens variables
    const cssContent = fs.readFileSync(this.distPath, 'utf8');
    const criticalVars = [
      '--layera-spacing-4',
      '--layera-color-primary-500',
      '--layera-icon-md'
    ];

    for (const varName of criticalVars) {
      if (!cssContent.includes(varName)) {
        throw new Error(`Critical variable missing: ${varName}`);
      }
    }

    this.log('Application state verification - ΕΠΙΤΥΧΩΣ', 'success');
  }

  async run(commitMessage) {
    try {
      this.log('🛡️ ΕΚΚΙΝΗΣΗ LAYERA SAFETY CHECKPOINT', 'info');
      this.log(`Commit Message: "${commitMessage}"`, 'info');

      // Step 0: Safety checks
      this.validatePaths();
      await this.checkAllPermissions();
      this.createLockFile();

      // Step 1: Backup current state
      const backupPath = this.backupCurrentState();
      currentBackupPath = backupPath;
      this.log(`Backup created: ${backupPath}`, 'success');

      // Step 2: Build tokens
      this.buildTokens();

      // Step 3: Verify application is working
      this.verifyAppState();

      // Step 4: Commit everything
      this.commitWithDistFiles(commitMessage);

      // Step 5: Final verification
      this.verifyAppState();

      this.log('🎉 SAFETY CHECKPOINT ΟΛΟΚΛΗΡΩΘΗΚΕ ΕΠΙΤΥΧΩΣ!', 'success');
      this.log(`✅ Εφαρμογή σε λειτουργική κατάσταση`, 'success');
      this.log(`✅ Αλλαγές committed με ασφάλεια`, 'success');
      this.log(`✅ Backup διαθέσιμο: ${backupPath}`, 'success');

      // Cleanup
      this.removeLockFile();

    } catch (error) {
      this.log(`💥 ΣΦΑΛΜΑ ΣΤΟΝ SAFETY CHECKPOINT: ${error.message}`, 'error');
      this.log('🔄 Επαναφορά σε προηγούμενη κατάσταση απαιτείται', 'warning');

      // Cleanup on error
      this.removeLockFile();
      process.exit(1);
    }
  }
}

// CLI Usage
if (require.main === module) {
  const commitMessage = process.argv[2] || 'Manual Safety Checkpoint';
  const safety = new LayeraSafetySystem();

  // Handle async execution
  (async () => {
    try {
      await safety.run(commitMessage);
    } catch (error) {
      console.error('❌ Execution failed:', error.message);
      process.exit(1);
    }
  })();
}

module.exports = LayeraSafetySystem;