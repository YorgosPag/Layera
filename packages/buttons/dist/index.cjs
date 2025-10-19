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
        background: "var(--layera-bg-info)",
        color: "var(--layera-text-on-info)",
        border: "var(--layera-bg-info)",
        hover: {
          background: "color-mix(in srgb, var(--layera-bg-info) 80%, black 20%)",
          color: "var(--layera-text-on-info)",
          border: "color-mix(in srgb, var(--layera-bg-info) 80%, black 20%)"
        },
        active: {
          background: "color-mix(in srgb, var(--layera-bg-info) 70%, black 30%)",
          color: "var(--layera-text-on-info)",
          border: "color-mix(in srgb, var(--layera-bg-info) 70%, black 30%)"
        },
        focus: {
          outline: "2px solid color-mix(in srgb, var(--layera-bg-info) 50%, transparent 50%)",
          ring: "0 0 0 2px color-mix(in srgb, var(--layera-bg-info) 30%, transparent 70%)"
        },
        disabled: {
          background: "var(--layera-bg-tertiary)",
          color: "var(--layera-text-tertiary)",
          border: "var(--layera-border-primary)"
        }
      },
      secondary: {
        background: "var(--layera-text-secondary)",
        color: "var(--layera-text-on-dark)",
        border: "var(--layera-text-secondary)",
        hover: {
          background: "color-mix(in srgb, var(--layera-text-secondary) 80%, black 20%)",
          color: "var(--layera-text-on-dark)",
          border: "color-mix(in srgb, var(--layera-text-secondary) 80%, black 20%)"
        },
        active: {
          background: "color-mix(in srgb, var(--layera-text-secondary) 70%, black 30%)",
          color: "var(--layera-text-on-dark)",
          border: "color-mix(in srgb, var(--layera-text-secondary) 70%, black 30%)"
        },
        focus: {
          outline: "2px solid color-mix(in srgb, var(--layera-text-secondary) 50%, transparent 50%)",
          ring: "0 0 0 2px color-mix(in srgb, var(--layera-text-secondary) 30%, transparent 70%)"
        },
        disabled: {
          background: "var(--layera-bg-tertiary)",
          color: "var(--layera-text-tertiary)",
          border: "var(--layera-border-primary)"
        }
      },
      outline: {
        background: "transparent",
        color: "var(--layera-bg-info)",
        border: "var(--layera-bg-info)",
        hover: {
          background: "var(--layera-bg-info)",
          color: "var(--layera-text-on-info)",
          border: "var(--layera-bg-info)"
        },
        active: {
          background: "color-mix(in srgb, var(--layera-bg-info) 70%, black 30%)",
          color: "var(--layera-text-on-info)",
          border: "color-mix(in srgb, var(--layera-bg-info) 70%, black 30%)"
        },
        focus: {
          outline: "2px solid color-mix(in srgb, var(--layera-bg-info) 50%, transparent 50%)",
          ring: "0 0 0 2px color-mix(in srgb, var(--layera-bg-info) 30%, transparent 70%)"
        },
        disabled: {
          background: "var(--layera-bg-tertiary)",
          color: "var(--layera-text-tertiary)",
          border: "var(--layera-border-primary)"
        }
      },
      ghost: {
        background: "transparent",
        color: "var(--layera-text-primary)",
        border: "transparent",
        hover: {
          background: "var(--layera-bg-tertiary)",
          color: "var(--layera-text-primary)",
          border: "transparent"
        },
        active: {
          background: "var(--layera-bg-secondary)",
          color: "var(--layera-text-primary)",
          border: "transparent"
        },
        focus: {
          outline: "2px solid var(--layera-border-secondary)",
          ring: "0 0 0 2px color-mix(in srgb, var(--layera-border-primary) 30%, transparent 70%)"
        },
        disabled: {
          background: "var(--layera-bg-tertiary)",
          color: "var(--layera-text-tertiary)",
          border: "var(--layera-border-primary)"
        }
      },
      danger: {
        background: "var(--layera-bg-danger)",
        color: "var(--layera-text-on-dark)",
        border: "var(--layera-bg-danger)",
        hover: {
          background: "color-mix(in srgb, var(--layera-bg-danger) 80%, black 20%)",
          color: "var(--layera-text-on-dark)",
          border: "color-mix(in srgb, var(--layera-bg-danger) 80%, black 20%)"
        },
        active: {
          background: "color-mix(in srgb, var(--layera-bg-danger) 70%, black 30%)",
          color: "var(--layera-text-on-dark)",
          border: "color-mix(in srgb, var(--layera-bg-danger) 70%, black 30%)"
        },
        focus: {
          outline: "2px solid color-mix(in srgb, var(--layera-bg-danger) 50%, transparent 50%)",
          ring: "0 0 0 2px color-mix(in srgb, var(--layera-bg-danger) 30%, transparent 70%)"
        },
        disabled: {
          background: "var(--layera-bg-tertiary)",
          color: "var(--layera-text-tertiary)",
          border: "var(--layera-border-primary)"
        }
      },
      success: {
        background: "var(--layera-bg-success)",
        color: "var(--layera-text-on-success)",
        border: "var(--layera-bg-success)",
        hover: {
          background: "color-mix(in srgb, var(--layera-bg-success) 80%, black 20%)",
          color: "var(--layera-text-on-success)",
          border: "color-mix(in srgb, var(--layera-bg-success) 80%, black 20%)"
        },
        active: {
          background: "color-mix(in srgb, var(--layera-bg-success) 70%, black 30%)",
          color: "var(--layera-text-on-success)",
          border: "color-mix(in srgb, var(--layera-bg-success) 70%, black 30%)"
        },
        focus: {
          outline: "2px solid color-mix(in srgb, var(--layera-bg-success) 50%, transparent 50%)",
          ring: "0 0 0 2px color-mix(in srgb, var(--layera-bg-success) 30%, transparent 70%)"
        },
        disabled: {
          background: "var(--layera-bg-tertiary)",
          color: "var(--layera-text-tertiary)",
          border: "var(--layera-border-primary)"
        }
      },
      warning: {
        background: "var(--layera-bg-warning)",
        color: "var(--layera-text-on-dark)",
        border: "var(--layera-bg-warning)",
        hover: {
          background: "color-mix(in srgb, var(--layera-bg-warning) 80%, black 20%)",
          color: "var(--layera-text-on-dark)",
          border: "color-mix(in srgb, var(--layera-bg-warning) 80%, black 20%)"
        },
        active: {
          background: "color-mix(in srgb, var(--layera-bg-warning) 70%, black 30%)",
          color: "var(--layera-text-on-dark)",
          border: "color-mix(in srgb, var(--layera-bg-warning) 70%, black 30%)"
        },
        focus: {
          outline: "2px solid color-mix(in srgb, var(--layera-bg-warning) 50%, transparent 50%)",
          ring: "0 0 0 2px color-mix(in srgb, var(--layera-bg-warning) 30%, transparent 70%)"
        },
        disabled: {
          background: "var(--layera-bg-tertiary)",
          color: "var(--layera-text-tertiary)",
          border: "var(--layera-border-primary)"
        }
      },
      info: {
        background: "var(--layera-bg-info)",
        color: "var(--layera-text-on-info)",
        border: "var(--layera-bg-info)",
        hover: {
          background: "color-mix(in srgb, var(--layera-bg-info) 80%, black 20%)",
          color: "var(--layera-text-on-info)",
          border: "color-mix(in srgb, var(--layera-bg-info) 80%, black 20%)"
        },
        active: {
          background: "color-mix(in srgb, var(--layera-bg-info) 70%, black 30%)",
          color: "var(--layera-text-on-info)",
          border: "color-mix(in srgb, var(--layera-bg-info) 70%, black 30%)"
        },
        focus: {
          outline: "2px solid color-mix(in srgb, var(--layera-bg-info) 50%, transparent 50%)",
          ring: "0 0 0 2px color-mix(in srgb, var(--layera-bg-info) 30%, transparent 70%)"
        },
        disabled: {
          background: "var(--layera-bg-tertiary)",
          color: "var(--layera-text-tertiary)",
          border: "var(--layera-border-primary)"
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