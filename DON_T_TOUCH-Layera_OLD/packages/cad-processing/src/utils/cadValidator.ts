import {
  CADValidationResult,
  CADValidationError,
  CADValidationWarning,
  CADFileInfo,
  CADFormat
} from '../types';

/**
 * Validates CAD files before processing
 */
export async function validateCADFile(file: File): Promise<CADValidationResult> {
  const errors: CADValidationError[] = [];
  const warnings: CADValidationWarning[] = [];

  // Basic file validation
  if (!file) {
    errors.push({
      code: 'NO_FILE',
      message: 'Δεν παρέχεται αρχείο',
      severity: 'critical'
    });

    return {
      isValid: false,
      errors,
      warnings,
      fileInfo: {
        format: 'unknown',
        size: 0,
        estimatedComplexity: 'low',
        estimatedProcessingTime: 0
      }
    };
  }

  // File size validation
  const maxSize = 100 * 1024 * 1024; // 100MB
  if (file.size > maxSize) {
    errors.push({
      code: 'FILE_TOO_LARGE',
      message: `Το αρχείο είναι πολύ μεγάλο (${formatFileSize(file.size)}). Μέγιστο επιτρεπτό: ${formatFileSize(maxSize)}`,
      severity: 'error'
    });
  }

  if (file.size === 0) {
    errors.push({
      code: 'EMPTY_FILE',
      message: 'Το αρχείο είναι κενό',
      severity: 'critical'
    });
  }

  // Format detection and validation
  const fileInfo = await analyzeCADFile(file);

  if (fileInfo.format === 'unknown') {
    errors.push({
      code: 'UNKNOWN_FORMAT',
      message: 'Δεν αναγνωρίζεται η μορφή του αρχείου CAD',
      severity: 'error'
    });
  }

  // Format-specific validation
  switch (fileInfo.format) {
    case 'dxf':
      await validateDXFFile(file, errors, warnings);
      break;
    case 'dwg':
      errors.push({
        code: 'DWG_NOT_SUPPORTED',
        message: 'Η μορφή DWG δεν υποστηρίζεται ακόμη. Παρακαλώ μετατρέψτε σε DXF.',
        severity: 'error'
      });
      break;
    default:
      if (fileInfo.format !== 'unknown') {
        errors.push({
          code: 'UNSUPPORTED_FORMAT',
          message: `Η μορφή ${fileInfo.format} δεν υποστηρίζεται`,
          severity: 'error'
        });
      }
  }

  // Size-based warnings
  if (file.size > 10 * 1024 * 1024) { // 10MB
    warnings.push({
      code: 'LARGE_FILE',
      message: 'Μεγάλο αρχείο - η επεξεργασία μπορεί να πάρει αρκετό χρόνο',
      suggestion: 'Σκεφτείτε να απλοποιήσετε το σχέδιο ή να το χωρίσετε σε μικρότερα μέρη'
    });
  }

  // Complexity warnings
  if (fileInfo.estimatedComplexity === 'high') {
    warnings.push({
      code: 'HIGH_COMPLEXITY',
      message: 'Υψηλή πολυπλοκότητα σχεδίου',
      suggestion: 'Η επεξεργασία μπορεί να είναι αργή. Σκεφτείτε να αφαιρέσετε περιττά elements.'
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    fileInfo
  };
}

/**
 * Analyzes CAD file to extract basic information
 */
async function analyzeCADFile(file: File): Promise<CADFileInfo> {
  const format = detectCADFormat(file);
  const size = file.size;

  // Estimate complexity based on file size
  let estimatedComplexity: 'low' | 'medium' | 'high' = 'low';
  if (size > 5 * 1024 * 1024) { // > 5MB
    estimatedComplexity = 'high';
  } else if (size > 1 * 1024 * 1024) { // > 1MB
    estimatedComplexity = 'medium';
  }

  // Estimate processing time (simplified)
  const baseTime = 1000; // 1 second base
  const sizeMultiplier = size / (1024 * 1024); // MB
  const complexityMultiplier = estimatedComplexity === 'high' ? 3 :
                               estimatedComplexity === 'medium' ? 2 : 1;

  const estimatedProcessingTime = Math.round(baseTime * sizeMultiplier * complexityMultiplier);

  return {
    format,
    size,
    estimatedComplexity,
    estimatedProcessingTime
  };
}

/**
 * Detects CAD file format based on extension and content
 */
function detectCADFormat(file: File): CADFormat | 'unknown' {
  const extension = file.name.split('.').pop()?.toLowerCase();

  switch (extension) {
    case 'dxf':
      return 'dxf';
    case 'dwg':
      return 'dwg';
    case 'dwf':
      return 'dwf';
    case 'dgn':
      return 'dgn';
    default:
      return 'unknown';
  }
}

/**
 * Validates DXF file content
 */
async function validateDXFFile(
  file: File,
  errors: CADValidationError[],
  warnings: CADValidationWarning[]
): Promise<void> {
  try {
    // Read first part of file to check structure
    const headerChunk = await file.slice(0, 4096).text();

    // Check for DXF header markers
    if (!headerChunk.includes('SECTION')) {
      errors.push({
        code: 'INVALID_DXF_STRUCTURE',
        message: 'Μη έγκυρη δομή DXF: Λείπει η ενότητα SECTION',
        severity: 'error'
      });
      return;
    }

    if (!headerChunk.includes('HEADER')) {
      warnings.push({
        code: 'MISSING_HEADER_SECTION',
        message: 'Λείπει η ενότητα HEADER στο DXF',
        suggestion: 'Ορισμένες πληροφορίες μπορεί να μην είναι διαθέσιμες'
      });
    }

    // Check for entities section
    const fullContent = await file.text();
    if (!fullContent.includes('ENTITIES')) {
      warnings.push({
        code: 'MISSING_ENTITIES_SECTION',
        message: 'Λείπει η ενότητα ENTITIES στο DXF',
        suggestion: 'Το αρχείο μπορεί να μην περιέχει γεωμετρικά στοιχεία'
      });
    }

    // Check for common DXF version indicators
    const versionMatch = fullContent.match(/\$ACADVER\s+1\s+([A-Z0-9]+)/);
    if (versionMatch) {
      const version = versionMatch[1];
      if (version < 'AC1012') { // Very old version
        warnings.push({
          code: 'OLD_DXF_VERSION',
          message: `Παλιά έκδοση DXF (${version})`,
          suggestion: 'Μπορεί να υπάρχουν προβλήματα συμβατότητας'
        });
      }
    }

    // Check for binary DXF (not supported)
    if (fullContent.charCodeAt(0) === 0) {
      errors.push({
        code: 'BINARY_DXF_NOT_SUPPORTED',
        message: 'Τα δυαδικά αρχεία DXF δεν υποστηρίζονται',
        severity: 'error'
      });
    }

    // Check encoding
    if (containsNonAsciiCharacters(fullContent)) {
      warnings.push({
        code: 'NON_ASCII_CHARACTERS',
        message: 'Το αρχείο περιέχει μη-ASCII χαρακτήρες',
        suggestion: 'Βεβαιωθείτε ότι η κωδικοποίηση είναι UTF-8'
      });
    }

  } catch (error) {
    errors.push({
      code: 'FILE_READ_ERROR',
      message: `Σφάλμα ανάγνωσης αρχείου: ${error instanceof Error ? error.message : 'Άγνωστο σφάλμα'}`,
      severity: 'error'
    });
  }
}

/**
 * Checks if string contains non-ASCII characters
 */
function containsNonAsciiCharacters(text: string): boolean {
  // Check first 1000 characters για performance
  const sample = text.substring(0, 1000);
  return /[^\x00-\x7F]/.test(sample);
}

/**
 * Formats file size για human-readable display
 */
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

/**
 * Validates CAD processing options
 */
export function validateCADProcessingOptions(options: Record<string, unknown>): {
  isValid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Validate render options
  if (options.renderOptions) {
    const renderOpts = options.renderOptions as Record<string, unknown>;

    if (renderOpts.scaleFactor && typeof renderOpts.scaleFactor === 'number') {
      if (renderOpts.scaleFactor <= 0) {
        errors.push('Η κλίμακα πρέπει να είναι θετικός αριθμός');
      }
      if (renderOpts.scaleFactor > 1000) {
        warnings.push('Πολύ μεγάλη κλίμακα μπορεί να προκαλέσει προβλήματα απόδοσης');
      }
    }
  }

  // Validate parse options
  if (options.parseOptions) {
    const parseOpts = options.parseOptions as Record<string, unknown>;

    if (parseOpts.encoding && typeof parseOpts.encoding === 'string') {
      const validEncodings = ['utf-8', 'cp1252', 'iso-8859-1'];
      if (!validEncodings.includes(parseOpts.encoding)) {
        errors.push(`Μη υποστηριζόμενη κωδικοποίηση: ${parseOpts.encoding}`);
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

/**
 * Estimates CAD file complexity από το περιεχόμενο
 */
export async function estimateCADComplexity(file: File): Promise<{
  complexity: 'low' | 'medium' | 'high';
  entityCount: number;
  layerCount: number;
  factors: string[];
}> {
  const factors: string[] = [];
  let complexity: 'low' | 'medium' | 'high' = 'low';

  try {
    const content = await file.text();

    // Count entities (simplified)
    const entityMatches = content.match(/\n\s*0\s+\n[A-Z]+/g) || [];
    const entityCount = entityMatches.length;

    // Count layers (simplified)
    const layerMatches = content.match(/\n\s*8\s+\n[^\n]+/g) || [];
    const layerCount = new Set(layerMatches.map(m => m.trim())).size;

    // Determine complexity
    if (entityCount > 10000) {
      complexity = 'high';
      factors.push('Υψηλός αριθμός entities (>10k)');
    } else if (entityCount > 1000) {
      complexity = 'medium';
      factors.push('Μέτριος αριθμός entities (>1k)');
    }

    if (layerCount > 50) {
      complexity = 'high';
      factors.push('Πολλά layers (>50)');
    } else if (layerCount > 10) {
      if (complexity === 'low') complexity = 'medium';
      factors.push('Αρκετά layers (>10)');
    }

    // Check for complex entities
    if (content.includes('POLYLINE') || content.includes('SPLINE')) {
      if (complexity === 'low') complexity = 'medium';
      factors.push('Πολύπλοκα γεωμετρικά στοιχεία');
    }

    if (content.includes('HATCH') || content.includes('REGION')) {
      complexity = 'high';
      factors.push('Πολύπλοκα fills/regions');
    }

    return {
      complexity,
      entityCount,
      layerCount,
      factors
    };

  } catch (error) {
    return {
      complexity: 'medium',
      entityCount: 0,
      layerCount: 0,
      factors: ['Δεν ήταν δυνατή η ανάλυση του αρχείου']
    };
  }
}