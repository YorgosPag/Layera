// Layera GeoAlert V1 - LeafletCSS Micro-Module
// Single Responsibility: Load Leaflet CSS dynamically
// Enterprise pattern: Lazy loading για performance

/**
 * Micro-module για dynamic loading του Leaflet CSS
 * Αποφεύγει blocking CSS imports στο main bundle
 */

let isLeafletCSSLoaded = false;

export const loadLeafletCSS = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Avoid duplicate loading
    if (isLeafletCSSLoaded) {
      resolve();
      return;
    }

    // Check if already loaded by another module
    const existingLink = document.querySelector('link[href*="leaflet"]');
    if (existingLink) {
      isLeafletCSSLoaded = true;
      resolve();
      return;
    }

    // Create and inject CSS link
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
    link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
    link.crossOrigin = '';

    link.onload = () => {
      isLeafletCSSLoaded = true;
      resolve();
    };

    link.onerror = () => {
      reject(new Error('Failed to load Leaflet CSS'));
    };

    document.head.appendChild(link);
  });
};

export const isLeafletCSSReady = (): boolean => isLeafletCSSLoaded;