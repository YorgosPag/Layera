/**
 * Header.tsx - Local Header Wrapper
 *
 * Simple wrapper around LayeraHeader for backward compatibility
 * Routes to unified LayeraHeader component with geo-canvas variant
 */

import React from 'react';
import { LayeraHeader } from '@layera/layout';

interface HeaderProps {
  onAddContentClick?: () => void;
  onTestPanelClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onAddContentClick,
  onTestPanelClick
}) => {
  return (
    <LayeraHeader
      variant="geo-canvas"
      onAddContentClick={onAddContentClick}
      onTestPanelClick={onTestPanelClick}
    />
  );
};