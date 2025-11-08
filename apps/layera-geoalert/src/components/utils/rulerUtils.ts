import { RULER_CONFIG } from '../../constants';

// Type for ruler mode
export type RulerMode = 'degrees' | 'meters';
export type TickDensity = 'low' | 'medium' | 'high';

// Constants for styling and behavior - Using SSOT from constants
export const RULER_SIZE = RULER_CONFIG.size;
export const TICK_COLOR = 'var(--la-color-gray-600, var(--color-text-secondary))';
export const RULER_BG = 'var(--la-bg-surface, var(--color-bg-surface))';
export const GRID_COLOR = 'var(--la-text-secondary, var(--color-text-secondary))';
export const DENSITY_FACTORS: Record<TickDensity, number> = RULER_CONFIG.tickDensityFactors;

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
    // A predefined list of "human-friendly" numbers from SSOT configuration
    const goodNormalizedTicks = RULER_CONFIG.goodNormalizedTicks;
    // Find the smallest "good" tick size that is larger than the rough calculated size
    const tickSize = goodNormalizedTicks.find(n => n > roughTickSize) ?? goodNormalizedTicks[goodNormalizedTicks.length - 1];

    const start = Math.ceil(min / tickSize) * tickSize;
    const ticks: number[] = [];
    for (let i = start; i <= max; i += tickSize) {
        ticks.push(i);
    }
    return ticks;
};