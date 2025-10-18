
// Standard AutoCAD Color Index (ACI) to HEX mapping.
// A selection of common colors.
const ACI_COLORS: { [key: number]: string } = {
    0: '#000000', // ByBlock
    1: '#FF0000', // Red
    2: '#FFFF00', // Yellow
    3: '#00FF00', // Green
    4: '#00FFFF', // Cyan
    5: '#0000FF', // Blue
    6: '#FF00FF', // Magenta
    7: '#FFFFFF', // White
    8: '#404040',
    9: '#808080',
    256: '#000000', // ByLayer
};

const BYLAYER = 256;
const BYBLOCK = 0;
const DEFAULT_COLOR = '#FFFFFF';


export interface DxfVertex {
    x: number;
    y: number;
    z?: number;
}

export interface DxfEntity {
    type: string;
    layer: string;
    colorNumber?: number;
    startPoint?: DxfVertex;
    endPoint?: DxfVertex;
    vertices?: DxfVertex[];
    shape?: boolean; // For polylines
    center?: DxfVertex;
    radius?: number;
    text?: string;
    block?: string; // block name for INSERT
}

export interface DxfBlock {
    name: string;
    entities: DxfEntity[];
}

export interface DxfLayerTable {
    layers: { [key: string]: { colorNumber: number, name: string } };
}

export interface DxfData {
    entities: DxfEntity[];
    blocks: { [key: string]: DxfBlock };
    layers: { [key: string]: { colorNumber: number } }; // Fallback for older parser versions
    tables: {
        layer: DxfLayerTable;
    }
}

export interface DxfRenderInfo {
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
    width: number;
    height: number;
}

export interface ColorContext {
    parentAciColor?: number;
    parentLayerName?: string;
}

export const getDxfString = (buffer: ArrayBuffer): Promise<string> => {
    return new Promise((resolve) => {
        // This is a simplified decoder. A more robust solution would handle different encodings.
        const decoder = new TextDecoder('utf-8');
        resolve(decoder.decode(buffer));
    });
};


const updateBoundsForVertex = (v: DxfVertex, bounds: { minX: number, minY: number, maxX: number, maxY: number }) => {
    if (v && typeof v.x === 'number' && typeof v.y === 'number') {
        bounds.minX = Math.min(bounds.minX, v.x);
        bounds.minY = Math.min(bounds.minY, v.y);
        bounds.maxX = Math.max(bounds.maxX, v.x);
        bounds.maxY = Math.max(bounds.maxY, v.y);
    }
}

const getEntityBounds = (entity: DxfEntity, dxfData: DxfData, bounds: { minX: number, minY: number, maxX: number, maxY: number }) => {
    if (!entity) return;

    switch(entity.type) {
        case 'LINE':
            if (entity.startPoint) updateBoundsForVertex(entity.startPoint, bounds);
            if (entity.endPoint) updateBoundsForVertex(entity.endPoint, bounds);
            break;
        case 'LWPOLYLINE':
        case 'POLYLINE':
            entity.vertices?.forEach(v => updateBoundsForVertex(v, bounds));
            break;
        case 'CIRCLE':
        case 'ARC':
            if (entity.center && entity.radius) {
                updateBoundsForVertex({x: entity.center.x - entity.radius, y: entity.center.y - entity.radius}, bounds);
                updateBoundsForVertex({x: entity.center.x + entity.radius, y: entity.center.y + entity.radius}, bounds);
            }
            break;
        case 'INSERT':
            if (entity.block && dxfData.blocks && dxfData.blocks[entity.block]) {
                const block = dxfData.blocks[entity.block];
                if (!block.entities) return;

                const origin = entity.center || { x: 0, y: 0, z: 0 };
                block.entities.forEach(blockEntity => {
                    // Create a deep copy to avoid mutating the original block definition
                    const transformedEntity = JSON.parse(JSON.stringify(blockEntity));

                    const transformPoint = (p: DxfVertex) => {
                        if (!p) return { x: origin.x, y: origin.y };
                        return { x: (p.x || 0) + origin.x, y: (p.y || 0) + origin.y };
                    };
                    
                    if (transformedEntity.vertices) {
                        transformedEntity.vertices = transformedEntity.vertices.map(transformPoint);
                    }
                    if (transformedEntity.startPoint) {
                        transformedEntity.startPoint = transformPoint(transformedEntity.startPoint);
                    }
                    if (transformedEntity.endPoint) {
                        transformedEntity.endPoint = transformPoint(transformedEntity.endPoint);
                    }
                    if (transformedEntity.center) {
                        transformedEntity.center = transformPoint(transformedEntity.center);
                    }

                    getEntityBounds(transformedEntity, dxfData, bounds);
                });
            }
            break;
        // TEXT, MTEXT, etc. don't have geometric bounds in this simplified model
    }
}


export const getDxfBounds = (dxfData: DxfData): DxfRenderInfo => {
    const bounds = {
        minX: Infinity,
        minY: Infinity,
        maxX: -Infinity,
        maxY: -Infinity,
    };

    if (dxfData && dxfData.entities) {
        dxfData.entities.forEach(entity => getEntityBounds(entity, dxfData, bounds));
    }

    // If no entities with geometry were found, default to a 1x1 box at origin
    if (!isFinite(bounds.minX)) {
        bounds.minX = 0;
        bounds.minY = 0;
        bounds.maxX = 1;
        bounds.maxY = 1;
    }


    const width = bounds.maxX - bounds.minX;
    const height = bounds.maxY - bounds.minY;

    return { ...bounds, width: width || 1, height: height || 1 };
}

export const getEntityColor = (entity: DxfEntity, dxfData: DxfData, parentContext?: ColorContext): string => {
    let aciColor = entity.colorNumber;

    if (aciColor === BYBLOCK) {
        aciColor = parentContext?.parentAciColor;
    }
    
    if (aciColor === BYLAYER || aciColor === undefined) {
        const layerName = entity.layer;
        const layer = dxfData.tables?.layer?.layers?.[layerName] || dxfData.layers?.[layerName];
        aciColor = layer?.colorNumber;
    }

    // Default to white if color is still unresolved
    if (aciColor === undefined || aciColor < 0) {
        aciColor = 7;
    }

    return ACI_COLORS[aciColor] || DEFAULT_COLOR;
}
