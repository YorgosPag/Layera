/**
 * MobileGeoMap.tsx - ΜΟΝΟ για κινητά τηλέφωνα
 * Εδώ θα γράφουμε μόνο τα UI elements για mobile συσκευές
 */

import React from 'react';
import { useLayeraTranslation } from '@layera/tolgee';
import { UI_CONFIG, COLORS } from '../../../constants';
import { SPACING_SCALE, BORDER_RADIUS_SCALE } from '@layera/constants';
import { Text } from '@layera/typography';
import { BOX_SHADOW_SCALE } from '@layera/box-shadows';
import { getCursorVar } from '@layera/cursors';
import { Flex } from '@layera/layout';

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
      <Flex gap="sm" style={{
        position: 'absolute',
        top: `${UI_CONFIG.mobileGeoMap.position.top}px`,
        left: `${UI_CONFIG.mobileGeoMap.position.left}px`,
        right: `${UI_CONFIG.mobileGeoMap.position.right}px`,
        zIndex: UI_CONFIG.mobileGeoMap.zIndex,
        padding: `0 ${SPACING_SCALE.XS}px`
      }}>
        {/* Ακίνητα Button - Green */}
        <button style={{
          flex: 1,
          backgroundColor: COLORS.categories.property.light,
          border: `1px solid ${COLORS.categories.property.dark}`,
          borderRadius: `${BORDER_RADIUS_SCALE.SM}px`,
          padding: `${UI_CONFIG.mobileGeoMap.button.padding}px`,
          cursor: getCursorVar('pointer'), // Cursor system token για interactive elements
          transition: 'var(--layera-transition-fast)',
          boxShadow: BOX_SHADOW_SCALE.shadowSuccess,
          minHeight: `${UI_CONFIG.mobileGeoMap.button.minHeight}px`,
          // Layout handled by Flex wrapper
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
          <Text size="xs" weight="bold" style={{
            color: 'white',
            textAlign: 'center'
          }}>
            {t('categories.property', 'Ακίνητα')}
          </Text>
        </button>

        {/* Εργασία Button - Blue */}
        <button style={{
          flex: 1,
          backgroundColor: 'var(--color-interactive-primary)',
          border: '1px solid var(--color-interactive-primary)',
          borderRadius: `${BORDER_RADIUS_SCALE.SM}px`,
          padding: `${SPACING_SCALE.SM + SPACING_SCALE.XS}px`,
          cursor: getCursorVar('pointer'), // Cursor system token για interactive elements
          transition: 'var(--layera-transition-fast)',
          boxShadow: BOX_SHADOW_SCALE.shadowInfo,
          minHeight: `${UI_CONFIG.mobileGeoMap.button.minHeight}px`,
          // Layout handled by Flex wrapper
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
          <Text size="xs" weight="bold" style={{
            color: 'white',
            textAlign: 'center'
          }}>
            {t('categories.job', 'Εργασία')}
          </Text>
        </button>
      </Flex>

      {/* Εδώ θα προσθέτουμε περισσότερα mobile-specific UI elements */}
    </>
  );
};