// React imports
import { useState, useEffect } from 'react';

// Enterprise LEGO Design System imports
import '@layera/styles';
import { BOX_SHADOW_SCALE } from '@layera/box-shadows';
import { Button } from '@layera/buttons';
import { SPACING_SCALE, BORDER_RADIUS, TABLE_COLUMN_WIDTHS } from '@layera/constants';
import { ErrorBoundary } from '@layera/error-boundary';
import { MapIcon, ShareIcon, LayersIcon, AlertTriangleIcon, CheckIcon, MoreIcon } from '@layera/icons';
import { AppShell, Flex } from '@layera/layout';
import { LoadingSpinner } from '@layera/loading';
import { NotificationProvider, useNotifications } from '@layera/notifications';
import { ThemeProvider, ThemeSwitcher } from '@layera/theme-switcher';
import { useLayeraTranslation, LanguageSwitcher } from '@layera/tolgee';
import { Text, Heading } from '@layera/typography';
import { useViewportWithOverride, DeviceOverrideProvider } from '@layera/viewport';

// Local application imports
import { APP_CONFIG, DEVICE_CONFIG, ANIMATION_CONFIG } from './constants';
import { GeoHeader } from './components/GeoHeader';
import { GeoMap } from './components/GeoMapNew';
import { DeviceFrameWrapper } from './components/DeviceFrameWrapper';
import { UnifiedPipelineModal } from '../../../packages/pipelines/unified/UnifiedPipelineModal';
import { ViewportFrame } from './components/ViewportFrame';

/**
 * DrawnArea Interface - Map-core package integration
 *
 * Defines structure for drawn areas on the map
 */
interface DrawnArea {
  id: string;
  type: 'polygon' | 'marker';
  coordinates: number[][];
  name: string;
  nameTemplate?: string;
  nameNumber?: number;
  area?: number;
  category: 'real_estate' | 'jobs';
  isVisible?: boolean;
  opacity?: number;
  metadata?: any;
}

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
      padding: `${SPACING_SCALE.LG}px`,
      borderRadius: `${BORDER_RADIUS.SM}px`,
      margin: `${SPACING_SCALE.MD}px 0`,
      border: '2px solid var(--layera-border-success)'
    }}>
      <Heading as="h3" size="lg" color="primary" className="layera-mb-4">
        🧪 LEGO Systems Test Panel
      </Heading>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: `${SPACING_SCALE.MD}px`,
        marginBottom: `${SPACING_SCALE.MD}px`
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
        <Flex align="center" justify="center" style={{
          gap: `${SPACING_SCALE.SM}px`,
          padding: `${SPACING_SCALE.MD}px`,
          backgroundColor: 'var(--layera-bg-warning)',
          borderRadius: `${BORDER_RADIUS.XS}px`,
          color: 'var(--layera-text-on-warning)'
        }}>
          <LoadingSpinner size="md" />
          <Text size="base" color="neutral">
            Testing @layera/loading spinner integration...
          </Text>
        </Flex>
      )}

      <div style={{ marginTop: `${SPACING_SCALE.MD}px` }}>
        <Text size="sm" color="secondary">
          ✅ @layera/notifications: Παρέχει enterprise-grade notification system<br/>
          ✅ @layera/loading: Provides consistent loading states<br/>
          ✅ Integration Testing: Όλα τα LEGO components λειτουργούν μαζί!
        </Text>
      </div>
    </div>
  );
}

function App() {
  const { t } = useLayeraTranslation();
  const { } = useViewportWithOverride(); // Keep hook call for side effects
  const [isMapMode, setIsMapMode] = useState(false);
  const [showCategoryElements, setShowCategoryElements] = useState(false);

  // iPhone 14 Pro Max detection - immediate check
  const deviceFrameElement = document.getElementById(DEVICE_CONFIG.iPhone14ProMax.viewport.id);
  const isInDeviceFrame = !!deviceFrameElement;
  let frameWidth = 0;
  let frameHeight = 0;

  if (isInDeviceFrame && deviceFrameElement) {
    const rect = deviceFrameElement.getBoundingClientRect();
    frameWidth = rect.width;
    frameHeight = rect.height;
  }

  const isIPhone14ProMaxDevice = isInDeviceFrame &&
    ((frameWidth === DEVICE_CONFIG.iPhone14ProMax.width && frameHeight === DEVICE_CONFIG.iPhone14ProMax.height) ||
     (frameWidth >= DEVICE_CONFIG.iPhone14ProMax.tolerance.widthMin &&
      frameWidth <= DEVICE_CONFIG.iPhone14ProMax.tolerance.widthMax &&
      frameHeight >= DEVICE_CONFIG.iPhone14ProMax.tolerance.heightMin &&
      frameHeight <= DEVICE_CONFIG.iPhone14ProMax.tolerance.heightMax));


  // State για re-render αν αλλάξει
  const [deviceDetected, setDeviceDetected] = useState(isIPhone14ProMaxDevice);
  const [, setSavedAreas] = useState<DrawnArea[]>([]);
  const [showUnifiedPipeline, setShowUnifiedPipeline] = useState(false);

  // Use detected iPhone mode
  const finalIsIPhone = deviceDetected || isIPhone14ProMaxDevice;

  useEffect(() => {
    const checkDevice = () => {
      const deviceFrameElement = document.getElementById(DEVICE_CONFIG.iPhone14ProMax.viewport.id);
      const isInDeviceFrame = !!deviceFrameElement;

      if (isInDeviceFrame && deviceFrameElement) {
        const rect = deviceFrameElement.getBoundingClientRect();
        const frameWidth = rect.width;
        const frameHeight = rect.height;

        const isIPhone14ProMax = ((frameWidth === DEVICE_CONFIG.iPhone14ProMax.width && frameHeight === DEVICE_CONFIG.iPhone14ProMax.height) ||
                                 (frameWidth >= DEVICE_CONFIG.iPhone14ProMax.tolerance.widthMin &&
                                  frameWidth <= DEVICE_CONFIG.iPhone14ProMax.tolerance.widthMax &&
                                  frameHeight >= DEVICE_CONFIG.iPhone14ProMax.tolerance.heightMin &&
                                  frameHeight <= DEVICE_CONFIG.iPhone14ProMax.tolerance.heightMax));

        if (process.env.NODE_ENV === 'development') {
          console.log('🎯 App.tsx Device Detection Update:', {
            deviceFrameElement: !!deviceFrameElement,
            frameWidth,
            frameHeight,
            isIPhone14ProMax,
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight
          });
        }

        setDeviceDetected(isIPhone14ProMax);
      }
    };

    // Έλεγχος μετά από λίγο για DOM updates
    const timer = setTimeout(checkDevice, ANIMATION_CONFIG.delays.deviceCheck);

    return () => clearTimeout(timer);
  }, []);

  const handleAreaCreated = (area: DrawnArea) => {
    setSavedAreas(prev => [...prev, area]);
    if (process.env.NODE_ENV === 'development') {
      console.log('New area created:', area);
    }
  };


  const handleNewEntryClick = () => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Opening Unified Pipeline...');
    }
    setShowUnifiedPipeline(true);
  };

  const handleUnifiedPipelineSubmit = async (data: any) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('Unified Pipeline submitted with data:', data);
    }
    // TODO: Implement API submission logic
    // For now, just close the modal after submission
    setShowUnifiedPipeline(false);
  };

  if (isMapMode) {
    return (
      <ErrorBoundary level="page" onError={(error, errorInfo) => console.error('🛡️ GeoAlert Map Error:', error, errorInfo)}>
        <ThemeProvider defaultTheme="system" storageKey="layera-geoalert-theme">
        <NotificationProvider>
          <DeviceOverrideProvider>
            {/* CSS για κρύψιμο header όταν stepper είναι ενεργό */}
            <style>
              {`
                .hide-header .layera-layout-header {
                  display: none !important;
                  height: 0 !important;
                  margin: 0 !important;
                  padding: 0 !important;
                  border: none !important;
                }
                .hide-header {
                  grid-template-rows: 0 1fr !important;
                }
              `}
            </style>

            {/* ΤΕΛΙΚΗ ΛΥΣΗ: Viewport element transparent για σωστό dark mode */}
            <style>{`
              /* Διόρθωση viewport element που προκαλούσε λευκή περιοχή σε dark mode */
              [id*="viewport"] {
                background-color: transparent !important;
              }

              /* Map containers transparent για consistency */
              .tablet-map-container,
              .mobile-map-container,
              .desktop-map-container {
                background-color: transparent !important;
              }
            `}</style>
            <div style={{
              display: 'flex',
              height: '100vh'
            }}>

              {/* Device Frame - Left Side */}
              <div style={{ flex: 1 }}>
                <DeviceFrameWrapper enabled={true}>
                  <AppShell
                    layout="fullscreen"
                    header={(!showCategoryElements || !finalIsIPhone) ?
                      <GeoHeader onBackClick={() => setIsMapMode(false)} isIPhone14ProMax={finalIsIPhone} /> :
                      null}
                    className={`geo-map-shell ${showCategoryElements && finalIsIPhone ? 'hide-header' : ''}`}
                  >
                    <ViewportFrame id="layera-device-simulator-viewport">
                      <GeoMap
                        onAreaCreated={handleAreaCreated}
                        onNewEntryClick={handleNewEntryClick}
                        showUnifiedPipeline={showUnifiedPipeline}
                        onCloseUnifiedPipeline={() => setShowUnifiedPipeline(false)}
                        onSubmitUnifiedPipeline={handleUnifiedPipelineSubmit}
                        isIPhone14ProMaxDevice={finalIsIPhone}
                        onCategoryElementsChange={setShowCategoryElements}
                        showCategoryElements={showCategoryElements}
                      />
                    </ViewportFrame>
                  </AppShell>
                </DeviceFrameWrapper>
              </div>

              {/* Pipeline Control Panel - Right Side */}
              {showUnifiedPipeline && (
                <div style={{
                  width: `${TABLE_COLUMN_WIDTHS.EXTRA_WIDE}px`, // Container width for control panel
                  backgroundColor: 'var(--layera-bg-secondary)',
                  border: '1px solid var(--layera-border-primary)',
                  padding: `${SPACING_SCALE.LG + SPACING_SCALE.XS}px`,
                  overflow: 'auto'
                }}>
                  <div style={{
                    margin: `0 0 ${SPACING_SCALE.MD}px 0`
                  }}>
                    <Heading as="h3" size="lg" weight="bold">
                      🎯 Pipeline Control Panel
                    </Heading>
                  </div>

                  <UnifiedPipelineModal
                    isOpen={true}
                    onClose={() => setShowUnifiedPipeline(false)}
                    onSubmit={handleUnifiedPipelineSubmit}
                    container={null}
                  />
                </div>
              )}

            </div>
          </DeviceOverrideProvider>
        </NotificationProvider>
        </ThemeProvider>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary level="page" onError={(error, errorInfo) => console.error('🛡️ GeoAlert Main Error:', error, errorInfo)}>
      <ThemeProvider defaultTheme="system" storageKey="layera-geoalert-theme">
      <NotificationProvider>
        <DeviceOverrideProvider>
          <div style={{
              padding: `${SPACING_SCALE.XL}px`,
              textAlign: 'center',
              backgroundColor: 'var(--layera-bg-primary)',
              color: 'var(--layera-text-primary)',
              minHeight: '100vh'
            }}>
              <Flex justify="space-between" align="center" style={{ marginBottom: `${SPACING_SCALE.MD}px` }}>
                <Heading as="h1" size="2xl" color="primary" className="layera-flex layera-items-center layera-gap-2">
                  <MapIcon size="md" theme="primary" />
                  {t('geoalert.title')}
                </Heading>
                <Flex align="center" justify="center" style={{ gap: `${SPACING_SCALE.SM}px` }}>
                  <ThemeSwitcher variant="icon" size="md" />
                  <LanguageSwitcher />
                </Flex>
              </Flex>

              <Text size="lg" color="secondary" className="layera-mb-8">{t('geoalert.subtitle')}</Text>

              <div style={{ margin: `${SPACING_SCALE.XL}px 0` }}>
                <div style={{
                  backgroundColor: 'var(--layera-bg-success)',
                  color: 'var(--layera-text-on-success)',
                  padding: `${SPACING_SCALE.LG}px`,
                  borderRadius: `${BORDER_RADIUS.SM}px`,
                  marginBottom: `${SPACING_SCALE.XL}px`
                }}>
                  <Heading as="h3" size="lg" color="neutral" className="layera-mb-4 layera-flex layera-items-center layera-gap-2">
                    <MoreIcon size="sm" theme="success" /> {t('geoalert.geoCanvasReady')}
                  </Heading>
                  <Text size="base" color="neutral">{t('geoalert.professionalArchitecture')}</Text>
                </div>

                <Button
                  variant="primary"
                  size="xl"
                  onClick={() => setIsMapMode(true)}
                  icon={<MapIcon size="lg" theme="neutral" />}
                  className="layera-mb-8"
                  style={{ margin: `0 auto ${SPACING_SCALE.XL}px auto`, boxShadow: BOX_SHADOW_SCALE.cardDefault }}
                >
                  {t('geoalert.enterGeoCanvas')}
                </Button>

                <TestNotificationsComponent />

                <div style={{
                  backgroundColor: 'var(--layera-bg-secondary)',
                  border: '1px solid var(--layera-border-primary)',
                  borderRadius: `${BORDER_RADIUS.SM}px`,
                  padding: `${SPACING_SCALE.LG}px`,
                  margin: `${SPACING_SCALE.XL}px 0`,
                  maxWidth: `${SPACING_SCALE.XXXL * 8}px`,
                  marginLeft: 'auto',
                  marginRight: 'auto'
                }}>
                  <Heading as="h3" size="lg" color="primary" className="layera-mb-4 layera-flex layera-items-center layera-gap-2">
                    <CheckIcon size="xs" theme="success" /> {t('geoalert.statusCheck')}
                  </Heading>
                  <div style={{ textAlign: 'left' }}>
                    <Text size="base" className="layera-flex layera-items-center layera-gap-2 layera-mb-2">
                      <CheckIcon size="xs" theme="success" /> {t('geoalert.port')}: 3003
                    </Text>
                    <Text size="base" className="layera-flex layera-items-center layera-gap-2 layera-mb-2">
                      <CheckIcon size="xs" theme="success" /> {t('geoalert.reactReady')}
                    </Text>
                    <Text size="base" className="layera-flex layera-items-center layera-gap-2 layera-mb-2">
                      <CheckIcon size="xs" theme="success" /> {t('geoalert.typescriptStrict')}
                    </Text>
                    <Text size="base" className="layera-flex layera-items-center layera-gap-2 layera-mb-2">
                      <CheckIcon size="xs" theme="success" /> {t('geoalert.independentApp')}
                    </Text>
                    <Text size="base" className="layera-flex layera-items-center layera-gap-2 layera-mb-2">
                      <CheckIcon size="xs" theme="success" /> {t('geoalert.enterpriseArchitecture')}
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
                  href={APP_CONFIG.urls.id}
                  target="_blank"
                  style={{
                    color: 'var(--layera-bg-info)',
                    textDecoration: 'none',
                    padding: `${SPACING_SCALE.SM + SPACING_SCALE.XS}px ${SPACING_SCALE.LG}px`,
                    border: '2px solid var(--layera-bg-info)',
                    borderRadius: `${BORDER_RADIUS.MD}px`,
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
                  {t('geoalert.navigateToLayeraId')}
                </a>
              </div>

              <div style={{ marginTop: `${SPACING_SCALE.XL}px` }}>
                <Text size="sm" color="secondary" className="layera-flex layera-items-center layera-gap-2 layera-mb-2">
                  <LayersIcon size="sm" theme="info" /> {t('geoalert.modularMicroservice')}
                </Text>
                <Text size="sm" color="secondary" className="layera-flex layera-items-center layera-gap-2 layera-mb-2">
                  <ShareIcon size="sm" theme="info" /> {t('geoalert.crossAppNavigation')}
                </Text>
                <Text size="sm" color="secondary" className="layera-flex layera-items-center layera-gap-2 layera-mb-2">
                  <LayersIcon size="sm" theme="info" /> Unified Layout System: @layera/layout
                </Text>
                <Text size="sm" color="secondary" className="layera-flex layera-items-center layera-gap-2">
                  <AlertTriangleIcon size="sm" theme="warning" /> {t('geoalert.readyForImplementation')}
                </Text>
              </div>
          </div>
        </DeviceOverrideProvider>
      </NotificationProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;