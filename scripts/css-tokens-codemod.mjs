#!/usr/bin/env node
/**
 * 🔧 CSS Tokens Codemod - Ασφαλή μαζική μετατροπή hardcoded values σε tokens
 *
 * Guardrails:
 * - Dry-run by default
 * - 1:1 mapping μόνο
 * - TODO comments για missing tokens
 * - Progressive rollout ανά πακέτο
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { globby } from 'globby';
import { resolve } from 'node:path';

// Command line arguments
const isDryRun = !process.argv.includes('--apply');
const targetPackage = process.argv.find(arg => arg.startsWith('--package='))?.split('=')[1];
const sinceRef = process.argv.find(arg => arg.startsWith('--since='))?.split('=')[1];
const outputJSON = process.argv.includes('--json');

console.log('🔧 CSS TOKENS CODEMOD');
console.log('=====================');
console.log(`Mode: ${isDryRun ? 'DRY-RUN (use --apply to execute)' : 'APPLYING CHANGES'}`);
console.log(`Package: ${targetPackage || 'ALL'}`);
console.log('');

// Load token mapping from generated tokens.css
async function loadTokenMapping() {
  try {
    const tokensPath = 'packages/tokens/dist/css/tokens.css';
    const tokensCSS = readFileSync(tokensPath, 'utf8');

    const colorMap = new Map();
    const spaceMap = new Map();
    const radiusMap = new Map();

    // Parse CSS custom properties: --la-something: value;
    const customPropRegex = /--(la-[^:]+):\s*([^;]+);/g;
    let match;

    while ((match = customPropRegex.exec(tokensCSS)) !== null) {
      const [, name, value] = match;
      const cleanValue = value.trim();
      const varName = `var(--${name})`;

      // Map values to their token variables
      if (name.includes('color')) {
        colorMap.set(cleanValue, varName);
        // Also map common hex variations
        if (cleanValue.match(/^#[0-9a-fA-F]{6}$/)) {
          colorMap.set(cleanValue.toLowerCase(), varName);
          colorMap.set(cleanValue.toUpperCase(), varName);
        }
      } else if (name.includes('space')) {
        spaceMap.set(cleanValue, varName);
      } else if (name.includes('radius')) {
        radiusMap.set(cleanValue, varName);
      }
    }

    // Add common hardcoded values that should map to tokens
    colorMap.set('#ffffff', 'var(--la-color-white)');
    colorMap.set('#FFFFFF', 'var(--la-color-white)');
    colorMap.set('#fff', 'var(--la-color-white)');
    colorMap.set('#FFF', 'var(--la-color-white)');
    colorMap.set('#000000', 'var(--la-color-black)');
    colorMap.set('#000', 'var(--la-color-black)');

    spaceMap.set('8px', 'var(--la-space-2)');
    spaceMap.set('16px', 'var(--la-space-4)');
    spaceMap.set('24px', 'var(--la-space-6)');
    spaceMap.set('32px', 'var(--la-space-8)');

    radiusMap.set('4px', 'var(--la-radius-sm)');
    radiusMap.set('8px', 'var(--la-radius-md)');
    radiusMap.set('12px', 'var(--la-radius-lg)');

    return { colorMap, spaceMap, radiusMap };
  } catch (error) {
    console.error('❌ Failed to load token mapping:', error.message);
    return { colorMap: new Map(), spaceMap: new Map(), radiusMap: new Map() };
  }
}

// Get files to process
async function getTargetFiles() {
  const pattern = targetPackage
    ? [`packages/${targetPackage}/src/**/*.{css,scss}`]
    : [
        'apps/**/src/**/*.{css,scss}',
        'packages/**/src/**/*.{css,scss}',
        '!packages/tokens/**',
        '!packages/styles/src/tokens.css',
        '!**/dist/**',
        '!**/build/**',
        '!**/node_modules/**'
      ];

  return await globby(pattern);
}

// Apply transformations to CSS content
function transformCSS(content, tokenMaps) {
  const { colorMap, spaceMap, radiusMap } = tokenMaps;
  let transformed = content;
  let changes = [];

  // Color transformations - hex colors
  const hexColors = content.match(/#[0-9a-fA-F]{3,8}\b/g) || [];
  for (const hex of new Set(hexColors)) {
    if (colorMap.has(hex)) {
      const token = colorMap.get(hex);
      transformed = transformed.replace(new RegExp(hex.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), token);
      changes.push({ type: 'color', from: hex, to: token, confidence: 'high' });
    } else {
      // Add TODO comment
      const todoComment = `/* TODO(token-missing): ${hex} */`;
      transformed = transformed.replace(new RegExp(`(\\s*)(${hex.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'g'), `$1${todoComment} $2`);
      changes.push({ type: 'color', from: hex, to: todoComment, confidence: 'missing' });
    }
  }

  // Color transformations - rgb/rgba/hsl/hsla
  const rgbColors = content.match(/(rgb|rgba|hsl|hsla)\s*\([^)]+\)/g) || [];
  for (const rgb of new Set(rgbColors)) {
    // For now, mark as TODO since we don't have rgb mappings in tokens
    const todoComment = `/* TODO(token-missing): ${rgb} */`;
    transformed = transformed.replace(new RegExp(`(\\s*)(${rgb.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'g'), `$1${todoComment} $2`);
    changes.push({ type: 'color', from: rgb, to: todoComment, confidence: 'missing' });
  }

  // Spacing transformations (px values)
  const pxValues = content.match(/\b\d+px\b/g) || [];
  for (const px of new Set(pxValues)) {
    if (spaceMap.has(px)) {
      const token = spaceMap.get(px);
      transformed = transformed.replace(new RegExp(`\b${px.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\b`, 'g'), token);
      changes.push({ type: 'spacing', from: px, to: token, confidence: 'high' });
    } else if (parseInt(px) <= 4) { // Skip very small values (likely borders)
      continue;
    } else {
      // Add TODO comment for missing spacing tokens
      const todoComment = `/* TODO(token-missing): ${px} */`;
      transformed = transformed.replace(new RegExp(`(\\s*)(${px.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'g'), `$1${todoComment} $2`);
      changes.push({ type: 'spacing', from: px, to: todoComment, confidence: 'missing' });
    }
  }

  // Unit transformations (rem, em, vh, vw, %)
  const unitValues = content.match(/\b\d+(?:\.\d+)?(rem|em|vh|vw|%)\b/g) || [];
  for (const unit of new Set(unitValues)) {
    // For now, mark as TODO since we need design tokens for these units
    const todoComment = `/* TODO(token-missing): ${unit} */`;
    transformed = transformed.replace(new RegExp(`(\\s*)(${unit.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'g'), `$1${todoComment} $2`);
    changes.push({ type: 'units', from: unit, to: todoComment, confidence: 'missing' });
  }

  // Border radius transformations
  const radiusPattern = /border-radius:\s*([^;]+);/g;
  let radiusMatch;
  while ((radiusMatch = radiusPattern.exec(content)) !== null) {
    const value = radiusMatch[1].trim();
    if (radiusMap.has(value)) {
      const token = radiusMap.get(value);
      transformed = transformed.replace(radiusMatch[0], `border-radius: ${token};`);
      changes.push({ type: 'radius', from: value, to: token, confidence: 'high' });
    }
  }

  return { transformed, changes };
}

// Check git working tree status
async function checkGitStatus() {
  try {
    const { execSync } = await import('child_process');
    const status = execSync('git status --porcelain', { encoding: 'utf8' });
    return status.trim() === '';
  } catch (error) {
    return false;
  }
}

// Get changed files since git ref
async function getChangedFiles(sinceRef) {
  try {
    const { execSync } = await import('child_process');
    const files = execSync(`git diff --name-only ${sinceRef} --`, { encoding: 'utf8' })
      .split('\n')
      .filter(f => f.endsWith('.css') || f.endsWith('.scss'))
      .filter(f => f.length > 0);
    return files;
  } catch (error) {
    return [];
  }
}

// Main execution
async function main() {
  // Pre-flight checks
  if (!isDryRun) {
    console.log('🔍 Checking git working tree...');
    const isClean = await checkGitStatus();
    if (!isClean) {
      console.error('❌ Git working tree is not clean. Commit or stash changes before running --apply.');
      process.exit(1);
    }
    console.log('✅ Git working tree is clean');
  }

  console.log('🔍 Loading token mapping...');
  const tokenMaps = await loadTokenMapping();

  if (!outputJSON) {
    console.log(`📊 Token mapping loaded:`);
    console.log(`   Colors: ${tokenMaps.colorMap.size} tokens`);
    console.log(`   Spacing: ${tokenMaps.spaceMap.size} tokens`);
    console.log(`   Radius: ${tokenMaps.radiusMap.size} tokens`);
    console.log('');
  }

  console.log('📁 Finding target files...');
  let files = await getTargetFiles();

  // Filter by git changes if --since is specified
  if (sinceRef) {
    const changedFiles = await getChangedFiles(sinceRef);
    files = files.filter(f => changedFiles.includes(f));
    if (!outputJSON) {
      console.log(`📝 Filtered to ${files.length} changed files since ${sinceRef}`);
    }
  }

  if (!outputJSON) {
    console.log(`Found ${files.length} CSS files to process`);
    console.log('');
  }

  let totalChanges = 0;
  let filesChanged = 0;
  const summary = { high: 0, missing: 0 };
  const results = [];

  for (const file of files) {
    try {
      const content = readFileSync(file, 'utf8');
      const { transformed, changes } = transformCSS(content, tokenMaps);

      if (changes.length > 0) {
        filesChanged++;
        totalChanges += changes.length;

        const fileResult = {
          file,
          changes: changes.map(c => ({
            type: c.type,
            from: c.from,
            to: c.to,
            confidence: c.confidence
          }))
        };
        results.push(fileResult);

        for (const change of changes) {
          summary[change.confidence]++;
        }

        if (!outputJSON) {
          console.log(`📝 ${file}:`);
          for (const change of changes) {
            console.log(`   ${change.type}: ${change.from} → ${change.to} (${change.confidence})`);
          }
        }

        if (!isDryRun) {
          writeFileSync(file, transformed, 'utf8');
          if (!outputJSON) {
            console.log('   ✅ Applied changes');
          }
        }

        if (!outputJSON) {
          console.log('');
        }
      }
    } catch (error) {
      console.error(`❌ Error processing ${file}:`, error.message);
    }
  }

  // Output results
  const finalReport = {
    filesProcessed: files.length,
    filesChanged,
    totalChanges,
    summary,
    results,
    mode: isDryRun ? 'dry-run' : 'applied',
    timestamp: new Date().toISOString()
  };

  if (outputJSON) {
    console.log(JSON.stringify(finalReport, null, 2));
  } else {
    console.log('📊 TRANSFORMATION SUMMARY');
    console.log('========================');
    console.log(`Files processed: ${files.length}`);
    console.log(`Files changed: ${filesChanged}`);
    console.log(`Total changes: ${totalChanges}`);
    console.log(`High confidence: ${summary.high}`);
    console.log(`Missing tokens: ${summary.missing}`);
    console.log('');

    if (isDryRun) {
      console.log('🔍 This was a dry run. Use --apply to execute changes.');
      console.log('💡 Use --package=<name> to target specific package.');
      console.log('💡 Use --since=<git-ref> for targeted changes.');
    } else {
      console.log('✅ Changes applied successfully!');
      console.log('📋 Next steps:');
      console.log('   1. Run npm run lint:css to verify');
      console.log('   2. Run npm run audit:css-origin to check compliance');
      console.log('   3. Review TODO comments for missing tokens');
      console.log('   4. Create GitHub issues for missing tokens');
    }
  }

  // Exit with error if there are missing tokens (for CI)
  if (summary.missing > 0) {
    process.exit(1);
  }
}

main().catch(error => {
  console.error('💥 Codemod failed:', error);
  process.exit(1);
});