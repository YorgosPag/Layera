import L from 'leaflet';
import { LeafletMap, LeafletEvent, DrawnArea } from '@layera/map-core';
import { DrawingMode, DrawingState, DrawingEventHandlers, DrawingServiceConfig } from '../types';

export class DrawingService {
  private map: LeafletMap | null = null;
  private state: DrawingState = {
    activeMode: 'none',
    currentPolygon: null,
    polygonPoints: [],
    drawnAreas: []
  };
  private handlers: DrawingEventHandlers = {};
  private config: DrawingServiceConfig;

  constructor(config: DrawingServiceConfig = {}) {
    this.config = {
      enablePolygon: true,
      enableMarker: true,
      defaultCategory: 'real_estate',
      ...config
    };
  }

  public initialize(map: LeafletMap, handlers: DrawingEventHandlers = {}): void {
    this.map = map;
    this.handlers = handlers;
    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    if (!this.map) return;

    this.map.on('click', this.handleMapClick.bind(this));
    this.map.on('dblclick', this.handleDoubleClick.bind(this));
  }

  private handleMapClick(e: LeafletEvent): void {
    if (!this.map || !e.latlng) return;

    const { lat, lng } = e.latlng;

    if (this.state.activeMode === 'marker') {
      this.addMarker(lat, lng);
    } else if (this.state.activeMode === 'polygon') {
      this.addPolygonPoint(lat, lng);
    }
  }

  private handleDoubleClick(): void {
    if (this.state.activeMode === 'polygon') {
      this.finishPolygon();
    }
  }

  private addMarker(lat: number, lng: number): void {
    if (!this.map) return;

    try {
      L.marker([lat, lng]).addTo(this.map);

      const area: DrawnArea = {
        id: Date.now().toString(),
        type: 'marker',
        coordinates: [[lat, lng]],
        name: `${this.config.defaultCategory === 'real_estate' ? 'Property' : 'Job'} ${this.state.drawnAreas.length + 1}`,
        nameTemplate: this.config.defaultCategory === 'real_estate' ? 'realEstate' : 'job',
        nameNumber: this.state.drawnAreas.length + 1,
        category: this.config.defaultCategory || 'real_estate',
        isVisible: true,
        opacity: 1
      };

      this.state.drawnAreas.push(area);
      this.handlers.onAreaCreated?.(area);

      // Reset drawing mode
      this.setDrawingMode('none');
    } catch (error) {
      console.warn('Error adding marker:', error);
    }
  }

  private addPolygonPoint(lat: number, lng: number): void {
    if (!this.map) return;

    try {
      this.state.polygonPoints.push([lat, lng]);

      // Create new polygon on first point
      if (this.state.polygonPoints.length === 1) {
        const style = {
          color: '#3b82f6',
          fillColor: '#3b82f6',
          fillOpacity: 0.3
        };

        this.state.currentPolygon = L.polygon(this.state.polygonPoints as L.LatLngExpression[], style).addTo(this.map);
      } else if (this.state.currentPolygon) {
        // Update existing polygon
        (this.state.currentPolygon as L.Polygon).setLatLngs(this.state.polygonPoints as L.LatLngExpression[]);
      }
    } catch (error) {
      console.warn('Error adding polygon point:', error);
    }
  }

  private finishPolygon(): void {
    if (this.state.polygonPoints.length >= 3 && this.state.currentPolygon) {
      const area: DrawnArea = {
        id: Date.now().toString(),
        type: 'polygon',
        coordinates: this.state.polygonPoints,
        name: `${this.config.defaultCategory === 'real_estate' ? 'Property Area' : 'Job Area'} ${this.state.drawnAreas.length + 1}`,
        nameTemplate: this.config.defaultCategory === 'real_estate' ? 'realEstate' : 'job',
        nameNumber: this.state.drawnAreas.length + 1,
        area: this.calculatePolygonArea(this.state.polygonPoints),
        category: this.config.defaultCategory || 'real_estate',
        isVisible: true,
        opacity: 1
      };

      this.state.drawnAreas.push(area);
      this.handlers.onAreaCreated?.(area);

      // Reset
      this.state.polygonPoints = [];
      this.state.currentPolygon = null;
      this.setDrawingMode('none');
    }
  }

  private calculatePolygonArea(coordinates: number[][]): number {
    let area = 0;
    const n = coordinates.length;

    for (let i = 0; i < n; i++) {
      const j = (i + 1) % n;
      const currentCoord = coordinates[i];
      const nextCoord = coordinates[j];
      if (currentCoord && nextCoord && currentCoord.length >= 2 && nextCoord.length >= 2) {
        area += currentCoord[0]! * nextCoord[1]!;
        area -= nextCoord[0]! * currentCoord[1]!;
      }
    }

    return Math.abs(area / 2) * 111000 * 111000; // Approximate conversion to square meters
  }

  public setDrawingMode(mode: DrawingMode): void {
    this.state.activeMode = mode;
    this.handlers.onModeChanged?.(mode);

    if (mode === 'polygon') {
      this.state.polygonPoints = [];
      this.state.currentPolygon = null;
    }
  }

  public clearAll(): void {
    if (!this.map) return;

    try {
      this.map.eachLayer((layer: L.Layer) => {
        // Remove only drawn layers (polygons and markers), not base tiles
        if (layer instanceof L.Polygon || layer instanceof L.Marker) {
          this.map?.removeLayer(layer);
        }
      });

      this.state.drawnAreas = [];
      this.state.polygonPoints = [];
      this.state.currentPolygon = null;
      this.setDrawingMode('none');
    } catch (error) {
      console.warn('Error clearing drawing layers:', error);
    }
  }

  public deleteArea(areaId: string): void {
    const areaIndex = this.state.drawnAreas.findIndex(area => area.id === areaId);
    if (areaIndex === -1) return;

    // Remove from state
    this.state.drawnAreas.splice(areaIndex, 1);
    this.handlers.onAreaDeleted?.(areaId);

    // TODO: Remove from map - needs layer tracking
  }

  public getDrawnAreas(): DrawnArea[] {
    return [...this.state.drawnAreas];
  }

  public getCurrentMode(): DrawingMode {
    return this.state.activeMode;
  }

  public cleanup(): void {
    if (this.map) {
      this.map.off('click', this.handleMapClick.bind(this));
      this.map.off('dblclick', this.handleDoubleClick.bind(this));
    }
    this.map = null;
    this.state = {
      activeMode: 'none',
      currentPolygon: null,
      polygonPoints: [],
      drawnAreas: []
    };
  }
}