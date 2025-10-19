import type { SupportedFileType, FileValidationResult, FileUploadConfig } from '../types';
// import { CONFIG } from '@layera/constants'; // Will use constants directly for now

/**
 * File validation utilities για @layera/file-upload
 * Enterprise-grade validation με comprehensive error handling
 */

/**
 * Validates a single file against configuration
 */
export const validateFile = (
  file: File,
  config: FileUploadConfig
): FileValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];

  // File size validation
  if (file.size > config.maxFileSize) {
    errors.push(`File size (${formatBytes(file.size)}) exceeds maximum allowed size (${formatBytes(config.maxFileSize)})`);
  }

  // File type validation
  if (!config.acceptedTypes.includes(file.type as SupportedFileType)) {
    errors.push(`File type "${file.type}" is not supported`);
  }

  // File name validation
  if (!isValidFileName(file.name)) {
    errors.push('File name contains invalid characters');
  }

  // Security checks
  const securityCheck = performSecurityValidation(file);
  if (!securityCheck.isValid) {
    errors.push(...securityCheck.errors);
  }

  // Performance warnings
  const largeFileThreshold = 50 * 1024 * 1024; // 50MB
  if (file.size > largeFileThreshold) {
    warnings.push('Large file detected - upload may take longer');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
};

/**
 * Validates multiple files against total size limits
 */
export const validateFileList = (
  files: File[],
  config: FileUploadConfig
): FileValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Total size validation
  const totalSize = files.reduce((sum, file) => sum + file.size, 0);
  if (totalSize > config.maxTotalSize) {
    errors.push(`Total size (${formatBytes(totalSize)}) exceeds maximum allowed (${formatBytes(config.maxTotalSize)})`);
  }

  // Individual file validation
  files.forEach((file, index) => {
    const fileValidation = validateFile(file, config);
    if (!fileValidation.isValid) {
      errors.push(`File ${index + 1} (${file.name}): ${fileValidation.errors.join(', ')}`);
    }
    warnings.push(...fileValidation.warnings);
  });

  // Duplicate file names
  const duplicates = findDuplicateFileNames(files);
  if (duplicates.length > 0) {
    warnings.push(`Duplicate file names detected: ${duplicates.join(', ')}`);
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
};

/**
 * Validates file name for security and compatibility
 */
const isValidFileName = (fileName: string): boolean => {
  // Check for dangerous characters
  const dangerousChars = /[<>:"|?*\x00-\x1f]/;
  if (dangerousChars.test(fileName)) {
    return false;
  }

  // Check for reserved names (Windows)
  const reservedNames = /^(CON|PRN|AUX|NUL|COM[1-9]|LPT[1-9])(\.|$)/i;
  if (reservedNames.test(fileName)) {
    return false;
  }

  // Check length
  const maxFileNameLength = 255; // Standard filesystem limit
  if (fileName.length > maxFileNameLength) {
    return false;
  }

  return true;
};

/**
 * Performs security validation on file
 */
const performSecurityValidation = (file: File): FileValidationResult => {
  const errors: string[] = [];

  // Check file extension vs MIME type consistency
  const extension = getFileExtension(file.name);
  const expectedMimeTypes = getExpectedMimeTypes(extension);

  if (expectedMimeTypes.length > 0 && !expectedMimeTypes.includes(file.type)) {
    errors.push(`File extension "${extension}" does not match MIME type "${file.type}"`);
  }

  // Check for executable files
  const executableExtensions = ['.exe', '.bat', '.cmd', '.scr', '.pif', '.com', '.dll'];
  if (executableExtensions.some(ext => file.name.toLowerCase().endsWith(ext))) {
    errors.push('Executable files are not allowed');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings: []
  };
};

/**
 * Gets file extension from filename
 */
const getFileExtension = (fileName: string): string => {
  const lastDotIndex = fileName.lastIndexOf('.');
  return lastDotIndex !== -1 ? fileName.substring(lastDotIndex) : '';
};

/**
 * Gets expected MIME types for file extension
 */
const getExpectedMimeTypes = (extension: string): string[] => {
  const mimeMap: Record<string, string[]> = {
    '.jpg': ['image/jpeg'],
    '.jpeg': ['image/jpeg'],
    '.png': ['image/png'],
    '.gif': ['image/gif'],
    '.pdf': ['application/pdf'],
    '.txt': ['text/plain'],
    '.csv': ['text/csv'],
    '.json': ['application/json'],
    '.xml': ['application/xml', 'text/xml'],
    '.zip': ['application/zip'],
    '.dxf': ['image/vnd.dxf', 'application/dxf']
  };

  return mimeMap[extension.toLowerCase()] || [];
};

/**
 * Finds duplicate file names in file list
 */
const findDuplicateFileNames = (files: File[]): string[] => {
  const nameCount: Record<string, number> = {};
  const duplicates: string[] = [];

  files.forEach(file => {
    nameCount[file.name] = (nameCount[file.name] || 0) + 1;
  });

  Object.entries(nameCount).forEach(([name, count]) => {
    if (count > 1) {
      duplicates.push(name);
    }
  });

  return duplicates;
};

/**
 * Formats file size in human readable format
 */
export const formatBytes = (bytes: number, decimals: number = 2): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

/**
 * Checks if file is an image
 */
export const isImageFile = (file: File): boolean => {
  return file.type.startsWith('image/');
};

/**
 * Checks if file preview is supported
 */
export const isPreviewSupported = (file: File): boolean => {
  const supportedTypes = [
    'image/jpeg', 'image/png', 'image/gif', 'image/webp',
    'text/plain', 'application/json', 'text/csv'
  ];

  return supportedTypes.includes(file.type);
};