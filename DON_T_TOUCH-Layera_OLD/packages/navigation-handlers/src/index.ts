/**
 * @layera/navigation-handlers - Enterprise Navigation Handlers LEGO Package
 *
 * Single source of truth για navigation behavior στο Layera ecosystem.
 * Εξαχθέν από GeoMapNew.tsx για reusability και modularity.
 */

export * from './types';
export * from './NavigationHandlersAdapter';
export * from './useNavigationHandlers';

// Convenience exports για συχνή χρήση
export { NavigationHandlersAdapter as NavigationManager } from './NavigationHandlersAdapter';
export { useSimpleNavigationHandlers as useNavHandlers } from './useNavigationHandlers';