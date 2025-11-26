import { useState } from 'react';
import type { ButtonSize } from '../types/sizes';
import type { ButtonVariant } from '../components/playground/shared/types';

/**
 * Button State Management Hook
 *
 * Enterprise-grade hook για διαχείριση button configuration state
 * - Button variant (primary, secondary, κλπ.)
 * - Button size (xs, sm, md, lg, xl)
 * - Button text content
 * - Icon visibility toggle
 * - Button shape configuration
 *
 * Συμμορφώνεται με LAYERA Enterprise Standards:
 * - TypeScript strict
 * - Καμία χρήση any
 * - Single Responsibility Principle
 */

// ButtonVariant moved to shared/types.ts
// ButtonSize moved to unified size system - import from ../types/sizes
export type ButtonShape = 'rectangular' | 'square' | 'rounded';

export interface ButtonState {
  variant: ButtonVariant;
  size: ButtonSize;
  text: string;
  withIcon: boolean;
  shape: ButtonShape;
}

export interface ButtonStateActions {
  setVariant: (variant: ButtonVariant) => void;
  setSize: (size: ButtonSize) => void;
  setText: (text: string) => void;
  setWithIcon: (withIcon: boolean) => void;
  setShape: (shape: ButtonShape) => void;
  resetToDefaults: () => void;
}

export interface UseButtonStateReturn {
  state: ButtonState;
  actions: ButtonStateActions;
  variants: readonly ButtonVariant[];
  sizes: readonly ButtonSize[];
  shapes: readonly ButtonShape[];
}

const DEFAULT_BUTTON_STATE: ButtonState = {
  variant: 'secondary',
  size: 'md',
  text: 'Live Button',
  withIcon: true,
  shape: 'rectangular'
};

const BUTTON_VARIANTS: readonly ButtonVariant[] = [
  'primary', 'secondary', 'outline', 'ghost', 'danger', 'success', 'warning', 'info'
] as const;

const BUTTON_SIZES: readonly ButtonSize[] = [
  'xs', 'sm', 'md', 'lg', 'xl'
] as const;

const BUTTON_SHAPES: readonly ButtonShape[] = [
  'rectangular', 'square', 'rounded'
] as const;

/**
 * Hook για διαχείριση button state
 *
 * @returns Button state, actions και available options
 */
export const useButtonState = (): UseButtonStateReturn => {
  const [state, setState] = useState<ButtonState>(DEFAULT_BUTTON_STATE);

  const actions: ButtonStateActions = {
    setVariant: (variant: ButtonVariant) => {
      setState(prev => ({ ...prev, variant }));
    },

    setSize: (size: ButtonSize) => {
      setState(prev => ({ ...prev, size }));
    },

    setText: (text: string) => {
      setState(prev => ({ ...prev, text }));
    },

    setWithIcon: (withIcon: boolean) => {
      setState(prev => ({ ...prev, withIcon }));
    },

    setShape: (shape: ButtonShape) => {
      setState(prev => ({ ...prev, shape }));
    },

    resetToDefaults: () => {
      setState(DEFAULT_BUTTON_STATE);
    }
  };

  return {
    state,
    actions,
    variants: BUTTON_VARIANTS,
    sizes: BUTTON_SIZES,
    shapes: BUTTON_SHAPES
  };
};