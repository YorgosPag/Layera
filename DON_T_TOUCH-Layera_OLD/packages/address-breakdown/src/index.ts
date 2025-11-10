/**
 * @layera/address-breakdown - LEGO System για interactive address display
 *
 * Μετατρέπει τα αποτελέσματα από @layera/geocoding σε clickable, structured display
 * με boundary visualization integration μέσω @layera/geo-drawing
 */

// Types
export type {
  AddressComponent,
  AddressBreakdownConfig,
  AddressBreakdownCardProps,
  BoundaryVisualizationEvent,
  UseAddressBreakdownReturn
} from './types';

// Components
export { AddressBreakdownCard } from './components/AddressBreakdownCard';

// Utilities
export {
  parseGeocodeToComponents,
  parseDisplayNameToAdditionalComponents,
  parseFullAddress
} from './utils/addressParser';