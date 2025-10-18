import { useState, useCallback, useRef, useEffect } from 'react';
import { toast } from '@layera/notifications';
import { useLayeraTranslation } from '@layera/i18n/hooks';
import {
  CompressionOptions,
  CompressionResult,
  CompressionProgress,
  CompressionError,
  BatchCompressionOptions,
  BatchCompressionResult,
  CompressionValidationResult
} from '../types';
import { CompressionEngine } from '../utils/compressionEngine';
import { validateCompressionOptions, recommendOptimizations } from '../utils/compressionValidator';

interface UseFileCompressionOptions {
  defaultOptions?: CompressionOptions;
  maxConcurrentFiles?: number;
  showNotifications?: boolean;
  onProgress?: (progress: CompressionProgress) => void;
  onComplete?: (results: CompressionResult[]) => void;
  onError?: (error: CompressionError) => void;
}

interface UseFileCompressionReturn {
  // State
  isCompressing: boolean;
  progress: number;
  results: CompressionResult[];
  errors: CompressionError[];

  // Actions
  compressFile: (file: File, options?: CompressionOptions) => Promise<CompressionResult>;
  compressFiles: (files: File[], options?: BatchCompressionOptions) => Promise<BatchCompressionResult>;
  cancelCompression: () => void;
  clearResults: () => void;

  // Validation & optimization
  validateOptions: (options: CompressionOptions) => CompressionValidationResult;
  getRecommendations: (file: File) => Promise<CompressionOptions>;
  estimateCompression: (file: File, options: CompressionOptions) => Promise<{
    estimatedSize: number;
    estimatedRatio: number;
  }>;
}

export function useFileCompression(
  options: UseFileCompressionOptions = {}
): UseFileCompressionReturn {
  const { t } = useLayeraTranslation();
  const [isCompressing, setIsCompressing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<CompressionResult[]>([]);
  const [errors, setErrors] = useState<CompressionError[]>([]);

  const engineRef = useRef<CompressionEngine | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const {
    defaultOptions = {},
    maxConcurrentFiles = 3,
    showNotifications = true,
    onProgress,
    onComplete,
    onError
  } = options;

  // Initialize compression engine
  useEffect(() => {
    try {
      engineRef.current = new CompressionEngine();
    } catch (error) {
      console.error('Failed to initialize compression engine:', error);
      if (showNotifications) {
        toast.error(t('compression.engine.init.error'));
      }
    }

    return () => {
      if (engineRef.current) {
        engineRef.current.destroy();
      }
    };
  }, [showNotifications, t]);

  const reportProgress = useCallback((
    fileId: string,
    stage: CompressionProgress['stage'],
    progress: number,
    message: string
  ) => {
    const progressData: CompressionProgress = {
      fileId,
      stage,
      progress,
      message
    };

    setProgress(progress);
    onProgress?.(progressData);

    if (showNotifications && stage === 'complete') {
      toast.success(t('compression.file.success', { progress: Math.round(progress) }), {
        duration: 3000
      });
    }
  }, [onProgress, showNotifications, t]);

  const handleError = useCallback((error: CompressionError) => {
    setErrors(prev => [...prev, error]);
    onError?.(error);

    if (showNotifications) {
      toast.error(t('compression.file.error', {
        error: error.message
      }), {
        duration: 5000
      });
    }
  }, [onError, showNotifications, t]);

  const compressFile = useCallback(async (
    file: File,
    compressionOptions?: CompressionOptions
  ): Promise<CompressionResult> => {
    if (!engineRef.current) {
      throw new CompressionError(
        'Compression engine not initialized',
        'ENGINE_NOT_INITIALIZED'
      );
    }

    const fileId = `compress-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const finalOptions = { ...defaultOptions, ...compressionOptions };

    try {
      setIsCompressing(true);
      reportProgress(fileId, 'analyzing', 10, t('compression.analyzing.file'));

      // Validate options
      const validation = validateCompressionOptions(finalOptions);
      if (!validation.isValid) {
        throw new CompressionError(
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
              actions: [{ label: t('compression.suggestion'), onClick: () => {} }]
            })
          });
        });
      }

      reportProgress(fileId, 'compressing', 50, t('compression.compressing.file'));

      // Perform compression
      const result = await engineRef.current.compressFile(file, finalOptions);

      reportProgress(fileId, 'complete', 100, t('compression.completed'));

      setResults(prev => [...prev, result]);
      return result;

    } catch (error) {
      const compressionError = error instanceof CompressionError
        ? error
        : new CompressionError(
            error instanceof Error ? error.message : 'Unknown compression error',
            'COMPRESSION_FAILED',
            fileId
          );

      handleError(compressionError);
      throw compressionError;

    } finally {
      setIsCompressing(false);
      setProgress(0);
    }
  }, [defaultOptions, reportProgress, handleError, showNotifications, t]);

  const compressFiles = useCallback(async (
    files: File[],
    batchOptions?: BatchCompressionOptions
  ): Promise<BatchCompressionResult> => {
    if (!engineRef.current) {
      throw new CompressionError(
        'Compression engine not initialized',
        'ENGINE_NOT_INITIALIZED'
      );
    }

    const startTime = performance.now();
    const batchResults: CompressionResult[] = [];
    const batchErrors: CompressionError[] = [];

    const {
      maxConcurrentFiles: batchMaxConcurrent = maxConcurrentFiles,
      stopOnError = false,
      onFileComplete,
      onFileError,
      ...compressionOptions
    } = batchOptions || {};

    try {
      setIsCompressing(true);
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
            const result = await compressFile(file, compressionOptions);
            batchResults.push(result);
            onFileComplete?.(result);
            return result;
          } catch (error) {
            const compressionError = error instanceof CompressionError ? error :
              new CompressionError(
                error instanceof Error ? error.message : 'Unknown error',
                'FILE_COMPRESSION_FAILED'
              );

            batchErrors.push(compressionError);
            onFileError?.(compressionError);

            if (stopOnError) {
              throw compressionError;
            }
            return null;
          }
        });

        await Promise.all(chunkPromises);
      }

      const processingTime = performance.now() - startTime;
      const totalOriginalSize = batchResults.reduce((sum, r) => sum + r.originalSize, 0);
      const totalCompressedSize = batchResults.reduce((sum, r) => sum + r.compressedSize, 0);

      const batchResult: BatchCompressionResult = {
        results: batchResults,
        errors: batchErrors,
        totalOriginalSize,
        totalCompressedSize,
        overallCompressionRatio: totalOriginalSize > 0
          ? Math.round(((totalOriginalSize - totalCompressedSize) / totalOriginalSize) * 100 * 100) / 100
          : 0,
        processingTime
      };

      onComplete?.(batchResults);

      if (showNotifications) {
        toast.success(t('compression.batch.complete', {
          successful: batchResults.length,
          total: files.length,
          savings: batchResult.overallCompressionRatio
        }), {
          duration: 5000
        });
      }

      return batchResult;

    } finally {
      setIsCompressing(false);
      setProgress(0);
      abortControllerRef.current = null;
    }
  }, [compressFile, maxConcurrentFiles, onComplete, showNotifications, t]);

  const cancelCompression = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsCompressing(false);
      setProgress(0);

      if (showNotifications) {
        toast.info(t('compression.cancelled'));
      }
    }
  }, [showNotifications, t]);

  const clearResults = useCallback(() => {
    setResults([]);
    setErrors([]);
    setProgress(0);
  }, []);

  const validateOptions = useCallback((options: CompressionOptions): CompressionValidationResult => {
    return validateCompressionOptions(options);
  }, []);

  const getRecommendations = useCallback(async (file: File): Promise<CompressionOptions> => {
    return recommendOptimizations(file);
  }, []);

  const estimateCompression = useCallback(async (
    file: File,
    options: CompressionOptions
  ): Promise<{ estimatedSize: number; estimatedRatio: number }> => {
    // Simple estimation βασισμένο σε file type και quality
    const baseRatio = options.quality ? (100 - options.quality) / 100 : 0.3;
    const formatMultiplier = options.format === 'webp' ? 0.8 :
                           options.format === 'avif' ? 0.7 : 1.0;

    const estimatedRatio = baseRatio * formatMultiplier;
    const estimatedSize = Math.round(file.size * (1 - estimatedRatio));

    return {
      estimatedSize,
      estimatedRatio: Math.round(estimatedRatio * 100 * 100) / 100
    };
  }, []);

  return {
    // State
    isCompressing,
    progress,
    results,
    errors,

    // Actions
    compressFile,
    compressFiles,
    cancelCompression,
    clearResults,

    // Validation & optimization
    validateOptions,
    getRecommendations,
    estimateCompression
  };
}