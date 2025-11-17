import React from 'react';
import { Box } from '../../../../packages/layout/src';
import { Drawer } from '@layera/modals';
import { LanguageSwitcher, useLayeraTranslation } from '@layera/tolgee';
import { ArrowLeftIcon } from '../../../../packages/icons/src';
import { Text, Heading } from '../../../../packages/typography/src';

/**
 * PropertyTypeDrawer Component
 *
 * ΑΠΑΡΑΒΑΤΟΣ ΌΡΟΣ: 100% ίδιο output με την αρχική Property Type Drawer ενότητα
 * Γραμμές 183-253 από το αρχικό AppContent.tsx
 */

interface PropertyTypeDrawerProps {
  open: boolean;
  onClose: () => void;
}

export const PropertyTypeDrawer: React.FC<PropertyTypeDrawerProps> = ({
  open,
  onClose
}) => {
  const { t } = useLayeraTranslation();

  return (
    <Drawer
      open={open}
      onClose={onClose}
      position="right"
      size="md"
      closeOnOverlayClick={false}
      closeOnEscape={false}
      preventBodyScroll={false}
      overlayClassName="pinned-overlay"
      aria-labelledby="property-type-selection-title"
    >
      <Box className="layera-padding--lg">
        {/* Header με κουμπί Πίσω */}
        <Box className="layera-flex layera-flex--align-center layera-flex--gap-md layera-margin-bottom--lg">
          <Box
            as="button"
            className="layera-typography"
            onClick={onClose}
            aria-label={t('navigation.back')}
          >
            <ArrowLeftIcon size="md" />
          </Box>
          <Heading
            id="property-type-selection-title"
            as="h2"
            size="xl"
            weight="bold"
            color="primary"
          >
            {t('realEstate.typeSelection.title')}
          </Heading>
        </Box>

        <Box className="layera-stack--spacing-lg">
          {/* Κάρτα "Θέλω να Προσφέρω" */}
          <Box
            as="button"
            className="layera-card layera-card--clickable layera-padding--md layera-text-left"
            onClick={() => {
              onClose();
              alert('Ανοίγει flow "Θέλω να Προσφέρω"');
            }}
          >
            <Heading as="h3" size="lg" weight="semibold" color="primary" className="layera-margin-bottom--sm">
              {t('realEstate.typeSelection.offer.title')}
            </Heading>
            <Text size="sm" color="secondary" lineHeight="normal">
              {t('realEstate.typeSelection.offer.subtitle')}
            </Text>
          </Box>

          {/* Κάρτα "Θέλω να Αναζητήσω (Geo-Alert)" */}
          <Box
            as="button"
            className="layera-card layera-card--clickable layera-padding--md layera-text-left"
            onClick={() => {
              onClose();
              alert('Ανοίγει flow "Θέλω να Αναζητήσω (Geo-Alert)"');
            }}
          >
            <Heading as="h3" size="lg" weight="semibold" color="primary" className="layera-margin-bottom--sm">
              {t('realEstate.typeSelection.search.title')}
            </Heading>
            <Text size="sm" color="secondary" lineHeight="normal">
              {t('realEstate.typeSelection.search.subtitle')}
            </Text>
          </Box>
        </Box>
      </Box>
    </Drawer>
  );
};