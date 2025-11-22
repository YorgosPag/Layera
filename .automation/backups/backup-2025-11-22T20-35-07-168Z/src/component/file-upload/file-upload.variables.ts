/**
 * 📁 LAYERA FILE UPLOAD VARIABLES - Complete file upload system design tokens
 *
 * Enterprise-grade file upload component system ακολουθώντας το Cloudscape (AWS) model.
 * Concrete τιμές που χαρτογραφούν semantic tokens σε συγκεκριμένες CSS properties
 * για File Upload components με όλα τα sub-components σε έναν φάκελο.
 *
 * Sub-Components Included:
 * - Upload Zone (drag & drop area)
 * - Progress Indicators (upload progress)
 * - File Previews (uploaded file display)
 * - Validation States (error, success, warning)
 * - Interactive States (hover, focus, disabled)
 */

// Import των semantic και core tokens που χρησιμοποιούμε
import { BACKGROUND_VARIABLES } from '../../semantic/background/background.variables';
import { TEXT_VARIABLES } from '../../semantic/text/text.variables';
import { BORDER_SEMANTIC_VARIABLES } from '../../semantic/border/border.variables';
import { MOTION_VARIABLES } from '../../core/motion/motion.variables';
import { SPACING_VARIABLES } from '../../core/spacing/spacing.variables';
import { BORDER_VARIABLES } from '../../core/borders/borders.variables';
import { SHADOW_VARIABLES } from '../../core/shadows/shadows.variables';

// FILE UPLOAD TYPE DEFINITIONS
export type FileUploadVariant = 'default' | 'compact' | 'minimal' | 'enhanced';
export type FileUploadSize = 'sm' | 'md' | 'lg' | 'xl';
export type FileUploadState = 'idle' | 'drag-over' | 'uploading' | 'success' | 'error';
export type FileUploadType = 'single' | 'multiple' | 'directory';
export type ProgressVariant = 'linear' | 'circular' | 'minimal' | 'detailed';

// ═══════════════════════════════════════════════════════════════════════════════════════
// 🔧 CORE FILE UPLOAD VARIABLES - Base upload zone styling
// ═══════════════════════════════════════════════════════════════════════════════════════

export const FILE_UPLOAD_VARIABLES = {
  // Base upload zone properties
  'upload-zone-font-family': 'var(--layera-fontFamily-body)',
  'upload-zone-font-size': 'var(--layera-fontSize-base)',
  'upload-zone-line-height': 'var(--layera-lineHeight-normal)',
  'upload-zone-text-color': 'var(--layera-color-text-secondary)',

  // Upload zone layout & dimensions
  'upload-zone-min-height': 'var(--layera-global-spacing-32)',
  'upload-zone-padding': 'var(--layera-global-spacing-8)',
  'upload-zone-border-radius': 'var(--layera-global-borderRadius-lg)',
  'upload-zone-border-width': 'var(--layera-global-borderWidth-thick)',
  'upload-zone-border-style': 'dashed',

  // Background & surface
  'upload-zone-background': BACKGROUND_VARIABLES['background-subtle'],
  'upload-zone-background-hover': 'var(--layera-color-surface-hover)',
  'upload-zone-background-active': 'var(--layera-color-primary-50)',

  // Border colors για διαφορετικές καταστάσεις
  'upload-zone-border-default': 'var(--layera-color-border-muted)',
  'upload-zone-border-hover': 'var(--layera-color-border-primary)',
  'upload-zone-border-drag-over': 'var(--layera-color-primary-300)',
  'upload-zone-border-error': 'var(--layera-color-border-error)',
  'upload-zone-border-success': 'var(--layera-color-border-success)',

  // Icon styling
  'upload-zone-icon-size': 'var(--layera-global-spacing-12)',
  'upload-zone-icon-color': 'var(--layera-color-text-muted)',
  'upload-zone-icon-margin-bottom': 'var(--layera-global-spacing-4)',

  // Text styling
  'upload-zone-title-font-size': 'var(--layera-fontSize-lg)',
  'upload-zone-title-font-weight': 'var(--layera-fontWeight-semibold)',
  'upload-zone-title-color': 'var(--layera-color-text-primary)',
  'upload-zone-title-margin-bottom': 'var(--layera-global-spacing-2)',

  'upload-zone-subtitle-font-size': 'var(--layera-fontSize-sm)',
  'upload-zone-subtitle-color': 'var(--layera-color-text-secondary)',
  'upload-zone-subtitle-margin-bottom': 'var(--layera-global-spacing-4)',

  // Button styling inside upload zone
  'upload-zone-button-margin-top': 'var(--layera-global-spacing-4)',

  // Transitions & animations
  'upload-zone-transition': 'all var(--layera-duration-normal) var(--layera-easing-ease-out)',
  'upload-zone-transform-hover': 'translateY(-2px)',
  'upload-zone-shadow': 'var(--layera-shadow-sm)',
  'upload-zone-shadow-hover': 'var(--layera-shadow-lg)',
} as const;

// ═══════════════════════════════════════════════════════════════════════════════════════
// 📊 PROGRESS INDICATOR VARIABLES - Upload progress styling
// ═══════════════════════════════════════════════════════════════════════════════════════

export const PROGRESS_VARIABLES = {
  // Linear progress bar
  'progress-height': 'var(--layera-global-spacing-1)',
  'progress-border-radius': 'var(--layera-global-borderRadius-full)',
  'progress-background': BACKGROUND_VARIABLES['background-muted'], // file-upload specific progress background
  'progress-fill-background': 'var(--layera-color-primary-500)',
  'progress-fill-background-success': 'var(--layera-color-success-500)',
  'progress-fill-background-error': 'var(--layera-color-error-500)',

  // Progress animation
  'progress-animation': 'progressMove var(--layera-duration-slow) ease-in-out infinite',
  'progress-transition': 'width var(--layera-duration-fast) var(--layera-easing-ease-out)',

  // Progress text
  'progress-text-font-size': 'var(--layera-fontSize-xs)',
  'progress-text-color': 'var(--layera-color-text-secondary)',
  'progress-text-margin-top': 'var(--layera-global-spacing-1)',

  // Circular progress (για detailed mode)
  'progress-circular-size': 'var(--layera-global-spacing-8)',
  'progress-circular-stroke-width': 'var(--layera-global-spacing-0-5)',
  'progress-circular-color': 'var(--layera-color-primary-500)',

  // Progress container
  'progress-container-margin': 'var(--layera-global-spacing-2) 0',
  'progress-container-padding': 'var(--layera-global-spacing-2)',
} as const;

// ═══════════════════════════════════════════════════════════════════════════════════════
// 📄 FILE PREVIEW VARIABLES - Uploaded files display tokens
// ═══════════════════════════════════════════════════════════════════════════════════════

export const FILE_PREVIEW_VARIABLES = {
  // File token/chip styling
  'file-token-padding': 'var(--layera-global-spacing-2) var(--layera-global-spacing-3)',
  'file-token-border-radius': 'var(--layera-global-borderRadius-md)',
  'file-token-background': 'var(--layera-color-surface-secondary)',
  'file-token-border': '1px solid var(--layera-color-border-muted)',
  'file-token-margin': 'var(--layera-global-spacing-1)',

  // File token hover states
  'file-token-background-hover': 'var(--layera-color-surface-hover)',
  'file-token-border-hover': 'var(--layera-color-border-primary)',

  // File token text
  'file-token-font-size': 'var(--layera-fontSize-sm)',
  'file-token-font-weight': 'var(--layera-fontWeight-medium)',
  'file-token-color': 'var(--layera-color-text-primary)',

  // File icon in token
  'file-token-icon-size': 'var(--layera-global-spacing-4)',
  'file-token-icon-color': 'var(--layera-color-text-secondary)',
  'file-token-icon-margin-right': 'var(--layera-global-spacing-2)',

  // Remove button in file token
  'file-token-remove-size': 'var(--layera-global-spacing-5)',
  'file-token-remove-color': 'var(--layera-color-text-muted)',
  'file-token-remove-hover-color': 'var(--layera-color-error-500)',
  'file-token-remove-margin-left': 'var(--layera-global-spacing-2)',

  // File list container
  'file-list-gap': 'var(--layera-global-spacing-2)',
  'file-list-margin-top': 'var(--layera-global-spacing-4)',
  'file-list-max-height': 'var(--layera-global-spacing-48)',
  'file-list-overflow': 'auto',

  // File metadata display
  'file-meta-font-size': 'var(--layera-fontSize-xs)',
  'file-meta-color': 'var(--layera-color-text-muted)',
  'file-meta-margin-top': 'var(--layera-global-spacing-1)',

  // File preview thumbnail
  'file-thumbnail-size': 'var(--layera-global-spacing-16)',
  'file-thumbnail-border-radius': 'var(--layera-global-borderRadius-md)',
  'file-thumbnail-border': '1px solid var(--layera-color-border-muted)',
} as const;

// ═══════════════════════════════════════════════════════════════════════════════════════
// 🎯 DRAG & DROP VARIABLES - Interactive drag states
// ═══════════════════════════════════════════════════════════════════════════════════════

export const DRAG_DROP_VARIABLES = {
  // Drag overlay styling
  'drag-overlay-background': 'rgba(var(--layera-color-primary-500-rgb), 0.1)',
  'drag-overlay-border': '2px dashed var(--layera-color-primary-400)',
  'drag-overlay-border-radius': 'var(--layera-global-borderRadius-lg)',

  // Drag indicator animation
  'drag-indicator-animation': 'dragPulse var(--layera-duration-normal) ease-in-out infinite',
  'drag-indicator-transform': 'scale(1.05)',

  // Drop zone active state
  'drop-zone-active-background': 'var(--layera-color-primary-25)',
  'drop-zone-active-border': 'var(--layera-color-primary-500)',
  'drop-zone-active-shadow': '0 0 0 4px rgba(var(--layera-color-primary-500-rgb), 0.1)',

  // Drag feedback text
  'drag-feedback-font-size': 'var(--layera-fontSize-lg)',
  'drag-feedback-font-weight': 'var(--layera-fontWeight-semibold)',
  'drag-feedback-color': 'var(--layera-color-primary-600)',

  // Invalid drag state
  'drag-invalid-background': 'rgba(var(--layera-color-error-500-rgb), 0.05)',
  'drag-invalid-border': 'var(--layera-color-error-400)',
  'drag-invalid-color': 'var(--layera-color-error-600)',
} as const;

// ═══════════════════════════════════════════════════════════════════════════════════════
// ✅ VALIDATION STATE VARIABLES - Error, success, warning states
// ═══════════════════════════════════════════════════════════════════════════════════════

export const VALIDATION_VARIABLES = {
  // Success state
  'validation-success-color': 'var(--layera-color-success-600)',
  'validation-success-background': 'var(--layera-color-success-50)',
  'validation-success-border': 'var(--layera-color-success-300)',
  'validation-success-icon-color': 'var(--layera-color-success-500)',

  // Error state
  'validation-error-color': 'var(--layera-color-error-600)',
  'validation-error-background': 'var(--layera-color-error-50)',
  'validation-error-border': 'var(--layera-color-error-300)',
  'validation-error-icon-color': 'var(--layera-color-error-500)',

  // Warning state
  'validation-warning-color': 'var(--layera-color-warning-600)',
  'validation-warning-background': 'var(--layera-color-warning-50)',
  'validation-warning-border': 'var(--layera-color-warning-300)',
  'validation-warning-icon-color': 'var(--layera-color-warning-500)',

  // Info state
  'validation-info-color': 'var(--layera-color-info-600)',
  'validation-info-background': 'var(--layera-color-info-50)',
  'validation-info-border': 'var(--layera-color-info-300)',
  'validation-info-icon-color': 'var(--layera-color-info-500)',

  // Validation message styling
  'validation-message-font-size': 'var(--layera-fontSize-sm)',
  'validation-message-margin-top': 'var(--layera-global-spacing-2)',
  'validation-message-padding': 'var(--layera-global-spacing-2) var(--layera-global-spacing-3)',
  'validation-message-border-radius': 'var(--layera-global-borderRadius-md)',

  // Validation icon
  'validation-icon-size': 'var(--layera-global-spacing-4)',
  'validation-icon-margin-right': 'var(--layera-global-spacing-2)',
} as const;

// ═══════════════════════════════════════════════════════════════════════════════════════
// 📏 SIZE VARIANTS - Different upload zone sizes
// ═══════════════════════════════════════════════════════════════════════════════════════

export const FILE_UPLOAD_SIZE_VARIABLES = {
  // Small upload zone
  small: {
    'upload-zone-min-height': 'var(--layera-global-spacing-24)',
    'upload-zone-padding': 'var(--layera-global-spacing-4)',
    'upload-zone-icon-size': 'var(--layera-global-spacing-8)',
    'upload-zone-title-font-size': 'var(--layera-fontSize-base)',
    'upload-zone-subtitle-font-size': 'var(--layera-fontSize-xs)',
  },

  // Medium upload zone (default)
  medium: {
    'upload-zone-min-height': 'var(--layera-global-spacing-32)',
    'upload-zone-padding': 'var(--layera-global-spacing-8)',
    'upload-zone-icon-size': 'var(--layera-global-spacing-12)',
    'upload-zone-title-font-size': 'var(--layera-fontSize-lg)',
    'upload-zone-subtitle-font-size': 'var(--layera-fontSize-sm)',
  },

  // Large upload zone
  large: {
    'upload-zone-min-height': 'var(--layera-global-spacing-40)',
    'upload-zone-padding': 'var(--layera-global-spacing-12)',
    'upload-zone-icon-size': 'var(--layera-global-spacing-16)',
    'upload-zone-title-font-size': 'var(--layera-fontSize-xl)',
    'upload-zone-subtitle-font-size': 'var(--layera-fontSize-base)',
  },

  // Extra large upload zone
  xl: {
    'upload-zone-min-height': 'var(--layera-global-spacing-48)',
    'upload-zone-padding': 'var(--layera-global-spacing-16)',
    'upload-zone-icon-size': 'var(--layera-global-spacing-20)',
    'upload-zone-title-font-size': 'var(--layera-fontSize-2xl)',
    'upload-zone-subtitle-font-size': 'var(--layera-fontSize-lg)',
  },
} as const;

// ═══════════════════════════════════════════════════════════════════════════════════════
// 🎨 VARIANT SPECIFIC VARIABLES - Different upload styles
// ═══════════════════════════════════════════════════════════════════════════════════════

export const FILE_UPLOAD_VARIANT_VARIABLES = {
  // Default variant - Standard upload zone
  default: {
    'upload-zone-border-style': 'dashed',
    'upload-zone-background': 'var(--layera-color-surface-secondary)',
    'upload-zone-border-width': 'var(--layera-global-borderWidth-thick)',
  },

  // Compact variant - Minimal space usage
  compact: {
    'upload-zone-min-height': 'var(--layera-global-spacing-16)',
    'upload-zone-padding': 'var(--layera-global-spacing-4)',
    'upload-zone-border-style': 'solid',
    'upload-zone-border-width': 'var(--layera-global-borderWidth-default)',
  },

  // Minimal variant - Clean, subtle design
  minimal: {
    'upload-zone-background': 'transparent',
    'upload-zone-border-style': 'solid',
    'upload-zone-border-width': 'var(--layera-global-borderWidth-default)',
    'upload-zone-border-color': 'var(--layera-color-border-subtle)',
  },

  // Enhanced variant - Rich upload experience
  enhanced: {
    'upload-zone-background': 'linear-gradient(135deg, var(--layera-color-primary-25) 0%, var(--layera-color-surface-secondary) 100%)',
    'upload-zone-border-style': 'solid',
    'upload-zone-border-width': 'var(--layera-global-borderWidth-thick)',
    'upload-zone-shadow': 'var(--layera-shadow-lg)',
  },
} as const;

// ═══════════════════════════════════════════════════════════════════════════════════════
// 📱 RESPONSIVE VARIABLES - Mobile-first file upload
// ═══════════════════════════════════════════════════════════════════════════════════════

export const RESPONSIVE_FILE_UPLOAD_VARIABLES = {
  // Mobile optimizations
  mobile: {
    'upload-zone-min-height': 'var(--layera-global-spacing-20)',
    'upload-zone-padding': 'var(--layera-global-spacing-4)',
    'upload-zone-title-font-size': 'var(--layera-fontSize-base)',
    'upload-zone-subtitle-font-size': 'var(--layera-fontSize-xs)',
    'file-token-padding': 'var(--layera-global-spacing-1) var(--layera-global-spacing-2)',
  },

  // Tablet adaptations
  tablet: {
    'upload-zone-min-height': 'var(--layera-global-spacing-28)',
    'upload-zone-padding': 'var(--layera-global-spacing-6)',
    'upload-zone-title-font-size': 'var(--layera-fontSize-lg)',
    'upload-zone-subtitle-font-size': 'var(--layera-fontSize-sm)',
  },

  // Desktop optimizations
  desktop: {
    'upload-zone-min-height': 'var(--layera-global-spacing-32)',
    'upload-zone-padding': 'var(--layera-global-spacing-8)',
    'upload-zone-title-font-size': 'var(--layera-fontSize-xl)',
    'upload-zone-subtitle-font-size': 'var(--layera-fontSize-base)',
  },
} as const;

// ═══════════════════════════════════════════════════════════════════════════════════════
// 🎞️ ANIMATION VALUES - File upload animations
// ═══════════════════════════════════════════════════════════════════════════════════════

export const FILE_UPLOAD_ANIMATION_VALUES = {
  // Progress bar movement
  progressMove: {
    '0%': { backgroundPosition: '0% 0%' },
    '100%': { backgroundPosition: '100% 0%' },
  },

  // Drag pulse effect
  dragPulse: {
    '0%, 100%': { transform: 'scale(1)' },
    '50%': { transform: 'scale(1.05)' },
  },

  // File fade in animation
  fileFadeIn: {
    '0%': { opacity: '0', transform: 'translateY(10px)' },
    '100%': { opacity: '1', transform: 'translateY(0)' },
  },

  // Upload success animation
  uploadSuccess: {
    '0%': { transform: 'scale(0.8)', opacity: '0' },
    '50%': { transform: 'scale(1.1)', opacity: '1' },
    '100%': { transform: 'scale(1)', opacity: '1' },
  },

  // Shake animation για validation errors
  uploadError: {
    '0%, 100%': { transform: 'translateX(0)' },
    '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-5px)' },
    '20%, 40%, 60%, 80%': { transform: 'translateX(5px)' },
  },
} as const;