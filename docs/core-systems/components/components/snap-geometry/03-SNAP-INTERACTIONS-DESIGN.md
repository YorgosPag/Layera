# 🎨 SNAP-INTERACTIONS UI/UX DESIGN ARCHITECTURE

*Τελευταία ενημέρωση: 19 Οκτωβρίου 2025*
*Δημιουργός: Γιώργος Παγώνης - Επιβλέπων Αρχιτέκτονας*

---

## 🎯 **EXECUTIVE SUMMARY**

### **🌟 Vision Statement:**
> **"Το @layera/snap-interactions μετασχηματίζει τον ψυχρό computational engine σε ζεστή, intuitive user experience - δημιουργώντας το πιο natural και responsive snap interaction system για web GIS applications"**

### **🎪 User Experience Principles:**
1. **🧲 Magnetic Feel**: Το cursor "νιώθει" τη γεωμετρία σαν μαγνήτης
2. **👁️ Visual Clarity**: Κάθε snap possibility είναι αμέσως αναγνωρίσιμη
3. **⚡ Instant Feedback**: Zero latency visual response σε κάθε κίνηση
4. **🎮 Gamified Experience**: Snap success νιώθεται σαν gaming achievement
5. **♿ Universal Access**: Πλήρη accessibility για όλους τους χρήστες

---

## 🧩 **EXISTING LAYERA UI/UX ECOSYSTEM**

### **⚠️ CRITICAL: Υπάρχοντα UI Systems - ΜΗ ΑΝΑΔΗΜΙΟΥΡΓΗΣΗ**

```typescript
// 🚨 ΥΠΟΧΡΕΩΤΙΚΗ ΑΝΑΦΟΡΑ: UI/UX LEGO Systems που ΥΠΑΡΧΟΥΝ ήδη
// ΜΗΝ ΔΗΜΙΟΥΡΓΗΣΕΙΣ νέα UI components - χρησιμοποίησε τα existing

interface ExistingLayeraUIEcosystem {
  // 🎨 FOUNDATION UI SYSTEMS - ΥΠΑΡΧΟΥΝ ΗΔΗ
  foundationSystems: {
    '@layera/theme-switcher': {
      purpose: 'Dark/light theme management και CSS variables',
      usage: 'useTheme() hook για theme-aware snap indicator colors',
      api: 'ThemeProvider, useTheme, themeColors, switchTheme()',
      components: 'ThemeSwitcher component για settings UI',
      avoidReimplementing: 'Theme management, color systems, CSS variables'
    };

    '@layera/typography': {
      purpose: 'Typography scale, font weights, line heights',
      usage: 'Typography components για snap tooltips και labels',
      api: 'Text, Heading, Caption components',
      avoidReimplementing: 'Font systems, text styling, responsive typography'
    };

    '@layera/icons': {
      purpose: 'Consistent icon system με sizing και styling',
      usage: 'Icons για snap type indicators και UI controls',
      api: 'Icon component με name prop, icon variants',
      avoidReimplementing: 'Icon systems, SVG management, icon sizing'
    };

    '@layera/buttons': {
      purpose: 'Button variants (primary, secondary, icon, toggle)',
      usage: 'Button components για snap toggle controls',
      api: 'Button, IconButton, ToggleButton components',
      avoidReimplementing: 'Button styles, states, interactions'
    };

    '@layera/layout': {
      purpose: 'Grid system, spacing, responsive layouts',
      usage: 'Layout components για snap settings panels',
      api: 'Container, Grid, Stack, Spacer components',
      avoidReimplementing: 'Layout systems, responsive breakpoints'
    };

    '@layera/cards': {
      purpose: 'Card layouts με headers, content, actions',
      usage: 'Card components για organized snap settings',
      api: 'Card, CardHeader, CardContent, CardActions',
      avoidReimplementing: 'Card styles, elevation, borders'
    };
  };

  // 🔧 INTERACTION UI SYSTEMS - ΥΠΑΡΧΟΥΝ ΗΔΗ
  interactionSystems: {
    '@layera/forms': {
      purpose: 'Form controls με validation και state management',
      usage: 'Slider components για snap tolerance, toggles για snap types',
      api: 'Slider, Toggle, FormField, FormSection components',
      avoidReimplementing: 'Form controls, validation, input styling'
    };

    '@layera/modals': {
      purpose: 'Modal dialogs, overlays, popups',
      usage: 'Modal για advanced snap settings configuration',
      api: 'Modal, Dialog, Popup, Overlay components',
      avoidReimplementing: 'Modal systems, backdrop, focus management'
    };

    '@layera/notifications': {
      purpose: 'Toast notifications, alerts, status messages',
      usage: 'Notifications για snap engagement feedback',
      api: 'useNotification hook, toast(), showAlert()',
      avoidReimplementing: 'Notification systems, toast management'
    };

    '@layera/loading': {
      purpose: 'Loading states, spinners, progress indicators',
      usage: 'Loading states για snap calculation processing',
      api: 'LoadingSpinner, ProgressBar, LoadingOverlay',
      avoidReimplementing: 'Loading animations, progress indicators'
    };
  };

  // 🌐 INFRASTRUCTURE UI SYSTEMS - ΥΠΑΡΧΟΥΝ ΗΔΗ
  infrastructureSystems: {
    '@layera/i18n': {
      purpose: 'Internationalization με Greek/English support',
      usage: 'useLayeraTranslation για snap tooltips, labels, messages',
      api: 'useLayeraTranslation hook, t() function, TranslationProvider',
      avoidReimplementing: 'Translation systems, language switching'
    };

    '@layera/error-boundary': {
      purpose: 'Error boundaries και error handling UI',
      usage: 'ErrorBoundary wrap για snap interaction components',
      api: 'ErrorBoundary component, useErrorBoundary hook',
      avoidReimplementing: 'Error handling UI, crash recovery'
    };

    '@layera/viewport': {
      purpose: 'Responsive design και viewport management',
      usage: 'useViewport για mobile-optimized snap interactions',
      api: 'useViewport hook, responsive utilities',
      avoidReimplementing: 'Responsive logic, breakpoint management'
    };
  };
}
```

### **🎯 SNAP-INTERACTIONS INTEGRATION STRATEGY:**

```typescript
interface SnapInteractionsIntegrationPlan {
  // ✅ ΧΡΗΣΗ ΥΠΑΡΧΟΝΤΩΝ UI COMPONENTS
  // Αυτά ΥΠΑΡΧΟΥΝ - ΜΗΝ δημιουργήσεις νέα
  uiComponentUsage: {
    snapSettingsPanel: {
      container: '@layera/cards → Card component',
      toggles: '@layera/buttons → ToggleButton για snap type enables',
      sliders: '@layera/forms → Slider για tolerance adjustment',
      layout: '@layera/layout → Stack, Grid για organized layout',
      typography: '@layera/typography → Text για labels και descriptions'
    };

    snapTooltips: {
      container: '@layera/modals → Popup component',
      typography: '@layera/typography → Caption για tooltip text',
      theming: '@layera/theme-switcher → theme colors για tooltip styling'
    };

    snapFeedback: {
      notifications: '@layera/notifications → toast για snap status',
      loading: '@layera/loading → spinner για calculation states',
      icons: '@layera/icons → snap type indicator icons'
    };

    responsiveDesign: {
      viewport: '@layera/viewport → useViewport για mobile adaptations',
      layout: '@layera/layout → responsive containers'
    };
  };

  // 🆕 ΝΕΑ SNAP-SPECIFIC COMPONENTS
  // Μόνο αυτά θα δημιουργηθούν - όλα τα άλλα υπάρχουν
  newComponentsOnly: {
    'SnapCanvas': 'Canvas element για snap visualization (δεν υπάρχει)',
    'SnapCursor': 'Custom cursor behavior (δεν υπάρχει)',
    'SnapIndicator': 'Snap point visual glyphs (δεν υπάρχει)',
    'SnapAnimations': 'Snap-specific animation controllers (δεν υπάρχει)'
  };

  // 🚫 ΤΙ ΝΑ ΑΠΟΦΥΓΟΥΜΕ
  avoidReimplementing: {
    buttons: 'ΜΗΝ φτιάξεις custom buttons - χρήσε @layera/buttons',
    forms: 'ΜΗΝ φτιάξεις custom sliders - χρήσε @layera/forms',
    modals: 'ΜΗΝ φτιάξεις custom modals - χρήσε @layera/modals',
    cards: 'ΜΗΝ φτιάξεις custom cards - χρήσε @layera/cards',
    typography: 'ΜΗΝ φτιάξεις custom text - χρήσε @layera/typography',
    theming: 'ΜΗΝ hardcode colors - χρήσε @layera/theme-switcher',
    i18n: 'ΜΗΝ hardcode strings - χρήσε @layera/i18n',
    notifications: 'ΜΗΝ φτιάξεις custom toasts - χρήσε @layera/notifications'
  };
}
```

### **📝 Implementation Examples:**

```typescript
// ✅ ΣΩΣΤΗ ΧΡΗΣΗ - Leverage existing UI systems
import { Card, CardHeader, CardContent } from '@layera/cards';
import { Button, ToggleButton } from '@layera/buttons';
import { Slider, FormField } from '@layera/forms';
import { useTheme } from '@layera/theme-switcher';
import { useLayeraTranslation } from '@layera/i18n';
import { useNotification } from '@layera/notifications';

// SnapSettingsPanel που χρησιμοποιεί existing components
const SnapSettingsPanel = () => {
  const { theme } = useTheme();
  const { t } = useLayeraTranslation();
  const { toast } = useNotification();

  return (
    <Card>
      <CardHeader>
        <Text variant="heading">{t('snap.settings.title')}</Text>
      </CardHeader>
      <CardContent>
        <FormField label={t('snap.tolerance.label')}>
          <Slider min={1} max={50} value={tolerance} onChange={setTolerance} />
        </FormField>
        <ToggleButton
          active={endpointEnabled}
          onClick={() => toggleSnapType('endpoint')}
        >
          {t('snap.types.endpoint')}
        </ToggleButton>
      </CardContent>
    </Card>
  );
};

// ❌ ΛΑΘΟΣ - Deprecated Pattern
// Αυτό το pattern δεν πρέπει να χρησιμοποιείται πλέον

// ✅ ΣΩΣΤΟ - LEGO System// ✅ Import from @layera packages) => {} // ΜΗ το κάνεις - υπάρχει @layera/buttons
// const CustomSlider = () => {} // ΜΗ το κάνεις - υπάρχει @layera/forms
// // ✅ Import from @layera packages) => {}   // ΜΗ το κάνεις - υπάρχει @layera/cards
```

---

## 🧩 **COMPONENT ARCHITECTURE OVERVIEW**

### **📦 UI Component Hierarchy:**

```typescript
// @layera/snap-interactions Component Architecture
interface SnapInteractionsArchitecture {
  // 🎮 Core Interaction Layer - Primary user interface
  core: {
    snapCanvas: SnapCanvas;                 // Main interaction surface
    cursorManager: CursorManager;           // Smart cursor behavior
    visualFeedback: VisualFeedbackSystem;   // All visual indicators
    gestureHandler: GestureHandler;         // Touch/mouse/keyboard input
  };

  // 🎨 Visual Components - Snap feedback elements
  visual: {
    snapIndicators: SnapIndicatorRenderer;  // Snap point glyphs
    snapCursor: SmartSnapCursor;           // Adaptive cursor
    snapHighlights: GeometryHighlighter;   // Highlighted target geometry
    snapAnimations: SnapAnimationSystem;   // Smooth transitions
    snapTooltips: SnapTooltipManager;      // Contextual information
  };

  // ⚙️ Configuration UI - User settings interface
  configuration: {
    snapSettings: SnapSettingsPanel;        // User preference controls
    snapToggles: SnapTypeToggles;          // Enable/disable snap types
    toleranceSlider: ToleranceSlider;      // Snap distance control
    visualSettings: VisualSettingsPanel;   // Appearance customization
  };

  // 🎯 Accessibility Layer - Universal access features
  accessibility: {
    keyboardNavigation: KeyboardSnapHandler;
    screenReaderSupport: ScreenReaderInterface;
    highContrastMode: HighContrastRenderer;
    hapticFeedback: HapticFeedbackManager;
  };

  // 📱 Mobile Optimization - Touch-optimized interactions
  mobile: {
    touchGestures: TouchGestureHandler;
    mobileCursor: MobileCursorManager;
    touchFeedback: TouchFeedbackSystem;
    mobileSettings: MobileSettingsUI;
  };
}
```

---

## 🎮 **CORE INTERACTION SYSTEM**

### **🖱️ Smart Cursor Management:**

```typescript
interface CursorManager {
  // Cursor state management
  cursorStates: {
    normal: NormalCursorState;             // Standard cursor
    hovering: HoveringSnapState;           // Near snap targets
    snapping: ActiveSnapState;             // Actively snapped
    dragging: DraggingSnapState;           // Dragging with snap
    disabled: DisabledSnapState;           // Snap temporarily off
  };

  // Cursor behavior configuration
  cursorBehavior: {
    magneticStrength: number;              // How "sticky" snaps feel
    transitionSpeed: number;               // ms για state transitions
    visualScale: number;                   // Cursor size multiplier
    pulseAnimation: boolean;               // Snap target pulsing
    trailEffect: boolean;                  // Motion trail visualization
  };

  // Advanced cursor features
  advancedFeatures: {
    snapPreview: {
      enabled: boolean;
      showDistance: boolean;               // Distance to snap point
      showSnapType: boolean;               // Type indicator (endpoint, etc.)
      previewTime: number;                 // ms before showing preview
    };

    magneticArea: {
      enabled: boolean;
      visualizeArea: boolean;              // Show magnetic field
      dynamicResize: boolean;              // Area size based on zoom
      areaOpacity: number;                 // Magnetic field transparency
    };

    cursorMemory: {
      enabled: boolean;
      rememberLastSnap: boolean;           // Prefer previous snap type
      memoryDuration: number;              // ms to remember preferences
      adaptiveRadius: boolean;             // Learn user tolerance
    };
  };
}

// Smart cursor implementation
class SmartSnapCursor {
  private currentState: CursorState = CursorState.NORMAL;
  private magneticField: MagneticField;
  private animations: CursorAnimationController;

  updateCursorPosition(position: Point2D, snapResult: SnapResult): void {
    // Determine new cursor state
    const newState = this.determineCursorState(snapResult);

    // Handle state transitions με smooth animations
    if (newState !== this.currentState) {
      this.transitionToState(newState, snapResult);
    }

    // Update cursor visual appearance
    this.updateCursorVisuals(position, snapResult);

    // Update magnetic field visualization
    this.updateMagneticField(position, snapResult);
  }

  private determineCursorState(snapResult: SnapResult): CursorState {
    if (!snapResult.snapPoint) return CursorState.NORMAL;

    const distance = snapResult.snapPoint.confidence;
    if (distance > 0.9) return CursorState.SNAPPING;
    if (distance > 0.5) return CursorState.HOVERING;

    return CursorState.NORMAL;
  }

  private transitionToState(newState: CursorState, snapResult: SnapResult): void {
    const transition = this.createStateTransition(this.currentState, newState);

    // Execute smooth transition animation
    this.animations.executeTransition(transition, {
      duration: this.config.transitionSpeed,
      easing: 'ease-out',
      onComplete: () => {
        this.currentState = newState;
        this.emitStateChanged(newState, snapResult);
      }
    });
  }
}
```

### **👁️ Visual Feedback System:**

```typescript
interface VisualFeedbackSystem {
  // Primary visual elements
  snapIndicators: {
    glyphs: SnapGlyphRenderer;             // Icon symbols for snap types
    rings: SnapRingRenderer;               // Circular snap indicators
    crosshairs: SnapCrosshairRenderer;     // Precise positioning aids
    highlights: GeometryHighlighter;       // Target geometry emphasis
  };

  // Animation system
  animations: {
    snapEngagement: SnapEngagementAnimation;   // When snap activates
    snapRelease: SnapReleaseAnimation;         // When snap deactivates
    snapSuccess: SnapSuccessAnimation;         // When snap is used
    geometryPulse: GeometryPulseAnimation;     // Target geometry pulsing
  };

  // Visual themes
  themes: {
    autocad: AutoCADVisualTheme;           // AutoCAD-style indicators
    modern: ModernVisualTheme;             // Clean modern design
    gaming: GamingVisualTheme;             // Gamified visual style
    accessibility: AccessibilityTheme;     // High contrast, clear
  };

  // Performance optimization
  optimization: {
    levelOfDetail: VisualLODManager;       // Reduce complexity when zoomed out
    culling: VisualCullingSystem;          // Hide off-screen indicators
    batching: VisualBatchRenderer;         // Efficient rendering
    caching: VisualCacheManager;           // Cache rendered elements
  };
}

// Snap indicator rendering system
class SnapIndicatorRenderer {
  private theme: VisualTheme;
  private animationController: AnimationController;
  private canvas: HTMLCanvasElement;

  renderSnapIndicators(snapPoints: SnapPoint[], activeSnap: SnapPoint | null): void {
    this.clearCanvas();

    // Render all candidate snap points
    for (const snapPoint of snapPoints) {
      const isActive = snapPoint === activeSnap;
      this.renderSnapPoint(snapPoint, isActive);
    }

    // Render special effects για active snap
    if (activeSnap) {
      this.renderActiveSnapEffects(activeSnap);
    }
  }

  private renderSnapPoint(snapPoint: SnapPoint, isActive: boolean): void {
    const glyph = this.getSnapGlyph(snapPoint.type);
    const style = this.getSnapStyle(snapPoint.type, isActive);

    // Render glyph με appropriate styling
    this.drawGlyph(snapPoint.point, glyph, style);

    // Add animation effects
    if (isActive) {
      this.addActiveAnimations(snapPoint.point, style);
    }
  }

  private getSnapGlyph(snapType: SnapType): SnapGlyph {
    const glyphMap: Record<SnapType, SnapGlyph> = {
      [SnapType.ENDPOINT]: { symbol: '□', size: 8, shape: 'square' },
      [SnapType.MIDPOINT]: { symbol: '△', size: 8, shape: 'triangle' },
      [SnapType.CENTER]: { symbol: '○', size: 10, shape: 'circle' },
      [SnapType.INTERSECTION]: { symbol: '✕', size: 10, shape: 'cross' },
      [SnapType.PERPENDICULAR]: { symbol: '⊥', size: 8, shape: 'perpendicular' },
      [SnapType.TANGENT]: { symbol: '⌒', size: 8, shape: 'arc' },
      [SnapType.BUILDING_CORNER]: { symbol: '🏠', size: 12, shape: 'building' },
      [SnapType.GRID]: { symbol: '⊞', size: 6, shape: 'grid' }
    };

    return glyphMap[snapType] || glyphMap[SnapType.NEAREST];
  }
}
```

---

## 🎨 **VISUAL DESIGN SYSTEM**

### **🎯 Snap Indicator Design Language:**

```typescript
interface SnapVisualDesignSystem {
  // Color palette για different snap types
  colorPalette: {
    primary: {
      endpoint: 'var(--la-color-primary)',        // Vibrant orange για endpoints
      midpoint: 'var(--la-color-primary)',        // Teal για midpoints
      center: 'var(--la-color-primary)',          // Blue για centers
      intersection: 'var(--la-color-primary)',    // Light coral για intersections
      perpendicular: 'var(--la-color-primary)',   // Mint για perpendicular
      tangent: 'var(--la-color-primary)',         // Yellow για tangent
      building: 'var(--la-color-primary)',        // Purple για OSM buildings
      grid: 'var(--la-color-primary)'             // Gray για grid points
    };

    states: {
      candidate: 'rgba({color}, 0.6)',      // Semi-transparent για candidates
      active: 'rgba({color}, 1.0)',         // Full opacity για active snap
      hover: 'rgba({color}, 0.8)',          // Medium opacity για hover
      disabled: 'rgba(128, 128, 128, 0.4)'  // Gray για disabled
    };

    backgrounds: {
      snapRing: 'rgba(255, 255, 255, 0.9)', // White ring background
      tooltip: 'rgba(0, 0, 0, 0.8)',        // Dark tooltip background
      magneticField: 'rgba(100, 200, 255, 0.1)' // Light blue magnetic field
    };
  };

  // Typography για snap tooltips και labels
  typography: {
    tooltipFont: {
      family: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
      size: '12px';
      weight: '500';
      lineHeight: '1.4';
    };

    distanceFont: {
      family: 'Monaco, "Lucida Console", monospace';
      size: '10px';
      weight: '400';
      letterSpacing: '0.5px';
    };
  };

  // Animation curves και timing
  animations: {
    easing: {
      snapEngagement: 'cubic-bezier(0.34, 1.56, 0.64, 1)',    // Bouncy entrance
      snapRelease: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',    // Smooth exit
      magneticPull: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)', // Magnetic effect
      geometryHighlight: 'ease-in-out'                         // Gentle pulsing
    };

    durations: {
      snapEngagement: 200,        // ms για snap activation
      snapRelease: 150,           // ms για snap deactivation
      tooltipShow: 100,           // ms για tooltip appearance
      tooltipHide: 75,            // ms για tooltip disappearance
      geometryPulse: 1000,        // ms για one pulse cycle
      magneticTransition: 300     // ms για magnetic field changes
    };
  };
}
```

### **🎮 Interactive Animation System:**

```typescript
interface SnapAnimationSystem {
  // Core animation types
  animationTypes: {
    snapEngagement: SnapEngagementAnimation;
    snapSuccess: SnapSuccessAnimation;
    magneticPull: MagneticPullAnimation;
    geometryHighlight: GeometryHighlightAnimation;
    cursorMorph: CursorMorphAnimation;
  };

  // Animation orchestration
  animationOrchestrator: {
    simultaneousAnimations: Map<string, Animation>;
    animationQueue: AnimationQueue;
    performanceMonitor: AnimationPerformanceMonitor;

    // Smart animation management
    playAnimation(animation: Animation, priority: AnimationPriority): Promise<void>;
    stopAnimation(animationId: string): void;
    pauseAllAnimations(): void;
    resumeAllAnimations(): void;
  };
}

// Snap engagement animation implementation
class SnapEngagementAnimation {
  async play(snapPoint: SnapPoint, options: AnimationOptions): Promise<void> {
    const timeline = this.createAnimationTimeline();

    // Stage 1: Ring expansion (0-50ms)
    timeline.add({
      targets: snapPoint.visualElement,
      scale: [0, 1.2],
      opacity: [0, 0.8],
      duration: 50,
      easing: 'easeOutCubic'
    });

    // Stage 2: Ring settle (50-100ms)
    timeline.add({
      targets: snapPoint.visualElement,
      scale: [1.2, 1.0],
      opacity: [OPACITY.MEDIUM, OPACITY.FULL],
      duration: 50,
      easing: 'easeInCubic'
    }, 50);

    // Stage 3: Glyph appearance (75-125ms)
    timeline.add({
      targets: snapPoint.glyphElement,
      scale: [0, 1],
      opacity: [OPACITY.NONE, OPACITY.FULL],
      rotation: [0, 360],
      duration: 50,
      easing: 'easeOutBack'
    }, 75);

    // Stage 4: Magnetic field visualization (100-200ms)
    if (options.showMagneticField) {
      timeline.add({
        targets: snapPoint.magneticFieldElement,
        scale: [0, 1],
        opacity: [0, 0.3],
        duration: 100,
        easing: 'easeOutQuart'
      }, 100);
    }

    return timeline.play();
  }
}

// Magnetic pull animation
class MagneticPullAnimation {
  animateCursorPull(
    cursorPosition: Point2D,
    snapPoint: SnapPoint,
    strength: number
  ): void {
    const pullVector = this.calculatePullVector(cursorPosition, snapPoint.point, strength);
    const duration = this.calculatePullDuration(pullVector.magnitude);

    // Animate cursor position towards snap point
    this.animationController.animate({
      targets: this.cursorElement,
      x: cursorPosition.x + pullVector.x,
      y: cursorPosition.y + pullVector.y,
      duration,
      easing: 'easeOutQuart',
      onUpdate: (progress: number) => {
        this.updateMagneticFieldVisualization(progress, snapPoint);
      }
    });
  }

  private calculatePullVector(
    cursor: Point2D,
    snap: Point2D,
    strength: number
  ): Vector2D {
    const distance = Math.sqrt(
      Math.pow(snap.x - cursor.x, 2) + Math.pow(snap.y - cursor.y, 2)
    );

    const pullStrength = Math.min(strength * (1 / distance), 1);

    return {
      x: (snap.x - cursor.x) * pullStrength,
      y: (snap.y - cursor.y) * pullStrength,
      magnitude: distance * pullStrength
    };
  }
}
```

---

## 🎛️ **USER CONFIGURATION INTERFACE**

### **⚙️ Snap Settings Panel:**

```typescript
interface SnapSettingsPanel {
  // Main settings categories
  categories: {
    snapTypes: SnapTypeConfiguration;
    tolerance: ToleranceConfiguration;
    visual: VisualConfiguration;
    performance: PerformanceConfiguration;
    accessibility: AccessibilityConfiguration;
  };

  // Snap type toggles με advanced options
  snapTypeConfiguration: {
    endpoint: {
      enabled: boolean;
      tolerance: number;
      visualTheme: SnapTypeTheme;
      priority: number;
    };

    midpoint: {
      enabled: boolean;
      tolerance: number;
      visualTheme: SnapTypeTheme;
      subdivisionLevel: number;              // How many midpoints to show
    };

    intersection: {
      enabled: boolean;
      tolerance: number;
      visualTheme: SnapTypeTheme;
      calculateExtended: boolean;            // Extended intersections
    };

    osmBuilding: {
      enabled: boolean;
      tolerance: number;
      visualTheme: SnapTypeTheme;
      buildingTypes: OSMBuildingType[];      // Which building types to snap to
      cornerDetection: CornerDetectionConfig;
    };
  };

  // Global tolerance settings
  toleranceConfiguration: {
    globalTolerance: number;                 // pixels
    adaptiveToleranceEnabled: boolean;       // Auto-adjust based on zoom
    zoomFactorInfluence: number;            // How much zoom affects tolerance
    userLearningEnabled: boolean;           // Learn user preferences
    customTolerancePerType: Map<SnapType, number>;
  };

  // Visual customization options
  visualConfiguration: {
    theme: 'autocad' | 'modern' | 'gaming' | 'minimal';
    colorScheme: 'default' | 'colorblind' | 'high-contrast';
    animationLevel: 'none' | 'minimal' | 'normal' | 'enhanced';
    showTooltips: boolean;
    showDistances: boolean;
    showMagneticField: boolean;
    glyphSize: number;                      // Relative glyph size
  };
}

// React component για settings panel
const SnapSettingsPanel: React.FC<SnapSettingsPanelProps> = ({
  settings,
  onSettingsChange,
  onReset
}) => {
  const { t } = useLayeraTranslation();
  const [activeTab, setActiveTab] = useState<SettingsTab>('snapTypes');

  return (
    <div className="snap-settings-panel">
      <div className="settings-header">
        <h3>{t('snap.settings.title')}</h3>
        <button onClick={onReset} className="reset-button">
          {t('snap.settings.reset')}
        </button>
      </div>

      <div className="settings-tabs">
        <SettingsTab
          tab="snapTypes"
          active={activeTab === 'snapTypes'}
          onClick={() => setActiveTab('snapTypes')}
        >
          {t('snap.settings.tabs.snapTypes')}
        </SettingsTab>

        <SettingsTab
          tab="visual"
          active={activeTab === 'visual'}
          onClick={() => setActiveTab('visual')}
        >
          {t('snap.settings.tabs.visual')}
        </SettingsTab>

        <SettingsTab
          tab="performance"
          active={activeTab === 'performance'}
          onClick={() => setActiveTab('performance')}
        >
          {t('snap.settings.tabs.performance')}
        </SettingsTab>
      </div>

      <div className="settings-content">
        {activeTab === 'snapTypes' && (
          <SnapTypeSettings
            settings={settings.snapTypes}
            onChange={(snapTypeSettings) =>
              onSettingsChange({ ...settings, snapTypes: snapTypeSettings })
            }
          />
        )}

        {activeTab === 'visual' && (
          <VisualSettings
            settings={settings.visual}
            onChange={(visualSettings) =>
              onSettingsChange({ ...settings, visual: visualSettings })
            }
          />
        )}

        {activeTab === 'performance' && (
          <PerformanceSettings
            settings={settings.performance}
            onChange={(performanceSettings) =>
              onSettingsChange({ ...settings, performance: performanceSettings })
            }
          />
        )}
      </div>
    </div>
  );
};
```

---

## 📱 **MOBILE & TOUCH OPTIMIZATION**

### **👆 Touch Gesture System:**

```typescript
interface TouchGestureHandler {
  // Touch gesture recognition
  gestureRecognition: {
    tap: TouchTapGesture;                  // Single tap για snap selection
    doubleTap: TouchDoubleTapGesture;      // Double tap για snap engagement
    longPress: TouchLongPressGesture;      // Long press για context menu
    pinch: TouchPinchGesture;              // Pinch για zoom (affects tolerance)
    pan: TouchPanGesture;                  // Pan με snap assistance
  };

  // Touch-optimized snap behavior
  touchSnapBehavior: {
    increasedTolerance: number;            // Larger tolerance για touch
    pressureSupport: boolean;              // 3D Touch/Force Touch support
    hapticFeedback: boolean;               // Vibration on snap engagement
    touchPreview: boolean;                 // Preview before commitment
    gestureChaining: boolean;              // Chain gestures για complex operations
  };

  // Mobile-specific visual adaptations
  mobileVisualAdaptations: {
    largerGlyphs: boolean;                 // Bigger visual elements
    highContrastMode: boolean;             // Better visibility outdoors
    simplifiedAnimations: boolean;         // Reduce complexity για performance
    reducedVisualNoise: boolean;           // Fewer simultaneous indicators
  };
}

// Touch-optimized snap cursor
class MobileCursorManager {
  private touchState: TouchState;
  private hapticController: HapticController;

  handleTouchStart(event: TouchEvent): void {
    const touch = event.touches[0];
    const position = this.getTouchPosition(touch);

    // Start snap calculation με increased tolerance
    const snapRequest = this.createMobileSnapRequest(position);
    this.startSnapCalculation(snapRequest);

    // Visual feedback για touch start
    this.showTouchStartFeedback(position);
  }

  handleTouchMove(event: TouchEvent): void {
    const touch = event.touches[0];
    const position = this.getTouchPosition(touch);

    // Update snap calculation
    this.updateSnapCalculation(position);

    // Haptic feedback για snap engagement
    if (this.currentSnap && !this.previousSnap) {
      this.hapticController.lightImpact();
    }
  }

  handleTouchEnd(event: TouchEvent): void {
    // Commit snap if active
    if (this.currentSnap) {
      this.commitSnap(this.currentSnap);
      this.hapticController.successFeedback();
    }

    // Clean up touch state
    this.cleanupTouchState();
  }

  private createMobileSnapRequest(position: Point2D): SnapRequest {
    return {
      cursorPosition: position,
      snapTypes: this.getEnabledSnapTypes(),
      tolerance: this.config.mobileTolerance || this.config.tolerance * 1.5,
      isMobile: true,
      touchPressure: this.getTouchPressure(),
      devicePixelRatio: window.devicePixelRatio
    };
  }
}
```

---

## ♿ **ACCESSIBILITY ARCHITECTURE**

### **🎯 Universal Access Features:**

```typescript
interface AccessibilityFeatures {
  // Keyboard navigation support
  keyboardNavigation: {
    snapCycling: {
      nextSnap: 'Tab' | 'ArrowRight';
      previousSnap: 'Shift+Tab' | 'ArrowLeft';
      engageSnap: 'Enter' | 'Space';
      cancelSnap: 'Escape';
    };

    snapTypeToggling: {
      toggleEndpoint: 'E';
      toggleMidpoint: 'M';
      toggleIntersection: 'I';
      toggleAll: 'Shift+S';
    };

    toleranceAdjustment: {
      increaseTolerance: 'Plus' | 'Equal';
      decreaseTolerance: 'Minus';
      resetTolerance: 'Digit0';
    };
  };

  // Screen reader integration
  screenReaderSupport: {
    snapAnnouncements: {
      snapFound: (snapType: SnapType, distance: number) => string;
      snapEngaged: (snapType: SnapType, coordinates: Point2D) => string;
      snapReleased: () => string;
      noSnapsAvailable: () => string;
    };

    contextualInformation: {
      announceSnapTypes: boolean;
      announceDistances: boolean;
      announceCoordinates: boolean;
      announceGeometryInfo: boolean;
    };

    ariaLabels: {
      snapCanvas: string;
      snapIndicator: (snapType: SnapType) => string;
      snapSettings: string;
      toleranceSlider: string;
    };
  };

  // High contrast και visual accessibility
  visualAccessibility: {
    highContrastMode: {
      enabled: boolean;
      contrastRatio: number;               // WCAG AA compliance
      colorPalette: HighContrastColorPalette;
      animationReduction: boolean;
    };

    colorBlindSupport: {
      deuteranopia: ColorBlindPalette;
      protanopia: ColorBlindPalette;
      tritanopia: ColorBlindPalette;
      monochrome: ColorBlindPalette;
    };

    lowVisionSupport: {
      largeGlyphs: boolean;
      thickOutlines: boolean;
      reducedAnimations: boolean;
      simplifiedVisuals: boolean;
    };
  };

  // Motor accessibility
  motorAccessibility: {
    reducedPrecisionMode: {
      enabled: boolean;
      increasedTolerance: number;
      magneticAssistance: boolean;
      autoSnap: boolean;                   // Automatic snap engagement
    };

    dwellTime: {
      enabled: boolean;
      duration: number;                    // ms to dwell για snap engagement
      visualCountdown: boolean;
      cancelOnMove: boolean;
    };

    stickyDrag: {
      enabled: boolean;
      engagementThreshold: number;
      disengagementThreshold: number;
    };
  };
}

// Screen reader integration implementation
class ScreenReaderInterface {
  private announcer: LiveRegionAnnouncer;
  private lastAnnouncement: string = '';

  announceSnapFound(snapResult: SnapResult): void {
    if (!snapResult.snapPoint) return;

    const snapType = this.getSnapTypeDescription(snapResult.snapPoint.type);
    const distance = Math.round(snapResult.performance.distanceToSnap);
    const coordinates = this.formatCoordinates(snapResult.snapPoint.point);

    const message = this.t('snap.accessibility.snapFound', {
      type: snapType,
      distance,
      coordinates
    });

    this.announceIfDifferent(message);
  }

  announceSnapEngaged(snapPoint: SnapPoint): void {
    const snapType = this.getSnapTypeDescription(snapPoint.type);
    const coordinates = this.formatCoordinates(snapPoint.point);

    const message = this.t('snap.accessibility.snapEngaged', {
      type: snapType,
      coordinates
    });

    this.announcer.announce(message, 'assertive');
  }

  private announceIfDifferent(message: string): void {
    if (message !== this.lastAnnouncement) {
      this.announcer.announce(message, 'polite');
      this.lastAnnouncement = message;
    }
  }

  private getSnapTypeDescription(snapType: SnapType): string {
    const descriptions: Record<SnapType, string> = {
      [SnapType.ENDPOINT]: this.t('snap.types.endpoint'),
      [SnapType.MIDPOINT]: this.t('snap.types.midpoint'),
      [SnapType.CENTER]: this.t('snap.types.center'),
      [SnapType.INTERSECTION]: this.t('snap.types.intersection'),
      [SnapType.PERPENDICULAR]: this.t('snap.types.perpendicular'),
      [SnapType.TANGENT]: this.t('snap.types.tangent'),
      [SnapType.BUILDING_CORNER]: this.t('snap.types.buildingCorner'),
      [SnapType.GRID]: this.t('snap.types.grid'),
      [SnapType.NEAREST]: this.t('snap.types.nearest')
    };

    return descriptions[snapType] || this.t('snap.types.unknown');
  }
}
```

---

## 🎮 **REACT HOOKS ARCHITECTURE**

### **🪝 Primary Snap Interaction Hook:**

```typescript
// Main hook για snap interactions
export function useSnapInteractions(options: UseSnapInteractionsOptions = {}): UseSnapInteractionsReturn {
  const {
    snapEngine,
    enabled = true,
    onSnapEngaged,
    onSnapReleased,
    onSnapChanged,
    settings = defaultSnapSettings
  } = options;

  // Core state management
  const [currentSnap, setCurrentSnap] = useState<SnapPoint | null>(null);
  const [allSnaps, setAllSnaps] = useState<SnapPoint[]>([]);
  const [isSnapping, setIsSnapping] = useState(false);
  const [cursorPosition, setCursorPosition] = useState<Point2D>({ x: 0, y: 0 });

  // Visual feedback systems
  const visualFeedback = useSnapVisualFeedback();
  const cursorManager = useSnapCursor();
  const animationController = useSnapAnimations();

  // Main snap calculation
  const calculateSnap = useCallback(async (position: Point2D) => {
    if (!enabled || !snapEngine) return;

    setCursorPosition(position);

    try {
      const snapRequest: SnapRequest = {
        cursorPosition: position,
        snapTypes: settings.enabledSnapTypes,
        tolerance: settings.tolerance,
        filters: settings.filters,
        minimumConfidence: settings.minimumConfidence
      };

      const result = await snapEngine.calculateSnap(snapRequest);

      // Update state
      setCurrentSnap(result.snapPoint);
      setAllSnaps(result.allCandidates);
      setIsSnapping(!!result.snapPoint);

      // Visual feedback
      visualFeedback.updateSnapIndicators(result.allCandidates, result.snapPoint);
      cursorManager.updateCursor(position, result);

      // Callbacks
      if (result.snapPoint !== currentSnap) {
        onSnapChanged?.(result.snapPoint, currentSnap);

        if (result.snapPoint && !currentSnap) {
          onSnapEngaged?.(result.snapPoint);
        } else if (!result.snapPoint && currentSnap) {
          onSnapReleased?.(currentSnap);
        }
      }

    } catch (error) {
      console.error('Snap calculation error:', error);
      setCurrentSnap(null);
      setAllSnaps([]);
      setIsSnapping(false);
    }
  }, [enabled, snapEngine, settings, currentSnap, onSnapEngaged, onSnapReleased, onSnapChanged]);

  // Mouse/touch event handlers
  const handleMouseMove = useCallback((event: MouseEvent) => {
    const position = getEventPosition(event);
    calculateSnap(position);
  }, [calculateSnap]);

  const handleTouchMove = useCallback((event: TouchEvent) => {
    if (event.touches.length === 1) {
      const position = getTouchPosition(event.touches[0]);
      calculateSnap(position);
    }
  }, [calculateSnap]);

  // Keyboard navigation support
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!enabled || allSnaps.length === 0) return;

    switch (event.code) {
      case 'Tab':
        event.preventDefault();
        const direction = event.shiftKey ? -1 : 1;
        cycleToNextSnap(direction);
        break;

      case 'Enter':
      case 'Space':
        event.preventDefault();
        if (currentSnap) {
          engageSnap(currentSnap);
        }
        break;

      case 'Escape':
        event.preventDefault();
        releaseSnap();
        break;
    }
  }, [enabled, allSnaps, currentSnap]);

  // Snap engagement functions
  const engageSnap = useCallback((snapPoint: SnapPoint) => {
    setIsSnapping(true);
    animationController.playSnapEngagement(snapPoint);
    onSnapEngaged?.(snapPoint);
  }, [animationController, onSnapEngaged]);

  const releaseSnap = useCallback(() => {
    if (currentSnap) {
      animationController.playSnapRelease(currentSnap);
      onSnapReleased?.(currentSnap);
    }
    setCurrentSnap(null);
    setIsSnapping(false);
  }, [currentSnap, animationController, onSnapReleased]);

  const cycleToNextSnap = useCallback((direction: number) => {
    if (allSnaps.length === 0) return;

    const currentIndex = currentSnap ? allSnaps.indexOf(currentSnap) : -1;
    const nextIndex = (currentIndex + direction + allSnaps.length) % allSnaps.length;
    const nextSnap = allSnaps[nextIndex];

    setCurrentSnap(nextSnap);
    cursorManager.animateToCursor(nextSnap.point);
    animationController.highlightSnap(nextSnap);
  }, [allSnaps, currentSnap, cursorManager, animationController]);

  return {
    // State
    currentSnap,
    allSnaps,
    isSnapping,
    cursorPosition,

    // Actions
    engageSnap,
    releaseSnap,
    cycleToNextSnap,

    // Event handlers
    handleMouseMove,
    handleTouchMove,
    handleKeyDown,

    // Controllers
    visualFeedback,
    cursorManager,
    animationController
  };
}

// Supporting hooks
export function useSnapVisualFeedback() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const renderer = useRef<SnapIndicatorRenderer>();

  const updateSnapIndicators = useCallback((
    allSnaps: SnapPoint[],
    activeSnap: SnapPoint | null
  ) => {
    if (renderer.current && canvasRef.current) {
      renderer.current.renderSnapIndicators(allSnaps, activeSnap);
    }
  }, []);

  return {
    canvasRef,
    updateSnapIndicators
  };
}

export function useSnapCursor() {
  const [cursorState, setCursorState] = useState<CursorState>(CursorState.NORMAL);

  const updateCursor = useCallback((position: Point2D, snapResult: SnapResult) => {
    // Update cursor based on snap state
    const newState = snapResult.snapPoint ? CursorState.SNAPPING : CursorState.NORMAL;
    setCursorState(newState);
  }, []);

  return {
    cursorState,
    updateCursor
  };
}
```

---

## 📊 **PERFORMANCE OPTIMIZATION**

### **⚡ Rendering Performance Strategy:**

```typescript
interface SnapRenderingOptimization {
  // Level of Detail (LOD) system
  lodSystem: {
    enabled: boolean;
    zoomThresholds: {
      hideComplexGlyphs: number;           // Zoom level to simplify glyphs
      hideSecondarySnaps: number;          // Zoom level to hide less important snaps
      hideAnimations: number;              // Zoom level to disable animations
      hideTooltips: number;                // Zoom level to hide tooltips
    };

    adaptiveComplexity: {
      enabled: boolean;
      performanceThreshold: number;        // FPS threshold για LOD triggers
      complexityReduction: number;         // Percentage to reduce complexity
      recoveryThreshold: number;           // FPS για returning to full complexity
    };
  };

  // Rendering batching
  batchRendering: {
    enabled: boolean;
    batchSize: number;                     // Max elements per batch
    frameDelayMs: number;                  // Delay between batches
    priorityQueue: RenderPriorityQueue;    // High-priority elements first
  };

  // Canvas optimization
  canvasOptimization: {
    useOffscreenCanvas: boolean;           // Offscreen rendering για complex elements
    enableImageBitmap: boolean;            // Use ImageBitmap για static elements
    pixelRatioOptimization: boolean;       // Optimize για device pixel ratio
    clearOptimization: boolean;            // Smart canvas clearing
  };

  // Memory management
  memoryManagement: {
    elementPooling: boolean;               // Reuse visual elements
    textureAtlas: boolean;                 // Combine glyph textures
    garbageCollectionHints: boolean;       // Hint GC at appropriate times
    weakReferences: boolean;               // Use WeakMap για caches
  };
}
```

---

*📝 **Final Note**: Αυτό το document καλύπτει την πλήρη UI/UX architecture για το @layera/snap-interactions. Το επόμενο document (04-IMPLEMENTATION-GUIDE.md) θα παρέχει step-by-step implementation instructions για developers.*

*🏗️ **Επιβλέπων Αρχιτέκτονας**: Γιώργος Παγώνης*
*📅 **Τελευταία Ενημέρωση**: 19 Οκτωβρίου 2025 - UI/UX Design Phase*