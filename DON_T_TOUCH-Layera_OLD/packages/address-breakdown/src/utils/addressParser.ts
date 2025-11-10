/**
 * Address parsing utilities που χρησιμοποιούν το @layera/geocoding
 */

// Temporarily inline GeocodeResult to avoid build dependency issues
interface Coordinates {
  latitude: number;
  longitude: number;
}

interface Address {
  street?: string;
  houseNumber?: string;
  postalCode?: string;
  city?: string;
  region?: string;
  country?: string;
}

interface GeocodeResult {
  id: string;
  displayName: string;
  coordinates: Coordinates;
  accuracy: string;
  address: Address;
}
import type { AddressComponent } from '../types';

/**
 * Parse ένα GeocodeResult σε clickable AddressComponents
 * Χρησιμοποιεί τα parsed fields από το geocoding αντί να κάνει custom parsing
 */
export function parseGeocodeToComponents(result: GeocodeResult): AddressComponent[] {
  const components: AddressComponent[] = [];
  let index = 0;

  // Street & House Number
  if (result.address.street && result.address.houseNumber) {
    components.push({
      id: `street-${index++}`,
      label: `${result.address.street} ${result.address.houseNumber}`,
      type: 'street',
      clickable: false, // Streets δεν έχουν boundaries
      value: `${result.address.street} ${result.address.houseNumber}`,
      className: 'address-street'
    });
  } else if (result.address.street) {
    components.push({
      id: `street-${index++}`,
      label: result.address.street,
      type: 'street',
      clickable: false,
      value: result.address.street,
      className: 'address-street'
    });
  }

  // Postal Code
  if (result.address.postalCode) {
    components.push({
      id: `postal-${index++}`,
      label: result.address.postalCode,
      type: 'postalCode',
      clickable: false, // Postal codes δεν έχουν boundaries
      value: result.address.postalCode,
      className: 'address-postal'
    });
  }

  // City (clickable για boundary)
  if (result.address.city) {
    components.push({
      id: `city-${index++}`,
      label: result.address.city,
      type: 'city',
      clickable: true, // Cities έχουν administrative boundaries
      value: result.address.city,
      className: 'address-city'
    });
  }

  // Region/Δήμος (clickable για boundary)
  if (result.address.region) {
    components.push({
      id: `region-${index++}`,
      label: result.address.region,
      type: 'region',
      clickable: true, // Regions έχουν administrative boundaries
      value: result.address.region,
      className: 'address-region'
    });
  }

  // Country
  if (result.address.country) {
    components.push({
      id: `country-${index++}`,
      label: result.address.country,
      type: 'country',
      clickable: true, // Countries έχουν boundaries
      value: result.address.country,
      className: 'address-country'
    });
  }

  return components;
}

/**
 * Parse το displayName σε επιπλέον components που δεν υπάρχουν στο parsed address
 * Useful για περιπτώσεις όπως "Μητροπολιτική Ενότητα Θεσσαλονίκης" που δεν είναι στο address object
 */
export function parseDisplayNameToAdditionalComponents(
  result: GeocodeResult,
  existingComponents: AddressComponent[]
): AddressComponent[] {
  const displayName = result.displayName;
  const additionalComponents: AddressComponent[] = [];

  // Τμήματα του displayName που δεν υπάρχουν ήδη στα components
  const existingValues = new Set(existingComponents.map(c => c.value?.toLowerCase()));

  // Split by comma και καθαρισμός
  const parts = displayName.split(',').map((part: string) => part.trim());

  let index = existingComponents.length;

  for (const part of parts) {
    // Skip αν υπάρχει ήδη
    if (existingValues.has(part.toLowerCase())) {
      continue;
    }

    // Skip αν είναι μόνο αριθμός (house number)
    if (/^\d+$/.test(part)) {
      continue;
    }

    // Skip αν είναι μόνο postal code
    if (/^\d{5}$/.test(part)) {
      continue;
    }

      // UNIVERSAL APPROACH: Κάνουμε clickable ΟΛΑ εκτός από:
    // - Αριθμούς μόνο (house numbers)
    // - Postal codes
    // - Πολύ μικρά strings (<=2 χαρακτήρες)
    // Το σύστημα θα ελέγξει ΔΥΝΑΜΙΚΑ αν υπάρχουν boundaries
    const isNotClickable =
      /^\d+$/.test(part) || // Μόνο αριθμοί
      /^\d{3,5}(-\d{4})?$/.test(part) || // Postal codes
      part.length <= 2; // Πολύ μικρά strings

    additionalComponents.push({
      id: `additional-${index++}`,
      label: part,
      type: 'custom',
      clickable: !isNotClickable, // Όλα clickable εκτός από τις εξαιρέσεις
      value: part,
      className: 'address-component'
    });
  }

  return additionalComponents;
}

/**
 * Ιεραρχική ταξινόμηση administrative διαιρέσεων - από μικρό προς μεγάλο
 */
function getAdministrativeHierarchy(label: string): number {
  const lowerLabel = label.toLowerCase();

  // Αναγνώριση τύπου διοικητικής διαίρεσης με pattern matching
  if (lowerLabel.includes('οδός') || lowerLabel.includes('οδό') || lowerLabel.includes('λεωφόρος')) return 1;
  if (lowerLabel.includes('συνοικία') || lowerLabel.includes('γειτονιά')) return 2;
  if (lowerLabel.includes('χωριό') || lowerLabel.includes('κωμόπολη')) return 3;
  if (lowerLabel.includes('πόλη') || lowerLabel.includes('δήμος') || lowerLabel.includes('δημότητα')) return 4;
  if (lowerLabel.includes('νομός') || lowerLabel.includes('επαρχία')) return 5;
  if (lowerLabel.includes('περιφέρεια') || lowerLabel.includes('μακεδονία') || lowerLabel.includes('θράκη') || lowerLabel.includes('θεσσαλονίκη')) return 6;
  if (lowerLabel.includes('ελλάδα') || lowerLabel.includes('greece')) return 7;

  // Default για άγνωστους τύπους - στη μέση
  return 5;
}

/**
 * Combine parsed address components με additional components από το displayName
 * ΙΕΡΑΡΧΙΚΗ ΤΑΞΙΝΟΜΗΣΗ: Από μικρότερο προς μεγαλύτερο
 */
export function parseFullAddress(result: GeocodeResult): AddressComponent[] {
  const baseComponents = parseGeocodeToComponents(result);
  const additionalComponents = parseDisplayNameToAdditionalComponents(result, baseComponents);

  // Combine όλα τα components
  const allComponents = [...baseComponents, ...additionalComponents];

  // ΙΕΡΑΡΧΙΚΗ ΤΑΞΙΝΟΜΗΣΗ - μικρό προς μεγάλο
  return allComponents.sort((a, b) => {
    // Πρώτα non-clickable (οδοί, postal codes)
    if (!a.clickable && b.clickable) return -1;
    if (a.clickable && !b.clickable) return 1;

    // Μετά ιεραρχική ταξινόμηση για clickable components
    if (a.clickable && b.clickable) {
      const hierarchyA = getAdministrativeHierarchy(a.label);
      const hierarchyB = getAdministrativeHierarchy(b.label);
      return hierarchyA - hierarchyB; // Από μικρό προς μεγάλο
    }

    // Fallback - type priority για non-clickable
    const typePriority = {
      'street': 1,
      'houseNumber': 2,
      'postalCode': 3,
      'city': 4,
      'region': 5,
      'custom': 6,
      'country': 7
    };

    return (typePriority[a.type] || 999) - (typePriority[b.type] || 999);
  });
}