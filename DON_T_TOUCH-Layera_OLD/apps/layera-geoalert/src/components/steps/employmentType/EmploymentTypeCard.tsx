/**
 * EmploymentTypeCard.tsx - Reusable Employment Type Option Card
 *
 * Unified Card implementation για employment type selection
 * Migrated από BaseCard wrapper στο νέο UnifiedCard system
 */

import React from 'react';
import { UnifiedCard, createSelectionCard } from '@layera/cards';
import { ToolIcon, HospitalIcon, TruckIcon, StoreIcon } from '@layera/icons';
import type { EmploymentType } from './types';

interface EmploymentTypeCardProps {
  employmentType: EmploymentType;
  title: string;
  description?: string;
  onClick: () => void;
  'data-testid'?: string;
}

/**
 * Employment Type Selection Card
 * Powered by UnifiedCard configuration system
 */
export const EmploymentTypeCard: React.FC<EmploymentTypeCardProps> = ({
  employmentType,
  title,
  description,
  onClick,
  'data-testid': testId
}) => {
  // Skip rendering for invalid employmentType
  if (!employmentType) {
    return null;
  }

  const getIcon = () => {
    switch (employmentType) {
      case 'full_time':
        return <ToolIcon size="sm" theme="neutral" />;
      case 'part_time':
        return <HospitalIcon size="sm" theme="neutral" />;
      case 'freelance':
        return <TruckIcon size="sm" theme="neutral" />;
      case 'seasonal':
        return <StoreIcon size="sm" theme="neutral" />;
      default:
        return <ToolIcon size="sm" theme="neutral" />;
    }
  };

  const handleEmploymentSelect = React.useCallback((employment: unknown) => {
    if ('vibrate' in navigator) {
      navigator.vibrate(20);
    }
    onClick();
  }, [onClick]);

  // Create unified card configuration
  const cardConfig = createSelectionCard({
    id: `employment-type-${employmentType}`,
    title,
    description,
    icon: getIcon(),
    selectionValue: employmentType,
    category: 'job',
    theme: 'job',
    onClick: () => handleEmploymentSelect(employmentType),
    testId: testId || `employment-type-${employmentType}-card`
  });

  // Create card context
  const cardContext = {
    currentStep: 'employmentType',
    category: 'job' as const,
    viewMode: 'mobile' as const
  };

  return (
    <UnifiedCard
      config={cardConfig}
      context={cardContext}
    />
  );
};