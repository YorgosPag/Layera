import React, { useRef, useEffect } from 'react';

interface LatLngBounds {
  getSouth(): number;
  getNorth(): number;
  getWest(): number;
  getEast(): number;
}

interface RulerProps {
  bounds: LatLngBounds;
  mapSize: { width: number; height: number };
}

const RULER_SIZE = 40;
const TICK_COLOR = '#4A5568';
const RULER_BG = '#F7FAFC';

const getTicks = (min: number, max: number, maxTicks: number): number[] => {
  const range = max - min;
  if (range <= 0 || !isFinite(range) || maxTicks <= 0) return [];

  const roughTickSize = range / Math.max(maxTicks - 1, 1);
  const goodNormalizedTicks = [
    0.00001, 0.00002, 0.00005, 0.0001, 0.0002, 0.0005,
    0.001, 0.002, 0.005, 0.01, 0.02, 0.05, 0.1, 0.2, 0.5,
    1, 2, 5, 10, 20, 50, 100, 200, 500,
    1000, 2000, 5000, 10000, 20000, 50000, 100000
  ];
  const tickSize = goodNormalizedTicks.find(n => n > roughTickSize) ?? goodNormalizedTicks[goodNormalizedTicks.length - 1];

  const start = Math.ceil(min / tickSize) * tickSize;
  const ticks: number[] = [];
  for (let i = start; i <= max; i += tickSize) {
    ticks.push(i);
  }
  return ticks;
};

const formatCoord = (coord: number, isLat: boolean, precision: number = 4): string => {
  return coord.toFixed(precision) + (isLat ? '°N' : '°E');
};

const LongitudeRuler: React.FC<RulerProps> = ({ bounds, mapSize }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !bounds) return;

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

    ctx.strokeStyle = '#E2E8F0';
    ctx.beginPath();
    ctx.moveTo(0, 0.5);
    ctx.lineTo(mapSize.width, 0.5);
    ctx.stroke();

    ctx.fillStyle = TICK_COLOR;
    ctx.strokeStyle = TICK_COLOR;
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const lonTicks = getTicks(bounds.getWest(), bounds.getEast(), Math.round(mapSize.width / 80));

    lonTicks.forEach(lon => {
      const x = ((lon - bounds.getWest()) / (bounds.getEast() - bounds.getWest())) * mapSize.width;

      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 10);
      ctx.stroke();

      ctx.fillText(formatCoord(lon, false, 4), x, RULER_SIZE / 2 + 5);
    });

  }, [bounds, mapSize]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        bottom: 0,
        left: `${RULER_SIZE}px`,
        width: `${mapSize.width}px`,
        height: `${RULER_SIZE}px`,
        zIndex: 20,
        pointerEvents: 'none'
      }}
    />
  );
};

export default LongitudeRuler;