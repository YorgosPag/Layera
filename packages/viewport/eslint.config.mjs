/**
 * ESLint Configuration - ARXES Compliant
 * @layera/viewport package
 */

import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  js.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        clearTimeout: 'readonly',
        setTimeout: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      // ARXES Required Rules
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/ban-ts-comment': 'error',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': ['error', { 'argsIgnorePattern': '^_', 'varsIgnorePattern': '^_' }],

      // No restricted imports
      'no-restricted-imports': ['error', {
        patterns: [
          { group: ['@/*'], message: 'Μην χρησιμοποιείς path alias @/.' },
          {
            group: ['**/*.css'],
            message: 'Δεν επιτρέπονται χειροκίνητα CSS αρχεία. Χρησιμοποίησε @layera/tokens/css.',
            allowTypeImports: false
          }
        ]
      }],

      // No restricted syntax
      'no-restricted-syntax': [
        'error',
        {
          selector: "JSXOpeningElement[name.name='div']",
          message: 'Χρησιμοποίησε semantic HTML αντί για <div>.'
        },
        {
          selector: "JSXAttribute[name.name='style']",
          message: 'Απαγορεύονται inline styles.'
        }
      ],

      // React rules
      'react/jsx-props-no-spreading': 'off',
      ...reactHooks.configs.recommended.rules,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
];