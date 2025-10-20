import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { SnapEngine } from '@layera/snap-engine';
import { useNotification } from '@layera/notifications';
import { useLayeraTranslation } from '@layera/i18n';
import { SNAP_CONSTANTS } from '@layera/constants';
import { useTheme } from '@layera/theme-switcher';
import { Icon } from '@layera/icons';
import { jsx, jsxs, Fragment } from 'react/jsx-runtime';
import { BaseCard } from '@layera/cards';
import { Button, ToggleButton } from '@layera/buttons';
import { FormSection, FormField, Slider } from '@layera/forms';
import { Heading, Text } from '@layera/typography';
import { Stack, Grid } from '@layera/layout';
import { useViewport } from '@layera/viewport';
import { ErrorBoundary } from '@layera/error-boundary';
import { LoadingSpinner } from '@layera/loading';

// src/hooks/useSnapEngine.ts
function useSnapEngine2(options = {}) {
  const { toast } = useNotification();
  const { t } = useLayeraTranslation();
  const [snapEngine, setSnapEngine] = useState(null);
  const [lastSnapResult, setLastSnapResult] = useState(null);
  const [isEnabled, setIsEnabledState] = useState(options.enabled ?? true);
  const [performanceMetrics, setPerformanceMetrics] = useState({
    searchTime: 0,
    indexTime: 0,
    totalTime: 0,
    geometryCount: 0,
    resultsCount: 0,
    memoryUsage: 0
  });
  const [isIndexing, setIsIndexing] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const optionsRef = useRef(options);
  optionsRef.current = options;
  useEffect(() => {
    try {
      const config = {
        tolerance: options.tolerance ?? SNAP_CONSTANTS.DEFAULT_TOLERANCE,
        enabledTypes: options.enabledTypes ?? /* @__PURE__ */ new Set(["endpoint", "midpoint", "center"]),
        priority: SNAP_CONSTANTS.DEFAULT_PRIORITIES,
        maxResults: SNAP_CONSTANTS.MAX_RESULTS,
        performanceLevel: "medium",
        debugMode: options.debugMode ?? false
      };
      const engine = new SnapEngine(config);
      engine.addEventListener("snap:found", (data) => {
        setLastSnapResult(data.result);
        optionsRef.current.onSnapFound?.(data.result);
        if (options.debugMode) {
          toast({
            type: "info",
            message: t("snap.feedback.found", { type: data.result.snapType }),
            duration: 1e3
          });
        }
      });
      engine.addEventListener("snap:lost", () => {
        setLastSnapResult(null);
        optionsRef.current.onSnapLost?.();
      });
      engine.addEventListener("snap:error", (data) => {
        console.error("Snap engine error:", data.error);
        optionsRef.current.onError?.(data.error);
        toast({
          type: "error",
          message: t("snap.errors.calculation_failed"),
          duration: 3e3
        });
      });
      engine.addEventListener("index:rebuilt", (data) => {
        setIsIndexing(false);
        setPerformanceMetrics((prev) => ({
          ...prev,
          geometryCount: data.geometryCount,
          indexTime: data.indexTime
        }));
        if (options.debugMode) {
          toast({
            type: "success",
            message: t("snap.feedback.index_rebuilt", { count: data.geometryCount }),
            duration: 2e3
          });
        }
      });
      setSnapEngine(engine);
      return () => {
        engine.dispose();
      };
    } catch (error) {
      console.error("Failed to initialize snap engine:", error);
      optionsRef.current.onError?.(error);
    }
  }, []);
  const snapToPoint = useCallback(async (cursor) => {
    if (!snapEngine) {
      return {
        target: null,
        snapped: false,
        distance: Infinity,
        cursor,
        snapPoint: cursor,
        snapType: null
      };
    }
    try {
      setIsCalculating(true);
      const result = await snapEngine.snapToPoint(cursor);
      const metrics = snapEngine.getPerformanceMetrics();
      setPerformanceMetrics(metrics);
      return result;
    } catch (error) {
      console.error("Snap calculation failed:", error);
      optionsRef.current.onError?.(error);
      return {
        target: null,
        snapped: false,
        distance: Infinity,
        cursor,
        snapPoint: cursor,
        snapType: null
      };
    } finally {
      setIsCalculating(false);
    }
  }, [snapEngine]);
  const addGeometry = useCallback((geometry) => {
    if (!snapEngine) return false;
    return snapEngine.addGeometry(geometry);
  }, [snapEngine]);
  const addGeometries = useCallback((geometries) => {
    if (!snapEngine) {
      return {
        searchTime: 0,
        indexTime: 0,
        totalTime: 0,
        geometryCount: 0,
        resultsCount: 0,
        memoryUsage: 0
      };
    }
    setIsIndexing(true);
    const metrics = snapEngine.addGeometries(geometries);
    setPerformanceMetrics(metrics);
    return metrics;
  }, [snapEngine]);
  const removeGeometry = useCallback((id) => {
    if (!snapEngine) return false;
    return snapEngine.removeGeometry(id);
  }, [snapEngine]);
  const clearGeometries = useCallback(() => {
    if (!snapEngine) return;
    snapEngine.clearGeometries();
    setLastSnapResult(null);
    setPerformanceMetrics({
      searchTime: 0,
      indexTime: 0,
      totalTime: 0,
      geometryCount: 0,
      resultsCount: 0,
      memoryUsage: 0
    });
  }, [snapEngine]);
  const updateConfig = useCallback((config) => {
    if (!snapEngine) return;
    snapEngine.updateConfiguration(config);
  }, [snapEngine]);
  const setEnabled = useCallback((enabled) => {
    setIsEnabledState(enabled);
    if (snapEngine) {
      snapEngine.setEnabled(enabled);
    }
    if (!enabled) {
      setLastSnapResult(null);
    }
  }, [snapEngine]);
  const setTolerance = useCallback((tolerance) => {
    if (!snapEngine) return;
    snapEngine.setTolerance(tolerance);
  }, [snapEngine]);
  const rebuildIndex = useCallback(() => {
    if (!snapEngine) {
      return {
        searchTime: 0,
        indexTime: 0,
        totalTime: 0,
        geometryCount: 0,
        resultsCount: 0,
        memoryUsage: 0
      };
    }
    setIsIndexing(true);
    const metrics = snapEngine.rebuildIndex();
    setPerformanceMetrics(metrics);
    setIsIndexing(false);
    return metrics;
  }, [snapEngine]);
  const isSnapped = useMemo(() => {
    return lastSnapResult?.snapped ?? false;
  }, [lastSnapResult]);
  return {
    // Core functionality
    snapEngine,
    snapToPoint,
    // State
    isEnabled,
    lastSnapResult,
    isSnapped,
    // Geometry management
    addGeometry,
    addGeometries,
    removeGeometry,
    clearGeometries,
    // Configuration
    updateConfig,
    setEnabled,
    setTolerance,
    // Performance & metrics
    performanceMetrics,
    rebuildIndex,
    // Loading states για @layera/loading integration
    isIndexing,
    isCalculating
  };
}
function useCADSnap(options = {}) {
  return useSnapEngine2({
    ...options,
    tolerance: options.tolerance ?? 5,
    enabledTypes: /* @__PURE__ */ new Set(["endpoint", "midpoint", "center", "vertex", "intersection"])
  });
}
function useGISSnap(options = {}) {
  return useSnapEngine2({
    ...options,
    tolerance: options.tolerance ?? 15,
    enabledTypes: /* @__PURE__ */ new Set(["endpoint", "vertex", "nearest"])
  });
}
function useMobileSnap(options = {}) {
  return useSnapEngine2({
    ...options,
    tolerance: options.tolerance ?? 25,
    enabledTypes: /* @__PURE__ */ new Set(["endpoint", "vertex"])
  });
}
var SNAP_ICONS = {
  endpoint: "square",
  midpoint: "triangle",
  center: "circle",
  vertex: "diamond",
  intersection: "cross",
  perpendicular: "perpendicular",
  tangent: "tangent",
  nearest: "target",
  grid: "grid",
  edge: "line"
};
var SNAP_COLORS = {
  light: {
    endpoint: "#ff6b6b",
    midpoint: "#4ecdc4",
    center: "#45b7d1",
    vertex: "#96ceb4",
    intersection: "#ffeaa7",
    perpendicular: "#dda0dd",
    tangent: "#98d8c8",
    nearest: "#f7dc6f",
    grid: "#bb8fce",
    edge: "#85c1e9"
  },
  dark: {
    endpoint: "#e74c3c",
    midpoint: "#1abc9c",
    center: "#3498db",
    vertex: "#2ecc71",
    intersection: "#f39c12",
    perpendicular: "#9b59b6",
    tangent: "#16a085",
    nearest: "#f1c40f",
    grid: "#8e44ad",
    edge: "#2980b9"
  }
};
var SnapIndicator = ({
  snapResult,
  visible,
  size = 16,
  animated = true,
  showTooltip = true,
  className = ""
}) => {
  const { theme } = useTheme();
  const { t } = useLayeraTranslation();
  if (!visible || !snapResult.snapped || !snapResult.target) {
    return null;
  }
  const { target, snapPoint, snapType } = snapResult;
  const iconName = SNAP_ICONS[snapType] || "circle";
  const colors = SNAP_COLORS[theme] || SNAP_COLORS.light;
  const color = colors[snapType] || colors.nearest;
  const indicatorStyle = {
    position: "absolute",
    left: snapPoint.x - size / 2,
    top: snapPoint.y - size / 2,
    width: size,
    height: size,
    pointerEvents: "none",
    zIndex: 1e4,
    borderRadius: "50%",
    backgroundColor: color,
    border: `2px solid ${theme === "dark" ? "#ffffff" : "#000000"}`,
    boxShadow: `0 0 8px ${color}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transform: animated ? "scale(1)" : "scale(1)",
    transition: animated ? "all 0.2s ease-in-out" : "none",
    animation: animated ? "snapPulse 0.6s ease-in-out" : "none"
  };
  const tooltipStyle = {
    position: "absolute",
    bottom: "100%",
    left: "50%",
    transform: "translateX(-50%)",
    marginBottom: "8px",
    padding: "4px 8px",
    backgroundColor: theme === "dark" ? "#2c3e50" : "#ecf0f1",
    color: theme === "dark" ? "#ecf0f1" : "#2c3e50",
    border: `1px solid ${theme === "dark" ? "#34495e" : "#bdc3c7"}`,
    borderRadius: "4px",
    fontSize: "12px",
    fontWeight: 500,
    whiteSpace: "nowrap",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    zIndex: 10001
  };
  const tooltipContent = showTooltip ? /* @__PURE__ */ jsxs("div", { style: tooltipStyle, children: [
    t(`snap.types.${snapType}`, { defaultValue: snapType }),
    target.metadata?.layer && /* @__PURE__ */ jsxs("div", { style: { fontSize: "10px", opacity: 0.8 }, children: [
      t("snap.layer"),
      ": ",
      target.metadata.layer
    ] })
  ] }) : null;
  return /* @__PURE__ */ jsxs("div", { style: indicatorStyle, className, children: [
    /* @__PURE__ */ jsx(
      Icon,
      {
        name: iconName,
        size: size * 0.6,
        color: theme === "dark" ? "#ffffff" : "#000000"
      }
    ),
    tooltipContent,
    /* @__PURE__ */ jsx("style", { children: `
        @keyframes snapPulse {
          0% {
            transform: scale(0.8);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.2);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      ` })
  ] });
};
var SnapCursor = ({
  snapResult,
  cursorPosition,
  visible,
  size = 24
}) => {
  const { theme } = useTheme();
  if (!visible) return null;
  const isSnapped = snapResult.snapped;
  const position = isSnapped ? snapResult.snapPoint : cursorPosition;
  const cursorStyle = {
    position: "absolute",
    left: position.x - size / 2,
    top: position.y - size / 2,
    width: size,
    height: size,
    pointerEvents: "none",
    zIndex: 9999,
    border: `2px solid ${isSnapped ? "#e74c3c" : theme === "dark" ? "#ecf0f1" : "#2c3e50"}`,
    borderRadius: "50%",
    backgroundColor: isSnapped ? "rgba(231, 76, 60, 0.2)" : "transparent",
    transition: "all 0.1s ease-out",
    transform: isSnapped ? "scale(1.2)" : "scale(1)"
  };
  return /* @__PURE__ */ jsx("div", { style: cursorStyle });
};
var SnapGuidelines = ({
  snapResult,
  cursorPosition,
  visible,
  showDistance = true
}) => {
  const { theme } = useTheme();
  const { t } = useLayeraTranslation();
  if (!visible || !snapResult.snapped || !snapResult.target) {
    return null;
  }
  const { snapPoint } = snapResult;
  const lineColor = theme === "dark" ? "#ecf0f1" : "#2c3e50";
  const lineStyle = {
    position: "absolute",
    left: Math.min(cursorPosition.x, snapPoint.x),
    top: Math.min(cursorPosition.y, snapPoint.y),
    width: Math.abs(snapPoint.x - cursorPosition.x),
    height: Math.abs(snapPoint.y - cursorPosition.y),
    pointerEvents: "none",
    zIndex: 9998,
    borderTop: `1px dashed ${lineColor}`,
    opacity: 0.6,
    transform: `rotate(${Math.atan2(
      snapPoint.y - cursorPosition.y,
      snapPoint.x - cursorPosition.x
    )}rad)`,
    transformOrigin: "left top"
  };
  const distance = Math.round(snapResult.distance);
  const midPointX = (cursorPosition.x + snapPoint.x) / 2;
  const midPointY = (cursorPosition.y + snapPoint.y) / 2;
  const distanceLabelStyle = {
    position: "absolute",
    left: midPointX,
    top: midPointY - 20,
    transform: "translateX(-50%)",
    padding: "2px 6px",
    backgroundColor: theme === "dark" ? "#2c3e50" : "#ecf0f1",
    color: theme === "dark" ? "#ecf0f1" : "#2c3e50",
    border: `1px solid ${theme === "dark" ? "#34495e" : "#bdc3c7"}`,
    borderRadius: "3px",
    fontSize: "11px",
    fontWeight: 500,
    pointerEvents: "none",
    zIndex: 1e4
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { style: lineStyle }),
    showDistance && distance > 5 && /* @__PURE__ */ jsxs("div", { style: distanceLabelStyle, children: [
      distance,
      "px"
    ] })
  ] });
};
var SNAP_TYPE_INFO = {
  endpoint: { icon: "square", priority: 100, description: "snap.types.endpoint.desc", category: "basic" },
  midpoint: { icon: "triangle", priority: 80, description: "snap.types.midpoint.desc", category: "basic" },
  center: { icon: "circle", priority: 90, description: "snap.types.center.desc", category: "basic" },
  vertex: { icon: "diamond", priority: 85, description: "snap.types.vertex.desc", category: "basic" },
  intersection: { icon: "cross", priority: 95, description: "snap.types.intersection.desc", category: "advanced" },
  perpendicular: { icon: "perpendicular", priority: 70, description: "snap.types.perpendicular.desc", category: "precision" },
  tangent: { icon: "tangent", priority: 65, description: "snap.types.tangent.desc", category: "precision" },
  nearest: { icon: "target", priority: 60, description: "snap.types.nearest.desc", category: "basic" },
  grid: { icon: "grid", priority: 50, description: "snap.types.grid.desc", category: "advanced" },
  edge: { icon: "line", priority: 75, description: "snap.types.edge.desc", category: "advanced" }
};
var SnapSettingsPanel = ({
  configuration,
  onConfigChange,
  onClose,
  compact = false,
  disabled = false
}) => {
  const { theme } = useTheme();
  const { t } = useLayeraTranslation();
  const { toast } = useNotification();
  const [activeCategory, setActiveCategory] = useState("basic");
  const handleToleranceChange = useCallback((value) => {
    onConfigChange({ tolerance: value });
    toast({
      type: "info",
      message: t("snap.settings.tolerance_changed", { value }),
      duration: 1500
    });
  }, [onConfigChange, toast, t]);
  const handleSnapTypeToggle = useCallback((type, enabled) => {
    const newEnabledTypes = new Set(configuration.enabledTypes);
    if (enabled) {
      newEnabledTypes.add(type);
    } else {
      newEnabledTypes.delete(type);
    }
    onConfigChange({ enabledTypes: newEnabledTypes });
    toast({
      type: enabled ? "success" : "info",
      message: t(`snap.settings.type_${enabled ? "enabled" : "disabled"}`, {
        type: t(`snap.types.${type}`)
      }),
      duration: 1500
    });
  }, [configuration.enabledTypes, onConfigChange, toast, t]);
  const handlePerformanceLevelChange = useCallback((level) => {
    onConfigChange({ performanceLevel: level });
    toast({
      type: "info",
      message: t("snap.settings.performance_changed", { level: t(`snap.performance.${level}`) }),
      duration: 2e3
    });
  }, [onConfigChange, toast, t]);
  const handleResetToDefaults = useCallback(() => {
    const defaultConfig = {
      tolerance: 10,
      enabledTypes: /* @__PURE__ */ new Set(["endpoint", "midpoint", "center"]),
      performanceLevel: "medium"
    };
    onConfigChange(defaultConfig);
    toast({
      type: "success",
      message: t("snap.settings.reset_success"),
      duration: 2e3
    });
  }, [onConfigChange, toast, t]);
  const renderSnapTypeToggle = (type) => {
    const info = SNAP_TYPE_INFO[type];
    const isEnabled = configuration.enabledTypes.has(type);
    return /* @__PURE__ */ jsx(
      FormField,
      {
        label: /* @__PURE__ */ jsxs(Stack, { direction: "row", spacing: 8, align: "center", children: [
          /* @__PURE__ */ jsx(Icon, { name: info.icon, size: 16 }),
          /* @__PURE__ */ jsx(Text, { variant: "body2", weight: "medium", children: t(`snap.types.${type}`) })
        ] }),
        description: compact ? void 0 : t(info.description),
        children: /* @__PURE__ */ jsx(
          ToggleButton,
          {
            active: isEnabled,
            disabled,
            onClick: () => handleSnapTypeToggle(type, !isEnabled),
            size: compact ? "small" : "medium",
            children: isEnabled ? t("common.enabled") : t("common.disabled")
          }
        )
      },
      type
    );
  };
  const renderCategorySection = (category) => {
    const types = Object.entries(SNAP_TYPE_INFO).filter(([, info]) => info.category === category).map(([type]) => type);
    if (types.length === 0) return null;
    return /* @__PURE__ */ jsx(
      FormSection,
      {
        title: t(`snap.categories.${category}`),
        collapsible: !compact,
        defaultExpanded: category === activeCategory,
        children: /* @__PURE__ */ jsx(Stack, { spacing: compact ? 8 : 12, children: types.map(renderSnapTypeToggle) })
      }
    );
  };
  const cardTitle = /* @__PURE__ */ jsxs(Stack, { direction: "row", spacing: 8, align: "center", children: [
    /* @__PURE__ */ jsx(Icon, { name: "settings", size: 20 }),
    /* @__PURE__ */ jsx(Heading, { level: compact ? 4 : 3, children: t("snap.settings.title") })
  ] });
  const cardActions = onClose ? /* @__PURE__ */ jsx(
    Button,
    {
      variant: "ghost",
      size: "small",
      onClick: onClose,
      disabled,
      children: /* @__PURE__ */ jsx(Icon, { name: "close", size: 16 })
    }
  ) : void 0;
  return /* @__PURE__ */ jsx(
    BaseCard,
    {
      title: cardTitle,
      actions: cardActions,
      className: compact ? "snap-settings-compact" : "snap-settings-full",
      children: /* @__PURE__ */ jsxs(Stack, { spacing: compact ? 16 : 24, children: [
        /* @__PURE__ */ jsx(FormSection, { title: t("snap.settings.tolerance.title"), children: /* @__PURE__ */ jsx(
          FormField,
          {
            label: t("snap.settings.tolerance.label"),
            description: !compact ? t("snap.settings.tolerance.description") : void 0,
            children: /* @__PURE__ */ jsxs(Stack, { spacing: 8, children: [
              /* @__PURE__ */ jsx(
                Slider,
                {
                  min: 1,
                  max: 50,
                  step: 1,
                  value: configuration.tolerance,
                  onChange: handleToleranceChange,
                  disabled,
                  showValue: true,
                  formatValue: (value) => `${value}px`
                }
              ),
              /* @__PURE__ */ jsx(Text, { variant: "caption", color: "muted", children: t("snap.settings.tolerance.current", { value: configuration.tolerance }) })
            ] })
          }
        ) }),
        /* @__PURE__ */ jsxs(FormSection, { title: t("snap.settings.types.title"), children: [
          !compact && /* @__PURE__ */ jsx(Stack, { direction: "row", spacing: 8, style: { marginBottom: 16 }, children: ["basic", "advanced", "precision"].map((category) => /* @__PURE__ */ jsx(
            Button,
            {
              variant: activeCategory === category ? "primary" : "outline",
              size: "small",
              onClick: () => setActiveCategory(category),
              disabled,
              children: t(`snap.categories.${category}`)
            },
            category
          )) }),
          compact ? (
            // Compact mode - show all in grid
            /* @__PURE__ */ jsx(Grid, { columns: 2, spacing: 8, children: Object.keys(SNAP_TYPE_INFO).map(
              (type) => renderSnapTypeToggle(type)
            ) })
          ) : (
            // Full mode - show by category
            /* @__PURE__ */ jsxs(Stack, { spacing: 16, children: [
              renderCategorySection("basic"),
              renderCategorySection("advanced"),
              renderCategorySection("precision")
            ] })
          )
        ] }),
        /* @__PURE__ */ jsx(FormSection, { title: t("snap.settings.performance.title"), children: /* @__PURE__ */ jsx(
          FormField,
          {
            label: t("snap.settings.performance.label"),
            description: !compact ? t("snap.settings.performance.description") : void 0,
            children: /* @__PURE__ */ jsx(Stack, { direction: "row", spacing: 8, children: ["low", "medium", "high"].map((level) => /* @__PURE__ */ jsx(
              Button,
              {
                variant: configuration.performanceLevel === level ? "primary" : "outline",
                size: compact ? "small" : "medium",
                onClick: () => handlePerformanceLevelChange(level),
                disabled,
                children: t(`snap.performance.${level}`)
              },
              level
            )) })
          }
        ) }),
        /* @__PURE__ */ jsxs(Stack, { direction: "row", spacing: 12, justify: "space-between", children: [
          /* @__PURE__ */ jsxs(
            Button,
            {
              variant: "outline",
              onClick: handleResetToDefaults,
              disabled,
              children: [
                /* @__PURE__ */ jsx(Icon, { name: "refresh", size: 16, style: { marginRight: 8 } }),
                t("snap.settings.reset_defaults")
              ]
            }
          ),
          !compact && /* @__PURE__ */ jsx(Stack, { direction: "row", spacing: 8, children: /* @__PURE__ */ jsx(Text, { variant: "caption", color: "muted", children: t("snap.settings.enabled_count", {
            count: configuration.enabledTypes.size
          }) }) })
        ] })
      ] })
    }
  );
};
var SnapToolbar = ({
  configuration,
  onConfigChange,
  onOpenSettings,
  enabled,
  onToggleEnabled
}) => {
  const { t } = useLayeraTranslation();
  const quickTypes = ["endpoint", "midpoint", "center", "vertex"];
  return /* @__PURE__ */ jsxs(Stack, { direction: "row", spacing: 8, align: "center", children: [
    /* @__PURE__ */ jsxs(
      ToggleButton,
      {
        active: enabled,
        onClick: () => onToggleEnabled(!enabled),
        variant: "primary",
        children: [
          /* @__PURE__ */ jsx(Icon, { name: "magnet", size: 16, style: { marginRight: 4 } }),
          t("snap.toolbar.snap")
        ]
      }
    ),
    enabled && quickTypes.map((type) => /* @__PURE__ */ jsx(
      ToggleButton,
      {
        active: configuration.enabledTypes.has(type),
        onClick: () => {
          const newTypes = new Set(configuration.enabledTypes);
          if (newTypes.has(type)) {
            newTypes.delete(type);
          } else {
            newTypes.add(type);
          }
          onConfigChange({ enabledTypes: newTypes });
        },
        size: "small",
        title: t(`snap.types.${type}`),
        children: /* @__PURE__ */ jsx(Icon, { name: SNAP_TYPE_INFO[type].icon, size: 14 })
      },
      type
    )),
    onOpenSettings && /* @__PURE__ */ jsx(
      Button,
      {
        variant: "ghost",
        size: "small",
        onClick: onOpenSettings,
        title: t("snap.toolbar.open_settings"),
        children: /* @__PURE__ */ jsx(Icon, { name: "settings", size: 16 })
      }
    ),
    /* @__PURE__ */ jsx(Stack, { direction: "row", spacing: 4, align: "center", children: /* @__PURE__ */ jsxs(Text, { variant: "caption", color: "muted", children: [
      configuration.tolerance,
      "px"
    ] }) })
  ] });
};
var SnapCanvas = ({
  width,
  height,
  geometries,
  onSnapResult,
  onGeometryAdd,
  onGeometrySelect,
  showSnapIndicators = true,
  showSnapGuidelines = true,
  showSnapCursor = true,
  snapEnabled = true,
  tolerance = 10,
  interactive = true,
  drawingMode = false,
  selectionMode = false,
  backgroundColor,
  className = "",
  style = {}
}) => {
  const { theme } = useTheme();
  const { isMobile } = useViewport();
  const {
    snapToPoint,
    addGeometries,
    clearGeometries,
    setEnabled,
    setTolerance,
    isIndexing
  } = useSnapEngine2({
    enabled: snapEnabled,
    tolerance,
    debugMode: false,
    onSnapFound: onSnapResult,
    onError: (error) => console.error("Snap canvas error:", error)
  });
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [canvasState, setCanvasState] = useState({
    cursorPosition: { x: 0, y: 0 },
    lastSnapResult: null,
    isDrawing: false,
    selectedGeometry: null,
    hoverGeometry: null
  });
  useEffect(() => {
    setEnabled(snapEnabled);
  }, [snapEnabled, setEnabled]);
  useEffect(() => {
    setTolerance(tolerance);
  }, [tolerance, setTolerance]);
  useEffect(() => {
    clearGeometries();
    if (geometries.length > 0) {
      addGeometries(geometries);
    }
  }, [geometries, clearGeometries, addGeometries]);
  const renderGeometries = useCallback((ctx) => {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = backgroundColor || (theme === "dark" ? "#2c3e50" : "#ecf0f1");
    ctx.fillRect(0, 0, width, height);
    geometries.forEach((geometry) => {
      renderGeometry(ctx, geometry);
    });
  }, [width, height, geometries, backgroundColor, theme]);
  const renderGeometry = useCallback((ctx, geometry) => {
    if (!geometry.visible) return;
    const isSelected = canvasState.selectedGeometry?.id === geometry.id;
    const isHovered = canvasState.hoverGeometry?.id === geometry.id;
    ctx.strokeStyle = isSelected ? "#e74c3c" : isHovered ? "#3498db" : theme === "dark" ? "#ecf0f1" : "#2c3e50";
    ctx.lineWidth = isSelected ? 3 : isHovered ? 2 : 1;
    ctx.fillStyle = geometry.layer === "osm_buildings" ? "rgba(52, 152, 219, 0.2)" : "transparent";
    switch (geometry.type) {
      case "line":
        const line = geometry.data;
        ctx.beginPath();
        ctx.moveTo(line.start.x, line.start.y);
        ctx.lineTo(line.end.x, line.end.y);
        ctx.stroke();
        break;
      case "circle":
        const circle = geometry.data;
        ctx.beginPath();
        ctx.arc(circle.center.x, circle.center.y, circle.radius, 0, 2 * Math.PI);
        ctx.stroke();
        if (ctx.fillStyle !== "transparent") {
          ctx.fill();
        }
        break;
      case "polyline":
      case "polygon":
        const polyline = geometry.data;
        if (polyline.vertices.length > 1) {
          ctx.beginPath();
          ctx.moveTo(polyline.vertices[0].x, polyline.vertices[0].y);
          for (let i = 1; i < polyline.vertices.length; i++) {
            ctx.lineTo(polyline.vertices[i].x, polyline.vertices[i].y);
          }
          if (polyline.closed) {
            ctx.closePath();
            if (ctx.fillStyle !== "transparent") {
              ctx.fill();
            }
          }
          ctx.stroke();
        }
        break;
      case "point":
        const point = geometry.data;
        ctx.beginPath();
        ctx.arc(point.position.x, point.position.y, 3, 0, 2 * Math.PI);
        ctx.fillStyle = ctx.strokeStyle;
        ctx.fill();
        break;
    }
  }, [canvasState.selectedGeometry, canvasState.hoverGeometry, theme]);
  const handleMouseMove = useCallback(async (e) => {
    if (!interactive || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCanvasState((prev) => ({
      ...prev,
      cursorPosition: { x, y }
    }));
    if (snapEnabled) {
      try {
        const snapResult = await snapToPoint({ x, y });
        setCanvasState((prev) => ({
          ...prev,
          lastSnapResult: snapResult
        }));
        onSnapResult?.(snapResult);
      } catch (error) {
        console.error("Snap calculation failed:", error);
      }
    }
    if (selectionMode) {
      const hoveredGeometry = findGeometryAtPoint({ x, y });
      setCanvasState((prev) => ({
        ...prev,
        hoverGeometry: hoveredGeometry
      }));
    }
  }, [interactive, snapEnabled, snapToPoint, onSnapResult, selectionMode]);
  const handleMouseClick = useCallback((e) => {
    if (!interactive) return;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (selectionMode) {
      const clickedGeometry = findGeometryAtPoint({ x, y });
      setCanvasState((prev) => ({
        ...prev,
        selectedGeometry: clickedGeometry
      }));
      if (clickedGeometry) {
        onGeometrySelect?.(clickedGeometry);
      }
    }
    if (drawingMode) {
      console.log("Drawing at:", { x, y });
    }
  }, [interactive, selectionMode, drawingMode, onGeometrySelect]);
  const findGeometryAtPoint = useCallback((point) => {
    for (const geometry of geometries) {
      if (isPointInGeometry(point, geometry)) {
        return geometry;
      }
    }
    return null;
  }, [geometries]);
  const isPointInGeometry = (point, geometry) => {
    const tolerance2 = 5;
    const bounds = geometry.bounds;
    return point.x >= bounds.minX - tolerance2 && point.x <= bounds.maxX + tolerance2 && point.y >= bounds.minY - tolerance2 && point.y <= bounds.maxY + tolerance2;
  };
  const handleTouchMove = useCallback((e) => {
    if (!isMobile || !interactive) return;
    e.preventDefault();
    const touch = e.touches[0];
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    touch.clientX - rect.left;
    touch.clientY - rect.top;
    handleMouseMove({
      clientX: touch.clientX,
      clientY: touch.clientY
    });
  }, [isMobile, interactive, handleMouseMove]);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    renderGeometries(ctx);
  }, [renderGeometries, canvasState.selectedGeometry, canvasState.hoverGeometry]);
  const containerStyle = {
    position: "relative",
    width,
    height,
    overflow: "hidden",
    cursor: interactive ? "crosshair" : "default",
    ...style
  };
  const canvasStyle = {
    display: "block",
    width: "100%",
    height: "100%"
  };
  return /* @__PURE__ */ jsx(ErrorBoundary, { children: /* @__PURE__ */ jsxs(
    "div",
    {
      ref: containerRef,
      className: `snap-canvas ${className}`,
      style: containerStyle,
      children: [
        /* @__PURE__ */ jsx(
          "canvas",
          {
            ref: canvasRef,
            width,
            height,
            style: canvasStyle,
            onMouseMove: handleMouseMove,
            onClick: handleMouseClick,
            onTouchMove: handleTouchMove,
            onTouchStart: handleTouchMove
          }
        ),
        isIndexing && /* @__PURE__ */ jsx("div", { style: {
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1e3
        }, children: /* @__PURE__ */ jsx(LoadingSpinner, { size: "large" }) }),
        snapEnabled && canvasState.lastSnapResult && /* @__PURE__ */ jsxs(Fragment, { children: [
          showSnapIndicators && /* @__PURE__ */ jsx(
            SnapIndicator,
            {
              snapResult: canvasState.lastSnapResult,
              visible: true,
              animated: true,
              showTooltip: !isMobile
            }
          ),
          showSnapGuidelines && /* @__PURE__ */ jsx(
            SnapGuidelines,
            {
              snapResult: canvasState.lastSnapResult,
              cursorPosition: canvasState.cursorPosition,
              visible: true,
              showDistance: !isMobile
            }
          )
        ] }),
        showSnapCursor && interactive && /* @__PURE__ */ jsx(
          SnapCursor,
          {
            snapResult: canvasState.lastSnapResult || {
              target: null,
              snapped: false,
              distance: Infinity,
              cursor: canvasState.cursorPosition,
              snapPoint: canvasState.cursorPosition,
              snapType: null
            },
            cursorPosition: canvasState.cursorPosition,
            visible: true
          }
        )
      ]
    }
  ) });
};
var CADSnapCanvas = (props) => /* @__PURE__ */ jsx(SnapCanvas, { ...props, tolerance: 5, showSnapGuidelines: true });
var GISSnapCanvas = (props) => /* @__PURE__ */ jsx(SnapCanvas, { ...props, tolerance: 15, showSnapGuidelines: false });
var MobileSnapCanvas = (props) => /* @__PURE__ */ jsx(SnapCanvas, { ...props, tolerance: 25, showSnapGuidelines: false });

// src/index.ts
function createSnapCanvas(container, options) {
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
function validateSnapProps(props) {
  const errors = [];
  const warnings = [];
  if (props.tolerance && (props.tolerance < 1 || props.tolerance > 100)) {
    errors.push("Tolerance must be between 1 and 100 pixels");
  }
  if (props.width && props.width < 100) {
    warnings.push("Canvas width is very small, may affect usability");
  }
  if (props.height && props.height < 100) {
    warnings.push("Canvas height is very small, may affect usability");
  }
  if (props.geometries && props.geometries.length > 1e3) {
    warnings.push("Large number of geometries may impact performance");
  }
  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}
var SNAP_INTERACTION_DEFAULTS = {
  CAD: {
    tolerance: 5,
    showSnapIndicators: true,
    showSnapGuidelines: true,
    showSnapCursor: true,
    animatedIndicators: true,
    enabledTypes: ["endpoint", "midpoint", "center", "vertex", "intersection"]
  },
  GIS: {
    tolerance: 15,
    showSnapIndicators: true,
    showSnapGuidelines: false,
    showSnapCursor: true,
    animatedIndicators: false,
    enabledTypes: ["endpoint", "vertex", "nearest"]
  },
  MOBILE: {
    tolerance: 25,
    showSnapIndicators: true,
    showSnapGuidelines: false,
    showSnapCursor: false,
    animatedIndicators: false,
    enabledTypes: ["endpoint", "vertex"]
  }
};
var SnapPerformanceUtils = {
  /**
   * Calculates optimal snap tolerance based on zoom level
   */
  calculateOptimalTolerance(zoomLevel, baselineZoom = 1) {
    const scaleFactor = zoomLevel / baselineZoom;
    return Math.max(5, Math.min(50, 15 / scaleFactor));
  },
  /**
   * Determines if advanced snap features should be enabled based on performance
   */
  shouldEnableAdvancedFeatures(geometryCount, isMobile) {
    if (isMobile) {
      return geometryCount < 500;
    }
    return geometryCount < 2e3;
  },
  /**
   * Gets recommended snap types based on context
   */
  getRecommendedSnapTypes(context, performanceLevel) {
    const baseTypes = {
      cad: ["endpoint", "midpoint", "center", "vertex"],
      gis: ["endpoint", "vertex", "nearest"],
      mobile: ["endpoint", "vertex"]
    };
    const advancedTypes = {
      cad: ["intersection", "perpendicular", "tangent"],
      gis: ["center", "midpoint"],
      mobile: []
    };
    const base = baseTypes[context] || baseTypes.gis;
    if (performanceLevel === "high") {
      return [...base, ...advancedTypes[context]];
    }
    return base;
  }
};
function withSnapSupport(Component) {
  return (props) => {
    const { snapEnabled = true, snapTolerance = 10, ...componentProps } = props;
    return React.createElement(Component, componentProps);
  };
}
var VERSION = "1.0.0";
var BUILD_INFO = {
  version: VERSION,
  buildDate: (/* @__PURE__ */ new Date()).toISOString(),
  dependencies: {
    engine: "@layera/snap-engine@1.0.0",
    theme: "@layera/theme-switcher@workspace:*",
    i18n: "@layera/i18n@workspace:*",
    notifications: "@layera/notifications@workspace:*",
    buttons: "@layera/buttons@workspace:*",
    forms: "@layera/forms@workspace:*",
    cards: "@layera/cards@workspace:*",
    icons: "@layera/icons@workspace:*",
    typography: "@layera/typography@workspace:*",
    layout: "@layera/layout@workspace:*",
    loading: "@layera/loading@workspace:*",
    errorBoundary: "@layera/error-boundary@workspace:*",
    viewport: "@layera/viewport@workspace:*",
    constants: "@layera/constants@workspace:*"
  },
  features: [
    "React hooks \u03B3\u03B9\u03B1 snap integration",
    "Visual snap indicators \u03BC\u03B5 theming support",
    "Interactive snap canvas \u03BC\u03B5 touch support",
    "Configurable snap settings panel",
    "Mobile-optimized snap toolbar",
    "Performance-aware rendering",
    "Accessibility compliant",
    "TypeScript strict typing",
    "Error boundary protection",
    "Internationalization support"
  ]
};

export { BUILD_INFO, CADSnapCanvas, GISSnapCanvas, MobileSnapCanvas, SNAP_INTERACTION_DEFAULTS, SnapCanvas, SnapCursor, SnapGuidelines, SnapIndicator, SnapPerformanceUtils, SnapSettingsPanel, SnapToolbar, VERSION, createSnapCanvas, useCADSnap, useGISSnap, useMobileSnap, useSnapEngine2 as useSnapEngine, validateSnapProps, withSnapSupport };
//# sourceMappingURL=index.mjs.map
//# sourceMappingURL=index.mjs.map