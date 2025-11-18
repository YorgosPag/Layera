#!/usr/bin/env node

/**
 * 🚀 TURBOREPO REMOTE CACHE SETUP
 * Enterprise-grade reproducible builds με remote caching
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class TurborepoSetup {
  constructor() {
    this.projectRoot = this.findProjectRoot();
    this.turboConfigPath = path.join(this.projectRoot, 'turbo.json');
  }

  findProjectRoot() {
    let currentDir = path.dirname(__filename);

    while (currentDir !== path.dirname(currentDir)) {
      const packageJson = path.join(currentDir, 'package.json');
      const workspaceYml = path.join(currentDir, 'pnpm-workspace.yaml');

      if (fs.existsSync(packageJson) && fs.existsSync(workspaceYml)) {
        return currentDir;
      }

      currentDir = path.dirname(currentDir);
    }

    return path.resolve(__dirname, '..');
  }

  log(message, type = 'info') {
    const timestamp = new Date().toLocaleTimeString('el-GR');
    const prefix = {
      'info': '📝',
      'success': '✅',
      'warning': '⚠️',
      'error': '❌',
      'process': '🔄',
      'cache': '🚀'
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
      this.log(`${description} - SUCCESS`, 'success');
      return result;
    } catch (error) {
      this.log(`${description} - FAILED: ${error.message}`, 'error');
      throw error;
    }
  }

  createTurboConfig() {
    this.log('Creating optimized turbo.json configuration', 'cache');

    const turboConfig = {
      "$schema": "https://turbo.build/schema.json",
      "pipeline": {
        "build": {
          "dependsOn": ["^build"],
          "outputs": [
            "dist/**",
            "build/**",
            ".next/**",
            "!.next/cache/**"
          ],
          "inputs": [
            "src/**",
            "package.json",
            "tsconfig.json",
            "!src/**/*.test.ts",
            "!src/**/*.test.tsx"
          ]
        },
        "build:tokens": {
          "outputs": [
            "dist/**"
          ],
          "inputs": [
            "src/**/*.json",
            "build.js",
            "package.json"
          ]
        },
        "test": {
          "dependsOn": ["build"],
          "outputs": [
            "coverage/**"
          ],
          "inputs": [
            "src/**",
            "test/**",
            "package.json",
            "tsconfig.json",
            "jest.config.js"
          ]
        },
        "lint": {
          "outputs": [],
          "inputs": [
            "src/**",
            "package.json",
            ".eslintrc*",
            "tsconfig.json"
          ]
        },
        "typecheck": {
          "outputs": [],
          "inputs": [
            "src/**",
            "package.json",
            "tsconfig.json"
          ]
        },
        "dev": {
          "cache": false,
          "persistent": true
        }
      },
      "globalDependencies": [
        "pnpm-lock.yaml",
        ".env",
        ".env.local",
        ".env.production"
      ],
      "remoteCache": {
        "enabled": true
      },
      "ui": "tui",
      "dangerouslyDisablePackageManagerCheck": false
    };

    fs.writeFileSync(this.turboConfigPath, JSON.stringify(turboConfig, null, 2));
    this.log('turbo.json created successfully', 'success');
  }

  setupRemoteCache() {
    this.log('Setting up Turborepo remote cache', 'cache');

    // Check if TURBO_TOKEN is available
    if (!process.env.TURBO_TOKEN) {
      this.log('TURBO_TOKEN not found in environment', 'warning');
      this.log('Remote cache will be disabled in CI until token is set', 'warning');
      return false;
    }

    try {
      // Authenticate with Vercel (if token available)
      if (process.env.TURBO_TOKEN && process.env.TURBO_TEAM) {
        this.execCommand(
          `npx turbo login --token="${process.env.TURBO_TOKEN}"`,
          'Authenticate with Turborepo'
        );

        this.execCommand(
          `npx turbo link --team="${process.env.TURBO_TEAM}"`,
          'Link to Turborepo team'
        );

        this.log('Remote cache enabled successfully', 'success');
        return true;
      }
    } catch (error) {
      this.log('Failed to setup remote cache, falling back to local', 'warning');
      return false;
    }
  }

  updatePackageJson() {
    this.log('Updating package.json with Turborepo scripts', 'process');

    const packageJsonPath = path.join(this.projectRoot, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    // Add Turborepo scripts
    packageJson.scripts = {
      ...packageJson.scripts,
      "build:all": "turbo build",
      "test:all": "turbo test",
      "lint:all": "turbo lint",
      "typecheck:all": "turbo typecheck",
      "dev:all": "turbo dev",
      "clean": "turbo clean && rm -rf node_modules/.cache",
      "cache:clear": "npx turbo prune --clear-cache"
    };

    // Add turbo as dependency if not present
    if (!packageJson.devDependencies?.turbo && !packageJson.dependencies?.turbo) {
      packageJson.devDependencies = {
        ...packageJson.devDependencies,
        "turbo": "^2.0.0"
      };
    }

    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    this.log('package.json updated with Turborepo configuration', 'success');
  }

  installTurbo() {
    this.log('Installing Turbo if not present', 'process');

    try {
      // Check if turbo is already installed
      this.execCommand('npx turbo --version', 'Check Turbo installation');
      this.log('Turbo already installed', 'success');
    } catch (error) {
      // Install turbo
      this.execCommand('pnpm add -D turbo@latest', 'Install Turbo');
      this.log('Turbo installed successfully', 'success');
    }
  }

  createCacheGitignore() {
    this.log('Updating .gitignore for Turborepo cache', 'process');

    const gitignorePath = path.join(this.projectRoot, '.gitignore');
    let gitignoreContent = '';

    if (fs.existsSync(gitignorePath)) {
      gitignoreContent = fs.readFileSync(gitignorePath, 'utf8');
    }

    const cacheEntries = [
      '# Turborepo',
      '.turbo/',
      'turbo.log',
      '',
      '# Cache directories',
      'node_modules/.cache/',
      '.cache/',
      '',
      '# Build outputs',
      'dist/',
      'build/',
      '.next/',
      'out/',
      ''
    ];

    const newEntries = cacheEntries.filter(entry =>
      !gitignoreContent.includes(entry.trim()) || entry === ''
    );

    if (newEntries.length > 0) {
      const updatedContent = gitignoreContent + '\n' + newEntries.join('\n');
      fs.writeFileSync(gitignorePath, updatedContent);
      this.log('.gitignore updated with Turborepo entries', 'success');
    }
  }

  validateSetup() {
    this.log('Validating Turborepo setup', 'cache');

    const issues = [];

    // Check turbo.json
    if (!fs.existsSync(this.turboConfigPath)) {
      issues.push('turbo.json missing');
    }

    // Check if packages have build scripts
    const packagesDir = path.join(this.projectRoot, 'packages');
    if (fs.existsSync(packagesDir)) {
      const packages = fs.readdirSync(packagesDir)
        .filter(pkg => fs.statSync(path.join(packagesDir, pkg)).isDirectory());

      for (const pkg of packages) {
        const pkgJsonPath = path.join(packagesDir, pkg, 'package.json');
        if (fs.existsSync(pkgJsonPath)) {
          const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8'));
          if (!pkgJson.scripts?.build && !pkgJson.scripts?.dev) {
            issues.push(`Package ${pkg} missing build/dev scripts`);
          }
        }
      }
    }

    if (issues.length > 0) {
      this.log('⚠️ Setup issues found:', 'warning');
      issues.forEach(issue => this.log(`  - ${issue}`, 'warning'));
      return false;
    }

    this.log('✅ Turborepo setup validation passed', 'success');
    return true;
  }

  testCache() {
    this.log('Testing Turborepo cache functionality', 'cache');

    try {
      // Run a build to populate cache
      this.log('Running initial build to test cache...', 'process');
      this.execCommand('npx turbo build --filter @layera/tokens', 'Test build');

      // Run again to test cache hit
      this.log('Running second build to test cache hit...', 'process');
      const result = this.execCommand('npx turbo build --filter @layera/tokens', 'Test cache hit');

      if (result.includes('FULL TURBO') || result.includes('cached')) {
        this.log('✅ Cache test successful - cache hit detected', 'success');
        return true;
      } else {
        this.log('⚠️ Cache test inconclusive - no cache hit detected', 'warning');
        return false;
      }
    } catch (error) {
      this.log(`Cache test failed: ${error.message}`, 'error');
      return false;
    }
  }

  run() {
    this.log('🚀 SETTING UP TURBOREPO ENTERPRISE CACHE', 'info');

    try {
      // Step 1: Install Turbo
      this.installTurbo();

      // Step 2: Create optimized configuration
      this.createTurboConfig();

      // Step 3: Update package.json
      this.updatePackageJson();

      // Step 4: Setup remote cache
      const remoteCacheEnabled = this.setupRemoteCache();

      // Step 5: Update gitignore
      this.createCacheGitignore();

      // Step 6: Validate setup
      const isValid = this.validateSetup();

      // Step 7: Test cache
      const cacheWorking = this.testCache();

      // Summary
      this.log('🎉 TURBOREPO SETUP COMPLETE', 'success');
      this.log(`📊 Configuration: ${isValid ? 'VALID' : 'ISSUES FOUND'}`, 'info');
      this.log(`🚀 Remote Cache: ${remoteCacheEnabled ? 'ENABLED' : 'DISABLED'}`, 'info');
      this.log(`💨 Cache Test: ${cacheWorking ? 'PASSED' : 'FAILED'}`, 'info');

      if (!isValid || !cacheWorking) {
        this.log('⚠️ Setup completed with warnings - review above messages', 'warning');
        return false;
      }

      this.log('✅ Enterprise reproducible builds ready!', 'success');
      return true;

    } catch (error) {
      this.log(`💥 TURBOREPO SETUP FAILED: ${error.message}`, 'error');
      throw error;
    }
  }
}

// CLI Usage
if (require.main === module) {
  const setup = new TurborepoSetup();

  try {
    const success = setup.run();
    process.exit(success ? 0 : 1);
  } catch (error) {
    console.error(`\\n💥 SETUP FAILED: ${error.message}`);
    process.exit(1);
  }
}

module.exports = TurborepoSetup;