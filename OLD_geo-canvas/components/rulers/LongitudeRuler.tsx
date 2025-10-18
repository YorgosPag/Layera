
import React, { useRef, useEffect } from 'react';
import { useMapSettings } from '../../context/MapSettingsContext';
import { RULER_SIZE, TICK_COLOR, RULER_BG, DENSITY_FACTORS, getTicks } from '../utils/rulerUtils';
import { formatCoord } from '../utils/formatters';
import L from 'leaflet';

interface RulerProps {
    bounds: L.LatLngBounds;
    mapSize: { width: number; height: number };
}

const LongitudeRuler: React.FC<RulerProps> = ({ bounds, mapSize }) => {
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
        ctx.moveTo(0, 0.5);
        ctx.lineTo(mapSize.width, 0.5);
        ctx.stroke();

        ctx.fillStyle = TICK_COLOR;
        ctx.strokeStyle = TICK_COLOR;
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        
        const densityFactor = DENSITY_FACTORS[tickDensity];
        const lonTicks = getTicks(bounds.getWest(), bounds.getEast(), Math.round(mapSize.width / (80 * densityFactor)));

        lonTicks.forEach(lon => {
            const x = ((lon - bounds.getWest()) / (bounds.getEast() - bounds.getWest())) * mapSize.width;
            
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, 10);
            ctx.stroke();
            
            ctx.fillText(formatCoord(lon, false, 4), x, RULER_SIZE / 2 + 5);
        });

    }, [bounds, mapSize, tickDensity]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute bottom-0 left-0 z-20"
            style={{
                width: `${mapSize.width}px`,
                height: `${RULER_SIZE}px`,
                transform: `translateX(${RULER_SIZE}px)`,
            }}
        />
    );
};

export default LongitudeRuler;
