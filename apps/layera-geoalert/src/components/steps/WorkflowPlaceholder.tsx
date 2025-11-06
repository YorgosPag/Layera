/**
 * WorkflowPlaceholder.tsx - Next Step Workflow Placeholder
 *
 * Placeholder component που εμφανίζει τα επόμενα βήματα του workflow
 * βασισμένο στις επιλογές του QuickSearch
 */

import React from 'react';
import {
  SPACING_SCALE,
  BORDER_RADIUS_SCALE,
  CSS_DESIGN_TOKENS,
  ANIMATION_DURATIONS,
  EASING_FUNCTIONS,
  MENU_POSITIONS,
  BRAND_COLORS,
  getWorkflowCardContainerStyle,
  getWorkflowCardButtonStyle,
  getWorkflowCardStepStyle,
  getWorkflowCardStepContainerStyle,
  getCardPrimaryColor
} from '@layera/constants';
import { Box, Flex, FlexCenter } from '@layera/layout';
import { Text, Heading } from '@layera/typography';
import {
  HomeIcon,
  WorkIcon,
  FileIcon,
  MapIcon,
  EditIcon,
  EuroIcon,
  SearchIcon,
  UserIcon,
  ShieldIcon,
  LockIcon
} from '@layera/icons';
import { useLayeraTranslation } from '@layera/tolgee';
import { QuickSearchState } from './types';

export interface WorkflowPlaceholderProps {
  /** QuickSearch state που επέλεξε ο χρήστης */
  quickSearchState: QuickSearchState;
  /** Callback όταν ο χρήστης θέλει να ξεκινήσει το workflow */
  onStartWorkflow?: () => void;
  /** Callback όταν ο χρήστης θέλει να επιστρέψει στο QuickSearch */
  onBackToQuickSearch?: () => void;
}

interface WorkflowStep {
  id: string;
  icon: React.ComponentType<{ size?: string }>;
  titleKey: string;
  descriptionKey: string;
  durationKey: string;
  order: number;
}

export const WorkflowPlaceholder: React.FC<WorkflowPlaceholderProps> = ({
  quickSearchState,
  onStartWorkflow,
  onBackToQuickSearch
}) => {
  const { t } = useLayeraTranslation();

  // 🎯 Generate workflow steps based on QuickSearch selection
  const getWorkflowSteps = (): WorkflowStep[] => {
    const { intent, kind, purpose, timeframe } = quickSearchState;

    if (intent === 'offer' && kind === 'property') {
      // Property Listing Workflow (QUICKSEARCH_WORKFLOW_EVOLUTION.md lines 78-124)
      return [
        {
          id: 'propertyType',
          icon: HomeIcon,
          titleKey: 'workflow.property.offer.propertyType.title',
          descriptionKey: 'workflow.property.offer.propertyType.description',
          durationKey: 'workflow.property.offer.propertyType.duration',
          order: 1
        },
        {
          id: 'propertyLocation',
          icon: MapIcon,
          titleKey: 'workflow.property.offer.location.title',
          descriptionKey: 'workflow.property.offer.location.description',
          durationKey: 'workflow.property.offer.location.duration',
          order: 2
        },
        {
          id: 'propertyPhotos',
          icon: FileIcon,
          titleKey: 'workflow.property.offer.photos.title',
          descriptionKey: 'workflow.property.offer.photos.description',
          durationKey: 'workflow.property.offer.photos.duration',
          order: 3
        },
        {
          id: 'propertyDetails',
          icon: EditIcon,
          titleKey: 'workflow.property.offer.details.title',
          descriptionKey: 'workflow.property.offer.details.description',
          durationKey: 'workflow.property.offer.details.duration',
          order: 4
        },
        {
          id: 'propertyDescription',
          icon: FileIcon,
          titleKey: 'workflow.property.offer.description.title',
          descriptionKey: 'workflow.property.offer.description.description',
          durationKey: 'workflow.property.offer.description.duration',
          order: 5
        },
        {
          id: 'propertyPricing',
          icon: EuroIcon,
          titleKey: 'workflow.property.offer.pricing.title',
          descriptionKey: 'workflow.property.offer.pricing.description',
          durationKey: 'workflow.property.offer.pricing.duration',
          order: 6
        }
      ];
    }

    if (intent === 'search' && kind === 'property') {
      // Property Search Workflow (QUICKSEARCH_WORKFLOW_EVOLUTION.md lines 126-158)
      return [
        {
          id: 'searchLocation',
          icon: MapIcon,
          titleKey: 'workflow.property.search.location.title',
          descriptionKey: 'workflow.property.search.location.description',
          durationKey: 'workflow.property.search.location.duration',
          order: 1
        },
        {
          id: 'searchBasics',
          icon: HomeIcon,
          titleKey: 'workflow.property.search.basics.title',
          descriptionKey: 'workflow.property.search.basics.description',
          durationKey: 'workflow.property.search.basics.duration',
          order: 2
        },
        {
          id: 'searchBudget',
          icon: EuroIcon,
          titleKey: 'workflow.property.search.budget.title',
          descriptionKey: 'workflow.property.search.budget.description',
          durationKey: 'workflow.property.search.budget.duration',
          order: 3
        },
        {
          id: 'searchTimeframe',
          icon: SearchIcon,
          titleKey: 'workflow.property.search.timeframe.title',
          descriptionKey: 'workflow.property.search.timeframe.description',
          durationKey: 'workflow.property.search.timeframe.duration',
          order: 4
        }
      ];
    }

    if (intent === 'offer' && kind === 'job') {
      // Job Posting Workflow (QUICKSEARCH_WORKFLOW_EVOLUTION.md lines 162-200)
      return [
        {
          id: 'jobType',
          icon: WorkIcon,
          titleKey: 'workflow.job.offer.jobType.title',
          descriptionKey: 'workflow.job.offer.jobType.description',
          durationKey: 'workflow.job.offer.jobType.duration',
          order: 1
        },
        {
          id: 'jobCompany',
          icon: UserIcon,
          titleKey: 'workflow.job.offer.company.title',
          descriptionKey: 'workflow.job.offer.company.description',
          durationKey: 'workflow.job.offer.company.duration',
          order: 2
        },
        {
          id: 'jobRequirements',
          icon: EditIcon,
          titleKey: 'workflow.job.offer.requirements.title',
          descriptionKey: 'workflow.job.offer.requirements.description',
          durationKey: 'workflow.job.offer.requirements.duration',
          order: 3
        },
        {
          id: 'jobDescription',
          icon: FileIcon,
          titleKey: 'workflow.job.offer.description.title',
          descriptionKey: 'workflow.job.offer.description.description',
          durationKey: 'workflow.job.offer.description.duration',
          order: 4
        },
        {
          id: 'jobSalary',
          icon: EuroIcon,
          titleKey: 'workflow.job.offer.salary.title',
          descriptionKey: 'workflow.job.offer.salary.description',
          durationKey: 'workflow.job.offer.salary.duration',
          order: 5
        }
      ];
    }

    if (intent === 'search' && kind === 'job') {
      // Job Search Workflow (QUICKSEARCH_WORKFLOW_EVOLUTION.md lines 202-240)
      return [
        {
          id: 'jobProfile',
          icon: UserIcon,
          titleKey: 'workflow.job.search.profile.title',
          descriptionKey: 'workflow.job.search.profile.description',
          durationKey: 'workflow.job.search.profile.duration',
          order: 1
        },
        {
          id: 'jobCV',
          icon: FileIcon,
          titleKey: 'workflow.job.search.cv.title',
          descriptionKey: 'workflow.job.search.cv.description',
          durationKey: 'workflow.job.search.cv.duration',
          order: 2
        },
        {
          id: 'jobExperience',
          icon: WorkIcon,
          titleKey: 'workflow.job.search.experience.title',
          descriptionKey: 'workflow.job.search.experience.description',
          durationKey: 'workflow.job.search.experience.duration',
          order: 3
        },
        {
          id: 'jobAvailability',
          icon: SearchIcon,
          titleKey: 'workflow.job.search.availability.title',
          descriptionKey: 'workflow.job.search.availability.description',
          durationKey: 'workflow.job.search.availability.duration',
          order: 4
        }
      ];
    }

    // Fallback για άγνωστες combinations
    return [];
  };

  const workflowSteps = getWorkflowSteps();

  // 🎯 Generate workflow title based on selection
  const getWorkflowTitle = (): string => {
    const { intent, kind, purpose } = quickSearchState;

    if (intent === 'offer' && kind === 'property') {
      return purpose === 'sell'
        ? t('workflow.titles.property.offer.sell') || 'Καταχώρηση Ακινήτου για Πώληση'
        : t('workflow.titles.property.offer.rent') || 'Καταχώρηση Ακινήτου για Ενοικίαση';
    }

    if (intent === 'search' && kind === 'property') {
      return purpose === 'sell'
        ? t('workflow.titles.property.search.buy') || 'Αναζήτηση Ακινήτου για Αγορά'
        : t('workflow.titles.property.search.rent') || 'Αναζήτηση Ακινήτου για Ενοικίαση';
    }

    if (intent === 'offer' && kind === 'job') {
      return t('workflow.titles.job.offer') || 'Καταχώρηση Θέσης Εργασίας';
    }

    if (intent === 'search' && kind === 'job') {
      return t('workflow.titles.job.search') || 'Αναζήτηση Εργασίας';
    }

    return t('workflow.titles.default') || 'Επόμενα Βήματα';
  };

  const getWorkflowSubtitle = (): string => {
    const { intent, kind, timeframe } = quickSearchState;

    const urgency = timeframe === 'now'
      ? t('workflow.subtitles.urgency.now') || 'άμεση'
      : t('workflow.subtitles.urgency.future') || 'μελλοντική';

    return t('workflow.subtitles.template', { urgency }) || `Διαχειριστείτε την ${urgency} σας ανάγκη γρήγορα και εύκολα`;
  };

  return (
    <div
      style={{
        ...getWorkflowCardContainerStyle(),
        backdropFilter: 'none',
        boxShadow: `var(--la-shadow-xl)`,
        display: 'block',
        width: SPACING_SCALE.FULL,
        animation: `slideIn ${ANIMATION_DURATIONS.FAST}ms ${EASING_FUNCTIONS.EASE_OUT}`
      }}
    >
      <Flex direction="column" gap="xl" style={{ alignItems: 'center' }}>
        {/* Header */}
        <Box textAlign={MENU_POSITIONS.CENTER}>
          <Heading size="lg" marginBottom="sm" style={{
            color: 'var(--color-text-primary)'
          }}>
            {getWorkflowTitle()}
          </Heading>
          <Text size="md" style={{
            color: 'var(--color-text-secondary)'
          }}>
            {getWorkflowSubtitle()}
          </Text>
        </Box>

        {/* Steps Preview */}
        <Box>
          <Text
            size="sm"
            weight="medium"
            marginBottom="md"
            style={{
              color: 'var(--color-text-primary)',
              textAlign: MENU_POSITIONS.CENTER
            }}
          >
            {t('workflow.preview.title') || 'Επόμενα Βήματα'} ({workflowSteps.length} {t('workflow.preview.steps') || 'βήματα'})
          </Text>

          <Flex direction="column" gap="md" style={{ width: SPACING_SCALE.FULL, alignSelf: 'stretch' }}>
            {workflowSteps.map((step, index) => {
              const IconComponent = step.icon;

              return (
                <Flex
                  key={step.id}
                  align="center"
                  gap="md"
                  style={{
                    ...getWorkflowCardStepStyle(),
                    transition: `all ${ANIMATION_DURATIONS.FAST}ms ${EASING_FUNCTIONS.EASE_OUT}`,
                    minHeight: `${SPACING_SCALE.XXL + SPACING_SCALE.LG}px`,
                    width: SPACING_SCALE.FULL,
                    justifyContent: 'flex-start',
                    boxSizing: 'border-box'
                  }}
                >
                  {/* Step Number */}
                  <FlexCenter
                    style={{
                      width: `${SPACING_SCALE.LG}px`,
                      height: `${SPACING_SCALE.LG}px`,
                      color: 'var(--color-text-inverse)',
                      borderRadius: BORDER_RADIUS_SCALE.CIRCLE,
                      fontSize: `${SPACING_SCALE.SM}px`,
                      fontWeight: 'bold',
                      flexShrink: 0
                    }}
                  >
                    {index + 1}
                  </FlexCenter>

                  {/* Icon */}
                  <Box style={{ color: getCardPrimaryColor(), flexShrink: 0 }}> {/* 🔴 SST: Color από μοναδική πηγή αλήθειας */}
                    <IconComponent size="md" />
                  </Box>

                  {/* Content */}
                  <Flex direction="column" gap="xs" style={{
                    flex: 1,
                    minWidth: 0,
                    alignItems: 'flex-start',
                    justifyContent: 'center'
                  }}>
                    <Text size="sm" weight="medium" style={{
                      color: 'var(--color-text-primary)',
                      lineHeight: CSS_DESIGN_TOKENS.typography['line-height-tight'],
                      textAlign: 'left'
                    }}>
                      {t(step.titleKey) || `Step ${index + 1}: ${step.id}`}
                    </Text>
                    <Text size="xs" style={{
                      color: 'var(--color-text-secondary)',
                      lineHeight: CSS_DESIGN_TOKENS.typography['line-height-normal'],
                      textAlign: 'left'
                    }}>
                      {t(step.descriptionKey) || 'Step description'}
                    </Text>
                  </Flex>

                  {/* Duration */}
                  <Text size="xs" style={{
                    color: 'var(--color-text-tertiary)',
                    flexShrink: 0,
                    minWidth: `${SPACING_SCALE.XXL}px`,
                    textAlign: 'right'
                  }}>
                    {t(step.durationKey) || '~2 λεπτά'}
                  </Text>
                </Flex>
              );
            })}
          </Flex>
        </Box>

        {/* Actions */}
        <Box textAlign={MENU_POSITIONS.CENTER}>
          <Flex gap="lg" justifyContent="center" wrap="wrap" style={{ alignItems: 'center' }}>
            <Box
              as="button"
              onClick={onBackToQuickSearch}
              style={{
                ...getWorkflowCardButtonStyle(),
                color: 'var(--color-text-primary)',
                border: `${SPACING_SCALE.XXS}px solid var(--color-border-strong)`,
                cursor: 'pointer',
                transition: `all ${ANIMATION_DURATIONS.FAST}ms ${EASING_FUNCTIONS.EASE_OUT}`,
                fontSize: `${SPACING_SCALE.MD + SPACING_SCALE.XS}px`,
                fontWeight: 'bold',
                minHeight: `${SPACING_SCALE.XXL}px`,
                minWidth: `${SPACING_SCALE.LAYOUT_SM + SPACING_SCALE.LG}px`,
                boxShadow: 'var(--elevation-sm)'
              }}
            >
              {t('workflow.actions.backToQuickSearch') || '← Πίσω στην Αναζήτηση'}
            </Box>

            <Box
              as="button"
              onClick={onStartWorkflow}
              style={{
                ...getWorkflowCardButtonStyle(),
                color: 'var(--color-text-inverse)',
                border: `${SPACING_SCALE.XXS}px solid ${getCardPrimaryColor()}`, // 🔴 SST: Border από μοναδική πηγή αλήθειας
                cursor: 'pointer',
                transition: `all ${ANIMATION_DURATIONS.FAST}ms ${EASING_FUNCTIONS.EASE_OUT}`,
                fontSize: `${SPACING_SCALE.MD + SPACING_SCALE.XS}px`,
                fontWeight: 'bold',
                minHeight: `${SPACING_SCALE.XXL}px`,
                minWidth: `${SPACING_SCALE.LAYOUT_SM + SPACING_SCALE.LG}px`,
                boxShadow: 'var(--elevation-lg)'
              }}
            >
              {t('workflow.actions.startWorkflow') || 'Ξεκινήστε Τώρα'} →
            </Box>
          </Flex>
        </Box>

        {/* Security Footer */}
        <Flex gap="md" justifyContent="center" wrap="wrap">
          <Flex gap="xs" align="center">
            <ShieldIcon size="xs" style={{ color: 'var(--color-text-tertiary)' }} />
            <Text size="xs" style={{ color: 'var(--color-text-tertiary)' }}>
              {t('workflow.security.dataProtection') || 'Προστασία Δεδομένων'}
            </Text>
          </Flex>
          <Flex gap="xs" align="center">
            <LockIcon size="xs" style={{ color: 'var(--color-text-tertiary)' }} />
            <Text size="xs" style={{ color: 'var(--color-text-tertiary)' }}>
              {t('workflow.security.encrypted') || 'Κρυπτογραφημένα'}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
};