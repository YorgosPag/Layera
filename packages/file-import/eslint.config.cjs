const tsparser = require('@typescript-eslint/parser');

module.exports = [
  {
    ignores: ['dist', 'node_modules']
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      parser: tsparser
    },
    rules: {
      'no-console': 'off',
      'no-unused-vars': 'off'
    }
  }
];