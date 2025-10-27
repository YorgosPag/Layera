const { ESLINT_LIMITS } = require('@layera/constants');

module.exports = {
  plugins: ["import"],
  rules: {
    "import/no-cycle": ["error", { maxDepth: Infinity }]
  },
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: ESLINT_LIMITS.ECMA_VERSION,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: ["@typescript-eslint", "react", "react-hooks", "import"],
  rules: {
    "no-magic-numbers": ["error", {
      ignore: [0, 1, -1],
      ignoreDefaultValues: true,
      ignoreArrayIndexes: true,
      enforceConst: true,
      detectObjects: true
    }],
    "no-restricted-syntax": ["error",
      {
        "selector": "Literal[value=\"admin\"]",
        "message": "Χρησιμοποίησε ROLE.ADMIN από @layera/constants"
      },
      {
        "selector": "Literal[value=\"broker\"]",
        "message": "Χρησιμοποίησε ROLE.BROKER από @layera/constants"
      },
      {
        "selector": "Literal[value=\"builder\"]",
        "message": "Χρησιμοποίησε ROLE.BUILDER από @layera/constants"
      },
      {
        "selector": "Literal[value=\"private\"]",
        "message": "Χρησιμοποίησε ROLE.PRIVATE από @layera/constants"
      },
      {
        "selector": "VariableDeclarator[id.name=\"ROLE\"]",
        "message": "Μην ορίζεις ROLE τοπικά. Εισήγαγε από @layera/constants"
      },
      {
        "selector": "VariableDeclarator[id.name=\"PIPELINE_STEP\"]",
        "message": "Μην ορίζεις PIPELINE_STEP τοπικά. Εισήγαγε από @layera/constants"
      }
    ],
    "import/no-cycle": ["error", { maxDepth: Infinity }],
    "max-lines": ["warn", {
      "max": ESLINT_LIMITS.MAX_LINES_PER_FILE,
      "skipBlankLines": true,
      "skipComments": true
    }],
    "max-lines-per-function": ["error", {
      "max": ESLINT_LIMITS.MAX_LINES_PER_FUNCTION,
      "skipBlankLines": true,
      "skipComments": true,
      "IIFEs": true
    }],
    "complexity": ["error", ESLINT_LIMITS.MAX_COMPLEXITY],
    "max-depth": ["error", ESLINT_LIMITS.MAX_DEPTH],
    "max-params": ["error", ESLINT_LIMITS.MAX_PARAMS],
    "max-statements": ["error", ESLINT_LIMITS.MAX_STATEMENTS],
    "react/prop-types": "off",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-unused-vars": "warn",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  },
  settings: {
    react: {
      version: "detect"
    }
  }
};