#!/usr/bin/env node

/**
 * Migration Script - 363 → 100 Tokens
 * Αυτόματη αντικατάσταση όλων των παλιών token references
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Migration mappings από το migration-mapping.json
const MIGRATION_MAP = {
  // COLORS - 25 new tokens
  '--layera-color-semantic-info-primary': '--layera-colors-primary-main',
  '--layera-icon-colorPrimary': '--layera-colors-primary-main',
  '--layera-color-primary': '--layera-colors-primary-main',
  '--layera-color-semantic-primary': '--layera-colors-primary-main',

  '--layera-color-semantic-neutral-dark': '--layera-colors-primary-secondary',
  '--layera-color-semantic-neutral-medium': '--layera-colors-primary-secondary',
  '--layera-icon-colorSecondary': '--layera-colors-primary-secondary',
  '--layera-color-secondary': '--layera-colors-primary-secondary',

  '--layera-color-semantic-success-primary': '--layera-colors-primary-success',
  '--layera-icon-colorSuccess': '--layera-colors-primary-success',
  '--layera-color-success': '--layera-colors-primary-success',
  '--layera-bg-accent-green': '--layera-colors-primary-success',

  '--layera-color-semantic-warning-primary': '--layera-colors-primary-warning',
  '--layera-icon-colorWarning': '--layera-colors-primary-warning',
  '--layera-color-warning': '--layera-colors-primary-warning',

  '--layera-color-semantic-error-primary': '--layera-colors-primary-danger',
  '--layera-icon-colorDanger': '--layera-colors-primary-danger',
  '--layera-color-danger': '--layera-colors-primary-danger',
  '--layera-color-error': '--layera-colors-primary-danger',

  '--layera-color-surface-primary': '--layera-colors-surface-light',
  '--layera-bg-surface-light': '--layera-colors-surface-light',
  '--layera-color-neutral-white': '--layera-colors-surface-light',

  '--layera-bg-surface-medium': '--layera-colors-surface-medium',
  '--layera-color-neutral-light': '--layera-colors-surface-medium',

  '--layera-color-text-primary': '--layera-colors-text-primary',
  '--layera-color-text-secondary': '--layera-colors-text-secondary',
  '--layera-color-text-muted': '--layera-colors-text-muted',
  '--layera-icon-colorNeutral': '--layera-colors-text-secondary',

  // SPACING - 20 new tokens
  '--layera-global-spacing-1': '--layera-spacing-scale-1',
  '--layera-global-spacing-2': '--layera-spacing-scale-2',
  '--layera-global-spacing-3': '--layera-spacing-scale-2', // Consolidated to 2
  '--layera-global-spacing-4': '--layera-spacing-scale-4',
  '--layera-global-spacing-6': '--layera-spacing-scale-6',
  '--layera-global-spacing-8': '--layera-spacing-scale-8',
  '--layera-global-spacing-12': '--layera-spacing-scale-12',
  '--layera-global-spacing-16': '--layera-spacing-scale-16',
  '--layera-global-spacing-20': '--layera-spacing-scale-16', // Consolidated to 16

  '--layera-space-xs': '--layera-spacing-scale-2',
  '--layera-space-sm': '--layera-spacing-scale-4',
  '--layera-space-md': '--layera-spacing-scale-6',
  '--layera-space-lg': '--layera-spacing-scale-8',
  '--layera-space-xl': '--layera-spacing-scale-12',

  '--layera-shared-dimensions-zero': '--layera-utilities-zero',
  '--layera-shared-dimensions-full-width': '--layera-utilities-full',
  '--layera-shared-dimensions-viewport-width': '--layera-utilities-full',
  '--layera-shared-dimensions-viewport-height': '--layera-utilities-full',
  '--layera-percentage-full': '--layera-utilities-full',

  // TYPOGRAPHY - 15 new tokens
  '--layera-fontSize-xs': '--layera-typography-fontSize-xs',
  '--layera-fontSize-sm': '--layera-typography-fontSize-sm',
  '--layera-fontSize-base': '--layera-typography-fontSize-base',
  '--layera-fontSize-lg': '--layera-typography-fontSize-lg',
  '--layera-fontSize-xl': '--layera-typography-fontSize-xl',
  '--layera-fontSize-2xl': '--layera-typography-fontSize-2xl',
  '--layera-fontSize-3xl': '--layera-typography-fontSize-2xl', // Consolidated
  '--layera-fontSize-4xl': '--layera-typography-fontSize-2xl', // Consolidated
  '--layera-fontSize-5xl': '--layera-typography-fontSize-2xl', // Consolidated
  '--layera-fontSize-6xl': '--layera-typography-fontSize-2xl', // Consolidated

  '--layera-fontWeight-light': '--layera-typography-fontWeight-light',
  '--layera-fontWeight-normal': '--layera-typography-fontWeight-normal',
  '--layera-fontWeight-medium': '--layera-typography-fontWeight-semibold', // Consolidated
  '--layera-fontWeight-semibold': '--layera-typography-fontWeight-semibold',
  '--layera-fontWeight-bold': '--layera-typography-fontWeight-bold',
  '--layera-fontWeight-extrabold': '--layera-typography-fontWeight-bold', // Consolidated

  '--layera-lineHeight-tight': '--layera-typography-lineHeight-tight',
  '--layera-lineHeight-snug': '--layera-typography-lineHeight-normal', // Consolidated
  '--layera-lineHeight-normal': '--layera-typography-lineHeight-normal',
  '--layera-lineHeight-relaxed': '--layera-typography-lineHeight-relaxed',
  '--layera-lineHeight-loose': '--layera-typography-lineHeight-relaxed', // Consolidated

  '--layera-letterSpacing-tight': '--layera-typography-letterSpacing-tight',
  '--layera-letterSpacing-wide': '--layera-typography-letterSpacing-wide',

  // LAYOUT - 10 new tokens
  '--layera-breakpoint-mobile': '--layera-layout-breakpoint-mobile',
  '--layera-breakpoint-tablet': '--layera-layout-breakpoint-tablet',
  '--layera-breakpoint-desktop': '--layera-layout-breakpoint-desktop',
  '--layera-breakpoint-xs': '--layera-layout-breakpoint-mobile', // Consolidated
  '--layera-breakpoint-sm': '--layera-layout-breakpoint-mobile', // Consolidated
  '--layera-breakpoint-md': '--layera-layout-breakpoint-tablet', // Consolidated
  '--layera-breakpoint-lg': '--layera-layout-breakpoint-desktop', // Consolidated
  '--layera-breakpoint-xl': '--layera-layout-breakpoint-desktop', // Consolidated

  '--layera-global-z-index-base': '--layera-layout-zIndex-base',
  '--layera-global-z-index-header': '--layera-layout-zIndex-header',
  '--layera-global-z-index-modal': '--layera-layout-zIndex-modal',
  '--layera-global-z-index-overlay': '--layera-layout-zIndex-overlay',
  '--layera-global-z-index-dropdown': '--layera-layout-zIndex-overlay', // Consolidated

  // BORDERS - 8 new tokens
  '--layera-global-borderRadius-xs': '--layera-borders-radius-sm', // Consolidated
  '--layera-global-borderRadius-sm': '--layera-borders-radius-sm',
  '--layera-global-borderRadius-md': '--layera-borders-radius-md',
  '--layera-global-borderRadius-lg': '--layera-borders-radius-md', // Consolidated
  '--layera-global-borderRadius-xl': '--layera-borders-radius-md', // Consolidated
  '--layera-global-borderRadius-full': '--layera-borders-radius-full',
  '--layera-global-borderRadius-circle': '--layera-borders-radius-full', // Consolidated
  '--layera-global-borderRadius-infinity': '--layera-borders-radius-full', // Consolidated

  // SHADOWS - 5 new tokens
  '--layera-shadow-xs': '--layera-shadows-sm', // Consolidated
  '--layera-shadow-sm': '--layera-shadows-sm',
  '--layera-shadow-md': '--layera-shadows-md',
  '--layera-shadow-lg': '--layera-shadows-lg',
  '--layera-shadow-xl': '--layera-shadows-xl',
  '--layera-shadow-2xl': '--layera-shadows-xl', // Consolidated
  '--layera-shadow-none': '--layera-shadows-none',

  // ICONS - 7 new tokens
  '--layera-icon-xs': '--layera-icons-size-sm', // Consolidated
  '--layera-icon-sm': '--layera-icons-size-sm',
  '--layera-icon-md': '--layera-icons-size-md',
  '--layera-icon-lg': '--layera-icons-size-lg',
  '--layera-icon-xl': '--layera-icons-size-xl',
  '--layera-icon-xxl': '--layera-icons-size-xl', // Consolidated
  '--layera-icon-xxxl': '--layera-icons-size-xl', // Consolidated
  '--layera-iconSize-sm': '--layera-icons-size-sm',
  '--layera-iconSize-md': '--layera-icons-size-md',

  '--layera-icon-colorInfo': '--layera-colors-status-info',
  '--layera-icon-colorNeutral': '--layera-icons-color-secondary',

  // INTERACTIONS - 5 new tokens
  '--layera-transition-fast': '--layera-interactions-transition-fast',
  '--layera-transition-normal': '--layera-interactions-transition-normal',
  '--layera-transition-slow': '--layera-interactions-transition-slow',
  '--layera-transition-border': '--layera-interactions-transition-normal',
  '--layera-transition-color': '--layera-interactions-transition-normal',
  '--layera-iconAdvanced-interactive-transition-fast': '--layera-interactions-transition-fast',

  '--layera-cursor-pointer': '--layera-interactions-cursor-pointer',
  '--layera-cursor-default': '--layera-interactions-cursor-default',

  // RESPONSIVE - 3 new tokens
  '--layera-iconAdvanced-sizing-touchTargetMobile': '--layera-responsive-touchTarget-mobile',
  '--layera-iconAdvanced-sizing-touchTargetDesktop': '--layera-responsive-touchTarget-desktop',
  '--layera-shared-dimensions-viewport-height': '--layera-responsive-viewport-full'
};

/**
 * Finds all files that need token migration
 */
function findFilesToMigrate() {
  const extensions = ['.tsx', '.ts', '.css', '.scss', '.json'];
  const searchPaths = [
    'apps/layera/src',
    'packages/*/src',
    '!**/node_modules/**',
    '!**/dist/**',
    '!**/BACKUP-*/**'
  ];

  console.log('🔍 Searching for files with old token references...');

  try {
    // Use ripgrep to find files with old token references
    const oldTokens = Object.keys(MIGRATION_MAP).map(token => token.replace('--', '')).slice(0, 20); // First 20 for speed
    const pattern = `(${oldTokens.join('|')})`;

    const result = execSync(`rg -l "${pattern}" ${searchPaths.join(' ')} --type-add 'web:*.{tsx,ts,css,scss,json}' -t web`, {
      encoding: 'utf-8',
      cwd: process.cwd()
    });

    return result.trim().split('\n').filter(Boolean);
  } catch (error) {
    console.warn('Ripgrep not found, using fallback file search...');
    return findFilesFallback();
  }
}

/**
 * Fallback method to find files without ripgrep
 */
function findFilesFallback() {
  const files = [];
  const searchDirs = ['apps/layera/src', 'packages'];

  function walkDir(dir) {
    if (!fs.existsSync(dir)) return;

    const items = fs.readdirSync(dir);
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory() && !item.includes('node_modules') && !item.includes('dist')) {
        walkDir(fullPath);
      } else if (stat.isFile() && /\.(tsx?|s?css|json)$/.test(item)) {
        files.push(fullPath);
      }
    }
  }

  searchDirs.forEach(walkDir);
  return files;
}

/**
 * Migrates tokens in a single file
 */
function migrateFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf-8');
    let changeCount = 0;

    // Replace each old token with new token
    for (const [oldToken, newToken] of Object.entries(MIGRATION_MAP)) {
      const regex = new RegExp(`var\\(${oldToken.replace(/[.*+?^${}()|[\\]\\\\]/g, '\\\\$&')}\\)`, 'g');
      const oldContent = content;
      content = content.replace(regex, `var(${newToken})`);

      if (content !== oldContent) {
        const matches = oldContent.match(regex);
        changeCount += matches ? matches.length : 0;
      }
    }

    if (changeCount > 0) {
      fs.writeFileSync(filePath, content, 'utf-8');
      console.log(`✅ ${filePath}: ${changeCount} token references updated`);
      return changeCount;
    } else {
      console.log(`⚪ ${filePath}: No changes needed`);
      return 0;
    }
  } catch (error) {
    console.error(`❌ Error migrating ${filePath}:`, error.message);
    return 0;
  }
}

/**
 * Main migration function
 */
function runMigration() {
  console.log('🚀 Starting token migration: 363 → 100 tokens');
  console.log('==================================================');

  const startTime = Date.now();
  const files = findFilesToMigrate();

  if (files.length === 0) {
    console.log('✅ No files found that need migration!');
    return;
  }

  console.log(`📁 Found ${files.length} files to check for token references`);
  console.log('');

  let totalChanges = 0;
  let filesChanged = 0;

  for (const file of files) {
    const changes = migrateFile(file);
    if (changes > 0) {
      filesChanged++;
      totalChanges += changes;
    }
  }

  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(2);

  console.log('');
  console.log('🎉 Migration completed!');
  console.log('======================');
  console.log(`📊 Files processed: ${files.length}`);
  console.log(`🔧 Files changed: ${filesChanged}`);
  console.log(`🔄 Total token references updated: ${totalChanges}`);
  console.log(`⏱️  Duration: ${duration}s`);
  console.log('');
  console.log('Next steps:');
  console.log('1. Run: npm run build:tokens');
  console.log('2. Test the application');
  console.log('3. Check for any broken references');
  console.log('4. Update style-dictionary config to use master-tokens-100.json');
}

// Run migration if called directly
if (require.main === module) {
  runMigration();
}

module.exports = { runMigration, MIGRATION_MAP };