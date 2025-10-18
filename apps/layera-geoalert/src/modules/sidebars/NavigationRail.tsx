import React from 'react';

interface NavButtonProps {
  title: string;
  onClick: () => void;
  isActive?: boolean;
  children: React.ReactNode;
}

const NavButton: React.FC<NavButtonProps> = ({ title, onClick, isActive, children }) => (
  <button
    onClick={onClick}
    title={title}
    className={`w-12 h-12 flex items-center justify-center rounded-lg transition-colors ${
      isActive ? 'bg-blue-500 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
    }`}
  >
    {children}
  </button>
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
  return (
    <aside className="w-16 bg-gray-800 text-white flex flex-col items-center py-4 space-y-6 flex-shrink-0 z-30">
      {/* Main Action Button */}
      <button
        onClick={onNewAlert}
        title="Νέα Ειδοποίηση"
        className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
      </button>

      <div className="flex-grow flex flex-col items-center space-y-4">
        <NavButton
          onClick={() => onViewChange('dashboard')}
          title="Πίνακας Ελέγχου"
          isActive={activeView === 'dashboard'}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
        </NavButton>

        <NavButton
          onClick={() => {
            onViewChange('map');
            onFlyToUserLocation();
            if (isLayersPanelOpen) onToggleLayersPanel();
          }}
          title="Η Τοποθεσία μου"
          isActive={activeView === 'map' && !isLayersPanelOpen}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </NavButton>

        <NavButton
          onClick={onToggleLayersPanel}
          title="Περιοχές"
          isActive={isLayersPanelOpen}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
          </svg>
        </NavButton>
      </div>
    </aside>
  );
};

export default NavigationRail;