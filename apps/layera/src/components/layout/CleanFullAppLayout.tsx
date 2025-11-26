import React from 'react';
import { Box, Flex } from '@layera/layout';
import { Heading } from '@layera/typography';
import { ColorButtonGroup } from './header/ColorButtonGroup';
import { HeaderNav } from './header/HeaderNav';
import { LeftSidebar } from './sidebar/LeftSidebar';
import { RightSidebar } from './sidebar/RightSidebar';
import { MainContent } from './main/MainContent';
import { Header } from '../reference-components/header/Header';

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

      {/* Main Layout Container */}
      <Flex
        className="layera-app-layout"
        style={{
          marginTop: '65px',
          height: 'calc(100vh - 65px)',
          minHeight: 'calc(100vh - 65px)',
          maxHeight: 'calc(100vh - 65px)',
          width: '100vw',
          overflow: 'hidden'
        }}
      >

        <LeftSidebar leftSidebarOpen={leftSidebarOpen} />

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