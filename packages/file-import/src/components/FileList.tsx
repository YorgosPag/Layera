import React, { useCallback } from 'react';
import { Card, CardContent } from '@layera/cards';
import { Button, IconButton } from '@layera/buttons';
import { ProgressBar, LoadingSpinner } from '@layera/loading';
import { Text, Heading } from '@layera/typography';
import { useLayeraTranslation } from '@layera/tolgee';
import { ImportedFile } from '../types';

export interface FileListProps {
  files: ImportedFile[];
  onFileSelect: (file: ImportedFile) => void;
  onFileRemove: (fileId: string) => void;
  onFileRetry: (fileId: string) => Promise<void>;
  selectedFileId?: string;
  disabled?: boolean;
  compact?: boolean;
  showThumbnails?: boolean;
}

export const FileList: React.FC<FileListProps> = ({
  files,
  onFileSelect,
  onFileRemove,
  onFileRetry,
  selectedFileId,
  disabled = false,
  compact = false,
  showThumbnails = true
}) => {
  const { t } = useLayeraTranslation();

  const formatFileSize = useCallback((bytes: number): string => {
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }

    return `${size.toFixed(1)} ${units[unitIndex]}`;
  }, []);

  const getFileIcon = useCallback((file: ImportedFile): string => {
    const extension = file.file.name.split('.').pop()?.toLowerCase();

    switch (extension) {
      case 'dxf':
      case 'dwg':
        return '📐';
      case 'pdf':
        return '📄';
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'webp':
      case 'bmp':
      case 'tiff':
        return '🖼️';
      case 'svg':
        return '🎨';
      default:
        return '📎';
    }
  }, []);

  const getStatusColor = useCallback((status: ImportedFile['status']): string => {
    switch (status) {
      case 'completed':
        return 'green';
      case 'error':
        return 'red';
      case 'processing':
        return 'blue';
      case 'pending':
      default:
        return 'gray';
    }
  }, []);

  const getStatusText = useCallback((file: ImportedFile): string => {
    switch (file.status) {
      case 'completed':
        return t('file.status.completed');
      case 'error':
        return file.error || t('file.status.error');
      case 'processing':
        return t('file.status.processing');
      case 'pending':
      default:
        return t('file.status.pending');
    }
  }, [t]);

  const renderFileThumbnail = useCallback((file: ImportedFile) => {
    if (!showThumbnails) return null;

    if (file.previewUrl && file.metadata.type.startsWith('image/')) {
      return (
        <img
          src={file.previewUrl}
          alt={file.metadata.name}
          style={{
            width: compact ? '32px' : '48px',
            height: compact ? '32px' : '48px',
            objectFit: 'cover',
            borderRadius: '4px',
            border: '1px solid #e0e0e0'
          }}
        />
      );
    }

    return (
      <div
        style={{
          width: compact ? '32px' : '48px',
          height: compact ? '32px' : '48px',
          backgroundColor: '#f5f5f5',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: compact ? '16px' : '24px',
          border: '1px solid #e0e0e0'
        }}
      >
        {getFileIcon(file)}
      </div>
    );
  }, [showThumbnails, compact, getFileIcon]);

  const renderFileActions = useCallback((file: ImportedFile) => {
    return (
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        {file.status === 'error' && (
          <Button
            variant="secondary"
            size="small"
            onClick={() => onFileRetry(file.id)}
            disabled={disabled}
          >
            {t('file.action.retry')}
          </Button>
        )}

        {file.status === 'completed' && (
          <Button
            variant="primary"
            size="small"
            onClick={() => onFileSelect(file)}
            disabled={disabled}
          >
            {t('file.action.preview')}
          </Button>
        )}

        <IconButton
          variant="secondary"
          size="small"
          onClick={() => onFileRemove(file.id)}
          disabled={disabled || file.status === 'processing'}
          aria-label={t('file.action.remove')}
        >
          ✕
        </IconButton>
      </div>
    );
  }, [disabled, onFileRetry, onFileSelect, onFileRemove, t]);

  const renderFileItem = useCallback((file: ImportedFile) => {
    const isSelected = selectedFileId === file.id;

    if (compact) {
      return (
        <div
          key={file.id}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '8px 12px',
            border: `1px solid ${isSelected ? '#2196f3' : '#e0e0e0'}`,
            borderRadius: '6px',
            backgroundColor: isSelected ? '#f3f9ff' : '#ffffff',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onClick={() => !disabled && onFileSelect(file)}
        >
          {renderFileThumbnail(file)}

          <div style={{ flex: 1, minWidth: 0 }}>
            <Text variant="body" weight="medium" style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}>
              {file.metadata.name}
            </Text>
            <Text variant="caption" color="secondary">
              {formatFileSize(file.metadata.size)}
            </Text>
          </div>

          {file.status === 'processing' && (
            <LoadingSpinner size="small" />
          )}

          <IconButton
            variant="secondary"
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              onFileRemove(file.id);
            }}
            disabled={disabled || file.status === 'processing'}
            aria-label={t('file.action.remove')}
          >
            ✕
          </IconButton>
        </div>
      );
    }

    return (
      <Card
        key={file.id}
        className={`file-list-item ${isSelected ? 'selected' : ''}`}
        style={{
          border: `1px solid ${isSelected ? '#2196f3' : '#e0e0e0'}`,
          backgroundColor: isSelected ? '#f3f9ff' : '#ffffff',
          cursor: 'pointer',
          transition: 'all 0.2s ease'
        }}
        onClick={() => !disabled && onFileSelect(file)}
      >
        <CardContent style={{ padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
            {renderFileThumbnail(file)}

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <Text variant="body" weight="medium" style={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    marginBottom: '4px'
                  }}>
                    {file.metadata.name}
                  </Text>
                  <Text variant="caption" color="secondary">
                    {formatFileSize(file.metadata.size)} • {file.metadata.type}
                  </Text>
                </div>

                {renderFileActions(file)}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <Text
                      variant="caption"
                      color={getStatusColor(file.status) as 'primary'}
                      weight="medium"
                    >
                      {getStatusText(file)}
                    </Text>
                    {file.status === 'processing' && (
                      <Text variant="caption" color="secondary">
                        {file.progress}%
                      </Text>
                    )}
                  </div>

                  {file.status === 'processing' && (
                    <ProgressBar
                      value={file.progress}
                      size="small"
                      showPercentage={false}
                    />
                  )}
                </div>

                {file.status === 'processing' && (
                  <LoadingSpinner size="small" />
                )}
              </div>

              {file.metadata.dimensions && (
                <Text variant="caption" color="secondary" style={{ marginTop: '8px' }}>
                  {t('file.dimensions', {
                    width: file.metadata.dimensions.width,
                    height: file.metadata.dimensions.height
                  })}
                </Text>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }, [
    selectedFileId,
    compact,
    disabled,
    renderFileThumbnail,
    renderFileActions,
    formatFileSize,
    getStatusColor,
    getStatusText,
    onFileSelect,
    onFileRemove,
    t
  ]);

  if (files.length === 0) {
    return null;
  }

  return (
    <div className="file-list" style={{ display: 'flex', flexDirection: 'column', gap: compact ? '8px' : '12px' }}>
      {files.map(renderFileItem)}
    </div>
  );
};