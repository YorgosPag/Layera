/**
 * MapContainer.tsx - Simplified OpenStreetMap Container
 *
 * Απλοποιημένο map container που φορτώνει βασικό OpenStreetMap χάρτη
 */

import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

// Fix για Leaflet icons
const fixLeafletIcons = () => {
  delete (L.Icon.Default.prototype as L.Icon.Default & { _getIconUrl?: unknown })._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png'
  });
};

export const MapContainer: React.FC = () => {
  const mapRef = useRef<L.Map | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    // Fix Leaflet icons
    fixLeafletIcons();

    // Δημιουργία χάρτη
    const ATHENS_LAT = 37.9755;
    const ATHENS_LNG = 23.7348;
    const DEFAULT_ZOOM = 13;

    const map = L.map(containerRef.current, {
      zoomControl: false,
    }).setView([ATHENS_LAT, ATHENS_LNG], DEFAULT_ZOOM);

    // Προσθήκη OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    // Προσθήκη zoom control στο κάτω δεξιά
    L.control.zoom({
      position: 'bottomright'
    }).addTo(map);

    mapRef.current = map;

    // Cleanup function
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="layera-map-container layera-bg-surface-light"
    />
  );
};