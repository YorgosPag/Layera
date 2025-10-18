import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { DrawnArea } from '../../components/GeoMap';
import { SearchIcon, EyeIcon, EyeOffIcon, TrashIcon } from '../../components/icons/LayeraIcons';

interface AreasPanelProps {
  isOpen: boolean;
  areas: DrawnArea[];
  editingAreaId: string | null;
  onTogglePanel: () => void;
  onEditArea: (area: DrawnArea) => void;
  onZoomToArea: (areaId: string) => void;
  onToggleAreaVisibility: (areaId: string) => void;
  onRemoveArea: (areaId: string) => void;
  onUpdateAreaOpacity: (areaId: string, opacity: number) => void;
  onReorderAreas: (newAreas: DrawnArea[]) => void;
}

const AreasPanel: React.FC<AreasPanelProps> = ({
  isOpen,
  areas,
  editingAreaId,
  onTogglePanel,
  onEditArea,
  onZoomToArea,
  onToggleAreaVisibility,
  onRemoveArea,
  onUpdateAreaOpacity,
  onReorderAreas
}) => {
  const { t } = useTranslation();
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  const handleDragStart = (e: React.DragEvent<HTMLLIElement>, index: number) => {
    if ((e.target as HTMLElement).closest('button, input[type="range"]')) {
      e.preventDefault();
      return;
    }
    dragItem.current = index;
  };

  const handleDragEnter = (e: React.DragEvent<HTMLLIElement>, index: number) => {
    dragOverItem.current = index;
  };

  const handleDragEnd = () => {
    if (dragItem.current !== null && dragOverItem.current !== null && dragItem.current !== dragOverItem.current) {
      const newAreas = [...areas];
      const draggedItemContent = newAreas.splice(dragItem.current, 1)[0];
      newAreas.splice(dragOverItem.current, 0, draggedItemContent);
      onReorderAreas(newAreas);
    }
    dragItem.current = null;
    dragOverItem.current = null;
  };

  return (
    <aside className={`bg-white border-r border-gray-200 flex flex-col flex-shrink-0 transition-all duration-300 ease-in-out z-20 overflow-hidden ${isOpen ? 'w-80' : 'w-0'}`}>
      <div className="flex flex-col flex-grow min-w-0 w-80">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-800">{t('areas')}</h2>
          <button
            onClick={onTogglePanel}
            title={t('close')}
            className="text-gray-500 hover:text-gray-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {areas.length === 0 && (
          <div className="flex-grow flex items-center justify-center p-4">
            <p className="text-sm text-gray-500 text-center">
              {t('noAreas')} <br />
              {t('clickPlusCreate')}
            </p>
          </div>
        )}

        <ul className="flex-grow overflow-y-auto">
          {areas.map((area, index) => (
            <li
              key={area.id}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragEnter={(e) => handleDragEnter(e, index)}
              onDragEnd={handleDragEnd}
              onDragOver={(e) => e.preventDefault()}
              className={`p-2 border-b border-gray-200 cursor-move ${editingAreaId === area.id ? 'bg-blue-100 ring-2 ring-blue-500' : ''}`}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm truncate pr-2" title={area.name}>
                  {area.name}
                </span>
                <div className="flex items-center space-x-2">
                  <button
                    onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); onEditArea(area); }}
                    title={t('editArea')}
                    className={`hover:text-blue-600 ${editingAreaId === area.id ? 'text-blue-700' : 'text-gray-600'}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 1v4m0 0h-4m4 0l-5-5" />
                    </svg>
                  </button>

                  <button
                    onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); onZoomToArea(area.id); }}
                    title={t('zoomToArea')}
                    className="hover:text-blue-600"
                  >
                    <SearchIcon size="sm" theme="neutral" />
                  </button>

                  <button
                    onMouseDown={(e) => { e.preventDefault(); e.stopPropagation(); onToggleAreaVisibility(area.id); }}
                    title={area.isVisible ? t('hide') : t('show')}
                    className="hover:text-blue-600"
                  >
                    {area.isVisible ? <EyeIcon size="sm" theme="neutral" /> : <EyeOffIcon size="sm" theme="neutral" />}
                  </button>

                  <button
                    onClick={() => {
                      if (window.confirm(t('confirmDelete'))) {
                        onRemoveArea(area.id);
                      }
                    }}
                    onMouseDown={(e) => e.stopPropagation()}
                    title={t('deleteArea')}
                    className="hover:text-red-600"
                  >
                    <TrashIcon size="sm" theme="danger" />
                  </button>
                </div>
              </div>

              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={area.opacity || 1}
                onChange={(e) => onUpdateAreaOpacity(area.id, parseFloat(e.target.value))}
                className="w-full mt-1 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default AreasPanel;