/**
 * PropertyCompletionStep.tsx - Final Property Listing Completion Workflow
 *
 * Τελικό βήμα που περιέχει τα υπόλοιπα steps: Location, Photos, Description, Price
 * Εμφανίζεται μετά το PropertyDetailsStep
 */

import React from 'react';
import {
  SPACING_SCALE,
  BORDER_RADIUS_SCALE,
  CSS_DESIGN_TOKENS,
  ANIMATION_DURATIONS,
  EASING_FUNCTIONS,
  MENU_POSITIONS,
  getWorkflowCardContainerStyle,
  getWorkflowCardStepStyle,
  getCardInfoBorder,
  getCardPrimaryColor
} from '@layera/constants';
import { Box, Flex, FlexCenter } from '@layera/layout';
import { Text, Heading } from '@layera/typography';
import { Button } from '@layera/buttons';
import {
  MapIcon,
  FileIcon,
  EditIcon,
  EuroIcon,
  ShieldIcon,
  LockIcon
} from '@layera/icons';
import { useLayeraTranslation } from '@layera/tolgee';
import type { PropertyType } from '../../types';
import { QuickSearchState } from './types';
import { PropertyDetailsData } from './PropertyDetailsStep';

export interface PropertyCompletionStepProps {
  /** Property type που επιλέχθηκε */
  selectedPropertyType: PropertyType;
  /** Property details που συμπληρώθηκαν */
  propertyDetails: PropertyDetailsData;
  /** QuickSearch state για context */
  quickSearchState: QuickSearchState;
  /** Callback όταν ο χρήστης θέλει να επιστρέψει */
  onBack?: () => void;
  /** Callback όταν ο χρήστης θέλει να ξεκινήσει */
  onStartCompletion?: () => void;
  /** Callback όταν ο χρήστης θέλει να επιστρέψει στο QuickSearch */
  onBackToQuickSearch?: () => void;
}

interface CompletionStep {
  id: string;
  icon: React.ComponentType<{ size?: string }>;
  titleKey: string;
  descriptionKey: string;
  durationKey: string;
  order: number;
}

/**
 * Property Completion Workflow - Τελικά βήματα για ολοκλήρωση καταχώρησης
 */
export const PropertyCompletionStep: React.FC<PropertyCompletionStepProps> = ({
  selectedPropertyType,
  propertyDetails,
  quickSearchState,
  onBack,
  onStartCompletion,
  onBackToQuickSearch
}) => {
  const { t } = useLayeraTranslation();

  // 🎯 Generate completion steps
  const getCompletionSteps = (): CompletionStep[] => {
    return [
      {
        id: 'propertyLocation',
        icon: MapIcon,
        titleKey: 'workflow.property.offer.location.title',
        descriptionKey: 'workflow.property.offer.location.description',
        durationKey: 'workflow.property.offer.location.duration',
        order: 1
      },
      {
        id: 'propertyDescription',
        icon: EditIcon,
        titleKey: 'workflow.property.offer.description.title',
        descriptionKey: 'workflow.property.offer.description.description',
        durationKey: 'workflow.property.offer.description.duration',
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
        id: 'propertyPricing',
        icon: EuroIcon,
        titleKey: 'workflow.property.offer.pricing.title',
        descriptionKey: 'workflow.property.offer.pricing.description',
        durationKey: 'workflow.property.offer.pricing.duration',
        order: 4
      }
    ];
  };

  const completionSteps = getCompletionSteps();

  // 🎯 Generate workflow title
  const getWorkflowTitle = (): string => {
    const { purpose } = quickSearchState;

    return purpose === 'sell'
      ? t('workflow.completion.sell.title') || 'Ολοκλήρωση Καταχώρησης για Πώληση'
      : t('workflow.completion.rent.title') || 'Ολοκλήρωση Καταχώρησης για Ενοικίαση';
  };

  const getWorkflowSubtitle = (): string => {
    const propertyTypeLabel = t(`propertyType.${selectedPropertyType}`) || selectedPropertyType;
    return t('workflow.completion.subtitle', { propertyType: propertyTypeLabel }) ||
           `Τελικά βήματα για καταχώρηση: ${propertyTypeLabel}`;
  };

  // 🎯 Generate property summary
  const getPropertySummary = (): string => {
    const parts: string[] = [];

    if (propertyDetails.squareMeters) {
      parts.push(`${propertyDetails.squareMeters} τ.μ.`);
    }

    if (propertyDetails.bedrooms) {
      parts.push(`${propertyDetails.bedrooms} δωμάτια`);
    }

    if (propertyDetails.bathrooms) {
      parts.push(`${propertyDetails.bathrooms} μπάνια`);
    }

    if (propertyDetails.floor !== undefined) {
      const floorText = propertyDetails.floor === 0 ? 'ισόγειο' : `${propertyDetails.floor}ος όροφος`;
      parts.push(floorText);
    }

    if (propertyDetails.frontage) {
      parts.push(`πρόσοψη ${propertyDetails.frontage}μ`);
    }

    if (propertyDetails.dimensions) {
      parts.push(`${propertyDetails.dimensions}`);
    }

    return parts.length > 0 ? parts.join(' • ') : '';
  };

  return (
    <div
      style={{
        ...getWorkflowCardContainerStyle(),
        backdropFilter: 'none',
        boxShadow: `var(--la-shadow-xl)`,
        display: 'block',
        width: SPACING_SCALE.FULL,
        animation: `slideIn ${ANIMATION_DURATIONS.FAST}ms ${EASING_FUNCTIONS.EASE_OUT}`,
        border: `3px solid ${getCardInfoBorder()}`
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

        {/* Property Summary */}
        <Box
          style={{
            backgroundColor: 'var(--la-color-bg-elevated)',
            padding: `${SPACING_SCALE.MD}px`,
            borderRadius: `${BORDER_RADIUS_SCALE.LG}px`,
            border: `2px solid ${getCardInfoBorder()}`,
            width: '100%'
          }}
        >
          <Flex align="center" gap="md" style={{ justifyContent: 'center' }}>
            <Box style={{ color: getCardPrimaryColor() }}>
              <EditIcon size="md" />
            </Box>
            <Box textAlign="center">
              <Text size="sm" weight="medium" style={{ color: 'var(--color-text-primary)' }}>
                {t(`propertyType.${selectedPropertyType}`) || selectedPropertyType}
              </Text>
              {getPropertySummary() && (
                <Text size="xs" style={{ color: 'var(--color-text-secondary)' }}>
                  {getPropertySummary()}
                </Text>
              )}
            </Box>
          </Flex>
        </Box>

        {/* Completion Steps Preview */}
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
            {t('workflow.completion.remainingSteps') || 'Υπομένουν'} ({completionSteps.length} {t('workflow.preview.steps') || 'βήματα'})
          </Text>

          <Flex direction="column" gap="md" style={{ width: SPACING_SCALE.FULL, alignSelf: 'stretch' }}>
            {completionSteps.map((step, index) => {
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
                    boxSizing: 'border-box',
                    border: `3px solid ${getCardInfoBorder()}`
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
                    {index + 3} {/* Συνεχίζουμε από 3 αφού είχαμε 1=PropertyType, 2=Details */}
                  </FlexCenter>

                  {/* Icon */}
                  <Box style={{ color: getCardPrimaryColor(), flexShrink: 0 }}>
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
                      {t(step.titleKey) || `Step ${index + 3}: ${step.id}`}
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
            <Button
              variant="secondary"
              size="lg"
              onClick={onBack}
            >
              {t('workflow.actions.backToDetails') || '← Πίσω στα Στοιχεία'}
            </Button>

            <Button
              variant="primary"
              size="lg"
              onClick={onStartCompletion}
            >
              {t('workflow.actions.startCompletion') || 'Ξεκινήστε την Ολοκλήρωση'} →
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