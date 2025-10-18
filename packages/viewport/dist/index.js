"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  DesktopOnly: () => DesktopOnly,
  DeviceOverrideProvider: () => DeviceOverrideProvider,
  DeviceSimulator: () => DeviceSimulator,
  DeviceSwitcher: () => DeviceSwitcher,
  MobileAndTablet: () => MobileAndTablet,
  MobileOnly: () => MobileOnly,
  ResponsiveContainer: () => ResponsiveContainer,
  TabletAndDesktop: () => TabletAndDesktop,
  TabletOnly: () => TabletOnly,
  ViewportDebugger: () => ViewportDebugger,
  useIsDesktop: () => useIsDesktop,
  useIsMobile: () => useIsMobile,
  useIsTablet: () => useIsTablet,
  useOrientation: () => useOrientation,
  useViewport: () => useViewport,
  useViewportWithOverride: () => useViewportWithOverride
});
module.exports = __toCommonJS(src_exports);

// src/hooks/useViewport.ts
var import_react = require("react");
var DEFAULT_BREAKPOINTS = {
  mobile: 768,
  // 0-767px = mobile
  tablet: 1024,
  // 768-1023px = tablet
  desktop: 1025
  // 1024px+ = desktop
};
var useViewport = () => {
  const [viewport, setViewport] = (0, import_react.useState)(() => {
    if (typeof window === "undefined") {
      return {
        deviceType: "desktop",
        orientation: "landscape",
        width: 1024,
        height: 768,
        isMobile: false,
        isTablet: false,
        isDesktop: true,
        isPortrait: false,
        isLandscape: true
      };
    }
    const width = window.innerWidth;
    const height = window.innerHeight;
    const deviceType = getDeviceType(width);
    const orientation = getOrientation(width, height);
    return {
      deviceType,
      orientation,
      width,
      height,
      isMobile: deviceType === "mobile",
      isTablet: deviceType === "tablet",
      isDesktop: deviceType === "desktop",
      isPortrait: orientation === "portrait",
      isLandscape: orientation === "landscape"
    };
  });
  (0, import_react.useEffect)(() => {
    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const deviceType = getDeviceType(width);
        const orientation = getOrientation(width, height);
        setViewport({
          deviceType,
          orientation,
          width,
          height,
          isMobile: deviceType === "mobile",
          isTablet: deviceType === "tablet",
          isDesktop: deviceType === "desktop",
          isPortrait: orientation === "portrait",
          isLandscape: orientation === "landscape"
        });
      }, 100);
    };
    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
    };
  }, []);
  return viewport;
};
function getDeviceType(width) {
  if (width < DEFAULT_BREAKPOINTS.mobile) {
    return "mobile";
  } else if (width < DEFAULT_BREAKPOINTS.tablet) {
    return "tablet";
  } else {
    return "desktop";
  }
}
function getOrientation(width, height) {
  return width > height ? "landscape" : "portrait";
}
var useIsMobile = () => {
  const { isMobile } = useViewport();
  return isMobile;
};
var useIsTablet = () => {
  const { isTablet } = useViewport();
  return isTablet;
};
var useIsDesktop = () => {
  const { isDesktop } = useViewport();
  return isDesktop;
};
var useOrientation = () => {
  const { orientation } = useViewport();
  return orientation;
};

// src/components/ResponsiveContainer.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var DEFAULT_CONFIG = {
  mobile: {
    breakpoint: 768,
    maxWidth: "100%",
    padding: "1rem",
    gridColumns: 1
  },
  tablet: {
    breakpoint: 1024,
    maxWidth: "100%",
    padding: "2rem",
    gridColumns: 2
  },
  desktop: {
    breakpoint: 1025,
    maxWidth: "1200px",
    padding: "3rem",
    gridColumns: 3
  }
};
var ResponsiveContainer = ({
  children,
  config = {},
  className = "",
  style = {},
  enablePadding = true,
  enableMaxWidth = true
}) => {
  const { deviceType, width } = useViewport();
  const mergedConfig = { ...DEFAULT_CONFIG, ...config };
  const currentConfig = mergedConfig[deviceType];
  const containerStyle = {
    width: "100%",
    margin: "0 auto",
    ...style
  };
  if (enableMaxWidth && currentConfig.maxWidth) {
    containerStyle.maxWidth = currentConfig.maxWidth;
  }
  if (enablePadding && currentConfig.padding) {
    containerStyle.padding = currentConfig.padding;
  }
  const cssVariables = {
    "--layera-device-type": deviceType,
    "--layera-viewport-width": `${width}px`,
    "--layera-grid-columns": currentConfig.gridColumns?.toString() || "1",
    "--layera-container-padding": currentConfig.padding || "1rem",
    "--layera-container-max-width": currentConfig.maxWidth || "100%"
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "div",
    {
      className: `layera-responsive-container ${className}`,
      style: { ...containerStyle, ...cssVariables },
      "data-device-type": deviceType,
      "data-viewport-width": width,
      children
    }
  );
};
var MobileOnly = ({ children }) => {
  const { isMobile } = useViewport();
  return isMobile ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children }) : null;
};
var TabletOnly = ({ children }) => {
  const { isTablet } = useViewport();
  return isTablet ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children }) : null;
};
var DesktopOnly = ({ children }) => {
  const { isDesktop } = useViewport();
  return isDesktop ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children }) : null;
};
var MobileAndTablet = ({ children }) => {
  const { isMobile, isTablet } = useViewport();
  return isMobile || isTablet ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children }) : null;
};
var TabletAndDesktop = ({ children }) => {
  const { isTablet, isDesktop } = useViewport();
  return isTablet || isDesktop ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children }) : null;
};

// src/components/ViewportDebugger.tsx
var import_react2 = require("react");

// src/components/icons/ViewportIcons.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var ICON_SIZES = {
  xs: 12,
  sm: 16,
  md: 20,
  lg: 24,
  xl: 32
};
var THEME_COLORS = {
  primary: "#2563eb",
  secondary: "#64748b",
  success: "#10b981",
  warning: "#f59e0b",
  danger: "#ef4444",
  info: "#06b6d4",
  neutral: "#6b7280"
};
var RefreshIcon = ({
  size = "md",
  theme = "neutral",
  className = "",
  style = {},
  onClick
}) => {
  const iconSize = typeof size === "number" ? size : ICON_SIZES[size];
  const color = THEME_COLORS[theme];
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
    "svg",
    {
      width: iconSize,
      height: iconSize,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: color,
      strokeWidth: 2,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `viewport-icon ${className}`,
      style,
      onClick,
      role: onClick ? "button" : "img",
      tabIndex: onClick ? 0 : void 0,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "M21 3v5h-5" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "M8 16H3v5" })
      ]
    }
  );
};
var MobileIcon = ({
  size = "md",
  theme = "neutral",
  className = "",
  style = {},
  onClick
}) => {
  const iconSize = typeof size === "number" ? size : ICON_SIZES[size];
  const color = THEME_COLORS[theme];
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
    "svg",
    {
      width: iconSize,
      height: iconSize,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: color,
      strokeWidth: 2,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `viewport-icon ${className}`,
      style,
      onClick,
      role: onClick ? "button" : "img",
      tabIndex: onClick ? 0 : void 0,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("rect", { x: "5", y: "2", width: "14", height: "20", rx: "2", ry: "2" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("line", { x1: "12", y1: "18", x2: "12.01", y2: "18" })
      ]
    }
  );
};
var DesktopIcon = ({
  size = "md",
  theme = "neutral",
  className = "",
  style = {},
  onClick
}) => {
  const iconSize = typeof size === "number" ? size : ICON_SIZES[size];
  const color = THEME_COLORS[theme];
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
    "svg",
    {
      width: iconSize,
      height: iconSize,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: color,
      strokeWidth: 2,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `viewport-icon ${className}`,
      style,
      onClick,
      role: onClick ? "button" : "img",
      tabIndex: onClick ? 0 : void 0,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("rect", { x: "2", y: "3", width: "20", height: "14", rx: "2", ry: "2" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("line", { x1: "8", y1: "21", x2: "16", y2: "21" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("line", { x1: "12", y1: "17", x2: "12", y2: "21" })
      ]
    }
  );
};
var TabletIcon = ({
  size = "md",
  theme = "neutral",
  className = "",
  style = {},
  onClick
}) => {
  const iconSize = typeof size === "number" ? size : ICON_SIZES[size];
  const color = THEME_COLORS[theme];
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
    "svg",
    {
      width: iconSize,
      height: iconSize,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: color,
      strokeWidth: 2,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `viewport-icon ${className}`,
      style,
      onClick,
      role: onClick ? "button" : "img",
      tabIndex: onClick ? 0 : void 0,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("rect", { x: "4", y: "2", width: "16", height: "20", rx: "2", ry: "2" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("line", { x1: "12", y1: "18", x2: "12.01", y2: "18" })
      ]
    }
  );
};
var RotateIcon = ({
  size = "md",
  theme = "neutral",
  className = "",
  style = {},
  onClick
}) => {
  const iconSize = typeof size === "number" ? size : ICON_SIZES[size];
  const color = THEME_COLORS[theme];
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
    "svg",
    {
      width: iconSize,
      height: iconSize,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: color,
      strokeWidth: 2,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `viewport-icon ${className}`,
      style,
      onClick,
      role: onClick ? "button" : "img",
      tabIndex: onClick ? 0 : void 0,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "M21 2v6h-6" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "M3 12a9 9 0 0 1 15-6.7L21 8" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "M3 22v-6h6" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "M21 12a9 9 0 0 1-15 6.7L3 16" })
      ]
    }
  );
};
var TabletLandscapeIcon = ({
  size = "md",
  theme = "neutral",
  className = "",
  style = {},
  onClick
}) => {
  const iconSize = typeof size === "number" ? size : ICON_SIZES[size];
  const color = THEME_COLORS[theme];
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
    "svg",
    {
      width: iconSize,
      height: iconSize,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: color,
      strokeWidth: 2,
      strokeLinecap: "round",
      strokeLinejoin: "round",
      className: `viewport-icon ${className}`,
      style,
      onClick,
      role: onClick ? "button" : "img",
      tabIndex: onClick ? 0 : void 0,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("rect", { x: "2", y: "4", width: "20", height: "16", rx: "2", ry: "2" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("line", { x1: "18", y1: "12", x2: "18.01", y2: "12" })
      ]
    }
  );
};

// src/components/ViewportDebugger.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
var ViewportDebugger = ({
  position = "top-right",
  showAlways = false,
  compact = false
}) => {
  const viewport = useViewport();
  const [isVisible, setIsVisible] = (0, import_react2.useState)(showAlways);
  if (process.env.NODE_ENV === "production" && !showAlways) {
    return null;
  }
  const getPositionStyles = () => {
    const baseStyles = {
      position: "fixed",
      zIndex: 9999,
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      color: "white",
      padding: compact ? "0.5rem" : "1rem",
      borderRadius: "6px",
      fontSize: compact ? "0.75rem" : "0.875rem",
      fontFamily: "monospace",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      backdropFilter: "blur(4px)"
    };
    switch (position) {
      case "top-left":
        return { ...baseStyles, top: "1rem", left: "1rem" };
      case "top-right":
        return { ...baseStyles, top: "1rem", right: "1rem" };
      case "bottom-left":
        return { ...baseStyles, bottom: "1rem", left: "1rem" };
      case "bottom-right":
        return { ...baseStyles, bottom: "1rem", right: "1rem" };
      default:
        return { ...baseStyles, top: "1rem", right: "1rem" };
    }
  };
  const getDeviceIcon = () => {
    switch (viewport.deviceType) {
      case "mobile":
        return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(MobileIcon, { size: "xs", theme: "neutral" });
      case "tablet":
        return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(TabletIcon, { size: "xs", theme: "neutral" });
      case "desktop":
        return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(DesktopIcon, { size: "xs", theme: "neutral" });
      default:
        return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(MobileIcon, { size: "xs", theme: "neutral" });
    }
  };
  const getOrientationIcon = () => {
    return viewport.orientation === "portrait" ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(MobileIcon, { size: "xs", theme: "neutral" }) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(TabletLandscapeIcon, { size: "xs", theme: "neutral" });
  };
  if (!isVisible && !showAlways) {
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      "button",
      {
        onClick: () => setIsVisible(true),
        style: {
          ...getPositionStyles(),
          padding: "0.5rem",
          cursor: "pointer",
          border: "none",
          backgroundColor: "rgba(0, 0, 0, 0.6)"
        },
        title: "Show Viewport Debugger",
        children: "\u{1F50D}"
      }
    );
  }
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { style: getPositionStyles(), children: [
    !showAlways && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      "button",
      {
        onClick: () => setIsVisible(false),
        style: {
          position: "absolute",
          top: "0.25rem",
          right: "0.25rem",
          background: "none",
          border: "none",
          color: "white",
          cursor: "pointer",
          fontSize: "0.75rem"
        },
        title: "Hide Debugger",
        children: "\u2715"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { style: { marginTop: !showAlways ? "1rem" : "0" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { style: {
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        marginBottom: compact ? "0.25rem" : "0.5rem"
      }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: getDeviceIcon() }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("strong", { children: viewport.deviceType.toUpperCase() }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: getOrientationIcon() }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: viewport.orientation })
      ] }),
      !compact && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_jsx_runtime3.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { children: [
          "\u{1F4D0} ",
          viewport.width,
          " \xD7 ",
          viewport.height,
          "px"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { style: { marginTop: "0.5rem", fontSize: "0.75rem", opacity: 0.8 }, children: [
          "Mobile: ",
          viewport.isMobile ? "\u2705" : "\u274C",
          " | Tablet: ",
          viewport.isTablet ? "\u2705" : "\u274C",
          " | Desktop: ",
          viewport.isDesktop ? "\u2705" : "\u274C"
        ] })
      ] }),
      compact && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { children: [
        viewport.width,
        "\xD7",
        viewport.height
      ] })
    ] })
  ] });
};

// src/components/DeviceSwitcher.tsx
var import_react3 = require("react");
var import_jsx_runtime4 = require("react/jsx-runtime");
var DeviceOverrideContext = (0, import_react3.createContext)({
  overrideDevice: null,
  setOverrideDevice: () => {
  }
});
var DeviceOverrideProvider = ({ children }) => {
  const [overrideDevice, setOverrideDevice] = (0, import_react3.useState)(null);
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(DeviceOverrideContext.Provider, { value: { overrideDevice, setOverrideDevice }, children });
};
var useViewportWithOverride = () => {
  const originalViewport = useViewport();
  const { overrideDevice } = (0, import_react3.useContext)(DeviceOverrideContext);
  if (!overrideDevice) {
    return originalViewport;
  }
  return {
    ...originalViewport,
    deviceType: overrideDevice,
    isMobile: overrideDevice === "mobile",
    isTablet: overrideDevice === "tablet",
    isDesktop: overrideDevice === "desktop"
  };
};
var DeviceSwitcher = ({
  position = "top-center",
  showInProduction = false
}) => {
  const { overrideDevice, setOverrideDevice } = (0, import_react3.useContext)(DeviceOverrideContext);
  const originalViewport = useViewport();
  if (process.env.NODE_ENV === "production" && !showInProduction) {
    return null;
  }
  const getPositionStyles = () => {
    const baseStyles = {
      position: "fixed",
      zIndex: 9998,
      // Below debugger
      backdropFilter: "blur(8px)",
      borderRadius: "8px",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      padding: "0.5rem"
    };
    switch (position) {
      case "top-left":
        return { ...baseStyles, top: "1rem", left: "1rem" };
      case "top-center":
        return {
          ...baseStyles,
          top: "1rem",
          left: "50%",
          transform: "translateX(-50%)"
        };
      case "top-right":
        return { ...baseStyles, top: "1rem", right: "1rem" };
      default:
        return { ...baseStyles, top: "1rem", right: "1rem" };
    }
  };
  const devices = [
    { type: null, icon: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(RefreshIcon, { size: "sm", theme: "neutral" }), label: "Auto" },
    { type: "mobile", icon: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(MobileIcon, { size: "sm", theme: "neutral" }), label: "Mobile" },
    { type: "tablet", icon: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(TabletIcon, { size: "sm", theme: "neutral" }), label: "Tablet" },
    { type: "desktop", icon: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(DesktopIcon, { size: "sm", theme: "neutral" }), label: "Desktop" }
  ];
  const currentDevice = overrideDevice || originalViewport.deviceType;
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { style: getPositionStyles(), children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { style: {
      display: "flex",
      gap: "0.25rem",
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      borderRadius: "6px",
      padding: "0.25rem"
    }, children: devices.map(({ type, icon, label }) => /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
      "button",
      {
        onClick: () => setOverrideDevice(type),
        style: {
          background: (type || "auto") === (overrideDevice || "auto") ? "rgba(59, 130, 246, 0.8)" : "rgba(255, 255, 255, 0.1)",
          border: "none",
          borderRadius: "4px",
          color: "white",
          padding: "0.5rem 0.75rem",
          fontSize: "0.75rem",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "0.25rem",
          transition: "all 0.2s ease",
          fontWeight: (type || "auto") === (overrideDevice || "auto") ? "bold" : "normal"
        },
        title: `Switch to ${label} mode`,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { children: icon }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { children: label })
        ]
      },
      type || "auto"
    )) }),
    overrideDevice && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { style: {
      marginTop: "0.5rem",
      fontSize: "0.75rem",
      color: "rgba(255, 255, 255, 0.8)",
      textAlign: "center",
      backgroundColor: "rgba(255, 165, 0, 0.8)",
      padding: "0.25rem 0.5rem",
      borderRadius: "4px"
    }, children: "Override Active" })
  ] });
};

// src/components/DeviceSimulator.tsx
var import_react4 = require("react");
var import_jsx_runtime5 = require("react/jsx-runtime");
var DEVICE_SPECS = {
  mobile: {
    name: "iPhone 13 Pro",
    width: 390,
    height: 844,
    scale: 0.7,
    // Scale για να χωράει στην οθόνη
    borderRadius: "25px",
    bezelColor: "#000000"
  },
  tablet: {
    name: 'iPad Pro 11"',
    width: 834,
    height: 1194,
    scale: 0.5,
    borderRadius: "20px",
    bezelColor: "#333333"
  },
  desktop: {
    name: "Desktop 1920x1080",
    width: 1920,
    height: 1080,
    scale: 0.4,
    borderRadius: "10px",
    bezelColor: "#666666"
  }
};
var DeviceSimulator = ({
  children,
  showDeviceFrame = true
}) => {
  const { overrideDevice } = (0, import_react4.useContext)(DeviceOverrideContext);
  const [orientation, setOrientation] = (0, import_react4.useState)("portrait");
  if (!overrideDevice) {
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_jsx_runtime5.Fragment, { children });
  }
  const spec = DEVICE_SPECS[overrideDevice];
  const isLandscape = orientation === "landscape";
  const finalWidth = isLandscape ? spec.height : spec.width;
  const finalHeight = isLandscape ? spec.width : spec.height;
  const scaledWidth = finalWidth * spec.scale;
  const scaledHeight = finalHeight * spec.scale;
  if (!showDeviceFrame) {
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: {
      width: `${scaledWidth}px`,
      height: `${scaledHeight}px`,
      margin: "0 auto",
      border: "2px solid #ddd",
      borderRadius: "8px",
      overflow: "hidden",
      transform: `scale(${spec.scale})`,
      transformOrigin: "top center"
    }, children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: {
      width: `${finalWidth}px`,
      height: `${finalHeight}px`,
      transform: `scale(${1 / spec.scale})`
    }, children }) });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "2rem",
    backgroundColor: "#f5f5f5",
    minHeight: "100vh"
  }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: {
      marginBottom: "1rem",
      padding: "1rem",
      backgroundColor: "white",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      display: "flex",
      alignItems: "center",
      gap: "1rem"
    }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("h3", { style: { margin: 0, color: "#333" }, children: [
          spec.name,
          " Simulator"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("p", { style: { margin: 0, color: "#666", fontSize: "0.875rem" }, children: [
          finalWidth,
          " \xD7 ",
          finalHeight,
          "px (",
          Math.round(spec.scale * 100),
          "% scale)"
        ] })
      ] }),
      overrideDevice !== "desktop" && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
        "button",
        {
          onClick: () => setOrientation((prev) => prev === "portrait" ? "landscape" : "portrait"),
          style: {
            backgroundColor: "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "6px",
            padding: "0.5rem 1rem",
            fontSize: "0.875rem",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem"
          },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(RotateIcon, { size: "sm", theme: "neutral" }),
            isLandscape ? "Portrait" : "Landscape"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: {
      padding: "20px",
      backgroundColor: spec.bezelColor,
      borderRadius: `calc(${spec.borderRadius} + 20px)`,
      boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
      position: "relative"
    }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: {
        width: `${scaledWidth}px`,
        height: `${scaledHeight}px`,
        backgroundColor: "white",
        borderRadius: spec.borderRadius,
        overflow: "hidden",
        position: "relative",
        boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.1)"
      }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: {
          width: `${finalWidth}px`,
          height: `${finalHeight}px`,
          transform: `scale(${spec.scale})`,
          transformOrigin: "top left",
          overflow: "hidden"
        }, children }),
        overrideDevice === "mobile" && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_jsx_runtime5.Fragment, { children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: {
          position: "absolute",
          bottom: "8px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "134px",
          height: "5px",
          backgroundColor: "rgba(0,0,0,0.3)",
          borderRadius: "2.5px"
        } }) })
      ] }),
      overrideDevice === "mobile" && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_jsx_runtime5.Fragment, { children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: {
          position: "absolute",
          right: "-3px",
          top: isLandscape ? "20%" : "25%",
          width: "3px",
          height: "60px",
          backgroundColor: spec.bezelColor,
          borderRadius: "0 2px 2px 0"
        } }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: {
          position: "absolute",
          left: "-3px",
          top: isLandscape ? "15%" : "20%",
          width: "3px",
          height: "40px",
          backgroundColor: spec.bezelColor,
          borderRadius: "2px 0 0 2px"
        } }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: {
          position: "absolute",
          left: "-3px",
          top: isLandscape ? "25%" : "30%",
          width: "3px",
          height: "40px",
          backgroundColor: spec.bezelColor,
          borderRadius: "2px 0 0 2px",
          marginTop: "10px"
        } })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: {
      marginTop: "1rem",
      padding: "1rem",
      backgroundColor: "white",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      maxWidth: "600px",
      textAlign: "center"
    }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("h4", { style: { margin: "0 0 0.5rem 0", color: "#333" }, children: "Device Simulation Active" }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("p", { style: { margin: 0, color: "#666", fontSize: "0.875rem" }, children: [
        "\u0397 \u03B5\u03C6\u03B1\u03C1\u03BC\u03BF\u03B3\u03AE \u03B5\u03BC\u03C6\u03B1\u03BD\u03AF\u03B6\u03B5\u03C4\u03B1\u03B9 \u03CC\u03C0\u03C9\u03C2 \u03B8\u03B1 \u03C6\u03B1\u03AF\u03BD\u03B5\u03C4\u03B1\u03B9 \u03C3\u03B5 \u03C0\u03C1\u03B1\u03B3\u03BC\u03B1\u03C4\u03B9\u03BA\u03AE ",
        spec.name,
        " \u03C3\u03C5\u03C3\u03BA\u03B5\u03C5\u03AE. \u03A7\u03C1\u03B7\u03C3\u03B9\u03BC\u03BF\u03C0\u03BF\u03AF\u03B7\u03C3\u03B5 \u03C4\u03B1 Device Switcher buttons \u03B3\u03B9\u03B1 \u03B5\u03BD\u03B1\u03BB\u03BB\u03B1\u03B3\u03AE \u03C3\u03C5\u03C3\u03BA\u03B5\u03C5\u03CE\u03BD."
      ] })
    ] })
  ] });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DesktopOnly,
  DeviceOverrideProvider,
  DeviceSimulator,
  DeviceSwitcher,
  MobileAndTablet,
  MobileOnly,
  ResponsiveContainer,
  TabletAndDesktop,
  TabletOnly,
  ViewportDebugger,
  useIsDesktop,
  useIsMobile,
  useIsTablet,
  useOrientation,
  useViewport,
  useViewportWithOverride
});
