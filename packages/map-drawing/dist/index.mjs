var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// src/services/DrawingService.ts
import L from "leaflet";
var DrawingService = class {
  constructor(config = {}) {
    __publicField(this, "map", null);
    __publicField(this, "state", {
      activeMode: "none",
      currentPolygon: null,
      polygonPoints: [],
      drawnAreas: []
    });
    __publicField(this, "handlers", {});
    __publicField(this, "config");
    this.config = {
      enablePolygon: true,
      enableMarker: true,
      defaultCategory: "real_estate",
      ...config
    };
  }
  initialize(map, handlers = {}) {
    this.map = map;
    this.handlers = handlers;
    this.setupEventListeners();
  }
  setupEventListeners() {
    if (!this.map) return;
    this.map.on("click", this.handleMapClick.bind(this));
    this.map.on("dblclick", this.handleDoubleClick.bind(this));
  }
  handleMapClick(e) {
    if (!this.map || !e.latlng) return;
    const { lat, lng } = e.latlng;
    if (this.state.activeMode === "marker") {
      this.addMarker(lat, lng);
    } else if (this.state.activeMode === "polygon") {
      this.addPolygonPoint(lat, lng);
    }
  }
  handleDoubleClick() {
    if (this.state.activeMode === "polygon") {
      this.finishPolygon();
    }
  }
  addMarker(lat, lng) {
    if (!this.map) return;
    try {
      L.marker([lat, lng]).addTo(this.map);
      const area = {
        id: Date.now().toString(),
        type: "marker",
        coordinates: [[lat, lng]],
        name: `${this.config.defaultCategory === "real_estate" ? "Property" : "Job"} ${this.state.drawnAreas.length + 1}`,
        nameTemplate: this.config.defaultCategory === "real_estate" ? "realEstate" : "job",
        nameNumber: this.state.drawnAreas.length + 1,
        category: this.config.defaultCategory || "real_estate",
        isVisible: true,
        opacity: 1
      };
      this.state.drawnAreas.push(area);
      this.handlers.onAreaCreated?.(area);
      this.setDrawingMode("none");
    } catch (error) {
      console.warn("Error adding marker:", error);
    }
  }
  addPolygonPoint(lat, lng) {
    if (!this.map) return;
    try {
      this.state.polygonPoints.push([lat, lng]);
      if (this.state.polygonPoints.length === 1) {
        const style = {
          color: "#3b82f6",
          fillColor: "#3b82f6",
          fillOpacity: 0.3
        };
        this.state.currentPolygon = L.polygon(this.state.polygonPoints, style).addTo(this.map);
      } else if (this.state.currentPolygon) {
        this.state.currentPolygon.setLatLngs(this.state.polygonPoints);
      }
    } catch (error) {
      console.warn("Error adding polygon point:", error);
    }
  }
  finishPolygon() {
    if (this.state.polygonPoints.length >= 3 && this.state.currentPolygon) {
      const area = {
        id: Date.now().toString(),
        type: "polygon",
        coordinates: this.state.polygonPoints,
        name: `${this.config.defaultCategory === "real_estate" ? "Property Area" : "Job Area"} ${this.state.drawnAreas.length + 1}`,
        nameTemplate: this.config.defaultCategory === "real_estate" ? "realEstate" : "job",
        nameNumber: this.state.drawnAreas.length + 1,
        area: this.calculatePolygonArea(this.state.polygonPoints),
        category: this.config.defaultCategory || "real_estate",
        isVisible: true,
        opacity: 1
      };
      this.state.drawnAreas.push(area);
      this.handlers.onAreaCreated?.(area);
      this.state.polygonPoints = [];
      this.state.currentPolygon = null;
      this.setDrawingMode("none");
    }
  }
  calculatePolygonArea(coordinates) {
    let area = 0;
    const n = coordinates.length;
    for (let i = 0; i < n; i++) {
      const j = (i + 1) % n;
      const currentCoord = coordinates[i];
      const nextCoord = coordinates[j];
      if (currentCoord && nextCoord && currentCoord.length >= 2 && nextCoord.length >= 2) {
        area += currentCoord[0] * nextCoord[1];
        area -= nextCoord[0] * currentCoord[1];
      }
    }
    return Math.abs(area / 2) * 111e3 * 111e3;
  }
  setDrawingMode(mode) {
    this.state.activeMode = mode;
    this.handlers.onModeChanged?.(mode);
    if (mode === "polygon") {
      this.state.polygonPoints = [];
      this.state.currentPolygon = null;
    }
  }
  clearAll() {
    if (!this.map) return;
    try {
      this.map.eachLayer((layer) => {
        if (layer instanceof L.Polygon || layer instanceof L.Marker) {
          this.map?.removeLayer(layer);
        }
      });
      this.state.drawnAreas = [];
      this.state.polygonPoints = [];
      this.state.currentPolygon = null;
      this.setDrawingMode("none");
    } catch (error) {
      console.warn("Error clearing drawing layers:", error);
    }
  }
  deleteArea(areaId) {
    const areaIndex = this.state.drawnAreas.findIndex((area) => area.id === areaId);
    if (areaIndex === -1) return;
    this.state.drawnAreas.splice(areaIndex, 1);
    this.handlers.onAreaDeleted?.(areaId);
  }
  getDrawnAreas() {
    return [...this.state.drawnAreas];
  }
  getCurrentMode() {
    return this.state.activeMode;
  }
  cleanup() {
    if (this.map) {
      this.map.off("click", this.handleMapClick.bind(this));
      this.map.off("dblclick", this.handleDoubleClick.bind(this));
    }
    this.map = null;
    this.state = {
      activeMode: "none",
      currentPolygon: null,
      polygonPoints: [],
      drawnAreas: []
    };
  }
};

// src/hooks/useDrawing.ts
import { useEffect, useRef, useState, useCallback } from "react";
var useDrawing = (options = {}) => {
  const drawingServiceRef = useRef(null);
  const [currentMode, setCurrentMode] = useState("none");
  const [drawnAreas, setDrawnAreas] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const map = options.map || null;
  const isLoading = !map;
  useEffect(() => {
    if (!map || isLoading) {
      setIsReady(false);
      return;
    }
    const handlers = {
      onAreaCreated: (area) => {
        setDrawnAreas((prev) => [...prev, area]);
        options.onAreaCreated?.(area);
      },
      onAreaDeleted: (areaId) => {
        setDrawnAreas((prev) => prev.filter((area) => area.id !== areaId));
        options.onAreaDeleted?.(areaId);
      },
      onModeChanged: (mode) => {
        setCurrentMode(mode);
        options.onModeChanged?.(mode);
      }
    };
    drawingServiceRef.current = new DrawingService(options.config);
    drawingServiceRef.current.initialize(map, handlers);
    setIsReady(true);
    return () => {
      drawingServiceRef.current?.cleanup();
      drawingServiceRef.current = null;
      setIsReady(false);
    };
  }, [map, isLoading, options.config]);
  const setDrawingMode = useCallback((mode) => {
    drawingServiceRef.current?.setDrawingMode(mode);
  }, []);
  const clearAll = useCallback(() => {
    drawingServiceRef.current?.clearAll();
    setDrawnAreas([]);
  }, []);
  const deleteArea = useCallback((areaId) => {
    drawingServiceRef.current?.deleteArea(areaId);
  }, []);
  return {
    drawingService: drawingServiceRef.current,
    currentMode,
    drawnAreas,
    setDrawingMode,
    clearAll,
    deleteArea,
    isReady
  };
};
export {
  DrawingService,
  useDrawing
};
//# sourceMappingURL=index.mjs.map