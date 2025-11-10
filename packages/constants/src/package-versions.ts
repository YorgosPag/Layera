/**
 * 📦 PACKAGE VERSIONS - ΜΟΝΑΔΙΚΗ ΠΗΓΗ ΑΛΗΘΕΙΑΣ
 *
 * Centralized version management για όλα τα @layera packages
 * Εξαλείφει διπλότυπα VERSION και BUILD_INFO exports
 */

// ========================================
// 🎯 CORE PACKAGE VERSIONS
// ========================================

export const PACKAGE_VERSIONS = {
  // Snap system packages
  SNAP_ENGINE: '1.0.0',
  SNAP_INTERACTIONS: '1.0.0',

  // Other core packages
  CONSTANTS: '1.0.0',
  ICONS: '1.0.0',
  LAYOUT: '1.0.0',
  CARDS: '1.0.0',
  BUTTONS: '1.0.0',
  TYPOGRAPHY: '1.0.0',
  FORMS: '1.0.0',
  THEME_SWITCHER: '1.0.0',
  TOLGEE: '1.0.0'
} as const;

// ========================================
// 🔍 BUILD INFORMATION FACTORY
// ========================================

export function createBuildInfo(packageName: keyof typeof PACKAGE_VERSIONS) {
  return {
    version: PACKAGE_VERSIONS[packageName],
    buildDate: new Date().toISOString(),
    package: packageName,
    buildNumber: process.env.BUILD_NUMBER || 'local',
    gitCommit: process.env.GIT_COMMIT || 'unknown'
  };
}

// ========================================
// 📊 SPECIFIC BUILD INFOS
// ========================================

export const SNAP_ENGINE_BUILD_INFO = {
  ...createBuildInfo('SNAP_ENGINE'),
  features: [
    'R-tree spatial indexing',
    'AutoCAD-style snap algorithms',
    'OSM geometry integration',
    'CAD file format support',
    'Coordinate system transformations',
    'Performance monitoring',
    'TypeScript strict typing'
  ]
};

export const SNAP_INTERACTIONS_BUILD_INFO = {
  ...createBuildInfo('SNAP_INTERACTIONS'),
  dependencies: {
    engine: `@layera/snap-engine@${PACKAGE_VERSIONS.SNAP_ENGINE}`,
    theme: '@layera/theme-switcher@workspace:*',
    tolgee: '@layera/tolgee@workspace:*',
    notifications: '@layera/notifications@workspace:*',
    buttons: '@layera/buttons@workspace:*',
    forms: '@layera/forms@workspace:*',
    cards: '@layera/cards@workspace:*',
    icons: '@layera/icons@workspace:*',
    typography: '@layera/typography@workspace:*',
    layout: '@layera/layout@workspace:*',
    loading: '@layera/loading@workspace:*',
    errorBoundary: '@layera/error-boundary@workspace:*',
    viewport: '@layera/viewport@workspace:*',
    constants: '@layera/constants@workspace:*'
  },
  features: [
    'React hooks για snap integration',
    'Visual snap indicators με theming support',
    'Interactive snap canvas με touch support',
    'Configurable snap settings panel',
    'Mobile-optimized snap toolbar',
    'Performance-aware rendering',
    'Accessibility compliant',
    'TypeScript strict typing',
    'Error boundary protection',
    'Internationalization support'
  ]
};

// ========================================
// 🎯 CONVENIENCE EXPORTS
// ========================================

export const VERSION = PACKAGE_VERSIONS.CONSTANTS;
export const BUILD_INFO = createBuildInfo('CONSTANTS');