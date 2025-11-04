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
    
    const { isMeasuring, snappingOptions, isSnappingEffective, actions } = useUiContext();
    const { setMeasuring, toggleSnapping } = actions;
    
    const { mode, distance, area, setMode, reset } = useMeasurementContext();

    const [activePanel, setActivePanel] = useState<ActivePanel>(null);
    const [isSnapDropdownOpen, setIsSnapDropdownOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setActivePanel(null);
                setIsSnapDropdownOpen(false);
                if (isMeasuring) {
                    setMeasuring(false);
                }
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMeasuring, setMeasuring]);
    
    const isAnySnappingOn = snappingOptions.vertices || snappingOptions.edges;

    const getSnappingClass = () => {
        if (isSnappingEffective) {
            return 'bg-blue-100 text-blue-600'; // Active and working
        }
        if (isAnySnappingOn) {
            return 'bg-yellow-100 text-yellow-800'; // Enabled but waiting for zoom
        }
        return 'hover:bg-gray-100 text-gray-700'; // Off
    };

    const getSnappingTitle = () => {
        if (isAnySnappingOn && !isSnappingEffective) {
            return "Η έλξη είναι ενεργή. Κάντε ζουμ για να λειτουργήσει (επίπεδο 16+).";
        }
        if (isSnappingEffective) {
            return "Ρυθμίσεις έλξης στα κτίρια";
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
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[1000]" ref={containerRef}>
            <div className="flex flex-row bg-white rounded-lg shadow-lg divide-x divide-gray-200">
                {/* --- Measurement Button & Panel --- */}
                <div className="relative">
                    <button onClick={() => setMeasuring(!isMeasuring)} className={`p-3 flex items-center justify-center transition-colors ${isMeasuring ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100 text-gray-700'}`} title="Μέτρηση" aria-pressed={isMeasuring}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 stroke-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M8 6H20M8 10H20M8 14H14M4 4V20H8V4H4Z" /></svg>
                    </button>
                    {isMeasuring && (
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2">
                            <MeasurementControls 
                                mode={mode}
                                distance={distance}
                                area={area}
                                onModeChange={setMode}
                                onReset={reset}
                            />
                        </div>
                    )}
                </div>

                {/* --- Snap Button & Panel --- */}
                <div className="relative">
                    <button onClick={() => setIsSnapDropdownOpen(prev => !prev)} className={`p-3 flex items-center justify-center transition-colors ${getSnappingClass()}`} title={getSnappingTitle()} aria-pressed={isAnySnappingOn}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            <path d="M18 3a1 1 0 00-1.447-.894l-2 1a1 1 0 00-.553.894V6.5a1 1 0 001 1h1.5a1 1 0 001-1v-2.5a1 1 0 00-1-1zM18 17a1 1 0 00-1.447-.894l-2 1a1 1 0 00-.553.894V20.5a1 1 0 001 1h1.5a1 1 0 001-1v-2.5a1 1 0 00-1-1z" />
                        </svg>
                    </button>
                    {isSnapDropdownOpen && (
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white bg-opacity-95 rounded-lg shadow-lg p-2 flex flex-col gap-1 text-sm min-w-[190px]">
                            <button
                                onClick={() => toggleSnapping('vertices')}
                                className={`w-full text-left px-2 py-1.5 rounded transition-colors flex items-center gap-2 ${snappingOptions.vertices ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.834 9.168-4.5M10.5 17.25h1.832a4.001 4.001 0 003.066-1.5" /></svg>
                                <span>Έλξη Γωνιών</span>
                            </button>
                            <button
                               onClick={() => toggleSnapping('edges')}
                               className={`w-full text-left px-2 py-1.5 rounded transition-colors flex items-center gap-2 ${snappingOptions.edges ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg>
                                <span>Έλξη Ακμών</span>
                            </button>
                        </div>
                    )}
                </div>

                {/* --- Layers Button & Panel --- */}
                <div className="relative">
                    <button onClick={() => handlePanelToggle('layers')} className={`p-3 flex items-center justify-center transition-colors ${activePanel === 'layers' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100 text-gray-700'}`} title="Επίπεδα Χάρτη" aria-expanded={activePanel === 'layers'}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 stroke-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                    </button>
                    {activePanel === 'layers' && (
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white bg-opacity-95 rounded-lg shadow-lg p-3 flex flex-col gap-2 text-sm min-w-[180px]">
                            <div>
                                <span className="font-semibold text-gray-700 block mb-1.5">Υπόβαθρο Χάρτη</span>
                                <div className="grid grid-cols-2 gap-1">
                                    <button onClick={() => handleBaseLayerSelect('osm')} className={`px-2 py-1 text-xs font-medium rounded ${baseLayer === 'osm' ? 'bg-blue-500 text-white shadow' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`} aria-pressed={baseLayer === 'osm'}>Χάρτης</button>
                                    <button onClick={() => handleBaseLayerSelect('satellite')} className={`px-2 py-1 text-xs font-medium rounded ${baseLayer === 'satellite' ? 'bg-blue-500 text-white shadow' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`} aria-pressed={baseLayer === 'satellite'}>Δορυφόρος</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* --- Settings Button & Panel --- */}
                <div className="relative">
                    <button onClick={() => handlePanelToggle('settings')} className={`p-3 flex items-center justify-center transition-colors ${activePanel === 'settings' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100 text-gray-700'}`} title="Ρυθμίσεις Χάρτη" aria-expanded={activePanel === 'settings'}>
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 stroke-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
                    </button>
                    {activePanel === 'settings' && (
                         <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-white bg-opacity-95 rounded-lg shadow-lg p-3 flex flex-col gap-2 text-sm min-w-[180px]">
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

                {/* --- Zoom Buttons --- */}
                <button onClick={handleZoomIn} className="p-3 flex items-center justify-center hover:bg-gray-100 text-gray-700" title="Μεγέθυνση">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                </button>
                <button onClick={handleZoomOut} className="p-3 flex items-center justify-center hover:bg-gray-100 text-gray-700" title="Σμίκρυνση">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default MapControls;