import React, { useState } from 'react';
import { Text, Heading } from '@layera/typography';
import { Stack } from '@layera/layout';
import { FormField, Input, TextArea, FormActions } from '@layera/forms';
import { Button } from '@layera/buttons';

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
 * Purpose: Additional details form
 * Complexity: Low (< 15)
 * Lines: < 100 (Enterprise Standard)
 * Dependencies: ONLY @layera LEGO systems
 */
export const DetailsStep: React.FC<DetailsStepProps> = ({ category, intent, onNext, onBack }) => {
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
        Λεπτομέρειες {isProperty ? 'Ακινήτου' : 'Εργασίας'}
      </Heading>

      <Text size="lg" color="secondary">
        Συμπληρώστε τις λεπτομέρειες για {isOffer ? 'την προσφορά σας' : 'την αναζήτησή σας'}
      </Text>

      <Stack spacing="md">
        <FormField label="Τίτλος" required>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={
              isProperty
                ? "π.χ. Διαμέρισμα 85τμ στο Κολωνάκι"
                : "π.χ. Frontend Developer με React"
            }
            size="lg"
            variant="outline"
          />
        </FormField>

        <FormField label="Περιγραφή" required>
          <TextArea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Περιγράψτε αναλυτικά..."
            rows={4}
            size="lg"
            variant="outline"
          />
        </FormField>

        {isProperty && (
          <FormField label="Τιμή (€)" required={isOffer}>
            <Input
              type="number"
              value={price || ''}
              onChange={(e) => setPrice(e.target.value ? parseInt(e.target.value) : undefined)}
              placeholder="π.χ. 250000"
              size="lg"
              variant="outline"
            />
          </FormField>
        )}

        {!isProperty && (
          <FormField label="Μισθός (€)" required={isOffer}>
            <Input
              type="number"
              value={salary || ''}
              onChange={(e) => setSalary(e.target.value ? parseInt(e.target.value) : undefined)}
              placeholder="π.χ. 2500"
              size="lg"
              variant="outline"
            />
          </FormField>
        )}

        <FormField label="Στοιχεία Επικοινωνίας" required>
          <Input
            type="text"
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
            placeholder="π.χ. email@example.com ή +30 6912345678"
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
          Πίσω
        </Button>
        <Button
          variant="primary"
          size="lg"
          onClick={handleNext}
          disabled={!isValid}
        >
          Συνέχεια
        </Button>
      </FormActions>
    </Stack>
  );
};