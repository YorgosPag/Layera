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

// src/utils/administrativeHierarchy.ts
var GREEK_PATTERNS = {
  [1 /* STREET */]: [
    /^.*?\s*\d+/,
    // Οδός με αριθμό
    /οδός|λεωφόρος|πλατεία|αγίου|αγίας/i
  ],
  [2 /* COMMUNITY */]: [
    /κοινότητα|community/i
  ],
  [3 /* NEIGHBORHOOD */]: [
    /συνοικία|γειτονιά|περιοχή/i
  ],
  [4 /* VILLAGE */]: [
    /χωριό|κωμόπολη|οικισμός/i
  ],
  [5 /* MUNICIPAL_UNIT */]: [
    /δημοτική\s+ενότητα|municipal\s+unit/i
  ],
  [6 /* MUNICIPALITY */]: [
    /^δήμος\s+|municipality\s+of/i
  ],
  [7 /* METROPOLITAN */]: [
    /μητροπολιτική\s+ενότητα|metropolitan/i
  ],
  [8 /* PREFECTURE */]: [
    /νομός|νομαρχία|prefecture/i
  ],
  [9 /* REGION */]: [
    /περιφέρεια|region/i
  ],
  [10 /* DECENTRALIZED */]: [
    /αποκεντρωμένη\s+διοίκηση|decentralized/i
  ],
  [11 /* COUNTRY */]: [
    /ελλάδα|greece/i
  ]
};
function getAdministrativeLevel(text) {
  const cleanText = text.trim();
  for (const [level, patterns] of Object.entries(GREEK_PATTERNS)) {
    for (const pattern of patterns) {
      if (pattern.test(cleanText)) {
        return parseInt(level);
      }
    }
  }
  return 3 /* NEIGHBORHOOD */;
}
function removeDuplicates(items) {
  const cleaned = [];
  const seen = /* @__PURE__ */ new Set();
  for (const item of items) {
    const normalized = normalizeText(item);
    if (seen.has(normalized)) {
      continue;
    }
    const isDuplicate = Array.from(seen).some((existing) => {
      return areTextsSimilar(normalized, existing);
    });
    if (!isDuplicate) {
      seen.add(normalized);
      cleaned.push(item);
    }
  }
  return cleaned;
}
function normalizeText(text) {
  return text.toLowerCase().replace(/^(δήμος|δημοτική\s+ενότητα|περιφέρεια|νομός)\s+/i, "").replace(/\s*-\s*/g, "-").replace(/\s+/g, " ").trim();
}
function areTextsSimilar(text1, text2) {
  if (text1 === text2) return true;
  if (text1.includes(text2)) {
    const ratio = text2.length / text1.length;
    if (ratio < 0.6) return true;
  }
  if (text2.includes(text1)) {
    const ratio = text1.length / text2.length;
    if (ratio < 0.6) return true;
  }
  const similarity = calculateSimilarity(text1, text2);
  return similarity > 0.85;
}
function calculateSimilarity(str1, str2) {
  const longer = str1.length > str2.length ? str1 : str2;
  const shorter = str1.length > str2.length ? str2 : str1;
  if (longer.length === 0) return 1;
  const distance = levenshteinDistance(longer, shorter);
  return (longer.length - distance) / longer.length;
}
function levenshteinDistance(str1, str2) {
  const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null));
  for (let i = 0; i <= str1.length; i++) matrix[0][i] = i;
  for (let j = 0; j <= str2.length; j++) matrix[j][0] = j;
  for (let j = 1; j <= str2.length; j++) {
    for (let i = 1; i <= str1.length; i++) {
      const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
      matrix[j][i] = Math.min(
        matrix[j][i - 1] + 1,
        // deletion
        matrix[j - 1][i] + 1,
        // insertion
        matrix[j - 1][i - 1] + cost
        // substitution
      );
    }
  }
  return matrix[str2.length][str1.length];
}
function processDisplayNameToHierarchy(displayName) {
  console.log("\u{1F504} Processing display name for hierarchy:", displayName);
  const parts = displayName.split(",").map((part) => part.trim()).filter((part) => part.length > 0);
  console.log("\u{1F4DD} Initial parts:", parts);
  let streetWithNumberAndPostal = "";
  const nonStreetParts = [];
  let postalCode = "";
  const postalIndex = parts.findIndex((part) => /^\d{3,5}(-\d{4})?$/.test(part));
  if (postalIndex !== -1) {
    postalCode = parts[postalIndex];
  }
  const streetIndex = parts.findIndex((part) => /^.*?\s*\d+/.test(part));
  if (streetIndex !== -1) {
    streetWithNumberAndPostal = postalCode ? `${parts[streetIndex]}, ${postalCode}` : parts[streetIndex];
  }
  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    if (/^\d{3,5}(-\d{4})?$/.test(part)) continue;
    if (/^\d+$/.test(part)) continue;
    if (i === streetIndex) continue;
    nonStreetParts.push(part);
  }
  console.log("\u{1F6E3}\uFE0F Street with number and postal:", streetWithNumberAndPostal);
  console.log("\u{1F9F9} Non-street parts:", nonStreetParts);
  const uniqueNonStreetParts = removeDuplicates(nonStreetParts);
  console.log("\u2728 Unique non-street parts:", uniqueNonStreetParts);
  const hierarchicalParts = uniqueNonStreetParts.map((part) => ({
    text: part,
    level: getAdministrativeLevel(part)
  })).sort((a, b) => a.level - b.level).map((item) => item.text);
  console.log("\u{1F3DB}\uFE0F Hierarchically sorted non-street parts:", hierarchicalParts);
  const finalParts = [];
  if (streetWithNumberAndPostal) {
    finalParts.push(streetWithNumberAndPostal);
  }
  finalParts.push(...hierarchicalParts);
  const formattedHierarchy = finalParts.join("\n");
  console.log("\u{1F4CB} Final formatted hierarchy:", formattedHierarchy);
  return formattedHierarchy;
}
function getCountryFromDisplayName(displayName) {
  const lowerName = displayName.toLowerCase();
  if (lowerName.includes("\u03B5\u03BB\u03BB\u03AC\u03B4\u03B1") || lowerName.includes("greece")) {
    return "greece";
  }
  if (lowerName.includes("bulgaria") || lowerName.includes("\u03B2\u03BF\u03C5\u03BB\u03B3\u03B1\u03C1\u03AF\u03B1")) {
    return "bulgaria";
  }
  return "unknown";
}
function processDisplayNameByCountry(displayName) {
  const country = getCountryFromDisplayName(displayName);
  switch (country) {
    case "greece":
      return processDisplayNameToHierarchy(displayName);
    case "bulgaria":
      return displayName;
    // Fallback προς το παρόν
    default:
      return processDisplayNameToHierarchy(displayName);
  }
}

// src/services/osmService.ts
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
              name: result.display_name ? processDisplayNameByCountry(result.display_name) : addressComponent.label,
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
              name: result.display_name ? processDisplayNameByCountry(result.display_name) : addressComponent.label,
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

export { GEO_MAPPING_NAME, GEO_MAPPING_VERSION, clearOSMCache, fetchAdministrativeBoundary, fetchBoundaryByAddressComponent, fetchBuildingOutlines, getCacheSize, isBoundsCached, prefetchBuildingOutlines };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map