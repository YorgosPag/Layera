/**
 * App-local vendor shims για third-party packages που δεν έχουν TypeScript declarations
 *
 * Αντιμετωπίζει TS7016 errors για @layera packages που δεν έχουν ακόμα πλήρη TypeScript support
 */

declare module '@layera/geo-drawing' {
  export interface DrawnArea {
    id: string;
    type: 'polygon' | 'marker';
    coordinates: number[][];
    name: string;
    category: string;
    area?: number;
    isVisible?: boolean;
    opacity?: number;
    metadata?: Record<string, unknown>;
  }

  export type DrawingMode = 'none' | 'polygon' | 'marker' | 'circle';

  export interface DrawingConfig {
    enablePolygon?: boolean;
    enableMarker?: boolean;
    enableCircle?: boolean;
    defaultCategory?: string;
  }

  export interface UseDrawingOptions {
    config: DrawingConfig;
    onAreaCreated?: (area: DrawnArea) => void;
    map?: any;
  }

  export interface DrawingHookResult {
    setDrawingMode: (mode: DrawingMode) => void;
    currentMode: DrawingMode;
    drawnAreas: DrawnArea[];
    clearAll: () => void;
  }

  export function useDrawing(options: UseDrawingOptions): DrawingHookResult;
}

declare module '@layera/floating-action-buttons' {
  import { ReactNode } from 'react';

  export interface FABProps {
    variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
    position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
    size?: 'sm' | 'standard' | 'lg';
    shadow?: 'none' | 'sm' | 'md' | 'lg' | 'success';
    onClick?: () => void;
    children?: ReactNode;
    className?: string;
    disabled?: boolean;
  }

  export const FAB: React.FC<FABProps>;
}