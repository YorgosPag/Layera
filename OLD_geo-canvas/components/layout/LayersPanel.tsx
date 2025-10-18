import React, { useRef } from 'react';
import { useAppContext } from '../../context/AppContext';

const LayersPanel: React.FC = () => {
    const { 
        layers, 
        movingLayerId, 
        editingLayerId, 
        isLayersPanelOpen,
        actions 
    } = useAppContext();
    
    const dragItem = useRef<number | null>(null);
    const dragOverItem = useRef<number | null>(null);

    const handleDragStart = (e: React.DragEvent<HTMLLIElement>, index: number) => {
        if ((e.target as HTMLElement).closest('button, input[type="range"]')) {
            e.preventDefault();
            return;
        }

        dragItem.current = index;
        setTimeout(() => {
            actions.setMovingLayerId(layers[index].id);
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
            actions.reorderLayers(newLayers);
        }
        dragItem.current = null;
        dragOverItem.current = null;
        actions.setMovingLayerId(null);
    };

    return (
        <aside className={`bg-white border-r border-gray-200 flex flex-col flex-shrink-0 transition-all duration-300 ease-in-out z-20 overflow-hidden ${isLayersPanelOpen ? 'w-80' : 'w-0'}`}>
             <div className="flex flex-col flex-grow min-w-0 w-80">
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-lg font-bold text-gray-800">Επίπεδα</h2>
                    <button onClick={() => actions.toggleLayersPanel(false)} title="Κλείσιμο" className="text-gray-500 hover:text-gray-800">
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
                                        onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); actions.startEditing(layer); }}
                                        title="Επεξεργασία Τοποθεσίας" 
                                        className={`hover:text-blue-600 ${editingLayerId === layer.id ? 'text-blue-700' : 'text-gray-600'}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 1v4m0 0h-4m4 0l-5-5" /></svg>
                                    </button>
                                    {layer.type === 'dxf' && (
                                        <button
                                            onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); actions.toggleLayerBackground(layer.id); }}
                                            title={layer.hasBackground ? "Απενεργοποίηση Φόντου" : "Ενεργοποίηση Φόντου"}
                                            className={`hover:text-blue-600 ${layer.hasBackground ? 'text-blue-700' : 'text-gray-600'}`}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                                            </svg>
                                        </button>
                                    )}
                                    <button 
                                        onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); actions.zoomToLayer(layer.id); }}
                                        title="Zoom to layer" 
                                        className="text-xl hover:text-blue-600">🔎</button>
                                    <button 
                                        onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); actions.toggleVisibility(layer.id); }}
                                        title={layer.isVisible ? "Hide" : "Show"} 
                                        className="text-xl hover:text-blue-600">{layer.isVisible ? '👁️' : '🙈'}</button>
                                    <button 
                                        onClick={() => actions.removeLayer(layer.id)}
                                        onMouseDown={(e) => e.stopPropagation()}
                                        title="Remove layer" 
                                        className="text-xl hover:text-red-600">🗑️</button>
                                </div>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.05"
                                value={layer.opacity}
                                onChange={(e) => actions.updateOpacity(layer.id, parseFloat(e.target.value))}
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