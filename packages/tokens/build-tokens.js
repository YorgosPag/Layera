#!/usr/bin/env node

/**
 * 🔧 LAYERA TOKENS BUILD SCRIPT
 *
 * Μετατρέπει TypeScript tokens → CSS variables
 * tokens.ts → build → tokens.css → import στην εφαρμογή
 *
 * Enterprise Standards:
 * - Διαβάζει από src/colors/colors.variables.ts
 * - Γράφει στο dist/tokens.css
 * - Δημιουργεί CSS custom properties
 * - Auto-generated header για προστασία
 */

const fs = require('fs');
const path = require('path');

// Paths
const srcDir = path.join(__dirname, 'src');
const distDir = path.join(__dirname, 'dist');
const outputFile = path.join(distDir, 'tokens.css');

console.log('🔧 LAYERA TOKENS BUILD - Ξεκινάω compilation...');

// Βεβαιώνεται ότι υπάρχει το dist directory
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
  console.log('📁 Δημιουργήθηκε dist directory');
}

// Διαβάζει τα tokens αρχεία
const colorsFile = path.join(srcDir, 'colors', 'colors.variables.ts');
const spacingFile = path.join(srcDir, 'core', 'spacing', 'spacing.variables.ts');
const typographyFile = path.join(srcDir, 'core', 'typography', 'typography.variables.ts');

if (!fs.existsSync(colorsFile)) {
  console.error('❌ Δεν βρέθηκε το αρχείο:', colorsFile);
  process.exit(1);
}

console.log('📖 Διαβάζω colors tokens από:', colorsFile);
const colorsContent = fs.readFileSync(colorsFile, 'utf8');

console.log('📏 Διαβάζω spacing tokens από:', spacingFile);
const spacingContent = fs.existsSync(spacingFile) ? fs.readFileSync(spacingFile, 'utf8') : null;

console.log('🖋️ Διαβάζω typography tokens από:', typographyFile);
const typographyContent = fs.existsSync(typographyFile) ? fs.readFileSync(typographyFile, 'utf8') : null;

// Εξάγει hex τιμές από το TypeScript αρχείο
function extractHexValues(content) {
  const cssVariables = [];

  // Regular expression για να βρει hex τιμές
  const hexRegex = /'(#[0-9a-fA-F]{6})'/g;
  const matches = content.match(hexRegex);

  if (matches) {
    console.log(`🎨 Βρήκα ${matches.length} hex τιμές`);
  }

  // Extract PRIMARY_COLORS
  const primaryMatch = content.match(/export const PRIMARY_COLORS = \{([\s\S]*?)\} as const;/);
  if (primaryMatch) {
    const primaryContent = primaryMatch[1];
    const scaleRegex = /(\d+): '(#[0-9a-fA-F]{6})'/g;
    let match;

    while ((match = scaleRegex.exec(primaryContent)) !== null) {
      const [, scale, hex] = match;
      cssVariables.push(`  --layera-color-primary-${scale}: ${hex};`);
    }
  }

  // Extract SECONDARY_COLORS
  const secondaryMatch = content.match(/export const SECONDARY_COLORS = \{([\s\S]*?)\} as const;/);
  if (secondaryMatch) {
    const secondaryContent = secondaryMatch[1];
    const scaleRegex = /(\d+): '(#[0-9a-fA-F]{6})'/g;
    let match;

    while ((match = scaleRegex.exec(secondaryContent)) !== null) {
      const [, scale, hex] = match;
      cssVariables.push(`  --layera-color-secondary-${scale}: ${hex};`);
    }
  }

  // Extract SEMANTIC_COLORS
  const semanticMatch = content.match(/export const SEMANTIC_COLORS = \{([\s\S]*?)\} as const;/);
  if (semanticMatch) {
    const semanticContent = semanticMatch[1];

    // Success colors
    const successMatch = semanticContent.match(/success: \{([\s\S]*?)\}/);
    if (successMatch) {
      const successContent = successMatch[1];
      const colorRegex = /(light|main|dark|contrastText): '(#[0-9a-fA-F]{6})'/g;
      let match;
      while ((match = colorRegex.exec(successContent)) !== null) {
        const [, state, hex] = match;
        cssVariables.push(`  --layera-color-success-${state}: ${hex};`);
      }
    }

    // Warning, Error, Info colors (same pattern)
    ['warning', 'error', 'info'].forEach(type => {
      const typeMatch = semanticContent.match(new RegExp(`${type}: \\{([\\s\\S]*?)\\}`));
      if (typeMatch) {
        const typeContent = typeMatch[1];
        const colorRegex = /(light|main|dark|contrastText): '(#[0-9a-fA-F]{6})'/g;
        let match;
        while ((match = colorRegex.exec(typeContent)) !== null) {
          const [, state, hex] = match;
          cssVariables.push(`  --layera-color-${type}-${state}: ${hex};`);
        }
      }
    });
  }

  // Extract NEUTRAL_COLORS
  const neutralMatch = content.match(/export const NEUTRAL_COLORS = \{([\s\S]*?)\} as const;/);
  if (neutralMatch) {
    const neutralContent = neutralMatch[1];
    const colorRegex = /(white|light|medium|dark|black): '(#[0-9a-fA-F]{6})'/g;
    let match;

    while ((match = colorRegex.exec(neutralContent)) !== null) {
      const [, name, hex] = match;
      cssVariables.push(`  --layera-color-neutral-${name}: ${hex};`);
    }
  }

  return cssVariables;
}

// Εξάγει spacing τιμές από το TypeScript αρχείο
function extractSpacingValues(content) {
  const cssVariables = [];

  if (!content) return cssVariables;

  // Extract SPACING_SCALE
  const spacingScaleMatch = content.match(/export const SPACING_SCALE[\s\S]*?= \{([\s\S]*?)\} as const;/);
  if (spacingScaleMatch) {
    const spacingScaleContent = spacingScaleMatch[1];
    const spacingRegex = /(\d+): ['"]([^'"]+)['"]/g;
    let match;

    while ((match = spacingRegex.exec(spacingScaleContent)) !== null) {
      const [, scale, value] = match;
      cssVariables.push(`  --layera-spacing-${scale}: ${value};`);
    }
  }

  // Extract SPACING_VALUES
  const spacingValuesMatch = content.match(/export const SPACING_VALUES[\s\S]*?= \{([\s\S]*?)\} as const;/);
  if (spacingValuesMatch) {
    const spacingValuesContent = spacingValuesMatch[1];
    const valuesRegex = /(\w+): SPACING_SCALE\[(\d+)\]/g;
    let match;

    while ((match = valuesRegex.exec(spacingValuesContent)) !== null) {
      const [, name, scale] = match;
      // Find the value from SPACING_SCALE
      const scaleMatch = content.match(new RegExp(`${scale}: ['"]([^'"]+)['"]`));
      if (scaleMatch) {
        cssVariables.push(`  --layera-spacing-${name}: ${scaleMatch[1]};`);
      }
    }
  }

  console.log(`📏 Εξήχθησαν ${cssVariables.length} spacing variables`);
  return cssVariables;
}

// Εξάγει typography τιμές από το TypeScript αρχείο
function extractTypographyValues(content) {
  const cssVariables = [];

  if (!content) return cssVariables;

  // Extract FONT_SIZE_SCALE
  const fontSizeMatch = content.match(/export const FONT_SIZE_SCALE[\\s\\S]*?= \\{([\\s\\S]*?)\\} as const;/);
  if (fontSizeMatch) {
    const fontSizeContent = fontSizeMatch[1];
    const sizeRegex = /(\\w+): ['\"]([^'\"]+)['\"]/g;
    let match;

    while ((match = sizeRegex.exec(fontSizeContent)) !== null) {
      const [, size, value] = match;
      cssVariables.push(`  --layera-typography-core-fontSize-${size}: ${value};`);
    }
  }

  // Extract FONT_WEIGHT_SCALE
  const fontWeightMatch = content.match(/export const FONT_WEIGHT_SCALE[\\s\\S]*?= \\{([\\s\\S]*?)\\} as const;/);
  if (fontWeightMatch) {
    const fontWeightContent = fontWeightMatch[1];
    const weightRegex = /(\\w+): (\\d+)/g;
    let match;

    while ((match = weightRegex.exec(fontWeightContent)) !== null) {
      const [, weight, value] = match;
      cssVariables.push(`  --layera-typography-core-fontWeight-${weight}: ${value};`);
    }
  }

  // Extract LINE_HEIGHT_SCALE
  const lineHeightMatch = content.match(/export const LINE_HEIGHT_SCALE[\\s\\S]*?= \\{([\\s\\S]*?)\\} as const;/);
  if (lineHeightMatch) {
    const lineHeightContent = lineHeightMatch[1];
    const heightRegex = /(\\w+): ([\\d.]+)/g;
    let match;

    while ((match = heightRegex.exec(lineHeightContent)) !== null) {
      const [, height, value] = match;
      cssVariables.push(`  --layera-typography-core-lineHeight-${height}: ${value};`);
    }
  }

  // Extract FONT_FAMILY_SCALE
  const fontFamilyMatch = content.match(/export const FONT_FAMILY_SCALE[\\s\\S]*?= \\{([\\s\\S]*?)\\} as const;/);
  if (fontFamilyMatch) {
    const fontFamilyContent = fontFamilyMatch[1];
    const familyRegex = /(\\w+): `([^`]+)`/g;
    let match;

    while ((match = familyRegex.exec(fontFamilyContent)) !== null) {
      const [, family, value] = match;
      cssVariables.push(`  --layera-typography-core-fontFamily-${family}: ${value};`);
    }
  }

  console.log(`🖋️ Εξήχθησαν ${cssVariables.length} typography variables`);
  return cssVariables;
}

// Εξάγει τις CSS variables
const cssVariables = extractHexValues(colorsContent);
const spacingVariables = extractSpacingValues(spacingContent);
const typographyVariables = extractTypographyValues(typographyContent);

console.log(`✅ Εξήχθησαν ${cssVariables.length} color variables`);
console.log(`✅ Εξήχθησαν ${spacingVariables.length} spacing variables`);
console.log(`✅ Εξήχθησαν ${typographyVariables.length} typography variables`);

// Συνδυάζει όλα τα CSS variables
const allVariables = [...cssVariables, ...spacingVariables, ...typographyVariables];

// Δημιουργεί το CSS περιεχόμενο
const cssContent = `/*
 * 🎨 LAYERA DESIGN TOKENS - AUTO GENERATED
 *
 * ⚠️  DO NOT EDIT MANUALLY
 * Edit packages/tokens/src/colors/colors.variables.ts, core/spacing/spacing.variables.ts, και core/typography/typography.variables.ts and rebuild
 * Generated: ${new Date().toISOString()}
 */

:root {
  /* 🎨 COLORS */
${cssVariables.join('\n')}

  /* 📏 SPACING */
${spacingVariables.join('\n')}

  /* 🖋️ TYPOGRAPHY */
${typographyVariables.join('\n')}
}

/* 🎯 Layera Design Tokens System Ready */
`;

// Γράφει το CSS αρχείο
fs.writeFileSync(outputFile, cssContent, 'utf8');

console.log('🎯 Tokens CSS generated:', outputFile);
console.log('📊 Summary:');
console.log(`   📁 Source: ${colorsFile}`);
console.log(`   📁 Output: ${outputFile}`);
console.log(`   🎨 Colors: ${cssVariables.length}`);
console.log(`   📏 Spacing: ${spacingVariables.length}`);
console.log(`   🖋️ Typography: ${typographyVariables.length}`);
console.log(`   🎯 Total: ${allVariables.length}`);
console.log('');
console.log('✅ Build completed successfully!');
console.log('🚀 Ready για import στην εφαρμογή!');