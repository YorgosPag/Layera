'use strict';

var react = require('react');
var jsxRuntime = require('react/jsx-runtime');

var Button = react.forwardRef(({
  variant = "primary",
  size = "md",
  fullWidth = false,
  loading = false,
  loadingVariant = "spinner",
  loadingText,
  icon,
  iconPosition = "left",
  className = "",
  children,
  disabled,
  type = "button",
  ...props
}, ref) => {
  const classes = [
    "layera-btn",
    `layera-btn--${variant}`,
    `layera-btn--${size}`,
    fullWidth && "layera-btn--full-width",
    loading && "layera-btn--loading",
    icon && !children && "layera-btn--icon-only",
    className
  ].filter(Boolean).join(" ");
  const renderLoadingContent = () => {
    switch (loadingVariant) {
      case "dots":
        return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "layera-btn__dots", children: [
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: "dot" }),
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: "dot" }),
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: "dot" })
        ] });
      case "pulse":
        return /* @__PURE__ */ jsxRuntime.jsx("div", { className: "layera-btn__pulse" });
      case "spinner":
      default:
        return /* @__PURE__ */ jsxRuntime.jsx("div", { className: "layera-btn__spinner" });
    }
  };
  const renderIcon = () => {
    if (!icon)
      return null;
    return /* @__PURE__ */ jsxRuntime.jsx("span", { className: "layera-btn__icon", children: icon });
  };
  const renderContent = () => {
    if (iconPosition === "right") {
      return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
        children,
        renderIcon()
      ] });
    }
    if (iconPosition === "only") {
      return renderIcon();
    }
    return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
      renderIcon(),
      children
    ] });
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "button",
    {
      ref,
      type,
      className: classes,
      disabled: disabled || loading,
      "aria-disabled": disabled || loading,
      "aria-busy": loading,
      "aria-label": loading && loadingText ? loadingText : void 0,
      ...props,
      children: [
        loading && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "layera-btn__loading", children: renderLoadingContent() }),
        /* @__PURE__ */ jsxRuntime.jsx("div", { className: "layera-btn__content", children: loading && loadingText ? loadingText : renderContent() })
      ]
    }
  );
});
Button.displayName = "LayeraButton";
var LinkButton = react.forwardRef(({
  variant = "primary",
  size = "md",
  fullWidth = false,
  loading = false,
  loadingVariant = "spinner",
  loadingText,
  icon,
  iconPosition = "left",
  className = "",
  children,
  href,
  target,
  rel,
  ...props
}, ref) => {
  const classes = [
    "layera-btn",
    `layera-btn--${variant}`,
    `layera-btn--${size}`,
    fullWidth && "layera-btn--full-width",
    loading && "layera-btn--loading",
    icon && !children && "layera-btn--icon-only",
    className
  ].filter(Boolean).join(" ");
  const computedRel = target === "_blank" && !rel?.includes("noopener") ? `${rel || ""} noopener noreferrer`.trim() : rel;
  const renderLoadingContent = () => {
    switch (loadingVariant) {
      case "dots":
        return /* @__PURE__ */ jsxRuntime.jsxs("div", { className: "layera-btn__dots", children: [
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: "dot" }),
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: "dot" }),
          /* @__PURE__ */ jsxRuntime.jsx("div", { className: "dot" })
        ] });
      case "pulse":
        return /* @__PURE__ */ jsxRuntime.jsx("div", { className: "layera-btn__pulse" });
      case "spinner":
      default:
        return /* @__PURE__ */ jsxRuntime.jsx("div", { className: "layera-btn__spinner" });
    }
  };
  const renderIcon = () => {
    if (!icon)
      return null;
    return /* @__PURE__ */ jsxRuntime.jsx("span", { className: "layera-btn__icon", children: icon });
  };
  const renderContent = () => {
    if (iconPosition === "right") {
      return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
        children,
        renderIcon()
      ] });
    }
    if (iconPosition === "only") {
      return renderIcon();
    }
    return /* @__PURE__ */ jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [
      renderIcon(),
      children
    ] });
  };
  return /* @__PURE__ */ jsxRuntime.jsxs(
    "a",
    {
      ref,
      href: loading ? void 0 : href,
      target,
      rel: computedRel,
      className: classes,
      "aria-disabled": loading,
      "aria-busy": loading,
      "aria-label": loading && loadingText ? loadingText : void 0,
      role: "button",
      ...props,
      children: [
        loading && /* @__PURE__ */ jsxRuntime.jsx("div", { className: "layera-btn__loading", children: renderLoadingContent() }),
        /* @__PURE__ */ jsxRuntime.jsx("div", { className: "layera-btn__content", children: loading && loadingText ? loadingText : renderContent() })
      ]
    }
  );
});
LinkButton.displayName = "LayeraLinkButton";
var ButtonGroup = ({
  orientation = "horizontal",
  spacing = "md",
  uniform = false,
  className = "",
  children
}) => {
  const classes = [
    "layera-btn-group",
    `layera-btn-group--${orientation}`,
    uniform && "layera-btn-group--uniform",
    className
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsxRuntime.jsx(
    "div",
    {
      className: classes,
      role: "group",
      "data-spacing": spacing,
      children
    }
  );
};
ButtonGroup.displayName = "LayeraButtonGroup";
var useButton = () => {
  const buttonTokens = react.useMemo(() => ({
    sizes: {
      xs: {
        height: "2rem",
        padding: "0.5rem 0.75rem",
        fontSize: "0.75rem",
        iconSize: "0.875rem",
        gap: "0.375rem"
      },
      sm: {
        height: "2.25rem",
        padding: "0.5rem 1rem",
        fontSize: "0.875rem",
        iconSize: "1rem",
        gap: "0.5rem"
      },
      md: {
        height: "2.75rem",
        padding: "0.75rem 1.25rem",
        fontSize: "1rem",
        iconSize: "1.125rem",
        gap: "0.5rem"
      },
      lg: {
        height: "3rem",
        padding: "0.875rem 1.5rem",
        fontSize: "1.125rem",
        iconSize: "1.25rem",
        gap: "0.625rem"
      },
      xl: {
        height: "3.5rem",
        padding: "1rem 2rem",
        fontSize: "1.25rem",
        iconSize: "1.5rem",
        gap: "0.75rem"
      }
    },
    variants: {
      primary: {
        background: "#2563eb",
        color: "#ffffff",
        border: "#2563eb",
        hover: {
          background: "#1d4ed8",
          color: "#ffffff",
          border: "#1d4ed8"
        },
        active: {
          background: "#1e40af",
          color: "#ffffff",
          border: "#1e40af"
        },
        focus: {
          outline: "2px solid #93c5fd",
          ring: "0 0 0 2px rgba(59, 130, 246, 0.5)"
        },
        disabled: {
          background: "#f3f4f6",
          color: "#9ca3af",
          border: "#e5e7eb"
        }
      },
      secondary: {
        background: "#6b7280",
        color: "#ffffff",
        border: "#6b7280",
        hover: {
          background: "#4b5563",
          color: "#ffffff",
          border: "#4b5563"
        },
        active: {
          background: "#374151",
          color: "#ffffff",
          border: "#374151"
        },
        focus: {
          outline: "2px solid #9ca3af",
          ring: "0 0 0 2px rgba(107, 114, 128, 0.5)"
        },
        disabled: {
          background: "#f3f4f6",
          color: "#9ca3af",
          border: "#e5e7eb"
        }
      },
      outline: {
        background: "transparent",
        color: "#2563eb",
        border: "#2563eb",
        hover: {
          background: "#2563eb",
          color: "#ffffff",
          border: "#2563eb"
        },
        active: {
          background: "#1e40af",
          color: "#ffffff",
          border: "#1e40af"
        },
        focus: {
          outline: "2px solid #93c5fd",
          ring: "0 0 0 2px rgba(59, 130, 246, 0.5)"
        },
        disabled: {
          background: "#f3f4f6",
          color: "#9ca3af",
          border: "#e5e7eb"
        }
      },
      ghost: {
        background: "transparent",
        color: "#374151",
        border: "transparent",
        hover: {
          background: "#f3f4f6",
          color: "#111827",
          border: "transparent"
        },
        active: {
          background: "#e5e7eb",
          color: "#111827",
          border: "transparent"
        },
        focus: {
          outline: "2px solid #d1d5db",
          ring: "0 0 0 2px rgba(156, 163, 175, 0.5)"
        },
        disabled: {
          background: "#f3f4f6",
          color: "#9ca3af",
          border: "#e5e7eb"
        }
      },
      danger: {
        background: "#dc2626",
        color: "#ffffff",
        border: "#dc2626",
        hover: {
          background: "#b91c1c",
          color: "#ffffff",
          border: "#b91c1c"
        },
        active: {
          background: "#991b1b",
          color: "#ffffff",
          border: "#991b1b"
        },
        focus: {
          outline: "2px solid #fca5a5",
          ring: "0 0 0 2px rgba(239, 68, 68, 0.5)"
        },
        disabled: {
          background: "#f3f4f6",
          color: "#9ca3af",
          border: "#e5e7eb"
        }
      },
      success: {
        background: "#059669",
        color: "#ffffff",
        border: "#059669",
        hover: {
          background: "#047857",
          color: "#ffffff",
          border: "#047857"
        },
        active: {
          background: "#065f46",
          color: "#ffffff",
          border: "#065f46"
        },
        focus: {
          outline: "2px solid #6ee7b7",
          ring: "0 0 0 2px rgba(16, 185, 129, 0.5)"
        },
        disabled: {
          background: "#f3f4f6",
          color: "#9ca3af",
          border: "#e5e7eb"
        }
      },
      warning: {
        background: "#d97706",
        color: "#ffffff",
        border: "#d97706",
        hover: {
          background: "#b45309",
          color: "#ffffff",
          border: "#b45309"
        },
        active: {
          background: "#92400e",
          color: "#ffffff",
          border: "#92400e"
        },
        focus: {
          outline: "2px solid #fbbf24",
          ring: "0 0 0 2px rgba(217, 119, 6, 0.5)"
        },
        disabled: {
          background: "#f3f4f6",
          color: "#9ca3af",
          border: "#e5e7eb"
        }
      },
      info: {
        background: "#0891b2",
        color: "#ffffff",
        border: "#0891b2",
        hover: {
          background: "#0e7490",
          color: "#ffffff",
          border: "#0e7490"
        },
        active: {
          background: "#155e75",
          color: "#ffffff",
          border: "#155e75"
        },
        focus: {
          outline: "2px solid #67e8f9",
          ring: "0 0 0 2px rgba(8, 145, 178, 0.5)"
        },
        disabled: {
          background: "#f3f4f6",
          color: "#9ca3af",
          border: "#e5e7eb"
        }
      }
    },
    transitions: {
      default: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
      fast: "all 0.1s cubic-bezier(0.4, 0, 0.2, 1)",
      slow: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
    },
    radius: {
      none: "0",
      sm: "0.25rem",
      md: "0.375rem",
      lg: "0.5rem",
      full: "9999px"
    }
  }), []);
  const getButtonStyles = ({
    variant = "primary",
    size = "md"
  }) => {
    const variantTokens = buttonTokens.variants[variant];
    const sizeTokens = buttonTokens.sizes[size];
    return {
      height: sizeTokens.height,
      padding: sizeTokens.padding,
      fontSize: sizeTokens.fontSize,
      backgroundColor: variantTokens.background,
      color: variantTokens.color,
      border: `1px solid ${variantTokens.border}`,
      borderRadius: buttonTokens.radius.md,
      transition: buttonTokens.transitions.default,
      fontFamily: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      fontWeight: "500",
      cursor: "pointer",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: sizeTokens.gap
    };
  };
  const getButtonClasses = ({
    variant = "primary",
    size = "md",
    fullWidth = false,
    loading = false,
    className = ""
  }) => {
    return [
      "layera-btn",
      `layera-btn--${variant}`,
      `layera-btn--${size}`,
      fullWidth && "layera-btn--full-width",
      loading && "layera-btn--loading",
      className
    ].filter(Boolean).join(" ");
  };
  const getCSSCustomProperties = () => {
    const properties = {};
    Object.entries(buttonTokens.sizes).forEach(([size, tokens]) => {
      properties[`--layera-btn-${size}-height`] = tokens.height;
      properties[`--layera-btn-${size}-padding`] = tokens.padding;
      properties[`--layera-btn-${size}-font-size`] = tokens.fontSize;
      properties[`--layera-btn-${size}-icon-size`] = tokens.iconSize;
      properties[`--layera-btn-${size}-gap`] = tokens.gap;
    });
    Object.entries(buttonTokens.variants).forEach(([variant, tokens]) => {
      properties[`--layera-btn-${variant}-bg`] = tokens.background;
      properties[`--layera-btn-${variant}-color`] = tokens.color;
      properties[`--layera-btn-${variant}-border`] = tokens.border;
      properties[`--layera-btn-${variant}-hover-bg`] = tokens.hover.background;
      properties[`--layera-btn-${variant}-hover-color`] = tokens.hover.color;
      properties[`--layera-btn-${variant}-hover-border`] = tokens.hover.border;
      properties[`--layera-btn-${variant}-active-bg`] = tokens.active.background;
      properties[`--layera-btn-${variant}-active-color`] = tokens.active.color;
      properties[`--layera-btn-${variant}-active-border`] = tokens.active.border;
      properties[`--layera-btn-${variant}-focus-outline`] = tokens.focus.outline;
      properties[`--layera-btn-${variant}-focus-ring`] = tokens.focus.ring;
    });
    Object.entries(buttonTokens.transitions).forEach(([key, value]) => {
      properties[`--layera-btn-transition-${key}`] = value;
    });
    Object.entries(buttonTokens.radius).forEach(([key, value]) => {
      properties[`--layera-btn-radius-${key}`] = value;
    });
    return properties;
  };
  return {
    tokens: buttonTokens,
    getButtonStyles,
    getButtonClasses,
    getCSSCustomProperties
  };
};

exports.Button = Button;
exports.ButtonGroup = ButtonGroup;
exports.LinkButton = LinkButton;
exports.useButton = useButton;
//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.cjs.map