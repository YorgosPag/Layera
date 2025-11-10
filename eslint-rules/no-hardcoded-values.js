/**
 * 🚨 LAYERA CUSTOM ESLINT RULE: no-hardcoded-values
 *
 * Αποτρέπει hardcoded values σε React components
 * Εφαρμόζει enterprise standards για design tokens
 */

module.exports = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow hardcoded values in favor of design tokens',
      category: 'Best Practices',
      recommended: true,
    },
    fixable: null,
    schema: [], // No options
    messages: {
      hexColor: 'Hardcoded hex color "{{value}}" found. Use CSS variables like var(--la-color-primary)',
      rgbColor: 'Hardcoded RGB color "{{value}}" found. Use CSS variables like var(--la-color-primary)',
      cssUnit: 'Hardcoded CSS unit "{{value}}" found. Use design tokens from Style Dictionary',
      inlineStyle: 'Inline styles with hardcoded values are forbidden. Use utility classes or CSS variables',
      transitionTiming: 'Hardcoded transition timing "{{value}}" found. Use design tokens like var(--la-transition-normal)',
    },
  },

  create(context) {
    const sourceCode = context.getSourceCode();

    // Helper: Check if we're in allowed files
    function isInAllowedFile() {
      const filename = context.getFilename();
      const allowedPaths = [
        'tokens.css',
        'src/domains/',
        'config.ts', // Business logic timing allowed
      ];
      return allowedPaths.some(path => filename.includes(path));
    }

    // Helper: Check string/template literals for hardcoded values
    function checkStringValue(node, value) {
      if (isInAllowedFile()) return;

      // Hex colors
      const hexColorRegex = /#[0-9a-fA-F]{3,6}\b/g;
      const hexMatches = value.match(hexColorRegex);
      if (hexMatches) {
        hexMatches.forEach(match => {
          context.report({
            node,
            messageId: 'hexColor',
            data: { value: match },
          });
        });
      }

      // RGB/RGBA colors
      const rgbRegex = /rgba?\s*\(\s*\d+\s*,\s*\d+\s*,\s*\d+/g;
      const rgbMatches = value.match(rgbRegex);
      if (rgbMatches) {
        rgbMatches.forEach(match => {
          context.report({
            node,
            messageId: 'rgbColor',
            data: { value: match },
          });
        });
      }

      // CSS units (excluding SVG coordinates)
      const cssUnitRegex = /\b\d+\.?\d*(px|rem|em)\b/g;
      const unitMatches = value.match(cssUnitRegex);
      if (unitMatches && !value.includes('d=')) { // Exclude SVG paths
        unitMatches.forEach(match => {
          context.report({
            node,
            messageId: 'cssUnit',
            data: { value: match },
          });
        });
      }

      // Transition timings
      const transitionRegex = /\b\d+\.?\d*(s|ms)\b/g;
      const transitionMatches = value.match(transitionRegex);
      if (transitionMatches && !context.getFilename().includes('config.ts')) {
        transitionMatches.forEach(match => {
          context.report({
            node,
            messageId: 'transitionTiming',
            data: { value: match },
          });
        });
      }
    }

    // Helper: Check JSX style prop
    function checkStyleProp(node) {
      if (isInAllowedFile()) return;

      if (node.name && node.name.name === 'style') {
        const styleValue = sourceCode.getText(node.value);

        // Check για hardcoded values σε style objects
        if (styleValue.match(/\d+px|\d+rem|#[0-9a-fA-F]/)) {
          context.report({
            node,
            messageId: 'inlineStyle',
          });
        }
      }
    }

    return {
      // String literals
      Literal(node) {
        if (typeof node.value === 'string') {
          checkStringValue(node, node.value);
        }
      },

      // Template literals
      TemplateLiteral(node) {
        node.quasis.forEach(quasi => {
          if (quasi.value && quasi.value.raw) {
            checkStringValue(node, quasi.value.raw);
          }
        });
      },

      // JSX attributes (style prop check)
      JSXAttribute(node) {
        checkStyleProp(node);
      },

      // Object expressions (για inline styles)
      ObjectExpression(node) {
        if (isInAllowedFile()) return;

        // Check αν είναι style object
        const parent = node.parent;
        if (parent && parent.type === 'JSXExpressionContainer') {
          const grandParent = parent.parent;
          if (grandParent && grandParent.type === 'JSXAttribute' &&
              grandParent.name && grandParent.name.name === 'style') {

            node.properties.forEach(prop => {
              if (prop.type === 'Property' && prop.value) {
                const valueText = sourceCode.getText(prop.value);
                if (valueText.match(/['"`]\d+px['"`]|['"`]#[0-9a-fA-F]/)) {
                  context.report({
                    node: prop,
                    messageId: 'inlineStyle',
                  });
                }
              }
            });
          }
        }
      }
    };
  },
};