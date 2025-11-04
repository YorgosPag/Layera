import React from 'react';
import { useUiContext } from '../../context/UiContext';
import LayersPanel from '../layout/LayersPanel';
import MapView from './MapView';
import DashboardView from './DashboardView';

const UserView: React.FC = () => {
    const { activeView } = useUiContext();
    
    return (
        <div className="flex flex-grow overflow-hidden">
            <LayersPanel />
            <main className="flex-grow h-full relative">
                {activeView === 'map' && <MapView />}
                {activeView === 'dashboard' && <DashboardView />}
            </main>
        </div>
    );
}

export default UserView;