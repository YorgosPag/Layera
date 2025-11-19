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

// Διαβάζει τα tokens αρχεία - ΜΟΝΟ από επίσημους φακέλους (core, semantic, component)
const colorsFile = path.join(srcDir, 'core', 'colors', 'colors.variables.ts');
const spacingFile = path.join(srcDir, 'core', 'spacing', 'spacing.variables.ts');
const typographyFile = path.join(srcDir, 'core', 'typography', 'typography.variables.ts');
const bordersFile = path.join(srcDir, 'core', 'borders', 'borders.variables.ts');
const shadowsFile = path.join(srcDir, 'core', 'shadows', 'shadows.variables.ts');
const motionFile = path.join(srcDir, 'core', 'motion', 'motion.variables.ts');
const iconsFile = path.join(srcDir, 'component', 'icons', 'icons.variables.ts');

// Semantic tokens αρχεία
const backgroundSemanticFile = path.join(srcDir, 'semantic', 'background', 'background.variables.ts');
const textSemanticFile = path.join(srcDir, 'semantic', 'text', 'text.variables.ts');
const borderSemanticFile = path.join(srcDir, 'semantic', 'border', 'border.variables.ts');
const feedbackSemanticFile = path.join(srcDir, 'semantic', 'feedback', 'feedback.variables.ts');

// Component tokens αρχεία
const buttonsComponentFile = path.join(srcDir, 'component', 'buttons', 'buttons.variables.ts');
const modalComponentFile = path.join(srcDir, 'component', 'modal', 'modal.variables.ts');

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

console.log('🔲 Διαβάζω borders tokens από:', bordersFile);
const bordersContent = fs.existsSync(bordersFile) ? fs.readFileSync(bordersFile, 'utf8') : null;

console.log('🌫️ Διαβάζω shadows tokens από:', shadowsFile);
const shadowsContent = fs.existsSync(shadowsFile) ? fs.readFileSync(shadowsFile, 'utf8') : null;

console.log('⚡ Διαβάζω motion tokens από:', motionFile);
const motionContent = fs.existsSync(motionFile) ? fs.readFileSync(motionFile, 'utf8') : null;

console.log('🎯 Διαβάζω icons tokens από:', iconsFile);
const iconsContent = fs.existsSync(iconsFile) ? fs.readFileSync(iconsFile, 'utf8') : null;

console.log('🎨 Διαβάζω background semantic tokens από:', backgroundSemanticFile);
const backgroundSemanticContent = fs.existsSync(backgroundSemanticFile) ? fs.readFileSync(backgroundSemanticFile, 'utf8') : null;

console.log('✏️ Διαβάζω text semantic tokens από:', textSemanticFile);
const textSemanticContent = fs.existsSync(textSemanticFile) ? fs.readFileSync(textSemanticFile, 'utf8') : null;

console.log('🔲 Διαβάζω border semantic tokens από:', borderSemanticFile);
const borderSemanticContent = fs.existsSync(borderSemanticFile) ? fs.readFileSync(borderSemanticFile, 'utf8') : null;

console.log('🔔 Διαβάζω feedback semantic tokens από:', feedbackSemanticFile);
const feedbackSemanticContent = fs.existsSync(feedbackSemanticFile) ? fs.readFileSync(feedbackSemanticFile, 'utf8') : null;

console.log('🔲 Διαβάζω buttons component tokens από:', buttonsComponentFile);
const buttonsComponentContent = fs.existsSync(buttonsComponentFile) ? fs.readFileSync(buttonsComponentFile, 'utf8') : null;

console.log('🏢 Διαβάζω modal component tokens από:', modalComponentFile);
const modalComponentContent = fs.existsSync(modalComponentFile) ? fs.readFileSync(modalComponentFile, 'utf8') : null;

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
  const fontSizeMatch = content.match(/export const FONT_SIZE_SCALE[\\s\\S]*?= \\{([\\s\\S]*?)\\}/);
  if (fontSizeMatch) {
    const fontSizeContent = fontSizeMatch[1];
    const sizeRegex = /([\\w']+): ['\"]([^'\"]+)['\"]/g;
    let match;

    while ((match = sizeRegex.exec(fontSizeContent)) !== null) {
      const [, size, value] = match;
      cssVariables.push(`  --layera-typography-core-fontSize-${size}: ${value};`);
    }
  }

  // Extract FONT_WEIGHT_SCALE
  const fontWeightMatch = content.match(/export const FONT_WEIGHT_SCALE[\\s\\S]*?= \\{([\\s\\S]*?)\\}/);
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
  const lineHeightMatch = content.match(/export const LINE_HEIGHT_SCALE[\\s\\S]*?= \\{([\\s\\S]*?)\\}/);
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
  const fontFamilyMatch = content.match(/export const FONT_FAMILY_SCALE[\\s\\S]*?= \\{([\\s\\S]*?)\\}/);
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

// Εξάγει icons τιμές από το TypeScript αρχείο
function extractIconValues(content) {
  const cssVariables = [];

  if (!content) {
    console.log('🚨 Δεν βρέθηκε περιεχόμενο icons αρχείου');
    return cssVariables;
  }

  // Map για TypeScript references σε CSS variables
  const tsToCSS = {
    'ICON_TOKENS.sizes.xs': 'var(--layera-spacing-4)',
    'ICON_TOKENS.sizes.md': 'var(--layera-spacing-5)',
    'ICON_TOKENS.sizes.lg': 'var(--layera-spacing-8)',
    'ICON_TOKENS.colors.primary': 'var(--layera-color-warning-main)',
    'ICON_TOKENS.colors.secondary': 'var(--layera-color-secondary-600)',
    'ICON_TOKENS.colors.success': 'var(--layera-color-success-main)',
    'ICON_TOKENS.colors.warning': 'var(--layera-color-warning-main)',
    'ICON_TOKENS.colors.danger': 'var(--layera-color-error-main)',
    'ICON_TOKENS.colors.info': 'var(--layera-color-info-main)',
    'ICON_TOKENS.colors.neutral': 'var(--layera-color-secondary-600)',
    'ICON_TOKENS.interactive.opacity.default': '1',
    'ICON_TOKENS.interactive.opacity.hover': '0.8',
    'ICON_TOKENS.interactive.opacity.active': '0.6',
    'ICON_TOKENS.interactive.opacity.disabled': '0.4',
    'ICON_TOKENS.interactive.scale.default': '1',
    'ICON_TOKENS.interactive.scale.hover': '1.05',
    'ICON_TOKENS.interactive.scale.active': '0.95',
    'ICON_TOKENS.interactive.transitions.fast': '150ms ease',
    'ICON_TOKENS.interactive.transitions.normal': '250ms ease',
    'ICON_TOKENS.interactive.transitions.slow': '350ms ease',
    'ICON_TOKENS.accessibility.focusRing.width': 'var(--layera-spacing-1)',
    'ICON_TOKENS.accessibility.focusRing.color': 'var(--layera-color-info-main)',
    'ICON_TOKENS.accessibility.contrast.normal': 'normal',
    'ICON_TOKENS.sizing.padding.xs': 'var(--layera-spacing-1)',
    'ICON_TOKENS.sizing.padding.sm': 'var(--layera-spacing-2)',
    'ICON_TOKENS.sizing.padding.md': 'var(--layera-spacing-3)',
    'ICON_TOKENS.sizing.padding.lg': 'var(--layera-spacing-4)',
    'ICON_TOKENS.sizing.padding.xl': 'var(--layera-spacing-5)',
    'ICON_TOKENS.sizing.margin.xs': 'var(--layera-spacing-1)',
    'ICON_TOKENS.sizing.margin.sm': 'var(--layera-spacing-2)',
    'ICON_TOKENS.sizing.margin.md': 'var(--layera-spacing-3)',
    'ICON_TOKENS.sizing.margin.lg': 'var(--layera-spacing-4)',
    'ICON_TOKENS.sizing.margin.xl': 'var(--layera-spacing-5)',
  };

  // Απλός line-by-line parsing για ICON_VARIABLES
  const lines = content.split('\n');
  let insideIconVariables = false;
  let braceCount = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Αρχή του ICON_VARIABLES object
    if (line.includes('export const ICON_VARIABLES')) {
      insideIconVariables = true;
      braceCount = 0;
      continue;
    }

    if (insideIconVariables) {
      // Μετράω τα braces
      braceCount += (line.match(/\\{/g) || []).length;
      braceCount -= (line.match(/\\}/g) || []).length;

      // Αν βρω variable definition - απλό string matching
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith("'") && trimmedLine.includes("': ")) {
        const parts = trimmedLine.split("': ");
        if (parts.length === 2) {
          const varName = parts[0].replace(/'/g, '');
          let varValue = parts[1].replace(/,$/, '').trim();

          // Resolve TypeScript reference to CSS variable
          if (tsToCSS[varValue]) {
            varValue = tsToCSS[varValue];
          }

          cssVariables.push(`  --layera-${varName}: ${varValue};`);
        }
      }

      // Αν τελειώσαμε με το object (brace count = -1 σημαίνει το κλείσιμο)
      if (braceCount < 0) {
        break;
      }
    }
  }

  console.log(`🎯 Εξήχθησαν ${cssVariables.length} icons variables`);
  return cssVariables;
}

// Εξάγει borders τιμές από το TypeScript αρχείο
function extractBordersValues(content) {
  const cssVariables = [];

  if (!content) {
    console.log('🔲 Δεν βρέθηκε περιεχόμενο borders αρχείου');
    return cssVariables;
  }

  // Extract BORDER_WIDTH_SCALE
  const borderWidthMatch = content.match(/export const BORDER_WIDTH_SCALE[\s\S]*?= \{([\s\S]*?)\} as const;/);
  if (borderWidthMatch) {
    const borderWidthContent = borderWidthMatch[1];
    const widthRegex = /(\w+): ['"]?([^'"\s,}]+)['"]?/g;
    let match;

    while ((match = widthRegex.exec(borderWidthContent)) !== null) {
      const [, scale, value] = match;
      cssVariables.push(`  --layera-border-width-${scale}: ${value};`);
    }
  }

  // Extract BORDER_RADIUS_SCALE
  const borderRadiusMatch = content.match(/export const BORDER_RADIUS_SCALE[\s\S]*?= \{([\s\S]*?)\} as const;/);
  if (borderRadiusMatch) {
    const borderRadiusContent = borderRadiusMatch[1];
    const radiusRegex = /(\w+): ['"]?([^'"\s,}]+)['"]?/g;
    let match;

    while ((match = radiusRegex.exec(borderRadiusContent)) !== null) {
      const [, scale, value] = match;
      cssVariables.push(`  --layera-border-radius-${scale}: ${value};`);
    }
  }

  // Extract BORDER_STYLE_SCALE
  const borderStyleMatch = content.match(/export const BORDER_STYLE_SCALE[\s\S]*?= \{([\s\S]*?)\} as const;/);
  if (borderStyleMatch) {
    const borderStyleContent = borderStyleMatch[1];
    const styleRegex = /(\w+): ['"]?([^'"\s,}]+)['"]?/g;
    let match;

    while ((match = styleRegex.exec(borderStyleContent)) !== null) {
      const [, scale, value] = match;
      cssVariables.push(`  --layera-border-style-${scale}: ${value};`);
    }
  }

  console.log(`🔲 Εξήχθησαν ${cssVariables.length} borders variables`);
  return cssVariables;
}

// Εξάγει shadows τιμές από το TypeScript αρχείο
function extractShadowsValues(content) {
  const cssVariables = [];

  if (!content) {
    console.log('🌫️ Δεν βρέθηκε περιεχόμενο shadows αρχείου');
    return cssVariables;
  }

  // Απλός line-by-line parsing για SHADOW_VARIABLES
  const lines = content.split('\n');
  let insideShadowVariables = false;
  let braceCount = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Αρχή του SHADOW_VARIABLES object
    if (line.includes('export const SHADOW_VARIABLES')) {
      insideShadowVariables = true;
      braceCount = 0;
      continue;
    }

    if (insideShadowVariables) {
      // Μετράω τα braces
      braceCount += (line.match(/\{/g) || []).length;
      braceCount -= (line.match(/\}/g) || []).length;

      // Αν βρω variable definition - απλό string matching
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith("'") && trimmedLine.includes("': ")) {
        const parts = trimmedLine.split("': ");
        if (parts.length === 2) {
          const varName = parts[0].replace(/'/g, '');
          let varValue = parts[1].replace(/,$/, '').trim();

          // Αφαιρώ τα quotes από την τιμή
          varValue = varValue.replace(/^['"]|['"]$/g, '');

          cssVariables.push(`  --layera-${varName}: ${varValue};`);
        }
      }

      // Τέλος του SHADOW_VARIABLES object
      if (braceCount === 0 && trimmedLine.includes('}')) {
        break;
      }
    }
  }

  console.log(`🌫️ Εξήχθησαν ${cssVariables.length} shadows variables`);
  return cssVariables;
}

// Εξάγει motion τιμές από το TypeScript αρχείο
function extractMotionValues(content) {
  const cssVariables = [];

  if (!content) {
    console.log('⚡ Δεν βρέθηκε περιεχόμενο motion αρχείου');
    return cssVariables;
  }

  // Απλός line-by-line parsing για MOTION_VARIABLES
  const lines = content.split('\n');
  let insideMotionVariables = false;
  let braceCount = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Αρχή του MOTION_VARIABLES object
    if (line.includes('export const MOTION_VARIABLES')) {
      insideMotionVariables = true;
      braceCount = 0;
      continue;
    }

    if (insideMotionVariables) {
      // Μετράω τα braces
      braceCount += (line.match(/\{/g) || []).length;
      braceCount -= (line.match(/\}/g) || []).length;

      // Αν βρω variable definition - απλό string matching
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith("'") && trimmedLine.includes("': ")) {
        const parts = trimmedLine.split("': ");
        if (parts.length === 2) {
          const varName = parts[0].replace(/'/g, '');
          let varValue = parts[1].replace(/,$/, '').trim();

          // Αφαιρώ τα quotes από την τιμή
          varValue = varValue.replace(/^['"]|['"]$/g, '');

          cssVariables.push(`  --layera-${varName}: ${varValue};`);
        }
      }

      // Τέλος του MOTION_VARIABLES object
      if (braceCount === 0 && trimmedLine.includes('}')) {
        break;
      }
    }
  }

  console.log(`⚡ Εξήχθησαν ${cssVariables.length} motion variables`);
  return cssVariables;
}

// Εξάγει background semantic τιμές από το TypeScript αρχείο
function extractBackgroundSemanticValues(content) {
  const cssVariables = [];

  if (!content) {
    console.log('🎨 Δεν βρέθηκε περιεχόμενο background semantic αρχείου');
    return cssVariables;
  }

  // Απλός line-by-line parsing για BACKGROUND_VARIABLES
  const lines = content.split('\n');
  let insideBackgroundVariables = false;
  let braceCount = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Αρχή του BACKGROUND_VARIABLES object
    if (line.includes('export const BACKGROUND_VARIABLES')) {
      insideBackgroundVariables = true;
      braceCount = 0;
      continue;
    }

    if (insideBackgroundVariables) {
      // Μετράω τα braces
      braceCount += (line.match(/\{/g) || []).length;
      braceCount -= (line.match(/\}/g) || []).length;

      // Αν βρω variable definition - απλό string matching
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith("'") && trimmedLine.includes("': ")) {
        const parts = trimmedLine.split("': ");
        if (parts.length === 2) {
          const varName = parts[0].replace(/'/g, '');
          let varValue = parts[1].replace(/,$/, '').trim();

          // Resolve COLOR_SCALE references
          if (varValue.includes('COLOR_SCALE.')) {
            // Extract the reference (e.g., "COLOR_SCALE.primary[500]" or "COLOR_SCALE.neutral.white")
            const colorRef = varValue.match(/COLOR_SCALE\.(\w+)(?:\[(\w+)\]|\.(\w+))?/);
            if (colorRef) {
              const [, colorType, colorScale, colorVariant] = colorRef;
              if (colorScale) {
                varValue = `var(--layera-color-${colorType}-${colorScale})`;
              } else if (colorVariant) {
                varValue = `var(--layera-color-${colorType}-${colorVariant})`;
              } else {
                varValue = `var(--layera-color-${colorType})`;
              }
            }
          }

          cssVariables.push(`  --layera-${varName}: ${varValue};`);
        }
      }

      // Τέλος του BACKGROUND_VARIABLES object
      if (braceCount === 0 && trimmedLine.includes('} as const;')) {
        break;
      }
    }
  }

  console.log(`🎨 Εξήχθησαν ${cssVariables.length} background semantic variables`);
  return cssVariables;
}

// Εξάγει text semantic τιμές από το TypeScript αρχείο
function extractTextSemanticValues(content) {
  const cssVariables = [];

  if (!content) {
    console.log('✏️ Δεν βρέθηκε περιεχόμενο text semantic αρχείου');
    return cssVariables;
  }

  // Απλός line-by-line parsing για TEXT_VARIABLES
  const lines = content.split('\n');
  let insideTextVariables = false;
  let braceCount = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Αρχή του TEXT_VARIABLES object
    if (line.includes('export const TEXT_VARIABLES')) {
      insideTextVariables = true;
      braceCount = 0;
      continue;
    }

    if (insideTextVariables) {
      // Μετράω τα braces
      braceCount += (line.match(/\{/g) || []).length;
      braceCount -= (line.match(/\}/g) || []).length;

      // Αν βρω variable definition - απλό string matching
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith("'") && trimmedLine.includes("': ")) {
        const parts = trimmedLine.split("': ");
        if (parts.length === 2) {
          const varName = parts[0].replace(/'/g, '');
          let varValue = parts[1].replace(/,$/, '').trim();

          // Resolve COLOR_SCALE references
          if (varValue.includes('COLOR_SCALE.')) {
            // Extract the reference (e.g., "COLOR_SCALE.neutral.dark" or "COLOR_SCALE.primary[600]")
            const colorRef = varValue.match(/COLOR_SCALE\.(\w+)(?:\.(\w+)|\[(\w+)\])?/);
            if (colorRef) {
              const [, colorType, colorVariant, colorScale] = colorRef;
              if (colorScale) {
                varValue = `var(--layera-color-${colorType}-${colorScale})`;
              } else if (colorVariant) {
                varValue = `var(--layera-color-${colorType}-${colorVariant})`;
              } else {
                varValue = `var(--layera-color-${colorType})`;
              }
            }
          }

          cssVariables.push(`  --layera-${varName}: ${varValue};`);
        }
      }

      // Τέλος του TEXT_VARIABLES object
      if (braceCount === 0 && trimmedLine.includes('} as const;')) {
        break;
      }
    }
  }

  console.log(`✏️ Εξήχθησαν ${cssVariables.length} text semantic variables`);
  return cssVariables;
}

// Εξάγει border semantic τιμές από το TypeScript αρχείο
function extractBorderSemanticValues(content) {
  const cssVariables = [];

  if (!content) {
    console.log('🔲 Δεν βρέθηκε περιεχόμενο border semantic αρχείου');
    return cssVariables;
  }

  // Απλός line-by-line parsing για BORDER_SEMANTIC_VARIABLES
  const lines = content.split('\n');
  let insideBorderVariables = false;
  let braceCount = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Αρχή του BORDER_SEMANTIC_VARIABLES object
    if (line.includes('export const BORDER_SEMANTIC_VARIABLES')) {
      insideBorderVariables = true;
      braceCount = 0;
      continue;
    }

    if (insideBorderVariables) {
      // Μετράω τα braces
      braceCount += (line.match(/\{/g) || []).length;
      braceCount -= (line.match(/\}/g) || []).length;

      // Αν βρω variable definition - απλό string matching
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith("'") && trimmedLine.includes("': ")) {
        const parts = trimmedLine.split("': ");
        if (parts.length === 2) {
          const varName = parts[0].replace(/'/g, '');
          let varValue = parts[1].replace(/,$/, '').trim();

          // Resolve COLOR_SCALE και BORDER_VARIABLES references
          if (varValue.includes('COLOR_SCALE.')) {
            const colorRef = varValue.match(/COLOR_SCALE\.(\w+)(?:\.(\w+)|\[(\w+)\])?/);
            if (colorRef) {
              const [, colorType, colorVariant, colorScale] = colorRef;
              if (colorScale) {
                varValue = varValue.replace(colorRef[0], `var(--layera-color-${colorType}-${colorScale})`);
              } else if (colorVariant) {
                varValue = varValue.replace(colorRef[0], `var(--layera-color-${colorType}-${colorVariant})`);
              }
            }
          }

          if (varValue.includes('BORDER_VARIABLES[')) {
            const borderRef = varValue.match(/BORDER_VARIABLES\['([^']+)'\]/g);
            if (borderRef) {
              borderRef.forEach(ref => {
                const borderKey = ref.match(/BORDER_VARIABLES\['([^']+)'\]/)[1];
                varValue = varValue.replace(ref, `var(--layera-${borderKey})`);
              });
            }
          }

          // Αφαιρώ τα quotes από την τιμή
          varValue = varValue.replace(/^['"]|['"]$/g, '');

          cssVariables.push(`  --layera-${varName}: ${varValue};`);
        }
      }

      // Τέλος του BORDER_SEMANTIC_VARIABLES object
      if (braceCount === 0 && trimmedLine.includes('} as const;')) {
        break;
      }
    }
  }

  console.log(`🔲 Εξήχθησαν ${cssVariables.length} border semantic variables`);
  return cssVariables;
}

// Εξάγει feedback semantic τιμές από το TypeScript αρχείο
function extractFeedbackSemanticValues(content) {
  const cssVariables = [];

  if (!content) {
    console.log('🔔 Δεν βρέθηκε περιεχόμενο feedback semantic αρχείου');
    return cssVariables;
  }

  // Απλός line-by-line parsing για FEEDBACK_VARIABLES
  const lines = content.split('\n');
  let insideFeedbackVariables = false;
  let braceCount = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Αρχή του FEEDBACK_VARIABLES object
    if (line.includes('export const FEEDBACK_VARIABLES')) {
      insideFeedbackVariables = true;
      braceCount = 0;
      continue;
    }

    if (insideFeedbackVariables) {
      // Μετράω τα braces
      braceCount += (line.match(/\{/g) || []).length;
      braceCount -= (line.match(/\}/g) || []).length;

      // Αν βρω variable definition - απλό string matching
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith("'") && trimmedLine.includes("': ")) {
        const parts = trimmedLine.split("': ");
        if (parts.length === 2) {
          const varName = parts[0].replace(/'/g, '');
          let varValue = parts[1].replace(/,$/, '').trim();

          // Resolve COLOR_SCALE references
          if (varValue.includes('COLOR_SCALE.')) {
            // Extract the reference (e.g., "COLOR_SCALE.success.dark" or "COLOR_SCALE.secondary[700]")
            const colorRef = varValue.match(/COLOR_SCALE\.(\w+)(?:\.(\w+)|\[(\w+)\])?/);
            if (colorRef) {
              const [, colorType, colorVariant, colorScale] = colorRef;
              if (colorScale) {
                varValue = `var(--layera-color-${colorType}-${colorScale})`;
              } else if (colorVariant) {
                varValue = `var(--layera-color-${colorType}-${colorVariant})`;
              } else {
                varValue = `var(--layera-color-${colorType})`;
              }
            }
          }

          cssVariables.push(`  --layera-${varName}: ${varValue};`);
        }
      }

      // Τέλος του FEEDBACK_VARIABLES object
      if (braceCount === 0 && trimmedLine.includes('} as const;')) {
        break;
      }
    }
  }

  console.log(`🔔 Εξήχθησαν ${cssVariables.length} feedback semantic variables`);
  return cssVariables;
}

// Εξάγει buttons component τιμές από το TypeScript αρχείο
function extractButtonsComponentValues(content) {
  const cssVariables = [];

  if (!content) {
    console.log('🔲 Δεν βρέθηκε περιεχόμενο buttons component αρχείου');
    return cssVariables;
  }

  // Απλός line-by-line parsing για BUTTON_VARIABLES
  const lines = content.split('\n');
  let insideButtonVariables = false;
  let braceCount = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Αρχή του BUTTON_VARIABLES object
    if (line.includes('export const BUTTON_VARIABLES')) {
      insideButtonVariables = true;
      braceCount = 0;
      continue;
    }

    if (insideButtonVariables) {
      // Μετράω τα braces
      braceCount += (line.match(/\{/g) || []).length;
      braceCount -= (line.match(/\}/g) || []).length;

      // Αν βρω variable definition - απλό string matching
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith("'") && trimmedLine.includes("': ")) {
        const parts = trimmedLine.split("': ");
        if (parts.length === 2) {
          const varName = parts[0].replace(/'/g, '');
          let varValue = parts[1].replace(/,$/, '').trim();

          // Resolve imports και references
          if (varValue.includes('BACKGROUND_VARIABLES[')) {
            const ref = varValue.match(/BACKGROUND_VARIABLES\['([^']+)'\]/);
            if (ref) {
              varValue = `var(--layera-${ref[1]})`;
            }
          }

          if (varValue.includes('TEXT_VARIABLES[')) {
            const ref = varValue.match(/TEXT_VARIABLES\['([^']+)'\]/);
            if (ref) {
              varValue = `var(--layera-${ref[1]})`;
            }
          }

          if (varValue.includes('BORDER_SEMANTIC_VARIABLES[')) {
            const ref = varValue.match(/BORDER_SEMANTIC_VARIABLES\['([^']+)'\]/);
            if (ref) {
              varValue = `var(--layera-${ref[1]})`;
            }
          }

          if (varValue.includes('MOTION_VARIABLES[')) {
            const ref = varValue.match(/MOTION_VARIABLES\['([^']+)'\]/);
            if (ref) {
              varValue = `var(--layera-${ref[1]})`;
            }
          }

          if (varValue.includes('SPACING_VARIABLES[')) {
            const ref = varValue.match(/SPACING_VARIABLES\['([^']+)'\]/);
            if (ref) {
              varValue = `var(--layera-${ref[1]})`;
            }
          }

          if (varValue.includes('BORDER_VARIABLES[')) {
            const ref = varValue.match(/BORDER_VARIABLES\['([^']+)'\]/);
            if (ref) {
              varValue = `var(--layera-${ref[1]})`;
            }
          }

          if (varValue.includes('SHADOW_VARIABLES[')) {
            const ref = varValue.match(/SHADOW_VARIABLES\['([^']+)'\]/);
            if (ref) {
              varValue = `var(--layera-${ref[1]})`;
            }
          }

          // Handle template literals με spacing variables
          if (varValue.includes('`${') && varValue.includes('SPACING_VARIABLES[')) {
            // Convert template literals like `${SPACING_VARIABLES['spacing-2']} ${SPACING_VARIABLES['spacing-3']}`
            varValue = varValue.replace(/`\$\{SPACING_VARIABLES\['([^']+)'\]\}/g, 'var(--layera-$1)');
            varValue = varValue.replace(/\$\{SPACING_VARIABLES\['([^']+)'\]\}/g, ' var(--layera-$1)');
            varValue = varValue.replace(/`/g, '');
          }

          // Direct color references
          if (varValue.includes("'var(--layera-color-")) {
            varValue = varValue.replace(/'/g, '');
          }

          // Αφαιρώ τα quotes από την τιμή
          varValue = varValue.replace(/^['"]|['"]$/g, '');

          cssVariables.push(`  --layera-${varName}: ${varValue};`);
        }
      }

      // Τέλος του BUTTON_VARIABLES object
      if (braceCount <= 0 && trimmedLine.includes('} as const;')) {
        break;
      }
    }
  }

  console.log(`🔲 Εξήχθησαν ${cssVariables.length} buttons component variables`);
  return cssVariables;
}

// Εξάγει τις modal component τιμές
function extractModalComponentValues(content) {
  const cssVariables = [];

  if (!content) {
    console.log('🏢 Δεν βρέθηκε περιεχόμενο modal component αρχείου');
    return cssVariables;
  }

  // Απλός line-by-line parsing για MODAL_VARIABLES
  const lines = content.split('\n');
  let insideModalVariables = false;
  let braceCount = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Αρχή του MODAL_VARIABLES object
    if (line.includes('export const MODAL_VARIABLES')) {
      insideModalVariables = true;
      braceCount = 0;
      continue;
    }

    if (insideModalVariables) {
      // Μετράω τα braces
      braceCount += (line.match(/\{/g) || []).length;
      braceCount -= (line.match(/\}/g) || []).length;

      // Αν βρω variable definition - απλό string matching
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith("'") && trimmedLine.includes("': ")) {
        const parts = trimmedLine.split("': ");
        if (parts.length === 2) {
          const varName = parts[0].replace(/'/g, '');
          let varValue = parts[1].replace(/,$/, '').trim();

          // Resolve imports και references για modal
          if (varValue.includes('BACKGROUND_VARIABLES[')) {
            const ref = varValue.match(/BACKGROUND_VARIABLES\['([^']+)'\]/);
            if (ref) {
              varValue = `var(--layera-${ref[1]})`;
            }
          }

          if (varValue.includes('TEXT_VARIABLES[')) {
            const ref = varValue.match(/TEXT_VARIABLES\['([^']+)'\]/);
            if (ref) {
              varValue = `var(--layera-${ref[1]})`;
            }
          }

          if (varValue.includes('BORDER_SEMANTIC_VARIABLES[')) {
            const ref = varValue.match(/BORDER_SEMANTIC_VARIABLES\['([^']+)'\]/);
            if (ref) {
              varValue = `var(--layera-${ref[1]})`;
            }
          }

          if (varValue.includes('MOTION_VARIABLES[')) {
            const ref = varValue.match(/MOTION_VARIABLES\['([^']+)'\]/);
            if (ref) {
              varValue = `var(--layera-${ref[1]})`;
            }
          }

          if (varValue.includes('SPACING_VARIABLES[')) {
            const ref = varValue.match(/SPACING_VARIABLES\['([^']+)'\]/);
            if (ref) {
              varValue = `var(--layera-${ref[1]})`;
            }
          }

          if (varValue.includes('BORDER_VARIABLES[')) {
            const ref = varValue.match(/BORDER_VARIABLES\['([^']+)'\]/);
            if (ref) {
              varValue = `var(--layera-${ref[1]})`;
            }
          }

          if (varValue.includes('SHADOW_VARIABLES[')) {
            const ref = varValue.match(/SHADOW_VARIABLES\['([^']+)'\]/);
            if (ref) {
              varValue = `var(--layera-${ref[1]})`;
            }
          }

          // Remove quotes αν υπάρχουν
          if (varValue.startsWith("'") && varValue.endsWith("'")) {
            varValue = varValue.slice(1, -1);
          }

          cssVariables.push(`  --layera-${varName}: ${varValue};`);
        }
      }

      // Τέλος του object
      if (braceCount <= 0 && line.includes('}')) {
        break;
      }
    }
  }

  console.log(`🏢 Εξήχθησαν ${cssVariables.length} modal component variables`);
  return cssVariables;
}

// Εξάγει τις CSS variables
const cssVariables = extractHexValues(colorsContent);
const spacingVariables = extractSpacingValues(spacingContent);
const typographyVariables = extractTypographyValues(typographyContent);
const bordersVariables = extractBordersValues(bordersContent);
const shadowsVariables = extractShadowsValues(shadowsContent);
const motionVariables = extractMotionValues(motionContent);
const iconsVariables = extractIconValues(iconsContent);

// Εξάγει τις semantic CSS variables
const backgroundSemanticVariables = extractBackgroundSemanticValues(backgroundSemanticContent);
const textSemanticVariables = extractTextSemanticValues(textSemanticContent);
const borderSemanticVariables = extractBorderSemanticValues(borderSemanticContent);
const feedbackSemanticVariables = extractFeedbackSemanticValues(feedbackSemanticContent);

// Εξάγει τις component CSS variables
const buttonsComponentVariables = extractButtonsComponentValues(buttonsComponentContent);
const modalComponentVariables = extractModalComponentValues(modalComponentContent);

console.log(`✅ Εξήχθησαν ${cssVariables.length} color variables`);
console.log(`✅ Εξήχθησαν ${spacingVariables.length} spacing variables`);
console.log(`✅ Εξήχθησαν ${typographyVariables.length} typography variables`);
console.log(`✅ Εξήχθησαν ${bordersVariables.length} borders variables`);
console.log(`✅ Εξήχθησαν ${shadowsVariables.length} shadows variables`);
console.log(`✅ Εξήχθησαν ${motionVariables.length} motion variables`);
console.log(`✅ Εξήχθησαν ${iconsVariables.length} icons variables`);
console.log(`✅ Εξήχθησαν ${backgroundSemanticVariables.length} background semantic variables`);
console.log(`✅ Εξήχθησαν ${textSemanticVariables.length} text semantic variables`);
console.log(`✅ Εξήχθησαν ${borderSemanticVariables.length} border semantic variables`);
console.log(`✅ Εξήχθησαν ${feedbackSemanticVariables.length} feedback semantic variables`);
console.log(`✅ Εξήχθησαν ${buttonsComponentVariables.length} buttons component variables`);
console.log(`✅ Εξήχθησαν ${modalComponentVariables.length} modal component variables`);

// Συνδυάζει όλα τα CSS variables
const allVariables = [...cssVariables, ...spacingVariables, ...typographyVariables, ...bordersVariables, ...shadowsVariables, ...motionVariables, ...iconsVariables, ...backgroundSemanticVariables, ...textSemanticVariables, ...borderSemanticVariables, ...feedbackSemanticVariables, ...buttonsComponentVariables, ...modalComponentVariables];

// Δημιουργεί το CSS περιεχόμενο
const cssContent = `/*
 * 🎨 LAYERA DESIGN TOKENS - AUTO GENERATED
 *
 * ⚠️  DO NOT EDIT MANUALLY
 * Edit packages/tokens/src/colors/colors.variables.ts, core/spacing/spacing.variables.ts, core/typography/typography.variables.ts, core/borders/borders.variables.ts, core/shadows/shadows.variables.ts, core/motion/motion.variables.ts και component/icons/icons.variables.ts and rebuild
 * Generated: ${new Date().toISOString()}
 */

:root {
  /* 🎨 COLORS */
${cssVariables.join('\n')}

  /* 📏 SPACING */
${spacingVariables.join('\n')}

  /* 🖋️ TYPOGRAPHY */
${typographyVariables.join('\n')}

  /* 🔲 BORDERS */
${bordersVariables.join('\n')}

  /* 🌫️ SHADOWS */
${shadowsVariables.join('\n')}

  /* ⚡ MOTION */
${motionVariables.join('\n')}

  /* 🎯 ICONS */
${iconsVariables.join('\n')}

  /* 🎨 SEMANTIC BACKGROUND */
${backgroundSemanticVariables.join('\n')}

  /* ✏️ SEMANTIC TEXT */
${textSemanticVariables.join('\n')}

  /* 🔲 SEMANTIC BORDERS */
${borderSemanticVariables.join('\n')}

  /* 🔔 SEMANTIC FEEDBACK */
${feedbackSemanticVariables.join('\n')}

  /* 🔲 COMPONENT BUTTONS */
${buttonsComponentVariables.join('\n')}

  /* 🏢 COMPONENT MODAL */
${modalComponentVariables.join('\n')}
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
console.log(`   🔲 Borders: ${bordersVariables.length}`);
console.log(`   🌫️ Shadows: ${shadowsVariables.length}`);
console.log(`   ⚡ Motion: ${motionVariables.length}`);
console.log(`   🎯 Icons: ${iconsVariables.length}`);
console.log(`   🎨 Background Semantic: ${backgroundSemanticVariables.length}`);
console.log(`   ✏️ Text Semantic: ${textSemanticVariables.length}`);
console.log(`   🔲 Border Semantic: ${borderSemanticVariables.length}`);
console.log(`   🔔 Feedback Semantic: ${feedbackSemanticVariables.length}`);
console.log(`   🔲 Buttons Component: ${buttonsComponentVariables.length}`);
console.log(`   🏢 Modal Component: ${modalComponentVariables.length}`);
console.log(`   🎯 Total: ${allVariables.length}`);
console.log('');
console.log('✅ Build completed successfully!');
console.log('🚀 Ready για import στην εφαρμογή!');