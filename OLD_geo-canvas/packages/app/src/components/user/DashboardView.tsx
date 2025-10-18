import React, { useState, useMemo } from 'react';
import { useLayersContext } from '../../context/LayersContext';
import { useUiContext } from '../../context/UiContext';
import { ListingCategory } from '@geo-platform/shared';
import ListingCard from '../dashboard/ListingCard';

const DashboardView: React.FC = () => {
    const { layers } = useLayersContext();
    const { actions } = useUiContext();
    const [activeFilter, setActiveFilter] = useState<ListingCategory | 'all'>('all');

    const filteredLayers = useMemo(() => {
        const sortedLayers = [...layers].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        if (activeFilter === 'all') {
            return sortedLayers;
        }
        return sortedLayers.filter(layer => layer.category === activeFilter);
    }, [layers, activeFilter]);

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
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Ο Πίνακας Ελέγχου μου</h1>
            
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
                <div className="space-y-4">
                    {filteredLayers.map(layer => (
                        <ListingCard key={layer.id} layer={layer} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default DashboardView;
