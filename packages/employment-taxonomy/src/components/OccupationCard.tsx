/**
 * OccupationCard - Professional occupation display component
 * Structured display για ESCO occupations με skills και details
 */

import React from 'react';
import { useLayeraTranslation } from '@layera/tolgee';
import { BaseCard } from '@layera/cards';
import { BriefcaseIcon, TagIcon, LevelIcon } from '@layera/icons';
import { Text, Heading } from '@layera/typography';
import { Stack, Flex } from '@layera/layout';
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
      case 'entry': return '#10B981'; // Green
      case 'junior': return '#3B82F6'; // Blue
      case 'mid': return '#F59E0B'; // Yellow
      case 'senior': return '#EF4444'; // Red
      case 'expert': return '#8B5CF6'; // Purple
      case 'executive': return '#374151'; // Gray
      default: return '#6B7280';
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
          cursor: onClick ? 'pointer' : 'default',
          border: isSelected ? '2px solid #3B82F6' : '1px solid #E5E7EB',
          ...style
        }}
      >
        <Flex align="center" gap="sm">
          <BriefcaseIcon size="sm" theme="primary" />
          <div style={{ flex: 1 }}>
            <Text weight="medium">{occupation.title}</Text>
            {occupation.category && (
              <Text size="xs" color="secondary">{occupation.category.name}</Text>
            )}
          </div>
        </Flex>
      </BaseCard>
    );
  }

  if (variant === 'compact') {
    return (
      <BaseCard
        onClick={handleClick}
        style={{
          cursor: onClick ? 'pointer' : 'default',
          border: isSelected ? '2px solid #3B82F6' : '1px solid #E5E7EB',
          backgroundColor: isSelected ? '#EFF6FF' : 'white',
          ...style
        }}
      >
        <Stack spacing="sm">
          <Flex align="start" gap="sm">
            <BriefcaseIcon size="md" theme="primary" />
            <div style={{ flex: 1 }}>
              <Heading as="h4" size="sm">{occupation.title}</Heading>
              {occupation.alternativeTitles && occupation.alternativeTitles.length > 0 && (
                <Text size="xs" color="secondary" style={{ fontStyle: 'italic' }}>
                  {occupation.alternativeTitles.slice(0, 2).join(', ')}
                </Text>
              )}
            </div>
          </Flex>

          {occupation.description && (
            <Text size="sm" color="secondary" style={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}>
              {occupation.description}
            </Text>
          )}

          <Flex align="center" gap="xs" wrap="wrap">
            {/* Category */}
            {occupation.category && (
              <div style={{
                backgroundColor: '#F3F4F6',
                padding: '4px 8px',
                borderRadius: '4px',
                fontSize: '12px',
                color: '#374151'
              }}>
                {occupation.category.name}
              </div>
            )}

            {/* Experience Level */}
            <div style={{
              backgroundColor: getExperienceLevelColor(occupation.experienceLevel),
              color: 'white',
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: '500'
            }}>
              {getExperienceLevelLabel(occupation.experienceLevel)}
            </div>
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
        cursor: onClick ? 'pointer' : 'default',
        border: isSelected ? '2px solid #3B82F6' : '1px solid #E5E7EB',
        backgroundColor: isSelected ? '#EFF6FF' : 'white',
        ...style
      }}
    >
      <Stack spacing="md">
        {/* Header */}
        <Flex align="start" gap="md">
          <BriefcaseIcon size="lg" theme="primary" />
          <div style={{ flex: 1 }}>
            <Heading as="h3" size="lg">{occupation.title}</Heading>
            {occupation.alternativeTitles && occupation.alternativeTitles.length > 0 && (
              <Text size="sm" color="secondary" style={{ fontStyle: 'italic' }}>
                {t('employment.card.alsoKnownAs', 'Επίσης γνωστό ως')}: {occupation.alternativeTitles.join(', ')}
              </Text>
            )}
          </div>
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
          <div>
            <Text size="sm" weight="medium" style={{ marginBottom: '8px' }}>
              {t('employment.card.employmentTypes', 'Τύποι Απασχόλησης')}:
            </Text>
            <Flex gap="xs" wrap="wrap">
              {occupation.employmentTypes.map((type, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: '#EFF6FF',
                    color: '#1D4ED8',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: '500'
                  }}
                >
                  {getEmploymentTypeLabel(type)}
                </div>
              ))}
            </Flex>
          </div>
        )}

        {/* Skills */}
        {showSkills && occupation.skills.length > 0 && (
          <div>
            <Text size="sm" weight="medium" style={{ marginBottom: '8px' }}>
              {t('employment.card.skills', 'Δεξιότητες')}:
            </Text>
            <Flex gap="xs" wrap="wrap">
              {occupation.skills.slice(0, 6).map((skill, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: '#F0FDF4',
                    color: '#166534',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px'
                  }}
                >
                  {skill.name}
                </div>
              ))}
              {occupation.skills.length > 6 && (
                <Text size="xs" color="secondary">
                  +{occupation.skills.length - 6} {t('employment.card.moreSkills', 'περισσότερες')}
                </Text>
              )}
            </Flex>
          </div>
        )}

        {/* ESCO Reference */}
        {occupation.escoUri && (
          <Text size="xs" color="tertiary" style={{ fontStyle: 'italic' }}>
            ESCO: {occupation.iscoCode || occupation.id}
          </Text>
        )}
      </Stack>
    </BaseCard>
  );
};