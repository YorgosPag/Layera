/**
 * Style Dictionary Configuration - 100 Token System
 * Generates CSS variables from the consolidated master-tokens-100.json
 */

const StyleDictionary = require('style-dictionary');

module.exports = {
  source: ['src/master-tokens-100.json'],

  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'dist/css/',
      files: [
        {
          destination: 'tokens-100.css',
          format: 'css/variables',
          options: {
            outputReferences: false,
            showFileHeader: true,
            fileHeader: () => [
              '/* AUTO-GENERATED: Layera Enterprise Token System v2.0.0 */',
              '/* 100 Consolidated Variables - DO NOT EDIT MANUALLY */',
              '/* Source: master-tokens-100.json */',
              '/* Generated: ' + new Date().toISOString() + ' */',
              '',
              ':root {'
            ]
          }
        }
      ]
    },

    // TypeScript definitions για type safety
    typescript: {
      transformGroup: 'js',
      buildPath: 'dist/ts/',
      files: [
        {
          destination: 'tokens-100.ts',
          format: 'typescript/es6-declarations',
          options: {
            showFileHeader: true,
            fileHeader: () => [
              '/**',
              ' * AUTO-GENERATED: Layera Enterprise Token Definitions',
              ' * 100 Consolidated Variables - DO NOT EDIT MANUALLY',
              ' * Source: master-tokens-100.json',
              ' * Generated: ' + new Date().toISOString(),
              ' */'
            ]
          }
        }
      ]
    },

    // JSON για documentation
    json: {
      transformGroup: 'js',
      buildPath: 'dist/json/',
      files: [
        {
          destination: 'tokens-100.json',
          format: 'json/flat',
          options: {
            showFileHeader: true
          }
        }
      ]
    }
  },

  // Custom transforms
  transform: {
    'css/variable-kebab': {
      type: 'name',
      transformer: (token) => {
        return '--layera-' + token.path.join('-').replace(/([A-Z])/g, '-$1').toLowerCase();
      }
    }
  }
};

// Custom format για organized CSS output
StyleDictionary.registerFormat({
  name: 'css/variables-organized',
  formatter: function(dictionary) {
    const categories = {
      colors: [],
      spacing: [],
      typography: [],
      layout: [],
      borders: [],
      shadows: [],
      icons: [],
      interactions: [],
      responsive: [],
      utilities: []
    };

    // Organize tokens by category
    dictionary.allTokens.forEach(token => {
      const category = token.path[1]; // layera.colors.primary.main -> colors
      if (categories[category]) {
        const cssVar = `  --layera-${token.path.slice(1).join('-')}: ${token.value};`;
        categories[category].push(cssVar);
      }
    });

    let output = `/* AUTO-GENERATED: Layera Enterprise Token System v2.0.0 */\n`;
    output += `/* 100 Consolidated Variables - DO NOT EDIT MANUALLY */\n`;
    output += `/* Source: master-tokens-100.json */\n`;
    output += `/* Generated: ${new Date().toISOString()} */\n\n`;
    output += `:root {\n`;

    // Output organized categories
    for (const [categoryName, tokens] of Object.entries(categories)) {
      if (tokens.length > 0) {
        output += `\n  /* ${categoryName.toUpperCase()} - ${tokens.length} variables */\n`;
        output += tokens.join('\n') + '\n';
      }
    }

    output += `}\n\n`;

    // Add summary comment
    output += `/* SUMMARY:\n`;
    output += ` * Total Variables: ${dictionary.allTokens.length}\n`;
    for (const [categoryName, tokens] of Object.entries(categories)) {
      if (tokens.length > 0) {
        output += ` * ${categoryName}: ${tokens.length} variables\n`;
      }
    }
    output += ` */\n`;

    return output;
  }
});

// Export για build script
module.exports.build = function() {
  console.log('🔄 Building 100-token CSS variables...');

  const sd = StyleDictionary.extend(module.exports);

  // Build CSS with organized format
  sd.buildPlatform('css');
  sd.buildPlatform('typescript');
  sd.buildPlatform('json');

  console.log('✅ Token build completed!');
  console.log('📁 Generated files:');
  console.log('   - dist/css/tokens-100.css');
  console.log('   - dist/ts/tokens-100.ts');
  console.log('   - dist/json/tokens-100.json');
};