import React from 'react';
import { ImportedLayer } from '@geo-platform/shared';
import MapWithRulers from '../map/MapWithRulers';

interface AdminMapViewProps {
    listings: ImportedLayer[];
    layerToZoom: string | null;
    onZoomComplete: () => void;
}

const AdminMapView: React.FC<AdminMapViewProps> = ({ listings, layerToZoom, onZoomComplete }) => {
    // We filter for visible layers here, respecting the user's setting from the layers panel
    const visibleLayers = listings.filter(l => l.isVisible);

    return (
        <div className="w-full h-full rounded-lg overflow-hidden">
            <MapWithRulers
                layers={visibleLayers}
                layerToZoom={layerToZoom}
                onZoomComplete={onZoomComplete}
                movingLayerId={null}
                searchedLocation={null}
                onSearchLocationViewed={() => {}}
            >
                {/* This map will not have editing overlays or other interactive children */}
            </MapWithRulers>
        </div>
    );
};

export default AdminMapView;