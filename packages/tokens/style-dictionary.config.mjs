/**
 * 🎯 Style Dictionary Config - Perfect 1:1 CSS Generation with --la-* prefix
 *
 * Generates CSS custom properties with exact same names and values
 * as the original tokens.css file using 'la' prefix.
 * Uses custom transform groups to prevent value transformation.
 */

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
      'javascript/named-exports': function({dictionary}) {
        return dictionary.allTokens
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
        const prefix = options.prefix || 'la';
        let output = `/**\n * LAYERA ENTERPRISE CSS UTILITIES\n * Auto-generated from Design Tokens\n * Μία πηγή αλήθειας για όλα τα styles\n */\n\n`;

        // Typography utilities
        const fontSizes = dictionary.allTokens.filter(token => token.path[0] === 'fontSize');
        if (fontSizes.length) {
          output += `/* Font Sizes */\n`;
          fontSizes.forEach(token => {
            const className = token.path.join('-');
            output += `.${prefix}-text-${className.replace('fontSize-', '')} { font-size: var(--${prefix}-${className}); }\n`;
          });
          output += '\n';
        }

        const fontWeights = dictionary.allTokens.filter(token => token.path[0] === 'fontWeight');
        if (fontWeights.length) {
          output += `/* Font Weights */\n`;
          fontWeights.forEach(token => {
            const className = token.path.join('-');
            output += `.${prefix}-font-${className.replace('fontWeight-', '')} { font-weight: var(--${prefix}-${className}); }\n`;
          });
          output += '\n';
        }

        const lineHeights = dictionary.allTokens.filter(token => token.path[0] === 'lineHeight');
        if (lineHeights.length) {
          output += `/* Line Heights */\n`;
          lineHeights.forEach(token => {
            const className = token.path.join('-');
            output += `.${prefix}-leading-${className.replace('lineHeight-', '')} { line-height: var(--${prefix}-${className}); }\n`;
          });
          output += '\n';
        }

        // Text colors
        const textColors = dictionary.allTokens.filter(token => token.path[0] === 'text' || (token.path[0] === 'color' && token.path[1] === 'text'));
        if (textColors.length) {
          output += `/* Text Colors */\n`;
          textColors.forEach(token => {
            const path = token.path.join('-');
            if (path.startsWith('text-')) {
              output += `.${prefix}-${path} { color: var(--${prefix}-${path}); }\n`;
            } else if (path.startsWith('color-text-')) {
              const shortName = path.replace('color-text-', 'text-');
              output += `.${prefix}-${shortName} { color: var(--${prefix}-${path}); }\n`;
            }
          });
          output += '\n';
        }

        // Background colors
        const bgColors = dictionary.allTokens.filter(token => token.path[0] === 'color' && token.path[1] === 'background');
        if (bgColors.length) {
          output += `/* Background Colors */\n`;
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
        output += `body {\n`;
        output += `  font-family: var(--${prefix}-global-fontFamily-system);\n`;
        output += `  margin: var(--${prefix}-global-reset-margin);\n`;
        output += `  padding: var(--${prefix}-global-reset-padding);\n`;
        output += `  color: var(--${prefix}-text-primary);\n`;
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
        output += `  color: var(--${prefix}-text-primary);\n`;
        output += `}\n\n`;
        output += `button {\n`;
        output += `  border-radius: var(--${prefix}-size-2);\n`;
        output += `  border: 1px solid transparent;\n`;
        output += `  padding: var(--${prefix}-size-4);\n`;
        output += `  font-size: var(--${prefix}-fontSize-base);\n`;
        output += `  font-weight: var(--${prefix}-fontWeight-medium);\n`;
        output += `  font-family: inherit;\n`;
        output += `  background-color: var(--${prefix}-bg-secondary);\n`;
        output += `  color: var(--${prefix}-text-primary);\n`;
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

        // Component utilities
        output += `/* Component Classes */\n`;
        output += `.${prefix}-card-accent-primary { border-left-color: var(--${prefix}-text-primary); }\n`;
        output += `.${prefix}-card-accent-green { border-left-color: var(--${prefix}-color-background-accent-green); }\n`;

        // Theme-aware background classes για cards
        output += `.${prefix}-bg-surface-medium { background-color: var(--${prefix}-color-background-surface-medium); }\n`;

        // Theme-aware text classes
        output += `.${prefix}-text-primary { color: var(--${prefix}-color-text-primary); }\n`;
        output += `.${prefix}-text-secondary { color: var(--${prefix}-color-text-secondary); }\n`;

        // Theme-aware card class
        output += `.${prefix}-card {\n`;
        output += `  padding: 1.5rem;\n`;
        output += `  border-radius: 0.5rem;\n`;
        output += `  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);\n`;
        output += `  background-color: var(--${prefix}-color-background-surface-medium);\n`;
        output += `}\n`;
        output += `.${prefix}-btn-primary {\n`;
        output += `  background-color: var(--${prefix}-text-primary);\n`;
        output += `  color: white;\n`;
        output += `  transition: opacity 0.25s ease;\n`;
        output += `}\n`;
        output += `.${prefix}-btn-primary:hover { opacity: 0.8; }\n`;
        output += `.${prefix}-form-input {\n`;
        output += `  width: 100%;\n`;
        output += `  padding: 0.5rem 1rem;\n`;
        output += `  border: 1px solid var(--${prefix}-color-border-default);\n`;
        output += `  border-radius: 0.5rem;\n`;
        output += `  transition: all 0.2s ease;\n`;
        output += `}\n`;
        output += `.${prefix}-form-input:focus {\n`;
        output += `  outline: none;\n`;
        output += `  box-shadow: 0 0 0 2px var(--${prefix}-text-primary);\n`;
        output += `  border-color: var(--${prefix}-text-primary);\n`;
        output += `}\n`;
        output += `.${prefix}-form-label {\n`;
        output += `  display: block;\n`;
        output += `  margin-bottom: 0.5rem;\n`;
        output += `}\n`;
        output += `.${prefix}-auth-card {\n`;
        output += `  max-width: 28rem;\n`;
        output += `  width: 100%;\n`;
        output += `  border-radius: 0.5rem;\n`;
        output += `  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);\n`;
        output += `  padding: 2rem;\n`;
        output += `}\n`;
        output += `.${prefix}-header {\n`;
        output += `  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);\n`;
        output += `  border-bottom: 1px solid var(--${prefix}-color-border-light);\n`;
        output += `}\n`;
        output += `.${prefix}-card {\n`;
        output += `  padding: 1.5rem;\n`;
        output += `  border-radius: 0.5rem;\n`;
        output += `  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);\n`;
        output += `}\n`;
        output += `.${prefix}-map-placeholder {\n`;
        output += `  height: 24rem;\n`;
        output += `  border-radius: 0.5rem;\n`;
        output += `  display: flex;\n`;
        output += `  align-items: center;\n`;
        output += `  justify-content: center;\n`;
        output += `}\n`;
        output += `.${prefix}-page-title {\n`;
        output += `  display: flex;\n`;
        output += `  align-items: center;\n`;
        output += `  justify-content: center;\n`;
        output += `  gap: 0.75rem;\n`;
        output += `}\n`;
        output += `.${prefix}-section-title {\n`;
        output += `  display: flex;\n`;
        output += `  align-items: center;\n`;
        output += `  gap: 0.5rem;\n`;
        output += `}\n`;
        output += `.${prefix}-mb-12 { margin-bottom: 3rem; }\n`;
        output += `.${prefix}-mb-8 { margin-bottom: 2rem; }\n`;
        output += `.${prefix}-mb-6 { margin-bottom: 1.5rem; }\n`;
        output += `.${prefix}-mb-4 { margin-bottom: 1rem; }\n`;
        output += `.${prefix}-mb-3 { margin-bottom: 0.75rem; }\n`;
        output += `.${prefix}-mb-2 { margin-bottom: 0.5rem; }\n`;
        output += `.${prefix}-mt-6 { margin-top: 1.5rem; }\n`;
        output += `.${prefix}-mt-8 { margin-top: 2rem; }\n`;

        // Text decoration utilities
        output += `.${prefix}-no-underline { text-decoration: none; }\n`;
        output += `.${prefix}-underline { text-decoration: underline; }\n`;

        // Color utilities
        output += `.${prefix}-text-white { color: white; }\n`;
        output += `.${prefix}-text-black { color: black; }\n`;

        // Transition utilities
        output += `.${prefix}-transition-opacity { transition: opacity 0.2s ease; }\n`;
        output += `.${prefix}-transition-all { transition: all 0.2s ease; }\n`;

        // Interactive states
        output += `.${prefix}-hover-opacity:hover { opacity: 0.8; }\n\n`;

        // Layout System Classes - Generated from layoutSystem tokens
        const layoutTokens = dictionary.allTokens.filter(token => token.path[0] === 'global' && token.path[1] === 'layoutSystem');
        if (layoutTokens.length) {
          output += `/* Layout System Classes */\n`;

          // Flex utilities
          output += `.layera-flex {\n`;
          output += `  display: var(--${prefix}-global-layoutSystem-flex-base);\n`;
          output += `}\n\n`;

          output += `.layera-flex--align-center {\n`;
          output += `  align-items: var(--${prefix}-global-layoutSystem-flex-alignCenter);\n`;
          output += `}\n\n`;

          output += `.layera-flex--space-between {\n`;
          output += `  justify-content: var(--${prefix}-global-layoutSystem-flex-spaceBetween);\n`;
          output += `}\n\n`;

          output += `.layera-flex--center {\n`;
          output += `  justify-content: var(--${prefix}-global-layoutSystem-flex-center);\n`;
          output += `  align-items: var(--${prefix}-global-layoutSystem-flex-center);\n`;
          output += `}\n\n`;

          output += `.layera-flex--gap-sm {\n`;
          output += `  gap: var(--${prefix}-global-layoutSystem-flex-gap-sm);\n`;
          output += `}\n\n`;

          output += `.layera-flex--gap-md {\n`;
          output += `  gap: var(--${prefix}-global-layoutSystem-flex-gap-md);\n`;
          output += `}\n\n`;

          output += `.layera-flex--gap-lg {\n`;
          output += `  gap: var(--${prefix}-global-layoutSystem-flex-gap-lg);\n`;
          output += `}\n\n`;

          output += `.layera-full-width {\n`;
          output += `  width: 100%;\n`;
          output += `}\n\n`;

          output += `.layera-padding--2xs {\n`;
          output += `  padding: var(--${prefix}-global-layoutSystem-padding-xs);\n`;
          output += `}\n\n`;

          output += `.layera-padding--sm {\n`;
          output += `  padding: var(--${prefix}-global-layoutSystem-padding-sm);\n`;
          output += `}\n\n`;

          output += `.layera-stack {\n`;
          output += `  display: flex;\n`;
          output += `  flex-direction: var(--${prefix}-global-layoutSystem-stack-direction);\n`;
          output += `  gap: var(--${prefix}-global-layoutSystem-stack-gap);\n`;
          output += `}\n\n`;

          output += `.layera-header {\n`;
          output += `  height: var(--${prefix}-global-layoutSystem-header-height);\n`;
          output += `  box-shadow: var(--${prefix}-global-layoutSystem-header-shadow);\n`;
          output += `  border-bottom: var(--${prefix}-global-layoutSystem-header-borderBottom);\n`;
          output += `  background-color: var(--${prefix}-color-background-primary);\n`;
          output += `}\n\n`;

          // Button utilities
          output += `.layera-nav-button {\n`;
          output += `  background-color: var(--${prefix}-global-layoutSystem-button-outline-background);\n`;
          output += `  border: var(--${prefix}-global-layoutSystem-button-outline-border);\n`;
          output += `  color: var(--${prefix}-text-primary);\n`;
          output += `  padding: var(--${prefix}-global-layoutSystem-button-outline-padding);\n`;
          output += `  border-radius: var(--${prefix}-global-layoutSystem-button-outline-borderRadius);\n`;
          output += `  display: flex;\n`;
          output += `  align-items: center;\n`;
          output += `  gap: var(--${prefix}-global-layoutSystem-button-outline-gap);\n`;
          output += `  font-size: var(--${prefix}-global-layoutSystem-button-outline-fontSize);\n`;
          output += `  font-weight: var(--${prefix}-global-layoutSystem-button-outline-fontWeight);\n`;
          output += `  transition: all 0.2s ease;\n`;
          output += `  cursor: pointer;\n`;
          output += `}\n\n`;

          output += `.layera-nav-button:hover {\n`;
          output += `  background-color: var(--${prefix}-color-background-surface-light);\n`;
          output += `  border-color: var(--${prefix}-text-primary);\n`;
          output += `  transform: translateY(-1px);\n`;
          output += `}\n\n`;

          output += `.layera-login-button {\n`;
          output += `  background-color: var(--${prefix}-global-layoutSystem-button-icon-background);\n`;
          output += `  border: var(--${prefix}-global-layoutSystem-button-icon-border);\n`;
          output += `  color: var(--${prefix}-text-primary);\n`;
          output += `  padding: var(--${prefix}-global-layoutSystem-button-icon-padding);\n`;
          output += `  border-radius: var(--${prefix}-global-layoutSystem-button-icon-borderRadius);\n`;
          output += `  display: flex;\n`;
          output += `  align-items: center;\n`;
          output += `  justify-content: center;\n`;
          output += `  width: var(--${prefix}-global-layoutSystem-button-icon-size);\n`;
          output += `  height: var(--${prefix}-global-layoutSystem-button-icon-size);\n`;
          output += `  transition: all 0.2s ease;\n`;
          output += `  cursor: pointer;\n`;
          output += `}\n\n`;

          output += `.layera-login-button:hover {\n`;
          output += `  background-color: var(--${prefix}-color-background-surface-light);\n`;
          output += `  transform: scale(1.05);\n`;
          output += `}\n\n`;

          // Theme switcher button
          output += `.layera-theme-switcher {\n`;
          output += `  background-color: var(--${prefix}-global-layoutSystem-button-themeSwitcher-background);\n`;
          output += `  border: none;\n`;
          output += `  color: var(--${prefix}-text-primary);\n`;
          output += `  padding: var(--${prefix}-global-layoutSystem-button-themeSwitcher-padding);\n`;
          output += `  border-radius: var(--${prefix}-global-layoutSystem-button-themeSwitcher-borderRadius);\n`;
          output += `  display: flex;\n`;
          output += `  align-items: center;\n`;
          output += `  justify-content: center;\n`;
          output += `  width: var(--${prefix}-global-layoutSystem-button-themeSwitcher-size);\n`;
          output += `  height: var(--${prefix}-global-layoutSystem-button-themeSwitcher-size);\n`;
          output += `  transition: var(--${prefix}-global-layoutSystem-button-themeSwitcher-transition);\n`;
          output += `  cursor: pointer;\n`;
          output += `}\n\n`;

          output += `.layera-theme-switcher:hover {\n`;
          output += `  background-color: var(--${prefix}-global-layoutSystem-button-themeSwitcher-hover-background);\n`;
          output += `  transform: var(--${prefix}-global-layoutSystem-button-themeSwitcher-hover-transform);\n`;
          output += `}\n\n`;

          // Map fullscreen class
          output += `.layera-map--fullscreen {\n`;
          output += `  width: 100% !important;\n`;
          output += `  height: 100% !important;\n`;
          output += `  position: absolute !important;\n`;
          output += `  top: 0 !important;\n`;
          output += `  left: 0 !important;\n`;
          output += `  right: 0 !important;\n`;
          output += `  bottom: 0 !important;\n`;
          output += `  z-index: 1 !important;\n`;
          output += `}\n\n`;

          // Map styling
          output += `/* Leaflet Map Styling */\n`;
          output += `.leaflet-container {\n`;
          output += `  width: 100% !important;\n`;
          output += `  height: 100% !important;\n`;
          output += `  z-index: var(--${prefix}-global-layoutSystem-map-zIndex);\n`;
          output += `}\n\n`;

          output += `.leaflet-tile-container {\n`;
          output += `  pointer-events: auto;\n`;
          output += `}\n\n`;

          output += `.leaflet-control-container {\n`;
          output += `  z-index: var(--${prefix}-global-layoutSystem-map-controls-zIndex);\n`;
          output += `}\n\n`;

          output += `.leaflet-control-zoom {\n`;
          output += `  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.65);\n`;
          output += `  border: none;\n`;
          output += `}\n\n`;
        }

        // Theme-specific CSS variables
        const lightTokens = dictionary.allTokens.filter(token => token.path[0] === 'color' && token.path[1] === 'light');
        const darkTokens = dictionary.allTokens.filter(token => token.path[0] === 'color' && token.path[1] === 'dark');

        if (lightTokens.length > 0 || darkTokens.length > 0) {
          output += `/* Theme Variables */\n`;

          // Light theme variables
          output += `:root.light {\n`;
          lightTokens.forEach(token => {
            const path = token.path.slice(2).join('-'); // Remove 'color.light' prefix
            output += `  --la-color-${path}: ${token.value};\n`;
          });
          // Add modal-specific variables για light theme
          output += `  --la-global-colors-surface-primary: #ffffff;\n`;
          output += `  --la-global-colors-surface-overlay: rgba(0, 0, 0, 0.5);\n`;
          output += `  --la-global-colors-transparent: transparent;\n`;
          output += `}\n\n`;

          // Dark theme variables
          output += `:root.dark {\n`;
          darkTokens.forEach(token => {
            const path = token.path.slice(2).join('-'); // Remove 'color.dark' prefix
            output += `  --la-color-${path}: ${token.value};\n`;
          });
          // Add modal-specific variables για dark theme
          output += `  --la-global-colors-surface-primary: #0f172a;\n`;
          output += `  --la-global-colors-surface-overlay: rgba(0, 0, 0, 0.8);\n`;
          output += `  --la-global-colors-transparent: transparent;\n`;
          output += `}\n\n`;

          // Default to light theme variables in :root
          output += `:root {\n`;
          lightTokens.forEach(token => {
            const path = token.path.slice(2).join('-'); // Remove 'color.light' prefix
            output += `  --la-color-${path}: ${token.value};\n`;
          });
          // Add modal-specific variables για default
          output += `  --la-global-colors-surface-primary: #ffffff;\n`;
          output += `  --la-global-colors-surface-overlay: rgba(0, 0, 0, 0.5);\n`;
          output += `  --la-global-colors-transparent: transparent;\n`;
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
    'src/domains/color-core.json',
    'src/domains/color-semantic.json',
    'src/domains/spacing-dimensions.json',
    'src/domains/global-core.json'
  ],
  platforms: {
    css: {
      // ΜΗΝ χρησιμοποιείς group
      transforms: ['attribute/cti', 'name/kebab-restore', 'color/css'],
      buildPath: 'dist/css/',
      prefix: 'la',
      files: [{
        destination: 'tokens.css',
        format: 'css/variables',
        options: { selector: ':root', outputReferences: true },
      }, {
        destination: 'utilities.css',
        format: 'css/enterprise-utilities',
        options: { prefix: 'la' },
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
          options: { prefix: 'la' },
          }
      ]
    }
  }
};