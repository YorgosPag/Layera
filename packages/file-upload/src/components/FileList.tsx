import React from 'react';
import { useLayeraTranslation } from '@layera/tolgee';
import { BaseCard as Card } from '@layera/cards';
import { Text as Typography } from '@layera/typography';
import { Button } from '@layera/buttons';
import { UploadIcon, CloseIcon, RefreshIcon, DeleteIcon } from '@layera/icons';
import { useTheme } from '@layera/theme-switcher';
import { Box } from '@layera/layout';
import type { FileListProps, FileUploadItem } from '../types';
import { formatBytes } from '../utils/fileValidation';

/**
 * File list component για προβολή και διαχείριση uploaded files
 * Βασισμένο σε Google Drive, Dropbox patterns
 */
export const FileList: React.FC<FileListProps> = ({
  files,
  showProgress,
  showActions,
  onRemove,
  onCancel,
  onRetry
}) => {
  const { t } = useLayeraTranslation();
  const { theme } = useTheme();

  if (files.length === 0) {
    return (
      <Card className="p-6 text-center" style={{ backgroundColor: theme === 'dark' ? 'var(--la-color-gray-800)' : 'var(--la-color-gray-50)' }}>
        <UploadIcon className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--la-color-gray-400)' }} />
        <Typography size="base" style={{ color: 'var(--la-color-text-muted)' }}>
          {t('file-upload.no-files')}
        </Typography>
      </Card>
    );
  }

  return (
    <Box className="space-y-3">
      {files.map((file: unknown) => (
        <FileListItem
          key={file.id}
          file={file}
          showProgress={showProgress}
          showActions={showActions}
          onRemove={onRemove}
          onCancel={onCancel}
          onRetry={onRetry}
        />
      ))}
    </Box>
  );
};

interface FileListItemProps {
  file: FileUploadItem;
  showProgress: boolean;
  showActions: boolean;
  onRemove: (fileId: string) => void;
  onCancel: (fileId: string) => void;
  onRetry: (fileId: string) => void;
}

const FileListItem: React.FC<FileListItemProps> = ({
  file,
  showProgress,
  showActions,
  onRemove,
  onCancel,
  onRetry
}) => {
  const { t } = useLayeraTranslation();
  const { theme } = useTheme();

  const getStatusIcon = (): void => {
    switch (file.status) {
      case 'completed':
        return <UploadIcon className="w-5 h-5" style={{ color: 'var(--la-color-success)' }} />;
      case 'error':
        return <CloseIcon className="w-5 h-5" style={{ color: 'var(--la-color-error)' }} />;
      case 'uploading':
        return <UploadIcon className="w-5 h-5 animate-pulse" style={{ color: 'var(--la-color-info)' }} />;
      case 'cancelled':
        return <CloseIcon className="w-5 h-5" style={{ color: 'var(--la-color-gray-500)' }} />;
      case 'paused':
        return <UploadIcon className="w-5 h-5" style={{ color: 'var(--la-color-warning)' }} />;
      default:
        return <UploadIcon className="w-5 h-5" style={{ color: 'var(--la-color-gray-400)' }} />;
    }
  };

  const getStatusText = (): void => {
    switch (file.status) {
      case 'completed':
        return t('file-upload.status.completed');
      case 'error':
        return file.error || t('file-upload.status.error');
      case 'uploading':
        return t('file-upload.status.uploading');
      case 'cancelled':
        return t('file-upload.status.cancelled');
      case 'paused':
        return t('file-upload.status.paused');
      default:
        return t('file-upload.status.pending');
    }
  };

  const getProgressBarColor = (): string => {
    switch (file.status) {
      case 'completed':
        return 'var(--la-color-success)';
      case 'error':
        return 'var(--la-color-error)';
      case 'uploading':
        return 'var(--la-color-info)';
      case 'cancelled':
        return 'var(--la-color-gray-500)';
      case 'paused':
        return 'var(--la-color-warning)';
      default:
        return 'var(--la-color-gray-300)';
    }
  };

  const formatUploadSpeed = (speed?: number): string => {
    if (!speed) return '';
    return `${formatBytes(speed)}/s`;
  };

  const formatETA = (eta?: number): string => {
    if (!eta) return '';
    const minutes = Math.floor(eta / 60);
    const seconds = Math.floor(eta % 60);
    return minutes > 0 ? `${minutes}:${seconds.toString().padStart(2, '0')}` : `${seconds}s`;
  };

  return (
    <Card className="p-4" style={{ backgroundColor: theme === 'dark' ? 'var(--la-color-gray-800)' : 'var(--la-color-surface)' }}>
      <Box className="flex items-center justify-between">
        {/* File Info */}
        <Box className="flex items-center space-x-3 flex-1 min-w-0">
          <Box className="flex-shrink-0">
            {getStatusIcon()}
          </Box>

          <Box className="flex-1 min-w-0">
            <Box className="flex items-center justify-between">
              <Typography size="base" weight="medium" className="truncate">
                {file.file.name}
              </Typography>
              <Typography size="sm" className=" ml-2">
                {formatBytes(file.file.size)}
              </Typography>
            </Box>

            <Box className="flex items-center space-x-4 mt-1">
              <Typography size="sm" style={{ color: 'var(--la-color-text-muted)' }}>
                {getStatusText()}
              </Typography>

              {file.status === 'uploading' && file.speed && (
                <>
                  <Typography size="sm" style={{ color: 'var(--la-color-text-muted)' }}>
                    {formatUploadSpeed(file.speed)}
                  </Typography>
                  {file.eta && (
                    <Typography size="sm" style={{ color: 'var(--la-color-text-muted)' }}>
                      {t('file-upload.eta', { time: formatETA(file.eta) })}
                    </Typography>
                  )}
                </>
              )}
            </Box>

            {/* Progress Bar */}
            {showProgress && (
              <Box className="w-full rounded-full h-2 mt-2" style={{ backgroundColor: theme === 'dark' ? 'var(--la-color-gray-600)' : 'var(--la-color-gray-200)' }}>
                <Box
                  className="h-2 rounded-full transition-all duration-300" style={{ backgroundColor: getProgressBarColor() }}
                  width={`${Math.min(file.progress, 100)}%`}
                />
              </Box>
            )}
          </Box>
        </Box>

        {/* Actions */}
        {showActions && (
          <Box className="flex items-center space-x-2 ml-4">
            {file.status === 'uploading' && (
              <Button
                variant="outline"
                size="sm"
                onClick={(): void => onCancel(file.id)}
                style={{ color: 'var(--la-color-error)', '--hover-color': 'var(--la-color-error-hover)' }}
              >
                <CloseIcon className="w-4 h-4" />
              </Button>
            )}

            {file.status === 'error' && (
              <Button
                variant="outline"
                size="sm"
                onClick={(): void => onRetry(file.id)}
                style={{ color: 'var(--la-color-info)', '--hover-color': 'var(--la-color-info-hover)' }}
              >
                <RefreshIcon className="w-4 h-4" />
              </Button>
            )}

            {(file.status === 'completed' || file.status === 'error' || file.status === 'cancelled') && (
              <Button
                variant="outline"
                size="sm"
                onClick={(): void => onRemove(file.id)}
                style={{ color: 'var(--la-color-gray-600)', '--hover-color': 'var(--la-color-gray-700)' }}
              >
                <DeleteIcon className="w-4 h-4" />
              </Button>
            )}
          </Box>
        )}
      </Box>
    </Card>
  );
};