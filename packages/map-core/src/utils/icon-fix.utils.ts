/**
 * icon-fix.utils.ts - Enterprise Leaflet Icon Fix Utility
 *
 * ARXES Compliant utility για Leaflet icon compatibility
 * - Proper TypeScript typing
 * - No any types
 * - Enterprise error handling
 */

import L from 'leaflet';

type LeafletIconPrototype = L.Icon.Default & {
  _getIconUrl?: unknown
};

export class IconFix {
  private static isApplied = false;

  /**
   * Applies the Leaflet icon fix για enterprise compatibility
   * Safe to call multiple times - includes guard against re-application
   */
  public static applyLeafletIconFix(): void {
    if (IconFix.isApplied) {
      return;
    }

    try {
      // Type-safe deletion of problematic property
      const prototype = L.Icon.Default.prototype as LeafletIconPrototype;
      delete prototype._getIconUrl;

      // Configure proper icon URLs
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png'
      });

      IconFix.isApplied = true;
    } catch (error) {
      console.error('[IconFix] Failed to apply Leaflet icon fix:', error);
    }
  }

  /**
   * Resets the fix status για testing purposes
   * @internal
   */
  public static resetForTesting(): void {
    IconFix.isApplied = false;
  }
}