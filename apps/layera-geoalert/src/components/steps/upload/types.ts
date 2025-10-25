/**
 * upload/types.ts - Enterprise Upload Step Types
 */

import type { SupportedFileType } from '@layera/file-upload';

export interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url?: string;
  preview?: string;
}

export interface UploadStepData {
  uploadedFiles: UploadedFile[];
  totalFiles: number;
  totalSize: number;
}

export interface UploadOptions {
  maxFiles?: number;
  maxFileSize?: number;
  acceptedTypes?: SupportedFileType[];
  multiple?: boolean;
}