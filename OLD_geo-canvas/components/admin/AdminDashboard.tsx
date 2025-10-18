import React, { useMemo, useState } from 'react';
import ListingsTable from './ListingsTable';
import StatCard from './StatCard';
import { ImportedLayer, ListingCategory, ListingIntent } from '../../shared/types';
import ListingDetailModal from './ListingDetailModal';
import { useAppContext } from '../../context/AppContext';
import AdminMapView from './AdminMapView';
import UsersTable from './UsersTable';
import { mockUsers } from './mockUsers';

interface AdminDashboardProps {
    listings: ImportedLayer[];
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ listings }) => {
    const { actions } = useAppContext();
    const [categoryFilter, setCategoryFilter] = useState<ListingCategory | 'all'>('all');
    const [intentFilter, setIntentFilter] = useState<ListingIntent | 'all'>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedListing, setSelectedListing] = useState<ImportedLayer | null>(null);
    const [adminView, setAdminView] = useState<'table' | 'map' | 'users'>('table');
    const [mapFocusLayerId, setMapFocusLayerId] = useState<string | null>(null);

    const stats = useMemo(() => {
        const total = listings.length;
        const properties = listings.filter(l => l.category === 'property').length;
        const jobs = listings.filter(l => l.category === 'job').length;
        return { total, properties, jobs };
    }, [listings]);

    const filteredListings = useMemo(() => {
        return listings.filter(listing => {
            const categoryMatch = categoryFilter === 'all' || listing.category === categoryFilter;
            const intentMatch = intentFilter === 'all' || listing.intent === intentFilter;
            const searchMatch = searchQuery === '' || listing.name.toLowerCase().includes(searchQuery.toLowerCase());
            return categoryMatch && intentMatch && searchMatch;
        });
    }, [categoryFilter, intentFilter, searchQuery, listings]);

    const handleView = (id: string) => {
        const listing = listings.find(l => l.id === id);
        if (listing) {
            setSelectedListing(listing);
        }
    };

    const handleDelete = (id: string) => {
        actions.removeLayer(id);
    };
    
    const handleViewOnMap = (id: string) => {
        setMapFocusLayerId(id);
        setAdminView('map');
    };

    const handleZoomComplete = () => {
        setMapFocusLayerId(null);
    };

    const closeModal = () => {
        setSelectedListing(null);
    };

    const renderContent = () => {
        switch (adminView) {
            case 'map':
                return (
                    <div className="bg-white rounded-lg shadow h-[60vh]">
                       <AdminMapView listings={listings} layerToZoom={mapFocusLayerId} onZoomComplete={handleZoomComplete} />
                    </div>
                );
            case 'users':
                return (
                    <div className="bg-white p-4 rounded-lg shadow">
                         <h2 className="text-lg font-semibold text-gray-700 mb-4">Διαχείριση Χρηστών</h2>
                         <UsersTable users={mockUsers} />
                    </div>
                );
            case 'table':
            default:
                return (
                     <div className="bg-white p-4 rounded-lg shadow">
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 gap-4">
                            <h2 className="text-lg font-semibold text-gray-700">Όλες οι Καταχωρήσεις</h2>
                            <div className="flex items-center gap-4 flex-wrap">
                                <div>
                                    <label htmlFor="search-filter" className="block text-xs font-medium text-gray-500">Αναζήτηση</label>
                                    <input
                                        id="search-filter"
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                        placeholder="Αναζήτηση τίτλου..."
                                    />
                                </div>
                                <div>
                                    <label htmlFor="category-filter" className="block text-xs font-medium text-gray-500">Κατηγορία</label>
                                    <select
                                        id="category-filter"
                                        value={categoryFilter}
                                        onChange={(e) => setCategoryFilter(e.target.value as ListingCategory | 'all')}
                                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                    >
                                        <option value="all">Όλες</option>
                                        <option value="property">Ακίνητα</option>
                                        <option value="job">Εργασία</option>
                                    </select>
                                </div>
                                 <div>
                                    <label htmlFor="intent-filter" className="block text-xs font-medium text-gray-500">Πρόθεση</label>
                                    <select
                                        id="intent-filter"
                                        value={intentFilter}
                                        onChange={(e) => setIntentFilter(e.target.value as ListingIntent | 'all')}
                                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                    >
                                        <option value="all">Όλες</option>
                                        <option value="offer">Προσφορές</option>
                                        <option value="search">Αναζητήσεις</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <ListingsTable listings={filteredListings} onView={handleView} onDelete={handleDelete} onViewOnMap={handleViewOnMap} />
                    </div>
                );
        }
    };

    return (
        <>
            <div className="p-4 sm:p-6 bg-gray-50 h-full overflow-y-auto">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Κεντρικός Πίνακας Ελέγχou</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <StatCard 
                        title="Σύνολο Καταχωρήσεων" 
                        value={stats.total} 
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        }
                        color="bg-blue-500"
                    />
                    <StatCard 
                        title="Καταχωρήσεις Ακινήτων" 
                        value={stats.properties}
                        icon={
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                        }
                         color="bg-green-500"
                    />
                    <StatCard 
                        title="Καταχωρήσεις Εργασίας" 
                        value={stats.jobs}
                        icon={
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        }
                        color="bg-indigo-500"
                    />
                </div>
                 <div className="flex items-center gap-2 mb-4 p-1 bg-gray-200 rounded-lg self-start">
                    <button
                        onClick={() => setAdminView('table')}
                        className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                            adminView === 'table' ? 'bg-white text-gray-800 shadow' : 'bg-transparent text-gray-600 hover:bg-gray-300'
                        }`}
                    >
                        Καταχωρήσεις
                    </button>
                    <button
                        onClick={() => setAdminView('map')}
                        className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                            adminView === 'map' ? 'bg-white text-gray-800 shadow' : 'bg-transparent text-gray-600 hover:bg-gray-300'
                        }`}
                    >
                        Χάρτης
                    </button>
                    <button
                        onClick={() => setAdminView('users')}
                        className={`px-4 py-1.5 text-sm font-medium rounded-md transition-colors ${
                            adminView === 'users' ? 'bg-white text-gray-800 shadow' : 'bg-transparent text-gray-600 hover:bg-gray-300'
                        }`}
                    >
                        Χρήστες
                    </button>
                </div>
                
                {renderContent()}

            </div>
            {selectedListing && <ListingDetailModal listing={selectedListing} onClose={closeModal} />}
        </>
    );
};

export default AdminDashboard;