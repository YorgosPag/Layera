import React from 'react';
import { useAppContext } from '../../context/AppContext';
import { useMeasurementContext } from '../../context/MeasurementContext';
import MeasurementDisplay from './MeasurementDisplay';

/**
 * This component is responsible for drawing the measurement visualizations (lines, points) on the map.
 * It's only active when the measurement tool is turned on.
 */
const MeasurementDrawer: React.FC = () => {
    const { isMeasuring } = useAppContext();
    const { points, linePoints, mode, isFinished } = useMeasurementContext();

    if (!isMeasuring) {
        return null;
    }

    return (
        <MeasurementDisplay
            points={points}
            linePoints={linePoints}
            mode={mode}
            isFinished={isFinished}
        />
    );
};

export default MeasurementDrawer;