import React, { memo } from 'react';
import { Polyline, Circle, Marker, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import { DxfEntity, DxfVertex, DxfData, DxfRenderInfo, getEntityColor, ColorContext } from '../../context/layers/services/dxf.service';

interface DxfEntityRendererProps {
    entity: DxfEntity;
    project: (point: DxfVertex) => L.LatLng;
    dxfData: DxfData;
    dxfRenderInfo: DxfRenderInfo;
    entityKey: number | string;
    opacity: number;
    parentContext?: ColorContext;
}

const DxfEntityRenderer: React.FC<DxfEntityRendererProps> = memo(({ entity, project, dxfData, dxfRenderInfo, entityKey, opacity, parentContext }) => {
    const color = getEntityColor(entity, dxfData, parentContext);
    const pathOptions = { color, weight: 1, opacity };

    switch (entity.type) {
        case 'LINE':
            if (entity.startPoint && entity.endPoint) {
                return <Polyline positions={[project(entity.startPoint), project(entity.endPoint)]} pathOptions={pathOptions} />;
            }
            return null;

        case 'LWPOLYLINE':
        case 'POLYLINE':
            if (entity.vertices && entity.vertices.length > 0) {
                const positions = entity.vertices.map(project);
                if (entity.shape) { // Closed polyline
                    positions.push(positions[0]);
                }
                return <Polyline positions={positions} pathOptions={pathOptions} />;
            }
            return null;

        case 'CIRCLE':
        case 'ARC':
            if (entity.center && entity.radius) {
                // Leaflet's Circle needs radius in meters. We approximate this.
                const centerLatLng = project(entity.center);
                const pointOnCircle = project({ x: entity.center.x + entity.radius, y: entity.center.y });
                const radiusInMeters = centerLatLng.distanceTo(pointOnCircle);

                // This is a simplification; ARC entities are rendered as full circles.
                return <Circle center={centerLatLng} radius={radiusInMeters} pathOptions={pathOptions} />;
            }
            return null;
        
        case 'TEXT':
        case 'MTEXT':
            if (entity.startPoint && entity.text) {
                // Simple text rendering with a tooltip on an invisible marker
                return (
                    <Marker position={project(entity.startPoint)} opacity={0} interactive={false}>
                        <Tooltip permanent direction="center" className="dxf-text-label" opacity={opacity}>
                            <div style={{ color }}>{entity.text}</div>
                        </Tooltip>
                    </Marker>
                );
            }
            return null;

        case 'INSERT':
            if (entity.block && dxfData.blocks && dxfData.blocks[entity.block]) {
                const block = dxfData.blocks[entity.block];
                if (!block.entities) return null;

                const origin = entity.center || { x: 0, y: 0, z: 0 };
                
                const newContext: ColorContext = {
                    parentAciColor: entity.colorNumber,
                    parentLayerName: entity.layer,
                };

                return (
                    <>
                        {block.entities.map((blockEntity, i) => {
                            // Apply block's origin offset to each vertex in the block entity
                            const transformPoint = (p: DxfVertex) => ({ x: (p.x || 0) + origin.x, y: (p.y || 0) + origin.y });
                            
                            const transformedEntity = { ...blockEntity };
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

                            return (
                                <DxfEntityRenderer
                                    key={`${entityKey}-insert-${i}`}
                                    entity={transformedEntity}
                                    project={project}
                                    dxfData={dxfData}
                                    dxfRenderInfo={dxfRenderInfo}
                                    entityKey={`${entityKey}-insert-${i}`}
                                    opacity={opacity}
                                    parentContext={newContext}
                                />
                            );
                        })}
                    </>
                );
            }
            return null;
        
        default:
            return null;
    }
});

export default DxfEntityRenderer;
