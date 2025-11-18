#!/usr/bin/env node

/**
 * ↩️ LAYERA RESTORE SYSTEM
 * Αυτόματη επαναφορά από git που εξασφαλίζει ότι η εφαρμογή
 * θα είναι σε λειτουργική κατάσταση μετά την επαναφορά
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

class LayeraRestoreSystem {
  constructor() {
    this.projectRoot = 'C:\\layera';
    this.tokensPath = path.join(this.projectRoot, 'packages', 'tokens');
    this.distPath = path.join(this.tokensPath, 'dist', 'css', 'tokens.css');
    this.backupDir = path.join(this.projectRoot, '.automation', 'backups');
  }

  log(message, type = 'info') {
    const timestamp = new Date().toLocaleTimeString('el-GR');
    const prefix = {
      'info': '📝',
      'success': '✅',
      'warning': '⚠️',
      'error': '❌',
      'process': '🔄'
    };
    console.log(`${prefix[type]} [${timestamp}] ${message}`);
  }

  execCommand(command, description, allowFail = false) {
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
      if (allowFail) {
        this.log(`${description} - ΑΠΟΤΥΧΙΑ (αναμενόμενη): ${error.message}`, 'warning');
        return null;
      } else {
        this.log(`${description} - ΑΠΟΤΥΧΙΑ: ${error.message}`, 'error');
        throw error;
      }
    }
  }

  showRecentCommits() {
    this.log('Εμφάνιση πρόσφατων commits:', 'info');
    const commits = this.execCommand(
      'git log --oneline -10',
      'Ανάκτηση commit history'
    );
    console.log(commits);
  }

  restoreToCommit(stepsBack = 1) {
    this.log(`Επαναφορά ${stepsBack} commit(s) πίσω...`, 'process');

    // Create backup before restore
    this.createEmergencyBackup();

    // Restore source files
    this.execCommand(
      `git reset --hard HEAD~${stepsBack}`,
      'Git restore source files'
    );

    this.log('Git επαναφορά ολοκληρώθηκε', 'success');
  }

  createEmergencyBackup() {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const emergencyBackup = path.join(this.backupDir, `emergency-${timestamp}`);

    this.log('Δημιουργία emergency backup...', 'process');

    // Backup current state before restore
    if (fs.existsSync(this.tokensPath)) {
      fs.mkdirSync(emergencyBackup, { recursive: true });

      if (fs.existsSync(path.join(this.tokensPath, 'src'))) {
        const srcBackup = path.join(emergencyBackup, 'src');
        fs.mkdirSync(srcBackup, { recursive: true });
        this.execCommand(
          `robocopy "${path.join(this.tokensPath, 'src')}" "${srcBackup}" /E /R:0 /W:0`,
          'Emergency backup - source files',
          true
        );
      }

      if (fs.existsSync(path.join(this.tokensPath, 'dist'))) {
        const distBackup = path.join(emergencyBackup, 'dist');
        fs.mkdirSync(distBackup, { recursive: true });
        this.execCommand(
          `robocopy "${path.join(this.tokensPath, 'dist')}" "${distBackup}" /E /R:0 /W:0`,
          'Emergency backup - dist files',
          true
        );
      }

      this.log(`Emergency backup: ${emergencyBackup}`, 'success');
    }

    return emergencyBackup;
  }

  rebuildTokens() {
    this.log('Rebuilding tokens μετά την επαναφορά...', 'process');

    try {
      this.execCommand(
        'pnpm --filter @layera/tokens build',
        'Rebuild tokens'
      );

      // Verify build
      if (fs.existsSync(this.distPath)) {
        const stats = fs.statSync(this.distPath);
        this.log(`Tokens rebuilt - Size: ${Math.round(stats.size / 1024)}KB`, 'success');

        if (stats.size < 25000) {
          throw new Error(`CSS file too small (${stats.size} bytes) - possibly broken`);
        }
        return true;
      } else {
        throw new Error('CSS file not found after rebuild');
      }
    } catch (error) {
      this.log(`Rebuild failed: ${error.message}`, 'error');
      return false;
    }
  }

  useLatestBackup() {
    this.log('Αναζήτηση του πιο πρόσφατου backup...', 'process');

    if (!fs.existsSync(this.backupDir)) {
      throw new Error('Δεν βρέθηκαν backups');
    }

    const backups = fs.readdirSync(this.backupDir)
      .filter(name => name.startsWith('backup-'))
      .sort()
      .reverse();

    if (backups.length === 0) {
      throw new Error('Δεν βρέθηκαν έγκυρα backups');
    }

    const latestBackup = path.join(this.backupDir, backups[0]);
    this.log(`Χρήση backup: ${backups[0]}`, 'info');

    // Restore from backup
    const srcBackup = path.join(latestBackup, 'src');
    const distBackup = path.join(latestBackup, 'dist');

    if (fs.existsSync(srcBackup)) {
      this.execCommand(
        `robocopy "${srcBackup}" "${path.join(this.tokensPath, 'src')}" /E /R:0 /W:0`,
        'Restore source files from backup',
        true
      );
    }

    if (fs.existsSync(distBackup)) {
      this.execCommand(
        `robocopy "${distBackup}" "${path.join(this.tokensPath, 'dist')}" /E /R:0 /W:0`,
        'Restore dist files from backup',
        true
      );
    }
  }

  verifyAppState() {
    this.log('Επαλήθευση κατάστασης εφαρμογής...', 'process');

    if (!fs.existsSync(this.distPath)) {
      throw new Error('CSS tokens file missing');
    }

    const stats = fs.statSync(this.distPath);
    if (stats.size < 25000) {
      throw new Error(`CSS tokens file too small: ${stats.size} bytes`);
    }

    // Check for critical variables
    const cssContent = fs.readFileSync(this.distPath, 'utf8');
    const criticalVars = [
      '--layera-global-shared-layoutSystem-header-height',
      '--layera-layoutSystem-appLayout-header-height',
      '--layera-header-fixed-height'
    ];

    for (const varName of criticalVars) {
      if (!cssContent.includes(varName)) {
        throw new Error(`Critical variable missing: ${varName}`);
      }
    }

    this.log('✅ Εφαρμογή σε λειτουργική κατάσταση', 'success');
    this.log(`✅ CSS size: ${Math.round(stats.size / 1024)}KB`, 'success');
    this.log(`✅ Critical variables: OK`, 'success');
  }

  run(stepsBack = 1, useBackup = false) {
    try {
      this.log('↩️ ΕΚΚΙΝΗΣΗ LAYERA RESTORE SYSTEM', 'info');

      if (useBackup) {
        this.log('🔄 ΧΡΗΣΗ BACKUP ΑΝΤΙ ΓΙΑ GIT RESTORE', 'warning');
        this.useLatestBackup();
      } else {
        // Show current state
        this.showRecentCommits();

        // Restore from git
        this.restoreToCommit(stepsBack);

        // Try to rebuild
        const rebuildSuccess = this.rebuildTokens();

        if (!rebuildSuccess) {
          this.log('⚠️ Rebuild απέτυχε, χρήση backup...', 'warning');
          this.useLatestBackup();
        }
      }

      // Final verification
      this.verifyAppState();

      this.log('🎉 ΕΠΑΝΑΦΟΡΑ ΟΛΟΚΛΗΡΩΘΗΚΕ ΕΠΙΤΥΧΩΣ!', 'success');
      this.log('✅ Εφαρμογή επανήλθε σε λειτουργική κατάσταση', 'success');

    } catch (error) {
      this.log(`💥 ΣΦΑΛΜΑ ΣΤΗΝ ΕΠΑΝΑΦΟΡΑ: ${error.message}`, 'error');

      if (!useBackup) {
        this.log('🔄 Δοκιμή με backup...', 'warning');
        try {
          this.useLatestBackup();
          this.verifyAppState();
          this.log('✅ Επαναφορά με backup επιτυχής!', 'success');
        } catch (backupError) {
          this.log(`❌ Backup επαναφορά απέτυχε: ${backupError.message}`, 'error');
          process.exit(1);
        }
      } else {
        this.log('❌ Όλες οι μέθοδοι επαναφοράς απέτυχαν', 'error');
        process.exit(1);
      }
    }
  }
}

// CLI Usage
if (require.main === module) {
  const args = process.argv.slice(2);
  const stepsBack = parseInt(args[0]) || 1;
  const useBackup = args.includes('--backup');

  const restore = new LayeraRestoreSystem();
  restore.run(stepsBack, useBackup);
}

module.exports = LayeraRestoreSystem;