import React, { createContext, useContext, ReactNode } from 'react';
import { useMeasurement, MeasurementMode, MeasurementEvents } from '../hooks/useMeasurement';
import L from 'leaflet';

// Define the shape of the context data
interface MeasurementContextType {
    mode: MeasurementMode;
    points: L.LatLng[];
    isFinished: boolean;
    distance: number;
    area: number;
    linePoints: L.LatLng[];
    setMode: (newMode: MeasurementMode) => void;
    reset: () => void;
}

const MeasurementContext = createContext<MeasurementContextType | undefined>(undefined);

// The provider component
export const MeasurementProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    // This component must be rendered inside a MapContainer for useMeasurement to work
    const measurementState = useMeasurement();
    
    const contextValue: MeasurementContextType = {
        mode: measurementState.mode,
        points: measurementState.points,
        isFinished: measurementState.isFinished,
        distance: measurementState.distance,
        area: measurementState.area,
        linePoints: measurementState.linePoints,
        setMode: measurementState.setMode,
        reset: measurementState.reset,
    };

    return (
        <MeasurementContext.Provider value={contextValue}>
            {children}
            {/* Render the event handler component directly, passing state and handlers as props */}
            <MeasurementEvents 
                 isFinished={measurementState.isFinished}
                 points={measurementState.points}
                 onPointAdd={measurementState.addPoint}
                 onTempPointUpdate={measurementState.setTempPoint}
                 onFinish={measurementState.finishMeasurement}
            />
        </MeasurementContext.Provider>
    );
};

// The custom hook to consume the context
export const useMeasurementContext = (): MeasurementContextType => {
    const context = useContext(MeasurementContext);
    if (context === undefined) {
        throw new Error('useMeasurementContext must be used within a MeasurementProvider');
    }
    return context;
};