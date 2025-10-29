import L from 'leaflet';
import { LeafletMap, LeafletEvent, MapConfig, MapInitializationOptions } from '../types';

export class MapInitializationService {
  private static instance: MapInitializationService;
  private readonly defaultConfig: MapConfig = {
    center: [37.9755, 23.7348], // Athens coordinates
    zoom: 13,
    maxZoom: 18,
    minZoom: 8,
    tileUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '© OpenStreetMap contributors'
  };

  static getInstance(): MapInitializationService {
    if (!MapInitializationService.instance) {
      MapInitializationService.instance = new MapInitializationService();
    }
    return MapInitializationService.instance;
  }

  private constructor() {
    this.fixLeafletIconPaths();
  }

  private fixLeafletIconPaths(): void {
    // Fix Leaflet icon paths for bundled applications
    delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
      iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
      shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
    });
  }

  private addOverlayStyles(): void {
    // Add CSS for floor plan overlay z-index
    if (!document.querySelector('style[data-geomap-overlay]')) {
      const overlayStyles = document.createElement('style');
      overlayStyles.setAttribute('data-geomap-overlay', 'true');
      overlayStyles.textContent = `
        .leaflet-overlay-pane { z-index: 400 !important; }
        .floor-plan-overlay { outline: 2px dashed red; }
      `;
      document.head.appendChild(overlayStyles);
    }
  }

  public initializeMap(options: MapInitializationOptions): LeafletMap {
    const config = { ...this.defaultConfig, ...options.config };

    // Clear container safely
    const mapContainer = document.getElementById(options.containerId);
    if (!mapContainer) {
      const error = `Map container with id "${options.containerId}" not found`;
      console.error('❌ MapInitializationService:', error);
      throw new Error(error);
    }

    if (process.env.NODE_ENV === 'development') {
      console.log('📦 Map container found:', {
        id: options.containerId,
        width: mapContainer.offsetWidth,
        height: mapContainer.offsetHeight,
        visible: mapContainer.offsetWidth > 0 && mapContainer.offsetHeight > 0
      });
    }

    try {
      mapContainer.innerHTML = '';
    } catch (e) {
      console.warn('Container cleanup warning:', e);
    }

    // Create map
    const map = L.map(options.containerId, {
      zoomControl: false, // We'll add custom controls later if needed
    }).setView(config.center, config.zoom);

    // Add tile layer
    const tileLayer = L.tileLayer(config.tileUrl, {
      attribution: config.attribution,
      maxZoom: config.maxZoom,
      minZoom: config.minZoom
    });

    tileLayer.on('loading', () => {
      if (process.env.NODE_ENV === 'development') {
        console.log('🌍 Tiles loading...');
      }
    });

    tileLayer.on('load', () => {
      if (process.env.NODE_ENV === 'development') {
        console.log('✅ Tiles loaded successfully');
      }
    });

    tileLayer.on('tileerror', (error) => {
      console.error('❌ Tile loading error:', error);
    });

    tileLayer.addTo(map);

    // Add overlay styles
    this.addOverlayStyles();

    // Force resize after creation
    setTimeout(() => {
      map.invalidateSize();
      if (process.env.NODE_ENV === 'development') {
        console.log('🗺️ Map initialized successfully with size:', map.getSize());
      }
    }, 100);

    return map;
  }

  public addZoomControl(map: LeafletMap, position: 'topright' | 'topleft' | 'bottomright' | 'bottomleft' = 'topright'): void {
    L.control.zoom({ position }).addTo(map);
  }

  public addScaleControl(
    map: LeafletMap,
    options: {
      position?: 'topright' | 'topleft' | 'bottomright' | 'bottomleft';
      metric?: boolean;
      imperial?: boolean;
      maxWidth?: number;
    } = {}
  ): void {
    const defaultOptions = {
      position: 'bottomleft' as const,
      metric: true,
      imperial: false,
      maxWidth: 200
    };

    L.control.scale({ ...defaultOptions, ...options }).addTo(map);
  }

  public setupEventListeners(
    map: LeafletMap,
    handlers: {
      onMapClick?: (event: LeafletEvent) => void;
      onMapMove?: () => void;
      onMapMoveEnd?: () => void;
      onMapZoomEnd?: () => void;
    }
  ): void {
    if (handlers.onMapClick) {
      map.on('click', handlers.onMapClick);
    }

    if (handlers.onMapMove) {
      map.on('move', handlers.onMapMove);
    }

    if (handlers.onMapMoveEnd) {
      map.on('moveend', handlers.onMapMoveEnd);
    }

    if (handlers.onMapZoomEnd) {
      map.on('zoomend', handlers.onMapZoomEnd);
    }
  }

  public cleanupMap(map: LeafletMap | null): void {
    if (map) {
      try {
        map.off(); // Remove all event listeners
        map.remove(); // Remove map instance
      } catch (error) {
        console.warn('Error during map cleanup:', error);
      }
    }
  }
}