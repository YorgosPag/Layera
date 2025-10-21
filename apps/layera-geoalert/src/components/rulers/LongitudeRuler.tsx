import React, { useRef, useEffect } from 'react';
import { RULER_SIZE, TICK_COLOR, RULER_BG, DENSITY_FACTORS, getTicks } from '../utils/rulerUtils';
import { formatCoord } from '../utils/formatters';
import L from 'leaflet';

interface RulerProps {
    bounds: L.LatLngBounds;
    mapSize: { width: number; height: number };
    tickDensity?: 'low' | 'medium' | 'high';
}

const LongitudeRuler: React.FC<RulerProps> = ({ bounds, mapSize, tickDensity = 'medium' }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !bounds || mapSize.width === 0 || mapSize.height === 0) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Correct canvas dimensions από diavase_3.md
        const w = mapSize.width;
        const h = RULER_SIZE;
        const dpr = window.devicePixelRatio || 1;
        canvas.width = w * dpr;
        canvas.height = h * dpr;
        canvas.style.width = `${w}px`;
        canvas.style.height = `${h}px`;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

        // Clear and fill background
        ctx.clearRect(0, 0, w, h);
        ctx.fillStyle = RULER_BG;
        ctx.fillRect(0, 0, w, h);

        // Draw top border
        ctx.strokeStyle = '#E2E8F0';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(0, 0.5);
        ctx.lineTo(w, 0.5);
        ctx.stroke();

        // Setup text and tick styles
        ctx.fillStyle = TICK_COLOR;
        ctx.strokeStyle = TICK_COLOR;
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Calculate and draw ticks
        const densityFactor = DENSITY_FACTORS[tickDensity];
        const lonTicks = getTicks(bounds.getWest(), bounds.getEast(), Math.round(mapSize.width / (80 * densityFactor)));

        lonTicks.forEach(lon => {
            const x = ((lon - bounds.getWest()) / (bounds.getEast() - bounds.getWest())) * w;

            // Draw tick line
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, 10);
            ctx.stroke();

            // Draw coordinate label
            ctx.fillText(formatCoord(lon, false, 4), x, RULER_SIZE / 2 + 5);
        });

    }, [bounds, mapSize, tickDensity]);

    return (
        <div
            style={{
                position: 'absolute',
                left: `${RULER_SIZE}px`,
                right: 0,
                bottom: 0,
                height: `${RULER_SIZE}px`,
                zIndex: 1000,
                pointerEvents: 'none',
            }}
        >
            <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
        </div>
    );
};

export default LongitudeRuler;