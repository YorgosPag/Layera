"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  MapInitializationService: () => MapInitializationService,
  MapProvider: () => MapProvider,
  useMap: () => useMap
});
module.exports = __toCommonJS(index_exports);

// src/services/MapInitializationService.ts
var import_leaflet = __toESM(require("leaflet"));
var _MapInitializationService = class _MapInitializationService {
  constructor() {
    __publicField(this, "defaultConfig", {
      center: [37.9755, 23.7348],
      // Athens coordinates
      zoom: 13,
      maxZoom: 18,
      minZoom: 8,
      tileUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution: "\xA9 OpenStreetMap contributors"
    });
    this.fixLeafletIconPaths();
  }
  static getInstance() {
    if (!_MapInitializationService.instance) {
      _MapInitializationService.instance = new _MapInitializationService();
    }
    return _MapInitializationService.instance;
  }
  fixLeafletIconPaths() {
    delete import_leaflet.default.Icon.Default.prototype._getIconUrl;
    import_leaflet.default.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png"
    });
  }
  addOverlayStyles() {
    if (!document.querySelector("style[data-geomap-overlay]")) {
      const overlayStyles = document.createElement("style");
      overlayStyles.setAttribute("data-geomap-overlay", "true");
      overlayStyles.textContent = `
        .leaflet-overlay-pane { z-index: 400 !important; }
        .floor-plan-overlay { outline: 2px dashed red; }
      `;
      document.head.appendChild(overlayStyles);
    }
  }
  initializeMap(options) {
    const config = { ...this.defaultConfig, ...options.config };
    const mapContainer = document.getElementById(options.containerId);
    if (!mapContainer) {
      throw new Error(`Map container with id "${options.containerId}" not found`);
    }
    try {
      mapContainer.innerHTML = "";
    } catch (e) {
      console.warn("Container cleanup warning:", e);
    }
    const map = import_leaflet.default.map(options.containerId, {
      zoomControl: false
      // We'll add custom controls later if needed
    }).setView(config.center, config.zoom);
    import_leaflet.default.tileLayer(config.tileUrl, {
      attribution: config.attribution,
      maxZoom: config.maxZoom,
      minZoom: config.minZoom
    }).addTo(map);
    this.addOverlayStyles();
    setTimeout(() => map.invalidateSize(), 0);
    return map;
  }
  addZoomControl(map, position = "topright") {
    import_leaflet.default.control.zoom({ position }).addTo(map);
  }
  addScaleControl(map, options = {}) {
    const defaultOptions = {
      position: "bottomleft",
      metric: true,
      imperial: false,
      maxWidth: 200
    };
    import_leaflet.default.control.scale({ ...defaultOptions, ...options }).addTo(map);
  }
  setupEventListeners(map, handlers) {
    if (handlers.onMapClick) {
      map.on("click", handlers.onMapClick);
    }
    if (handlers.onMapMove) {
      map.on("move", handlers.onMapMove);
    }
    if (handlers.onMapMoveEnd) {
      map.on("moveend", handlers.onMapMoveEnd);
    }
    if (handlers.onMapZoomEnd) {
      map.on("zoomend", handlers.onMapZoomEnd);
    }
  }
  cleanupMap(map) {
    if (map) {
      try {
        map.off();
        map.remove();
      } catch (error) {
        console.warn("Error during map cleanup:", error);
      }
    }
  }
};
__publicField(_MapInitializationService, "instance");
var MapInitializationService = _MapInitializationService;

// src/providers/MapProvider.tsx
var import_react = require("react");
var import_jsx_runtime = require("react/jsx-runtime");
var MapContext = (0, import_react.createContext)(void 0);
var MapProvider = ({ children, defaultConfig }) => {
  const mapRef = (0, import_react.useRef)(null);
  const isComponentMounted = (0, import_react.useRef)(true);
  const mapInitService = (0, import_react.useRef)(MapInitializationService.getInstance());
  const [mapBounds, setMapBounds] = (0, import_react.useState)(null);
  const [mapSize, setMapSize] = (0, import_react.useState)({ width: 0, height: 0 });
  const [isLoading, setIsLoading] = (0, import_react.useState)(true);
  const updateMapState = () => {
    if (isComponentMounted.current && mapRef.current) {
      const bounds = mapRef.current.getBounds();
      const size = mapRef.current.getSize();
      setMapBounds(bounds);
      setMapSize({ width: size.x, height: size.y });
    }
  };
  const initializeMap = async (containerId, config) => {
    try {
      setIsLoading(true);
      const mapConfig = { ...defaultConfig, ...config };
      const map = mapInitService.current.initializeMap({
        containerId,
        config: mapConfig
      });
      mapRef.current = map;
      mapInitService.current.setupEventListeners(map, {
        onMapMove: updateMapState,
        onMapMoveEnd: updateMapState,
        onMapZoomEnd: updateMapState
      });
      updateMapState();
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to initialize map:", error);
      setIsLoading(false);
    }
  };
  const cleanupMap = () => {
    if (mapRef.current) {
      mapInitService.current.cleanupMap(mapRef.current);
      mapRef.current = null;
    }
  };
  (0, import_react.useEffect)(() => {
    return () => {
      isComponentMounted.current = false;
      cleanupMap();
    };
  }, []);
  const value = {
    map: mapRef.current,
    mapBounds,
    mapSize,
    isLoading,
    initializeMap,
    cleanupMap
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapContext.Provider, { value, children });
};
var useMap = () => {
  const context = (0, import_react.useContext)(MapContext);
  if (context === void 0) {
    throw new Error("useMap must be used within a MapProvider");
  }
  return context;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MapInitializationService,
  MapProvider,
  useMap
});
//# sourceMappingURL=index.js.map