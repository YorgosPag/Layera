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

  const handleClick = () => {
    if (onClick) {
      onClick(occupation);
    }
  };

  const getExperienceLevelColor = (level: string) => {
    switch (level) {
      case 'entry': return 'var(--layera-color-green-500, #10B981)'; // Green
      case 'junior': return 'var(--layera-color-blue-500, #3B82F6)'; // Blue
      case 'mid': return 'var(--layera-color-yellow-500, #F59E0B)'; // Yellow
      case 'senior': return 'var(--layera-color-red-500, #EF4444)'; // Red
      case 'expert': return 'var(--layera-color-purple-500, #8B5CF6)'; // Purple
      case 'executive': return 'var(--layera-color-gray-700, #374151)'; // Gray
      default: return 'var(--layera-color-gray-500, #6B7280)';
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
        style={{
          cursor: onClick ? 'var(--layera-cursor-pointer, pointer)' : 'var(--layera-cursor-default, default)',
          border: isSelected ? '2px solid var(--layera-color-primary)' : '1px solid var(--layera-border-default)',
          ...style
        }}
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
        style={{
          cursor: onClick ? 'var(--layera-cursor-pointer, pointer)' : 'var(--layera-cursor-default, default)',
          border: isSelected ? '2px solid var(--layera-color-primary)' : '1px solid var(--layera-border-default)',
          backgroundColor: isSelected ? 'var(--layera-bg-primary-subtle)' : 'var(--layera-bg-primary)',
          ...style
        }}
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
            <Text size="sm" color="secondary" style={{
              display: 'var(--layera-display-webkit-box, -webkit-box)',
              WebkitLineClamp: 'var(--layera-webkit-line-clamp-2, 2)',
              WebkitBoxOrient: 'var(--layera-webkit-box-orient-vertical, vertical)',
              overflow: 'var(--layera-overflow-hidden, hidden)'
            }}>
              {occupation.description}
            </Text>
          )}

          <Flex align="center" gap="xs" wrap="wrap">
            {/* Category */}
            {occupation.category && (
              <Box style={{
                backgroundColor: 'var(--layera-bg-secondary)',
                padding: `${SPACING_SCALE.XS}px ${SPACING_SCALE.SM}px`,
                borderRadius: `${BORDER_RADIUS_SCALE.XS}px`,
                fontSize: 'var(--layera-font-size-xs)',
                color: 'var(--layera-text-primary)'
              }}>
                {occupation.category.name}
              </Box>
            )}

            {/* Experience Level */}
            <Box style={{
              backgroundColor: getExperienceLevelColor(occupation.experienceLevel),
              color: 'var(--layera-color-white, white)',
              padding: `${SPACING_SCALE.XS}px ${SPACING_SCALE.SM}px`,
              borderRadius: `${BORDER_RADIUS_SCALE.XS}px`,
              fontSize: 'var(--layera-font-size-xs)',
              fontWeight: 'var(--layera-font-weight-medium, 500)'
            }}>
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
      style={{
        cursor: onClick ? 'var(--layera-cursor-pointer, pointer)' : 'var(--layera-cursor-default, default)',
        border: isSelected ? '2px solid var(--layera-color-primary)' : '1px solid var(--layera-border-default)',
        backgroundColor: isSelected ? 'var(--layera-bg-primary-subtle)' : 'var(--layera-bg-primary)',
        ...style
      }}
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
            <Text size="sm" weight="medium" marginBottom={`${SPACING_SCALE.XS}px`}>
              {t('employment.card.employmentTypes', 'Τύποι Απασχόλησης')}:
            </Text>
            <Flex gap="xs" wrap="wrap">
              {occupation.employmentTypes.map((type, index) => (
                <Box
                  key={index}
                  style={{
                    backgroundColor: 'var(--layera-bg-info-subtle)',
                    color: 'var(--layera-color-info)',
                    padding: `${SPACING_SCALE.XS}px ${SPACING_SCALE.SM}px`,
                    borderRadius: `${BORDER_RADIUS_SCALE.XS}px`,
                    fontSize: 'var(--layera-font-size-xs)',
                    fontWeight: 'var(--layera-font-weight-medium, 500)'
                  }}
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
            <Text size="sm" weight="medium" marginBottom={`${SPACING_SCALE.XS}px`}>
              {t('employment.card.skills', 'Δεξιότητες')}:
            </Text>
            <Flex gap="xs" wrap="wrap">
              {occupation.skills.slice(0, 6).map((skill, index) => (
                <Box
                  key={index}
                  style={{
                    backgroundColor: 'var(--layera-bg-success-subtle)',
                    color: 'var(--layera-color-success)',
                    padding: `${SPACING_SCALE.XS}px ${SPACING_SCALE.SM}px`,
                    borderRadius: `${BORDER_RADIUS_SCALE.XS}px`,
                    fontSize: 'var(--layera-font-size-xs)'
                  }}
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