/**
 * OccupationCard - Professional occupation display component
 * Structured display για ESCO occupations με skills και details
 */

import React from 'react';
import { useLayeraTranslation } from '@layera/tolgee';
import { BaseCard } from '@layera/cards';
import { BriefcaseIcon, TagIcon, LevelIcon } from '@layera/icons';
import { Text, Heading } from '@layera/typography';
import { Stack, Flex, Box } from '@layera/layout';
import { SPACING_SCALE, BORDER_RADIUS_SCALE } from '@layera/constants';
import type { Occupation } from '../types/occupation';
import './OccupationCard.css';

export interface OccupationCardProps {
  /** Occupation data */
  occupation: Occupation;
  /** Card variant */
  variant?: 'full' | 'compact' | 'minimal';
  /** Selection state */
  isSelected?: boolean;
  /** Click handler */
  onClick?: (occupation: Occupation) => void;
  /** Show skills */
  showSkills?: boolean;
  /** Show employment types */
  showEmploymentTypes?: boolean;
  /** Custom styling */
  style?: React.CSSProperties;
}

/**
 * Professional Occupation Card Component
 * Displays ESCO occupation με structured information
 */
export const OccupationCard: React.FC<OccupationCardProps> = ({
  occupation,
  variant = 'full',
  isSelected = false,
  onClick,
  showSkills = true,
  showEmploymentTypes = true,
  style
}) => {
  const { t } = useLayeraTranslation();

  const handleClick = (): void => {
    if (onClick) {
      onClick(occupation);
    }
  };

  const getExperienceLevelColor = (level: string) => {
    switch (level) {
      case 'entry': return 'var(--la-color-green-500, var(--la-color-success))'; // Green
      case 'junior': return 'var(--la-color-blue-500, var(--la-color-primary))'; // Blue
      case 'mid': return 'var(--la-color-yellow-500, var(--la-color-warning))'; // Yellow
      case 'senior': return 'var(--la-color-red-500, var(--la-color-error))'; // Red
      case 'expert': return 'var(--la-color-purple-500, var(--la-color-accent))'; // Purple
      case 'executive': return 'var(--la-color-gray-700, var(--la-color-gray-dark))'; // Gray
      default: return 'var(--la-color-gray-500, var(--la-text-secondary))';
    }
  };

  const getExperienceLevelLabel = (level: string) => {
    const labels = {
      'entry': t('employment.experience.entry', 'Εισαγωγικό'),
      'junior': t('employment.experience.junior', 'Νέος'),
      'mid': t('employment.experience.mid', 'Μεσαίος'),
      'senior': t('employment.experience.senior', 'Έμπειρος'),
      'expert': t('employment.experience.expert', 'Ειδικός'),
      'executive': t('employment.experience.executive', 'Ανώτατο')
    };
    return labels[level as keyof typeof labels] || level;
  };

  const getEmploymentTypeLabel = (type: string) => {
    const labels = {
      'full_time': t('employment.type.fullTime', 'Πλήρης'),
      'part_time': t('employment.type.partTime', 'Μερική'),
      'contract': t('employment.type.contract', 'Σύμβαση'),
      'freelance': t('employment.type.freelance', 'Αυτόνομος'),
      'temporary': t('employment.type.temporary', 'Προσωρινή'),
      'seasonal': t('employment.type.seasonal', 'Εποχιακή'),
      'internship': t('employment.type.internship', 'Πρακτική'),
      'volunteer': t('employment.type.volunteer', 'Εθελοντική'),
      'remote': t('employment.type.remote', 'Εξ αποστάσεως'),
      'hybrid': t('employment.type.hybrid', 'Υβριδική')
    };
    return labels[type as keyof typeof labels] || type;
  };

  if (variant === 'minimal') {
    return (
      <BaseCard
        onClick={handleClick}
        className={`la-occupation-card-minimal ${isSelected ? 'la-selected' : ''} ${onClick ? 'la-clickable' : ''} ${style ? 'la-occupation-card-custom' : ''}`}
      >
        <Flex align="center" gap="sm">
          <BriefcaseIcon size="sm" theme="primary" />
          <Box flex={1}>
            <Text weight="medium">{occupation.title}</Text>
            {occupation.category && (
              <Text size="xs" color="secondary">{occupation.category.name}</Text>
            )}
          </Box>
        </Flex>
      </BaseCard>
    );
  }

  if (variant === 'compact') {
    return (
      <BaseCard
        onClick={handleClick}
        className={`la-occupation-card-compact ${isSelected ? 'la-selected' : ''} ${onClick ? 'la-clickable' : ''} ${style ? 'la-occupation-card-custom' : ''}`}
      >
        <Stack spacing="sm">
          <Flex align="start" gap="sm">
            <BriefcaseIcon size="md" theme="primary" />
            <Box flex={1}>
              <Heading as="h4" size="sm">{occupation.title}</Heading>
              {occupation.alternativeTitles && occupation.alternativeTitles.length > 0 && (
                <Text size="xs" color="secondary" fontStyle="italic">
                  {occupation.alternativeTitles.slice(0, 2).join(', ')}
                </Text>
              )}
            </Box>
          </Flex>

          {occupation.description && (
            <Text size="sm" color="secondary" className="la-occupation-description-clamp">
              {occupation.description}
            </Text>
          )}

          <Flex align="center" gap="xs" wrap="wrap">
            {/* Category */}
            {occupation.category && (
              <Box className="occupation-category-badge">
                {occupation.category.name}
              </Box>
            )}

            {/* Experience Level */}
            <Box
              className="occupation-experience-badge"
              data-level={occupation.experienceLevel}
            >
              {getExperienceLevelLabel(occupation.experienceLevel)}
            </Box>
          </Flex>
        </Stack>
      </BaseCard>
    );
  }

  // Full variant
  return (
    <BaseCard
      onClick={handleClick}
      className={`la-occupation-card-full ${isSelected ? 'la-selected' : ''} ${onClick ? 'la-clickable' : ''} ${style ? 'la-occupation-card-custom' : ''}`}
    >
      <Stack spacing="md">
        {/* Header */}
        <Flex align="start" gap="md">
          <BriefcaseIcon size="lg" theme="primary" />
          <Box flex={1}>
            <Heading as="h3" size="lg">{occupation.title}</Heading>
            {occupation.alternativeTitles && occupation.alternativeTitles.length > 0 && (
              <Text size="sm" color="secondary" fontStyle="italic">
                {t('employment.card.alsoKnownAs', 'Επίσης γνωστό ως')}: {occupation.alternativeTitles.join(', ')}
              </Text>
            )}
          </Box>
        </Flex>

        {/* Description */}
        {occupation.description && (
          <Text size="sm" color="secondary">
            {occupation.description}
          </Text>
        )}

        {/* Category & Experience */}
        <Flex align="center" gap="md" wrap="wrap">
          {occupation.category && (
            <Flex align="center" gap="xs">
              <TagIcon size="sm" />
              <Text size="sm">{occupation.category.name}</Text>
            </Flex>
          )}

          <Flex align="center" gap="xs">
            <LevelIcon size="sm" />
            <Text size="sm">{getExperienceLevelLabel(occupation.experienceLevel)}</Text>
          </Flex>
        </Flex>

        {/* Employment Types */}
        {showEmploymentTypes && occupation.employmentTypes.length > 0 && (
          <Box>
            <Text size="sm" weight="medium" marginBottom="var(--la-space-1)"> {/* 🎯 SST: XS spacing */}
              {t('employment.card.employmentTypes', 'Τύποι Απασχόλησης')}:
            </Text>
            <Flex gap="xs" wrap="wrap">
              {occupation.employmentTypes.map((type, index) => (
                <Box
                  key={index}
                  className="la-employment-type-badge"
                >
                  {getEmploymentTypeLabel(type)}
                </Box>
              ))}
            </Flex>
          </Box>
        )}

        {/* Skills */}
        {showSkills && occupation.skills.length > 0 && (
          <Box>
            <Text size="sm" weight="medium" marginBottom="var(--la-space-1)"> {/* 🎯 SST: XS spacing */}
              {t('employment.card.skills', 'Δεξιότητες')}:
            </Text>
            <Flex gap="xs" wrap="wrap">
              {occupation.skills.slice(0, 6).map((skill, index) => (
                <Box
                  key={index}
                  className="la-skill-badge"
                >
                  {skill.name}
                </Box>
              ))}
              {occupation.skills.length > 6 && (
                <Text size="xs" color="secondary">
                  +{occupation.skills.length - 6} {t('employment.card.moreSkills', 'περισσότερες')}
                </Text>
              )}
            </Flex>
          </Box>
        )}

        {/* ESCO Reference */}
        {occupation.escoUri && (
          <Text size="xs" color="tertiary" fontStyle="italic">
            ESCO: {occupation.iscoCode || occupation.id}
          </Text>
        )}
      </Stack>
    </BaseCard>
  );
};