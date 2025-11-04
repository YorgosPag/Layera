import { useState, useRef, useLayoutEffect } from 'react';
import { RULER_SIZE } from '../components/utils/rulerUtils';

export const useMapLayout = (areRulersVisible: boolean) => {
    const [mapSize, setMapSize] = useState<{ width: number; height: number } | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    
    useLayoutEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                const { width, height } = entry.contentRect;
                const offset = areRulersVisible ? RULER_SIZE : 0;
                setMapSize({ width: width - offset, height: height - offset });
            }
        });
        resizeObserver.observe(container);
        
        // Set initial size
        const { width, height } = container.getBoundingClientRect();
        const offset = areRulersVisible ? RULER_SIZE : 0;
        setMapSize({ width: width - offset, height: height - offset });
        
        return () => resizeObserver.disconnect();
    }, [areRulersVisible]);

    return { containerRef, mapSize };
};