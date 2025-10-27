import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useLayeraTranslation } from '@layera/tolgee';
import { useNotifications } from '@layera/notifications';
import { ErrorBoundary } from '@layera/error-boundary';
import { Text as Typography } from '@layera/typography';
import { Button } from '@layera/buttons';
import { Box } from '@layera/layout';
import { UploadIcon, DeleteIcon } from '@layera/icons';
import { useTheme } from '@layera/theme-switcher';
import type { FileUploaderProps, FileUploadItem } from '../types';
import { DragDropZone } from './DragDropZone';
import { FileList } from './FileList';
import { FilePreview } from './FilePreview';
import { UploadEngine } from '../utils/uploadEngine';
import { validateFileList, validateFile } from '../utils/fileValidation';

/**
 * Main file uploader component με enterprise-grade functionality
 * Βασισμένο σε Google Drive, Dropbox, WeTransfer patterns
 */
export const FileUploader: React.FC<FileUploaderProps> = ({
  config,
  initialFiles = [],
  className = '',
  disabled = false,
  customDropZone: CustomDropZone,
  customFileList: CustomFileList,
  onUploadStart,
  onUploadProgress,
  onUploadComplete,
  onUploadError,
  onUploadCancel,
  onFileRemove,
  onAllUploadsComplete
}) => {
  const { t } = useLayeraTranslation();
  const { theme } = useTheme();
  const { addNotification } = useNotifications();
  const [files, setFiles] = useState<FileUploadItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const uploadEngineRef = useRef<UploadEngine | null>(null);

  // Initialize upload engine
  useEffect(() => {
    uploadEngineRef.current = new UploadEngine(config, {
      onUploadStart: (file) => {
        setFiles(prev => prev.map(f => f.id === file.id ? file : f));
        onUploadStart?.(file);
      },
      onUploadProgress: (file, progress) => {
        setFiles(prev => prev.map(f => f.id === file.id ? file : f));
        onUploadProgress?.(file, progress);
      },
      onUploadComplete: (file) => {
        setFiles(prev => prev.map(f => f.id === file.id ? file : f));
        onUploadComplete?.(file);
        addNotification({
          type: 'success',
          title: t('file-upload.notifications.upload-complete'),
          message: t('file-upload.notifications.file-uploaded', { name: file.file.name })
        });
      },
      onUploadError: (file, error) => {
        setFiles(prev => prev.map(f => f.id === file.id ? file : f));
        onUploadError?.(file, error);
        addNotification({
          type: 'error',
          title: t('file-upload.notifications.upload-error'),
          message: error
        });
      },
      onUploadCancel: (file) => {
        setFiles(prev => prev.map(f => f.id === file.id ? file : f));
        onUploadCancel?.(file);
        addNotification({
          type: 'info',
          title: t('file-upload.notifications.upload-cancelled'),
          message: t('file-upload.notifications.file-cancelled', { name: file.file.name })
        });
      },
      onAllUploadsComplete: (completedFiles) => {
        setIsUploading(false);
        onAllUploadsComplete?.(completedFiles);
        addNotification({
          type: 'success',
          title: t('file-upload.notifications.all-complete'),
          message: t('file-upload.notifications.all-files-uploaded', { count: completedFiles.length })
        });
      }
    });

    return () => {
      uploadEngineRef.current?.clearAll();
    };
  }, [config, onUploadStart, onUploadProgress, onUploadComplete, onUploadError, onUploadCancel, onAllUploadsComplete, t, addNotification]);

  // Initialize with initial files
  useEffect(() => {
    if (initialFiles.length > 0) {
      handleFilesAdded(initialFiles);
    }
  }, []);

  const generateFileId = (): string => {
    return `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };

  const createFileUploadItem = (file: File): FileUploadItem => {
    return {
      id: generateFileId(),
      file,
      status: 'idle' as const,
      progress: 0
    };
  };

  const handleFilesAdded = useCallback((newFiles: File[]) => {
    if (disabled) return;

    // Validate files
    const validation = validateFileList(newFiles, config);
    if (!validation.isValid) {
      validation.errors.forEach(error => {
        addNotification({
          type: 'error',
          title: t('file-upload.notifications.validation-error'),
          message: error
        });
      });
      return;
    }

    // Show warnings if any
    validation.warnings.forEach(warning => {
      addNotification({
        type: 'warning',
        title: t('file-upload.notifications.validation-warning'),
        message: warning
      });
    });

    // Convert to FileUploadItems
    const fileItems = newFiles.map(createFileUploadItem);

    // Add to state
    setFiles(prev => [...prev, ...fileItems]);

    // Add to upload engine
    fileItems.forEach(fileItem => {
      uploadEngineRef.current?.addFile(fileItem);
    });

    // Auto-start uploading if enabled
    if (config.autoUpload) {
      setIsUploading(true);
    }
  }, [config, disabled, t, addNotification]);

  const handleStartUpload = useCallback(() => {
    if (!uploadEngineRef.current || isUploading) return;

    const pendingFiles = files.filter(f => f.status === 'idle');
    if (pendingFiles.length === 0) return;

    setIsUploading(true);
    pendingFiles.forEach(file => {
      uploadEngineRef.current?.uploadFile(file);
    });
  }, [files, isUploading]);

  const handlePauseUpload = useCallback(() => {
    if (!uploadEngineRef.current) return;

    const uploadingFiles = files.filter(f => f.status === 'uploading');
    uploadingFiles.forEach(file => {
      uploadEngineRef.current?.pauseUpload(file.id);
    });
    setIsUploading(false);
  }, [files]);

  const handleCancelUpload = useCallback((fileId: string) => {
    uploadEngineRef.current?.cancelUpload(fileId);
  }, []);

  const handleRetryUpload = useCallback((fileId: string) => {
    const file = files.find(f => f.id === fileId);
    if (!file) return;

    // Reset file status
    const resetFile: FileUploadItem = { ...file, status: 'idle' as const, progress: 0, error: undefined };
    setFiles(prev => prev.map(f => f.id === fileId ? resetFile : f));

    // Add back to upload engine
    uploadEngineRef.current?.addFile(resetFile);

    if (config.autoUpload) {
      setIsUploading(true);
    }
  }, [files, config.autoUpload]);

  const handleRemoveFile = useCallback((fileId: string) => {
    const file = files.find(f => f.id === fileId);
    if (!file) return;

    // Cancel upload if in progress
    if (file.status === 'uploading') {
      uploadEngineRef.current?.cancelUpload(fileId);
    }

    // Remove from state
    setFiles(prev => prev.filter(f => f.id !== fileId));

    // Call callback
    onFileRemove?.(file);
  }, [files, onFileRemove]);

  const handleClearAll = useCallback(() => {
    uploadEngineRef.current?.clearAll();
    setFiles([]);
    setIsUploading(false);
  }, []);

  const getUploadSummary = () => {
    const total = files.length;
    const completed = files.filter(f => f.status === 'completed').length;
    const uploading = files.filter(f => f.status === 'uploading').length;
    const errors = files.filter(f => f.status === 'error').length;

    return { total, completed, uploading, errors };
  };

  const summary = getUploadSummary();
  const hasFiles = files.length > 0;
  const canStartUpload = !isUploading && files.some(f => f.status === 'idle');
  const DropZoneComponent = CustomDropZone || DragDropZone;
  const FileListComponent = CustomFileList || FileList;

  return (
    <ErrorBoundary>
      <Box className={`layera-file-uploader ${className}`}>
        {/* Upload Controls */}
        {hasFiles && (
          <Box className={`mb-6 p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
            <Box className="flex items-center justify-between mb-4">
              <Box>
                <Typography variant="h6" className="mb-1">
                  {t('file-upload.upload-summary')}
                </Typography>
                <Typography variant="caption" className="text-gray-500">
                  {t('file-upload.files-summary', {
                    total: summary.total,
                    completed: summary.completed,
                    uploading: summary.uploading,
                    errors: summary.errors
                  })}
                </Typography>
              </Box>

              <Box className="flex items-center space-x-2">
                {/* View Mode Toggle */}
                <Box className="flex items-center space-x-1 mr-4">
                  <Button
                    variant={viewMode === 'list' ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <UploadIcon className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'grid' ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <UploadIcon className="w-4 h-4" />
                  </Button>
                </Box>

                {/* Upload Controls */}
                {canStartUpload && (
                  <Button
                    variant="primary"
                    onClick={handleStartUpload}
                    disabled={disabled}
                  >
                    <UploadIcon className="w-4 h-4 mr-2" />
                    {t('file-upload.start-upload')}
                  </Button>
                )}

                {isUploading && (
                  <Button
                    variant="outline"
                    onClick={handlePauseUpload}
                    disabled={disabled}
                  >
                    <UploadIcon className="w-4 h-4 mr-2" />
                    {t('file-upload.pause-upload')}
                  </Button>
                )}

                <Button
                  variant="outline"
                  onClick={handleClearAll}
                  disabled={disabled || isUploading}
                >
                  <DeleteIcon className="w-4 h-4 mr-2" />
                  {t('file-upload.clear-all')}
                </Button>
              </Box>
            </Box>

            {/* Overall Progress */}
            {isUploading && summary.total > 0 && (
              <Box className="w-full bg-gray-200 rounded-full h-2">
                <Box
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  width={`${(summary.completed / summary.total) * 100}%`}
                />
              </Box>
            )}
          </Box>
        )}

        {/* Drop Zone */}
        <Box className="mb-6">
          <DropZoneComponent
            enabled={!disabled && config.enableDragDrop}
            acceptedTypes={config.acceptedTypes}
            maxFiles={config.maxConcurrent}
            onFilesDrop={handleFilesAdded}
            multiple={true}
          />
        </Box>

        {/* File Display */}
        {hasFiles && (
          <Box className="mb-6">
            {viewMode === 'list' ? (
              <FileListComponent
                files={files}
                showProgress={true}
                showActions={true}
                onRemove={handleRemoveFile}
                onCancel={handleCancelUpload}
                onRetry={handleRetryUpload}
              />
            ) : (
              <Box className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {files.map(file => (
                  <FilePreview
                    key={file.id}
                    file={file}
                    showPreview={true}
                    onRemove={handleRemoveFile}
                  />
                ))}
              </Box>
            )}
          </Box>
        )}
      </Box>
    </ErrorBoundary>
  );
};