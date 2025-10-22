"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
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
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  DeviceDetector: () => iPhone14ProMaxAdapter,
  iPhone14ProMaxAdapter: () => iPhone14ProMaxAdapter,
  useDeviceDetection: () => useDeviceDetection,
  useIPhone14ProMaxDetection: () => useIPhone14ProMaxDetection,
  useIPhoneDetection: () => useIPhone14ProMaxDetection
});
module.exports = __toCommonJS(index_exports);

// src/adapters/mobile/ios/iPhone14ProMaxAdapter.ts
var iPhone14ProMaxAdapter = class {
  constructor() {
    __publicField(this, "DEFAULT_FRAME_SELECTOR", ".device-frame-wrapper");
    __publicField(this, "IPHONE_14_PRO_MAX_SPECS", {
      VIEWPORT_WIDTH: 430,
      VIEWPORT_HEIGHT: 932,
      FRAME_WIDTH_MIN: 412,
      FRAME_WIDTH_MAX: 416,
      FRAME_HEIGHT_MIN: 914,
      FRAME_HEIGHT_MAX: 920,
      EXACT_FRAME_WIDTH: 414,
      EXACT_FRAME_HEIGHT: 916
    });
  }
  detectiPhone14ProMax(options = {}) {
    const {
      frameSelector = this.DEFAULT_FRAME_SELECTOR,
      enableWindowFallback = true,
      enableUserAgentFallback = true,
      debugMode = false
    } = options;
    const frame = this.getDeviceFrame(frameSelector);
    const isInFrame = this.isInDeviceFrame();
    const isFrameBased = this.detectFrameBased(frame);
    const isWindowBased = enableWindowFallback ? this.detectWindowBased() : false;
    const isUserAgentBased = enableUserAgentFallback ? this.detectUserAgent() : false;
    const isIPhone14ProMax = isFrameBased || !isInFrame && (isWindowBased || isUserAgentBased);
    const specs = this.getDeviceSpecs();
    if (debugMode) {
      console.log("[DeviceDetection] iPhone 14 Pro Max Detection:", {
        isFrameBased,
        isWindowBased,
        isUserAgentBased,
        isInFrame,
        frame,
        specs,
        result: isIPhone14ProMax
      });
    }
    return {
      isIPhone14ProMax,
      isFrameBased,
      isWindowBased: isWindowBased || isUserAgentBased,
      specs,
      frame: frame || void 0
    };
  }
  getDeviceFrame(selector = this.DEFAULT_FRAME_SELECTOR) {
    const element = document.querySelector(selector);
    if (!element) {
      return null;
    }
    const rect = element.getBoundingClientRect();
    return {
      width: rect.width,
      height: rect.height,
      element
    };
  }
  isInDeviceFrame() {
    return !!document.querySelector(this.DEFAULT_FRAME_SELECTOR);
  }
  detectFrameBased(frame) {
    if (!frame) {
      return false;
    }
    const { width, height } = frame;
    const specs = this.IPHONE_14_PRO_MAX_SPECS;
    const isExactMatch = width === specs.EXACT_FRAME_WIDTH && height === specs.EXACT_FRAME_HEIGHT;
    const isRangeMatch = width >= specs.FRAME_WIDTH_MIN && width <= specs.FRAME_WIDTH_MAX && height >= specs.FRAME_HEIGHT_MIN && height <= specs.FRAME_HEIGHT_MAX;
    return isExactMatch || isRangeMatch;
  }
  detectWindowBased() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const specs = this.IPHONE_14_PRO_MAX_SPECS;
    const isPortrait = width === specs.VIEWPORT_WIDTH && height === specs.VIEWPORT_HEIGHT;
    const isLandscape = width === specs.VIEWPORT_HEIGHT && height === specs.VIEWPORT_WIDTH;
    return isPortrait || isLandscape;
  }
  detectUserAgent() {
    return /iPhone.*14.*Pro.*Max/i.test(navigator.userAgent);
  }
  getDeviceSpecs() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const aspectRatio = width / height;
    const orientation = width > height ? "landscape" : "portrait";
    return {
      width,
      height,
      aspectRatio,
      orientation
    };
  }
};

// src/hooks/useDeviceDetection.ts
var import_react = require("react");
function useDeviceDetection(options = {}) {
  const adapter = (0, import_react.useMemo)(() => new iPhone14ProMaxAdapter(), []);
  const [result, setResult] = (0, import_react.useState)(
    () => adapter.detectiPhone14ProMax(options)
  );
  const refresh = () => {
    setResult(adapter.detectiPhone14ProMax(options));
  };
  (0, import_react.useEffect)(() => {
    const handleResize = () => {
      refresh();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [options]);
  return {
    ...result,
    refresh
  };
}
function useIPhone14ProMaxDetection(options = {}) {
  const { isIPhone14ProMax } = useDeviceDetection(options);
  return isIPhone14ProMax;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DeviceDetector,
  iPhone14ProMaxAdapter,
  useDeviceDetection,
  useIPhone14ProMaxDetection,
  useIPhoneDetection
});
//# sourceMappingURL=index.js.map