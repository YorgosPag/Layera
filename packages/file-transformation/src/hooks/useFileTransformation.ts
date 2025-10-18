import { useState, useCallback, useRef, useEffect } from 'react';
import { toast } from '@layera/notifications';
import { useLayeraTranslation } from '@layera/i18n/hooks';
import {
  TransformationOptions,
  TransformationResult,
  TransformationProgress,
  TransformationError,
  BatchTransformationOptions,
  BatchTransformationResult,
  TransformationValidationResult,
  SupportedFormat
} from '../types';
import { LayeraVectorTransformer } from '../transformers/vectorTransformer';
import { validateTransformationOptions, getFormatCompatibility } from '../utils/transformationValidator';

interface UseFileTransformationOptions {
  defaultOptions?: Partial<TransformationOptions>;
  maxConcurrentFiles?: number;
  showNotifications?: boolean;
  onProgress?: (progress: TransformationProgress) => void;
  onComplete?: (results: TransformationResult[]) => void;
  onError?: (error: TransformationError) => void;
}

interface UseFileTransformationReturn {
  // State
  isTransforming: boolean;
  progress: number;
  results: TransformationResult[];
  errors: TransformationError[];

  // Actions
  transformFile: (file: File, options: TransformationOptions) => Promise<TransformationResult>;
  transformFiles: (files: File[], options: BatchTransformationOptions) => Promise<BatchTransformationResult>;
  cancelTransformation: () => void;
  clearResults: () => void;

  // Validation & utilities
  validateOptions: (options: TransformationOptions) => TransformationValidationResult;
  getCompatibility: (sourceFormat: SupportedFormat, targetFormat: SupportedFormat) => Promise<{
    compatible: boolean;
    dataLossRisk: 'none' | 'low' | 'medium' | 'high';
    limitations: string[];
  }>;
  detectFileFormat: (file: File) => Promise<{
    detectedFormat: SupportedFormat | 'unknown';
    confidence: number;
  }>;
  estimateTransformation: (file: File, options: TransformationOptions) => Promise<{
    estimatedSize: number;
    estimatedTime: number;
    warnings: string[];
  }>;
}

export function useFileTransformation(
  options: UseFileTransformationOptions = {}
): UseFileTransformationReturn {
  const { t } = useLayeraTranslation();
  const [isTransforming, setIsTransforming] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<TransformationResult[]>([]);
  const [errors, setErrors] = useState<TransformationError[]>([]);

  const vectorTransformerRef = useRef<LayeraVectorTransformer | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const {
    defaultOptions = {},
    maxConcurrentFiles = 3,
    showNotifications = true,
    onProgress,
    onComplete,
    onError
  } = options;

  // Initialize transformers
  useEffect(() => {
    try {
      vectorTransformerRef.current = new LayeraVectorTransformer();
    } catch (error) {
      console.error('Failed to initialize transformation engines:', error);
      if (showNotifications) {
        toast.error(t('transformation.engine.init.error'));
      }
    }

    return () => {
      if (vectorTransformerRef.current) {
        vectorTransformerRef.current.destroy();
      }
    };
  }, [showNotifications, t]);

  const reportProgress = useCallback((
    fileId: string,
    stage: TransformationProgress['stage'],
    progress: number,
    message: string,
    currentOperation?: string
  ) => {
    const progressData: TransformationProgress = {
      fileId,
      stage,
      progress,
      message,
      currentOperation
    };

    setProgress(progress);
    onProgress?.(progressData);

    if (showNotifications && stage === 'complete') {
      toast.success(t('transformation.file.success', { progress: Math.round(progress) }), {
        duration: 3000
      });
    }
  }, [onProgress, showNotifications, t]);

  const handleError = useCallback((error: TransformationError) => {
    setErrors(prev => [...prev, error]);
    onError?.(error);

    if (showNotifications) {
      toast.error(t('transformation.file.error', {
        error: error.message
      }), {
        duration: 5000,
        actions: [
          { label: t('transformation.retry'), onClick: () => {} }
        ]
      });
    }
  }, [onError, showNotifications, t]);

  const transformFile = useCallback(async (
    file: File,
    transformationOptions: TransformationOptions
  ): Promise<TransformationResult> {
    if (!vectorTransformerRef.current) {
      throw new TransformationError(
        'Transformation engine not initialized',
        'ENGINE_NOT_INITIALIZED'
      );
    }

    const fileId = `transform-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const finalOptions = { ...defaultOptions, ...transformationOptions };
    const startTime = performance.now();

    try {
      setIsTransforming(true);
      reportProgress(fileId, 'parsing', 10, t('transformation.parsing.file'));

      // Validate options
      const validation = validateTransformationOptions(finalOptions);
      if (!validation.isValid) {
        throw new TransformationError(
          validation.errors.map(e => e.message).join(', '),
          'VALIDATION_FAILED'
        );
      }

      // Show warnings
      if (validation.warnings.length > 0 && showNotifications) {
        validation.warnings.forEach(warning => {
          toast.warning(warning.message, {
            duration: 4000,
            ...(warning.suggestion && {
              actions: [{ label: t('transformation.suggestion'), onClick: () => {} }]
            })
          });
        });
      }

      // Read file content
      reportProgress(fileId, 'parsing', 25, t('transformation.reading.file'));
      const fileContent = await readFileContent(file, finalOptions.sourceFormat);

      // Transform data
      reportProgress(fileId, 'transforming', 50, t('transformation.transforming.data'));
      const transformedData = await vectorTransformerRef.current.transform(fileContent, finalOptions);

      // Generate output
      reportProgress(fileId, 'converting', 75, t('transformation.generating.output'));
      const transformedBlob = await generateOutputBlob(transformedData, finalOptions.targetFormat);

      reportProgress(fileId, 'complete', 100, t('transformation.completed'));

      // Calculate statistics (simplified)
      const statistics = vectorTransformerRef.current.calculateStatistics(
        transformedData as Parameters<typeof vectorTransformerRef.current.calculateStatistics>[0]
      );

      const result: TransformationResult = {
        originalFile: file,
        transformedBlob,
        originalFormat: finalOptions.sourceFormat,
        targetFormat: finalOptions.targetFormat,
        originalSize: file.size,
        transformedSize: transformedBlob.size,
        metadata: {
          processingTime: performance.now() - startTime,
          transformationsApplied: [
            finalOptions.sourceCRS && finalOptions.targetCRS ? 'coordinate-transform' : '',
            finalOptions.transformationParams ? 'geometric-transform' : '',
            finalOptions.qualitySettings?.optimizeGeometry ? 'geometry-optimization' : ''
          ].filter(Boolean),
          qualitySettings: finalOptions.qualitySettings || {},
          coordinateSystemInfo: finalOptions.sourceCRS && finalOptions.targetCRS ? {
            source: finalOptions.sourceCRS,
            target: finalOptions.targetCRS,
            accuracy: 0.5 // Simplified accuracy
          } : undefined,
          geometryStatistics: statistics
        },
        coordinateInfo: finalOptions.sourceCRS && finalOptions.targetCRS ? {
          sourceCRS: finalOptions.sourceCRS,
          targetCRS: finalOptions.targetCRS,
          transformationAccuracy: 0.5,
          transformedPoints: statistics.vertexCount
        } : undefined
      };

      setResults(prev => [...prev, result]);
      return result;

    } catch (error) {
      const transformationError = error instanceof TransformationError
        ? error
        : new TransformationError(
            error instanceof Error ? error.message : 'Unknown transformation error',
            'TRANSFORMATION_FAILED',
            fileId
          );

      handleError(transformationError);
      throw transformationError;

    } finally {
      setIsTransforming(false);
      setProgress(0);
    }
  }, [defaultOptions, reportProgress, handleError, showNotifications, t]);

  const transformFiles = useCallback(async (
    files: File[],
    batchOptions: BatchTransformationOptions
  ): Promise<BatchTransformationResult> {
    const startTime = performance.now();
    const batchResults: TransformationResult[] = [];
    const batchErrors: TransformationError[] = [];

    const {
      maxConcurrentFiles: batchMaxConcurrent = maxConcurrentFiles,
      stopOnError = false,
      onFileComplete,
      onFileError,
      ...transformationOptions
    } = batchOptions;

    try {
      setIsTransforming(true);
      abortControllerRef.current = new AbortController();

      // Process files in chunks
      for (let i = 0; i < files.length; i += batchMaxConcurrent) {
        if (abortControllerRef.current.signal.aborted) {
          break;
        }

        const chunk = files.slice(i, i + batchMaxConcurrent);
        const overallProgress = ((i + chunk.length) / files.length) * 100;
        setProgress(overallProgress);

        const chunkPromises = chunk.map(async (file) => {
          try {
            const result = await transformFile(file, transformationOptions);
            batchResults.push(result);
            onFileComplete?.(result);
            return result;
          } catch (error) {
            const transformationError = error instanceof TransformationError ? error :
              new TransformationError(
                error instanceof Error ? error.message : 'Unknown error',
                'FILE_TRANSFORMATION_FAILED'
              );

            batchErrors.push(transformationError);
            onFileError?.(transformationError);

            if (stopOnError) {
              throw transformationError;
            }
            return null;
          }
        });

        await Promise.all(chunkPromises);
      }

      const batchResult: BatchTransformationResult = {
        results: batchResults,
        errors: batchErrors,
        totalProcessingTime: performance.now() - startTime,
        successCount: batchResults.length,
        errorCount: batchErrors.length
      };

      onComplete?.(batchResults);

      if (showNotifications) {
        toast.success(t('transformation.batch.complete', {
          successful: batchResults.length,
          total: files.length
        }), {
          duration: 5000
        });
      }

      return batchResult;

    } finally {
      setIsTransforming(false);
      setProgress(0);
      abortControllerRef.current = null;
    }
  }, [transformFile, maxConcurrentFiles, onComplete, showNotifications, t]);

  const cancelTransformation = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsTransforming(false);
      setProgress(0);

      if (showNotifications) {
        toast.info(t('transformation.cancelled'));
      }
    }
  }, [showNotifications, t]);

  const clearResults = useCallback(() => {
    setResults([]);
    setErrors([]);
    setProgress(0);
  }, []);

  const validateOptions = useCallback((options: TransformationOptions): TransformationValidationResult => {
    return validateTransformationOptions(options);
  }, []);

  const getCompatibility = useCallback(async (
    sourceFormat: SupportedFormat,
    targetFormat: SupportedFormat
  ) => {
    return getFormatCompatibility(sourceFormat, targetFormat);
  }, []);

  const detectFileFormat = useCallback(async (file: File): Promise<{
    detectedFormat: SupportedFormat | 'unknown';
    confidence: number;
  }> => {
    const extension = file.name.split('.').pop()?.toLowerCase();
    const mimeType = file.type;

    // Simple format detection βασισμένο σε extension και MIME type
    const formatMap: Record<string, SupportedFormat> = {
      'json': 'geojson',
      'geojson': 'geojson',
      'kml': 'kml',
      'gpx': 'gpx',
      'svg': 'svg',
      'dxf': 'dxf',
      'dwg': 'dwg',
      'tiff': 'tiff',
      'tif': 'tiff',
      'png': 'png',
      'jpg': 'jpeg',
      'jpeg': 'jpeg',
      'webp': 'webp',
      'pdf': 'pdf'
    };

    const detectedFormat = extension ? formatMap[extension] : undefined;

    if (detectedFormat) {
      return {
        detectedFormat,
        confidence: mimeType.includes(extension || '') ? 0.9 : 0.7
      };
    }

    return {
      detectedFormat: 'unknown',
      confidence: 0
    };
  }, []);

  const estimateTransformation = useCallback(async (
    file: File,
    options: TransformationOptions
  ): Promise<{
    estimatedSize: number;
    estimatedTime: number;
    warnings: string[];
  }> => {
    const warnings: string[] = [];

    // Simple estimation logic
    let sizeMultiplier = 1.0;
    let timePerMB = 2000; // 2 seconds per MB base time

    // Format-specific adjustments
    if (options.sourceFormat === 'dxf' && options.targetFormat === 'geojson') {
      sizeMultiplier = 0.8; // GeoJSON usually smaller than DXF
      timePerMB = 3000; // DXF parsing is slower
    } else if (options.sourceFormat === 'svg' && options.targetFormat === 'geojson') {
      sizeMultiplier = 1.2; // GeoJSON might be larger
      timePerMB = 1500; // SVG parsing is faster
    }

    // Coordinate transformation adds time
    if (options.sourceCRS && options.targetCRS) {
      timePerMB *= 1.5;
      warnings.push(t('transformation.warning.coordinate.transform.time'));
    }

    // Quality optimization adds time but reduces size
    if (options.qualitySettings?.optimizeGeometry) {
      timePerMB *= 1.3;
      sizeMultiplier *= 0.9;
      warnings.push(t('transformation.warning.optimization.time'));
    }

    const fileSizeMB = file.size / (1024 * 1024);
    const estimatedSize = Math.round(file.size * sizeMultiplier);
    const estimatedTime = Math.round(fileSizeMB * timePerMB);

    return {
      estimatedSize,
      estimatedTime,
      warnings
    };
  }, [t]);

  return {
    // State
    isTransforming,
    progress,
    results,
    errors,

    // Actions
    transformFile,
    transformFiles,
    cancelTransformation,
    clearResults,

    // Validation & utilities
    validateOptions,
    getCompatibility,
    detectFileFormat,
    estimateTransformation
  };
}

// Helper functions
async function readFileContent(file: File, format: SupportedFormat): Promise<unknown> {
  if (format === 'geojson' || format === 'kml' || format === 'gpx' || format === 'svg') {
    return file.text();
  } else {
    return file.arrayBuffer();
  }
}

async function generateOutputBlob(data: unknown, format: SupportedFormat): Promise<Blob> {
  if (typeof data === 'string') {
    return new Blob([data], { type: getFormatMimeType(format) });
  } else if (data instanceof ArrayBuffer) {
    return new Blob([data], { type: getFormatMimeType(format) });
  } else {
    const jsonString = JSON.stringify(data, null, 2);
    return new Blob([jsonString], { type: getFormatMimeType(format) });
  }
}

function getFormatMimeType(format: SupportedFormat): string {
  const mimeTypes: Record<SupportedFormat, string> = {
    'geojson': 'application/geo+json',
    'kml': 'application/vnd.google-earth.kml+xml',
    'gpx': 'application/gpx+xml',
    'svg': 'image/svg+xml',
    'dxf': 'application/dxf',
    'dwg': 'application/dwg',
    'shapefile': 'application/x-shapefile',
    'tiff': 'image/tiff',
    'geotiff': 'image/tiff',
    'png': 'image/png',
    'jpeg': 'image/jpeg',
    'webp': 'image/webp',
    'pdf': 'application/pdf',
    'autocad': 'application/dwg',
    'microstation': 'application/dgn'
  };

  return mimeTypes[format] || 'application/octet-stream';
}