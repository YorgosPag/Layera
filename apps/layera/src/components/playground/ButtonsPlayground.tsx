import React, { useState, useEffect, useRef } from 'react';
import { Box } from '@layera/layout';
import { Button, SquareButton } from '@layera/buttons';
import { Text } from '@layera/typography';
import {
  PlusIcon, SearchIcon, CheckIcon, CloseIcon, SettingsIcon, CompassIcon, CopyIcon,
  PaletteIcon, FolderIcon, EyeIcon, LocationIcon, DeleteIcon, BellIcon,
  EditIcon, LayersIcon, TagIcon, QuickIcon, LockIcon, AdvancedIcon,
  RulerIcon, PolygonIcon, StarIcon, TransitionIcon
} from '@layera/icons';
import { ButtonState } from '../../hooks/useButtonState';
import { useCSSVariables } from '../../hooks/useCSSVariables';
import { useColorState } from '../../hooks/useColorState';
import { PLAYGROUND_HELPERS } from '../../constants/ui-utilities';
import { ButtonPlaygroundProps, PlaygroundColors } from '../../types/unified-interfaces';
import type { FontSizeValue, CardSizeValue, ModalSizeValue, InputSizeValue, TableSizeValue } from '../../types/sizes';
import type { ModalTextAlignValue } from './shared/ModalTextAlignControl';
import { VariablesInfoAccordion } from './shared/VariablesInfoAccordion';
import { createButtonVariablesData } from './shared/ButtonVariablesData';
import { ColorControlsGridWithAlpha } from './ColorControlsGridWithAlpha';
import { useVariableHighlighting } from '../../hooks/useVariableHighlighting';

/**
 * ButtonsPlayground Component
 *
 * Enterprise-grade component για button testing και configuration
 * - Live preview area με διαφορετικά button shapes
 * - Controls grid για variant, size, text, icon, shape
 * - Current settings display
 * - Clean separation από main LivePlayground
 *
 * Συμμορφώνεται με LAYERA Enterprise Standards:
 * - TypeScript strict
 * - Well-defined props interface
 * - Single Responsibility Principle
 * Props interface moved to unified-interfaces.ts
 */

interface ExtendedButtonPlaygroundProps extends Omit<ButtonPlaygroundProps, 'currentColors'> {
  /** Button state από το useButtonState hook */
  buttonState: ButtonState;
  /** Current colors - μπορεί να είναι partial */
  currentColors?: Partial<PlaygroundColors>;
  /** Border width for borders category (1, 2, or 3) */
  borderWidth?: number;
  /** Button radius for styling */
  buttonRadius?: string;
  /** Hover effect for interactive elements */
  hoverEffect?: string;
  /** Active effect for interactive elements */
  activeEffect?: string;
  /** All radius settings */
  layoutRadius?: string;
  cardRadius?: string;
  modalRadius?: string;
  inputRadius?: string;
  tableRadius?: string;
  headerRadius?: string;
  /** Size settings */
  fontSize?: FontSizeValue;
  cardSize?: CardSizeValue;
  modalSize?: ModalSizeValue;
  inputSize?: InputSizeValue;
  tableSize?: TableSizeValue;
  modalTextAlign?: ModalTextAlignValue;
  /** Alpha enabled */
  alphaEnabled?: boolean;
}

export const ButtonsPlayground: React.FC<ExtendedButtonPlaygroundProps> = ({
  buttonState,
  colorCategory = 'borders',
  currentColors = {},
  borderWidth = 2,
  buttonRadius = 'md',
  hoverEffect = 'normal',
  activeEffect = 'scale',
  layoutRadius = 'md',
  cardRadius = 'md',
  modalRadius = 'md',
  inputRadius = 'md',
  tableRadius = 'md',
  headerRadius = 'lg',
  fontSize = 'base' as FontSizeValue,
  cardSize = 'md' as CardSizeValue,
  modalSize = 'md' as ModalSizeValue,
  inputSize = 'md' as InputSizeValue,
  tableSize = 'md' as TableSizeValue,
  modalTextAlign = 'center' as ModalTextAlignValue,
  alphaEnabled = true
}) => {
  // State για το Variables Info Popup
  const [showVariablesPopup, setShowVariablesPopup] = useState(false);

  // Variable highlighting hook
  const { highlightedVariable, highlightVariable } = useVariableHighlighting();

  // Συνδέσω το highlighting με τις αλλαγές στα χρώματα
  const handleColorChangeWithHighlight = (key: string, value: string) => {
    // Βασική λογική για το mapping των color keys σε CSS variables
    let cssVariable = '';
    let category = '';

    if (colorCategory === 'backgrounds') {
      cssVariable = `--layera-button-background-${key}`;
      category = `🎨 ${key.charAt(0).toUpperCase() + key.slice(1)} Φόντο`;
    } else if (colorCategory === 'borders') {
      cssVariable = `--layera-button-border-${key}`;
      category = `🔲 ${key.charAt(0).toUpperCase() + key.slice(1)} Περίγραμμα`;
    } else if (colorCategory === 'text') {
      cssVariable = `--layera-button-color-${key}`;
      category = `📝 ${key.charAt(0).toUpperCase() + key.slice(1)} Κείμενο`;
    }

    if (cssVariable && category) {
      console.log('🌟 Highlighting:', { key, value, cssVariable, category });
      highlightVariable(category, cssVariable);
    }
  };

  // Accordion State για τις κατηγορίες του πίνακα
  const [expandedCategories, setExpandedCategories] = useState({
    backgroundColors: true,
    borders: false,
    shadowsEffects: false,
    layoutSpacing: false,
    typography: false,
    icons: false,
    statesAccessibility: false,
    currentConfiguration: false
  });

  // <CheckIcon size="sm" /> ARXES COMPLIANT: Χρήση κεντρικού hook για CSS Variables
  const { actions } = useCSSVariables();

  // Ref για να παρακολουθώ προηγούμενες τιμές
  const prevValues = useRef({
    activeEffect,
    hoverEffect,
    buttonRadius,
    borderWidth,
    colorCategory,
    // Button state values
    buttonShape: buttonState.shape,
    buttonSize: buttonState.size,
    buttonText: buttonState.text,
    buttonWithIcon: buttonState.withIcon,
    buttonVariant: buttonState.variant,
    // Colors
    currentColors: currentColors || {},
    // All other playground settings
    layoutRadius,
    cardRadius,
    modalRadius,
    inputRadius,
    tableRadius,
    headerRadius,
    fontSize,
    cardSize,
    modalSize,
    inputSize,
    tableSize,
    modalTextAlign,
    alphaEnabled
  });

  // Παρακολούθηση ΜΟΝΟ πραγματικών αλλαγών
  useEffect(() => {
    const prev = prevValues.current;
    const current = {
      activeEffect,
      hoverEffect,
      buttonRadius,
      borderWidth,
      colorCategory,
      buttonShape: buttonState.shape,
      buttonSize: buttonState.size,
      buttonText: buttonState.text,
      buttonWithIcon: buttonState.withIcon,
      buttonVariant: buttonState.variant,
      currentColors: currentColors || {},
      layoutRadius,
      cardRadius,
      modalRadius,
      inputRadius,
      tableRadius,
      headerRadius,
      fontSize,
      cardSize,
      modalSize,
      inputSize,
      tableSize,
      modalTextAlign,
      alphaEnabled
    };

    console.log('🔍 Checking for changes:', { prev, current });

    // Ελέγχω κάθε τιμή ξεχωριστά για πραγματικές αλλαγές
    if (prev.activeEffect !== current.activeEffect) {
      console.log('🎯 REAL CHANGE: Active Effect changed from', prev.activeEffect, 'to', current.activeEffect);
      const cssVariable = `var(--layera-button-active-${colorCategory})`;
      const category = '🎯 Active Effect';
      highlightVariable(category, cssVariable);
    }

    if (prev.hoverEffect !== current.hoverEffect) {
      console.log('🎭 REAL CHANGE: Hover Effect changed from', prev.hoverEffect, 'to', current.hoverEffect);
      const cssVariable = `var(--layera-button-hover-${colorCategory})`;
      const category = '🎭 Hover Effect';
      highlightVariable(category, cssVariable);
    }

    if (prev.buttonRadius !== current.buttonRadius) {
      console.log('🌊 REAL CHANGE: Button Radius changed from', prev.buttonRadius, 'to', current.buttonRadius);
      const cssVariable = `var(--layera-button-borderRadius-${buttonRadius})`;
      const category = '🌊 Border Radius';
      highlightVariable(category, cssVariable);
    }

    if (prev.borderWidth !== current.borderWidth) {
      console.log('🔧 REAL CHANGE: Border Width changed from', prev.borderWidth, 'to', current.borderWidth);
      const cssVariable = 'var(--layera-button-borderWidth)';
      const category = '🔧 Border Width';
      highlightVariable(category, cssVariable);
    }

    // Button Shape changes
    if (prev.buttonShape !== current.buttonShape) {
      console.log('📐 REAL CHANGE: Button Shape changed from', prev.buttonShape, 'to', current.buttonShape);
      const cssVariable = `var(--layera-button-shape-${current.buttonShape})`;
      const category = '📐 Shape';
      highlightVariable(category, cssVariable);
    }

    // Button Size changes
    if (prev.buttonSize !== current.buttonSize) {
      console.log('📏 REAL CHANGE: Button Size changed from', prev.buttonSize, 'to', current.buttonSize);
      const cssVariable = `var(--layera-button-size-${current.buttonSize})`;
      const category = '📏 Size';
      highlightVariable(category, cssVariable);
    }

    // Button Text changes
    if (prev.buttonText !== current.buttonText) {
      console.log('📝 REAL CHANGE: Button Text changed from', prev.buttonText, 'to', current.buttonText);
      const cssVariable = 'Dynamic Content';
      const category = '📝 Text Content';
      highlightVariable(category, cssVariable);
    }

    // Button Icon toggle changes
    if (prev.buttonWithIcon !== current.buttonWithIcon) {
      console.log('🎨 REAL CHANGE: Button Icon changed from', prev.buttonWithIcon, 'to', current.buttonWithIcon);
      const cssVariable = `var(--layera-button-iconSize-${current.buttonSize})`;
      const category = '📐 Icon Size';
      highlightVariable(category, cssVariable);
    }

    // Button Variant changes
    if (prev.buttonVariant !== current.buttonVariant) {
      console.log('🎨 REAL CHANGE: Button Variant changed from', prev.buttonVariant, 'to', current.buttonVariant);
      const cssVariable = `var(--layera-button-variant-${current.buttonVariant})`;
      const category = `🎨 ${current.buttonVariant.charAt(0).toUpperCase() + current.buttonVariant.slice(1)} Φόντο`;
      highlightVariable(category, cssVariable);
    }

    // Ενημερώνω τις προηγούμενες τιμές
    prevValues.current = current;

    // Enhanced color tracking με direct monitoring
    const currentColorsString = JSON.stringify(currentColors);

    // Παρακολούθηση αλλαγών στα currentColors prop
    if (currentColors && Object.keys(currentColors).length > 0) {
      Object.entries(currentColors).forEach(([colorKey, colorValue]) => {
        if (colorValue && prev.currentColors?.[colorKey as keyof typeof currentColors] !== colorValue) {
          console.log('🎨 REAL COLOR CHANGE:', colorKey, 'from', prev.currentColors?.[colorKey as keyof typeof currentColors], 'to', colorValue);
          handleColorChangeWithHighlight(colorKey, colorValue);
        }
      });
    }

    // Backup: Event listener για colorsUpdate
    const handleColorsUpdate = (event: CustomEvent) => {
      console.log('🔥 colorsUpdate event received:', event.detail);
      const { detail } = event;
      const { category, ...colors } = detail;

      console.log('📊 Event category:', category, 'Current colorCategory:', colorCategory);

      if (category === colorCategory) {
        console.log('✅ Category match! Processing colors:', colors);
        Object.entries(colors).forEach(([colorKey, colorValue]) => {
          console.log('🎨 Processing color from event:', colorKey, colorValue);
          if (colorValue && typeof colorValue === 'object' && 'hex' in colorValue) {
            const simplifiedKey = colorKey.replace('Color', '').toLowerCase();
            console.log('🔄 Simplified key:', simplifiedKey);
            handleColorChangeWithHighlight(simplifiedKey, colorValue.hex);
          }
        });
      }
    };

    window.addEventListener('colorsUpdate', handleColorsUpdate as EventListener);

    return () => {
      window.removeEventListener('colorsUpdate', handleColorsUpdate as EventListener);
    };
  }, [
    colorCategory,
    activeEffect,
    hoverEffect,
    buttonRadius,
    borderWidth,
    buttonState.shape,
    buttonState.size,
    buttonState.text,
    buttonState.withIcon,
    buttonState.variant,
    currentColors,
    layoutRadius,
    cardRadius,
    modalRadius,
    inputRadius,
    tableRadius,
    headerRadius,
    fontSize,
    cardSize,
    modalSize,
    inputSize,
    tableSize,
    modalTextAlign,
    alphaEnabled
  ]);

  // <CheckIcon size="sm" /> Color State Hook για έλεγχο alpha preview mode
  const { state: colorHookState } = useColorState();

  // Helper function για translation του shape
  const getShapeInGreek = (shape: string) => {
    switch(shape) {
      case 'rectangular': return 'Παραλληλόγραμμο';
      case 'square': return 'Τετράγωνο';
      case 'rounded': return 'Στρογγυλό';
      default: return shape;
    }
  };

  // <CheckIcon size="sm" /> ΑΝΤΙΚΑΤΑΣΤΑΣΗ ΔΙΠΛΟΤΥΠΩΝ FUNCTIONS - Χρήση κεντρικών helper functions
  const { getRadiusInGreek, getHoverEffectInGreek, getActiveEffectInGreek, getSizeInGreek, getCategoryInGreek } = PLAYGROUND_HELPERS;

  // Δυναμική δημιουργία πλήρους περιγραφής
  const generateFullDescription = () => {
    const parts = [
      getCategoryInGreek(colorCategory),
      'για πλήκτρα',
      `σχήματος ${getShapeInGreek(buttonState.shape)}`,
      `μεγέθους ${getSizeInGreek(buttonState.size)}`,
      buttonState.withIcon ? 'με εικονίδιο' : 'χωρίς εικονίδιο'
    ];

    // Προσθέτουμε επιπλέον πληροφορίες για borders category
    if (colorCategory === 'borders') {
      parts.push(`με πάχος περιγράμματος ${borderWidth}`);
    }

    // Προσθέτουμε radius information - ΠΑΝΤΑ
    parts.push(`με ${getRadiusInGreek(buttonRadius)}`);

    // Προσθέτουμε hover effect information
    if (hoverEffect && hoverEffect !== 'normal') {
      parts.push(`με ${getHoverEffectInGreek(hoverEffect)}`);
    }

    // Προσθέτουμε active effect information
    if (activeEffect && activeEffect !== 'scale') {
      parts.push(`και ${getActiveEffectInGreek(activeEffect)}`);
    }

    return parts.join(' ');
  };

  // Helper function για εξαγωγή hex χρώματος από CSS variable ή απλό string
  const extractColor = (colorValue: string, fallback: string): string => {
    if (!colorValue) return fallback;
    if (colorValue.startsWith('#')) return colorValue;

    // Αν είναι CSS variable, εξάγει το fallback hex value
    const match = colorValue.match(/var\([^,]+,\s*(#[0-9a-fA-F]{6})\)/);
    return match ? match[1] : fallback;
  };

  // Helper function για αντιγραφή γραμμής πίνακα
  const copyRowData = async (rowData: {
    category: string;
    cssVariable: string;
    selector: string;
    htmlAttribute: string;
    currentValue: string;
  }) => {
    try {
      const textToCopy = `Κατηγορία: ${rowData.category}
CSS Variable: ${rowData.cssVariable}
Selector: ${rowData.selector}
HTML Attribute: ${rowData.htmlAttribute}
Τρέχουσα Τιμή: ${rowData.currentValue}`;

      await navigator.clipboard.writeText(textToCopy);

      // Εδώ θα μπορούσες να προσθέσεις ένα toast notification
      console.log('Η γραμμή αντιγράφηκε στο clipboard!');
    } catch (err) {
      console.error('Αποτυχία αντιγραφής:', err);
    }
  };

  // Helper function για αντιγραφή όλου του πίνακα
  const copyFullTable = async (tableData: Array<{
    category: string;
    cssVariable: string;
    selector: string;
    htmlAttribute: string;
    currentValue: string;
  }>, tableTitle: string) => {
    try {
      const header = `=== ${tableTitle} ===\n\n`;
      const rows = tableData.map(row =>
        `Κατηγορία: ${row.category}
CSS Variable: ${row.cssVariable}
Selector: ${row.selector}
HTML Attribute: ${row.htmlAttribute}
Τρέχουσα Τιμή: ${row.currentValue}`
      ).join('\n\n');

      const textToCopy = header + rows;
      await navigator.clipboard.writeText(textToCopy);
      console.log(`Ολόκληρος ο πίνακας "${tableTitle}" αντιγράφηκε στο clipboard!`);
    } catch (err) {
      console.error('Αποτυχία αντιγραφής πίνακα:', err);
    }
  };

  const copyAllTables = async () => {
    try {
      // Δυναμικά δεδομένα από όλους τους πίνακες
      const backgroundColorsData = [
        { category: "Primary Φόντο", cssVariable: "--layera-button-background-primary", selector: '.layera-button[data-variant="primary"]', htmlAttribute: 'data-layera-button-background="primary"', currentValue: buttonState.variant === 'primary' ? 'ACTIVE' : 'Primary' },
        { category: "Secondary Φόντο", cssVariable: "--layera-button-background-secondary", selector: '.layera-button[data-variant="secondary"]', htmlAttribute: 'data-layera-button-background="secondary"', currentValue: buttonState.variant === 'secondary' ? 'ACTIVE' : 'Secondary' },
        { category: "Success Φόντο", cssVariable: "--layera-button-background-success", selector: '.layera-button[data-variant="success"]', htmlAttribute: 'data-layera-button-background="success"', currentValue: buttonState.variant === 'success' ? 'ACTIVE' : 'Success' },
        { category: "Warning Φόντο", cssVariable: "--layera-button-background-warning", selector: '.layera-button[data-variant="warning"]', htmlAttribute: 'data-layera-button-background="warning"', currentValue: buttonState.variant === 'warning' ? 'ACTIVE' : 'Warning' },
        { category: "Danger Φόντο", cssVariable: "--layera-button-background-danger", selector: '.layera-button[data-variant="danger"]', htmlAttribute: 'data-layera-button-background="danger"', currentValue: buttonState.variant === 'danger' ? 'ACTIVE' : 'Danger' },
        { category: "Info Φόντο", cssVariable: "--layera-button-background-info", selector: '.layera-button[data-variant="info"]', htmlAttribute: 'data-layera-button-background="info"', currentValue: buttonState.variant === 'info' ? 'ACTIVE' : 'Info' },
        { category: "Outline Φόντο", cssVariable: "--layera-button-background-outline", selector: '.layera-button[data-variant="outline"]', htmlAttribute: 'data-layera-button-background="outline"', currentValue: buttonState.variant === 'outline' ? 'ACTIVE' : 'Outline' },
        { category: "Ghost Φόντο", cssVariable: "--layera-button-background-ghost", selector: '.layera-button[data-variant="ghost"]', htmlAttribute: 'data-layera-button-background="ghost"', currentValue: buttonState.variant === 'ghost' ? 'ACTIVE' : 'Ghost' }
      ];

      const bordersData = [
        { category: "🔲 Primary Περίγραμμα", cssVariable: "--layera-button-border-primary", selector: '.layera-button[data-variant="primary"]', htmlAttribute: 'data-layera-button-border="primary"', currentValue: buttonState.variant === 'primary' ? 'ACTIVE' : 'Primary' },
        { category: "🔲 Secondary Περίγραμμα", cssVariable: "--layera-button-border-secondary", selector: '.layera-button[data-variant="secondary"]', htmlAttribute: 'data-layera-button-border="secondary"', currentValue: buttonState.variant === 'secondary' ? 'ACTIVE' : 'Secondary' },
        { category: "🔲 Success Περίγραμμα", cssVariable: "--layera-button-border-success", selector: '.layera-button[data-variant="success"]', htmlAttribute: 'data-layera-button-border="success"', currentValue: buttonState.variant === 'success' ? 'ACTIVE' : 'Success' },
        { category: "🔲 Warning Περίγραμμα", cssVariable: "--layera-button-border-warning", selector: '.layera-button[data-variant="warning"]', htmlAttribute: 'data-layera-button-border="warning"', currentValue: buttonState.variant === 'warning' ? 'ACTIVE' : 'Warning' },
        { category: "🔲 Danger Περίγραμμα", cssVariable: "--layera-button-border-danger", selector: '.layera-button[data-variant="danger"]', htmlAttribute: 'data-layera-button-border="danger"', currentValue: buttonState.variant === 'danger' ? 'ACTIVE' : 'Danger' },
        { category: "🔲 Info Περίγραμμα", cssVariable: "--layera-button-border-info", selector: '.layera-button[data-variant="info"]', htmlAttribute: 'data-layera-button-border="info"', currentValue: buttonState.variant === 'info' ? 'ACTIVE' : 'Info' },
        { category: "🔲 Outline Περίγραμμα", cssVariable: "--layera-button-border-outline", selector: '.layera-button[data-variant="outline"]', htmlAttribute: 'data-layera-button-border="outline"', currentValue: buttonState.variant === 'outline' ? 'ACTIVE' : 'Outline' },
        { category: "🔲 Ghost Περίγραμμα", cssVariable: "--layera-button-border-ghost", selector: '.layera-button[data-variant="ghost"]', htmlAttribute: 'data-layera-button-border="ghost"', currentValue: buttonState.variant === 'ghost' ? 'ACTIVE' : 'Ghost' }
      ];

      const textColorsData = [
        { category: "🅰️ Primary Κείμενο", cssVariable: "--layera-button-text-primary", selector: '.layera-button[data-variant="primary"]', htmlAttribute: 'data-layera-button-text="primary"', currentValue: buttonState.variant === 'primary' ? 'ACTIVE' : 'Primary' },
        { category: "🅰️ Secondary Κείμενο", cssVariable: "--layera-button-text-secondary", selector: '.layera-button[data-variant="secondary"]', htmlAttribute: 'data-layera-button-text="secondary"', currentValue: buttonState.variant === 'secondary' ? 'ACTIVE' : 'Secondary' },
        { category: "🅰️ Success Κείμενο", cssVariable: "--layera-button-text-success", selector: '.layera-button[data-variant="success"]', htmlAttribute: 'data-layera-button-text="success"', currentValue: buttonState.variant === 'success' ? 'ACTIVE' : 'Success' },
        { category: "🅰️ Warning Κείμενο", cssVariable: "--layera-button-text-warning", selector: '.layera-button[data-variant="warning"]', htmlAttribute: 'data-layera-button-text="warning"', currentValue: buttonState.variant === 'warning' ? 'ACTIVE' : 'Warning' },
        { category: "🅰️ Danger Κείμενο", cssVariable: "--layera-button-text-danger", selector: '.layera-button[data-variant="danger"]', htmlAttribute: 'data-layera-button-text="danger"', currentValue: buttonState.variant === 'danger' ? 'ACTIVE' : 'Danger' },
        { category: "🅰️ Info Κείμενο", cssVariable: "--layera-button-text-info", selector: '.layera-button[data-variant="info"]', htmlAttribute: 'data-layera-button-text="info"', currentValue: buttonState.variant === 'info' ? 'ACTIVE' : 'Info' },
        { category: "🅰️ Outline Κείμενο", cssVariable: "--layera-button-text-outline", selector: '.layera-button[data-variant="outline"]', htmlAttribute: 'data-layera-button-text="outline"', currentValue: buttonState.variant === 'outline' ? 'ACTIVE' : 'Outline' },
        { category: "🅰️ Ghost Κείμενο", cssVariable: "--layera-button-text-ghost", selector: '.layera-button[data-variant="ghost"]', htmlAttribute: 'data-layera-button-text="ghost"', currentValue: buttonState.variant === 'ghost' ? 'ACTIVE' : 'Ghost' }
      ];

      const hoverColorsData = [
        { category: "Primary Hover", cssVariable: "--layera-button-hover-primary", selector: '.layera-button[data-variant="primary"]:hover', htmlAttribute: 'data-layera-button-hover="primary"', currentValue: buttonState.variant === 'primary' ? 'ACTIVE HOVER' : 'Primary Hover' },
        { category: "Secondary Hover", cssVariable: "--layera-button-hover-secondary", selector: '.layera-button[data-variant="secondary"]:hover', htmlAttribute: 'data-layera-button-hover="secondary"', currentValue: buttonState.variant === 'secondary' ? 'ACTIVE HOVER' : 'Secondary Hover' },
        { category: "Success Hover", cssVariable: "--layera-button-hover-success", selector: '.layera-button[data-variant="success"]:hover', htmlAttribute: 'data-layera-button-hover="success"', currentValue: buttonState.variant === 'success' ? 'ACTIVE HOVER' : 'Success Hover' },
        { category: "Warning Hover", cssVariable: "--layera-button-hover-warning", selector: '.layera-button[data-variant="warning"]:hover', htmlAttribute: 'data-layera-button-hover="warning"', currentValue: buttonState.variant === 'warning' ? 'ACTIVE HOVER' : 'Warning Hover' },
        { category: "Danger Hover", cssVariable: "--layera-button-hover-danger", selector: '.layera-button[data-variant="danger"]:hover', htmlAttribute: 'data-layera-button-hover="danger"', currentValue: buttonState.variant === 'danger' ? 'ACTIVE HOVER' : 'Danger Hover' },
        { category: "Info Hover", cssVariable: "--layera-button-hover-info", selector: '.layera-button[data-variant="info"]:hover', htmlAttribute: 'data-layera-button-hover="info"', currentValue: buttonState.variant === 'info' ? 'ACTIVE HOVER' : 'Info Hover' },
        { category: "Outline Hover", cssVariable: "--layera-button-hover-outline", selector: '.layera-button[data-variant="outline"]:hover', htmlAttribute: 'data-layera-button-hover="outline"', currentValue: buttonState.variant === 'outline' ? 'ACTIVE HOVER' : 'Outline Hover' },
        { category: "Ghost Hover", cssVariable: "--layera-button-hover-ghost", selector: '.layera-button[data-variant="ghost"]:hover', htmlAttribute: 'data-layera-button-hover="ghost"', currentValue: buttonState.variant === 'ghost' ? 'ACTIVE HOVER' : 'Ghost Hover' }
      ];

      const focusColorsData = [
        { category: "🔍 Primary Focus", cssVariable: "--layera-button-focus-primary", selector: '.layera-button[data-variant="primary"]:focus', htmlAttribute: 'data-layera-button-focus="primary"', currentValue: buttonState.variant === 'primary' ? 'ACTIVE FOCUS' : 'Primary Focus' },
        { category: "🔍 Secondary Focus", cssVariable: "--layera-button-focus-secondary", selector: '.layera-button[data-variant="secondary"]:focus', htmlAttribute: 'data-layera-button-focus="secondary"', currentValue: buttonState.variant === 'secondary' ? 'ACTIVE FOCUS' : 'Secondary Focus' },
        { category: "🔍 Success Focus", cssVariable: "--layera-button-focus-success", selector: '.layera-button[data-variant="success"]:focus', htmlAttribute: 'data-layera-button-focus="success"', currentValue: buttonState.variant === 'success' ? 'ACTIVE FOCUS' : 'Success Focus' },
        { category: "🔍 Warning Focus", cssVariable: "--layera-button-focus-warning", selector: '.layera-button[data-variant="warning"]:focus', htmlAttribute: 'data-layera-button-focus="warning"', currentValue: buttonState.variant === 'warning' ? 'ACTIVE FOCUS' : 'Warning Focus' },
        { category: "🔍 Danger Focus", cssVariable: "--layera-button-focus-danger", selector: '.layera-button[data-variant="danger"]:focus', htmlAttribute: 'data-layera-button-focus="danger"', currentValue: buttonState.variant === 'danger' ? 'ACTIVE FOCUS' : 'Danger Focus' },
        { category: "🔍 Info Focus", cssVariable: "--layera-button-focus-info", selector: '.layera-button[data-variant="info"]:focus', htmlAttribute: 'data-layera-button-focus="info"', currentValue: buttonState.variant === 'info' ? 'ACTIVE FOCUS' : 'Info Focus' },
        { category: "🔍 Outline Focus", cssVariable: "--layera-button-focus-outline", selector: '.layera-button[data-variant="outline"]:focus', htmlAttribute: 'data-layera-button-focus="outline"', currentValue: buttonState.variant === 'outline' ? 'ACTIVE FOCUS' : 'Outline Focus' },
        { category: "🔍 Ghost Focus", cssVariable: "--layera-button-focus-ghost", selector: '.layera-button[data-variant="ghost"]:focus', htmlAttribute: 'data-layera-button-focus="ghost"', currentValue: buttonState.variant === 'ghost' ? 'ACTIVE FOCUS' : 'Ghost Focus' }
      ];

      const disabledColorsData = [
        { category: "❌ Primary Disabled", cssVariable: "--layera-button-disabled-primary", selector: '.layera-button[data-variant="primary"]:disabled', htmlAttribute: 'data-layera-button-disabled="primary"', currentValue: buttonState.variant === 'primary' ? 'ACTIVE DISABLED' : 'Primary Disabled' },
        { category: "❌ Secondary Disabled", cssVariable: "--layera-button-disabled-secondary", selector: '.layera-button[data-variant="secondary"]:disabled', htmlAttribute: 'data-layera-button-disabled="secondary"', currentValue: buttonState.variant === 'secondary' ? 'ACTIVE DISABLED' : 'Secondary Disabled' },
        { category: "❌ Success Disabled", cssVariable: "--layera-button-disabled-success", selector: '.layera-button[data-variant="success"]:disabled', htmlAttribute: 'data-layera-button-disabled="success"', currentValue: buttonState.variant === 'success' ? 'ACTIVE DISABLED' : 'Success Disabled' },
        { category: "❌ Warning Disabled", cssVariable: "--layera-button-disabled-warning", selector: '.layera-button[data-variant="warning"]:disabled', htmlAttribute: 'data-layera-button-disabled="warning"', currentValue: buttonState.variant === 'warning' ? 'ACTIVE DISABLED' : 'Warning Disabled' },
        { category: "❌ Danger Disabled", cssVariable: "--layera-button-disabled-danger", selector: '.layera-button[data-variant="danger"]:disabled', htmlAttribute: 'data-layera-button-disabled="danger"', currentValue: buttonState.variant === 'danger' ? 'ACTIVE DISABLED' : 'Danger Disabled' },
        { category: "❌ Info Disabled", cssVariable: "--layera-button-disabled-info", selector: '.layera-button[data-variant="info"]:disabled', htmlAttribute: 'data-layera-button-disabled="info"', currentValue: buttonState.variant === 'info' ? 'ACTIVE DISABLED' : 'Info Disabled' },
        { category: "❌ Outline Disabled", cssVariable: "--layera-button-disabled-outline", selector: '.layera-button[data-variant="outline"]:disabled', htmlAttribute: 'data-layera-button-disabled="outline"', currentValue: buttonState.variant === 'outline' ? 'ACTIVE DISABLED' : 'Outline Disabled' },
        { category: "❌ Ghost Disabled", cssVariable: "--layera-button-disabled-ghost", selector: '.layera-button[data-variant="ghost"]:disabled', htmlAttribute: 'data-layera-button-disabled="ghost"', currentValue: buttonState.variant === 'ghost' ? 'ACTIVE DISABLED' : 'Ghost Disabled' }
      ];

      // Ενοποίηση όλων των πινάκων
      const allTablesContent = [
        { title: "Background Colors", data: backgroundColorsData },
        { title: "🔲 Borders", data: bordersData },
        { title: "🅰️ Text Colors", data: textColorsData },
        { title: "Hover Colors", data: hoverColorsData },
        { title: "🔍 Focus Colors", data: focusColorsData },
        { title: "❌ Disabled Colors", data: disabledColorsData }
      ];

      // Δημιουργία του περιεχομένου για αντιγραφή
      const fullContent = allTablesContent.map(table => {
        const header = `=== ${table.title} ===\n`;
        const rows = table.data.map(row =>
          `Κατηγορία: ${row.category}
CSS Variable: ${row.cssVariable}
Selector: ${row.selector}
HTML Attribute: ${row.htmlAttribute}
Τρέχουσα Τιμή: ${row.currentValue}`
        ).join('\n\n');

        return header + '\n' + rows;
      }).join('\n\n' + '='.repeat(50) + '\n\n');

      // Αντιγραφή στο clipboard
      await navigator.clipboard.writeText(fullContent);
      console.log('Όλοι οι πίνακες αντιγράφηκαν στο clipboard!');
    } catch (err) {
      console.error('Αποτυχία αντιγραφής όλων των πινάκων:', err);
    }
  };

  // Helper component για κουμπί αντιγραφής
  const CopyButton: React.FC<{
    category: string;
    cssVariable: string;
    selector: string;
    htmlAttribute: string;
    currentValue: string;
  }> = ({ category, cssVariable, selector, htmlAttribute, currentValue }) => (
    <td className="layera-padding--sm layera-text--align-center">
      <Button
        variant="ghost"
        size="sm"
        icon={<CopyIcon size="sm" />}
        onClick={() => copyRowData({
          category,
          cssVariable,
          selector,
          htmlAttribute,
          currentValue
        })}
        className="layera-opacity--70 layera-hover--opacity-100"
      />
    </td>
  );

  // Helper function για border width token
  const getBorderWidthToken = (width: number): string => {
    return `var(--layera-global-borderWidth-${width})`;
  };

  // Accordion Helper Function για toggle κατηγοριών
  const toggleCategory = (category: keyof typeof expandedCategories) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  // Toggle All Accordions Function
  const toggleAllAccordions = () => {
    const allExpanded = Object.values(expandedCategories).every(expanded => expanded);

    setExpandedCategories({
      backgroundColors: !allExpanded,
      borders: !allExpanded,
      shadowsEffects: !allExpanded,
      layoutSpacing: !allExpanded,
      typography: !allExpanded,
      icons: !allExpanded,
      statesAccessibility: !allExpanded,
      currentConfiguration: !allExpanded
    });
  };

  // Dynamic colors with fallbacks using design tokens
  const colors = {
    primary: extractColor(currentColors.primary || '', 'var(--layera-colors-text-primary)'),
    secondary: extractColor(currentColors.secondary || '', 'var(--layera-colors-text-secondary)'),
    success: extractColor(currentColors.success || '', 'var(--layera-colors-primary-success)'),
    warning: extractColor(currentColors.warning || '', 'var(--layera-colors-primary-warning)'),
    danger: extractColor(currentColors.danger || '', 'var(--layera-colors-primary-danger)'),
    info: extractColor(currentColors.info || '', 'var(--layera-colors-status-info)')
  };

  // Border width για outline button
  const dynamicBorderWidth = getBorderWidthToken(borderWidth);

  // <CheckIcon size="sm" /> ARXES COMPLIANT: Χρήση κεντρικού hook για button color styling
  React.useEffect(() => {
    if (typeof document !== 'undefined') {
      // <CheckIcon size="sm" /> RGBA PROTECTION: Δεν κάνουμε override αν υπάρχουν ήδη RGBA τιμές
      // Ελέγχουμε αν τα CSS variables έχουν ήδη rgba() τιμές
      const root = document.documentElement;

      // Apply each color individually using the enterprise pattern
      Object.entries(colors).forEach(([colorKey, colorValue]) => {
        const capitalizedKey = `${colorKey}Color`;
        const cssVariableName = `--layera-live-button-${colorKey}`;

        // Έλεγχος αν υπάρχει ήδη RGBA τιμή
        const currentValue = root.style.getPropertyValue(cssVariableName);

        if (currentValue && currentValue.includes('rgba(')) {
          return; // ΔΕΝ κάνουμε override αν υπάρχει RGBA
        }

        actions.applySpecificButtonColor(capitalizedKey, colorValue);
      });
    }
  }, [colors, actions, colorHookState?.elementType, colorHookState?.colorCategory]);

  return (
    <>
      {/* Custom CSS για table styling */}
      <style>{`
        .layera-width--80 { width: var(--layera-spacing-80); }

        .layera-table-compact {
          line-height: 0.9;
        }

        .layera-table-compact th,
        .layera-table-compact td {
          vertical-align: middle;
          padding-top: 0px !important;
          padding-bottom: 0px !important;
          height: 20px;
        }

        .layera-table-compact .layera-typography {
          line-height: 0.9;
          margin: 0 !important;
        }
      `}</style>

      <Box>
      {/* Live Preview Area - Ενοποιημένο με 6 χρωματιστά buttons */}
      <Box className="layera-text-center layera-padding--2xl layera-bg-surface--primary layera-border-radius--lg layera-margin-bottom--xl layera-border--dashed layera-border-width--2 layera-border-color--info">
        <h3 className="layera-typography layera-margin-bottom--sm layera-text--align-center" data-size="lg" data-weight="bold" data-color="primary">
          <CheckIcon size="sm" /> Live Preview: Πλήκτρα
        </h3>
        <p className="layera-typography layera-margin-bottom--md layera-text--align-center" data-size="sm" data-color="secondary">
          {generateFullDescription()}
        </p>


        <Box className="layera-flex layera-flex--justify-center layera-flex--wrap-wrap layera-align-items--center">
          {/* Τα 6 χρωματιστά buttons με enterprise min-width + auto logic */}
          <Button
            variant="primary"
            size={buttonState.size}
            icon={buttonState.withIcon ? <CheckIcon size="sm" /> : undefined}
            className="layera-margin-right--sm layera-text--align-center"
          >
            {buttonState.shape === 'square' ? 'P' : 'Primary'}
          </Button>
          <Button
            variant="secondary"
            size={buttonState.size}
            icon={buttonState.withIcon ? <SettingsIcon size="sm" /> : undefined}
            className="layera-margin-right--sm layera-text--align-center"
          >
            {buttonState.shape === 'square' ? 'S' : 'Secondary'}
          </Button>
          <Button
            variant="success"
            size={buttonState.size}
            icon={buttonState.withIcon ? <CheckIcon size="sm" /> : undefined}
            className="layera-margin-right--sm layera-text--align-center"
          >
            {buttonState.shape === 'square' ? 'Su' : 'Success'}
          </Button>
          <Button
            variant="warning"
            size={buttonState.size}
            icon={buttonState.withIcon ? <CloseIcon size="sm" /> : undefined}
            className="layera-margin-right--sm layera-text--align-center"
          >
            {buttonState.shape === 'square' ? 'W' : 'Warning'}
          </Button>
          <Button
            variant="danger"
            size={buttonState.size}
            icon={buttonState.withIcon ? <CloseIcon size="sm" /> : undefined}
            className="layera-margin-right--sm layera-text--align-center"
          >
            {buttonState.shape === 'square' ? 'D' : 'Danger'}
          </Button>
          <Button
            variant="info"
            size={buttonState.size}
            icon={buttonState.withIcon ? <SearchIcon size="sm" /> : undefined}
            className="layera-margin-right--sm layera-text--align-center"
          >
            {buttonState.shape === 'square' ? 'I' : 'Info'}
          </Button>
          <Button
            variant="outline"
            size={buttonState.size}
            icon={buttonState.withIcon ? <PlusIcon size="sm" /> : undefined}
            className="layera-margin-right--sm layera-text--align-center"
          >
            {buttonState.shape === 'square' ? 'O' : 'Outline'}
          </Button>
          <Button
            variant="ghost"
            size={buttonState.size}
            icon={buttonState.withIcon ? <CompassIcon size="sm" /> : undefined}
            className="layera-text--align-center"
          >
            {buttonState.shape === 'square' ? 'G' : 'Ghost'}
          </Button>
        </Box>

        {/* Information Icon για Button Variables */}
        <Box className="layera-text-center layera-margin-top--md">
          <Button
            variant="ghost"
            size="sm"
            icon={<SettingsIcon size="sm" />}
            onClick={() => setShowVariablesPopup(true)}
            className="layera-text--align-center layera-opacity--70 layera-hover--opacity-100"
          >
            Όλες οι Μεταβλητές Πλήκτρων
          </Button>
        </Box>
      </Box>

      {/* Variables Info Section */}
      {showVariablesPopup && (
        <Box className="layera-margin-top--xl layera-padding--lg layera-bg--surface-primary layera-border-radius--lg layera-border--solid layera-border-width--2 layera-border-color--primary layera-width--full">
            {/* Header */}
            <Box className="layera-flex layera-flex--justify-between layera-flex--align-center layera-margin-bottom--lg">
              <Text className="layera-typography" data-size="2xl" data-weight="bold" data-color="primary">
                <LocationIcon size="sm" /> Όλες οι Μεταβλητές Πλήκτρων
              </Text>
              <Button
                variant="ghost"
                size="sm"
                icon={<CloseIcon size="sm" />}
                onClick={() => setShowVariablesPopup(false)}
                className="layera-opacity--70 layera-hover--opacity-100"
              >
                ✕
              </Button>
            </Box>

            {/* Accordion Structure για Variables - Σταδιακή Εφαρμογή */}
            <Box className="layera-space-y--md layera-margin-bottom--lg">
              <VariablesInfoAccordion
                categories={createButtonVariablesData(
                  buttonState,
                  colorCategory,
                  borderWidth,
                  buttonRadius,
                  hoverEffect,
                  activeEffect
                )}
                defaultExpandedCategory="backgroundColors"
                highlightedVariable={highlightedVariable}
              />
            </Box>


        </Box>
      )}
    </Box>
    </>
  );
};
