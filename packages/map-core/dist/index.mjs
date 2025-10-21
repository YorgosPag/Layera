var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// src/services/MapInitializationService.ts
import L from "leaflet";
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
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
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
    const map = L.map(options.containerId, {
      zoomControl: false
      // We'll add custom controls later if needed
    }).setView(config.center, config.zoom);
    L.tileLayer(config.tileUrl, {
      attribution: config.attribution,
      maxZoom: config.maxZoom,
      minZoom: config.minZoom
    }).addTo(map);
    this.addOverlayStyles();
    setTimeout(() => map.invalidateSize(), 0);
    return map;
  }
  addZoomControl(map, position = "topright") {
    L.control.zoom({ position }).addTo(map);
  }
  addScaleControl(map, options = {}) {
    const defaultOptions = {
      position: "bottomleft",
      metric: true,
      imperial: false,
      maxWidth: 200
    };
    L.control.scale({ ...defaultOptions, ...options }).addTo(map);
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
import { createContext, useContext, useRef, useState, useEffect } from "react";
import { jsx } from "react/jsx-runtime";
var MapContext = createContext(void 0);
var MapProvider = ({ children, defaultConfig }) => {
  const mapRef = useRef(null);
  const isComponentMounted = useRef(true);
  const mapInitService = useRef(MapInitializationService.getInstance());
  const [mapBounds, setMapBounds] = useState(null);
  const [mapSize, setMapSize] = useState({ width: 0, height: 0 });
  const [isLoading, setIsLoading] = useState(true);
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
  useEffect(() => {
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
  return /* @__PURE__ */ jsx(MapContext.Provider, { value, children });
};
var useMap = () => {
  const context = useContext(MapContext);
  if (context === void 0) {
    throw new Error("useMap must be used within a MapProvider");
  }
  return context;
};
export {
  MapInitializationService,
  MapProvider,
  useMap
};
//# sourceMappingURL=index.mjs.map