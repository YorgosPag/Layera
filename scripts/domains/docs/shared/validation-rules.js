#!/usr/bin/env node

/**
 * 🛡️ ENTERPRISE VALIDATION RULES LIBRARY
 * Γιώργου Παγώνη - Documentation Domain Shared Library
 *
 * Κεντρική βιβλιοθήκη με όλους τους validation rules για documentation
 * Single Source of Truth για validation patterns
 */

/**
 * 🎯 LEGO SYSTEMS IMPORTS - Single Sources of Truth
 */
const LEGO_IMPORTS = {
  // Tier 1: Κρίσιμα Enterprise Systems
  buttons: "import { Button, IconButton, PrimaryButton, SecondaryButton } from '@layera/buttons';",
  icons: "import { HomeIcon, UserIcon, SettingsIcon, WorkIcon, TrashIcon, SearchIcon, EditIcon } from '@layera/icons';",
  layout: "import { AppShell, LayeraHeader, PageContainer, Flex, FlexColumn, Box } from '@layera/layout';",
  cards: "import { DashboardCard, BaseCard, InfoCard } from '@layera/cards';",
  constants: "import { SPACING_SCALE, BORDER_RADIUS_SCALE, Z_INDEX } from '@layera/constants';",

  // Tier 2: High-Frequency Systems
  typography: "import { Text, Heading } from '@layera/typography';",
  forms: "import { FormField, FormSection, Input, Select } from '@layera/forms';",
  tolgee: "import { useLayeraTranslation } from '@layera/tolgee';",

  // Design Tokens - ΜΟΝΑΔΙΚΗ ΠΗΓΗ ΑΛΗΘΕΙΑΣ
  tokens: "import '@layera/tokens/dist/tokens.css';"
};

/**
 * 🚫 FORBIDDEN PATTERNS - Enterprise Violations
 */
const FORBIDDEN_PATTERNS = [
  // CRITICAL: Hardcoded colors
  {
    name: 'hardcoded-colors',
    pattern: /#[0-9a-fA-F]{3,6}\b/g,
    replacement: "var(--la-color-primary)",
    description: "Hardcoded hex colors → design tokens",
    severity: "CRITICAL",
    category: "design-tokens"
  },

  // CRITICAL: Custom styled components
  {
    name: 'styled-components',
    pattern: /styled\.\w+`[^`]*`/g,
    replacement: "// ✅ Use @layera/components instead",
    description: "styled-components → LEGO components",
    severity: "CRITICAL",
    category: "components"
  },

  // HIGH: Custom component definitions
  {
    name: 'custom-components',
    pattern: /const\s+\w*(Button|Card|Icon|Modal|Form)\w*\s*=.*?=>/g,
    replacement: "// ✅ Import from @layera packages",
    description: "Custom components → LEGO imports",
    severity: "HIGH",
    category: "components"
  },

  // HIGH: Direct React imports (should use LEGO wrappers)
  {
    name: 'direct-react-imports',
    pattern: /import React.*from ['"']react['"'];?/g,
    replacement: "// ✅ Use LEGO system hooks instead",
    description: "Direct React imports → LEGO system",
    severity: "HIGH",
    category: "imports"
  },

  // MEDIUM: Custom CSS classes
  {
    name: 'custom-css-classes',
    pattern: /className=['"'][^'"]*custom[^'"]*['"']/g,
    replacement: 'className="la-component"',
    description: "Custom CSS classes → design system classes",
    severity: "MEDIUM",
    category: "styling"
  },

  // MEDIUM: Magic padding values
  {
    name: 'magic-padding',
    pattern: /padding:\s*['"']?\d+px['"']?/g,
    replacement: "padding: var(--la-space-md)",
    description: "Magic padding values → spacing scale",
    severity: "MEDIUM",
    category: "spacing"
  },

  // MEDIUM: Magic margin values
  {
    name: 'magic-margins',
    pattern: /margin:\s*['"']?\d+px['"']?/g,
    replacement: "margin: var(--la-space-md)",
    description: "Magic margin values → spacing scale",
    severity: "MEDIUM",
    category: "spacing"
  },

  // LOW: Inline pixel values
  {
    name: 'inline-pixels',
    pattern: /\b\d+px\b/g,
    replacement: "var(--la-space-*)",
    description: "Inline pixel values → design tokens",
    severity: "LOW",
    category: "spacing"
  }
];

/**
 * 🎯 DESIGN TOKENS PATTERNS
 */
const DESIGN_TOKEN_PATTERNS = {
  colors: {
    primary: 'var(--la-color-primary)',
    secondary: 'var(--la-color-secondary)',
    success: 'var(--la-color-success)',
    warning: 'var(--la-color-warning)',
    error: 'var(--la-color-error)',
    background: 'var(--la-color-background)',
    surface: 'var(--la-color-surface)',
    text: 'var(--la-color-text)'
  },
  spacing: {
    xs: 'var(--la-space-xs)',
    sm: 'var(--la-space-sm)',
    md: 'var(--la-space-md)',
    lg: 'var(--la-space-lg)',
    xl: 'var(--la-space-xl)',
    xxl: 'var(--la-space-xxl)'
  },
  radius: {
    sm: 'var(--la-radius-sm)',
    md: 'var(--la-radius-md)',
    lg: 'var(--la-radius-lg)',
    full: 'var(--la-radius-full)'
  },
  typography: {
    xs: 'var(--la-font-size-xs)',
    sm: 'var(--la-font-size-sm)',
    base: 'var(--la-font-size-base)',
    lg: 'var(--la-font-size-lg)',
    xl: 'var(--la-font-size-xl)',
    xxl: 'var(--la-font-size-xxl)'
  }
};

/**
 * 📦 PACKAGE VALIDATION RULES
 */
const PACKAGE_RULES = {
  requiredFiles: ['README.md', 'package.json', 'src/index.ts'],
  requiredSections: [
    '# Package Name',
    '## Installation',
    '## Usage',
    '## API Reference',
    '## Examples'
  ],
  forbiddenInPackages: [
    'hardcoded colors',
    'magic numbers',
    'custom implementations'
  ]
};

/**
 * 🔗 LINK VALIDATION RULES
 */
const LINK_RULES = {
  internal: {
    mustExist: true,
    allowedExtensions: ['.md', '.ts', '.tsx', '.js', '.jsx'],
    forbiddenPaths: ['node_modules', 'dist', 'build']
  },
  external: {
    allowedDomains: [
      'github.com',
      'npmjs.com',
      'typescript.org',
      'react.dev',
      'developer.mozilla.org'
    ],
    checkReachability: false, // Για CI/CD
    timeout: 5000
  }
};

/**
 * 📖 CODE EXAMPLES VALIDATION
 */
const CODE_EXAMPLE_RULES = {
  typescript: {
    mustCompile: true,
    strictMode: true,
    noImplicitAny: true,
    allowedImports: Object.keys(LEGO_IMPORTS)
  },
  javascript: {
    mustParse: true,
    noConsoleLog: true,
    preferConst: true
  },
  json: {
    mustParseValid: true,
    noComments: true
  }
};

/**
 * 🎨 TERMINOLOGY RULES
 */
const TERMINOLOGY_RULES = {
  consistent: {
    'GeoAlert': ['Geo Alert', 'geoalert', 'geo-alert'],
    'Layera': ['LAYERA', 'layera'],
    'TypeScript': ['Typescript', 'typescript', 'TS'],
    'JavaScript': ['Javascript', 'javascript', 'JS']
  },
  prohibited: [
    'TODO',
    'FIXME',
    'HACK',
    'XXX',
    'lorem ipsum'
  ],
  requiredTerms: [
    'enterprise',
    'LEGO system',
    'Single Source of Truth'
  ]
};

/**
 * 🏗️ ARCHITECTURE DECISION RECORDS (ADR) RULES
 */
const ADR_RULES = {
  template: {
    requiredSections: [
      '# Title',
      '## Status',
      '## Context',
      '## Decision',
      '## Consequences'
    ],
    statusValues: ['Proposed', 'Accepted', 'Deprecated', 'Superseded'],
    dateFormat: /\d{4}-\d{2}-\d{2}/
  },
  triggers: [
    'new architecture',
    'major refactor',
    'technology choice',
    'breaking change'
  ]
};

/**
 * 🎯 Validation Functions
 */

/**
 * Ελέγχει αν ένα pattern είναι forbidden
 * @param {string} content - Το περιεχόμενο
 * @param {string} category - Η κατηγορία (προαιρετικό)
 * @returns {Array} - Λίστα με violations
 */
function checkForbiddenPatterns(content, category = null) {
  const violations = [];
  const patterns = category
    ? FORBIDDEN_PATTERNS.filter(p => p.category === category)
    : FORBIDDEN_PATTERNS;

  patterns.forEach(rule => {
    let match;
    while ((match = rule.pattern.exec(content)) !== null) {
      violations.push({
        rule: rule.name,
        match: match[0],
        position: match.index,
        lineNumber: content.substring(0, match.index).split('\n').length,
        severity: rule.severity,
        description: rule.description,
        replacement: rule.replacement
      });
    }
    rule.pattern.lastIndex = 0; // Reset regex
  });

  return violations;
}

/**
 * Βαθμολογεί το compliance score
 * @param {Array} violations - Οι παραβιάσεις
 * @param {number} totalLines - Συνολικές γραμμές
 * @returns {Object} - Compliance score και breakdown
 */
function calculateComplianceScore(violations, totalLines) {
  const severityWeights = {
    CRITICAL: 10,
    HIGH: 5,
    MEDIUM: 2,
    LOW: 1
  };

  let totalWeight = 0;
  const severityBreakdown = { CRITICAL: 0, HIGH: 0, MEDIUM: 0, LOW: 0 };

  violations.forEach(violation => {
    const weight = severityWeights[violation.severity] || 1;
    totalWeight += weight;
    severityBreakdown[violation.severity]++;
  });

  // Score calculation (0-100%)
  const maxPossibleViolations = Math.max(totalLines * 0.1, 10); // 10% της γραμμών ή min 10
  const maxPossibleWeight = maxPossibleViolations * severityWeights.CRITICAL;
  const score = Math.max(0, Math.round(100 - (totalWeight / maxPossibleWeight) * 100));

  return {
    score,
    totalViolations: violations.length,
    totalWeight,
    severityBreakdown,
    level: score >= 95 ? 'GOLD' : score >= 80 ? 'SILVER' : score >= 60 ? 'BRONZE' : 'NEEDS_WORK'
  };
}

module.exports = {
  LEGO_IMPORTS,
  FORBIDDEN_PATTERNS,
  DESIGN_TOKEN_PATTERNS,
  PACKAGE_RULES,
  LINK_RULES,
  CODE_EXAMPLE_RULES,
  TERMINOLOGY_RULES,
  ADR_RULES,
  checkForbiddenPatterns,
  calculateComplianceScore
};