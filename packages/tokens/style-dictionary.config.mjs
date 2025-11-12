/**
 * 🎯 Style Dictionary Config - Perfect 1:1 CSS Generation with --layera-* prefix
 *
 * Generates CSS custom properties with exact same names and values
 * as the original tokens.css file using 'la' prefix.
 * Uses custom transform groups to prevent value transformation.
 */

import fs from 'fs';
import path from 'path';

// 🧪 George Testing Panel - Check for test colors
let testConfig = null;
const testFilePath = path.join(process.cwd(), '../../tests-george/theme-test-george.json');
if (fs.existsSync(testFilePath)) {
  try {
    const testFile = fs.readFileSync(testFilePath, 'utf8');
    testConfig = JSON.parse(testFile);
    if (testConfig.testMode) {
      console.log('🧪 George Test Mode ACTIVE - Using custom colors!');
    }
  } catch (error) {
    console.log('⚠️ Test file exists but cannot parse:', error.message);
  }
}

export default {
  hooks: {
    filters: {
      'exclude/direct': (token) => !token.path.includes('_direct'),
    },
    transforms: {
      // Convert underscores back to dashes in CSS variable names with prefix
      'name/kebab-restore': {
        type: 'name',
        filter: () => true,
        transform: (token, config) => {
          const name = token.path.join('-')
            .replace(/_/g, '-') // Convert underscores to dashes
            .replace(/--base$/, ''); // Remove --base suffix to restore original names
          const prefix = config.prefix ? `${config.prefix}-` : '';
          return prefix + name;
        }
      }
    },
    formats: {
      'css/variables-with-themes': function({dictionary, options}) {
        // Παράγω το standard CSS variables format
        let output = `/**\n * Do not edit directly, this file was auto-generated.\n */\n\n:root {\n`;
        const prefix = options?.prefix || 'layera';

        dictionary.allTokens.forEach(token => {
          let finalValue = token.value;

          // 🧪 George Test Mode Override
          if (testConfig?.testMode) {
            // Override surface primary
            if (token.name === 'layera-color-light-surface-primary') {
              finalValue = testConfig.colors.cards.value;
            }
            // Override text colors - ΣΩΣΤΑ TOKENS NAMES
            if (token.name === 'layera-color-text-primary') {
              finalValue = testConfig.colors.text.primary.value;
            }
            if (token.name === 'layera-color-text-secondary') {
              finalValue = testConfig.colors.text.secondary.value;
            }
            // Override icon colors - ΕΙΚΟΝΙΔΙΑ
            if (token.name === 'layera-icon-colorPrimary') {
              finalValue = testConfig.colors.icons.primary.value;
            }
          }

          output += `  --${token.name}: ${finalValue};`;
          if (token.comment) output += ` /** ${token.comment} */`;
          output += '\n';
        });

        output += '}\n';

        // ✅ DYNAMIC: Theme-aware rules από JSON tokens (NO hardcoded values!)
        const lightTokens = dictionary.allTokens.filter(token =>
          token.path.includes('light') && (token.path.includes('surface') || token.path.includes('text'))
        );
        const darkTokens = dictionary.allTokens.filter(token =>
          token.path.includes('dark') && (token.path.includes('surface') || token.path.includes('text'))
        );

        if (lightTokens.length > 0) {
          output += `\n/* ✅ DYNAMIC: Light theme από JSON tokens */\n:root.light {\n`;
          lightTokens.forEach(token => {
            const varName = token.name.replace('light-', '');
            let finalValue = token.value;

            // 🧪 George Test Mode Override για light theme
            if (testConfig?.testMode) {
              if (varName === 'layera-color-surface-primary') {
                finalValue = testConfig.colors.cards.value;
              }
              if (varName === 'layera-color-text-primary') {
                finalValue = testConfig.colors.text.primary.value;
              }
              if (varName === 'layera-color-text-secondary') {
                finalValue = testConfig.colors.text.secondary.value;
              }
              if (varName === 'layera-icon-colorPrimary') {
                finalValue = testConfig.colors.icons.primary.value;
              }
            }

            output += `  --${varName}: var(--${token.name}, ${finalValue});\n`;
          });
          output += `}\n\n`;
        }

        if (darkTokens.length > 0) {
          output += `/* ✅ DYNAMIC: Dark theme από JSON tokens */\n:root.dark {\n`;
          darkTokens.forEach(token => {
            const varName = token.name.replace('dark-', '');
            output += `  --${varName}: var(--${token.name}, ${token.value});\n`;
          });
          output += `}\n`;
        }

        return output;
      },
      'javascript/named-exports': function({dictionary}) {
        return dictionary.allTokens
          .filter(token => typeof token.value === 'string')
          .map(token => {
            const safeName = token.name.replace(/[^a-z0-9_]/gi, '_');
            const escapedValue = token.value.replace(/'/g, "\\'");
            return `export const ${safeName} = '${escapedValue}' as const;`;
          })
          .join('\n');
      },
      'javascript/css-var-exports': ({dictionary, options}) => {
        const prefix = options.prefix ? `--${options.prefix}-` : '--';
        return dictionary.allTokens.map(token => {
          const kebab = token.path.join('-');
          return `export const ${token.name}_var = 'var(${prefix}${kebab})' as const;`;
        }).join('\n');
      },
      'css/enterprise-utilities': ({dictionary, options}) => {
        const prefix = options.prefix || 'layera';
        let output = `/**\n * LAYERA ENTERPRISE CSS UTILITIES\n * Auto-generated from Design Tokens\n * Μία πηγή αλήθειας για όλα τα styles\n */\n\n`;

        // Typography utilities - ΔΙΑΓΡΑΦΗΚΑΝ - Χρήση unified .layera-typography

        // Line Heights utilities - ΔΙΑΓΡΑΦΗΚΑΝ - Χρήση unified .layera-typography

        // Text Colors - ΔΙΑΓΡΑΦΗΚΑΝ - Χρήση unified .layera-typography

        // Color Utility Classes από color-utilities.json
        const colorUtilities = dictionary.allTokens.filter(token => token.path[0] === 'color' && token.path[1] === 'utilities');

        if (colorUtilities.length) {
          // Background color utilities
          const bgUtilities = colorUtilities.filter(token => token.path[2] === 'background');
          if (bgUtilities.length) {
            output += `/* 🎨 Enterprise Background Color Utilities */\n`;
            bgUtilities.forEach(token => {
              const pathParts = token.path.slice(3); // Remove 'color.utilities.background'
              const className = pathParts.join('-');
              output += `.${prefix}-bg-${className} {\n`;
              output += `  background-color: ${token.value};\n`;
              output += `}\n`;
            });
            output += '\n';
          }

          // Text color utilities
          const textUtilities = colorUtilities.filter(token => token.path[2] === 'text');
          if (textUtilities.length) {
            output += `/* 📝 Enterprise Text Color Utilities */\n`;
            textUtilities.forEach(token => {
              const pathParts = token.path.slice(3); // Remove 'color.utilities.text'
              const className = pathParts.join('-');
              output += `.${prefix}-text-${className} {\n`;
              output += `  color: ${token.value};\n`;
              output += `}\n`;
            });
            output += '\n';
          }

          // Border color utilities
          const borderUtilities = colorUtilities.filter(token => token.path[2] === 'border');
          if (borderUtilities.length) {
            output += `/* 🔲 Enterprise Border Color Utilities */\n`;
            borderUtilities.forEach(token => {
              const pathParts = token.path.slice(3); // Remove 'color.utilities.border'
              const className = pathParts.join('-');
              output += `.${prefix}-border-${className} {\n`;
              output += `  border-color: ${token.value};\n`;
              output += `}\n`;
            });
            output += '\n';
          }

          // Fill color utilities (για SVG)
          const fillUtilities = colorUtilities.filter(token => token.path[2] === 'fill');
          if (fillUtilities.length) {
            output += `/* 🎨 Enterprise SVG Fill Color Utilities */\n`;
            fillUtilities.forEach(token => {
              const pathParts = token.path.slice(3); // Remove 'color.utilities.fill'
              const className = pathParts.join('-');
              output += `.${prefix}-fill-${className} {\n`;
              output += `  fill: ${token.value};\n`;
              output += `}\n`;
            });
            output += '\n';
          }
        }

        // Background colors - LEGACY FALLBACK για παλιά tokens
        const bgColors = dictionary.allTokens.filter(token => token.path[0] === 'color' && token.path[1] === 'background');
        if (bgColors.length) {
          output += `/* Legacy Background Colors */\n`;
          bgColors.forEach(token => {
            const path = token.path.join('-');
            const className = path.replace('color-background-', 'bg-');
            output += `.${prefix}-${className} { background-color: var(--${prefix}-${path}); }\n`;
          });
          output += '\n';
        }

        // Border colors
        const borderColors = dictionary.allTokens.filter(token => token.path[0] === 'color' && token.path[1] === 'border');
        if (borderColors.length) {
          output += `/* Border Colors */\n`;
          borderColors.forEach(token => {
            const path = token.path.join('-');
            const className = path.replace('color-border-', 'border-');
            output += `.${prefix}-${className} { border-color: var(--${prefix}-${path}); }\n`;
          });
          output += '\n';
        }

        // Gradient backgrounds
        output += `/* Gradient Backgrounds */\n`;
        output += `.${prefix}-bg-gradient-primary {\n`;
        output += `  background: linear-gradient(to bottom right, var(--${prefix}-color-background-secondary), var(--${prefix}-color-background-surface-light));\n`;
        output += `}\n\n`;

        // Font imports
        const fontImports = dictionary.allTokens.filter(token => token.path[0] === 'global' && token.path[1] === 'fontImport');
        if (fontImports.length) {
          fontImports.forEach(token => {
            output += `${token.value}\n`;
          });
          output += '\n';
        }

        // Global base styles for body, html, and common elements
        output += `/* Global Base Styles */\n`;
        output += `/* Force light theme by default - Override dark theme */\n`;
        output += `html {\n`;
        output += `  color-scheme: light;\n`;
        output += `}\n\n`;
        output += `body {\n`;
        output += `  font-family: var(--${prefix}-global-fontFamily-system);\n`;
        output += `  margin: var(--${prefix}-global-reset-margin);\n`;
        output += `  padding: var(--${prefix}-global-reset-padding);\n`;
        output += `  color: var(--${prefix}-color-text-primary);\n`;
        output += `  background-color: white;\n`;
        output += `  display: var(--${prefix}-global-layout-display-flex);\n`;
        output += `  place-items: var(--${prefix}-global-layout-placeItems-center);\n`;
        output += `  min-width: var(--${prefix}-global-layout-minWidth);\n`;
        output += `  min-height: var(--${prefix}-global-layout-minHeight);\n`;
        output += `}\n\n`;
        output += `a {\n`;
        output += `  font-weight: var(--${prefix}-fontWeight-medium);\n`;
        output += `  color: var(--${prefix}-bg-info);\n`;
        output += `  text-decoration: var(--${prefix}-global-textDecoration-inherit);\n`;
        output += `}\n\n`;
        output += `a:hover {\n`;
        output += `  color: color-mix(in srgb, var(--${prefix}-bg-info) 80%, black 20%);\n`;
        output += `}\n\n`;
        output += `h1 {\n`;
        output += `  font-size: var(--${prefix}-fontSize-xl);\n`;
        output += `  line-height: var(--${prefix}-lineHeight-tight);\n`;
        output += `  color: var(--${prefix}-color-text-primary);\n`;
        output += `}\n\n`;
        output += `button {\n`;
        output += `  border-radius: var(--${prefix}-size-2);\n`;
        output += `  border: 1px solid transparent;\n`;
        output += `  padding: var(--${prefix}-size-4);\n`;
        output += `  font-size: var(--${prefix}-fontSize-base);\n`;
        output += `  font-weight: var(--${prefix}-fontWeight-medium);\n`;
        output += `  font-family: inherit;\n`;
        output += `  background-color: var(--${prefix}-bg-secondary);\n`;
        output += `  color: var(--${prefix}-color-text-primary);\n`;
        output += `  cursor: var(--${prefix}-global-cursor-pointer);\n`;
        output += `  transition: var(--${prefix}-global-transition-border);\n`;
        output += `}\n\n`;
        output += `button:hover {\n`;
        output += `  border-color: var(--${prefix}-bg-info);\n`;
        output += `}\n\n`;
        output += `button:focus,\n`;
        output += `button:focus-visible {\n`;
        output += `  outline: var(--${prefix}-global-outline-focus);\n`;
        output += `}\n\n`;
        output += `@media (prefers-color-scheme: light) {\n`;
        output += `  :root {\n`;
        output += `    color: var(--${prefix}-text-primary);\n`;
        output += `    background-color: var(--${prefix}-bg-primary);\n`;
        output += `  }\n`;
        output += `  a:hover {\n`;
        output += `    color: color-mix(in srgb, var(--${prefix}-bg-info) 80%, black 20%);\n`;
        output += `  }\n`;
        output += `  button {\n`;
        output += `    background-color: var(--${prefix}-bg-tertiary);\n`;
        output += `  }\n`;
        output += `}\n\n`;

        // 🗑️ ΠΑΛΙΕΣ ΚΛΑΣΕΙΣ ΔΙΑΓΡΑΦΗΚΑΝ - ΑΝΤΙΚΑΤΑΣΤΗΜΕΝΕΣ ΑΠΟ UNIFIED SYSTEM
        // ❌ .layera-card-accent-* → ✅ .layera-card[data-accent="*"]
        // ❌ .layera-btn-* → ✅ .layera-button[data-variant="*"]
        // ❌ .layera-form-* → ✅ .layera-form[data-element="*"]
        // ❌ .layera-auth-* → ✅ .layera-card[data-size="auth"]
        // ❌ .layera-map-* → ✅ .layera-map[data-type="*"]
        //
        // Enterprise ΑΡΧΕΣ Compliant - Single Source of Truth
        // 🗑️ ΑΚΟΜΑ ΠΕΡΙΣΣΟΤΕΡΕΣ ΠΑΛΙΕΣ ΚΛΑΣΕΙΣ ΔΙΑΓΡΑΦΗΚΑΝ
        // ❌ .layera-page-title → ✅ .layera-typography[data-variant="title"]
        // ❌ .layera-section-title → ✅ .layera-typography[data-variant="section"]
        // ❌ .layera-mb-* → ✅ .layera-spacing[data-size="*"][data-direction="bottom"][data-type="margin"]
        // ❌ .layera-mt-* → ✅ .layera-spacing[data-size="*"][data-direction="top"][data-type="margin"]
        // ❌ .layera-transition-* → CSS transitions ενσωματωμένες στις μοναδικές κλάσεις
        // ❌ .layera-hover-* → hover effects ενσωματωμένα στις μοναδικές κλάσεις
        //
        // Enterprise ΑΡΧΕΣ: Unified > Fragmented

        // ARXES Compliance Classes - Container classes removed for unified layout approach

        // Modal ARXES Compliance Classes
        output += `.layera-modal-overlay {\n`;
        output += `  position: fixed;\n`;
        output += `  inset: var(--${prefix}-global-spacing-0);\n`;
        output += `  z-index: var(--${prefix}-global-zIndex-modal);\n`;
        output += `  background-color: var(--${prefix}-color-surface-overlay);\n`;
        output += `  display: flex;\n`;
        output += `  align-items: center;\n`;
        output += `  justify-content: center;\n`;
        output += `  padding: var(--${prefix}-global-spacing-4);\n`;
        output += `}\n\n`;

        // Modal container classes removed - using unified layout approach

        output += `.layera-modal-close-button {\n`;
        output += `  position: absolute;\n`;
        output += `  top: var(--${prefix}-global-spacing-3);\n`;
        output += `  right: var(--${prefix}-global-spacing-3);\n`;
        output += `  z-index: var(--${prefix}-global-zIndex-dropdown);\n`;
        output += `  display: flex;\n`;
        output += `  align-items: center;\n`;
        output += `  justify-content: center;\n`;
        output += `  width: var(--${prefix}-global-spacing-8);\n`;
        output += `  height: var(--${prefix}-global-spacing-8);\n`;
        output += `  border: none;\n`;
        output += `  border-radius: var(--${prefix}-global-borderRadius-md);\n`;
        output += `  background-color: var(--${prefix}-global-colors-transparent);\n`;
        output += `  color: var(--${prefix}-global-colors-text-secondary);\n`;
        output += `  cursor: pointer;\n`;
        output += `  transition: all var(--${prefix}-global-duration-fast) ease;\n`;
        output += `}\n\n`;

        output += `.layera-modal-content {\n`;
        output += `  flex: 1;\n`;
        output += `  min-height: var(--${prefix}-global-spacing-0);\n`;
        output += `  background-color: var(--${prefix}-color-surface-primary);\n`;
        output += `  padding: var(--${prefix}-global-spacing-4);\n`;
        output += `  color: var(--${prefix}-color-text-primary);\n`;
        output += `}\n\n`;

        // 🗑️ ΠΑΛΙΕΣ BEM LANGUAGE SWITCHER ΚΛΑΣΕΙΣ ΔΙΑΓΡΑΦΗΚΑΝ
        // ❌ .layera-language-switcher--compact → ✅ .layera-button[data-variant="language"][data-size="compact"]

        // 🚫 ΠΑΛΙΕΣ LAYOUT ΚΛΑΣΕΙΣ ΔΙΑΓΡΑΦΗΚΑΝ - Χρήση μόνο .layera-layout


        // 🗑️ ΠΑΛΙΕΣ DRAWER BEM ΚΛΑΣΕΙΣ ΔΙΑΓΡΑΦΗΚΑΝ - Χρήση μόνο unified .layera-drawer από components.drawer token

        // 🗑️ ΠΑΛΙΕΣ CARD BEM ΚΛΑΣΕΙΣ ΔΙΑΓΡΑΦΗΚΑΝ - Χρήση μόνο unified .layera-card από components.card token

        // ✅ FIXED: Theme variables are already generated by tokens.css - no duplication needed here

        // Layout System Classes - Unified Generation από layout.unified token
        const layoutUnified = dictionary.allTokens.find(token => token.path.join('.') === 'layout.unified');
        if (layoutUnified && layoutUnified.value) {
          const props = layoutUnified.value;
          output += `/* ΜΟΝΑΔΙΚΗ Layout Κλάση - Αντικαθιστά 32 κλάσεις */\n`;
          output += `.layera-layout {\n`;
          output += `  display: ${props.display || 'flex'};\n`;
          output += `  flex-direction: ${props.flexDirection || 'column'};\n`;
          output += `  width: ${props.width || '100%'};\n`;
          output += `  min-height: ${props.minHeight || '100vh'};\n`;
          output += `}\n\n`;
          // Τέλος Layout System - Όλες οι παλιές 32 κλάσεις διαγράφηκαν
        }

        // Layout Component Classes - Generate από όλα τα layout.* tokens
        const layoutComponents = ['header', 'sidebar', 'content', 'footer'];
        layoutComponents.forEach(componentName => {
          const layoutComponent = dictionary.allTokens.find(token => token.path.join('.') === `layout.${componentName}`);
          if (layoutComponent && layoutComponent.value) {
            const props = layoutComponent.value;
            output += `/* Layout ${componentName} κλάση - AppShell component */\n`;
            output += `.layera-layout-${componentName} {\n`;
            Object.entries(props).forEach(([prop, value]) => {
              const cssProp = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
              output += `  ${cssProp}: ${value};\n`;
            });
            output += `}\n\n`;
          }
        });

        // Simple Header Class από header.simple token
        const headerSimple = dictionary.allTokens.find(token => token.path.join('.') === 'header.simple');
        if (headerSimple && headerSimple.value) {
          const props = headerSimple.value;
          output += `/* Simple header κλάση - legacy compatibility */\n`;
          output += `.layera-header {\n`;
          Object.entries(props).forEach(([prop, value]) => {
            const cssProp = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
            output += `  ${cssProp}: ${value};\n`;
          });
          output += `}\n\n`;
        }

        // Typography System Classes - Unified Generation από typography.unified token
        const typographyUnified = dictionary.allTokens.find(token => token.path.join('.') === 'typography.unified');
        if (typographyUnified && typographyUnified.value) {
          const props = typographyUnified.value;
          output += `/* ΜΟΝΑΔΙΚΗ Typography Κλάση - Αντικαθιστά 33 κλάσεις */\n`;
          output += `.layera-typography {\n`;
          output += `  font-family: ${props.fontFamily || 'var(--layera-global-fontFamily-system)'};\n`;
          output += `  font-size: ${props.fontSize || 'var(--layera-fontSize-base)'};\n`;
          output += `  font-weight: ${props.fontWeight || 'var(--layera-fontWeight-normal)'};\n`;
          output += `  line-height: ${props.lineHeight || 'var(--layera-lineHeight-normal)'};\n`;
          output += `  color: ${props.color || 'var(--layera-color-text-primary)'};\n`;
          output += `  text-decoration: ${props.textDecoration || 'var(--layera-global-textDecoration-inherit)'};\n`;

          // Add data attribute variants για τις διαφορετικές παραλλαγές
          output += `}\n\n`;

          // Font size variants
          output += `/* Typography Size Variants */\n`;
          if (typographyUnified.variants && typographyUnified.variants.size) {
            Object.entries(typographyUnified.variants.size).forEach(([key, value]) => {
              output += `.layera-typography[data-size="${key}"] { font-size: ${value}; }\n`;
            });
          }

          // Font weight variants
          output += `\n/* Typography Weight Variants */\n`;
          if (typographyUnified.variants && typographyUnified.variants.weight) {
            Object.entries(typographyUnified.variants.weight).forEach(([key, value]) => {
              output += `.layera-typography[data-weight="${key}"] { font-weight: ${value}; }\n`;
            });
          }

          // Line height variants
          output += `\n/* Typography Leading Variants */\n`;
          if (typographyUnified.variants && typographyUnified.variants.leading) {
            Object.entries(typographyUnified.variants.leading).forEach(([key, value]) => {
              output += `.layera-typography[data-leading="${key}"] { line-height: ${value}; }\n`;
            });
          }

          // Color variants
          output += `\n/* Typography Color Variants */\n`;
          if (typographyUnified.variants && typographyUnified.variants.color) {
            Object.entries(typographyUnified.variants.color).forEach(([key, value]) => {
              output += `.layera-typography[data-color="${key}"] { color: ${value}; }\n`;
            });
          }

          // Text decoration variants
          output += `\n/* Typography Decoration Variants */\n`;
          if (typographyUnified.variants && typographyUnified.variants.decoration) {
            Object.entries(typographyUnified.variants.decoration).forEach(([key, value]) => {
              output += `.layera-typography[data-decoration="${key}"] { text-decoration: ${value}; }\n`;
            });
          }

          // Interactive variants για buttons
          output += `\n/* Typography Variant για Buttons */\n`;
          if (typographyUnified.variants && typographyUnified.variants.variant) {
            Object.entries(typographyUnified.variants.variant).forEach(([key, value]) => {
              output += `.layera-typography[data-variant="${key}"] {\n`;
              Object.entries(value).forEach(([prop, val]) => {
                // Convert camelCase to kebab-case
                const cssProp = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
                output += `  ${cssProp}: ${val};\n`;
              });
              output += `}\n\n`;

              // Add hover effects for interactive variants
              if (key === 'button') {
                output += `.layera-typography[data-variant="${key}"]:hover {\n`;
                output += `  background-color: #2563eb;\n`;
                output += `  border-color: #2563eb;\n`;
                output += `}\n\n`;
              }

              if (key === 'logo') {
                output += `.layera-typography[data-variant="${key}"]:hover {\n`;
                output += `  background-color: var(--layera-color-background-secondary, #f3f4f6);\n`;
                output += `}\n\n`;
              }
            });
          }

          output += `\n`;
          // Τέλος Typography System - Όλες οι παλιές 33 κλάσεις διαγράφηκαν
        }

        // Utility Classes Generation από utilities.* tokens
        const utilityTypes = ['padding', 'margin', 'stack'];
        utilityTypes.forEach(utilityName => {
          const utilityToken = dictionary.allTokens.find(token => token.path.join('.') === `utilities.${utilityName}`);
          if (utilityToken && utilityToken.value) {
            const props = utilityToken.value;
            output += `/* Utility ${utilityName} κλάση */\n`;
            output += `.layera-${utilityName} {\n`;
            Object.entries(props).forEach(([prop, value]) => {
              const cssProp = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
              output += `  ${cssProp}: ${value};\n`;
            });
            output += `}\n\n`;

            // Generate utility variants
            if (utilityToken.variants) {
              Object.entries(utilityToken.variants).forEach(([variantType, variants]) => {
                Object.entries(variants).forEach(([key, value]) => {
                  if (variantType === 'direction') {
                    output += `.layera-${utilityName}-${key}--lg {\n`;
                  } else if (variantType === 'spacing') {
                    output += `.layera-${utilityName}--${variantType}-${key} {\n`;
                  } else {
                    output += `.layera-${utilityName}--${key} {\n`;
                  }
                  Object.entries(value).forEach(([prop, val]) => {
                    const cssProp = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
                    output += `  ${cssProp}: ${val};\n`;
                  });
                  output += `}\n`;

                  // Additional BEM variants for size + direction combos
                  if (variantType === 'size' && utilityName === 'margin') {
                    if (key === 'sm') {
                      output += `.layera-margin-bottom--sm {\n`;
                      Object.entries(value).forEach(([prop, val]) => {
                        if (prop.includes('margin') || prop.includes('marginBottom')) {
                          output += `  margin-bottom: ${val};\n`;
                        }
                      });
                      output += `}\n`;
                    }
                    if (key === 'md') {
                      output += `.layera-margin-bottom--md {\n`;
                      Object.entries(value).forEach(([prop, val]) => {
                        if (prop.includes('margin') || prop.includes('marginBottom')) {
                          output += `  margin-bottom: ${val};\n`;
                        }
                      });
                      output += `}\n`;
                    }
                  }

                  // Top margin variants
                  if (variantType === 'top' && utilityName === 'margin') {
                    output += `.layera-margin-top--${key} {\n`;
                    Object.entries(value).forEach(([prop, val]) => {
                      const cssProp = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
                      output += `  ${cssProp}: ${val};\n`;
                    });
                    output += `}\n`;
                  }
                });
              });
              output += `\n`;
            }
          }
        });

        // Grid Utility Classes από grid.base token
        const gridToken = dictionary.allTokens.find(token => token.path.join('.') === 'grid.base');
        if (gridToken && gridToken.value) {
          const props = gridToken.value;
          output += `/* Grid base κλάση */\n`;
          output += `.layera-grid {\n`;
          Object.entries(props).forEach(([prop, value]) => {
            const cssProp = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
            output += `  ${cssProp}: ${value};\n`;
          });
          output += `}\n\n`;

          // Grid variants
          if (gridToken.variants) {
            Object.entries(gridToken.variants).forEach(([variantType, variants]) => {
              Object.entries(variants).forEach(([key, value]) => {
                if (variantType === 'tablet' || variantType === 'desktop') {
                  output += `.layera-grid--${variantType}-${key} {\n`;
                  Object.entries(value).forEach(([prop, val]) => {
                    if (prop.startsWith('@media')) {
                      output += `}\n${prop} {\n.layera-grid--${variantType}-${key} {\n`;
                      Object.entries(val).forEach(([cssProp, cssVal]) => {
                        output += `  ${cssProp.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${cssVal};\n`;
                      });
                    } else {
                      const cssProp = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
                      output += `  ${cssProp}: ${val};\n`;
                    }
                  });
                  output += `}\n`;
                } else {
                  // Προσθήκη του variant type στο όνομα της κλάσης
                  output += `.layera-grid--${variantType}-${key} {\n`;
                  Object.entries(value).forEach(([prop, val]) => {
                    const cssProp = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
                    output += `  ${cssProp}: ${val};\n`;
                  });
                  output += `}\n`;
                }
              });
            });
            output += `\n`;
          }
        }

        // Width Utility Classes από width.* tokens
        const widthFull = dictionary.allTokens.find(token => token.path.join('.') === 'width.full');
        if (widthFull && widthFull.value) {
          const props = widthFull.value;
          output += `/* Width full κλάση */\n`;
          output += `.layera-full-width {\n`;
          Object.entries(props).forEach(([prop, value]) => {
            const cssProp = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
            output += `  ${cssProp}: ${value};\n`;
          });
          output += `}\n\n`;
        }

        // Form Component Classes από form.* tokens
        const formTypes = ['label', 'input'];
        formTypes.forEach(formType => {
          const formToken = dictionary.allTokens.find(token => token.path.join('.') === `form.${formType}`);
          if (formToken && formToken.value) {
            const props = formToken.value;
            output += `/* Form ${formType} κλάση */\n`;
            output += `.layera-form-${formType} {\n`;
            Object.entries(props).forEach(([prop, value]) => {
              const cssProp = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
              output += `  ${cssProp}: ${value};\n`;
            });
            output += `}\n\n`;
          }
        });

        // Button Alias Classes από btn.* tokens
        const btnPrimary = dictionary.allTokens.find(token => token.path.join('.') === 'btn.primary');
        if (btnPrimary && btnPrimary.value) {
          const props = btnPrimary.value;
          output += `/* Button primary κλάση */\n`;
          output += `.layera-btn-primary {\n`;
          Object.entries(props).forEach(([prop, value]) => {
            const cssProp = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
            output += `  ${cssProp}: ${value};\n`;
          });
          output += `}\n\n`;
        }

        // Text Utility Classes από text.* tokens
        const textAlignTypes = ['left', 'center', 'right', 'white', '3xl'];
        textAlignTypes.forEach(alignType => {
          const textToken = dictionary.allTokens.find(token => token.path.join('.') === `text.${alignType}`);
          if (textToken && textToken.value) {
            const props = textToken.value;
            output += `/* Text ${alignType} κλάση */\n`;
            output += `.layera-text-${alignType} {\n`;
            Object.entries(props).forEach(([prop, value]) => {
              const cssProp = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
              output += `  ${cssProp}: ${value};\n`;
            });
            output += `}\n\n`;
          }
        });

        // Flex Utility Classes από flex.base token
        const flexToken = dictionary.allTokens.find(token => token.path.join('.') === 'flex.base');
        if (flexToken && flexToken.value) {
          const props = flexToken.value;
          output += `/* Flex base κλάση */\n`;
          output += `.layera-flex {\n`;
          Object.entries(props).forEach(([prop, value]) => {
            const cssProp = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
            output += `  ${cssProp}: ${value};\n`;
          });
          output += `}\n\n`;

          // Flex variants
          if (flexToken.variants) {
            Object.entries(flexToken.variants).forEach(([variantType, variants]) => {
              Object.entries(variants).forEach(([key, value]) => {
                output += `.layera-flex--${variantType}-${key} {\n`;
                Object.entries(value).forEach(([prop, val]) => {
                  const cssProp = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
                  output += `  ${cssProp}: ${val};\n`;
                });
                output += `}\n`;
              });
            });
            output += `\n`;
          }
        }

        // Map Container Classes από map.container token
        const mapContainer = dictionary.allTokens.find(token => token.path.join('.') === 'map.container');
        if (mapContainer && mapContainer.value) {
          const props = mapContainer.value;
          output += `/* Map Container κλάση */\n`;
          output += `.layera-map-container {\n`;
          Object.entries(props).forEach(([prop, value]) => {
            const cssProp = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
            output += `  ${cssProp}: ${value};\n`;
          });
          output += `}\n\n`;

          // Map variants
          if (mapContainer.variants && mapContainer.variants.fullscreen) {
            Object.entries(mapContainer.variants.fullscreen).forEach(([key, value]) => {
              output += `.layera-map--fullscreen {\n`;
              Object.entries(value).forEach(([prop, val]) => {
                const cssProp = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
                output += `  ${cssProp}: ${val};\n`;
              });
              output += `}\n`;
            });
            output += `\n`;
          }
        }

        // Spacing System Classes - ΜΟΝΑΔΙΚΗ .layera-spacing κλάση από spacing.unified token
        const spacingUnified = dictionary.allTokens.find(token => token.path.join('.') === 'spacing.unified');
        if (spacingUnified && spacingUnified.value) {
          const props = spacingUnified.value;
          output += `/* ⚠️  ΠΡΟΕΙΔΟΠΟΙΗΣΗ ΑΠΟ ΑΡΧΙΤΕΚΤΟΝΑ ΓΙΩΡΓΟ ⚠️\n`;
          output += ` *\n`;
          output += ` * ΑΠΑΓΟΡΕΥΕΤΑΙ ΑΥΣΤΗΡΑ:\n`;
          output += ` * - Να πειραχτεί αυτή η κλάση\n`;
          output += ` * - Να δημιουργηθεί άλλη κλάση spacing\n`;
          output += ` * - Να προστεθούν περισσότερες κλάσεις\n`;
          output += ` *\n`;
          output += ` * ΜΟΝΑΔΙΚΗ ΚΛΑΣΗ SPACING - Η ΠΙΟ ΠΛΗΡΗΣ\n`;
          output += ` * Enterprise ARXES Compliant - Single Source of Truth\n`;
          output += ` * Αντικαθιστά 40+ κλάσεις: spacing, container, breakpoint, modal, component\n`;
          output += ` */\n`;
          output += `.layera-spacing {\n`;
          Object.entries(props).forEach(([prop, val]) => {
            const cssProp = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
            output += `  ${cssProp}: ${val};\n`;
          });
          output += `}\n\n`;

          // Size variants με data attributes
          output += `/* Spacing Size Variants */\n`;
          if (spacingUnified.variants && spacingUnified.variants.size) {
            Object.entries(spacingUnified.variants.size).forEach(([key, value]) => {
              output += `.layera-spacing[data-size="${key}"] {\n`;
              Object.entries(value).forEach(([prop, val]) => {
                const cssProp = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
                output += `  ${cssProp}: ${val};\n`;
              });
              output += `}\n`;
            });
          }

          // Direction variants
          output += `\n/* Spacing Direction Variants */\n`;
          if (spacingUnified.variants && spacingUnified.variants.direction) {
            Object.entries(spacingUnified.variants.direction).forEach(([key, value]) => {
              output += `.layera-spacing[data-direction="${key}"] {\n`;
              Object.entries(value).forEach(([prop, val]) => {
                const cssProp = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
                output += `  ${cssProp}: ${val};\n`;
              });
              output += `}\n`;
            });
          }

          // Type variants
          output += `\n/* Spacing Type Variants */\n`;
          if (spacingUnified.variants && spacingUnified.variants.type) {
            Object.entries(spacingUnified.variants.type).forEach(([key, value]) => {
              output += `.layera-spacing[data-type="${key}"] {\n`;
              Object.entries(value).forEach(([prop, val]) => {
                const cssProp = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
                output += `  ${cssProp}: ${val};\n`;
              });
              output += `}\n`;
            });
          }

          // Container variants
          output += `\n/* Spacing Container Variants */\n`;
          if (spacingUnified.variants && spacingUnified.variants.container) {
            Object.entries(spacingUnified.variants.container).forEach(([key, value]) => {
              output += `.layera-spacing[data-container="${key}"] {\n`;
              Object.entries(value).forEach(([prop, val]) => {
                const cssProp = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
                output += `  ${cssProp}: ${val};\n`;
              });
              output += `}\n`;
            });
          }

          // Component variants
          output += `\n/* Spacing Component Variants */\n`;
          if (spacingUnified.variants && spacingUnified.variants.component) {
            Object.entries(spacingUnified.variants.component).forEach(([key, value]) => {
              output += `.layera-spacing[data-component="${key}"] {\n`;
              Object.entries(value).forEach(([prop, val]) => {
                const cssProp = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
                output += `  ${cssProp}: ${val};\n`;
              });
              output += `}\n`;
            });
          }

          // Breakpoint variants με media queries
          output += `\n/* Spacing Responsive Variants */\n`;
          if (spacingUnified.variants && spacingUnified.variants.breakpoint) {
            Object.entries(spacingUnified.variants.breakpoint).forEach(([key, value]) => {
              Object.entries(value).forEach(([mediaQuery, styles]) => {
                if (mediaQuery.startsWith('@media')) {
                  output += `${mediaQuery} {\n`;
                  output += `  .layera-spacing[data-breakpoint="${key}"] {\n`;
                  Object.entries(styles).forEach(([prop, val]) => {
                    const cssProp = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
                    output += `    ${cssProp}: ${val};\n`;
                  });
                  output += `  }\n`;
                  output += `}\n`;
                }
              });
            });
          }

          output += `\n`;
        }

        // Components System Classes - ΜΟΝΑΔΙΚΕΣ .layera-component κλάσεις από components.* tokens
        const componentTypes = ['card', 'button', 'form', 'drawer', 'map'];

        componentTypes.forEach(componentType => {
          const componentUnified = dictionary.allTokens.find(token => token.path.join('.') === `components.${componentType}`);
          if (componentUnified && componentUnified.value) {
            const props = componentUnified.value;
            output += `/* ⚠️  ΠΡΟΕΙΔΟΠΟΙΗΣΗ ΑΠΟ ΑΡΧΙΤΕΚΤΟΝΑ ΓΙΩΡΓΟ ⚠️\n`;
            output += ` *\n`;
            output += ` * ΑΠΑΓΟΡΕΥΕΤΑΙ ΑΥΣΤΗΡΑ:\n`;
            output += ` * - Να πειραχτεί αυτή η κλάση\n`;
            output += ` * - Να δημιουργηθεί άλλη κλάση ${componentType}\n`;
            output += ` * - Να προστεθούν περισσότερες κλάσεις\n`;
            output += ` *\n`;
            output += ` * ΜΟΝΑΔΙΚΗ ΚΛΑΣΗ ${componentType.toUpperCase()} - Η ΠΙΟ ΠΛΗΡΗΣ\n`;
            output += ` * Enterprise ARXES Compliant - Single Source of Truth\n`;
            output += ` */\n`;
            output += `.layera-${componentType} {\n`;
            Object.entries(props).forEach(([prop, val]) => {
              const cssProp = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
              output += `  ${cssProp}: ${val};\n`;
            });
            output += `}\n\n`;

            // Generate variants με data attributes
            if (componentUnified.variants) {
              Object.entries(componentUnified.variants).forEach(([variantCategory, variants]) => {
                output += `/* ${componentType.charAt(0).toUpperCase() + componentType.slice(1)} ${variantCategory.charAt(0).toUpperCase() + variantCategory.slice(1)} Variants */\n`;
                Object.entries(variants).forEach(([key, value]) => {
                  output += `.layera-${componentType}[data-${variantCategory}="${key}"] {\n`;
                  Object.entries(value).forEach(([prop, val]) => {
                    const cssProp = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
                    output += `  ${cssProp}: ${val};\n`;
                  });
                  output += `}\n`;
                });
                output += `\n`;
              });
            }

            // Add hover effects για button και card
            if (componentType === 'button') {
              output += `/* Button Hover Effects */\n`;
              output += `.layera-button[data-variant="primary"]:hover {\n`;
              output += `  opacity: 0.8;\n`;
              output += `}\n`;
              output += `.layera-button[data-variant="secondary"]:hover {\n`;
              output += `  background-color: var(--layera-color-background-surface-light);\n`;
              output += `}\n`;
              output += `.layera-button[data-variant="nav"]:hover {\n`;
              output += `  background-color: var(--layera-color-background-surface-light);\n`;
              output += `}\n`;
              output += `.layera-button[data-variant="login"]:hover {\n`;
              output += `  opacity: 0.9;\n`;
              output += `}\n\n`;
            }

            if (componentType === 'card') {
              output += `/* Card BEM Element Classes */\n`;
              if (componentUnified.variants && componentUnified.variants.element) {
                Object.entries(componentUnified.variants.element).forEach(([elementName, elementStyles]) => {
                  output += `.layera-card__${elementName} {\n`;
                  Object.entries(elementStyles).forEach(([prop, val]) => {
                    const cssProp = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
                    output += `  ${cssProp}: ${val};\n`;
                  });
                  output += `}\n`;
                });
                output += `\n`;
              }

              output += `/* Card Hover Effects */\n`;
              output += `.layera-card[data-clickable="true"]:hover {\n`;
              output += `  border-color: var(--layera-color-border-primary);\n`;
              output += `  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);\n`;
              output += `  transform: translateY(-1px);\n`;
              output += `}\n`;
              output += `.layera-card[data-clickable="true"]:active {\n`;
              output += `  transform: translateY(0);\n`;
              output += `  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);\n`;
              output += `}\n\n`;
            }

            if (componentType === 'form') {
              output += `/* Form Focus Effects */\n`;
              output += `.layera-form[data-element="input"]:focus {\n`;
              output += `  outline: none;\n`;
              output += `  box-shadow: 0 0 0 2px var(--layera-color-text-primary);\n`;
              output += `  border-color: var(--layera-color-text-primary);\n`;
              output += `}\n`;
              output += `.layera-form[data-element="textarea"]:focus {\n`;
              output += `  outline: none;\n`;
              output += `  box-shadow: 0 0 0 2px var(--layera-color-text-primary);\n`;
              output += `  border-color: var(--layera-color-text-primary);\n`;
              output += `}\n\n`;
            }

            // BEM Compatibility Aliases
            if (componentUnified.variants) {
              Object.entries(componentUnified.variants).forEach(([variantCategory, variants]) => {
                Object.entries(variants).forEach(([key, value]) => {
                  // Special handling for boolean values
                  const bemKey = key === 'true' ? variantCategory : key;
                  output += `/* BEM Compatibility: ${componentType}--${bemKey} */\n`;
                  output += `.layera-${componentType}--${bemKey} {\n`;
                  Object.entries(value).forEach(([prop, val]) => {
                    const cssProp = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
                    output += `  ${cssProp}: ${val};\n`;
                  });
                  output += `}\n`;
                });
              });
              output += `\n`;
            }

            output += `\n`;
          }
        });

        // 🗑️ ΠΑΛΙΕΣ MAP BEM ΚΛΑΣΕΙΣ ΔΙΑΓΡΑΦΗΚΑΝ - Χρήση μόνο unified .layera-map από components.map token

        // Modal Class - ΜΟΝΑΔΙΚΗ ΚΛΑΣΗ MODAL
        output += `/* ⚠️  ΠΡΟΕΙΔΟΠΟΙΗΣΗ ΑΠΟ ΑΡΧΙΤΕΚΤΟΝΑ ΓΙΩΡΓΟ ⚠️\n`;
          output += ` *\n`;
          output += ` * ΑΠΑΓΟΡΕΥΕΤΑΙ ΑΥΣΤΗΡΑ:\n`;
          output += ` * - Να πειραχτεί αυτή η κλάση\n`;
          output += ` * - Να δημιουργηθεί άλλη κλάση modal\n`;
          output += ` * - Να προστεθούν περισσότερες κλάσεις\n`;
          output += ` *\n`;
          output += ` * ΜΟΝΑΔΙΚΗ ΚΛΑΣΗ MODAL - Η ΠΙΟ ΠΛΗΡΗΣ\n`;
          output += ` * Enterprise ARXES Compliant - Single Source of Truth\n`;
          output += ` */\n`;
          output += `.layera-modal {\n`;
          output += `  /* Overlay */\n`;
          output += `  position: fixed;\n`;
          output += `  top: 0;\n`;
          output += `  left: 0;\n`;
          output += `  right: 0;\n`;
          output += `  bottom: 0;\n`;
          output += `  z-index: 2000;\n`;
          output += `  display: flex;\n`;
          output += `  align-items: center;\n`;
          output += `  justify-content: center;\n`;
          output += `  background: rgba(0, 0, 0, 0.5);\n`;
          output += `  padding: var(--layera-space-md, 16px);\n\n`;
          output += `  /* Content */\n`;
          output += `  > * {\n`;
          output += `    background: var(--layera-global-colors-theme-light-header-background, #ffffff);\n`;
          output += `    border-radius: var(--layera-radius-lg, 8px);\n`;
          output += `    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);\n`;
          output += `    max-width: 90vw;\n`;
          output += `    max-height: 90vh;\n`;
          output += `    overflow: auto;\n`;
          output += `    padding: var(--layera-space-lg, 24px);\n`;
          output += `    position: relative;\n`;
          output += `  }\n`;
          output += `}\n\n`;

        // ✅ FIXED: Theme rules already generated in tokens.css - no duplication needed

        // I18N System Classes - ΜΟΝΑΔΙΚΗ .layera-i18n κλάση από i18n.* tokens
        const i18nUnified = dictionary.allTokens.find(token => token.path.join('.') === 'i18n.unified');
        if (i18nUnified && i18nUnified.value) {
          const props = i18nUnified.value;
          output += `/* ⚠️  ΠΡΟΕΙΔΟΠΟΙΗΣΗ ΑΠΟ ΑΡΧΙΤΕΚΤΟΝΑ ΓΙΩΡΓΟ ⚠️\n`;
          output += ` *\n`;
          output += ` * ΑΠΑΓΟΡΕΥΕΤΑΙ ΑΥΣΤΗΡΑ:\n`;
          output += ` * - Να πειραχτεί αυτή η κλάση\n`;
          output += ` * - Να δημιουργηθεί άλλη κλάση i18n\n`;
          output += ` * - Να προστεθούν περισσότερες κλάσεις\n`;
          output += ` *\n`;
          output += ` * ΜΟΝΑΔΙΚΗ ΚΛΑΣΗ I18N - Η ΠΙΟ ΠΛΗΡΗΣ\n`;
          output += ` * Enterprise ARXES Compliant - Single Source of Truth\n`;
          output += ` * Συνεργάζεται με @layera/tolgee package για complete i18n solution\n`;
          output += ` */\n`;
          output += `.layera-i18n {\n`;
          Object.entries(props).forEach(([prop, val]) => {
            const cssProp = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
            output += `  ${cssProp}: ${val};\n`;
          });
          output += `}\n\n`;

          // Generate i18n variants με data attributes
          if (i18nUnified.variants) {
            Object.entries(i18nUnified.variants).forEach(([variantCategory, variants]) => {
              output += `/* I18N ${variantCategory.charAt(0).toUpperCase() + variantCategory.slice(1)} Variants */\n`;
              Object.entries(variants).forEach(([key, value]) => {
                // Skip comment entries - don't convert to CSS
                if (key === 'comment') return;

                output += `.layera-i18n[data-${variantCategory}="${key}"] {\n`;
                Object.entries(value).forEach(([prop, val]) => {
                  // Skip comment properties
                  if (prop === 'comment') return;

                  const cssProp = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
                  output += `  ${cssProp}: ${val};\n`;
                });
                output += `}\n`;
              });
              output += `\n`;
            });
          }

          output += `\n`;
        }

        // Theme Switcher System Classes - Unified Generation από theme-switcher.unified token
        const themeSwitcherUnified = dictionary.allTokens.find(token => token.path.join('.') === 'theme-switcher.unified');
        if (themeSwitcherUnified && themeSwitcherUnified.value) {
          const props = themeSwitcherUnified.value;
          output += `/* ⚠️  ΠΡΟΕΙΔΟΠΟΙΗΣΗ ΑΠΟ ΑΡΧΙΤΕΚΤΟΝΑ ΓΙΩΡΓΟ ⚠️\n`;
          output += ` *\n`;
          output += ` * ΑΠΑΓΟΡΕΥΕΤΑΙ ΑΥΣΤΗΡΑ:\n`;
          output += ` * - Να πειραχτεί αυτή η κλάση\n`;
          output += ` * - Να δημιουργηθεί άλλη κλάση theme-switcher\n`;
          output += ` * - Να προστεθούν περισσότερες κλάσεις\n`;
          output += ` *\n`;
          output += ` * ΜΟΝΑΔΙΚΗ ΚΛΑΣΗ THEME-SWITCHER - Αντικαθιστά 9+ fragmented κλάσεις\n`;
          output += ` * Enterprise ARXES Compliant - Single Source of Truth\n`;
          output += ` */\n`;
          output += `.layera-theme-switcher {\n`;
          Object.entries(props).forEach(([prop, val]) => {
            const cssProp = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
            output += `  ${cssProp}: ${val};\n`;
          });
          output += `}\n\n`;

          // Generate variants με data attributes
          if (themeSwitcherUnified.variants) {
            Object.entries(themeSwitcherUnified.variants).forEach(([variantCategory, variants]) => {
              output += `/* Theme Switcher ${variantCategory.charAt(0).toUpperCase() + variantCategory.slice(1)} Variants */\n`;
              Object.entries(variants).forEach(([key, value]) => {
                // Skip comment entries
                if (key === 'comment') return;

                output += `.layera-theme-switcher[data-${variantCategory}="${key}"] {\n`;
                Object.entries(value).forEach(([prop, val]) => {
                  // Skip comment properties
                  if (prop === 'comment') return;

                  const cssProp = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
                  output += `  ${cssProp}: ${val};\n`;
                });
                output += `}\n`;
              });
              output += `\n`;
            });
          }

          output += `\n`;
        }

        // Responsive Container System Classes - Unified Generation από responsive.unified token
        const responsiveUnified = dictionary.allTokens.find(token => token.path.join('.') === 'responsive.unified');
        if (responsiveUnified && responsiveUnified.value) {
          const props = responsiveUnified.value;
          output += `/* ⚠️  ΠΡΟΕΙΔΟΠΟΙΗΣΗ ΑΠΟ ΑΡΧΙΤΕΚΤΟΝΑ ΓΙΩΡΓΟ ⚠️\n`;
          output += ` *\n`;
          output += ` * ΑΠΑΓΟΡΕΥΕΤΑΙ ΑΥΣΤΗΡΑ:\n`;
          output += ` * - Να πειραχτεί αυτή η κλάση\n`;
          output += ` * - Να δημιουργηθεί άλλη κλάση responsive\n`;
          output += ` * - Να προστεθούν περισσότερες κλάσεις\n`;
          output += ` *\n`;
          output += ` * ΜΟΝΑΔΙΚΗ ΚΛΑΣΗ RESPONSIVE CONTAINER - Αντικαθιστά 10+ fragmented κλάσεις\n`;
          output += ` * Enterprise ARXES Compliant - Single Source of Truth\n`;
          output += ` */\n`;
          output += `.layera-responsive-container {\n`;
          Object.entries(props).forEach(([prop, val]) => {
            const cssProp = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
            output += `  ${cssProp}: ${val};\n`;
          });
          output += `}\n\n`;

          // Generate breakpoint-specific styles
          if (responsiveUnified['breakpoint-specific']) {
            Object.entries(responsiveUnified['breakpoint-specific']).forEach(([breakpoint, rules]) => {
              Object.entries(rules).forEach(([ruleType, styles]) => {
                const [feature, enabled] = ruleType.split('-'); // e.g. "max-width-enabled" -> ["max-width", "enabled"]
                output += `/* Responsive ${breakpoint} ${feature} ${enabled} */\n`;
                output += `.layera-responsive-container[data-breakpoint="${breakpoint}"][data-${feature}="${enabled}"] {\n`;
                Object.entries(styles).forEach(([prop, val]) => {
                  const cssProp = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
                  output += `  ${cssProp}: ${val};\n`;
                });
                output += `}\n\n`;
              });
            });
          }

          // Generate CSS media query fallbacks
          if (responsiveUnified['media-queries']) {
            output += `/* CSS Media Query Fallbacks για older browsers */\n`;
            Object.entries(responsiveUnified['media-queries']).forEach(([breakpoint, config]) => {
              if (config && config.breakpoint && config.styles) {
                output += `@media screen and (${config.breakpoint}) {\n`;
                output += `  .layera-responsive-container[data-fallback="${breakpoint}"] {\n`;
                Object.entries(config.styles).forEach(([prop, val]) => {
                  const cssProp = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
                  output += `    ${cssProp}: ${val};\n`;
                });
                output += `  }\n`;
                output += `}\n\n`;
              }
            });
          }

          output += `\n`;
        }

        // ❌ ΔΙΑΓΡΑΦΗΚΕ: Card Base Classes από card.base token - ΔΙΠΛΟΤΥΠΙΑ ΜΕ components.card
        // Το components.card token (γραμμή ~797) είναι η ΜΟΝΑΔΙΚΗ ΠΗΓΗ ΑΛΗΘΕΙΑΣ για card styles
        // Αυτός ο κώδικας έψαχνε για card.base token που ΔΕΝ ΥΠΑΡΧΕΙ

        // Background Utility Classes από bg.* tokens
        const bgSurfaceLight = dictionary.allTokens.find(token => token.path.join('.') === 'bg.surface.light');
        if (bgSurfaceLight && bgSurfaceLight.value) {
          output += `/* Background surface light κλάση */\n`;
          output += `.layera-bg-surface-light {\n`;
          output += `  background-color: ${bgSurfaceLight.value};\n`;
          output += `}\n\n`;
        }

        const bgSurfaceMedium = dictionary.allTokens.find(token => token.path.join('.') === 'bg.surface.medium');
        if (bgSurfaceMedium && bgSurfaceMedium.value) {
          output += `/* Background surface medium κλάση */\n`;
          output += `.layera-bg-surface-medium {\n`;
          output += `  background-color: ${bgSurfaceMedium.value};\n`;
          output += `}\n\n`;
        }

        const bgAccentGreen = dictionary.allTokens.find(token => token.path.join('.') === 'bg.accent.green');
        if (bgAccentGreen && bgAccentGreen.value) {
          output += `/* Background accent green κλάση */\n`;
          output += `.layera-bg-accent-green {\n`;
          output += `  background-color: ${bgAccentGreen.value};\n`;
          output += `}\n\n`;
        }

        const bgAccentBlue = dictionary.allTokens.find(token => token.path.join('.') === 'bg.accent.blue');
        if (bgAccentBlue && bgAccentBlue.value) {
          output += `/* Background accent blue κλάση */\n`;
          output += `.layera-bg-accent-blue {\n`;
          output += `  background-color: ${bgAccentBlue.value};\n`;
          output += `}\n\n`;
        }

        const bgAccentPurple = dictionary.allTokens.find(token => token.path.join('.') === 'bg.accent.purple');
        if (bgAccentPurple && bgAccentPurple.value) {
          output += `/* Background accent purple κλάση */\n`;
          output += `.layera-bg-accent-purple {\n`;
          output += `  background-color: ${bgAccentPurple.value};\n`;
          output += `}\n\n`;
        }

        return output;
      }
    }
  },
  source: [
    'src/domains/icons-core.json',
    'src/domains/icons-advanced-interactive.json',
    'src/domains/icons-performance.json',
    'src/domains/icons-i18n.json',
    'src/domains/icons-ai-analytics.json',
    'src/domains/icons-security.json',
    'src/domains/typography-core.json',
    'src/domains/typography.json',
    'src/domains/color-core.json',
    'src/domains/color-semantic.json',
    'src/domains/color-utilities.json',
    'src/domains/i18n-utilities.json',
    'src/domains/spacing-dimensions.json',
    'src/domains/global-core.json',
    'src/domains/theme-colors.json',
    'src/domains/missing-tokens.json',
    'src/domains/missing-design-tokens.json',
    'src/domains/layout-system.json',
    'src/domains/spacing-unified.json',
    'src/domains/components-unified.json',
    'src/domains/theme-switcher-unified.json',
    'src/domains/responsive-unified.json',
    'src/domains/card-typography.json'
  ],
  platforms: {
    css: {
      // ΜΗΝ χρησιμοποιείς group
      transforms: ['attribute/cti', 'name/kebab-restore', 'color/css'],
      buildPath: 'dist/css/',
      prefix: 'layera',
      files: [{
        destination: 'tokens.css',
        format: 'css/variables-with-themes',
        options: { selector: ':root', outputReferences: true },
      }, {
        destination: 'utilities.css',
        format: 'css/enterprise-utilities',
        options: { prefix: 'layera' },
      }]
    },
    ts: {
      transformGroup: 'js',
      buildPath: 'dist/ts/',
      files: [
        {
          destination: 'index.ts',
          format: 'javascript/named-exports',
          },
        {
          destination: 'cssvars.ts',
          format: 'javascript/css-var-exports',
          options: { prefix: 'layera' },
          }
      ]
    }
  }
};