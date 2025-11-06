import React, { useEffect, useRef } from 'react';
import { SPACING_SCALE, BORDER_RADIUS_SCALE, getCardOrangeColor } from '@layera/constants';

const SimpleMap: React.FC = () => {
  const mapInitialized = useRef(false);

  useEffect(() => {
    if (mapInitialized.current) return;
    // Δοκιμάζουμε να φορτώσουμε το Leaflet CSS
    const loadLeafletCSS = (): void => {
      if (!document.querySelector('link[href*="leaflet.css"]')) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
        link.crossOrigin = '';
        document.head.appendChild(link);
      }
    };

    loadLeafletCSS();

    // Δοκιμάζουμε να φορτώσουμε το Leaflet μόνο αν υπάρχει
    const initMap = async () => {
      try {
        // Δυναμική εισαγωγή του Leaflet
        const L = await import('leaflet');
        const mapContainer = document.getElementById('simple-map');
        if (mapContainer && L.default && !mapInitialized.current) {
          // Καθαρίζουμε το container πρώτα
          mapContainer.innerHTML = '';

          const map = L.default.map('simple-map').setView([37.9755, 23.7348], 13);

          L.default.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
          }).addTo(map);

          mapInitialized.current = true;
        }
      } catch (error) {
        console.error('Error loading Leaflet:', error);
      }
    };

    // Περιμένουμε λίγο για να φορτωθεί το CSS
    setTimeout(initMap, 1000);

    return () => {
      // Cleanup function
      mapInitialized.current = false;
    };
  }, []);

  return (
    <div style={{ height: SPACING_SCALE.FULL, width: SPACING_SCALE.FULL }}>
      <div
        id="simple-map"
        style={{
          height: `${SPACING_SCALE.CONTAINER_SM}px`,
          width: SPACING_SCALE.FULL,
          backgroundColor: getCardOrangeColor(), // 🔴 SST: Map background από μοναδική πηγή αλήθειας
          border: '1px solid var(--la-border-primary)',
          borderRadius: `${BORDER_RADIUS_SCALE.SM}px`
        }}
      >
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: SPACING_SCALE.FULL,
          color: 'var(--la-text-secondary)'
        }}>
          🗺️ Loading Map...
        </div>
      </div>
    </div>
  );
};

export default SimpleMap;