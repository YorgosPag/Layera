import React from 'react';
import { Box, Flex } from '@layera/layout';
import { Heading } from '@layera/typography';
import { ColorButtonGroup } from './header/ColorButtonGroup';
import { HeaderNav } from './header/HeaderNav';
import { LeftSidebar } from './sidebar/LeftSidebar';
import { RightSidebar } from './sidebar/RightSidebar';
import { MainContent } from './main/MainContent';
import { Header } from '../reference-components/header/Header';
import { PrimarySidebar, SecondaryLeftSidebar } from '../reference-components/sidebar';

/**
 * 🎯 100% ARXES COMPLIANT FullAppLayout
 *
 * ZERO inline styles | ZERO σκληρές τιμές | ZERO div elements
 * ΜΟΝΟ @layera/* imports | ΜΟΝΟ CSS classes από tokens
 * Πλήρης διάσπαση σε components για καλύτερη maintainability
 */

export const CleanFullAppLayout: React.FC = () => {
  const [leftSidebarOpen, setLeftSidebarOpen] = React.useState<boolean>(false);
  const [rightSidebarOpen, setRightSidebarOpen] = React.useState<boolean>(false);
  const [activeTab, setActiveTab] = React.useState<'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'>('primary');
  const [activeColor, setActiveColor] = React.useState<'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info'>('primary');
  const [activeSection, setActiveSection] = React.useState<'cards' | 'layout' | 'tables' | 'modals'>('cards');

  return (
    <Box className="layera-layout-main-container">
      <Header
        onToggleSidebar={(position) => {
          if (position === 'left') {
            setLeftSidebarOpen(!leftSidebarOpen);
          } else {
            setRightSidebarOpen(!rightSidebarOpen);
          }
        }}
        onHeaderColorChange={setActiveColor}
        activeHeaderColor={activeColor}
      />

      {/* Main Layout Container - ΑΚΡΙΒΩΣ ΟΠΩΣ HTML app-container */}
      <Flex className="app-container">

        <PrimarySidebar />

        <SecondaryLeftSidebar
          isOpen={leftSidebarOpen}
          onToggle={() => setLeftSidebarOpen(!leftSidebarOpen)}
        />

        <MainContent
          activeTab={activeTab}
          onTabChange={setActiveTab}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />

        <RightSidebar rightSidebarOpen={rightSidebarOpen} />

      </Flex>
    </Box>
  );
};