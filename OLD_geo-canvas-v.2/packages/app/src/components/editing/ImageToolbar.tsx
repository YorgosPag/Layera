import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { ImportedLayer } from '@geo-platform/shared';
import { useLayersContext } from '../../context/layers/LayersProvider';
import { SnappingOptions } from '../../hooks/useSnapping';
import { useUiContext } from '../../context/UiContext';

export type ImageEditTool = 'none' | 'transform' | 'rotate' | 'crop-rect' | 'crop-lasso' | 'align-2pt' | 'align-3pt';

// This new component will handle all the map interactions to prevent context issues.
const ToolbarUpdater: React.FC<{
    layer: ImportedLayer;
    setPosition: (point: L.Point | null) => void;
}> = ({ layer, setPosition }) => {
    const map = useMap();

    const updatePosition = useCallback(() => {
        if (layer.bounds) {
            // Position the toolbar above the top center of the image's bounds
            const north = layer.bounds.getNorth();
            const centerLng = layer.bounds.getCenter().lng;
            const topCenterLatLng = L.latLng(north, centerLng);
            const point = map.latLngToContainerPoint(topCenterLatLng);
            setPosition(point);
        }
    }, [map, layer.bounds, setPosition]);

    // Update position when layer or map view changes
    useEffect(() => {
        updatePosition();
    }, [updatePosition]);

    useMapEvents({
        zoom: updatePosition,
        move: updatePosition
    });

    return null; // This component has no visible output
};


interface ImageToolbarProps {
    layer: ImportedLayer;
    activeTool: ImageEditTool;
    onToolChange: (tool: ImageEditTool) => void;
    isAspectRatioLocked: boolean;
    onToggleAspectRatioLock: () => void;
    snappingOptions: SnappingOptions;
    onToggleSnapping: (type: 'vertices' | 'edges') => void;
}

const ToolbarButton: React.FC<{ title: string; onClick: () => void; children: React.ReactNode; isActive?: boolean; disabled?: boolean }> = ({ title, onClick, children, isActive, disabled }) => (
    <button
        title={title}
        onClick={onClick}
        disabled={disabled}
        className={`w-8 h-8 flex items-center justify-center text-white rounded transition-colors ${isActive ? 'text-blue-400' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/20'}`}
    >
        {children}
    </button>
);

const ImageToolbar: React.FC<ImageToolbarProps> = ({ layer, activeTool, onToolChange, isAspectRatioLocked, onToggleAspectRatioLock, snappingOptions, onToggleSnapping }) => {
    const { actions, canUndo, canRedo } = useLayersContext();
    const { actions: uiActions } = useUiContext();
    const [screenPosition, setScreenPosition] = useState<L.Point | null>(null);
    const [isCropDropdownOpen, setIsCropDropdownOpen] = useState(false);
    const [isSnapDropdownOpen, setIsSnapDropdownOpen] = useState(false);
    const [isScaleDropdownOpen, setIsScaleDropdownOpen] = useState(false);
    const [isAlignDropdownOpen, setIsAlignDropdownOpen] = useState(false);
    const [customScale, setCustomScale] = useState<string>('50');
    const cropButtonRef = useRef<HTMLDivElement>(null);
    const snapButtonRef = useRef<HTMLDivElement>(null);
    const scaleButtonRef = useRef<HTMLDivElement>(null);
    const alignButtonRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

    const canCrop = layer.type === 'raster';

    useEffect(() => {
        const checkIsMobile = () => setIsMobile(window.innerWidth < 1024);
        window.addEventListener('resize', checkIsMobile);
        return () => window.removeEventListener('resize', checkIsMobile);
    }, []);

    // Effect to close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (cropButtonRef.current && !cropButtonRef.current.contains(event.target as Node)) {
                setIsCropDropdownOpen(false);
            }
            if (snapButtonRef.current && !snapButtonRef.current.contains(event.target as Node)) {
                setIsSnapDropdownOpen(false);
            }
            if (scaleButtonRef.current && !scaleButtonRef.current.contains(event.target as Node)) {
                setIsScaleDropdownOpen(false);
            }
            if (alignButtonRef.current && !alignButtonRef.current.contains(event.target as Node)) {
                setIsAlignDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleRotate = (degrees: number) => {
        const currentRotation = layer.rotation ?? 0;
        actions.updateTempLayer({ rotation: currentRotation + degrees });
        actions.finalizeLayerChanges();
    };
    
    const handleToolChange = (tool: ImageEditTool) => {
        onToolChange(activeTool === tool ? 'transform' : tool); // Default to transform if clicking active tool
        setIsCropDropdownOpen(false);
        setIsSnapDropdownOpen(false);
        setIsScaleDropdownOpen(false);
        setIsAlignDropdownOpen(false);
    };
    
    const handlePresetScale = (factor: number) => {
        actions.applyScale(factor);
        actions.finalizeLayerChanges();
        setIsScaleDropdownOpen(false);
    };

    const handleCustomScale = () => {
        const scaleValue = parseFloat(customScale);
        if (!isNaN(scaleValue) && scaleValue > 0) {
            const factor = 1 / scaleValue;
            actions.applyScale(factor);
            actions.finalizeLayerChanges();
            setIsScaleDropdownOpen(false);
        } else {
            uiActions.showToast({ message: 'Παρακαλώ εισάγετε μια έγκυρη, θετική τιμή για την κλίμακα.' });
        }
    };
    
    const desktopStyle: React.CSSProperties = screenPosition ? {
        position: 'absolute',
        top: `${screenPosition.y}px`,
        left: `${screenPosition.x}px`,
        transform: 'translate(-50%, -120%)',
        zIndex: 1001,
    } : { display: 'none' };
    
    const isAnySnappingOn = snappingOptions.vertices || snappingOptions.edges;

    const toolbarContent = (
         <div className={`flex items-center gap-1 p-1 rounded-lg bg-black/70 ${isMobile ? 'flex-wrap justify-center' : ''}`}>
            <ToolbarButton title="Αναίρεση" onClick={actions.undo} disabled={!canUndo}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 15l-3-3m0 0l3-3m-3 3h8a5 5 0 010 10H9" />
                </svg>
            </ToolbarButton>
            <ToolbarButton title="Επανάληψη" onClick={actions.redo} disabled={!canRedo}>
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 15l3-3m0 0l-3-3m3 3h-8a5 5 0 000 10h2" />
                </svg>
            </ToolbarButton>
            
            <div className="w-px h-5 bg-white/30 mx-1"></div>

             <div ref={snapButtonRef} className="relative">
                <ToolbarButton title="Ρυθμίσεις Έλξης" onClick={() => setIsSnapDropdownOpen(prev => !prev)} isActive={isAnySnappingOn}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M1 6V9C1 12.866 4.13401 16 8 16C11.866 16 15 12.866 15 9V6H10V9C10 10.1046 9.10457 11 8 11C6.89543 11 6 10.1046 6 9V6H1Z" />
                        <path d="M1 4H6V1H1V4Z" />
                        <path d="M10 4H15V1H10V4Z" />
                    </svg>
                </ToolbarButton>
                 {isSnapDropdownOpen && (
                     <div className={`absolute left-1/2 -translate-x-1/2 bg-black/80 p-1 rounded-md shadow-lg flex flex-col gap-1 w-40 ${isMobile ? 'bottom-full mb-2' : 'top-full mt-2'}`}>
                        <button
                            onClick={() => onToggleSnapping('vertices')}
                            className={`w-full text-left px-2 py-1.5 text-sm rounded transition-colors flex items-center gap-2 ${snappingOptions.vertices ? 'bg-blue-500 text-white' : 'text-white hover:bg-white/20'}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.834 9.168-4.5M10.5 17.25h1.832a4.001 4.001 0 003.066-1.5" /></svg>
                            <span>Γωνίες</span>
                        </button>
                        <button
                           onClick={() => onToggleSnapping('edges')}
                           className={`w-full text-left px-2 py-1.5 text-sm rounded transition-colors flex items-center gap-2 ${snappingOptions.edges ? 'bg-blue-500 text-white' : 'text-white hover:bg-white/20'}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg>
                            <span>Ακμές</span>
                        </button>
                    </div>
                )}
            </div>

            <div className="w-px h-5 bg-white/30 mx-1"></div>
            
            <ToolbarButton 
                title="Μετακίνηση & Αλλαγή Μεγέθους"
                onClick={() => handleToolChange('transform')}
                isActive={activeTool === 'transform'}
            >
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 1v4m0 0h-4m4 0l-5-5" />
                </svg>
            </ToolbarButton>
            <ToolbarButton
                title="Ελεύθερη Περιστροφή"
                onClick={() => handleToolChange('rotate')}
                isActive={activeTool === 'rotate'}
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.168 8A10.003 10.003 0 0012 2C6.815 2 2.55 5.947 2.05 11"/>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8h4.168V4"/>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.832 16A10.003 10.003 0 0012 22c5.185 0 9.45-3.947 9.95-9"/>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 16H2.832v4"/>
                </svg>
            </ToolbarButton>
            <div ref={alignButtonRef} className="relative">
                <ToolbarButton
                    title="Προσαρμογή"
                    onClick={() => setIsAlignDropdownOpen(prev => !prev)}
                    isActive={activeTool === 'align-2pt' || activeTool === 'align-3pt'}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="h-5 w-5" viewBox="0 0 200 200">
                        <g transform="matrix(1, 0, 0, -1, 0, 200)">
                            <path d="M101.31,3.897c0-2.152-1.743-3.897-3.896-3.897H81.828c-2.154,0-3.897,1.745-3.897,3.897v3.897H23.379V3.897 c0-2.152-1.743-3.897-3.896-3.897H3.897C1.743,0.001,0,1.745,0,3.897v15.586c0,2.152,1.743,3.897,3.897,3.897h3.897v54.552H3.897 C1.743,77.931,0,79.677,0,81.829v15.586c0,2.152,1.743,3.897,3.897,3.897h15.586c2.154,0,3.897,1.745,3.897-3.897v-3.897h54.552 v3.897c0,2.152,1.743,3.897,3.897,3.897h15.586c2.154,0,3.897-1.745,3.897-3.897V81.829c0-2.152-1.743-3.897-3.897-3.897h-3.897 V23.38h3.897c2.154,0,3.897-1.745,3.897-3.897v-3.897h15.586V7.794H101.31V3.897z M7.793,15.587V7.794h7.793v7.793H7.793z M15.586,93.517H7.793v-7.793h7.793V93.517z M81.827,77.931c-2.154,0-3.897,1.745-3.897,3.897v3.897H23.379v-3.897 c0-2.152-1.743-3.897-3.897-3.897h-3.897V23.38h3.897c2.154,0,3.897-1.745,3.897-3.897v-3.897h54.552v3.897 c0,2.152,1.743,3.897,3.897,3.897h3.897v54.552h-0.001H81.827z M93.517,93.517h-7.793v-7.793h7.793V93.517z M93.517,15.587 h-7.793V7.794h7.793V15.587z"/>
                            <rect x="187.034" y="35.069" width="7.793" height="19.483"/>
                            <rect x="175.345" y="7.794" width="19.483" height="7.793"/>
                            <rect x="187.034" y="74.035" width="7.793" height="19.483"/>
                            <rect x="15.586" y="187.035" width="19.483" height="7.793"/>
                            <rect x="93.517" y="187.035" width="19.483" height="7.793"/>
                            <rect x="7.793" y="155.863" width="7.793" height="19.483"/>
                            <rect x="7.793" y="116.897" width="7.793" height="19.483"/>
                            <rect x="54.552" y="187.035" width="19.483" height="7.793"/>
                            <rect x="132.483" y="187.035" width="19.483" height="7.793"/>
                            <rect x="187.034" y="113.001" width="7.793" height="19.483"/>
                            <rect x="187.034" y="151.967" width="7.793" height="19.483"/>
                            <rect x="136.379" y="7.794" width="19.483" height="7.793"/>
                            <rect x="171.448" y="187.035" width="19.483" height="7.793"/>
                        </g>
                    </svg>
                </ToolbarButton>
                {isAlignDropdownOpen && (
                     <div className={`absolute left-1/2 -translate-x-1/2 bg-black/80 p-1 rounded-md shadow-lg flex flex-col gap-1 w-36 ${isMobile ? 'bottom-full mb-2' : 'top-full mt-2'}`}>
                        <button
                            onClick={() => handleToolChange('align-2pt')}
                            className={`w-full text-left px-2 py-1.5 text-sm rounded transition-colors flex items-center justify-center gap-2 ${activeTool === 'align-2pt' ? 'bg-blue-500 text-white' : 'text-white hover:bg-white/20'}`}
                        >
                            <span>2 Σημεία</span>
                        </button>
                        <button
                           onClick={() => handleToolChange('align-3pt')}
                           className={`w-full text-left px-2 py-1.5 text-sm rounded transition-colors flex items-center justify-center gap-2 ${activeTool === 'align-3pt' ? 'bg-blue-500 text-white' : 'text-white hover:bg-white/20'}`}
                        >
                            <span>3 Σημεία</span>
                        </button>
                    </div>
                )}
            </div>

            <div className="w-px h-5 bg-white/30 mx-1"></div>

            <ToolbarButton
                title={isAspectRatioLocked ? "Ξεκλείδωμα Αναλογιών" : "Κλείδωμα Αναλογιών"}
                onClick={onToggleAspectRatioLock}
                isActive={isAspectRatioLocked}
            >
                {isAspectRatioLocked ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.906-.75 1 1 0 001.732-1A5 5 0 0010 2z" clipRule="evenodd" />
                    </svg>
                )}
            </ToolbarButton>
            <div ref={cropButtonRef} className="relative">
                <ToolbarButton
                    title="Περικοπή Εικόνας"
                    onClick={() => canCrop && setIsCropDropdownOpen(prev => !prev)}
                    isActive={activeTool === 'crop-rect' || activeTool === 'crop-lasso'}
                    disabled={!canCrop}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 1v16h16M1 7h16v16" />
                    </svg>
                </ToolbarButton>
                {isCropDropdownOpen && (
                     <div className={`absolute left-1/2 -translate-x-1/2 bg-black/80 p-1 rounded-md shadow-lg flex flex-col gap-1 w-32 ${isMobile ? 'bottom-full mb-2' : 'top-full mt-2'}`}>
                        <button
                            onClick={() => handleToolChange('crop-rect')}
                            className={`w-full text-left px-2 py-1.5 text-sm rounded transition-colors flex items-center gap-2 ${activeTool === 'crop-rect' ? 'bg-blue-500 text-white' : 'text-white hover:bg-white/20'}`}
                        >
                             <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16v12H4z" /></svg>
                             <span>Ορθογώνιο</span>
                        </button>
                        <button
                           onClick={() => handleToolChange('crop-lasso')}
                           className={`w-full text-left px-2 py-1.5 text-sm rounded transition-colors flex items-center gap-2 ${activeTool === 'crop-lasso' ? 'bg-blue-500 text-white' : 'text-white hover:bg-white/20'}`}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M15.16 2.83A9 9 0 007.86 2.14a1 1 0 00-.86.97l-.23 2.19a1 1 0 00.72 1.1l3.55 1.42A9 9 0 0021.86 16.14a1 1 0 00.97-.86l.23-2.19a1 1 0 00-1.1-.72l-3.55-1.42A9 9 0 0015.16 2.83z" /></svg>
                            <span>Λάσο</span>
                        </button>
                    </div>
                )}
            </div>

            <div className="w-px h-5 bg-white/30 mx-1"></div>
            
            <ToolbarButton title="Περιστροφή Αριστερά" onClick={() => handleRotate(-90)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-6 6m0 0l-6-6m6 6V9a6 6 0 0112 0v3" />
                </svg>
            </ToolbarButton>
            <ToolbarButton title="Περιστροφή Δεξιά" onClick={() => handleRotate(90)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15l6 6m0 0l6-6m-6 6V9a6 6 0 00-12 0v3" />
                </svg>
            </ToolbarButton>
             <div ref={scaleButtonRef} className="relative">
                <ToolbarButton title="Κλίμακα" onClick={() => setIsScaleDropdownOpen(prev => !prev)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M21,16a1,1,0,0,0-1,1v1.59L13.41,12l2.13-2.12a1,1,0,0,0-1.42-1.42L12,10.59,5.41,4H7A1,1,0,0,0,7,2H3a1,1,0,0,0-.38.08,1,1,0,0,0-.54.54A1,1,0,0,0,2,3V7A1,1,0,0,0,4,7V5.41L10.59,12,8.46,14.12a1,1,0,0,0,0,1.42,1,1,0,0,0,.71.29,1,1,0,0,0,.71-.29L12,13.41,18.59,20H17a1,1,0,0,0,0,2h4a1,1,0,0,0,.38-.08,1,1,0,0,0,.54-.54A1,1,0,0,0,22,21V17A1,1,0,0,0,21,16Z"/>
                    </svg>
                </ToolbarButton>
                {isScaleDropdownOpen && (
                    <div className={`absolute left-1/2 -translate-x-1/2 bg-black/80 p-2 rounded-md shadow-lg flex flex-col gap-2 w-52 ${isMobile ? 'bottom-full mb-2' : 'top-full mt-2'}`}>
                        <button
                            title="1 εκατοστό στο σχέδιο = 1 μέτρο στον χάρτη"
                            onClick={() => handlePresetScale(0.01)}
                            className="w-full text-left px-2 py-1.5 text-sm rounded transition-colors text-white hover:bg-white/20"
                        >
                            cm → m (1:100)
                        </button>
                        <button
                            title="1 χιλιοστό στο σχέδιο = 1 μέτρο στον χάρτη"
                            onClick={() => handlePresetScale(0.001)}
                            className="w-full text-left px-2 py-1.5 text-sm rounded transition-colors text-white hover:bg-white/20"
                        >
                            mm → m (1:1000)
                        </button>
                        <button
                            title="1 μέτρο στο σχέδιο = 1 μέτρο στον χάρτη"
                            onClick={() => handlePresetScale(1)}
                            className="w-full text-left px-2 py-1.5 text-sm rounded transition-colors text-white hover:bg-white/20"
                        >
                            m → m (1:1)
                        </button>
                        <div className="border-t border-white/20 my-1"></div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-white flex-shrink-0">1 :</span>
                            <input
                                type="number"
                                value={customScale}
                                onChange={(e) => setCustomScale(e.target.value)}
                                className="w-full bg-black/50 text-white text-sm rounded px-2 py-1 border border-white/30 focus:outline-none focus:ring-1 focus:ring-blue-400"
                                placeholder="π.χ. 50"
                                onClick={(e) => e.stopPropagation()}
                            />
                            <button onClick={handleCustomScale} title="Εφαρμογή Προσαρμοσμένης Κλίμακας" className="p-1 rounded bg-blue-500 hover:bg-blue-600 text-white flex-shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );

    if (isMobile) {
        return (
            <div
                style={{ zIndex: 1002 }}
                className="fixed bottom-0 left-0 right-0 p-2 bg-black/80 flex justify-center"
            >
                {toolbarContent}
            </div>
        );
    }

    return (
        <>
            <ToolbarUpdater layer={layer} setPosition={setScreenPosition} />
            <div style={desktopStyle} className="shadow-lg">
                {toolbarContent}
            </div>
        </>
    );
};

export default ImageToolbar;