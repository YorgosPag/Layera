import { useState, useCallback, useRef } from 'react';
import { toast } from '@layera/notifications';
import { useLayeraTranslation } from '@layera/i18n/hooks';
import {
  ImportedFile,
  FileValidationRule,
  FileProcessingOptions,
  FileImportProgress,
  FileImportError,
  SupportedFormat
} from '../types';
import { validateFile, extractFileMetadata, SUPPORTED_FILE_TYPES } from '../utils/fileValidation';

interface UseFileImportOptions {
  allowedFormats?: SupportedFormat[];
  maxFileSize?: number;
  maxFiles?: number;
  autoProcess?: boolean;
  showNotifications?: boolean;
  onProgress?: (progress: FileImportProgress) => void;
  onComplete?: (files: ImportedFile[]) => void;
  onError?: (error: FileImportError) => void;
}

interface UseFileImportReturn {
  // State
  files: ImportedFile[];
  isProcessing: boolean;
  progress: number;
  error: string | null;

  // Actions
  importFiles: (fileList: FileList | File[]) => Promise<ImportedFile[]>;
  importSingleFile: (file: File) => Promise<ImportedFile>;
  removeFile: (fileId: string) => void;
  clearFiles: () => void;
  retryFile: (fileId: string) => Promise<void>;

  // Validation
  validateFiles: (fileList: FileList | File[]) => Promise<boolean>;
  isFileSupported: (file: File) => boolean;
}

export function useFileImport(options: UseFileImportOptions = {}): UseFileImportReturn {
  const { t } = useLayeraTranslation();
  const [files, setFiles] = useState<ImportedFile[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const {
    allowedFormats,
    maxFileSize = 100 * 1024 * 1024, // 100MB default
    maxFiles = 10,
    autoProcess = true,
    showNotifications = true,
    onProgress,
    onComplete,
    onError
  } = options;

  // Create validation rules από options
  const validationRules: FileValidationRule = {
    maxSize: maxFileSize,
    allowedExtensions: allowedFormats || Object.keys(SUPPORTED_FILE_TYPES),
    allowedMimeTypes: allowedFormats
      ? allowedFormats.flatMap(format => SUPPORTED_FILE_TYPES[format]?.mimeTypes || [])
      : undefined
  };

  const generateFileId = useCallback((): string => {
    return `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  const updateFileStatus = useCallback((
    fileId: string,
    updates: Partial<ImportedFile>
  ) => {
    setFiles(prev => prev.map(f =>
      f.id === fileId ? { ...f, ...updates } : f
    ));
  }, []);

  const reportProgress = useCallback((fileId: string, progress: number, stage: string, message: string) => {
    const progressData: FileImportProgress = {
      fileId,
      stage: stage as FileImportProgress['stage'],
      progress,
      message
    };

    updateFileStatus(fileId, { progress });
    onProgress?.(progressData);
  }, [updateFileStatus, onProgress]);

  const processFile = useCallback(async (file: File): Promise<ImportedFile> => {
    const fileId = generateFileId();

    const importedFile: ImportedFile = {
      id: fileId,
      file,
      metadata: { name: file.name, size: file.size, type: file.type, lastModified: file.lastModified },
      status: 'pending',
      progress: 0
    };

    setFiles(prev => [...prev, importedFile]);

    try {
      // Step 1: Validation
      reportProgress(fileId, 10, 'validation', t('file.import.validating'));
      updateFileStatus(fileId, { status: 'processing' });

      const validationResult = await validateFile(file, validationRules);

      if (!validationResult.isValid) {
        const errorMessage = validationResult.errors.map(e => e.message).join(', ');
        throw new FileImportError(errorMessage, 'VALIDATION_FAILED', fileId);
      }

      // Show warnings αν υπάρχουν
      if (validationResult.warnings.length > 0 && showNotifications) {
        validationResult.warnings.forEach(warning => {
          toast.warning(warning.message, {
            duration: 4000,
            ...(warning.suggestion && {
              actions: [{ label: t('file.import.suggestion'), onClick: () => {} }]
            })
          });
        });
      }

      // Step 2: Metadata extraction
      reportProgress(fileId, 30, 'processing', t('file.import.extracting.metadata'));
      const metadata = await extractFileMetadata(file);

      // Step 3: File processing (read data)
      reportProgress(fileId, 60, 'processing', t('file.import.reading.file'));
      const processedData = await file.arrayBuffer();

      // Step 4: Preview generation (για images)
      let previewUrl: string | undefined;
      if (metadata.type.startsWith('image/')) {
        reportProgress(fileId, 80, 'preview', t('file.import.generating.preview'));
        previewUrl = URL.createObjectURL(file);
      }

      // Step 5: Complete
      reportProgress(fileId, 100, 'complete', t('file.import.completed'));

      const completedFile: ImportedFile = {
        ...importedFile,
        metadata,
        status: 'completed',
        progress: 100,
        processedData,
        previewUrl
      };

      updateFileStatus(fileId, completedFile);

      if (showNotifications) {
        toast.success(t('file.import.success', { filename: file.name }), {
          duration: 3000
        });
      }

      return completedFile;

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : t('file.import.unknown.error');

      updateFileStatus(fileId, {
        status: 'error',
        error: errorMessage
      });

      if (showNotifications) {
        toast.error(t('file.import.failed', {
          filename: file.name,
          error: errorMessage
        }), {
          duration: 5000,
          actions: [
            { label: t('file.import.retry'), onClick: () => retryFile(fileId) }
          ]
        });
      }

      const fileError = error instanceof FileImportError
        ? error
        : new FileImportError(errorMessage, 'PROCESSING_FAILED', fileId);

      onError?.(fileError);
      throw fileError;
    }
  }, [generateFileId, validationRules, reportProgress, updateFileStatus, showNotifications, onError, t]);

  const importFiles = useCallback(async (fileList: FileList | File[]): Promise<ImportedFile[]> => {
    const filesArray = Array.from(fileList);

    // Validate total file count
    if (files.length + filesArray.length > maxFiles) {
      const error = new FileImportError(
        t('file.import.too.many.files', { max: maxFiles }),
        'TOO_MANY_FILES'
      );

      if (showNotifications) {
        toast.error(error.message);
      }

      onError?.(error);
      throw error;
    }

    setIsProcessing(true);
    setError(null);
    abortControllerRef.current = new AbortController();

    const processedFiles: ImportedFile[] = [];

    try {
      for (let i = 0; i < filesArray.length; i++) {
        if (abortControllerRef.current?.signal.aborted) {
          break;
        }

        const file = filesArray[i];
        const overallProgress = ((i + 1) / filesArray.length) * 100;
        setProgress(overallProgress);

        try {
          const processedFile = await processFile(file);
          processedFiles.push(processedFile);
        } catch (error) {
          // Continue με άλλα files αν ένα fail
          console.warn(`Failed to process file ${file.name}:`, error);
        }
      }

      onComplete?.(processedFiles);
      return processedFiles;

    } finally {
      setIsProcessing(false);
      setProgress(0);
      abortControllerRef.current = null;
    }
  }, [files.length, maxFiles, processFile, onComplete, onError, showNotifications, t]);

  const importSingleFile = useCallback(async (file: File): Promise<ImportedFile> => {
    return processFile(file);
  }, [processFile]);

  const removeFile = useCallback((fileId: string) => {
    setFiles(prev => {
      const file = prev.find(f => f.id === fileId);
      if (file?.previewUrl) {
        URL.revokeObjectURL(file.previewUrl);
      }
      return prev.filter(f => f.id !== fileId);
    });
  }, []);

  const clearFiles = useCallback(() => {
    // Cleanup preview URLs
    files.forEach(file => {
      if (file.previewUrl) {
        URL.revokeObjectURL(file.previewUrl);
      }
    });

    setFiles([]);
    setError(null);
    setProgress(0);
  }, [files]);

  const retryFile = useCallback(async (fileId: string): Promise<void> => {
    const file = files.find(f => f.id === fileId);
    if (!file) return;

    // Remove old file και add new one
    removeFile(fileId);
    await processFile(file.file);
  }, [files, removeFile, processFile]);

  const validateFiles = useCallback(async (fileList: FileList | File[]): Promise<boolean> => {
    const filesArray = Array.from(fileList);

    for (const file of filesArray) {
      const result = await validateFile(file, validationRules);
      if (!result.isValid) {
        return false;
      }
    }

    return true;
  }, [validationRules]);

  const isFileSupported = useCallback((file: File): boolean => {
    const extension = file.name.split('.').pop()?.toLowerCase();
    return extension ? validationRules.allowedExtensions.includes(extension) : false;
  }, [validationRules.allowedExtensions]);

  return {
    // State
    files,
    isProcessing,
    progress,
    error,

    // Actions
    importFiles,
    importSingleFile,
    removeFile,
    clearFiles,
    retryFile,

    // Validation
    validateFiles,
    isFileSupported
  };
}