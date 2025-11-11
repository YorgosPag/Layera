/**
 * Core layout types for the Layera Layout System
 */

export type LayoutVariant =
  | 'dashboard'
  | 'fullscreen'
  | 'fullscreen-map'
  | 'minimal'
  | 'dual-sidebar';

export type HeaderVariant = 'minimal' | 'standard' | 'rich';


export type ContainerMaxWidth = 'sm' | 'md' | 'lg' | 'xl' | 'full' | number;

export type SpacingSize = 'none' | 'sm' | 'md' | 'lg';

/**
 * UNIFIED BREAKPOINT SYSTEM - Import από @layera/viewport
 * Deprecation warning: χρησιμοποίησε BreakpointKey από @layera/viewport
 */
export type BreakpointSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/**
 * @deprecated Use BreakpointKey from @layera/viewport instead
 * Μετεγκατάσταση σε unified breakpoint system
 */
export type LegacyBreakpointSize = BreakpointSize;



