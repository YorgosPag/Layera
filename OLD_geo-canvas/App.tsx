import React from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import Header from './components/layout/Header';
import AdminDashboard from './components/admin/AdminDashboard';
import UserView from './components/user/UserView';

const MainApp: React.FC = () => {
    const { isAdminMode, layers } = useAppContext();

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
        <AppProvider>
            <MainApp />
        </AppProvider>
    );
};

export default App;