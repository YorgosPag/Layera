import React from 'react';
import { useLayeraTranslation } from '@layera/tolgee';
import { Button } from '@layera/buttons';
import { BUTTON_VARIANTS, BUTTON_SIZES } from '@layera/constants';
import { HomeIcon, SearchIcon, SettingsIcon } from '@layera/icons';
import { Box } from '@layera/layout';

interface NavButtonProps {
  title: string;
  onClick: () => void;
  isActive?: boolean;
  children: React.ReactNode;
}

const NavButton: React.FC<NavButtonProps> = ({ title, onClick, isActive, children }) => (
  <Button
    variant={isActive ? BUTTON_VARIANTS.PRIMARY : BUTTON_VARIANTS.GHOST}
    size={BUTTON_SIZES.MEDIUM}
    onClick={onClick}
    icon={children}
    iconPosition="only"
    className="w-12 h-12"
    aria-label={title}
  />
);

interface NavigationRailProps {
  activeView: 'dashboard' | 'map';
  isLayersPanelOpen: boolean;
  onViewChange: (view: 'dashboard' | 'map') => void;
  onToggleLayersPanel: () => void;
  onNewAlert: () => void;
  onFlyToUserLocation: () => void;
}

const NavigationRail: React.FC<NavigationRailProps> = ({
  activeView,
  isLayersPanelOpen,
  onViewChange,
  onToggleLayersPanel,
  onNewAlert,
  onFlyToUserLocation
}) => {
  const { t } = useLayeraTranslation();

  return (
    <aside className="w-16 bg-gray-800 text-white flex flex-col items-center py-4 space-y-6 flex-shrink-0 z-30">
      {/* Main Action Button */}
      <Button
        variant={BUTTON_VARIANTS.PRIMARY}
        size={BUTTON_SIZES.MEDIUM}
        onClick={onNewAlert}
        icon={<SearchIcon size="md" />}
        iconPosition="only"
        className="w-12 h-12 rounded-full shadow-lg"
        aria-label={t('newAlert')}
      />

      <Box className="flex-grow flex flex-col items-center space-y-4">
        <NavButton
          onClick={() => onViewChange('dashboard')}
          title={t('dashboard')}
          isActive={activeView === 'dashboard'}
        >
          <HomeIcon size="md" />
        </NavButton>

        <NavButton
          onClick={() => {
            onViewChange('map');
            onFlyToUserLocation();
            if (isLayersPanelOpen) onToggleLayersPanel();
          }}
          title={t('myLocation')}
          isActive={activeView === 'map' && !isLayersPanelOpen}
        >
          <SearchIcon size="md" />
        </NavButton>

        <NavButton
          onClick={onToggleLayersPanel}
          title={t('areas')}
          isActive={isLayersPanelOpen}
        >
          <SettingsIcon size="md" />
        </NavButton>
      </Box>
    </aside>
  );
};

export default NavigationRail;