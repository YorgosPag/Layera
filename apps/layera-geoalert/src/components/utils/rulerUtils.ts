// Type for ruler mode
export type RulerMode = 'degrees' | 'meters';
export type TickDensity = 'low' | 'medium' | 'high';

// Constants for styling and behavior
export const RULER_SIZE = 40; // in pixels
export const TICK_COLOR = 'var(--layera-color-gray-600, var(--color-text-secondary))';
export const RULER_BG = 'var(--layera-bg-surface, var(--color-bg-surface))';
export const GRID_COLOR = 'var(--layera-text-secondary, var(--color-text-secondary))';
export const DENSITY_FACTORS: Record<TickDensity, number> = {
    low: 1.5,
    medium: 1.0,
    high: 0.7
};

/**
 * Generates an array of "nice" numbers for ruler ticks within a given range.
 * @param min The minimum value of the range.
 * @param max The maximum value of the range.
 * @param maxTicks The maximum number of ticks desired.
 * @returns An array of tick values.
 */
export const getTicks = (min: number, max: number, maxTicks: number): number[] => {
    const range = max - min;
    if (range <= 0 || !isFinite(range) || maxTicks <= 0) return [];

    const roughTickSize = range / Math.max(maxTicks - 1, 1);
    // A predefined list of "human-friendly" numbers for tick intervals
    const goodNormalizedTicks = [
        0.00001, 0.00002, 0.00005, 0.0001, 0.0002, 0.0005,
        0.001, 0.002, 0.005, 0.01, 0.02, 0.05, 0.1, 0.2, 0.5,
        1, 2, 5, 10, 20, 50, 100, 200, 500,
        1000, 2000, 5000, 10000, 20000, 50000, 100000
    ];
    // Find the smallest "good" tick size that is larger than the rough calculated size
    const tickSize = goodNormalizedTicks.find(n => n > roughTickSize) ?? goodNormalizedTicks[goodNormalizedTicks.length - 1];

    const start = Math.ceil(min / tickSize) * tickSize;
    const ticks: number[] = [];
    for (let i = start; i <= max; i += tickSize) {
        ticks.push(i);
    }
    return ticks;
};