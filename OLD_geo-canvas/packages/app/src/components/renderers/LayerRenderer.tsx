import React from 'react';
import { ImportedLayer } from '@geo-platform/shared';
import DxfLayer from './DxfLayer';
import RasterLayer from './RasterLayer';
import BackgroundPolygon from './BackgroundPolygon';
import GeometryLayer from './GeometryLayer';

interface LayerRendererProps {
    layer: ImportedLayer;
    layerToZoom: string | null;
    onZoomComplete: () => void;
    movingLayerId: string | null;
}

const LayerRenderer: React.FC<LayerRendererProps> = (props) => {
    const { layer } = props;

    switch (layer.type) {
        case 'dxf':
            return (
                <>
                    {layer.hasBackground && layer.bounds && <BackgroundPolygon layer={layer} />}
                    <DxfLayer {...props} />
                </>
            );
        case 'raster':
            // RasterLayer doesn't use movingLayerId, so we can omit it.
            const { movingLayerId: _movingId, ...rasterProps } = props;
            return <RasterLayer {...rasterProps} />;
        case 'geometry':
            const { movingLayerId: __movingId, ...geometryProps } = props;
            return <GeometryLayer {...geometryProps} />;
        default:
            console.warn(`Unknown layer type: ${layer.type}`);
            return null;
    }
};

export default LayerRenderer;