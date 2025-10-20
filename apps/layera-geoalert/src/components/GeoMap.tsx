import React, { useEffect, useRef, useState } from 'react';
import { useLayeraTranslation } from '@layera/tolgee';
import { Button } from '@layera/buttons';
import LatitudeRuler from './rulers/LatitudeRuler';
import LongitudeRuler from './rulers/LongitudeRuler';
import {
  ViewportDebugger,
  useViewportWithOverride,
  MobileOnly,
  TabletOnly,
  DesktopOnly,
  DeviceSwitcher
} from '@layera/viewport';
import { HomeIcon, BriefcaseIcon, MarkerIcon, PolygonIcon, CheckIcon, TrashIcon } from './icons/LayeraIcons';

interface LatLngBounds {
  getSouth(): number;
  getNorth(): number;
  getWest(): number;
  getEast(): number;
}

interface LeafletMap {
  on(event: string, handler: (e: LeafletEvent) => void): void;
  off(): void;
  getBounds(): LatLngBounds;
  getSize(): { x: number; y: number };
  invalidateSize(): void;
  remove(): void;
  eachLayer(callback: (layer: LeafletLayer) => void): void;
  removeLayer(layer: LeafletLayer): void;
}

interface LeafletEvent {
  latlng: { lat: number; lng: number };
}

interface LeafletLayer {
  options?: Record<string, unknown>;
  getLatLng?: () => { lat: number; lng: number };
}

interface FormData {
  price?: number;
  squareMeters?: number;
  rooms?: number;
  propertyType?: string;
  salary?: number;
  workingHours?: string;
  company?: string;
  jobType?: string;
}

interface DrawnArea {
  id: string;
  type: 'polygon' | 'marker';
  coordinates: number[][];
  name: string;
  nameTemplate?: string; // For dynamic translation
  nameNumber?: number;   // Counter for the area
  area?: number;
  category: 'real_estate' | 'jobs';
  isVisible?: boolean;
  opacity?: number;
  metadata?: {
    // Ακίνητα
    price?: number;
    squareMeters?: number;
    rooms?: number;
    propertyType?: string;
    // Εργασία
    salary?: number;
    workingHours?: string;
    company?: string;
    jobType?: string;
  };
}

interface GeoMapProps {
  onAreaCreated?: (area: DrawnArea) => void;
}

const GeoMap: React.FC<GeoMapProps> = ({ onAreaCreated }) => {
  const { t } = useLayeraTranslation();
  const { deviceType, isMobile, isTablet, isDesktop } = useViewportWithOverride();
  const mapInitialized = useRef(false);
  const mapRef = useRef<LeafletMap | null>(null);
  const leafletRef = useRef<typeof import('leaflet').default | null>(null); // Store Leaflet reference
  const drawingMode = useRef<'none' | 'polygon' | 'marker'>('none');
  const currentPolygon = useRef<LeafletLayer | null>(null);
  const polygonPoints = useRef<number[][]>([]);
  const userLocationMarker = useRef<LeafletLayer | null>(null); // Ref για το user location marker
  const searchResultMarker = useRef<LeafletLayer | null>(null); // Ref για το search result marker
  const boundaryLayer = useRef<LeafletLayer | null>(null); // Ref για administrative boundaries
  const [drawnAreas, setDrawnAreas] = useState<DrawnArea[]>([]);
  const [activeDrawingMode, setActiveDrawingMode] = useState<'none' | 'polygon' | 'marker'>('none');
  const [activeCategory, setActiveCategory] = useState<'real_estate' | 'jobs'>('real_estate');
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [tempAreaData, setTempAreaData] = useState<Partial<DrawnArea> | null>(null);
  const [mapBounds, setMapBounds] = useState<LatLngBounds | null>(null);
  const [mapSize, setMapSize] = useState({ width: 0, height: 0 });
  const [isLoading, setIsLoading] = useState(true);

  // Helper function to generate dynamic area names
  const getAreaName = (area: DrawnArea): string => {
    if (area.nameTemplate && area.nameNumber) {
      const template = area.nameTemplate === 'realEstate'
        ? (area.type === 'polygon' ? t('realEstateArea') : t('realEstate'))
        : (area.type === 'polygon' ? t('jobArea') : t('job'));
      return `${template} ${area.nameNumber}`;
    }
    return area.name; // Fallback to original name
  };

  useEffect(() => {
    if (mapInitialized.current) return;

    let isComponentMounted = true;

    const loadLeafletCSS = () => {
      return new Promise<void>((resolve) => {
        if (document.querySelector('link[href*="leaflet.css"]')) {
          resolve();
          return;
        }

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
        link.crossOrigin = '';
        link.onload = () => resolve();
        document.head.appendChild(link);
      });
    };

    // Event listener για geolocation - Βρες τη θέση μου (εκτός του initMap)
    const handleCenterMapToLocation = (event: CustomEvent) => {
      console.log('🎯 GeoMap: Received centerMapToLocation event', event.detail);

      if (isComponentMounted && mapRef.current) {
        const { latitude, longitude, zoom = 16 } = event.detail;
        console.log('🗺️ GeoMap: Setting view to:', { latitude, longitude, zoom });

        // Αφαιρούμε το παλιό user location marker αν υπάρχει
        if (userLocationMarker.current && mapRef.current) {
          try {
            mapRef.current.removeLayer(userLocationMarker.current);
            userLocationMarker.current = null;
            console.log('🗑️ GeoMap: Removed old location marker');
          } catch (e) {
            console.warn('Error removing old user location marker:', e);
          }
        }

        // Κεντράρισμα του χάρτη στη θέση του χρήστη
        mapRef.current.setView([latitude, longitude], zoom);
        console.log('✅ GeoMap: Map centered successfully');

        // Προσθήκη ενός διακριτικού location marker
        const L = leafletRef.current;
        console.log('🔍 GeoMap: Checking Leaflet availability:', { L, hasL: !!L });

        if (L) {
          console.log('📍 GeoMap: Creating location marker...');

          // Δημιουργούμε custom icon για τη θέση του χρήστη
          const userLocationIcon = L.divIcon({
            className: 'user-location-marker',
            html: `
              <div style="
                width: 20px;
                height: 20px;
                background-color: #007AFF;
                border: 3px solid white;
                border-radius: 50%;
                box-shadow: 0 2px 6px rgba(0, 122, 255, 0.3);
                position: relative;
                animation: pulse 2s infinite;
              "></div>
              <style>
                @keyframes pulse {
                  0% { box-shadow: 0 2px 6px rgba(0, 122, 255, 0.3), 0 0 0 0 rgba(0, 122, 255, 0.7); }
                  70% { box-shadow: 0 2px 6px rgba(0, 122, 255, 0.3), 0 0 0 10px rgba(0, 122, 255, 0); }
                  100% { box-shadow: 0 2px 6px rgba(0, 122, 255, 0.3), 0 0 0 0 rgba(0, 122, 255, 0); }
                }
              </style>
            `,
            iconSize: [26, 26],
            iconAnchor: [13, 13]
          });

          // Προσθέτουμε το νέο marker και το αποθηκεύουμε στο ref
          userLocationMarker.current = L.marker([latitude, longitude], { icon: userLocationIcon })
            .addTo(mapRef.current)
            .bindPopup('<div style="text-align: center; font-weight: 600; color: #007AFF;">📍 Η θέση σας</div>')
            .openPopup();

          console.log('✨ GeoMap: Location marker created and added successfully!');
        } else {
          console.error('❌ GeoMap: Leaflet not available for marker creation');
        }
      } else {
        console.warn('⚠️ GeoMap: Cannot handle location - component not mounted or map not ready');
      }
    };

    // Event listener για search results - Αποτελέσματα αναζήτησης
    const handleShowSearchResult = (event: CustomEvent) => {
      console.log('🔍 GeoMap: Received showSearchResult event', event.detail);

      if (isComponentMounted && mapRef.current) {
        const { latitude, longitude, zoom = 16, displayName } = event.detail;
        console.log('🗺️ GeoMap: Showing search result:', { latitude, longitude, displayName });

        // Αφαιρούμε το παλιό search result marker αν υπάρχει
        if (searchResultMarker.current && mapRef.current) {
          try {
            mapRef.current.removeLayer(searchResultMarker.current);
            searchResultMarker.current = null;
            console.log('🗑️ GeoMap: Removed old search result marker');
          } catch (e) {
            console.warn('Error removing old search result marker:', e);
          }
        }

        // Κεντράρισμα του χάρτη στην αναζητημένη τοποθεσία
        mapRef.current.setView([latitude, longitude], zoom);
        console.log('✅ GeoMap: Map centered to search result');

        // Προσθήκη search result marker
        const L = leafletRef.current;
        if (L) {
          console.log('📍 GeoMap: Creating search result marker...');

          // Δημιουργούμε custom icon για το search result
          const searchResultIcon = L.divIcon({
            className: 'search-result-marker',
            html: `
              <div style="
                width: 30px;
                height: 30px;
                background-color: #10b981;
                border: 4px solid white;
                border-radius: 50%;
                box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4);
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: bold;
                font-size: 16px;
                animation: searchResultPulse 2s infinite;
              ">📍</div>
              <style>
                @keyframes searchResultPulse {
                  0% { box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4), 0 0 0 0 rgba(16, 185, 129, 0.7); }
                  70% { box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4), 0 0 0 15px rgba(16, 185, 129, 0); }
                  100% { box-shadow: 0 4px 12px rgba(16, 185, 129, 0.4), 0 0 0 0 rgba(16, 185, 129, 0); }
                }
              </style>
            `,
            iconSize: [38, 38],
            iconAnchor: [19, 19]
          });

          // Προσθέτουμε το νέο search result marker
          searchResultMarker.current = L.marker([latitude, longitude], { icon: searchResultIcon })
            .addTo(mapRef.current)
            .bindPopup(`<div style="text-align: center; font-weight: 600; color: #10b981; max-width: 200px;">🔍 ${displayName}</div>`)
            .openPopup();

          console.log('✨ GeoMap: Search result marker created and added successfully!');
        } else {
          console.error('❌ GeoMap: Leaflet not available for search result marker creation');
        }
      } else {
        console.warn('⚠️ GeoMap: Cannot handle search result - component not mounted or map not ready');
      }
    };

    // Handler για administrative boundary visualization
    const handleShowAdministrativeBoundary = (event: CustomEvent) => {
      console.log('🏛️ GeoMap: Received showAdministrativeBoundary event', event.detail);

      if (isComponentMounted && mapRef.current && leafletRef.current) {
        const { boundary, component } = event.detail;
        const L = leafletRef.current;

        try {
          // Remove previous boundary layer
          if (boundaryLayer.current) {
            mapRef.current.removeLayer(boundaryLayer.current);
            boundaryLayer.current = null;
          }

          if (boundary && boundary.features && boundary.features.length > 0) {
            console.log('🗺️ GeoMap: Creating boundary layer for:', component.label);

            // Create GeoJSON layer for the boundary
            const geoJsonLayer = L.geoJSON(boundary, {
              style: {
                color: '#8b5cf6',
                weight: 3,
                opacity: 0.8,
                fillColor: '#8b5cf6',
                fillOpacity: 0.1
              }
            }).bindPopup(`
              <div style="text-align: center; font-weight: 600; color: #8b5cf6; max-width: 200px;">
                🏛️ ${component.label}
                <br><small style="color: #6b7280;">Διοικητικό όριο</small>
              </div>
            `);

            // Add to map and store reference
            geoJsonLayer.addTo(mapRef.current);
            boundaryLayer.current = geoJsonLayer;

            // Fit map to boundary bounds
            const bounds = geoJsonLayer.getBounds();
            if (bounds.isValid()) {
              mapRef.current.fitBounds(bounds, { padding: [20, 20] });
            }

            console.log('✅ GeoMap: Boundary layer created and displayed');
          } else {
            console.warn('⚠️ GeoMap: No boundary features found');
          }
        } catch (error) {
          console.error('❌ GeoMap: Error creating boundary layer:', error);
        }
      } else {
        console.warn('⚠️ GeoMap: Cannot handle boundary - component not mounted or map not ready');
      }
    };

    const initMap = async () => {
      try {
        if (!isComponentMounted) return;

        console.log('Starting map initialization...');

        // Wait for CSS to load first
        await loadLeafletCSS();
        if (!isComponentMounted) return;

        console.log('Leaflet CSS loaded');

        // Then load Leaflet library
        const L = await import('leaflet');
        if (!isComponentMounted) return;

        console.log('Leaflet library loaded');
        leafletRef.current = L.default; // Store Leaflet reference

        const mapContainer = document.getElementById('geo-map');
        console.log('Map container found:', !!mapContainer);

        if (mapContainer && L.default && !mapInitialized.current && isComponentMounted) {
          // Prevent double initialization
          mapInitialized.current = true;

          // Safe cleanup of container
          try {
            mapContainer.innerHTML = '';
          } catch (e) {
            console.warn('Container cleanup warning:', e);
          }

          // Fix Leaflet icon paths
          delete (L.default.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
          L.default.Icon.Default.mergeOptions({
            iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
            iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
            shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
          });

          const map = L.default.map('geo-map').setView([37.9755, 23.7348], 13);

          L.default.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
          }).addTo(map);

          mapRef.current = map;

          // Event listeners για drawing
          map.on('click', (e: LeafletEvent) => {
            if (isComponentMounted) {
              handleMapClick(e, L.default);
            }
          });

          // Event listeners για rulers
          map.on('moveend zoomend', () => {
            if (isComponentMounted && mapRef.current) {
              const bounds = mapRef.current.getBounds();
              const size = mapRef.current.getSize();
              setMapBounds(bounds);
              setMapSize({ width: size.x, height: size.y });
            }
          });

          // Προσθήκη των event listeners
          window.addEventListener('centerMapToLocation', handleCenterMapToLocation as EventListener);
          window.addEventListener('showSearchResult', handleShowSearchResult as EventListener);
          window.addEventListener('showAdministrativeBoundary', handleShowAdministrativeBoundary as EventListener);

          // Initial bounds and size
          const bounds = map.getBounds();
          const size = map.getSize();
          setMapBounds(bounds);
          setMapSize({ width: size.x, height: size.y });
          setIsLoading(false);

          // Force a resize to ensure proper rendering
          setTimeout(() => {
            if (map && isComponentMounted) {
              map.invalidateSize();
              // Clear any leftover popups/tooltips that might cause visual issues
              try {
                if (map.closePopup && typeof map.closePopup === 'function') {
                  map.closePopup();
                }
              } catch (error) {
                console.warn('Error closing popup:', error);
              }

              try {
                // Safer check for tooltip methods - some Leaflet versions don't have these
                if (map && 'closeTooltip' in map && typeof map.closeTooltip === 'function') {
                  map.closeTooltip();
                }
              } catch (error) {
                // Silently ignore tooltip errors
              }
            }
          }, 100);

          console.log('GeoMap initialized successfully');
        }
      } catch (error) {
        console.error('Error loading Leaflet:', error);
      }
    };

    // Start initialization after a short delay
    const initTimeout = setTimeout(initMap, 500);

    return () => {
      isComponentMounted = false;
      clearTimeout(initTimeout);

      // Cleanup των window event listeners
      window.removeEventListener('centerMapToLocation', handleCenterMapToLocation as EventListener);
      window.removeEventListener('showSearchResult', handleShowSearchResult as EventListener);
      window.removeEventListener('showAdministrativeBoundary', handleShowAdministrativeBoundary as EventListener);

      try {
        if (mapRef.current) {
          // Remove all event listeners first
          mapRef.current.off();

          // Clear all layers
          mapRef.current.eachLayer((layer: LeafletLayer) => {
            try {
              mapRef.current.removeLayer(layer);
            } catch (e) {
              console.warn('Layer removal warning:', e);
            }
          });

          // Remove the map
          mapRef.current.remove();
          mapRef.current = null;
        }

        // Safe cleanup of container only if it exists and is not being used
        const mapContainer = document.getElementById('geo-map');
        if (mapContainer && mapContainer.parentNode) {
          try {
            mapContainer.innerHTML = '';
          } catch (e) {
            console.warn('Container cleanup warning:', e);
          }
        }

        mapInitialized.current = false;
        leafletRef.current = null;
      } catch (error) {
        console.warn('Map cleanup warning:', error);
        mapInitialized.current = false;
        leafletRef.current = null;
      }
    };
  }, []);

  const handleMapClick = async (e: LeafletEvent, L: typeof import('leaflet').default) => {
    if (!mapRef.current || !e || !e.latlng) return;

    const { lat, lng } = e.latlng;

    if (drawingMode.current === 'marker') {
      try {
        // Προσθήκη marker
        const marker = L.marker([lat, lng]).addTo(mapRef.current);

        const area: DrawnArea = {
          id: Date.now().toString(),
          type: 'marker',
          coordinates: [[lat, lng]],
          name: `${activeCategory === 'real_estate' ? t('realEstate') : t('job')} ${drawnAreas.length + 1}`,
          nameTemplate: activeCategory === 'real_estate' ? 'realEstate' : 'job',
          nameNumber: drawnAreas.length + 1,
          category: activeCategory,
          isVisible: true,
          opacity: 1
        };

        setTempAreaData(area);
        setShowCategoryForm(true);

        setDrawnAreas(prev => [...prev, area]);
        onAreaCreated?.(area);

        // Reset drawing mode
        setActiveDrawingMode('none');
        drawingMode.current = 'none';
        return;
      } catch (error) {
        console.warn('Error adding marker:', error);
      }

    } else if (drawingMode.current === 'polygon') {
      try {
        // Προσθήκη σημείου στο πολύγωνο
        polygonPoints.current.push([lat, lng]);

        // Αν είναι το πρώτο σημείο, δημιουργούμε νέο polygon
        if (polygonPoints.current.length === 1) {
          const bgInfo = getComputedStyle(document.documentElement).getPropertyValue('--layera-bg-info').trim();
          currentPolygon.current = L.polygon(polygonPoints.current, {
            color: bgInfo || '#3b82f6',
            fillColor: bgInfo || '#3b82f6',
            fillOpacity: 0.3
          }).addTo(mapRef.current);
        } else if (currentPolygon.current) {
          // Ενημερώνουμε το υπάρχον polygon
          currentPolygon.current.setLatLngs(polygonPoints.current);
        }

        // Αν έχουμε 3+ σημεία, μπορούμε να τελειώσουμε με double-click
        if (polygonPoints.current.length >= 3) {
          console.log(t('doubleClickFinish'));
        }
      } catch (error) {
        console.warn('Error adding polygon point:', error);
      }
    }
  };

  const finishPolygon = () => {
    if (polygonPoints.current.length >= 3 && currentPolygon.current) {
      const area: DrawnArea = {
        id: Date.now().toString(),
        type: 'polygon',
        coordinates: polygonPoints.current,
        name: `${activeCategory === 'real_estate' ? t('realEstateArea') : t('jobArea')} ${drawnAreas.length + 1}`,
        nameTemplate: activeCategory === 'real_estate' ? 'realEstate' : 'job',
        nameNumber: drawnAreas.length + 1,
        area: calculatePolygonArea(polygonPoints.current),
        category: activeCategory,
        isVisible: true,
        opacity: 1
      };

      setTempAreaData(area);
      setShowCategoryForm(true);

      setDrawnAreas(prev => [...prev, area]);
      onAreaCreated?.(area);

      // Reset
      polygonPoints.current = [];
      currentPolygon.current = null;
      setActiveDrawingMode('none');
      drawingMode.current = 'none';
    }
  };

  const calculatePolygonArea = (coordinates: number[][]): number => {
    // Απλός υπολογισμός περιοχής (δεν είναι ακριβής για μεγάλες περιοχές)
    let area = 0;
    const n = coordinates.length;

    for (let i = 0; i < n; i++) {
      const j = (i + 1) % n;
      area += coordinates[i][0] * coordinates[j][1];
      area -= coordinates[j][0] * coordinates[i][1];
    }

    return Math.abs(area / 2) * 111000 * 111000; // Προσεγγιστική μετατροπή σε τετραγωνικά μέτρα
  };

  const startDrawing = (mode: 'polygon' | 'marker') => {
    setActiveDrawingMode(mode);
    drawingMode.current = mode;

    if (mode === 'polygon') {
      polygonPoints.current = [];
      currentPolygon.current = null;
    }
  };

  const clearAll = () => {
    if (mapRef.current) {
      try {
        mapRef.current.eachLayer((layer: LeafletLayer) => {
          if (layer.options && (layer.options.color || layer.getLatLng)) {
            try {
              mapRef.current.removeLayer(layer);
            } catch (e) {
              console.warn('Layer removal warning in clearAll:', e);
            }
          }
        });

        // Αφαιρούμε και το user location marker
        if (userLocationMarker.current) {
          try {
            mapRef.current.removeLayer(userLocationMarker.current);
            userLocationMarker.current = null;
          } catch (e) {
            console.warn('Error removing user location marker in clearAll:', e);
          }
        }

        // Αφαιρούμε και το search result marker
        if (searchResultMarker.current) {
          try {
            mapRef.current.removeLayer(searchResultMarker.current);
            searchResultMarker.current = null;
          } catch (e) {
            console.warn('Error removing search result marker in clearAll:', e);
          }
        }

        // Αφαιρούμε και το boundary layer
        if (boundaryLayer.current) {
          try {
            mapRef.current.removeLayer(boundaryLayer.current);
            boundaryLayer.current = null;
          } catch (e) {
            console.warn('Error removing boundary layer in clearAll:', e);
          }
        }
      } catch (error) {
        console.warn('Error clearing layers:', error);
      }
    }

    setDrawnAreas([]);
    polygonPoints.current = [];
    currentPolygon.current = null;
    setActiveDrawingMode('none');
    drawingMode.current = 'none';
  };


  const CategoryForm = () => {
    const [formData, setFormData] = useState<FormData>({});

    const handleSubmit = () => {
      if (tempAreaData) {
        const finalArea: DrawnArea = {
          ...tempAreaData,
          metadata: formData
        };

        setDrawnAreas(prev => [...prev, finalArea]);
        onAreaCreated?.(finalArea);
      }

      setShowCategoryForm(false);
      setTempAreaData(null);
      setFormData({});
    };

    const handleCancel = () => {
      setShowCategoryForm(false);
      setTempAreaData(null);
    };


    return (
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'color-mix(in srgb, var(--layera-bg-primary) 50%, transparent 50%)',
        zIndex: 2000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{
          backgroundColor: 'var(--layera-bg-primary)',
          padding: '2rem',
          borderRadius: '8px',
          maxWidth: '400px',
          width: '90%'
        }}>
          <h3>{tempAreaData.category === 'real_estate' ? t('realEstateDetails') : t('jobDetails')}</h3>

          {tempAreaData.category === 'real_estate' ? (
            <>
              <div style={{ marginBottom: '1rem' }}>
                <label>{t('price')}</label>
                <input
                  type="number"
                  value={formData.price || ''}
                  onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                  style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label>{t('squareMeters')}</label>
                <input
                  type="number"
                  value={formData.squareMeters || ''}
                  onChange={(e) => setFormData({...formData, squareMeters: Number(e.target.value)})}
                  style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label>{t('rooms')}</label>
                <input
                  type="number"
                  value={formData.rooms || ''}
                  onChange={(e) => setFormData({...formData, rooms: Number(e.target.value)})}
                  style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                />
              </div>
            </>
          ) : (
            <>
              <div style={{ marginBottom: '1rem' }}>
                <label>Μισθός (€):</label>
                <input
                  type="number"
                  value={formData.salary || ''}
                  onChange={(e) => setFormData({...formData, salary: Number(e.target.value)})}
                  style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label>Ωράριο:</label>
                <input
                  type="text"
                  value={formData.workingHours || ''}
                  onChange={(e) => setFormData({...formData, workingHours: e.target.value})}
                  style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label>Εταιρεία:</label>
                <input
                  type="text"
                  value={formData.company || ''}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                />
              </div>
            </>
          )}

          <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
            <Button
              onClick={handleSubmit}
              variant="success"
              size="md"
              style={{ flex: 1 }}
            >
              {t('save')}
            </Button>
            <Button
              onClick={handleCancel}
              variant="secondary"
              size="md"
              style={{ flex: 1 }}
            >
              {t('cancel')}
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const RULER_SIZE = 40;

  return (
    <div style={{ height: '100%', width: '100%', position: 'relative' }}>
      {/* Rulers */}
      {mapBounds && mapSize.width > 0 && mapSize.height > 0 && (
        <>
          <LatitudeRuler bounds={mapBounds} mapSize={mapSize} />
          <LongitudeRuler bounds={mapBounds} mapSize={mapSize} />
          {/* Corner square */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: `${RULER_SIZE}px`,
            height: `${RULER_SIZE}px`,
            backgroundColor: 'var(--layera-bg-secondary)',
            borderTop: '1px solid var(--layera-border-primary)',
            borderRight: '1px solid var(--layera-border-primary)',
            zIndex: 30
          }} />
        </>
      )}

      {/* Category Tabs */}
      <div style={{
        position: 'absolute',
        top: '10px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        display: 'flex',
        backgroundColor: 'var(--layera-bg-primary)',
        borderRadius: '8px',
        border: '1px solid var(--layera-border-primary)',
        overflow: 'hidden'
      }}>
        <Button
          onClick={() => setActiveCategory('real_estate')}
          variant={activeCategory === 'real_estate' ? 'primary' : 'ghost'}
          size="sm"
          icon={<HomeIcon size="sm" theme="neutral" />}
        >
          {t('realEstate')}
        </Button>
        <Button
          onClick={() => setActiveCategory('jobs')}
          variant={activeCategory === 'jobs' ? 'primary' : 'ghost'}
          size="sm"
          icon={<BriefcaseIcon size="sm" theme="neutral" />}
        >
          {t('job')}
        </Button>
      </div>

      {/* Drawing Toolbar - Responsive για κάθε device */}
      <div style={{
        position: 'absolute',
        top: isMobile ? '60px' : '10px',
        left: '10px',
        zIndex: 1000,
        display: 'flex',
        gap: isMobile ? '0.25rem' : '0.5rem',
        flexWrap: 'wrap',
        maxWidth: isMobile ? '90vw' : 'auto'
      }}>
        <Button
          onClick={() => startDrawing('marker')}
          disabled={activeDrawingMode === 'marker'}
          variant={activeDrawingMode === 'marker' ? 'success' : 'secondary'}
          size={isMobile ? 'xs' : 'sm'}
          icon={<MarkerIcon size="sm" theme="neutral" />}
        >
          {t('marker')}
        </Button>

        <Button
          onClick={() => startDrawing('polygon')}
          disabled={activeDrawingMode === 'polygon'}
          variant={activeDrawingMode === 'polygon' ? 'primary' : 'secondary'}
          size={isMobile ? 'xs' : 'sm'}
          icon={<PolygonIcon size="sm" theme="neutral" />}
        >
          {t('polygon')}
        </Button>

        {activeDrawingMode === 'polygon' && polygonPoints.current.length >= 3 && (
          <Button
            onClick={finishPolygon}
            variant="warning"
            size="sm"
            icon={<CheckIcon size="sm" theme="neutral" />}
          >
            {t('finish')}
          </Button>
        )}

        <Button
          onClick={clearAll}
          variant="danger"
          size="sm"
          icon={<TrashIcon size="sm" theme="neutral" />}
        >
          {t('clear')}
        </Button>
      </div>

      {/* Status Info */}
      {activeDrawingMode !== 'none' && (
        <div style={{
          position: 'absolute',
          top: '60px',
          left: '10px',
          zIndex: 1000,
          backgroundColor: 'color-mix(in srgb, var(--layera-bg-secondary) 90%, transparent 10%)',
          color: 'var(--layera-text-primary)',
          padding: '0.5rem 1rem',
          borderRadius: '6px',
          fontSize: '0.875rem'
        }}>
          {activeDrawingMode === 'marker' && (<><MarkerIcon size="sm" theme="neutral" /> {t('clickOnMap')}</>)}
          {activeDrawingMode === 'polygon' && (
            <>
              <PolygonIcon size="sm" theme="neutral" /> {t('clickToAddPoints')} ({polygonPoints.current.length}/3+ {t('pointsCount')})
              {polygonPoints.current.length >= 3 && <br />}
              {polygonPoints.current.length >= 3 && (<><CheckIcon size="sm" theme="neutral" /> {t('finishPolygon')}</>)}
            </>
          )}
        </div>
      )}

      {/* Map Container */}
      <div
        id="geo-map"
        style={{
          position: 'absolute',
          top: 0,
          left: `${RULER_SIZE}px`,
          bottom: `${RULER_SIZE}px`,
          right: 0,
          backgroundColor: 'var(--layera-bg-tertiary)',
          overflow: 'hidden',
          zIndex: 1
        }}
      >
      </div>

      {/* Areas List */}
      {drawnAreas.length > 0 && (
        <div style={{
          position: 'absolute',
          bottom: '10px',
          right: '10px',
          zIndex: 1000,
          backgroundColor: 'color-mix(in srgb, var(--layera-bg-primary) 95%, transparent 5%)',
          padding: '1rem',
          borderRadius: '8px',
          border: '1px solid var(--layera-border-secondary)',
          maxWidth: '300px',
          maxHeight: '200px',
          overflow: 'auto'
        }}>
          <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem' }}>{t('createdAreas')}</h4>
          {drawnAreas.map(area => (
            <div key={area.id} style={{
              fontSize: '0.75rem',
              marginBottom: '0.5rem',
              padding: '0.5rem',
              backgroundColor: area.category === 'real_estate' ? 'var(--layera-bg-warning)' : 'var(--layera-bg-info)',
              borderRadius: '4px',
              border: `1px solid ${area.category === 'real_estate' ? 'var(--layera-bg-warning)' : 'var(--layera-bg-info)'}`
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <span>{area.category === 'real_estate' ? <HomeIcon size="xs" theme="neutral" /> : <BriefcaseIcon size="xs" theme="neutral" />}</span>
                <strong>{getAreaName(area)}</strong>
                <span style={{ color: 'var(--layera-text-secondary)' }}>({area.type})</span>
              </div>

              {area.area && <div>{t('area')}: {Math.round(area.area).toLocaleString()} m²</div>}

              {area.metadata && (
                <div style={{ marginTop: '0.25rem', fontSize: '0.7rem', color: 'var(--layera-text-secondary)' }}>
                  {area.category === 'real_estate' ? (
                    <>
                      {area.metadata.price && <div>💰 {area.metadata.price.toLocaleString()}€</div>}
                      {area.metadata.squareMeters && <div>📐 {area.metadata.squareMeters}m²</div>}
                      {area.metadata.rooms && <div><HomeIcon size="xs" theme="neutral" /> {area.metadata.rooms} {t('roomsUnit')}</div>}
                    </>
                  ) : (
                    <>
                      {area.metadata.salary && <div>💰 {area.metadata.salary.toLocaleString()}€</div>}
                      {area.metadata.workingHours && <div>🕒 {area.metadata.workingHours}</div>}
                      {area.metadata.company && <div><BriefcaseIcon size="xs" theme="neutral" /> {area.metadata.company}</div>}
                    </>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Category Form Modal */}
      {showCategoryForm && tempAreaData && <CategoryForm />}

      {/* Device Controls - Εμφανίζονται στην επικεφαλίδα για testing */}
      <DeviceSwitcher
        position="top-center"
        labels={{
          auto: t('auto'),
          mobile: t('mobile'),
          tablet: t('tablet'),
          desktop: t('desktop'),
          overrideActive: t('overrideActive')
        }}
      />
      <ViewportDebugger position="top-right" compact={isMobile} />
    </div>
  );
};

export default GeoMap;
export type { DrawnArea };