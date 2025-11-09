import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import react from 'eslint-plugin-react'
import tseslint from '@typescript-eslint/eslint-plugin'
import parser from '@typescript-eslint/parser'

export default [
  {
    ignores: ['dist', 'vite.config.ts', 'eslint.config.js']
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parser: parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    plugins: {
      '@typescript-eslint': tseslint,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'react': react,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      // 🚫 LAYERA ANTI-INLINE-STYLES RULE
      'react/forbid-dom-props': [
        'error',
        {
          forbid: [
            {
              propName: 'style',
              message: '🚫 ΑΠΑΓΟΡΕΥΟΝΤΑΙ ΤΑ INLINE STYLES! Χρησιμοποίησε Tailwind CSS classes με className. - Layera Design System Rule'
            }
          ]
        }
      ],

      // 🚫 LAYERA ANTI-ANY RULE - ΑΥΣΤΗΡΗ ΑΠΑΓΟΡΕΥΣΗ!
      '@typescript-eslint/no-explicit-any': 'error',
      // Απενεργοποιημένα rules για τώρα
      'no-undef': 'off',
      'no-unused-vars': 'off',
    },
  },
]