import { OSMAdminCollection } from '../types';
import { processDisplayNameByCountry } from '../utils/administrativeHierarchy';

/**
 * Fetch administrative boundary for address component using Enterprise BoundaryService
 * @param addressComponent - Component με label και type
 * @returns OSM-style admin boundary collection
 */
export const fetchBoundaryByAddressComponent = async (
  addressComponent: { label: string; type: string }
): Promise<OSMAdminCollection> => {
  try {
    // Χρησιμοποιούμε Nominatim για να πάρουμε το ΠΛΗΡΕΣ POLYGON
    const searchUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(addressComponent.label)}&format=json&limit=1&polygon_geojson=1`;

    const searchResponse = await fetch(searchUrl, {
      headers: {
        'User-Agent': 'Layera-GeoAlert/1.0'
      }
    });

    if (!searchResponse.ok) {
      throw new Error(`Nominatim error: ${searchResponse.status}`);
    }

    const searchData = await searchResponse.json();

    if (searchData && searchData.length > 0) {
      const result = searchData[0];

      // Προτίμηση: Χρήση του πραγματικού polygon αν υπάρχει
      if (result.geojson) {
        return {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            properties: {
              name: result.display_name ? processDisplayNameByCountry(result.display_name) : addressComponent.label,
              admin_level: '8',
              boundary: 'administrative',
              osm_id: result.osm_id || 0,
              osm_type: result.osm_type || 'node'
            },
            geometry: result.geojson
          }]
        };
      }
      // Fallback: Χρήση bounding box αν δεν υπάρχει polygon
      else if (result.boundingbox) {
        const bbox = result.boundingbox;

        // boundingbox format: [south, north, west, east]
        const south = parseFloat(bbox[0]);
        const north = parseFloat(bbox[1]);
        const west = parseFloat(bbox[2]);
        const east = parseFloat(bbox[3]);
        return {
          type: 'FeatureCollection',
          features: [{
            type: 'Feature',
            properties: {
              name: result.display_name ? processDisplayNameByCountry(result.display_name) : addressComponent.label,
              admin_level: '8',
              boundary: 'administrative',
              osm_id: result.osm_id || 0,
              osm_type: result.osm_type || 'node'
            },
            geometry: {
              type: 'Polygon',
              coordinates: [[
                [west, north],
                [east, north],
                [east, south],
                [west, south],
                [west, north]
              ]]
            }
          }]
        };
      }
    }

    // Default Overpass query για άλλες τοποθεσίες
    const query = `
      [out:json][timeout:10];
      (
        relation["boundary"="administrative"]["name"~"${addressComponent.label}",i];
      );
      out ids;
    `;

    const response = await fetch('https://overpass-api.de/api/interpreter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `data=${encodeURIComponent(query)}`
    });

    if (!response.ok) {
      throw new Error(`Overpass API error: ${response.status}`);
    }

    const data = await response.json();

    if (data.elements && data.elements.length > 0) {
      // Επιστρέφουμε null geometry για τώρα
      // Το πραγματικό boundary χρειάζεται πιο σύνθετο query
      return {
        type: 'FeatureCollection',
        features: []
      };
    }
    return {
      type: 'FeatureCollection',
      features: []
    };

  } catch (error) {
    console.error(`🚫 OSM API error για ${addressComponent.label}:`, error);

    // Fallback to local boundary system
    return await fetchLocalBoundary(addressComponent);
  }
};

/**
 * Fallback boundary fetch using local system
 */
async function fetchLocalBoundary(
  addressComponent: { label: string; type: string }
): Promise<OSMAdminCollection> {
  // Basic query normalization
  const baseName = addressComponent.label
    .replace(/^Δήμος\s+/, '')
    .replace(/^Δημοτική\s+Ενότητα\s+/, '')
    .replace(/^Περιφέρεια\s+/, '')
    .replace(/^Περιφερειακή\s+Ενότητα\s+/, '')
    .replace(/\s+-\s+.*$/, '')
    .replace(/\s+\(.+\)$/, '')
    .trim();
  // Use existing fallback system if available
  try {
    const { findFallbackBoundary } = await import('./fallbackBoundaries');
    const searchTerms = [addressComponent.label, baseName];
    const fallbackBoundary = findFallbackBoundary(searchTerms);

    if (fallbackBoundary) {
      return fallbackBoundary as OSMAdminCollection;
    }
  } catch (fallbackError) {
    console.warn('⚠️ Fallback system not available:', fallbackError);
  }

  // Ultimate fallback: empty collection
  console.error('🚫 No boundary data available για:', addressComponent.label);
  return {
    type: 'FeatureCollection',
    features: []
  };
}

// Stub functions για compatibility
export const fetchBuildingOutlines = async () => ({ type: 'FeatureCollection', features: [] });
export const fetchAdministrativeBoundary = async () => ({ type: 'FeatureCollection', features: [] });
export const clearOSMCache = async () => {};
export const getCacheSize = (): number => 0;
export const isBoundsCached = (): boolean => false;
export const prefetchBuildingOutlines = async () => {};

// Types for OSM elements
interface OSMGeometry {
  lat: number;
  lon: number;
}

interface OSMElement {
  type: 'relation' | 'way' | 'node';
  geometry?: OSMGeometry[];
}

/**
 * Convert OSM geometry to GeoJSON geometry
 */
function convertOSMGeometry(element: unknown): unknown {
  const osmElement = element as OSMElement;
  if (!osmElement.geometry) return null;

  if (osmElement.type === 'relation') {
    // For relations, try to build polygon from ways
    const coordinates: number[][][] = [];

    if (osmElement.geometry && osmElement.geometry.length > 0) {
      const outerRing: number[][] = [];

      osmElement.geometry.forEach((geom: OSMGeometry) => {
        if (geom.lat && geom.lon) {
          outerRing.push([geom.lon, geom.lat]);
        }
      });

      if (outerRing.length > 2) {
        // Close the ring if needed
        const firstPoint = outerRing[0];
        const lastPoint = outerRing[outerRing.length - 1];
        if (firstPoint && lastPoint &&
            (firstPoint[0] !== lastPoint[0] || firstPoint[1] !== lastPoint[1])) {
          outerRing.push([...firstPoint]);
        }
        coordinates.push(outerRing);
      }
    }

    if (coordinates.length > 0) {
      return {
        type: 'Polygon',
        coordinates: coordinates
      };
    }
  }

  if (osmElement.type === 'way') {
    const coordinates: number[][] = [];

    if (osmElement.geometry) {
      osmElement.geometry.forEach((geom: OSMGeometry) => {
        if (geom.lat && geom.lon) {
          coordinates.push([geom.lon, geom.lat]);
        }
      });
    }

    if (coordinates.length > 2) {
      // Close the ring if needed for polygon
      const firstCoord = coordinates[0];
      const lastCoord = coordinates[coordinates.length - 1];
      if (firstCoord && lastCoord &&
          (firstCoord[0] !== lastCoord[0] || firstCoord[1] !== lastCoord[1])) {
        coordinates.push([...firstCoord]);
      }

      return {
        type: 'Polygon',
        coordinates: [coordinates]
      };
    }
  }

  return null;
}