import React from 'react';
import {
  LayoutVariant,
  HeaderVariant,
  ContainerMaxWidth,
  SpacingSize
} from './layout.types';

/**
 * Component prop interfaces for Layera Layout System
 */

export interface AppShellProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
  footer?: React.ReactNode;
  layout?: LayoutVariant;
  className?: string;
  sidebarCollapsed?: boolean;
  onSidebarToggle?: (collapsed: boolean) => void;
}

export interface LayeraHeaderProps {
  // Enterprise Mode Props (original)
  title?: string;
  subtitle?: string;
  logo?: React.ReactNode;
  navigation?: React.ReactNode;
  actions?: React.ReactNode;
  variant?: HeaderVariant | 'geo-canvas';
  className?: string;

  // Geo-Canvas Mode Props (για backward compatibility)
  onAddContentClick?: () => void;
  onTestPanelClick?: () => void;
  onFullAppPreviewClick?: () => void;
}




export interface PageContainerProps {
  children: React.ReactNode;
  maxWidth?: ContainerMaxWidth;
  padding?: SpacingSize;
  className?: string;
}

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
  breadcrumbs?: React.ReactNode;
  className?: string;
}

export interface HeaderActionsGroupProps {
  children: React.ReactNode;
  className?: string;
}