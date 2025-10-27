import React, { useRef, useEffect } from 'react';
import { RULER_SIZE, TICK_COLOR, RULER_BG, DENSITY_FACTORS, getTicks } from '../utils/rulerUtils';
import { formatCoord } from '../utils/formatters';
import { Box } from '@layera/layout';
import L from 'leaflet';

interface RulerProps {
    bounds: L.LatLngBounds;
    mapSize: { width: number; height: number };
    tickDensity?: 'low' | 'medium' | 'high';
}

const LatitudeRuler: React.FC<RulerProps> = ({ bounds, mapSize, tickDensity = 'medium' }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !bounds || mapSize.width === 0 || mapSize.height === 0) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Correct canvas dimensions από diavase_3.md
        const w = RULER_SIZE;
        const h = mapSize.height;
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

        // Draw right border
        ctx.strokeStyle = 'var(--layera-border-default, var(--color-border-subtle))';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(RULER_SIZE - 0.5, 0);
        ctx.lineTo(RULER_SIZE - 0.5, h);
        ctx.stroke();

        // Setup text and tick styles
        ctx.fillStyle = TICK_COLOR;
        ctx.strokeStyle = TICK_COLOR;
        ctx.font = '10px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Calculate and draw ticks
        const densityFactor = DENSITY_FACTORS[tickDensity];
        const latTicks = getTicks(bounds.getSouth(), bounds.getNorth(), Math.round(mapSize.height / (60 * densityFactor)));

        latTicks.forEach(lat => {
            const y = h - ((lat - bounds.getSouth()) / (bounds.getNorth() - bounds.getSouth())) * h;

            // Draw tick line
            ctx.beginPath();
            ctx.moveTo(RULER_SIZE, y);
            ctx.lineTo(RULER_SIZE - 10, y);
            ctx.stroke();

            // Draw coordinate label (rotated)
            ctx.save();
            ctx.translate(RULER_SIZE / 2 - 5, y);
            ctx.rotate(-Math.PI / 2);
            ctx.fillText(formatCoord(lat, true, 4), 0, 0);
            ctx.restore();
        });

    }, [bounds, mapSize, tickDensity]);

    return (
        <Box
            position="absolute"
            top={0}
            left={0}
            bottom={`${RULER_SIZE}px`}
            width={`${RULER_SIZE}px`}
            zIndex={1000}
            pointerEvents="none"
        >
            <Box as="canvas" ref={canvasRef} width="full" height="full" />
        </Box>
    );
};

export default LatitudeRuler;