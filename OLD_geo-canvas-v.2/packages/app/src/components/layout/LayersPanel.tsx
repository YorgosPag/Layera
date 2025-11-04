import React, { useRef } from 'react';
import { useLayersContext } from '../../context/layers/LayersProvider';
import { useUiContext } from '../../context/UiContext';

const LayersPanel: React.FC = () => {
    const { 
        layers, 
        movingLayerId, 
        editingLayerId, 
        actions: layersActions 
    } = useLayersContext();
    const { isLayersPanelOpen, actions: uiActions } = useUiContext();
    
    const dragItem = useRef<number | null>(null);
    const dragOverItem = useRef<number | null>(null);

    const handleDragStart = (e: React.DragEvent<HTMLLIElement>, index: number) => {
        if ((e.target as HTMLElement).closest('button, input[type="range"]')) {
            e.preventDefault();
            return;
        }

        dragItem.current = index;
        setTimeout(() => {
            layersActions.setMovingLayerId(layers[index].id);
        }, 0);
    };

    const handleDragEnter = (e: React.DragEvent<HTMLLIElement>, index: number) => {
        dragOverItem.current = index;
    };

    const handleDragEnd = () => {
        if (dragItem.current !== null && dragOverItem.current !== null && dragItem.current !== dragOverItem.current) {
            const newLayers = [...layers];
            const draggedItemContent = newLayers.splice(dragItem.current, 1)[0];
            newLayers.splice(dragOverItem.current, 0, draggedItemContent);
            layersActions.reorderLayers(newLayers);
        }
        dragItem.current = null;
        dragOverItem.current = null;
        layersActions.setMovingLayerId(null);
    };

    return (
        <aside className={`bg-white border-r border-gray-200 flex flex-col flex-shrink-0 transition-all duration-300 ease-in-out z-20 overflow-hidden ${isLayersPanelOpen ? 'w-80' : 'w-0'}`}>
             <div className="flex flex-col flex-grow min-w-0 w-80">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-lg font-bold text-gray-800">Επίπεδα</h2>
                    <button onClick={() => uiActions.toggleLayersPanel(false)} title="Κλείσιμο" className="text-gray-500 hover:text-gray-800">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                {layers.length === 0 && (
                    <div className="flex-grow flex items-center justify-center p-4">
                        <p className="text-sm text-gray-500 text-center">Δεν υπάρχουν επίπεδα. <br/> Πατήστε '+' για να ξεκινήσετε μια "Νέα Καταχώρηση".</p>
                    </div>
                )}
                <ul className="flex-grow overflow-y-auto">
                    {layers.map((layer, index) => (
                        <li
                            key={layer.id}
                            draggable
                            onDragStart={(e) => handleDragStart(e, index)}
                            onDragEnter={(e) => handleDragEnter(e, index)}
                            onDragEnd={handleDragEnd}
                            onDragOver={(e) => e.preventDefault()}
                            className={`p-2 border-b border-gray-200 cursor-move ${movingLayerId === layer.id ? 'opacity-50' : ''} ${editingLayerId === layer.id ? 'bg-blue-100 ring-2 ring-blue-500' : ''}`}
                        >
                            <div className="flex items-center justify-between">
                                <span className="font-semibold text-sm truncate pr-2" title={layer.name}>{layer.name}</span>
                                <div className="flex items-center space-x-2">
                                    <button 
                                        onMouseDown={(e) => { 
                                            e.preventDefault(); 
                                            e.stopPropagation(); 
                                            if (editingLayerId === layer.id) {
                                                layersActions.stopEditing(true); // Stop editing and save
                                            } else {
                                                layersActions.startEditing(layer); 
                                                uiActions.toggleLayersPanel(false); 
                                            }
                                        }}
                                        title="Επεξεργασία Τοποθεσίας" 
                                        className={`hover:text-blue-600 ${editingLayerId === layer.id ? 'text-blue-700' : 'text-gray-600'}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 1v4m0 0h-4m4 0l-5-5" /></svg>
                                    </button>
                                    {layer.type === 'dxf' && (
                                        <button
                                            onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); layersActions.toggleLayerBackground(layer.id); }}
                                            title={layer.hasBackground ? "Απενεργοποίηση Φόντου" : "Ενεργοποίηση Φόντου"}
                                            className={`hover:text-blue-600 ${layer.hasBackground ? 'text-blue-700' : 'text-gray-600'}`}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                                            </svg>
                                        </button>
                                    )}
                                    <button 
                                        onMouseDown={(e) => { 
                                            e.preventDefault(); 
                                            e.stopPropagation(); 
                                            layersActions.zoomToLayer(layer.id); 
                                            uiActions.toggleLayersPanel(false); 
                                        }}
                                        title="Εστίαση στο επίπεδο" 
                                        className="text-gray-600 hover:text-blue-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                    <button 
                                        onMouseDown={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                            
                                            uiActions.toggleLayersPanel(false);
                                            layersActions.zoomToLayer(layer.id);

                                            if (layer.isVisible) {
                                                // If it's currently visible, we are hiding it.
                                                // Wait 2 seconds before executing the hide for better UX.
                                                setTimeout(() => {
                                                    layersActions.toggleVisibility(layer.id);
                                                }, 2000);
                                            } else {
                                                // If it's currently hidden, we are showing it immediately.
                                                layersActions.toggleVisibility(layer.id);
                                            }
                                        }}
                                        title={layer.isVisible ? "Απόκρυψη" : "Εμφάνιση"} 
                                        className="text-gray-600 hover:text-blue-600">
                                        {layer.isVisible ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                              <path fillRule="evenodd" d="M.458 10C3.732 4.943 9.522 3 10 3s6.268 1.943 9.542 7c-3.274 5.057-9.064 7-9.542 7S3.732 15.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                              <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C16.268 4.943 10.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                                              <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.742L2.335 6.578A10.025 10.025 0 00.458 10c3.274 5.057 9.064 7 9.542 7 .847 0 1.682-.12 2.454-.303z" />
                                            </svg>
                                        )}
                                    </button>
                                    <button 
                                        onClick={() => layersActions.removeLayer(layer.id)}
                                        onMouseDown={(e) => e.stopPropagation()}
                                        title="Διαγραφή επιπέδου" 
                                        className="text-gray-600 hover:text-red-600">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.05"
                                value={layer.opacity}
                                onChange={(e) => layersActions.updateOpacity(layer.id, parseFloat(e.target.value))}
                                className="w-full mt-1 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            />
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
};

export default LayersPanel;