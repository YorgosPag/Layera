import React from 'react';
import { LayersProvider, useLayersContext } from './context/layers/LayersProvider';
import { UiProvider, useUiContext } from './context/UiContext';
import Header from './components/layout/Header';
import AdminDashboard from './components/admin/AdminDashboard';
import UserView from './components/user/UserView';

const MainApp: React.FC = () => {
    const { isAdminMode } = useUiContext();
    const { layers } = useLayersContext();

    return (
        <div className="h-screen w-screen flex flex-col bg-gray-100 font-sans">
            <Header />
            {/* The AdminDashboard now receives the live 'layers' from the context */}
            {isAdminMode ? <AdminDashboard listings={layers} /> : <UserView />}
        </div>
    );
};

const App: React.FC = () => {
    return (
        <LayersProvider>
            <UiProvider>
                <MainApp />
            </UiProvider>
        </LayersProvider>
    );
};

export default App;
