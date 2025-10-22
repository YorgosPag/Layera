// src/UnifiedFAB.tsx
import React from "react";
import { jsx } from "react/jsx-runtime";
var DEFAULT_CONFIG = {
  mobile: {
    size: 48,
    spacing: { right: 15, bottom: 15 }
  },
  tablet: {
    size: 56,
    spacing: { right: 20, bottom: 20 }
  },
  desktop: {
    size: 56,
    spacing: { right: 20, bottom: 20 }
  },
  iphone: {
    size: 56,
    spacing: { right: 20, bottom: 20 }
  }
};
var VARIANT_COLORS = {
  success: "var(--layera-bg-success, #22C55E)",
  primary: "var(--layera-bg-primary, #3B82F6)",
  secondary: "var(--layera-bg-secondary, #6B7280)",
  danger: "var(--layera-bg-danger, #EF4444)",
  warning: "var(--layera-bg-warning, #F59E0B)"
};
var UnifiedFAB = ({
  onClick,
  icon,
  variant = "success",
  deviceType = "desktop",
  spacing,
  hidden = false,
  "aria-label": ariaLabel = "\u039D\u03AD\u03B1 \u039A\u03B1\u03C4\u03B1\u03C7\u03CE\u03C1\u03B7\u03C3\u03B7",
  title = "\u039D\u03AD\u03B1 \u039A\u03B1\u03C4\u03B1\u03C7\u03CE\u03C1\u03B7\u03C3\u03B7",
  "data-testid": testId,
  style,
  zIndex = 9999
}) => {
  if (hidden) {
    return null;
  }
  const config = DEFAULT_CONFIG[deviceType];
  const finalSpacing = spacing || config.spacing;
  const baseStyles = {
    position: "absolute",
    right: finalSpacing.right,
    bottom: finalSpacing.bottom,
    width: config.size,
    height: config.size,
    borderRadius: "50%",
    background: VARIANT_COLORS[variant],
    border: "2px solid white",
    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    zIndex,
    userSelect: "none",
    // Merge custom styles
    ...style
  };
  return /* @__PURE__ */ jsx(
    "div",
    {
      onClick,
      "aria-label": ariaLabel,
      title,
      "data-testid": testId,
      style: baseStyles,
      children: icon
    }
  );
};
var ResponsiveFAB = ({
  forceDeviceType,
  ...props
}) => {
  const detectedDeviceType = React.useMemo(() => {
    if (forceDeviceType) {
      return forceDeviceType;
    }
    if (typeof window === "undefined") {
      return "desktop";
    }
    const width = window.innerWidth;
    if (width <= 430) {
      return "mobile";
    } else if (width <= 768) {
      return "tablet";
    } else {
      return "desktop";
    }
  }, [forceDeviceType]);
  return /* @__PURE__ */ jsx(
    UnifiedFAB,
    {
      ...props,
      deviceType: detectedDeviceType
    }
  );
};
export {
  ResponsiveFAB as AutoFAB,
  UnifiedFAB as FAB,
  ResponsiveFAB,
  UnifiedFAB
};
//# sourceMappingURL=index.mjs.map