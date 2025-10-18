// src/components/AppShell/AppShell.tsx
import { useState, useEffect } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
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
  useEffect(() => {
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
    className
  ].filter(Boolean).join(" ");
  const sidebarClasses = [
    "layera-layout-sidebar",
    "layera-sidebar-transition",
    isMobile && isSidebarOpen ? "sidebar-open" : ""
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsxs("div", { className: shellClasses, children: [
    /* @__PURE__ */ jsx("a", { href: "#main-content", className: "layera-skip-to-content", children: "Skip to main content" }),
    header && /* @__PURE__ */ jsx("header", { className: "layera-layout-header", children: header }),
    sidebar && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("aside", { className: sidebarClasses, children: sidebar }),
      isMobile && /* @__PURE__ */ jsx(
        "div",
        {
          className: `layera-layout-sidebar-backdrop ${isSidebarOpen ? "active" : ""}`,
          onClick: handleBackdropClick,
          "aria-hidden": "true"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("main", { id: "main-content", className: "layera-layout-content", children }),
    footer && /* @__PURE__ */ jsx("footer", { className: "layera-layout-footer", children: footer })
  ] });
};

// src/components/Header/LayeraHeader.tsx
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsx2("div", { className: headerClasses, children: /* @__PURE__ */ jsxs2("div", { className: "layera-header__container", children: [
    /* @__PURE__ */ jsxs2("div", { className: "layera-header__left", children: [
      logo && /* @__PURE__ */ jsx2("div", { className: "layera-header__logo", children: logo }),
      /* @__PURE__ */ jsxs2("div", { className: "layera-header__title-section", children: [
        /* @__PURE__ */ jsx2("h1", { className: "layera-header__title", children: title }),
        subtitle && variant !== "minimal" && /* @__PURE__ */ jsx2("p", { className: "layera-header__subtitle", children: subtitle })
      ] })
    ] }),
    navigation && variant === "rich" && /* @__PURE__ */ jsx2("nav", { className: "layera-header__navigation", role: "navigation", children: navigation }),
    actions && /* @__PURE__ */ jsx2("div", { className: "layera-header__actions", children: actions })
  ] }) });
};

// src/components/Header/HeaderActionsGroup.tsx
import { jsx as jsx3 } from "react/jsx-runtime";
var HeaderActionsGroup = ({
  children,
  className = ""
}) => {
  const classes = [
    "layera-header-actions-group",
    className
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ jsx3("div", { className: classes, children });
};

// src/components/Sidebar/NavigationSidebar.tsx
import { jsx as jsx4 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsx4(
    "nav",
    {
      className: sidebarClasses,
      style: sidebarStyle,
      role: "navigation",
      "aria-label": "Main navigation",
      children: /* @__PURE__ */ jsx4("div", { className: "layera-navigation-sidebar__content", children })
    }
  );
};

// src/components/Sidebar/NavItem.tsx
import { Fragment as Fragment2, jsx as jsx5, jsxs as jsxs3 } from "react/jsx-runtime";
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
  const renderContent = () => /* @__PURE__ */ jsxs3(Fragment2, { children: [
    icon && /* @__PURE__ */ jsx5("span", { className: "layera-nav-item__icon", "aria-hidden": "true", children: icon }),
    /* @__PURE__ */ jsx5("span", { className: "layera-nav-item__label", children: label }),
    badge && /* @__PURE__ */ jsx5("span", { className: "layera-nav-item__badge", children: badge })
  ] });
  if (href) {
    return /* @__PURE__ */ jsx5(
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
    return /* @__PURE__ */ jsx5(
      "a",
      {
        href: to,
        className: itemClasses,
        "aria-current": active ? "page" : void 0,
        children: renderContent()
      }
    );
  }
  return /* @__PURE__ */ jsx5(
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
import { useState as useState2 } from "react";
import { jsx as jsx6, jsxs as jsxs4 } from "react/jsx-runtime";
var NavSection = ({
  title,
  children,
  collapsible = false,
  defaultCollapsed = false,
  className = ""
}) => {
  const [collapsed, setCollapsed] = useState2(defaultCollapsed);
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
  return /* @__PURE__ */ jsxs4("div", { className: sectionClasses, children: [
    title && /* @__PURE__ */ jsxs4(
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
          /* @__PURE__ */ jsx6("span", { className: "layera-nav-section__title", children: title }),
          collapsible && /* @__PURE__ */ jsx6("span", { className: "layera-nav-section__toggle", "aria-hidden": "true", children: collapsed ? "\u25B6" : "\u25BC" })
        ]
      }
    ),
    /* @__PURE__ */ jsx6("div", { className: "layera-nav-section__content", children })
  ] });
};

// src/components/Container/PageContainer.tsx
import { jsx as jsx7 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsx7("div", { className: containerClasses, style: containerStyle, children });
};

// src/components/Container/PageHeader.tsx
import { jsx as jsx8, jsxs as jsxs5 } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsxs5("header", { className: headerClasses, children: [
    breadcrumbs && /* @__PURE__ */ jsx8("div", { className: "layera-page-header__breadcrumbs", children: breadcrumbs }),
    /* @__PURE__ */ jsxs5("div", { className: "layera-page-header__main", children: [
      /* @__PURE__ */ jsxs5("div", { className: "layera-page-header__content", children: [
        /* @__PURE__ */ jsx8("h1", { className: "layera-page-header__title", children: title }),
        subtitle && /* @__PURE__ */ jsx8("p", { className: "layera-page-header__subtitle", children: subtitle })
      ] }),
      actions && /* @__PURE__ */ jsx8("div", { className: "layera-page-header__actions", children: actions })
    ] })
  ] });
};

// src/hooks/useLayout.ts
import { useState as useState4, useCallback } from "react";

// src/hooks/useResponsive.ts
import { useState as useState3, useEffect as useEffect2 } from "react";
var useResponsive = () => {
  const [windowSize, setWindowSize] = useState3({ width: 0, height: 0 });
  const [currentBreakpoint, setCurrentBreakpoint] = useState3("lg");
  useEffect2(() => {
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
  const [sidebarCollapsed, setSidebarCollapsed] = useState4(false);
  const [headerHeight, setHeaderHeight] = useState4(64);
  const [sidebarWidth, setSidebarWidth] = useState4(280);
  const toggleSidebar = useCallback(() => {
    setSidebarCollapsed((prev) => !prev);
  }, []);
  const handleSetSidebarCollapsed = useCallback((collapsed) => {
    setSidebarCollapsed(collapsed);
  }, []);
  const handleSetHeaderHeight = useCallback((height) => {
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
export {
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
};
