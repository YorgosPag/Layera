import React, { useState, useCallback } from 'react';
import { useLayeraTranslation } from '@layera/tolgee';
import { Box } from '@layera/layout';
import { SupportedFormat } from '../types';

// Simple implementation using proper @layera components
interface FileImporterProps {
  acceptedFormats: SupportedFormat[];
  onFilesImported?: (files: File[]) => void;
  onError?: (error: string) => void;
  disabled?: boolean;
  allowMultiple?: boolean;
  maxFileSize?: number;
  compact?: boolean;
}

export const FileImporter: React.FC<FileImporterProps> = ({
  acceptedFormats = [],
  onFilesImported,
  onError,
  disabled = false,
  allowMultiple = true,
  compact = false
}) => {
  const { t } = useLayeraTranslation();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 0) {
      setIsProcessing(true);
      try {
        onFilesImported?.(files);
      } catch (error) {
        onError?.(error instanceof Error ? error.message : 'Unknown error');
      } finally {
        setIsProcessing(false);
        event.target.value = '';
      }
    }
  }, [onFilesImported, onError]);

  const formatFileTypes = () => {
    if (acceptedFormats.length === 0) return '*';
    const extensions = acceptedFormats.map(format => {
      switch (format) {
        case 'dxf': return '.dxf';
        case 'dwg': return '.dwg';
        case 'png': return '.png';
        case 'jpg': return '.jpg,.jpeg';
        default: return `.${format}`;
      }
    });
    return extensions.join(',');
  };

  if (compact) {
    return (
      <Box className="layera-file-importer-compact">
        <input
          type="file"
          multiple={allowMultiple}
          accept={formatFileTypes()}
          onChange={handleFileInputChange}
          disabled={disabled || isProcessing}
          className="layera-file-input-hidden"
          id="file-input-compact"
        />
        <label htmlFor="file-input-compact">
          <button
            disabled={disabled || isProcessing}
            className="layera-file-select-button"
          >
{isProcessing ? t('file.import.processing') || 'Processing...' : t('file.import.select') || 'Select Files'}
          </button>
        </label>
      </Box>
    );
  }

  return (
    <Box className="layera-file-importer">
      <Box className="layera-file-importer-content">
        <input
          type="file"
          multiple={allowMultiple}
          accept={formatFileTypes()}
          onChange={handleFileInputChange}
          disabled={disabled || isProcessing}
          className="layera-file-input-hidden"
          id="file-input-full"
        />
        <label htmlFor="file-input-full">
          <Box className="layera-file-drop-zone">
            <Box className="layera-drop-zone-content">
              <h3 className="layera-file-import-title">{t('file.import.title', { fallback: 'Import Files'})}</h3>
              <p className="layera-file-import-instruction">
                {isProcessing
                  ? t('file.import.processing') || 'Processing...'
                  : t('file.import.instruction') || 'Click to select files or drag and drop'}
              </p>
              {acceptedFormats.length > 0 && (
                <p className="layera-accepted-formats">
                  {t('file.import.accepted', { fallback: 'Accepted formats'})}: {acceptedFormats.join(', ')}
                </p>
              )}
            </Box>
          </Box>
        </label>
      </Box>
    </Box>
  );
};