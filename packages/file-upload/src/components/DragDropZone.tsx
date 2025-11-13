import React from 'react';
import { Box } from '@layera/layout';

interface DragDropZoneProps {
  enabled?: boolean;
  acceptedTypes?: string[];
  maxFiles?: number;
  dropZoneText?: string;
  onFilesDrop?: (files: File[]) => void;
  className?: string;
  multiple?: boolean;
  children?: React.ReactNode;
}

export const DragDropZone: React.FC<DragDropZoneProps> = ({
  enabled = true,
  acceptedTypes = [],
  maxFiles,
  dropZoneText,
  onFilesDrop,
  className = '',
  multiple = true,
  children
}) => {
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0 && onFilesDrop) {
      const limitedFiles = maxFiles ? files.slice(0, maxFiles) : files;
      const validFiles = acceptedTypes.length === 0 ? limitedFiles :
        limitedFiles.filter(file => acceptedTypes.includes(file.type));
      onFilesDrop(validFiles);
    }
    e.target.value = '';
  };

  return (
    <Box className={`layera-drag-drop-zone ${className}`}>
      <input
        type="file"
        multiple={multiple}
        accept={acceptedTypes.join(',')}
        onChange={handleFileInputChange}
        disabled={!enabled}
        className="layera-file-input-hidden"
      />
      <Box className="layera-drop-zone-content">
        {children || (
          <p className="layera-drop-zone-text">
            {dropZoneText || 'Drag and drop files here or click to select'}
          </p>
        )}
      </Box>
    </Box>
  );
};