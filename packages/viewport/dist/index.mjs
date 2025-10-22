// src/hooks/useViewport.ts
import { useState, useEffect } from "react";
var DEFAULT_BREAKPOINTS = {
  mobile: 768,
  // 0-767px = mobile
  tablet: 1024,
  // 768-1023px = tablet
  desktop: 1025
  // 1024px+ = desktop
};
var useViewport = () => {
  const [viewport, setViewport] = useState(() => {
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
  useEffect(() => {
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
import { Fragment, jsx } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsx(
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
  return isMobile ? /* @__PURE__ */ jsx(Fragment, { children }) : null;
};
var TabletOnly = ({ children }) => {
  const { isTablet } = useViewport();
  return isTablet ? /* @__PURE__ */ jsx(Fragment, { children }) : null;
};
var DesktopOnly = ({ children }) => {
  const { isDesktop } = useViewport();
  return isDesktop ? /* @__PURE__ */ jsx(Fragment, { children }) : null;
};
var MobileAndTablet = ({ children }) => {
  const { isMobile, isTablet } = useViewport();
  return isMobile || isTablet ? /* @__PURE__ */ jsx(Fragment, { children }) : null;
};
var TabletAndDesktop = ({ children }) => {
  const { isTablet, isDesktop } = useViewport();
  return isTablet || isDesktop ? /* @__PURE__ */ jsx(Fragment, { children }) : null;
};

// src/components/ViewportDebugger.tsx
import { useState as useState2 } from "react";

// src/components/icons/ViewportIcons.tsx
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
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
var RefreshIcon = ({
  size = "md",
  theme = "neutral",
  className = "",
  style = {},
  onClick
}) => {
  const iconSize = typeof size === "number" ? size : ICON_SIZES[size];
  const color = THEME_COLORS[theme];
  return /* @__PURE__ */ jsxs(
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
        /* @__PURE__ */ jsx2("path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" }),
        /* @__PURE__ */ jsx2("path", { d: "M21 3v5h-5" }),
        /* @__PURE__ */ jsx2("path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" }),
        /* @__PURE__ */ jsx2("path", { d: "M8 16H3v5" })
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
  return /* @__PURE__ */ jsxs(
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
        /* @__PURE__ */ jsx2("rect", { x: "5", y: "2", width: "14", height: "20", rx: "2", ry: "2" }),
        /* @__PURE__ */ jsx2("line", { x1: "12", y1: "18", x2: "12.01", y2: "18" })
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
  return /* @__PURE__ */ jsxs(
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
        /* @__PURE__ */ jsx2("rect", { x: "2", y: "3", width: "20", height: "14", rx: "2", ry: "2" }),
        /* @__PURE__ */ jsx2("line", { x1: "8", y1: "21", x2: "16", y2: "21" }),
        /* @__PURE__ */ jsx2("line", { x1: "12", y1: "17", x2: "12", y2: "21" })
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
  return /* @__PURE__ */ jsxs(
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
        /* @__PURE__ */ jsx2("rect", { x: "4", y: "2", width: "16", height: "20", rx: "2", ry: "2" }),
        /* @__PURE__ */ jsx2("line", { x1: "12", y1: "18", x2: "12.01", y2: "18" })
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
  return /* @__PURE__ */ jsxs(
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
        /* @__PURE__ */ jsx2("rect", { x: "2", y: "4", width: "20", height: "16", rx: "2", ry: "2" }),
        /* @__PURE__ */ jsx2("line", { x1: "18", y1: "12", x2: "18.01", y2: "12" })
      ]
    }
  );
};

// src/components/ViewportDebugger.tsx
import { Fragment as Fragment2, jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
var ViewportDebugger = ({
  position = "top-right",
  showAlways = false,
  compact = false
}) => {
  const viewport = useViewport();
  const [isVisible, setIsVisible] = useState2(showAlways);
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
        return /* @__PURE__ */ jsx3(MobileIcon, { size: "xs", theme: "neutral" });
      case "tablet":
        return /* @__PURE__ */ jsx3(TabletIcon, { size: "xs", theme: "neutral" });
      case "desktop":
        return /* @__PURE__ */ jsx3(DesktopIcon, { size: "xs", theme: "neutral" });
      default:
        return /* @__PURE__ */ jsx3(MobileIcon, { size: "xs", theme: "neutral" });
    }
  };
  const getOrientationIcon = () => {
    return viewport.orientation === "portrait" ? /* @__PURE__ */ jsx3(MobileIcon, { size: "xs", theme: "neutral" }) : /* @__PURE__ */ jsx3(TabletLandscapeIcon, { size: "xs", theme: "neutral" });
  };
  if (!isVisible && !showAlways) {
    return /* @__PURE__ */ jsx3(
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
  return /* @__PURE__ */ jsxs2("div", { style: getPositionStyles(), children: [
    !showAlways && /* @__PURE__ */ jsx3(
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
    /* @__PURE__ */ jsxs2("div", { style: { marginTop: !showAlways ? "1rem" : "0" }, children: [
      /* @__PURE__ */ jsxs2("div", { style: {
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        marginBottom: compact ? "0.25rem" : "0.5rem"
      }, children: [
        /* @__PURE__ */ jsx3("span", { children: getDeviceIcon() }),
        /* @__PURE__ */ jsx3("strong", { children: viewport.deviceType.toUpperCase() }),
        /* @__PURE__ */ jsx3("span", { children: getOrientationIcon() }),
        /* @__PURE__ */ jsx3("span", { children: viewport.orientation })
      ] }),
      !compact && /* @__PURE__ */ jsxs2(Fragment2, { children: [
        /* @__PURE__ */ jsxs2("div", { children: [
          "\u{1F4D0} ",
          viewport.width,
          " \xD7 ",
          viewport.height,
          "px"
        ] }),
        /* @__PURE__ */ jsxs2("div", { style: { marginTop: "0.5rem", fontSize: "0.75rem", opacity: 0.8 }, children: [
          "Mobile: ",
          viewport.isMobile ? "\u2705" : "\u274C",
          " | Tablet: ",
          viewport.isTablet ? "\u2705" : "\u274C",
          " | Desktop: ",
          viewport.isDesktop ? "\u2705" : "\u274C"
        ] })
      ] }),
      compact && /* @__PURE__ */ jsxs2("div", { children: [
        viewport.width,
        "\xD7",
        viewport.height
      ] })
    ] })
  ] });
};

// src/components/DeviceSwitcher.tsx
import { useState as useState3, createContext, useContext } from "react";
import { jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
var DeviceOverrideContext = createContext({
  overrideDevice: null,
  setOverrideDevice: () => {
  }
});
var DeviceOverrideProvider = ({ children }) => {
  const [overrideDevice, setOverrideDevice] = useState3(null);
  return /* @__PURE__ */ jsx4(DeviceOverrideContext.Provider, { value: { overrideDevice, setOverrideDevice }, children });
};
var useViewportWithOverride = () => {
  const originalViewport = useViewport();
  const { overrideDevice } = useContext(DeviceOverrideContext);
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
  showInProduction = false,
  labels = {}
}) => {
  const { overrideDevice, setOverrideDevice } = useContext(DeviceOverrideContext);
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
      border: "1px solid color-mix(in srgb, var(--layera-border-primary) 60%, transparent 40%)",
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
    { type: null, icon: /* @__PURE__ */ jsx4(RefreshIcon, { size: "sm", theme: "neutral" }), label: labels.auto || "Auto" },
    { type: "mobile", icon: /* @__PURE__ */ jsx4(MobileIcon, { size: "sm", theme: "neutral" }), label: labels.mobile || "Mobile" },
    { type: "tablet", icon: /* @__PURE__ */ jsx4(TabletIcon, { size: "sm", theme: "neutral" }), label: labels.tablet || "Tablet" },
    { type: "desktop", icon: /* @__PURE__ */ jsx4(DesktopIcon, { size: "sm", theme: "neutral" }), label: labels.desktop || "Desktop" }
  ];
  const currentDevice = overrideDevice || originalViewport.deviceType;
  return /* @__PURE__ */ jsxs3("div", { style: getPositionStyles(), children: [
    /* @__PURE__ */ jsx4("div", { style: {
      display: "flex",
      gap: "0.25rem",
      backgroundColor: "color-mix(in srgb, var(--layera-bg-secondary) 80%, transparent 20%)",
      borderRadius: "6px",
      padding: "0.25rem"
    }, children: devices.map(({ type, icon, label }) => /* @__PURE__ */ jsxs3(
      "button",
      {
        onClick: () => setOverrideDevice(type),
        style: {
          background: (type || "auto") === (overrideDevice || "auto") ? "color-mix(in srgb, var(--layera-bg-info) 80%, transparent 20%)" : "color-mix(in srgb, var(--layera-bg-tertiary) 80%, transparent 20%)",
          border: "none",
          borderRadius: "4px",
          color: "var(--layera-text-primary)",
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
          /* @__PURE__ */ jsx4("span", { children: icon }),
          /* @__PURE__ */ jsx4("span", { children: label })
        ]
      },
      type || "auto"
    )) }),
    overrideDevice && /* @__PURE__ */ jsx4("div", { style: {
      marginTop: "0.5rem",
      fontSize: "0.75rem",
      color: "var(--layera-text-on-warning)",
      textAlign: "center",
      backgroundColor: "color-mix(in srgb, var(--layera-bg-warning) 80%, transparent 20%)",
      padding: "0.25rem 0.5rem",
      borderRadius: "4px"
    }, children: labels.overrideActive || "Override Active" })
  ] });
};

// src/components/DeviceSimulator.tsx
import { jsx as jsx5 } from "react/jsx-runtime";
var DeviceSimulator = ({
  children,
  className = ""
}) => {
  return /* @__PURE__ */ jsx5("div", { className: `layera-device-simulator ${className}`, children });
};
export {
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
};
