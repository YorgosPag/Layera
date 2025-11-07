/**
 * WorkflowPlaceholder.tsx - Next Step Workflow Placeholder
 *
 * Placeholder component που εμφανίζει τα επόμενα βήματα του workflow
 * βασισμένο στις επιλογές του QuickSearch
 */

import React, { useState, useCallback } from 'react';
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
  getCardPrimaryColor,
  getCardInfoBorder
} from '@layera/constants';
import { Box, Flex, FlexCenter } from '@layera/layout';
import { Text, Heading } from '@layera/typography';
import { Button } from '@layera/buttons';
import { Select } from '@layera/forms';
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
import type { PropertyType } from '../../../types';
import { QuickSearchState } from './types';
import { PropertyDetailsStep } from './PropertyDetailsStep';

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

/**
 * Property Types Configuration - i18n Integration με tolgee
 * Ολική αντικατάσταση hardcoded strings με translation keys
 */
const PROPERTY_TYPE_KEYS = [
  // Κατοικίες
  'apartment', 'studio', 'maisonette', 'house', 'villa', 'cottage', 'penthouse', 'loft',
  // Εμπορικά
  'store', 'office', 'warehouse', 'factory',
  // Οικόπεδα & Γη
  'residential_plot', 'commercial_plot', 'agricultural_land', 'forest_land', 'land',
  // Ειδικά
  'garage', 'parking_space', 'storage_unit', 'basement', 'rooftop'
] as const;

export const WorkflowPlaceholder: React.FC<WorkflowPlaceholderProps> = ({
  quickSearchState,
  onStartWorkflow,
  onBackToQuickSearch
}) => {
  const { t } = useLayeraTranslation();
  const [selectedPropertyType, setSelectedPropertyType] = useState<PropertyType | ''>('');
  const [showPropertyDetails, setShowPropertyDetails] = useState(false);

  // 🌍 Generate property type options με i18n translations
  const getPropertyTypeOptions = () => {
    return PROPERTY_TYPE_KEYS.map(typeKey => ({
      value: typeKey,
      label: t(`propertyType.${typeKey}`) || typeKey // fallback σε key αν δεν υπάρχει translation
    }));
  };

  // 🏠 Property Type Selection Handler - SST Integration
  const handlePropertyTypeChange = useCallback(async (value: string) => {
    const propertyType = value as PropertyType;
    setSelectedPropertyType(propertyType);

    try {
      console.log('🏠 Selected Property Type:', propertyType);
      // Future: Μπορεί να προστεθεί integration με workflow context
    } catch (error) {
      console.error('Property type selection failed:', error);
    }
  }, []);

  // 🎯 Generate workflow steps based on QuickSearch selection
  const getWorkflowSteps = (): WorkflowStep[] => {
    const { intent, kind, purpose, timeframe } = quickSearchState;

    if (intent === 'offer' && kind === 'property') {
      // Property Listing Workflow - Phase 1: Property Type + Details Only
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
          id: 'propertyDetails',
          icon: EditIcon,
          titleKey: 'workflow.property.offer.details.title',
          descriptionKey: 'workflow.property.offer.details.description',
          durationKey: 'workflow.property.offer.details.duration',
          order: 2
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

  // 🎯 Handle "Start Workflow" - Αν επιλέχθηκε property type, δείξε τη φόρμα
  const handleStartWorkflow = () => {
    if (selectedPropertyType && selectedPropertyType !== '') {
      setShowPropertyDetails(true);
    } else {
      onStartWorkflow?.();
    }
  };

  // ✅ Αν είμαστε σε PropertyDetails mode, δείξε τη φόρμα
  if (showPropertyDetails && selectedPropertyType) {
    return (
      <PropertyDetailsStep
        selectedPropertyType={selectedPropertyType as PropertyType}
        quickSearchState={quickSearchState}
        onBack={() => setShowPropertyDetails(false)}
        onNext={() => {
          // Future: Navigate to PropertyCompletionStep
          console.log('PropertyDetails completed, would navigate to next step');
        }}
        onDetailsComplete={(details) => {
          console.log('Property details completed:', details);
          // Future: Handle details completion
        }}
      />
    );
  }

  return (
    <div
      style={{
        ...getWorkflowCardContainerStyle(),
        backdropFilter: 'none',
        boxShadow: `var(--la-shadow-xl)`,
        display: 'block',
        width: 'var(--la-width-full)', // 🎯 SST: Full width
        animation: `slideIn ${ANIMATION_DURATIONS.FAST}ms ${EASING_FUNCTIONS.EASE_OUT}`,
        border: `var(--la-border-width-md) solid ${getCardInfoBorder()}` // 🎯 SST: Border width token + 🔲 SST: Περίγραμμα από μοναδική πηγή αλήθειας
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

          <Flex direction="column" gap="md" style={{ width: 'var(--la-width-full)' /* 🎯 SST: Full width */, alignSelf: 'stretch' }}>
            {workflowSteps.map((step, index) => {
              const IconComponent = step.icon;

              // 🏠 ΚΡΙΣΙΜΟ: PropertyType Step με SST ComboBox Integration
              if (step.id === 'propertyType') {
                return (
                  <Flex
                    key={step.id}
                    direction="column"
                    gap="md"
                    style={{
                      ...getWorkflowCardStepStyle(),
                      transition: `all ${ANIMATION_DURATIONS.FAST}ms ${EASING_FUNCTIONS.EASE_OUT}`,
                      minHeight: 'var(--la-min-height-double)', // 🎯 SST: Double height token για combo box
                      width: 'var(--la-width-full)', // 🎯 SST: Full width
                      boxSizing: 'border-box',
                      border: `var(--la-border-width-md) solid ${getCardInfoBorder()}`, // 🎯 SST: Border width token + 🔲 SST: Περίγραμμα από μοναδική πηγή αλήθειας
                      padding: 'var(--la-space-4)' // 🎯 SST: Spacing token
                    }}
                  >
                    {/* Header Row με Step Number + Icon + Title */}
                    <Flex align="center" gap="md" style={{ width: 'var(--la-width-full)' /* 🎯 SST: Full width */ }}>
                      {/* Step Number */}
                      <FlexCenter
                        style={{
                          width: 'var(--la-space-6)', // 🎯 SST: LG size (24px)
                          height: 'var(--la-space-6)', // 🎯 SST: LG size (24px)
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

                      {/* Title */}
                      <Text size="sm" weight="medium" style={{
                        color: 'var(--color-text-primary)',
                        lineHeight: CSS_DESIGN_TOKENS.typography['line-height-tight'],
                        flex: 1
                      }}>
                        {t(step.titleKey) || 'Τύπος Ακινήτου'}
                      </Text>

                      {/* Duration */}
                      <Text size="xs" style={{
                        color: 'var(--color-text-tertiary)',
                        flexShrink: 0,
                        minWidth: 'var(--la-min-width-xxl)', // 🎯 SST: Component width token
                        textAlign: 'right'
                      }}>
                        {t(step.durationKey) || '~1 λεπτό'}
                      </Text>
                    </Flex>

                    {/* Property Type Combo Box - SST Select Integration */}
                    <Box style={{ width: 'var(--la-width-full)' /* 🎯 SST: Full width */ }}>
                      <Select
                        value={selectedPropertyType}
                        onChange={handlePropertyTypeChange}
                        options={getPropertyTypeOptions()}
                        placeholder={t('propertyType.placeholder')}
                        size="large"
                        variant="outline"
                        fullWidth
                        searchable={true}
                        clearable={true}
                      />
                    </Box>

                    {/* Description */}
                    <Text size="xs" style={{
                      color: 'var(--color-text-secondary)',
                      lineHeight: CSS_DESIGN_TOKENS.typography['line-height-normal'],
                      textAlign: 'left'
                    }}>
                      {t(step.descriptionKey) || 'Επιλέξτε από την παραπάνω λίστα τον τύπο του ακινήτου που θέλετε να καταχωρήσετε'}
                    </Text>
                  </Flex>
                );
              }

              // 📝 Default Step Layout για τα υπόλοιπα steps
              return (
                <Flex
                  key={step.id}
                  align="center"
                  gap="md"
                  style={{
                    ...getWorkflowCardStepStyle(),
                    transition: `all ${ANIMATION_DURATIONS.FAST}ms ${EASING_FUNCTIONS.EASE_OUT}`,
                    minHeight: 'var(--la-min-height-xxl)', // 🎯 SST: Component height token
                    width: 'var(--la-width-full)', // 🎯 SST: Full width
                    justifyContent: 'flex-start',
                    boxSizing: 'border-box',
                    border: `var(--la-border-width-md) solid ${getCardInfoBorder()}` // 🎯 SST: Border width token + 🔲 SST: Περίγραμμα από μοναδική πηγή αλήθειας
                  }}
                >
                  {/* Step Number */}
                  <FlexCenter
                    style={{
                      width: 'var(--la-space-6)', // 🎯 SST: LG size (24px)
                      height: 'var(--la-space-6)', // 🎯 SST: LG size (24px)
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
                    minWidth: 'var(--la-min-width-xxl)', // 🎯 SST: Component width token
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
            <Button
              variant="primary"
              size="lg"
              onClick={onBackToQuickSearch}
            >
              {t('workflow.actions.backToQuickSearch') || '← Πίσω στην Αναζήτηση'}
            </Button>

            <Button
              variant="primary"
              size="lg"
              onClick={handleStartWorkflow}
              disabled={!selectedPropertyType}
            >
              {selectedPropertyType
                ? `${t('workflow.actions.startWorkflow') || 'Ξεκινήστε'} → Στοιχεία Ακινήτου`
                : (t('workflow.actions.selectPropertyFirst') || 'Επιλέξτε πρώτα τύπο ακινήτου')
              }
            </Button>
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