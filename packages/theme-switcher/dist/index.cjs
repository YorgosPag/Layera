"use client";
"use strict";
"use client";
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
var src_exports = {};
__export(src_exports, {
  ThemeProvider: () => ThemeProvider,
  ThemeSwitcher: () => ThemeSwitcher,
  useTheme: () => useTheme,
  useThemeContext: () => useThemeContext
});
module.exports = __toCommonJS(src_exports);

// src/components/ThemeSwitcher.tsx
var import_react3 = require("react");

// src/hooks/useTheme.ts
var import_react2 = require("react");

// src/context/ThemeContext.tsx
var import_react = __toESM(require("react"), 1);
var import_jsx_runtime = require("react/jsx-runtime");
var ThemeContext = (0, import_react.createContext)(void 0);
var MEDIA_QUERY = "(prefers-color-scheme: dark)";
var DEFAULT_STORAGE_KEY = "layera-theme";
var DEFAULT_ATTRIBUTE = "data-theme";
function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = DEFAULT_STORAGE_KEY,
  disableSystemTheme = false,
  attribute = DEFAULT_ATTRIBUTE,
  value
}) {
  const [theme, setThemeState] = (0, import_react.useState)(() => {
    if (typeof window === "undefined")
      return defaultTheme;
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored && ["light", "dark", "system"].includes(stored)) {
        return stored;
      }
    } catch (error) {
      console.warn("[@layera/theme-switcher] Failed to read from localStorage:", error);
    }
    return defaultTheme;
  });
  const [systemSupportsDarkMode, setSystemSupportsDarkMode] = (0, import_react.useState)(false);
  const [isThemeLoaded, setIsThemeLoaded] = (0, import_react.useState)(false);
  const resolvedTheme = import_react.default.useMemo(() => {
    if (theme === "system") {
      return systemSupportsDarkMode ? "dark" : "light";
    }
    return theme;
  }, [theme, systemSupportsDarkMode]);
  (0, import_react.useEffect)(() => {
    if (disableSystemTheme)
      return;
    const mediaQuery = window.matchMedia(MEDIA_QUERY);
    setSystemSupportsDarkMode(mediaQuery.matches);
    const handleChange = (e) => {
      setSystemSupportsDarkMode(e.matches);
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [disableSystemTheme]);
  (0, import_react.useEffect)(() => {
    const root = document.documentElement;
    const themeValue = value?.[resolvedTheme] || resolvedTheme;
    root.setAttribute(attribute, themeValue);
    root.classList.remove("light", "dark");
    root.classList.add(resolvedTheme);
    setIsThemeLoaded(true);
  }, [resolvedTheme, attribute, value]);
  (0, import_react.useEffect)(() => {
    try {
      localStorage.setItem(storageKey, theme);
    } catch (error) {
      console.warn("[@layera/theme-switcher] Failed to write to localStorage:", error);
    }
  }, [theme, storageKey]);
  const setTheme = (0, import_react.useCallback)((newTheme) => {
    setThemeState(newTheme);
  }, []);
  const contextValue = {
    theme,
    resolvedTheme,
    setTheme,
    systemSupportsDarkMode,
    isThemeLoaded
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeContext.Provider, { value: contextValue, children });
}
function useThemeContext() {
  const context = (0, import_react.useContext)(ThemeContext);
  if (context === void 0) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
}

// src/hooks/useTheme.ts
function useTheme() {
  const {
    theme,
    resolvedTheme,
    setTheme,
    systemSupportsDarkMode
  } = useThemeContext();
  const toggleTheme = (0, import_react2.useCallback)(() => {
    if (resolvedTheme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, [resolvedTheme, setTheme]);
  const cycleTheme = (0, import_react2.useCallback)(() => {
    switch (theme) {
      case "light":
        setTheme("dark");
        break;
      case "dark":
        setTheme("system");
        break;
      case "system":
        setTheme("light");
        break;
      default:
        setTheme("light");
    }
  }, [theme, setTheme]);
  return {
    theme,
    resolvedTheme,
    setTheme,
    systemSupportsDarkMode,
    toggleTheme,
    cycleTheme
  };
}

// src/components/ThemeSwitcher.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var SunIcon = () => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
  "svg",
  {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("circle", { cx: "12", cy: "12", r: "5" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "M12 1v2" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "M12 21v2" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "m4.22 4.22 1.42 1.42" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "m18.36 18.36 1.42 1.42" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "M1 12h2" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "M21 12h2" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "m4.22 19.78 1.42-1.42" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "m18.36 5.64 1.42-1.42" })
    ]
  }
);
var MoonIcon = () => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
  "svg",
  {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { d: "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" })
  }
);
var SystemIcon = () => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
  "svg",
  {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("rect", { x: "2", y: "3", width: "20", height: "14", rx: "2", ry: "2" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("line", { x1: "8", y1: "21", x2: "16", y2: "21" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("line", { x1: "12", y1: "17", x2: "12", y2: "21" })
    ]
  }
);
var ThemeSwitcher = (0, import_react3.forwardRef)(({
  variant = "icon",
  size = "md",
  className = "",
  labels = {
    light: "\u03A6\u03C9\u03C4\u03B5\u03B9\u03BD\u03CC \u03B8\u03AD\u03BC\u03B1",
    dark: "\u03A3\u03BA\u03BF\u03C4\u03B5\u03B9\u03BD\u03CC \u03B8\u03AD\u03BC\u03B1",
    system: "\u03A3\u03CD\u03C3\u03C4\u03B7\u03BC\u03B1"
  },
  showLabels = false,
  icons = {
    light: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(SunIcon, {}),
    dark: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(MoonIcon, {}),
    system: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(SystemIcon, {})
  },
  align = "right",
  ...props
}, ref) => {
  const { theme, resolvedTheme, setTheme, cycleTheme, toggleTheme } = useTheme();
  const sizeClasses = {
    sm: "layera-theme-switcher--sm",
    md: "layera-theme-switcher--md",
    lg: "layera-theme-switcher--lg"
  };
  const variantClasses = {
    icon: "layera-theme-switcher--icon",
    button: "layera-theme-switcher--button",
    dropdown: "layera-theme-switcher--dropdown"
  };
  const getCurrentIcon = () => {
    if (theme === "system") {
      return icons.system;
    }
    return resolvedTheme === "light" ? icons.light : icons.dark;
  };
  const getCurrentLabel = () => {
    if (theme === "system") {
      return labels.system;
    }
    return resolvedTheme === "light" ? labels.light : labels.dark;
  };
  const handleClick = () => {
    if (variant === "icon") {
      toggleTheme();
    } else {
      cycleTheme();
    }
  };
  const classes = [
    "layera-theme-switcher",
    variantClasses[variant],
    sizeClasses[size],
    className
  ].filter(Boolean).join(" ");
  if (variant === "icon") {
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
      "button",
      {
        ref,
        type: "button",
        className: classes,
        onClick: handleClick,
        "aria-label": `\u0391\u03BB\u03BB\u03B1\u03B3\u03AE \u03C3\u03B5 ${resolvedTheme === "light" ? "\u03C3\u03BA\u03BF\u03C4\u03B5\u03B9\u03BD\u03CC" : "\u03C6\u03C9\u03C4\u03B5\u03B9\u03BD\u03CC"} \u03B8\u03AD\u03BC\u03B1`,
        title: getCurrentLabel(),
        ...props,
        children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "layera-theme-switcher__icon", "aria-hidden": "true", children: getCurrentIcon() })
      }
    );
  }
  if (variant === "button") {
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
      "button",
      {
        ref,
        type: "button",
        className: classes,
        onClick: handleClick,
        "aria-label": `\u03A4\u03C1\u03AD\u03C7\u03BF\u03BD \u03B8\u03AD\u03BC\u03B1: ${getCurrentLabel()}. \u039A\u03BB\u03B9\u03BA \u03B3\u03B9\u03B1 \u03B1\u03BB\u03BB\u03B1\u03B3\u03AE.`,
        ...props,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "layera-theme-switcher__icon", "aria-hidden": "true", children: getCurrentIcon() }),
          showLabels && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "layera-theme-switcher__label", children: getCurrentLabel() })
        ]
      }
    );
  }
  if (variant === "dropdown") {
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: `layera-theme-switcher--dropdown-container ${classes}`, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
        "button",
        {
          ref,
          type: "button",
          className: "layera-theme-switcher__trigger",
          "aria-label": `\u0395\u03C0\u03B9\u03BB\u03BF\u03B3\u03AE \u03B8\u03AD\u03BC\u03B1\u03C4\u03BF\u03C2. \u03A4\u03C1\u03AD\u03C7\u03BF\u03BD: ${getCurrentLabel()}`,
          ...props,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "layera-theme-switcher__icon", "aria-hidden": "true", children: getCurrentIcon() }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "layera-theme-switcher__label", children: getCurrentLabel() }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "layera-theme-switcher__arrow", "aria-hidden": "true", children: "\u25BC" })
          ]
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: `layera-theme-switcher__dropdown layera-theme-switcher__dropdown--${align}`, children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
          "button",
          {
            type: "button",
            className: `layera-theme-switcher__option ${theme === "light" ? "layera-theme-switcher__option--active" : ""}`,
            onClick: () => setTheme("light"),
            role: "menuitem",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "layera-theme-switcher__option-icon", "aria-hidden": "true", children: icons.light }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "layera-theme-switcher__option-label", children: labels.light })
            ]
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
          "button",
          {
            type: "button",
            className: `layera-theme-switcher__option ${theme === "dark" ? "layera-theme-switcher__option--active" : ""}`,
            onClick: () => setTheme("dark"),
            role: "menuitem",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "layera-theme-switcher__option-icon", "aria-hidden": "true", children: icons.dark }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "layera-theme-switcher__option-label", children: labels.dark })
            ]
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
          "button",
          {
            type: "button",
            className: `layera-theme-switcher__option ${theme === "system" ? "layera-theme-switcher__option--active" : ""}`,
            onClick: () => setTheme("system"),
            role: "menuitem",
            children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "layera-theme-switcher__option-icon", "aria-hidden": "true", children: icons.system }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "layera-theme-switcher__option-label", children: labels.system })
            ]
          }
        )
      ] })
    ] });
  }
  return null;
});
ThemeSwitcher.displayName = "LayeraThemeSwitcher";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ThemeProvider,
  ThemeSwitcher,
  useTheme,
  useThemeContext
});
//# sourceMappingURL=index.cjs.map