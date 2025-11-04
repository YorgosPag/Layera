import React from 'react';
import { LayersProvider, useLayersContext } from './packages/app/src/context/layers/LayersProvider';
import { UiProvider, useUiContext } from './packages/app/src/context/UiContext';
import Header from './packages/app/src/components/layout/Header';
import AdminDashboard from './packages/app/src/components/admin/AdminDashboard';
import UserView from './packages/app/src/components/user/UserView';
import Toast from './packages/app/src/components/layout/Toast';

const MainApp: React.FC = () => {
    const { isAdminMode } = useUiContext();
    const { layers } = useLayersContext();

    return (
        <div className="h-screen w-screen flex flex-col bg-gray-100 font-sans">
            <Header />
            {isAdminMode ? <AdminDashboard listings={layers} /> : <UserView />}
            <Toast />
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