/**
 * UploadCard.tsx - Enterprise File Upload με @layera/file-upload LEGO System
 */

import React from 'react';
import { FileUploader, DEFAULT_UPLOAD_CONFIG } from '@layera/file-upload';
import type { FileUploadConfig, FileUploadItem } from '@layera/file-upload';
import type { UploadOptions } from './types';

interface UploadCardProps {
  title: string;
  description?: string;
  options?: UploadOptions;
  onFilesSelected: (files: FileUploadItem[]) => void;
  'data-testid'?: string;
}

export const UploadCard: React.FC<UploadCardProps> = ({
  title,
  description,
  options = {},
  onFilesSelected,
  'data-testid': testId
}) => {
  // Configure upload με enterprise settings
  const uploadConfig: FileUploadConfig = {
    ...DEFAULT_UPLOAD_CONFIG,
    acceptedTypes: options?.acceptedTypes || DEFAULT_UPLOAD_CONFIG.acceptedTypes,
    maxFileSize: options?.maxFileSize || DEFAULT_UPLOAD_CONFIG.maxFileSize,
    autoUpload: false, // Manual control
    uploadUrl: '/api/upload' // Default upload endpoint
  };

  const handleFilesAdded = (files: File[]) => {
    console.log(`📎 Files added to upload queue: ${files.length} files`);
    // Convert File[] to FileList for backward compatibility if needed
    // In a real enterprise system, this would be handled by the parent component
    const fileList = files as unknown as FileList;
    onFilesSelected(fileList);
  };

  const handleUploadComplete = (file: FileUploadItem) => {
    console.log(`✅ Upload completed for file: ${file.file.name}`, file.response);
  };

  const handleUploadError = (file: FileUploadItem, error: string) => {
    console.error(`❌ Upload failed for file: ${file.file.name}`, error);
  };

  return (
    <div data-testid={testId} className="upload-card-container">
      <FileUploader
        config={uploadConfig}
        onUploadComplete={handleUploadComplete}
        onUploadError={handleUploadError}
        className="layera-upload-card"
        disabled={false}
      />
    </div>
  );
};