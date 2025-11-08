import React from 'react';
import { useLayeraTranslation } from '@layera/tolgee';
import { Button } from '@layera/buttons';
import { BUTTON_VARIANTS, BUTTON_SIZES } from '@layera/constants';
import './NavigationRail.css';
import { HomeIcon, SearchIcon, SettingsIcon } from '@layera/icons';
import { Box } from '@layera/layout';

interface NavButtonProps {
  title: string;
  onClick: () => React.ReactNode;
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
    className="nav-rail-button"
    aria-label={title}
  />
);

interface NavigationRailProps {
  activeView: 'dashboard' | 'map';
  isLayersPanelOpen: boolean;
  onViewChange: (view: 'dashboard' | 'map') => React.ReactNode;
  onToggleLayersPanel: () => React.ReactNode;
  onNewAlert: () => React.ReactNode;
  onFlyToUserLocation: () => React.ReactNode;
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
    <aside className="layera-navigation-rail nav-rail-layout">
      {/* Main Action Button */}
      <Button
        variant={BUTTON_VARIANTS.PRIMARY}
        size={BUTTON_SIZES.MEDIUM}
        onClick={onNewAlert}
        icon={<SearchIcon size="md" />}
        iconPosition="only"
        className="nav-rail-main-action"
        aria-label={t('newAlert')}
      />

      <Box className="nav-rail-content">
        <NavButton
          onClick={(): void => onViewChange('dashboard')}
          title={t('dashboard')}
          isActive={activeView === 'dashboard'}
        >
          <HomeIcon size="md" />
        </NavButton>

        <NavButton
          onClick={(): void => {
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