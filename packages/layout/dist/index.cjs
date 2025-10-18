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
  AppShell: () => AppShell,
  HeaderActionsGroup: () => HeaderActionsGroup,
  LayeraHeader: () => LayeraHeader,
  NavItem: () => NavItem,
  NavSection: () => NavSection,
  NavigationSidebar: () => NavigationSidebar,
  PageContainer: () => PageContainer,
  PageHeader: () => PageHeader,
  useLayout: () => useLayout,
  useResponsive: () => useResponsive
});
module.exports = __toCommonJS(src_exports);

// src/components/AppShell/AppShell.tsx
var import_react = require("react");
var import_jsx_runtime = require("react/jsx-runtime");
var AppShell = ({
  children,
  header,
  sidebar,
  footer,
  layout = "dashboard",
  className = "",
  sidebarCollapsed = false,
  onSidebarToggle
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = (0, import_react.useState)(false);
  const [isMobile, setIsMobile] = (0, import_react.useState)(false);
  (0, import_react.useEffect)(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  const handleSidebarToggle = () => {
    if (isMobile) {
      setIsSidebarOpen(!isSidebarOpen);
    } else {
      onSidebarToggle?.(!sidebarCollapsed);
    }
  };
  const handleBackdropClick = () => {
    if (isMobile && isSidebarOpen) {
      setIsSidebarOpen(false);
    }
  };
  (0, import_react.useEffect)(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && isMobile && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMobile, isSidebarOpen]);
  const shellClasses = [
    "layera-app-shell",
    `layera-app-shell--${layout}`,
    sidebarCollapsed && !isMobile ? "sidebar-collapsed" : "",
    !sidebar ? "no-sidebar" : "",
    className
  ].filter(Boolean).join(" ");
  const sidebarClasses = [
    "layera-layout-sidebar",
    "layera-sidebar-transition",
    isMobile && isSidebarOpen ? "sidebar-open" : ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: shellClasses, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", { href: "#main-content", className: "layera-skip-to-content", children: "Skip to main content" }),
    header && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", { className: "layera-layout-header", children: header }),
    sidebar && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", { className: sidebarClasses, children: sidebar }),
      isMobile && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "div",
        {
          className: `layera-layout-sidebar-backdrop ${isSidebarOpen ? "active" : ""}`,
          onClick: handleBackdropClick,
          "aria-hidden": "true"
        }
      )
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", { id: "main-content", className: "layera-layout-content", children }),
    footer && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", { className: "layera-layout-footer", children: footer })
  ] });
};

// src/components/Header/LayeraHeader.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var LayeraHeader = ({
  title,
  subtitle,
  logo,
  navigation,
  actions,
  variant = "standard",
  sticky = true,
  className = ""
}) => {
  const headerClasses = [
    "layera-header",
    `layera-header--${variant}`,
    sticky ? "layera-header--sticky" : "",
    className
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: headerClasses, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "layera-header__container", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "layera-header__left", children: [
      logo && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "layera-header__logo", children: logo }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "layera-header__title-section", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h1", { className: "layera-header__title", children: title }),
        subtitle && variant !== "minimal" && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "layera-header__subtitle", children: subtitle })
      ] })
    ] }),
    navigation && variant === "rich" && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("nav", { className: "layera-header__navigation", role: "navigation", children: navigation }),
    actions && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "layera-header__actions", children: actions })
  ] }) });
};

// src/components/Header/HeaderActionsGroup.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
var HeaderActionsGroup = ({
  children,
  className = ""
}) => {
  const classes = [
    "layera-header-actions-group",
    className
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: classes, children });
};

// src/components/Sidebar/NavigationSidebar.tsx
var import_jsx_runtime4 = require("react/jsx-runtime");
var NavigationSidebar = ({
  children,
  collapsed = false,
  collapsible = true,
  width = 280,
  position = "left",
  variant = "default",
  className = ""
}) => {
  const sidebarClasses = [
    "layera-navigation-sidebar",
    `layera-navigation-sidebar--${variant}`,
    `layera-navigation-sidebar--${position}`,
    collapsed ? "layera-navigation-sidebar--collapsed" : "",
    collapsible ? "layera-navigation-sidebar--collapsible" : "",
    className
  ].filter(Boolean).join(" ");
  const sidebarStyle = {
    "--sidebar-width": typeof width === "number" ? `${width}px` : width
  };
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
    "nav",
    {
      className: sidebarClasses,
      style: sidebarStyle,
      role: "navigation",
      "aria-label": "Main navigation",
      children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "layera-navigation-sidebar__content", children })
    }
  );
};

// src/components/Sidebar/NavItem.tsx
var import_jsx_runtime5 = require("react/jsx-runtime");
var NavItem = ({
  icon,
  label,
  to,
  href,
  onClick,
  active = false,
  disabled = false,
  badge,
  permission,
  className = ""
}) => {
  const itemClasses = [
    "layera-nav-item",
    active ? "layera-nav-item--active" : "",
    disabled ? "layera-nav-item--disabled" : "",
    className
  ].filter(Boolean).join(" ");
  const renderContent = () => /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_jsx_runtime5.Fragment, { children: [
    icon && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "layera-nav-item__icon", "aria-hidden": "true", children: icon }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "layera-nav-item__label", children: label }),
    badge && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "layera-nav-item__badge", children: badge })
  ] });
  if (href) {
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
      "a",
      {
        href,
        className: itemClasses,
        target: "_blank",
        rel: "noopener noreferrer",
        "aria-label": `${label} (opens in new tab)`,
        children: renderContent()
      }
    );
  }
  if (to) {
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
      "a",
      {
        href: to,
        className: itemClasses,
        "aria-current": active ? "page" : void 0,
        children: renderContent()
      }
    );
  }
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
    "button",
    {
      type: "button",
      className: itemClasses,
      onClick,
      disabled,
      "aria-pressed": active,
      children: renderContent()
    }
  );
};

// src/components/Sidebar/NavSection.tsx
var import_react2 = require("react");
var import_jsx_runtime6 = require("react/jsx-runtime");
var NavSection = ({
  title,
  children,
  collapsible = false,
  defaultCollapsed = false,
  className = ""
}) => {
  const [collapsed, setCollapsed] = (0, import_react2.useState)(defaultCollapsed);
  const sectionClasses = [
    "layera-nav-section",
    collapsed ? "layera-nav-section--collapsed" : "",
    className
  ].filter(Boolean).join(" ");
  const handleToggle = () => {
    if (collapsible) {
      setCollapsed(!collapsed);
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: sectionClasses, children: [
    title && /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
      "div",
      {
        className: "layera-nav-section__header",
        onClick: collapsible ? handleToggle : void 0,
        role: collapsible ? "button" : void 0,
        tabIndex: collapsible ? 0 : void 0,
        "aria-expanded": collapsible ? !collapsed : void 0,
        onKeyDown: (e) => {
          if (collapsible && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            handleToggle();
          }
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "layera-nav-section__title", children: title }),
          collapsible && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "layera-nav-section__toggle", "aria-hidden": "true", children: collapsed ? "\u25B6" : "\u25BC" })
        ]
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "layera-nav-section__content", children })
  ] });
};

// src/components/Container/PageContainer.tsx
var import_jsx_runtime7 = require("react/jsx-runtime");
var PageContainer = ({
  children,
  maxWidth = "xl",
  padding = "lg",
  className = ""
}) => {
  const containerClasses = [
    "layera-page-container",
    `layera-page-container--max-${maxWidth}`,
    `layera-page-container--padding-${padding}`,
    className
  ].filter(Boolean).join(" ");
  const containerStyle = typeof maxWidth === "number" ? { "--container-max-width": `${maxWidth}px` } : {};
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: containerClasses, style: containerStyle, children });
};

// src/components/Container/PageHeader.tsx
var import_jsx_runtime8 = require("react/jsx-runtime");
var PageHeader = ({
  title,
  subtitle,
  actions,
  breadcrumbs,
  className = ""
}) => {
  const headerClasses = [
    "layera-page-header",
    className
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("header", { className: headerClasses, children: [
    breadcrumbs && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "layera-page-header__breadcrumbs", children: breadcrumbs }),
    /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "layera-page-header__main", children: [
      /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "layera-page-header__content", children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("h1", { className: "layera-page-header__title", children: title }),
        subtitle && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("p", { className: "layera-page-header__subtitle", children: subtitle })
      ] }),
      actions && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "layera-page-header__actions", children: actions })
    ] })
  ] });
};

// src/hooks/useLayout.ts
var import_react4 = require("react");

// src/hooks/useResponsive.ts
var import_react3 = require("react");
var useResponsive = () => {
  const [windowSize, setWindowSize] = (0, import_react3.useState)({ width: 0, height: 0 });
  const [currentBreakpoint, setCurrentBreakpoint] = (0, import_react3.useState)("lg");
  (0, import_react3.useEffect)(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setWindowSize({ width, height });
      let breakpoint;
      if (width < 640) {
        breakpoint = "sm";
      } else if (width < 768) {
        breakpoint = "md";
      } else if (width < 1024) {
        breakpoint = "lg";
      } else if (width < 1280) {
        breakpoint = "xl";
      } else {
        breakpoint = "2xl";
      }
      setCurrentBreakpoint(breakpoint);
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return {
    isMobile: windowSize.width < 768,
    isTablet: windowSize.width >= 768 && windowSize.width < 1024,
    isDesktop: windowSize.width >= 1024,
    currentBreakpoint,
    windowSize
  };
};

// src/hooks/useLayout.ts
var useLayout = () => {
  const { currentBreakpoint } = useResponsive();
  const [sidebarCollapsed, setSidebarCollapsed] = (0, import_react4.useState)(false);
  const [headerHeight, setHeaderHeight] = (0, import_react4.useState)(64);
  const [sidebarWidth, setSidebarWidth] = (0, import_react4.useState)(280);
  const toggleSidebar = (0, import_react4.useCallback)(() => {
    setSidebarCollapsed((prev) => !prev);
  }, []);
  const handleSetSidebarCollapsed = (0, import_react4.useCallback)((collapsed) => {
    setSidebarCollapsed(collapsed);
  }, []);
  const handleSetHeaderHeight = (0, import_react4.useCallback)((height) => {
    setHeaderHeight(height);
  }, []);
  const state = {
    sidebarCollapsed,
    headerHeight,
    sidebarWidth,
    breakpoint: currentBreakpoint
  };
  const actions = {
    toggleSidebar,
    setSidebarCollapsed: handleSetSidebarCollapsed,
    setHeaderHeight: handleSetHeaderHeight
  };
  return [state, actions];
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AppShell,
  HeaderActionsGroup,
  LayeraHeader,
  NavItem,
  NavSection,
  NavigationSidebar,
  PageContainer,
  PageHeader,
  useLayout,
  useResponsive
});
