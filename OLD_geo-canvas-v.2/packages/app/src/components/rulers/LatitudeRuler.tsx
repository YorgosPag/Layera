import React, { useRef, useEffect } from 'react';
import { useMapSettings } from '../../context/MapSettingsContext';
import { RULER_SIZE, TICK_COLOR, RULER_BG, DENSITY_FACTORS, getTicks } from '../utils/rulerUtils';
import { formatCoord } from '../utils/formatters';
import L from 'leaflet';

interface RulerProps {
    bounds: L.LatLngBounds;
    mapSize: { width: number; height: number };
}

const LatitudeRuler: React.FC<RulerProps> = ({ bounds, mapSize }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { tickDensity } = useMapSettings();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        ctx.scale(dpr, dpr);

        ctx.clearRect(0, 0, rect.width, rect.height);
        ctx.fillStyle = RULER_BG;
        ctx.fillRect(0, 0, rect.width, rect.height);
        
        ctx.strokeStyle = '#E2E8F0'; // border color
        ctx.beginPath();
        ctx.moveTo(RULER_SIZE - 0.5, 0);
        ctx.lineTo(RULER_SIZE - 0.5, mapSize.height);
        ctx.stroke();

        ctx.fillStyle = TICK_COLOR;
        ctx.strokeStyle = TICK_COLOR;
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        const densityFactor = DENSITY_FACTORS[tickDensity];
        const latTicks = getTicks(bounds.getSouth(), bounds.getNorth(), Math.round(mapSize.height / (60 * densityFactor)));

        latTicks.forEach(lat => {
            const y = mapSize.height - ((lat - bounds.getSouth()) / (bounds.getNorth() - bounds.getSouth())) * mapSize.height;
            
            ctx.beginPath();
            ctx.moveTo(RULER_SIZE, y);
            ctx.lineTo(RULER_SIZE - 10, y);
            ctx.stroke();
            
            ctx.save();
            ctx.translate(RULER_SIZE / 2 - 5, y);
            ctx.rotate(-Math.PI / 2);
            ctx.fillText(formatCoord(lat, true, 4), 0, 0);
            ctx.restore();
        });

    }, [bounds, mapSize, tickDensity]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 z-20"
            style={{
                width: `${RULER_SIZE}px`,
                height: `${mapSize.height}px`,
            }}
        />
    );
};

export default LatitudeRuler;