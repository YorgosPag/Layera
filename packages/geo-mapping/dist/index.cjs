'use strict';

var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/services/fallbackBoundaries.ts
var fallbackBoundaries_exports = {};
__export(fallbackBoundaries_exports, {
  addFallbackBoundary: () => addFallbackBoundary,
  clearFallbackBoundaries: () => clearFallbackBoundaries,
  findFallbackBoundary: () => findFallbackBoundary,
  getAllFallbackBoundaries: () => getAllFallbackBoundaries
});
var FALLBACK_BOUNDARIES, findFallbackBoundary, addFallbackBoundary, getAllFallbackBoundaries, clearFallbackBoundaries;
var init_fallbackBoundaries = __esm({
  "src/services/fallbackBoundaries.ts"() {
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

// src/services/osmService.ts
var fetchBoundaryByAddressComponent = async (addressComponent) => {
  try {
    console.log(`\u{1F30D} Direct OSM Overpass API \u03B3\u03B9\u03B1: ${addressComponent.label}`);
    if (addressComponent.label.toLowerCase() === "rome") {
      console.log(`\u2705 Returning placeholder boundary \u03B3\u03B9\u03B1 Rome`);
      const romeBounds = {
        north: 42.0505,
        south: 41.7555,
        east: 12.6569,
        west: 12.3545
      };
      return {
        type: "FeatureCollection",
        features: [{
          type: "Feature",
          properties: {
            name: "Rome",
            admin_level: "8",
            boundary: "administrative",
            osm_id: 41485,
            osm_type: "relation"
          },
          geometry: {
            type: "Polygon",
            coordinates: [[
              [romeBounds.west, romeBounds.north],
              [romeBounds.east, romeBounds.north],
              [romeBounds.east, romeBounds.south],
              [romeBounds.west, romeBounds.south],
              [romeBounds.west, romeBounds.north]
            ]]
          }
        }]
      };
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
        features: [{
          type: "Feature",
          properties: {
            name: addressComponent.label,
            admin_level: "8",
            boundary: "administrative",
            osm_id: data.elements[0].id,
            osm_type: "relation"
          },
          geometry: {
            type: "Polygon",
            coordinates: [[
              [-0.1, -0.1],
              [0.1, -0.1],
              [0.1, 0.1],
              [-0.1, 0.1],
              [-0.1, -0.1]
            ]]
          }
        }]
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
var fetchBuildingOutlines = async () => ({ type: "FeatureCollection", features: [] });
var fetchAdministrativeBoundary = async () => ({ type: "FeatureCollection", features: [] });
var clearOSMCache = async () => {
};
var getCacheSize = () => 0;
var isBoundsCached = () => false;
var prefetchBuildingOutlines = async () => {
};

// src/index.ts
var GEO_MAPPING_VERSION = "1.0.0";
var GEO_MAPPING_NAME = "@layera/geo-mapping";

exports.GEO_MAPPING_NAME = GEO_MAPPING_NAME;
exports.GEO_MAPPING_VERSION = GEO_MAPPING_VERSION;
exports.clearOSMCache = clearOSMCache;
exports.fetchAdministrativeBoundary = fetchAdministrativeBoundary;
exports.fetchBoundaryByAddressComponent = fetchBoundaryByAddressComponent;
exports.fetchBuildingOutlines = fetchBuildingOutlines;
exports.getCacheSize = getCacheSize;
exports.isBoundsCached = isBoundsCached;
exports.prefetchBuildingOutlines = prefetchBuildingOutlines;
//# sourceMappingURL=index.cjs.map
//# sourceMappingURL=index.cjs.map