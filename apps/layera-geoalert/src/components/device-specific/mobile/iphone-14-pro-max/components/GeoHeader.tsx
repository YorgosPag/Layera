/**
 * GeoHeader.tsx - Τροποποιημένο GeoHeader για iPhone
 * Αντικαθιστά το υπάρχον header με σωστό τίτλο και controls
 */

import React from 'react';
import { useLayeraTranslation } from '@layera/tolgee';
import { LayeraHeader, HeaderActionsGroup } from '@layera/layout';
import { ThemeSwitcher } from '@layera/theme-switcher';
import { LanguageSwitcher } from '@layera/tolgee';

interface GeoHeaderProps {
  // Χωρίς onBackClick - δεν θέλουμε back button
}

/**
 * GeoHeader - Ειδικό header για iPhone 14 Pro Max
 * Χωρίς back button, με "Layera GeoAlert" τίτλο και language/theme switchers
 */
export const GeoHeader: React.FC<GeoHeaderProps> = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
      <LayeraHeader
        title="Layera GeoAlert"  // Hardcoded αντί για t('title')
        subtitle=""              // Χωρίς subtitle για compact design
        variant="minimal"
        actions={
          <HeaderActionsGroup>
            <LanguageSwitcher />
            <ThemeSwitcher variant="icon" size="md" />
          </HeaderActionsGroup>
        }
      />
    </div>
  );
};