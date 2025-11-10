/**
 * @layera/floating-action-buttons - Enterprise FAB LEGO Package
 *
 * Single source of truth για floating action buttons στο Layera ecosystem.
 * Εξαχθέν από GeoMapNew.tsx για reusability και modularity.
 */

export * from './types';
export * from './UnifiedFAB';

// Convenience re-exports για common usage patterns
export { UnifiedFAB as FAB } from './UnifiedFAB';
export { ResponsiveFAB as AutoFAB } from './UnifiedFAB';