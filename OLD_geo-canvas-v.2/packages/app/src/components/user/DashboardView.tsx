import React, { useState, useMemo } from 'react';
import { useLayersContext } from '../../context/layers/LayersProvider';
import { useUiContext } from '../../context/UiContext';
import { ListingCategory } from '@geo-platform/shared';
import ListingCard from './dashboard/ListingCard';
import UserListingsTable from './dashboard/UserListingsTable';

const DashboardView: React.FC = () => {
    const { layers, actions: layersActions } = useLayersContext();
    const { actions } = useUiContext();
    const [activeFilter, setActiveFilter] = useState<ListingCategory | 'all'>('all');
    const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
    const [openListingId, setOpenListingId] = useState<string | null>(null);

    const handleToggleListing = (id: string) => {
        setOpenListingId(prevId => (prevId === id ? null : id));
    };

    const filteredLayers = useMemo(() => {
        const sortedLayers = [...layers].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        if (activeFilter === 'all') {
            return sortedLayers;
        }
        return sortedLayers.filter(layer => layer.category === activeFilter);
    }, [layers, activeFilter]);

    const handleViewOnMap = (layerId: string) => {
        actions.setActiveView('map');
        layersActions.zoomToLayer(layerId);
        if (window.innerWidth < 1024) {
            actions.toggleLayersPanel(false);
        }
    };

    const handleDelete = (layerId: string) => {
        layersActions.removeLayer(layerId);
    };

    const FilterButton: React.FC<{ filter: ListingCategory | 'all', label: string }> = ({ filter, label }) => (
        <button
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeFilter === filter
                    ? 'bg-blue-600 text-white shadow'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
        >
            {label}
        </button>
    );

    return (
        <div className="p-4 sm:p-6 bg-gray-50 h-full overflow-y-auto flex flex-col">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4">
                <h1 className="text-2xl font-bold text-gray-800">Ο Πίνακας Ελέγχou μου</h1>
                 <div className="flex items-center gap-2 mt-4 sm:mt-0 p-1 bg-gray-200 rounded-lg self-start">
                    <button
                        onClick={() => setViewMode('cards')}
                        title="Προβολή Καρτών"
                        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors flex items-center gap-2 ${
                            viewMode === 'cards' ? 'bg-white text-gray-800 shadow' : 'bg-transparent text-gray-600 hover:bg-gray-300'
                        }`}
                    >
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                        Κάρτες
                    </button>
                    <button
                        onClick={() => setViewMode('table')}
                        title="Προβολή Πίνακα"
                        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors flex items-center gap-2 ${
                            viewMode === 'table' ? 'bg-white text-gray-800 shadow' : 'bg-transparent text-gray-600 hover:bg-gray-300'
                        }`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
                        Πίνακας
                    </button>
                </div>
            </div>
            
            <div className="flex items-center gap-2 mb-6 p-1 bg-gray-200 rounded-lg self-start">
                <FilterButton filter="all" label="Όλα" />
                <FilterButton filter="property" label="Ακίνητα" />
                <FilterButton filter="job" label="Εργασία" />
            </div>

            {filteredLayers.length === 0 ? (
                <div className="flex-grow flex flex-col items-center justify-center text-center py-12">
                    <p className="text-gray-500">Δεν υπάρχουν καταχωρήσεις σε αυτή την κατηγορία.</p>
                     <button onClick={actions.startWizard} className="mt-4 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                        Δημιουργία Νέας Καταχώρησης
                    </button>
                </div>
            ) : (
                viewMode === 'cards' ? (
                    <div className="space-y-2">
                        {filteredLayers.map(layer => (
                            <ListingCard 
                                key={layer.id} 
                                layer={layer} 
                                onViewOnMap={handleViewOnMap} 
                                onDelete={handleDelete}
                                isOpen={openListingId === layer.id}
                                onToggle={() => handleToggleListing(layer.id)}
                            />
                        ))}
                    </div>
                ) : (
                    <UserListingsTable listings={filteredLayers} onViewOnMap={handleViewOnMap} onDelete={handleDelete} />
                )
            )}
        </div>
    );
};

export default DashboardView;