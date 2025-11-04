import { GeoJSONFeature } from "@geo-platform/shared";
import L from 'leaflet';

// This will be the result from the initial address search
export interface GeocodingResult {
    lat: number;
    lng: number;
    displayName: string;
    structuredDisplayName: {
        main: string;
        secondary: string;
    };
    geojson?: GeoJSONFeature; // GeoJSON is optional, mainly for area searches
}

// This will be the result for each level of the hierarchy
export interface HierarchyResult {
    level: string; // e.g., 'Δήμος', 'Περιφέρεια'
    name: string;
    geojson: GeoJSONFeature; // GeoJSON is required for hierarchy items
}

const NOMINATIM_SEARCH_URL = 'https://nominatim.openstreetmap.org/search';
const NOMINATIM_REVERSE_URL = 'https://nominatim.openstreetmap.org/reverse';


/**
 * Performs a quick reverse geocode on the map's center to get a local context (city, town, etc.).
 * This context is used to make subsequent address searches more accurate.
 * @param viewbox The current map bounds.
 * @returns A promise resolving to a string with the local context (e.g., "Αθήνα"), or an empty string.
 */
const getLocalContextFromViewbox = async (viewbox: L.LatLngBounds): Promise<string> => {
    const center = viewbox.getCenter();
    const params = new URLSearchParams({
        lat: center.lat.toString(),
        lon: center.lng.toString(),
        format: 'jsonv2',
        'accept-language': 'el',
        zoom: '14', // A good zoom level for city/suburb details
    });

    try {
        const response = await fetch(`${NOMINATIM_REVERSE_URL}?${params.toString()}`);
        if (!response.ok) return '';
        const result = await response.json();
        const addr = result.address || {};
        // Return the most specific local name available, which helps narrow down searches.
        return addr.city || addr.town || addr.village || addr.suburb || addr.city_district || '';
    } catch (error) {
        console.warn("Could not fetch local context for search:", error);
        return '';
    }
};


/**
 * Geocodes an address using the Nominatim API, prioritizing results within the current map view.
 * @param address The address string to geocode.
 * @param viewbox The current map bounds to prioritize/restrict the search.
 * @returns A promise that resolves with an array of geocoding results.
 */
export const geocodeAddress = async (address: string, viewbox?: L.LatLngBounds): Promise<GeocodingResult[]> => {
    if (!address || address.trim() === '') {
        return [];
    }
    
    // Enhance the search query with local context from the current map view
    let enrichedQuery = address;
    if (viewbox) {
        const localContext = await getLocalContextFromViewbox(viewbox);
        // Append context only if it's not already in the query, to avoid duplication
        if (localContext && !address.toLowerCase().includes(localContext.toLowerCase())) {
            enrichedQuery = `${address}, ${localContext}`;
        }
    }


    const params = new URLSearchParams({
        q: enrichedQuery,
        format: 'jsonv2',
        addressdetails: '1',
        'accept-language': 'el',
        limit: '10',
        countrycodes: 'gr',
        polygon_geojson: '1',
    });

    // We no longer use viewbox directly in the search, as the enriched query is more reliable
    // and avoids the issue of excluding results that are partially outside the viewbox.

    try {
        const response = await fetch(`${NOMINATIM_SEARCH_URL}?${params.toString()}`);
        if (!response.ok) {
            throw new Error(`Nominatim API error: ${response.statusText}`);
        }
        const results = await response.json();

        if (Array.isArray(results)) {
            return results.map((result: any) => {
                const addr = result.address || {};

                // Construct the main part (street, house number, or main feature name)
                const mainName = [addr.road, addr.house_number].filter(Boolean).join(' ') || result.display_name.split(',')[0];
    
                // Construct the secondary part (area, city, postcode) for easy differentiation
                const secondaryName = [
                    addr.suburb,
                    addr.city_district,
                    addr.city || addr.town || addr.village,
                    addr.postcode
                ].filter(Boolean).join(', ');

                return {
                    lat: parseFloat(result.lat),
                    lng: parseFloat(result.lon),
                    displayName: result.display_name,
                    structuredDisplayName: {
                        main: mainName,
                        secondary: secondaryName,
                    },
                    geojson: result.geojson ? {
                        type: 'Feature',
                        geometry: result.geojson,
                        properties: { name: result.display_name }
                    } : undefined,
                };
            });
        }
        return [];
    } catch (error) {
        console.error("Error geocoding address with Nominatim:", error);
        return [];
    }
};

// A mapping from Nominatim keys to Greek administrative levels
const HIERARCHY_MAPPING: { [key: string]: string } = {
    village: 'Δημοτική Κοινότητα',
    town: 'Δημοτική Κοινότητα',
    city_district: 'Δημοτική Κοινότητα',
    suburb: 'Δημοτική Ενότητα',
    municipality: 'Δήμος',
    county: 'Περιφερειακή Ενότητα',
    state_district: 'Αποκεντρωμένη Διοίκηση',
    state: 'Περιφέρεια',
};

// The order to display the hierarchy levels
const HIERARCHY_ORDER = [
    'Δημοτική Κοινότητα',
    'Δημοτική Ενότητα',
    'Δήμος',
    'Περιφερειακή Ενότητα',
    'Περιφέρεια',
    'Αποκεντρωμένη Διοίκηση',
];


/**
 * Fetches the administrative hierarchy for a given location using Nominatim.
 * @param lat The latitude.
 * @param lng The longitude.
 * @returns A promise that resolves with an array of hierarchy results, ordered from local to broad.
 */
export const fetchAdministrativeHierarchy = async (lat: number, lng: number): Promise<HierarchyResult[]> => {
    const reverseParams = new URLSearchParams({
        lat: lat.toString(),
        lon: lng.toString(),
        format: 'jsonv2',
        addressdetails: '1',
        'accept-language': 'el',
        zoom: '10', // A zoom level that typically returns administrative boundaries
    });

    try {
        const reverseResponse = await fetch(`${NOMINATIM_REVERSE_URL}?${reverseParams.toString()}`);
        if (!reverseResponse.ok) {
            throw new Error(`Nominatim reverse API error: ${reverseResponse.statusText}`);
        }
        const reverseResult = await reverseResponse.json();
        
        const address = reverseResult.address;
        if (!address) return [];

        const foundLevels: { level: string; name: string }[] = [];
        
        // Extract all relevant levels found in the address object
        for (const key in HIERARCHY_MAPPING) {
            if (address[key]) {
                const levelName = HIERARCHY_MAPPING[key];
                // Avoid duplicates (e.g., 'village' and 'town' mapping to the same level)
                if (!foundLevels.some(l => l.name === address[key])) {
                     foundLevels.push({ level: levelName, name: address[key] });
                }
            }
        }
        
        // Fetch GeoJSON for each found administrative level
        const hierarchyPromises = foundLevels.map(async ({ level, name }) => {
             const searchParams = new URLSearchParams({
                q: name,
                format: 'jsonv2',
                polygon_geojson: '1',
                'accept-language': 'el',
                limit: '1', // We want the most relevant result for this name
            });
            const searchResponse = await fetch(`${NOMINATIM_SEARCH_URL}?${searchParams.toString()}`);
            if (!searchResponse.ok) return null;
            const searchResults = await searchResponse.json();

            if (searchResults.length > 0 && searchResults[0].geojson) {
                return {
                    level,
                    name,
                    geojson: {
                        type: 'Feature',
                        geometry: searchResults[0].geojson,
                        properties: { name }
                    }
                } as HierarchyResult;
            }
            return null;
        });

        const hierarchyWithGeoJson = (await Promise.all(hierarchyPromises)).filter(Boolean) as HierarchyResult[];
        
        // Sort the results according to the predefined order
        hierarchyWithGeoJson.sort((a, b) => {
            return HIERARCHY_ORDER.indexOf(a.level) - HIERARCHY_ORDER.indexOf(b.level);
        });

        return hierarchyWithGeoJson;

    } catch (error) {
        console.error("Error fetching administrative hierarchy:", error);
        return [];
    }
};