import { useState } from 'react';
import type { FontSizeValue, CardSizeValue, ModalSizeValue, InputSizeValue, TableSizeValue } from '../types/sizes';
import type { ModalTextAlignValue } from '../components/playground/shared/ModalTextAlignControl';

/**
 * ARXES Compliant Playground State Management Hook
 *
 * Enterprise-grade hook για διαχείριση playground state configuration:
 * - Styling config (borderWidth, fontSize, alphaEnabled)
 * - Radius config για όλα τα element types
 * - Effects config (hover, active)
 * - Size config για components
 * - Modal text alignment
 *
 * Συμμορφώνεται με LAYERA Enterprise Standards:
 * - TypeScript strict
 * - Καμία χρήση any
 * - Single Responsibility Principle
 * - React 19.1.1 compatibility
 */

// Styling Configuration Interface
export interface StylingConfig {
  borderWidth: number;
  fontSize: FontSizeValue;
  alphaEnabled: boolean;
}

// Radius Configuration Interface
export interface RadiusConfig {
  border: string;
  button: string;
  layout: string;
  card: string;
  modal: string;
  input: string;
  table: string;
  header: string;
}

// Effects Configuration Interface
export interface EffectsConfig {
  hover: string;
  active: string;
}

// Size Configuration Interface
export interface SizeConfig {
  card: CardSizeValue;
  modal: ModalSizeValue;
  input: InputSizeValue;
  table: TableSizeValue;
}

// Main Playground State Interface
export interface PlaygroundState {
  stylingConfig: StylingConfig;
  radiusConfig: RadiusConfig;
  effectsConfig: EffectsConfig;
  sizeConfig: SizeConfig;
  modalTextAlign: ModalTextAlignValue;
}

// Playground State Actions Interface
export interface PlaygroundStateActions {
  // Styling setters
  setBorderWidth: (value: number) => void;
  setFontSize: (value: FontSizeValue) => void;
  setAlphaEnabled: (value: boolean) => void;

  // Radius setters
  setBorderRadius: (value: string) => void;
  setButtonRadius: (value: string) => void;
  setLayoutRadius: (value: string) => void;
  setCardRadius: (value: string) => void;
  setModalRadius: (value: string) => void;
  setInputRadius: (value: string) => void;
  setTableRadius: (value: string) => void;
  setHeaderRadius: (value: string) => void;

  // Effects setters
  setHoverEffect: (value: string) => void;
  setActiveEffect: (value: string) => void;

  // Size setters
  setCardSize: (value: CardSizeValue) => void;
  setModalSize: (value: ModalSizeValue) => void;
  setInputSize: (value: InputSizeValue) => void;
  setTableSize: (value: TableSizeValue) => void;

  // Modal alignment setter
  setModalTextAlign: (value: ModalTextAlignValue) => void;
}

// Return type for the hook
export interface UsePlaygroundStateReturn {
  state: PlaygroundState;
  actions: PlaygroundStateActions;

  // Backward compatibility getters
  borderWidth: number;
  fontSize: FontSizeValue;
  alphaEnabled: boolean;
  borderRadius: string;
  buttonRadius: string;
  layoutRadius: string;
  cardRadius: string;
  modalRadius: string;
  inputRadius: string;
  tableRadius: string;
  headerRadius: string;
  hoverEffect: string;
  activeEffect: string;
  cardSize: CardSizeValue;
  modalSize: ModalSizeValue;
  inputSize: InputSizeValue;
  tableSize: TableSizeValue;
  modalTextAlign: ModalTextAlignValue;
}

/**
 * Hook για διαχείριση playground configuration state
 *
 * Centralized state management για όλες τις playground configurations:
 * - Styling properties (width, font, alpha)
 * - Radius settings για όλα τα components
 * - Hover και active effects
 * - Component sizes
 *
 * @returns Playground state και actions
 */
export const usePlaygroundState = (): UsePlaygroundStateReturn => {
  // ✅ UNIFIED STYLING CONFIG - multiple states → 1 object (ARXES compliant)
  const [stylingConfig, setStylingConfig] = useState<StylingConfig>({
    borderWidth: 2,
    fontSize: 'base' as FontSizeValue,
    alphaEnabled: true
  });

  // ✅ UNIFIED RADIUS CONFIG - 7 states → 1 object (ARXES compliant)
  const [radiusConfig, setRadiusConfig] = useState<RadiusConfig>({
    border: 'md',
    button: 'md',
    layout: 'md',
    card: 'md',
    modal: 'md',
    input: 'md',
    table: 'md',
    header: 'lg'
  });

  // ✅ UNIFIED EFFECTS CONFIG - 2 states → 1 object (ARXES compliant)
  const [effectsConfig, setEffectsConfig] = useState<EffectsConfig>({
    hover: 'normal',
    active: 'scale'
  });

  // ✅ UNIFIED SIZE CONFIG - 4 states → 1 object (ARXES compliant)
  const [sizeConfig, setSizeConfig] = useState<SizeConfig>({
    card: 'md' as CardSizeValue,
    modal: 'md' as ModalSizeValue,
    input: 'md' as InputSizeValue,
    table: 'md' as TableSizeValue
  });

  // Modal Text Alignment State
  const [modalTextAlign, setModalTextAlign] = useState<ModalTextAlignValue>('middle');

  // State actions
  const actions: PlaygroundStateActions = {
    // Styling setters
    setBorderWidth: (value: number) => setStylingConfig(prev => ({ ...prev, borderWidth: value })),
    setFontSize: (value: FontSizeValue) => setStylingConfig(prev => ({ ...prev, fontSize: value })),
    setAlphaEnabled: (value: boolean) => setStylingConfig(prev => ({ ...prev, alphaEnabled: value })),

    // Radius setters
    setBorderRadius: (value: string) => setRadiusConfig(prev => ({ ...prev, border: value })),
    setButtonRadius: (value: string) => setRadiusConfig(prev => ({ ...prev, button: value })),
    setLayoutRadius: (value: string) => setRadiusConfig(prev => ({ ...prev, layout: value })),
    setCardRadius: (value: string) => setRadiusConfig(prev => ({ ...prev, card: value })),
    setModalRadius: (value: string) => setRadiusConfig(prev => ({ ...prev, modal: value })),
    setInputRadius: (value: string) => setRadiusConfig(prev => ({ ...prev, input: value })),
    setTableRadius: (value: string) => setRadiusConfig(prev => ({ ...prev, table: value })),
    setHeaderRadius: (value: string) => setRadiusConfig(prev => ({ ...prev, header: value })),

    // Effects setters
    setHoverEffect: (value: string) => setEffectsConfig(prev => ({ ...prev, hover: value })),
    setActiveEffect: (value: string) => setEffectsConfig(prev => ({ ...prev, active: value })),

    // Size setters
    setCardSize: (value: CardSizeValue) => setSizeConfig(prev => ({ ...prev, card: value })),
    setModalSize: (value: ModalSizeValue) => setSizeConfig(prev => ({ ...prev, modal: value })),
    setInputSize: (value: InputSizeValue) => setSizeConfig(prev => ({ ...prev, input: value })),
    setTableSize: (value: TableSizeValue) => setSizeConfig(prev => ({ ...prev, table: value })),

    // Modal alignment setter
    setModalTextAlign
  };

  // Combined state
  const state: PlaygroundState = {
    stylingConfig,
    radiusConfig,
    effectsConfig,
    sizeConfig,
    modalTextAlign
  };

  return {
    state,
    actions,

    // Backward compatibility getters
    borderWidth: stylingConfig.borderWidth,
    fontSize: stylingConfig.fontSize,
    alphaEnabled: stylingConfig.alphaEnabled,
    borderRadius: radiusConfig.border,
    buttonRadius: radiusConfig.button,
    layoutRadius: radiusConfig.layout,
    cardRadius: radiusConfig.card,
    modalRadius: radiusConfig.modal,
    inputRadius: radiusConfig.input,
    tableRadius: radiusConfig.table,
    headerRadius: radiusConfig.header,
    hoverEffect: effectsConfig.hover,
    activeEffect: effectsConfig.active,
    cardSize: sizeConfig.card,
    modalSize: sizeConfig.modal,
    inputSize: sizeConfig.input,
    tableSize: sizeConfig.table,
    modalTextAlign
  };
};