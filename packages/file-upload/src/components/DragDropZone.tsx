import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BaseCard as Card } from '@layera/cards';
import { Text as Typography } from '@layera/typography';
import { UploadIcon } from '@layera/icons';
import { useTheme } from '@layera/theme-switcher';
import type { DragDropZoneProps } from '../types';

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
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [isDragOver, setIsDragOver] = useState(false);
  const [dragCounter, setDragCounter] = useState(0);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!enabled) return;

    setDragCounter(prev => prev + 1);

    if (e.dataTransfer?.items && e.dataTransfer.items.length > 0) {
      setIsDragOver(true);
    }
  }, [enabled]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!enabled) return;

    setDragCounter(prev => {
      const newCounter = prev - 1;
      if (newCounter === 0) {
        setIsDragOver(false);
      }
      return newCounter;
    });
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
    setDragCounter(0);

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

  const getZoneClasses = () => {
    const baseClasses = [
      'relative',
      'border-2',
      'border-dashed',
      'rounded-lg',
      'p-8',
      'text-center',
      'transition-all',
      'duration-200',
      'cursor-pointer'
    ];

    if (!enabled) {
      baseClasses.push('opacity-50', 'cursor-not-allowed');
    } else if (isDragOver) {
      baseClasses.push(
        'border-blue-500',
        'bg-blue-50',
        theme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-50',
        'scale-105'
      );
    } else {
      baseClasses.push(
        'border-gray-300',
        'hover:border-gray-400',
        theme === 'dark' ? 'border-gray-600 hover:border-gray-500' : 'border-gray-300 hover:border-gray-400'
      );
    }

    return baseClasses.join(' ');
  };

  const acceptAttribute = acceptedTypes.length > 0 ? acceptedTypes.join(',') : undefined;

  return (
    <Card className={`${getZoneClasses()} ${className}`}>
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

        <div className="flex flex-col items-center justify-center space-y-4">
          <div className={`p-4 rounded-full ${
            isDragOver
              ? 'bg-blue-100 text-blue-600'
              : theme === 'dark'
              ? 'bg-gray-700 text-gray-300'
              : 'bg-gray-100 text-gray-500'
          }`}>
            <UploadIcon className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <Typography size="lg" weight="medium" className="">
              {dropZoneText || (
                isDragOver
                  ? t('file-upload.drop-files-here')
                  : t('file-upload.drag-files-or-click')
              )}
            </Typography>

            <Typography size="sm" className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}>
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
          </div>

          {isDragOver && (
            <div className="flex items-center space-x-2 text-blue-600">
              <UploadIcon className="w-5 h-5" />
              <Typography size="base" weight="medium" className="">
                {t('file-upload.release-to-upload')}
              </Typography>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};