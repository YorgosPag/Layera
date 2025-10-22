/**
 * InfoPanel.tsx - Standalone Info Panel Component
 *
 * Αποσπασμένο από CategoryStep για να αποφύγουμε continuous re-renders
 */

import React from 'react';
import {
  INFO_PANEL_THEMES,
  DEFAULT_INFO_PANEL_STYLES,
  getCategoryTheme
} from '@layera/info-panels';
import type { CategoryType } from '@layera/info-panels';
import { installCursorDebug, installLiveStackDebug } from '../../../../../debug/cursorDebug';
import type { CardId, Category } from './cardData';

export interface InfoPanelProps {
  cardId: CardId;
  onClose: () => void;
  getInfoContent: (cardId: CardId) => Promise<{ title: string; content: string }>;
  selectedCategory: Category | null;
}

/**
 * Standalone InfoPanel Component - αποτρέπει continuous re-renders
 */
export const InfoPanel = React.memo<InfoPanelProps>(({
  cardId,
  onClose,
  getInfoContent,
  selectedCategory
}) => {
  const [infoData, setInfoData] = React.useState<{ title: string; content: string } | null>(null);
  const panelRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    getInfoContent(cardId).then(setInfoData);
  }, [cardId, getInfoContent]);

  // Cursor debugging - απενεργοποιημένο μετά την επιδιόρθωση
  React.useEffect(() => {
    if (!window.__LAYERA_DEBUG_CURSOR) return;

    const cleanupDebug = installCursorDebug({
      panelSelector: '.info-panel-stable',
      mapSelector: '.leaflet-container'
    });
    const cleanupStack = installLiveStackDebug();

    // Install global helper function
    (window as any).__who = (x: number, y: number) =>
      document.elementsFromPoint(x, y)
        .map(element => (element as HTMLElement).outerHTML.slice(0, 80));

    return () => {
      cleanupDebug();
      cleanupStack();
      delete (window as any).__who;
    };
  }, [cardId]);

  // "Φραγή" Leaflet όταν το pointer είναι στο panel
  React.useEffect(() => {
    const panel = panelRef.current;
    const mapElement = document.querySelector('.leaflet-container') as HTMLElement | null;
    if (!panel || !mapElement) return;

    const previousPointerEvents = mapElement.style.pointerEvents;

    const handlePanelEnter = () => {
      // Σταματά ο χάρτης να λαμβάνει events
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

  // Leaflet propagation guard (προαιρετικά αν έχουμε πρόσβαση στο map instance)
  React.useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    // Προσπάθεια να βρούμε το Leaflet instance
    const mapContainer = document.querySelector('.leaflet-container') as any;
    const leafletMap = mapContainer?._leaflet_map || (window as any)._leaflet_map || null;

    if (!leafletMap || typeof leafletMap.dragging?.disable !== 'function') {
      return;
    }

    // Disable Leaflet click/scroll propagation για το panel
    try {
      // Αν υπάρχει το L global object
      const L = (window as any).L;
      if (L?.DomEvent) {
        L.DomEvent.disableClickPropagation(panel);
        L.DomEvent.disableScrollPropagation(panel);
      }
    } catch (error) {
      // Leaflet propagation setup failed - continue without it
    }

    const handlePanelEnterAdvanced = () => {
      try {
        leafletMap.dragging?.disable();
        leafletMap.boxZoom?.disable();
        leafletMap.doubleClickZoom?.disable();
        leafletMap.scrollWheelZoom?.disable();
        leafletMap.keyboard?.disable();
      } catch (error) {
        // Leaflet interaction disabling failed - continue without it
      }
    };

    const handlePanelLeaveAdvanced = () => {
      try {
        leafletMap.dragging?.enable();
        leafletMap.boxZoom?.enable();
        leafletMap.doubleClickZoom?.enable();
        leafletMap.scrollWheelZoom?.enable();
        leafletMap.keyboard?.enable();
      } catch (error) {
        // Leaflet interaction enabling failed - continue without it
      }
    };

    panel.addEventListener('mouseenter', handlePanelEnterAdvanced);
    panel.addEventListener('mouseleave', handlePanelLeaveAdvanced);

    return () => {
      handlePanelLeaveAdvanced();
      panel.removeEventListener('mouseenter', handlePanelEnterAdvanced);
      panel.removeEventListener('mouseleave', handlePanelLeaveAdvanced);
    };
  }, []);

  React.useEffect(() => {
    // Scoped CSS λύση - καθαρή και σταθερή
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
        cursor: inherit !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      const element = document.getElementById(`info-panel-${cardId}`);
      if (element) element.remove();
    };
  }, [cardId]);

  if (!infoData) return null;

  // 🚀 ENTERPRISE THEME-AWARE SYSTEM: Αυτόματη σύνδεση με category colors
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
        boxShadow: `0 4px 12px rgba(0, 0, 0, 0.15)`,
        borderRadius: 12,
        padding: '16px 40px 16px 16px',
        minHeight: 'auto',
        maxHeight: mobileStyles.maxHeight,
        overflow: mobileStyles.overflow,
        zIndex: mobileStyles.zIndex
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Clean close button - χωρίς mouse handlers */}
      <button
        type="button"
        aria-label="Close"
        style={{
          position: 'absolute',
          top: 8,
          right: 8,
          width: 24,
          height: 24,
          border: 'none',
          borderRadius: '50%',
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
          color: '#fff',
          fontSize: '16px',
          fontWeight: 'bold',
          lineHeight: '1',
          zIndex: mobileStyles.zIndex + 1
        }}
        onClick={onClose}
      >
        ×
      </button>

      {/* Content */}
      <div style={{ color: categoryTheme.textColor, fontWeight: 'bold', fontSize: 14, marginBottom: 8 }}>
        {infoData.title}
      </div>
      <div
        className="content-text"
        style={{ color: categoryTheme.textColor, fontSize: 12, lineHeight: '1.4' }}
        dangerouslySetInnerHTML={{ __html: infoData.content }}
      />
    </div>
  );
});