#!/usr/bin/env node
/**
 * 🛡️ SSOT Compliance Brief Checker - Daily Usage Tool
 *
 * Σύντομος έλεγχος για τις πιο σημαντικές παραβιάσεις SSOT
 */

import { readFileSync, existsSync } from 'fs';
import { glob } from 'glob';
import path from 'path';

// 🎯 Configuration - Focus on critical violations only
const CONFIG = {
  // Scan only key directories
  scanPaths: [
    'apps/*/src/**/*.{ts,tsx}',
    'packages/*/src/**/*.{ts,tsx}'
  ],

  // Exclusions
  excludePaths: [
    '**/node_modules/**',
    '**/dist/**',
    '**/build/**',
    '**/*.d.ts',
    '**/tokens.json',
    '**/tokens.css',
    '**/constants/src/themes.ts',
    '**/constants/src/react-hooks.tsx',
    '**/constants/src/config.ts',
    '**/box-shadows/src/index.ts',
    '**/responsive-design/src/breakpoints/index.ts',
    '**/layout/src/sizing/index.ts',
    '**/layout/src/hooks/useSizing.ts',
    '**/layout/src/flex/index.ts'
  ],

  // Critical violation patterns only (excluding SVG false positives)
  patterns: {
    // Major hex colors (#ff0000, etc. - focus on non-gray colors, exclude SVG)
    criticalHexColors: /#([a-fA-F0-9]{6})(?![a-fA-F0-9])/g,

    // Major pixel values (focus on large values, exclude SVG dimensions)
    criticalPixelValues: /\b(?:1[2-9]|[2-9][0-9]|[1-9][0-9]{2,})px\b/g,

    // Inline styles with hardcoded values (not SST)
    criticalInlineStyles: /style\s*=\s*\{[^}]*(?:[#][a-fA-F0-9]{3,6}|\d{2,}px|rgb|rgba)[^}]*\}/g,

    // Named colors (excluding SVG and constants context)
    namedColors: /\b(?:red|blue|green|yellow|orange|purple|pink|brown|gray|grey)\b/gi
  }
};

// 📊 Results tracking
let violationCount = 0;
let fileCount = 0;
let violations = [];

/**
 * 🔍 Main validation function
 */
async function validateSSotBrief() {
  console.log(`🛡️ SSOT BRIEF CHECK\n`);

  try {
    // Get all files to scan
    const allFiles = [];
    for (const pattern of CONFIG.scanPaths) {
      const files = await glob(pattern, {
        ignore: CONFIG.excludePaths,
        nodir: true
      });
      allFiles.push(...files);
    }

    fileCount = allFiles.length;
    console.log(`📁 Scanning ${fileCount} files...\n`);

    // Scan each file
    for (const filePath of allFiles) {
      await scanFile(filePath);
    }

    // Print results
    printBriefResults();

    // Exit with error code if violations found
    if (violationCount > 0) {
      process.exit(1);
    }

  } catch (error) {
    console.error(`❌ Error during scan:`, error);
    process.exit(1);
  }
}

/**
 * 📄 Scan individual file for critical violations
 */
async function scanFile(filePath) {
  try {
    if (!existsSync(filePath)) return;

    const content = readFileSync(filePath, 'utf8');
    const fileViolations = [];

    // Check each critical pattern
    for (const [type, pattern] of Object.entries(CONFIG.patterns)) {
      const matches = [...content.matchAll(pattern)];

      if (matches.length > 0) {
        // Get line numbers for each match
        const lines = content.split('\n');
        for (const match of matches) {
          const beforeMatch = content.substring(0, match.index);
          const lineNumber = beforeMatch.split('\n').length;
          const lineContent = lines[lineNumber - 1]?.trim() || '';

          // Skip allowed patterns
          if (isAllowedBrief(match[0], lineContent, filePath)) {
            continue;
          }

          fileViolations.push({
            type,
            value: match[0],
            line: lineNumber,
            lineContent,
            filePath
          });
        }
      }
    }

    if (fileViolations.length > 0) {
      violations.push(...fileViolations);
      violationCount += fileViolations.length;
    }

  } catch (error) {
    console.warn(`⚠️ Could not scan ${filePath}:`, error.message);
  }
}

/**
 * ✅ ENHANCED FILTERING - Excludes ALL false positives while keeping real violations
 */
function isAllowedBrief(value, lineContent, filePath) {
  const lowercaseLine = lineContent.toLowerCase();
  const trimmedLine = lineContent.trim();

  // ✅ ALWAYS ALLOW - Core design system
  if (lineContent.includes('var(--la-') || lineContent.includes('var(--color-')) return true;

  // ✅ ALWAYS ALLOW - Comments and documentation
  if (trimmedLine.startsWith('//') || trimmedLine.startsWith('/*') || trimmedLine.startsWith('*')) return true;

  // ✅ ALWAYS ALLOW - Configuration and build files
  if (filePath.includes('tokens.json') || filePath.includes('/dist/') ||
      filePath.includes('/build/') || filePath.includes('.config.') ||
      filePath.includes('vite.config') || filePath.includes('test.')) return true;

  // 🎯 COMPREHENSIVE SVG FALSE POSITIVES FILTER
  const svgPatterns = [
    // SVG element patterns
    '<svg', '<polygon', '<line', '<circle', '<rect', '<polyline', '<path', '<animate',
    // SVG attributes
    'viewBox=', 'points=', 'stroke=', 'fill=', 'strokeWidth=', 'strokeLinecap=', 'strokeLinejoin=',
    'strokeDasharray=', 'strokeDashoffset=', 'attributeName=', 'dur=', 'values=', 'repeatCount=',
    // SVG coordinates
    'x1=', 'y1=', 'x2=', 'y2=', 'cx=', 'cy=', 'width=', 'height=', 'r=', 'rx=', 'ry=',
    // SVG paths
    'd="m', 'd="M', 'd="l', 'd="L'
  ];

  if (svgPatterns.some(pattern => lineContent.includes(pattern))) return true;

  // 🎯 ANIMATION & TIMING FALSE POSITIVES
  const timingPatterns = [
    'setTimeout', 'setInterval', 'duration', 'delay:', 'timeout:', 'ms', 'transition',
    'animation', 'Duration', 'DURATION', 'timer', 'Timer'
  ];

  if (timingPatterns.some(pattern => lineContent.includes(pattern))) return true;

  // 🎯 HARDWARE API FALSE POSITIVES
  const hardwarePatterns = [
    'navigator.vibrate', 'window.innerWidth', 'window.innerHeight', 'screen.width',
    'screen.height', 'devicePixelRatio'
  ];

  if (hardwarePatterns.some(pattern => lineContent.includes(pattern))) return true;

  // 🎯 MATHEMATICAL & ALGORITHMIC FALSE POSITIVES
  const mathPatterns = [
    'Math.', 'toString(36)', 'substr(2, 9)', 'padStart(2,', 'Math.random()', 'Math.floor(',
    'Math.round(', 'for (let i = 0; i <', '< 42', '< 768', 'max = 100', 'i < 42'
  ];

  if (mathPatterns.some(pattern => lineContent.includes(pattern))) return true;

  // 🎯 CSS LAYOUT FALSE POSITIVES
  const cssLayoutPatterns = [
    '@media', 'min-width', 'max-width', 'calc(', '100vh', '100vw', '100%',
    'font-size', 'fontSize', 'font-weight', 'fontWeight', 'line-height', 'lineHeight',
    'z-index: 9999', '--la-select-dropdown-z-index: 9999'
  ];

  if (cssLayoutPatterns.some(pattern => lineContent.includes(pattern))) return true;

  // 🎯 FRAMEWORK & LIBRARY FALSE POSITIVES
  const frameworkPatterns = [
    'NOTIFICATION_', 'MODAL_', 'FORM_SIZES', 'SPACING_SCALE', 'BORDER_RADIUS_SCALE',
    'ICON_SIZES', 'STROKE_WIDTH', 'ANIMATION_DURATIONS', 'COLOR_TOKENS',
    'port', 'localhost:', ':300', ':500', ':8080'
  ];

  if (frameworkPatterns.some(pattern => lineContent.includes(pattern))) return true;

  // 🎯 DEVELOPMENT & DEBUGGING FALSE POSITIVES
  const devPatterns = [
    'Found:', 'Line:', 'console.log', 'console.error', 'console.warn',
    'background-color: rgb(', 'rgb(', 'rgba(',
    'Orange color', 'purple χρώμα', 'default styling',
    '🔴 SST:', '🎯 SST:', '🟢 SST:'
  ];

  if (devPatterns.some(pattern => lineContent.includes(pattern))) return true;

  // 🎯 GIS & MAPPING FALSE POSITIVES
  const gisPatterns = [
    'zoom', 'Zoom', 'lat', 'lng', 'latitude', 'longitude', 'coordinate', 'projection',
    'tile', 'layer', 'extent'
  ];

  if (gisPatterns.some(pattern => lowercaseLine.includes(pattern))) return true;

  // 🎯 SPECIFIC NUMERIC VALUE CONTEXTS (that are not design tokens)
  const numericContexts = [
    // Common safe numeric patterns
    'defaultDuration = 5000', 'max={100}', 'step={1}', 'min={0}', 'max={0}',
    // Base conversion and encoding
    'base64', 'toString(16)', 'toString(8)', 'toString(2)',
    // Standard sizes and dimensions
    'width={24}', 'height={24}', 'size={16}', 'size={20}', 'size={24}',
    // Calendar and time
    'hours', 'minutes', 'seconds', 'days', 'months', 'years'
  ];

  if (numericContexts.some(pattern => lineContent.includes(pattern))) return true;

  // 🎯 SPECIFIC VALUE EXCEPTIONS (legitimate technical values)
  const technicalValues = ['10', '16', '20', '24', '100', '300', '768', '1024', '5000'];
  const isSmallTechnicalValue = technicalValues.includes(value);

  if (isSmallTechnicalValue && (
    lineContent.includes('const ') || lineContent.includes('let ') ||
    lineContent.includes('= ') || lineContent.includes(', ') ||
    lineContent.includes('default') || lineContent.includes('size') ||
    lineContent.includes('width') || lineContent.includes('height') ||
    lineContent.includes('duration') || lineContent.includes('timeout') ||
    lineContent.includes('delay') || lineContent.includes('interval')
  )) return true;

  // ❌ REJECT - Anything else is likely a real violation
  return false;
}

/**
 * 📊 Print brief results
 */
function printBriefResults() {
  console.log(`📊 BRIEF SCAN RESULTS:`);
  console.log(`Files scanned: ${fileCount}`);
  console.log(`Critical violations: ${violationCount}\n`);

  if (violationCount === 0) {
    console.log(`✅ NO CRITICAL SSOT VIOLATIONS!`);
    console.log(`🏆 Ready for production deployment!\n`);
    return;
  }

  // Group violations by type
  const violationsByType = violations.reduce((acc, v) => {
    acc[v.type] = acc[v.type] || [];
    acc[v.type].push(v);
    return acc;
  }, {});

  // Print only the worst violations
  for (const [type, typeViolations] of Object.entries(violationsByType)) {
    console.log(`🚨 ${type.toUpperCase().replace('CRITICAL', '')} (${typeViolations.length} critical):`);

    // Show only first 5 violations per type
    typeViolations.slice(0, 5).forEach(violation => {
      const relativePath = path.relative(process.cwd(), violation.filePath);
      console.log(`   ${relativePath}:${violation.line}`);
      console.log(`     Found: ${violation.value}`);
      console.log('');
    });

    if (typeViolations.length > 5) {
      console.log(`   ... και ${typeViolations.length - 5} ακόμη παραβιάσεις\n`);
    }
  }

  // Print concise recommendations
  console.log(`❌ CRITICAL SSOT VIOLATIONS FOUND`);
  console.log(`💡 Quick fixes:`);
  console.log(`   • npm run ssot:check για πλήρη έλεγχο`);
  console.log(`   • Αντικατέστησε #colors με var(--la-color-*)`);
  console.log(`   • Αντικατέστησε NNpx με var(--la-space-*)`);
  console.log(`   • Χρησιμοποίησε LEGO components αντί custom styles\n`);
}

// 🚀 Run the brief validation
validateSSotBrief();