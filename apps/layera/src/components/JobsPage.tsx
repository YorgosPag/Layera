import React from 'react';
import { BriefcaseIcon, SearchIcon, EditIcon, FolderIcon } from '../../../../packages/icons/src';
import { Box } from '../../../../packages/layout/src';
import { Text, Heading } from '../../../../packages/typography/src';
import { useLayeraTranslation } from '@layera/tolgee';

const JobsPage: React.FC = () => {
  const { t } = useLayeraTranslation();

  return (
    <Box className="layera-padding--lg">
      <Box className="layera-text-center layera-margin-bottom--lg">
        <Text size="lg" color="secondary" lineHeight="normal">
          {t('jobs.subtitle')}
        </Text>
      </Box>

          <Box className="layera-grid layera-grid--cols-1 layera-grid--tablet-cols-2 layera-grid--desktop-cols-3 layera-grid--gap-lg">
            {/* Search Jobs Card */}
            <Box className="layera-card layera-bg-surface-medium">
              <Box className="layera-text-3xl layera-margin-bottom--md">
                <SearchIcon size="md" />
              </Box>
              <Heading as="h3" size="xl" weight="semibold" color="primary" lineHeight="snug" className="layera-margin-bottom--sm">{t('jobs.search.title')}</Heading>
              <Text size="base" color="secondary" lineHeight="normal" className="layera-margin-bottom--md">
                {t('jobs.search.subtitle')}
              </Text>
              <Box as="button" className="layera-full-width layera-padding--md layera-bg-accent-green layera-text-white">
                {t('jobs.search.button')}
              </Box>
            </Box>

            {/* Post Job Card */}
            <Box className="layera-card layera-bg-surface-medium">
              <Box className="layera-text-3xl layera-margin-bottom--md">
                <EditIcon size="md" />
              </Box>
              <Heading as="h3" size="xl" weight="semibold" color="primary" lineHeight="snug" className="layera-margin-bottom--sm">{t('jobs.posting.title')}</Heading>
              <Text size="base" color="secondary" lineHeight="normal" className="layera-margin-bottom--md">
                {t('jobs.posting.subtitle')}
              </Text>
              <Box as="button" className="layera-full-width layera-padding--md layera-bg-accent-blue layera-text-white">
                {t('jobs.posting.button')}
              </Box>
            </Box>

            {/* Browse Categories Card */}
            <Box className="layera-card layera-bg-surface-medium">
              <Box className="layera-text-3xl layera-margin-bottom--md">
                <FolderIcon size="md" />
              </Box>
              <Heading as="h3" size="xl" weight="semibold" color="primary" lineHeight="snug" className="layera-margin-bottom--sm">{t('jobs.categories.title')}</Heading>
              <Text size="base" color="secondary" lineHeight="normal" className="layera-margin-bottom--md">
                {t('jobs.categories.subtitle')}
              </Text>
              <Box as="button" className="layera-full-width layera-padding--md layera-bg-accent-purple layera-text-white">
                {t('jobs.categories.button')}
              </Box>
            </Box>
      </Box>

    </Box>
  );
};

export default JobsPage;