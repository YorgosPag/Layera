import React, { useState, useCallback } from 'react';
import { BaseCard } from '@layera/cards';
import { Button } from '@layera/buttons';
import { LoadingSpinner } from '@layera/loading';
import { useLayeraTranslation } from '@layera/i18n';
import { ErrorBoundary } from '@layera/error-boundary';
import { Heading, Text } from '@layera/typography';

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
      <SafeErrorBoundary fallback={<div>{t('file.import.error.boundary')}</div>}>
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
                    <SafeLoadingSpinner size="sm" />
                    {t('file.import.processing')}
                  </>
                ) : (
                  t('file.import.select.files')
                )}
              </Button>
            </label>

            {showProgress && isProcessing && (
              <div style={{ marginTop: '8px', fontSize: '12px', color: '#666' }}>
                {t('file.import.progress')}: {Math.round(progress)}%
              </div>
            )}
          </DragDropZone>
        </div>
      </SafeErrorBoundary>
    );
  }

  return (
    <SafeErrorBoundary fallback={<div>{t('file.import.error.boundary')}</div>}>
      <BaseCard className="file-importer">
        <div style={{ padding: '16px', borderBottom: '1px solid #eee' }}>
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
        </div>

        <div style={{ padding: '16px' }}>
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
                size="lg"
                disabled={disabled || isProcessing}
                style={{ cursor: disabled || isProcessing ? 'not-allowed' : 'pointer' }}
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
            <div style={{ marginTop: '16px', padding: '12px', backgroundColor: '#f5f5f5', borderRadius: '4px' }}>
              <div style={{ fontSize: '14px', marginBottom: '4px' }}>
                {t('file.import.progress')}: {Math.round(progress)}%
              </div>
              <div style={{ width: '100%', height: '4px', backgroundColor: '#e0e0e0', borderRadius: '2px' }}>
                <div
                  style={{
                    width: `${progress}%`,
                    height: '100%',
                    backgroundColor: '#007bff',
                    borderRadius: '2px',
                    transition: 'width 0.3s ease'
                  }}
                />
              </div>
            </div>
          )}

          {/* Error display */}
          {error && (
            <div style={{ marginTop: '16px' }}>
              <Text color="danger">{error}</Text>
            </div>
          )}

          {/* File list */}
          {files.length > 0 && (
            <div style={{ marginTop: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
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
              </div>

              <FileList
                files={files}
                onFileSelect={handleFileSelect}
                onFileRemove={handleFileRemove}
                onFileRetry={retryFile}
                {...(selectedFile?.id && { selectedFileId: selectedFile.id })}
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
        </div>
      </BaseCard>
    </SafeErrorBoundary>
  );
};