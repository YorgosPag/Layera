import React, { useState, useRef, useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { useMapSettings } from '../../context/MapSettingsContext';
import { useUiContext } from '../../context/UiContext';
import { useMeasurementContext } from '../../context/MeasurementContext';
import MeasurementControls from '../measurement/MeasurementControls';

type ActivePanel = 'settings' | 'layers' | null;

const MapControls: React.FC = () => {
    const map = useMap();
    const {
        rulerMode, setRulerMode,
        isGridVisible, setGridVisible,
        tickDensity, setTickDensity,
        areRulersVisible, setRulersVisible,
        baseLayer, setBaseLayer
    } = useMapSettings();
    
    const { isMeasuring, isSnapping, isSnappingEffective, actions } = useUiContext();
    const { setMeasuring, setSnapping } = actions;
    
    const { mode, distance, area, setMode, reset } = useMeasurementContext();

    const [activePanel, setActivePanel] = useState<ActivePanel>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setActivePanel(null);
                if (isMeasuring) {
                    setMeasuring(false);
                }
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [activePanel, isMeasuring, setMeasuring]);

    const getSnappingClass = () => {
        if (isSnappingEffective) {
            return 'bg-blue-100 text-blue-600'; // Active and working
        }
        if (isSnapping) {
            return 'bg-yellow-100 text-yellow-800'; // Enabled but waiting for zoom
        }
        return 'hover:bg-gray-100 text-gray-700'; // Off
    };

    const getSnappingTitle = () => {
        if (isSnapping && !isSnappingEffective) {
            return "Η έλξη είναι ενεργή. Κάντε ζουμ για να λειτουργήσει (επίπεδο 16+).";
        }
        if (isSnappingEffective) {
            return "Απενεργοποίηση έλξης στα κτίρια";
        }
        return "Ενεργοποίηση έλξης στα κτίρια";
    };

    const handlePanelToggle = (panel: NonNullable<ActivePanel>) => {
        setActivePanel(prev => prev === panel ? null : panel);
    };

    const handleBaseLayerSelect = (layer: 'osm' | 'satellite') => {
        setBaseLayer(layer);
        setActivePanel(null);
    };

    const handleZoomIn = () => map.zoomIn();
    const handleZoomOut = () => map.zoomOut();

    return (
        <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2" ref={containerRef}>
            <div className="relative">
                <div className="flex flex-col bg-white rounded-md shadow divide-y divide-gray-200">
                    <button onClick={() => setMeasuring(!isMeasuring)} className={`p-2 transition-colors ${isMeasuring ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100 text-gray-700'}`} title="Μέτρηση" aria-pressed={isMeasuring}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 stroke-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8 6H20M8 10H20M8 14H14M4 4V20H8V4H4Z" /></svg>
                    </button>
                    <button onClick={() => setSnapping(!isSnapping)} className={`p-2 transition-colors ${getSnappingClass()}`} title={getSnappingTitle()} aria-pressed={isSnapping}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 stroke-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 15V8a3 3 0 00-3-3H9a3 3 0 00-3 3v7m0-7H3m3 7h3m6-7h3m-3 7h3" /></svg>
                    </button>
                    <button onClick={() => handlePanelToggle('layers')} className={`p-2 transition-colors ${activePanel === 'layers' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100 text-gray-700'}`} title="Επίπεδα Χάρτη" aria-expanded={activePanel === 'layers'}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 stroke-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                    </button>
                    <button onClick={() => handlePanelToggle('settings')} className={`p-2 transition-colors ${activePanel === 'settings' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100 text-gray-700'}`} title="Ρυθμίσεις Χάρτη" aria-expanded={activePanel === 'settings'}>
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 stroke-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
                    </button>
                </div>

                {isMeasuring && (
                    <div className="absolute top-0 right-full mr-2">
                        <MeasurementControls 
                            mode={mode}
                            distance={distance}
                            area={area}
                            onModeChange={setMode}
                            onReset={reset}
                        />
                    </div>
                )}
                
                {activePanel === 'layers' && (
                     <div className="absolute top-0 right-full mr-2 bg-white bg-opacity-95 rounded-lg shadow-lg p-3 flex flex-col gap-2 text-sm min-w-[180px]">
                        <div>
                            <span className="font-semibold text-gray-700 block mb-1.5">Υπόβαθρο Χάρτη</span>
                            <div className="grid grid-cols-2 gap-1">
                                <button onClick={() => handleBaseLayerSelect('osm')} className={`px-2 py-1 text-xs font-medium rounded ${baseLayer === 'osm' ? 'bg-blue-500 text-white shadow' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`} aria-pressed={baseLayer === 'osm'}>Χάρτης</button>
                                <button onClick={() => handleBaseLayerSelect('satellite')} className={`px-2 py-1 text-xs font-medium rounded ${baseLayer === 'satellite' ? 'bg-blue-500 text-white shadow' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`} aria-pressed={baseLayer === 'satellite'}>Δορυφόρος</button>
                            </div>
                        </div>
                    </div>
                )}
                
                {activePanel === 'settings' && (
                     <div className="absolute top-0 right-full mr-2 bg-white bg-opacity-95 rounded-lg shadow-lg p-3 flex flex-col gap-2 text-sm min-w-[180px]">
                        <div>
                             <span className="font-semibold text-gray-700 block mb-1.5">Χάρακες</span>
                             <button onClick={() => setRulersVisible(!areRulersVisible)} className={`px-2 py-1 text-xs font-medium rounded w-full ${areRulersVisible ? 'bg-blue-500 text-white shadow' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`} aria-pressed={areRulersVisible}>
                                {areRulersVisible ? 'Ενεργοί' : 'Ανενεργοί'}
                            </button>
                        </div>
                        <div className="border-t border-gray-200 !my-1"></div>
                        <div>
                            <span className="font-semibold text-gray-700 block mb-1.5">Μονάδες</span>
                            <div className="grid grid-cols-2 gap-1">
                                <button onClick={() => setRulerMode('degrees')} className={`px-2 py-1 text-xs font-medium rounded ${rulerMode === 'degrees' ? 'bg-blue-500 text-white shadow' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`} aria-pressed={rulerMode === 'degrees'}>Μοίρες</button>
                                <button onClick={() => setRulerMode('meters')} className={`px-2 py-1 text-xs font-medium rounded ${rulerMode === 'meters' ? 'bg-blue-500 text-white shadow' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`} aria-pressed={rulerMode === 'meters'}>Μέτρα</button>
                            </div>
                        </div>
                        <div className="border-t border-gray-200 !my-1"></div>
                        <div>
                             <span className="font-semibold text-gray-700 block mb-1.5">Πλέγμα</span>
                             <button onClick={() => setGridVisible(!isGridVisible)} className={`px-2 py-1 text-xs font-medium rounded w-full ${isGridVisible ? 'bg-blue-500 text-white shadow' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`} aria-pressed={isGridVisible}>
                                {isGridVisible ? 'Ενεργό' : 'Ανενεργό'}
                            </button>
                        </div>
                        <div className="border-t border-gray-200 !my-1"></div>
                        <div>
                             <span className="font-semibold text-gray-700 block mb-1.5">Πυκνότητα</span>
                             <div className="grid grid-cols-3 gap-1">
                                <button onClick={() => setTickDensity('low')} className={`px-2 py-1 text-xs font-medium rounded ${tickDensity === 'low' ? 'bg-blue-500 text-white shadow' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`} aria-pressed={tickDensity === 'low'} title="Αραιή">Αραιή</button>
                                <button onClick={() => setTickDensity('medium')} className={`px-2 py-1 text-xs font-medium rounded ${tickDensity === 'medium' ? 'bg-blue-500 text-white shadow' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`} aria-pressed={tickDensity === 'medium'} title="Μεσαία">Μεσαία</button>
                                <button onClick={() => setTickDensity('high')} className={`px-2 py-1 text-xs font-medium rounded ${tickDensity === 'high' ? 'bg-blue-500 text-white shadow' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`} aria-pressed={tickDensity === 'high'} title="Πυκνή">Πυκνή</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Zoom Controls */}
            <div className="flex flex-col bg-white rounded-md shadow divide-y divide-gray-200">
                <button onClick={handleZoomIn} className="p-2 hover:bg-gray-100 text-gray-700" title="Μεγέθυνση">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                </button>
                <button onClick={handleZoomOut} className="p-2 hover:bg-gray-100 text-gray-700" title="Σμίκρυνση">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default MapControls;
