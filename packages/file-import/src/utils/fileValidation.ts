import {
  FileValidationRule,
  ValidationResult,
  ValidationError,
  ValidationWarning,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  FileSizeError,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  FileTypeError,
  SupportedFormat
} from '../types';

// Supported file types με metadata
export const SUPPORTED_FILE_TYPES: Record<SupportedFormat, {
  mimeTypes: string[];
  maxSize: number;
  description: string;
  category: 'cad' | 'image' | 'document' | 'vector';
}> = {
  // CAD files
  dxf: {
    mimeTypes: ['application/dxf', 'image/vnd.dxf', 'text/plain'],
    maxSize: 500 * 1024 * 1024, // 500MB
    description: 'AutoCAD Drawing Exchange Format',
    category: 'cad'
  },
  dwg: {
    mimeTypes: ['application/acad', 'application/dwg', 'application/x-dwg'],
    maxSize: 500 * 1024 * 1024, // 500MB
    description: 'AutoCAD Drawing',
    category: 'cad'
  },

  // Documents
  pdf: {
    mimeTypes: ['application/pdf'],
    maxSize: 200 * 1024 * 1024, // 200MB
    description: 'Portable Document Format',
    category: 'document'
  },

  // Images
  jpg: {
    mimeTypes: ['image/jpeg'],
    maxSize: 50 * 1024 * 1024, // 50MB
    description: 'JPEG Image',
    category: 'image'
  },
  jpeg: {
    mimeTypes: ['image/jpeg'],
    maxSize: 50 * 1024 * 1024, // 50MB
    description: 'JPEG Image',
    category: 'image'
  },
  png: {
    mimeTypes: ['image/png'],
    maxSize: 50 * 1024 * 1024, // 50MB
    description: 'PNG Image',
    category: 'image'
  },
  webp: {
    mimeTypes: ['image/webp'],
    maxSize: 50 * 1024 * 1024, // 50MB
    description: 'WebP Image',
    category: 'image'
  },
  tiff: {
    mimeTypes: ['image/tiff', 'image/tif'],
    maxSize: 100 * 1024 * 1024, // 100MB
    description: 'TIFF Image',
    category: 'image'
  },
  bmp: {
    mimeTypes: ['image/bmp'],
    maxSize: 25 * 1024 * 1024, // 25MB
    description: 'Bitmap Image',
    category: 'image'
  },

  // Vector graphics
  svg: {
    mimeTypes: ['image/svg+xml'],
    maxSize: 10 * 1024 * 1024, // 10MB
    description: 'Scalable Vector Graphics',
    category: 'vector'
  }
};

/**
 * Validates a file against the provided validation rules
 * Enhanced από OLD_geo-canvas validation logic
 */
export async function validateFile(
  file: File,
  rules: FileValidationRule
): Promise<ValidationResult> {
  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];

  // File size validation
  if (file.size > rules.maxSize) {
    errors.push({
      code: 'FILE_TOO_LARGE',
      message: `Το αρχείο είναι πολύ μεγάλο (${formatFileSize(file.size)}). Μέγιστο επιτρεπτό μέγεθος: ${formatFileSize(rules.maxSize)}`,
      severity: 'error'
    });
  }

  if (rules.minSize && file.size < rules.minSize) {
    errors.push({
      code: 'FILE_TOO_SMALL',
      message: `Το αρχείο είναι πολύ μικρό (${formatFileSize(file.size)}). Ελάχιστο επιτρεπτό μέγεθος: ${formatFileSize(rules.minSize)}`,
      severity: 'error'
    });
  }

  // File extension validation
  const fileExtension = getFileExtension(file.name).toLowerCase();
  if (!rules.allowedExtensions.includes(fileExtension)) {
    errors.push({
      code: 'UNSUPPORTED_FILE_TYPE',
      message: `Μη υποστηριζόμενος τύπος αρχείου: .${fileExtension}. Επιτρεπτοί τύποι: ${rules.allowedExtensions.map(ext => `.${ext}`).join(', ')}`,
      severity: 'error'
    });
  }

  // MIME type validation (αν παρέχεται)
  if (rules.allowedMimeTypes && rules.allowedMimeTypes.length > 0) {
    if (!rules.allowedMimeTypes.includes(file.type)) {
      warnings.push({
        code: 'MIME_TYPE_MISMATCH',
        message: `Το MIME type του αρχείου (${file.type}) δεν ταιριάζει με την επέκταση`,
        suggestion: 'Ελέγξτε αν το αρχείο έχει τη σωστή επέκταση'
      });
    }
  }

  // File name validation
  if (!isValidFileName(file.name)) {
    warnings.push({
      code: 'INVALID_FILENAME',
      message: 'Το όνομα του αρχείου περιέχει μη επιτρεπτούς χαρακτήρες',
      suggestion: 'Χρησιμοποιήστε μόνο γράμματα, αριθμούς, παύλες και κάτω παύλες'
    });
  }

  // Size-based warnings
  const fileTypeInfo = SUPPORTED_FILE_TYPES[fileExtension as SupportedFormat];
  if (fileTypeInfo && file.size > fileTypeInfo.maxSize * 0.8) {
    warnings.push({
      code: 'LARGE_FILE_WARNING',
      message: `Μεγάλο αρχείο - η επεξεργασία μπορεί να είναι αργή`,
      suggestion: 'Σκεφτείτε να συμπιέσετε το αρχείο πριν την εισαγωγή'
    });
  }

  // Custom validation
  if (rules.customValidator) {
    try {
      const customResult = await rules.customValidator(file);
      errors.push(...customResult.errors);
      warnings.push(...customResult.warnings);
    } catch (error) {
      errors.push({
        code: 'CUSTOM_VALIDATION_ERROR',
        message: `Σφάλμα στην προσαρμοσμένη επικύρωση: ${error instanceof Error ? error.message : 'Άγνωστο σφάλμα'}`,
        severity: 'error'
      });
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Enhanced file type detection που βασίζεται σε OLD_geo-canvas logic
 */
export function detectFileType(file: File): {
  detectedType: SupportedFormat | 'unknown';
  confidence: number;
  category: string;
} {
  const extension = getFileExtension(file.name).toLowerCase() as SupportedFormat;
  const fileTypeInfo = SUPPORTED_FILE_TYPES[extension];

  if (!fileTypeInfo) {
    return {
      detectedType: 'unknown',
      confidence: 0,
      category: 'unknown'
    };
  }

  // Check MIME type consistency
  let confidence = 0.7; // Base confidence για extension match

  if (fileTypeInfo.mimeTypes.includes(file.type)) {
    confidence += 0.3; // Boost για MIME type match
  }

  return {
    detectedType: extension,
    confidence,
    category: fileTypeInfo.category
  };
}

/**
 * Enhanced από OLD_geo-canvas: Generates file metadata
 */
export async function extractFileMetadata(file: File): Promise<{
  name: string;
  size: number;
  type: string;
  lastModified: number;
  dimensions?: { width: number; height: number };
}> {
  const metadata = {
    name: file.name,
    size: file.size,
    type: file.type || detectMimeTypeFromExtension(file.name),
    lastModified: file.lastModified
  };

  // Extract image dimensions για image files
  const fileType = detectFileType(file);
  if (fileType.category === 'image') {
    try {
      const dimensions = await getImageDimensions(file);
      return { ...metadata, dimensions };
    } catch (error) {
      console.warn('Failed to extract image dimensions:', error);
    }
  }

  return metadata;
}

// Helper functions
function getFileExtension(filename: string): string {
  const lastDot = filename.lastIndexOf('.');
  return lastDot === -1 ? '' : filename.slice(lastDot + 1);
}

function formatFileSize(bytes: number): string {
  const units = ['B', 'KB', 'MB', 'GB'];
  let size = bytes;
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(1)} ${units[unitIndex]}`;
}

function isValidFileName(filename: string): boolean {
  // Allow letters, numbers, spaces, hyphens, underscores, and dots
  const validPattern = /^[a-zA-Z0-9\s._-]+$/;
  return validPattern.test(filename) && filename.length <= 255;
}

function detectMimeTypeFromExtension(filename: string): string {
  const extension = getFileExtension(filename).toLowerCase() as SupportedFormat;
  const fileTypeInfo = SUPPORTED_FILE_TYPES[extension];
  return fileTypeInfo?.mimeTypes[0] || 'application/octet-stream';
}

async function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight
      });
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Failed to load image for dimension extraction'));
    };

    img.src = url;
  });
}