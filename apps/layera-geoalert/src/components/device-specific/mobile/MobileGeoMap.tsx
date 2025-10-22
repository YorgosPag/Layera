/**
 * MobileGeoMap.tsx - ΜΟΝΟ για κινητά τηλέφωνα
 * Εδώ θα γράφουμε μόνο τα UI elements για mobile συσκευές
 */

import React from 'react';
import { useLayeraTranslation } from '@layera/tolgee';
import { UI_CONFIG, COLORS } from '../../../constants';

export interface MobileGeoMapProps {
  // Props που χρειάζονται για το mobile UI
}

/**
 * Mobile-specific UI elements για το GeoMap
 * Περιλαμβάνει: πλήκτρα, κάρτες, mobile navigation κλπ
 */
export const MobileGeoMap: React.FC<MobileGeoMapProps> = () => {
  const { t } = useLayeraTranslation();

  return (
    <>
      {/* Permanent Category Buttons - MOBILE ONLY */}
      <div style={{
        position: 'absolute',
        top: `${UI_CONFIG.mobileGeoMap.position.top}px`,
        left: `${UI_CONFIG.mobileGeoMap.position.left}px`,
        right: `${UI_CONFIG.mobileGeoMap.position.right}px`,
        zIndex: UI_CONFIG.mobileGeoMap.zIndex,
        display: 'flex',
        gap: `${UI_CONFIG.mobileGeoMap.gap}px`,
        padding: '0 4px'
      }}>
        {/* Ακίνητα Button - Green */}
        <button style={{
          flex: 1,
          backgroundColor: COLORS.categories.property.light,
          border: `1px solid ${COLORS.categories.property.dark}`,
          borderRadius: `${UI_CONFIG.mobileGeoMap.button.borderRadius}px`,
          padding: `${UI_CONFIG.mobileGeoMap.button.padding}px`,
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          boxShadow: '0 2px 4px rgba(34, 197, 94, 0.2)',
          minHeight: `${UI_CONFIG.mobileGeoMap.button.minHeight}px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onClick={() => {
          console.log('Mobile: Property selected');
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = COLORS.categories.property.dark;
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = COLORS.categories.property.light;
        }}
        >
          <span style={{
            fontSize: '0.8rem',
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center'
          }}>
            {t('pipeline.categories.property.title', 'Ακίνητα')}
          </span>
        </button>

        {/* Εργασία Button - Blue */}
        <button style={{
          flex: 1,
          backgroundColor: '#3b82f6',
          border: '1px solid #2563eb',
          borderRadius: '8px',
          padding: '10px',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          boxShadow: '0 2px 4px rgba(59, 130, 246, 0.2)',
          minHeight: '45px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onClick={() => {
          console.log('Mobile: Job selected');
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.backgroundColor = COLORS.categories.job.dark;
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.backgroundColor = COLORS.categories.job.light;
        }}
        >
          <span style={{
            fontSize: '0.8rem',
            fontWeight: 'bold',
            color: 'white',
            textAlign: 'center'
          }}>
            {t('pipeline.categories.job.title', 'Εργασία')}
          </span>
        </button>
      </div>

      {/* Εδώ θα προσθέτουμε περισσότερα mobile-specific UI elements */}
    </>
  );
};