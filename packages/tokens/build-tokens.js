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
const utilitiesFile = path.join(srcDir, 'core', 'utilities', 'utilities.variables.ts');
const iconsFile = path.join(srcDir, 'component', 'icons', 'icons.variables.ts');

// Semantic tokens αρχεία
const backgroundSemanticFile = path.join(srcDir, 'semantic', 'background', 'background.variables.ts');
const textSemanticFile = path.join(srcDir, 'semantic', 'text', 'text.variables.ts');
const borderSemanticFile = path.join(srcDir, 'semantic', 'border', 'border.variables.ts');
const feedbackSemanticFile = path.join(srcDir, 'semantic', 'feedback', 'feedback.variables.ts');

// Component tokens αρχεία
const buttonsComponentFile = path.join(srcDir, 'component', 'buttons', 'buttons.variables.ts');
const modalComponentFile = path.join(srcDir, 'component', 'modal', 'modal.variables.ts');
const cardsComponentFile = path.join(srcDir, 'component', 'cards', 'cards.variables.ts');
const modalClassFile = path.join(srcDir, 'component', 'modal', 'modal.class.ts');
const layoutComponentFile = path.join(srcDir, 'component', 'layout', 'layout.variables.ts');
const inputsComponentFile = path.join(srcDir, 'component', 'inputs', 'inputs.variables.ts');
const navigationComponentFile = path.join(srcDir, 'component', 'navigation', 'navigation.variables.ts');
const tooltipsComponentFile = path.join(srcDir, 'component', 'tooltips', 'tooltips.variables.ts');
const badgesComponentFile = path.join(srcDir, 'component', 'badges', 'badges.variables.ts');
const loadingComponentFile = path.join(srcDir, 'component', 'loading', 'loading.variables.ts');
const disclosureComponentFile = path.join(srcDir, 'component', 'disclosure', 'disclosure.variables.ts');
const dataImportComponentFile = path.join(srcDir, 'component', 'data-import', 'data-import.variables.ts');
const tooltipsClassFile = path.join(srcDir, 'component', 'tooltips', 'tooltips.class.ts');

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
console.log('🎯 Διαβάζω cards component tokens από:', cardsComponentFile);
const cardsComponentContent = fs.existsSync(cardsComponentFile) ? fs.readFileSync(cardsComponentFile, 'utf8') : null;

console.log('🎨 Διαβάζω modal CSS classes από:', modalClassFile);
const modalClassContent = fs.existsSync(modalClassFile) ? fs.readFileSync(modalClassFile, 'utf8') : null;

console.log('🔧 Διαβάζω utilities tokens από:', utilitiesFile);
const utilitiesContent = fs.existsSync(utilitiesFile) ? fs.readFileSync(utilitiesFile, 'utf8') : null;

console.log('📐 Διαβάζω layout component tokens από:', layoutComponentFile);
const layoutComponentContent = fs.existsSync(layoutComponentFile) ? fs.readFileSync(layoutComponentFile, 'utf8') : null;

console.log('📝 Διαβάζω inputs component tokens από:', inputsComponentFile);
const inputsComponentContent = fs.existsSync(inputsComponentFile) ? fs.readFileSync(inputsComponentFile, 'utf8') : null;

console.log('🧭 Διαβάζω navigation component tokens από:', navigationComponentFile);
const navigationComponentContent = fs.existsSync(navigationComponentFile) ? fs.readFileSync(navigationComponentFile, 'utf8') : null;

console.log('💬 Διαβάζω tooltips component tokens από:', tooltipsComponentFile);
const tooltipsComponentContent = fs.existsSync(tooltipsComponentFile) ? fs.readFileSync(tooltipsComponentFile, 'utf8') : null;

console.log('🎯 Διαβάζω badges component tokens από:', badgesComponentFile);
const badgesComponentContent = fs.existsSync(badgesComponentFile) ? fs.readFileSync(badgesComponentFile, 'utf8') : null;

console.log('⚡ Διαβάζω loading component tokens από:', loadingComponentFile);
const loadingComponentContent = fs.existsSync(loadingComponentFile) ? fs.readFileSync(loadingComponentFile, 'utf8') : null;

console.log('🎭 Διαβάζω disclosure component tokens από:', disclosureComponentFile);
const disclosureComponentContent = fs.existsSync(disclosureComponentFile) ? fs.readFileSync(disclosureComponentFile, 'utf8') : null;

console.log('📂 Διαβάζω data-import component tokens από:', dataImportComponentFile);
const dataImportComponentContent = fs.existsSync(dataImportComponentFile) ? fs.readFileSync(dataImportComponentFile, 'utf8') : null;

console.log('💬 Διαβάζω tooltips CSS classes από:', tooltipsClassFile);
const tooltipsClassContent = fs.existsSync(tooltipsClassFile) ? fs.readFileSync(tooltipsClassFile, 'utf8') : null;

// Εξάγει CSS από LAYERA_MODAL_CSS constant
function extractModalCSS(content) {
  if (!content) return '';

  const cssMatch = content.match(/export const LAYERA_MODAL_CSS = `([\s\S]*?)`;/);
  if (cssMatch) {
    return cssMatch[1];
  }
  return '';
}

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

  // Extract SIZE_SCALE values from SPACING_VARIABLES (spacing-7, spacing-14, spacing-30)
  const sizeScaleMatch = content.match(/export const SIZE_SCALE[\s\S]*?= \{([\s\S]*?)\} as const;/);
  if (sizeScaleMatch) {
    const sizeScaleContent = sizeScaleMatch[1];
    const sizeRegex = /(\d+): ['"]([^'"]+)['"]/g;
    let match;

    while ((match = sizeRegex.exec(sizeScaleContent)) !== null) {
      const [, scale, value] = match;
      cssVariables.push(`  --layera-spacing-${scale}: ${value};`);
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

      // Αν βρω variable definition - απλό string matching (quotes ή backticks)
      const trimmedLine = line.trim();
      if ((trimmedLine.startsWith("'") && trimmedLine.includes("': ")) ||
          (trimmedLine.startsWith("`") && trimmedLine.includes("`: "))) {
        const parts = trimmedLine.includes("': ") ? trimmedLine.split("': ") : trimmedLine.split("`: ");
        if (parts.length === 2) {
          const varName = parts[0].replace(/[`']/g, ''); // Αφαιρεί τόσο quotes όσο και backticks
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

          // Handle var() references για modal text-align variables
          // Αυτές έρχονται ήδη ως 'var(--layera-core-text-align-center)' κλπ.
          if (varValue.startsWith("'var(--layera-") && varValue.endsWith("'")) {
            // Ήδη σωστή μορφή, απλά αφαιρούμε τα quotes
            varValue = varValue.slice(1, -1);
          }
          // Remove quotes αν υπάρχουν (για άλλες περιπτώσεις)
          else if (varValue.startsWith("'") && varValue.endsWith("'")) {
            varValue = varValue.slice(1, -1);
          }

          cssVariables.push(`  --layera-${varName}: ${varValue};`);
        }
      }

      // Τέλος του object - αναζητάμε το συγκεκριμένο pattern '} as const;'
      if (line.includes('} as const;')) {
        break;
      }
    }
  }

  console.log(`🏢 Εξήχθησαν ${cssVariables.length} modal component variables`);
  return cssVariables;
}

// Εξάγει utilities τιμές από το TypeScript αρχείο
// Εξάγει core text-align μεταβλητές ως CSS variables από το utilities αρχείο
function extractCoreTextAlignVariables(content) {
  const cssVariables = [];
  if (!content) {
    console.log('🔧 Δεν βρέθηκε περιεχόμενο για core text-align variables');
    return cssVariables;
  }

  // Ψάχνω για τις core text-align μεταβλητές
  const coreTextAlignPattern = /'(layera-core-text-align-[^']+)':\s*'([^']+)'/g;
  let match;

  while ((match = coreTextAlignPattern.exec(content)) !== null) {
    const varName = match[1];
    const varValue = match[2];
    cssVariables.push(`  --${varName}: ${varValue};`);
  }

  console.log(`🔧 Εξήχθησαν ${cssVariables.length} core text-align variables`);
  return cssVariables;
}

function extractUtilitiesValues(content) {
  const cssVariables = [];

  if (!content) {
    console.log('🔧 Δεν βρέθηκε περιεχόμενο utilities αρχείου');
    return cssVariables;
  }

  // Απλός line-by-line parsing για UTILITIES_VARIABLES
  const lines = content.split('\n');
  let insideUtilitiesVariables = false;
  let braceCount = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Αρχή του UTILITIES_VARIABLES object
    if (line.includes('export const UTILITIES_VARIABLES')) {
      insideUtilitiesVariables = true;
      braceCount = 0;
      continue;
    }

    if (insideUtilitiesVariables) {
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

          // Resolve SPACING_VARIABLES references
          if (varValue.includes('SPACING_VARIABLES[')) {
            const ref = varValue.match(/SPACING_VARIABLES\['([^']+)'\]/);
            if (ref) {
              varValue = `var(--layera-${ref[1]})`;
            }
          }

          // Resolve GLOBAL_ constants references
          if (varValue.includes('GLOBAL_DISPLAY.')) {
            const ref = varValue.match(/GLOBAL_DISPLAY\.(\w+)/);
            if (ref) {
              const displayMap = { flex: 'flex', block: 'block', inline: 'inline', none: 'none' };
              varValue = displayMap[ref[1]] || varValue;
            }
          }

          if (varValue.includes('GLOBAL_CURSOR.')) {
            const ref = varValue.match(/GLOBAL_CURSOR\.(\w+)/);
            if (ref) {
              const cursorMap = { pointer: 'pointer', auto: 'auto', notAllowed: 'not-allowed' };
              varValue = cursorMap[ref[1]] || varValue;
            }
          }

          if (varValue.includes('GLOBAL_FLEX.')) {
            const ref = varValue.match(/GLOBAL_FLEX\.(\w+)/);
            if (ref) {
              const flexMap = {
                alignCenter: 'center',
                alignStart: 'flex-start',
                alignEnd: 'flex-end',
                justifyCenter: 'center',
                justifyStart: 'flex-start',
                justifyEnd: 'flex-end',
                justifyBetween: 'space-between',
                directionRow: 'row',
                directionColumn: 'column',
                wrapNowrap: 'nowrap',
                wrapWrap: 'wrap'
              };
              varValue = flexMap[ref[1]] || varValue;
            }
          }

          if (varValue.includes('GLOBAL_BORDER.')) {
            const ref = varValue.match(/GLOBAL_BORDER\.(\w+)/);
            if (ref) {
              const borderMap = { solid: 'solid', dashed: 'dashed', dotted: 'dotted', none: 'none' };
              varValue = borderMap[ref[1]] || varValue;
            }
          }

          if (varValue.includes('GLOBAL_GRID.')) {
            const ref = varValue.match(/GLOBAL_GRID\.(\w+)/);
            if (ref) {
              const gridMap = { autoFit280: 'repeat(auto-fit, minmax(280px, 1fr))' };
              varValue = gridMap[ref[1]] || varValue;
            }
          }

          // Αφαιρώ τα quotes από την τιμή
          varValue = varValue.replace(/^['"]|['"]$/g, '');

          // Skip core text-align variables - they should only exist as CSS custom properties
          if (varName.startsWith('layera-core-text-align-')) {
            // Core text-align variables are handled separately by extractCoreTextAlignVariables
            continue;
          }

          // Create CSS class instead of variable for utilities
          const className = varName.replace(/-/g, '-');
          cssVariables.push(`.${className} { ${convertUtilityToCSS(varName, varValue)} }`);
        }
      }

      // Τέλος του UTILITIES_VARIABLES object
      if (braceCount <= 0 && trimmedLine.includes('} as const;')) {
        break;
      }
    }
  }

  console.log(`🔧 Εξήχθησαν ${cssVariables.length} utilities classes`);
  return cssVariables;
}

// Helper function να μετατρέψει utility variables σε CSS properties
function convertUtilityToCSS(varName, varValue) {
  if (varName.startsWith('global-display-')) {
    return `display: ${varValue};`;
  }
  if (varName.startsWith('global-cursor-')) {
    return `cursor: ${varValue};`;
  }
  if (varName.startsWith('global-alignItems-')) {
    return `align-items: ${varValue};`;
  }
  if (varName.startsWith('global-justifyContent-')) {
    return `justify-content: ${varValue};`;
  }
  if (varName.startsWith('global-flexDirection-')) {
    return `flex-direction: ${varValue};`;
  }
  if (varName.startsWith('global-flexWrap-')) {
    return `flex-wrap: ${varValue};`;
  }
  if (varName.startsWith('global-border-')) {
    return `border-style: ${varValue};`;
  }
  if (varName.startsWith('layera-grid--')) {
    return `display: grid; grid-template-columns: ${varValue};`;
  }
  if (varName.startsWith('layera-width--')) {
    return `width: ${varValue};`;
  }
  if (varName.startsWith('layera-height--')) {
    return `height: ${varValue};`;
  }
  if (varName.startsWith('layera-text--align-vertical-')) {
    return `vertical-align: ${varValue};`;
  }
  if (varName.startsWith('layera-text--align-')) {
    return `text-align: ${varValue};`;
  }
  if (varName.startsWith('margin-bottom-')) {
    return `margin-bottom: ${varValue};`;
  }

  // Default fallback
  return `/* ${varName}: ${varValue}; */`;
}

// Εξάγει layout component τιμές από το TypeScript αρχείο
function extractLayoutComponentValues(content) {
  const cssVariables = [];

  if (!content) {
    console.log('📐 Δεν βρέθηκε περιεχόμενο layout component αρχείου');
    return cssVariables;
  }

  // Εξάγει LAYOUT_CSS_VARS
  const lines = content.split('\n');
  let insideLayoutCSSVars = false;
  let braceCount = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Αρχή του LAYOUT_CSS_VARS object
    if (line.includes('export const LAYOUT_CSS_VARS')) {
      insideLayoutCSSVars = true;
      braceCount = 0;
      continue;
    }

    if (insideLayoutCSSVars) {
      // Μετράω τα braces
      braceCount += (line.match(/\{/g) || []).length;
      braceCount -= (line.match(/\}/g) || []).length;

      // Αν βρω variable definition - απλό string matching
      const trimmedLine = line.trim();
      if ((trimmedLine.startsWith("'") || trimmedLine.startsWith("'--layera-")) && trimmedLine.includes("': ")) {
        const parts = trimmedLine.split("': ");
        if (parts.length === 2) {
          let varName = parts[0].replace(/'/g, '');
          let varValue = parts[1].replace(/,$/, '').trim();

          // Resolve references
          if (varValue.includes('LAYOUT_POSITION.')) {
            const ref = varValue.match(/LAYOUT_POSITION\.(\w+)/);
            if (ref) {
              const positionMap = { fixed: 'fixed', absolute: 'absolute', relative: 'relative', static: 'static', sticky: 'sticky' };
              varValue = positionMap[ref[1]] || varValue;
            }
          }

          if (varValue.includes('LAYOUT_SPACING.')) {
            const ref = varValue.match(/LAYOUT_SPACING\.(\w+)/);
            if (ref) {
              // Map to appropriate CSS variables
              const spacingMap = {
                headerOffset: '4rem',
                medium: '1rem',
                large: '1.5rem',
                xxxxxLarge: '4rem'
              };
              varValue = spacingMap[ref[1]] || varValue;
            }
          }

          if (varValue.includes('LAYOUT_VIEWPORT.')) {
            const ref = varValue.match(/LAYOUT_VIEWPORT\.(\w+)/);
            if (ref) {
              const viewportMap = { fullWidth: '100%', fullHeight: '100vh' };
              varValue = viewportMap[ref[1]] || varValue;
            }
          }

          if (varValue.includes('LAYOUT_Z_INDEX.')) {
            const ref = varValue.match(/LAYOUT_Z_INDEX\.(\w+)/);
            if (ref) {
              const zIndexMap = { modal: '500', header: '300', overlay: '400' };
              varValue = zIndexMap[ref[1]] || varValue;
            }
          }

          if (varValue.includes('BACKGROUND_VARIABLES[')) {
            const ref = varValue.match(/BACKGROUND_VARIABLES\['([^']+)'\]/);
            if (ref) {
              varValue = `var(--layera-${ref[1]})`;
            }
          }

          // Αφαιρώ τα quotes από την τιμή
          varValue = varValue.replace(/^['"]|['"]$/g, '');

          // CSS class generation for layout utilities
          if (!varName.startsWith('--layera-')) {
            const className = varName.replace(/-/g, '-');
            cssVariables.push(`.${className} { ${convertLayoutToCSS(varName, varValue)} }`);
          } else {
            // CSS variable
            cssVariables.push(`  ${varName}: ${varValue};`);
          }
        }
      }

      // Τέλος του LAYOUT_CSS_VARS object
      if (braceCount <= 0 && trimmedLine.includes('} as const;')) {
        break;
      }
    }
  }

  console.log(`📐 Εξήχθησαν ${cssVariables.length} layout component variables/classes`);
  return cssVariables;
}

// Helper function για layout CSS properties
function convertLayoutToCSS(varName, varValue) {
  if (varName.includes('fullscreen-position')) {
    return `position: ${varValue};`;
  }
  if (varName.includes('fullscreen-top')) {
    return `top: ${varValue};`;
  }
  if (varName.includes('fullscreen-left')) {
    return `left: ${varValue};`;
  }
  if (varName.includes('fullscreen-right')) {
    return `right: ${varValue};`;
  }
  if (varName.includes('fullscreen-bottom')) {
    return `bottom: ${varValue};`;
  }
  if (varName.includes('fullscreen-width')) {
    return `width: ${varValue};`;
  }
  if (varName.includes('fullscreen-height')) {
    return `height: ${varValue};`;
  }
  if (varName.includes('fullscreen-z-index')) {
    return `z-index: ${varValue};`;
  }
  if (varName.includes('fullscreen-overflow')) {
    return `overflow: ${varValue};`;
  }
  if (varName.includes('fullscreen-padding')) {
    return `padding: ${varValue};`;
  }
  if (varName.includes('fullscreen-background')) {
    return `background: ${varValue};`;
  }
  if (varName.includes('card-grid-display')) {
    return `display: ${varValue};`;
  }
  if (varName.includes('card-grid-columns')) {
    return `grid-template-columns: ${varValue};`;
  }
  if (varName.includes('card-grid-gap')) {
    return `gap: ${varValue};`;
  }
  if (varName.includes('card-grid-padding')) {
    return `padding: ${varValue};`;
  }

  // Default fallback
  return `/* ${varName}: ${varValue}; */`;
}

// Εξάγει inputs component τιμές από το TypeScript αρχείο
function extractInputsComponentValues(content) {
  const cssVariables = [];

  if (!content) {
    console.log('📝 Δεν βρέθηκε περιεχόμενο inputs component αρχείου');
    return cssVariables;
  }

  // Απλός line-by-line parsing για INPUT_VARIABLES
  const lines = content.split('\n');
  let insideInputVariables = false;
  let braceCount = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Αρχή του INPUT_VARIABLES object
    if (line.includes('export const INPUT_VARIABLES')) {
      insideInputVariables = true;
      braceCount = 0;
      continue;
    }

    if (insideInputVariables) {
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

          // Resolve imports και references για inputs
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

          if (varValue.includes('MOTION_VARIABLES[')) {
            const ref = varValue.match(/MOTION_VARIABLES\['([^']+)'\]/);
            if (ref) {
              varValue = `var(--layera-${ref[1]})`;
            }
          }

          // Handle template literals με spacing variables
          if (varValue.includes('`${') && varValue.includes('SPACING_VARIABLES[')) {
            varValue = varValue.replace(/`\$\{SPACING_VARIABLES\['([^']+)'\]\}/g, 'var(--layera-$1)');
            varValue = varValue.replace(/\$\{SPACING_VARIABLES\['([^']+)'\]\}/g, ' var(--layera-$1)');
            varValue = varValue.replace(/`/g, '');
          }

          // Αφαιρώ τα quotes από την τιμή
          varValue = varValue.replace(/^['"]|['"]$/g, '');

          cssVariables.push(`  --layera-${varName}: ${varValue};`);
        }
      }

      // Τέλος του INPUT_VARIABLES object
      if (braceCount <= 0 && trimmedLine.includes('} as const;')) {
        break;
      }
    }
  }

  console.log(`📝 Εξήχθησαν ${cssVariables.length} inputs component variables`);
  return cssVariables;
}

// Εξάγει navigation component τιμές από το TypeScript αρχείο
function extractNavigationComponentValues(content) {
  const cssVariables = [];
  const cssClasses = [];

  if (!content) {
    console.log('🧭 Δεν βρέθηκε περιεχόμενο navigation component αρχείου');
    return { cssVariables, cssClasses };
  }

  // Απλός line-by-line parsing για NAVIGATION_VARIABLES
  const lines = content.split('\n');
  let insideNavigationVariables = false;
  let braceCount = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Αρχή του NAVIGATION_VARIABLES object
    if (line.includes('export const NAVIGATION_VARIABLES')) {
      insideNavigationVariables = true;
      braceCount = 0;
      continue;
    }

    if (insideNavigationVariables) {
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

          // Resolve imports και references για navigation
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

          if (varValue.includes('MOTION_VARIABLES[')) {
            const ref = varValue.match(/MOTION_VARIABLES\['([^']+)'\]/);
            if (ref) {
              varValue = `var(--layera-${ref[1]})`;
            }
          }

          // Handle template literals με spacing variables
          if (varValue.includes('`${') && varValue.includes('SPACING_VARIABLES[')) {
            varValue = varValue.replace(/`\$\{SPACING_VARIABLES\['([^']+)'\]\}/g, 'var(--layera-$1)');
            varValue = varValue.replace(/\$\{SPACING_VARIABLES\['([^']+)'\]\}/g, ' var(--layera-$1)');
            varValue = varValue.replace(/`/g, '');
          }

          // Αφαιρώ τα quotes από την τιμή
          varValue = varValue.replace(/^['"]|['"]$/g, '');

          // CSS variable για όλα
          cssVariables.push(`  --layera-${varName}: ${varValue};`);

          // Δημιουργώ CSS classes για header και sidebar
          if (varName.startsWith('navbar-') || varName.startsWith('nav-') && !varName.includes('icon')) {
            const className = `layera-header`;
            const cssProperty = convertNavigationToCSS(varName, varValue);
            if (cssProperty && !cssClasses.find(cls => cls.includes(className))) {
              cssClasses.push(`.${className} { ${cssProperty} }`);
            }
          }

          if (varName.startsWith('sidebar-')) {
            const className = `layera-sidebar`;
            const cssProperty = convertNavigationToCSS(varName, varValue);
            if (cssProperty && !cssClasses.find(cls => cls.includes(className))) {
              cssClasses.push(`.${className} { ${cssProperty} }`);
            }
          }
        }
      }

      // Τέλος του NAVIGATION_VARIABLES object
      if (braceCount <= 0 && trimmedLine.includes('} as const;')) {
        break;
      }
    }
  }

  console.log(`🧭 Εξήχθησαν ${cssVariables.length} navigation component variables`);
  console.log(`🧭 Εξήχθησαν ${cssClasses.length} navigation component classes`);
  return { cssVariables, cssClasses };
}

// Helper function για navigation CSS properties
function convertNavigationToCSS(varName, varValue) {
  // Header/Navbar properties
  if (varName === 'navbar-height') {
    return `height: ${varValue};`;
  }
  if (varName === 'navbar-background' || varName === 'nav-background') {
    return `background: ${varValue};`;
  }
  if (varName === 'navbar-border-bottom') {
    return `border-bottom: 1px solid ${varValue};`;
  }
  if (varName === 'navbar-padding' || varName === 'nav-padding') {
    return `padding: ${varValue};`;
  }
  if (varName === 'navbar-shadow') {
    return `box-shadow: ${varValue};`;
  }

  // Sidebar properties
  if (varName === 'sidebar-width') {
    return `width: ${varValue};`;
  }
  if (varName === 'sidebar-background') {
    return `background: ${varValue};`;
  }
  if (varName === 'sidebar-border-right') {
    return `border-right: 1px solid ${varValue};`;
  }
  if (varName === 'sidebar-padding') {
    return `padding: ${varValue};`;
  }

  return null; // Δεν χρειάζεται CSS class για αυτό το token
}

// Εξάγει tooltips component τιμές από το TypeScript αρχείο
function extractTooltipsComponentValues(content) {
  const cssVariables = [];

  if (!content) {
    console.log('💬 Δεν βρέθηκε περιεχόμενο tooltips component αρχείου');
    return cssVariables;
  }

  // Απλός line-by-line parsing για TOOLTIPS_VARIABLES
  const lines = content.split('\n');
  let insideTooltipsVariables = false;
  let braceCount = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Αρχή του TOOLTIPS_VARIABLES object
    if (line.includes('export const TOOLTIPS_VARIABLES')) {
      insideTooltipsVariables = true;
      braceCount = 0;
      continue;
    }

    if (insideTooltipsVariables) {
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

          // Resolve imports και references για tooltips
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

          if (varValue.includes('MOTION_VARIABLES[')) {
            const ref = varValue.match(/MOTION_VARIABLES\['([^']+)'\]/);
            if (ref) {
              varValue = `var(--layera-${ref[1]})`;
            }
          }

          // Handle template literals με spacing variables
          if (varValue.includes('`${') && varValue.includes('SPACING_VARIABLES[')) {
            varValue = varValue.replace(/`\$\{SPACING_VARIABLES\['([^']+)'\]\}/g, 'var(--layera-$1)');
            varValue = varValue.replace(/\$\{SPACING_VARIABLES\['([^']+)'\]\}/g, ' var(--layera-$1)');
            varValue = varValue.replace(/`/g, '');
          }

          // Handle string literals
          if (varValue.startsWith("'") && varValue.endsWith("'")) {
            varValue = varValue.slice(1, -1);
          }

          cssVariables.push(`  --layera-${varName}: ${varValue};`);
        }
      }

      // Τέλος του TOOLTIPS_VARIABLES object
      if (braceCount <= 0 && trimmedLine.includes('} as const;')) {
        break;
      }
    }
  }

  console.log(`💬 Εξήχθησαν ${cssVariables.length} tooltips component variables`);
  return cssVariables;
}

// Εξάγει badges component τιμές από το TypeScript αρχείο
function extractBadgesComponentValues(content) {
  const cssVariables = [];

  if (!content) {
    console.log('🎯 Δεν βρέθηκε περιεχόμενο badges component αρχείου');
    return cssVariables;
  }

  // Απλός line-by-line parsing για BADGE_VARIABLES
  const lines = content.split('\n');
  let insideBadgeVariables = false;
  let braceCount = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Αρχή του BADGE_VARIABLES object
    if (line.includes('export const BADGE_VARIABLES')) {
      insideBadgeVariables = true;
      braceCount = 0;
      continue;
    }

    if (insideBadgeVariables) {
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

          // Resolve imports και references για badges
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

          if (varValue.includes('MOTION_VARIABLES[')) {
            const ref = varValue.match(/MOTION_VARIABLES\['([^']+)'\]/);
            if (ref) {
              varValue = `var(--layera-${ref[1]})`;
            }
          }

          // Handle template literals με spacing variables
          if (varValue.includes('`${') && varValue.includes('SPACING_VARIABLES[')) {
            varValue = varValue.replace(/`\$\{SPACING_VARIABLES\['([^']+)'\]\}/g, 'var(--layera-$1)');
            varValue = varValue.replace(/\$\{SPACING_VARIABLES\['([^']+)'\]\}/g, ' var(--layera-$1)');
            varValue = varValue.replace(/`/g, '');
          }

          // Handle string literals
          if (varValue.startsWith("'") && varValue.endsWith("'")) {
            varValue = varValue.slice(1, -1);
          }

          cssVariables.push(`  --layera-${varName}: ${varValue};`);
        }
      }

      // Τέλος του BADGE_VARIABLES object
      if (braceCount <= 0 && trimmedLine.includes('} as const;')) {
        break;
      }
    }
  }

  console.log(`🎯 Εξήχθησαν ${cssVariables.length} badges component variables`);
  return cssVariables;
}

// Εξάγει loading component τιμές από το TypeScript αρχείο
function extractLoadingComponentValues(content) {
  const cssVariables = [];

  if (!content) {
    console.log('⚡ Δεν βρέθηκε περιεχόμενο loading component αρχείου');
    return cssVariables;
  }

  // Απλός line-by-line parsing για LOADING_VARIABLES
  const lines = content.split('\n');
  let insideLoadingVariables = false;
  let braceCount = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Αρχή του LOADING_VARIABLES object
    if (line.includes('export const LOADING_VARIABLES')) {
      insideLoadingVariables = true;
      braceCount = 0;
      continue;
    }

    if (insideLoadingVariables) {
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

          // Resolve imports και references για loading
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

          if (varValue.includes('MOTION_VARIABLES[')) {
            const ref = varValue.match(/MOTION_VARIABLES\['([^']+)'\]/);
            if (ref) {
              varValue = `var(--layera-${ref[1]})`;
            }
          }

          // Handle string literals
          if (varValue.startsWith("'") && varValue.endsWith("'")) {
            varValue = varValue.slice(1, -1);
          }

          cssVariables.push(`  --layera-${varName}: ${varValue};`);
        }
      }

      // Τέλος του LOADING_VARIABLES object
      if (braceCount <= 0 && trimmedLine.includes('} as const;')) {
        break;
      }
    }
  }

  console.log(`⚡ Εξήχθησαν ${cssVariables.length} loading component variables`);
  return cssVariables;
}

// Εξάγει disclosure component τιμές από το TypeScript αρχείο
function extractDisclosureComponentValues(content) {
  const cssVariables = [];

  if (!content) {
    console.log('🎭 Δεν βρέθηκε περιεχόμενο disclosure component αρχείου');
    return cssVariables;
  }

  // TypeScript to CSS mapping για disclosure
  const tsToCSS = {
    "BACKGROUND_VARIABLES['background-default']": 'var(--layera-color-background-default)',
    "BACKGROUND_VARIABLES['background-hover']": 'var(--layera-color-background-hover)',
    "BACKGROUND_VARIABLES['background-active']": 'var(--layera-color-background-active)',
    "BACKGROUND_VARIABLES['background-disabled']": 'var(--layera-color-background-disabled)',
    "BACKGROUND_VARIABLES['background-muted']": 'var(--layera-color-background-muted)',
    "TEXT_VARIABLES['text-primary']": 'var(--layera-color-text-primary)',
    "TEXT_VARIABLES['text-secondary']": 'var(--layera-color-text-secondary)',
    "TEXT_VARIABLES['text-tertiary']": 'var(--layera-color-text-tertiary)',
    "TEXT_VARIABLES['text-disabled']": 'var(--layera-color-text-disabled)',
    "BORDER_SEMANTIC_VARIABLES['border-default']": 'var(--layera-border-default)',
    "BORDER_SEMANTIC_VARIABLES['border-hover']": 'var(--layera-border-hover)',
    "BORDER_SEMANTIC_VARIABLES['border-focus']": 'var(--layera-border-focus)',
    "BORDER_VARIABLES['border-radius-4']": 'var(--layera-border-radius-4)',
    "BORDER_VARIABLES['border-radius-6']": 'var(--layera-border-radius-6)',
    "BORDER_VARIABLES['border-radius-8']": 'var(--layera-border-radius-8)',
    "BORDER_VARIABLES['border-radius-full']": 'var(--layera-border-radius-full)',
    "SHADOW_VARIABLES['shadow-sm']": 'var(--layera-shadow-sm)',
    "SHADOW_VARIABLES['shadow-md']": 'var(--layera-shadow-md)',
    "MOTION_VARIABLES['transition-normal']": 'var(--layera-transition-normal)',
    "MOTION_VARIABLES['transition-fast']": 'var(--layera-transition-fast)',
    "MOTION_VARIABLES['motion-duration-normal']": 'var(--layera-motion-duration-normal)',
    "MOTION_VARIABLES['motion-duration-fast']": 'var(--layera-motion-duration-fast)',
    "MOTION_VARIABLES['motion-easing-ease-in-out']": 'var(--layera-motion-easing-ease-in-out)',
    "MOTION_VARIABLES['motion-easing-ease-out']": 'var(--layera-motion-easing-ease-out)',
  };

  // Προσθήκη spacing variables
  for (let i = 0; i <= 80; i++) {
    tsToCSS[`SPACING_VARIABLES['spacing-${i}']`] = `var(--layera-spacing-${i})`;
  }

  // Εύρεση του DISCLOSURE_VARIABLES object
  const disclosureMatch = content.match(/export const DISCLOSURE_VARIABLES = \{([\s\S]*?)\} as const;/);

  if (disclosureMatch) {
    const disclosureContent = disclosureMatch[1];
    const lines = disclosureContent.split('\n');

    let braceCount = 0;
    let inString = false;
    let stringChar = null;

    for (let line of lines) {
      const trimmedLine = line.trim();

      // Skip comments και empty lines
      if (trimmedLine.startsWith('//') || !trimmedLine) continue;

      // Track braces για nested objects
      for (let char of trimmedLine) {
        if ((char === '"' || char === "'") && !inString) {
          inString = true;
          stringChar = char;
        } else if (char === stringChar && inString) {
          inString = false;
          stringChar = null;
        } else if (!inString) {
          if (char === '{') braceCount++;
          if (char === '}') braceCount--;
        }
      }

      // Process variable definition
      if (trimmedLine.includes(':') && !trimmedLine.startsWith('//')) {
        const parts = trimmedLine.split(':');
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

      // Τέλος του DISCLOSURE_VARIABLES object
      if (braceCount <= 0 && trimmedLine.includes('} as const;')) {
        break;
      }
    }
  }

  console.log(`🎭 Εξήχθησαν ${cssVariables.length} disclosure component variables`);
  return cssVariables;
}

// Εξάγει data-import component τιμές από το TypeScript αρχείο
function extractDataImportComponentValues(content) {
  const cssVariables = [];

  if (!content) {
    console.log('📂 Δεν βρέθηκε περιεχόμενο data-import component αρχείου');
    return cssVariables;
  }

  // TypeScript to CSS mapping για data-import
  const tsToCSS = {
    "BACKGROUND_VARIABLES['background-default']": 'var(--layera-color-background-default)',
    "BACKGROUND_VARIABLES['background-hover']": 'var(--layera-color-background-hover)',
    "BACKGROUND_VARIABLES['background-active']": 'var(--layera-color-background-active)',
    "BACKGROUND_VARIABLES['background-disabled']": 'var(--layera-color-background-disabled)',
    "BACKGROUND_VARIABLES['background-muted']": 'var(--layera-color-background-muted)',
    "BACKGROUND_VARIABLES['background-success']": 'var(--layera-color-background-success)',
    "BACKGROUND_VARIABLES['background-error']": 'var(--layera-color-background-error)',
    "BACKGROUND_VARIABLES['background-warning']": 'var(--layera-color-background-warning)',
    "TEXT_VARIABLES['text-primary']": 'var(--layera-color-text-primary)',
    "TEXT_VARIABLES['text-secondary']": 'var(--layera-color-text-secondary)',
    "TEXT_VARIABLES['text-tertiary']": 'var(--layera-color-text-tertiary)',
    "TEXT_VARIABLES['text-disabled']": 'var(--layera-color-text-disabled)',
    "TEXT_VARIABLES['text-success']": 'var(--layera-color-text-success)',
    "TEXT_VARIABLES['text-error']": 'var(--layera-color-text-error)',
    "TEXT_VARIABLES['text-error-hover']": 'var(--layera-color-text-error-hover)',
    "TEXT_VARIABLES['text-warning']": 'var(--layera-color-text-warning)',
    "BORDER_SEMANTIC_VARIABLES['border-default']": 'var(--layera-border-default)',
    "BORDER_SEMANTIC_VARIABLES['border-hover']": 'var(--layera-border-hover)',
    "BORDER_SEMANTIC_VARIABLES['border-focus']": 'var(--layera-border-focus)',
    "BORDER_SEMANTIC_VARIABLES['border-subtle']": 'var(--layera-border-subtle)',
    "BORDER_SEMANTIC_VARIABLES['border-success']": 'var(--layera-border-success)',
    "BORDER_SEMANTIC_VARIABLES['border-error']": 'var(--layera-border-error)',
    "BORDER_SEMANTIC_VARIABLES['border-warning']": 'var(--layera-border-warning)',
    "BORDER_VARIABLES['border-radius-4']": 'var(--layera-border-radius-4)',
    "BORDER_VARIABLES['border-radius-6']": 'var(--layera-border-radius-6)',
    "BORDER_VARIABLES['border-radius-8']": 'var(--layera-border-radius-8)',
    "BORDER_VARIABLES['border-radius-full']": 'var(--layera-border-radius-full)',
    "SHADOW_VARIABLES['shadow-sm']": 'var(--layera-shadow-sm)',
    "SHADOW_VARIABLES['shadow-lg']": 'var(--layera-shadow-lg)',
    "SHADOW_VARIABLES['shadow-xl']": 'var(--layera-shadow-xl)',
    "MOTION_VARIABLES['transition-normal']": 'var(--layera-transition-normal)',
    "MOTION_VARIABLES['transition-fast']": 'var(--layera-transition-fast)',
    "MOTION_VARIABLES['motion-duration-normal']": 'var(--layera-motion-duration-normal)',
    "MOTION_VARIABLES['motion-duration-fast']": 'var(--layera-motion-duration-fast)',
    "MOTION_VARIABLES['motion-duration-slow']": 'var(--layera-motion-duration-slow)',
    "MOTION_VARIABLES['motion-easing-ease-in-out']": 'var(--layera-motion-easing-ease-in-out)',
    "MOTION_VARIABLES['motion-easing-ease']": 'var(--layera-motion-easing-ease)',
  };

  // Προσθήκη spacing variables
  for (let i = 0; i <= 80; i++) {
    tsToCSS[`SPACING_VARIABLES['spacing-${i}']`] = `var(--layera-spacing-${i})`;
  }

  // Εύρεση του DATA_IMPORT_VARIABLES object
  const dataImportMatch = content.match(/export const DATA_IMPORT_VARIABLES = \{([\s\S]*?)\} as const;/);

  if (dataImportMatch) {
    const dataImportContent = dataImportMatch[1];
    const lines = dataImportContent.split('\n');

    let braceCount = 0;
    let inString = false;
    let stringChar = null;

    for (let line of lines) {
      const trimmedLine = line.trim();

      // Skip comments και empty lines
      if (trimmedLine.startsWith('//') || !trimmedLine) continue;

      // Track braces για nested objects
      for (let char of trimmedLine) {
        if ((char === '"' || char === "'") && !inString) {
          inString = true;
          stringChar = char;
        } else if (char === stringChar && inString) {
          inString = false;
          stringChar = null;
        } else if (!inString) {
          if (char === '{') braceCount++;
          if (char === '}') braceCount--;
        }
      }

      // Process variable definition
      if (trimmedLine.includes(':') && !trimmedLine.startsWith('//')) {
        const parts = trimmedLine.split(':');
        if (parts.length === 2) {
          const varName = parts[0].replace(/'/g, '');
          let varValue = parts[1].replace(/,$/, '').trim();

          // Handle template literals for compound values
          if (varValue.includes('${') && varValue.includes('}')) {
            // Extract the variables from template literal
            const templateMatch = varValue.match(/\$\{([^}]+)\}/g);
            if (templateMatch) {
              for (let templateVar of templateMatch) {
                const cleanVar = templateVar.replace(/[\${}]/g, '');
                if (tsToCSS[cleanVar]) {
                  varValue = varValue.replace(templateVar, tsToCSS[cleanVar]);
                }
              }
            }
          } else if (tsToCSS[varValue]) {
            varValue = tsToCSS[varValue];
          }

          // Remove quotes if they exist
          varValue = varValue.replace(/['"]/g, '');

          cssVariables.push(`  --layera-${varName}: ${varValue};`);
        }
      }

      // Τέλος του DATA_IMPORT_VARIABLES object
      if (braceCount <= 0 && trimmedLine.includes('} as const;')) {
        break;
      }
    }
  }

  console.log(`📂 Εξήχθησαν ${cssVariables.length} data-import component variables`);
  return cssVariables;
}

// Εξάγει cards component τιμές από το TypeScript αρχείο
function extractCardsComponentValues(content) {
  const cssVariables = [];

  if (!content) {
    console.log('🎯 Δεν βρέθηκε περιεχόμενο cards component αρχείου');
    return cssVariables;
  }

  // Απλός line-by-line parsing για CARD_VARIABLES
  const lines = content.split('\n');
  let insideCardVariables = false;
  let braceCount = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Αρχή του CARD_VARIABLES object
    if (line.includes('export const CARD_VARIABLES')) {
      insideCardVariables = true;
      braceCount = 0;
      continue;
    }

    if (insideCardVariables) {
      // Μετράω τα braces
      braceCount += (line.match(/\{/g) || []).length;
      braceCount -= (line.match(/\}/g) || []).length;

      // Αν βρω variable definition - απλό string matching
      const trimmedLine = line.trim();
      if (trimmedLine.startsWith("'") && trimmedLine.includes("': ")) {
        const parts = trimmedLine.split("': ");
        if (parts.length === 2) {
          const varName = parts[0].replace(/'/g, '');
          // 1. Remove comments FIRST (before comma removal)
          let varValue = parts[1].replace(/\/\/.*$/, '').trim();
          // 2. Remove trailing comma
          varValue = varValue.replace(/,$/, '').trim();

          // Resolve SPACING_VARIABLES references
          if (varValue.includes('SPACING_VARIABLES[')) {
            const ref = varValue.match(/SPACING_VARIABLES\['([^']+)'\]/);
            if (ref) {
              varValue = `var(--layera-${ref[1]})`;
            }
          }

          // 3. Remove quotes από την τιμή
          varValue = varValue.replace(/^['"]|['"]$/g, '');

          cssVariables.push(`  --layera-${varName}: ${varValue};`);
        }
      }

      // Τέλος του CARD_VARIABLES object
      if (braceCount <= 0 && trimmedLine.includes('} as const;')) {
        break;
      }
    }
  }

  console.log(`🎯 Εξήχθησαν ${cssVariables.length} cards component variables`);
  return cssVariables;
}

// Εξάγει CSS από LAYERA_TOOLTIP_CSS constant
function extractTooltipCSS(content) {
  if (!content) return '';

  const cssMatch = content.match(/export const LAYERA_TOOLTIP_CSS = `([\s\S]*?)`;/);
  if (cssMatch) {
    return cssMatch[1];
  }
  return '';
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
const cardsComponentVariables = extractCardsComponentValues(cardsComponentContent);
const coreTextAlignVariables = extractCoreTextAlignVariables(utilitiesContent);
const utilitiesVariables = extractUtilitiesValues(utilitiesContent);
const layoutComponentVariables = extractLayoutComponentValues(layoutComponentContent);
const inputsComponentVariables = extractInputsComponentValues(inputsComponentContent);
const navigationResult = extractNavigationComponentValues(navigationComponentContent);
const navigationComponentVariables = navigationResult.cssVariables;
const navigationComponentClasses = navigationResult.cssClasses;
const tooltipsComponentVariables = extractTooltipsComponentValues(tooltipsComponentContent);
const badgesComponentVariables = extractBadgesComponentValues(badgesComponentContent);
const loadingComponentVariables = extractLoadingComponentValues(loadingComponentContent);
const disclosureComponentVariables = extractDisclosureComponentValues(disclosureComponentContent);
const dataImportComponentVariables = extractDataImportComponentValues(dataImportComponentContent);

// Εξάγει το modal CSS
const modalCSS = extractModalCSS(modalClassContent);

// Εξάγει το tooltip CSS
const tooltipCSS = extractTooltipCSS(tooltipsClassContent);

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
console.log(`✅ Εξήχθησαν ${cardsComponentVariables.length} cards component variables`);
console.log(`✅ Εξήχθησαν ${utilitiesVariables.length} utilities classes`);
console.log(`✅ Εξήχθησαν ${layoutComponentVariables.length} layout component variables/classes`);
console.log(`✅ Εξήχθησαν ${inputsComponentVariables.length} inputs component variables`);
console.log(`✅ Εξήχθησαν ${navigationComponentVariables.length} navigation component variables`);
console.log(`✅ Εξήχθησαν ${navigationComponentClasses.length} navigation component classes`);
console.log(`✅ Εξήχθησαν ${tooltipsComponentVariables.length} tooltips component variables`);
console.log(`✅ Εξήχθησαν ${badgesComponentVariables.length} badges component variables`);
console.log(`✅ Εξήχθησαν ${loadingComponentVariables.length} loading component variables`);
console.log(`✅ Εξήχθησαν ${disclosureComponentVariables.length} disclosure component variables`);
console.log(`✅ Εξήχθησαν ${dataImportComponentVariables.length} data-import component variables`);
console.log(`✅ Εξήχθη modal CSS: ${modalCSS ? 'YES' : 'NO'}`);
console.log(`✅ Εξήχθη tooltip CSS: ${tooltipCSS ? 'YES' : 'NO'}`);

// Συνδυάζει όλα τα CSS variables
const allVariables = [...cssVariables, ...spacingVariables, ...typographyVariables, ...bordersVariables, ...shadowsVariables, ...motionVariables, ...iconsVariables, ...backgroundSemanticVariables, ...textSemanticVariables, ...borderSemanticVariables, ...feedbackSemanticVariables, ...coreTextAlignVariables, ...buttonsComponentVariables, ...modalComponentVariables, ...cardsComponentVariables, ...inputsComponentVariables, ...navigationComponentVariables, ...tooltipsComponentVariables, ...badgesComponentVariables, ...loadingComponentVariables, ...disclosureComponentVariables, ...dataImportComponentVariables];

// Συνδυάζει CSS classes και variables
const allClasses = [...utilitiesVariables, ...layoutComponentVariables, ...navigationComponentClasses];

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

  /* 🔧 CORE TEXT ALIGN */
${coreTextAlignVariables.join('\n')}

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

  /* 🎯 COMPONENT CARDS */
${cardsComponentVariables.join('\n')}

  /* 📝 COMPONENT INPUTS */
${inputsComponentVariables.join('\n')}

  /* 🧭 COMPONENT NAVIGATION */
${navigationComponentVariables.join('\n')}

  /* 💬 COMPONENT TOOLTIPS */
${tooltipsComponentVariables.join('\n')}

  /* 🎯 COMPONENT BADGES */
${badgesComponentVariables.join('\n')}

  /* ⚡ COMPONENT LOADING */
${loadingComponentVariables.join('\n')}

  /* 🎭 COMPONENT DISCLOSURE */
${disclosureComponentVariables.join('\n')}

  /* 📂 COMPONENT DATA IMPORT */
${dataImportComponentVariables.join('\n')}
}

/* 🔧 UTILITY CLASSES */
${utilitiesVariables.join('\n')}

/* 📐 LAYOUT CLASSES */
${layoutComponentVariables.filter(item => item.startsWith('.')).join('\n')}

/* 🧭 NAVIGATION CLASSES */
${navigationComponentClasses.join('\n')}

${modalCSS}

${tooltipCSS}

/* 🎯 CARD CLASSES - Ορατές βαμμένες κάρτες */
.layera-card {
  background: var(--layera-card-background-default);
  border: var(--layera-card-border-default);
  border-radius: var(--layera-card-border-radius);
  padding: var(--layera-card-padding);
  margin: var(--layera-card-margin);
  min-height: var(--layera-card-min-height);
  display: var(--layera-card-display);
  position: var(--layera-card-position);
  box-shadow: var(--layera-card-shadow-default);
  transition: var(--layera-card-transition);
}

/* 🎯 CARD DATA-VARIANT SELECTORS - Μία Πηγή Αλήθειας */
.layera-card[data-variant="primary"] {
  background: var(--layera-card-background-primary);
  border: var(--layera-card-border-primary);
}

.layera-card[data-variant="secondary"] {
  background: var(--layera-card-background-secondary);
  border: var(--layera-card-border-secondary);
}

.layera-card[data-variant="success"] {
  background: var(--layera-card-background-success);
  border: var(--layera-card-border-success);
}

.layera-card[data-variant="warning"] {
  background: var(--layera-card-background-warning);
  border: var(--layera-card-border-warning);
}

.layera-card[data-variant="error"] {
  background: var(--layera-card-background-error);
  border: var(--layera-card-border-error);
}

.layera-card[data-variant="info"] {
  background: var(--layera-card-background-info);
  border: var(--layera-card-border-info);
}

.layera-card[data-variant="neutral"] {
  background: var(--layera-card-background-neutral);
  border: var(--layera-card-border-neutral);
}

.layera-card:hover {
  box-shadow: var(--layera-card-shadow-hover);
  transform: var(--layera-card-hover-transform);
}

/* 🎯 ENTERPRISE CARD TEXT ALIGNMENT CLASSES */
.layera-card-text-center {
  text-align: var(--layera-card-text-align-horizontal-center);
  display: flex;
  align-items: var(--layera-card-text-align-vertical-middle);
  justify-content: center;
  flex-direction: column;
}

.layera-card-text-left {
  text-align: var(--layera-card-text-align-horizontal-left);
  display: flex;
  align-items: var(--layera-card-text-align-vertical-top);
  justify-content: flex-start;
  flex-direction: column;
}

.layera-card-text-right {
  text-align: var(--layera-card-text-align-horizontal-right);
  display: flex;
  align-items: var(--layera-card-text-align-vertical-top);
  justify-content: flex-end;
  flex-direction: column;
}

.layera-card-text-justify {
  text-align: var(--layera-card-text-align-horizontal-justify);
  display: flex;
  align-items: var(--layera-card-text-align-vertical-top);
  justify-content: stretch;
  flex-direction: column;
}

/* 🎯 HIGH SPECIFICITY MODAL TEXT ALIGNMENT CLASSES - ONLY @LAYERA TOKENS */
/* Vertical Alignment Classes */
.layera-card.layera-modal-uniform.layera-modal-text-vertical-top {
  text-align: center !important;
  display: flex !important;
  align-items: flex-start !important;
  justify-content: center !important;
  flex-direction: column !important;
  width: var(--layera-spacing-full) !important;
  height: var(--layera-spacing-full) !important;
  padding-top: var(--layera-spacing-scale-2) !important;
}

.layera-card.layera-modal-uniform.layera-modal-text-vertical-middle {
  text-align: center !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  flex-direction: column !important;
  width: var(--layera-spacing-full) !important;
  height: var(--layera-spacing-full) !important;
}

.layera-card.layera-modal-uniform.layera-modal-text-vertical-bottom {
  text-align: center !important;
  display: flex !important;
  align-items: flex-end !important;
  justify-content: center !important;
  flex-direction: column !important;
  width: var(--layera-spacing-full) !important;
  height: var(--layera-spacing-full) !important;
  padding-bottom: var(--layera-spacing-scale-2) !important;
}

/* Horizontal Alignment Classes */
.layera-card.layera-modal-uniform.layera-modal-text-horizontal-left {
  text-align: left !important;
  display: flex !important;
  align-items: center !important;
  justify-content: flex-start !important;
  flex-direction: column !important;
  width: var(--layera-spacing-full) !important;
  height: var(--layera-spacing-full) !important;
  padding-left: var(--layera-spacing-scale-2) !important;
}

.layera-card.layera-modal-uniform.layera-modal-text-horizontal-right {
  text-align: right !important;
  display: flex !important;
  align-items: center !important;
  justify-content: flex-end !important;
  flex-direction: column !important;
  width: var(--layera-spacing-full) !important;
  height: var(--layera-spacing-full) !important;
  padding-right: var(--layera-spacing-scale-2) !important;
}

/* 🎯 ENTERPRISE MODAL UNIFORM SIZE CLASSES - INCREASED DIMENSIONS */
.layera-modal-uniform {
  width: var(--layera-spacing-scale-80) !important;
  height: var(--layera-spacing-scale-12) !important;
  min-width: var(--layera-spacing-scale-80) !important;
  min-height: var(--layera-spacing-scale-12) !important;
  max-width: var(--layera-spacing-scale-80) !important;
  max-height: var(--layera-spacing-scale-12) !important;
  box-sizing: border-box !important;
  flex-shrink: 0 !important;
}

/* 🎯 ENHANCED SPECIFICITY FOR MODAL CARDS - USING TOKEN SYSTEM */
.layera-card.layera-modal-uniform {
  width: var(--layera-spacing-scale-80) !important;
  height: var(--layera-spacing-scale-12) !important;
  min-width: var(--layera-spacing-scale-80) !important;
  min-height: var(--layera-spacing-scale-12) !important;
  max-width: var(--layera-spacing-scale-80) !important;
  max-height: var(--layera-spacing-scale-12) !important;
  box-sizing: border-box !important;
  flex-shrink: 0 !important;
  flex-grow: 0 !important;
  flex-basis: var(--layera-spacing-scale-80) !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
  position: relative !important;
  overflow: hidden !important;
  text-align: center !important;
  word-wrap: break-word !important;
  word-break: break-word !important;
  white-space: nowrap !important;
  text-overflow: ellipsis !important;
}

/* 🎯 CARDS LIVE PREVIEW DYNAMIC BACKGROUNDS - USING CSS VARIABLES */
/* Card Primary Live Background */
html[data-layera-card-primary="active"] .layera-card[data-variant="primary"] {
  background-color: var(--layera-live-card-primary, var(--layera-color-primary-main)) !important;
}

/* Card Secondary Live Background */
html[data-layera-card-secondary="active"] .layera-card[data-variant="secondary"] {
  background-color: var(--layera-live-card-secondary, var(--layera-color-secondary-main)) !important;
}

/* Card Success Live Background */
html[data-layera-card-success="active"] .layera-card[data-variant="success"] {
  background-color: var(--layera-live-card-success, var(--layera-color-success-main)) !important;
}

/* Card Warning Live Background */
html[data-layera-card-warning="active"] .layera-card[data-variant="warning"] {
  background-color: var(--layera-live-card-warning, var(--layera-color-warning-main)) !important;
}

/* Card Danger Live Background */
html[data-layera-card-danger="active"] .layera-card[data-variant="error"] {
  background-color: var(--layera-live-card-danger, var(--layera-color-error-main)) !important;
}

/* Card Info Live Background */
html[data-layera-card-info="active"] .layera-card[data-variant="info"] {
  background-color: var(--layera-live-card-info, var(--layera-color-info-main)) !important;
}

/* 🎯 BUTTONS LIVE PREVIEW DYNAMIC COLORS - USING CSS VARIABLES */
/* Button Primary Live Colors */
html[data-layera-button-primary="active"] .layera-button[data-variant="primary"] {
  background-color: var(--layera-live-button-primary, var(--layera-color-primary-main)) !important;
  border-color: var(--layera-live-button-primary, var(--layera-color-primary-main)) !important;
  color: var(--layera-color-text-on-primary) !important;
}

html[data-layera-button-primary="active"] .layera-button[data-variant="primary"]:hover:not(:disabled) {
  background-color: color-mix(in srgb, var(--layera-live-button-primary, var(--layera-color-primary-main)) 90%, black) !important;
  border-color: color-mix(in srgb, var(--layera-live-button-primary, var(--layera-color-primary-main)) 90%, black) !important;
}

/* Button Secondary Live Colors */
html[data-layera-button-secondary="active"] .layera-button[data-variant="secondary"] {
  background-color: var(--layera-live-button-secondary, var(--layera-color-secondary-main)) !important;
  border-color: var(--layera-live-button-secondary, var(--layera-color-secondary-main)) !important;
  color: var(--layera-color-text-on-primary) !important;
}

html[data-layera-button-secondary="active"] .layera-button[data-variant="secondary"]:hover:not(:disabled) {
  background-color: color-mix(in srgb, var(--layera-live-button-secondary, var(--layera-color-secondary-main)) 90%, black) !important;
  border-color: color-mix(in srgb, var(--layera-live-button-secondary, var(--layera-color-secondary-main)) 90%, black) !important;
}

/* Button Success Live Colors */
html[data-layera-button-success="active"] .layera-button[data-variant="success"] {
  background-color: var(--layera-live-button-success, var(--layera-color-success-main)) !important;
  border-color: var(--layera-live-button-success, var(--layera-color-success-main)) !important;
  color: var(--layera-color-text-on-primary) !important;
}

html[data-layera-button-success="active"] .layera-button[data-variant="success"]:hover:not(:disabled) {
  background-color: color-mix(in srgb, var(--layera-live-button-success, var(--layera-color-success-main)) 90%, black) !important;
  border-color: color-mix(in srgb, var(--layera-live-button-success, var(--layera-color-success-main)) 90%, black) !important;
}

/* Button Warning Live Colors */
html[data-layera-button-warning="active"] .layera-button[data-variant="warning"] {
  background-color: var(--layera-live-button-warning, var(--layera-color-warning-main)) !important;
  border-color: var(--layera-live-button-warning, var(--layera-color-warning-main)) !important;
  color: var(--layera-color-text-on-primary) !important;
}

html[data-layera-button-warning="active"] .layera-button[data-variant="warning"]:hover:not(:disabled) {
  background-color: color-mix(in srgb, var(--layera-live-button-warning, var(--layera-color-warning-main)) 90%, black) !important;
  border-color: color-mix(in srgb, var(--layera-live-button-warning, var(--layera-color-warning-main)) 90%, black) !important;
}

/* Button Danger Live Colors */
html[data-layera-button-danger="active"] .layera-button[data-variant="danger"] {
  background-color: var(--layera-live-button-danger, var(--layera-color-danger-main)) !important;
  border-color: var(--layera-live-button-danger, var(--layera-color-danger-main)) !important;
  color: var(--layera-color-text-on-primary) !important;
}

html[data-layera-button-danger="active"] .layera-button[data-variant="danger"]:hover:not(:disabled) {
  background-color: color-mix(in srgb, var(--layera-live-button-danger, var(--layera-color-danger-main)) 90%, black) !important;
  border-color: color-mix(in srgb, var(--layera-live-button-danger, var(--layera-color-danger-main)) 90%, black) !important;
}

/* Button Info Live Colors */
html[data-layera-button-info="active"] .layera-button[data-variant="info"] {
  background-color: var(--layera-live-button-info, var(--layera-color-info-main)) !important;
  border-color: var(--layera-live-button-info, var(--layera-color-info-main)) !important;
  color: var(--layera-color-text-on-primary) !important;
}

html[data-layera-button-info="active"] .layera-button[data-variant="info"]:hover:not(:disabled) {
  background-color: color-mix(in srgb, var(--layera-live-button-info, var(--layera-color-info-main)) 90%, black) !important;
  border-color: color-mix(in srgb, var(--layera-live-button-info, var(--layera-color-info-main)) 90%, black) !important;
}

/* 🎨 ALPHA PREVIEW - Color picker transparency preview */
.layera-alpha-preview-live {
  background-color: var(--layera-live-alpha-color, #cccccc);
  border: 1px solid var(--layera-color-border-default, #e5e5e5);
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
console.log(`   📝 Inputs Component: ${inputsComponentVariables.length}`);
console.log(`   🧭 Navigation Component: ${navigationComponentVariables.length}`);
console.log(`   💬 Tooltips Component: ${tooltipsComponentVariables.length}`);
console.log(`   🎯 Badges Component: ${badgesComponentVariables.length}`);
console.log(`   ⚡ Loading Component: ${loadingComponentVariables.length}`);
console.log(`   🎭 Disclosure Component: ${disclosureComponentVariables.length}`);
console.log(`   📂 Data Import Component: ${dataImportComponentVariables.length}`);
console.log(`   🔧 Core Text Align Variables: ${coreTextAlignVariables.length}`);
console.log(`   🔧 Utilities Classes: ${utilitiesVariables.length}`);
console.log(`   📐 Layout Classes: ${layoutComponentVariables.length}`);
console.log(`   🧭 Navigation Classes: ${navigationComponentClasses.length}`);
console.log(`   🎯 Total Variables: ${allVariables.length}`);
console.log(`   🎯 Total Classes: ${allClasses.length}`);
console.log('');
console.log('✅ Build completed successfully!');
console.log('🚀 Ready για import στην εφαρμογή!');