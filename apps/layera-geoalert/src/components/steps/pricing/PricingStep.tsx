/**
 * PricingStep.tsx - Enterprise Pricing Step Component
 *
 * Handles pricing/budget collection based on complete context
 * Supports multi-dependency flow (category → intent → location → details → pricing)
 */

import React, { useState } from 'react';
import { Stack, Box } from '@layera/layout';
import { SPACING_SCALE } from '@layera/constants';
import { Text, Heading } from '@layera/typography';
import { Button } from '@layera/buttons';
import { BaseCard } from '@layera/cards';
import type { StepProps, PricingType } from '../types';
// χρησιμοποιούμε StepOrchestrator μόνο
import { getCardsForStep, type CardConfig } from '../../device-specific/mobile/iphone-14-pro-max/components/cardData';

export interface PricingStepProps extends StepProps {
  /** Custom pricing selection handler */
  onPricingSelected?: (pricing: PricingType) => void;

  /** Variant για conditional rendering */
  variant?: 'property' | 'job';
}

export const PricingStep: React.FC<PricingStepProps> = ({
  context,
  onNext,
  onStepComplete,
  onPricingSelected,
  isVisible = true,
  deviceProps = {}
}) => {
  const [selectedPricing, setSelectedPricing] = useState<PricingType>(context.selectedPricing || null);

  // 🚫 Early return αν δεν είναι visible ή δεν έχει τα απαραίτητα context
  if (!isVisible || !context.selectedCategory || !context.selectedIntent ||
      !context.selectedLocation || !context.selectedDetails) {
    return null;
  }

  // 🎯 Context-aware card selection based on πλήρης pipeline
  const getPricingCards = (): readonly CardConfig[] => {
    // Enhanced context-aware logic για pricing cards
    if (context.selectedCategory === 'property') {
      if (context.selectedIntent === 'offer') {
        if (context.selectedLocation === 'map' && context.selectedDetails === 'form') {
          return getCardsForStep('property-offer-map-form-pricing');
        }
        if (context.selectedLocation === 'area' && context.selectedDetails === 'quick') {
          return getCardsForStep('property-offer-area-quick-pricing');
        }
        // Fallback για property-offer
        return getCardsForStep('property-offer-pricing');
      }
      if (context.selectedIntent === 'search') {
        if (context.selectedLocation === 'address' && context.selectedDetails === 'advanced') {
          return getCardsForStep('property-search-address-advanced-pricing');
        }
        // Fallback για property-search
        return getCardsForStep('property-search-pricing');
      }
      // Fallback για property
      return getCardsForStep('property-pricing');
    }

    if (context.selectedCategory === 'job') {
      if (context.selectedIntent === 'offer') {
        return getCardsForStep('job-offer-pricing');
      }
      if (context.selectedIntent === 'search') {
        return getCardsForStep('job-search-pricing');
      }
      // Fallback για job
      return getCardsForStep('job-pricing');
    }

    // Final fallback
    return getCardsForStep('pricing');
  };

  // 🎮 Handle pricing selection
  const handlePricingSelect = (pricing: PricingType) => {
    setSelectedPricing(pricing);
    onPricingSelected?.(pricing);

    // Trigger step completion
    onStepComplete?.('pricing', {
      selectedPricing: pricing,
      fullContext: context
    });
  };

  // 🎮 Handle navigation
  const handleNext = (): void => {
    if (selectedPricing) {
      onNext?.();
    }
  };

  // 📋 Get cards για rendering
  const cards = getPricingCards();

  return (
    <Stack spacing="lg" width="full">
      {/* 📝 Step Header */}
      <Stack spacing="sm">
        <Heading level={2} size="lg">
          Τιμολόγηση & Προϋπολογισμός
        </Heading>
        <Text size="md" color="neutral-600">
          Επιλέξτε την κατηγορία τιμολόγησης που σας ενδιαφέρει
        </Text>
      </Stack>

      {/* 🎯 Context Display για debugging */}
      {process.env.NODE_ENV === 'development' && (
        <BaseCard title="🔍 Context Debug" variant="outline" className="layera-card-uniform">
          <Text size="sm" color="neutral-500">
            Category: {context.selectedCategory} | Intent: {context.selectedIntent} |
            Location: {context.selectedLocation} | Details: {context.selectedDetails}
          </Text>
        </BaseCard>
      )}

      {/* 📋 Cards Grid */}
      <Box
        display="grid"
        gridTemplateColumns={deviceProps?.isMobile ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))'}
        gap={`${SPACING_SCALE.MD}px`}
      >
        {cards.map((card: unknown) => (
          <BaseCard
            key={card.id}
            title={card.title}
            variant={selectedPricing === card.value ? 'filled' : 'outline'}
            className="layera-card-uniform"
            onClick={(): void => handlePricingSelect(card.value as PricingType)}
          >
            <Stack spacing="sm" align="center">
              {card.icon && <Box>{card.icon}</Box>}
              <Text size="sm" color="neutral-600">
                {card.description}
              </Text>
            </Stack>
          </BaseCard>
        ))}
      </Box>

      {/* 🎮 Navigation Controls */}
      <Stack direction="row" justify="space-between" marginTop="lg">
        <Button
          variant="outline"
          onClick={(): void => window.history.back()}
        >
          Πίσω
        </Button>

        <Button
          variant="primary"
          onClick={handleNext}
          disabled={!selectedPricing}
        >
          Συνέχεια
        </Button>
      </Stack>

      {/* 📊 Step Progress Indicator */}
      <Box textAlign="center" marginTop="md">
        <Text size="sm" color="neutral-500">
          Βήμα 5 από 7 • Τιμολόγηση
        </Text>
      </Box>
    </Stack>
  );
};