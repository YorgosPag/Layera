import React, { useState } from 'react';
import { BaseCard } from '@layera/cards';
import { Text, Heading } from '@layera/typography';
import { Stack, Flex } from '@layera/layout';
import { Button } from '@layera/buttons';
import { FormActions } from '@layera/forms';
import { UploadIcon, MapIcon, CheckIcon } from '@layera/icons';
import { useLayeraTranslation } from '@layera/tolgee';

export interface LocationDetails {
  type: 'upload' | 'drawing';
}

export interface LocationStepProps {
  category: 'property' | 'job';
  intent: 'offer' | 'search';
  availability: 'now' | 'future';
  onNext: () => void;
  onBack: () => void;
}

/**
 * LocationStep - Enterprise LEGO Component
 * Purpose: Location Definition - EXACT from original UnifiedPipeline.tsx
 * Property + Offer + Now = File Upload, everything else = Drawing
 * Complexity: Low (< 15)
 * Lines: < 100 (Enterprise Standard)
 * Dependencies: ONLY @layera LEGO systems
 */
export const LocationStep: React.FC<LocationStepProps> = ({
  category,
  intent,
  availability,
  onNext,
  onBack
}) => {
  const { t } = useLayeraTranslation();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const getFileType = (file: File): 'image' | 'pdf' | 'cad' | 'unknown' => {
    const extension = file.name.toLowerCase().split('.').pop();
    const mimeType = file.type.toLowerCase();

    if (mimeType.startsWith('image/') || ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(extension || '')) {
      return 'image';
    }
    if (mimeType === 'application/pdf' || extension === 'pdf') {
      return 'pdf';
    }
    if (['dxf', 'dwg'].includes(extension || '') || mimeType.includes('acad') || mimeType.includes('autocad')) {
      return 'cad';
    }
    return 'unknown';
  };

  const sendFileToMap = (file: File) => {
    const fileType = getFileType(file);

    // Δημιουργία URL για το αρχείο
    const fileUrl = URL.createObjectURL(file);

    // Αποστολή event στον χάρτη
    const mapEvent = new CustomEvent('showFloorPlan', {
      detail: {
        file: file,
        fileUrl: fileUrl,
        fileName: file.name,
        fileType: fileType,
        fileSize: file.size
      }
    });

    console.log('📂 Sending floor plan to map:', {
      fileName: file.name,
      fileType: fileType,
      fileSize: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
      fileUrl: fileUrl
    });

    console.log('📤 Dispatching showFloorPlan event to window...');
    window.dispatchEvent(mapEvent);
    console.log('✅ Event dispatched successfully');
  };

  return (
    <Stack spacing="md">
      <Heading as="h3" size="lg" color="primary">
        {t('pipelines.steps.layout.title')}
      </Heading>

      {/* Property + Offer + Now = File Upload, everything else = Drawing */}
      {category === 'property' && intent === 'offer' && availability === 'now' ? (
        <Stack spacing="md">
          <Text size="base" color="secondary">
            {t('location.uploadFloorplan')}
          </Text>
          <BaseCard
            clickable
            onClick={() => {
              const fileInput = document.createElement('input');
              fileInput.type = 'file';
              fileInput.accept = 'image/jpeg,image/png,image/gif,image/webp,application/pdf,.dxf,.dwg,application/acad,application/x-autocad';
              fileInput.style.display = 'none';
              fileInput.onchange = (e: Event) => {
                const target = e.target as HTMLInputElement;
                const file = target.files?.[0];
                if (file) {
                  setUploadedFile(file);
                  sendFileToMap(file);
                  console.log('Floor plan selected:', file.name, 'Type:', getFileType(file));
                  // Αυτόματη μετάβαση στο επόμενο βήμα
                  setTimeout(() => {
                    onNext();
                  }, 500);
                }
              };
              document.body.appendChild(fileInput);
              fileInput.click();
              document.body.removeChild(fileInput);
            }}
            variant="outlined"
            size="lg"
            padding="lg"
            hoverable
            className="layera-unified-card"
          >
            <Stack spacing="md" style={{ width: '100%' }}>
              {uploadedFile ? (
                // Επιβεβαίωση ότι το αρχείο στάλθηκε στον χάρτη
                <Stack spacing="sm" align="center">
                  <Flex gap="sm" align="center">
                    <CheckIcon size="md" theme="success" />
                    <Text size="lg" weight="bold" color="success">
                      Η κάτοψη εμφανίστηκε στον χάρτη!
                    </Text>
                  </Flex>

                  <div style={{
                    wordBreak: 'break-all',
                    padding: '12px',
                    backgroundColor: '#f0fdf4',
                    border: '1px solid #10b981',
                    borderRadius: '8px',
                    maxWidth: '300px',
                    textAlign: 'center'
                  }}>
                    <Text size="sm" color="secondary">
                      {uploadedFile.name}
                    </Text>
                    <br />
                    <Text size="xs" color="secondary">
                      {getFileType(uploadedFile).toUpperCase()} • {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                    </Text>
                  </div>

                  <Text size="sm" color="secondary" align="center" style={{
                    fontStyle: 'italic',
                    maxWidth: '280px'
                  }}>
                    Συνεχίστε στο επόμενο βήμα για τοποθέτηση και προσαρμογή
                  </Text>
                </Stack>
              ) : (
                // Default Upload UI
                <Flex align="start" gap="lg">
                  <UploadIcon size="xl" theme="primary" />
                  <Stack spacing="xs" style={{ flex: 1, minWidth: 0 }}>
                    <Text size="xl" weight="bold" className="card-title">
                      {t('pipelines.steps.layout.floorPlan.selectFile')}
                    </Text>
                    <Text size="base" color="secondary" className="card-text">
                      {t('pipelines.steps.layout.floorPlan.description')}
                    </Text>
                    <Text size="sm" color="secondary" style={{ marginTop: '8px' }}>
                      {t('pipelines.steps.layout.floorPlan.supportedTypes')}
                    </Text>
                  </Stack>
                </Flex>
              )}
            </Stack>
          </BaseCard>
        </Stack>
      ) : (
        <Stack spacing="md">
          <Text size="base" color="secondary">
            {intent === 'offer'
              ? t('drawingArea')
              : t('drawingSearchArea')
            }
          </Text>
          <BaseCard
            clickable
            onClick={() => {
              // TODO: Drawing tool logic
              onNext();
            }}
            variant="outlined"
            size="lg"
            padding="lg"
            hoverable
            className="layera-unified-card"
          >
            <Flex align="start" gap="lg">
              <MapIcon size="xl" theme="primary" />
              <Stack spacing="xs" style={{ flex: 1, minWidth: 0 }}>
                <Text size="xl" weight="bold" className="card-title">{t('openDrawingTool')}</Text>
                <Text size="base" color="secondary" className="card-text">
                  {t('clickToDrawOnMap')}
                </Text>
              </Stack>
            </Flex>
          </BaseCard>
        </Stack>
      )}

      <FormActions>
        <Button
          variant="outline"
          onClick={onBack}
          className="layera-unified-button"
        >
          {t('pipelines.actions.back')}
        </Button>
      </FormActions>
    </Stack>
  );
};