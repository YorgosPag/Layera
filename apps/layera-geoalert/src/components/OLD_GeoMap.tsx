// RESTORED - ORIGINAL MONOLITHIC GEOMAP WITH ALL UI ELEMENTS
import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import L from 'leaflet';
import { useLayeraTranslation } from '@layera/tolgee';
import { Button } from '@layera/buttons';
import {
  ViewportDebugger,
  useViewportWithOverride,
  MobileOnly,
  TabletOnly,
  DesktopOnly
} from '@layera/viewport';
import { HomeIcon, BriefcaseIcon, MarkerIcon, PolygonIcon, CheckIcon, TrashIcon, RulerIcon, PlusIcon } from './icons/LayeraIcons';
import LatitudeRuler from './rulers/LatitudeRuler';
import LongitudeRuler from './rulers/LongitudeRuler';
import { RULER_SIZE, RULER_BG } from './utils/rulerUtils';
import { UnifiedPipelineContent } from '../../../../packages/pipelines/unified/UnifiedPipelineContent';
import { MobileGeoMap } from './device-specific/mobile/MobileGeoMap';
import {
  GeoMap as iPhone14ProMaxGeoMap,
  FloatingStepper as iPhone14ProMaxFloatingStepper,
  CategoryStep as iPhone14ProMaxCategoryStep
} from './device-specific/mobile/iphone-14-pro-max';
import { DesktopGeoMap } from './device-specific/DesktopGeoMap';
import { TabletGeoMap } from './device-specific/TabletGeoMap';

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
  setView(center: [number, number], zoom: number): void;
  getCenter(): { lat: number; lng: number };
  getZoom(): number;
  fitBounds(bounds: [[number, number], [number, number]]): void;
  addLayer(layer: LeafletLayer): void;
  closePopup(): void;
  addControl(control: unknown): void;
  removeControl(control: unknown): void;
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
  onNewEntryClick?: () => void;
  showUnifiedPipeline?: boolean;
  onCloseUnifiedPipeline?: () => void;
  onSubmitUnifiedPipeline?: (data: any) => Promise<void>;
  isIPhone14ProMaxDevice?: boolean;
  onCategoryElementsChange?: (show: boolean) => void;
}

/**
 * ΣΩΣΤΗ Address type για hierarchical popup formatting (από diavase_2.md)
 */
type Addr = {
  street?: string; houseNumber?: string; postalCode?: string;
  suburb?: string; neighbourhood?: string; quarter?: string; hamlet?: string;
  village?: string; town?: string; city?: string; municipality?: string;
  county?: string; state?: string; region?: string; state_district?: string;
  country?: string;
};

/**
 * ΔΙΟΡΘΩΜΕΝΟ normalizeAddr - Χρησιμοποιεί σωστά κλειδιά από Nominatim
 */
const normalizeAddr = (r: any): Addr => {
  const a = r?.address ?? {};
  return {
    street: a.street || a.road,
    houseNumber: a.houseNumber || a.house_number,
    postalCode: a.postalCode || a.postcode,
    suburb: a.suburb, neighbourhood: a.neighbourhood, quarter: a.quarter, hamlet: a.hamlet,
    village: a.village, town: a.town,
    city: a.city, municipality: a.municipality,
    county: a.county,
    state: a.state,                // Περιφέρεια
    region: a.region,              // Αποκεντρωμένη (ή fallback παρακάτω)
    state_district: a.state_district,
    country: a.country
  };
};

/**
 * ΔΙΟΡΘΩΜΕΝΟ dedup με ισότητα μόνο (όχι substring)
 */
const dedupExact = (xs: (string|undefined)[]) => {
  const out: string[] = [];
  for (const v of xs) {
    if (!v) continue;
    const k = v.trim().toLowerCase();
    if (!out.some(y => y.trim().toLowerCase() === k)) out.push(v);
  }
  return out;
};

/**
 * ΔΙΟΡΘΩΜΕΝΟ labels με έλεγχο διπλής ετικέτας
 */
const label = (title: string, v?: string) =>
  v ? (/^\s*[^:]*\s/.test(v) && v.includes(title) ? v : `${title} ${v}`) : undefined;

/**
 * ΔΙΟΡΘΩΜΕΝΟ formatHierarchyGR αντί formatPopup
 */
const formatHierarchyGR = (a: Addr) => {
  const first = [a.street && a.houseNumber ? `${a.street} ${a.houseNumber}` : a.street, a.postalCode]
    .filter(Boolean).join(', ');

  const community = a.suburb || a.neighbourhood || a.quarter || a.hamlet;
  const muniUnit  = a.village || a.town;
  const municipality = a.city || a.municipality;
  const regionPerifereia = a.state; // Περιφέρεια
  const decentralized = a.region || a.state_district; // Αποκεντρωμένη

  const lines = dedupExact([
    first,
    label('Κοινότητα', community),
    label('Δημοτική Ενότητα', muniUnit),
    label('Δήμος', municipality),
    label('Μητροπολιτική Ενότητα', a.county),
    label('Περιφέρεια', regionPerifereia),
    label('Αποκεντρωμένη Διοίκηση', decentralized),
    a.country
  ]);

  const body = lines.map(l => `<div style="margin:2px 0">${l}</div>`).join('');
  return `<div style="text-align:left;padding:12px;color:#059669">
           <div style="margin-bottom:8px"><small style="color:#6b7280">Διοικητική Ιεραρχία</small></div>
           ${body}
         </div>`;
};

/**
 * ΔΙΟΡΘΩΜΕΝΟ formatBoundary για admin boundaries
 */
const formatBoundary = (p: any) => {
  const name = p?.name;
  const lvl = String(p?.admin_level || '');
  const title =
    lvl==='2' ? 'Χώρα' :
    lvl==='3' ? 'Αποκεντρωμένη Διοίκηση' :
    lvl==='4' ? 'Περιφέρεια' :
    (lvl==='5'||lvl==='6') ? 'Μητροπολιτική Ενότητα' :
    (lvl==='7'||lvl==='9'||lvl==='10') ? 'Δημοτική Ενότητα' :
    lvl==='8' ? 'Δήμος' : 'Διοικητικό';
  return `<div style="text-align:left;padding:12px;color:#059669">
            <div style="margin-bottom:8px"><small style="color:#6b7280">${title}</small></div>
            <div>${name ?? ''}</div>
          </div>`;
};

// iPhone 14 Pro Max Detection
const isIPhone14ProMax = (): boolean => {
  const userAgent = navigator.userAgent;
  const isIPhone = /iPhone/i.test(userAgent);

  // iPhone 14 Pro Max specific detection
  // Screen resolution: 1290 x 2796 (6.7 inch)
  const screenHeight = window.screen.height;
  const screenWidth = window.screen.width;
  const devicePixelRatio = window.devicePixelRatio;

  // iPhone 14 Pro Max characteristics
  const isProMaxResolution = (
    (screenHeight === 2796 && screenWidth === 1290) ||
    (screenHeight === 1290 && screenWidth === 2796) ||
    (screenHeight === 932 && screenWidth === 430) // Logical pixels
  );

  return isIPhone && isProMaxResolution && devicePixelRatio >= 3;
};

const GeoMap: React.FC<GeoMapProps> = ({
  onAreaCreated,
  onNewEntryClick,
  showUnifiedPipeline,
  onCloseUnifiedPipeline,
  onSubmitUnifiedPipeline,
  isIPhone14ProMaxDevice = false,
  onCategoryElementsChange
}) => {
  const { t } = useLayeraTranslation();
  const { deviceType, isMobile, isTablet, isDesktop } = useViewportWithOverride();
  const mapInitialized = useRef(false);
  const mapRef = useRef<LeafletMap | null>(null);
  const leafletRef = useRef<typeof import('leaflet') | null>(null); // Store Leaflet reference
  const isComponentMounted = useRef(true); // Ref για να το βλέπουν οι event handlers
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

  // Device detection πλέον γίνεται από το App.tsx και περνάει ως prop

  // Rulers απενεργοποιημένοι για iPhone 14 Pro Max
  const [showRulers, setShowRulers] = useState(!isIPhone14ProMaxDevice);
  // iPhone 14 Pro Max category elements - αρχικά κρυμμένα
  const [showCategoryElements, setShowCategoryElements] = useState(false);
  // iPhone 14 Pro Max pipeline step management
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [currentStepId, setCurrentStepId] = useState('category');
  // ViewportFrame FAB logic από diavase_3.md
  const frameRef = useRef<HTMLDivElement | null>(null);
  const [fabPos, setFabPos] = useState({ x: 15, y: 15 }); // left/top
  const startRef = useRef<{x:number;y:number;px:number;py:number} | null>(null);

  const BTN_SIZE = 56;
  const MARGIN = 15;

  // iPhone 14 Pro Max pipeline navigation functions
  const steps = [
    { id: 'category', title: 'Κατηγορία' },
    { id: 'transactionType', title: 'Τύπος Συναλλαγής' },
    { id: 'location', title: 'Τοποθεσία' },
    { id: 'details', title: 'Λεπτομέρειες' },
    { id: 'availability', title: 'Διαθεσιμότητα' },
    { id: 'layout', title: 'Κάτοψη' },
    { id: 'complete', title: 'Ολοκλήρωση' }
  ];

  const handleStepNext = () => {
    if (currentStepIndex < steps.length - 1) {
      const nextIndex = currentStepIndex + 1;
      setCurrentStepIndex(nextIndex);
      setCurrentStepId(steps[nextIndex].id);
      console.log('🔄 Step next:', steps[nextIndex]);
    }
  };

  const handleStepPrevious = () => {
    if (currentStepIndex > 0) {
      const prevIndex = currentStepIndex - 1;
      setCurrentStepIndex(prevIndex);
      setCurrentStepId(steps[prevIndex].id);
      console.log('🔄 Step previous:', steps[prevIndex]);
    }
  };

  const handleStepReset = () => {
    setCurrentStepIndex(0);
    setCurrentStepId('category');
    setShowCategoryElements(false);
    onCategoryElementsChange?.(false);
    console.log('🔄 Step reset to beginning');
  };

  // Custom handler για το πράσινο κουμπί - διαφορετική συμπεριφορά για iPhone 14 Pro Max
  const handleNewEntryClick = () => {
    if (isIPhone14ProMaxDevice) {
      // Για iPhone: εμφάνιση των category elements
      const newState = !showCategoryElements;
      setShowCategoryElements(newState);
      // Ειδοποίηση του parent component
      onCategoryElementsChange?.(newState);
    } else {
      // Για άλλες συσκευές: κανονική συμπεριφορά
      onNewEntryClick?.();
    }
  };

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

  // re-clamp on viewport changes (iOS bars, keyboard) - από diavase_3.md
  useEffect(() => {
    const clamp = () => {
      // Αναζήτηση του ViewportFrame
      const frame = document.getElementById('geo-viewport') || document.querySelector('[data-viewport-frame]');
      if (!frame) return;

      frameRef.current = frame as HTMLDivElement;
      const rect = frame.getBoundingClientRect();

      // Σιγουρεύουμε ότι τα όρια είναι σωστά
      const maxX = Math.max(0, rect.width - BTN_SIZE - MARGIN);
      const maxY = Math.max(0, rect.height - BTN_SIZE - MARGIN);

      const x = Math.max(MARGIN, Math.min(maxX, fabPos.x));
      const y = Math.max(MARGIN, Math.min(maxY, fabPos.y));

      if (x !== fabPos.x || y !== fabPos.y) {
        setFabPos({ x, y });
      }
    };

    const visualViewport = (window as any).visualViewport;
    window.addEventListener('resize', clamp);
    visualViewport?.addEventListener('resize', clamp);
    visualViewport?.addEventListener('scroll', clamp);

    // Αρχική κλήση clamp με κάποια καθυστέρηση
    setTimeout(clamp, 100);

    return () => {
      window.removeEventListener('resize', clamp);
      visualViewport?.removeEventListener('resize', clamp);
      visualViewport?.removeEventListener('scroll', clamp);
    };
  }, [fabPos.x, fabPos.y]);

  // Νέος FAB drag handler από diavase_3.md
  const handleFabPointerDown = (e: React.PointerEvent) => {
    // Αναζήτηση του ViewportFrame
    const frame = document.getElementById('geo-viewport') || document.querySelector('[data-viewport-frame]');
    if (!frame) return;

    frameRef.current = frame as HTMLDivElement;
    const rect = frame.getBoundingClientRect();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    startRef.current = { x: e.clientX, y: e.clientY, px: fabPos.x, py: fabPos.y };

    const onMove = (ev: PointerEvent) => {
      if (!startRef.current || !rect) return;
      const dx = ev.clientX - startRef.current.x;
      const dy = ev.clientY - startRef.current.y;

      // Σιγουρεύουμε ότι τα όρια είναι σωστά
      const maxX = Math.max(0, rect.width - BTN_SIZE - MARGIN);
      const maxY = Math.max(0, rect.height - BTN_SIZE - MARGIN);

      const nx = Math.max(MARGIN, Math.min(maxX, startRef.current.px + dx));
      const ny = Math.max(MARGIN, Math.min(maxY, startRef.current.py + dy));

      setFabPos({ x: nx, y: ny });
    };

    const onUp = () => {
      startRef.current = null;
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
  };




  useEffect(() => {
    if (mapInitialized.current && mapRef.current) return;

    isComponentMounted.current = true;

    // Έχουμε το isComponentMounted ως ref τώρα

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

      if (isComponentMounted.current && mapRef.current) {
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

      if (isComponentMounted.current && mapRef.current) {
        const { latitude, longitude, zoom = 16, displayName, result } = event.detail;
        console.log('🗺️ GeoMap: Showing search result:', { latitude, longitude, displayName, result });

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

          // ΩΜΟ μήνυμα από OpenStreetMap όπως το δίνει η Nominatim
          const hierarchicalPopup = `<div style="text-align:left;padding:12px;color:#059669">
           <div style="margin-bottom:8px"><small style="color:#6b7280">Τοποθεσία</small></div>
           <div>${displayName}</div>
         </div>`;

          // Προσθέτουμε το νέο search result marker
          searchResultMarker.current = L.marker([latitude, longitude], { icon: searchResultIcon })
            .addTo(mapRef.current)
            .bindPopup(hierarchicalPopup)
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

      if (isComponentMounted.current && mapRef.current && leafletRef.current) {
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
            });

            // ΣΩΣΤΗ χρήση και για boundary (από diavase_2.md)
            const rawContent = boundary.features[0]?.properties?.name || component.label;
            console.log('📋 GeoMap: Raw content from OSM:', rawContent);

            // ΩΜΟ μήνυμα από OpenStreetMap όπως το δίνει η Nominatim
            const hierarchicalPopup = `<div style="text-align:left;padding:12px;color:#059669">
           <div style="margin-bottom:8px"><small style="color:#6b7280">Περιοχή</small></div>
           <div>${rawContent || 'Άγνωστη περιοχή'}</div>
         </div>`;

            geoJsonLayer.bindPopup(hierarchicalPopup);

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

    // Handler για floor plan εμφάνιση στον χάρτη
    const handleShowFloorPlan = (event: CustomEvent) => {
      console.log('🏗️ GeoMap: Received showFloorPlan event', event.detail);
      console.log('🏗️ GeoMap: isComponentMounted:', isComponentMounted.current);
      console.log('🏗️ GeoMap: mapRef.current:', !!mapRef.current);
      console.log('🏗️ GeoMap: leafletRef.current:', !!leafletRef.current);

      if (!event.detail) {
        console.error('🏗️ GeoMap: No event detail found');
        return;
      }

      if (isComponentMounted.current && mapRef.current && leafletRef.current) {
        const { fileUrl, fileName, fileType } = event.detail;
        const L = leafletRef.current;

        try {
          // Αφαίρεση υπάρχοντων floor plan layers
          if (mapRef.current) {
            mapRef.current.eachLayer((layer: unknown) => {
              const leafletLayer = layer as { options?: { className?: string } };
              if (leafletLayer.options?.className === 'floor-plan-overlay') {
                mapRef.current?.removeLayer(layer as never);
              }
            });
          }

          // Προσθήκη νέου floor plan overlay
          if (fileType === 'image' && fileUrl) {
            // Δημιουργία temporary image για να πάρουμε τις διαστάσεις
            const img = new Image();
            img.onload = () => {
              const imageAspectRatio = img.width / img.height;

              // Παίρνουμε το κέντρο του χάρτη
              const center = mapRef.current!.getCenter();
              const zoom = mapRef.current!.getZoom();

              // Υπολογίζουμε κατάλληλο μέγεθος που να διατηρεί το aspect ratio
              // Βασιζόμαστε σε ένα σταθερό μέγεθος σε μέτρα
              const baseWidthMeters = 100; // 100 μέτρα βάση
              const heightMeters = baseWidthMeters / imageAspectRatio;

              // Μετατροπή μέτρων σε degrees (προσεγγιστική για μικρές περιοχές)
              const metersPerDegree = 111000; // περίπου
              const latOffset = heightMeters / metersPerDegree / 2;
              const lngOffset = baseWidthMeters / metersPerDegree / Math.cos(center.lat * Math.PI / 180) / 2;

              // Δημιουργία bounds που διατηρούν το aspect ratio
              const bounds: [[number, number], [number, number]] = [
                [center.lat - latOffset, center.lng - lngOffset], // southwest
                [center.lat + latOffset, center.lng + lngOffset]  // northeast
              ];

              console.log('🎯 GeoMap: Creating image overlay with bounds:', bounds);
              console.log('🎯 GeoMap: Image dimensions:', `${img.width}x${img.height}`, 'aspect ratio:', imageAspectRatio);

              const imageOverlay = L.imageOverlay(fileUrl, bounds, {
                opacity: 1.0, // Πλήρης αδιαφάνεια
                className: 'floor-plan-overlay',
                alt: fileName
              });

              console.log('🎯 GeoMap: Adding image overlay to map...');
              imageOverlay.addTo(mapRef.current!);
              console.log('🖼️ GeoMap: Floor plan image added to map with correct aspect ratio:', fileName, `${img.width}x${img.height}`);

              // Φέρε την κάτοψη σε πρώτο πλάνο με fitBounds
              console.log('🔍 GeoMap: Zooming to floor plan bounds for close-up view on initial load');
              mapRef.current!.fitBounds(bounds, {
                padding: [20, 20], // λίγο padding γύρω από την εικόνα
                maxZoom: 18 // μέγιστο zoom για καλή ανάλυση
              });
            };
            img.src = fileUrl;
          } else {
            // Για άλλους τύπους αρχείων (PDF, DXF, DWG) - placeholder
            console.log('📄 GeoMap: Non-image floor plan uploaded:', fileName, fileType);
            // TODO: Εδώ θα προσθέσουμε support για PDF και CAD αρχεία
          }
        } catch (error) {
          console.error('❌ GeoMap: Error adding floor plan:', error);
        }
      } else {
        console.warn('⚠️ GeoMap: Cannot handle floor plan - component not mounted or map not ready');
        console.warn('⚠️ GeoMap: isComponentMounted:', isComponentMounted.current);
        console.warn('⚠️ GeoMap: mapRef.current:', !!mapRef.current);
        console.warn('⚠️ GeoMap: leafletRef.current:', !!leafletRef.current);
      }
    };

    // Handler για μετακίνηση floor plan σε νέα τοποθεσία
    const handleMoveFloorPlanToLocation = (event: CustomEvent) => {
      console.log('🎯 GeoMap: Received moveFloorPlanToLocation event', event.detail);

      if (!event.detail) {
        console.error('🎯 GeoMap: No event detail found for moveFloorPlanToLocation');
        return;
      }

      if (isComponentMounted.current && mapRef.current && leafletRef.current) {
        const { latitude, longitude, reason, displayName } = event.detail;
        const L = leafletRef.current;

        try {
          // Βρες το floor plan overlay
          let floorPlanLayer: unknown = null;
          mapRef.current.eachLayer((layer: unknown) => {
            const leafletLayer = layer as { options?: { className?: string } };
            if (leafletLayer.options?.className === 'floor-plan-overlay') {
              floorPlanLayer = layer;
            }
          });

          if (floorPlanLayer) {
            // Αφαίρεση του παλιού layer
            mapRef.current.removeLayer(floorPlanLayer as never);

            // Αν είναι image overlay, ξαναδημιούργησέ το στη νέα θέση
            const imageLayer = floorPlanLayer as { _url?: string, options?: { alt?: string, opacity?: number } };
            if (imageLayer._url) {
              // Δημιουργία temporary image για να πάρουμε τις διαστάσεις
              const img = new Image();
              img.onload = () => {
                const imageAspectRatio = img.width / img.height;

                // Υπολογίζουμε κατάλληλο μέγεθος που να διατηρεί το aspect ratio
                const baseWidthMeters = 100; // 100 μέτρα βάση
                const heightMeters = baseWidthMeters / imageAspectRatio;

                // Μετατροπή μέτρων σε degrees (προσεγγιστική για μικρές περιοχές)
                const metersPerDegree = 111000; // περίπου
                const latOffset = heightMeters / metersPerDegree / 2;
                const lngOffset = baseWidthMeters / metersPerDegree / Math.cos(latitude * Math.PI / 180) / 2;

                // Δημιουργία bounds που διατηρούν το aspect ratio στη νέα θέση
                const bounds: [[number, number], [number, number]] = [
                  [latitude - latOffset, longitude - lngOffset], // southwest
                  [latitude + latOffset, longitude + lngOffset]  // northeast
                ];

                console.log('🎯 GeoMap: Moving floor plan to new location:', { latitude, longitude, reason });
                console.log('🎯 GeoMap: New bounds:', bounds);

                const imageOverlay = L.imageOverlay(imageLayer._url, bounds, {
                  opacity: imageLayer.options?.opacity || 1.0,
                  className: 'floor-plan-overlay',
                  alt: imageLayer.options?.alt || 'Floor Plan'
                });

                imageOverlay.addTo(mapRef.current!);
                console.log('✅ GeoMap: Floor plan moved to new location:', displayName || `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);

                // Φέρε την κάτοψη σε πρώτο πλάνο με fitBounds
                console.log('🔍 GeoMap: Zooming to floor plan bounds for close-up view');
                mapRef.current!.fitBounds(bounds, {
                  padding: [20, 20], // λίγο padding γύρω από την εικόνα
                  maxZoom: 18 // μέγιστο zoom για καλή ανάλυση
                });
              };
              img.src = imageLayer._url;
            }
          } else {
            console.log('⚠️ GeoMap: No floor plan found to move');
          }
        } catch (error) {
          console.error('❌ GeoMap: Error moving floor plan:', error);
        }
      } else {
        console.warn('⚠️ GeoMap: Cannot move floor plan - component not mounted or map not ready');
      }
    };

    const initMap = async () => {
      try {
        if (!isComponentMounted.current) return;

        console.log('Starting map initialization...');

        // Wait for CSS to load first
        await loadLeafletCSS();
        if (!isComponentMounted.current) return;

        console.log('Leaflet CSS loaded');

        // Then load Leaflet library
        const L = await import('leaflet');
        if (!isComponentMounted.current) return;

        console.log('Leaflet library loaded');
        leafletRef.current = L; // Store Leaflet reference

        const mapContainer = document.getElementById('geo-map') as HTMLElement | null;
        console.log('Map container found:', !!mapContainer);

        if (!mapContainer) {
          console.error('no #geo-map element');
          return;
        }

        if (mapContainer.offsetHeight === 0) {
          console.warn('#geo-map has zero height');
          mapContainer.style.minHeight = '400px';
        }

        if (mapContainer && L && !mapInitialized.current && isComponentMounted.current) {
          // Prevent double initialization
          mapInitialized.current = true;

          // Safe cleanup of container
          try {
            mapContainer.innerHTML = '';
          } catch (e) {
            console.warn('Container cleanup warning:', e);
          }

          // Fix Leaflet icon paths
          delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
          L.Icon.Default.mergeOptions({
            iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
            iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
            shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
          });

          const map = L.map('geo-map', {
            zoomControl: false,  // Απενεργοποιούμε τα default zoom controls
          }).setView([37.9755, 23.7348], 13);

          // Προσθέτουμε custom zoom control στην πάνω δεξιά γωνία - όχι για iPhone
          if (!isIPhone14ProMaxDevice) {
            L.control.zoom({
              position: 'topright'
            }).addTo(map);
          }

          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
          }).addTo(map);

          // OpenStreetMap standard: μόνο scale bar - όχι για iPhone
          if (!isIPhone14ProMaxDevice) {
            L.control.scale({
              position: 'bottomleft',
              metric: true,
              imperial: false,
              maxWidth: 200
            }).addTo(map);
          }


          mapRef.current = map;

          // Force resize after creation
          setTimeout(() => map.invalidateSize(), 0);

          // Add CSS for floor plan overlay z-index
          const overlayStyles = document.createElement('style');
          overlayStyles.textContent = `
            .leaflet-overlay-pane { z-index: 400 !important; }
            .floor-plan-overlay { outline: 2px dashed red; }
          `;
          if (!document.querySelector('style[data-geomap-overlay]')) {
            overlayStyles.setAttribute('data-geomap-overlay', 'true');
            document.head.appendChild(overlayStyles);
          }

          // Event listeners για drawing
          map.on('click', (e: LeafletEvent) => {
            if (isComponentMounted.current) {
              handleMapClick(e, L);
            }
          });

          // Event listeners για rulers - ΕΠΑΝΑΦΟΡΑ στο main initialization
          map.on('moveend zoomend', () => {
            if (isComponentMounted.current && mapRef.current) {
              console.log('📍 BASIC Map event triggered');
              const bounds = mapRef.current.getBounds();
              const size = mapRef.current.getSize();
              setMapBounds(bounds);
              setMapSize({ width: size.x, height: size.y });
            }
          });

          // IMMEDIATE real-time updates
          map.on('move', () => {
            if (isComponentMounted.current && mapRef.current) {
              console.log('🔄 MOVE event triggered');
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
          window.addEventListener('showFloorPlan', handleShowFloorPlan as EventListener);
          window.addEventListener('moveFloorPlanToLocation', handleMoveFloorPlanToLocation as EventListener);

          // Initial bounds and size
          const bounds = map.getBounds();
          const size = map.getSize();
          setMapBounds(bounds);
          setMapSize({ width: size.x, height: size.y });
          setIsLoading(false);

          // Force a resize to ensure proper rendering
          setTimeout(() => {
            if (map && isComponentMounted.current) {
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
      isComponentMounted.current = false;
      mapInitialized.current = false;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
      clearTimeout(initTimeout);

      // Cleanup των window event listeners
      window.removeEventListener('centerMapToLocation', handleCenterMapToLocation as EventListener);
      window.removeEventListener('showSearchResult', handleShowSearchResult as EventListener);
      window.removeEventListener('showAdministrativeBoundary', handleShowAdministrativeBoundary as EventListener);
      window.removeEventListener('showFloorPlan', handleShowFloorPlan as EventListener);
      window.removeEventListener('moveFloorPlanToLocation', handleMoveFloorPlanToLocation as EventListener);

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


  // ΑΠΛΟΠΟΙΗΜΕΝΟ - Events στο main initialization μόνο


  const handleMapClick = async (e: LeafletEvent, L: typeof import('leaflet')) => {
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



  const mapOffset = showRulers && !isIPhone14ProMaxDevice ? (isMobile ? 0 : RULER_SIZE) : 0;

  return (
    <div style={{ height: '100%', width: '100%', position: 'relative', overflow: 'hidden' }}>

      {/* Canvas Rulers - Εντελώς απενεργοποιημένοι για iPhone 14 Pro Max */}
      {showRulers && !isIPhone14ProMaxDevice && !isMobile && mapBounds && mapSize && <LatitudeRuler bounds={mapBounds} mapSize={mapSize} />}
      {showRulers && !isIPhone14ProMaxDevice && !isMobile && mapBounds && mapSize && <LongitudeRuler bounds={mapBounds} mapSize={mapSize} />}

      {/* Ruler Corner - Εντελώς απενεργοποιημένο για iPhone 14 Pro Max */}
      {showRulers && !isIPhone14ProMaxDevice && !isMobile && (
        <div
          className="absolute bottom-0 left-0 z-30"
          style={{
            width: `${RULER_SIZE}px`,
            height: `${RULER_SIZE}px`,
            backgroundColor: RULER_BG,
            borderTop: `1px solid #E2E8F0`,
            borderRight: `1px solid #E2E8F0`,
          }}
        />
      )}

      {/* Category Tabs - Κρυμμένα για iPhone 14 Pro Max */}
      {!isIPhone14ProMaxDevice && <div style={{
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
      </div>}

      {/* Drawing Toolbar - Κρυμμένο για iPhone 14 Pro Max */}
      {!isIPhone14ProMaxDevice && <div style={{
        position: 'absolute',
        top: isMobile ? '10px' : '10px',
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

        {/* Κουμπί Rulers - Κρυμμένο για iPhone 14 Pro Max */}
        {!isIPhone14ProMaxDevice && (
          <Button
            onClick={() => setShowRulers(!showRulers)}
            variant={showRulers ? 'primary' : 'secondary'}
            size={isMobile ? 'xs' : 'sm'}
            icon={<RulerIcon size="sm" theme="neutral" />}
          >
            {t('rulers')}
          </Button>
        )}
      </div>}

      {/* Device-Specific UI Components */}

      {/* iPhone 14 Pro Max Components - ΧΡΗΣΗ PROP ΑΠΟ APP.TSX */}
      {isIPhone14ProMaxDevice ? (
          <>
            <div style={{
              position: 'fixed',
              top: '10px',
              right: '450px',  // Δεξιότερα, εκτός του device frame
              backgroundColor: '#10b981',  // Πράσινο
              color: 'white',
              padding: '6px 10px',
              borderRadius: '6px',
              fontSize: '11px',
              fontWeight: 'bold',
              zIndex: 9998,
              opacity: 0.9,
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}>
              📱 iPhone14ProMax Mode
            </div>


            {React.createElement(iPhone14ProMaxGeoMap)}
            {/* Category UI - εμφανίζεται μόνο όταν ενεργοποιηθεί */}
            {showCategoryElements && (
              <>
                {React.createElement(iPhone14ProMaxFloatingStepper, {
                  currentStep: "category",
                  totalSteps: 7,
                  stepIndex: 0,
                  stepTitle: "Επιλογή Κατηγορίας",
                  canGoNext: true,
                  canGoPrevious: false,
                  onReset: () => {
                    console.log('🔄 Reset clicked - hiding stepper and showing FAB');
                    setShowCategoryElements(false);
                    onCategoryElementsChange?.(false);
                  }
                })}
                {React.createElement(iPhone14ProMaxCategoryStep, {
                  onNext: (category) => console.log('Category selected:', category),
                  isVisible: true
                })}
              </>
            )}
          </>
        ) : null}

      <TabletOnly>
        <TabletGeoMap />
      </TabletOnly>

      <DesktopOnly>
        <DesktopGeoMap />
      </DesktopOnly>

      {/* Status Info - Κρυμμένο για iPhone 14 Pro Max */}
      {activeDrawingMode !== 'none' && !isIPhone14ProMaxDevice && (
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
          left: `${mapOffset}px`,
          bottom: `${showRulers && !isIPhone14ProMaxDevice ? RULER_SIZE : 0}px`,
          right: 0,
          backgroundColor: 'var(--layera-bg-tertiary)',
          overflow: 'hidden',
          zIndex: 1,
          // Normal positioning για iPhone - χωρίς external header
          ...(isIPhone14ProMaxDevice && {
            touchAction: 'pan-x pan-y'
          })
        }}
      >
      </div>

      {/* ViewportFrame Draggable FAB - από diavase_3.md */}
      {(onNewEntryClick || isIPhone14ProMaxDevice) && !showCategoryElements && (
        <div
          onPointerDown={handleFabPointerDown}
          onClick={handleNewEntryClick}
          aria-label="Νέα Καταχώρηση"
          title="Νέα Καταχώρηση"
          style={{
            position: 'absolute',
            left: `${fabPos.x}px`,
            top: `${fabPos.y}px`,
            width: BTN_SIZE,
            height: BTN_SIZE,
            borderRadius: '50%',
            background: 'var(--layera-bg-success,#22C55E)',
            border: '2px solid #fff',
            boxShadow: '0 8px 24px rgba(0,0,0,.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'grab',
            touchAction: 'none',
            userSelect: 'none',
            zIndex: 1000
          }}
        >
          <PlusIcon size="md" theme="neutral" />
        </div>
      )}

      {/* Areas List - Κρυμμένο για iPhone 14 Pro Max */}
      {drawnAreas.length > 0 && !isIPhone14ProMaxDevice && (
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

      {/* Category Form Modal - Κρυμμένο για iPhone 14 Pro Max */}
      {showCategoryForm && tempAreaData && !isIPhone14ProMaxDevice && <CategoryForm />}

      {/* Device Controls - Κρυμμένο για iPhone 14 Pro Max */}
      {!isIPhone14ProMaxDevice && <ViewportDebugger position="top-right" compact={isMobile} />}

      {/* Unified Pipeline Panel - Inline instead of modal */}
      {/* ΔΕΝ εμφανίζουμε το παλιό UnifiedPipeline αν είμαστε σε iPhone 14 Pro Max */}
      {showUnifiedPipeline && onCloseUnifiedPipeline && onSubmitUnifiedPipeline && !isIPhone14ProMaxDevice && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          zIndex: 2000,
          padding: '8px',
          overflow: 'hidden'
        }}>
          <UnifiedPipelineContent
            onClose={onCloseUnifiedPipeline}
            onSubmit={onSubmitUnifiedPipeline}
          />
        </div>
      )}

    </div>
  );
};

export default GeoMap;
export type { DrawnArea };