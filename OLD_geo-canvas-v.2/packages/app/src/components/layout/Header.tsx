import React from 'react';
import { useUiContext } from '../../context/UiContext';

const NavButton: React.FC<{ title: string, onClick: () => void, isActive?: boolean, children: React.ReactNode }> = ({ title, onClick, isActive, children }) => (
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

const Header: React.FC = () => {
  const { isAdminMode, activeView, isLayersPanelOpen, actions } = useUiContext();
  const { setActiveView, toggleLayersPanel, startWizard, flyToUserLocation, toggleAdminMode } = actions;

  return (
    <header className="h-16 bg-gray-800 text-white flex items-center justify-between px-4 flex-shrink-0 z-40">
      {/* Left side */}
      <div className="flex items-center gap-4">
        <button
            onClick={startWizard}
            title="Νέα Καταχώρηση"
            className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
        </button>
        <h1 className="text-xl font-semibold text-white hidden sm:block">Geo-Canvas</h1>
      </div>

      {/* Center navigation */}
      <div className="flex-grow flex justify-center items-center gap-2">
        <NavButton onClick={() => setActiveView('dashboard')} title="Πίνακας Ελέγχου" isActive={activeView === 'dashboard'}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
        </NavButton>

        <NavButton 
            onClick={() => {
                setActiveView('map');
                flyToUserLocation();
                toggleLayersPanel(false);
            }} 
            title="Η Τοποθεσία μου" 
            isActive={activeView === 'map' && !isLayersPanelOpen}
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        </NavButton>

        <NavButton onClick={() => toggleLayersPanel()} title="Επίπεδα" isActive={isLayersPanelOpen}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
        </NavButton>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleAdminMode} 
          title="Εναλλαγή Προβολής Διαχειριστή"
          className={`p-2 rounded-full transition-colors ${isAdminMode ? 'bg-red-500 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
          </svg>
        </button>
        <img className="h-10 w-10 rounded-full object-cover" src="https://picsum.photos/100" alt="Εικόνα προφίλ χρήστη" />
      </div>
    </header>
  );
};

export default Header;