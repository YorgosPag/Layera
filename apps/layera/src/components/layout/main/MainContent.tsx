import React from 'react';
import { Box, Flex } from '@layera/layout';
import { Text, Heading } from '@layera/typography';
import { Button } from '@layera/buttons';
import { LayoutThemesSection } from '../LayoutThemesSection';
import { PrimaryTabContent } from './tabs/PrimaryTabContent';
import { SecondaryTabContent } from './tabs/SecondaryTabContent';
import { SuccessTabContent } from './tabs/SuccessTabContent';
import { WarningTabContent } from './tabs/WarningTabContent';
import { DangerTabContent } from './tabs/DangerTabContent';
import { InfoTabContent } from './tabs/InfoTabContent';

export interface MainContentProps {
  activeTab: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info';
  onTabChange: (tab: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info') => void;
}

export const MainContent: React.FC<MainContentProps> = ({ activeTab, onTabChange }) => {
  return (
    <Box as="main" className="layera-main-content layera-main-scrollable">
      <Box className="layera-main-content-inner">

      {/* Layout Themes Section - 100% ARXES Compliant Component */}
      <LayoutThemesSection />

      {/* Tab Navigation */}
      <Flex className="layera-tabs">
        {(['primary', 'secondary', 'success', 'warning', 'danger', 'info'] as const).map((tab) => (
          <Button
            key={tab}
            variant="ghost"
            className={`layera-tab ${activeTab === tab ? `layera-tab--active layera-tab--${tab}--active` : ''}`}
            onClick={() => onTabChange(tab)}
          >
{tab.charAt(0).toUpperCase() + tab.slice(1)} Cards
          </Button>
        ))}
      </Flex>

      {/* Tab Content - Δυναμικό περιεχόμενο ανάλογα με το tab */}
      <Box className="layera-tab-panel">
        {activeTab === 'primary' && <PrimaryTabContent />}

        {activeTab === 'secondary' && <SecondaryTabContent />}

        {activeTab === 'success' && <SuccessTabContent />}

        {activeTab === 'warning' && <WarningTabContent />}

        {activeTab === 'danger' && <DangerTabContent />}

        {activeTab === 'info' && <InfoTabContent />}
      </Box>
      </Box>
    </Box>
  );
};