import React from 'react';
// FIX: Replaced deprecated useAppContext with useUiContext as AppContext is obsolete.
import { useUiContext } from '../context/UiContext';

const Header: React.FC = () => {
  const { isAdminMode, actions } = useUiContext();

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 flex-shrink-0 z-40">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-semibold text-gray-800">Geo-Canvas</h1>
        <button 
          onClick={actions.toggleAdminMode} 
          title="Εναλλαγή Προβολής Διαχειριστή"
          className={`p-2 rounded-full transition-colors ${isAdminMode ? 'bg-red-100 text-red-700' : 'text-gray-400 hover:bg-gray-100 hover:text-gray-700'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 1.944A11.954 11.954 0 012.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0110 1.944zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      <div>
        <img className="h-10 w-10 rounded-full object-cover" src="https://picsum.photos/100" alt="User avatar" />
      </div>
    </header>
  );
};

export default Header;