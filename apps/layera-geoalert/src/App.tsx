import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DeviceOverrideProvider, DeviceSimulator } from '@layera/viewport';
import { Text, Heading } from '@layera/typography';
import { Button } from '@layera/buttons';
import { ThemeProvider, ThemeSwitcher } from '@layera/theme-switcher';
import '@layera/typography/styles';
import '@layera/buttons/styles';
import '@layera/theme-switcher/styles';
import { ArrowLeftIcon, MapIcon, PuzzleIcon, LinkIcon, FolderIcon, ZapIcon, CheckIcon, PartyIcon } from './components/icons/LayeraIcons';
import LanguageSwitcher from './components/LanguageSwitcher';
import GeoMap, { DrawnArea } from './components/GeoMap';
import NavigationRail from './modules/sidebars/NavigationRail';
import AreasPanel from './modules/sidebars/AreasPanel';

function App() {
  const { t } = useTranslation();
  const [isMapMode, setIsMapMode] = useState(false);
  const [savedAreas, setSavedAreas] = useState<DrawnArea[]>([]);
  const [activeView, setActiveView] = useState<'dashboard' | 'map'>('dashboard');
  const [isAreasPanelOpen, setIsAreasPanelOpen] = useState(false);
  const [editingAreaId, setEditingAreaId] = useState<string | null>(null);

  const handleAreaCreated = (area: DrawnArea) => {
    setSavedAreas(prev => [...prev, area]);
    console.log('New area created:', area);
  };

  const handleEditArea = (area: DrawnArea) => {
    setEditingAreaId(area.id);
  };

  const handleZoomToArea = (areaId: string) => {
    console.log('Zoom to area:', areaId);
  };

  const handleToggleAreaVisibility = (areaId: string) => {
    setSavedAreas(prev => prev.map(area =>
      area.id === areaId ? { ...area, isVisible: !area.isVisible } : area
    ));
  };

  const handleRemoveArea = (areaId: string) => {
    setSavedAreas(prev => prev.filter(area => area.id !== areaId));
    if (editingAreaId === areaId) {
      setEditingAreaId(null);
    }
  };

  const handleUpdateAreaOpacity = (areaId: string, opacity: number) => {
    setSavedAreas(prev => prev.map(area =>
      area.id === areaId ? { ...area, opacity } : area
    ));
  };

  const handleReorderAreas = (newAreas: DrawnArea[]) => {
    setSavedAreas(newAreas);
  };

  const handleNewAlert = () => {
    setActiveView('map');
    setIsMapMode(true);
  };

  const handleFlyToUserLocation = () => {
    console.log('Flying to user location');
  };

  if (isMapMode) {
    return (
      <ThemeProvider defaultTheme="system" storageKey="layera-geoalert-theme">
        <DeviceOverrideProvider>
          <DeviceSimulator>
          <div style={{ height: '100vh', width: '100vw', position: 'fixed', top: 0, left: 0, display: 'flex' }}>
          {/* Black Navigation Rail */}
        <div style={{
          width: '64px',
          height: '100vh',
          backgroundColor: 'var(--layera-bg-secondary)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '1rem 0',
          zIndex: 1000
        }}>
          <Button
            variant="ghost"
            size="md"
            onClick={() => setIsMapMode(false)}
            icon={<ArrowLeftIcon size="sm" theme="neutral" />}
            iconPosition="only"
            title="Πίσω"
            className="layera-mb-4"
          />
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {/* Header */}
          <div style={{
            height: '64px',
            backgroundColor: 'var(--layera-bg-primary)',
            borderBottom: '1px solid var(--layera-border-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 1rem',
            zIndex: 100
          }}>
            <Heading as="h1" size="xl" color="primary" className="layera-flex layera-items-center layera-gap-2">
              <MapIcon size="md" theme="primary" />
              {t('title')} - Layera GeoCanvas
            </Heading>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ThemeSwitcher variant="icon" size="md" />
              <LanguageSwitcher />
            </div>
          </div>

          {/* Map Container */}
          <div style={{ flex: 1, position: 'relative' }}>
            <GeoMap onAreaCreated={handleAreaCreated} />
          </div>
        </div>
          </div>
          </DeviceSimulator>
        </DeviceOverrideProvider>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider defaultTheme="system" storageKey="layera-geoalert-theme">
      <DeviceOverrideProvider>
        <DeviceSimulator>
        <div style={{
          padding: '2rem',
          textAlign: 'center',
          backgroundColor: 'var(--layera-bg-primary)',
          color: 'var(--layera-text-primary)',
          minHeight: '100vh'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <Heading as="h1" size="2xl" color="primary" className="layera-flex layera-items-center layera-gap-2">
              <MapIcon size="md" theme="primary" />
              {t('title')}
            </Heading>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ThemeSwitcher variant="icon" size="md" />
              <LanguageSwitcher />
            </div>
          </div>

      <Text size="lg" color="secondary" className="layera-mb-8">{t('subtitle')}</Text>

      <div style={{ margin: '2rem 0' }}>
        <div style={{
          backgroundColor: 'var(--layera-bg-success)',
          color: 'var(--layera-text-on-success)',
          padding: '1.5rem',
          borderRadius: '8px',
          marginBottom: '2rem'
        }}>
          <Heading as="h3" size="lg" color="neutral" className="layera-mb-4 layera-flex layera-items-center layera-gap-2">
            <PartyIcon size="sm" theme="success" /> {t('geoCanvasReady')}
          </Heading>
          <Text size="base" color="neutral">{t('professionalArchitecture')}</Text>
        </div>

        <Button
          variant="primary"
          size="xl"
          onClick={() => setIsMapMode(true)}
          icon={<MapIcon size="lg" theme="neutral" />}
          className="layera-mb-8"
          style={{ margin: '0 auto 2rem auto', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}
        >
          {t('enterGeoCanvas')}
        </Button>

      <div style={{
        backgroundColor: 'var(--layera-bg-secondary)',
        border: '1px solid var(--layera-border-primary)',
        borderRadius: '8px',
        padding: '1.5rem',
        margin: '2rem 0',
        maxWidth: '500px',
        marginLeft: 'auto',
        marginRight: 'auto'
      }}>
        <Heading as="h3" size="lg" color="primary" className="layera-mb-4 layera-flex layera-items-center layera-gap-2">
          <CheckIcon size="xs" theme="success" /> {t('statusCheck')}
        </Heading>
        <div style={{ textAlign: 'left' }}>
          <Text size="base" className="layera-flex layera-items-center layera-gap-2 layera-mb-2">
            <CheckIcon size="xs" theme="success" /> {t('port')}: 3002
          </Text>
          <Text size="base" className="layera-flex layera-items-center layera-gap-2 layera-mb-2">
            <CheckIcon size="xs" theme="success" /> {t('reactReady')}
          </Text>
          <Text size="base" className="layera-flex layera-items-center layera-gap-2 layera-mb-2">
            <CheckIcon size="xs" theme="success" /> {t('typescriptStrict')}
          </Text>
          <Text size="base" className="layera-flex layera-items-center layera-gap-2 layera-mb-2">
            <CheckIcon size="xs" theme="success" /> {t('independentApp')}
          </Text>
          <Text size="base" className="layera-flex layera-items-center layera-gap-2 layera-mb-2">
            <CheckIcon size="xs" theme="success" /> {t('enterpriseArchitecture')}
          </Text>
          <Text size="base" className="layera-flex layera-items-center layera-gap-2 layera-mb-2">
            <CheckIcon size="xs" theme="success" /> Dual Sidebar Layout: NavigationRail + AreasPanel
          </Text>
          <Text size="base" className="layera-flex layera-items-center layera-gap-2">
            <CheckIcon size="xs" theme="success" /> Geo-Canvas Micromodules Integration
          </Text>
        </div>
      </div>

        <a
          href="http://localhost:3001"
          target="_blank"
          style={{
            color: 'var(--layera-bg-info)',
            textDecoration: 'none',
            padding: '0.75rem 1.5rem',
            border: '2px solid var(--layera-bg-info)',
            borderRadius: '6px',
            display: 'inline-block',
            fontWeight: 'bold',
            transition: 'all 0.2s'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--layera-bg-info)';
            e.currentTarget.style.color = 'var(--layera-text-on-info)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = 'var(--layera-bg-info)';
          }}
        >
          {t('navigateToLayeraId')}
        </a>
      </div>

        <div style={{ marginTop: '2rem' }}>
          <Text size="sm" color="secondary" className="layera-flex layera-items-center layera-gap-2 layera-mb-2">
            <PuzzleIcon size="sm" theme="info" /> {t('modularMicroservice')}
          </Text>
          <Text size="sm" color="secondary" className="layera-flex layera-items-center layera-gap-2 layera-mb-2">
            <LinkIcon size="sm" theme="info" /> {t('crossAppNavigation')}
          </Text>
          <Text size="sm" color="secondary" className="layera-flex layera-items-center layera-gap-2 layera-mb-2">
            <FolderIcon size="sm" theme="info" /> {t('dualSidebarLayout')}
          </Text>
          <Text size="sm" color="secondary" className="layera-flex layera-items-center layera-gap-2">
            <ZapIcon size="sm" theme="warning" /> {t('readyForImplementation')}
          </Text>
        </div>
        </div>
        </DeviceSimulator>
      </DeviceOverrideProvider>
    </ThemeProvider>
  )
}

export default App