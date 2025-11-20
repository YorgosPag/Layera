/**
 * LAYERA UNIFIED INTERFACES SYSTEM
 *
 * Centralized interface definitions για μείωση duplication
 * Consolidated από πολλαπλά component files
 *
 * Categories:
 * - Base Props (κοινά σε όλα τα components)
 * - Playground Props (color, button, layout playground)
 * - Modal/Drawer Props (overlays)
 * - Color System Props (color pickers, controls)
 * - State Management Props (hooks)
 */

import { ColorWithAlpha, ColorCategory } from '../hooks/useColorState';
import { ButtonVariant } from '../components/playground/shared/types';

// ============================================================================
// BASE COMPONENT PROPS
// ============================================================================

/**
 * Βασικά props που χρησιμοποιούνται σε όλα τα components
 */
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
  id?: string;
  'data-testid'?: string;
}

/**
 * Props για components που έχουν onClose functionality
 */
export interface ClosableProps {
  onClose: () => void;
  open?: boolean;
}

/**
 * Props για interactive components με callbacks
 */
export interface InteractiveProps {
  onClick?: () => void;
  onHover?: () => void;
  disabled?: boolean;
}

// ============================================================================
// PLAYGROUND COMPONENT PROPS
// ============================================================================

/**
 * Βασικά colors που χρησιμοποιούνται σε playground components
 */
export interface PlaygroundColors {
  primary: string;
  secondary: string;
  success: string;
  warning: string;
  danger: string;
  info: string;
}

/**
 * Κοινά props για όλα τα playground components
 */
export interface BasePlaygroundProps extends BaseComponentProps {
  currentColors: PlaygroundColors;
  colorCategory: ColorCategory;
}

/**
 * Props για playground components με border customization
 */
export interface BorderPlaygroundProps extends BasePlaygroundProps {
  borderWidth?: number;
  borderRadius?: string;
}

/**
 * Props για playground components με layout customization
 */
export interface LayoutPlaygroundProps extends BorderPlaygroundProps {
  layoutRadius?: string;
  layoutSize?: string;
  hoverEffect?: string;
  activeEffect?: string;
}

/**
 * Props για playground components με button customization
 */
export interface ButtonPlaygroundProps extends BasePlaygroundProps {
  buttonVariant?: ButtonVariant;
  buttonSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  buttonShape?: 'rectangular' | 'square' | 'rounded';
}

// ============================================================================
// MODAL & DRAWER PROPS
// ============================================================================

/**
 * Κοινά props για modals
 */
export interface BaseModalProps extends BaseComponentProps, ClosableProps {
  title?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  preventClose?: boolean;
}

/**
 * Κοινά props για drawers
 */
export interface BaseDrawerProps extends BaseComponentProps, ClosableProps {
  position?: 'top' | 'bottom' | 'left' | 'right';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  preventBodyScroll?: boolean;
  overlayClassName?: string;
}

// ============================================================================
// COLOR SYSTEM PROPS
// ============================================================================

/**
 * Props για color picker components
 */
export interface BaseColorPickerProps extends BaseComponentProps {
  label: string;
  value: ColorWithAlpha | string;
  onChange: (value: ColorWithAlpha) => void;
  onPreview?: (value: ColorWithAlpha) => void;
  throttleMs?: number;
}

/**
 * Props για color control components
 */
export interface ColorControlsProps extends BaseComponentProps {
  currentColors: any; // Accept both Record<string, string> and ColorPaletteWithAlpha
  currentSetters?: any; // Accept both Record<string, (value: string) => void> and ColorStateActions
  onColorChange?: (key: string, value: ColorWithAlpha | string) => void;
  startPreview?: (key: string, value: string) => void;
  colorCategory?: string;
}

/**
 * Props για category selection
 */
export interface CategoryProps extends BaseComponentProps {
  selectedCategory: ColorCategory;
  onCategoryChange: (category: ColorCategory) => void;
  categories?: ColorCategory[];
}

/**
 * Props για color actions (save, load, reset)
 */
export interface ColorActionsProps extends BaseComponentProps {
  onSave: () => void;
  onLoad: () => void;
  onReset: () => void;
  canSave?: boolean;
  canLoad?: boolean;
  isLoading?: boolean;
}

// ============================================================================
// STATE MANAGEMENT PROPS
// ============================================================================

/**
 * Props για storage hooks
 */
export interface StorageHookProps {
  key: string;
  defaultValue?: any;
  serialize?: (value: any) => string;
  deserialize?: (value: string) => any;
}

/**
 * Props για data fetching hooks
 */
export interface DataFetchProps<T> {
  url?: string;
  params?: Record<string, any>;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  enabled?: boolean;
}

// ============================================================================
// FORM & INPUT PROPS
// ============================================================================

/**
 * Βασικά props για form controls
 */
export interface BaseInputProps extends BaseComponentProps {
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  helperText?: string;
}

/**
 * Props για text inputs
 */
export interface TextInputProps extends BaseInputProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  onFocus?: () => void;
  type?: 'text' | 'email' | 'password' | 'search';
}

/**
 * Props για select inputs
 */
export interface SelectInputProps<T = string> extends BaseInputProps {
  value: T;
  onChange: (value: T) => void;
  options: Array<{ value: T; label: string; disabled?: boolean }>;
  multiple?: boolean;
}

// ============================================================================
// SPECIFIC COMPONENT PROPS (για backwards compatibility)
// ============================================================================

/**
 * Props για LivePlayground component
 */
export interface LivePlaygroundProps extends BaseModalProps {
  initialColors?: PlaygroundColors;
  onColorsChange?: (colors: PlaygroundColors) => void;
}

/**
 * Props για PropertyTypeDrawer component
 */
export interface PropertyTypeDrawerProps extends BaseDrawerProps {
  // Specific props αν χρειάζονται
}

/**
 * Props για Pipeline Debug Info
 */
export interface PipelineDebugInfoProps extends BaseComponentProps {
  pipelineState: any | null; // Accepts PipelineState from @layera/pipelines
  showDetails?: boolean;
}

/**
 * Props για App Modals container
 */
export interface AppModalsProps extends BaseComponentProps {
  activeModal: 'login' | 'addContent' | null;
  closeModal: () => void;
  handleSelectProperty: () => void;
  handleSelectJob: () => void;
}

// ============================================================================
// MAP & GEO PROPS
// ============================================================================

/**
 * Props για map components
 */
export interface BaseMapProps extends BaseComponentProps {
  initialLat?: number;
  initialLng?: number;
  initialZoom?: number;
  markers?: Array<{
    lat: number;
    lng: number;
    title?: string;
    description?: string;
  }>;
  onMapClick?: (lat: number, lng: number) => void;
  onMarkerClick?: (markerId: string) => void;
}

// ============================================================================
// PREVIEW & DISPLAY PROPS
// ============================================================================

/**
 * Props για preview components
 */
export interface PreviewProps extends BaseComponentProps {
  title?: string;
  description?: string;
  showBorder?: boolean;
  variant?: 'default' | 'compact' | 'detailed';
}

/**
 * Props για text preview components
 */
export interface TextPreviewProps extends PreviewProps {
  text: string;
  fontSize?: string;
  fontWeight?: string;
  color?: string;
  backgroundColor?: string;
}

/**
 * Props για table playground
 */
export interface TablesPlaygroundProps extends BasePlaygroundProps {
  borderWidth?: number;
  tableRadius?: string;
  tableSize?: string;
  hoverEffect?: string;
  activeEffect?: string;
  showHeaders?: boolean;
  showBorders?: boolean;
  striped?: boolean;
  compact?: boolean;
}

// ============================================================================
// CONTROL COMPONENTS PROPS (για shared controls)
// ============================================================================

/**
 * Base props για όλα τα control components
 */
export interface BaseControlProps<T = any> extends BaseComponentProps {
  /** Current value */
  value: T;
  /** Callback when value changes */
  onChange: (value: T) => void;
  /** Element type για description context */
  elementType?: string;
  /** Real-time preview callback */
  onPreview?: (key: string, value: string) => void;
}

/**
 * Props για numeric controls (border width, spacing, κλπ.)
 */
export interface NumericControlProps extends BaseControlProps<number> {
  min?: number;
  max?: number;
  step?: number;
}

/**
 * Props για string controls (radius, effects, κλπ.)
 */
export interface StringControlProps extends BaseControlProps<string> {
  options?: Array<{ value: string; label: string; disabled?: boolean }>;
}

// ============================================================================
// EXPORT ALIASES (για compatibility)
// ============================================================================

// Control-related
export type BorderWidthControlProps = NumericControlProps;
export type BorderRadiusControlProps = StringControlProps;
export type HoverControlProps = StringControlProps;
export type ActiveControlProps = StringControlProps;

// Color-related
export type ColorPickerWithAlphaProps = BaseColorPickerProps;
export type ColorControlsGridProps = ColorControlsProps;
export type ColorControlsGridWithAlphaProps = ColorControlsProps;
export type CategorySelectionProps = CategoryProps;
export type ColorActionsPanelProps = ColorActionsProps;

// Playground-related
export type ButtonsPlaygroundProps = ButtonPlaygroundProps;
export type CardsPlaygroundProps = LayoutPlaygroundProps;

// Map-related
export type GeoMapProps = BaseMapProps;