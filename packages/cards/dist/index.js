// src/components/BaseCard/BaseCard.tsx
import { jsx, jsxs } from "react/jsx-runtime";
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
  className = ""
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
  return /* @__PURE__ */ jsxs(CardElement, { className: cardClasses, ...extraProps, children: [
    (title || subtitle || actions) && /* @__PURE__ */ jsxs("div", { className: "layera-card__header", children: [
      /* @__PURE__ */ jsxs("div", { className: "layera-card__header-content", children: [
        title && /* @__PURE__ */ jsx("h3", { className: "layera-card__title", children: title }),
        subtitle && /* @__PURE__ */ jsx("p", { className: "layera-card__subtitle", children: subtitle })
      ] }),
      actions && /* @__PURE__ */ jsx("div", { className: "layera-card__actions", children: actions })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "layera-card__content", children }),
    footer && /* @__PURE__ */ jsx("div", { className: "layera-card__footer", children: footer })
  ] });
};

// src/components/DashboardCard/DashboardCard.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
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
      return /* @__PURE__ */ jsx2("div", { className: "layera-dashboard-card__loading", children: /* @__PURE__ */ jsxs2("div", { className: "layera-dashboard-card__skeleton", children: [
        /* @__PURE__ */ jsx2("div", { className: "layera-skeleton layera-skeleton--text" }),
        /* @__PURE__ */ jsx2("div", { className: "layera-skeleton layera-skeleton--text layera-skeleton--sm" })
      ] }) });
    }
    if (error) {
      return /* @__PURE__ */ jsxs2("div", { className: "layera-dashboard-card__error", children: [
        /* @__PURE__ */ jsx2("div", { className: "layera-dashboard-card__error-icon", children: "\u26A0\uFE0F" }),
        /* @__PURE__ */ jsx2("p", { className: "layera-dashboard-card__error-message", children: error })
      ] });
    }
    if (metric) {
      return /* @__PURE__ */ jsxs2("div", { className: "layera-dashboard-card__metric", children: [
        /* @__PURE__ */ jsx2("div", { className: "layera-dashboard-card__metric-value", children: metric.value }),
        /* @__PURE__ */ jsx2("div", { className: "layera-dashboard-card__metric-label", children: metric.label }),
        metric.change && /* @__PURE__ */ jsxs2("div", { className: `layera-dashboard-card__metric-change layera-dashboard-card__metric-change--${metric.change.direction}`, children: [
          /* @__PURE__ */ jsx2("span", { className: "layera-dashboard-card__metric-change-icon", children: metric.change.direction === "up" ? "\u2197\uFE0F" : metric.change.direction === "down" ? "\u2198\uFE0F" : "\u2192" }),
          /* @__PURE__ */ jsxs2("span", { className: "layera-dashboard-card__metric-change-value", children: [
            metric.change.value > 0 ? "+" : "",
            metric.change.value,
            "%"
          ] }),
          metric.change.period && /* @__PURE__ */ jsx2("span", { className: "layera-dashboard-card__metric-change-period", children: metric.change.period })
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
  return /* @__PURE__ */ jsx2(
    BaseCard,
    {
      ...baseProps,
      className: `${cardClasses} ${baseProps.className || ""}`,
      children: renderContent()
    }
  );
};

// src/layouts/DashboardGrid.tsx
import { jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsx3("div", { className: gridClasses, style: gridStyle, children });
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
  return /* @__PURE__ */ jsxs3("section", { className: sectionClasses, children: [
    (title || subtitle || actions) && /* @__PURE__ */ jsxs3("div", { className: "layera-dashboard-section__header", children: [
      /* @__PURE__ */ jsxs3("div", { className: "layera-dashboard-section__header-content", children: [
        title && /* @__PURE__ */ jsx3("h2", { className: "layera-dashboard-section__title", children: title }),
        subtitle && /* @__PURE__ */ jsx3("p", { className: "layera-dashboard-section__subtitle", children: subtitle })
      ] }),
      actions && /* @__PURE__ */ jsx3("div", { className: "layera-dashboard-section__actions", children: actions })
    ] }),
    /* @__PURE__ */ jsx3("div", { className: "layera-dashboard-section__content", children })
  ] });
};
export {
  BaseCard,
  DashboardCard,
  DashboardGrid,
  DashboardSection
};
