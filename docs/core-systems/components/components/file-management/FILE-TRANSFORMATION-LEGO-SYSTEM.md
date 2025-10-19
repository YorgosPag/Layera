# 🔄 @layera/file-transformation LEGO SYSTEM

*Τελευταία ενημέρωση: 18 Οκτωβρίου 2025*
*Δημιουργός: Γιώργος Παγώνης - Επιβλέπων Αρχιτέκτονας*

---

## 🎯 **OVERVIEW**

### **Σκοπός & Αποστολή**
Το `@layera/file-transformation` είναι ένα advanced transformation engine που παρέχει real-time manipulation capabilities για imported files στο map canvas. Βασίζεται σε professional CAD/GIS transformation standards και integrates seamlessly με το Layera ecosystem για enterprise-grade precision.

### **🏗️ Υφιστάμενη Βάση - OLD_geo-canvas Analysis**
Βάσει της ανάλυσης από το OLD_geo-canvas, εντοπίσαμε sophisticated transformation logic:

```typescript
// Από OLD_geo-canvas/components/wizard/StepPositioning.tsx & TransformControls.tsx:
interface TransformationCapabilities {
  // Geometric transformations που ήδη υπάρχουν
  translate: { x: number; y: number };           // Position adjustment
  rotate: { angle: number; origin?: Point };     // Rotation με custom pivot
  scale: { x: number; y: number };               // Non-uniform scaling

  // Advanced features από OLD_geo-canvas
  boundsAdjustment: L.LatLngBounds;              // Geographic bounds manipulation
  layerOpacity: number;                          // Transparency control
  rotationOrigin: 'center' | 'custom';          // Rotation pivot point

  // Integration με map systems
  leafletIntegration: true;                      // Leaflet map compatibility
  realTimePreview: true;                         // Live transformation preview
  undoRedoSupport: true;                         // Command pattern implementation
}

// Enhanced transformation matrix από map integration:
const updatePaneTransform = useCallback(() => {
    if (paneElementRef.current && bounds) {
        const rotation = layer.rotation || 0;
        const center = bounds.getCenter();
        const centerPoint = map.latLngToLayerPoint(center);

        paneElementRef.current.style.transformOrigin = `${centerPoint.x}px ${centerPoint.y}px`;
        paneElementRef.current.style.transform = `rotate(${rotation}deg)`;
    }
}, [layer.rotation, bounds, map]);
```

### **🎨 Professional Transformation Standards**

| **Transformation Type** | **Precision** | **Real-time Preview** | **Undo/Redo** | **Enterprise Features** |
|-------------------------|---------------|----------------------|----------------|------------------------|
| 📐 **Translation** | ±0.000001° | ✅ 60fps | ✅ 50 steps | Grid snapping, Coordinate input |
| 🔄 **Rotation** | ±0.01° | ✅ 60fps | ✅ 50 steps | Custom pivot, Angle snapping |
| 📏 **Scaling** | ±0.001x | ✅ 60fps | ✅ 50 steps | Uniform/Non-uniform, Aspect lock |
| 🎯 **Registration** | Survey-grade | ✅ 60fps | ✅ 50 steps | Ground control points |

---

## 🧩 **LEGO INTEGRATION ARCHITECTURE**

### **📦 Package Dependencies**

```typescript
// Complete LEGO ecosystem integration
import { Button, IconButton, ToggleButton, ButtonGroup } from '@layera/buttons';        // ✅ Transform controls
import { Slider, NumericInput, Toggle, Select } from '@layera/forms';                   // ✅ Parameter inputs
import { Card, CardContent, CardHeader } from '@layera/cards';                          // ✅ UI containers
import { Modal, Dialog, Drawer } from '@layera/modals';                                 // ✅ Settings panels
import { toast, showNotification, ProgressToast } from '@layera/notifications';         // ✅ User feedback
import { LoadingSpinner, ProgressBar } from '@layera/loading';                          // ✅ Processing states
import { useLayeraTranslation } from '@layera/i18n/hooks';                             // ✅ Internationalization
import { CONSTANTS } from '@layera/constants';                                         // ✅ Transform limits
import { ErrorBoundary } from '@layera/error-boundary';                                // ✅ Error handling

// Specialized icons για transformation tools
import {
  MoveIcon, RotateIcon, ScaleIcon, FlipIcon,
  GridIcon, MagnetIcon, UndoIcon, RedoIcon,
  PivotIcon, SnapIcon, MeasureIcon, AlignIcon
} from '@layera/icons';

// Integration με file systems
import { FileValidator, FileMetadata } from '@layera/file-import';                     // ✅ File validation
import { CompressionEngine } from '@layera/file-compression';                          // ✅ Post-transform compression
```

### **🔄 Event-Driven Transformation System**

```typescript
interface TransformationEvents {
  // Real-time transformation updates
  'transform:started': (fileId: string, transformType: TransformationType) => {
    return showNotification(t('transform.started', { type: transformType }), {
      type: 'info',
      duration: 1000,
      position: 'bottom-right'
    });
  };

  'transform:progress': (fileId: string, matrix: TransformMatrix) => {
    // Real-time preview updates - integrates με map rendering
    return updateTransformPreview(fileId, matrix);
  };

  'transform:applied': (fileId: string, finalMatrix: TransformMatrix) => {
    const transformSummary = summarizeTransformation(finalMatrix);
    return toast.success(t('transform.applied', transformSummary), {
      duration: 3000,
      actions: [
        { label: t('transform.undo'), onClick: () => undoTransformation(fileId) },
        { label: t('transform.save'), onClick: () => saveTransformation(fileId) }
      ]
    });
  };

  'transform:reverted': (fileId: string, previousMatrix: TransformMatrix) => {
    return toast.info(t('transform.reverted'), {
      duration: 2000,
      actions: [
        { label: t('transform.redo'), onClick: () => redoTransformation(fileId) }
      ]
    });
  };

  // Integration με @layera/loading για complex transformations
  'transform:heavy:started': (fileId: string, estimatedTime: number) => {
    return ProgressToast.create({
      id: `transform-${fileId}`,
      message: t('transform.processing'),
      estimatedTime,
      showCancel: true,
      onCancel: () => cancelTransformation(fileId)
    });
  };

  // Error handling με recovery options
  'transform:failed': (fileId: string, error: TransformationError) => {
    return toast.error(t('transform.failed', { error: error.message }), {
      duration: 6000,
      actions: [
        { label: t('transform.retry'), onClick: () => retryTransformation(fileId) },
        { label: t('transform.reset'), onClick: () => resetTransformation(fileId) },
        { label: t('transform.report'), onClick: () => reportTransformationIssue(fileId, error) }
      ]
    });
  };
}
```

---

## 🎨 **COMPONENT ARCHITECTURE**

### **🏗️ Core Transformation Components**

#### **1. TransformationEngine - Master Controller**
```typescript
interface TransformationEngineProps {
  // Target file/layer
  fileId: string;
  fileMetadata: FileMetadata;
  initialBounds?: L.LatLngBounds;

  // Transformation capabilities
  enabledTransforms: TransformationType[];       // Which transforms to allow
  precisionMode: 'standard' | 'survey' | 'architectural'; // Precision level
  coordinateSystem?: CoordinateSystem;           // Target coordinate system

  // User interface
  showToolbar?: boolean;                         // Transform toolbar visibility
  showParameterPanel?: boolean;                  // Numeric input panel
  showPreview?: boolean;                         // Real-time preview
  compactMode?: boolean;                        // Space-efficient layout

  // Advanced features
  enableSnapping?: boolean;                      // Grid/object snapping
  enableConstraints?: boolean;                   // Transform constraints
  enableHistory?: boolean;                       // Undo/redo functionality
  enableBatching?: boolean;                      // Batch transform multiple files

  // Enterprise features
  auditTransformations?: boolean;                // Log all transformations
  collaborativeMode?: boolean;                   // Multi-user transformations
  cloudProcessing?: boolean;                     // Offload heavy processing

  // Callbacks
  onTransformStart: (transform: TransformOperation) => void;
  onTransformProgress: (progress: TransformProgress) => void;
  onTransformComplete: (result: TransformationResult) => void;
  onTransformError: (error: TransformationError) => void;
}

const TransformationEngine: React.FC<TransformationEngineProps> = ({
  fileId,
  fileMetadata,
  enabledTransforms,
  precisionMode = 'standard',
  showToolbar = true,
  showParameterPanel = true,
  showPreview = true,
  enableSnapping = true,
  enableHistory = true,
  onTransformComplete,
  ...props
}) => {
  const { t } = useLayeraTranslation();
  const [currentTransform, setCurrentTransform] = useState<TransformMatrix>(IDENTITY_MATRIX);
  const [transformHistory, setTransformHistory] = useState<TransformMatrix[]>([IDENTITY_MATRIX]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [activeTransformMode, setActiveTransformMode] = useState<TransformationType>('translate');
  const [transformState, setTransformState] = useState<TransformState>('idle');

  // Enhanced transformation logic που builds πάνω στο OLD_geo-canvas
  const applyTransformation = useCallback(async (
    transformType: TransformationType,
    parameters: TransformParameters,
    options: TransformOptions = {}
  ) => {
    setTransformState('processing');

    try {
      // Create transformation matrix
      const newMatrix = createTransformMatrix(transformType, parameters, currentTransform);

      // Validate transformation bounds
      if (!validateTransformBounds(newMatrix, fileMetadata)) {
        throw new TransformationError('Transformation exceeds valid bounds');
      }

      // Apply transformation με real-time preview
      if (showPreview) {
        await applyPreviewTransform(fileId, newMatrix);
      }

      // Update transform state
      setCurrentTransform(newMatrix);

      // Add to history αν enabled
      if (enableHistory) {
        const newHistory = transformHistory.slice(0, historyIndex + 1);
        newHistory.push(newMatrix);
        setTransformHistory(newHistory);
        setHistoryIndex(newHistory.length - 1);
      }

      // Notify completion
      onTransformComplete({
        fileId,
        transformMatrix: newMatrix,
        transformType,
        parameters,
        timestamp: new Date().toISOString()
      });

      // Integration με @layera/notifications
      toast.success(t('transform.applied.success', { type: transformType }));

    } catch (error) {
      setTransformState('error');

      // Error notification με recovery options
      toast.error(t('transform.failed', { error: error.message }), {
        actions: [
          { label: t('transform.retry'), onClick: () => applyTransformation(transformType, parameters, options) },
          { label: t('transform.reset'), onClick: () => resetTransformation() }
        ]
      });

      throw error;
    } finally {
      setTransformState('idle');
    }
  }, [currentTransform, fileId, fileMetadata, showPreview, enableHistory, transformHistory, historyIndex, onTransformComplete, t]);

  // Undo/Redo functionality
  const undoTransformation = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      const previousMatrix = transformHistory[newIndex];

      setCurrentTransform(previousMatrix);
      setHistoryIndex(newIndex);

      if (showPreview) {
        applyPreviewTransform(fileId, previousMatrix);
      }

      toast.info(t('transform.undone'));
    }
  }, [historyIndex, transformHistory, fileId, showPreview, t]);

  const redoTransformation = useCallback(() => {
    if (historyIndex < transformHistory.length - 1) {
      const newIndex = historyIndex + 1;
      const nextMatrix = transformHistory[newIndex];

      setCurrentTransform(nextMatrix);
      setHistoryIndex(newIndex);

      if (showPreview) {
        applyPreviewTransform(fileId, nextMatrix);
      }

      toast.info(t('transform.redone'));
    }
  }, [historyIndex, transformHistory, fileId, showPreview, t]);

  return (
    <ErrorBoundary fallback={<TransformationErrorFallback />}>
      <Card className="transformation-engine">
        <CardHeader>
          <Heading level={3}>{t('transform.engine.title')}</Heading>
          <Text variant="caption">{t('transform.file', { fileName: fileMetadata.name })}</Text>
        </CardHeader>

        <CardContent>
          {/* Transformation toolbar */}
          {showToolbar && (
            <TransformationToolbar
              activeMode={activeTransformMode}
              enabledTransforms={enabledTransforms}
              onModeChange={setActiveTransformMode}
              onUndo={undoTransformation}
              onRedo={redoTransformation}
              canUndo={historyIndex > 0}
              canRedo={historyIndex < transformHistory.length - 1}
              enableSnapping={enableSnapping}
              precisionMode={precisionMode}
            />
          )}

          {/* Parameter input panel */}
          {showParameterPanel && (
            <TransformParameterPanel
              transformType={activeTransformMode}
              currentMatrix={currentTransform}
              precisionMode={precisionMode}
              onParameterChange={(params) => applyTransformation(activeTransformMode, params)}
              fileMetadata={fileMetadata}
            />
          )}

          {/* Transform preview */}
          {showPreview && (
            <TransformationPreview
              fileId={fileId}
              currentMatrix={currentTransform}
              originalBounds={fileMetadata.bounds}
              showGrid={enableSnapping}
            />
          )}

          {/* Processing state indicator */}
          {transformState === 'processing' && (
            <LoadingSpinner size="small" label={t('transform.processing')} />
          )}
        </CardContent>
      </Card>
    </ErrorBoundary>
  );
};
```

#### **2. TransformationToolbar - Interactive Controls**
```typescript
interface TransformationToolbarProps {
  activeMode: TransformationType;
  enabledTransforms: TransformationType[];
  onModeChange: (mode: TransformationType) => void;

  // History controls
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;

  // Tool settings
  enableSnapping: boolean;
  onSnapToggle?: (enabled: boolean) => void;
  precisionMode: PrecisionMode;
  onPrecisionChange?: (mode: PrecisionMode) => void;

  // Layout options
  orientation?: 'horizontal' | 'vertical';
  size?: 'small' | 'medium' | 'large';
  showLabels?: boolean;
}

const TransformationToolbar: React.FC<TransformationToolbarProps> = ({
  activeMode,
  enabledTransforms,
  onModeChange,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  enableSnapping,
  onSnapToggle,
  precisionMode,
  showLabels = true,
  ...props
}) => {
  const { t } = useLayeraTranslation();

  const transformTools = [
    {
      type: 'translate' as TransformationType,
      icon: <MoveIcon />,
      label: t('transform.translate'),
      shortcut: 'G'
    },
    {
      type: 'rotate' as TransformationType,
      icon: <RotateIcon />,
      label: t('transform.rotate'),
      shortcut: 'R'
    },
    {
      type: 'scale' as TransformationType,
      icon: <ScaleIcon />,
      label: t('transform.scale'),
      shortcut: 'S'
    },
    {
      type: 'flip' as TransformationType,
      icon: <FlipIcon />,
      label: t('transform.flip'),
      shortcut: 'F'
    }
  ];

  // Keyboard shortcuts integration
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey) {
        switch (event.key.toLowerCase()) {
          case 'z':
            event.preventDefault();
            if (event.shiftKey) {
              onRedo();
            } else {
              onUndo();
            }
            break;
          case 'y':
            event.preventDefault();
            onRedo();
            break;
        }
      } else {
        const tool = transformTools.find(t => t.shortcut.toLowerCase() === event.key.toLowerCase());
        if (tool && enabledTransforms.includes(tool.type)) {
          onModeChange(tool.type);
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [onUndo, onRedo, onModeChange, enabledTransforms]);

  return (
    <Card variant="toolbar">
      <CardContent>
        {/* Primary transformation tools */}
        <ButtonGroup variant="toolbar">
          {transformTools
            .filter(tool => enabledTransforms.includes(tool.type))
            .map(tool => (
              <ToggleButton
                key={tool.type}
                pressed={activeMode === tool.type}
                onClick={() => onModeChange(tool.type)}
                icon={tool.icon}
                title={`${tool.label} (${tool.shortcut})`}
                size="medium"
              >
                {showLabels && tool.label}
              </ToggleButton>
            ))}
        </ButtonGroup>

        {/* History controls */}
        <ButtonGroup variant="toolbar">
          <IconButton
            onClick={onUndo}
            disabled={!canUndo}
            icon={<UndoIcon />}
            title={t('transform.undo') + ' (Ctrl+Z)'}
            size="medium"
          />
          <IconButton
            onClick={onRedo}
            disabled={!canRedo}
            icon={<RedoIcon />}
            title={t('transform.redo') + ' (Ctrl+Y)'}
            size="medium"
          />
        </ButtonGroup>

        {/* Tool settings */}
        <ButtonGroup variant="toolbar">
          <ToggleButton
            pressed={enableSnapping}
            onClick={() => onSnapToggle?.(!enableSnapping)}
            icon={<SnapIcon />}
            title={t('transform.snap.toggle')}
            size="medium"
          >
            {showLabels && t('transform.snap')}
          </ToggleButton>

          <Button
            variant="secondary"
            icon={<MeasureIcon />}
            onClick={() => showPrecisionSettings()}
            title={t('transform.precision.settings')}
            size="medium"
          >
            {showLabels && precisionMode}
          </Button>
        </ButtonGroup>

        {/* Advanced tools */}
        <ButtonGroup variant="toolbar">
          <IconButton
            onClick={() => showAlignmentTools()}
            icon={<AlignIcon />}
            title={t('transform.alignment.tools')}
            size="medium"
          />
          <IconButton
            onClick={() => showGridSettings()}
            icon={<GridIcon />}
            title={t('transform.grid.settings')}
            size="medium"
          />
        </ButtonGroup>
      </CardContent>
    </Card>
  );
};
```

#### **3. TransformParameterPanel - Precision Input**
```typescript
interface TransformParameterPanelProps {
  transformType: TransformationType;
  currentMatrix: TransformMatrix;
  precisionMode: PrecisionMode;
  onParameterChange: (parameters: TransformParameters) => void;
  fileMetadata: FileMetadata;

  // Display options
  showCoordinateInputs?: boolean;
  showAngleInputs?: boolean;
  showScaleInputs?: boolean;
  enableConstraints?: boolean;

  // Layout
  compactLayout?: boolean;
  groupByType?: boolean;
}

const TransformParameterPanel: React.FC<TransformParameterPanelProps> = ({
  transformType,
  currentMatrix,
  precisionMode,
  onParameterChange,
  fileMetadata,
  showCoordinateInputs = true,
  showAngleInputs = true,
  showScaleInputs = true,
  enableConstraints = true,
  compactLayout = false,
  ...props
}) => {
  const { t } = useLayeraTranslation();
  const [parameters, setParameters] = useState<TransformParameters>(
    extractParametersFromMatrix(currentMatrix, transformType)
  );

  // Precision settings based on mode
  const precisionConfig = useMemo(() => {
    switch (precisionMode) {
      case 'survey':
        return {
          coordinate: 8,      // 8 decimal places για survey accuracy
          angle: 0.001,       // 0.001° precision
          scale: 0.0001       // 0.01% precision
        };
      case 'architectural':
        return {
          coordinate: 6,      // 6 decimal places για architectural drawings
          angle: 0.01,        // 0.01° precision
          scale: 0.001        // 0.1% precision
        };
      default: // standard
        return {
          coordinate: 4,      // 4 decimal places για general use
          angle: 0.1,         // 0.1° precision
          scale: 0.01         // 1% precision
        };
    }
  }, [precisionMode]);

  // Handle parameter changes με validation
  const handleParameterChange = useCallback((
    paramType: keyof TransformParameters,
    value: number | { x: number; y: number }
  ) => {
    const newParameters = { ...parameters, [paramType]: value };

    // Validate constraints
    if (enableConstraints) {
      const validation = validateTransformConstraints(newParameters, fileMetadata, precisionMode);
      if (!validation.isValid) {
        toast.warning(t('transform.constraint.violation', { constraint: validation.violatedConstraint }));
        return;
      }
    }

    setParameters(newParameters);
    onParameterChange(newParameters);
  }, [parameters, enableConstraints, fileMetadata, precisionMode, onParameterChange, t]);

  return (
    <Card variant="parameter-panel">
      <CardHeader>
        <Heading level={4}>{t('transform.parameters.title')}</Heading>
        <Text variant="caption">{t('transform.mode', { mode: transformType })}</Text>
      </CardHeader>

      <CardContent>
        {/* Translation parameters */}
        {(transformType === 'translate' || !transformType) && showCoordinateInputs && (
          <div className="parameter-group">
            <Label>{t('transform.translation')}</Label>
            <div className="coordinate-inputs">
              <NumericInput
                label={t('transform.x.offset')}
                value={parameters.translate?.x || 0}
                precision={precisionConfig.coordinate}
                unit="°"
                onChange={(value) => handleParameterChange('translate', {
                  x: value,
                  y: parameters.translate?.y || 0
                })}
                size={compactLayout ? 'small' : 'medium'}
              />
              <NumericInput
                label={t('transform.y.offset')}
                value={parameters.translate?.y || 0}
                precision={precisionConfig.coordinate}
                unit="°"
                onChange={(value) => handleParameterChange('translate', {
                  x: parameters.translate?.x || 0,
                  y: value
                })}
                size={compactLayout ? 'small' : 'medium'}
              />
            </div>
          </div>
        )}

        {/* Rotation parameters */}
        {(transformType === 'rotate' || !transformType) && showAngleInputs && (
          <div className="parameter-group">
            <Label>{t('transform.rotation')}</Label>
            <NumericInput
              label={t('transform.angle')}
              value={parameters.rotate?.angle || 0}
              min={-360}
              max={360}
              step={precisionConfig.angle}
              unit="°"
              onChange={(value) => handleParameterChange('rotate', {
                angle: value,
                origin: parameters.rotate?.origin || { x: 0, y: 0 }
              })}
              size={compactLayout ? 'small' : 'medium'}
            />

            {/* Rotation origin controls */}
            <div className="rotation-origin">
              <Label>{t('transform.rotation.origin')}</Label>
              <Select
                value={parameters.rotate?.originType || 'center'}
                options={[
                  { value: 'center', label: t('transform.origin.center') },
                  { value: 'custom', label: t('transform.origin.custom') },
                  { value: 'corner', label: t('transform.origin.corner') }
                ]}
                onChange={(value) => setRotationOriginType(value)}
                size={compactLayout ? 'small' : 'medium'}
              />
            </div>
          </div>
        )}

        {/* Scale parameters */}
        {(transformType === 'scale' || !transformType) && showScaleInputs && (
          <div className="parameter-group">
            <Label>{t('transform.scale')}</Label>
            <div className="scale-inputs">
              <NumericInput
                label={t('transform.scale.x')}
                value={parameters.scale?.x || 1}
                min={0.001}
                max={1000}
                step={precisionConfig.scale}
                unit="x"
                onChange={(value) => handleParameterChange('scale', {
                  x: value,
                  y: parameters.scale?.uniformScale ? value : (parameters.scale?.y || 1)
                })}
                size={compactLayout ? 'small' : 'medium'}
              />

              <Toggle
                label={t('transform.scale.uniform')}
                checked={parameters.scale?.uniformScale || false}
                onChange={(checked) => handleUniformScaleToggle(checked)}
                size={compactLayout ? 'small' : 'medium'}
              />

              {!parameters.scale?.uniformScale && (
                <NumericInput
                  label={t('transform.scale.y')}
                  value={parameters.scale?.y || 1}
                  min={0.001}
                  max={1000}
                  step={precisionConfig.scale}
                  unit="x"
                  onChange={(value) => handleParameterChange('scale', {
                    x: parameters.scale?.x || 1,
                    y: value
                  })}
                  size={compactLayout ? 'small' : 'medium'}
                />
              )}
            </div>
          </div>
        )}

        {/* Constraint indicators */}
        {enableConstraints && (
          <div className="constraint-indicators">
            <Text variant="caption">{t('transform.constraints.active')}</Text>
            <ConstraintIndicators
              constraints={getActiveConstraints(fileMetadata, precisionMode)}
              currentParameters={parameters}
            />
          </div>
        )}

        {/* Quick presets */}
        <div className="transform-presets">
          <Label>{t('transform.presets')}</Label>
          <ButtonGroup variant="compact">
            <Button
              variant="secondary"
              size="small"
              onClick={() => resetToIdentity()}
            >
              {t('transform.reset')}
            </Button>
            <Button
              variant="secondary"
              size="small"
              onClick={() => applyPreset('center')}
            >
              {t('transform.center')}
            </Button>
            <Button
              variant="secondary"
              size="small"
              onClick={() => applyPreset('fit')}
            >
              {t('transform.fit.bounds')}
            </Button>
          </ButtonGroup>
        </div>
      </CardContent>
    </Card>
  );
};
```

#### **4. InteractiveTransformControls - Visual Manipulation**
```typescript
interface InteractiveTransformControlsProps {
  fileId: string;
  bounds: L.LatLngBounds;
  currentMatrix: TransformMatrix;
  transformMode: TransformationType;

  // Visual settings
  showBoundingBox?: boolean;
  showRotationHandle?: boolean;
  showScaleHandles?: boolean;
  showCenterPoint?: boolean;

  // Interaction settings
  enableDrag?: boolean;
  enableSnapping?: boolean;
  snapToGrid?: boolean;
  snapToObjects?: boolean;

  // Style customization
  handleSize?: number;
  handleColor?: string;
  boundingBoxColor?: string;
  rotationHandleRadius?: number;

  // Callbacks
  onTransformStart: (type: TransformationType) => void;
  onTransformProgress: (matrix: TransformMatrix) => void;
  onTransformEnd: (matrix: TransformMatrix) => void;
}

const InteractiveTransformControls: React.FC<InteractiveTransformControlsProps> = ({
  fileId,
  bounds,
  currentMatrix,
  transformMode,
  showBoundingBox = true,
  showRotationHandle = true,
  showScaleHandles = true,
  enableDrag = true,
  enableSnapping = true,
  snapToGrid = true,
  onTransformStart,
  onTransformProgress,
  onTransformEnd,
  ...props
}) => {
  const mapRef = useRef<L.Map | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<L.LatLng | null>(null);
  const [transformOrigin, setTransformOrigin] = useState<L.LatLng>(bounds.getCenter());

  // Enhanced από OLD_geo-canvas interactive controls
  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current;

    // Mouse event handlers για interactive transformation
    const handleMouseDown = (e: L.LeafletMouseEvent) => {
      if (!enableDrag) return;

      setIsDragging(true);
      setDragStart(e.latlng);
      onTransformStart(transformMode);

      // Prevent map panning during transformation
      map.dragging.disable();
    };

    const handleMouseMove = (e: L.LeafletMouseEvent) => {
      if (!isDragging || !dragStart) return;

      // Calculate transformation based on mouse movement
      const deltaX = e.latlng.lng - dragStart.lng;
      const deltaY = e.latlng.lat - dragStart.lat;

      let newMatrix: TransformMatrix;

      switch (transformMode) {
        case 'translate':
          newMatrix = applyTranslation(currentMatrix, deltaX, deltaY);
          break;
        case 'rotate':
          const angle = calculateRotationAngle(transformOrigin, dragStart, e.latlng);
          newMatrix = applyRotation(currentMatrix, angle, transformOrigin);
          break;
        case 'scale':
          const scaleFactors = calculateScaleFactors(bounds, dragStart, e.latlng);
          newMatrix = applyScale(currentMatrix, scaleFactors.x, scaleFactors.y, transformOrigin);
          break;
        default:
          return;
      }

      // Apply snapping αν enabled
      if (enableSnapping) {
        newMatrix = applySnapping(newMatrix, {
          snapToGrid,
          snapToObjects,
          gridSize: CONSTANTS.TRANSFORM.GRID_SIZE
        });
      }

      onTransformProgress(newMatrix);
    };

    const handleMouseUp = (e: L.LeafletMouseEvent) => {
      if (!isDragging) return;

      setIsDragging(false);
      setDragStart(null);

      // Re-enable map panning
      map.dragging.enable();

      // Finalize transformation
      onTransformEnd(currentMatrix);
    };

    // Attach event listeners
    map.on('mousedown', handleMouseDown);
    map.on('mousemove', handleMouseMove);
    map.on('mouseup', handleMouseUp);

    // Cleanup
    return () => {
      map.off('mousedown', handleMouseDown);
      map.off('mousemove', handleMouseMove);
      map.off('mouseup', handleMouseUp);
    };
  }, [
    mapRef.current, transformMode, currentMatrix, isDragging, dragStart,
    enableDrag, enableSnapping, snapToGrid, transformOrigin,
    onTransformStart, onTransformProgress, onTransformEnd
  ]);

  return (
    <div className="interactive-transform-controls">
      {/* Bounding box visualization */}
      {showBoundingBox && (
        <BoundingBoxControl
          bounds={bounds}
          matrix={currentMatrix}
          color={props.boundingBoxColor}
          onCornerDrag={handleCornerDrag}
          onEdgeDrag={handleEdgeDrag}
        />
      )}

      {/* Rotation handle */}
      {showRotationHandle && transformMode === 'rotate' && (
        <RotationHandleControl
          center={transformOrigin}
          radius={props.rotationHandleRadius}
          currentAngle={extractRotationAngle(currentMatrix)}
          onRotate={handleRotationChange}
        />
      )}

      {/* Scale handles */}
      {showScaleHandles && transformMode === 'scale' && (
        <ScaleHandlesControl
          bounds={bounds}
          matrix={currentMatrix}
          onScaleChange={handleScaleChange}
          showCornerHandles={true}
          showEdgeHandles={true}
        />
      )}

      {/* Center point indicator */}
      {showCenterPoint && (
        <CenterPointControl
          center={transformOrigin}
          onCenterChange={setTransformOrigin}
          draggable={transformMode === 'rotate' || transformMode === 'scale'}
        />
      )}

      {/* Snap grid visualization */}
      {enableSnapping && snapToGrid && (
        <SnapGridOverlay
          bounds={bounds}
          gridSize={CONSTANTS.TRANSFORM.GRID_SIZE}
          visible={isDragging}
        />
      )}
    </div>
  );
};
```

---

## ⚡ **ADVANCED TRANSFORMATION ALGORITHMS**

### **🎯 Matrix-Based Transformation System**

```typescript
interface TransformMatrix {
  // 2D Affine transformation matrix: [a, b, c, d, tx, ty]
  a: number;    // Scale X and rotation
  b: number;    // Skew Y and rotation
  c: number;    // Skew X and rotation
  d: number;    // Scale Y and rotation
  tx: number;   // Translation X
  ty: number;   // Translation Y
}

interface TransformationMath {
  // Identity matrix
  IDENTITY: TransformMatrix = { a: 1, b: 0, c: 0, d: 1, tx: 0, ty: 0 };

  // Matrix operations
  multiply: (m1: TransformMatrix, m2: TransformMatrix) => TransformMatrix;
  invert: (matrix: TransformMatrix) => TransformMatrix;
  decompose: (matrix: TransformMatrix) => TransformComponents;
  compose: (components: TransformComponents) => TransformMatrix;

  // Transformation creators
  createTranslation: (x: number, y: number) => TransformMatrix;
  createRotation: (angle: number, origin?: Point) => TransformMatrix;
  createScale: (sx: number, sy: number, origin?: Point) => TransformMatrix;
  createSkew: (skewX: number, skewY: number) => TransformMatrix;
}

// Enhanced transformation math που extends OLD_geo-canvas capabilities
class TransformationMathEngine implements TransformationMath {
  multiply(m1: TransformMatrix, m2: TransformMatrix): TransformMatrix {
    return {
      a: m1.a * m2.a + m1.b * m2.c,
      b: m1.a * m2.b + m1.b * m2.d,
      c: m1.c * m2.a + m1.d * m2.c,
      d: m1.c * m2.b + m1.d * m2.d,
      tx: m1.tx * m2.a + m1.ty * m2.c + m2.tx,
      ty: m1.tx * m2.b + m1.ty * m2.d + m2.ty
    };
  }

  invert(matrix: TransformMatrix): TransformMatrix {
    const { a, b, c, d, tx, ty } = matrix;
    const determinant = a * d - b * c;

    if (Math.abs(determinant) < 1e-10) {
      throw new Error('Matrix is not invertible (determinant near zero)');
    }

    const invDet = 1 / determinant;

    return {
      a: d * invDet,
      b: -b * invDet,
      c: -c * invDet,
      d: a * invDet,
      tx: (c * ty - d * tx) * invDet,
      ty: (b * tx - a * ty) * invDet
    };
  }

  decompose(matrix: TransformMatrix): TransformComponents {
    const { a, b, c, d, tx, ty } = matrix;

    // Extract translation
    const translation = { x: tx, y: ty };

    // Extract scale
    const scaleX = Math.sqrt(a * a + b * b);
    const scaleY = Math.sqrt(c * c + d * d);

    // Extract rotation (in radians)
    const rotation = Math.atan2(b, a);

    // Extract skew
    const skewX = Math.atan2(a * c + b * d, scaleX * scaleX);
    const skewY = 0; // Assuming no Y skew για simplicity

    return {
      translation,
      rotation,
      scale: { x: scaleX, y: scaleY },
      skew: { x: skewX, y: skewY }
    };
  }

  createRotation(angle: number, origin: Point = { x: 0, y: 0 }): TransformMatrix {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const { x, y } = origin;

    return {
      a: cos,
      b: sin,
      c: -sin,
      d: cos,
      tx: x - x * cos + y * sin,
      ty: y - x * sin - y * cos
    };
  }

  createScale(sx: number, sy: number, origin: Point = { x: 0, y: 0 }): TransformMatrix {
    const { x, y } = origin;

    return {
      a: sx,
      b: 0,
      c: 0,
      d: sy,
      tx: x * (1 - sx),
      ty: y * (1 - sy)
    };
  }

  // Geographic coordinate transformation (enhanced από OLD_geo-canvas)
  transformGeographicBounds(bounds: L.LatLngBounds, matrix: TransformMatrix): L.LatLngBounds {
    const corners = [
      bounds.getSouthWest(),
      bounds.getSouthEast(),
      bounds.getNorthEast(),
      bounds.getNorthWest()
    ];

    const transformedCorners = corners.map(corner =>
      this.transformPoint({ x: corner.lng, y: corner.lat }, matrix)
    );

    const lats = transformedCorners.map(p => p.y);
    const lngs = transformedCorners.map(p => p.x);

    return L.latLngBounds(
      L.latLng(Math.min(...lats), Math.min(...lngs)),
      L.latLng(Math.max(...lats), Math.max(...lngs))
    );
  }

  transformPoint(point: Point, matrix: TransformMatrix): Point {
    const { a, b, c, d, tx, ty } = matrix;
    return {
      x: a * point.x + c * point.y + tx,
      y: b * point.x + d * point.y + ty
    };
  }
}
```

### **🧲 Advanced Snapping System**

```typescript
interface SnappingConfig {
  // Grid snapping
  gridSnapping: {
    enabled: boolean;
    gridSize: number;                              // Grid spacing σε degrees ή meters
    snapDistance: number;                          // Max distance για snap
    showGrid: boolean;                             // Visual grid display
    adaptiveGrid: boolean;                         // Grid size adapts to zoom level
  };

  // Object snapping
  objectSnapping: {
    enabled: boolean;
    snapToVertices: boolean;                       // Snap to object vertices
    snapToEdges: boolean;                          // Snap to object edges
    snapToCenters: boolean;                        // Snap to object centers
    snapDistance: number;                          // Max snap distance
    highlightSnapTargets: boolean;                 // Visual feedback για snap targets
  };

  // Guide snapping
  guideSnapping: {
    enabled: boolean;
    snapToGuides: boolean;                         // Snap to user-defined guides
    snapToRulers: boolean;                         // Snap to ruler marks
    createGuides: boolean;                         // Auto-create guides during transform
  };

  // Angular snapping
  angularSnapping: {
    enabled: boolean;
    snapAngles: number[];                          // Common angles (0°, 15°, 30°, 45°, 90°)
    snapTolerance: number;                         // Angular tolerance για snapping
  };
}

class AdvancedSnappingEngine {
  constructor(private config: SnappingConfig) {
    this.snapTargets = new Map();
    this.activeGuides = [];
  }

  snapTransformation(matrix: TransformMatrix, context: SnapContext): TransformMatrix {
    if (!this.hasEnabledSnapping()) return matrix;

    let snappedMatrix = matrix;

    // Grid snapping
    if (this.config.gridSnapping.enabled) {
      snappedMatrix = this.applyGridSnapping(snappedMatrix, context);
    }

    // Object snapping
    if (this.config.objectSnapping.enabled) {
      snappedMatrix = this.applyObjectSnapping(snappedMatrix, context);
    }

    // Guide snapping
    if (this.config.guideSnapping.enabled) {
      snappedMatrix = this.applyGuideSnapping(snappedMatrix, context);
    }

    // Angular snapping για rotation
    if (this.config.angularSnapping.enabled && context.transformType === 'rotate') {
      snappedMatrix = this.applyAngularSnapping(snappedMatrix, context);
    }

    return snappedMatrix;
  }

  private applyGridSnapping(matrix: TransformMatrix, context: SnapContext): TransformMatrix {
    const { gridSize, snapDistance } = this.config.gridSnapping;

    // Extract translation από matrix
    const translation = { x: matrix.tx, y: matrix.ty };

    // Calculate nearest grid points
    const snappedX = Math.round(translation.x / gridSize) * gridSize;
    const snappedY = Math.round(translation.y / gridSize) * gridSize;

    // Check αν within snap distance
    const distX = Math.abs(translation.x - snappedX);
    const distY = Math.abs(translation.y - snappedY);

    if (distX <= snapDistance && distY <= snapDistance) {
      return {
        ...matrix,
        tx: snappedX,
        ty: snappedY
      };
    }

    return matrix;
  }

  private applyObjectSnapping(matrix: TransformMatrix, context: SnapContext): TransformMatrix {
    const { snapDistance } = this.config.objectSnapping;
    const objectsToTest = this.getNearbyObjects(context.transformBounds);

    let bestSnap: SnapResult | null = null;
    let minDistance = snapDistance;

    for (const object of objectsToTest) {
      // Test vertex snapping
      if (this.config.objectSnapping.snapToVertices) {
        const vertexSnap = this.findNearestVertex(matrix, object, minDistance);
        if (vertexSnap && vertexSnap.distance < minDistance) {
          bestSnap = vertexSnap;
          minDistance = vertexSnap.distance;
        }
      }

      // Test edge snapping
      if (this.config.objectSnapping.snapToEdges) {
        const edgeSnap = this.findNearestEdge(matrix, object, minDistance);
        if (edgeSnap && edgeSnap.distance < minDistance) {
          bestSnap = edgeSnap;
          minDistance = edgeSnap.distance;
        }
      }

      // Test center snapping
      if (this.config.objectSnapping.snapToCenters) {
        const centerSnap = this.findNearestCenter(matrix, object, minDistance);
        if (centerSnap && centerSnap.distance < minDistance) {
          bestSnap = centerSnap;
          minDistance = centerSnap.distance;
        }
      }
    }

    if (bestSnap) {
      return this.applySnapResult(matrix, bestSnap);
    }

    return matrix;
  }

  private applyAngularSnapping(matrix: TransformMatrix, context: SnapContext): TransformMatrix {
    const { snapAngles, snapTolerance } = this.config.angularSnapping;

    // Extract current rotation angle
    const currentAngle = Math.atan2(matrix.b, matrix.a) * 180 / Math.PI;

    // Find nearest snap angle
    let bestSnapAngle = currentAngle;
    let minDifference = snapTolerance;

    for (const snapAngle of snapAngles) {
      const difference = Math.abs(((currentAngle - snapAngle + 180) % 360) - 180);
      if (difference < minDifference) {
        bestSnapAngle = snapAngle;
        minDifference = difference;
      }
    }

    // Apply angle snapping αν within tolerance
    if (minDifference < snapTolerance) {
      const snappedAngleRad = bestSnapAngle * Math.PI / 180;
      const cos = Math.cos(snappedAngleRad);
      const sin = Math.sin(snappedAngleRad);

      // Reconstruct matrix με snapped angle
      const scale = Math.sqrt(matrix.a * matrix.a + matrix.b * matrix.b);
      return {
        ...matrix,
        a: cos * scale,
        b: sin * scale,
        c: -sin * scale,
        d: cos * scale
      };
    }

    return matrix;
  }
}
```

---

## 📊 **PERFORMANCE OPTIMIZATION & MONITORING**

### **🚀 Real-time Performance Engine**

```typescript
interface TransformationPerformanceConfig {
  // Performance targets
  targetFrameRate: number;                         // 60fps για smooth transformations
  maxProcessingTime: number;                       // Max time per transformation (ms)
  memoryBudget: number;                           // Max memory usage (MB)

  // Optimization strategies
  useWebWorkers: boolean;                         // Background processing
  useWebGL: boolean;                              // GPU acceleration
  useLevelOfDetail: boolean;                      // LOD για complex files
  cacheTransformations: boolean;                  // Cache computed transforms

  // Quality vs performance trade-offs
  adaptiveQuality: boolean;                       // Reduce quality for performance
  progressiveRendering: boolean;                  // Show intermediate results
  skipFramesDuringDrag: boolean;                  // Reduce updates during interaction
}

class TransformationPerformanceEngine {
  constructor(private config: TransformationPerformanceConfig) {
    this.performanceMonitor = new PerformanceMonitor();
    this.gpuAccelerator = new WebGLTransformAccelerator();
    this.transformCache = new LRUCache(1000);
  }

  async optimizeTransformation(
    fileId: string,
    matrix: TransformMatrix,
    options: TransformOptions
  ): Promise<OptimizedTransformResult> {
    const startTime = performance.now();

    // Monitor current system performance
    const systemMetrics = await this.performanceMonitor.getCurrentMetrics();

    // Select optimal strategy based on performance constraints
    const strategy = this.selectOptimalStrategy(systemMetrics, options);

    let result: TransformResult;

    switch (strategy) {
      case 'gpu-accelerated':
        result = await this.applyGPUTransformation(fileId, matrix);
        break;
      case 'web-worker':
        result = await this.applyWorkerTransformation(fileId, matrix);
        break;
      case 'main-thread':
        result = await this.applyMainThreadTransformation(fileId, matrix);
        break;
      case 'cached':
        result = this.getCachedTransformation(fileId, matrix);
        break;
    }

    const processingTime = performance.now() - startTime;

    // Performance analytics
    this.recordPerformanceMetrics({
      fileId,
      strategy,
      processingTime,
      memoryUsed: this.calculateMemoryUsage(),
      frameRate: this.calculateFrameRate(),
      quality: result.qualityScore
    });

    // Adaptive optimization για future transformations
    if (processingTime > this.config.maxProcessingTime) {
      this.adjustPerformanceStrategy(fileId, 'reduce-quality');
    }

    return {
      ...result,
      strategy,
      performanceMetrics: {
        processingTime,
        memoryUsed: this.calculateMemoryUsage(),
        frameRate: this.calculateFrameRate()
      }
    };
  }

  private async applyGPUTransformation(fileId: string, matrix: TransformMatrix): Promise<TransformResult> {
    // WebGL-based transformation για large/complex files
    if (!this.gpuAccelerator.isSupported()) {
      return this.applyMainThreadTransformation(fileId, matrix);
    }

    try {
      // Upload transformation matrix to GPU
      await this.gpuAccelerator.uploadMatrix(matrix);

      // Apply transformation using shaders
      const result = await this.gpuAccelerator.transform(fileId);

      return {
        transformedData: result.data,
        qualityScore: result.quality,
        processingMethod: 'gpu'
      };
    } catch (error) {
      console.warn('GPU transformation failed, falling back to CPU:', error);
      return this.applyMainThreadTransformation(fileId, matrix);
    }
  }

  private async applyWorkerTransformation(fileId: string, matrix: TransformMatrix): Promise<TransformResult> {
    // Web Worker-based transformation για CPU-intensive operations
    return new Promise((resolve, reject) => {
      const worker = new Worker('/workers/transformation-worker.js');

      worker.postMessage({
        type: 'TRANSFORM',
        fileId,
        matrix,
        options: this.config
      });

      worker.onmessage = (event) => {
        const { type, result, error } = event.data;

        if (type === 'TRANSFORM_COMPLETE') {
          resolve(result);
        } else if (type === 'TRANSFORM_ERROR') {
          reject(new Error(error));
        }

        worker.terminate();
      };

      // Timeout fallback
      setTimeout(() => {
        worker.terminate();
        reject(new Error('Worker transformation timeout'));
      }, this.config.maxProcessingTime);
    });
  }
}
```

### **📈 Real-time Performance Monitoring**

```typescript
interface TransformationMetrics {
  // Processing performance
  transformationSpeed: number;                    // Transforms per second
  averageProcessingTime: number;                  // Average ms per transform
  frameDuration: number;                          // Time per frame (ms)
  frameDrops: number;                             // Dropped frames count

  // Resource utilization
  memoryUsage: number;                            // Current memory usage (MB)
  cpuUtilization: number;                         // CPU usage percentage
  gpuUtilization?: number;                        // GPU usage (if available)

  // Quality metrics
  visualAccuracy: number;                         // Transformation accuracy (0-1)
  renderingQuality: number;                       // Rendering quality score (0-100)
  userExperienceScore: number;                    // UX responsiveness score (0-100)

  // User interaction
  inputLatency: number;                           // Input to visual feedback time (ms)
  gestureRecognition: number;                     // Gesture recognition accuracy (0-1)
  transformationSmoothness: number;               // Animation smoothness (0-1)
}

class TransformationMetricsCollector {
  constructor() {
    this.metrics = this.initializeMetrics();
    this.samplingInterval = 16; // 60fps monitoring
    this.metricHistory = new CircularBuffer(1000);
  }

  startMonitoring(transformationId: string): void {
    this.transformationId = transformationId;
    this.monitoringActive = true;

    // Start performance sampling
    this.performanceInterval = setInterval(() => {
      this.collectSample();
    }, this.samplingInterval);

    // Integration με @layera/notifications για performance alerts
    this.alertInterval = setInterval(() => {
      this.checkPerformanceThresholds();
    }, 1000);
  }

  private collectSample(): void {
    const sample: PerformanceSample = {
      timestamp: performance.now(),

      // Frame timing
      frameDuration: this.calculateFrameDuration(),
      frameRate: this.calculateCurrentFrameRate(),

      // Resource usage
      memoryUsage: this.getMemoryUsage(),
      cpuUtilization: this.getCPUUtilization(),

      // Quality metrics
      renderingQuality: this.assessRenderingQuality(),
      inputLatency: this.measureInputLatency(),

      // Transformation-specific metrics
      transformationAccuracy: this.measureTransformationAccuracy(),
      matrixComputationTime: this.lastMatrixComputationTime
    };

    this.metricHistory.push(sample);
    this.updateRollingAverages(sample);
  }

  private checkPerformanceThresholds(): void {
    const currentMetrics = this.getCurrentMetrics();

    // Frame rate alerts
    if (currentMetrics.frameRate < 30) {
      showNotification(t('transform.performance.low.framerate'), {
        type: 'warning',
        duration: 3000,
        actions: [
          {
            label: t('transform.optimize'),
            onClick: () => this.optimizePerformance('reduce-quality')
          }
        ]
      });
    }

    // Memory usage alerts
    if (currentMetrics.memoryUsage > CONSTANTS.PERFORMANCE.MEMORY_WARNING_THRESHOLD) {
      showNotification(t('transform.performance.high.memory'), {
        type: 'warning',
        duration: 5000,
        actions: [
          {
            label: t('transform.free.memory'),
            onClick: () => this.freeUnusedMemory()
          }
        ]
      });
    }

    // Input latency alerts
    if (currentMetrics.inputLatency > 100) { // 100ms threshold
      showNotification(t('transform.performance.input.lag'), {
        type: 'info',
        duration: 2000
      });
    }
  }

  generatePerformanceReport(): PerformanceReport {
    const metrics = this.getAggregatedMetrics();

    return {
      transformationId: this.transformationId,
      duration: this.getTransformationDuration(),

      // Performance summary
      averageFrameRate: metrics.frameRate,
      frameDropPercentage: this.calculateFrameDropPercentage(),
      averageInputLatency: metrics.inputLatency,

      // Resource efficiency
      peakMemoryUsage: this.getPeakMemoryUsage(),
      averageCPUUsage: metrics.cpuUtilization,

      // Quality assessment
      overallQualityScore: this.calculateOverallQualityScore(),
      userExperienceScore: this.calculateUXScore(),

      // Optimization recommendations
      recommendations: this.generateOptimizationRecommendations(),

      // Detailed metrics για debugging
      detailedMetrics: this.metricHistory.toArray()
    };
  }

  private generateOptimizationRecommendations(): OptimizationRecommendation[] {
    const recommendations: OptimizationRecommendation[] = [];
    const metrics = this.getCurrentMetrics();

    if (metrics.frameRate < 45) {
      recommendations.push({
        type: 'performance',
        priority: 'high',
        title: t('optimization.framerate.low'),
        description: t('optimization.framerate.low.desc'),
        actions: [
          'Enable GPU acceleration',
          'Reduce rendering quality',
          'Use level-of-detail optimization'
        ]
      });
    }

    if (metrics.memoryUsage > 200) { // 200MB threshold
      recommendations.push({
        type: 'memory',
        priority: 'medium',
        title: t('optimization.memory.high'),
        description: t('optimization.memory.high.desc'),
        actions: [
          'Enable transform caching',
          'Use progressive loading',
          'Implement memory pooling'
        ]
      });
    }

    if (metrics.inputLatency > 50) { // 50ms threshold
      recommendations.push({
        type: 'responsiveness',
        priority: 'high',
        title: t('optimization.latency.high'),
        description: t('optimization.latency.high.desc'),
        actions: [
          'Use Web Workers για heavy processing',
          'Implement predictive caching',
          'Optimize event handling'
        ]
      });
    }

    return recommendations;
  }
}
```

---

## 🔗 **API REFERENCE & INTEGRATION**

### **📡 Complete Public API**

```typescript
// Main export από @layera/file-transformation
export interface FileTransformationAPI {
  // Core transformation components
  TransformationEngine: React.ComponentType<TransformationEngineProps>;
  TransformationToolbar: React.ComponentType<TransformationToolbarProps>;
  TransformParameterPanel: React.ComponentType<TransformParameterPanelProps>;
  InteractiveTransformControls: React.ComponentType<InteractiveTransformControlsProps>;

  // Specialized transformation tools
  RotationControl: React.ComponentType<RotationControlProps>;
  ScaleControl: React.ComponentType<ScaleControlProps>;
  TranslationControl: React.ComponentType<TranslationControlProps>;
  SkewControl: React.ComponentType<SkewControlProps>;

  // Transformation hooks
  useFileTransformation: () => FileTransformationHook;
  useTransformationHistory: () => TransformationHistoryHook;
  useTransformationPreview: () => TransformationPreviewHook;
  usePerformanceMonitoring: () => PerformanceMonitoringHook;

  // Math utilities
  TransformationMath: typeof TransformationMathEngine;
  MatrixUtils: typeof MatrixUtilities;
  GeographicTransforms: typeof GeographicTransformUtils;

  // Performance optimization
  PerformanceEngine: typeof TransformationPerformanceEngine;
  MetricsCollector: typeof TransformationMetricsCollector;

  // Advanced features
  SnappingEngine: typeof AdvancedSnappingEngine;
  ConstraintSystem: typeof TransformationConstraintSystem;
  BatchTransformer: typeof BatchTransformationEngine;

  // Configuration presets
  getPresetConfiguration: (preset: TransformationPreset) => TransformationConfig;
  createCustomConfiguration: (requirements: TransformationRequirements) => TransformationConfig;
}

// Primary transformation hook
interface FileTransformationHook {
  // Core operations
  transform: (fileId: string, operation: TransformOperation) => Promise<TransformationResult>;
  applyMatrix: (fileId: string, matrix: TransformMatrix) => Promise<TransformationResult>;
  resetTransformation: (fileId: string) => Promise<void>;

  // State management
  currentMatrix: TransformMatrix;
  isTransforming: boolean;
  transformationProgress: number;
  transformationError: TransformationError | null;

  // History management
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  historyStack: TransformMatrix[];

  // Real-time preview
  enablePreview: (enabled: boolean) => void;
  previewMatrix: TransformMatrix | null;
  isPreviewActive: boolean;

  // Performance monitoring
  performanceMetrics: TransformationMetrics;
  enablePerformanceMonitoring: (enabled: boolean) => void;

  // Advanced features
  enableSnapping: (config: SnappingConfig) => void;
  setConstraints: (constraints: TransformationConstraints) => void;
  batchTransform: (operations: BatchTransformOperation[]) => Promise<BatchTransformResult>;
}

// Usage example με complete LEGO integration:
const TransformationExample: React.FC = () => {
  const { t } = useLayeraTranslation();
  const {
    transform,
    currentMatrix,
    isTransforming,
    undo,
    redo,
    canUndo,
    canRedo,
    performanceMetrics
  } = useFileTransformation();

  const [selectedFile, setSelectedFile] = useState<string>('');
  const [transformMode, setTransformMode] = useState<TransformationType>('translate');

  const handleTransformationComplete = useCallback((result: TransformationResult) => {
    // Integration με @layera/notifications
    toast.success(t('transform.completed', {
      fileId: result.fileId,
      transformType: result.transformationType
    }), {
      duration: 3000,
      actions: [
        { label: t('transform.undo'), onClick: undo },
        { label: t('transform.save'), onClick: () => saveTransformation(result) }
      ]
    });

    // Integration με analytics
    trackTransformationEvent('transformation_completed', {
      fileId: result.fileId,
      transformType: result.transformationType,
      processingTime: result.processingTime,
      qualityScore: result.qualityScore
    });
  }, [undo, t]);

  return (
    <ErrorBoundary fallback={<TransformationErrorFallback />}>
      <Container>
        <Grid columns={2} gap="medium">
          {/* Main transformation interface */}
          <Card>
            <TransformationEngine
              fileId={selectedFile}
              enabledTransforms={['translate', 'rotate', 'scale']}
              precisionMode="architectural"
              showToolbar={true}
              showParameterPanel={true}
              showPreview={true}
              enableSnapping={true}
              enableHistory={true}
              onTransformComplete={handleTransformationComplete}
            />
          </Card>

          {/* Performance monitoring panel */}
          <Card>
            <CardHeader>
              <Heading level={4}>{t('transform.performance.title')}</Heading>
            </CardHeader>
            <CardContent>
              <PerformanceMetricsDisplay metrics={performanceMetrics} />

              {/* Quick actions */}
              <ButtonGroup>
                <Button
                  variant="secondary"
                  onClick={undo}
                  disabled={!canUndo}
                  icon={<UndoIcon />}
                >
                  {t('transform.undo')}
                </Button>
                <Button
                  variant="secondary"
                  onClick={redo}
                  disabled={!canRedo}
                  icon={<RedoIcon />}
                >
                  {t('transform.redo')}
                </Button>
              </ButtonGroup>
            </CardContent>
          </Card>
        </Grid>

        {/* Processing indicator */}
        {isTransforming && (
          <Modal>
            <ModalContent>
              <LoadingSpinner size="large" />
              <Text>{t('transform.processing')}</Text>
              <ProgressBar value={transformationProgress} />
            </ModalContent>
          </Modal>
        )}
      </Container>
    </ErrorBoundary>
  );
};
```

---

*📝 Note: Αυτό το document παρέχει τη complete specification για το @layera/file-transformation LEGO system. Το σύστημα σχεδιάστηκε να είναι enterprise-grade με focus στην performance, precision, και seamless integration με το Layera ecosystem.*