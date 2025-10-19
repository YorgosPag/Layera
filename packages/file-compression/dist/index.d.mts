interface CompressionOptions {
    quality?: number;
    format?: CompressionFormat;
    maxWidth?: number;
    maxHeight?: number;
    maintainAspectRatio?: boolean;
    enableProgressive?: boolean;
    stripMetadata?: boolean;
    customSettings?: Record<string, unknown>;
}
type CompressionFormat = 'jpeg' | 'webp' | 'avif' | 'png' | 'original';
interface CompressionResult {
    originalFile: File;
    compressedBlob: Blob;
    originalSize: number;
    compressedSize: number;
    compressionRatio: number;
    format: CompressionFormat;
    quality: number;
    metadata: CompressionMetadata;
}
interface CompressionMetadata {
    width?: number;
    height?: number;
    originalFormat: string;
    targetFormat: string;
    processingTime: number;
    algorithm: string;
}
interface CompressionProgress {
    fileId: string;
    stage: 'analyzing' | 'compressing' | 'optimizing' | 'complete';
    progress: number;
    message: string;
    estimatedTimeRemaining?: number;
}
interface BatchCompressionOptions extends CompressionOptions {
    maxConcurrentFiles?: number;
    stopOnError?: boolean;
    onFileComplete?: (result: CompressionResult) => void;
    onFileError?: (error: CompressionError) => void;
}
interface BatchCompressionResult {
    results: CompressionResult[];
    errors: CompressionError[];
    totalOriginalSize: number;
    totalCompressedSize: number;
    overallCompressionRatio: number;
    processingTime: number;
}
interface CompressionRule {
    maxFileSize: number;
    allowedFormats: string[];
    minQuality?: number;
    maxQuality?: number;
    maxDimensions?: {
        width: number;
        height: number;
    };
}
interface CompressionValidationResult {
    isValid: boolean;
    errors: CompressionValidationError[];
    warnings: CompressionValidationWarning[];
    recommendations: CompressionRecommendation[];
}
interface CompressionValidationError {
    code: string;
    message: string;
    severity: 'error' | 'warning';
}
interface CompressionValidationWarning {
    code: string;
    message: string;
    suggestion?: string;
}
interface CompressionRecommendation {
    type: 'quality' | 'format' | 'dimension' | 'optimization';
    message: string;
    impact: 'high' | 'medium' | 'low';
    estimatedSavings?: number;
}
declare class CompressionError extends Error {
    code: string;
    fileId?: string | undefined;
    originalError?: Error | undefined;
    constructor(message: string, code: string, fileId?: string | undefined, originalError?: Error | undefined);
}
declare class UnsupportedFormatError extends CompressionError {
    constructor(format: string, supportedFormats: string[]);
}
declare class CompressionQualityError extends CompressionError {
    constructor(quality: number, minQuality: number, maxQuality: number);
}
interface CompressionConfig {
    defaultOptions: CompressionOptions;
    supportedFormats: Record<string, CompressionFormatConfig>;
    maxFileSize: number;
    maxConcurrentCompressions: number;
    enableWebWorkers: boolean;
}
interface CompressionFormatConfig {
    extension: string;
    mimeType: string;
    qualityRange: {
        min: number;
        max: number;
        default: number;
    };
    supportsProgressive: boolean;
    supportsTransparency: boolean;
    compressionAlgorithm: string;
}
interface CompressionEvent {
    type: 'compression:started' | 'compression:progress' | 'compression:completed' | 'compression:failed';
    fileId: string;
    data?: unknown;
}
type CompressionCallback = (event: CompressionEvent) => void;
interface CompressionWorkerMessage {
    id: string;
    type: 'compress' | 'batch-compress' | 'cancel';
    payload: {
        file?: ArrayBuffer;
        options?: CompressionOptions;
        files?: ArrayBuffer[];
        batchOptions?: BatchCompressionOptions;
    };
}
interface CompressionWorkerResponse {
    id: string;
    type: 'success' | 'error' | 'progress';
    payload: {
        result?: CompressionResult;
        error?: string;
        progress?: CompressionProgress;
    };
}

interface UseFileCompressionOptions {
    defaultOptions?: CompressionOptions;
    maxConcurrentFiles?: number;
    showNotifications?: boolean;
    onProgress?: (progress: CompressionProgress) => void;
    onComplete?: (results: CompressionResult[]) => void;
    onError?: (error: CompressionError) => void;
}
interface UseFileCompressionReturn {
    isCompressing: boolean;
    progress: number;
    results: CompressionResult[];
    errors: CompressionError[];
    compressFile: (file: File, options?: CompressionOptions) => Promise<CompressionResult>;
    compressFiles: (files: File[], options?: BatchCompressionOptions) => Promise<BatchCompressionResult>;
    cancelCompression: () => void;
    clearResults: () => void;
    validateOptions: (options: CompressionOptions) => CompressionValidationResult;
    getRecommendations: (file: File) => Promise<CompressionOptions>;
    estimateCompression: (file: File, options: CompressionOptions) => Promise<{
        estimatedSize: number;
        estimatedRatio: number;
    }>;
}
declare function useFileCompression(options?: UseFileCompressionOptions): UseFileCompressionReturn;

/**
 * Enhanced compression engine βασισμένο σε Canvas API
 * Enhanced από OLD_geo-canvas patterns για image processing
 */
declare class CompressionEngine {
    private canvas;
    private ctx;
    constructor();
    /**
     * Κύρια μέθοδος συμπίεσης αρχείου
     */
    compressFile(file: File, options?: CompressionOptions): Promise<CompressionResult>;
    /**
     * Batch compression για πολλαπλά αρχεία
     */
    compressFiles(files: File[], options?: CompressionOptions): Promise<CompressionResult[]>;
    /**
     * Validates file για compression
     */
    private validateFile;
    /**
     * Loads image από file
     */
    private loadImage;
    /**
     * Calculates optimal dimensions για resize
     */
    private calculateDimensions;
    /**
     * Sets up canvas με τις νέες διαστάσεις
     */
    private setupCanvas;
    /**
     * Draws image στο canvas με resizing
     */
    private drawImage;
    /**
     * Applies optimization techniques
     */
    private applyOptimizations;
    /**
     * Simple sharpening filter
     */
    private applySharpeningFilter;
    /**
     * Basic noise reduction
     */
    private applyNoiseReduction;
    /**
     * Generic convolution filter
     */
    private applyConvolutionFilter;
    /**
     * Compresses canvas στο target format
     */
    private compressToFormat;
    /**
     * Generates compression metadata
     */
    private generateMetadata;
    /**
     * Helper methods
     */
    private detectBestFormat;
    private getDefaultQuality;
    private calculateCompressionRatio;
    /**
     * Cleanup resources
     */
    destroy(): void;
}

/**
 * Validates compression options
 */
declare function validateCompressionOptions(options: CompressionOptions): CompressionValidationResult;
/**
 * Recommends optimal compression options για ένα αρχείο
 */
declare function recommendOptimizations(file: File): Promise<CompressionOptions>;
/**
 * Gets optimal format για συγκεκριμένο use case
 */
declare function getOptimalFormat(useCase: 'web' | 'print' | 'archive' | 'thumbnail'): CompressionFormat;
/**
 * Calculates compression efficiency score
 */
declare function calculateCompressionScore(originalSize: number, compressedSize: number, targetQuality: number): number;
/**
 * Validates batch compression options
 */
declare function validateBatchOptions(files: File[], options: CompressionOptions): CompressionValidationResult;

export { type BatchCompressionOptions, type BatchCompressionResult, type CompressionCallback, type CompressionConfig, CompressionEngine, CompressionError, type CompressionEvent, type CompressionFormat, type CompressionFormatConfig, type CompressionMetadata, type CompressionOptions, type CompressionProgress, CompressionQualityError, type CompressionRecommendation, type CompressionResult, type CompressionRule, type CompressionValidationError, type CompressionValidationResult, type CompressionValidationWarning, type CompressionWorkerMessage, type CompressionWorkerResponse, UnsupportedFormatError, type UseFileCompressionOptions, type UseFileCompressionReturn, calculateCompressionScore, getOptimalFormat, recommendOptimizations, useFileCompression, validateBatchOptions, validateCompressionOptions };
