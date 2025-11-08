import React, { useCallback, useState } from 'react';
import { Box } from '@layera/layout';
import { useLayeraTranslation } from '@layera/tolgee';
import { BaseCard as Card } from '@layera/cards';
import { Text as Typography } from '@layera/typography';
import { UploadIcon } from '@layera/icons';
import { useTheme } from '@layera/theme-switcher';
import type { DragDropZoneProps } from '../types';
import './DragDropZone.css';

/**
 * Drag & Drop zone component με enterprise-grade functionality
 * Βασισμένο σε Google Drive, Dropbox patterns
 */
export const DragDropZone: React.FC<DragDropZoneProps> = ({
  enabled,
  acceptedTypes,
  maxFiles,
  dropZoneText,
  onFilesDrop,
  className = '',
  multiple = true
}) => {
  const { t } = useLayeraTranslation();
  const { theme } = useTheme();
  const [isDragOver, setIsDragOver] = useState(false);
  // const [dragCounter, setDragCounter] = useState(0); // Unused variable"

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!enabled) return;

    if (e.dataTransfer?.items && e.dataTransfer.items.length > 0) {
      setIsDragOver(true);
    }
  }, [enabled]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!enabled) return;

    setIsDragOver(false);
  }, [enabled]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!enabled) return;

    if (e.dataTransfer) {
      e.dataTransfer.dropEffect = 'copy';
    }
  }, [enabled]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!enabled) return;

    setIsDragOver(false);

    const { files } = e.dataTransfer;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);

      // Apply maxFiles limit
      const limitedFiles = maxFiles ? fileArray.slice(0, maxFiles) : fileArray;

      // Filter by accepted types
      const validFiles = limitedFiles.filter(file =>
        acceptedTypes.length === 0 || acceptedTypes.includes(file.type as any)
      );

      if (validFiles.length > 0) {
        onFilesDrop(validFiles);
      }
    }
  }, [enabled, maxFiles, acceptedTypes, onFilesDrop]);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      onFilesDrop(fileArray);
    }

    // Reset input value για να επιτρέπουμε re-upload του ίδιου file
    e.target.value = '';
  }, [onFilesDrop]);

  // Styles are now handled by CSS classes and design tokens

  const acceptAttribute = acceptedTypes.length > 0 ? acceptedTypes.join(',') : undefined;

  return (
    <Card className={`${className} la-drag-drop-zone ${!enabled ? 'la-drag-drop-zone--disabled' : ''} ${isDragOver ? 'la-drag-drop-zone--drag-over' : ''}`}>
      <div
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="w-full h-full"
      >
        <input
          type="file"
          multiple={multiple}
          accept={acceptAttribute}
          onChange={handleFileInputChange}
          disabled={!enabled}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
        />

        <Box className="flex flex-col items-center justify-center space-y-4">
          <Box
            className={`la-drag-drop-icon-container ${
              isDragOver
                ? 'la-drag-drop-icon-container--drag-over'
                : theme === 'dark'
                ? 'la-drag-drop-icon-container--normal-dark'
                : 'la-drag-drop-icon-container--normal'
            }`}
          >
            <UploadIcon className="w-8 h-8" />
          </Box>

          <Box className="space-y-2">
            <Typography size="lg" weight="medium" className="">
              {dropZoneText || (
                isDragOver
                  ? t('file-upload.drop-files-here')
                  : t('file-upload.drag-files-or-click')
              )}
            </Typography>

            <Typography
              size="sm"
              className={theme === 'dark' ? 'la-file-info-text--dark' : 'la-file-info-text'}
            >
              {acceptedTypes.length > 0 && (
                <>
                  {t('file-upload.accepted-types')}: {acceptedTypes.join(', ')}
                  <br />
                </>
              )}
              {maxFiles && (
                <>
                  {t('file-upload.max-files', { count: maxFiles })}
                  <br />
                </>
              )}
              {t('file-upload.or-click-to-browse')}
            </Typography>
          </Box>

          {isDragOver && (
            <Box
              className="flex items-center space-x-2 la-file-size-hint"
            >
              <UploadIcon className="w-5 h-5" />
              <Typography size="base" weight="medium" className="">
                {t('file-upload.release-to-upload')}
              </Typography>
            </Box>
          )}
        </Box>
      </div>
    </Card>
  );
};