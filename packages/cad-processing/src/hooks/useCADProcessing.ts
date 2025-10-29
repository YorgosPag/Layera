import { useState, useCallback, useRef, useEffect } from 'react';
import { useNotifications } from '@layera/notifications';
import {
  CADData,
  CADProcessingOptions,
  CADProcessingResult,
  CADProcessingProgress,
  CADProcessingError,
  CADRenderData,
  CADValidationResult,
  CADExportOptions,
  DWGNotSupportedError,
  CADFormat
} from '../types';
import { LayeraDXFParser } from '../parsers/dxfParser';
import { CADRenderer } from '../renderers/cadRenderer';
import { validateCADFile } from '../utils/cadValidator';

export interface UseCADProcessingOptions {
  defaultOptions?: Partial<CADProcessingOptions>;
  showNotifications?: boolean;
  autoRender?: boolean;
  onProgress?: (progress: CADProcessingProgress) => void;
  onComplete?: (result: CADProcessingResult) => void;
  onError?: (error: CADProcessingError) => void;
}

export interface UseCADProcessingReturn {
  // State
  isProcessing: boolean;
  progress: number;
  result: CADProcessingResult | null;
  renderData: CADRenderData | null;
  errors: CADProcessingError[];

  // Actions
  processCADFile: (file: File, options?: Partial<CADProcessingOptions>) => Promise<CADProcessingResult>;
  renderCAD: (cadData: CADData, options?: CADProcessingOptions['renderOptions']) => Promise<CADRenderData>;
  exportCAD: (cadData: CADData, exportOptions: CADExportOptions) => Promise<Blob>;
  clearResult: () => void;

  // Validation & utilities
  validateFile: (file: File) => Promise<CADValidationResult>;
  getSupportedFormats: () => CADFormat[];
  estimateProcessingTime: (file: File) => Promise<number>;
}

export function useCADProcessing(
  options: UseCADProcessingOptions = {}
): UseCADProcessingReturn {
  // NOTE: Add translation support using @layera/tolgee - I18n integration required
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<CADProcessingResult | null>(null);
  const [renderData, setRenderData] = useState<CADRenderData | null>(null);
  const [errors, setErrors] = useState<CADProcessingError[]>([]);

  const dxfParserRef = useRef<LayeraDXFParser | null>(null);
  const cadRendererRef = useRef<CADRenderer | null>(null);

  const {
    defaultOptions = {},
    showNotifications = true,
    autoRender = true,
    onProgress,
    onComplete,
    onError
  } = options;

  const { addNotification } = useNotifications();

  // Initialize parsers and renderers
  useEffect(() => {
    try {
      dxfParserRef.current = new LayeraDXFParser();
      cadRendererRef.current = new CADRenderer();
    } catch (error) {
      console.error('Failed to initialize CAD processing engines:', error);
      if (showNotifications) {
        addNotification({
          type: 'error',
          message: 'CAD Engine Initialization Error'
        });
      }
    }

    return () => {
      // Cleanup if needed
    };
  }, [showNotifications, t]);

  const reportProgress = useCallback((
    stage: CADProcessingProgress['stage'],
    progress: number,
    message: string,
    currentEntity?: string,
    entitiesProcessed?: number,
    totalEntities?: number
  ) => {
    const progressData: CADProcessingProgress = {
      stage,
      progress,
      message,
      ...(currentEntity !== undefined && { currentEntity }),
      ...(entitiesProcessed !== undefined && { entitiesProcessed }),
      ...(totalEntities !== undefined && { totalEntities })
    };

    setProgress(progress);
    onProgress?.(progressData);

    if (showNotifications && stage === 'complete') {
      addNotification({
        type: 'success',
        message: 'CAD Processing completed successfully'
      });
    }
  }, [onProgress, showNotifications, addNotification]);

  const handleError = useCallback((error: CADProcessingError) => {
    setErrors(prev => [...prev, error]);
    onError?.(error);

    if (showNotifications) {
      addNotification({
        type: 'error',
        message: `CAD Processing Error: ${error.message}`
      });
    }
  }, [onError, showNotifications, addNotification]);

  const processCADFile = useCallback(async (
    file: File,
    processingOptions?: Partial<CADProcessingOptions>
  ): Promise<CADProcessingResult> => {
    if (!dxfParserRef.current || !cadRendererRef.current) {
      throw new CADProcessingError(
        'CAD processing engines not initialized',
        'ENGINES_NOT_INITIALIZED'
      );
    }

    const startTime = performance.now();
    const finalOptions: CADProcessingOptions = {
      format: 'dxf', // Will be detected
      ...defaultOptions,
      ...processingOptions
    };

    try {
      setIsProcessing(true);
      setErrors([]);

      // Step 1: Detect file format
      reportProgress('parsing', 5, 'Detecting CAD format');
      const detectedFormat = await detectCADFormat(file);
      finalOptions.format = detectedFormat;

      // Check format support
      if (detectedFormat === 'dwg') {
        throw new DWGNotSupportedError();
      }

      if (detectedFormat !== 'dxf') {
        throw new CADProcessingError(
          `Unsupported CAD format: ${detectedFormat}`,
          'UNSUPPORTED_FORMAT'
        );
      }

      // Step 2: Read file content
      reportProgress('parsing', 15, 'Reading CAD file');
      const fileContent = await file.text();

      // Step 3: Parse CAD data
      reportProgress('parsing', 25, 'Parsing CAD data');
      const cadData = await dxfParserRef.current.parseDXF(
        fileContent,
        finalOptions.parseOptions
      );

      reportProgress('processing', 50, 'Processing CAD entities');

      // Step 4: Apply transformations if needed
      if (finalOptions.transformOptions) {
        // Apply coordinate transformations, unit conversions, etc.
        // Implementation would go here
      }

      // Step 5: Apply optimizations if needed
      if (finalOptions.optimizationOptions) {
        reportProgress('optimizing', 70, 'Optimizing CAD geometry');
        // Apply geometry optimizations
        // Implementation would go here
      }

      // Step 6: Generate render data if auto-render is enabled
      let renderResult: CADRenderData | undefined;
      if (autoRender) {
        reportProgress('rendering', 85, 'Rendering CAD graphics');
        renderResult = await cadRendererRef.current.render(
          cadData,
          finalOptions.renderOptions
        );
        setRenderData(renderResult);
      }

      reportProgress('complete', 100, 'CAD processing completed');

      // Create result
      const processingResult: CADProcessingResult = {
        originalFile: file,
        cadData,
        processingTime: performance.now() - startTime,
        warnings: dxfParserRef.current.getWarnings(),
        errors: dxfParserRef.current.getErrors(),
        ...(renderResult !== undefined && { renderData: renderResult })
      };

      setResult(processingResult);
      onComplete?.(processingResult);

      return processingResult;

    } catch (error) {
      const cadError = error instanceof CADProcessingError
        ? error
        : new CADProcessingError(
            error instanceof Error ? error.message : 'Unknown CAD processing error',
            'PROCESSING_FAILED'
          );

      handleError(cadError);
      throw cadError;

    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  }, [defaultOptions, autoRender, reportProgress, handleError, onComplete, t]);

  const renderCAD = useCallback(async (
    cadData: CADData,
    renderOptions?: CADProcessingOptions['renderOptions']
  ): Promise<CADRenderData> => {
    if (!cadRendererRef.current) {
      throw new CADProcessingError(
        'CAD renderer not initialized',
        'RENDERER_NOT_INITIALIZED'
      );
    }

    try {
      setIsProcessing(true);
      reportProgress('rendering', 0, 'CAD rendering started');

      const renderResult = await cadRendererRef.current.render(cadData, renderOptions);
      setRenderData(renderResult);

      reportProgress('complete', 100, 'CAD rendering completed');

      if (showNotifications) {
        addNotification({
          type: 'success',
          message: 'CAD rendering completed successfully'
        });
      }

      return renderResult;

    } catch (error) {
      const renderError = new CADProcessingError(
        `Rendering failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        'RENDERING_FAILED',
        'rendering'
      );

      handleError(renderError);
      throw renderError;

    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  }, [reportProgress, handleError, showNotifications, t]);

  const exportCAD = useCallback(async (
    cadData: CADData,
    exportOptions: CADExportOptions
  ): Promise<Blob> => {
    try {
      setIsProcessing(true);
      reportProgress('processing', 0, 'Exporting CAD data');

      // Implementation will depend on the export format
      switch (exportOptions.format) {
        case 'geojson':
          return await exportToGeoJSON(cadData, exportOptions.options);
        case 'svg':
          return await exportToSVG(cadData, exportOptions.options);
        case 'dxf':
          return await exportToDXF(cadData, exportOptions.options);
        case 'pdf':
          return await exportToPDF(cadData, exportOptions.options);
        default:
          throw new CADProcessingError(
            `Unsupported export format: ${exportOptions.format}`,
            'UNSUPPORTED_EXPORT_FORMAT'
          );
      }

    } catch (error) {
      const exportError = new CADProcessingError(
        `Export failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        'EXPORT_FAILED'
      );

      handleError(exportError);
      throw exportError;

    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  }, [reportProgress, handleError, t]);

  const clearResult = useCallback(() => {
    setResult(null);
    setRenderData(null);
    setErrors([]);
    setProgress(0);
  }, []);

  const validateFile = useCallback(async (file: File): Promise<CADValidationResult> => {
    return validateCADFile(file);
  }, []);

  const getSupportedFormats = useCallback((): CADFormat[] => {
    return ['dxf']; // Currently only DXF is supported
  }, []);

  const estimateProcessingTime = useCallback(async (file: File): Promise<number> => {
    // Simple estimation based on file size
    const fileSizeMB = file.size / (1024 * 1024);

    // Base time: 2 seconds per MB for DXF
    let timePerMB = 2000;

    // Adjust based on file extension
    const extension = file.name.split('.').pop()?.toLowerCase();
    if (extension === 'dwg') {
      timePerMB = 0; // Not supported
    }

    return Math.round(fileSizeMB * timePerMB);
  }, []);

  return {
    // State
    isProcessing,
    progress,
    result,
    renderData,
    errors,

    // Actions
    processCADFile,
    renderCAD,
    exportCAD,
    clearResult,

    // Validation & utilities
    validateFile,
    getSupportedFormats,
    estimateProcessingTime
  };
}

// Helper functions
async function detectCADFormat(file: File): Promise<CADFormat> {
  const extension = file.name.split('.').pop()?.toLowerCase();

  switch (extension) {
    case 'dxf':
      return 'dxf';
    case 'dwg':
      return 'dwg';
    case 'dwf':
      return 'dwf';
    case 'dgn':
      return 'dgn';
    default:
      // Try to detect from content
      const header = await file.slice(0, 1024).text();
      if (header.includes('SECTION') && header.includes('HEADER')) {
        return 'dxf';
      }
      throw new CADProcessingError(
        `Cannot detect CAD format for file: ${file.name}`,
        'FORMAT_DETECTION_FAILED'
      );
  }
}

// Placeholder export functions - θα υλοποιηθούν πλήρως
async function exportToGeoJSON(_cadData: CADData, _options: unknown): Promise<Blob> {
  // Integration με @layera/file-transformation
  throw new CADProcessingError('GeoJSON export not yet implemented', 'EXPORT_NOT_IMPLEMENTED');
}

async function exportToSVG(_cadData: CADData, _options: unknown): Promise<Blob> {
  // Use CADRenderer to generate SVG
  throw new CADProcessingError('SVG export not yet implemented', 'EXPORT_NOT_IMPLEMENTED');
}

async function exportToDXF(_cadData: CADData, _options: unknown): Promise<Blob> {
  // Serialize back to DXF format
  throw new CADProcessingError('DXF export not yet implemented', 'EXPORT_NOT_IMPLEMENTED');
}

async function exportToPDF(_cadData: CADData, _options: unknown): Promise<Blob> {
  // Convert to PDF format
  throw new CADProcessingError('PDF export not yet implemented', 'EXPORT_NOT_IMPLEMENTED');
}