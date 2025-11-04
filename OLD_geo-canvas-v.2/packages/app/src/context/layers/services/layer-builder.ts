import L from 'leaflet';
import { ImportedLayer, LayerType } from '@geo-platform/shared';
import { getFileInfo } from './file-info';
import { boundsFromMeters } from './geo-math';

const LONGEST_SIDE_METERS = 100;

/**
 * Constructs a new ImportedLayer object from a file and map center.
 * @param file The file to be added.
 * @param buffer The ArrayBuffer of the file content.
 * @param center The center point on the map where the layer should be placed.
 * @returns A promise that resolves to a newly created ImportedLayer object.
 */
export const buildLayerFromFile = async (file: File, buffer: ArrayBuffer, center: L.LatLng): Promise<ImportedLayer> => {
    const fileType = file.name.split('.').pop()?.toLowerCase();
    const layerType: LayerType = (fileType === 'dxf') ? 'dxf' : 'raster';

    const { width: intrinsicWidth, height: intrinsicHeight, aspectRatio } = await getFileInfo(file, buffer.slice(0));
    
    let widthMeters, heightMeters;
    
    // For DXF, use its intrinsic size (assuming units are meters).
    // For rasters, scale them to a default size on the map.
    if (layerType === 'dxf') {
        widthMeters = intrinsicWidth;
        heightMeters = intrinsicHeight;
    } else { // raster
        if (aspectRatio >= 1) {
            widthMeters = LONGEST_SIDE_METERS;
            heightMeters = LONGEST_SIDE_METERS / aspectRatio;
        } else {
            heightMeters = LONGEST_SIDE_METERS;
            widthMeters = LONGEST_SIDE_METERS * aspectRatio;
        }
    }

    const defaultBounds = boundsFromMeters(center, widthMeters, heightMeters);

    const newLayer: ImportedLayer = {
        id: `layer-${Date.now()}`,
        name: file.name,
        type: layerType,
        data: buffer,
        bounds: defaultBounds,
        isVisible: true,
        opacity: 1,
        rotation: 0,
        hasBackground: layerType === 'dxf',
        intrinsicWidth,
        intrinsicHeight,
        geometry: null,
        createdAt: new Date().toISOString(),
    };
    return newLayer;
};