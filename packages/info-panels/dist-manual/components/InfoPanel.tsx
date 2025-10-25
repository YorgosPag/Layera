/**
 * InfoPanel.tsx - Enterprise Universal Info Panel Component
 *
 * Universal responsive info panel που λειτουργεί σε όλες τις συσκευές
 */

import React from 'react';
import {
  DEFAULT_INFO_PANEL_STYLES,
  getCategoryTheme
} from '../';
import { SPACING_SCALE, BORDER_RADIUS_SCALE } from '@layera/constants';
import { BOX_SHADOW_SCALE } from '@layera/box-shadows';
import { Text } from '@layera/typography';
import type { CategoryType } from '../hooks/useCategoryTheming';

export interface InfoPanelProps {
  /** Unique identifier for the panel */
  cardId: string;
  /** Close handler */
  onClose: () => void;
  /** Content to display */
  content?: {
    title: string;
    content: string;
    type?: 'info' | 'warning' | 'error' | 'success';
  };
  /** Panel title (alternative to content.title) */
  title?: string;
  /** Panel content (alternative to content.content) */
  children?: React.ReactNode;
  /** Panel type/variant */
  variant?: 'info' | 'warning' | 'error' | 'success';
  /** Selected category for theming */
  selectedCategory?: CategoryType | string | null;
  /** Whether panel is open */
  isOpen?: boolean;
  /** Custom content getter function (backwards compatibility) */
  getInfoContent?: (cardId: string) => Promise<{ title: string; content: string }> | { title: string; content: string };
}

/**
 * Enterprise Universal InfoPanel Component
 *
 * Responsive info panel που λειτουργεί σε mobile, tablet και desktop
 * με enterprise theming και accessibility features
 */
export const InfoPanel = React.memo<InfoPanelProps>(({
  cardId,
  onClose,
  content,
  title,
  children,
  variant = 'info',
  selectedCategory,
  isOpen = true,
  getInfoContent
}) => {
  const [dynamicContent, setDynamicContent] = React.useState<{ title: string; content: string } | null>(null);
  const panelRef = React.useRef<HTMLDivElement>(null);

  // Backwards compatibility: Load content dynamically if getInfoContent provided
  React.useEffect(() => {
    if (getInfoContent && !content && !title && !children) {
      const loadContent = async () => {
        try {
          const result = await getInfoContent(cardId);
          setDynamicContent(result);
        } catch (error) {
          console.warn('Failed to load info content:', error);
          setDynamicContent({
            title: 'Πληροφορίες',
            content: 'Δεν υπάρχουν διαθέσιμες πληροφορίες.'
          });
        }
      };
      loadContent();
    }
  }, [cardId, getInfoContent, content, title, children]);

  // Leaflet map interaction handling (if map exists)
  React.useEffect(() => {
    const panel = panelRef.current;
    const mapElement = document.querySelector('.leaflet-container') as HTMLElement | null;
    if (!panel || !mapElement) return;

    const previousPointerEvents = mapElement.style.pointerEvents;

    const handlePanelEnter = () => {
      mapElement.style.pointerEvents = 'none';
    };

    const handlePanelLeave = () => {
      mapElement.style.pointerEvents = previousPointerEvents;
    };

    panel.addEventListener('mouseenter', handlePanelEnter);
    panel.addEventListener('mouseleave', handlePanelLeave);

    return () => {
      handlePanelLeave();
      panel.removeEventListener('mouseenter', handlePanelEnter);
      panel.removeEventListener('mouseleave', handlePanelLeave);
    };
  }, []);

  // Leaflet propagation prevention
  React.useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    try {
      const L = (window as any).L;
      if (L?.DomEvent) {
        L.DomEvent.disableClickPropagation(panel);
        L.DomEvent.disableScrollPropagation(panel);
      }
    } catch (error) {
      // Leaflet not available - continue without it
    }

    const mapContainer = document.querySelector('.leaflet-container') as any;
    const leafletMap = mapContainer?._leaflet_map || (window as any)._leaflet_map || null;

    if (!leafletMap) return;

    const handlePanelEnter = () => {
      try {
        leafletMap.dragging?.disable();
        leafletMap.boxZoom?.disable();
        leafletMap.doubleClickZoom?.disable();
        leafletMap.scrollWheelZoom?.disable();
        leafletMap.keyboard?.disable();
      } catch (error) {
        // Map interaction disabling failed - continue
      }
    };

    const handlePanelLeave = () => {
      try {
        leafletMap.dragging?.enable();
        leafletMap.boxZoom?.enable();
        leafletMap.doubleClickZoom?.enable();
        leafletMap.scrollWheelZoom?.enable();
        leafletMap.keyboard?.enable();
      } catch (error) {
        // Map interaction enabling failed - continue
      }
    };

    panel.addEventListener('mouseenter', handlePanelEnter);
    panel.addEventListener('mouseleave', handlePanelLeave);

    return () => {
      handlePanelLeave();
      panel.removeEventListener('mouseenter', handlePanelEnter);
      panel.removeEventListener('mouseleave', handlePanelLeave);
    };
  }, []);

  // Stable cursor styling
  React.useEffect(() => {
    const style = document.createElement('style');
    style.id = `info-panel-${cardId}`;
    style.textContent = `
      .info-panel-stable {
        cursor: default;
      }
      .info-panel-stable * {
        cursor: inherit;
      }
      .info-panel-stable .content-text {
        user-select: text;
      }
      .info-panel-stable button,
      .info-panel-stable a,
      .info-panel-stable [role="button"] {
        cursor: pointer !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      const element = document.getElementById(`info-panel-${cardId}`);
      if (element) element.remove();
    };
  }, [cardId]);

  if (!isOpen) return null;

  // Determine content to display
  const displayContent = content || dynamicContent || {
    title: title || 'Πληροφορίες',
    content: children ? '' : 'Δεν υπάρχουν διαθέσιμες πληροφορίες.'
  };

  if (!displayContent && !children) return null;

  // Enterprise theme-aware styling
  const categoryTheme = getCategoryTheme(selectedCategory as CategoryType);
  const mobileStyles = DEFAULT_INFO_PANEL_STYLES.mobile;

  return (
    <div
      ref={panelRef}
      className="info-panel-stable"
      style={{
        position: 'fixed',
        ...mobileStyles.position,
        backgroundColor: categoryTheme.backgroundColor,
        border: `1px solid ${categoryTheme.borderColor}`,
        boxShadow: BOX_SHADOW_SCALE.cardDefault,
        borderRadius: `${BORDER_RADIUS_SCALE.CARD}px`,
        padding: `${SPACING_SCALE.MD}px ${SPACING_SCALE.XL + SPACING_SCALE.SM}px ${SPACING_SCALE.MD}px ${SPACING_SCALE.MD}px`,
        minHeight: 'auto',
        maxHeight: mobileStyles.maxHeight,
        overflow: mobileStyles.overflow as 'auto',
        zIndex: mobileStyles.zIndex
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Close button */}
      <button
        type="button"
        aria-label="Close"
        style={{
          position: 'absolute',
          top: `${SPACING_SCALE.XS}px`,
          right: `${SPACING_SCALE.XS}px`,
          width: `${SPACING_SCALE.LG}px`,
          height: `${SPACING_SCALE.LG}px`,
          border: 'none',
          borderRadius: BORDER_RADIUS_SCALE.CIRCLE,
          backgroundColor: 'var(--color-bg-surface-overlay)',
          color: '#fff',
          fontWeight: 'var(--layera-font-bold)',
          lineHeight: '1',
          zIndex: mobileStyles.zIndex + 1,
          cursor: 'pointer'
        }}
        onClick={onClose}
      >
        ×
      </button>

      {/* Content */}
      {displayContent.title && (
        <Text size="sm" weight="bold" style={{
          color: categoryTheme.textColor,
          marginBottom: `${SPACING_SCALE.SM}px`,
          display: 'block'
        }}>
          {displayContent.title}
        </Text>
      )}

      {children ? (
        <div style={{ color: categoryTheme.textColor }}>
          {children}
        </div>
      ) : (
        <div
          className="content-text"
          style={{
            color: categoryTheme.textColor,
            fontSize: 'var(--layera-text-sm)',
            lineHeight: '1.4'
          }}
          dangerouslySetInnerHTML={{ __html: displayContent.content }}
        />
      )}
    </div>
  );
});

InfoPanel.displayName = 'InfoPanel';