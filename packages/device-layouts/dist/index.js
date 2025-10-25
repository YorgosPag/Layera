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
  DeviceLayoutRenderer: () => DeviceLayoutRenderer,
  DeviceRenderer: () => DeviceLayoutRenderer,
  MapLayout: () => ResponsiveMapLayout,
  ResponsiveMapLayout: () => ResponsiveMapLayout
});
module.exports = __toCommonJS(index_exports);

// src/DeviceLayoutRenderer.tsx
var import_react = __toESM(require("react"));
var import_jsx_runtime = require("react/jsx-runtime");
var DEFAULT_LAYOUT_CONFIG = {
  iphone: {
    width: 430,
    height: 932,
    containerStyle: {
      position: "relative",
      overflow: "hidden"
    }
  },
  tablet: {
    containerStyle: {
      width: "100%",
      height: "100vh",
      position: "relative"
    },
    containerClassName: "tablet-map-container"
  },
  desktop: {
    containerStyle: {
      width: "100%",
      height: "100vh",
      position: "relative"
    }
  },
  mobile: {
    containerStyle: {
      width: "100%",
      height: "100vh",
      position: "relative"
    },
    containerClassName: "mobile-map-container"
  }
};
var DeviceLayoutRenderer = ({
  deviceType: propDeviceType,
  forceDeviceType,
  layoutConfig = {},
  commonProps = {},
  components = {},
  navigation,
  navigationHandlers,
  showCategoryElements = false,
  fab
}) => {
  const detectedDeviceType = import_react.default.useMemo(() => {
    if (forceDeviceType) {
      return forceDeviceType;
    }
    if (propDeviceType) {
      return propDeviceType;
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
  }, [propDeviceType, forceDeviceType]);
  const finalConfig = {
    ...DEFAULT_LAYOUT_CONFIG,
    ...layoutConfig
  };
  if (detectedDeviceType === "iphone") {
    const config2 = finalConfig.iphone;
    const iPhoneComponents = components?.iphone || {};
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "div",
      {
        style: {
          width: config2.width,
          height: config2.height,
          ...config2.containerStyle
        },
        children: [
          iPhoneComponents.map && import_react.default.createElement(iPhoneComponents.map, {
            ...commonProps,
            isIPhone14ProMaxDevice: true
          }),
          showCategoryElements && iPhoneComponents.stepper && navigation && import_react.default.createElement(iPhoneComponents.stepper, {
            currentStep: navigation.currentStep,
            totalSteps: navigation.totalSteps,
            stepIndex: navigation.stepIndex,
            selectedCategory: navigation.selectedCategory,
            onNext: navigationHandlers?.onNext,
            onPrevious: navigationHandlers?.onPrevious,
            onReset: navigationHandlers?.onReset,
            onStepClick: navigationHandlers?.onStepClick,
            canGoNext: navigation.canGoNext,
            canGoPrevious: navigation.canGoBack
          }),
          showCategoryElements && iPhoneComponents.orchestrator && navigation && import_react.default.createElement(iPhoneComponents.orchestrator, {
            currentStepId: navigation.currentStep,
            selectedCategory: navigation.selectedCategory ?? "property",
            // selectedIntent: TO DO: Add to navigation service
            // Removed unsupported props that cause TypeScript errors
            // πέρασε μόνο όσα handlers υπάρχουν
            ...navigationHandlers?.onNext ? { onNext: navigationHandlers.onNext } : {},
            ...navigationHandlers?.onPrevious ? { onPrevious: navigationHandlers.onPrevious } : {},
            onStepChange: (stepId) => {
              console.log(`\u{1F3AF} DEVICE LAYOUT: Step change to ${stepId}`);
              console.log(`\u{1F3AF} DEVICE LAYOUT: Current step is ${navigation?.currentStep}`);
              const currentStep = navigation?.currentStep;
              if (stepId === "occupation" && currentStep === "employmentType") {
                console.log(`\u{1F3AF} DEVICE LAYOUT: SPECIAL CASE - Forcing navigation to occupation step`);
                if (navigationHandlers?.onNext) {
                  navigationHandlers.onNext();
                }
              } else {
                console.log(`\u{1F3AF} DEVICE LAYOUT: Default navigation using goNext() for ${stepId}`);
                if (navigationHandlers?.onNext) {
                  navigationHandlers.onNext();
                }
              }
            },
            onStepComplete: async (stepId, data) => {
              console.log(`\u{1F3AF} DEVICE LAYOUT: Step ${stepId} completed`, data);
              if (stepId === "category" && data && typeof data === "object" && "selectedCategory" in data) {
                console.log(`\u{1F3AF} DEVICE LAYOUT: Category selected: ${data.selectedCategory}`);
              }
            },
            deviceProps: { isIPhone14ProMaxDevice: true, isMobile: true }
          })
        ]
      }
    );
  }
  if (detectedDeviceType === "desktop") {
    const config2 = finalConfig.desktop;
    const desktopComponents = components?.desktop || {};
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: config2.containerStyle, children: [
      desktopComponents.map && import_react.default.createElement(desktopComponents.map, commonProps),
      commonProps && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {})
    ] });
  }
  if (detectedDeviceType === "tablet") {
    const config2 = finalConfig.tablet;
    const tabletComponents = components?.tablet || {};
    return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "div",
      {
        className: config2.containerClassName,
        style: config2.containerStyle,
        children: [
          tabletComponents.map && import_react.default.createElement(tabletComponents.map, commonProps),
          commonProps && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {})
        ]
      }
    );
  }
  const config = finalConfig.mobile;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "div",
    {
      className: config.containerClassName,
      style: config.containerStyle,
      children: [
        commonProps && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {}),
        fab && !fab.hidden && fab.component
      ]
    }
  );
};

// src/ResponsiveMapLayout.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var ResponsiveMapLayout = ({
  deviceType,
  forceDeviceType,
  map = {},
  mapComponents = {},
  iPhoneComponents = {},
  navigation,
  navigationHandlers,
  showCategoryElements = false,
  fab
}) => {
  const fabComponent = fab && !fab.hidden ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    "div",
    {
      onClick: fab.onClick,
      style: {
        position: "absolute",
        right: "20px",
        bottom: "20px",
        width: 56,
        height: 56,
        borderRadius: "50%",
        background: "var(--layera-bg-success, #22C55E)",
        border: "2px solid white",
        boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        zIndex: 9999,
        userSelect: "none"
      },
      children: fab.icon
    }
  ) : null;
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    DeviceLayoutRenderer,
    {
      deviceType,
      forceDeviceType,
      commonProps: map,
      components: {
        iphone: {
          map: mapComponents.iPhone,
          stepper: iPhoneComponents.stepper,
          category: iPhoneComponents.category,
          orchestrator: iPhoneComponents.orchestrator
        },
        tablet: {
          map: mapComponents.tablet
        },
        desktop: {
          map: mapComponents.desktop
        },
        mobile: {
          map: mapComponents.mobile
        }
      },
      navigation,
      navigationHandlers,
      showCategoryElements,
      fab: fab ? {
        component: fabComponent,
        onClick: fab.onClick,
        icon: fab.icon,
        hidden: fab.hidden
      } : void 0
    }
  );
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DeviceLayoutRenderer,
  DeviceRenderer,
  MapLayout,
  ResponsiveMapLayout
});
//# sourceMappingURL=index.js.map