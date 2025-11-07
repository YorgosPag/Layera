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
            return `export const ${safeName} = '${token.value}' as const;`;
          })
          .join('\n');
      },
      'javascript/css-var-exports': ({dictionary, options}) => {
        const prefix = options.prefix ? `--${options.prefix}-` : '--';
        return dictionary.allTokens.map(token => {
          const kebab = token.path.join('-');
          return `export const ${token.name}_var = 'var(${prefix}${kebab})' as const;`;
        }).join('\n');
      }
    }
  },
  source: ['packages/tokens/src/tokens.json'],
  platforms: {
    css: {
      // ΜΗΝ χρησιμοποιείς group
      transforms: ['attribute/cti', 'name/kebab-restore', 'color/css'],
      buildPath: 'packages/tokens/dist/css/',
      prefix: 'la',
      files: [{
        destination: 'tokens.css',
        format: 'css/variables',
        options: { selector: ':root', outputReferences: true },
        filter: 'exclude/direct'
      }]
    },
    ts: {
      transformGroup: 'js',
      buildPath: 'packages/tokens/dist/ts/',
      files: [
        {
          destination: 'index.ts',
          format: 'javascript/named-exports',
          filter: 'exclude/direct'
        },
        {
          destination: 'cssvars.ts',
          format: 'javascript/css-var-exports',
          options: { prefix: 'la' },
          filter: 'exclude/direct'
        }
      ]
    }
  }
};