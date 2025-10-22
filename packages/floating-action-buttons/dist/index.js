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
var index_exports = {};
__export(index_exports, {
  AutoFAB: () => ResponsiveFAB,
  FAB: () => UnifiedFAB,
  ResponsiveFAB: () => ResponsiveFAB,
  UnifiedFAB: () => UnifiedFAB
});
module.exports = __toCommonJS(index_exports);

// src/UnifiedFAB.tsx
var import_react = __toESM(require("react"));
var import_jsx_runtime = require("react/jsx-runtime");
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
  const detectedDeviceType = import_react.default.useMemo(() => {
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    UnifiedFAB,
    {
      ...props,
      deviceType: detectedDeviceType
    }
  );
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AutoFAB,
  FAB,
  ResponsiveFAB,
  UnifiedFAB
});
//# sourceMappingURL=index.js.map