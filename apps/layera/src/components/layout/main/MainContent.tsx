import React from 'react';
import { Box, Flex } from '@layera/layout';
import { Text, Heading } from '@layera/typography';
import { Button } from '@layera/buttons';
import { LayoutThemesSection } from '../LayoutThemesSection';
import { PrimaryCardTab } from './tabs/cards/PrimaryCardTab';
import { SecondaryCardTab } from './tabs/cards/SecondaryCardTab';
import { SuccessCardTab } from './tabs/cards/SuccessCardTab';
import { WarningCardTab } from './tabs/cards/WarningCardTab';
import { DangerCardTab } from './tabs/cards/DangerCardTab';
import { InfoCardTab } from './tabs/cards/InfoCardTab';
import { PrimaryLayoutTab } from './tabs/layout/PrimaryLayoutTab';
import { SecondaryLayoutTab } from './tabs/layout/SecondaryLayoutTab';
import { SuccessLayoutTab } from './tabs/layout/SuccessLayoutTab';
import { WarningLayoutTab } from './tabs/layout/WarningLayoutTab';
import { DangerLayoutTab } from './tabs/layout/DangerLayoutTab';
import { InfoLayoutTab } from './tabs/layout/InfoLayoutTab';
import { PrimaryTableTab } from './tabs/tables/PrimaryTableTab';
import { SecondaryTableTab } from './tabs/tables/SecondaryTableTab';
import { SuccessTableTab } from './tabs/tables/SuccessTableTab';
import { WarningTableTab } from './tabs/tables/WarningTableTab';
import { DangerTableTab } from './tabs/tables/DangerTableTab';
import { InfoTableTab } from './tabs/tables/InfoTableTab';
import { PrimaryModalTab } from './tabs/modals/PrimaryModalTab';

export interface MainContentProps {
  activeTab: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
  onTabChange: (tab: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info') => void;
  activeSection: 'cards' | 'layout' | 'tables' | 'modals';
  onSectionChange: (section: 'cards' | 'layout' | 'tables' | 'modals') => void;
}

export const MainContent: React.FC<MainContentProps> = ({ activeTab, onTabChange, activeSection, onSectionChange }) => {
  return (
    <Box as="main" className="layera-main-content layera-main-scrollable">
      <Box className="layera-main-content-inner">

      {/* Layout Themes Section - 100% ARXES Compliant Component */}
      <LayoutThemesSection />

      {/* Section Navigation - Cards vs Layout vs Tables vs Modals */}
      <Flex className="layera-sections">
        <Button
          variant="ghost"
          className={`layera-section ${activeSection === 'cards' ? 'layera-section--active' : ''}`}
          onClick={() => onSectionChange('cards')}
        >
          🃏 Cards
        </Button>
        <Button
          variant="ghost"
          className={`layera-section ${activeSection === 'layout' ? 'layera-section--active' : ''}`}
          onClick={() => onSectionChange('layout')}
        >
          🎯 Layout
        </Button>
        <Button
          variant="ghost"
          className={`layera-section ${activeSection === 'tables' ? 'layera-section--active' : ''}`}
          onClick={() => onSectionChange('tables')}
        >
          📊 Tables
        </Button>
        <Button
          variant="ghost"
          className={`layera-section ${activeSection === 'modals' ? 'layera-section--active' : ''}`}
          onClick={() => onSectionChange('modals')}
        >
          📋 Modals
        </Button>
      </Flex>

      {/* Tab Navigation */}
      <Flex className="layera-tabs">
        {(['primary', 'secondary', 'success', 'warning', 'danger', 'info'] as const).map((tab) => (
          <Button
            key={tab}
            variant="ghost"
            className={`layera-tab ${activeTab === tab ? `layera-tab--active layera-tab--${tab}--active` : ''}`}
            onClick={() => onTabChange(tab)}
          >
{tab.charAt(0).toUpperCase() + tab.slice(1)} {activeSection === 'cards' ? 'Cards' : activeSection === 'layout' ? 'Layout' : activeSection === 'tables' ? 'Tables' : 'Modals'}
          </Button>
        ))}
      </Flex>

      {/* Tab Content - Δυναμικό περιεχόμενο ανάλογα με το section και tab */}
      <Box className="layera-tab-panel">
        {activeSection === 'cards' && (
          <>
            {activeTab === 'primary' && <PrimaryCardTab />}
            {activeTab === 'secondary' && <SecondaryCardTab />}
            {activeTab === 'success' && <SuccessCardTab />}
            {activeTab === 'warning' && <WarningCardTab />}
            {activeTab === 'danger' && <DangerCardTab />}
            {activeTab === 'info' && <InfoCardTab />}
          </>
        )}

        {activeSection === 'layout' && (
          <>
            {activeTab === 'primary' && <PrimaryLayoutTab />}
            {activeTab === 'secondary' && <SecondaryLayoutTab />}
            {activeTab === 'success' && <SuccessLayoutTab />}
            {activeTab === 'warning' && <WarningLayoutTab />}
            {activeTab === 'danger' && <DangerLayoutTab />}
            {activeTab === 'info' && <InfoLayoutTab />}
          </>
        )}

        {activeSection === 'tables' && (
          <>
            {activeTab === 'primary' && <PrimaryTableTab />}
            {activeTab === 'secondary' && <SecondaryTableTab />}
            {activeTab === 'success' && <SuccessTableTab />}
            {activeTab === 'warning' && <WarningTableTab />}
            {activeTab === 'danger' && <DangerTableTab />}
            {activeTab === 'info' && <InfoTableTab />}
          </>
        )}

        {activeSection === 'modals' && (
          <>
            {activeTab === 'primary' && <PrimaryModalTab />}
          </>
        )}
      </Box>
      </Box>
    </Box>
  );
};