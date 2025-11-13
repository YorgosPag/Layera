import React, { useState, useEffect } from 'react';
import { useLayeraTranslation } from '@layera/tolgee';
import { BaseCard as Card } from '@layera/cards';
import { Text as Typography } from '@layera/typography';
// Mock Button component since @layera/buttons doesn't exist
const Button: React.FC<any> = ({ children, onClick, className, ...props }) => (
  <button onClick={onClick} className={className} {...props}>{children}</button>
);
import { UploadIcon, CloseIcon } from '@layera/icons';
import { Box } from '@layera/layout';
import { useTheme } from '@layera/theme-switcher';
import type { FilePreviewProps } from '../types';
import { formatBytes, isImageFile } from '../utils/fileValidation';

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

  const getFileCategory = () => {
    const extension = file.file.name.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'dxf':
      case 'dwg':
        return 'cad';
      case 'pdf':
        return 'document';
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'webp':
      case 'bmp':
      case 'tiff':
        return 'image';
      case 'svg':
        return 'vector';
      default:
        return 'unknown';
    }
  };

  const getFileIcon = () => {
    const category = getFileCategory();
    // Enhanced file type detection with CAD support
    switch (category) {
      case 'cad':
        return <UploadIcon className="w-8 h-8 text-blue-600" />; // CAD files in blue
      case 'document':
        return <UploadIcon className="w-8 h-8 text-red-600" />; // Documents in red
      case 'image':
      case 'vector':
        return <UploadIcon className="w-8 h-8 text-green-600" />; // Images in green
      default:
        return <UploadIcon className="w-8 h-8" />; // Generic icon
    }
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
      <Box className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <Box className="text-center text-white">
          <UploadIcon className="w-6 h-6 mx-auto mb-2 animate-pulse" />
          <Typography size="xs" className="text-white">
            {Math.round(file.progress)}%
          </Typography>
        </Box>
      </Box>
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
      <Box onClick={handleClick} className="relative">
        {/* Preview Area */}
        <Box className="aspect-square bg-gray-50 dark:bg-gray-800 flex items-center justify-center">
          {showPreview && previewUrl && !previewError ? (
            <img
              src={previewUrl}
              alt={file.file.name}
              className="w-full h-full object-cover"
              onError={handleImageError}
            />
          ) : (
            <Box className={`text-gray-400 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-400'}`}>
              {getFileIcon()}
            </Box>
          )}

          {/* Progress Overlay */}
          {getProgressOverlay()}

          {/* Status Badge */}
          <Box className="absolute top-2 left-2">
            {file.status === 'completed' && (
              <Box className="bg-green-500 text-white rounded-full p-1">
                <UploadIcon className="w-3 h-3" />
              </Box>
            )}
            {file.status === 'error' && (
              <Box className="bg-red-500 text-white rounded-full p-1">
                <CloseIcon className="w-3 h-3" />
              </Box>
            )}
            {file.status === 'uploading' && (
              <Box className="bg-blue-500 text-white rounded-full p-1">
                <UploadIcon className="w-3 h-3 animate-pulse" />
              </Box>
            )}
          </Box>

          {/* Remove Button */}
          <Box className="absolute top-2 right-2">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onRemove(file.id);
              }}
              className="bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-600 hover:text-red-600 border-0 p-1 w-6 h-6"
            >
              <CloseIcon className="w-3 h-3" />
            </Button>
          </Box>
        </Box>

        {/* File Info */}
        <Box className="p-3">
          <Typography
            size="xs"
            className="font-medium truncate block mb-1"
            title={file.file.name}
          >
            {file.file.name}
          </Typography>

          <Box className="flex items-center justify-between">
            <Typography size="xs" className="text-gray-500">
              {formatBytes(file.file.size)}
            </Typography>

            {file.status === 'uploading' && (
              <Typography size="xs" className="text-blue-600">
                {Math.round(file.progress)}%
              </Typography>
            )}

            {file.status === 'error' && (
              <Typography size="xs" className="text-red-600" title={file.error}>
                {t('file-upload.status.error')}
              </Typography>
            )}
          </Box>

          {/* File Type Badge */}
          <Box className="mt-2">
            <span className={`inline-block px-2 py-1 text-xs rounded ${
              theme === 'dark'
                ? 'bg-gray-700 text-gray-300'
                : 'bg-gray-100 text-gray-600'
            }`}>
              {file.file.type || t('file-upload.unknown-type')}
            </span>
          </Box>

          {/* Upload Speed & ETA */}
          {file.status === 'uploading' && file.speed && (
            <Box className="mt-2 space-y-1">
              <Box className="flex items-center justify-between text-xs text-gray-500">
                <span>{formatBytes(file.speed)}/s</span>
                {file.eta && (
                  <span>
                    {Math.floor(file.eta / 60) > 0
                      ? `${Math.floor(file.eta / 60)}:${Math.floor(file.eta % 60).toString().padStart(2, '0')}`
                      : `${Math.floor(file.eta)}s`
                    }
                  </span>
                )}
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Card>
  );
};