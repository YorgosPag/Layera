var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
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

// ../../node_modules/@babel/runtime/helpers/extends.js
var require_extends = __commonJS({
  "../../node_modules/@babel/runtime/helpers/extends.js"(exports, module) {
    "use strict";
    function _extends2() {
      return module.exports = _extends2 = Object.assign ? Object.assign.bind() : function(n) {
        for (var e2 = 1; e2 < arguments.length; e2++) {
          var t = arguments[e2];
          for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
        }
        return n;
      }, module.exports.__esModule = true, module.exports["default"] = module.exports, _extends2.apply(null, arguments);
    }
    module.exports = _extends2, module.exports.__esModule = true, module.exports["default"] = module.exports;
  }
});

// ../../node_modules/void-elements/index.js
var require_void_elements = __commonJS({
  "../../node_modules/void-elements/index.js"(exports, module) {
    "use strict";
    module.exports = {
      "area": true,
      "base": true,
      "br": true,
      "col": true,
      "embed": true,
      "hr": true,
      "img": true,
      "input": true,
      "link": true,
      "meta": true,
      "param": true,
      "source": true,
      "track": true,
      "wbr": true
    };
  }
});

// src/hooks/useMeasurement.ts
import { useState as useState2, useCallback, useRef as useRef2 } from "react";

// ../../node_modules/react-i18next/dist/es/Trans.js
import { useContext } from "react";

// ../../node_modules/react-i18next/dist/es/TransWithoutContext.js
var import_extends = __toESM(require_extends(), 1);
import React, { isValidElement, cloneElement, createElement, Children } from "react";

// ../../node_modules/html-parse-stringify/dist/html-parse-stringify.module.js
var import_void_elements = __toESM(require_void_elements());

// ../../node_modules/react-i18next/dist/es/utils.js
function warn() {
  if (console && console.warn) {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    if (typeof args[0] === "string") args[0] = `react-i18next:: ${args[0]}`;
    console.warn(...args);
  }
}
var alreadyWarned = {};
function warnOnce() {
  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }
  if (typeof args[0] === "string" && alreadyWarned[args[0]]) return;
  if (typeof args[0] === "string") alreadyWarned[args[0]] = /* @__PURE__ */ new Date();
  warn(...args);
}
var loadedClb = (i18n, cb) => () => {
  if (i18n.isInitialized) {
    cb();
  } else {
    const initialized = () => {
      setTimeout(() => {
        i18n.off("initialized", initialized);
      }, 0);
      cb();
    };
    i18n.on("initialized", initialized);
  }
};
function loadNamespaces(i18n, ns, cb) {
  i18n.loadNamespaces(ns, loadedClb(i18n, cb));
}
function loadLanguages(i18n, lng, ns, cb) {
  if (typeof ns === "string") ns = [ns];
  ns.forEach((n) => {
    if (i18n.options.ns.indexOf(n) < 0) i18n.options.ns.push(n);
  });
  i18n.loadLanguages(lng, loadedClb(i18n, cb));
}
function oldI18nextHasLoadedNamespace(ns, i18n) {
  let options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  const lng = i18n.languages[0];
  const fallbackLng = i18n.options ? i18n.options.fallbackLng : false;
  const lastLng = i18n.languages[i18n.languages.length - 1];
  if (lng.toLowerCase() === "cimode") return true;
  const loadNotPending = (l, n) => {
    const loadState = i18n.services.backendConnector.state[`${l}|${n}`];
    return loadState === -1 || loadState === 2;
  };
  if (options.bindI18n && options.bindI18n.indexOf("languageChanging") > -1 && i18n.services.backendConnector.backend && i18n.isLanguageChangingTo && !loadNotPending(i18n.isLanguageChangingTo, ns)) return false;
  if (i18n.hasResourceBundle(lng, ns)) return true;
  if (!i18n.services.backendConnector.backend || i18n.options.resources && !i18n.options.partialBundledLanguages) return true;
  if (loadNotPending(lng, ns) && (!fallbackLng || loadNotPending(lastLng, ns))) return true;
  return false;
}
function hasLoadedNamespace(ns, i18n) {
  let options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  if (!i18n.languages || !i18n.languages.length) {
    warnOnce("i18n.languages were undefined or empty", i18n.languages);
    return true;
  }
  const isNewerI18next = i18n.options.ignoreJSONStructure !== void 0;
  if (!isNewerI18next) {
    return oldI18nextHasLoadedNamespace(ns, i18n, options);
  }
  return i18n.hasLoadedNamespace(ns, {
    lng: options.lng,
    precheck: (i18nInstance2, loadNotPending) => {
      if (options.bindI18n && options.bindI18n.indexOf("languageChanging") > -1 && i18nInstance2.services.backendConnector.backend && i18nInstance2.isLanguageChangingTo && !loadNotPending(i18nInstance2.isLanguageChangingTo, ns)) return false;
    }
  });
}

// ../../node_modules/react-i18next/dist/es/unescape.js
var matchHtmlEntity = /&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34|nbsp|#160|copy|#169|reg|#174|hellip|#8230|#x2F|#47);/g;
var htmlEntities = {
  "&amp;": "&",
  "&#38;": "&",
  "&lt;": "<",
  "&#60;": "<",
  "&gt;": ">",
  "&#62;": ">",
  "&apos;": "'",
  "&#39;": "'",
  "&quot;": '"',
  "&#34;": '"',
  "&nbsp;": " ",
  "&#160;": " ",
  "&copy;": "\xA9",
  "&#169;": "\xA9",
  "&reg;": "\xAE",
  "&#174;": "\xAE",
  "&hellip;": "\u2026",
  "&#8230;": "\u2026",
  "&#x2F;": "/",
  "&#47;": "/"
};
var unescapeHtmlEntity = (m) => htmlEntities[m];
var unescape = (text) => text.replace(matchHtmlEntity, unescapeHtmlEntity);

// ../../node_modules/react-i18next/dist/es/defaults.js
var defaultOptions = {
  bindI18n: "languageChanged",
  bindI18nStore: "",
  transEmptyNodeValue: "",
  transSupportBasicHtmlNodes: true,
  transWrapTextNodes: "",
  transKeepBasicHtmlNodesFor: ["br", "strong", "i", "p"],
  useSuspense: true,
  unescape
};
function getDefaults() {
  return defaultOptions;
}

// ../../node_modules/react-i18next/dist/es/i18nInstance.js
var i18nInstance;
function getI18n() {
  return i18nInstance;
}

// ../../node_modules/react-i18next/dist/es/context.js
import { createContext } from "react";
var I18nContext = createContext();
var ReportNamespaces = class {
  constructor() {
    this.usedNamespaces = {};
  }
  addUsedNamespaces(namespaces) {
    namespaces.forEach((ns) => {
      if (!this.usedNamespaces[ns]) this.usedNamespaces[ns] = true;
    });
  }
  getUsedNamespaces() {
    return Object.keys(this.usedNamespaces);
  }
};

// ../../node_modules/react-i18next/dist/es/useTranslation.js
import { useState, useEffect, useContext as useContext2, useRef } from "react";
var usePrevious = (value, ignore) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = ignore ? ref.current : value;
  }, [value, ignore]);
  return ref.current;
};
function useTranslation(ns) {
  let props = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  const {
    i18n: i18nFromProps
  } = props;
  const {
    i18n: i18nFromContext,
    defaultNS: defaultNSFromContext
  } = useContext2(I18nContext) || {};
  const i18n = i18nFromProps || i18nFromContext || getI18n();
  if (i18n && !i18n.reportNamespaces) i18n.reportNamespaces = new ReportNamespaces();
  if (!i18n) {
    warnOnce("You will need to pass in an i18next instance by using initReactI18next");
    const notReadyT = (k, optsOrDefaultValue) => {
      if (typeof optsOrDefaultValue === "string") return optsOrDefaultValue;
      if (optsOrDefaultValue && typeof optsOrDefaultValue === "object" && typeof optsOrDefaultValue.defaultValue === "string") return optsOrDefaultValue.defaultValue;
      return Array.isArray(k) ? k[k.length - 1] : k;
    };
    const retNotReady = [notReadyT, {}, false];
    retNotReady.t = notReadyT;
    retNotReady.i18n = {};
    retNotReady.ready = false;
    return retNotReady;
  }
  if (i18n.options.react && i18n.options.react.wait !== void 0) warnOnce("It seems you are still using the old wait option, you may migrate to the new useSuspense behaviour.");
  const i18nOptions = {
    ...getDefaults(),
    ...i18n.options.react,
    ...props
  };
  const {
    useSuspense,
    keyPrefix
  } = i18nOptions;
  let namespaces = ns || defaultNSFromContext || i18n.options && i18n.options.defaultNS;
  namespaces = typeof namespaces === "string" ? [namespaces] : namespaces || ["translation"];
  if (i18n.reportNamespaces.addUsedNamespaces) i18n.reportNamespaces.addUsedNamespaces(namespaces);
  const ready = (i18n.isInitialized || i18n.initializedStoreOnce) && namespaces.every((n) => hasLoadedNamespace(n, i18n, i18nOptions));
  function getT() {
    return i18n.getFixedT(props.lng || null, i18nOptions.nsMode === "fallback" ? namespaces : namespaces[0], keyPrefix);
  }
  const [t, setT] = useState(getT);
  let joinedNS = namespaces.join();
  if (props.lng) joinedNS = `${props.lng}${joinedNS}`;
  const previousJoinedNS = usePrevious(joinedNS);
  const isMounted = useRef(true);
  useEffect(() => {
    const {
      bindI18n,
      bindI18nStore
    } = i18nOptions;
    isMounted.current = true;
    if (!ready && !useSuspense) {
      if (props.lng) {
        loadLanguages(i18n, props.lng, namespaces, () => {
          if (isMounted.current) setT(getT);
        });
      } else {
        loadNamespaces(i18n, namespaces, () => {
          if (isMounted.current) setT(getT);
        });
      }
    }
    if (ready && previousJoinedNS && previousJoinedNS !== joinedNS && isMounted.current) {
      setT(getT);
    }
    function boundReset() {
      if (isMounted.current) setT(getT);
    }
    if (bindI18n && i18n) i18n.on(bindI18n, boundReset);
    if (bindI18nStore && i18n) i18n.store.on(bindI18nStore, boundReset);
    return () => {
      isMounted.current = false;
      if (bindI18n && i18n) bindI18n.split(" ").forEach((e2) => i18n.off(e2, boundReset));
      if (bindI18nStore && i18n) bindI18nStore.split(" ").forEach((e2) => i18n.store.off(e2, boundReset));
    };
  }, [i18n, joinedNS]);
  const isInitial = useRef(true);
  useEffect(() => {
    if (isMounted.current && !isInitial.current) {
      setT(getT);
    }
    isInitial.current = false;
  }, [i18n, keyPrefix]);
  const ret = [t, i18n, ready];
  ret.t = t;
  ret.i18n = i18n;
  ret.ready = ready;
  if (ready) return ret;
  if (!ready && !useSuspense) return ret;
  throw new Promise((resolve) => {
    if (props.lng) {
      loadLanguages(i18n, props.lng, namespaces, () => resolve());
    } else {
      loadNamespaces(i18n, namespaces, () => resolve());
    }
  });
}

// ../../node_modules/react-i18next/dist/es/withTranslation.js
import { createElement as createElement2, forwardRef as forwardRefReact } from "react";

// ../../node_modules/react-i18next/dist/es/I18nextProvider.js
import { createElement as createElement3, useMemo } from "react";

// ../../node_modules/react-i18next/dist/es/withSSR.js
import { createElement as createElement4 } from "react";

// ../../node_modules/react-i18next/dist/es/useSSR.js
import { useContext as useContext3 } from "react";

// src/utils/calculations.ts
import L from "leaflet";
var calculateProjectedArea = (latlngs) => {
  if (latlngs.length < 3) return 0;
  const map = L.CRS.EPSG3857;
  const points = latlngs.map((latlng) => map.project(latlng));
  let area = 0;
  const n = points.length;
  for (let i = 0; i < n; i++) {
    const p1 = points[i];
    const p2 = points[(i + 1) % n];
    area += p1.x * p2.y - p2.x * p1.y;
  }
  return Math.abs(area / 2);
};
var calculateDistance = (latlngs) => {
  if (latlngs.length < 2) {
    return 0;
  }
  let totalDistance = 0;
  for (let i = 0; i < latlngs.length - 1; i++) {
    totalDistance += latlngs[i].distanceTo(latlngs[i + 1]);
  }
  return totalDistance;
};
var calculatePointDistance = (point1, point2) => {
  return point1.distanceTo(point2);
};
var calculatePolygonCenter = (latlngs) => {
  if (latlngs.length === 0) {
    throw new Error("Cannot calculate center of empty polygon");
  }
  let latSum = 0;
  let lngSum = 0;
  for (const point of latlngs) {
    latSum += point.lat;
    lngSum += point.lng;
  }
  return L.latLng(latSum / latlngs.length, lngSum / latlngs.length);
};
var calculatePerimeter = (latlngs) => {
  if (latlngs.length < 2) return 0;
  const closedPolygon = [...latlngs, latlngs[0]];
  return calculateDistance(closedPolygon);
};
var isPointInPolygon = (point, polygon) => {
  let inside = false;
  const x = point.lng;
  const y = point.lat;
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i].lng;
    const yi = polygon[i].lat;
    const xj = polygon[j].lng;
    const yj = polygon[j].lat;
    if (yi > y !== yj > y && x < (xj - xi) * (y - yi) / (yj - yi) + xi) {
      inside = !inside;
    }
  }
  return inside;
};
var calculateBounds = (latlngs) => {
  if (latlngs.length === 0) {
    throw new Error("Cannot calculate bounds of empty point array");
  }
  return L.latLngBounds(latlngs);
};

// src/utils/formatters.ts
var formatDistance = (meters, decimals = 2) => {
  if (meters === 0) return "0 m";
  if (meters >= 1e3) {
    return `${(meters / 1e3).toFixed(decimals)} km`;
  }
  return `${meters.toFixed(decimals)} m`;
};
var formatArea = (sqMeters) => {
  if (sqMeters === 0) return "0 m\xB2";
  if (sqMeters >= 1e6) {
    return `${(sqMeters / 1e6).toFixed(2)} km\xB2`;
  }
  if (sqMeters >= 1e4) {
    return `${(sqMeters / 1e4).toFixed(2)} ha`;
  }
  return `${sqMeters.toFixed(2)} m\xB2`;
};
var useMeasurementFormatter = () => {
  const { t } = useTranslation();
  const formatDistanceWithLabels = (meters, decimals = 2) => {
    if (meters === 0) return `0 ${t("geo-drawing.units.meters")}`;
    if (meters >= 1e3) {
      return `${(meters / 1e3).toFixed(decimals)} ${t("geo-drawing.units.kilometers")}`;
    }
    return `${meters.toFixed(decimals)} ${t("geo-drawing.units.meters")}`;
  };
  const formatAreaWithLabels = (sqMeters) => {
    if (sqMeters === 0) return `0 ${t("geo-drawing.units.square-meters")}`;
    if (sqMeters >= 1e6) {
      return `${(sqMeters / 1e6).toFixed(2)} ${t("geo-drawing.units.square-kilometers")}`;
    }
    if (sqMeters >= 1e4) {
      return `${(sqMeters / 1e4).toFixed(2)} ${t("geo-drawing.units.hectares")}`;
    }
    return `${sqMeters.toFixed(2)} ${t("geo-drawing.units.square-meters")}`;
  };
  const formatCoordinates = (lat, lng, decimals = 6) => {
    return `${lat.toFixed(decimals)}, ${lng.toFixed(decimals)}`;
  };
  const formatPointLabel = (index) => {
    return t("geo-drawing.point-label", { index: index + 1 });
  };
  return {
    formatDistanceWithLabels,
    formatAreaWithLabels,
    formatCoordinates,
    formatPointLabel,
    // Backward compatibility exports
    formatDistance,
    formatArea
  };
};
var formatCoordinatesBySystem = (lat, lng, system = "WGS84", decimals = 6) => {
  switch (system) {
    case "WGS84":
      return `${lat.toFixed(decimals)}\xB0N, ${lng.toFixed(decimals)}\xB0E`;
    case "EGSA87":
      return `X: ${lng.toFixed(2)}, Y: ${lat.toFixed(2)} (\u0395\u0393\u03A3\u039187)`;
    case "UTM":
      return `UTM: ${lng.toFixed(0)}E, ${lat.toFixed(0)}N`;
    default:
      return `${lat.toFixed(decimals)}, ${lng.toFixed(decimals)}`;
  }
};
var formatBearing = (bearing) => {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const index = Math.round(bearing / 45) % 8;
  return `${bearing.toFixed(1)}\xB0 (${directions[index]})`;
};

// src/hooks/useMeasurement.ts
import { useNotifications } from "@layera/notifications";
var useMeasurement = () => {
  const { t } = useTranslation();
  const { addNotification } = useNotifications();
  const { formatDistanceWithLabels, formatAreaWithLabels } = useMeasurementFormatter();
  const [mode, setMode] = useState2("distance");
  const [state, setState] = useState2("idle");
  const [points, setPoints] = useState2([]);
  const [currentResult, setCurrentResult] = useState2(null);
  const [results, setResults] = useState2([]);
  const pointIdCounter = useRef2(0);
  const addPoint = useCallback((latlng) => {
    const newPoint = {
      id: `point-${pointIdCounter.current++}`,
      latlng,
      index: points.length
    };
    const updatedPoints = [...points, newPoint];
    setPoints(updatedPoints);
    if (points.length === 0) {
      setState("drawing");
    }
    let distance = 0;
    let area = 0;
    let displayValue = "";
    if (mode === "distance" && updatedPoints.length >= 2) {
      const latlngs = updatedPoints.map((p) => p.latlng);
      distance = calculateDistance(latlngs);
      displayValue = formatDistanceWithLabels(distance);
    } else if (mode === "area" && updatedPoints.length >= 3) {
      const latlngs = updatedPoints.map((p) => p.latlng);
      area = calculateProjectedArea(latlngs);
      displayValue = formatAreaWithLabels(area);
    } else if (mode === "point") {
      displayValue = `${latlng.lat.toFixed(6)}, ${latlng.lng.toFixed(6)}`;
    }
    const result = {
      type: mode,
      points: updatedPoints,
      ...mode === "distance" && distance !== void 0 && { distance },
      ...mode === "area" && area !== void 0 && { area },
      displayValue,
      timestamp: Date.now()
    };
    setCurrentResult(result);
  }, [points, mode, formatDistanceWithLabels, formatAreaWithLabels]);
  const finishMeasurement = useCallback(() => {
    if (!currentResult) return;
    if (mode === "distance" && points.length < 2) {
      addNotification({
        type: "error",
        message: t("geo-drawing.errors.minimum-points-distance")
      });
      return;
    }
    if (mode === "area" && points.length < 3) {
      addNotification({
        type: "error",
        message: t("geo-drawing.errors.minimum-points-area")
      });
      return;
    }
    setResults((prev) => [...prev, currentResult]);
    setState("finished");
    addNotification({
      type: "success",
      message: t("geo-drawing.measurement-completed", {
        type: t(`geo-drawing.modes.${mode}`),
        value: currentResult.displayValue
      })
    });
  }, [currentResult, mode, points.length, addNotification, t]);
  const cancelMeasurement = useCallback(() => {
    setPoints([]);
    setCurrentResult(null);
    setState("idle");
  }, []);
  const resetAll = useCallback(() => {
    setPoints([]);
    setCurrentResult(null);
    setResults([]);
    setState("idle");
    pointIdCounter.current = 0;
  }, []);
  const changeMeasurementMode = useCallback((newMode) => {
    if (state === "drawing") {
      if (window.confirm(t("geo-drawing.confirm-mode-change"))) {
        cancelMeasurement();
        setMode(newMode);
      }
    } else {
      setMode(newMode);
    }
  }, [state, cancelMeasurement, t]);
  const removeLastPoint = useCallback(() => {
    if (points.length === 0) return;
    const updatedPoints = points.slice(0, -1);
    setPoints(updatedPoints);
    if (updatedPoints.length === 0) {
      setState("idle");
      setCurrentResult(null);
    } else {
      let distance = 0;
      let area = 0;
      let displayValue = "";
      if (mode === "distance" && updatedPoints.length >= 2) {
        const latlngs = updatedPoints.map((p) => p.latlng);
        distance = calculateDistance(latlngs);
        displayValue = formatDistanceWithLabels(distance);
      } else if (mode === "area" && updatedPoints.length >= 3) {
        const latlngs = updatedPoints.map((p) => p.latlng);
        area = calculateProjectedArea(latlngs);
        displayValue = formatAreaWithLabels(area);
      }
      const result = {
        type: mode,
        points: updatedPoints,
        ...mode === "distance" && distance !== void 0 && { distance },
        ...mode === "area" && area !== void 0 && { area },
        displayValue,
        timestamp: Date.now()
      };
      setCurrentResult(result);
    }
  }, [points, mode, formatDistanceWithLabels, formatAreaWithLabels]);
  const removeResult = useCallback((timestamp) => {
    setResults((prev) => prev.filter((result) => result.timestamp !== timestamp));
  }, []);
  const getCurrentDistance = useCallback(() => {
    if (points.length < 2) return 0;
    const latlngs = points.map((p) => p.latlng);
    return calculateDistance(latlngs);
  }, [points]);
  const getCurrentArea = useCallback(() => {
    if (points.length < 3) return 0;
    const latlngs = points.map((p) => p.latlng);
    return calculateProjectedArea(latlngs);
  }, [points]);
  return {
    // State
    mode,
    state,
    points,
    currentResult,
    results,
    // Actions
    addPoint,
    finishMeasurement,
    cancelMeasurement,
    resetAll,
    changeMeasurementMode,
    removeLastPoint,
    removeResult,
    // Computed values
    getCurrentDistance,
    getCurrentArea,
    isDrawing: state === "drawing",
    isFinished: state === "finished",
    canFinish: mode === "distance" && points.length >= 2 || mode === "area" && points.length >= 3 || mode === "point" && points.length >= 1
  };
};

// src/hooks/useGeometrySnap.ts
import { useState as useState3, useEffect as useEffect2, useCallback as useCallback2, useRef as useRef3 } from "react";
import { useMap } from "react-leaflet";
import { useSnapEngine } from "@layera/snap-interactions";

// src/services/osmService.ts
import { CONFIG } from "@layera/constants";
var cache = /* @__PURE__ */ new Map();
var fetchBuildingOutlines = async (bounds) => {
  const boundsStr = `${bounds.getSouth().toFixed(4)},${bounds.getWest().toFixed(4)},${bounds.getNorth().toFixed(4)},${bounds.getEast().toFixed(4)}`;
  if (cache.has(boundsStr)) {
    return Promise.resolve(cache.get(boundsStr));
  }
  const bbox = `${bounds.getSouth()},${bounds.getWest()},${bounds.getNorth()},${bounds.getEast()}`;
  const query = `
    [out:json][timeout:${CONFIG.osm.requestTimeout / 1e3}];
    (
      node["building"](${bbox});
      way["building"](${bbox});
      relation["building"](${bbox});
    );
    out body;
    >;
    out skel qt;
  `;
  try {
    const response = await fetch(CONFIG.osm.overpassApiUrl, {
      method: "POST",
      body: `data=${encodeURIComponent(query)}`
    });
    if (!response.ok) {
      if (response.status !== 429 && response.status !== 504) {
        console.error(`Overpass API error: ${response.statusText}`);
      }
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }
    const osmData = await response.json();
    const geojson = osmtogeojson(osmData);
    geojson.features = geojson.features.filter(
      (f) => f.geometry && (f.geometry.type === "Polygon" || f.geometry.type === "MultiPolygon")
    );
    cache.set(boundsStr, geojson);
    return geojson;
  } catch (error) {
    return { type: "FeatureCollection", features: [] };
  }
};
var clearOSMCache = () => {
  cache.clear();
};
var getCacheSize = () => {
  return cache.size;
};
var isBoundsCached = (bounds) => {
  const boundsStr = `${bounds.getSouth().toFixed(4)},${bounds.getWest().toFixed(4)},${bounds.getNorth().toFixed(4)},${bounds.getEast().toFixed(4)}`;
  return cache.has(boundsStr);
};
var prefetchBuildingOutlines = async (bounds) => {
  try {
    await fetchBuildingOutlines(bounds);
  } catch (error) {
  }
};

// src/utils/geometry.ts
import L2 from "leaflet";
var geoJsonToLatLng = (coordinates, geometryType) => {
  if (geometryType === "Polygon" && Array.isArray(coordinates[0]) && Array.isArray(coordinates[0][0])) {
    const ring = coordinates;
    return ring[0].map((coord) => L2.latLng(coord[1], coord[0]));
  }
  if (geometryType === "LineString" && Array.isArray(coordinates[0]) && typeof coordinates[0][0] === "number") {
    const line = coordinates;
    return line.map((coord) => L2.latLng(coord[1], coord[0]));
  }
  if (geometryType === "Point" && typeof coordinates[0] === "number") {
    const point = coordinates;
    return [L2.latLng(point[1], point[0])];
  }
  return [];
};
var latLngToGeoJson = (latlngs, geometryType) => {
  const coords = latlngs.map((latlng) => [latlng.lng, latlng.lat]);
  if (geometryType === "Polygon") {
    const closedCoords = [...coords];
    if (coords.length > 0 && (coords[0][0] !== coords[coords.length - 1][0] || coords[0][1] !== coords[coords.length - 1][1])) {
      closedCoords.push(coords[0]);
    }
    return [closedCoords];
  }
  return coords;
};
var closestPointOnSegment = (point, segmentStart, segmentEnd) => {
  const map = L2.CRS.EPSG3857;
  const p = map.project(point);
  const a = map.project(segmentStart);
  const b = map.project(segmentEnd);
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  if (dx === 0 && dy === 0) {
    const closestPoint2 = segmentStart;
    return {
      point: closestPoint2,
      distance: point.distanceTo(closestPoint2)
    };
  }
  const t = Math.max(0, Math.min(1, ((p.x - a.x) * dx + (p.y - a.y) * dy) / (dx * dx + dy * dy)));
  const closestProjected = L2.point(a.x + t * dx, a.y + t * dy);
  const closestPoint = map.unproject(closestProjected);
  return {
    point: closestPoint,
    distance: point.distanceTo(closestPoint)
  };
};
var arePointsEqual = (point1, point2, tolerance = 0.1) => {
  return point1.distanceTo(point2) <= tolerance;
};
var simplifyPolygon = (latlngs, tolerance = 1) => {
  if (latlngs.length <= 2) return latlngs;
  const douglasPeucker = (points, epsilon) => {
    if (points.length <= 2) return points;
    let maxDistance = 0;
    let maxIndex = 0;
    for (let i = 1; i < points.length - 1; i++) {
      const { distance } = closestPointOnSegment(points[i], points[0], points[points.length - 1]);
      if (distance > maxDistance) {
        maxDistance = distance;
        maxIndex = i;
      }
    }
    if (maxDistance > epsilon) {
      const leftPart = douglasPeucker(points.slice(0, maxIndex + 1), epsilon);
      const rightPart = douglasPeucker(points.slice(maxIndex), epsilon);
      return [...leftPart.slice(0, -1), ...rightPart];
    }
    return [points[0], points[points.length - 1]];
  };
  return douglasPeucker(latlngs, tolerance);
};
var calculateBearing = (point1, point2) => {
  const lat1 = point1.lat * Math.PI / 180;
  const lat2 = point2.lat * Math.PI / 180;
  const deltaLng = (point2.lng - point1.lng) * Math.PI / 180;
  const y = Math.sin(deltaLng) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(deltaLng);
  let bearing = Math.atan2(y, x) * 180 / Math.PI;
  return (bearing + 360) % 360;
};
var extractOSMGeometry = (feature) => {
  const { geometry } = feature;
  const results = [];
  if (geometry.type === "Polygon") {
    const coords = geometry.coordinates;
    coords.forEach((ring) => {
      const latlngs = ring.map((coord) => L2.latLng(coord[1], coord[0]));
      results.push(latlngs);
    });
  } else if (geometry.type === "MultiPolygon") {
    const coords = geometry.coordinates;
    coords.forEach((polygon) => {
      polygon.forEach((ring) => {
        const latlngs = ring.map((coord) => L2.latLng(coord[1], coord[0]));
        results.push(latlngs);
      });
    });
  }
  return results;
};

// src/hooks/useGeometrySnap.ts
import { CONFIG as CONFIG2 } from "@layera/constants";
var useGeometrySnap = (isEnabled = true) => {
  const map = useMap();
  const [osmData, setOsmData] = useState3(null);
  const [isSnappingEffective, setIsSnappingEffective] = useState3(false);
  const timeoutRef = useRef3(null);
  const snapEngine = useSnapEngine({
    tolerance: CONFIG2.geoDrawing.snapTolerance,
    enabledTypes: /* @__PURE__ */ new Set(["vertex", "edge", "center", "nearest"]),
    spatialIndexing: true
  });
  useEffect2(() => {
    const fetchData = async () => {
      const currentZoom = map.getZoom();
      if (!isEnabled || currentZoom < CONFIG2.geoDrawing.minSnapZoom) {
        setOsmData(null);
        setIsSnappingEffective(false);
        snapEngine.clearGeometries();
        return;
      }
      setIsSnappingEffective(true);
      try {
        const geojson = await fetchBuildingOutlines(map.getBounds());
        setOsmData(geojson);
        const geometries = [];
        geojson.features.forEach((feature) => {
          const polygons = extractOSMGeometry(feature);
          geometries.push(...polygons);
        });
        snapEngine.setGeometries(geometries);
      } catch (error) {
        console.warn("Failed to fetch OSM data for snapping:", error);
        setOsmData(null);
        setIsSnappingEffective(false);
      }
    };
    const handleMoveEnd = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = window.setTimeout(fetchData, CONFIG2.geoDrawing.debounceMs);
    };
    map.on("moveend zoomend", handleMoveEnd);
    fetchData();
    return () => {
      map.off("moveend zoomend", handleMoveEnd);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setIsSnappingEffective(false);
      snapEngine.clearGeometries();
    };
  }, [map, isEnabled, snapEngine]);
  const getSnappedPoint = useCallback2((latlng) => {
    if (!isEnabled || !isSnappingEffective || map.getZoom() < CONFIG2.geoDrawing.minSnapZoom) {
      return {
        snappedLatLng: latlng,
        snapPoint: null,
        snapType: null,
        isSnapped: false
      };
    }
    return snapEngine.snapToPoint(latlng);
  }, [isEnabled, isSnappingEffective, map, snapEngine]);
  const snapToVertex = useCallback2((latlng) => {
    if (!isEnabled || !isSnappingEffective) {
      return { snappedLatLng: latlng, snapPoint: null, isSnapped: false };
    }
    return snapEngine.snapToVertex(latlng);
  }, [isEnabled, isSnappingEffective, snapEngine]);
  const snapToEdge = useCallback2((latlng) => {
    if (!isEnabled || !isSnappingEffective) {
      return { snappedLatLng: latlng, snapPoint: null, isSnapped: false };
    }
    return snapEngine.snapToEdge(latlng);
  }, [isEnabled, isSnappingEffective, snapEngine]);
  const setSnapTypes = useCallback2((types) => {
    snapEngine.setEnabledTypes(types);
  }, [snapEngine]);
  const setSnapTolerance = useCallback2((tolerance) => {
    snapEngine.setTolerance(tolerance);
  }, [snapEngine]);
  const getBuildingInfo = useCallback2((latlng) => {
    if (!osmData) return null;
    for (const feature of osmData.features) {
      const polygons = extractOSMGeometry(feature);
      for (const polygon of polygons) {
        let inside = false;
        for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
          if (polygon[i].lat > latlng.lat !== polygon[j].lat > latlng.lat && latlng.lng < (polygon[j].lng - polygon[i].lng) * (latlng.lat - polygon[i].lat) / (polygon[j].lat - polygon[i].lat) + polygon[i].lng) {
            inside = !inside;
          }
        }
        if (inside) {
          return feature.properties;
        }
      }
    }
    return null;
  }, [osmData]);
  return {
    // State
    isSnappingEffective,
    osmData,
    snapEngine,
    // Snap functions
    getSnappedPoint,
    snapToVertex,
    snapToEdge,
    // Configuration
    setSnapTypes,
    setSnapTolerance,
    // Utility
    getBuildingInfo,
    // Backward compatibility με το παλιό API
    snappingData: osmData
  };
};

// src/components/MeasurementControls.tsx
import { Button } from "@layera/buttons";
import { Card } from "@layera/cards";
import { Typography } from "@layera/typography";
import { Layout } from "@layera/layout";
import { Icons } from "@layera/icons";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
var MeasurementControls = ({
  mode,
  distance,
  area,
  onModeChange,
  onReset,
  onFinish,
  onCancel,
  isDrawing,
  canFinish,
  displayValue
}) => {
  const { t } = useTranslation();
  return /* @__PURE__ */ jsxs(Card, { variant: "floating", className: "min-w-[200px]", children: [
    /* @__PURE__ */ jsx(Typography, { variant: "h6", className: "text-center mb-3", children: t("geo-drawing.measurement-title") }),
    /* @__PURE__ */ jsxs(Layout, { direction: "horizontal", spacing: "sm", className: "mb-3", children: [
      /* @__PURE__ */ jsxs(
        Button,
        {
          variant: mode === "distance" ? "primary" : "secondary",
          size: "sm",
          onClick: () => onModeChange("distance"),
          disabled: isDrawing,
          className: "flex-1",
          children: [
            /* @__PURE__ */ jsx(Icons.Rule, { className: "w-4 h-4 mr-1" }),
            t("geo-drawing.modes.distance")
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        Button,
        {
          variant: mode === "area" ? "primary" : "secondary",
          size: "sm",
          onClick: () => onModeChange("area"),
          disabled: isDrawing,
          className: "flex-1",
          children: [
            /* @__PURE__ */ jsx(Icons.Square, { className: "w-4 h-4 mr-1" }),
            t("geo-drawing.modes.area")
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx(Layout, { direction: "horizontal", spacing: "sm", className: "mb-3", children: /* @__PURE__ */ jsxs(
      Button,
      {
        variant: mode === "point" ? "primary" : "secondary",
        size: "sm",
        onClick: () => onModeChange("point"),
        disabled: isDrawing,
        className: "flex-1",
        children: [
          /* @__PURE__ */ jsx(Icons.MapPin, { className: "w-4 h-4 mr-1" }),
          t("geo-drawing.modes.point")
        ]
      }
    ) }),
    /* @__PURE__ */ jsx(Card, { variant: "inner", className: "mb-3 p-2 min-h-[60px] flex items-center justify-center", children: /* @__PURE__ */ jsx(Typography, { variant: "body", className: "text-center", children: displayValue || (mode === "distance" ? `${t("geo-drawing.labels.distance")}: ${distance.toFixed(2)} m` : mode === "area" ? `${t("geo-drawing.labels.area")}: ${area.toFixed(2)} m\xB2` : t("geo-drawing.labels.select-point")) }) }),
    /* @__PURE__ */ jsxs(Layout, { direction: "vertical", spacing: "sm", children: [
      isDrawing && /* @__PURE__ */ jsxs(Layout, { direction: "horizontal", spacing: "sm", children: [
        canFinish && onFinish && /* @__PURE__ */ jsxs(
          Button,
          {
            variant: "success",
            size: "sm",
            onClick: onFinish,
            className: "flex-1",
            children: [
              /* @__PURE__ */ jsx(Icons.Check, { className: "w-4 h-4 mr-1" }),
              t("geo-drawing.actions.finish")
            ]
          }
        ),
        onCancel && /* @__PURE__ */ jsxs(
          Button,
          {
            variant: "secondary",
            size: "sm",
            onClick: onCancel,
            className: "flex-1",
            children: [
              /* @__PURE__ */ jsx(Icons.X, { className: "w-4 h-4 mr-1" }),
              t("geo-drawing.actions.cancel")
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(
        Button,
        {
          variant: "danger",
          size: "sm",
          onClick: onReset,
          className: "w-full",
          children: [
            /* @__PURE__ */ jsx(Icons.Trash, { className: "w-4 h-4 mr-1" }),
            t("geo-drawing.actions.clear")
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx(Card, { variant: "inner", className: "mt-3 p-2", children: /* @__PURE__ */ jsx(Typography, { variant: "caption", className: "text-center leading-tight", children: isDrawing ? /* @__PURE__ */ jsxs(Fragment, { children: [
      t("geo-drawing.instructions.click-add"),
      /* @__PURE__ */ jsx("br", {}),
      mode !== "point" && /* @__PURE__ */ jsxs(Fragment, { children: [
        t("geo-drawing.instructions.double-click-finish"),
        /* @__PURE__ */ jsx("br", {})
      ] }),
      t("geo-drawing.instructions.esc-cancel")
    ] }) : t("geo-drawing.instructions.select-mode") }) })
  ] });
};

// src/components/MeasurementCanvas.tsx
import { useCallback as useCallback3, useEffect as useEffect3 } from "react";
import { Polygon, Polyline, CircleMarker, useMapEvents } from "react-leaflet";
import { useTheme } from "@layera/theme-switcher";
import { Fragment as Fragment2, jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
var MeasurementCanvas = ({
  mode,
  enableSnapping = true,
  onMeasurementChange,
  className
}) => {
  const { theme } = useTheme();
  const {
    points,
    state,
    addPoint,
    finishMeasurement,
    cancelMeasurement,
    changeMeasurementMode,
    currentResult
  } = useMeasurement();
  const {
    getSnappedPoint,
    isSnappingEffective
  } = useGeometrySnap(enableSnapping);
  useEffect3(() => {
    changeMeasurementMode(mode);
  }, [mode, changeMeasurementMode]);
  useEffect3(() => {
    if (currentResult && onMeasurementChange) {
      onMeasurementChange(currentResult);
    }
  }, [currentResult, onMeasurementChange]);
  const mapEvents = useMapEvents({
    click: useCallback3((e2) => {
      if (state === "finished") return;
      let latlng = e2.latlng;
      let snapped = false;
      let snapResult;
      if (enableSnapping && isSnappingEffective) {
        const result = getSnappedPoint(e2.latlng);
        if (result.isSnapped && result.snappedLatLng) {
          latlng = result.snappedLatLng;
          snapped = true;
          snapResult = {
            snapPoint: result.snapPoint,
            snapType: result.snapType
          };
        }
      }
      const interactionEvent = {
        type: "click",
        latlng,
        originalEvent: e2.originalEvent,
        snapped,
        snapResult
      };
      addPoint(latlng);
    }, [state, enableSnapping, isSnappingEffective, getSnappedPoint, addPoint]),
    dblclick: useCallback3((e2) => {
      e2.originalEvent.preventDefault();
      e2.originalEvent.stopPropagation();
      if (state === "drawing" && mode !== "point") {
        finishMeasurement();
      }
    }, [state, mode, finishMeasurement]),
    keydown: useCallback3((e2) => {
      if (e2.originalEvent.key === "Escape" && state === "drawing") {
        cancelMeasurement();
      }
    }, [state, cancelMeasurement])
  });
  const getColors = useCallback3(() => {
    const isDark = theme === "dark";
    return {
      line: isDark ? "#60a5fa" : "#3b82f6",
      fill: isDark ? "rgba(96, 165, 250, 0.2)" : "rgba(59, 130, 246, 0.2)",
      point: isDark ? "#f59e0b" : "#d97706",
      pointBorder: isDark ? "#1f2937" : "#ffffff"
    };
  }, [theme]);
  const colors = getColors();
  const renderGeometry = () => {
    if (points.length === 0) return null;
    const latlngs = points.map((p) => p.latlng);
    return /* @__PURE__ */ jsxs2(Fragment2, { children: [
      points.map((point, index) => /* @__PURE__ */ jsx2(
        CircleMarker,
        {
          center: point.latlng,
          radius: 6,
          pathOptions: {
            color: colors.pointBorder,
            fillColor: colors.point,
            fillOpacity: 1,
            weight: 2
          }
        },
        point.id
      )),
      (mode === "distance" || mode === "area") && latlngs.length >= 2 && /* @__PURE__ */ jsx2(
        Polyline,
        {
          positions: latlngs,
          pathOptions: {
            color: colors.line,
            weight: 3,
            opacity: 0.8,
            dashArray: state === "drawing" ? "5, 5" : void 0
          }
        }
      ),
      mode === "area" && latlngs.length >= 3 && state === "finished" && /* @__PURE__ */ jsx2(
        Polygon,
        {
          positions: latlngs,
          pathOptions: {
            color: colors.line,
            fillColor: colors.fill,
            fillOpacity: 0.3,
            weight: 2
          }
        }
      )
    ] });
  };
  return /* @__PURE__ */ jsx2("div", { className, children: renderGeometry() });
};

// src/components/GeometryRenderer.tsx
import React3, { useMemo as useMemo2 } from "react";
import { Polygon as Polygon2, Polyline as Polyline2, CircleMarker as CircleMarker2, Popup } from "react-leaflet";
import { useTheme as useTheme2 } from "@layera/theme-switcher";
import { Typography as Typography2 } from "@layera/typography";
import { Fragment as Fragment3, jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
var GeometryRenderer = ({
  measurements = [],
  osmFeatures = [],
  showOSMBuildings = true,
  showMeasurements = true,
  onMeasurementClick,
  onBuildingClick
}) => {
  const { theme } = useTheme2();
  const { t } = useTranslation();
  const { formatDistanceWithLabels, formatAreaWithLabels } = useMeasurementFormatter();
  const colors = useMemo2(() => {
    const isDark = theme === "dark";
    return {
      // Measurement colors
      measurementLine: isDark ? "#10b981" : "#059669",
      measurementFill: isDark ? "rgba(16, 185, 129, 0.2)" : "rgba(5, 150, 105, 0.2)",
      measurementPoint: isDark ? "#f59e0b" : "#d97706",
      // OSM building colors
      buildingLine: isDark ? "#6b7280" : "#9ca3af",
      buildingFill: isDark ? "rgba(107, 114, 128, 0.1)" : "rgba(156, 163, 175, 0.1)",
      buildingHover: isDark ? "#374151" : "#d1d5db",
      // Border colors
      border: isDark ? "#1f2937" : "#ffffff"
    };
  }, [theme]);
  const renderOSMBuildings = () => {
    if (!showOSMBuildings || osmFeatures.length === 0) return null;
    return osmFeatures.map((feature, index) => {
      const polygons = extractOSMGeometry(feature);
      return polygons.map((polygon, polygonIndex) => {
        const key = `building-${index}-${polygonIndex}`;
        return /* @__PURE__ */ jsx3(
          Polygon2,
          {
            positions: polygon,
            pathOptions: {
              color: colors.buildingLine,
              fillColor: colors.buildingFill,
              fillOpacity: 0.1,
              weight: 1,
              opacity: 0.6
            },
            eventHandlers: {
              click: () => onBuildingClick?.(feature),
              mouseover: (e2) => {
                e2.target.setStyle({
                  fillColor: colors.buildingHover,
                  fillOpacity: 0.3
                });
              },
              mouseout: (e2) => {
                e2.target.setStyle({
                  fillColor: colors.buildingFill,
                  fillOpacity: 0.1
                });
              }
            },
            children: feature.properties.name && /* @__PURE__ */ jsx3(Popup, { children: /* @__PURE__ */ jsxs3("div", { children: [
              /* @__PURE__ */ jsx3(Typography2, { variant: "subtitle", className: "font-semibold", children: feature.properties.name }),
              feature.properties.building && /* @__PURE__ */ jsxs3(Typography2, { variant: "caption", className: "text-gray-600", children: [
                t("geo-drawing.building-type"),
                ": ",
                feature.properties.building
              ] }),
              feature.properties["addr:street"] && /* @__PURE__ */ jsxs3(Typography2, { variant: "caption", className: "text-gray-600", children: [
                feature.properties["addr:street"],
                " ",
                feature.properties["addr:housenumber"]
              ] })
            ] }) })
          },
          key
        );
      });
    });
  };
  const renderMeasurements = () => {
    if (!showMeasurements || measurements.length === 0) return null;
    return measurements.map((measurement) => {
      const latlngs = measurement.points.map((p) => p.latlng);
      const key = `measurement-${measurement.timestamp}`;
      return /* @__PURE__ */ jsxs3(React3.Fragment, { children: [
        measurement.points.map((point, index) => /* @__PURE__ */ jsx3(
          CircleMarker2,
          {
            center: point.latlng,
            radius: 5,
            pathOptions: {
              color: colors.border,
              fillColor: colors.measurementPoint,
              fillOpacity: 1,
              weight: 2
            },
            eventHandlers: {
              click: () => onMeasurementClick?.(measurement)
            },
            children: /* @__PURE__ */ jsx3(Popup, { children: /* @__PURE__ */ jsxs3("div", { children: [
              /* @__PURE__ */ jsx3(Typography2, { variant: "subtitle", className: "font-semibold", children: t("geo-drawing.point-info", { index: index + 1 }) }),
              /* @__PURE__ */ jsxs3(Typography2, { variant: "caption", children: [
                point.latlng.lat.toFixed(6),
                ", ",
                point.latlng.lng.toFixed(6)
              ] })
            ] }) })
          },
          `${key}-point-${index}`
        )),
        (measurement.type === "distance" || measurement.type === "area") && latlngs.length >= 2 && /* @__PURE__ */ jsx3(
          Polyline2,
          {
            positions: latlngs,
            pathOptions: {
              color: colors.measurementLine,
              weight: 3,
              opacity: 0.8
            },
            eventHandlers: {
              click: () => onMeasurementClick?.(measurement)
            },
            children: /* @__PURE__ */ jsx3(Popup, { children: /* @__PURE__ */ jsxs3("div", { children: [
              /* @__PURE__ */ jsx3(Typography2, { variant: "subtitle", className: "font-semibold", children: t(`geo-drawing.modes.${measurement.type}`) }),
              /* @__PURE__ */ jsx3(Typography2, { variant: "body", children: measurement.displayValue }),
              /* @__PURE__ */ jsx3(Typography2, { variant: "caption", className: "text-gray-600", children: new Date(measurement.timestamp).toLocaleString() })
            ] }) })
          }
        ),
        measurement.type === "area" && latlngs.length >= 3 && /* @__PURE__ */ jsx3(
          Polygon2,
          {
            positions: latlngs,
            pathOptions: {
              color: colors.measurementLine,
              fillColor: colors.measurementFill,
              fillOpacity: 0.3,
              weight: 2
            },
            eventHandlers: {
              click: () => onMeasurementClick?.(measurement)
            },
            children: /* @__PURE__ */ jsx3(Popup, { children: /* @__PURE__ */ jsxs3("div", { children: [
              /* @__PURE__ */ jsx3(Typography2, { variant: "subtitle", className: "font-semibold", children: t("geo-drawing.area-measurement") }),
              /* @__PURE__ */ jsx3(Typography2, { variant: "body", children: measurement.area && formatAreaWithLabels(measurement.area) }),
              /* @__PURE__ */ jsx3(Typography2, { variant: "caption", className: "text-gray-600", children: t("geo-drawing.points-count", { count: measurement.points.length }) })
            ] }) })
          }
        )
      ] }, key);
    });
  };
  return /* @__PURE__ */ jsxs3(Fragment3, { children: [
    renderOSMBuildings(),
    renderMeasurements()
  ] });
};

// src/index.ts
var GEO_DRAWING_CONSTANTS = {
  DEFAULT_SNAP_TOLERANCE: 15,
  MIN_SNAP_ZOOM: 16,
  DEBOUNCE_MS: 500,
  REQUEST_TIMEOUT: 3e4
};
export {
  GEO_DRAWING_CONSTANTS,
  GeometryRenderer,
  MeasurementCanvas,
  MeasurementControls,
  arePointsEqual,
  calculateBearing,
  calculateBounds,
  calculateDistance,
  calculatePerimeter,
  calculatePointDistance,
  calculatePolygonCenter,
  calculateProjectedArea,
  clearOSMCache,
  closestPointOnSegment,
  extractOSMGeometry,
  fetchBuildingOutlines,
  formatArea,
  formatBearing,
  formatCoordinatesBySystem,
  formatDistance,
  geoJsonToLatLng,
  getCacheSize,
  isBoundsCached,
  isPointInPolygon,
  latLngToGeoJson,
  prefetchBuildingOutlines,
  simplifyPolygon,
  useGeometrySnap,
  useMeasurement,
  useMeasurementFormatter
};
//# sourceMappingURL=index.mjs.map