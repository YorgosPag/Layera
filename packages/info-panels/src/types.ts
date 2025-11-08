import React from "react";
/**
 * Info Panels Types - Enterprise LEGO System
 *
 * Clean domain types που μπορούν να χρησιμοποιηθούν από οποιοδήποτε project
 * χωρίς dependencies σε specific UI libraries ή frameworks.
 */

export type InfoPanelId = string;

export interface InfoPanelContent {
  id: InfoPanelId;
  title: string;
  content: string;
  category?: string;
  metadata?: Record<string, unknown>;
}

export interface InfoPanelConfig {
  id: InfoPanelId;
  titleKey: string;
  contentKey: string;
  category?: string;
  fallbackTitle?: string;
  fallbackContent?: string;
}

export interface InfoPanelTheme {
  backgroundColor: string;
  color: string;
  borderColor?: string;
  boxShadow?: string;
  borderRadius?: string;
  fontSize?: string;
  padding?: string;
}

export interface InfoPanelStyleConfig {
  position?: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
  };
  zIndex?: number;
  maxHeight?: string;
  overflow?: string;
  theme?: InfoPanelTheme;
}

export interface InfoPanelRegistry {
  [key: InfoPanelId]: InfoPanelConfig;
}

// Content Provider Interface - για διαφορετικές πηγές content
export interface InfoPanelContentProvider {
  getContent(id: InfoPanelId, locale?: string): Promise<InfoPanelContent>;
  hasContent(id: InfoPanelId): boolean;
}

// Event Handler Types
export interface InfoPanelEventHandlers {
  onShow?: (id: InfoPanelId) => void;
  onHide?: (id: InfoPanelId) => void;
  onClick?: (id: InfoPanelId) => void;
}

// Context State
export interface InfoPanelState {
  visiblePanels: Set<InfoPanelId>;
  registry: InfoPanelRegistry;
  contentProvider: InfoPanelContentProvider;
  defaultStyle?: InfoPanelStyleConfig;
  eventHandlers?: InfoPanelEventHandlers;
}

// Hook Return Type
export interface UseInfoPanelReturn {
  showPanel: (id: InfoPanelId) => React.ReactNode;
  hidePanel: (id: InfoPanelId) => React.ReactNode;
  togglePanel: (id: InfoPanelId) => React.ReactNode;
  isVisible: (id: InfoPanelId) => boolean;
  getContent: (id: InfoPanelId) => Promise<InfoPanelContent>;
  registerPanel: (config: InfoPanelConfig) => React.ReactNode;
  unregisterPanel: (id: InfoPanelId) => React.ReactNode;
}

// Provider Props
export interface InfoPanelProviderProps {
  children: React.ReactNode;
  registry?: InfoPanelRegistry;
  contentProvider?: InfoPanelContentProvider;
  defaultStyle?: InfoPanelStyleConfig;
  eventHandlers?: InfoPanelEventHandlers;
}