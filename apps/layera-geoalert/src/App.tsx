// React imports
import React, { useState } from 'react';

// Enterprise LEGO Design System imports
import { Button } from '@layera/buttons';
import { BaseCard } from '@layera/cards';
import { SPACING_SCALE, BORDER_RADIUS } from '@layera/constants';
import { MapIcon, ShareIcon, LayersIcon, AlertTriangleIcon, CheckIcon, MoreIcon } from '@layera/icons';
import { AppShell, Flex, Box } from '@layera/layout';
import { LoadingSpinner } from '@layera/loading';
import { NotificationProvider, useNotifications } from '@layera/notifications';
import { ThemeProvider, ThemeSwitcher } from '@layera/theme-switcher';
import { useLayeraTranslation, LanguageSwitcher } from '@layera/tolgee';
import { Text, Heading } from '@layera/typography';
import { useViewportWithOverride, DeviceOverrideProvider, useIPhone14ProMaxDetection } from '@layera/viewport';

// Global Styles Import - CRITICAL για uniform card styling
import '@layera/styles';

// Simple Error Boundary component
class SimpleErrorBoundary extends React.Component<
  { children: React.ReactNode; level?: string; onError?: (error: Error, errorInfo: { componentStack: string; errorBoundary?: React.ComponentType<React.SVGProps<SVGSVGElement>> | null; errorBoundaryStack?: string | null }) => void },
  { hasError: boolean }
> {
  constructor(props: Record<string, unknown>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: { componentStack: string; errorBoundary?: React.ComponentType<React.SVGProps<SVGSVGElement>> | null; errorBoundaryStack?: string | null }) {
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong.</div>;
    }
    return this.props.children;
  }
}

// Local application imports
import { APP_CONFIG } from './constants';
import { GeoHeader } from './components/GeoHeader';
import { GeoMap } from './components/GeoMapNew';
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
  metadata?: Record<string, unknown>;
}

function TestNotificationsComponent() {
  const { addNotification } = useNotifications();
  const [isLoading, setIsLoading] = useState(false);

  const testSuccessNotification = (): void => {
    addNotification({
      type: 'success',
      message: 'LEGO Notifications Working! Integration επιτυχής! 🎉'
    });
  };

  const testErrorNotification = (): void => {
    addNotification({
      type: 'error',
      message: 'Test Error Notification - LEGO Systems Functioning! ⚠️'
    });
  };

  const testInfoNotification = (): void => {
    addNotification({
      type: 'info',
      message: 'LEGO Architecture: 13 Packages Successfully Integrated! 📦'
    });
  };

  const testLoadingSpinner = (): void => {
    setIsLoading(true);
    addNotification({
      type: 'info',
      message: 'Testing Loading Spinner... 🔄'
    });

    setTimeout((): void => {
      setIsLoading(false);
      addNotification({
        type: 'success',
        message: 'Loading Test Complete! LEGO Loading System Works! ✅'
      });
    }, 3000);
  };

  return (
    <BaseCard
      variant="secondary"
      padding="lg"
      margin="md"
      borderWidth="md"
      borderColor="success">
      <Heading as="h3" size="lg" color="primary" className="layera-mb-4">
        🧪 LEGO Systems Test Panel
      </Heading>

      <Box
        display="grid"
        gridTemplateColumns={`repeat(auto-fit, minmax(${SPACING_SCALE.CONTAINER_SM}px, 1fr))`}
        gap="md"
        marginBottom="md"
      >
        <Button
          variant="success"
          size="md"
          onClick={testSuccessNotification}
        >
          Test Success 🎉
        </Button>

        <Button
          variant="error"
          size="md"
          onClick={testErrorNotification}
        >
          Test Error ⚠️
        </Button>

        <Button
          variant="info"
          size="md"
          onClick={testInfoNotification}
        >
          Test Info 📦
        </Button>

        <Button
          variant="warning"
          size="md"
          onClick={testLoadingSpinner}
          disabled={isLoading}
        >
          {isLoading ? <LoadingSpinner size="sm" /> : 'Test Loading 🔄'}
        </Button>
      </Box>

      {isLoading && (
        <BaseCard variant="warning" padding="md">
          <Flex align="center" justify="center" gap="sm">
            <LoadingSpinner size="md" />
            <Text size="base" color="neutral">
              Testing @layera/loading spinner integration...
            </Text>
          </Flex>
        </BaseCard>
      )}

      <Box marginTop="md">
        <Text size="sm" color="secondary">
          ✅ @layera/notifications: Παρέχει enterprise-grade notification system<br/>
          ✅ @layera/loading: Provides consistent loading states<br/>
          ✅ Integration Testing: Όλα τα LEGO components λειτουργούν μαζί!
        </Text>
      </Box>
    </BaseCard>
  );
}

function App() {
  const { t } = useLayeraTranslation();
  const { } = useViewportWithOverride(); // Keep hook call for side effects
  const [isMapMode, setIsMapMode] = useState(false);
  const [showCategoryElements, setShowCategoryElements] = useState(false);

  // 🚀 ENTERPRISE: Single Source of Truth - iPhone detection από @layera/viewport
  const finalIsIPhone = useIPhone14ProMaxDetection({
    frameSelector: '.device-frame-wrapper',
    enableWindowFallback: true,
    enableUserAgentFallback: true
  });
  const [, setSavedAreas] = useState<DrawnArea[]>([]);

  // REMOVED: Device frame wrapper - πλέον πάντοτε responsive mode
  // REMOVED: Legacy unified pipeline state - replaced by modular step system

  const handleAreaCreated = (area: DrawnArea) => {
    setSavedAreas(prev => [...prev, area]);
    if (process.env.NODE_ENV === 'development') {
    }
  };

  const handleNewEntryClick = (): void => {
    // Ενεργοποίηση του modular step system (CategoryStep)
    setShowCategoryElements(true);
  };

  // REMOVED: handleResponsiveModeChange - δεν χρειάζεται πλέον

  // REMOVED: Legacy unified pipeline submit handler

  if (isMapMode) {
    return (
      <SimpleErrorBoundary level="page" onError={(error, errorInfo) => console.error('🛡️ GeoAlert Map Error:', error, errorInfo)}>
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
            <AppShell
              layout="fullscreen"
              header={
                <GeoHeader
                  onBackClick={() => setIsMapMode(false)}
                  isIPhone14ProMax={finalIsIPhone}
                  onNewEntryClick={handleNewEntryClick}
                />
              }
              className={`geo-map-shell ${showCategoryElements && finalIsIPhone ? 'hide-header' : ''}`}
            >
              <ViewportFrame id="layera-device-simulator-viewport">
                <GeoMap
                  onAreaCreated={handleAreaCreated}
                  onNewEntryClick={handleNewEntryClick}
                  isIPhone14ProMaxDevice={finalIsIPhone}
                  onCategoryElementsChange={setShowCategoryElements}
                  showCategoryElements={showCategoryElements}
                />
              </ViewportFrame>
            </AppShell>
          </DeviceOverrideProvider>
        </NotificationProvider>
        </ThemeProvider>
      </SimpleErrorBoundary>
    );
  }

  return (
    <>
      <SimpleErrorBoundary level="page" onError={(error, errorInfo) => console.error('🛡️ GeoAlert Main Error:', error, errorInfo)}>
        <ThemeProvider defaultTheme="system" storageKey="layera-geoalert-theme">
        <NotificationProvider>
          <DeviceOverrideProvider>
          <Box
            padding="xl"
            textAlign="center"
            backgroundColor="var(--la-bg-primary)"
            color="var(--la-text-primary)"
            minHeight="100vh">
              <Flex justify="space-between" align="center" marginBottom="md">
                <Heading as="h1" size="2xl" color="primary" className="layera-flex layera-items-center layera-gap-2">
                  <MapIcon size="md" theme="primary" />
                  {t('geoalert.title')}
                </Heading>
                <Flex align="center" justify="center" gap="sm">
                  <ThemeSwitcher variant="icon" size="md" />
                  <LanguageSwitcher />
                </Flex>
              </Flex>

              <Text size="lg" color="secondary" className="layera-mb-8">{t('geoalert.subtitle')}</Text>

              <Box margin="xl 0">
                <Box marginBottom="xl">
                  <BaseCard
                    variant="success"
                    padding="lg"
                    title={t('geoalert.geoCanvasReady')}
                    icon={<MoreIcon size="sm" theme="success" />}
                  >
                    <Text size="base" color="neutral">{t('geoalert.professionalArchitecture')}</Text>
                  </BaseCard>
                </Box>

                <Button
                  variant="primary"
                  size="xl"
                  onClick={(): void => setIsMapMode(true)}
                  icon={<MapIcon size="lg" theme="neutral" />}
                  className="layera-mb-8"
                  margin="auto"
                  marginBottom="xl"
                  style={{ boxShadow: '0 2px 4px var(--la-shadow-sm)' }}
                >
                  {t('geoalert.enterGeoCanvas')}
                </Button>

                <TestNotificationsComponent />

                <BaseCard
                  variant="secondary"
                  padding="lg"
                  marginY="xl"
                  maxWidth={`${SPACING_SCALE.XXXL * 8}px`}
                  marginLeft="auto"
                  marginRight="auto"
                >
                  <Heading as="h3" size="lg" color="primary" className="layera-mb-4 layera-flex layera-items-center layera-gap-2">
                    <CheckIcon size="xs" theme="success" /> {t('geoalert.statusCheck')}
                  </Heading>
                  <Box>
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
                  </Box>
                </BaseCard>

                <Button
                  onClick={(): void => {
                    try {
                      window.open(APP_CONFIG.urls.id, '_blank');
                    } catch (error) {
                      console.error('❌ Αποτυχία ανοίγματος Layera ID:', error);
                      alert('Layera ID δεν είναι διαθέσιμο αυτή τη στιγμή. Παρακαλώ ξεκινήστε την εφαρμογή στο port 3000.');
                    }
                  }}
                  variant="outline"
                  size="md"
                  color="info"
                  padding={`${SPACING_SCALE.SM + SPACING_SCALE.XS}px ${SPACING_SCALE.LG}px`}
                  border={`${SPACING_SCALE.XXS}px solid var(--la-bg-info)`}
                  borderRadius={`${BORDER_RADIUS.MD}px`}
                  fontWeight="bold"
                  transition="all 0.2s"
                >
                  {t('geoalert.navigateToLayeraId')}
                </Button>
              </Box>

              <Box marginTop="xl">
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
              </Box>
          </Box>
          </DeviceOverrideProvider>
        </NotificationProvider>
        </ThemeProvider>
      </SimpleErrorBoundary>
    </>
  );
}

export default App;