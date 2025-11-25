import React from 'react';
import { Box, Flex } from '@layera/layout';
import { Heading } from '@layera/typography';
import { ColorButtonGroup } from './header/ColorButtonGroup';
import { HeaderNav } from './header/HeaderNav';
import { LeftSidebar } from './sidebar/LeftSidebar';
import { RightSidebar } from './sidebar/RightSidebar';
import { MainContent } from './main/MainContent';

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
      {/* Header Section - GROK AI Box/Flex ARXES COMPLIANT */}
      <Box as="header" className="layera-app-header">
        <Flex className="layera-header-content">
          <Flex className="layera-header-left">
            <Heading
              className="layera-header-title"
              data-size="xl"
              data-weight="semibold"
            >
              🎨 Layera Design System Preview - Tables Ready
            </Heading>

            <ColorButtonGroup
              activeColor={activeColor}
              onColorChange={setActiveColor}
            />
          </Flex>

          <HeaderNav
            leftSidebarOpen={leftSidebarOpen}
            rightSidebarOpen={rightSidebarOpen}
            onToggleLeftSidebar={() => setLeftSidebarOpen(!leftSidebarOpen)}
            onToggleRightSidebar={() => setRightSidebarOpen(!rightSidebarOpen)}
          />
        </Flex>
      </Box>

      {/* Main Layout Container */}
      <Flex className="layera-app-layout">

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