
import React from 'react';
import { TileLayer } from 'react-leaflet';
// FIX: Corrected import path to point to the correct, non-empty context file.
import { useMapSettings } from '../../context/MapSettingsContext';

const BaseLayerManager: React.FC = () => {
    const { baseLayer } = useMapSettings();

    return (
        <>
            {baseLayer === 'osm' && (
                <TileLayer
                    key="osm"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    maxNativeZoom={19}
                    maxZoom={25}
                />
            )}
            {baseLayer === 'satellite' && (
                <TileLayer
                    key="satellite"
                    url='https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}'
                    maxNativeZoom={20}
                    maxZoom={25}
                    subdomains={['mt0','mt1','mt2','mt3']}
                    attribution='&copy; Google'
                />
            )}
        </>
    );
};

export default BaseLayerManager;