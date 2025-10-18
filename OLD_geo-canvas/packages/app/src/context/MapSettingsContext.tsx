import React, { createContext, useState, useContext, ReactNode } from 'react';
import { RulerMode, TickDensity } from '../components/utils/rulerUtils';

export type BaseLayerType = 'osm' | 'satellite';

interface MapSettingsState {
    rulerMode: RulerMode;
    setRulerMode: (mode: RulerMode) => void;
    isGridVisible: boolean;
    setGridVisible: (visible: boolean) => void;
    tickDensity: TickDensity;
    setTickDensity: (density: TickDensity) => void;
    areRulersVisible: boolean;
    setRulersVisible: (visible: boolean) => void;
    baseLayer: BaseLayerType;
    setBaseLayer: (layer: BaseLayerType) => void;
}

const MapSettingsContext = createContext<MapSettingsState | undefined>(undefined);

export const MapSettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [rulerMode, setRulerMode] = useState<RulerMode>('degrees');
    const [isGridVisible, setGridVisible] = useState<boolean>(false);
    const [tickDensity, setTickDensity] = useState<TickDensity>('medium');
    const [areRulersVisible, setRulersVisible] = useState<boolean>(true);
    const [baseLayer, setBaseLayer] = useState<BaseLayerType>('osm');

    const value = {
        rulerMode,
        setRulerMode,
        isGridVisible,
        setGridVisible,
        tickDensity,
        setTickDensity,
        areRulersVisible,
        setRulersVisible,
        baseLayer,
        setBaseLayer,
    };

    return (
        <MapSettingsContext.Provider value={value}>
            {children}
        </MapSettingsContext.Provider>
    );
};

export const useMapSettings = (): MapSettingsState => {
    const context = useContext(MapSettingsContext);
    if (context === undefined) {
        throw new Error('useMapSettings must be used within a MapSettingsProvider');
    }
    return context;
};