import React, { memo } from 'react';
import { GeoJSON } from 'react-leaflet';
import { GeoJSONFeatureCollection } from '@geo-platform/shared';

interface SnappingLayerProps {
    data: GeoJSONFeatureCollection | null;
}

const SnappingLayer: React.FC<SnappingLayerProps> = memo(({ data }) => {
    if (!data) return null;
    return <GeoJSON data={data} style={{ color: '#ff7800', weight: 1, opacity: 0.65, interactive: false }} />;
});

export default SnappingLayer;