import React, { useState } from 'react';
import { Text, Heading } from '@layera/typography';
import { Stack } from '@layera/layout';
import { FormField, Input, TextArea, FormActions } from '@layera/forms';
import { Button } from '@layera/buttons';
import { useLayeraTranslation } from '@layera/tolgee';

export interface DetailsData {
  title: string;
  description: string;
  price?: number;
  salary?: number;
  contactInfo: string;
}

export interface DetailsStepProps {
  category: 'property' | 'job';
  intent: 'offer' | 'search';
  onNext: (details: DetailsData) => void;
  onBack: () => void;
}

/**
 * DetailsStep - Enterprise LEGO Component
 *
 * 🚨 LEGACY/DEPRECATED - ΜΟΝΟ ΓΙΑ ΑΝΑΦΟΡΑ! 🚨
 *
 * ⚠️ ΑΠΑΓΟΡΕΥΕΤΑΙ η τροποποίηση αυτού του αρχείου! ⚠️
 * ⚠️ ΑΠΑΓΟΡΕΥΕΤΑΙ η χρήση κώδικα από εδώ στο modular system! ⚠️
 *
 * Αυτό το component είναι ΜΟΝΟ για το unified pipeline modal (λευκές κάρτες).
 * Χρησιμοποιείται ως ΑΝΑΦΟΡΑ για το migration και θα ΔΙΑΓΡΑΦΕΙ μόλις
 * ολοκληρωθεί το νέο modular step system με τις διαφανείς κάρτες.
 *
 * ⛔ ΜΗ ΧΡΗΣΙΜΟΠΟΙΕΙΤΕ ΚΩΔΙΚΑ ΑΠΟ ΕΔΩ ΣΤΟ MODULAR SYSTEM!
 * ✅ Για modular steps: apps/layera-geoalert/src/components/steps/
 *
 * Original Purpose: Additional details form
 * Complexity: Low (< 15)
 * Lines: < 100 (Enterprise Standard)
 * Dependencies: ONLY @layera LEGO systems
 */
export const DetailsStep: React.FC<DetailsStepProps> = ({ category, intent, onNext, onBack }) => {
  const { t } = useLayeraTranslation();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number | undefined>();
  const [salary, setSalary] = useState<number | undefined>();
  const [contactInfo, setContactInfo] = useState('');

  const isProperty = category === 'property';
  const isOffer = intent === 'offer';

  const handleNext = () => {
    if (title && description && contactInfo) {
      onNext({
        title,
        description,
        price: isProperty ? price : undefined,
        salary: !isProperty ? salary : undefined,
        contactInfo
      });
    }
  };

  const isValid = title && description && contactInfo;

  return (
    <Stack spacing="lg">
      <Heading as="h2" size="xl" color="primary">
        {t('pipelines.steps.details.title', {
          type: isProperty ? t('pipelines.steps.details.property') : t('pipelines.steps.details.job')
        })}
      </Heading>

      <Text size="lg" color="secondary">
        {t('pipelines.steps.details.subtitle', {
          intent: isOffer ? t('pipelines.steps.details.offer') : t('pipelines.steps.details.search')
        })}
      </Text>

      <Stack spacing="md">
        <FormField label={t('pipelines.steps.details.fields.title')} required>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={
              isProperty
                ? t('pipelines.steps.details.placeholders.propertyTitle')
                : t('pipelines.steps.details.placeholders.jobTitle')
            }
            size="lg"
            variant="outline"
          />
        </FormField>

        <FormField label={t('pipelines.steps.details.fields.description')} required>
          <TextArea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={t('pipelines.steps.details.placeholders.description')}
            rows={4}
            size="lg"
            variant="outline"
          />
        </FormField>

        {isProperty && (
          <FormField label={t('pipelines.steps.details.fields.price')} required={isOffer}>
            <Input
              type="number"
              value={price || ''}
              onChange={(e) => setPrice(e.target.value ? parseInt(e.target.value) : undefined)}
              placeholder={t('pipelines.steps.details.placeholders.price')}
              size="lg"
              variant="outline"
            />
          </FormField>
        )}

        {!isProperty && (
          <FormField label={t('pipelines.steps.details.fields.salary')} required={isOffer}>
            <Input
              type="number"
              value={salary || ''}
              onChange={(e) => setSalary(e.target.value ? parseInt(e.target.value) : undefined)}
              placeholder={t('pipelines.steps.details.placeholders.salary')}
              size="lg"
              variant="outline"
            />
          </FormField>
        )}

        <FormField label={t('pipelines.steps.details.fields.contactInfo')} required>
          <Input
            type="text"
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
            placeholder={t('pipelines.steps.details.placeholders.contact')}
            size="lg"
            variant="outline"
          />
        </FormField>
      </Stack>

      <FormActions>
        <Button
          variant="outline"
          size="lg"
          onClick={onBack}
        >
          {t('pipelines.actions.back')}
        </Button>
        <Button
          variant="primary"
          size="lg"
          onClick={handleNext}
          disabled={!isValid}
        >
          {t('pipelines.actions.continue')}
        </Button>
      </FormActions>
    </Stack>
  );
};