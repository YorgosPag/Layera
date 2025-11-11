import React from 'react';
import { BuildingIcon, SearchIcon, EuroIcon, StoreIcon } from '../../../../packages/icons/src';
import { Box } from '../../../../packages/layout/src';
import { Text, Heading } from '../../../../packages/typography/src';
import { useLayeraTranslation } from '@layera/tolgee';

const RealEstatePage: React.FC = () => {
  const { t } = useLayeraTranslation();

  return (
    <Box className="layera-padding--lg">
      <Box className="layera-text-center layera-margin-bottom--lg">
        <Text size="lg" color="secondary" lineHeight="normal">
          {t('realEstate.subtitle')}
        </Text>
      </Box>

      <Box className="layera-grid layera-grid--cols-1 layera-grid--tablet-cols-2 layera-grid--desktop-cols-3 layera-grid--gap-lg">
        {/* Search Card */}
        <Box className="layera-card layera-bg-surface-medium">
          <Box className="layera-text-3xl layera-margin-bottom--md">
            <SearchIcon size="md" />
          </Box>
          <Heading as="h3" size="xl" weight="semibold" color="primary" lineHeight="snug" className="layera-margin-bottom--sm">{t('realEstate.search.title')}</Heading>
          <Text size="base" color="secondary" lineHeight="normal" className="layera-margin-bottom--md">
            {t('realEstate.search.subtitle')}
          </Text>
          <Box as="button" className="layera-full-width layera-padding--md layera-bg-accent-blue layera-text-white">
            {t('realEstate.search.button')}
          </Box>
        </Box>

        {/* Sell Card */}
        <Box className="layera-card layera-bg-surface-medium">
          <Box className="layera-text-3xl layera-margin-bottom--md">
            <EuroIcon size="md" />
          </Box>
          <Heading as="h3" size="xl" weight="semibold" color="primary" lineHeight="snug" className="layera-margin-bottom--sm">{t('realEstate.sale.title')}</Heading>
          <Text size="base" color="secondary" lineHeight="normal" className="layera-margin-bottom--md">
            {t('realEstate.sale.subtitle')}
          </Text>
          <Box as="button" className="layera-full-width layera-padding--md layera-bg-accent-green layera-text-white">
            {t('realEstate.sale.button')}
          </Box>
        </Box>

        {/* Rent Card */}
        <Box className="layera-card layera-bg-surface-medium">
          <Box className="layera-text-3xl layera-margin-bottom--md">
            <StoreIcon size="md" />
          </Box>
          <Heading as="h3" size="xl" weight="semibold" color="primary" lineHeight="snug" className="layera-margin-bottom--sm">{t('realEstate.rent.title')}</Heading>
          <Text size="base" color="secondary" lineHeight="normal" className="layera-margin-bottom--md">
            {t('realEstate.rent.subtitle')}
          </Text>
          <Box as="button" className="layera-full-width layera-padding--md layera-bg-accent-purple layera-text-white">
            {t('realEstate.rent.button')}
          </Box>
        </Box>
      </Box>

    </Box>
  );
};

export default RealEstatePage;