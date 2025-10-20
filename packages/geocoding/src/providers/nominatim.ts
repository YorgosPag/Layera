/**
 * @layera/geocoding - Nominatim Provider with Advanced Features
 * Full-featured OpenStreetMap geocoding service
 */

import type {
  GeocodeRequest,
  GeocodeResponse,
  GeocodeResult,
  GeocodeProvider,
  GeocodeCoordinates,
  ReverseGeocodeOptions,
  SuggestOptions
} from '../types';

interface NominatimResponse {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  boundingbox: string[];
  lat: string;
  lon: string;
  display_name: string;
  class: string;
  type: string;
  importance: number;
  address?: {
    house_number?: string;
    road?: string;
    suburb?: string;
    city?: string;
    municipality?: string;
    village?: string;
    town?: string;
    county?: string;
    state?: string;
    postcode?: string;
    country?: string;
    country_code?: string;
  };
  geojson?: {
    type: 'Polygon' | 'MultiPolygon';
    coordinates: number[][][] | number[][][][];
  };
  extratags?: Record<string, string>;
  namedetails?: Record<string, string>;
}

const NOMINATIM_BASE_URL = 'https://nominatim.openstreetmap.org';
const NOMINATIM_SEARCH = `${NOMINATIM_BASE_URL}/search`;
const NOMINATIM_REVERSE = `${NOMINATIM_BASE_URL}/reverse`;

function mapAccuracy(osmClass: string, osmType: string, interpolated?: boolean): GeocodeResult['accuracy'] {
  if (interpolated) return 'interpolated';
  if (osmType === 'house') return 'exact';
  if (osmClass === 'highway' || osmType === 'residential') return 'street';
  if (osmClass === 'place' && (osmType === 'city' || osmType === 'town' || osmType === 'village')) {
    return 'city';
  }
  return 'region';
}

function parseNominatimResult(item: NominatimResponse): GeocodeResult {
  const coordinates: GeocodeCoordinates = {
    latitude: parseFloat(item.lat),
    longitude: parseFloat(item.lon)
  };

  const address: GeocodeResult['address'] = {};

  // Πλήρης extraction όλων των address fields
  if (item.address?.road) address.street = item.address.road;
  if (item.address?.house_number) address.houseNumber = item.address.house_number;
  if (item.address?.postcode) address.postalCode = item.address.postcode;
  if (item.address?.suburb) address.suburb = item.address.suburb;
  if (item.address?.village) address.village = item.address.village;
  if (item.address?.town) address.town = item.address.town;
  if (item.address?.county) address.county = item.address.county;

  // City priority: city -> municipality -> town -> village
  if (item.address?.city) {
    address.city = item.address.city;
  } else if (item.address?.municipality) {
    address.city = item.address.municipality;
  } else if (item.address?.town) {
    address.city = item.address.town;
  } else if (item.address?.village) {
    address.city = item.address.village;
  }

  if (item.address?.state) address.region = item.address.state;
  if (item.address?.country) address.country = item.address.country;

  const result: GeocodeResult = {
    id: `nominatim_${item.place_id}`,
    displayName: item.display_name,
    coordinates,
    accuracy: mapAccuracy(item.class, item.type),
    address,
    metadata: {
      source: 'nominatim',
      confidence: Math.min(item.importance || 0.5, 1.0),
      osmType: item.osm_type,
      osmId: item.osm_id,
      class: item.class,
      type: item.type,
      importance: item.importance,
      licence: item.licence
    }
  };

  // Add polygon geometry if available
  if (item.geojson) {
    result.geometry = item.geojson;
  }

  // Add bounding box
  if (item.boundingbox && item.boundingbox.length === 4) {
    result.boundingBox = [
      parseFloat(item.boundingbox[0] || '0'),
      parseFloat(item.boundingbox[1] || '0'),
      parseFloat(item.boundingbox[2] || '0'),
      parseFloat(item.boundingbox[3] || '0')
    ];
  }

  // Add extra tags and name details if available
  if (item.extratags) result.extraTags = item.extratags;
  if (item.namedetails) result.nameDetails = item.namedetails;

  return result;
}

/**
 * Enhanced search with structured queries support
 */
async function searchNominatim(request: GeocodeRequest): Promise<GeocodeResponse> {
  try {
    const params = new URLSearchParams({
      format: 'json',
      addressdetails: request.addressDetails !== false ? '1' : '0',
      limit: String(request.limit || 5),
      'accept-language': request.language === 'el' ? 'el,en' : 'en'
    });

    // STRUCTURED SEARCH - Νέο feature!
    if (request.structured) {
      // Use structured endpoint for better accuracy
      if (request.structured.street) params.append('street', request.structured.street);
      if (request.structured.city) params.append('city', request.structured.city);
      if (request.structured.postalcode) params.append('postalcode', request.structured.postalcode);
      if (request.structured.state) params.append('state', request.structured.state);
      if (request.structured.country) params.append('country', request.structured.country);
      if (request.structured.amenity) params.append('amenity', request.structured.amenity);

      console.log('🎯 Using STRUCTURED search:', request.structured);
    } else {
      // Free-form query
      params.append('q', request.query);
    }

    // Country restriction
    if (request.countryCode) {
      params.append('countrycodes', request.countryCode);
    }

    // VIEWBOX - Περιορισμός αναζήτησης σε συγκεκριμένη περιοχή
    if (request.viewbox) {
      params.append('viewbox', request.viewbox.join(','));
      if (request.bounded) {
        params.append('bounded', '1');
      }
    }

    // POLYGON EXTRACTION - Full boundaries!
    if (request.polygonGeoJSON) {
      params.append('polygon_geojson', '1');
    }

    // EXTRA TAGS - Επιπλέον OSM tags
    if (request.extraTags) {
      params.append('extratags', '1');
    }

    // NAME DETAILS - Ονόματα σε πολλές γλώσσες
    if (request.nameDetails) {
      params.append('namedetails', '1');
    }

    // EXCLUDE PLACES - Αποκλεισμός συγκεκριμένων place IDs
    if (request.excludePlaceIds?.length) {
      params.append('exclude_place_ids', request.excludePlaceIds.join(','));
    }

    console.log('🔍 NominatimProvider: Advanced search with params:', params.toString());

    const response = await fetch(`${NOMINATIM_SEARCH}?${params.toString()}`, {
      headers: {
        'User-Agent': 'Layera-GeoAlert/1.0 (contact@layera.com)'
      }
    });

    if (!response.ok) {
      throw new Error(`Nominatim API error: ${response.status} ${response.statusText}`);
    }

    let data: NominatimResponse[] = await response.json();

    console.log('📍 NominatimProvider: Found', data.length, 'results');

    // ADDRESS INTERPOLATION για missing addresses
    if (data.length === 0 && request.query.includes(',')) {
      console.log('🔄 No exact match. Attempting interpolation and broader search...');

      // Create user requested result with interpolation
      const userRequestedResult: NominatimResponse = {
        place_id: -1,
        licence: 'User Input',
        osm_id: -1,
        osm_type: 'interpolated',
        lat: '0',
        lon: '0',
        class: 'place',
        type: 'address',
        display_name: `❓ Αναζητήσατε: "${request.query}" (interpolated)`,
        address: {
          road: request.query.split(',')[0]?.trim() || '',
          city: request.query.split(',')[request.query.split(',').length - 2]?.trim() || '',
          country: request.query.split(',')[request.query.split(',').length - 1]?.trim() || ''
        },
        importance: 0,
        boundingbox: []
      };

      data.push(userRequestedResult);

      // Try broader search with fewer terms
      const parts = request.query.split(',');
      if (parts.length > 1) {
        const broaderQuery = parts.slice(-2).join(',').trim();
        const broaderParams = new URLSearchParams({
          q: broaderQuery,
          format: 'json',
          addressdetails: '1',
          limit: String((request.limit || 5) - 1),
          'accept-language': request.language === 'el' ? 'el,en' : 'en'
        });

        if (request.polygonGeoJSON) {
          broaderParams.append('polygon_geojson', '1');
        }

        const broaderResponse = await fetch(`${NOMINATIM_SEARCH}?${broaderParams.toString()}`, {
          headers: {
            'User-Agent': 'Layera-GeoAlert/1.0 (contact@layera.com)'
          }
        });

        if (broaderResponse.ok) {
          const broaderData: NominatimResponse[] = await broaderResponse.json();
          if (broaderData.length > 0) {
            console.log('✅ Found alternative results via interpolation');
            const alternativeResults = broaderData.map((item, index) => ({
              ...item,
              display_name: `💡 Εναλλακτικά ${index + 1}: ${item.display_name}`
            }));
            data.push(...alternativeResults);
          }
        }
      }
    }

    const results = data.map(parseNominatimResult);

    return {
      results,
      total: results.length,
      query: request.query,
      status: results.length > 0 ? 'success' : 'no_results'
    };

  } catch (error) {
    console.error('❌ NominatimProvider: Search error:', error);

    return {
      results: [],
      total: 0,
      query: request.query,
      status: 'error',
      error: error instanceof Error ? error.message : 'Άγνωστο σφάλμα αναζήτησης'
    };
  }
}

/**
 * REVERSE GEOCODING - Από συντεταγμένες σε διεύθυνση
 */
async function reverseGeocode(
  coordinates: GeocodeCoordinates,
  options?: ReverseGeocodeOptions
): Promise<GeocodeResult | null> {
  try {
    const params = new URLSearchParams({
      format: 'json',
      lat: String(coordinates.latitude),
      lon: String(coordinates.longitude),
      zoom: String(options?.zoom || 18),
      addressdetails: options?.addressDetails !== false ? '1' : '0',
      'accept-language': options?.language === 'en' ? 'en' : 'el,en'
    });

    console.log(`📍 Reverse geocoding for: ${coordinates.latitude}, ${coordinates.longitude}`);

    const response = await fetch(`${NOMINATIM_REVERSE}?${params.toString()}`, {
      headers: {
        'User-Agent': 'Layera-GeoAlert/1.0 (contact@layera.com)'
      }
    });

    if (!response.ok) {
      throw new Error(`Reverse geocoding failed: ${response.status}`);
    }

    const data: NominatimResponse = await response.json();

    if (!data || !data.place_id) {
      return null;
    }

    return parseNominatimResult(data);
  } catch (error) {
    console.error('❌ Reverse geocoding error:', error);
    return null;
  }
}

/**
 * BATCH GEOCODING - Πολλαπλές διευθύνσεις ταυτόχρονα
 */
async function batchGeocode(requests: GeocodeRequest[]): Promise<GeocodeResponse[]> {
  console.log(`🚀 Batch geocoding ${requests.length} addresses...`);

  // Process in parallel with rate limiting (max 5 concurrent)
  const batchSize = 5;
  const results: GeocodeResponse[] = [];

  for (let i = 0; i < requests.length; i += batchSize) {
    const batch = requests.slice(i, i + batchSize);
    const batchPromises = batch.map(req => searchNominatim(req));

    try {
      const batchResults = await Promise.all(batchPromises);
      results.push(...batchResults);

      // Rate limiting: wait 1 second between batches
      if (i + batchSize < requests.length) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    } catch (error) {
      console.error(`❌ Batch ${i / batchSize + 1} failed:`, error);
      // Add empty results for failed batch
      batch.forEach(() => results.push({
        results: [],
        total: 0,
        query: '',
        status: 'error',
        error: 'Batch processing failed'
      }));
    }
  }

  console.log(`✅ Batch geocoding completed: ${results.length} results`);
  return results;
}

/**
 * ADDRESS INTERPOLATION - Εκτίμηση διευθύνσεων που λείπουν
 */
async function interpolateAddress(
  street: string,
  houseNumber: string
): Promise<GeocodeResult | null> {
  console.log(`🔢 Interpolating address: ${street} ${houseNumber}`);

  // First, find the street
  const streetSearch: GeocodeRequest = {
    query: street,
    limit: 1,
    polygonGeoJSON: true,
    addressDetails: true
  };

  const streetResult = await searchNominatim(streetSearch);

  if (streetResult.results.length === 0) {
    console.log('❌ Street not found for interpolation');
    return null;
  }

  const streetData = streetResult.results[0];
  if (!streetData) {
    console.log('❌ No street data for interpolation');
    return null;
  }

  // Create interpolated result
  const interpolated: GeocodeResult = {
    ...streetData,
    id: `nominatim_interpolated_${Date.now()}`,
    displayName: `${street} ${houseNumber} (estimated)`,
    accuracy: 'interpolated',
    address: {
      ...streetData.address,
      street,
      houseNumber
    },
    metadata: {
      ...streetData.metadata,
      confidence: 0.7, // Lower confidence for interpolated
      type: 'interpolated'
    }
  };

  console.log('✅ Address interpolated successfully');
  return interpolated;
}

/**
 * AUTOCOMPLETE SUGGESTIONS - Προτάσεις κατά την πληκτρολόγηση
 */
async function getSuggestions(
  partial: string,
  options?: SuggestOptions
): Promise<string[]> {
  const searchRequest: GeocodeRequest = {
    query: partial,
    limit: options?.limit || 5
  };

  if (options?.countryCode) {
    searchRequest.countryCode = options.countryCode;
  }

  if (options?.focus) {
    // Use viewbox centered on focus point
    const offset = 0.1; // ~10km radius
    searchRequest.viewbox = [
      options.focus.longitude - offset,
      options.focus.latitude - offset,
      options.focus.longitude + offset,
      options.focus.latitude + offset
    ];
  }

  const response = await searchNominatim(searchRequest);

  // Return display names as suggestions
  return response.results.map(r => r.displayName);
}

/**
 * Enhanced Nominatim Provider with all advanced features
 */
export const nominatimProvider: GeocodeProvider = {
  name: 'nominatim',
  search: searchNominatim,
  reverse: reverseGeocode,
  batch: batchGeocode,
  interpolate: interpolateAddress,
  suggest: getSuggestions,
  isAvailable: () => typeof fetch !== 'undefined'
};