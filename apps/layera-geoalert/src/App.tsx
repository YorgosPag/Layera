import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DeviceOverrideProvider, DeviceSimulator } from '@layera/viewport';
import { Text, Heading } from '@layera/typography';
import { Button } from '@layera/buttons';
import { ThemeProvider, ThemeSwitcher } from '@layera/theme-switcher';
import { AppShell } from '@layera/layout';
import { NotificationProvider, useNotifications } from '@layera/notifications';
import { LoadingSpinner } from '@layera/loading';
import '@layera/typography/styles';
import '../../../packages/buttons/dist/styles.css';
import '@layera/theme-switcher/styles';
import '@layera/layout/styles';
import { ArrowLeftIcon, MapIcon, PuzzleIcon, LinkIcon, FolderIcon, ZapIcon, CheckIcon, PartyIcon } from './components/icons/LayeraIcons';
import LanguageSwitcher from './components/LanguageSwitcher';
import { GeoHeader } from './components/GeoHeader';
import { SimpleNavigationRail } from './components/SimpleNavigationRail';
import GeoMap, { DrawnArea } from './components/GeoMap';

function TestNotificationsComponent() {
  const { addNotification } = useNotifications();
  const [isLoading, setIsLoading] = useState(false);

  const testSuccessNotification = () => {
    addNotification({
      type: 'success',
      message: 'LEGO Notifications Working! Integration επιτυχής! 🎉'
    });
  };

  const testErrorNotification = () => {
    addNotification({
      type: 'error',
      message: 'Test Error Notification - LEGO Systems Functioning! ⚠️'
    });
  };

  const testInfoNotification = () => {
    addNotification({
      type: 'info',
      message: 'LEGO Architecture: 13 Packages Successfully Integrated! 📦'
    });
  };

  const testLoadingSpinner = () => {
    setIsLoading(true);
    addNotification({
      type: 'info',
      message: 'Testing Loading Spinner... 🔄'
    });

    setTimeout(() => {
      setIsLoading(false);
      addNotification({
        type: 'success',
        message: 'Loading Test Complete! LEGO Loading System Works! ✅'
      });
    }, 3000);
  };

  return (
    <div style={{
      backgroundColor: 'var(--layera-bg-secondary)',
      padding: '1.5rem',
      borderRadius: '8px',
      margin: '1rem 0',
      border: '2px solid var(--layera-border-success)'
    }}>
      <Heading as="h3" size="lg" color="primary" className="layera-mb-4">
        🧪 LEGO Systems Test Panel
      </Heading>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
        marginBottom: '1rem'
      }}>
        <Button
          variant="primary"
          size="md"
          onClick={testSuccessNotification}
          style={{ backgroundColor: 'var(--layera-bg-success)' }}
        >
          Test Success 🎉
        </Button>

        <Button
          variant="secondary"
          size="md"
          onClick={testErrorNotification}
          style={{ backgroundColor: 'var(--layera-bg-error)' }}
        >
          Test Error ⚠️
        </Button>

        <Button
          variant="outline"
          size="md"
          onClick={testInfoNotification}
          style={{ borderColor: 'var(--layera-bg-info)', color: 'var(--layera-bg-info)' }}
        >
          Test Info 📦
        </Button>

        <Button
          variant="primary"
          size="md"
          onClick={testLoadingSpinner}
          disabled={isLoading}
          style={{ backgroundColor: 'var(--layera-bg-warning)' }}
        >
          {isLoading ? <LoadingSpinner size="sm" /> : 'Test Loading 🔄'}
        </Button>
      </div>

      {isLoading && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '1rem',
          backgroundColor: 'var(--layera-bg-warning)',
          borderRadius: '4px',
          color: 'var(--layera-text-on-warning)'
        }}>
          <LoadingSpinner size="md" />
          <Text size="base" color="neutral">
            Testing @layera/loading spinner integration...
          </Text>
        </div>
      )}

      <Text size="sm" color="secondary" style={{ marginTop: '1rem' }}>
        ✅ @layera/notifications: Παρέχει enterprise-grade notification system<br/>
        ✅ @layera/loading: Provides consistent loading states<br/>
        ✅ Integration Testing: Όλα τα LEGO components λειτουργούν μαζί!
      </Text>
    </div>
  );
}

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
        <NotificationProvider>
          <DeviceOverrideProvider>
            <DeviceSimulator>
              <AppShell
                layout="fullscreen-map"
                header={<GeoHeader />}
                sidebar={
                  <SimpleNavigationRail onBackClick={() => setIsMapMode(false)} />
                }
              >
                <GeoMap onAreaCreated={handleAreaCreated} />
              </AppShell>
            </DeviceSimulator>
          </DeviceOverrideProvider>
        </NotificationProvider>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider defaultTheme="system" storageKey="layera-geoalert-theme">
      <NotificationProvider>
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
                  style={{ margin: '0 auto 2rem auto', boxShadow: '0 4px 6px color-mix(in srgb, var(--layera-bg-secondary) 10%, transparent 90%)' }}
                >
                  {t('enterGeoCanvas')}
                </Button>

                <TestNotificationsComponent />

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
                      <CheckIcon size="xs" theme="success" /> @layera/layout Integration: AppShell + LayeraHeader
                    </Text>
                    <Text size="base" className="layera-flex layera-items-center layera-gap-2 layera-mb-2">
                      <CheckIcon size="xs" theme="success" /> @layera/notifications Integration: NotificationProvider
                    </Text>
                    <Text size="base" className="layera-flex layera-items-center layera-gap-2">
                      <CheckIcon size="xs" theme="success" /> Unified Layout System με fullscreen-map layout
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
                  <FolderIcon size="sm" theme="info" /> Unified Layout System: @layera/layout
                </Text>
                <Text size="sm" color="secondary" className="layera-flex layera-items-center layera-gap-2">
                  <ZapIcon size="sm" theme="warning" /> {t('readyForImplementation')}
                </Text>
              </div>
            </div>
          </DeviceSimulator>
        </DeviceOverrideProvider>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;