import React from 'react';
import { BaseCard } from '@layera/cards';
import { Text, Heading } from '@layera/typography';
import { Stack, Flex } from '@layera/layout';
import { Button } from '@layera/buttons';
import { FormActions } from '@layera/forms';
import { UploadIcon, MapIcon } from '@layera/icons';

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
  return (
    <Stack spacing="md">
      <Heading as="h3" size="lg" color="primary">
        Τοποθεσία & Κάτοψη
      </Heading>

      {/* Property + Offer + Now = File Upload, everything else = Drawing */}
      {category === 'property' && intent === 'offer' && availability === 'now' ? (
        <Stack spacing="md">
          <Text size="base" color="secondary">
            Φορτώστε το αρχείο με την κάτοψη του ακινήτου:
          </Text>
          <BaseCard
            clickable
            onClick={() => {
              // TODO: File upload logic
              onNext();
            }}
            variant="outlined"
            size="lg"
            padding="lg"
            hoverable
            className="layera-unified-card"
          >
            <Flex align="start" gap="lg">
              <UploadIcon size="xl" theme="primary" />
              <Stack spacing="xs" style={{ flex: 1, minWidth: 0 }}>
                <Text size="xl" weight="bold" className="card-title">Επιλογή Αρχείου</Text>
                <Text size="base" color="secondary" className="card-text">
                  Κάντε κλικ για να ανεβάσετε την κάτοψη
                </Text>
              </Stack>
            </Flex>
          </BaseCard>
        </Stack>
      ) : (
        <Stack spacing="md">
          <Text size="base" color="secondary">
            {intent === 'offer'
              ? 'Σχεδιάστε την περιοχή του ακινήτου/εργασίας:'
              : 'Σχεδιάστε την περιοχή αναζήτησης:'
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
                <Text size="xl" weight="bold" className="card-title">Ανοίγμα Εργαλείου Σχεδίασης</Text>
                <Text size="base" color="secondary" className="card-text">
                  Κάντε κλικ για να σχεδιάσετε στον χάρτη
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
          Πίσω
        </Button>
      </FormActions>
    </Stack>
  );
};