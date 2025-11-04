import React, { memo } from 'react';
import { Polyline, Circle, Polygon } from 'react-leaflet';
import L from 'leaflet';
import { DxfEntity, DxfVertex, DxfData, DxfRenderInfo, getEntityColor, ColorContext } from '../../context/layers/services/dxf.service';
import DxfTextRenderer from './DxfTextRenderer';

interface DxfEntityRendererProps {
    entity: DxfEntity;
    project: (point: DxfVertex) => L.LatLng;
    dxfData: DxfData;
    dxfRenderInfo: DxfRenderInfo;
    entityKey: number | string;
    opacity: number;
    parentContext?: ColorContext;
    rotation?: number;
}

// This function calculates the points for a polyline arc segment (defined by a bulge value)
const getArcPointsFromBulge = (p1: DxfVertex, p2: DxfVertex, bulge: number): DxfVertex[] => {
    if (bulge === 0) return [p1];

    const numSegments = 18;
    const arcPoints: DxfVertex[] = [];

    const angle = 4 * Math.atan(bulge);
    const distance = Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
    const radius = Math.abs((distance / 2) / Math.sin(angle / 2));
    
    const midPoint = { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 };
    const lineAngle = Math.atan2(p2.y - p1.y, p2.x - p1.x);
    
    // Determine the center of the arc
    const centerAngle = lineAngle + (Math.PI / 2) * (bulge > 0 ? -1 : 1);
    const centerDistance = Math.sqrt(Math.pow(radius, 2) - Math.pow(distance / 2, 2));
    const centerX = midPoint.x + centerDistance * Math.cos(centerAngle);
    const centerY = midPoint.y + centerDistance * Math.sin(centerAngle);

    let startAngle = Math.atan2(p1.y - centerY, p1.x - centerX);
    let endAngle = Math.atan2(p2.y - centerY, p2.x - centerX);
    
    if (bulge < 0) {
        [startAngle, endAngle] = [endAngle, startAngle];
    }
    
    // Handle angle wrapping
    if (endAngle < startAngle) {
        endAngle += 2 * Math.PI;
    }

    const totalAngle = endAngle - startAngle;

    for (let i = 0; i <= numSegments; i++) {
        const t = i / numSegments;
        const currentAngle = startAngle + t * totalAngle;
        arcPoints.push({
            x: centerX + radius * Math.cos(currentAngle),
            y: centerY + radius * Math.sin(currentAngle),
        });
    }
    return arcPoints;
};


const DxfEntityRenderer: React.FC<DxfEntityRendererProps> = memo(({
    entity, project, dxfData, dxfRenderInfo, entityKey, opacity, parentContext, rotation: layerRotation = 0
}) => {
    const e = entity as any; // Use any for flexibility with dxf-parser properties
    const color = getEntityColor(e, dxfData, parentContext);
    const linePathOptions = { color, weight: 1, opacity, interactive: false };
    const fillPathOptions = { ...linePathOptions, fillOpacity: opacity * 0.7, fillColor: color };

    switch (e.type) {
        case 'LINE':
            const vertices = e.vertices || (e.startPoint && e.endPoint ? [e.startPoint, e.endPoint] : null);
            if (vertices && vertices.length >= 2) {
                return <Polyline positions={vertices.map(project)} pathOptions={linePathOptions} />;
            }
            return null;

        case 'LWPOLYLINE':
        case 'POLYLINE':
            if (!e.vertices || e.vertices.length < 2) return null;
            
            let allPoints: DxfVertex[] = [];
            for (let i = 0; i < e.vertices.length - 1; i++) {
                const p1 = e.vertices[i];
                const p2 = e.vertices[i + 1];
                allPoints.push(...getArcPointsFromBulge(p1, p2, p1.bulge || 0));
            }
            
            if (e.shape) { // Closed polyline
                 const p1 = e.vertices[e.vertices.length - 1];
                 const p2 = e.vertices[0];
                 allPoints.push(...getArcPointsFromBulge(p1, p2, p1.bulge || 0));
            } else { // Open polyline
                allPoints.push(e.vertices[e.vertices.length - 1]);
            }

            if (e.shape) {
                return <Polygon positions={allPoints.map(project)} pathOptions={fillPathOptions} />;
            }
            return <Polyline positions={allPoints.map(project)} pathOptions={linePathOptions} />;

        case 'CIRCLE':
            if (e.center && e.radius) {
                const centerLatLng = project(e.center);
                const edgePoint = project({ x: e.center.x + e.radius, y: e.center.y });
                const radiusMeters = centerLatLng.distanceTo(edgePoint);
                return <Circle center={centerLatLng} radius={radiusMeters} pathOptions={linePathOptions} />;
            }
            return null;
        
        case 'ARC':
            if (e.center && e.radius != null && e.startAngle != null && e.endAngle != null) {
                const startRad = (e.startAngle * Math.PI) / 180;
                let endRad = (e.endAngle * Math.PI) / 180;
        
                if (endRad < startRad) endRad += 2 * Math.PI;
                const totalAngle = endRad - startRad;
        
                const numSegments = 64;
                const arcPoints: DxfVertex[] = [];
        
                for (let i = 0; i <= numSegments; i++) {
                    const t = startRad + (i / numSegments) * totalAngle;
                    arcPoints.push({
                        x: e.center.x + e.radius * Math.cos(t),
                        y: e.center.y + e.radius * Math.sin(t),
                    });
                }
        
                return <Polyline positions={arcPoints.map(project)} pathOptions={linePathOptions} />;
            }
            return null;

        case 'ELLIPSE':
            if (e.center && e.majorAxisEndPoint && e.axisRatio != null) {
                const a = Math.sqrt(Math.pow(e.majorAxisEndPoint.x, 2) + Math.pow(e.majorAxisEndPoint.y, 2));
                const b = a * e.axisRatio;
                const angle = Math.atan2(e.majorAxisEndPoint.y, e.majorAxisEndPoint.x);
                const cos = Math.cos(angle);
                const sin = Math.sin(angle);
        
                const startAngleDeg = e.startAngle ?? 0;
                const endAngleDeg = e.endAngle ?? 360;
        
                let startRad = startAngleDeg * (Math.PI / 180);
                let endRad = endAngleDeg * (Math.PI / 180);
        
                if (endRad < startRad) endRad += 2 * Math.PI;
                const totalAngle = endRad - startRad;
        
                const numSegments = 64;
                const ellipsePoints: DxfVertex[] = [];
        
                for (let i = 0; i <= numSegments; i++) {
                    const t = startRad + (i / numSegments) * totalAngle;
                    const x = a * Math.cos(t);
                    const y = b * Math.sin(t);
        
                    ellipsePoints.push({
                        x: e.center.x + (x * cos - y * sin),
                        y: e.center.y + (x * sin + y * cos),
                    });
                }
        
                return <Polyline positions={ellipsePoints.map(project)} pathOptions={linePathOptions} />;
            }
            return null;

        case 'SOLID':
             if (e.vertices && e.vertices.length >= 3) {
                return <Polygon positions={e.vertices.map(project)} pathOptions={fillPathOptions} />;
            }
            return null;
        
        case 'TEXT':
        case 'MTEXT':
            return (
                <DxfTextRenderer
                    entity={e}
                    project={project}
                    color={color}
                    layerRotation={layerRotation}
                    opacity={opacity}
                    entityKey={entityKey}
                />
            );

        case 'INSERT':
            if (e.block && dxfData.blocks && dxfData.blocks[e.block]) {
                const block = dxfData.blocks[e.block];
                if (!block.entities) return null;

                const origin = e.center || { x: 0, y: 0, z: 0 };
                const xScale = e.xScale || 1;
                const yScale = e.yScale || 1;
                const rotation = e.rotation || 0;
                
                const newParentContext: ColorContext = {
                    parentAciColor: e.colorNumber,
                    parentLayerName: e.layer,
                };

                return (
                    <>
                        {block.entities.map((blockEntity, i) => {
                            // Deep copy to avoid mutating the original block definition
                            const transformedEntity = JSON.parse(JSON.stringify(blockEntity));
                            const rotationRad = rotation * (Math.PI / 180);
                            const cos = Math.cos(rotationRad);
                            const sin = Math.sin(rotationRad);

                            const transformPoint = (p: DxfVertex): DxfVertex => {
                                if (!p) return { x: 0, y: 0 };
                                const scaledX = (p.x || 0) * xScale;
                                const scaledY = (p.y || 0) * yScale;
                                return {
                                    x: (scaledX * cos - scaledY * sin) + origin.x,
                                    y: (scaledX * sin + scaledY * cos) + origin.y
                                };
                            };
                            
                            ['vertices', 'controlPoints', 'startPoint', 'endPoint', 'center'].forEach(prop => {
                                if (transformedEntity[prop]) {
                                    transformedEntity[prop] = Array.isArray(transformedEntity[prop])
                                        ? transformedEntity[prop].map(transformPoint)
                                        : transformPoint(transformedEntity[prop]);
                                }
                            });

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
                            transformedEntity.rotation = (transformedEntity.rotation || 0) + rotation;

                            return (
                                <DxfEntityRenderer
                                    key={`${entityKey}-block-${i}`}
                                    entity={transformedEntity}
                                    project={project}
                                    dxfData={dxfData}
                                    dxfRenderInfo={dxfRenderInfo}
                                    entityKey={`${entityKey}-block-${i}`}
                                    opacity={opacity}
                                    parentContext={newParentContext}
                                    rotation={layerRotation}
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
