/**
 * PricingCard.tsx - Reusable Pricing Card Component
 *
 * Smart card για τιμολογιακές επιλογές με conditional logic
 * Integrates με το enterprise step system
 */

import React from 'react';
import { Stack } from '@layera/layout';
import { Text, Heading } from '@layera/typography';
import { BaseCard } from '@layera/cards';
import type { StepCardProps, PricingType } from '../types';

export interface PricingCardProps extends StepCardProps {
  /** Pricing type που αντιπροσωπεύει η κάρτα */
  pricingType: PricingType;

  /** Category context for conditional rendering */
  category?: 'property' | 'job';

  /** Custom title override */
  title?: string;

  /** Custom icon */
  icon?: React.ReactNode;

  /** Selection handler */
  onPricingSelect?: (pricing: PricingType) => void;

  /** Selected state */
  isSelected?: boolean;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  context,
  pricingType,
  category,
  title,
  icon,
  onPricingSelect,
  isSelected = false,
  variant = 'property',
  theme = 'light',
  opacity = 'opaque'
}) => {
  // 🎯 Smart title generation based on context
  const getCardTitle = (): string => {
    if (title) return title;

    switch (pricingType) {
      case 'free':
        return category === 'job' ? 'Δωρεάν Θέση' : 'Δωρεάν Καταχώρηση';
      case 'budget':
        return category === 'job' ? 'Οικονομική Θέση' : 'Προϋπολογισμός';
      case 'premium':
        return category === 'job' ? 'Premium Θέση' : 'Premium Καταχώρηση';
      case 'negotiable':
        return category === 'job' ? 'Διαπραγματεύσιμος Μισθός' : 'Διαπραγματεύσιμη Τιμή';
      default:
        return 'Τιμολόγηση';
    }
  };

  // 🎯 Smart description based on context
  const getCardDescription = (): string => {
    const isProperty = category === 'property';
    const isJob = category === 'job';

    switch (pricingType) {
      case 'free':
        if (isProperty) {
          if (context.selectedIntent === 'offer') {
            return 'Δωρεάν καταχώρηση ακινήτου για περιορισμένο χρόνο';
          }
          return 'Δωρεάν αναζήτηση ακινήτων';
        }
        if (isJob) {
          return 'Δωρεάν δημοσίευση θέσης εργασίας';
        }
        return 'Δωρεάν επιλογή';

      case 'budget':
        if (isProperty) {
          return 'Οικονομική λύση με βασικά χαρακτηριστικά';
        }
        if (isJob) {
          return 'Βασικό πακέτο δημοσίευσης θέσης';
        }
        return 'Οικονομική επιλογή';

      case 'premium':
        if (isProperty) {
          return 'Προωθημένη καταχώρηση με πολλαπλές δυνατότητες';
        }
        if (isJob) {
          return 'Premium πακέτο με μέγιστη προβολή';
        }
        return 'Premium επιλογή';

      case 'negotiable':
        if (isProperty) {
          return 'Διαπραγματεύσιμη τιμή ανάλογα με τις ανάγκες';
        }
        if (isJob) {
          return 'Διαπραγματεύσιμος μισθός με τον εργοδότη';
        }
        return 'Διαπραγματεύσιμη τιμή';

      default:
        return 'Επιλέξτε αυτή την κατηγορία τιμολόγησης';
    }
  };

  // 🎮 Handle card click
  const handleClick = () => {
    onPricingSelect?.(pricingType);
  };

  // 🎨 Style based on selection state
  const cardStyle: React.CSSProperties = {
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    borderColor: isSelected ? 'var(--color-primary-500)' : undefined,
    backgroundColor: isSelected ? 'var(--color-primary-50)' : undefined,
    opacity: opacity === 'transparent' ? 0.6 : opacity === 'semi-transparent' ? 0.8 : 1
  };

  return (
    <BaseCard
      title={getCardTitle()}
      variant={isSelected ? 'filled' : 'outline'}
      onClick={handleClick}
      style={cardStyle}
      data-testid={`pricing-card-${pricingType}`}
    >
      <Stack spacing="md" align="center">
        {/* 🎯 Icon Display */}
        {icon && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '8px'
          }}>
            {icon}
          </div>
        )}

        {/* 📝 Description */}
        <Text size="sm" color="neutral-600" align="center">
          {getCardDescription()}
        </Text>

        {/* 🎯 Context-Aware Extra Info */}
        {context.selectedCategory && context.selectedIntent && (
          <div style={{
            padding: '8px',
            backgroundColor: 'var(--color-neutral-100)',
            borderRadius: '4px',
            width: '100%'
          }}>
            <Text size="xs" color="neutral-500" align="center">
              {context.selectedCategory} • {context.selectedIntent}
            </Text>
          </div>
        )}

        {/* ✅ Selected Indicator */}
        {isSelected && (
          <div style={{
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-primary-500)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Text size="xs" color="white">✓</Text>
          </div>
        )}
      </Stack>
    </BaseCard>
  );
};