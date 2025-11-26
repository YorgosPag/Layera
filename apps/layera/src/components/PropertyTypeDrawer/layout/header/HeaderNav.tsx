import React from 'react';
import { Flex } from '@layera/layout';
import { Button } from '@layera/buttons';
import { Text } from '@layera/typography';

export interface HeaderNavProps {
  leftSidebarOpen: boolean;
  rightSidebarOpen: boolean;
  onToggleLeftSidebar: () => void;
  onToggleRightSidebar: () => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  onToggleLeftSidebar,
  onToggleRightSidebar
}) => {
  return (
    <Flex as="nav" className="layera-header-nav">
      <Flex className="layera-flex layera-flex--gap-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleLeftSidebar}
          className="layera-toggle-btn"
        >
          ⚙️
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleRightSidebar}
          className="layera-toggle-btn"
        >
          🎨
        </Button>
      </Flex>

      <input
        type="text"
        placeholder="🔍 Search..."
        className="layera-input-search"
      />

      <input
        type="text"
        placeholder="📍 Location"
        className="layera-input-location"
      />

      <Button variant="ghost" className="layera-profile-btn">
        <Text>👤 Profile</Text>
      </Button>
    </Flex>
  );
};