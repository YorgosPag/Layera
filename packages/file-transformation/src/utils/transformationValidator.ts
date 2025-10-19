import {
  TransformationOptions,
  TransformationValidationResult,
  TransformationValidationError,
  TransformationValidationWarning,
  SupportedFormat,
  FormatCompatibility
} from '../types';

const SUPPORTED_FORMATS: SupportedFormat[] = [
  'dxf', 'dwg', 'svg', 'geojson', 'kml', 'gpx', 'shapefile',
  'tiff', 'geotiff', 'png', 'jpeg', 'webp', 'pdf', 'autocad', 'microstation'
];

// Format compatibility matrix
const FORMAT_COMPATIBILITY: Record<SupportedFormat, {
  canTransformTo: SupportedFormat[];
  dataLossRisk: Record<SupportedFormat, 'none' | 'low' | 'medium' | 'high'>;
  limitations: Record<SupportedFormat, string[]>;
}> = {
  'geojson': {
    canTransformTo: ['kml', 'gpx', 'svg', 'shapefile'],
    dataLossRisk: {
      'kml': 'low',
      'gpx': 'medium',
      'svg': 'medium',
      'shapefile': 'low'
    },
    limitations: {
      'gpx': ['Only point and line geometries supported'],
      'svg': ['Complex properties may be lost', 'Coordinate precision may be reduced']
    }
  },
  'dxf': {
    canTransformTo: ['geojson', 'svg', 'dwg'],
    dataLossRisk: {
      'geojson': 'medium',
      'svg': 'low',
      'dwg': 'low'
    },
    limitations: {
      'geojson': ['CAD-specific entities may be lost', 'Layer information simplified'],
      'svg': ['3D information lost', 'Text styling may change']
    }
  },
  'svg': {
    canTransformTo: ['geojson', 'dxf', 'png', 'jpeg', 'webp'],
    dataLossRisk: {
      'geojson': 'high',
      'dxf': 'high',
      'png': 'none',
      'jpeg': 'none',
      'webp': 'none'
    },
    limitations: {
      'geojson': ['SVG styling lost', 'Complex paths may be simplified'],
      'dxf': ['Vector precision may be reduced', 'Styling information lost']
    }
  },
  'kml': {
    canTransformTo: ['geojson', 'gpx'],
    dataLossRisk: {
      'geojson': 'low',
      'gpx': 'medium'
    },
    limitations: {
      'gpx': ['Only track and waypoint data preserved']
    }
  },
  'gpx': {
    canTransformTo: ['geojson', 'kml'],
    dataLossRisk: {
      'geojson': 'low',
      'kml': 'low'
    },
    limitations: {}
  },
  'dwg': {
    canTransformTo: ['dxf', 'geojson', 'svg'],
    dataLossRisk: {
      'dxf': 'low',
      'geojson': 'high',
      'svg': 'medium'
    },
    limitations: {
      'geojson': ['Complex CAD entities lost', 'Proprietary features lost'],
      'svg': ['3D information lost', 'Complex entities simplified']
    }
  },
  'shapefile': {
    canTransformTo: ['geojson', 'kml'],
    dataLossRisk: {
      'geojson': 'none',
      'kml': 'low'
    },
    limitations: {}
  },
  'tiff': {
    canTransformTo: ['png', 'jpeg', 'webp', 'geotiff'],
    dataLossRisk: {
      'png': 'none',
      'jpeg': 'low',
      'webp': 'low',
      'geotiff': 'none'
    },
    limitations: {
      'jpeg': ['Transparency lost if present']
    }
  },
  'geotiff': {
    canTransformTo: ['tiff', 'png', 'jpeg', 'webp'],
    dataLossRisk: {
      'tiff': 'low',
      'png': 'medium',
      'jpeg': 'medium',
      'webp': 'medium'
    },
    limitations: {
      'tiff': ['Geo-referencing information lost'],
      'png': ['Geo-referencing information lost'],
      'jpeg': ['Geo-referencing information lost', 'Transparency lost'],
      'webp': ['Geo-referencing information lost']
    }
  },
  'png': {
    canTransformTo: ['jpeg', 'webp', 'tiff'],
    dataLossRisk: {
      'jpeg': 'low',
      'webp': 'none',
      'tiff': 'none'
    },
    limitations: {
      'jpeg': ['Transparency lost']
    }
  },
  'jpeg': {
    canTransformTo: ['png', 'webp', 'tiff'],
    dataLossRisk: {
      'png': 'none',
      'webp': 'none',
      'tiff': 'none'
    },
    limitations: {}
  },
  'webp': {
    canTransformTo: ['png', 'jpeg', 'tiff'],
    dataLossRisk: {
      'png': 'none',
      'jpeg': 'low',
      'tiff': 'none'
    },
    limitations: {
      'jpeg': ['Transparency lost if present']
    }
  },
  'pdf': {
    canTransformTo: ['svg', 'png', 'jpeg'],
    dataLossRisk: {
      'svg': 'high',
      'png': 'medium',
      'jpeg': 'medium'
    },
    limitations: {
      'svg': ['Complex PDF features lost', 'Text may become paths'],
      'png': ['Vector information lost', 'Text becomes raster'],
      'jpeg': ['Vector information lost', 'Text becomes raster', 'Transparency lost']
    }
  },
  'autocad': {
    canTransformTo: ['dxf', 'dwg'],
    dataLossRisk: {
      'dxf': 'low',
      'dwg': 'none'
    },
    limitations: {}
  },
  'microstation': {
    canTransformTo: ['dxf', 'dwg'],
    dataLossRisk: {
      'dxf': 'medium',
      'dwg': 'medium'
    },
    limitations: {
      'dxf': ['MicroStation-specific features lost'],
      'dwg': ['Some MicroStation features may not translate']
    }
  }
};

// Common coordinate systems με validation
const COMMON_CRS = [
  'EPSG:4326', 'EPSG:3857', 'EPSG:2100', 'EPSG:32634', 'EPSG:32635'
];

/**
 * Validates transformation options
 */
export function validateTransformationOptions(
  options: TransformationOptions
): TransformationValidationResult {
  const errors: TransformationValidationError[] = [];
  const warnings: TransformationValidationWarning[] = [];

  // Validate source format
  if (!SUPPORTED_FORMATS.includes(options.sourceFormat)) {
    errors.push({
      code: 'UNSUPPORTED_SOURCE_FORMAT',
      message: `Μη υποστηριζόμενη πηγαία μορφή: ${options.sourceFormat}`,
      severity: 'error',
      field: 'sourceFormat'
    });
  }

  // Validate target format
  if (!SUPPORTED_FORMATS.includes(options.targetFormat)) {
    errors.push({
      code: 'UNSUPPORTED_TARGET_FORMAT',
      message: `Μη υποστηριζόμενη μορφή στόχου: ${options.targetFormat}`,
      severity: 'error',
      field: 'targetFormat'
    });
  }

  // Check format compatibility
  const compatibility = getFormatCompatibility(options.sourceFormat, options.targetFormat);
  if (!compatibility.compatible) {
    errors.push({
      code: 'INCOMPATIBLE_FORMATS',
      message: `Η μετατροπή από ${options.sourceFormat} σε ${options.targetFormat} δεν υποστηρίζεται`,
      severity: 'error'
    });
  } else if (compatibility.dataLossRisk === 'high') {
    warnings.push({
      code: 'HIGH_DATA_LOSS_RISK',
      message: 'Υψηλός κίνδυνος απώλειας δεδομένων κατά τη μετατροπή',
      suggestion: `Σκεφτείτε εναλλακτικές μορφές: ${compatibility.recommendedAlternatives?.join(', ')}`,
      impact: 'high'
    });
  } else if (compatibility.dataLossRisk === 'medium') {
    warnings.push({
      code: 'MEDIUM_DATA_LOSS_RISK',
      message: 'Μέτριος κίνδυνος απώλειας δεδομένων',
      suggestion: 'Ελέγξτε το αποτέλεσμα προσεκτικά',
      impact: 'medium'
    });
  }

  // Validate coordinate systems
  if (options.sourceCRS && !isValidCRS(options.sourceCRS)) {
    warnings.push({
      code: 'UNKNOWN_SOURCE_CRS',
      message: `Άγνωστο σύστημα συντεταγμένων πηγής: ${options.sourceCRS}`,
      suggestion: 'Βεβαιωθείτε ότι το EPSG code είναι σωστό',
      impact: 'medium'
    });
  }

  if (options.targetCRS && !isValidCRS(options.targetCRS)) {
    warnings.push({
      code: 'UNKNOWN_TARGET_CRS',
      message: `Άγνωστο σύστημα συντεταγμένων στόχου: ${options.targetCRS}`,
      suggestion: 'Βεβαιωθείτε ότι το EPSG code είναι σωστό',
      impact: 'medium'
    });
  }

  // Validate transformation parameters
  if (options.transformationParams) {
    const params = options.transformationParams;

    if (params.scale) {
      if (params.scale.x <= 0 || params.scale.y <= 0) {
        errors.push({
          code: 'INVALID_SCALE',
          message: 'Η κλίμακα πρέπει να είναι θετικός αριθμός',
          severity: 'error',
          field: 'transformationParams.scale'
        });
      }

      if (params.scale.x > 1000 || params.scale.y > 1000) {
        warnings.push({
          code: 'LARGE_SCALE',
          message: 'Πολύ μεγάλη κλίμακα μπορεί να προκαλέσει προβλήματα',
          suggestion: 'Χρησιμοποιήστε κλίμακα κάτω από 1000',
          impact: 'medium'
        });
      }
    }

    if (params.rotation !== undefined) {
      if (Math.abs(params.rotation) > 360) {
        warnings.push({
          code: 'LARGE_ROTATION',
          message: 'Περιστροφή μεγαλύτερη από 360° θα κανονικοποιηθεί',
          impact: 'low'
        });
      }
    }

    if (params.precision !== undefined && params.precision < 0) {
      errors.push({
        code: 'INVALID_PRECISION',
        message: 'Η ακρίβεια πρέπει να είναι μη-αρνητικός αριθμός',
        severity: 'error',
        field: 'transformationParams.precision'
      });
    }
  }

  // Validate quality settings
  if (options.qualitySettings) {
    const quality = options.qualitySettings;

    if (quality.simplificationTolerance !== undefined && quality.simplificationTolerance < 0) {
      errors.push({
        code: 'INVALID_TOLERANCE',
        message: 'Η ανοχή απλοποίησης πρέπει να είναι μη-αρνητική',
        severity: 'error',
        field: 'qualitySettings.simplificationTolerance'
      });
    }

    if (quality.compressionLevel !== undefined) {
      if (quality.compressionLevel < 0 || quality.compressionLevel > 100) {
        errors.push({
          code: 'INVALID_COMPRESSION',
          message: 'Το επίπεδο συμπίεσης πρέπει να είναι μεταξύ 0-100',
          severity: 'error',
          field: 'qualitySettings.compressionLevel'
        });
      }
    }

    if (quality.colorDepth && ![8, 16, 24, 32].includes(quality.colorDepth)) {
      errors.push({
        code: 'INVALID_COLOR_DEPTH',
        message: 'Το βάθος χρώματος πρέπει να είναι 8, 16, 24 ή 32',
        severity: 'error',
        field: 'qualitySettings.colorDepth'
      });
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    compatibility
  };
}

/**
 * Gets format compatibility information
 */
export function getFormatCompatibility(
  sourceFormat: SupportedFormat,
  targetFormat: SupportedFormat
): FormatCompatibility {
  const sourceConfig = FORMAT_COMPATIBILITY[sourceFormat];

  if (!sourceConfig) {
    return {
      sourceSupported: false,
      targetSupported: false,
      dataLossRisk: 'high',
      recommendedAlternatives: [],
      limitations: [`Μη υποστηριζόμενη πηγαία μορφή: ${sourceFormat}`]
    };
  }

  const compatible = sourceConfig.canTransformTo.includes(targetFormat);
  const dataLossRisk = Object.prototype.hasOwnProperty.call(sourceConfig.dataLossRisk, targetFormat)
    ? sourceConfig.dataLossRisk[targetFormat]!
    : 'high';
  const limitations = Object.prototype.hasOwnProperty.call(sourceConfig.limitations, targetFormat)
    ? sourceConfig.limitations[targetFormat]!
    : [];

  // Get recommended alternatives if not compatible
  const recommendedAlternatives = compatible ? [] : sourceConfig.canTransformTo.slice(0, 3);

  return {
    sourceSupported: true,
    targetSupported: SUPPORTED_FORMATS.includes(targetFormat),
    dataLossRisk,
    recommendedAlternatives,
    limitations,
    compatible
  };
}

/**
 * Checks if a CRS is valid/known
 */
function isValidCRS(crs: string): boolean {
  // Check common formats
  if (COMMON_CRS.includes(crs)) {
    return true;
  }

  // Check EPSG format
  if (/^EPSG:\d+$/.test(crs)) {
    return true;
  }

  // Check PROJ4 string format
  if (crs.startsWith('+proj=')) {
    return true;
  }

  return false;
}

/**
 * Gets format category
 */
export function getFormatCategory(format: SupportedFormat): 'vector' | 'raster' | 'cad' | 'document' {
  const categories: Record<SupportedFormat, 'vector' | 'raster' | 'cad' | 'document'> = {
    'geojson': 'vector',
    'kml': 'vector',
    'gpx': 'vector',
    'shapefile': 'vector',
    'svg': 'vector',
    'dxf': 'cad',
    'dwg': 'cad',
    'autocad': 'cad',
    'microstation': 'cad',
    'tiff': 'raster',
    'geotiff': 'raster',
    'png': 'raster',
    'jpeg': 'raster',
    'webp': 'raster',
    'pdf': 'document'
  };

  return Object.prototype.hasOwnProperty.call(categories, format)
    ? categories[format]!
    : 'document';
}

/**
 * Validates batch transformation options
 */
export function validateBatchTransformation(
  files: File[],
  options: TransformationOptions
): TransformationValidationResult {
  const errors: TransformationValidationError[] = [];
  const warnings: TransformationValidationWarning[] = [];

  // Check file count
  if (files.length === 0) {
    errors.push({
      code: 'NO_FILES',
      message: 'Δεν επιλέχθηκαν αρχεία για μετατροπή',
      severity: 'error'
    });
  }

  if (files.length > 20) {
    warnings.push({
      code: 'MANY_FILES',
      message: 'Μεγάλος αριθμός αρχείων μπορεί να επηρεάσει την απόδοση',
      suggestion: 'Σκεφτείτε να επεξεργαστείτε τα αρχεία σε μικρότερες ομάδες',
      impact: 'medium'
    });
  }

  // Check total size
  const totalSize = files.reduce((sum, file) => sum + file.size, 0);
  if (totalSize > 1024 * 1024 * 1024) { // > 1GB
    warnings.push({
      code: 'LARGE_BATCH',
      message: 'Μεγάλο συνολικό μέγεθος αρχείων - η επεξεργασία μπορεί να πάρει αρκετό χρόνο',
      suggestion: 'Επεξεργαστείτε τα αρχεία σε μικρότερες ομάδες για καλύτερη απόδοση',
      impact: 'high'
    });
  }

  // Check format consistency
  const extensions = files.map(file => file.name.split('.').pop()?.toLowerCase()).filter(Boolean);
  const uniqueExtensions = [...new Set(extensions)];

  if (uniqueExtensions.length > 1) {
    warnings.push({
      code: 'MIXED_FORMATS',
      message: 'Ανάμεικτες μορφές αρχείων στη δέσμη',
      suggestion: 'Βεβαιωθείτε ότι όλα τα αρχεία έχουν την ίδια πηγαία μορφή',
      impact: 'medium'
    });
  }

  // Validate individual options
  const optionsValidation = validateTransformationOptions(options);
  errors.push(...optionsValidation.errors);
  warnings.push(...optionsValidation.warnings);

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    compatibility: optionsValidation.compatibility
  };
}

/**
 * Estimates transformation complexity
 */
export function estimateTransformationComplexity(
  sourceFormat: SupportedFormat,
  targetFormat: SupportedFormat,
  options: TransformationOptions
): {
  complexity: 'low' | 'medium' | 'high';
  factors: string[];
  estimatedTime: number; // milliseconds per MB
} {
  const factors: string[] = [];
  let complexity: 'low' | 'medium' | 'high' = 'low';
  let timePerMB = 1000; // Base: 1 second per MB

  // Format complexity
  const sourceCategory = getFormatCategory(sourceFormat);
  const targetCategory = getFormatCategory(targetFormat);

  if (sourceCategory === 'cad' || targetCategory === 'cad') {
    complexity = 'high';
    timePerMB = 5000;
    factors.push('CAD format processing');
  } else if (sourceCategory !== targetCategory) {
    complexity = 'medium';
    timePerMB = 2000;
    factors.push('Cross-category transformation');
  }

  // Coordinate transformation
  if (options.sourceCRS && options.targetCRS && options.sourceCRS !== options.targetCRS) {
    if (complexity === 'low') complexity = 'medium';
    timePerMB *= 1.5;
    factors.push('Coordinate system transformation');
  }

  // Geometric transformations
  if (options.transformationParams) {
    if (complexity === 'low') complexity = 'medium';
    timePerMB *= 1.3;
    factors.push('Geometric transformations');
  }

  // Quality optimizations
  if (options.qualitySettings?.optimizeGeometry) {
    if (complexity === 'low') complexity = 'medium';
    timePerMB *= 1.4;
    factors.push('Geometry optimization');
  }

  if (options.qualitySettings?.simplificationTolerance !== undefined) {
    timePerMB *= 1.2;
    factors.push('Geometry simplification');
  }

  return {
    complexity,
    factors,
    estimatedTime: Math.round(timePerMB)
  };
}