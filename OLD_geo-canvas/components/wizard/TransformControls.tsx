import React from 'react';
import { useAppContext } from '../../context/AppContext';

const TransformControls: React.FC = () => {
    const { tempEditingLayer, actions } = useAppContext();

    if (!tempEditingLayer) return null;

    const handleRotate = (degrees: number) => {
        const currentRotation = tempEditingLayer.rotation ?? 0;
        actions.updateEditingLayerRotation(currentRotation + degrees);
    };

    const handleScale = (factor: number) => {
        actions.applyScale(factor);
    };

    return (
        <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2 text-sm">
                <button
                    onClick={() => handleRotate(-90)}
                    className="px-3 py-1.5 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 flex items-center justify-center gap-2"
                >
                    <span className="transform -scale-x-100 inline-block text-lg">↻</span>
                    <span>-90°</span>
                </button>
                <button
                    onClick={() => handleRotate(90)}
                    className="px-3 py-1.5 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 flex items-center justify-center gap-2"
                >
                     <span className="text-lg">↻</span>
                     <span>+90°</span>
                </button>
            </div>
            <div>
                 <p className="text-xs text-gray-600 mb-1 text-center">Αυτόματη Κλίμακα (μονάδες σχεδίου → μέτρα)</p>
                 <div className="grid grid-cols-3 gap-2 text-sm">
                    <button
                        onClick={() => handleScale(1 / 100)}
                        title="1cm στο σχέδιο = 1m στο χάρτη"
                        className="w-full px-2 py-1.5 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                    >
                        cm → m
                    </button>
                    <button
                        onClick={() => handleScale(1 / 1000)}
                        title="1mm στο σχέδιο = 1m στο χάρτη"
                        className="w-full px-2 py-1.5 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                    >
                        mm → m
                    </button>
                    <button
                        onClick={() => handleScale(1)}
                        title="1m στο σχέδιο = 1m στο χάρτη"
                        className="w-full px-2 py-1.5 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                    >
                        m → m
                    </button>
                 </div>
            </div>
        </div>
    );
};

export default TransformControls;