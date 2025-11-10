/**
 * layout/types.ts - Enterprise Layout Step Types
 */

export type LayoutTool = 'positioning' | 'scale' | 'rotation' | 'dimensions';

export interface LayoutPosition {
  x: number;
  y: number;
  rotation?: number;
  scale?: number;
}

export interface LayoutDimensions {
  width: number;
  height: number;
  depth?: number;
}

export interface LayoutStepData {
  selectedTools: LayoutTool[];
  position?: LayoutPosition;
  dimensions?: LayoutDimensions;
  isComplete: boolean;
}

export interface LayoutToolOption {
  id: LayoutTool;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  isActive?: boolean;
}