import React, { useRef } from 'react';
import { Box } from '@layera/layout';
import { useLayeraTranslation } from '@layera/tolgee';
import { Text, Heading } from '@layera/typography';
import { Button } from '@layera/buttons';
import { DrawnArea } from '@layera/geo-drawing';
import { SearchIcon, TrashIcon, EyeIcon, EyeOffIcon, EditIcon } from '@layera/icons';
import { UI_DIMENSIONS } from '@layera/constants';
import { BaseCard } from '@layera/cards';
import './AreasPanel.css';
import '@layera/auth-bridge/src/components/UserDisplay.css';

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
    <aside className={`areas-panel-layout ${isOpen ? `width-${UI_DIMENSIONS.SIDEBAR.AREAS_PANEL_WIDTH}` : `width-${UI_DIMENSIONS.SIDEBAR.COLLAPSED_WIDTH}`}`}>
      <Box className="areas-panel-content">
        <Box className="areas-panel-header layera-areas-panel-border">
          <Heading as="h2" size="lg" weight="bold" color="primary">{t('areas')}</Heading>
          <Button
            onClick={onTogglePanel}
            variant="ghost"
            size="xs"
            title={t('close')}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="icon-size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </Button>
        </Box>

        {areas.length === 0 && (
          <Box className="areas-panel-empty">
            <Text size="sm" color="secondary" align="center">
              {t('noAreas')} <br />
              {t('clickPlusCreate')}
            </Text>
          </Box>
        )}

        <ul className="areas-panel-list">
          {areas.map((area, index) => (
            <li
              key={area.id}
              draggable
              onDragStart={(e: React.FormEvent<HTMLFormElement>) => handleDragStart(e, index)}
              onDragEnter={(e: React.FormEvent<HTMLFormElement>) => handleDragEnter(e, index)}
              onDragEnd={handleDragEnd}
              onDragOver={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}
              className="layera-areas-panel-border border-b cursor-move"
            >
              <BaseCard
                variant={editingAreaId === area.id ? 'info' : 'outlined'}
                opacityMode="semi-transparent"
                className="mb-0"
                className="layera-areas-panel-drag-item"
              >
                <Box className="areas-panel-item-controls">
                <Text size="sm" weight="semibold" className="truncate pr-2" title={area.name}>
                  {area.name}
                </Text>
                <Box className="areas-panel-buttons">
                  <Button
                    onMouseDown={(e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); e.stopPropagation(); onEditArea(area); }}
                    title={t('editArea')}
                    variant="ghost"
                    size="xs"
                  >
                    <EditIcon className="icon-size-5" />
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
                className="layera-areas-panel-slider w-full mt-1 h-1 rounded-lg appearance-none cursor-pointer"
              />
            </li>
          ))}
        </ul>
      </Box>
    </aside>
  );
};

export default AreasPanel;