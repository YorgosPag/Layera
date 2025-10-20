import React, { useState, useCallback, useRef, ReactNode } from 'react';
import { Card, CardContent } from '@layera/cards';
import { Text } from '@layera/typography';
import { useLayeraTranslation } from '@layera/tolgee';
import { SupportedFormat, DragDropState } from '../types';

export interface DragDropZoneProps {
  children?: ReactNode;
  onFilesDrop: (files: FileList | File[]) => void;
  acceptedFormats: SupportedFormat[];
  disabled?: boolean;
  maxFiles?: number;
  compact?: boolean;
  showHelper?: boolean;
  className?: string;
}

export const DragDropZone: React.FC<DragDropZoneProps> = ({
  children,
  onFilesDrop,
  acceptedFormats,
  disabled = false,
  maxFiles = 10,
  compact = false,
  showHelper = true,
  className = ''
}) => {
  const { t } = useLayeraTranslation();
  const [dragState, setDragState] = useState<DragDropState>({
    isDragging: false,
    isOver: false,
    canDrop: false
  });
  const dragCounterRef = useRef(0);

  const validateDroppedFiles = useCallback((files: FileList | File[]): boolean => {
    const filesArray = Array.from(files);

    if (filesArray.length > maxFiles) {
      return false;
    }

    return filesArray.every(file => {
      const extension = file.name.split('.').pop()?.toLowerCase();
      return extension && acceptedFormats.includes(extension as SupportedFormat);
    });
  }, [acceptedFormats, maxFiles]);

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (disabled) return;

    dragCounterRef.current++;

    if (e.dataTransfer?.items) {
      const canDrop = Array.from(e.dataTransfer.items).every(item => {
        if (item.kind === 'file') {
          const extension = item.type.split('/').pop();
          return extension && acceptedFormats.some(format =>
            item.type.includes(format) || extension === format
          );
        }
        return false;
      });

      setDragState({
        isDragging: true,
        isOver: true,
        canDrop
      });
    }
  }, [disabled, acceptedFormats]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (disabled) return;

    e.dataTransfer.dropEffect = dragState.canDrop ? 'copy' : 'none';
  }, [disabled, dragState.canDrop]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (disabled) return;

    dragCounterRef.current--;

    if (dragCounterRef.current === 0) {
      setDragState({
        isDragging: false,
        isOver: false,
        canDrop: false
      });
    }
  }, [disabled]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (disabled) return;

    dragCounterRef.current = 0;
    setDragState({
      isDragging: false,
      isOver: false,
      canDrop: false
    });

    const files = e.dataTransfer?.files;
    if (files && files.length > 0) {
      if (validateDroppedFiles(files)) {
        onFilesDrop(files);
      }
    }
  }, [disabled, validateDroppedFiles, onFilesDrop]);

  const formatAcceptedTypes = useCallback(() => {
    return acceptedFormats.map(format => `.${format}`).join(', ');
  }, [acceptedFormats]);

  const getDropZoneClasses = useCallback(() => {
    const baseClasses = [
      'file-drop-zone',
      'transition-all',
      'duration-200',
      'ease-in-out',
      'border-2',
      'border-dashed',
      'rounded-lg',
      'p-6',
      'text-center',
      'cursor-pointer'
    ];

    if (compact) {
      baseClasses.push('p-3');
    }

    if (disabled) {
      baseClasses.push(
        'border-gray-300',
        'bg-gray-50',
        'cursor-not-allowed',
        'opacity-60'
      );
    } else if (dragState.isOver) {
      if (dragState.canDrop) {
        baseClasses.push(
          'border-green-400',
          'bg-green-50',
          'border-solid'
        );
      } else {
        baseClasses.push(
          'border-red-400',
          'bg-red-50',
          'border-solid'
        );
      }
    } else {
      baseClasses.push(
        'border-gray-400',
        'bg-white',
        'hover:border-blue-400',
        'hover:bg-blue-50'
      );
    }

    return baseClasses.join(' ');
  }, [compact, disabled, dragState]);

  if (compact) {
    return (
      <div
        className={`${getDropZoneClasses()} ${className}`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {children}
      </div>
    );
  }

  return (
    <Card className={`file-drop-zone-card ${className}`}>
      <CardContent>
        <div
          className={getDropZoneClasses()}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {children}

          {showHelper && !children && (
            <div className="drag-drop-helper">
              <div className="upload-icon" style={{ marginBottom: '16px' }}>
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ margin: '0 auto', opacity: disabled ? 0.4 : 0.6 }}
                >
                  <path
                    d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <polyline
                    points="14,2 14,8 20,8"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <line
                    x1="16"
                    y1="13"
                    x2="8"
                    y2="13"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <line
                    x1="12"
                    y1="17"
                    x2="12"
                    y2="9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <Text variant="body" weight="medium" color={disabled ? 'disabled' : 'primary'}>
                {dragState.isOver
                  ? dragState.canDrop
                    ? t('file.drop.zone.drop.here')
                    : t('file.drop.zone.invalid.files')
                  : t('file.drop.zone.instruction')
                }
              </Text>

              <Text variant="caption" color="secondary" style={{ marginTop: '8px' }}>
                {t('file.drop.zone.accepted.formats', {
                  formats: formatAcceptedTypes(),
                  maxFiles
                })}
              </Text>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};