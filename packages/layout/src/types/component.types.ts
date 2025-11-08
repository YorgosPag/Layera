import { ReactNode } from 'react';
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
  children: ReactNode;
  header?: ReactNode;
  sidebar?: ReactNode;
  footer?: ReactNode;
  layout?: LayoutVariant;
  className?: string;
  sidebarCollapsed?: boolean;
  onSidebarToggle?: (collapsed: boolean) => void;
}

export interface LayeraHeaderProps {
  title: string;
  subtitle?: string;
  logo?: ReactNode;
  navigation?: ReactNode;
  actions?: ReactNode;
  variant?: HeaderVariant;
  sticky?: boolean;
  className?: string;
}




export interface PageContainerProps {
  children: ReactNode;
  maxWidth?: ContainerMaxWidth;
  padding?: SpacingSize;
  className?: string;
}

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  breadcrumbs?: ReactNode;
  className?: string;
}

export interface HeaderActionsGroupProps {
  children: ReactNode;
  className?: string;
}

// Box Component Types
export type BoxStyleProps = Pick<React.CSSProperties,
  | 'minHeight' | 'position'
  | 'justifyContent' | 'flexDirection' | 'flexWrap' | 'borderBottom' | 'zIndex' | 'boxShadow'
>;