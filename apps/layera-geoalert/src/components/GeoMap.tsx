import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const { deviceType, isMobile, isTablet, isDesktop } = useViewportWithOverride();
  const mapInitialized = useRef(false);
  const mapRef = useRef<LeafletMap | null>(null);
  const drawingMode = useRef<'none' | 'polygon' | 'marker'>('none');
  const currentPolygon = useRef<LeafletLayer | null>(null);
  const polygonPoints = useRef<number[][]>([]);
  const [drawnAreas, setDrawnAreas] = useState<DrawnArea[]>([]);
  const [activeDrawingMode, setActiveDrawingMode] = useState<'none' | 'polygon' | 'marker'>('none');
  const [activeCategory, setActiveCategory] = useState<'real_estate' | 'jobs'>('real_estate');
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  const [tempAreaData, setTempAreaData] = useState<Partial<DrawnArea> | null>(null);
  const [mapBounds, setMapBounds] = useState<LatLngBounds | null>(null);
  const [mapSize, setMapSize] = useState({ width: 0, height: 0 });
  const [isLoading, setIsLoading] = useState(true);

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
              map.closePopup();
              map.closeTooltip();
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
      } catch (error) {
        console.warn('Map cleanup warning:', error);
        mapInitialized.current = false;
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
          name: `${activeCategory === 'real_estate' ? 'Ακίνητο' : 'Εργασία'} ${drawnAreas.length + 1}`,
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
          currentPolygon.current = L.polygon(polygonPoints.current, {
            color: 'blue',
            fillColor: 'lightblue',
            fillOpacity: 0.5
          }).addTo(mapRef.current);
        } else if (currentPolygon.current) {
          // Ενημερώνουμε το υπάρχον polygon
          currentPolygon.current.setLatLngs(polygonPoints.current);
        }

        // Αν έχουμε 3+ σημεία, μπορούμε να τελειώσουμε με double-click
        if (polygonPoints.current.length >= 3) {
          console.log('Κάντε double-click για να ολοκληρώσετε το πολύγωνο');
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
        name: `${activeCategory === 'real_estate' ? 'Περιοχή Ακινήτων' : 'Περιοχή Εργασίας'} ${drawnAreas.length + 1}`,
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
        backgroundColor: 'rgba(0,0,0,0.5)',
        zIndex: 2000,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '8px',
          maxWidth: '400px',
          width: '90%'
        }}>
          <h3>Στοιχεία {tempAreaData.category === 'real_estate' ? 'Ακινήτου' : 'Εργασίας'}</h3>

          {tempAreaData.category === 'real_estate' ? (
            <>
              <div style={{ marginBottom: '1rem' }}>
                <label>Τιμή (€):</label>
                <input
                  type="number"
                  value={formData.price || ''}
                  onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
                  style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label>Τετραγωνικά μέτρα:</label>
                <input
                  type="number"
                  value={formData.squareMeters || ''}
                  onChange={(e) => setFormData({...formData, squareMeters: Number(e.target.value)})}
                  style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}
                />
              </div>
              <div style={{ marginBottom: '1rem' }}>
                <label>Δωμάτια:</label>
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
            <button
              onClick={handleSubmit}
              style={{
                backgroundColor: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                padding: '0.75rem 1.5rem',
                cursor: 'pointer',
                flex: 1
              }}
            >
              Αποθήκευση
            </button>
            <button
              onClick={handleCancel}
              style={{
                backgroundColor: '#6b7280',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                padding: '0.75rem 1.5rem',
                cursor: 'pointer',
                flex: 1
              }}
            >
              Ακύρωση
            </button>
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
            backgroundColor: '#F7FAFC',
            borderTop: '1px solid #E2E8F0',
            borderRight: '1px solid #E2E8F0',
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
        backgroundColor: 'white',
        borderRadius: '8px',
        border: '1px solid #e2e8f0',
        overflow: 'hidden'
      }}>
        <button
          onClick={() => setActiveCategory('real_estate')}
          style={{
            backgroundColor: activeCategory === 'real_estate' ? '#2563eb' : 'white',
            color: activeCategory === 'real_estate' ? 'white' : '#2563eb',
            border: 'none',
            padding: '0.75rem 1.5rem',
            fontSize: '0.875rem',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          <HomeIcon size="sm" theme="neutral" /> Ακίνητα
        </button>
        <button
          onClick={() => setActiveCategory('jobs')}
          style={{
            backgroundColor: activeCategory === 'jobs' ? '#2563eb' : 'white',
            color: activeCategory === 'jobs' ? 'white' : '#2563eb',
            border: 'none',
            padding: '0.75rem 1.5rem',
            fontSize: '0.875rem',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          <BriefcaseIcon size="sm" theme="neutral" /> Εργασία
        </button>
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
        <button
          onClick={() => startDrawing('marker')}
          disabled={activeDrawingMode === 'marker'}
          style={{
            backgroundColor: activeDrawingMode === 'marker' ? '#059669' : '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            padding: isMobile ? '0.375rem 0.75rem' : '0.5rem 1rem',
            fontSize: isMobile ? '0.75rem' : '0.875rem',
            cursor: activeDrawingMode === 'marker' ? 'default' : 'pointer',
            opacity: activeDrawingMode === 'marker' ? 0.7 : 1
          }}
        >
          <MarkerIcon size="sm" theme="neutral" /> {t('marker')}
        </button>

        <button
          onClick={() => startDrawing('polygon')}
          disabled={activeDrawingMode === 'polygon'}
          style={{
            backgroundColor: activeDrawingMode === 'polygon' ? '#059669' : '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            padding: isMobile ? '0.375rem 0.75rem' : '0.5rem 1rem',
            fontSize: isMobile ? '0.75rem' : '0.875rem',
            cursor: activeDrawingMode === 'polygon' ? 'default' : 'pointer',
            opacity: activeDrawingMode === 'polygon' ? 0.7 : 1
          }}
        >
          <PolygonIcon size="sm" theme="neutral" /> {t('polygon')}
        </button>

        {activeDrawingMode === 'polygon' && polygonPoints.current.length >= 3 && (
          <button
            onClick={finishPolygon}
            style={{
              backgroundColor: '#f59e0b',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              padding: '0.5rem 1rem',
              fontSize: '0.875rem',
              cursor: 'pointer'
            }}
          >
            <CheckIcon size="sm" theme="neutral" /> Τέλος
          </button>
        )}

        <button
          onClick={clearAll}
          style={{
            backgroundColor: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            padding: '0.5rem 1rem',
            fontSize: '0.875rem',
            cursor: 'pointer'
          }}
        >
          <TrashIcon size="sm" theme="neutral" /> {t('clear')}
        </button>
      </div>

      {/* Status Info */}
      {activeDrawingMode !== 'none' && (
        <div style={{
          position: 'absolute',
          top: '60px',
          left: '10px',
          zIndex: 1000,
          backgroundColor: 'rgba(0,0,0,0.8)',
          color: 'white',
          padding: '0.5rem 1rem',
          borderRadius: '6px',
          fontSize: '0.875rem'
        }}>
          {activeDrawingMode === 'marker' && (<><MarkerIcon size="sm" theme="neutral" /> Κάντε κλικ στον χάρτη για να τοποθετήσετε marker</>)}
          {activeDrawingMode === 'polygon' && (
            <>
              <PolygonIcon size="sm" theme="neutral" /> Κάντε κλικ για προσθήκη σημείων ({polygonPoints.current.length}/3+ σημεία)
              {polygonPoints.current.length >= 3 && <br />}
              {polygonPoints.current.length >= 3 && (<><CheckIcon size="sm" theme="neutral" /> Κάντε κλικ στο "Τέλος" για ολοκλήρωση</>)}
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
          backgroundColor: '#e5e7eb',
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
          backgroundColor: 'rgba(255,255,255,0.95)',
          padding: '1rem',
          borderRadius: '8px',
          border: '1px solid #ccc',
          maxWidth: '300px',
          maxHeight: '200px',
          overflow: 'auto'
        }}>
          <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem' }}>Δημιουργημένες Περιοχές:</h4>
          {drawnAreas.map(area => (
            <div key={area.id} style={{
              fontSize: '0.75rem',
              marginBottom: '0.5rem',
              padding: '0.5rem',
              backgroundColor: area.category === 'real_estate' ? '#fef3c7' : '#dbeafe',
              borderRadius: '4px',
              border: `1px solid ${area.category === 'real_estate' ? '#f59e0b' : '#3b82f6'}`
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                <span>{area.category === 'real_estate' ? <HomeIcon size="xs" theme="neutral" /> : <BriefcaseIcon size="xs" theme="neutral" />}</span>
                <strong>{area.name}</strong>
                <span style={{ color: '#6b7280' }}>({area.type})</span>
              </div>

              {area.area && <div>Περιοχή: {Math.round(area.area).toLocaleString()} m²</div>}

              {area.metadata && (
                <div style={{ marginTop: '0.25rem', fontSize: '0.7rem', color: '#4b5563' }}>
                  {area.category === 'real_estate' ? (
                    <>
                      {area.metadata.price && <div>💰 {area.metadata.price.toLocaleString()}€</div>}
                      {area.metadata.squareMeters && <div>📐 {area.metadata.squareMeters}m²</div>}
                      {area.metadata.rooms && <div><HomeIcon size="xs" theme="neutral" /> {area.metadata.rooms} δωμάτια</div>}
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
      <DeviceSwitcher position="top-center" />
      <ViewportDebugger position="top-right" compact={isMobile} />
    </div>
  );
};

export default GeoMap;