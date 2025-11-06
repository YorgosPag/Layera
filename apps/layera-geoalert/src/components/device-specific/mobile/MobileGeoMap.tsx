/**
 * MobileGeoMap.tsx - ΜΟΝΟ για κινητά τηλέφωνα
 * Εδώ θα γράφουμε μόνο τα UI elements για mobile συσκευές
 */

import React from 'react';
import { useLayeraTranslation } from '@layera/tolgee';
import { UI_CONFIG, COLORS } from '../../../constants';
import { SPACING_SCALE, BORDER_RADIUS_SCALE, getCardInfoColor } from '@layera/constants';
import { Text } from '@layera/typography';
import { BOX_SHADOW_SCALE } from '@layera/box-shadows';
import { getCursorVar } from '@layera/cursors';
import { Flex } from '@layera/layout';
import { Button } from '@layera/buttons';

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
      <Flex
        gap="sm"
        position="absolute"
        top={`${UI_CONFIG.mobileGeoMap.position.top}px`}
        left={`${UI_CONFIG.mobileGeoMap.position.left}px`}
        right={`${UI_CONFIG.mobileGeoMap.position.right}px`}
        zIndex={UI_CONFIG.mobileGeoMap.zIndex}
        padding="xs"
      >
        {/* Ακίνητα Button - Green */}
        <Button
          size="md"
          flex={1}
          border={`1px solid ${COLORS.categories.property.dark}`}
          borderRadius="sm"
          padding={`${UI_CONFIG.mobileGeoMap.button.padding}px`}
          cursor="pointer"
          boxShadow="shadowSuccess"
          style={{ backgroundColor: getCardInfoColor() }} // 🔴 SST: Mobile button color από μοναδική πηγή αλήθειας
          minHeight={`${UI_CONFIG.mobileGeoMap.button.minHeight}px`}
        onClick={(): void => {
        }}
        onMouseOver={(e: React.FormEvent<HTMLFormElement>) => {
          e.currentTarget.style.backgroundColor = COLORS.categories.property.dark;
        }}
        onMouseOut={(e: React.FormEvent<HTMLFormElement>) => {
          e.currentTarget.style.backgroundColor = COLORS.categories.property.light;
        }}
        >
          <Text
            size="xs"
            weight="bold"
            color="white"
            textAlign="center"
          >
            {t('categories.property', 'Ακίνητα')}
          </Text>
        </Button>

        {/* Εργασία Button - Blue */}
        <Button
          variant="primary"
          size="md"
          flex={1}
          backgroundColor="interactive-primary"
          border="1px solid var(--color-interactive-primary)"
          borderRadius="sm"
          padding={`${SPACING_SCALE.SM + SPACING_SCALE.XS}px`}
          cursor="pointer"
          boxShadow="shadowInfo"
          minHeight={`${UI_CONFIG.mobileGeoMap.button.minHeight}px`}
        onClick={(): void => {
        }}
        onMouseOver={(e: React.FormEvent<HTMLFormElement>) => {
          e.currentTarget.style.backgroundColor = COLORS.categories.job.dark;
        }}
        onMouseOut={(e: React.FormEvent<HTMLFormElement>) => {
          e.currentTarget.style.backgroundColor = COLORS.categories.job.light;
        }}
        >
          <Text
            size="xs"
            weight="bold"
            color="white"
            textAlign="center"
          >
            {t('categories.job', 'Εργασία')}
          </Text>
        </Button>
      </Flex>

      {/* Εδώ θα προσθέτουμε περισσότερα mobile-specific UI elements */}
    </>
  );
};