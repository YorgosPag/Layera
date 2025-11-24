/**
 * 📁 LAYERA FILE UPLOAD COMPONENT SYSTEM - Class Implementation
 *
 * Enterprise-grade file upload component system που ακολουθεί το Cloudscape (AWS) model.
 * Συνδυάζει variables, variants και business logic για complete file upload management.
 *
 * Features:
 * - Complete file upload workflow (zone, progress, preview, validation)
 * - CSS generation από token combinations
 * - TypeScript validation & type safety
 * - Component props generation για React/Vue file uploads
 * - Enterprise configuration management
 * - Drag & drop behavior
 * - Progress tracking & file management
 */

import {
  FILE_UPLOAD_VARIABLES,
  PROGRESS_VARIABLES,
  FILE_PREVIEW_VARIABLES,
  DRAG_DROP_VARIABLES,
  VALIDATION_VARIABLES,
  FILE_UPLOAD_SIZE_VARIABLES,
  FILE_UPLOAD_VARIANT_VARIABLES,
  RESPONSIVE_FILE_UPLOAD_VARIABLES,
  FILE_UPLOAD_ANIMATION_VALUES,
  type FileUploadVariant,
  type FileUploadSize,
  type FileUploadState,
  type FileUploadType,
  type ProgressVariant
} from './file-upload.variables';

import {
  FILE_UPLOAD_VARIANTS,
  FILE_UPLOAD_SIZES,
  FILE_UPLOAD_STATES,
  PROGRESS_VARIANTS,
  VALIDATION_VARIANTS,
  DRAG_DROP_CLASSES,
  FILE_UPLOAD_UTILITIES,
  generateFileUploadClasses,
  generateProgressClasses,
  type FileUploadVariantType,
  type FileUploadSizeType,
  type FileUploadStateType,
  type FileUploadProgressType,
  type ValidationStateType
} from './file-upload.variants';

// FILE UPLOAD COMPONENT INTERFACE
export interface FileUploadComponentProps {
  variant: FileUploadVariant;
  size: FileUploadSize;
  type: FileUploadType;
  accept?: string[];
  maxFiles?: number;
  maxFileSize?: number; // in bytes
  multiple?: boolean;
  disabled?: boolean;
  required?: boolean;
  title?: string;
  subtitle?: string;
  buttonText?: string;
  dragText?: string;
  progressVariant?: ProgressVariant;
  showProgress?: boolean;
  showFileList?: boolean;
  allowRemove?: boolean;
  autoUpload?: boolean;
  validationRules?: FileValidationRule[];
  className?: string;
  onFileSelect?: (files: FileList) => void;
  onFileRemove?: (file: File) => void;
  onUploadProgress?: (progress: number, file: File) => void;
  onUploadComplete?: (file: File, result: any) => void;
  onUploadError?: (file: File, error: Error) => void;
  onValidationError?: (file: File, errors: ValidationError[]) => void;
}

// FILE VALIDATION INTERFACE
export interface FileValidationRule {
  rule: 'fileSize' | 'fileType' | 'fileName' | 'custom';
  value?: any;
  message: string;
  validator?: (file: File) => boolean;
}

export interface ValidationError {
  rule: string;
  message: string;
  file: File;
}

// FILE UPLOAD STATE MANAGEMENT
export interface FileUploadFile {
  id: string;
  file: File;
  status: 'pending' | 'uploading' | 'success' | 'error';
  progress: number;
  error?: string;
  result?: any;
  preview?: string;
}

// FILE UPLOAD CONFIGURATION
export interface FileUploadComponentConfig {
  variant: FileUploadVariant;
  size: FileUploadSize;
  type: FileUploadType;
  progressVariant: ProgressVariant;
  maxFiles: number;
  maxFileSize: number;
  accept: string[];
  validationRules: FileValidationRule[];
  responsive?: boolean;
}

// FILE UPLOAD CSS RESULT
export interface FileUploadComponentCSS {
  variables: Record<string, string>;
  classes: {
    container: string;
    uploadZone: string;
    content: string;
    title: string;
    subtitle: string;
    button: string;
    fileList: string;
    fileToken: string;
    progress: string;
    validation: string;
  };
  animations: Record<string, Record<string, any>>;
  utilities: Record<string, string>;
}

/**
 * FileUploadComponentSystem Class
 *
 * Enterprise file upload system με complete functionality όπως το Cloudscape (AWS).
 * Παρέχει CSS generation, validation, file management και progress tracking.
 */
export class FileUploadComponentSystem {
  /**
   * Validates file upload component configuration
   */
  static validateConfig(config: FileUploadComponentConfig): boolean {
    const validVariants: FileUploadVariant[] = ['default', 'compact', 'minimal', 'enhanced'];
    const validSizes: FileUploadSize[] = ['sm', 'md', 'lg', 'xl'];
    const validTypes: FileUploadType[] = ['single', 'multiple', 'directory'];
    const validProgressVariants: ProgressVariant[] = ['linear', 'circular', 'minimal', 'detailed'];

    if (!validVariants.includes(config.variant)) {
      console.warn(`Invalid file upload variant: ${config.variant}`);
      return false;
    }

    if (!validSizes.includes(config.size)) {
      console.warn(`Invalid file upload size: ${config.size}`);
      return false;
    }

    if (!validTypes.includes(config.type)) {
      console.warn(`Invalid file upload type: ${config.type}`);
      return false;
    }

    if (!validProgressVariants.includes(config.progressVariant)) {
      console.warn(`Invalid progress variant: ${config.progressVariant}`);
      return false;
    }

    if (config.maxFiles < 1) {
      console.warn(`Invalid maxFiles: ${config.maxFiles}`);
      return false;
    }

    if (config.maxFileSize < 1) {
      console.warn(`Invalid maxFileSize: ${config.maxFileSize}`);
      return false;
    }

    return true;
  }

  /**
   * Generates complete CSS για file upload component
   */
  static generateCSS(config: FileUploadComponentConfig, state?: FileUploadState): FileUploadComponentCSS {
    if (!this.validateConfig(config)) {
      throw new Error(`Invalid file upload configuration: ${JSON.stringify(config)}`);
    }

    // Base variables από όλα τα sub-components
    const variables = {
      ...FILE_UPLOAD_VARIABLES,
      ...PROGRESS_VARIABLES,
      ...FILE_PREVIEW_VARIABLES,
      ...DRAG_DROP_VARIABLES,
      ...VALIDATION_VARIABLES,
    };

    // Size-specific variables
    if (FILE_UPLOAD_SIZE_VARIABLES[config.size]) {
      Object.assign(variables, FILE_UPLOAD_SIZE_VARIABLES[config.size]);
    }

    // Variant-specific variables
    if (FILE_UPLOAD_VARIANT_VARIABLES[config.variant]) {
      Object.assign(variables, FILE_UPLOAD_VARIANT_VARIABLES[config.variant]);
    }

    // Responsive variables για mobile-first
    if (config.responsive) {
      Object.assign(variables, RESPONSIVE_FILE_UPLOAD_VARIABLES.mobile);
    }

    // Generate classes using helper functions
    const uploadClasses = generateFileUploadClasses(
      config.variant as FileUploadVariantType,
      config.size as FileUploadSizeType,
      state as FileUploadStateType
    );

    const progressClasses = generateProgressClasses(
      config.progressVariant as FileUploadProgressType
    );

    return {
      variables,
      classes: {
        container: uploadClasses.container,
        uploadZone: uploadClasses.uploadZone,
        content: 'layera-file-upload__content',
        title: uploadClasses.title,
        subtitle: uploadClasses.subtitle,
        button: 'layera-file-upload__button',
        fileList: 'layera-file-upload__file-list',
        fileToken: uploadClasses.fileToken,
        progress: progressClasses.container,
        validation: uploadClasses.validation,
      },
      animations: FILE_UPLOAD_ANIMATION_VALUES,
      utilities: FILE_UPLOAD_UTILITIES,
    };
  }

  /**
   * Gets component props για React/Vue file upload components
   */
  static getComponentProps(
    variant: FileUploadVariant = 'default',
    size: FileUploadSize = 'md',
    type: FileUploadType = 'multiple',
    progressVariant: ProgressVariant = 'linear'
  ): FileUploadComponentProps {
    const config = {
      variant,
      size,
      type,
      progressVariant,
      maxFiles: type === 'single' ? 1 : 10,
      maxFileSize: 10 * 1024 * 1024, // 10MB
      accept: [],
      validationRules: []
    };

    if (!this.validateConfig(config)) {
      throw new Error(`Invalid file upload configuration`);
    }

    return {
      variant,
      size,
      type,
      progressVariant,
      multiple: type !== 'single',
      maxFiles: config.maxFiles,
      maxFileSize: config.maxFileSize,
      showProgress: true,
      showFileList: true,
      allowRemove: true,
      autoUpload: false,
      title: this.getDefaultTitle(variant, type),
      subtitle: this.getDefaultSubtitle(type),
      buttonText: 'Choose Files',
      dragText: 'Drag files here to upload',
    };
  }

  /**
   * Validates individual file against rules
   */
  static validateFile(file: File, rules: FileValidationRule[]): ValidationError[] {
    const errors: ValidationError[] = [];

    rules.forEach(rule => {
      switch (rule.rule) {
        case 'fileSize':
          if (file.size > rule.value) {
            errors.push({
              rule: 'fileSize',
              message: rule.message,
              file
            });
          }
          break;

        case 'fileType':
          const allowedTypes = rule.value as string[];
          const fileType = file.type || this.getFileTypeFromName(file.name);
          if (!allowedTypes.includes(fileType)) {
            errors.push({
              rule: 'fileType',
              message: rule.message,
              file
            });
          }
          break;

        case 'fileName':
          const pattern = rule.value as RegExp;
          if (!pattern.test(file.name)) {
            errors.push({
              rule: 'fileName',
              message: rule.message,
              file
            });
          }
          break;

        case 'custom':
          if (rule.validator && !rule.validator(file)) {
            errors.push({
              rule: 'custom',
              message: rule.message,
              file
            });
          }
          break;
      }
    });

    return errors;
  }

  /**
   * Gets file type from filename extension
   */
  static getFileTypeFromName(fileName: string): string {
    const extension = fileName.split('.').pop()?.toLowerCase() || '';

    const typeMap: Record<string, string> = {
      // Images
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      png: 'image/png',
      gif: 'image/gif',
      webp: 'image/webp',
      svg: 'image/svg+xml',

      // Documents
      pdf: 'application/pdf',
      doc: 'application/msword',
      docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      xls: 'application/vnd.ms-excel',
      xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      ppt: 'application/vnd.ms-powerpoint',
      pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',

      // Text
      txt: 'text/plain',
      csv: 'text/csv',
      json: 'application/json',
      xml: 'application/xml',

      // Archives
      zip: 'application/zip',
      rar: 'application/x-rar-compressed',
      '7z': 'application/x-7z-compressed',
    };

    return typeMap[extension] || 'application/octet-stream';
  }

  /**
   * Formats file size για display
   */
  static formatFileSize(bytes: number): string {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';

    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${Math.round(bytes / Math.pow(1024, i) * 100) / 100} ${sizes[i]}`;
  }

  /**
   * Gets appropriate icon για file type
   */
  static getFileIcon(file: File): string {
    const type = file.type || this.getFileTypeFromName(file.name);

    if (type.startsWith('image/')) return 'Image';
    if (type.startsWith('video/')) return 'Video';
    if (type.startsWith('audio/')) return 'Music';
    if (type.includes('pdf')) return 'FileText';
    if (type.includes('word') || type.includes('document')) return 'FileText';
    if (type.includes('excel') || type.includes('spreadsheet')) return 'Sheet';
    if (type.includes('powerpoint') || type.includes('presentation')) return 'Presentation';
    if (type.includes('zip') || type.includes('archive')) return 'Archive';
    if (type.includes('text')) return 'FileText';

    return 'File';
  }

  /**
   * Gets default title based on variant and type
   */
  static getDefaultTitle(variant: FileUploadVariant, type: FileUploadType): string {
    const titleMap = {
      default: {
        single: 'Upload a file',
        multiple: 'Upload files',
        directory: 'Upload folder'
      },
      compact: {
        single: 'Choose file',
        multiple: 'Choose files',
        directory: 'Choose folder'
      },
      minimal: {
        single: 'File',
        multiple: 'Files',
        directory: 'Folder'
      },
      enhanced: {
        single: 'Drag & drop your file here',
        multiple: 'Drag & drop your files here',
        directory: 'Drag & drop your folder here'
      }
    };

    return titleMap[variant][type];
  }

  /**
   * Gets default subtitle based on type
   */
  static getDefaultSubtitle(type: FileUploadType): string {
    const subtitleMap = {
      single: 'Or click to browse',
      multiple: 'Or click to browse and select multiple files',
      directory: 'Or click to browse and select a folder'
    };

    return subtitleMap[type];
  }

  /**
   * Enterprise configuration presets για common file upload scenarios
   */
  static readonly ENTERPRISE_PRESETS = {
    // Document upload για forms
    DOCUMENT_UPLOAD: {
      variant: 'default' as const,
      size: 'md' as const,
      type: 'multiple' as const,
      progressVariant: 'linear' as const,
      maxFiles: 5,
      maxFileSize: 10 * 1024 * 1024, // 10MB
      accept: [
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ],
      validationRules: [
        {
          rule: 'fileSize' as const,
          value: 10 * 1024 * 1024,
          message: 'File size must be less than 10MB'
        },
        {
          rule: 'fileType' as const,
          value: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
          message: 'Only PDF and Word documents are allowed'
        }
      ]
    },

    // Image upload για galleries
    IMAGE_GALLERY: {
      variant: 'enhanced' as const,
      size: 'lg' as const,
      type: 'multiple' as const,
      progressVariant: 'detailed' as const,
      maxFiles: 20,
      maxFileSize: 5 * 1024 * 1024, // 5MB
      accept: ['image/jpeg', 'image/png', 'image/webp'],
      validationRules: [
        {
          rule: 'fileSize' as const,
          value: 5 * 1024 * 1024,
          message: 'Image size must be less than 5MB'
        },
        {
          rule: 'fileType' as const,
          value: ['image/jpeg', 'image/png', 'image/webp'],
          message: 'Only JPEG, PNG, and WebP images are allowed'
        }
      ]
    },

    // Profile picture upload
    AVATAR_UPLOAD: {
      variant: 'compact' as const,
      size: 'sm' as const,
      type: 'single' as const,
      progressVariant: 'circular' as const,
      maxFiles: 1,
      maxFileSize: 2 * 1024 * 1024, // 2MB
      accept: ['image/jpeg', 'image/png'],
      validationRules: [
        {
          rule: 'fileSize' as const,
          value: 2 * 1024 * 1024,
          message: 'Avatar image must be less than 2MB'
        },
        {
          rule: 'fileType' as const,
          value: ['image/jpeg', 'image/png'],
          message: 'Only JPEG and PNG images are allowed for avatars'
        }
      ]
    },

    // CSV data import
    DATA_IMPORT: {
      variant: 'minimal' as const,
      size: 'md' as const,
      type: 'single' as const,
      progressVariant: 'linear' as const,
      maxFiles: 1,
      maxFileSize: 50 * 1024 * 1024, // 50MB
      accept: ['text/csv', 'application/vnd.ms-excel'],
      validationRules: [
        {
          rule: 'fileSize' as const,
          value: 50 * 1024 * 1024,
          message: 'Data file must be less than 50MB'
        },
        {
          rule: 'fileType' as const,
          value: ['text/csv', 'application/vnd.ms-excel'],
          message: 'Only CSV and Excel files are allowed'
        }
      ]
    },

    // Archive backup upload
    BACKUP_UPLOAD: {
      variant: 'enhanced' as const,
      size: 'xl' as const,
      type: 'single' as const,
      progressVariant: 'detailed' as const,
      maxFiles: 1,
      maxFileSize: 500 * 1024 * 1024, // 500MB
      accept: ['application/zip', 'application/x-rar-compressed'],
      validationRules: [
        {
          rule: 'fileSize' as const,
          value: 500 * 1024 * 1024,
          message: 'Backup file must be less than 500MB'
        },
        {
          rule: 'fileType' as const,
          value: ['application/zip', 'application/x-rar-compressed'],
          message: 'Only ZIP and RAR archives are allowed'
        }
      ]
    },
  } as const;

  /**
   * Gets enterprise preset configuration
   */
  static getEnterprisePreset(preset: keyof typeof FileUploadComponentSystem.ENTERPRISE_PRESETS): FileUploadComponentConfig {
    return this.ENTERPRISE_PRESETS[preset];
  }

  /**
   * Creates quick configuration για common scenarios
   */
  static createQuickConfig(
    scenario: 'documents' | 'images' | 'avatar' | 'data' | 'backup',
    customOptions?: Partial<FileUploadComponentConfig>
  ): FileUploadComponentConfig {
    const presetMap = {
      documents: 'DOCUMENT_UPLOAD',
      images: 'IMAGE_GALLERY',
      avatar: 'AVATAR_UPLOAD',
      data: 'DATA_IMPORT',
      backup: 'BACKUP_UPLOAD',
    } as const;

    const preset = this.getEnterprisePreset(presetMap[scenario]);

    return {
      ...preset,
      ...customOptions,
      responsive: true,
    };
  }
}