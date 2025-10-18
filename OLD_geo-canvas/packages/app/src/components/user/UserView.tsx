import React from 'react';
import { useUiContext } from '../../context/UiContext';
import NavigationRail from '../layout/NavigationRail';
import LayersPanel from '../layout/LayersPanel';
import MapView from './MapView';
import DashboardView from './DashboardView';

const UserView: React.FC = () => {
    const { activeView } = useUiContext();
    
    return (
        <div className="flex flex-grow overflow-hidden">
            <NavigationRail />
            <LayersPanel />
            <main className="flex-grow h-full relative">
                {activeView === 'map' && <MapView />}
                {activeView === 'dashboard' && <DashboardView />}
            </main>
        </div>
    );
}

export default UserView;
