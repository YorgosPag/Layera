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
      <Card className={`p-6 text-center ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
        <UploadIcon className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        <Typography size="base" className="text-gray-500">
          {t('file-upload.no-files')}
        </Typography>
      </Card>
    );
  }

  return (
    <Box className="space-y-3">
      {files.map((file) => (
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

  const getStatusIcon = () => {
    switch (file.status) {
      case 'completed':
        return <UploadIcon className="w-5 h-5 text-green-500" />;
      case 'error':
        return <CloseIcon className="w-5 h-5 text-red-500" />;
      case 'uploading':
        return <UploadIcon className="w-5 h-5 text-blue-500 animate-pulse" />;
      case 'cancelled':
        return <CloseIcon className="w-5 h-5 text-gray-500" />;
      case 'paused':
        return <UploadIcon className="w-5 h-5 text-yellow-500" />;
      default:
        return <UploadIcon className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusText = () => {
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

  const getProgressBarColor = () => {
    switch (file.status) {
      case 'completed':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      case 'uploading':
        return 'bg-blue-500';
      case 'cancelled':
        return 'bg-gray-500';
      case 'paused':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-300';
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
    <Card className={`p-4 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
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
              <Typography size="sm" className="text-gray-500 ml-2">
                {formatBytes(file.file.size)}
              </Typography>
            </Box>

            <Box className="flex items-center space-x-4 mt-1">
              <Typography size="sm" className="text-gray-500">
                {getStatusText()}
              </Typography>

              {file.status === 'uploading' && file.speed && (
                <>
                  <Typography size="sm" className="text-gray-500">
                    {formatUploadSpeed(file.speed)}
                  </Typography>
                  {file.eta && (
                    <Typography size="sm" className="text-gray-500">
                      {t('file-upload.eta', { time: formatETA(file.eta) })}
                    </Typography>
                  )}
                </>
              )}
            </Box>

            {/* Progress Bar */}
            {showProgress && (
              <Box className={`w-full bg-gray-200 rounded-full h-2 mt-2 ${theme === 'dark' ? 'bg-gray-600' : 'bg-gray-200'}`}>
                <Box
                  className={`h-2 rounded-full transition-all duration-300 ${getProgressBarColor()}`}
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
                onClick={() => onCancel(file.id)}
                className="text-red-600 hover:text-red-700"
              >
                <CloseIcon className="w-4 h-4" />
              </Button>
            )}

            {file.status === 'error' && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onRetry(file.id)}
                className="text-blue-600 hover:text-blue-700"
              >
                <RefreshIcon className="w-4 h-4" />
              </Button>
            )}

            {(file.status === 'completed' || file.status === 'error' || file.status === 'cancelled') && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onRemove(file.id)}
                className="text-gray-600 hover:text-gray-700"
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