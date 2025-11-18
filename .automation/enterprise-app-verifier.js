#!/usr/bin/env node

/**
 * 🔍 LAYERA ENTERPRISE APPLICATION VERIFIER
 * Enterprise-grade verification με signature validation και compliance checks
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execSync } = require('child_process');

class LayeraEnterpriseVerifier {
  constructor() {
    // Cross-platform project root detection
    this.projectRoot = this.findProjectRoot();
    this.tokensPath = path.join(this.projectRoot, 'packages', 'tokens');
    this.distPath = path.join(this.tokensPath, 'dist', 'css', 'tokens.css');

    // Enterprise compliance thresholds
    this.compliance = {
      minCssSize: 25 * 1024,      // 25KB minimum
      expectedCssSize: 33 * 1024,  // 33KB expected
      maxVariableCount: 500,       // Security: prevent CSS variable injection
      requiredVariables: [
        '--layera-global-shared-layoutSystem-header-height',
        '--layera-layoutSystem-appLayout-header-height',
        '--layera-header-fixed-height',
        '--layera-color-surface-primary',
        '--layera-color-text-primary',
        '--layera-radius-md'
      ]
    };

    // Security settings
    this.security = {
      allowedChecksumFiles: ['.sha256', '.sha512'],
      gpgKeyringPath: path.join(this.projectRoot, '.automation', 'keys'),
      trustedSigners: process.env.LAYERA_TRUSTED_SIGNERS?.split(',') || []
    };
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

  log(message, type = 'info') {
    const timestamp = new Date().toLocaleTimeString('el-GR');
    const prefix = {
      'info': '📝',
      'success': '✅',
      'warning': '⚠️',
      'error': '❌',
      'security': '🔐',
      'check': '🔍',
      'compliance': '📋'
    };
    console.log(`${prefix[type]} [${timestamp}] ${message}`);
  }

  // 🔐 Cryptographic verification methods
  calculateFileHash(filePath, algorithm = 'sha256') {
    const fileBuffer = fs.readFileSync(filePath);
    const hashSum = crypto.createHash(algorithm);
    hashSum.update(fileBuffer);
    return hashSum.digest('hex');
  }

  verifyChecksum(filePath, checksumFile) {
    this.log(`Verifying checksum: ${path.basename(checksumFile)}`, 'security');

    const checksumContent = fs.readFileSync(checksumFile, 'utf8').trim();
    const [expectedHash, fileName] = checksumContent.split(/\s+/);

    const algorithm = checksumFile.endsWith('.sha256') ? 'sha256' : 'sha512';
    const actualHash = this.calculateFileHash(filePath, algorithm);

    if (expectedHash.toLowerCase() !== actualHash.toLowerCase()) {
      throw new Error(`Checksum mismatch for ${fileName}. Expected: ${expectedHash}, Got: ${actualHash}`);
    }

    this.log(`Checksum verified: ${algorithm.toUpperCase()}`, 'success');
    return true;
  }

  verifyGPGSignature(filePath, signatureFile) {
    this.log(`Verifying GPG signature: ${path.basename(signatureFile)}`, 'security');

    try {
      const result = execSync(
        `gpg --verify "${signatureFile}" "${filePath}"`,
        {
          encoding: 'utf8',
          stdio: 'pipe',
          cwd: this.projectRoot
        }
      );
      this.log('GPG signature verified successfully', 'success');
      return true;
    } catch (error) {
      if (error.status === 127) {
        this.log('GPG not available, skipping signature verification', 'warning');
        return null; // Skip if GPG not installed
      }
      throw new Error(`GPG signature verification failed: ${error.message}`);
    }
  }

  // 🔍 Enhanced security checks
  securityAuditCssFile() {
    this.log('Security audit of CSS tokens', 'security');

    const cssContent = fs.readFileSync(this.distPath, 'utf8');
    const securityIssues = [];

    // Check for suspicious patterns
    const suspiciousPatterns = [
      /url\(\s*['"]?javascript:/gi,  // JavaScript URLs
      /expression\s*\(/gi,           // IE expression()
      /@import\s+['"]?data:/gi,      // Data URL imports
      /\*\/.*?\/\*/g,                // Nested comments (CSS injection)
    ];

    suspiciousPatterns.forEach((pattern, index) => {
      const matches = cssContent.match(pattern);
      if (matches) {
        securityIssues.push(`Suspicious pattern ${index + 1}: ${matches[0]}`);
      }
    });

    // Check for excessive variable count (possible injection)
    const variableCount = (cssContent.match(/--[\w-]+:/g) || []).length;
    if (variableCount > this.compliance.maxVariableCount) {
      securityIssues.push(`Excessive CSS variables: ${variableCount} > ${this.compliance.maxVariableCount}`);
    }

    if (securityIssues.length > 0) {
      throw new Error(`Security issues found: ${securityIssues.join(', ')}`);
    }

    this.log('CSS security audit passed', 'success');
    return true;
  }

  // 📋 Compliance verification
  complianceCheck() {
    this.log('Enterprise compliance verification', 'compliance');

    const report = {
      timestamp: new Date().toISOString(),
      checks: {},
      compliance: {
        level: 'enterprise',
        requirements: []
      }
    };

    // File existence compliance
    report.checks.cssFileExists = this.checkFileExists(this.distPath, 'CSS tokens file');
    report.compliance.requirements.push('CSS tokens file exists');

    // Size compliance
    const stats = fs.statSync(this.distPath);
    const sizeKB = Math.round(stats.size / 1024);

    if (stats.size < this.compliance.minCssSize) {
      throw new Error(`CSS file below minimum size: ${sizeKB}KB < ${Math.round(this.compliance.minCssSize / 1024)}KB`);
    }

    report.checks.sizeCompliance = true;
    report.summary = { cssSize: sizeKB };
    report.compliance.requirements.push('CSS file meets size requirements');

    // Variable compliance
    const cssContent = fs.readFileSync(this.distPath, 'utf8');
    const variables = cssContent.match(/--[\w-]+:/g) || [];

    const missingVars = this.compliance.requiredVariables.filter(
      varName => !cssContent.includes(varName)
    );

    if (missingVars.length > 0) {
      throw new Error(`Critical variables missing: ${missingVars.join(', ')}`);
    }

    report.checks.variableCompliance = true;
    report.summary.variableCount = variables.length;
    report.compliance.requirements.push('All critical CSS variables present');

    // Security compliance
    report.checks.securityAudit = this.securityAuditCssFile();
    report.compliance.requirements.push('CSS security audit passed');

    this.log('✅ Enterprise compliance verified', 'success');
    return report;
  }

  checkFileExists(filePath, description) {
    this.log(`Checking: ${description}`, 'check');

    if (!fs.existsSync(filePath)) {
      throw new Error(`${description} not found: ${filePath}`);
    }

    this.log(`${description} - OK`, 'success');
    return true;
  }

  // 🔍 Comprehensive verification with signature support
  enterpriseVerification(options = {}) {
    const {
      skipSignatures = false,
      skipChecksums = false,
      requireSignatures = false
    } = options;

    this.log('🔍 ENTERPRISE APPLICATION VERIFICATION', 'info');
    this.log(`Project root: ${this.projectRoot}`, 'info');

    const report = this.complianceCheck();

    // Optional: Verify checksums if available
    if (!skipChecksums) {
      for (const ext of this.security.allowedChecksumFiles) {
        const checksumFile = this.distPath + ext;
        if (fs.existsSync(checksumFile)) {
          this.verifyChecksum(this.distPath, checksumFile);
          report.checks[`checksum_${ext.substring(1)}`] = true;
          report.compliance.requirements.push(`${ext.substring(1).toUpperCase()} checksum verified`);
        } else if (requireSignatures) {
          throw new Error(`Required checksum file missing: ${checksumFile}`);
        }
      }
    }

    // Optional: Verify signatures if available
    if (!skipSignatures) {
      const signatureFile = this.distPath + '.asc';
      if (fs.existsSync(signatureFile)) {
        const signatureResult = this.verifyGPGSignature(this.distPath, signatureFile);
        if (signatureResult !== null) {
          report.checks.gpgSignature = true;
          report.compliance.requirements.push('GPG signature verified');
        }
      } else if (requireSignatures) {
        throw new Error(`Required signature file missing: ${signatureFile}`);
      }
    }

    // Final compliance score
    const totalChecks = Object.keys(report.checks).length;
    const passedChecks = Object.values(report.checks).filter(Boolean).length;
    report.compliance.score = Math.round((passedChecks / totalChecks) * 100);
    report.compliance.level = report.compliance.score >= 95 ? 'enterprise' : 'standard';

    this.log('🎉 ENTERPRISE VERIFICATION COMPLETE', 'success');
    this.log(`📊 Compliance Score: ${report.compliance.score}%`, 'info');
    this.log(`📊 CSS Size: ${report.summary.cssSize}KB`, 'info');
    this.log(`📊 Variables: ${report.summary.variableCount}`, 'info');
    this.log(`🔐 Security: PASSED`, 'security');

    return report;
  }

  // Quick verification (backward compatibility)
  quickCheck() {
    this.log('🔍 QUICK VERIFICATION', 'info');

    try {
      this.checkFileExists(this.distPath, 'CSS file');

      const stats = fs.statSync(this.distPath);
      if (stats.size < this.compliance.minCssSize) {
        throw new Error(`CSS file too small: ${Math.round(stats.size / 1024)}KB`);
      }

      const cssContent = fs.readFileSync(this.distPath, 'utf8');
      const missingVars = this.compliance.requiredVariables.filter(
        varName => !cssContent.includes(varName)
      );

      if (missingVars.length > 0) {
        throw new Error(`Critical variables missing: ${missingVars.join(', ')}`);
      }

      this.log('✅ Quick verification - PASSED', 'success');
      return true;
    } catch (error) {
      this.log(`❌ Quick verification - FAILED: ${error.message}`, 'error');
      return false;
    }
  }

  run(mode = 'enterprise', options = {}) {
    try {
      if (mode === 'quick') {
        return this.quickCheck();
      } else {
        return this.enterpriseVerification(options);
      }
    } catch (error) {
      this.log(`Verification failed: ${error.message}`, 'error');
      if (mode === 'quick') {
        return false;
      } else {
        throw error;
      }
    }
  }
}

// CLI Usage
if (require.main === module) {
  const mode = process.argv[2] || 'enterprise';
  const requireSignatures = process.argv.includes('--require-signatures');
  const skipSignatures = process.argv.includes('--skip-signatures');
  const skipChecksums = process.argv.includes('--skip-checksums');

  const verifier = new LayeraEnterpriseVerifier();

  try {
    const result = verifier.run(mode, {
      requireSignatures,
      skipSignatures,
      skipChecksums
    });

    if (mode === 'quick') {
      process.exit(result ? 0 : 1);
    } else {
      console.log('\\n📋 ENTERPRISE VERIFICATION REPORT:');
      console.log(JSON.stringify(result, null, 2));
      process.exit(result.compliance.score >= 95 ? 0 : 1);
    }
  } catch (error) {
    console.error(`\\n💥 ENTERPRISE VERIFICATION FAILED: ${error.message}`);
    process.exit(1);
  }
}

module.exports = LayeraEnterpriseVerifier;