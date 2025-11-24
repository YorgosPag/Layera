/**
 * 📁 LAYERA FILES VARIANTS - File component combinations
 *
 * Προκαθορισμένες συνδυασμοί file tokens για συγκεκριμένες χρήσεις
 * Component-ready file variants που χαρτογραφούν σε semantic tokens
 */

import { FILES_VARIABLES } from './files.variables';
import { FILE_UPLOAD_VARIABLES } from '../file-upload/file-upload.variables';

// FILE UPLOAD ZONE VARIANTS - Different upload zone configurations
export const UPLOAD_ZONE_VARIANTS = {
  // Default upload zone
  default: {
    background: FILE_UPLOAD_VARIABLES['upload-zone-background'],
    border: FILE_UPLOAD_VARIABLES['upload-zone-border'],
    borderStyle: FILE_UPLOAD_VARIABLES['upload-zone-border-style'],
    borderRadius: FILE_UPLOAD_VARIABLES['upload-zone-border-radius'],
    padding: FILE_UPLOAD_VARIABLES['upload-zone-padding'],
    minHeight: FILE_UPLOAD_VARIABLES['upload-zone-min-height'],
    textColor: FILE_UPLOAD_VARIABLES['upload-zone-text-color'],
    usage: 'Standard file upload drag & drop zone',
  },

  // Compact upload zone
  compact: {
    background: FILE_UPLOAD_VARIABLES['upload-zone-background'],
    border: FILE_UPLOAD_VARIABLES['upload-zone-border'],
    borderStyle: FILE_UPLOAD_VARIABLES['upload-zone-border-style'],
    borderRadius: FILES_VARIABLES['file-item-border-radius'],
    padding: FILES_VARIABLES['file-item-padding'],
    minHeight: SPACING_VARIABLES['spacing-16'],
    textColor: FILE_UPLOAD_VARIABLES['upload-zone-text-color'],
    usage: 'Compact upload zone for forms',
  },

  // Inline upload zone
  inline: {
    background: 'transparent',
    border: FILE_UPLOAD_VARIABLES['upload-zone-border'],
    borderStyle: FILE_UPLOAD_VARIABLES['upload-zone-border-style'],
    borderRadius: FILES_VARIABLES['file-item-border-radius'],
    padding: FILES_VARIABLES['file-item-padding'],
    minHeight: 'auto',
    textColor: FILE_UPLOAD_VARIABLES['upload-zone-text-color'],
    usage: 'Inline upload area without background',
  },

} as const;

// FILE LIST VARIANTS - Different file list presentations
export const FILE_LIST_VARIANTS = {
  // Grid view
  grid: {
    itemBackground: FILES_VARIABLES['file-item-background'],
    itemBorder: FILES_VARIABLES['file-item-border'],
    itemBorderRadius: FILES_VARIABLES['file-item-border-radius'],
    itemPadding: FILES_VARIABLES['file-item-padding'],
    itemGap: FILES_VARIABLES['file-item-gap'],
    iconSize: FILES_VARIABLES['file-icon-size'],
    layout: 'grid',
    usage: 'Grid layout for file thumbnails',
  },

  // List view
  list: {
    itemBackground: FILES_VARIABLES['file-item-background'],
    itemBorder: FILES_VARIABLES['file-item-border'],
    itemBorderRadius: FILES_VARIABLES['file-item-border-radius'],
    itemPadding: FILES_VARIABLES['file-item-padding'],
    itemGap: FILES_VARIABLES['file-item-gap'],
    iconSize: FILES_VARIABLES['file-icon-size-sm'],
    layout: 'list',
    usage: 'List layout for detailed file info',
  },

  // Table view
  table: {
    itemBackground: 'transparent',
    itemBorder: 'none',
    itemBorderRadius: '0',
    itemPadding: FILES_VARIABLES['file-item-padding'],
    itemGap: FILES_VARIABLES['file-item-gap'],
    iconSize: FILES_VARIABLES['file-icon-size-sm'],
    layout: 'table',
    usage: 'Table layout for sortable file data',
  },

} as const;

// FILE TYPE VARIANTS - Different file type presentations
export const FILE_TYPE_VARIANTS = {
  // Image files
  image: {
    iconColor: FILES_VARIABLES['file-icon-color-image'],
    showThumbnail: true,
    previewEnabled: true,
    thumbnailSize: FILES_VARIABLES['thumbnail-size'],
    usage: 'Image files with thumbnails',
  },

  // Document files
  document: {
    iconColor: FILES_VARIABLES['file-icon-color-doc'],
    showThumbnail: false,
    previewEnabled: true,
    thumbnailSize: FILES_VARIABLES['thumbnail-size'],
    usage: 'Document files (PDF, DOC, etc.)',
  },

  // Video files
  video: {
    iconColor: FILES_VARIABLES['file-icon-color-video'],
    showThumbnail: true,
    previewEnabled: true,
    thumbnailSize: FILES_VARIABLES['thumbnail-size'],
    usage: 'Video files with preview thumbnails',
  },

  // Audio files
  audio: {
    iconColor: FILES_VARIABLES['file-icon-color-audio'],
    showThumbnail: false,
    previewEnabled: true,
    thumbnailSize: FILES_VARIABLES['thumbnail-size'],
    usage: 'Audio files with waveform preview',
  },

  // Archive files
  archive: {
    iconColor: FILES_VARIABLES['file-icon-color-zip'],
    showThumbnail: false,
    previewEnabled: false,
    thumbnailSize: FILES_VARIABLES['thumbnail-size'],
    usage: 'Compressed archive files',
  },

  // Code files
  code: {
    iconColor: FILES_VARIABLES['file-icon-color-code'],
    showThumbnail: false,
    previewEnabled: true,
    thumbnailSize: FILES_VARIABLES['thumbnail-size'],
    usage: 'Code and text files',
  },

} as const;

// FILE STATUS VARIANTS - Different file processing states
export const FILE_STATUS_VARIANTS = {
  // Uploading state
  uploading: {
    statusColor: FILES_VARIABLES['file-status-uploading-color'],
    progressBackground: FILES_VARIABLES['file-progress-background'],
    progressFill: FILES_VARIABLES['file-progress-fill'],
    showProgress: true,
    showActions: false,
    usage: 'File currently uploading',
  },

  // Processing state
  processing: {
    statusColor: FILES_VARIABLES['file-status-processing-color'],
    progressBackground: FILES_VARIABLES['transform-progress-background'],
    progressFill: FILES_VARIABLES['transform-progress-color'],
    showProgress: true,
    showActions: false,
    usage: 'File being processed/converted',
  },

  // Success state
  success: {
    statusColor: FILES_VARIABLES['file-status-success-color'],
    progressBackground: 'transparent',
    progressFill: 'transparent',
    showProgress: false,
    showActions: true,
    usage: 'File successfully uploaded/processed',
  },

  // Error state
  error: {
    statusColor: FILES_VARIABLES['file-status-error-color'],
    progressBackground: 'transparent',
    progressFill: 'transparent',
    showProgress: false,
    showActions: true,
    usage: 'File upload/processing failed',
  },

} as const;

// FILE PREVIEW VARIANTS - Different preview configurations
export const FILE_PREVIEW_VARIANTS = {
  // Modal preview
  modal: {
    background: FILES_VARIABLES['file-preview-background'],
    border: FILES_VARIABLES['file-preview-border'],
    borderRadius: FILES_VARIABLES['file-preview-border-radius'],
    shadow: FILES_VARIABLES['file-preview-shadow'],
    padding: FILES_VARIABLES['file-preview-padding'],
    maxWidth: FILES_VARIABLES['file-preview-max-width'],
    maxHeight: FILES_VARIABLES['file-preview-max-height'],
    usage: 'Full-screen modal file preview',
  },

  // Inline preview
  inline: {
    background: FILES_VARIABLES['file-container-background'],
    border: FILES_VARIABLES['file-container-border'],
    borderRadius: FILES_VARIABLES['file-container-border-radius'],
    shadow: FILES_VARIABLES['file-container-shadow'],
    padding: FILES_VARIABLES['file-container-padding'],
    maxWidth: '100%',
    maxHeight: '300px',
    usage: 'Inline file preview within content',
  },

  // Thumbnail preview
  thumbnail: {
    background: FILES_VARIABLES['thumbnail-background'],
    border: FILES_VARIABLES['thumbnail-border'],
    borderRadius: FILES_VARIABLES['thumbnail-border-radius'],
    shadow: 'none',
    padding: '0',
    maxWidth: FILES_VARIABLES['thumbnail-size'],
    maxHeight: FILES_VARIABLES['thumbnail-size'],
    usage: 'Small thumbnail preview',
  },

} as const;

// FILE SIZE VARIANTS - Different file size presentations
export const FILE_SIZE_VARIANTS = {
  small: {
    iconSize: FILES_VARIABLES['file-icon-size-sm'],
    thumbnailSize: FILES_VARIABLES['thumbnail-size-sm'],
    nameSize: '12px',
    infoSize: '10px',
    padding: `${SPACING_VARIABLES['spacing-2']} ${SPACING_VARIABLES['spacing-3']}`,
    usage: 'Compact file representation',
  },

  medium: {
    iconSize: FILES_VARIABLES['file-icon-size'],
    thumbnailSize: FILES_VARIABLES['thumbnail-size'],
    nameSize: FILES_VARIABLES['file-name-font-size'],
    infoSize: FILES_VARIABLES['file-info-font-size'],
    padding: FILES_VARIABLES['file-item-padding'],
    usage: 'Standard file representation',
  },

  large: {
    iconSize: FILES_VARIABLES['file-icon-size-lg'],
    thumbnailSize: FILES_VARIABLES['thumbnail-size-lg'],
    nameSize: '16px',
    infoSize: '14px',
    padding: SPACING_VARIABLES['component-padding-medium'],
    usage: 'Large file representation with details',
  },

} as const;

// BATCH OPERATIONS VARIANTS - Multi-file operations
export const BATCH_OPERATIONS_VARIANTS = {
  // Selection mode
  selection: {
    background: FILES_VARIABLES['batch-selection-background'],
    border: FILES_VARIABLES['batch-selection-border'],
    actionsBackground: FILES_VARIABLES['batch-actions-background'],
    actionsPadding: FILES_VARIABLES['batch-actions-padding'],
    usage: 'Multi-file selection interface',
  },

  // Bulk actions
  actions: {
    background: FILES_VARIABLES['batch-actions-background'],
    border: FILES_VARIABLES['file-container-border'],
    counterBackground: FILES_VARIABLES['batch-counter-background'],
    counterColor: FILES_VARIABLES['batch-counter-color'],
    usage: 'Bulk file operations toolbar',
  },

} as const;

// Helper types
export type UploadZoneVariantType = keyof typeof UPLOAD_ZONE_VARIANTS;
export type FileListVariantType = keyof typeof FILE_LIST_VARIANTS;
export type FileTypeVariantType = keyof typeof FILE_TYPE_VARIANTS;
export type FileStatusVariantType = keyof typeof FILE_STATUS_VARIANTS;
export type FilePreviewVariantType = keyof typeof FILE_PREVIEW_VARIANTS;
export type FileSizeVariantType = keyof typeof FILE_SIZE_VARIANTS;
export type BatchOperationsVariantType = keyof typeof BATCH_OPERATIONS_VARIANTS;