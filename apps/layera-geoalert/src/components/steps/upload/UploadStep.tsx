/**
 * UploadStep.tsx - Enterprise Modular Upload Step
 *
 * 🏗️ ENTERPRISE LEGO INTEGRATION:
 * Χρησιμοποιεί @layera/file-upload για enterprise-grade upload functionality
 * Drag & Drop, chunked upload, progress tracking, validation, retry
 */

// React imports
import React, { useCallback, useState } from 'react';

// Enterprise LEGO Design System imports
import { SPACING_SCALE, getCardInfoColor } from '@layera/constants';
import { FileUploader, DEFAULT_UPLOAD_CONFIG } from '@layera/file-upload';
import { CheckIcon, ArrowRightIcon } from '@layera/icons';
import { Flex } from '@layera/layout';
import { useLayeraTranslation } from '@layera/tolgee';
import { Text } from '@layera/typography';

// Enhanced LEGO BaseCard με unified features
import { BaseCard } from '@layera/cards';
import { Box } from '@layera/layout';
import type { StepProps } from '../types';
import type { UploadedFile, UploadStepData } from './types';
import type { FileUploadItem, FileUploadConfig } from '@layera/file-upload';

export interface UploadStepProps extends StepProps {
  /** File upload callback */
  onFilesUploaded?: (files: UploadedFile[]) => void;
}

/**
 * Enterprise Upload Step - Καθαρό modular component για File Upload
 */
export const UploadStep: React.FC<UploadStepProps> = React.memo(({
  context,
  onNext,
  onStepComplete,
  onFilesUploaded,
  isVisible = true,
  deviceProps = {}
}) => {
  const { t } = useLayeraTranslation();
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [showFileUploader, setShowFileUploader] = useState(false);

  // Enterprise Upload Configuration
  const uploadConfig: FileUploadConfig = {
    ...DEFAULT_UPLOAD_CONFIG,
    maxFileSize: 50 * 1024 * 1024, // 50MB για real estate files
    maxTotalSize: 200 * 1024 * 1024, // 200MB total
    maxConcurrent: 2, // Mobile-optimized
    autoUpload: false, // User-controlled upload
    acceptedTypes: [
      'image/jpeg', 'image/png', 'image/webp', // Φωτογραφίες ακινήτων
      'application/pdf', // Έγγραφα
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ]
  };

  // Convert LEGO FileUploadItem to our UploadedFile format
  const convertToUploadedFile = useCallback((fileItem: FileUploadItem): UploadedFile => ({
    id: fileItem.id,
    name: fileItem.file.name,
    size: fileItem.file.size,
    type: fileItem.file.type,
    url: URL.createObjectURL(fileItem.file)
  }), []);

  const handleUploadComplete = useCallback((fileItem: FileUploadItem) => {
    const uploadedFile = convertToUploadedFile(fileItem);
    setUploadedFiles(prev => {
      const updated = [...prev, uploadedFile];
      onFilesUploaded?.(updated);
      return updated;
    });
  }, [convertToUploadedFile, onFilesUploaded]);

  const handleAllUploadsComplete = useCallback((completedFiles: FileUploadItem[]) => {
    const finalFiles = completedFiles.map(convertToUploadedFile);
    setUploadedFiles(finalFiles);
    onFilesUploaded?.(finalFiles);
  }, [convertToUploadedFile, onFilesUploaded]);

  const handleShowUploader = useCallback(() => {
    setShowFileUploader(true);
  }, []);

  const handleContinue = useCallback(async () => {
    try {
      // Ενημερώνουμε το StepOrchestrator
      if (onStepComplete) {
        const stepData: UploadStepData = {
          uploadedFiles,
          totalFiles: uploadedFiles.length,
          totalSize: uploadedFiles.reduce((sum, file) => sum + file.size, 0)
        };
        onStepComplete('upload', stepData);
      }

      // Auto-advance
      setTimeout((): void => {
        onNext?.();
      }, 300);

    } catch (error) {
      console.error('Upload step completion failed:', error);
    }
  }, [uploadedFiles, onStepComplete, onNext]);

  const handleSkip = useCallback(async () => {
    try {
      // Ενημερώνουμε το StepOrchestrator με κενά files
      if (onStepComplete) {
        const stepData: UploadStepData = {
          uploadedFiles: [],
          totalFiles: 0,
          totalSize: 0
        };
        onStepComplete('upload', stepData);
      }

      // Auto-advance
      setTimeout((): void => {
        onNext?.();
      }, 300);

    } catch (error) {
      console.error('Upload skip failed:', error);
    }
  }, [onStepComplete, onNext]);

  if (!isVisible) {
    return null;
  }

  return (
    <Flex
      direction="column"
      position="fixed"
      top="var(--la-cards-top)"
      left="var(--la-side-margins)"
      right="var(--la-side-margins)"
      zIndex={10002}
      gap="var(--la-cards-gap)"
      padding="none"
    >
      {!showFileUploader ? (
        <>
          {/* Show Upload Card */}
          <BaseCard
            className="layera-card-uniform"
            title={t('upload.title', 'Ανέβασμα Αρχείων')}
            description={t('upload.description', 'Προσθέστε φωτογραφίες και έγγραφα')}
            icon={<CheckIcon size="sm" theme="neutral" />}
            onClick={handleShowUploader}
            style={{ backgroundColor: getCardInfoColor() }} // 🔴 SST: Upload card color από μοναδική πηγή αλήθειας
            data-testid="upload-show-card"
          />

          {/* Skip Card */}
          <BaseCard
            variant="neutral"
            className="layera-card-uniform"
            title={t('upload.skip', 'Παράλειψη')}
            description={t('upload.skipDescription', 'Συνέχεια χωρίς αρχεία')}
            icon={<ArrowRightIcon size="sm" theme="neutral" />}
            onClick={handleSkip}
            data-testid="upload-skip-card"
          />
        </>
      ) : (
        <>
          {/* Enterprise LEGO FileUploader */}
          <Box
            background="var(--color-bg-surface-strong)"
            borderRadius="var(--la-space-sm-plus-xs-radius)" // 🎯 SST: Complex border radius token
            padding="md"
            marginBottom="sm"
          >
            <FileUploader
              config={uploadConfig}
              onUploadComplete={handleUploadComplete}
              onAllUploadsComplete={handleAllUploadsComplete}
              onUploadError={(file, error) => {
                console.error(`Upload error for ${file.file.name}:`, error);
              }}
              className="layera-upload-step"
            />
          </Box>

          {/* Files Counter */}
          {uploadedFiles.length > 0 && (
            <BaseCard
              variant="success"
              className="layera-card-uniform"
              padding="sm"
              marginBottom="sm"
            >
              <Text size="sm" color="success">
                ✅ {uploadedFiles.length} {t('upload.filesCompleted', 'αρχεία ολοκληρώθηκαν')}
              </Text>
            </BaseCard>
          )}

          {/* Continue Card */}
          {uploadedFiles.length > 0 && (
            <BaseCard
              variant="success"
              className="layera-card-uniform"
              title={t('upload.continue', 'Συνέχεια')}
              description={t('upload.continueDescription', 'Συνέχεια με τα επιλεγμένα αρχεία')}
              icon={<CheckIcon size="sm" theme="neutral" />}
              onClick={handleContinue}
              data-testid="upload-continue-card"
            />
          )}

          {/* Skip Card */}
          <BaseCard
            variant="neutral"
            className="layera-card-uniform"
            title={t('upload.skip', 'Παράλειψη')}
            description={t('upload.skipDescription', 'Συνέχεια χωρίς αρχεία')}
            icon={<ArrowRightIcon size="sm" theme="neutral" />}
            onClick={handleSkip}
            data-testid="upload-skip-card"
          />

          {/* Back Card */}
          <BaseCard
            variant="neutral"
            className="layera-card-uniform"
            title={t('actions.back')}
            description={t('actions.backToMenu')}
            onClick={(): void => setShowFileUploader(false)}
            data-testid="upload-back-card"
          />
        </>
      )}
    </Flex>
  );
})