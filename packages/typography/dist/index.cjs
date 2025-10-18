'use strict';

var jsxRuntime = require('react/jsx-runtime');
var react = require('react');

var Text = ({
  size = "base",
  weight = "normal",
  align = "left",
  color = "secondary",
  lineHeight = "normal",
  className = "",
  as: Component = "p",
  children,
  ...props
}) => {
  const classes = [
    "layera-text",
    `layera-text-${size}`,
    `layera-font-${weight}`,
    `layera-text-${align}`,
    `layera-text-${color}`,
    `layera-leading-${lineHeight}`,
    className
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsxRuntime.jsx(Component, { className: classes, ...props, children });
};
Text.displayName = "LayeraText";
var Heading = ({
  size = "2xl",
  weight = "semibold",
  align = "left",
  color = "primary",
  lineHeight = "tight",
  className = "",
  as: Component = "h2",
  children,
  ...props
}) => {
  const getDefaultStylesForLevel = () => {
    switch (Component) {
      case "h1":
        return {
          size: "4xl",
          weight: "extrabold",
          lineHeight: "tight"
        };
      case "h2":
        return {
          size: "3xl",
          weight: "bold",
          lineHeight: "tight"
        };
      case "h3":
        return {
          size: "2xl",
          weight: "semibold",
          lineHeight: "snug"
        };
      case "h4":
        return {
          size: "xl",
          weight: "semibold",
          lineHeight: "snug"
        };
      case "h5":
        return {
          size: "lg",
          weight: "medium",
          lineHeight: "normal"
        };
      case "h6":
        return {
          size: "base",
          weight: "medium",
          lineHeight: "normal"
        };
      default:
        return { size, weight, lineHeight };
    }
  };
  const defaults = getDefaultStylesForLevel();
  const finalSize = size || defaults.size;
  const finalWeight = weight || defaults.weight;
  const finalLineHeight = lineHeight || defaults.lineHeight;
  const classes = [
    "layera-text",
    `layera-text-${finalSize}`,
    `layera-font-${finalWeight}`,
    `layera-text-${align}`,
    `layera-text-${color}`,
    `layera-leading-${finalLineHeight}`,
    className
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsxRuntime.jsx(Component, { className: classes, ...props, children });
};
Heading.displayName = "LayeraHeading";
var useTypography = () => {
  const typographyScale = react.useMemo(() => ({
    fontSizes: {
      xs: "0.75rem",
      // 12px
      sm: "0.875rem",
      // 14px
      base: "1rem",
      // 16px
      lg: "1.125rem",
      // 18px
      xl: "1.25rem",
      // 20px
      "2xl": "1.5rem",
      // 24px
      "3xl": "1.875rem",
      // 30px
      "4xl": "2.25rem",
      // 36px
      "5xl": "3rem",
      // 48px
      "6xl": "3.75rem"
      // 60px
    },
    fontWeights: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800
    },
    lineHeights: {
      tight: 1.25,
      snug: 1.375,
      normal: 1.5,
      relaxed: 1.625,
      loose: 2
    },
    letterSpacing: {
      xs: "-0.025em",
      sm: "-0.0125em",
      base: "0em",
      lg: "0.0125em",
      xl: "0.025em",
      "2xl": "0.025em",
      "3xl": "0.025em",
      "4xl": "0.025em",
      "5xl": "0.025em",
      "6xl": "0.025em"
    }
  }), []);
  const getTypographyStyles = ({
    size = "base",
    weight = "normal",
    lineHeight = "normal"
  }) => {
    return {
      fontSize: typographyScale.fontSizes[size],
      fontWeight: typographyScale.fontWeights[weight],
      lineHeight: typographyScale.lineHeights[lineHeight],
      letterSpacing: typographyScale.letterSpacing[size],
      fontFamily: "var(--layera-font-family-sans)"
    };
  };
  const getTypographyClasses = ({
    size = "base",
    weight = "normal",
    lineHeight = "normal",
    color = "secondary",
    align = "left"
  }) => {
    return [
      "layera-text",
      `layera-text-${size}`,
      `layera-font-${weight}`,
      `layera-leading-${lineHeight}`,
      `layera-text-${color}`,
      `layera-text-${align}`
    ].join(" ");
  };
  const getCSSCustomProperties = () => {
    return {
      "--layera-font-family-sans": 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      "--layera-font-family-mono": '"SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace',
      ...Object.fromEntries(
        Object.entries(typographyScale.fontSizes).map(([key, value]) => [
          `--layera-text-${key}`,
          value
        ])
      ),
      ...Object.fromEntries(
        Object.entries(typographyScale.fontWeights).map(([key, value]) => [
          `--layera-font-${key}`,
          value
        ])
      ),
      ...Object.fromEntries(
        Object.entries(typographyScale.lineHeights).map(([key, value]) => [
          `--layera-leading-${key}`,
          value
        ])
      )
    };
  };
  return {
    scale: typographyScale,
    getTypographyStyles,
    getTypographyClasses,
    getCSSCustomProperties
  };
};

exports.Heading = Heading;
exports.Text = Text;
exports.useTypography = useTypography;
//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.cjs.map