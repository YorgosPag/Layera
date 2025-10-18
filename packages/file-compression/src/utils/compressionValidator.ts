import {
  CompressionOptions,
  CompressionValidationResult,
  CompressionValidationError,
  CompressionValidationWarning,
  CompressionRecommendation,
  CompressionFormat
} from '../types';

const SUPPORTED_FORMATS = ['jpeg', 'webp', 'avif', 'png', 'original'] as const;

const FORMAT_RECOMMENDATIONS = {
  photo: 'jpeg',
  graphics: 'png',
  modern: 'webp',
  nextgen: 'avif'
} as const;

/**
 * Validates compression options
 */
export function validateCompressionOptions(
  options: CompressionOptions
): CompressionValidationResult {
  const errors: CompressionValidationError[] = [];
  const warnings: CompressionValidationWarning[] = [];
  const recommendations: CompressionRecommendation[] = [];

  // Validate quality
  if (options.quality !== undefined) {
    if (options.quality < 1 || options.quality > 100) {
      errors.push({
        code: 'INVALID_QUALITY',
        message: `Ποιότητα πρέπει να είναι μεταξύ 1-100. Τρέχουσα: ${options.quality}`,
        severity: 'error'
      });
    } else if (options.quality < 50) {
      warnings.push({
        code: 'LOW_QUALITY',
        message: 'Χαμηλή ποιότητα μπορεί να επηρεάσει την εμφάνιση της εικόνας',
        suggestion: 'Σκεφτείτε να χρησιμοποιήσετε ποιότητα 60-85 για καλύτερα αποτελέσματα'
      });
    } else if (options.quality > 95) {
      warnings.push({
        code: 'HIGH_QUALITY',
        message: 'Υψηλή ποιότητα μπορεί να δημιουργήσει μεγάλα αρχεία',
        suggestion: 'Ποιότητα 80-90 συνήθως παρέχει καλή ισορροπία μεγέθους/ποιότητας'
      });
    }
  }

  // Validate format
  if (options.format && !SUPPORTED_FORMATS.includes(options.format)) {
    errors.push({
      code: 'UNSUPPORTED_FORMAT',
      message: `Μη υποστηριζόμενη μορφή: ${options.format}`,
      severity: 'error'
    });
  }

  // Validate dimensions
  if (options.maxWidth !== undefined && options.maxWidth <= 0) {
    errors.push({
      code: 'INVALID_WIDTH',
      message: 'Μέγιστο πλάτος πρέπει να είναι θετικός αριθμός',
      severity: 'error'
    });
  }

  if (options.maxHeight !== undefined && options.maxHeight <= 0) {
    errors.push({
      code: 'INVALID_HEIGHT',
      message: 'Μέγιστο ύψος πρέπει να είναι θετικός αριθμός',
      severity: 'error'
    });
  }

  // Dimension recommendations
  if (options.maxWidth && options.maxWidth > 4000) {
    recommendations.push({
      type: 'dimension',
      message: 'Πολύ μεγάλο πλάτος - σκεφτείτε μείωση για καλύτερη απόδοση',
      impact: 'medium',
      estimatedSavings: 30
    });
  }

  if (options.maxHeight && options.maxHeight > 4000) {
    recommendations.push({
      type: 'dimension',
      message: 'Πολύ μεγάλο ύψος - σκεφτείτε μείωση για καλύτερη απόδοση',
      impact: 'medium',
      estimatedSavings: 30
    });
  }

  // Format optimization recommendations
  if (!options.format || options.format === 'jpeg') {
    recommendations.push({
      type: 'format',
      message: 'WebP μπορεί να παρέχει 25-30% καλύτερη συμπίεση από JPEG',
      impact: 'high',
      estimatedSavings: 25
    });
  }

  // Quality optimization recommendations
  if (!options.quality) {
    recommendations.push({
      type: 'quality',
      message: 'Ορίστε ποιότητα για καλύτερο έλεγχο του μεγέθους αρχείου',
      impact: 'medium'
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    recommendations
  };
}

/**
 * Recommends optimal compression options για ένα αρχείο
 */
export async function recommendOptimizations(file: File): Promise<CompressionOptions> {
  const recommendations: CompressionOptions = {};

  // Analyze file properties
  const fileSize = file.size;
  const fileName = file.name.toLowerCase();
  const fileType = file.type;

  try {
    // Get image dimensions αν είναι δυνατόν
    const dimensions = await getImageDimensions(file);

    // Format recommendations
    if (fileType.includes('png') && fileName.includes('photo')) {
      recommendations.format = 'webp';
      recommendations.quality = 85;
    } else if (fileType.includes('jpeg')) {
      recommendations.format = 'webp';
      recommendations.quality = 80;
    } else if (fileType.includes('png')) {
      // Keep PNG για graphics/icons με transparency
      recommendations.format = 'png';
      recommendations.quality = 90;
    } else {
      recommendations.format = 'webp';
      recommendations.quality = 80;
    }

    // Size-based recommendations
    if (fileSize > 5 * 1024 * 1024) { // > 5MB
      recommendations.quality = 70;
      if (dimensions) {
        recommendations.maxWidth = Math.min(dimensions.width, 2000);
        recommendations.maxHeight = Math.min(dimensions.height, 2000);
      }
    } else if (fileSize > 2 * 1024 * 1024) { // > 2MB
      recommendations.quality = 75;
      if (dimensions) {
        recommendations.maxWidth = Math.min(dimensions.width, 2500);
        recommendations.maxHeight = Math.min(dimensions.height, 2500);
      }
    } else if (fileSize > 1 * 1024 * 1024) { // > 1MB
      recommendations.quality = 80;
    }

    // Dimension-based recommendations
    if (dimensions) {
      if (dimensions.width > 3000 || dimensions.height > 3000) {
        recommendations.maxWidth = 2500;
        recommendations.maxHeight = 2500;
        recommendations.maintainAspectRatio = true;
      }
    }

    // Additional optimizations
    recommendations.enableProgressive = true;
    recommendations.stripMetadata = true;

  } catch (error) {
    console.warn('Failed to analyze image dimensions:', error);
    // Fallback recommendations
    recommendations.format = 'webp';
    recommendations.quality = 80;
    recommendations.stripMetadata = true;
  }

  return recommendations;
}

/**
 * Gets optimal format για συγκεκριμένο use case
 */
export function getOptimalFormat(useCase: 'web' | 'print' | 'archive' | 'thumbnail'): CompressionFormat {
  switch (useCase) {
    case 'web':
      return 'webp';
    case 'print':
      return 'jpeg';
    case 'archive':
      return 'png';
    case 'thumbnail':
      return 'webp';
    default:
      return 'webp';
  }
}

/**
 * Calculates compression efficiency score
 */
export function calculateCompressionScore(
  originalSize: number,
  compressedSize: number,
  targetQuality: number
): number {
  const compressionRatio = (originalSize - compressedSize) / originalSize;
  const qualityPenalty = targetQuality < 70 ? (70 - targetQuality) / 100 : 0;

  return Math.max(0, Math.min(100, (compressionRatio * 100) - (qualityPenalty * 20)));
}

/**
 * Helper function να πάρει dimensions από image file
 */
function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
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
      reject(new Error('Failed to load image for dimension analysis'));
    };

    img.src = url;
  });
}

/**
 * Validates batch compression options
 */
export function validateBatchOptions(
  files: File[],
  options: CompressionOptions
): CompressionValidationResult {
  const errors: CompressionValidationError[] = [];
  const warnings: CompressionValidationWarning[] = [];
  const recommendations: CompressionRecommendation[] = [];

  // Check file count
  if (files.length === 0) {
    errors.push({
      code: 'NO_FILES',
      message: 'Δεν επιλέχθηκαν αρχεία για συμπίεση',
      severity: 'error'
    });
  }

  if (files.length > 50) {
    warnings.push({
      code: 'MANY_FILES',
      message: 'Μεγάλος αριθμός αρχείων μπορεί να επηρεάσει την απόδοση',
      suggestion: 'Σκεφτείτε να επεξεργαστείτε τα αρχεία σε μικρότερες ομάδες'
    });
  }

  // Check total size
  const totalSize = files.reduce((sum, file) => sum + file.size, 0);
  if (totalSize > 500 * 1024 * 1024) { // > 500MB
    warnings.push({
      code: 'LARGE_BATCH',
      message: 'Μεγάλο συνολικό μέγεθος αρχείων - η επεξεργασία μπορεί να πάρει αρκετό χρόνο',
      suggestion: 'Επεξεργαστείτε τα αρχεία σε μικρότερες ομάδες για καλύτερη απόδοση'
    });
  }

  // Validate individual options
  const optionsValidation = validateCompressionOptions(options);
  errors.push(...optionsValidation.errors);
  warnings.push(...optionsValidation.warnings);
  recommendations.push(...optionsValidation.recommendations);

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    recommendations
  };
}