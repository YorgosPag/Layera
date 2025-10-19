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
  BaseCard: () => BaseCard,
  DashboardCard: () => DashboardCard,
  DashboardGrid: () => DashboardGrid,
  DashboardSection: () => DashboardSection
});
module.exports = __toCommonJS(src_exports);

// src/components/BaseCard/BaseCard.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var BaseCard = ({
  children,
  title,
  subtitle,
  actions,
  footer,
  variant = "elevated",
  size = "md",
  padding = "md",
  hoverable = false,
  clickable = false,
  onClick,
  className = "",
  style
}) => {
  const cardClasses = [
    "layera-card",
    `layera-card--${variant}`,
    `layera-card--${size}`,
    `layera-card--padding-${padding}`,
    hoverable ? "layera-card--hoverable" : "",
    clickable ? "layera-card--clickable" : "",
    className
  ].filter(Boolean).join(" ");
  const handleClick = () => {
    if (clickable && onClick) {
      onClick();
    }
  };
  const handleKeyDown = (event) => {
    if (clickable && onClick && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      onClick();
    }
  };
  const CardElement = clickable ? "button" : "div";
  const extraProps = clickable ? {
    onClick: handleClick,
    onKeyDown: handleKeyDown,
    tabIndex: 0,
    role: "button",
    "aria-pressed": false
  } : {};
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardElement, { className: cardClasses, style, ...extraProps, children: [
    (title || subtitle || actions) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "layera-card__header", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "layera-card__header-content", children: [
        title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { className: "layera-card__title", children: title }),
        subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "layera-card__subtitle", children: subtitle })
      ] }),
      actions && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "layera-card__actions", children: actions })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "layera-card__content", children }),
    footer && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "layera-card__footer", children: footer })
  ] });
};

// src/components/DashboardCard/DashboardCard.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var DashboardCard = ({
  children,
  variant = "info",
  loading = false,
  error = null,
  metric,
  ...baseProps
}) => {
  const renderContent = () => {
    if (loading) {
      return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "layera-dashboard-card__loading", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "layera-dashboard-card__skeleton", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "layera-skeleton layera-skeleton--text" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "layera-skeleton layera-skeleton--text layera-skeleton--sm" })
      ] }) });
    }
    if (error) {
      return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "layera-dashboard-card__error", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "layera-dashboard-card__error-icon", children: "\u26A0\uFE0F" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "layera-dashboard-card__error-message", children: error })
      ] });
    }
    if (metric) {
      return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "layera-dashboard-card__metric", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "layera-dashboard-card__metric-value", children: metric.value }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "layera-dashboard-card__metric-label", children: metric.label }),
        metric.change && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: `layera-dashboard-card__metric-change layera-dashboard-card__metric-change--${metric.change.direction}`, children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "layera-dashboard-card__metric-change-icon", children: metric.change.direction === "up" ? "\u2197\uFE0F" : metric.change.direction === "down" ? "\u2198\uFE0F" : "\u2192" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "layera-dashboard-card__metric-change-value", children: [
            metric.change.value > 0 ? "+" : "",
            metric.change.value,
            "%"
          ] }),
          metric.change.period && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "layera-dashboard-card__metric-change-period", children: metric.change.period })
        ] })
      ] });
    }
    return children;
  };
  const cardClasses = [
    "layera-dashboard-card",
    `layera-dashboard-card--${variant}`,
    loading ? "layera-dashboard-card--loading" : "",
    error ? "layera-dashboard-card--error" : ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    BaseCard,
    {
      ...baseProps,
      className: `${cardClasses} ${baseProps.className || ""}`,
      children: renderContent()
    }
  );
};

// src/layouts/DashboardGrid.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
var DashboardGrid = ({
  children,
  columns = { xs: 1, md: 2, lg: 3 },
  gap = "lg",
  className = ""
}) => {
  const gridClasses = [
    "layera-dashboard-grid",
    `layera-dashboard-grid--gap-${gap}`,
    className
  ].filter(Boolean).join(" ");
  const gridStyle = {
    "--grid-cols-xs": columns.xs || 1,
    "--grid-cols-sm": columns.sm || columns.xs || 1,
    "--grid-cols-md": columns.md || columns.sm || columns.xs || 2,
    "--grid-cols-lg": columns.lg || columns.md || columns.sm || 3,
    "--grid-cols-xl": columns.xl || columns.lg || columns.md || 4
  };
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: gridClasses, style: gridStyle, children });
};
var DashboardSection = ({
  children,
  title,
  subtitle,
  actions,
  className = ""
}) => {
  const sectionClasses = [
    "layera-dashboard-section",
    className
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("section", { className: sectionClasses, children: [
    (title || subtitle || actions) && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "layera-dashboard-section__header", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "layera-dashboard-section__header-content", children: [
        title && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h2", { className: "layera-dashboard-section__title", children: title }),
        subtitle && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("p", { className: "layera-dashboard-section__subtitle", children: subtitle })
      ] }),
      actions && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "layera-dashboard-section__actions", children: actions })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "layera-dashboard-section__content", children })
  ] });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BaseCard,
  DashboardCard,
  DashboardGrid,
  DashboardSection
});
