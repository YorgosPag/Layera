"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// ../geo-mapping/src/services/fallbackBoundaries.ts
var fallbackBoundaries_exports = {};
__export(fallbackBoundaries_exports, {
  addFallbackBoundary: () => addFallbackBoundary,
  clearFallbackBoundaries: () => clearFallbackBoundaries,
  findFallbackBoundary: () => findFallbackBoundary,
  getAllFallbackBoundaries: () => getAllFallbackBoundaries
});
var FALLBACK_BOUNDARIES, findFallbackBoundary, addFallbackBoundary, getAllFallbackBoundaries, clearFallbackBoundaries;
var init_fallbackBoundaries = __esm({
  "../geo-mapping/src/services/fallbackBoundaries.ts"() {
    "use strict";
    FALLBACK_BOUNDARIES = [
      // Θεσσαλονίκη - Κέντρο
      {
        keys: ["\u0398\u03B5\u03C3\u03C3\u03B1\u03BB\u03BF\u03BD\u03AF\u03BA\u03B7\u03C2", "Thessaloniki", "\u0398\u03B5\u03C3\u03C3\u03B1\u03BB\u03BF\u03BD\u03AF\u03BA\u03B7"],
        name: "\u0394\u03AE\u03BC\u03BF\u03C2 \u0398\u03B5\u03C3\u03C3\u03B1\u03BB\u03BF\u03BD\u03AF\u03BA\u03B7\u03C2",
        adminLevel: "8",
        coordinates: [
          // Simplified boundary για demo - στην πράξη θα χρειάζεται πλήρες polygon
          [22.9352, 40.6401],
          [22.96, 40.6401],
          [22.96, 40.625],
          [22.9352, 40.625],
          [22.9352, 40.6401]
        ]
      },
      // Μακεδονία regions
      {
        keys: ["\u039A\u03B5\u03BD\u03C4\u03C1\u03B9\u03BA\u03AE\u03C2 \u039C\u03B1\u03BA\u03B5\u03B4\u03BF\u03BD\u03AF\u03B1\u03C2", "Central Macedonia", "\u039A\u03B5\u03BD\u03C4\u03C1\u03B9\u03BA\u03AE \u039C\u03B1\u03BA\u03B5\u03B4\u03BF\u03BD\u03AF\u03B1"],
        name: "\u03A0\u03B5\u03C1\u03B9\u03C6\u03AD\u03C1\u03B5\u03B9\u03B1 \u039A\u03B5\u03BD\u03C4\u03C1\u03B9\u03BA\u03AE\u03C2 \u039C\u03B1\u03BA\u03B5\u03B4\u03BF\u03BD\u03AF\u03B1\u03C2",
        adminLevel: "4",
        coordinates: [
          // Simplified boundary για demo
          [22, 41.5],
          [24.5, 41.5],
          [24.5, 40],
          [22, 40],
          [22, 41.5]
        ]
      },
      // Αμπελόκηποι (existing)
      {
        keys: ["\u0391\u03BC\u03C0\u03B5\u03BB\u03BF\u03BA\u03AE\u03C0\u03C9\u03BD", "Ampelokipon", "\u0410\u043C\u043F\u0435\u043B\u043E\u043A\u0438\u043F\u043E\u043D", "\u0391\u03BC\u03C0\u03B5\u03BB\u03CC\u03BA\u03B7\u03C0\u03BF\u03B9"],
        name: "\u0394\u03B7\u03BC\u03BF\u03C4\u03B9\u03BA\u03AE \u0395\u03BD\u03CC\u03C4\u03B7\u03C4\u03B1 \u0391\u03BC\u03C0\u03B5\u03BB\u03BF\u03BA\u03AE\u03C0\u03C9\u03BD",
        adminLevel: "8",
        coordinates: [
          [22.9166013, 40.6545235],
          [22.916378, 40.6548432],
          [22.9161263, 40.654913],
          [22.9159367, 40.6551479],
          [22.9157414, 40.6553883],
          [22.9155318, 40.655694],
          [22.9155987, 40.6558613],
          [22.9154793, 40.6562918],
          [22.915702, 40.6565594],
          [22.9150123, 40.6571562],
          [22.914356, 40.6575815],
          [22.9141897, 40.6577716],
          [22.913965, 40.6580476],
          [22.9137682, 40.6584715],
          [22.9130735, 40.6595013],
          [22.9146819, 40.6606645],
          [22.9195995, 40.6611276],
          [22.922064, 40.6603006],
          [22.9243559, 40.6589395],
          [22.928998, 40.6570252],
          [22.9316767, 40.6565356],
          [22.934234, 40.6567998],
          [22.9345673, 40.6568327],
          [22.9344419, 40.6563954],
          [22.9345299, 40.6555972],
          [22.9346904, 40.654914],
          [22.9352047, 40.6527174],
          [22.9342228, 40.6523744],
          [22.9341515, 40.651373],
          [22.9341167, 40.6510887],
          [22.9340592, 40.6505896],
          [22.9339901, 40.6498829],
          [22.9340715, 40.6493217],
          [22.9339464, 40.6484215],
          [22.9326998, 40.6484637],
          [22.931444, 40.6490899],
          [22.9313272, 40.6491772],
          [22.9303401, 40.6495824],
          [22.929558, 40.6496515],
          [22.9280302, 40.6497943],
          [22.9267611, 40.6494903],
          [22.9256199, 40.6492281],
          [22.9243866, 40.6489393],
          [22.9239727, 40.6488403],
          [22.9195478, 40.6508989],
          [22.919069, 40.6511528],
          [22.9186956, 40.651313],
          [22.9184825, 40.6514636],
          [22.9183194, 40.6516322],
          [22.9181684, 40.6518332],
          [22.9180779, 40.6520084],
          [22.9180263, 40.6522166],
          [22.9179568, 40.6523848],
          [22.9178432, 40.6525894],
          [22.9171589, 40.6536558],
          [22.9166013, 40.6545235]
        ]
      }
    ];
    findFallbackBoundary = (searchTerms) => {
      const normalizedSearchTerms = searchTerms.filter((term) => term && typeof term === "string").map((term) => term.toLowerCase().trim());
      for (const boundary of FALLBACK_BOUNDARIES) {
        const matches = boundary.keys.some((key) => {
          const normalizedKey = key.toLowerCase();
          return normalizedSearchTerms.some(
            (searchTerm) => searchTerm.includes(normalizedKey) || normalizedKey.includes(searchTerm)
          );
        });
        if (matches) {
          console.log(`\u2705 Fallback boundary found \u03B3\u03B9\u03B1: ${boundary.name}`);
          return {
            type: "FeatureCollection",
            features: [{
              type: "Feature",
              properties: {
                name: boundary.name,
                admin_level: boundary.adminLevel,
                boundary: "administrative"
              },
              geometry: {
                type: "Polygon",
                coordinates: [boundary.coordinates]
              }
            }]
          };
        }
      }
      return null;
    };
    addFallbackBoundary = (boundary) => {
      const exists = FALLBACK_BOUNDARIES.some(
        (b) => b.keys.some((key) => boundary.keys.includes(key))
      );
      if (!exists) {
        FALLBACK_BOUNDARIES.push(boundary);
        console.log(`\u{1F4CD} Added fallback boundary: ${boundary.name}`);
      }
    };
    getAllFallbackBoundaries = () => {
      return FALLBACK_BOUNDARIES;
    };
    clearFallbackBoundaries = () => {
      FALLBACK_BOUNDARIES.length = 0;
    };
  }
});

// src/index.ts
var index_exports = {};
__export(index_exports, {
  AddressBreakdownCard: () => AddressBreakdownCard,
  parseDisplayNameToAdditionalComponents: () => parseDisplayNameToAdditionalComponents,
  parseFullAddress: () => parseFullAddress,
  parseGeocodeToComponents: () => parseGeocodeToComponents
});
module.exports = __toCommonJS(index_exports);

// src/components/AddressBreakdownCard.tsx
var import_react5 = require("react");
var import_cards = require("@layera/cards");
var import_buttons = require("@layera/buttons");
var import_icons = require("@layera/icons");

// ../loading/dist/index.js
var import_react = __toESM(require("react"), 1);
var Spinner = ({ size = "md", variant = "default", color, speed = "normal", className = "" }) => {
  const spinnerClasses = [
    "layera-spinner",
    `layera-spinner--${size}`,
    `layera-spinner--${variant}`,
    `layera-spinner--speed-${speed}`,
    className
  ].filter(Boolean).join(" ");
  const spinnerStyle = color ? { color } : void 0;
  const renderSpinner = () => {
    switch (variant) {
      case "dots":
        return import_react.default.createElement(
          "div",
          { className: spinnerClasses, style: spinnerStyle },
          import_react.default.createElement("div", { className: "layera-spinner__dot" }),
          import_react.default.createElement("div", { className: "layera-spinner__dot" }),
          import_react.default.createElement("div", { className: "layera-spinner__dot" })
        );
      case "pulse":
        return import_react.default.createElement(
          "div",
          { className: spinnerClasses, style: spinnerStyle },
          import_react.default.createElement("div", { className: "layera-spinner__pulse" })
        );
      case "ring":
        return import_react.default.createElement(
          "div",
          { className: spinnerClasses, style: spinnerStyle },
          import_react.default.createElement(
            "div",
            { className: "layera-spinner__ring" },
            import_react.default.createElement("div", null),
            import_react.default.createElement("div", null),
            import_react.default.createElement("div", null),
            import_react.default.createElement("div", null)
          )
        );
      case "bars":
        return import_react.default.createElement(
          "div",
          { className: spinnerClasses, style: spinnerStyle },
          import_react.default.createElement(
            "div",
            { className: "layera-spinner__bars" },
            import_react.default.createElement("div", null),
            import_react.default.createElement("div", null),
            import_react.default.createElement("div", null),
            import_react.default.createElement("div", null),
            import_react.default.createElement("div", null)
          )
        );
      default:
        return import_react.default.createElement(
          "div",
          { className: spinnerClasses, style: spinnerStyle },
          import_react.default.createElement(
            "svg",
            { className: "layera-spinner__circle", viewBox: "0 0 50 50", fill: "none" },
            import_react.default.createElement("circle", { className: "layera-spinner__track", cx: "25", cy: "25", r: "20", fill: "none", stroke: "currentColor", strokeWidth: "4", opacity: "0.2" }),
            import_react.default.createElement("circle", { className: "layera-spinner__progress", cx: "25", cy: "25", r: "20", fill: "none", stroke: "currentColor", strokeWidth: "4", strokeLinecap: "round", strokeDasharray: "31.416", strokeDashoffset: "31.416" })
          )
        );
    }
  };
  return renderSpinner();
};

// ../tolgee/dist/index.mjs
var import_react2 = __toESM(require("react"), 1);
var import_jsx_runtime = require("react/jsx-runtime");
var import_react3 = require("react");
var import_jsx_runtime2 = require("react/jsx-runtime");
var import_react4 = require("react");
var MinimalTolgeeContext = (0, import_react2.createContext)(null);
var useMinimalTolgee = () => {
  const context = (0, import_react2.useContext)(MinimalTolgeeContext);
  if (!context) {
    throw new Error("useMinimalTolgee must be used within MinimalTolgeeProvider");
  }
  return context;
};
var TOLGEE_CONFIG = {
  // API Configuration
  apiUrl: typeof process !== "undefined" && process.env?.TOLGEE_API_URL || "https://app.tolgee.io",
  apiKey: typeof process !== "undefined" && process.env?.TOLGEE_API_KEY || "",
  // Project Settings
  projectId: typeof process !== "undefined" && process.env?.TOLGEE_PROJECT_ID || "",
  // Language Settings
  defaultLanguage: "el",
  // Greek as default
  fallbackLanguage: "en",
  supportedLanguages: ["el", "en"],
  // Development Settings
  isDevelopment: typeof process !== "undefined" && process.env?.NODE_ENV === "development",
  inContextEditing: typeof process !== "undefined" && process.env?.NODE_ENV === "development",
  // Cache Settings
  cacheEnabled: true,
  cacheExpirationMs: 24 * 60 * 60 * 1e3,
  // 24 hours
  // Features
  features: {
    autoTranslate: true,
    machineTranslation: true,
    inContextEditing: true,
    screenshots: true,
    comments: true
  }
};
function useLayeraTranslation() {
  const { t, language, changeLanguage } = useMinimalTolgee();
  return {
    t,
    i18n: {
      language,
      changeLanguage,
      languages: {
        el: "\u0395\u03BB\u03BB\u03B7\u03BD\u03B9\u03BA\u03AC",
        en: "English"
      }
    }
  };
}

// ../geo-mapping/src/services/osmService.ts
var fetchBoundaryByAddressComponent = async (addressComponent) => {
  try {
    console.log(`\u{1F30D} Fetching boundary \u03B3\u03B9\u03B1: ${addressComponent.label}`);
    const searchUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(addressComponent.label)}&format=json&limit=1&polygon_geojson=1`;
    const searchResponse = await fetch(searchUrl, {
      headers: {
        "User-Agent": "Layera-GeoAlert/1.0"
      }
    });
    if (!searchResponse.ok) {
      throw new Error(`Nominatim error: ${searchResponse.status}`);
    }
    const searchData = await searchResponse.json();
    if (searchData && searchData.length > 0) {
      const result = searchData[0];
      if (result.geojson) {
        console.log(`\u2705 Found FULL POLYGON \u03B3\u03B9\u03B1 ${addressComponent.label} \u03BC\u03B5 ${result.geojson.coordinates?.[0]?.length || 0} \u03C3\u03B7\u03BC\u03B5\u03AF\u03B1`);
        return {
          type: "FeatureCollection",
          features: [{
            type: "Feature",
            properties: {
              name: result.display_name || addressComponent.label,
              admin_level: "8",
              boundary: "administrative",
              osm_id: result.osm_id || 0,
              osm_type: result.osm_type || "node"
            },
            geometry: result.geojson
          }]
        };
      } else if (result.boundingbox) {
        const bbox = result.boundingbox;
        const south = parseFloat(bbox[0]);
        const north = parseFloat(bbox[1]);
        const west = parseFloat(bbox[2]);
        const east = parseFloat(bbox[3]);
        console.log(`\u26A0\uFE0F Using bounding box \u03B3\u03B9\u03B1 ${addressComponent.label} (no polygon available)`);
        return {
          type: "FeatureCollection",
          features: [{
            type: "Feature",
            properties: {
              name: result.display_name || addressComponent.label,
              admin_level: "8",
              boundary: "administrative",
              osm_id: result.osm_id || 0,
              osm_type: result.osm_type || "node"
            },
            geometry: {
              type: "Polygon",
              coordinates: [[
                [west, north],
                [east, north],
                [east, south],
                [west, south],
                [west, north]
              ]]
            }
          }]
        };
      }
    }
    const query = `
      [out:json][timeout:10];
      (
        relation["boundary"="administrative"]["name"~"${addressComponent.label}",i];
      );
      out ids;
    `;
    const response = await fetch("https://overpass-api.de/api/interpreter", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `data=${encodeURIComponent(query)}`
    });
    if (!response.ok) {
      throw new Error(`Overpass API error: ${response.status}`);
    }
    const data = await response.json();
    if (data.elements && data.elements.length > 0) {
      console.log(`\u2705 OSM boundary IDs found \u03B3\u03B9\u03B1: ${addressComponent.label} (${data.elements.length} elements)`);
      return {
        type: "FeatureCollection",
        features: []
      };
    }
    console.log(`\u26A0\uFE0F No OSM boundary found \u03B3\u03B9\u03B1: ${addressComponent.label}`);
    return {
      type: "FeatureCollection",
      features: []
    };
  } catch (error) {
    console.error(`\u{1F6AB} OSM API error \u03B3\u03B9\u03B1 ${addressComponent.label}:`, error);
    console.log(`\u26A0\uFE0F Fallback to local boundary system \u03B3\u03B9\u03B1: ${addressComponent.label}`);
    return await fetchLocalBoundary(addressComponent);
  }
};
async function fetchLocalBoundary(addressComponent) {
  const baseName = addressComponent.label.replace(/^Δήμος\s+/, "").replace(/^Δημοτική\s+Ενότητα\s+/, "").replace(/^Περιφέρεια\s+/, "").replace(/^Περιφερειακή\s+Ενότητα\s+/, "").replace(/\s+-\s+.*$/, "").replace(/\s+\(.+\)$/, "").trim();
  console.log("\u26A0\uFE0F Fallback to local boundary system \u03B3\u03B9\u03B1:", baseName);
  try {
    const { findFallbackBoundary: findFallbackBoundary2 } = await Promise.resolve().then(() => (init_fallbackBoundaries(), fallbackBoundaries_exports));
    const searchTerms = [addressComponent.label, baseName];
    const fallbackBoundary = findFallbackBoundary2(searchTerms);
    if (fallbackBoundary) {
      console.log("\u2705 Local fallback boundary found");
      return fallbackBoundary;
    }
  } catch (fallbackError) {
    console.warn("\u26A0\uFE0F Fallback system not available:", fallbackError);
  }
  console.error("\u{1F6AB} No boundary data available \u03B3\u03B9\u03B1:", addressComponent.label);
  return {
    type: "FeatureCollection",
    features: []
  };
}

// src/utils/addressParser.ts
function parseGeocodeToComponents(result) {
  const components = [];
  let index = 0;
  if (result.address.street && result.address.houseNumber) {
    components.push({
      id: `street-${index++}`,
      label: `${result.address.street} ${result.address.houseNumber}`,
      type: "street",
      clickable: false,
      // Streets δεν έχουν boundaries
      value: `${result.address.street} ${result.address.houseNumber}`,
      className: "address-street"
    });
  } else if (result.address.street) {
    components.push({
      id: `street-${index++}`,
      label: result.address.street,
      type: "street",
      clickable: false,
      value: result.address.street,
      className: "address-street"
    });
  }
  if (result.address.postalCode) {
    components.push({
      id: `postal-${index++}`,
      label: result.address.postalCode,
      type: "postalCode",
      clickable: false,
      // Postal codes δεν έχουν boundaries
      value: result.address.postalCode,
      className: "address-postal"
    });
  }
  if (result.address.city) {
    components.push({
      id: `city-${index++}`,
      label: result.address.city,
      type: "city",
      clickable: true,
      // Cities έχουν administrative boundaries
      value: result.address.city,
      className: "address-city"
    });
  }
  if (result.address.region) {
    components.push({
      id: `region-${index++}`,
      label: result.address.region,
      type: "region",
      clickable: true,
      // Regions έχουν administrative boundaries
      value: result.address.region,
      className: "address-region"
    });
  }
  if (result.address.country) {
    components.push({
      id: `country-${index++}`,
      label: result.address.country,
      type: "country",
      clickable: true,
      // Countries έχουν boundaries
      value: result.address.country,
      className: "address-country"
    });
  }
  return components;
}
function parseDisplayNameToAdditionalComponents(result, existingComponents) {
  const displayName = result.displayName;
  const additionalComponents = [];
  const existingValues = new Set(existingComponents.map((c) => c.value?.toLowerCase()));
  const parts = displayName.split(",").map((part) => part.trim());
  let index = existingComponents.length;
  for (const part of parts) {
    if (existingValues.has(part.toLowerCase())) {
      continue;
    }
    if (/^\d+$/.test(part)) {
      continue;
    }
    if (/^\d{5}$/.test(part)) {
      continue;
    }
    const isNotClickable = /^\d+$/.test(part) || // Μόνο αριθμοί
    /^\d{3,5}(-\d{4})?$/.test(part) || // Postal codes
    part.length <= 2;
    additionalComponents.push({
      id: `additional-${index++}`,
      label: part,
      type: "custom",
      clickable: !isNotClickable,
      // Όλα clickable εκτός από τις εξαιρέσεις
      value: part,
      className: "address-component"
    });
  }
  return additionalComponents;
}
function parseFullAddress(result) {
  const baseComponents = parseGeocodeToComponents(result);
  const additionalComponents = parseDisplayNameToAdditionalComponents(result, baseComponents);
  const allComponents = [...baseComponents, ...additionalComponents];
  return allComponents.sort((a, b) => {
    if (a.clickable && !b.clickable) return -1;
    if (!a.clickable && b.clickable) return 1;
    const typePriority = {
      "street": 1,
      "houseNumber": 2,
      "postalCode": 3,
      "city": 4,
      "region": 5,
      "custom": 6,
      "country": 7
    };
    return (typePriority[a.type] || 999) - (typePriority[b.type] || 999);
  });
}

// src/components/AddressBreakdownCard.tsx
var import_jsx_runtime3 = require("react/jsx-runtime");
function AddressBreakdownCard({
  geocodeResult,
  config = {},
  title,
  onClick,
  style,
  isLoading = false,
  error = null
}) {
  const { t } = useLayeraTranslation();
  const [boundaryLoading, setBoundaryLoading] = (0, import_react5.useState)(null);
  const [boundaryError, setBoundaryError] = (0, import_react5.useState)(null);
  const [loadingTimer, setLoadingTimer] = (0, import_react5.useState)(0);
  (0, import_react5.useEffect)(() => {
    let interval;
    if (boundaryLoading) {
      setLoadingTimer(0);
      interval = setInterval(() => {
        setLoadingTimer((prev) => prev + 1);
      }, 1e3);
    } else {
      setLoadingTimer(0);
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [boundaryLoading]);
  const finalConfig = {
    layout: "list",
    enableBoundarySearch: true,
    maxComponents: 10,
    ...config
  };
  const components = parseFullAddress(geocodeResult);
  const visibleComponents = finalConfig.maxComponents ? components.slice(0, finalConfig.maxComponents) : components;
  const handleComponentClick = (0, import_react5.useCallback)(async (component) => {
    if (!component.clickable || !finalConfig.enableBoundarySearch) {
      return;
    }
    if (finalConfig.onComponentClick) {
      finalConfig.onComponentClick(component);
    }
    console.log(`\u{1F504} Starting boundary search for: ${component.label}, ID: ${component.id}`);
    setBoundaryLoading(component.id);
    setBoundaryError(null);
    try {
      console.log(`\u{1F50D} Fetching boundary for: ${component.label}`);
      const boundaryData = await fetchBoundaryByAddressComponent({
        label: component.label,
        type: component.type
      });
      if (boundaryData && boundaryData.features && boundaryData.features.length > 0) {
        console.log(`\u2705 Found boundary with ${boundaryData.features.length} features`);
        const event = new CustomEvent("showAdministrativeBoundary", {
          detail: {
            type: "showBoundary",
            component,
            geocodeResult,
            boundary: boundaryData
          }
        });
        window.dispatchEvent(event);
        console.log(`\u{1F3AF} Boundary search completed for: ${component.label}`);
      } else {
        console.warn(`\u26A0\uFE0F No boundary data found for: ${component.label}`);
        setBoundaryError(`\u0394\u03B5\u03BD \u03B2\u03C1\u03AD\u03B8\u03B7\u03BA\u03B1\u03BD \u03CC\u03C1\u03B9\u03B1 \u03B3\u03B9\u03B1 ${component.label}`);
      }
    } catch (error2) {
      setBoundaryError(`Failed to search boundary for ${component.label}`);
      console.error("Boundary search error:", error2);
    } finally {
      console.log(`\u{1F3C1} Boundary search completed for: ${component.label}, clearing loading state`);
      setBoundaryLoading(null);
    }
  }, [finalConfig, geocodeResult, t]);
  const renderComponent = (component) => {
    const isLoading2 = boundaryLoading === component.id;
    const isClickable = component.clickable && finalConfig.enableBoundarySearch;
    const componentProps = {
      className: `address-component ${component.className || ""} ${isClickable ? "clickable" : ""}`,
      onClick: isClickable ? () => handleComponentClick(component) : void 0,
      disabled: isLoading2 || !!boundaryLoading,
      style: {
        cursor: isClickable ? "pointer" : "default",
        opacity: isLoading2 ? 0.6 : 1
      }
    };
    if (finalConfig.layout === "tags") {
      return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
        import_buttons.Button,
        {
          ...componentProps,
          variant: isClickable ? "outline" : "ghost",
          size: "sm",
          startIcon: isClickable ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_icons.MapIcon, {}) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_icons.LocationIcon, {}),
          loading: isLoading2,
          children: [
            component.label,
            isLoading2 && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { style: {
              marginLeft: "0.5rem",
              fontSize: "0.75rem",
              color: "#6B7280"
            }, children: [
              "(",
              loadingTimer,
              "s)"
            ] })
          ]
        },
        component.id
      );
    }
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
      "div",
      {
        ...componentProps,
        className: `list-item ${componentProps.className}`,
        style: {
          ...componentProps.style,
          padding: "0.75rem",
          borderRadius: "0.375rem",
          marginBottom: "0.5rem",
          border: "1px solid #E5E7EB",
          transition: "all 0.2s ease-in-out",
          backgroundColor: isClickable ? "#FFFFFF" : "#F9FAFB",
          ...isClickable && {
            ":hover": {
              backgroundColor: "#F3F4F6",
              borderColor: "#D1D5DB",
              transform: "translateY(-1px)",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)"
            }
          }
        },
        onMouseEnter: (e) => {
          if (isClickable && !isLoading2) {
            e.currentTarget.style.backgroundColor = "#F3F4F6";
            e.currentTarget.style.borderColor = "#D1D5DB";
            e.currentTarget.style.transform = "translateY(-1px)";
            e.currentTarget.style.boxShadow = "0 2px 4px rgba(0, 0, 0, 0.1)";
          }
        },
        onMouseLeave: (e) => {
          if (isClickable && !isLoading2) {
            e.currentTarget.style.backgroundColor = "#FFFFFF";
            e.currentTarget.style.borderColor = "#E5E7EB";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "none";
          }
        },
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "list-item-content", style: {
            display: "flex",
            alignItems: "center",
            gap: "0.5rem"
          }, children: [
            isLoading2 ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Spinner, { size: "sm", variant: "default" }) : isClickable ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_icons.MapIcon, { className: "list-icon", style: {
              width: "1rem",
              height: "1rem",
              color: "#3B82F6"
            } }) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_icons.LocationIcon, { className: "list-icon", style: {
              width: "1rem",
              height: "1rem",
              color: "#6B7280"
            } }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "list-label", style: {
              flex: 1,
              fontSize: "0.875rem",
              color: isClickable ? "#1F2937" : "#6B7280",
              fontWeight: isClickable ? "500" : "400"
            }, children: component.label })
          ] }),
          isLoading2 && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "loading-indicator", style: {
            marginTop: "0.25rem",
            fontSize: "0.75rem",
            color: "#6B7280",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem"
          }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: "\u0391\u03BD\u03B1\u03B6\u03AE\u03C4\u03B7\u03C3\u03B7 \u03C0\u03B5\u03C1\u03B9\u03B3\u03C1\u03AC\u03BC\u03BC\u03B1\u03C4\u03BF\u03C2..." }),
            /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { style: {
              fontWeight: "500",
              color: "#3B82F6",
              minWidth: "2rem"
            }, children: [
              loadingTimer,
              "s"
            ] })
          ] })
        ]
      },
      component.id
    );
  };
  const cardActions = /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
    import_buttons.Button,
    {
      variant: "ghost",
      size: "sm",
      onClick: () => {
        const event = new CustomEvent("showSearchResult", {
          detail: {
            latitude: geocodeResult.coordinates.latitude,
            longitude: geocodeResult.coordinates.longitude,
            zoom: 16,
            displayName: geocodeResult.displayName
          }
        });
        window.dispatchEvent(event);
      },
      children: t("showOnMap")
    }
  );
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
    import_cards.BaseCard,
    {
      title: title || t("addressDetails"),
      actions: cardActions,
      className: `address-breakdown-card ${finalConfig.className || ""}`,
      onClick,
      style,
      children: [
        error && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "error-message", children: error }),
        boundaryError && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "boundary-error", children: boundaryError }),
        !isLoading && visibleComponents.some((c) => c.clickable) && finalConfig.enableBoundarySearch && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { style: {
          fontSize: "0.875rem",
          color: "#6B7280",
          marginBottom: "0.75rem",
          fontStyle: "italic"
        }, children: t("clickToShowBoundary") }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: `address-components layout-${finalConfig.layout}`, children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "loading-state", children: "Loading..." }) : visibleComponents.map(renderComponent) }),
        components.length > visibleComponents.length && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "components-overflow", children: [
          "+",
          components.length - visibleComponents.length,
          " more components"
        ] })
      ]
    }
  );
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AddressBreakdownCard,
  parseDisplayNameToAdditionalComponents,
  parseFullAddress,
  parseGeocodeToComponents
});
//# sourceMappingURL=index.cjs.map