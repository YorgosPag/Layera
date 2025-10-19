/**
 * @layera/geocoding - Nominatim Provider
 * OpenStreetMap geocoding service για δωρεάν αναζήτηση διευθύνσεων
 */

import type {
  GeocodeRequest,
  GeocodeResponse,
  GeocodeResult,
  GeocodeProvider,
  GeocodeCoordinates
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
    state?: string;
    postcode?: string;
    country?: string;
    country_code?: string;
  };
}

const NOMINATIM_BASE_URL = 'https://nominatim.openstreetmap.org/search';

function mapAccuracy(osmClass: string, osmType: string): 'exact' | 'street' | 'city' | 'region' {
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

  if (item.address?.road) address.street = item.address.road;
  if (item.address?.house_number) address.houseNumber = item.address.house_number;
  if (item.address?.postcode) address.postalCode = item.address.postcode;
  if (item.address?.city) {
    address.city = item.address.city;
  } else if (item.address?.municipality) {
    address.city = item.address.municipality;
  }
  if (item.address?.state) address.region = item.address.state;
  if (item.address?.country) address.country = item.address.country;

  return {
    id: `nominatim_${item.place_id}`,
    displayName: item.display_name,
    coordinates,
    accuracy: mapAccuracy(item.class, item.type),
    address,
    metadata: {
      source: 'nominatim',
      confidence: Math.min(item.importance || 0.5, 1.0)
    }
  };
}

async function searchNominatim(request: GeocodeRequest): Promise<GeocodeResponse> {
  try {
    const params = new URLSearchParams({
      q: request.query,
      format: 'json',
      addressdetails: '1',
      limit: String(request.limit || 5),
      countrycodes: request.countryCode || 'GR',
      'accept-language': request.language === 'en' ? 'en' : 'el,en'
    });

    console.log('🔍 NominatimProvider: Searching for:', request.query);

    const response = await fetch(`${NOMINATIM_BASE_URL}?${params.toString()}`, {
      headers: {
        'User-Agent': 'Layera-GeoAlert/1.0 (contact@layera.com)'
      }
    });

    if (!response.ok) {
      throw new Error(`Nominatim API error: ${response.status} ${response.statusText}`);
    }

    const data: NominatimResponse[] = await response.json();

    console.log('📍 NominatimProvider: Found', data.length, 'results');

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

export const nominatimProvider: GeocodeProvider = {
  name: 'nominatim',
  search: searchNominatim,
  isAvailable: () => typeof fetch !== 'undefined'
};