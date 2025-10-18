import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader } from '@layera/cards';
import { Button, IconButton } from '@layera/buttons';
import { ProgressBar, LoadingSpinner } from '@layera/loading';
import { toast } from '@layera/notifications';
import { useLayeraTranslation } from '@layera/i18n/hooks';
import { ErrorBoundary } from '@layera/error-boundary';
import { Heading, Text } from '@layera/typography';
import {
  ImportedFile,
  SupportedFormat,
  FileImportProgress
} from '../types';
import { useFileImport } from '../hooks/useFileImport';
import { DragDropZone } from './DragDropZone';
import { FileList } from './FileList';
import { FilePreview } from './FilePreview';

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
    retryFile,
    isFileSupported
  } = useFileImport({
    allowedFormats: acceptedFormats,
    maxFileSize,
    maxFiles,
    showNotifications: true,
    onProgress,
    onComplete: onFileImported,
    onError
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
      <ErrorBoundary fallback={<div>{t('file.import.error.boundary')}</div>}>
        <div className="file-importer-compact">
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
              style={{ display: 'none' }}
              id="file-input-compact"
            />
            <label htmlFor="file-input-compact">
              <Button
                variant="primary"
                disabled={disabled || isProcessing}
                style={{ cursor: disabled || isProcessing ? 'not-allowed' : 'pointer' }}
              >
                {isProcessing ? (
                  <>
                    <LoadingSpinner size="small" />
                    {t('file.import.processing')}
                  </>
                ) : (
                  t('file.import.select.files')
                )}
              </Button>
            </label>

            {showProgress && isProcessing && (
              <ProgressBar
                value={progress}
                size="small"
                showPercentage={false}
              />
            )}
          </DragDropZone>
        </div>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary fallback={<div>{t('file.import.error.boundary')}</div>}>
      <Card className="file-importer">
        <CardHeader>
          <Heading level={3}>
            {title || t('file.import.title')}
          </Heading>
          <Text variant="caption" color="secondary">
            {description || t('file.import.description', {
              formats: formatFileTypes(),
              maxSize: formatMaxSize(),
              maxFiles
            })}
          </Text>
        </CardHeader>

        <CardContent>
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
              style={{ display: 'none' }}
              id="file-input"
            />
            <label htmlFor="file-input">
              <Button
                variant="primary"
                size="large"
                disabled={disabled || isProcessing}
                style={{ cursor: disabled || isProcessing ? 'not-allowed' : 'pointer' }}
              >
                {isProcessing ? (
                  <>
                    <LoadingSpinner size="small" />
                    {t('file.import.processing')}
                  </>
                ) : (
                  t('file.import.select.files')
                )}
              </Button>
            </label>
          </DragDropZone>

          {/* Progress bar */}
          {showProgress && isProcessing && (
            <div style={{ marginTop: '16px' }}>
              <ProgressBar
                value={progress}
                label={t('file.import.progress')}
                showPercentage={true}
              />
            </div>
          )}

          {/* Error display */}
          {error && (
            <div style={{ marginTop: '16px' }}>
              <Text color="error">{error}</Text>
            </div>
          )}

          {/* File list */}
          {files.length > 0 && (
            <div style={{ marginTop: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <Text variant="body" weight="medium">
                  {t('file.import.files.selected', { count: files.length })}
                </Text>
                <Button
                  variant="secondary"
                  size="small"
                  onClick={clearFiles}
                  disabled={isProcessing}
                >
                  {t('file.import.clear.all')}
                </Button>
              </div>

              <FileList
                files={files}
                onFileSelect={handleFileSelect}
                onFileRemove={handleFileRemove}
                onFileRetry={retryFile}
                selectedFileId={selectedFile?.id}
                disabled={isProcessing}
              />
            </div>
          )}

          {/* File preview */}
          {showPreview && selectedFile && (
            <div style={{ marginTop: '16px' }}>
              <FilePreview
                file={selectedFile}
                onClose={() => setSelectedFile(null)}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </ErrorBoundary>
  );
};