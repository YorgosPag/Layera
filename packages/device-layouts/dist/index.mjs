// src/DeviceLayoutRenderer.tsx
import React from "react";
import { jsx, jsxs } from "react/jsx-runtime";
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
  const detectedDeviceType = React.useMemo(() => {
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
    return /* @__PURE__ */ jsxs(
      "div",
      {
        style: {
          width: config2.width,
          height: config2.height,
          ...config2.containerStyle
        },
        children: [
          iPhoneComponents.map && React.createElement(iPhoneComponents.map, {
            ...commonProps,
            isIPhone14ProMaxDevice: true
          }),
          showCategoryElements && iPhoneComponents.stepper && navigation && React.createElement(iPhoneComponents.stepper, {
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
          showCategoryElements && iPhoneComponents.category && navigation && navigation.currentStep === "category" && React.createElement(iPhoneComponents.category, {
            isVisible: true,
            currentStepId: navigation.currentStep,
            onNext: async (_category) => {
              try {
                if (navigationHandlers?.onNext) {
                  navigationHandlers.onNext();
                }
              } catch (error) {
              }
            }
          }),
          navigation?.currentStep !== "category" && iPhoneComponents.orchestrator && navigation && React.createElement(iPhoneComponents.orchestrator, {
            currentStepId: navigation.currentStep,
            selectedCategory: navigation.selectedCategory ?? "property",
            // πέρασε μόνο όσα handlers υπάρχουν
            ...navigationHandlers?.onNext ? { onNext: navigationHandlers.onNext } : {},
            ...navigationHandlers?.onPrevious ? { onPrevious: navigationHandlers.onPrevious } : {},
            onStepChange: () => {
            },
            onStepComplete: () => {
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
    return /* @__PURE__ */ jsxs("div", { style: config2.containerStyle, children: [
      desktopComponents.map && React.createElement(desktopComponents.map, commonProps),
      commonProps && /* @__PURE__ */ jsx("div", {})
    ] });
  }
  if (detectedDeviceType === "tablet") {
    const config2 = finalConfig.tablet;
    const tabletComponents = components?.tablet || {};
    return /* @__PURE__ */ jsxs(
      "div",
      {
        className: config2.containerClassName,
        style: config2.containerStyle,
        children: [
          tabletComponents.map && React.createElement(tabletComponents.map, commonProps),
          commonProps && /* @__PURE__ */ jsx("div", {})
        ]
      }
    );
  }
  const config = finalConfig.mobile;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: config.containerClassName,
      style: config.containerStyle,
      children: [
        commonProps && /* @__PURE__ */ jsx("div", {}),
        fab && !fab.hidden && fab.component
      ]
    }
  );
};

// src/ResponsiveMapLayout.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
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
  const fabComponent = fab && !fab.hidden ? /* @__PURE__ */ jsx2(
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
  return /* @__PURE__ */ jsx2(
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
export {
  DeviceLayoutRenderer,
  DeviceLayoutRenderer as DeviceRenderer,
  ResponsiveMapLayout as MapLayout,
  ResponsiveMapLayout
};
//# sourceMappingURL=index.mjs.map