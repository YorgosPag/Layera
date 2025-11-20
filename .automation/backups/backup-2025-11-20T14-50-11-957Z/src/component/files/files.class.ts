/**
 * 📁 LAYERA FILES CLASS - Files system structure & CSS generation
 *
 * Enterprise class που ορίζει τη δομή και τους κανόνες για το files system
 * Χρησιμοποιείται για validation, CSS generation και type safety σε components
 */

import { FILES_VARIABLES } from './files.variables';
import {
  UPLOAD_ZONE_VARIANTS,
  FILE_LIST_VARIANTS,
  FILE_TYPE_VARIANTS,
  FILE_STATUS_VARIANTS,
  FILE_PREVIEW_VARIANTS,
  FILE_SIZE_VARIANTS,
  BATCH_OPERATIONS_VARIANTS
} from './files.variants';

// FILES SYSTEM CLASS - Enterprise structure
export class FilesSystem {
  // Files tokens
  static readonly variables = FILES_VARIABLES;
  static readonly uploadZoneVariants = UPLOAD_ZONE_VARIANTS;
  static readonly fileListVariants = FILE_LIST_VARIANTS;
  static readonly fileTypeVariants = FILE_TYPE_VARIANTS;
  static readonly statusVariants = FILE_STATUS_VARIANTS;
  static readonly previewVariants = FILE_PREVIEW_VARIANTS;
  static readonly sizeVariants = FILE_SIZE_VARIANTS;
  static readonly batchVariants = BATCH_OPERATIONS_VARIANTS;

  // Utility methods για validation
  static isValidUploadZoneVariant(variant: string): boolean {
    return Object.keys(this.uploadZoneVariants).includes(variant);
  }

  static isValidFileType(type: string): boolean {
    return Object.keys(this.fileTypeVariants).includes(type);
  }

  static isValidFileStatus(status: string): boolean {
    return Object.keys(this.statusVariants).includes(status);
  }

  static isValidSize(size: string): boolean {
    return Object.keys(this.sizeVariants).includes(size);
  }

  // Helper για upload zone CSS generation
  static getUploadZoneCSS(variant: keyof typeof UPLOAD_ZONE_VARIANTS) {
    const variantProps = this.uploadZoneVariants[variant];

    return {
      background: variantProps.background,
      border: `2px ${variantProps.borderStyle} ${variantProps.border}`,
      borderRadius: variantProps.borderRadius,
      padding: variantProps.padding,
      minHeight: variantProps.minHeight,
      color: variantProps.textColor,
      transition: FILES_VARIABLES['upload-zone-transition'],
      cursor: 'pointer',
      textAlign: 'center',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    };
  }

  // Helper για file list CSS generation
  static getFileListCSS(variant: keyof typeof FILE_LIST_VARIANTS) {
    const variantProps = this.fileListVariants[variant];

    return {
      display: variantProps.layout === 'grid' ? 'grid' : variantProps.layout === 'table' ? 'table' : 'flex',
      gap: variantProps.itemGap,
      gridTemplateColumns: variantProps.layout === 'grid' ? 'repeat(auto-fill, minmax(200px, 1fr))' : undefined,
      flexDirection: variantProps.layout === 'list' ? 'column' : undefined,
    };
  }

  // Helper για file item CSS generation
  static getFileItemCSS(
    listVariant: keyof typeof FILE_LIST_VARIANTS,
    size: keyof typeof FILE_SIZE_VARIANTS = 'medium',
    status: keyof typeof FILE_STATUS_VARIANTS = 'success'
  ) {
    const listProps = this.fileListVariants[listVariant];
    const sizeProps = this.sizeVariants[size];
    const statusProps = this.statusVariants[status];

    return {
      background: listProps.itemBackground,
      border: listProps.itemBorder,
      borderRadius: listProps.itemBorderRadius,
      padding: sizeProps.padding,
      cursor: 'pointer',
      transition: FILES_VARIABLES['upload-zone-transition'],
      display: 'flex',
      alignItems: 'center',
      gap: listProps.itemGap,
      color: statusProps.statusColor,
    };
  }

  // Helper για file type icon CSS
  static getFileTypeCSS(type: keyof typeof FILE_TYPE_VARIANTS) {
    const typeProps = this.fileTypeVariants[type];

    return {
      color: typeProps.iconColor,
      width: typeProps.thumbnailSize,
      height: typeProps.thumbnailSize,
    };
  }

  // Helper για progress bar CSS
  static getProgressBarCSS(status: keyof typeof FILE_STATUS_VARIANTS) {
    const statusProps = this.statusVariants[status];

    if (!statusProps.showProgress) {
      return { display: 'none' };
    }

    return {
      width: '100%',
      height: FILES_VARIABLES['file-progress-height'],
      background: statusProps.progressBackground,
      borderRadius: FILES_VARIABLES['file-progress-border-radius'],
      overflow: 'hidden',
      position: 'relative',
    };
  }
}

// FILES CSS CLASSES - Generated CSS classes για direct usage
export const LAYERA_FILES_CSS = `
/* 📁 LAYERA FILES COMPONENT STYLES */

/* Base File Container */
.layera-file-container {
  background: var(--layera-file-container-background);
  border: 1px solid var(--layera-file-container-border);
  border-radius: var(--layera-file-container-border-radius);
  padding: var(--layera-file-container-padding);
  box-shadow: var(--layera-file-container-shadow);
}

/* Upload Zone Styles */
.layera-upload-zone {
  background: var(--layera-upload-zone-background);
  border: 2px var(--layera-upload-zone-border-style) var(--layera-upload-zone-border);
  border-radius: var(--layera-upload-zone-border-radius);
  padding: var(--layera-upload-zone-padding);
  min-height: var(--layera-upload-zone-min-height);
  color: var(--layera-upload-zone-text-color);
  transition: var(--layera-upload-zone-transition);
  cursor: pointer;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: var(--layera-file-item-gap);
}

.layera-upload-zone:hover {
  background: var(--layera-upload-zone-background-hover);
  border-color: var(--layera-upload-zone-border-hover);
  color: var(--layera-upload-zone-text-hover);
}

.layera-upload-zone--active {
  background: var(--layera-upload-zone-background-active);
  border-color: var(--layera-upload-zone-border-active);
}

.layera-upload-zone--error {
  background: var(--layera-upload-zone-background-error);
  border-color: var(--layera-upload-zone-border-error);
}

.layera-upload-zone--success {
  background: var(--layera-upload-zone-background-success);
  border-color: var(--layera-upload-zone-border-success);
}

/* Upload Zone Variants */
.layera-upload-zone--compact {
  min-height: var(--layera-spacing-16);
  padding: var(--layera-file-item-padding);
  border-radius: var(--layera-file-item-border-radius);
}

.layera-upload-zone--inline {
  background: transparent;
  border-radius: var(--layera-file-item-border-radius);
  padding: var(--layera-file-item-padding);
  min-height: auto;
}

/* File List Styles */
.layera-file-list {
  display: flex;
  flex-direction: column;
  gap: var(--layera-file-item-gap);
}

.layera-file-list--grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: var(--layera-file-item-gap);
}

.layera-file-list--table {
  display: table;
  width: 100%;
  border-collapse: collapse;
}

/* File Item Styles */
.layera-file-item {
  background: var(--layera-file-item-background);
  border: 1px solid var(--layera-file-item-border);
  border-radius: var(--layera-file-item-border-radius);
  padding: var(--layera-file-item-padding);
  cursor: pointer;
  transition: var(--layera-upload-zone-transition);
  display: flex;
  align-items: center;
  gap: var(--layera-file-item-gap);
}

.layera-file-item:hover {
  background: var(--layera-file-item-background-hover);
  box-shadow: var(--layera-file-item-shadow-hover);
}

.layera-file-item--selected {
  background: var(--layera-file-item-background-selected);
  border-color: var(--layera-batch-selection-border);
}

/* File Icon Styles */
.layera-file-icon {
  width: var(--layera-file-icon-size);
  height: var(--layera-file-icon-size);
  color: var(--layera-file-icon-color-default);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.layera-file-icon--sm {
  width: var(--layera-file-icon-size-sm);
  height: var(--layera-file-icon-size-sm);
}

.layera-file-icon--lg {
  width: var(--layera-file-icon-size-lg);
  height: var(--layera-file-icon-size-lg);
}

/* File Type Colors */
.layera-file-icon--pdf { color: var(--layera-file-icon-color-pdf); }
.layera-file-icon--doc { color: var(--layera-file-icon-color-doc); }
.layera-file-icon--xls { color: var(--layera-file-icon-color-xls); }
.layera-file-icon--ppt { color: var(--layera-file-icon-color-ppt); }
.layera-file-icon--zip { color: var(--layera-file-icon-color-zip); }
.layera-file-icon--image { color: var(--layera-file-icon-color-image); }
.layera-file-icon--video { color: var(--layera-file-icon-color-video); }
.layera-file-icon--audio { color: var(--layera-file-icon-color-audio); }
.layera-file-icon--code { color: var(--layera-file-icon-color-code); }

/* File Information */
.layera-file-info {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  min-width: 0;
}

.layera-file-name {
  color: var(--layera-file-name-color);
  font-size: var(--layera-file-name-font-size);
  font-weight: var(--layera-file-name-font-weight);
  line-height: var(--layera-file-name-line-height);
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.layera-file-meta {
  color: var(--layera-file-info-color);
  font-size: var(--layera-file-info-font-size);
  margin: 0;
  display: flex;
  gap: var(--layera-spacing-2);
}

.layera-file-size {
  color: var(--layera-file-size-color);
}

/* File Progress */
.layera-file-progress {
  width: 100%;
  height: var(--layera-file-progress-height);
  background: var(--layera-file-progress-background);
  border-radius: var(--layera-file-progress-border-radius);
  overflow: hidden;
  position: relative;
  margin-top: var(--layera-spacing-2);
}

.layera-file-progress__fill {
  height: 100%;
  background: var(--layera-file-progress-fill);
  border-radius: inherit;
  transition: width var(--layera-file-progress-animation);
  width: 0%;
}

/* File Status */
.layera-file-status {
  display: flex;
  align-items: center;
  gap: var(--layera-spacing-1);
  font-size: var(--layera-file-info-font-size);
}

.layera-file-status--uploading { color: var(--layera-file-status-uploading-color); }
.layera-file-status--success { color: var(--layera-file-status-success-color); }
.layera-file-status--error { color: var(--layera-file-status-error-color); }
.layera-file-status--processing { color: var(--layera-file-status-processing-color); }
.layera-file-status--cancelled { color: var(--layera-file-status-cancelled-color); }

/* File Actions */
.layera-file-actions {
  display: flex;
  align-items: center;
  gap: var(--layera-spacing-1);
  flex-shrink: 0;
}

.layera-file-action {
  width: var(--layera-file-action-button-size);
  height: var(--layera-file-action-button-size);
  color: var(--layera-file-action-button-color);
  background: none;
  border: none;
  border-radius: var(--layera-border-radius-4);
  cursor: pointer;
  transition: var(--layera-upload-zone-transition);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.layera-file-action:hover {
  color: var(--layera-file-action-button-hover);
  background: var(--layera-file-item-background-hover);
}

.layera-file-action--delete {
  color: var(--layera-file-action-delete-color);
}

.layera-file-action--download {
  color: var(--layera-file-action-download-color);
}

/* Thumbnails */
.layera-file-thumbnail {
  width: var(--layera-thumbnail-size);
  height: var(--layera-thumbnail-size);
  background: var(--layera-thumbnail-background);
  border: 1px solid var(--layera-thumbnail-border);
  border-radius: var(--layera-thumbnail-border-radius);
  object-fit: cover;
  flex-shrink: 0;
}

.layera-file-thumbnail--sm {
  width: var(--layera-thumbnail-size-sm);
  height: var(--layera-thumbnail-size-sm);
}

.layera-file-thumbnail--lg {
  width: var(--layera-thumbnail-size-lg);
  height: var(--layera-thumbnail-size-lg);
}

/* File Preview */
.layera-file-preview {
  background: var(--layera-file-preview-background);
  border: 1px solid var(--layera-file-preview-border);
  border-radius: var(--layera-file-preview-border-radius);
  box-shadow: var(--layera-file-preview-shadow);
  padding: var(--layera-file-preview-padding);
  max-width: var(--layera-file-preview-max-width);
  max-height: var(--layera-file-preview-max-height);
  overflow: auto;
}

/* Drag & Drop Indicators */
.layera-drop-indicator {
  border: var(--layera-drop-indicator-width) var(--layera-drop-indicator-style) var(--layera-drop-indicator-color);
  border-radius: var(--layera-upload-zone-border-radius);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.layera-drop-overlay {
  background: var(--layera-drop-overlay-background);
  backdrop-filter: var(--layera-drop-overlay-backdrop);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: inherit;
}

/* Batch Operations */
.layera-batch-selection {
  background: var(--layera-batch-selection-background);
  border: 2px solid var(--layera-batch-selection-border);
  border-radius: var(--layera-file-item-border-radius);
}

.layera-batch-actions {
  background: var(--layera-batch-actions-background);
  border: 1px solid var(--layera-file-container-border);
  border-radius: var(--layera-file-container-border-radius);
  padding: var(--layera-batch-actions-padding);
  display: flex;
  align-items: center;
  gap: var(--layera-file-item-gap);
  justify-content: space-between;
}

.layera-batch-counter {
  background: var(--layera-batch-counter-background);
  color: var(--layera-batch-counter-color);
  padding: var(--layera-spacing-1) var(--layera-spacing-2);
  border-radius: var(--layera-border-radius-full);
  font-size: var(--layera-file-info-font-size);
  font-weight: 500;
}

/* Validation States */
.layera-file-validation--error {
  background: var(--layera-validation-error-background);
  color: var(--layera-validation-error-color);
  border-color: var(--layera-validation-error-border);
}

.layera-file-validation--success {
  background: var(--layera-validation-success-background);
  color: var(--layera-validation-success-color);
}

/* Accessibility */
.layera-file-item:focus {
  outline: 2px solid var(--layera-file-focus-outline);
  outline-offset: var(--layera-file-focus-outline-offset);
}

.layera-file-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
`;

// FILES SEMANTIC RULES - Enterprise specifications
export const FILES_SEMANTIC_RULES = {
  // Usage guidelines
  usage: {
    upload: 'File upload with drag & drop, progress tracking',
    list: 'File browser and management interface',
    preview: 'File content preview and thumbnails',
    batch: 'Multi-file selection and bulk operations',
  },

  // Accessibility guidelines
  accessibility: {
    keyboard: 'Support full keyboard navigation and file operations',
    screenReader: 'Provide descriptive labels and status updates',
    focus: 'Clear focus indicators for all interactive elements',
    progress: 'Announce upload/processing progress to screen readers',
  },

  // UX guidelines
  ux: {
    feedback: 'Provide immediate visual feedback for all file operations',
    progress: 'Show progress for operations taking > 1 second',
    validation: 'Validate files before upload with clear error messages',
    preview: 'Enable file previews when technically feasible',
  },

  // Performance guidelines
  performance: {
    lazy: 'Lazy load file thumbnails and previews',
    chunked: 'Use chunked uploads for large files',
    compression: 'Compress images and optimize file sizes',
    cleanup: 'Clean up temporary files and preview resources',
  },

} as const;

// Helper types
export type FilesSystemStructure = typeof FILES_VARIABLES;
export type UploadZoneVariant = keyof typeof UPLOAD_ZONE_VARIANTS;
export type FileListVariant = keyof typeof FILE_LIST_VARIANTS;