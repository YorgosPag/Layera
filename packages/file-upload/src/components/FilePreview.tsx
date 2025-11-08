import React, { useState, useEffect } from 'react';
import { useLayeraTranslation } from '@layera/tolgee';
import { BaseCard as Card } from '@layera/cards';
import { Text as Typography } from '@layera/typography';
import { Button } from '@layera/buttons';
import { UploadIcon, CloseIcon } from '@layera/icons';
import { Box } from '@layera/layout';
import { useTheme } from '@layera/theme-switcher';
import type { FilePreviewProps } from '../types';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  const getFileCategory = (): void => {
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

  const getFileIcon = (): void => {
    const category = getFileCategory();
    // Enhanced file type detection with CAD support
    switch (category) {
      case 'cad':
        return <UploadIcon className="layera-file-icon-cad w-8 h-8" />; // CAD files
      case 'document':
        return <UploadIcon className="layera-file-icon-document w-8 h-8" />; // Documents
      case 'image':
      case 'vector':
        return <UploadIcon className="layera-file-icon-image w-8 h-8" />; // Images
      default:
        return <UploadIcon className="w-8 h-8" />; // Generic icon
    }
  };

  const getStatusColor = (): void => {
    switch (file.status) {
      case 'completed':
        return 'layera-file-border-image';
      case 'error':
        return 'layera-file-border-document';
      case 'uploading':
        return 'layera-file-border-cad';
      case 'cancelled':
        return 'layera-file-border-other';
      case 'paused':
        return 'layera-file-border-compressed';
      default:
        return theme === 'dark' ? 'layera-file-border-default-dark' : 'layera-file-border-default';
    }
  };

  const getProgressOverlay = (): void => {
    if (file.status !== 'uploading') return null;

    return (
      <Box className="absolute inset-0 flex items-center justify-center" style={{ backgroundColor: 'var(--la-overlay-bg)' }}>
        <Box className="text-center">
          <UploadIcon className="w-6 h-6 mx-auto mb-2 animate-pulse" />
          <Typography variant="caption" style={{ color: 'var(--la-color-text-on-primary)' }}>
            {Math.round(file.progress)}%
          </Typography>
        </Box>
      </Box>
    );
  };

  const handleImageError = (): void => {
    setPreviewError(true);
    setPreviewUrl(null);
  };

  const handleClick = (): void => {
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
        <Box className="aspect-square flex items-center justify-center" style={{ backgroundColor: theme === 'dark' ? 'var(--la-color-gray-800)' : 'var(--la-color-gray-50)' }}>
          {showPreview && previewUrl && !previewError ? (
            <img
              src={previewUrl}
              alt={file.file.name}
              className="w-full h-full object-cover"
              onError={handleImageError}
            />
          ) : (
            <Box style={{ color: theme === 'dark' ? 'var(--la-color-gray-500)' : 'var(--la-color-gray-400)' }}>
              {getFileIcon()}
            </Box>
          )}

          {/* Progress Overlay */}
          {getProgressOverlay()}

          {/* Status Badge */}
          <Box className="absolute top-2 left-2">
            {file.status === 'completed' && (
              <Box className="rounded-full p-1" style={{ backgroundColor: 'var(--la-color-success)', color: 'var(--la-text-on-success)' }}>
                <UploadIcon className="w-3 h-3" />
              </Box>
            )}
            {file.status === 'error' && (
              <Box className="rounded-full p-1" style={{ backgroundColor: 'var(--la-color-error)', color: 'var(--la-text-on-dark)' }}>
                <CloseIcon className="w-3 h-3" />
              </Box>
            )}
            {file.status === 'uploading' && (
              <Box className="rounded-full p-1" style={{ backgroundColor: 'var(--la-color-info)', color: 'var(--la-text-on-info)' }}>
                <UploadIcon className="w-3 h-3 animate-pulse" />
              </Box>
            )}
          </Box>

          {/* Remove Button */}
          <Box className="absolute top-2 right-2">
            <Button
              variant="outline"
              size="sm"
              onClick={(e: React.FormEvent<HTMLFormElement>) => {
                e.stopPropagation();
                onRemove(file.id);
              }}
              className="border-0 p-1 w-6 h-6" style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)', color: 'var(--la-color-gray-600)' }}
            >
              <CloseIcon className="w-3 h-3" />
            </Button>
          </Box>
        </Box>

        {/* File Info */}
        <Box className="p-3">
          <Typography
            variant="caption"
            className="font-medium truncate block mb-1"
            title={file.file.name}
          >
            {file.file.name}
          </Typography>

          <Box className="flex items-center justify-between">
            <Typography variant="caption" style={{ color: 'var(--la-color-text-muted)' }}>
              {formatBytes(file.file.size)}
            </Typography>

            {file.status === 'uploading' && (
              <Typography variant="caption" style={{ color: 'var(--la-color-info)' }}>
                {Math.round(file.progress)}%
              </Typography>
            )}

            {file.status === 'error' && (
              <Typography variant="caption" style={{ color: 'var(--la-color-error)' }} title={file.error}>
                {t('file-upload.status.error')}
              </Typography>
            )}
          </Box>

          {/* File Type Badge */}
          <Box className="mt-2">
            <span className={`inline-block px-2 py-1 text-xs rounded ${
              theme === 'dark'
                ? 'layera-file-container-dark'
                : 'layera-file-container'
            }`}>
              {file.file.type || t('file-upload.unknown-type')}
            </span>
          </Box>

          {/* Upload Speed & ETA */}
          {file.status === 'uploading' && file.speed && (
            <Box className="mt-2 space-y-1">
              <Box className="flex items-center justify-between text-xs layera-file-text-muted">
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