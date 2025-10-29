import React, { useRef } from 'react';
import { Box } from '@layera/layout';
import { useLayeraTranslation } from '@layera/tolgee';
import { Text, Heading } from '@layera/typography';
import { Button } from '@layera/buttons';
import { DrawnArea } from '@layera/geo-drawing';
import { SearchIcon, TrashIcon, EyeIcon, EyeOffIcon, EditIcon } from '@layera/icons';
import { BaseCard } from '@layera/cards';

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
  const { t } = useLayeraTranslation();
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

  const handleDragEnd = (): void => {
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
      <Box className="flex flex-col flex-grow min-w-0 w-80">
        <Box className="p-4 border-b border-gray-200 flex justify-between items-center">
          <Heading as="h2" size="lg" weight="bold" color="primary">{t('areas')}</Heading>
          <Button
            onClick={onTogglePanel}
            variant="ghost"
            size="xs"
            title={t('close')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Button>
        </Box>

        {areas.length === 0 && (
          <Box className="flex-grow flex items-center justify-center p-4">
            <Text size="sm" color="secondary" align="center">
              {t('noAreas')} <br />
              {t('clickPlusCreate')}
            </Text>
          </Box>
        )}

        <ul className="flex-grow overflow-y-auto">
          {areas.map((area, index) => (
            <li
              key={area.id}
              draggable
              onDragStart={(e: React.FormEvent<HTMLFormElement>) => handleDragStart(e, index)}
              onDragEnter={(e: React.FormEvent<HTMLFormElement>) => handleDragEnter(e, index)}
              onDragEnd={handleDragEnd}
              onDragOver={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}
              className="border-b border-gray-200 cursor-move"
            >
              <BaseCard
                variant={editingAreaId === area.id ? 'info' : 'outlined'}
                opacityMode="semi-transparent"
                className="mb-0 border-0"
                style={{
                  transition: 'all 0.2s ease',
                  cursor: 'move'
                }}
              >
                <Box className="flex items-center justify-between p-2">
                <Text size="sm" weight="semibold" className="truncate pr-2" title={area.name}>
                  {area.name}
                </Text>
                <Box className="flex items-center space-x-2">
                  <Button
                    onMouseDown={(e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); e.stopPropagation(); onEditArea(area); }}
                    title={t('editArea')}
                    variant="ghost"
                    size="xs"
                  >
                    <EditIcon className="h-5 w-5" />
                  </Button>

                  <Button
                    onMouseDown={(e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); e.stopPropagation(); onZoomToArea(area.id); }}
                    title={t('zoomToArea')}
                    variant="ghost"
                    size="xs"
                    icon={<SearchIcon size="sm" theme="neutral" />}
                  />

                  <Button
                    onMouseDown={(e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); e.stopPropagation(); onToggleAreaVisibility(area.id); }}
                    title={area.isVisible ? t('hide') : t('show')}
                    variant="ghost"
                    size="xs"
                    icon={area.isVisible ? <EyeIcon size="sm" theme="neutral" /> : <EyeOffIcon size="sm" theme="neutral" />}
                  />

                  <Button
                    onClick={(): void => {
                      if (window.confirm(t('confirmDelete'))) {
                        onRemoveArea(area.id);
                      }
                    }}
                    onMouseDown={(e: React.FormEvent<HTMLFormElement>) => e.stopPropagation()}
                    title={t('deleteArea')}
                    variant="ghost"
                    size="xs"
                    icon={<TrashIcon size="sm" theme="danger" />}
                  />
                </Box>
              </Box>
              </BaseCard>

              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={area.opacity || 1}
                onChange={(e: React.FormEvent<HTMLFormElement>) => onUpdateAreaOpacity(area.id, parseFloat(e.target.value))}
                className="w-full mt-1 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </li>
          ))}
        </ul>
      </Box>
    </aside>
  );
};

export default AreasPanel;