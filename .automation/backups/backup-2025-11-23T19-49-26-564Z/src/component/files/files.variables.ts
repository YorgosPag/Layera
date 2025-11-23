/**
 * 📁 LAYERA FILES COMPONENT TOKENS
 *
 * Component tokens για File Upload, Download, Transformation και Management components
 * που χαρτογραφούν semantic tokens σε συγκεκριμένες file-handling χρήσεις
 * Enterprise component layer - τελευταίο επίπεδο της τρι-επίπεδης ιεραρχίας
 */

// Import των semantic και core tokens που χρησιμοποιούμε
import { BACKGROUND_VARIABLES } from '../../semantic/background/background.variables';
import { TEXT_VARIABLES } from '../../semantic/text/text.variables';
import { BORDER_SEMANTIC_VARIABLES } from '../../semantic/border/border.variables';
import { MOTION_VARIABLES } from '../../core/motion/motion.variables';
import { SPACING_VARIABLES } from '../../core/spacing/spacing.variables';
import { BORDER_VARIABLES } from '../../core/borders/borders.variables';
import { SHADOW_VARIABLES } from '../../core/shadows/shadows.variables';
import { FONT_SIZE_SCALE, FONT_WEIGHT_SCALE, LINE_HEIGHT_SCALE } from '../../core/typography/typography.variables';

// UNIFIED FILES VARIABLES - Όλα τα files tokens ενωμένα για CSS export
export const FILES_VARIABLES = {
  // BASE FILE CONTAINER TOKENS
  'file-container-background': BACKGROUND_VARIABLES['background-default'],
  'file-container-border': BORDER_SEMANTIC_VARIABLES['border-default'],
  'file-container-border-radius': BORDER_VARIABLES['border-radius-8'],
  'file-container-padding': SPACING_VARIABLES['spacing-4'],
  'file-container-shadow': SHADOW_VARIABLES['shadow-sm'],


  // FILE PROGRESS TOKENS
  'file-progress-background': BACKGROUND_VARIABLES['background-muted'],
  'file-progress-fill': BACKGROUND_VARIABLES['background-active'],
  'file-progress-height': SPACING_VARIABLES['spacing-1'],
  'file-progress-border-radius': BORDER_VARIABLES['border-radius-full'],
  'file-progress-animation': MOTION_VARIABLES['transition-slow'],

  // FILE LIST ITEM TOKENS
  'file-item-background': BACKGROUND_VARIABLES['background-default'],
  'file-item-background-hover': BACKGROUND_VARIABLES['background-hover'],
  'file-item-background-selected': BACKGROUND_VARIABLES['background-active'],
  'file-item-border': BORDER_SEMANTIC_VARIABLES['border-subtle'],
  'file-item-border-radius': BORDER_VARIABLES['border-radius-6'],
  'file-item-padding': `${SPACING_VARIABLES['spacing-3']} ${SPACING_VARIABLES['spacing-4']}`,
  'file-item-gap': SPACING_VARIABLES['spacing-3'],
  'file-item-shadow': 'none',
  'file-item-shadow-hover': SHADOW_VARIABLES['shadow-sm'],

  // FILE ICON TOKENS
  'file-icon-size': SPACING_VARIABLES['spacing-10'],
  'file-icon-size-sm': SPACING_VARIABLES['spacing-6'],
  'file-icon-size-lg': SPACING_VARIABLES['spacing-16'],
  'file-icon-color-default': TEXT_VARIABLES['text-tertiary'],
  'file-icon-color-pdf': '#FF4444',
  'file-icon-color-doc': '#4A90E2',
  'file-icon-color-xls': '#34C759',
  'file-icon-color-ppt': '#FF8C00',
  'file-icon-color-zip': '#8E8E93',
  'file-icon-color-image': '#FF69B4',
  'file-icon-color-video': '#9B59B6',
  'file-icon-color-audio': '#E74C3C',
  'file-icon-color-code': '#2ECC71',

  // FILE NAME/INFO TOKENS
  'file-name-color': TEXT_VARIABLES['text-primary'],
  'file-name-font-size': FONT_SIZE_SCALE.sm, // 14px
  'file-name-font-weight': FONT_WEIGHT_SCALE.medium,
  'file-name-line-height': LINE_HEIGHT_SCALE.snug,
  'file-info-color': TEXT_VARIABLES['text-secondary'],
  'file-info-font-size': FONT_SIZE_SCALE.xs, // 12px
  'file-size-color': TEXT_VARIABLES['text-tertiary'],

  // FILE PREVIEW TOKENS
  'file-preview-background': BACKGROUND_VARIABLES['background-default'],
  'file-preview-border': BORDER_SEMANTIC_VARIABLES['border-default'],
  'file-preview-border-radius': BORDER_VARIABLES['border-radius-8'],
  'file-preview-shadow': SHADOW_VARIABLES['shadow-lg'],
  'file-preview-padding': SPACING_VARIABLES['spacing-6'],
  'file-preview-max-width': SPACING_VARIABLES['spacing-96'],
  'file-preview-max-height': SPACING_VARIABLES['spacing-100'], // 400px

  // THUMBNAIL TOKENS
  'thumbnail-size': SPACING_VARIABLES['spacing-16'],
  'thumbnail-size-sm': SPACING_VARIABLES['spacing-12'],
  'thumbnail-size-lg': SPACING_VARIABLES['spacing-24'],
  'thumbnail-border-radius': BORDER_VARIABLES['border-radius-4'],
  'thumbnail-border': BORDER_SEMANTIC_VARIABLES['border-subtle'],
  'thumbnail-background': BACKGROUND_VARIABLES['background-muted'],

  // FILE STATUS TOKENS
  'file-status-uploading-color': TEXT_VARIABLES['text-info'],
  'file-status-success-color': TEXT_VARIABLES['text-success'],
  'file-status-error-color': TEXT_VARIABLES['text-error'],
  'file-status-processing-color': TEXT_VARIABLES['text-warning'],
  'file-status-cancelled-color': TEXT_VARIABLES['text-tertiary'],

  // FILE ACTIONS TOKENS
  'file-action-button-size': SPACING_VARIABLES['spacing-8'],
  'file-action-button-color': TEXT_VARIABLES['text-secondary'],
  'file-action-button-hover': TEXT_VARIABLES['text-primary'],
  'file-action-delete-color': TEXT_VARIABLES['text-error'],
  'file-action-download-color': TEXT_VARIABLES['text-success'],

  // DRAG & DROP TOKENS (file-specific drag indicators)
  'drop-indicator-color': BORDER_SEMANTIC_VARIABLES['border-focus'],
  'drop-indicator-width': BORDER_VARIABLES['border-width-2'],
  'drop-indicator-style': 'solid',
  'drop-overlay-background': 'rgba(0, 0, 0, 0.05)',
  'drop-overlay-backdrop': 'blur(1px)',

  // FILE VALIDATION TOKENS
  'validation-error-background': BACKGROUND_VARIABLES['background-error'],
  'validation-error-color': TEXT_VARIABLES['text-error'],
  'validation-error-border': BORDER_SEMANTIC_VARIABLES['border-error'],
  'validation-success-background': BACKGROUND_VARIABLES['background-success'],
  'validation-success-color': TEXT_VARIABLES['text-success'],

  // FILE SIZE LIMITS TOKENS
  'size-limit-text': TEXT_VARIABLES['text-tertiary'],
  'size-limit-warning': TEXT_VARIABLES['text-warning'],
  'size-limit-error': TEXT_VARIABLES['text-error'],

  // TRANSFORMATION PROGRESS TOKENS
  'transform-progress-background': BACKGROUND_VARIABLES['background-muted'],
  'transform-progress-color': BACKGROUND_VARIABLES['background-info'],
  'transform-progress-height': SPACING_VARIABLES['spacing-1'],
  'transform-progress-text': TEXT_VARIABLES['text-info'],

  // FILE CONVERSION STATUS TOKENS
  'conversion-pending-color': TEXT_VARIABLES['text-warning'],
  'conversion-processing-color': TEXT_VARIABLES['text-info'],
  'conversion-complete-color': TEXT_VARIABLES['text-success'],
  'conversion-failed-color': TEXT_VARIABLES['text-error'],

  // BATCH OPERATIONS TOKENS
  'batch-selection-background': BACKGROUND_VARIABLES['background-active'],
  'batch-selection-border': BORDER_SEMANTIC_VARIABLES['border-focus'],
  'batch-actions-background': BACKGROUND_VARIABLES['background-subtle'],
  'batch-actions-padding': SPACING_VARIABLES['spacing-4'],
  'batch-counter-background': BACKGROUND_VARIABLES['background-info'],
  'batch-counter-color': TEXT_VARIABLES['text-info-contrast'],

  // FILE COMPRESSION TOKENS
  'compression-indicator-color': TEXT_VARIABLES['text-success'],
  'compression-ratio-color': TEXT_VARIABLES['text-secondary'],
  'compression-savings-color': TEXT_VARIABLES['text-success'],

  // ACCESSIBILITY TOKENS
  'file-focus-outline': BORDER_SEMANTIC_VARIABLES['border-focus'],
  'file-focus-outline-offset': SPACING_VARIABLES['spacing-1'],
  'file-aria-label-color': TEXT_VARIABLES['text-primary'],

} as const;

// Helper types για type safety
export type FileType = 'image' | 'document' | 'video' | 'audio' | 'archive' | 'code' | 'other';
export type FileStatus = 'idle' | 'uploading' | 'processing' | 'success' | 'error' | 'cancelled';
export type FileSize = 'sm' | 'md' | 'lg';
export type FileAction = 'download' | 'delete' | 'rename' | 'share' | 'preview' | 'convert';
export type ConversionStatus = 'pending' | 'processing' | 'complete' | 'failed';
export type DropZoneState = 'idle' | 'hover' | 'active' | 'error' | 'success';