"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  DesktopOnly: () => DesktopOnly,
  DeviceModelSelector: () => DeviceModelSelector,
  DeviceOverrideProvider: () => DeviceOverrideProvider,
  DeviceSimulator: () => DeviceSimulator,
  MobileAndTablet: () => MobileAndTablet,
  MobileOnly: () => MobileOnly,
  ResponsiveContainer: () => ResponsiveContainer,
  TabletAndDesktop: () => TabletAndDesktop,
  TabletOnly: () => TabletOnly,
  ViewportDebugger: () => ViewportDebugger,
  getDeviceSpecs: () => getDeviceSpecs,
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
  if (typeof window !== "undefined") {
    const isSimulator = navigator.userAgent.includes("Mobile") || navigator.userAgent.includes("Android") || navigator.userAgent.includes("iPhone") || navigator.userAgent.includes("iPad") || // Browser simulator detection - όταν το viewport είναι μικρό αλλά το screen μεγάλο
    width <= 430 && window.screen.width > 1e3 || // Specific mobile simulator sizes
    width === 375 && window.innerHeight === 667 || // iPhone 6/7/8
    width === 414 && window.innerHeight === 896 || // iPhone 11/XR
    width === 430 && window.innerHeight === 932 || // iPhone 14 Pro Max
    width === 390 && window.innerHeight === 844 || // iPhone 12/13/14
    // DevTools mobile simulation indicators
    window.orientation !== void 0 || "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isSimulator && width <= 768) {
      return "mobile";
    }
    const height = window.innerHeight;
    const aspectRatio = width / height;
    const isSimulatorSize = width <= 430 || aspectRatio < 0.8 && width <= 768;
    if (width <= 480 || isSimulatorSize) {
      console.log("\u{1F3AF} useViewport: Mobile detected:", { width, height, aspectRatio, isSimulatorSize });
      return "mobile";
    }
  }
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
  primary: "var(--layera-bg-info)",
  secondary: "var(--layera-text-secondary)",
  success: "var(--layera-bg-success)",
  warning: "var(--layera-bg-warning)",
  danger: "var(--layera-bg-danger)",
  info: "var(--layera-bg-info)",
  neutral: "var(--layera-text-secondary)"
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
      backgroundColor: "color-mix(in srgb, var(--layera-bg-secondary) 90%, transparent 10%)",
      color: "var(--layera-text-primary)",
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
          color: "var(--layera-text-primary)",
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

// src/components/DeviceOverrideProvider.tsx
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

// src/components/DeviceSimulator.tsx
var import_jsx_runtime5 = require("react/jsx-runtime");
var DeviceSimulator = ({
  children,
  className = ""
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: `layera-device-simulator ${className}`, children });
};

// src/components/DeviceModelSelector.tsx
var import_react4 = __toESM(require("react"));
var import_jsx_runtime6 = require("react/jsx-runtime");
var deviceSpecs = {
  "iPhone X": { width: 375, height: 812, scale: 1, hasNotch: true, hasHomeBar: true, borderRadius: 40, frameColor: "#1c1c1e" },
  "iPhone 8": { width: 375, height: 667, scale: 1, hasNotch: false, hasHomeBar: false, borderRadius: 25, frameColor: "#f0f0f0" },
  "iPhone 8 Plus": { width: 414, height: 736, scale: 1, hasNotch: false, hasHomeBar: false, borderRadius: 25, frameColor: "#f0f0f0" },
  "iPhone 12 Pro": { width: 390, height: 844, scale: 1, hasNotch: true, hasHomeBar: true, borderRadius: 45, frameColor: "#1c1c1e" },
  "iPhone 14 Pro Max": { width: 430, height: 932, scale: 1, hasNotch: true, hasHomeBar: true, borderRadius: 50, frameColor: "#1c1c1e" },
  "Samsung Galaxy S21": { width: 384, height: 854, scale: 1, hasNotch: false, hasHomeBar: false, borderRadius: 35, frameColor: "#000000" },
  "Samsung Galaxy S22": { width: 390, height: 844, scale: 1, hasNotch: false, hasHomeBar: false, borderRadius: 35, frameColor: "#1c1c1e" },
  "Samsung Galaxy S22 Ultra": { width: 412, height: 908, scale: 1, hasNotch: false, hasHomeBar: false, borderRadius: 35, frameColor: "#000000" },
  "Samsung Galaxy S23": { width: 390, height: 844, scale: 1, hasNotch: false, hasHomeBar: false, borderRadius: 35, frameColor: "#1c1c1e" },
  "Samsung Galaxy S23 Ultra": { width: 412, height: 908, scale: 1, hasNotch: false, hasHomeBar: false, borderRadius: 35, frameColor: "#000000" },
  "Samsung Galaxy S24": { width: 393, height: 851, scale: 1, hasNotch: false, hasHomeBar: false, borderRadius: 35, frameColor: "#1c1c1e" },
  "Samsung Galaxy S24 Ultra": { width: 412, height: 926, scale: 1, hasNotch: false, hasHomeBar: false, borderRadius: 35, frameColor: "#000000" },
  "Samsung Galaxy A35": { width: 390, height: 844, scale: 1, hasNotch: false, hasHomeBar: false, borderRadius: 30, frameColor: "#1c1c1e" },
  "Samsung Galaxy Z Fold 5": { width: 904, height: 905, scale: 0.8, hasNotch: false, hasHomeBar: false, borderRadius: 30, frameColor: "#000000" },
  "Samsung Galaxy Z Flip 5": { width: 390, height: 876, scale: 1, hasNotch: false, hasHomeBar: false, borderRadius: 35, frameColor: "#1c1c1e" },
  "Google Pixel 5": { width: 393, height: 851, scale: 1, hasNotch: false, hasHomeBar: true, borderRadius: 30, frameColor: "#202124" },
  "iPad Air": { width: 820, height: 1180, scale: 0.7, hasNotch: false, hasHomeBar: false, borderRadius: 20, frameColor: "#e5e5e7" },
  'iPad Pro 11"': { width: 834, height: 1194, scale: 0.7, hasNotch: false, hasHomeBar: false, borderRadius: 20, frameColor: "#1c1c1e" },
  'iPad Pro 12.9"': { width: 1024, height: 1366, scale: 0.6, hasNotch: false, hasHomeBar: false, borderRadius: 20, frameColor: "#1c1c1e" },
  "Surface Pro 7": { width: 912, height: 1368, scale: 0.6, hasNotch: false, hasHomeBar: false, borderRadius: 0, frameColor: "#000000" },
  'MacBook Pro 13"': { width: 1440, height: 900, scale: 0.5, hasNotch: false, hasHomeBar: false, borderRadius: 10, frameColor: "#e5e5e7" },
  'iMac 24"': { width: 1920, height: 1080, scale: 0.7, hasNotch: false, hasHomeBar: false, borderRadius: 15, frameColor: "#f0f0f0" }
};
var DeviceModelSelector = ({
  onModelSelect,
  currentModel
}) => {
  const [isOpen, setIsOpen] = (0, import_react4.useState)(false);
  const [position, setPosition] = (0, import_react4.useState)({ x: 50, y: 60 });
  const [isDragging, setIsDragging] = (0, import_react4.useState)(false);
  import_react4.default.useEffect(() => {
    console.log("\u{1F3AF} DeviceModelSelector mounted! Samsung Galaxy A35 should be available.");
  }, []);
  const deviceCategories = {
    "iPhones": ["iPhone X", "iPhone 8", "iPhone 8 Plus", "iPhone 12 Pro", "iPhone 14 Pro Max"],
    "Samsung": [
      "Samsung Galaxy S24 Ultra",
      "Samsung Galaxy S24",
      "Samsung Galaxy S23 Ultra",
      "Samsung Galaxy S23",
      "Samsung Galaxy S22 Ultra",
      "Samsung Galaxy S22",
      "Samsung Galaxy S21",
      "Samsung Galaxy A35",
      "Samsung Galaxy Z Fold 5",
      "Samsung Galaxy Z Flip 5"
    ],
    "Other Android": ["Google Pixel 5"],
    "Tablets": ["iPad Air", 'iPad Pro 11"', 'iPad Pro 12.9"', "Surface Pro 7"],
    "Desktop": ['MacBook Pro 13"', 'iMac 24"']
  };
  const handleMouseDown = (e) => {
    if (e.target.closest("button") && !isOpen) {
      e.preventDefault();
      setIsDragging(true);
      const startX = e.clientX;
      const startY = e.clientY;
      const startPos = { ...position };
      const handleMouseMove = (e2) => {
        const deltaX = e2.clientX - startX;
        const deltaY = e2.clientY - startY;
        const newX = Math.max(5, Math.min(95, startPos.x + deltaX / window.innerWidth * 100));
        const newY = Math.max(10, Math.min(window.innerHeight - 100, startPos.y + deltaY));
        setPosition({ x: newX, y: newY });
      };
      const handleMouseUp = () => {
        setIsDragging(false);
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
    "div",
    {
      onMouseDown: handleMouseDown,
      style: {
        position: "fixed",
        top: `${position.y}px`,
        left: `${position.x}%`,
        transform: "translateX(-50%)",
        zIndex: 9999,
        backgroundColor: isDragging ? "rgba(255, 255, 255, 1)" : "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(10px)",
        borderRadius: "12px",
        boxShadow: isDragging ? "0 8px 30px rgba(0,0,0,0.2)" : "0 4px 20px rgba(0,0,0,0.1)",
        padding: "8px",
        cursor: isDragging ? "grabbing" : "grab",
        userSelect: "none",
        transition: isDragging ? "none" : "all 0.2s ease"
      },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
          "button",
          {
            onClick: () => !isDragging && setIsOpen(!isOpen),
            style: {
              background: currentModel ? "#4F46E5" : "#6B7280",
              color: "white",
              border: "none",
              borderRadius: "8px",
              padding: "8px 16px",
              fontSize: "14px",
              fontWeight: "600",
              cursor: "inherit",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              minWidth: "200px",
              justifyContent: "space-between"
            },
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { children: currentModel || "Select Device Model" }),
              /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { style: { fontSize: "12px" }, children: isOpen ? "\u25B2" : "\u25BC" })
            ]
          }
        ),
        isOpen && /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { style: {
          position: "absolute",
          top: "100%",
          left: "0",
          right: "0",
          marginTop: "8px",
          backgroundColor: "white",
          borderRadius: "12px",
          boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
          overflow: "hidden",
          maxHeight: "400px",
          overflowY: "auto"
        }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
            "button",
            {
              onClick: () => {
                onModelSelect(null);
                setIsOpen(false);
              },
              style: {
                width: "100%",
                padding: "10px 16px",
                border: "none",
                background: !currentModel ? "#EBF5FF" : "white",
                cursor: "pointer",
                textAlign: "left",
                fontSize: "14px",
                fontWeight: !currentModel ? "600" : "400",
                borderBottom: "1px solid #E5E7EB"
              },
              children: "\u{1F5A5}\uFE0F Responsive View (No Frame)"
            }
          ),
          Object.entries(deviceCategories).map(([category, devices]) => /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { style: {
              padding: "8px 16px",
              fontSize: "12px",
              fontWeight: "600",
              color: "#6B7280",
              backgroundColor: "#F9FAFB",
              borderTop: "1px solid #E5E7EB",
              borderBottom: "1px solid #E5E7EB"
            }, children: category }),
            devices.map((device) => /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
              "button",
              {
                onClick: () => {
                  onModelSelect(device);
                  setIsOpen(false);
                },
                style: {
                  width: "100%",
                  padding: "10px 16px 10px 32px",
                  border: "none",
                  background: currentModel === device ? "#EBF5FF" : "white",
                  cursor: "pointer",
                  textAlign: "left",
                  fontSize: "14px",
                  fontWeight: currentModel === device ? "600" : "400",
                  transition: "background 0.2s"
                },
                onMouseOver: (e) => {
                  if (currentModel !== device) {
                    e.currentTarget.style.background = "#F3F4F6";
                  }
                },
                onMouseOut: (e) => {
                  if (currentModel !== device) {
                    e.currentTarget.style.background = "white";
                  }
                },
                children: [
                  device,
                  /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("span", { style: {
                    fontSize: "12px",
                    color: "#9CA3AF",
                    marginLeft: "8px"
                  }, children: [
                    "(",
                    deviceSpecs[device].width,
                    "x",
                    deviceSpecs[device].height,
                    ")"
                  ] })
                ]
              },
              device
            ))
          ] }, category))
        ] })
      ]
    }
  );
};
var getDeviceSpecs = (model) => {
  return deviceSpecs[model];
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DesktopOnly,
  DeviceModelSelector,
  DeviceOverrideProvider,
  DeviceSimulator,
  MobileAndTablet,
  MobileOnly,
  ResponsiveContainer,
  TabletAndDesktop,
  TabletOnly,
  ViewportDebugger,
  getDeviceSpecs,
  useIsDesktop,
  useIsMobile,
  useIsTablet,
  useOrientation,
  useViewport,
  useViewportWithOverride
});
