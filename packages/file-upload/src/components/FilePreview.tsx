import React, { useState, useEffect } from 'react';
import { useLayeraTranslation } from '@layera/tolgee';
import { BaseCard as Card } from '@layera/cards';
import { Text as Typography } from '@layera/typography';
import { Button } from '@layera/buttons';
import { UploadIcon, CloseIcon } from '@layera/icons';
import { useTheme } from '@layera/theme-switcher';
import type { FilePreviewProps } from '../types';
import { formatBytes, isImageFile, isPreviewSupported } from '../utils/fileValidation';

/**
 * File preview component με thumbnail και metadata display
 * Βασισμένο σε Google Drive, Dropbox patterns
 */
export const FilePreview: React.FC<FilePreviewProps> = ({
  file,
  showPreview,
  onRemove,
  onClick
}) => {
  const { t } = useLayeraTranslation();
  const { theme } = useTheme();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [previewError, setPreviewError] = useState(false);

  useEffect(() => {
    if (!showPreview || !isImageFile(file.file)) {
      return;
    }

    const url = URL.createObjectURL(file.file);
    setPreviewUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file.file, showPreview]);

  const getFileIcon = () => {
    // Use UploadIcon as a generic file icon for now
    return <UploadIcon className="w-8 h-8" />;
  };

  const getStatusColor = () => {
    switch (file.status) {
      case 'completed':
        return 'border-green-500';
      case 'error':
        return 'border-red-500';
      case 'uploading':
        return 'border-blue-500';
      case 'cancelled':
        return 'border-gray-500';
      case 'paused':
        return 'border-yellow-500';
      default:
        return theme === 'dark' ? 'border-gray-600' : 'border-gray-300';
    }
  };

  const getProgressOverlay = () => {
    if (file.status !== 'uploading') return null;

    return (
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="text-center text-white">
          <UploadIcon className="w-6 h-6 mx-auto mb-2 animate-pulse" />
          <Typography variant="caption" className="text-white">
            {Math.round(file.progress)}%
          </Typography>
        </div>
      </div>
    );
  };

  const handleImageError = () => {
    setPreviewError(true);
    setPreviewUrl(null);
  };

  const handleClick = () => {
    if (onClick) {
      onClick(file);
    }
  };

  return (
    <Card className={`relative overflow-hidden transition-all duration-200 ${getStatusColor()} border-2 ${
      onClick ? 'cursor-pointer hover:shadow-lg' : ''
    }`}>
      <div onClick={handleClick} className="relative">
        {/* Preview Area */}
        <div className="aspect-square bg-gray-50 dark:bg-gray-800 flex items-center justify-center">
          {showPreview && previewUrl && !previewError ? (
            <img
              src={previewUrl}
              alt={file.file.name}
              className="w-full h-full object-cover"
              onError={handleImageError}
            />
          ) : (
            <div className={`text-gray-400 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
              {getFileIcon()}
            </div>
          )}

          {/* Progress Overlay */}
          {getProgressOverlay()}

          {/* Status Badge */}
          <div className="absolute top-2 left-2">
            {file.status === 'completed' && (
              <div className="bg-green-500 text-white rounded-full p-1">
                <UploadIcon className="w-3 h-3" />
              </div>
            )}
            {file.status === 'error' && (
              <div className="bg-red-500 text-white rounded-full p-1">
                <CloseIcon className="w-3 h-3" />
              </div>
            )}
            {file.status === 'uploading' && (
              <div className="bg-blue-500 text-white rounded-full p-1">
                <UploadIcon className="w-3 h-3 animate-pulse" />
              </div>
            )}
          </div>

          {/* Remove Button */}
          <div className="absolute top-2 right-2">
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onRemove(file.id);
              }}
              className="bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-600 hover:text-red-600 border-0 p-1 w-6 h-6"
            >
              <CloseIcon className="w-3 h-3" />
            </Button>
          </div>
        </div>

        {/* File Info */}
        <div className="p-3">
          <Typography
            variant="caption"
            className="font-medium truncate block mb-1"
            title={file.file.name}
          >
            {file.file.name}
          </Typography>

          <div className="flex items-center justify-between">
            <Typography variant="caption" className="text-gray-500">
              {formatBytes(file.file.size)}
            </Typography>

            {file.status === 'uploading' && (
              <Typography variant="caption" className="text-blue-600">
                {Math.round(file.progress)}%
              </Typography>
            )}

            {file.status === 'error' && (
              <Typography variant="caption" className="text-red-600" title={file.error}>
                {t('file-upload.status.error')}
              </Typography>
            )}
          </div>

          {/* File Type Badge */}
          <div className="mt-2">
            <span className={`inline-block px-2 py-1 text-xs rounded ${
              theme === 'dark'
                ? 'bg-gray-700 text-gray-300'
                : 'bg-gray-100 text-gray-600'
            }`}>
              {file.file.type || t('file-upload.unknown-type')}
            </span>
          </div>

          {/* Upload Speed & ETA */}
          {file.status === 'uploading' && file.speed && (
            <div className="mt-2 space-y-1">
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{formatBytes(file.speed)}/s</span>
                {file.eta && (
                  <span>
                    {Math.floor(file.eta / 60) > 0
                      ? `${Math.floor(file.eta / 60)}:${Math.floor(file.eta % 60).toString().padStart(2, '0')}`
                      : `${Math.floor(file.eta)}s`
                    }
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};