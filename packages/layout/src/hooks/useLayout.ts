import { useState, useCallback } from 'react';
import { LayoutState, LayoutActions } from '../types';
import { useResponsive } from './useResponsive';

/**
 * useLayout - Hook για layout state management
 */
export const useLayout = (): [LayoutState, LayoutActions] => {
  const { currentBreakpoint } = useResponsive();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(64);
  const [sidebarWidth, setSidebarWidth] = useState(280);

  const toggleSidebar = useCallback(() => {
    setSidebarCollapsed(prev => !prev);
  }, []);

  const handleSetSidebarCollapsed = useCallback((collapsed: boolean) => {
    setSidebarCollapsed(collapsed);
  }, []);

  const handleSetHeaderHeight = useCallback((height: number) => {
    setHeaderHeight(height);
  }, []);

  const state: LayoutState = {
    sidebarCollapsed,
    headerHeight,
    sidebarWidth,
    breakpoint: currentBreakpoint
  };

  const actions: LayoutActions = {
    toggleSidebar,
    setSidebarCollapsed: handleSetSidebarCollapsed,
    setHeaderHeight: handleSetHeaderHeight
  };

  return [state, actions];
};