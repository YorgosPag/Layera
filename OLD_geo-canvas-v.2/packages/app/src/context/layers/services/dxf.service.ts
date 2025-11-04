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

/**
 * Calculates the perceived luminance of a hex color.
 * @param hex The hex color string (e.g., '#FF0000').
 * @returns A value between 0 (black) and 1 (white).
 */
const getLuminance = (hex: string): number => {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return 0;

    const r = parseInt(result[1], 16);
    const g = parseInt(result[2], 16);
    const b = parseInt(result[3], 16);
    // Formula for perceived luminance from WCAG
    return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
};


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

/**
 * Maps a DXF $DWGCODEPAGE value to a browser-compatible encoding name.
 * @param codepage The string value from the DXF header (e.g., 'ANSI_1253').
 * @returns A string representing the encoding (e.g., 'windows-1253').
 */
export const getEncodingFromCodepage = (codepage: string): string => {
    const cp = codepage.toUpperCase();
    if (cp.includes('1253')) return 'windows-1253'; // Greek
    if (cp.includes('1252')) return 'windows-1252'; // Western European
    if (cp.includes('1250')) return 'windows-1250'; // Central European
    if (cp.includes('1251')) return 'windows-1251'; // Cyrillic
    if (cp.includes('UTF-8')) return 'utf-8';
    // Add other mappings as needed
    return 'windows-1253'; // Default fallback to Greek for this specific user's needs.
};

// FIX: Added getDxfString function to correctly decode DXF files based on their codepage.
/**
 * Decodes a DXF file ArrayBuffer into a string, attempting to use the correct encoding.
 * @param buffer The ArrayBuffer of the DXF file.
 * @returns A promise that resolves to the decoded string.
 */
export const getDxfString = async (buffer: ArrayBuffer): Promise<string> => {
    // Helper to quickly scan for the codepage without decoding the whole file
    const findCodepage = (buf: ArrayBuffer): string => {
        const text = new TextDecoder('ascii').decode(buf.slice(0, 4096)); // Scan first 4KB
        const match = text.match(/\$DWGCODEPAGE\s*\n\s*3\s*\n\s*([^\s\n]+)/);
        return match ? match[1] : 'ANSI_1253'; // Default to Greek codepage if not found
    };
    
    const codepage = findCodepage(buffer);
    const encoding = getEncodingFromCodepage(codepage);
    const decoder = new TextDecoder(encoding, { fatal: false });
    return decoder.decode(buffer);
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
    const e = entity as any; // Use 'any' to access properties not in our simplified type

    switch(e.type) {
        case 'LINE':
            if (e.startPoint) updateBoundsForVertex(e.startPoint, bounds);
            if (e.endPoint) updateBoundsForVertex(e.endPoint, bounds);
            break;
        case 'LWPOLYLINE':
        case 'POLYLINE':
        case 'SPLINE':
             // For splines, control points give a rough bounding box.
            const vertices = e.vertices || e.controlPoints;
            vertices?.forEach((v: DxfVertex) => updateBoundsForVertex(v, bounds));
            break;
        case 'CIRCLE':
        case 'ARC':
            if (e.center && e.radius) {
                updateBoundsForVertex({x: e.center.x - e.radius, y: e.center.y - e.radius}, bounds);
                updateBoundsForVertex({x: e.center.x + e.radius, y: e.center.y + e.radius}, bounds);
            }
            break;
        case 'ELLIPSE':
             if (e.center && e.majorAxisEndPoint) {
                const a = Math.sqrt(Math.pow(e.majorAxisEndPoint.x, 2) + Math.pow(e.majorAxisEndPoint.y, 2));
                updateBoundsForVertex({ x: e.center.x - a, y: e.center.y - a }, bounds);
                updateBoundsForVertex({ x: e.center.x + a, y: e.center.y + a }, bounds);
            }
            break;
        case 'SOLID':
             e.vertices?.forEach((v: DxfVertex) => updateBoundsForVertex(v, bounds));
            break;
        case 'TEXT':
        case 'MTEXT':
            if (e.startPoint) updateBoundsForVertex(e.startPoint, bounds);
            break;
        case 'INSERT':
            if (e.block && dxfData.blocks && dxfData.blocks[e.block]) {
                const block = dxfData.blocks[e.block];
                if (!block.entities) return;

                const origin = e.center || { x: 0, y: 0, z: 0 };
                const xScale = e.xScale || 1;
                const yScale = e.yScale || 1;
                const rotation = e.rotation || 0;
                const rotationRad = rotation * (Math.PI / 180);
                const cos = Math.cos(rotationRad);
                const sin = Math.sin(rotationRad);

                block.entities.forEach(blockEntity => {
                    // Create a temporary transformed entity just for bounds calculation
                    const transformedEntity = JSON.parse(JSON.stringify(blockEntity));

                     const transformPoint = (p: DxfVertex): DxfVertex => {
                        const initialX = p.x || 0;
                        const initialY = p.y || 0;
                        const scaledX = initialX * xScale;
                        const scaledY = initialY * yScale;
                        const rotatedX = scaledX * cos - scaledY * sin;
                        const rotatedY = scaledX * sin + scaledY * cos;
                        return { x: rotatedX + origin.x, y: rotatedY + origin.y };
                    };
                    
                    if (transformedEntity.vertices) transformedEntity.vertices = transformedEntity.vertices.map(transformPoint);
                    if (transformedEntity.controlPoints) transformedEntity.controlPoints = transformedEntity.controlPoints.map(transformPoint);
                    if (transformedEntity.startPoint) transformedEntity.startPoint = transformPoint(transformedEntity.startPoint);
                    if (transformedEntity.endPoint) transformedEntity.endPoint = transformPoint(transformedEntity.endPoint);
                    if (transformedEntity.center) transformedEntity.center = transformPoint(transformedEntity.center);
                     
                    if (transformedEntity.majorAxisEndPoint) {
                        const maj = transformedEntity.majorAxisEndPoint;
                        const scaledX = maj.x * xScale;
                        const scaledY = maj.y * yScale;
                        transformedEntity.majorAxisEndPoint = {
                            x: scaledX * cos - scaledY * sin,
                            y: scaledX * sin + scaledY * cos
                        };
                    }
                    if (transformedEntity.radius) transformedEntity.radius *= Math.max(Math.abs(xScale), Math.abs(yScale));

                    getEntityBounds(transformedEntity, dxfData, bounds);
                });
            }
            break;
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

    const color = ACI_COLORS[aciColor] || DEFAULT_COLOR;

    // Check luminance. If it's a very light color, render it as black to be visible on a light map.
    // This threshold handles white, yellow, and cyan.
    if (getLuminance(color) > 0.65) {
        return '#000000';
    }
    
    return color;
}