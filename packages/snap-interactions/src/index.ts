/**
 * 🎨 @layera/snap-interactions
 *
 * Interactive snap UI components και visual feedback system για Layera LEGO architecture
 *
 * Χρησιμοποιεί existing LEGO systems:
 * - @layera/theme-switcher για theming
 * - @layera/tolgee για internationalization
 * - @layera/notifications για user feedback
 * - @layera/buttons, @layera/forms, @layera/cards για UI components
 * - @layera/icons, @layera/typography, @layera/layout για styling
 *
 * @author Layera Team
 * @version 1.0.0
 */

// ========================================
// 🪝 REACT HOOKS
// ========================================

export {
  useSnapEngine,
  useCADSnap,
  useGISSnap,
  useMobileSnap,
  type UseSnapEngineOptions,
  type UseSnapEngineReturn
} from './hooks/useSnapEngine';

// ========================================
// 🎨 UI COMPONENTS
// ========================================

// Snap visualization components
export {
  SnapIndicator,
  SnapCursor,
  SnapGuidelines,
  type SnapIndicatorProps,
  type SnapCursorProps,
  type SnapGuidelinesProps
} from './components/SnapIndicator';

// Settings and configuration components
export {
  SnapSettingsPanel,
  SnapToolbar,
  type SnapSettingsPanelProps,
  type SnapToolbarProps
} from './components/SnapSettingsPanel';

// Interactive canvas component
export {
  SnapCanvas,
  CADSnapCanvas,
  GISSnapCanvas,
  MobileSnapCanvas,
  type SnapCanvasProps
} from './components/SnapCanvas';

// ========================================
// 🔧 UTILITY FUNCTIONS
// ========================================

/**
 * Creates snap-enabled drawing canvas με optimized settings
 */
export function createSnapCanvas(
  container: HTMLElement,
  options: {
    width: number;
    height: number;
    mode: 'cad' | 'gis' | 'mobile';
    theme?: 'light' | 'dark';
  }
) {
  // Factory function για programmatic canvas creation
  // This would return a configured SnapCanvas instance

  const { width, height, mode } = options;

  const defaultSettings = {
    cad: { tolerance: 5, showGuidelines: true },
    gis: { tolerance: 15, showGuidelines: false },
    mobile: { tolerance: 25, showGuidelines: false }
  };

  return {
    settings: defaultSettings[mode],
    container,
    dimensions: { width, height }
  };
}

/**
 * Validates snap component props για consistency
 */
export function validateSnapProps(props: Record<string, unknown>): {
  valid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Tolerance validation
  if (props.tolerance && (props.tolerance < 1 || props.tolerance > 100)) {
    errors.push('Tolerance must be between 1 and 100 pixels');
  }

  // Canvas dimensions validation
  if (props.width && props.width < 100) {
    warnings.push('Canvas width is very small, may affect usability');
  }

  if (props.height && props.height < 100) {
    warnings.push('Canvas height is very small, may affect usability');
  }

  // Performance warnings
  if (props.geometries && props.geometries.length > 1000) {
    warnings.push('Large number of geometries may impact performance');
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Default snap interaction configurations
 */
export const SNAP_INTERACTION_DEFAULTS = {
  CAD: {
    tolerance: 5,
    showSnapIndicators: true,
    showSnapGuidelines: true,
    showSnapCursor: true,
    animatedIndicators: true,
    enabledTypes: ['endpoint', 'midpoint', 'center', 'vertex', 'intersection']
  },
  GIS: {
    tolerance: 15,
    showSnapIndicators: true,
    showSnapGuidelines: false,
    showSnapCursor: true,
    animatedIndicators: false,
    enabledTypes: ['endpoint', 'vertex', 'nearest']
  },
  MOBILE: {
    tolerance: 25,
    showSnapIndicators: true,
    showSnapGuidelines: false,
    showSnapCursor: false,
    animatedIndicators: false,
    enabledTypes: ['endpoint', 'vertex']
  }
} as const;

/**
 * Performance optimization helpers
 */
export const SnapPerformanceUtils = {
  /**
   * Calculates optimal snap tolerance based on zoom level
   */
  calculateOptimalTolerance(zoomLevel: number, baselineZoom: number = 1): number {
    const scaleFactor = zoomLevel / baselineZoom;
    return Math.max(5, Math.min(50, 15 / scaleFactor));
  },

  /**
   * Determines if advanced snap features should be enabled based on performance
   */
  shouldEnableAdvancedFeatures(geometryCount: number, isMobile: boolean): boolean {
    if (isMobile) {
      return geometryCount < 500;
    }
    return geometryCount < 2000;
  },

  /**
   * Gets recommended snap types based on context
   */
  getRecommendedSnapTypes(
    context: 'cad' | 'gis' | 'mobile',
    performanceLevel: 'high' | 'medium' | 'low'
  ): string[] {
    const baseTypes = {
      cad: ['endpoint', 'midpoint', 'center', 'vertex'],
      gis: ['endpoint', 'vertex', 'nearest'],
      mobile: ['endpoint', 'vertex']
    };

    const advancedTypes = {
      cad: ['intersection', 'perpendicular', 'tangent'],
      gis: ['center', 'midpoint'],
      mobile: []
    };

    const base = baseTypes[context] || baseTypes.gis;

    if (performanceLevel === 'high') {
      return [...base, ...advancedTypes[context]];
    }

    return base;
  }
};

// ========================================
// 🎯 COMPONENT INTEGRATION HELPERS
// ========================================

/**
 * Higher-order component για snap functionality
 */
export function withSnapSupport<P extends object>(
  Component: React.ComponentType<P>
): React.ComponentType<P & { snapEnabled?: boolean; snapTolerance?: number }> {
  return (props) => {
    const { snapEnabled = true, snapTolerance = 10, ...componentProps } = props;

    // This would wrap the component with snap context
    // Implementation would provide snap functionality to wrapped component

    return React.createElement(Component, componentProps as P);
  };
}

/**
 * Context provider για snap settings across component tree
 */
export interface SnapContextValue {
  enabled: boolean;
  tolerance: number;
  enabledTypes: Set<string>;
  setEnabled: (enabled: boolean) => void;
  setTolerance: (tolerance: number) => void;
  toggleSnapType: (type: string, enabled: boolean) => void;
}

// Note: Full context implementation θα ήταν εδώ
// export const SnapContext = React.createContext<SnapContextValue | null>(null);
// export const useSnapContext = (): void => { ... };

// ========================================
// 📊 VERSION INFORMATION
// ========================================

export const VERSION = '1.0.0';
export const BUILD_INFO = {
  version: VERSION,
  buildDate: new Date().toISOString(),
  dependencies: {
    engine: '@layera/snap-engine@1.0.0',
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
// 🎯 DEFAULT EXPORT
// ========================================

export { useSnapEngine as default };