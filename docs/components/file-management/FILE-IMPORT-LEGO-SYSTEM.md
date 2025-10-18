# 📁 @layera/file-import LEGO SYSTEM

*Τελευταία ενημέρωση: 18 Οκτωβρίου 2025*
*Δημιουργός: Γιώργος Παγώνης - Επιβλέπων Αρχιτέκτονας*

---

## 🎯 **OVERVIEW**

### **Σκοπός & Αποστολή**
Το `@layera/file-import` είναι ένα enterprise-grade LEGO σύστημα που παρέχει unified file importing capabilities για όλες τις Layera εφαρμογές. Βασίζεται σε αποδεδειγμένες τεχνικές από το OLD_geo-canvas system και επεκτείνεται με modern web standards.

### **🏗️ Υφιστάμενη Βάση**
Το σύστημα βασίζεται στον εξής αποδεδειγμένο κώδικα από το OLD_geo-canvas:

```typescript
// Από: OLD_geo-canvas/packages/app/src/context/LayersContext.tsx
const addLayer = async (file: File, center: L.LatLng) => {
    const buffer = await file.arrayBuffer();
    const fileType = file.name.split('.').pop()?.toLowerCase();
    const layerType: LayerType = (fileType === 'dxf') ? 'dxf' : 'raster';

    const { width: intrinsicWidth, height: intrinsicHeight, aspectRatio } =
        await getFileInfo(file, buffer.slice(0));

    // File processing logic που θα γίνει LEGO component...
};
```

### **📊 Supported File Types Matrix**

| **Category** | **Format** | **Extension** | **Max Size** | **Processing Type** | **Enterprise Support** |
|--------------|------------|---------------|--------------|---------------------|------------------------|
| 🏗️ **CAD Files** | AutoCAD Drawing | `.dxf` | 500MB | Streaming | ✅ Full |
| 🏗️ **CAD Files** | AutoCAD Native | `.dwg` | 500MB | Streaming | 🔶 Phase 2 |
| 📄 **Documents** | Portable Document | `.pdf` | 200MB | Progressive | ✅ Full |
| 🖼️ **Raster Images** | JPEG | `.jpg`, `.jpeg` | 50MB | Client-side | ✅ Full |
| 🖼️ **Raster Images** | PNG | `.png` | 50MB | Client-side | ✅ Full |
| 🖼️ **Raster Images** | WebP | `.webp` | 50MB | Client-side | ✅ Full |
| 🖼️ **Raster Images** | TIFF | `.tiff`, `.tif` | 100MB | Progressive | 🔶 Phase 2 |
| 🎨 **Vector Graphics** | SVG | `.svg` | 10MB | Client-side | ✅ Full |
| 📊 **Data Files** | Excel Spreadsheet | `.xlsx` | 25MB | Streaming | 🔶 Phase 3 |
| 📊 **Data Files** | CSV Data | `.csv` | 100MB | Streaming | 🔶 Phase 3 |

---

## 🧩 **LEGO INTEGRATION**

### **📦 Package Dependencies**

```typescript
// Package dependencies για full functionality
import { toast, showNotification } from '@layera/notifications';    // ✅ Status updates
import { LoadingSpinner, ProgressBar } from '@layera/loading';      // ✅ Processing feedback
import { Card, CardContent } from '@layera/cards';                  // ✅ UI containers
import { Button, IconButton } from '@layera/buttons';               // ✅ User actions
import { useLayeraTranslation } from '@layera/i18n/hooks';          // ✅ Internationalization
import { ErrorBoundary } from '@layera/error-boundary';             // ✅ Error handling
import { CONSTANTS } from '@layera/constants';                      // ✅ Configuration
```

### **🔄 Event Integration με Existing LEGO Systems**

```typescript
// Event-driven integration με other Layera LEGO systems
interface FileImportEvents {
  // Integration με @layera/notifications
  'file:import:started': () => showNotification(t('file.import.started'));
  'file:import:progress': (progress: number) => updateProgressBar(progress);
  'file:import:completed': (result: FileResult) => toast.success(t('file.import.success'));
  'file:import:failed': (error: ImportError) => toast.error(t('file.import.error'));

  // Integration με @layera/loading
  'file:validation:started': () => setLoading('validation', true);
  'file:processing:started': () => setLoading('processing', true);
  'file:compression:started': () => setLoading('compression', true);

  // Integration με @layera/error-boundary
  'file:critical:error': (error: CriticalError) => ErrorBoundary.capture(error);
}
```

---

## 🎨 **COMPONENT ARCHITECTURE**

### **🏗️ Core Components**

#### **1. FileImporter - Main Component**
```typescript
interface FileImporterProps {
  // Required props
  onFileImported: (file: ImportedFile) => void;
  acceptedFormats: SupportedFormat[];

  // Optional customization
  maxFileSize?: number;                          // Override default limits
  allowMultiple?: boolean;                       // Batch import support
  customValidation?: (file: File) => ValidationResult;

  // UI customization (LEGO integration)
  dropZoneComponent?: React.ComponentType;       // Custom drop zone
  progressComponent?: React.ComponentType;       // Custom progress display
  errorComponent?: React.ComponentType;          // Custom error display

  // Advanced options
  compressionOptions?: CompressionConfig;        // Integration με @layera/file-compression
  transformationOptions?: TransformConfig;       // Integration με @layera/file-transformation

  // Enterprise features
  cloudStorage?: CloudStorageConfig;             // Auto-upload to cloud
  versionControl?: VersionControlConfig;         // File versioning
  collaborationMode?: boolean;                   // Multi-user support
}

// Usage example with LEGO integration
<Card>
  <CardContent>
    <FileImporter
      onFileImported={handleFileImport}
      acceptedFormats={['dxf', 'pdf', 'jpg', 'png']}
      allowMultiple={true}
      maxFileSize={CONSTANTS.FILE_LIMITS.LARGE_FILE}
      progressComponent={<ProgressBar variant="layera" />}
      errorComponent={<ErrorBoundary fallback="file-import" />}
    />
  </CardContent>
</Card>
```

#### **2. DragDropZone - Enhanced από OLD_geo-canvas**
```typescript
interface DragDropZoneProps {
  // Core functionality
  onFilesDropped: (files: File[]) => void;
  acceptedFormats: string[];
  disabled?: boolean;

  // Visual customization με LEGO components
  children?: React.ReactNode;                    // Custom content
  className?: string;                            // Style overrides
  variant?: 'compact' | 'expanded' | 'minimal';  // Predefined styles

  // Accessibility
  ariaLabel?: string;                            // Screen reader support
  tabIndex?: number;                             // Keyboard navigation

  // Enterprise features
  securityScan?: boolean;                        // Virus/malware scanning
  auditLogging?: boolean;                        // File access logging
}

// Integration με υπάρχον OLD_geo-canvas pattern:
const DragDropZone: React.FC<DragDropZoneProps> = ({ onFilesDropped, acceptedFormats, ...props }) => {
  // Enhanced από: OLD_geo-canvas/components/wizard/StepLocationOffer.tsx
  const { t } = useLayeraTranslation();

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const validFiles = files.filter(file =>
      acceptedFormats.includes(file.name.split('.').pop()?.toLowerCase() || '')
    );

    if (validFiles.length === 0) {
      toast.error(t('file.invalid.format'));
      return;
    }

    onFilesDropped(validFiles);
  }, [onFilesDropped, acceptedFormats, t]);

  // Implementation με LEGO styling...
};
```

#### **3. FileValidator - Enterprise-Grade Validation**
```typescript
interface FileValidationRules {
  // Size validation
  maxSize: number;
  minSize?: number;

  // Format validation
  allowedExtensions: string[];
  mimeTypeValidation: boolean;

  // Content validation
  structuralValidation: boolean;                 // File header/structure check
  virusScanning: boolean;                        // Security scanning

  // CAD-specific validation
  cadEntityLimit?: number;                       // Max entities σε DXF files
  cadComplexityLimit?: number;                   // Complexity metrics

  // Image-specific validation
  imageMaxDimensions?: { width: number; height: number };
  imageMinDimensions?: { width: number; height: number };

  // Enterprise rules
  contentPolicyCompliance: boolean;              // Content filtering
  dataPrivacyCompliance: boolean;                // GDPR compliance checks
}

interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
  metadata: FileMetadata;

  // Performance metrics
  validationTime: number;                        // Validation duration
  securityScore: number;                         // Security assessment (0-100)
  qualityScore: number;                          // File quality assessment (0-100)
}

// Enhanced validation που χτίζει πάνω στο OLD_geo-canvas getFileInfo:
const validateFile = async (file: File, rules: FileValidationRules): Promise<ValidationResult> => {
  // Extended από: OLD_geo-canvas/packages/app/src/context/layers/services/file-info.ts
  const result: ValidationResult = {
    isValid: true,
    errors: [],
    warnings: [],
    metadata: {},
    validationTime: 0,
    securityScore: 0,
    qualityScore: 0,
  };

  const startTime = performance.now();

  // Enhanced validation logic...

  result.validationTime = performance.now() - startTime;
  return result;
};
```

### **🚀 Progressive Enhancement Components**

#### **4. FilePreviewGenerator**
```typescript
interface FilePreviewConfig {
  // Preview types
  thumbnailSize: { width: number; height: number };
  previewSize: { width: number; height: number };

  // Quality settings
  thumbnailQuality: number;                      // 0-1 range
  previewQuality: number;                        // 0-1 range

  // Performance
  maxPreviewSize: number;                        // Skip preview για large files
  generationTimeout: number;                     // Max time για preview generation

  // Integration options
  cloudGeneration: boolean;                      // Use cloud για heavy processing
  cacheGenerated: boolean;                       // Cache previews
}

// Preview generation που επεκτείνει το OLD_geo-canvas pattern:
const FilePreviewGenerator: React.FC<{
  file: File;
  config: FilePreviewConfig;
  onPreviewGenerated: (preview: FilePreview) => void;
}> = ({ file, config, onPreviewGenerated }) => {
  // Enhanced από: OLD_geo-canvas functionality
  const [preview, setPreview] = useState<FilePreview | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    generatePreview(file, config)
      .then(setPreview)
      .then(() => setIsGenerating(false));
  }, [file, config]);

  // Rendering με LEGO components...
  return (
    <Card variant="preview">
      <CardContent>
        {isGenerating ? (
          <LoadingSpinner size="medium" />
        ) : (
          preview && <img src={preview.dataUrl} alt={t('file.preview')} />
        )}
      </CardContent>
    </Card>
  );
};
```

---

## ⚡ **ENTERPRISE PERFORMANCE FEATURES**

### **🚀 Streaming & Progressive Loading**

#### **Large File Handling Strategy:**
```typescript
interface StreamingConfig {
  // Streaming thresholds
  streamingThreshold: number;                    // File size που activates streaming
  chunkSize: number;                             // Chunk size για streaming
  maxConcurrentChunks: number;                   // Parallel processing limit

  // Progress tracking
  progressCallback: (progress: ProgressEvent) => void;
  stageCallback: (stage: ProcessingStage) => void;

  // Error recovery
  retryAttempts: number;                         // Retry failed chunks
  timeoutPerChunk: number;                       // Individual chunk timeout

  // Performance optimization
  workerThreads: boolean;                        // Use Web Workers
  wasmProcessing: boolean;                       // Use WebAssembly acceleration
}

// Streaming implementation βασισμένη στο OLD_geo-canvas pattern:
class StreamingFileProcessor {
  // Enhanced από: OLD_geo-canvas/packages/app/src/context/layers/services/

  async processLargeFile(file: File, config: StreamingConfig): Promise<ProcessedFile> {
    const chunks = this.createChunks(file, config.chunkSize);
    const processedChunks: ProcessedChunk[] = [];

    // Progressive processing με real-time updates
    for (const chunk of chunks) {
      const processedChunk = await this.processChunk(chunk, config);
      processedChunks.push(processedChunk);

      // Integration με @layera/notifications για progress updates
      config.progressCallback({
        loaded: processedChunks.length * config.chunkSize,
        total: file.size,
        stage: 'processing'
      });
    }

    return this.assembleProcessedFile(processedChunks);
  }

  private async processChunk(chunk: FileChunk, config: StreamingConfig): Promise<ProcessedChunk> {
    // Enhanced processing που χρησιμοποιεί τεχνικές από OLD_geo-canvas
    // με προσθήκη enterprise features: retry logic, timeout handling, etc.
  }
}
```

### **🧠 Intelligent File Type Detection**

```typescript
interface FileTypeDetection {
  // Multi-level detection
  extensionBased: boolean;                       // Basic extension check
  mimeTypeBased: boolean;                        // Browser MIME type
  contentBased: boolean;                         // File header analysis
  structuralBased: boolean;                      // Deep content analysis

  // AI-powered detection (Phase 2)
  aiClassification: boolean;                     // Machine learning classification
  confidenceThreshold: number;                   // Min confidence για AI results

  // Fallback strategies
  fallbackToExtension: boolean;                  // Fallback αν other methods fail
  userConfirmation: boolean;                     // Ask user αν uncertain
}

// Enhanced type detection που builds πάνω στο OLD_geo-canvas logic:
const detectFileType = async (file: File, config: FileTypeDetection): Promise<DetectedFileType> => {
  // Extended από: OLD_geo-canvas file type detection logic
  const detection: DetectedFileType = {
    primaryType: 'unknown',
    confidence: 0,
    alternativeTypes: [],
    metadata: {},
  };

  // Multi-stage detection process
  if (config.extensionBased) {
    detection.primaryType = await detectByExtension(file);
    detection.confidence += 0.3;
  }

  if (config.contentBased) {
    const contentType = await detectByContent(file);
    if (contentType === detection.primaryType) {
      detection.confidence += 0.5;
    }
  }

  // Enhanced detection με enterprise features...

  return detection;
};
```

---

## 🛡️ **SECURITY & COMPLIANCE**

### **🔒 Security Features**

#### **File Scanning & Validation:**
```typescript
interface SecurityConfig {
  // Virus scanning
  virusScanning: {
    enabled: boolean;
    cloudBasedScanning: boolean;                 // Use cloud antivirus APIs
    quarantineOnDetection: boolean;              // Isolate suspicious files
    scanTimeout: number;                         // Max scan time
  };

  // Content validation
  contentValidation: {
    allowExecutableContent: boolean;             // Block .exe, .bat, etc.
    allowScriptContent: boolean;                 // Block .js, .vbs in uploads
    allowMacroContent: boolean;                  // Block macro-enabled files
    maxEmbeddedObjects: number;                  // Limit embedded objects
  };

  // Privacy compliance
  privacyCompliance: {
    gdprCompliance: boolean;                     // EU GDPR compliance
    ccpaCompliance: boolean;                     // California CCPA compliance
    dataRetentionPeriod: number;                 // Auto-delete after period
    auditLogging: boolean;                       // Log all file operations
  };
}

// Security implementation:
class FileSecurityManager {
  async validateFileSecurity(file: File, config: SecurityConfig): Promise<SecurityValidationResult> {
    const result: SecurityValidationResult = {
      isSecure: true,
      threats: [],
      warnings: [],
      complianceStatus: 'compliant',
    };

    // Comprehensive security validation...

    return result;
  }
}
```

### **📋 Audit & Compliance Logging**

```typescript
interface AuditLog {
  // Event tracking
  eventType: 'upload' | 'validation' | 'processing' | 'access' | 'deletion';
  timestamp: Date;
  userId: string;
  sessionId: string;

  // File details
  fileId: string;
  fileName: string;
  fileSize: number;
  fileType: string;

  // Processing details
  processingStage: string;
  processingDuration: number;
  success: boolean;
  errorDetails?: string;

  // Security details
  securityScanResults: SecurityScanResult;
  ipAddress: string;
  userAgent: string;

  // Compliance metadata
  dataClassification: 'public' | 'internal' | 'confidential' | 'restricted';
  retentionCategory: string;
  legalHolds: string[];
}

// Audit logging integration με LEGO systems:
const auditLogger = {
  logFileEvent: async (event: Partial<AuditLog>) => {
    // Integration με @layera/notifications για audit alerts
    // Integration με external logging systems (DataDog, Splunk, etc.)

    const fullEvent: AuditLog = {
      ...event,
      timestamp: new Date(),
      sessionId: getCurrentSessionId(),
      // Additional compliance metadata...
    };

    await persistAuditLog(fullEvent);

    // Real-time compliance monitoring
    if (event.eventType === 'upload' && event.fileSize! > CONSTANTS.COMPLIANCE_THRESHOLDS.LARGE_FILE) {
      showNotification(t('compliance.large.file.uploaded'), 'info');
    }
  }
};
```

---

## 📊 **PERFORMANCE MONITORING & ANALYTICS**

### **📈 Metrics Collection**

```typescript
interface PerformanceMetrics {
  // Processing performance
  uploadSpeed: number;                           // MB/s
  validationTime: number;                        // ms
  processingTime: number;                        // ms
  totalTime: number;                             // ms από upload to completion

  // Resource usage
  memoryUsage: number;                           // MB
  cpuUsage: number;                              // % utilization
  networkBandwidth: number;                      // KB/s

  // User experience
  timeToFirstPreview: number;                    // ms
  timeToInteraction: number;                     // ms
  errorRate: number;                             // % failed uploads

  // Quality metrics
  compressionRatio: number;                      // compressed/original size
  qualityScore: number;                          // 0-100 output quality

  // Enterprise metrics
  costPerFile: number;                           // Cloud processing cost
  carbonFootprint: number;                       // Environmental impact
}

// Performance monitoring integration:
class PerformanceMonitor {
  async trackFileProcessing(fileId: string, operation: string): Promise<MetricsCollector> {
    return new MetricsCollector(fileId, operation);
  }
}

class MetricsCollector {
  constructor(private fileId: string, private operation: string) {
    this.startTime = performance.now();
  }

  async complete(result: ProcessingResult): Promise<void> {
    const metrics: PerformanceMetrics = {
      totalTime: performance.now() - this.startTime,
      // Additional metrics collection...
    };

    // Integration με @layera/notifications για performance alerts
    if (metrics.totalTime > CONSTANTS.PERFORMANCE_THRESHOLDS.SLOW_PROCESSING) {
      showNotification(t('performance.slow.processing'), 'warning');
    }

    // Send metrics to analytics platform
    await this.sendMetrics(metrics);
  }
}
```

---

## 🔗 **API REFERENCE**

### **📡 Public API**

```typescript
// Main export από @layera/file-import
export interface FileImportAPI {
  // Core components
  FileImporter: React.ComponentType<FileImporterProps>;
  DragDropZone: React.ComponentType<DragDropZoneProps>;
  FileValidator: React.ComponentType<FileValidatorProps>;
  FilePreviewGenerator: React.ComponentType<FilePreviewGeneratorProps>;

  // Hooks
  useFileImport: () => FileImportHook;
  useFileValidation: () => FileValidationHook;
  useFilePreview: () => FilePreviewHook;

  // Utilities
  validateFile: (file: File, rules: FileValidationRules) => Promise<ValidationResult>;
  generatePreview: (file: File, config: FilePreviewConfig) => Promise<FilePreview>;
  detectFileType: (file: File, config: FileTypeDetection) => Promise<DetectedFileType>;

  // Enterprise features
  SecurityManager: typeof FileSecurityManager;
  PerformanceMonitor: typeof PerformanceMonitor;
  AuditLogger: typeof auditLogger;

  // Configuration
  defaultConfig: FileImportConfig;
  enterpriseConfig: EnterpriseFileImportConfig;
}

// Hook APIs
interface FileImportHook {
  importFile: (file: File, options?: FileImportOptions) => Promise<ImportedFile>;
  importFiles: (files: File[], options?: BatchImportOptions) => Promise<ImportedFile[]>;
  isImporting: boolean;
  progress: number;
  error: string | null;

  // Advanced operations
  pauseImport: () => void;
  resumeImport: () => void;
  cancelImport: () => void;
  retryImport: () => void;
}

// Integration με existing Layera ecosystem
interface LayeraIntegrationAPI {
  // Notification integration
  notifyProgress: (progress: number, message: string) => void;
  notifySuccess: (result: ImportedFile) => void;
  notifyError: (error: ImportError) => void;

  // Loading state integration
  setLoadingState: (loading: boolean, stage: string) => void;
  updateProgressBar: (progress: number) => void;

  // Error boundary integration
  captureError: (error: Error, context: ErrorContext) => void;

  // i18n integration
  t: (key: string, params?: Record<string, any>) => string;

  // Theme integration
  currentTheme: 'light' | 'dark';
  themeVars: ThemeVariables;
}
```

---

## 🧪 **TESTING STRATEGY**

### **📋 Test Coverage Plan**

```typescript
// Test categories με coverage targets
interface TestStrategy {
  unitTests: {
    coverage: 95;                                // % code coverage target
    components: [
      'FileImporter',
      'DragDropZone',
      'FileValidator',
      'FilePreviewGenerator'
    ];
    utilities: [
      'validateFile',
      'generatePreview',
      'detectFileType',
      'StreamingFileProcessor'
    ];
  };

  integrationTests: {
    coverage: 85;
    scenarios: [
      'file-upload-to-preview-pipeline',
      'batch-file-processing',
      'large-file-streaming',
      'error-recovery-flows',
      'security-validation-pipeline'
    ];
  };

  performanceTests: {
    scenarios: [
      'single-file-upload-performance',
      'batch-upload-performance',
      'memory-usage-under-load',
      'concurrent-user-simulation'
    ];
    targets: {
      uploadSpeed: '>10MB/s σε good network conditions',
      memoryUsage: '<2x file size για processing',
      responseTime: '<2s για files up to 10MB'
    };
  };

  accessibilityTests: {
    standards: ['WCAG 2.1 AA'];
    tools: ['axe-core', 'jest-axe'];
    scenarios: [
      'keyboard-navigation',
      'screen-reader-compatibility',
      'color-contrast-compliance',
      'focus-management'
    ];
  };
}
```

### **🔧 Test Implementation Examples**

```typescript
// Unit test example
describe('@layera/file-import - FileValidator', () => {
  it('should validate DXF files correctly', async () => {
    // Test case που validates τη λειτουργικότητα από OLD_geo-canvas
    const mockDxfFile = new File(['mock dxf content'], 'test.dxf', {
      type: 'application/dxf'
    });

    const rules: FileValidationRules = {
      maxSize: 100 * 1024 * 1024, // 100MB
      allowedExtensions: ['dxf'],
      mimeTypeValidation: true,
      structuralValidation: true,
    };

    const result = await validateFile(mockDxfFile, rules);

    expect(result.isValid).toBe(true);
    expect(result.metadata.fileType).toBe('dxf');
    expect(result.errors).toHaveLength(0);
  });

  it('should integrate correctly με @layera/notifications', async () => {
    // Integration test με notifications LEGO system
    const mockNotificationSpy = jest.spyOn(notifications, 'toast');

    // Test scenario...

    expect(mockNotificationSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'success',
        message: expect.stringContaining('file.import.success')
      })
    );
  });
});

// Performance test example
describe('@layera/file-import - Performance', () => {
  it('should process large files within performance targets', async () => {
    const largeFile = createMockFile(50 * 1024 * 1024); // 50MB mock file

    const startTime = performance.now();
    const result = await importFile(largeFile);
    const endTime = performance.now();

    expect(endTime - startTime).toBeLessThan(5000); // 5s target
    expect(result.isSuccess).toBe(true);
  });
});
```

---

## 🚀 **MIGRATION FROM OLD_geo-canvas**

### **📋 Migration Checklist**

```typescript
// Migration tasks από OLD_geo-canvas system:
interface MigrationPlan {
  phase1_extraction: [
    '✅ Extract file validation logic από LayersContext.tsx',
    '✅ Extract file info detection από file-info.ts',
    '✅ Extract drag-drop logic από StepLocationOffer.tsx',
    '✅ Extract file processing από layer-builder.ts'
  ];

  phase2_enhancement: [
    '🔄 Add enterprise security features',
    '🔄 Add streaming support για large files',
    '🔄 Add batch processing capabilities',
    '🔄 Add performance monitoring',
    '🔄 Add accessibility compliance'
  ];

  phase3_integration: [
    '⏳ Integration με @layera/notifications',
    '⏳ Integration με @layera/loading',
    '⏳ Integration με @layera/error-boundary',
    '⏳ Integration με @layera/i18n',
    '⏳ Documentation και testing'
  ];
}

// Backward compatibility layer
interface BackwardCompatibilityAPI {
  // Support για existing OLD_geo-canvas APIs
  legacyAddLayer: (file: File, center: L.LatLng) => Promise<ImportedLayer>;
  legacyGetFileInfo: (file: File, buffer: ArrayBuffer) => Promise<FileInfo>;
  legacyBuildLayerFromFile: (file: File, buffer: ArrayBuffer, center: L.LatLng) => Promise<ImportedLayer>;

  // Migration helpers
  migrateLegacyConfig: (oldConfig: OldFileConfig) => FileImportConfig;
  adaptLegacyHandlers: (oldHandlers: OldFileHandlers) => FileImportHandlers;
}
```

---

*📝 Note: Αυτό το document θα ενημερώνεται καθώς προχωράει η ανάπτυξη του @layera/file-import LEGO system. Όλες οι αλλαγές θα documented και tested πριν από production deployment.*