/**
 * 📁 LAYERA FILE UPLOAD VARIANTS - CSS Classes & Component Combinations
 *
 * Enterprise-grade file upload CSS class system ακολουθώντας το Cloudscape (AWS) model.
 * Pre-built CSS class combinations που συνδυάζουν variables για complete file upload styling.
 *
 * Includes all sub-components:
 * - Upload zones με drag & drop
 * - Progress indicators
 * - File previews & tokens
 * - Validation states
 * - Interactive behaviors
 */

// TYPE DEFINITIONS
export type FileUploadVariantType = 'default' | 'compact' | 'minimal' | 'enhanced';
export type FileUploadSizeType = 'sm' | 'md' | 'lg' | 'xl';
export type FileUploadStateType = 'idle' | 'drag-over' | 'uploading' | 'success' | 'error';
export type FileUploadProgressType = 'linear' | 'circular' | 'minimal' | 'detailed';
export type ValidationStateType = 'success' | 'error' | 'warning' | 'info';

// ═══════════════════════════════════════════════════════════════════════════════════════
// 🔧 BASE FILE UPLOAD CSS CLASSES
// ═══════════════════════════════════════════════════════════════════════════════════════

export const FILE_UPLOAD_BASE_CLASSES = {
  // Main container classes
  container: 'layera-file-upload layera-file-upload--container',
  uploadZone: 'layera-file-upload__zone',
  uploadZoneInput: 'layera-file-upload__input',

  // Content structure
  uploadContent: 'layera-file-upload__content',
  uploadIcon: 'layera-file-upload__icon',
  uploadTitle: 'layera-file-upload__title',
  uploadSubtitle: 'layera-file-upload__subtitle',
  uploadButton: 'layera-file-upload__button',

  // File management
  fileList: 'layera-file-upload__file-list',
  fileToken: 'layera-file-upload__file-token',
  fileIcon: 'layera-file-upload__file-icon',
  fileName: 'layera-file-upload__file-name',
  fileSize: 'layera-file-upload__file-size',
  fileRemove: 'layera-file-upload__file-remove',

  // Progress indicators
  progressContainer: 'layera-file-upload__progress',
  progressBar: 'layera-file-upload__progress-bar',
  progressFill: 'layera-file-upload__progress-fill',
  progressText: 'layera-file-upload__progress-text',
  progressCircular: 'layera-file-upload__progress-circular',

  // Validation & feedback
  validationMessage: 'layera-file-upload__validation',
  validationIcon: 'layera-file-upload__validation-icon',

  // Drag & drop
  dragOverlay: 'layera-file-upload__drag-overlay',
  dropIndicator: 'layera-file-upload__drop-indicator',
} as const;

// ═══════════════════════════════════════════════════════════════════════════════════════
// 🎨 VARIANT CLASSES - Συνδυασμοί styling
// ═══════════════════════════════════════════════════════════════════════════════════════

export const FILE_UPLOAD_VARIANTS = {
  default: {
    container: 'layera-file-upload layera-file-upload--default',
    uploadZone: 'layera-file-upload__zone layera-file-upload__zone--default',
    content: 'layera-file-upload__content layera-file-upload__content--default',
    title: 'layera-file-upload__title layera-file-upload__title--default',
    subtitle: 'layera-file-upload__subtitle layera-file-upload__subtitle--default',
  },

  compact: {
    container: 'layera-file-upload layera-file-upload--compact',
    uploadZone: 'layera-file-upload__zone layera-file-upload__zone--compact',
    content: 'layera-file-upload__content layera-file-upload__content--compact',
    title: 'layera-file-upload__title layera-file-upload__title--compact',
    subtitle: 'layera-file-upload__subtitle layera-file-upload__subtitle--compact',
  },

  minimal: {
    container: 'layera-file-upload layera-file-upload--minimal',
    uploadZone: 'layera-file-upload__zone layera-file-upload__zone--minimal',
    content: 'layera-file-upload__content layera-file-upload__content--minimal',
    title: 'layera-file-upload__title layera-file-upload__title--minimal',
    subtitle: 'layera-file-upload__subtitle layera-file-upload__subtitle--minimal',
  },

  enhanced: {
    container: 'layera-file-upload layera-file-upload--enhanced',
    uploadZone: 'layera-file-upload__zone layera-file-upload__zone--enhanced',
    content: 'layera-file-upload__content layera-file-upload__content--enhanced',
    title: 'layera-file-upload__title layera-file-upload__title--enhanced',
    subtitle: 'layera-file-upload__subtitle layera-file-upload__subtitle--enhanced',
  },
} as const;

// ═══════════════════════════════════════════════════════════════════════════════════════
// 📏 SIZE CLASSES - Different upload zone sizes
// ═══════════════════════════════════════════════════════════════════════════════════════

export const FILE_UPLOAD_SIZES = {
  sm: {
    container: 'layera-file-upload layera-file-upload--sm',
    uploadZone: 'layera-file-upload__zone layera-file-upload__zone--sm',
    icon: 'layera-file-upload__icon layera-file-upload__icon--sm',
    title: 'layera-file-upload__title layera-file-upload__title--sm',
    subtitle: 'layera-file-upload__subtitle layera-file-upload__subtitle--sm',
    fileToken: 'layera-file-upload__file-token layera-file-upload__file-token--sm',
  },

  md: {
    container: 'layera-file-upload layera-file-upload--md',
    uploadZone: 'layera-file-upload__zone layera-file-upload__zone--md',
    icon: 'layera-file-upload__icon layera-file-upload__icon--md',
    title: 'layera-file-upload__title layera-file-upload__title--md',
    subtitle: 'layera-file-upload__subtitle layera-file-upload__subtitle--md',
    fileToken: 'layera-file-upload__file-token layera-file-upload__file-token--md',
  },

  lg: {
    container: 'layera-file-upload layera-file-upload--lg',
    uploadZone: 'layera-file-upload__zone layera-file-upload__zone--lg',
    icon: 'layera-file-upload__icon layera-file-upload__icon--lg',
    title: 'layera-file-upload__title layera-file-upload__title--lg',
    subtitle: 'layera-file-upload__subtitle layera-file-upload__subtitle--lg',
    fileToken: 'layera-file-upload__file-token layera-file-upload__file-token--lg',
  },

  xl: {
    container: 'layera-file-upload layera-file-upload--xl',
    uploadZone: 'layera-file-upload__zone layera-file-upload__zone--xl',
    icon: 'layera-file-upload__icon layera-file-upload__icon--xl',
    title: 'layera-file-upload__title layera-file-upload__title--xl',
    subtitle: 'layera-file-upload__subtitle layera-file-upload__subtitle--xl',
    fileToken: 'layera-file-upload__file-token layera-file-upload__file-token--xl',
  },
} as const;

// ═══════════════════════════════════════════════════════════════════════════════════════
// 🎯 STATE CLASSES - Interactive & validation states
// ═══════════════════════════════════════════════════════════════════════════════════════

export const FILE_UPLOAD_STATES = {
  // Upload zone states
  idle: 'layera-file-upload__zone--idle',
  dragOver: 'layera-file-upload__zone--drag-over',
  uploading: 'layera-file-upload__zone--uploading',
  disabled: 'layera-file-upload__zone--disabled',
  focused: 'layera-file-upload__zone--focused',

  // Validation states
  success: 'layera-file-upload--success',
  error: 'layera-file-upload--error',
  warning: 'layera-file-upload--warning',
  info: 'layera-file-upload--info',

  // File states
  fileUploading: 'layera-file-upload__file-token--uploading',
  fileSuccess: 'layera-file-upload__file-token--success',
  fileError: 'layera-file-upload__file-token--error',

  // Progress states
  progressActive: 'layera-file-upload__progress--active',
  progressComplete: 'layera-file-upload__progress--complete',
  progressError: 'layera-file-upload__progress--error',
} as const;

// ═══════════════════════════════════════════════════════════════════════════════════════
// 📊 PROGRESS VARIANT CLASSES - Different progress styles
// ═══════════════════════════════════════════════════════════════════════════════════════

export const PROGRESS_VARIANTS = {
  linear: {
    container: 'layera-file-upload__progress layera-file-upload__progress--linear',
    bar: 'layera-file-upload__progress-bar layera-file-upload__progress-bar--linear',
    fill: 'layera-file-upload__progress-fill layera-file-upload__progress-fill--linear',
    text: 'layera-file-upload__progress-text layera-file-upload__progress-text--linear',
  },

  circular: {
    container: 'layera-file-upload__progress layera-file-upload__progress--circular',
    bar: 'layera-file-upload__progress-circular layera-file-upload__progress-circular--active',
    text: 'layera-file-upload__progress-text layera-file-upload__progress-text--circular',
  },

  minimal: {
    container: 'layera-file-upload__progress layera-file-upload__progress--minimal',
    bar: 'layera-file-upload__progress-bar layera-file-upload__progress-bar--minimal',
    fill: 'layera-file-upload__progress-fill layera-file-upload__progress-fill--minimal',
  },

  detailed: {
    container: 'layera-file-upload__progress layera-file-upload__progress--detailed',
    bar: 'layera-file-upload__progress-bar layera-file-upload__progress-bar--detailed',
    fill: 'layera-file-upload__progress-fill layera-file-upload__progress-fill--detailed',
    text: 'layera-file-upload__progress-text layera-file-upload__progress-text--detailed',
    stats: 'layera-file-upload__progress-stats',
    speed: 'layera-file-upload__progress-speed',
    eta: 'layera-file-upload__progress-eta',
  },
} as const;

// ═══════════════════════════════════════════════════════════════════════════════════════
// ✅ VALIDATION VARIANT CLASSES - Feedback states
// ═══════════════════════════════════════════════════════════════════════════════════════

export const VALIDATION_VARIANTS = {
  success: {
    container: 'layera-file-upload__validation layera-file-upload__validation--success',
    icon: 'layera-file-upload__validation-icon layera-file-upload__validation-icon--success',
    message: 'layera-file-upload__validation-message layera-file-upload__validation-message--success',
    uploadZone: 'layera-file-upload__zone--success',
  },

  error: {
    container: 'layera-file-upload__validation layera-file-upload__validation--error',
    icon: 'layera-file-upload__validation-icon layera-file-upload__validation-icon--error',
    message: 'layera-file-upload__validation-message layera-file-upload__validation-message--error',
    uploadZone: 'layera-file-upload__zone--error',
  },

  warning: {
    container: 'layera-file-upload__validation layera-file-upload__validation--warning',
    icon: 'layera-file-upload__validation-icon layera-file-upload__validation-icon--warning',
    message: 'layera-file-upload__validation-message layera-file-upload__validation-message--warning',
    uploadZone: 'layera-file-upload__zone--warning',
  },

  info: {
    container: 'layera-file-upload__validation layera-file-upload__validation--info',
    icon: 'layera-file-upload__validation-icon layera-file-upload__validation-icon--info',
    message: 'layera-file-upload__validation-message layera-file-upload__validation-message--info',
    uploadZone: 'layera-file-upload__zone--info',
  },
} as const;

// ═══════════════════════════════════════════════════════════════════════════════════════
// 🎭 DRAG & DROP CLASSES - Interactive drag behaviors
// ═══════════════════════════════════════════════════════════════════════════════════════

export const DRAG_DROP_CLASSES = {
  // Base drag classes
  draggable: 'layera-file-upload--draggable',
  dragOver: 'layera-file-upload--drag-over',
  dragActive: 'layera-file-upload--drag-active',
  dragInvalid: 'layera-file-upload--drag-invalid',

  // Drop zone indicators
  dropZone: 'layera-file-upload__drop-zone',
  dropIndicator: 'layera-file-upload__drop-indicator',
  dropFeedback: 'layera-file-upload__drop-feedback',

  // Drag overlay
  dragOverlay: 'layera-file-upload__drag-overlay',
  dragOverlayActive: 'layera-file-upload__drag-overlay--active',
  dragOverlayInvalid: 'layera-file-upload__drag-overlay--invalid',
} as const;

// ═══════════════════════════════════════════════════════════════════════════════════════
// 📱 RESPONSIVE CLASSES - Mobile-first design
// ═══════════════════════════════════════════════════════════════════════════════════════

export const RESPONSIVE_FILE_UPLOAD_CLASSES = {
  mobile: {
    container: 'layera-file-upload--mobile',
    uploadZone: 'layera-file-upload__zone--mobile',
    fileList: 'layera-file-upload__file-list--mobile',
    fileToken: 'layera-file-upload__file-token--mobile',
  },

  tablet: {
    container: 'layera-file-upload--tablet',
    uploadZone: 'layera-file-upload__zone--tablet',
    fileList: 'layera-file-upload__file-list--tablet',
    fileToken: 'layera-file-upload__file-token--tablet',
  },

  desktop: {
    container: 'layera-file-upload--desktop',
    uploadZone: 'layera-file-upload__zone--desktop',
    fileList: 'layera-file-upload__file-list--desktop',
    fileToken: 'layera-file-upload__file-token--desktop',
  },
} as const;

// ═══════════════════════════════════════════════════════════════════════════════════════
// 🎨 COMPREHENSIVE FILE UPLOAD VARIANTS - Complete combinations
// ═══════════════════════════════════════════════════════════════════════════════════════

export const FILE_UPLOAD_FULL_VARIANTS = {
  // Default combinations
  'default-md-idle': {
    container: `${FILE_UPLOAD_VARIANTS.default.container} ${FILE_UPLOAD_SIZES.md.container}`,
    uploadZone: `${FILE_UPLOAD_VARIANTS.default.uploadZone} ${FILE_UPLOAD_SIZES.md.uploadZone} ${FILE_UPLOAD_STATES.idle}`,
    title: `${FILE_UPLOAD_VARIANTS.default.title} ${FILE_UPLOAD_SIZES.md.title}`,
    subtitle: `${FILE_UPLOAD_VARIANTS.default.subtitle} ${FILE_UPLOAD_SIZES.md.subtitle}`,
  },

  // Compact combinations
  'compact-sm-dragover': {
    container: `${FILE_UPLOAD_VARIANTS.compact.container} ${FILE_UPLOAD_SIZES.sm.container}`,
    uploadZone: `${FILE_UPLOAD_VARIANTS.compact.uploadZone} ${FILE_UPLOAD_SIZES.sm.uploadZone} ${FILE_UPLOAD_STATES.dragOver}`,
    title: `${FILE_UPLOAD_VARIANTS.compact.title} ${FILE_UPLOAD_SIZES.sm.title}`,
  },

  // Enhanced combinations
  'enhanced-lg-success': {
    container: `${FILE_UPLOAD_VARIANTS.enhanced.container} ${FILE_UPLOAD_SIZES.lg.container} ${FILE_UPLOAD_STATES.success}`,
    uploadZone: `${FILE_UPLOAD_VARIANTS.enhanced.uploadZone} ${FILE_UPLOAD_SIZES.lg.uploadZone} ${VALIDATION_VARIANTS.success.uploadZone}`,
    title: `${FILE_UPLOAD_VARIANTS.enhanced.title} ${FILE_UPLOAD_SIZES.lg.title}`,
  },

  // Minimal combinations
  'minimal-md-uploading': {
    container: `${FILE_UPLOAD_VARIANTS.minimal.container} ${FILE_UPLOAD_SIZES.md.container}`,
    uploadZone: `${FILE_UPLOAD_VARIANTS.minimal.uploadZone} ${FILE_UPLOAD_SIZES.md.uploadZone} ${FILE_UPLOAD_STATES.uploading}`,
    progress: `${PROGRESS_VARIANTS.linear.container} ${FILE_UPLOAD_STATES.progressActive}`,
  },
} as const;

// ═══════════════════════════════════════════════════════════════════════════════════════
// 🛠️ UTILITY CLASSES - Helper classes για file upload
// ═══════════════════════════════════════════════════════════════════════════════════════

export const FILE_UPLOAD_UTILITIES = {
  // Layout utilities
  'upload-flex': 'layera-file-upload--flex',
  'upload-center': 'layera-file-upload--center',
  'upload-full-width': 'layera-file-upload--full-width',

  // Interaction utilities
  'upload-clickable': 'layera-file-upload--clickable',
  'upload-disabled': 'layera-file-upload--disabled',
  'upload-readonly': 'layera-file-upload--readonly',

  // Visual utilities
  'upload-bordered': 'layera-file-upload--bordered',
  'upload-shadow': 'layera-file-upload--shadow',
  'upload-rounded': 'layera-file-upload--rounded',

  // Animation utilities
  'upload-fade': 'layera-file-upload--fade',
  'upload-slide': 'layera-file-upload--slide',
  'upload-bounce': 'layera-file-upload--bounce',

  // File token utilities
  'file-removable': 'layera-file-upload__file-token--removable',
  'file-preview': 'layera-file-upload__file-token--preview',
  'file-thumbnail': 'layera-file-upload__file-token--thumbnail',
} as const;

// ═══════════════════════════════════════════════════════════════════════════════════════
// 🔧 HELPER FUNCTIONS - Dynamic class generation
// ═══════════════════════════════════════════════════════════════════════════════════════

/**
 * Generates complete CSS classes για file upload component
 */
export const generateFileUploadClasses = (
  variant: FileUploadVariantType = 'default',
  size: FileUploadSizeType = 'md',
  state?: FileUploadStateType,
  validationState?: ValidationStateType
) => {
  const variantClasses = FILE_UPLOAD_VARIANTS[variant];
  const sizeClasses = FILE_UPLOAD_SIZES[size];
  const stateClass = state ? FILE_UPLOAD_STATES[state] : '';
  const validationClasses = validationState ? VALIDATION_VARIANTS[validationState] : null;

  return {
    container: [
      variantClasses.container,
      sizeClasses.container,
      stateClass,
      validationClasses?.container
    ].filter(Boolean).join(' '),

    uploadZone: [
      variantClasses.uploadZone,
      sizeClasses.uploadZone,
      stateClass,
      validationClasses?.uploadZone
    ].filter(Boolean).join(' '),

    title: [
      variantClasses.title,
      sizeClasses.title
    ].filter(Boolean).join(' '),

    subtitle: [
      variantClasses.subtitle,
      sizeClasses.subtitle
    ].filter(Boolean).join(' '),

    fileToken: sizeClasses.fileToken,
    validation: validationClasses?.container || '',
  };
};

/**
 * Generates progress classes based on progress variant
 */
export const generateProgressClasses = (
  variant: FileUploadProgressType = 'linear',
  state?: 'active' | 'complete' | 'error'
) => {
  const progressClasses = PROGRESS_VARIANTS[variant];
  const stateClass = state ? FILE_UPLOAD_STATES[`progress${state.charAt(0).toUpperCase() + state.slice(1)}` as keyof typeof FILE_UPLOAD_STATES] : '';

  return {
    container: [progressClasses.container, stateClass].filter(Boolean).join(' '),
    bar: progressClasses.bar,
    fill: progressClasses.fill || '',
    text: progressClasses.text || '',
  };
};