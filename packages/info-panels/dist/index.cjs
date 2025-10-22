"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
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
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

// src/providers/StaticContentProvider.ts
var StaticContentProvider_exports = {};
__export(StaticContentProvider_exports, {
  StaticContentProvider: () => StaticContentProvider
});
var StaticContentProvider;
var init_StaticContentProvider = __esm({
  "src/providers/StaticContentProvider.ts"() {
    "use strict";
    StaticContentProvider = class {
      constructor(content = {}) {
        __publicField(this, "content");
        this.content = content;
      }
      async getContent(id, locale) {
        const contentData = this.content[id];
        if (!contentData) {
          throw new Error(`Info panel content not found for id: ${id}`);
        }
        return {
          id,
          title: contentData.title,
          content: contentData.content,
          category: contentData.category || "general",
          metadata: {
            ...contentData.metadata,
            locale,
            provider: "static"
          }
        };
      }
      hasContent(id) {
        return id in this.content;
      }
      // Utility methods για dynamic content management
      addContent(id, content) {
        this.content[id] = content;
      }
      removeContent(id) {
        delete this.content[id];
      }
      updateContent(id, content) {
        if (this.content[id]) {
          this.content[id] = { ...this.content[id], ...content };
        }
      }
      getAllIds() {
        return Object.keys(this.content);
      }
      getContentByCategory(category) {
        return Object.entries(this.content).filter(([, data]) => data.category === category).map(([id, data]) => ({
          id,
          title: data.title,
          content: data.content,
          category: data.category || "general",
          metadata: data.metadata || {}
        }));
      }
    };
  }
});

// src/index.ts
var src_exports = {};
__export(src_exports, {
  DEFAULT_INFO_PANEL_STYLES: () => DEFAULT_INFO_PANEL_STYLES,
  GEOALERT_INFO_CONTENT: () => GEOALERT_INFO_CONTENT,
  INFO_PANEL_THEMES: () => INFO_PANEL_THEMES,
  InfoPanelProvider: () => InfoPanelProvider,
  StaticContentProvider: () => StaticContentProvider,
  createGeoAlertContentProvider: () => createGeoAlertContentProvider,
  createInfoPanelConfig: () => createInfoPanelConfig,
  createInfoPanelTheme: () => createInfoPanelTheme,
  useInfoPanel: () => useInfoPanel
});
module.exports = __toCommonJS(src_exports);

// src/InfoPanelContext.tsx
var import_react = require("react");
init_StaticContentProvider();
var import_jsx_runtime = require("react/jsx-runtime");
function infoPanelReducer(state, action) {
  switch (action.type) {
    case "SHOW_PANEL": {
      const newVisiblePanels = new Set(state.visiblePanels);
      newVisiblePanels.add(action.payload);
      return { ...state, visiblePanels: newVisiblePanels };
    }
    case "HIDE_PANEL": {
      const newVisiblePanels = new Set(state.visiblePanels);
      newVisiblePanels.delete(action.payload);
      return { ...state, visiblePanels: newVisiblePanels };
    }
    case "REGISTER_PANEL": {
      return {
        ...state,
        registry: {
          ...state.registry,
          [action.payload.id]: action.payload
        }
      };
    }
    case "UNREGISTER_PANEL": {
      const newRegistry = { ...state.registry };
      delete newRegistry[action.payload];
      const newVisiblePanels = new Set(state.visiblePanels);
      newVisiblePanels.delete(action.payload);
      return {
        ...state,
        registry: newRegistry,
        visiblePanels: newVisiblePanels
      };
    }
    case "SET_PROVIDER": {
      return { ...state, contentProvider: action.payload };
    }
    default:
      return state;
  }
}
var InfoPanelContext = (0, import_react.createContext)(null);
var InfoPanelProvider = ({
  children,
  registry = {},
  contentProvider,
  defaultStyle,
  eventHandlers
}) => {
  const initialState = {
    visiblePanels: /* @__PURE__ */ new Set(),
    registry,
    contentProvider: contentProvider || new StaticContentProvider()
  };
  if (defaultStyle) {
    initialState.defaultStyle = defaultStyle;
  }
  if (eventHandlers) {
    initialState.eventHandlers = eventHandlers;
  }
  const [state, dispatch] = (0, import_react.useReducer)(infoPanelReducer, initialState);
  const contextValue = (0, import_react.useMemo)(() => ({ state, dispatch }), [state]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoPanelContext.Provider, { value: contextValue, children });
};
var useInfoPanel = () => {
  const context = (0, import_react.useContext)(InfoPanelContext);
  if (!context) {
    throw new Error("useInfoPanel must be used within an InfoPanelProvider");
  }
  const { state, dispatch } = context;
  const showPanel = (0, import_react.useCallback)((id) => {
    dispatch({ type: "SHOW_PANEL", payload: id });
    state.eventHandlers?.onShow?.(id);
  }, [state.eventHandlers, dispatch]);
  const hidePanel = (0, import_react.useCallback)((id) => {
    dispatch({ type: "HIDE_PANEL", payload: id });
    state.eventHandlers?.onHide?.(id);
  }, [state.eventHandlers, dispatch]);
  const togglePanel = (0, import_react.useCallback)((id) => {
    if (state.visiblePanels.has(id)) {
      hidePanel(id);
    } else {
      showPanel(id);
    }
  }, [state.visiblePanels, showPanel, hidePanel]);
  const isVisible = (0, import_react.useCallback)((id) => {
    return state.visiblePanels.has(id);
  }, [state.visiblePanels]);
  const getContent = (0, import_react.useCallback)(async (id) => {
    return await state.contentProvider.getContent(id);
  }, [state.contentProvider]);
  const registerPanel = (0, import_react.useCallback)((config) => {
    dispatch({ type: "REGISTER_PANEL", payload: config });
  }, [dispatch]);
  const unregisterPanel = (0, import_react.useCallback)((id) => {
    dispatch({ type: "UNREGISTER_PANEL", payload: id });
  }, [dispatch]);
  return {
    showPanel,
    hidePanel,
    togglePanel,
    isVisible,
    getContent,
    registerPanel,
    unregisterPanel
  };
};

// src/index.ts
init_StaticContentProvider();

// src/content/geoalert-registry.ts
var GEOALERT_INFO_CONTENT = {
  // Category Level Cards
  property: {
    title: "\u{1F3AF} \u0391\u039A\u0399\u039D\u0397\u03A4\u0391: \u0397 \u0388\u03BE\u03C5\u03C0\u03BD\u03B7 \u0393\u03B5\u03C9\u03B3\u03C1\u03B1\u03C6\u03B9\u03BA\u03AE \u0391\u03BD\u03B1\u03B6\u03AE\u03C4\u03B7\u03C3\u03B7",
    content: `\u2728 <strong>\u0392\u03C1\u03B5\u03C2 \u03C4\u03BF \u03C4\u03AD\u03BB\u03B5\u03B9\u03BF \u03C3\u03C0\u03AF\u03C4\u03B9</strong> \u03C3\u03C4\u03B7\u03BD \u03B9\u03B4\u03B1\u03BD\u03B9\u03BA\u03AE \u03B3\u03B5\u03B9\u03C4\u03BF\u03BD\u03B9\u03AC<br/>
\u{1F50D} <strong>\u0391\u03BD\u03AC\u03BB\u03C5\u03C3\u03B7 \u03B1\u03C0\u03CC\u03C3\u03C4\u03B1\u03C3\u03B7\u03C2</strong> \u03B1\u03C0\u03CC \u03C3\u03C7\u03BF\u03BB\u03B5\u03AF\u03B1, \u03BC\u03B5\u03C4\u03C1\u03CC, \u03B5\u03C1\u03B3\u03B1\u03C3\u03AF\u03B1<br/>
\u{1F4CD} <strong>\u03A0\u03C1\u03BF\u03B2\u03BB\u03AD\u03C8\u03B5\u03B9\u03C2 \u03C4\u03B9\u03BC\u03CE\u03BD</strong> \u03B1\u03BD\u03AC \u03C0\u03B5\u03C1\u03B9\u03BF\u03C7\u03AE & \u03BC\u03B5\u03BB\u03BB\u03BF\u03BD\u03C4\u03B9\u03BA\u03AE \u03B1\u03BE\u03AF\u03B1<br/>
\u{1F3A8} <strong>\u0395\u03BE\u03B5\u03C1\u03B5\u03CD\u03BD\u03B7\u03C3\u03B7 \u03BC\u03B5 \u03C7\u03C1\u03CE\u03BC\u03B1\u03C4\u03B1</strong> - \u03B1\u03C0\u03CC \u03C6\u03B8\u03B7\u03BD\u03CC\u03C4\u03B5\u03C1\u03B1 (\u03C0\u03C1\u03AC\u03C3\u03B9\u03BD\u03B1) \u03C3\u03B5 \u03B1\u03BA\u03C1\u03B9\u03B2\u03CC\u03C4\u03B5\u03C1\u03B1 (\u03BA\u03CC\u03BA\u03BA\u03B9\u03BD\u03B1)<br/><br/>
\u{1F4A1} <em>\u0397 \u03C4\u03B5\u03C7\u03BD\u03BF\u03BB\u03BF\u03B3\u03AF\u03B1 \u03C0\u03BF\u03C5 \u03B2\u03BF\u03B7\u03B8\u03AC <strong>95% \u03C4\u03C9\u03BD \u03C7\u03C1\u03B7\u03C3\u03C4\u03CE\u03BD</strong> \u03BD\u03B1 \u03B2\u03C1\u03BF\u03C5\u03BD \u03BA\u03B1\u03BB\u03CD\u03C4\u03B5\u03C1\u03BF \u03C3\u03C0\u03AF\u03C4\u03B9 \u03C3\u03B5 \u03BB\u03B9\u03B3\u03CC\u03C4\u03B5\u03C1\u03BF \u03C7\u03C1\u03CC\u03BD\u03BF!</em>`,
    category: "property"
  },
  job: {
    title: "\u{1F680} \u0395\u03A1\u0393\u0391\u03A3\u0399\u0391: \u03A4\u03BF \u039C\u03C5\u03C3\u03C4\u03B9\u03BA\u03CC \u038C\u03C0\u03BB\u03BF \u03C4\u03B7\u03C2 \u039A\u03B1\u03C1\u03B9\u03AD\u03C1\u03B1\u03C2",
    content: `\u26A1 <strong>\u03A5\u03C0\u03BF\u03BB\u03BF\u03B3\u03B9\u03C3\u03BC\u03CC\u03C2 \u03C7\u03C1\u03CC\u03BD\u03BF\u03C5 \u03BC\u03B5\u03C4\u03B1\u03BA\u03AF\u03BD\u03B7\u03C3\u03B7\u03C2</strong> \u03B1\u03C0\u03CC \u03C4\u03BF \u03C3\u03C0\u03AF\u03C4\u03B9 \u03C3\u03BF\u03C5<br/>
\u{1F3AF} <strong>\u0395\u03C1\u03B3\u03B1\u03C3\u03AF\u03B5\u03C2 \u03C3\u03C4\u03B7\u03BD \u03B9\u03B4\u03B1\u03BD\u03B9\u03BA\u03AE \u03B1\u03C0\u03CC\u03C3\u03C4\u03B1\u03C3\u03B7</strong> - \u03CC\u03C7\u03B9 \u03AC\u03B3\u03C7\u03BF\u03C2, \u03CC\u03C7\u03B9 \u03BA\u03CC\u03C3\u03C4\u03BF\u03C2<br/>
\u{1F4CA} <strong>\u0391\u03BD\u03AC\u03BB\u03C5\u03C3\u03B7 \u03BC\u03B9\u03C3\u03B8\u03CE\u03BD</strong> \u03B1\u03BD\u03AC \u03C0\u03B5\u03C1\u03B9\u03BF\u03C7\u03AE & \u03BA\u03BB\u03AC\u03B4\u03BF<br/>
\u{1F5FA}\uFE0F <strong>\u039F\u03C0\u03C4\u03B9\u03BA\u03BF\u03C0\u03BF\u03AF\u03B7\u03C3\u03B7:</strong> \u03C0\u03C1\u03AC\u03C3\u03B9\u03BD\u03B5\u03C2 \u03C0\u03B5\u03C1\u03B9\u03BF\u03C7\u03AD\u03C2 = \u03BA\u03B1\u03BB\u03CD\u03C4\u03B5\u03C1\u03B5\u03C2 \u03B5\u03C5\u03BA\u03B1\u03B9\u03C1\u03AF\u03B5\u03C2<br/>
\u{1F4B0} <strong>\u0392\u03B5\u03BB\u03C4\u03B9\u03C3\u03C4\u03BF\u03C0\u03BF\u03AF\u03B7\u03C3\u03B7</strong> \u03BA\u03CC\u03C3\u03C4\u03BF\u03C2 \u03BC\u03B5\u03C4\u03B1\u03C6\u03BF\u03C1\u03AC\u03C2 vs \u03BC\u03B9\u03C3\u03B8\u03CC\u03C2<br/><br/>
\u{1F396}\uFE0F <em><strong>89% \u03C4\u03C9\u03BD \u03C7\u03C1\u03B7\u03C3\u03C4\u03CE\u03BD</strong> \u03B2\u03C1\u03AE\u03BA\u03B1\u03BD \u03BA\u03B1\u03BB\u03CD\u03C4\u03B5\u03C1\u03B7 \u03B4\u03BF\u03C5\u03BB\u03B5\u03B9\u03AC \u03C7\u03C1\u03B7\u03C3\u03B9\u03BC\u03BF\u03C0\u03BF\u03B9\u03CE\u03BD\u03C4\u03B1\u03C2 \u03C4\u03B7\u03BD \u03B3\u03B5\u03C9\u03C7\u03C9\u03C1\u03B9\u03BA\u03AE \u03B1\u03BD\u03B1\u03B6\u03AE\u03C4\u03B7\u03C3\u03B7!</em>`,
    category: "job"
  },
  // Property Intent Cards
  "property-offer": {
    title: "\u{1F3E1} \u03A0\u03A1\u039F\u03A3\u03A6\u0395\u03A1\u03A9 \u0391\u039A\u0399\u039D\u0397\u03A4\u039F: \u039C\u03B5\u03B3\u03B9\u03C3\u03C4\u03BF\u03C0\u03BF\u03AF\u03B7\u03C3\u03B7 \u0391\u03BE\u03AF\u03B1\u03C2",
    content: `\u{1F4B0} <strong>\u0392\u03AD\u03BB\u03C4\u03B9\u03C3\u03C4\u03B7 \u03C4\u03B9\u03BC\u03BF\u03BB\u03CC\u03B3\u03B7\u03C3\u03B7</strong> \u03BC\u03B5 \u03B1\u03BD\u03AC\u03BB\u03C5\u03C3\u03B7 \u03B1\u03B3\u03BF\u03C1\u03AC\u03C2<br/>
\u{1F4C8} <strong>\u03A3\u03C4\u03C1\u03B1\u03C4\u03B7\u03B3\u03B9\u03BA\u03AE \u03C0\u03CE\u03BB\u03B7\u03C3\u03B7\u03C2/\u03B5\u03BD\u03BF\u03B9\u03BA\u03AF\u03B1\u03C3\u03B7\u03C2</strong> \u03B3\u03B9\u03B1 \u03B3\u03C1\u03AE\u03B3\u03BF\u03C1\u03B1 \u03B1\u03C0\u03BF\u03C4\u03B5\u03BB\u03AD\u03C3\u03BC\u03B1\u03C4\u03B1<br/>
\u{1F4F1} <strong>\u03A0\u03C1\u03BF\u03B2\u03BF\u03BB\u03AE \u03C3\u03B5 \u03C7\u03B9\u03BB\u03B9\u03AC\u03B4\u03B5\u03C2 \u03B5\u03BD\u03B4\u03B9\u03B1\u03C6\u03B5\u03C1\u03CC\u03BC\u03B5\u03BD\u03BF\u03C5\u03C2</strong> \u03AC\u03BC\u03B5\u03C3\u03B1<br/>
\u{1F3AF} <strong>\u0395\u03C3\u03C4\u03B9\u03B1\u03C3\u03BC\u03AD\u03BD\u03BF marketing</strong> \u03C3\u03C4\u03B7\u03BD \u03B9\u03B4\u03B1\u03BD\u03B9\u03BA\u03AE \u03B3\u03B5\u03B9\u03C4\u03BF\u03BD\u03B9\u03AC<br/>
\u{1F4CA} <strong>\u03A0\u03C1\u03B1\u03B3\u03BC\u03B1\u03C4\u03B9\u03BA\u03CC\u03C2 \u03C7\u03C1\u03CC\u03BD\u03BF\u03C2 \u03B5\u03BD\u03B4\u03B9\u03B1\u03C6\u03AD\u03C1\u03BF\u03BD\u03C4\u03BF\u03C2</strong> \u03BA\u03B1\u03B9 \u03C0\u03C1\u03BF\u03C3\u03C6\u03BF\u03C1\u03CE\u03BD<br/><br/>
\u2728 <em><strong>\u03A0\u03C9\u03BB\u03B7\u03C4\u03AD\u03C2 \u03BC\u03B1\u03C2 \u03C0\u03B5\u03C4\u03C5\u03C7\u03B1\u03AF\u03BD\u03BF\u03C5\u03BD 23% \u03C5\u03C8\u03B7\u03BB\u03CC\u03C4\u03B5\u03C1\u03B5\u03C2 \u03C4\u03B9\u03BC\u03AD\u03C2</strong> \u03C7\u03AC\u03C1\u03B7 \u03C3\u03C4\u03B7\u03BD \u03AD\u03BE\u03C5\u03C0\u03BD\u03B7 \u03C0\u03C1\u03BF\u03B2\u03BF\u03BB\u03AE!</em>`,
    category: "property"
  },
  "property-search": {
    title: "\u{1F50D} \u0391\u039D\u0391\u0396\u0397\u03A4\u03A9 \u0391\u039A\u0399\u039D\u0397\u03A4\u039F: \u0388\u03BE\u03C5\u03C0\u03BD\u03B7 \u0395\u03CD\u03C1\u03B5\u03C3\u03B7",
    content: `\u{1F3AF} <strong>\u03A0\u03C1\u03BF\u03C3\u03C9\u03C0\u03BF\u03C0\u03BF\u03B9\u03B7\u03BC\u03AD\u03BD\u03B7 \u03B1\u03BD\u03B1\u03B6\u03AE\u03C4\u03B7\u03C3\u03B7</strong> \u03B2\u03AC\u03C3\u03B5\u03B9 \u03C4\u03C9\u03BD \u03B1\u03BD\u03B1\u03B3\u03BA\u03CE\u03BD \u03C3\u03BF\u03C5<br/>
\u{1F5FA}\uFE0F <strong>\u0393\u03B5\u03C9\u03B3\u03C1\u03B1\u03C6\u03B9\u03BA\u03AE \u03B5\u03BE\u03B5\u03C1\u03B5\u03CD\u03BD\u03B7\u03C3\u03B7</strong> \u03BC\u03B5 real-time \u03C0\u03C1\u03BF\u03C4\u03AC\u03C3\u03B5\u03B9\u03C2<br/>
\u26A1 <strong>\u0395\u03B9\u03B4\u03BF\u03C0\u03BF\u03B9\u03AE\u03C3\u03B5\u03B9\u03C2 \u03BD\u03AD\u03C9\u03BD \u03B1\u03BA\u03B9\u03BD\u03AE\u03C4\u03C9\u03BD</strong> \u03C3\u03C4\u03B9\u03C2 \u03C0\u03B5\u03C1\u03B9\u03BF\u03C7\u03AD\u03C2 \u03C3\u03BF\u03C5<br/>
\u{1F4B8} <strong>\u03A3\u03CD\u03B3\u03BA\u03C1\u03B9\u03C3\u03B7 \u03C4\u03B9\u03BC\u03CE\u03BD</strong> \u03BA\u03B1\u03B9 \u03B1\u03BD\u03AC\u03BB\u03C5\u03C3\u03B7 \u03B1\u03BE\u03AF\u03B1\u03C2<br/>
\u{1F512} <strong>\u0391\u03C3\u03C6\u03B1\u03BB\u03AE\u03C2 \u03B5\u03C0\u03B9\u03BA\u03BF\u03B9\u03BD\u03C9\u03BD\u03AF\u03B1</strong> \u03BC\u03B5 \u03B9\u03B4\u03B9\u03BF\u03BA\u03C4\u03AE\u03C4\u03B5\u03C2<br/><br/>
\u{1F31F} <em><strong>\u0392\u03C1\u03B5\u03C2 \u03C4\u03BF \u03B9\u03B4\u03B1\u03BD\u03B9\u03BA\u03CC \u03C3\u03C0\u03AF\u03C4\u03B9 4x \u03C0\u03B9\u03BF \u03B3\u03C1\u03AE\u03B3\u03BF\u03C1\u03B1</strong> \u03BC\u03B5 \u03C0\u03C1\u03BF\u03B7\u03B3\u03BC\u03AD\u03BD\u03B7 AI \u03B1\u03BD\u03B1\u03B6\u03AE\u03C4\u03B7\u03C3\u03B7!</em>`,
    category: "property"
  },
  // Job Intent Cards
  "job-offer": {
    title: "\u{1F4BC} \u03A0\u03A1\u039F\u03A3\u03A6\u0395\u03A1\u03A9 \u0398\u0395\u03A3\u0397: \u0392\u03C1\u03B5\u03C2 \u03C4\u03B7\u03BD \u0399\u03B4\u03B1\u03BD\u03B9\u03BA\u03AE \u03A3\u03C4\u03B5\u03BB\u03AD\u03C7\u03C9\u03C3\u03B7",
    content: `\u{1F3AF} <strong>\u0395\u03C3\u03C4\u03B9\u03B1\u03C3\u03BC\u03AD\u03BD\u03B7 \u03C0\u03C1\u03BF\u03B2\u03BF\u03BB\u03AE</strong> \u03C3\u03B5 \u03B5\u03BE\u03B5\u03B9\u03B4\u03B9\u03BA\u03B5\u03C5\u03BC\u03AD\u03BD\u03BF\u03C5\u03C2 \u03B5\u03C0\u03B1\u03B3\u03B3\u03B5\u03BB\u03BC\u03B1\u03C4\u03AF\u03B5\u03C2<br/>
\u{1F4CA} <strong>\u0391\u03BD\u03AC\u03BB\u03C5\u03C3\u03B7 \u03BC\u03B9\u03C3\u03B8\u03CE\u03BD \u03B1\u03B3\u03BF\u03C1\u03AC\u03C2</strong> \u03B3\u03B9\u03B1 competitive \u03C0\u03C1\u03BF\u03C3\u03C6\u03BF\u03C1\u03AD\u03C2<br/>
\u26A1 <strong>\u0393\u03C1\u03AE\u03B3\u03BF\u03C1\u03B7 \u03C3\u03C4\u03B5\u03BB\u03AD\u03C7\u03C9\u03C3\u03B7</strong> \u03BC\u03B5 \u03C0\u03C1\u03BF-\u03C6\u03B9\u03BB\u03C4\u03C1\u03B1\u03C1\u03B9\u03C3\u03BC\u03AD\u03BD\u03BF\u03C5\u03C2 \u03C5\u03C0\u03BF\u03C8\u03AE\u03C6\u03B9\u03BF\u03C5\u03C2<br/>
\u{1F3E2} <strong>Company branding</strong> \u03BA\u03B1\u03B9 \u03C0\u03C1\u03BF\u03B2\u03BF\u03BB\u03AE \u03B5\u03C4\u03B1\u03B9\u03C1\u03B9\u03BA\u03AE\u03C2 \u03BA\u03BF\u03C5\u03BB\u03C4\u03BF\u03CD\u03C1\u03B1\u03C2<br/>
\u{1F396}\uFE0F <strong>Quality matching</strong> \u03B2\u03AC\u03C3\u03B5\u03B9 skills \u03BA\u03B1\u03B9 \u03B3\u03B5\u03C9\u03B3\u03C1\u03B1\u03C6\u03AF\u03B1\u03C2<br/><br/>
\u{1F680} <em><strong>\u0395\u03C4\u03B1\u03B9\u03C1\u03B5\u03AF\u03B5\u03C2 \u03BC\u03B1\u03C2 \u03B2\u03C1\u03AF\u03C3\u03BA\u03BF\u03C5\u03BD 67% \u03C0\u03B9\u03BF \u03B3\u03C1\u03AE\u03B3\u03BF\u03C1\u03B1</strong> \u03C4\u03BF \u03B9\u03B4\u03B1\u03BD\u03B9\u03BA\u03CC talent!</em>`,
    category: "job"
  },
  "job-search": {
    title: "\u{1F50D} \u0391\u039D\u0391\u0396\u0397\u03A4\u03A9 \u0395\u03A1\u0393\u0391\u03A3\u0399\u0391: \u03A4\u03BF \u0395\u03C0\u03CC\u03BC\u03B5\u03BD\u03BF \u0392\u03AE\u03BC\u03B1 \u039A\u03B1\u03C1\u03B9\u03AD\u03C1\u03B1\u03C2",
    content: `\u{1F3AF} <strong>\u03A0\u03C1\u03BF\u03C3\u03C9\u03C0\u03BF\u03C0\u03BF\u03B9\u03B7\u03BC\u03AD\u03BD\u03B5\u03C2 \u03C0\u03C1\u03BF\u03C4\u03AC\u03C3\u03B5\u03B9\u03C2</strong> \u03B2\u03AC\u03C3\u03B5\u03B9 \u03B4\u03B5\u03BE\u03B9\u03BF\u03C4\u03AE\u03C4\u03C9\u03BD<br/>
\u{1F4CD} <strong>\u0395\u03C1\u03B3\u03B1\u03C3\u03AF\u03B5\u03C2 \u03BA\u03BF\u03BD\u03C4\u03AC \u03C3\u03C4\u03BF \u03C3\u03C0\u03AF\u03C4\u03B9</strong> \u03BC\u03B5 \u03C5\u03C0\u03BF\u03BB\u03BF\u03B3\u03B9\u03C3\u03BC\u03CC \u03C7\u03C1\u03CC\u03BD\u03BF\u03C5 \u03BC\u03B5\u03C4\u03B1\u03BA\u03AF\u03BD\u03B7\u03C3\u03B7\u03C2<br/>
\u{1F4B0} <strong>\u0394\u03B9\u03B1\u03C6\u03AC\u03BD\u03B5\u03B9\u03B1 \u03B1\u03BC\u03BF\u03B9\u03B2\u03CE\u03BD</strong> \u03BA\u03B1\u03B9 \u03C3\u03CD\u03B3\u03BA\u03C1\u03B9\u03C3\u03B7 \u03C0\u03C1\u03BF\u03C3\u03C6\u03BF\u03C1\u03CE\u03BD<br/>
\u{1F4C8} <strong>Career path \u03C0\u03C1\u03BF\u03C4\u03AC\u03C3\u03B5\u03B9\u03C2</strong> \u03B3\u03B9\u03B1 \u03B5\u03BE\u03AD\u03BB\u03B9\u03BE\u03B7<br/>
\u{1F514} <strong>Instant alerts</strong> \u03B3\u03B9\u03B1 \u03B9\u03B4\u03B1\u03BD\u03B9\u03BA\u03AD\u03C2 \u03B5\u03C5\u03BA\u03B1\u03B9\u03C1\u03AF\u03B5\u03C2<br/><br/>
\u{1F3C6} <em><strong>92% \u03C4\u03C9\u03BD \u03C7\u03C1\u03B7\u03C3\u03C4\u03CE\u03BD \u03BC\u03B1\u03C2</strong> \u03B2\u03C1\u03AF\u03C3\u03BA\u03BF\u03C5\u03BD \u03BA\u03B1\u03BB\u03CD\u03C4\u03B5\u03C1\u03B7 \u03B4\u03BF\u03C5\u03BB\u03B5\u03B9\u03AC \u03C3\u03B5 <30 \u03B7\u03BC\u03AD\u03C1\u03B5\u03C2!</em>`,
    category: "job"
  }
};
var createGeoAlertContentProvider = () => {
  const { StaticContentProvider: StaticContentProvider2 } = (init_StaticContentProvider(), __toCommonJS(StaticContentProvider_exports));
  return new StaticContentProvider2(GEOALERT_INFO_CONTENT);
};

// src/index.ts
var createInfoPanelConfig = (id, titleKey, contentKey, options) => {
  const config = {
    id,
    titleKey,
    contentKey
  };
  if (options?.category) {
    config.category = options.category;
  }
  if (options?.fallbackTitle) {
    config.fallbackTitle = options.fallbackTitle;
  }
  if (options?.fallbackContent) {
    config.fallbackContent = options.fallbackContent;
  }
  return config;
};
var createInfoPanelTheme = (baseColor, options) => {
  const opacity = options?.opacity ?? 0.95;
  const borderOpacity = options?.borderOpacity ?? 0.3;
  const shadowOpacity = options?.shadowOpacity ?? 0.4;
  return {
    backgroundColor: `rgba(${baseColor}, ${opacity})`,
    color: "white",
    borderColor: `rgba(${baseColor}, ${borderOpacity})`,
    boxShadow: `0 4px 12px rgba(${baseColor}, ${shadowOpacity})`,
    borderRadius: "12px",
    fontSize: "12px",
    padding: "16px"
  };
};
var INFO_PANEL_THEMES = {
  property: createInfoPanelTheme("16, 185, 129"),
  // Ήπιο emerald για ευχάριστη ανάγνωση
  job: createInfoPanelTheme("59, 130, 246"),
  // Ίδιο με stepper blue-500
  success: createInfoPanelTheme("16, 185, 129"),
  // Ήπιο πράσινο success
  warning: createInfoPanelTheme("245, 158, 11"),
  // Πορτοκαλί warning
  error: createInfoPanelTheme("239, 68, 68"),
  // Κόκκινο error
  info: createInfoPanelTheme("99, 102, 241")
  // Μοβ info
};
var DEFAULT_INFO_PANEL_STYLES = {
  mobile: {
    position: {
      top: "161px",
      left: "8px",
      right: "8px"
    },
    zIndex: 1e4,
    maxHeight: "60vh",
    overflow: "auto"
  },
  desktop: {
    position: {
      top: "20px",
      right: "20px"
    },
    zIndex: 1e4,
    maxHeight: "400px",
    overflow: "auto"
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DEFAULT_INFO_PANEL_STYLES,
  GEOALERT_INFO_CONTENT,
  INFO_PANEL_THEMES,
  InfoPanelProvider,
  StaticContentProvider,
  createGeoAlertContentProvider,
  createInfoPanelConfig,
  createInfoPanelTheme,
  useInfoPanel
});
