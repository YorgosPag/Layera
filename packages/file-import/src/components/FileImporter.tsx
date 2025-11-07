import React, { useState, useCallback } from 'react';
import { BaseCard } from '@layera/cards';
import { Button } from '@layera/buttons';
import { LoadingSpinner } from '@layera/loading';
import { useLayeraTranslation } from '@layera/tolgee';
import { ErrorBoundary } from '@layera/error-boundary';
import { Heading, Text } from '@layera/typography';
import { Box } from '@layera/layout';
import { SPACING_SCALE, BORDER_RADIUS_SCALE } from '@layera/constants';

// Enterprise-safe wrapper functions για React 19 compatibility
interface SafeErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const SafeErrorBoundary: React.FC<SafeErrorBoundaryProps> = ({ children, fallback }) => {
  return React.createElement(ErrorBoundary, { fallback }, children);
};

interface SafeLoadingSpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const SafeLoadingSpinner: React.FC<SafeLoadingSpinnerProps> = (props) => {
  return React.createElement(LoadingSpinner, props);
};
import {
  ImportedFile,
  SupportedFormat,
  FileImportProgress
} from '../types';
import { useFileImport } from '../hooks/useFileImport';
import { DragDropZone, FileList, FilePreview } from '@layera/file-upload';

export interface FileImporterProps {
  // Core functionality
  onFileImported: (files: ImportedFile[]) => void;
  acceptedFormats: SupportedFormat[];

  // Customization
  maxFileSize?: number;
  maxFiles?: number;
  allowMultiple?: boolean;
  showPreview?: boolean;
  showProgress?: boolean;

  // UI customization
  compact?: boolean;
  disabled?: boolean;
  title?: string;
  description?: string;

  // Callbacks
  onProgress?: (progress: FileImportProgress) => void;
  onError?: (error: Error) => void;
}

export const FileImporter: React.FC<FileImporterProps> = ({
  onFileImported,
  acceptedFormats,
  maxFileSize = 100 * 1024 * 1024, // 100MB
  maxFiles = 10,
  allowMultiple = true,
  showPreview = true,
  showProgress = true,
  compact = false,
  disabled = false,
  title,
  description,
  onProgress,
  onError
}) => {
  const { t } = useLayeraTranslation();
  const [selectedFile, setSelectedFile] = useState<ImportedFile | null>(null);

  const {
    files,
    isProcessing,
    progress,
    error,
    importFiles,
    removeFile,
    clearFiles,
    retryFile
  } = useFileImport({
    allowedFormats: acceptedFormats,
    maxFileSize,
    maxFiles,
    showNotifications: true,
    ...(onProgress && { onProgress }),
    onComplete: onFileImported,
    ...(onError && { onError })
  });

  const handleFilesDrop = useCallback(async (droppedFiles: FileList | File[]) => {
    if (disabled) return;

    try {
      await importFiles(droppedFiles);
    } catch (error) {
      console.error('File import failed:', error);
    }
  }, [disabled, importFiles]);

  const handleFileInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      handleFilesDrop(files);
    }
    // Reset input
    event.target.value = '';
  }, [handleFilesDrop]);

  const handleFileSelect = useCallback((file: ImportedFile) => {
    setSelectedFile(file);
  }, []);

  const handleFileRemove = useCallback((fileId: string) => {
    removeFile(fileId);
    if (selectedFile?.id === fileId) {
      setSelectedFile(null);
    }
  }, [removeFile, selectedFile]);

  const formatFileTypes = useCallback(() => {
    return acceptedFormats.map(format => `.${format}`).join(', ');
  }, [acceptedFormats]);

  const formatMaxSize = useCallback(() => {
    const mb = maxFileSize / (1024 * 1024);
    return mb >= 1 ? `${Math.round(mb)}MB` : `${Math.round(maxFileSize / 1024)}KB`;
  }, [maxFileSize]);

  if (compact) {
    return (
      <SafeErrorBoundary fallback={<Box>{t('file.import.error.boundary')}</Box>}>
        <Box className="file-importer-compact">
          <DragDropZone
            onFilesDrop={handleFilesDrop}
            acceptedFormats={acceptedFormats}
            disabled={disabled || isProcessing}
            compact={true}
          >
            <input
              type="file"
              multiple={allowMultiple}
              accept={formatFileTypes()}
              onChange={handleFileInputChange}
              disabled={disabled || isProcessing}
              display="var(--la-display-none, none)"
              id="file-input-compact"
            />
            <label htmlFor="file-input-compact">
              <Button
                variant="primary"
                disabled={disabled || isProcessing}
                cursor={disabled || isProcessing ? 'var(--la-cursor-not-allowed, not-allowed)' : 'var(--la-cursor-pointer, pointer)'}
              >
                {isProcessing ? (
                  <>
                    <SafeLoadingSpinner size="sm" />
                    {t('file.import.processing')}
                  </>
                ) : (
                  t('file.import.select.files')
                )}
              </Button>
            </label>

            {showProgress && isProcessing && (
              <Box marginTop={`${SPACING_SCALE.SM}px`} fontSize="var(--la-font-size-xs)" color="var(--la-text-secondary)">
                {t('file.import.progress')}: {Math.round(progress)}%
              </Box>
            )}
          </DragDropZone>
        </Box>
      </SafeErrorBoundary>
    );
  }

  return (
    <SafeErrorBoundary fallback={<Box>{t('file.import.error.boundary')}</Box>}>
      <BaseCard className="file-importer">
        <Box padding={`${SPACING_SCALE.MD}px`} borderBottom="1px solid var(--la-border-default)">
          <Heading as="h3">
            {title || t('file.import.title')}
          </Heading>
          <Text size="sm" color="secondary">
            {description || t('file.import.description', {
              formats: formatFileTypes(),
              maxSize: formatMaxSize(),
              maxFiles
            })}
          </Text>
        </Box>

        <Box padding={`${SPACING_SCALE.MD}px`}>
          {/* Drop zone */}
          <DragDropZone
            onFilesDrop={handleFilesDrop}
            acceptedFormats={acceptedFormats}
            disabled={disabled || isProcessing}
            maxFiles={maxFiles}
            showHelper={files.length === 0}
          >
            <input
              type="file"
              multiple={allowMultiple}
              accept={formatFileTypes()}
              onChange={handleFileInputChange}
              disabled={disabled || isProcessing}
              display="var(--la-display-none, none)"
              id="file-input"
            />
            <label htmlFor="file-input">
              <Button
                variant="primary"
                size="lg"
                disabled={disabled || isProcessing}
                cursor={disabled || isProcessing ? 'var(--la-cursor-not-allowed, not-allowed)' : 'var(--la-cursor-pointer, pointer)'}
              >
                {isProcessing ? (
                  <>
                    <SafeLoadingSpinner size="sm" />
                    {t('file.import.processing')}
                  </>
                ) : (
                  t('file.import.select.files')
                )}
              </Button>
            </label>
          </DragDropZone>

          {/* Progress display */}
          {showProgress && isProcessing && (
            <Box marginTop="var(--la-space-4)" padding="var(--la-space-sm-plus-xs)" backgroundColor="var(--la-bg-secondary)" borderRadius="var(--la-radius-xs)"> {/* 🎯 SST: MD spacing, SM+XS padding, XS radius */}
              <Box fontSize="var(--la-font-size-sm)" marginBottom="var(--la-space-xs-minus-4)"> {/* 🎯 SST: XS-4 spacing */}
                {t('file.import.progress')}: {Math.round(progress)}%
              </Box>
              <Box width="100%" height="var(--la-spacing-xs)" backgroundColor="var(--la-bg-tertiary)" borderRadius={`${BORDER_RADIUS_SCALE.XXS}px`}>
                <Box
                  width={`${progress}%`}
                  height="var(--la-height-full, 100%)"
                  backgroundColor="var(--la-color-primary)"
                  borderRadius={`${BORDER_RADIUS_SCALE.XXS}px`}
                  transition="var(--la-transition-width, width 0.3s ease)"
                />
              </Box>
            </Box>
          )}

          {/* Error display */}
          {error && (
            <Box marginTop={`${SPACING_SCALE.MD}px`}>
              <Text color="danger">{error}</Text>
            </Box>
          )}

          {/* File list */}
          {files.length > 0 && (
            <Box marginTop={`${SPACING_SCALE.MD}px`}>
              <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="var(--la-space-1)"> {/* 🎯 SST: XS spacing */}
                <Text size="base" weight="medium">
                  {t('file.import.files.selected', { count: files.length })}
                </Text>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={clearFiles}
                  disabled={isProcessing}
                >
                  {t('file.import.clear.all')}
                </Button>
              </Box>

              <FileList
                files={files}
                onFileSelect={handleFileSelect}
                onFileRemove={handleFileRemove}
                onFileRetry={retryFile}
                {...(selectedFile?.id && { selectedFileId: selectedFile.id })}
                disabled={isProcessing}
              />
            </Box>
          )}

          {/* File preview */}
          {showPreview && selectedFile && (
            <Box marginTop={`${SPACING_SCALE.MD}px`}>
              <FilePreview
                file={selectedFile}
                onClose={() => setSelectedFile(null)}
              />
            </Box>
          )}
        </Box>
      </BaseCard>
    </SafeErrorBoundary>
  );
};