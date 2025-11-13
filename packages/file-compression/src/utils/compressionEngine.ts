import {
  CompressionOptions,
  CompressionResult,
  CompressionFormat,
  CompressionMetadata,
  CompressionError,
  UnsupportedFormatError,
  CompressionQualityError
} from '../types';

// Supported formats configuration
const SUPPORTED_FORMATS: Record<string, {
  mimeType: string;
  quality: { min: number; max: number; default: number };
  supportsTransparency: boolean;
}> = {
  jpeg: {
    mimeType: 'image/jpeg',
    quality: { min: 10, max: 100, default: 85 },
    supportsTransparency: false
  },
  webp: {
    mimeType: 'image/webp',
    quality: { min: 10, max: 100, default: 80 },
    supportsTransparency: true
  },
  avif: {
    mimeType: 'image/avif',
    quality: { min: 10, max: 100, default: 75 },
    supportsTransparency: true
  },
  png: {
    mimeType: 'image/png',
    quality: { min: 10, max: 100, default: 100 },
    supportsTransparency: true
  }
};

/**
 * Enhanced compression engine βασισμένο σε Canvas API
 * Enhanced από OLD_geo-canvas patterns για image processing
 */
export class CompressionEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;

  constructor() {
    this.canvas = document.createElement('canvas');
    const context = this.canvas.getContext('2d');
    if (!context) {
      throw new CompressionError('Canvas 2D context not supported', 'CANVAS_NOT_SUPPORTED');
    }
    this.ctx = context;
  }

  /**
   * Κύρια μέθοδος συμπίεσης αρχείου
   */
  async compressFile(
    file: File,
    options: CompressionOptions = {}
  ): Promise<CompressionResult> {
    const startTime = performance.now();

    try {
      // Validate input
      await this.validateFile(file, options);

      // Load image
      const img = await this.loadImage(file);

      // Calculate dimensions
      const dimensions = this.calculateDimensions(img, options);

      // Setup canvas
      this.setupCanvas(dimensions.width, dimensions.height);

      // Draw and resize image
      this.drawImage(img, dimensions);

      // Apply optimizations
      await this.applyOptimizations(options);

      // Compress to target format
      const compressedBlob = await this.compressToFormat(options);

      // Generate metadata
      const metadata = this.generateMetadata(
        file,
        options,
        dimensions,
        performance.now() - startTime
      );

      return {
        originalFile: file,
        compressedBlob,
        originalSize: file.size,
        compressedSize: compressedBlob.size,
        compressionRatio: this.calculateCompressionRatio(file.size, compressedBlob.size),
        format: options.format || this.detectBestFormat(file),
        quality: options.quality || this.getDefaultQuality(options.format),
        metadata
      };

    } catch (error) {
      throw new CompressionError(
        `Compression failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        'COMPRESSION_FAILED',
        undefined,
        error instanceof Error ? error : undefined
      );
    }
  }

  /**
   * Batch compression για πολλαπλά αρχεία
   */
  async compressFiles(
    files: File[],
    options: CompressionOptions = {}
  ): Promise<CompressionResult[]> {
    const results: CompressionResult[] = [];

    for (const file of files) {
      try {
        const result = await this.compressFile(file, options);
        results.push(result);
      } catch (error) {
        console.warn(`Failed to compress file ${file.name}:`, error);
        // Continue με άλλα files
      }
    }

    return results;
  }

  /**
   * Validates file για compression
   */
  private async validateFile(file: File, options: CompressionOptions): Promise<void> {
    // Check if it's an image
    if (!file.type.startsWith('image/')) {
      throw new UnsupportedFormatError(file.type, Object.keys(SUPPORTED_FORMATS));
    }

    // Validate quality
    if (options.quality !== undefined) {
      const format = options.format || this.detectBestFormat(file);
      const formatConfig = SUPPORTED_FORMATS[format];

      if (formatConfig && (
        options.quality < formatConfig.quality.min ||
        options.quality > formatConfig.quality.max
      )) {
        throw new CompressionQualityError(
          options.quality,
          formatConfig.quality.min,
          formatConfig.quality.max
        );
      }
    }

    // Validate file size (100MB max)
    if (file.size > 100 * 1024 * 1024) {
      throw new CompressionError(
        `File too large: ${Math.round(file.size / 1024 / 1024)}MB. Maximum: 100MB`,
        'FILE_TOO_LARGE'
      );
    }
  }

  /**
   * Loads image από file
   */
  private loadImage(file: File): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(file);

      img.onload = () => {
        URL.revokeObjectURL(url);
        resolve(img);
      };

      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new CompressionError('Failed to load image', 'IMAGE_LOAD_FAILED'));
      };

      img.src = url;
    });
  }

  /**
   * Calculates optimal dimensions για resize
   */
  private calculateDimensions(
    img: HTMLImageElement,
    options: CompressionOptions
  ): { width: number; height: number } {
    let { width, height } = img;
    const { maxWidth, maxHeight, maintainAspectRatio = true } = options;

    if (!maxWidth && !maxHeight) {
      return { width, height };
    }

    if (maintainAspectRatio) {
      const aspectRatio = width / height;

      if (maxWidth && width > maxWidth) {
        width = maxWidth;
        height = width / aspectRatio;
      }

      if (maxHeight && height > maxHeight) {
        height = maxHeight;
        width = height * aspectRatio;
      }
    } else {
      if (maxWidth && width > maxWidth) {
        width = maxWidth;
      }
      if (maxHeight && height > maxHeight) {
        height = maxHeight;
      }
    }

    return {
      width: Math.round(width),
      height: Math.round(height)
    };
  }

  /**
   * Sets up canvas με τις νέες διαστάσεις
   */
  private setupCanvas(width: number, height: number): void {
    this.canvas.width = width;
    this.canvas.height = height;

    // Clear canvas
    this.ctx.clearRect(0, 0, width, height);

    // Set high quality rendering
    this.ctx.imageSmoothingEnabled = true;
    this.ctx.imageSmoothingQuality = 'high';
  }

  /**
   * Draws image στο canvas με resizing
   */
  private drawImage(
    img: HTMLImageElement,
    dimensions: { width: number; height: number }
  ): void {
    this.ctx.drawImage(img, 0, 0, dimensions.width, dimensions.height);
  }

  /**
   * Applies optimization techniques
   */
  private async applyOptimizations(options: CompressionOptions): Promise<void> {
    // Apply sharpening για better quality στο resize
    if (options.customSettings?.sharpen) {
      this.applySharpeningFilter();
    }

    // Apply noise reduction
    if (options.customSettings?.deNoise) {
      this.applyNoiseReduction();
    }
  }

  /**
   * Simple sharpening filter
   */
  private applySharpeningFilter(): void {
    const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    const data = imageData.data;

    // Simple unsharp mask implementation
    const sharpenKernel = [
      0, -1, 0,
      -1, 5, -1,
      0, -1, 0
    ];

    this.applyConvolutionFilter(data, this.canvas.width, this.canvas.height, sharpenKernel, 3);
    this.ctx.putImageData(imageData, 0, 0);
  }

  /**
   * Basic noise reduction
   */
  private applyNoiseReduction(): void {
    const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    const data = imageData.data;

    // Gaussian blur για noise reduction
    const blurKernel = [
      1, 2, 1,
      2, 4, 2,
      1, 2, 1
    ];

    this.applyConvolutionFilter(data, this.canvas.width, this.canvas.height, blurKernel, 3, 16);
    this.ctx.putImageData(imageData, 0, 0);
  }

  /**
   * Generic convolution filter
   */
  private applyConvolutionFilter(
    data: Uint8ClampedArray,
    width: number,
    height: number,
    kernel: number[],
    kernelSize: number,
    divisor: number = 1
  ): void {
    const half = Math.floor(kernelSize / 2);
    const newData = new Uint8ClampedArray(data);

    for (let y = half; y < height - half; y++) {
      for (let x = half; x < width - half; x++) {
        let r = 0, g = 0, b = 0;

        for (let ky = 0; ky < kernelSize; ky++) {
          for (let kx = 0; kx < kernelSize; kx++) {
            const py = y + ky - half;
            const px = x + kx - half;
            const pi = (py * width + px) * 4;
            const ki = ky * kernelSize + kx;

            r += (data[pi] ?? 0) * (kernel[ki] ?? 0);
            g += (data[pi + 1] ?? 0) * (kernel[ki] ?? 0);
            b += (data[pi + 2] ?? 0) * (kernel[ki] ?? 0);
          }
        }

        const i = (y * width + x) * 4;
        newData[i] = Math.max(0, Math.min(255, r / divisor));
        newData[i + 1] = Math.max(0, Math.min(255, g / divisor));
        newData[i + 2] = Math.max(0, Math.min(255, b / divisor));
      }
    }

    data.set(newData);
  }

  /**
   * Compresses canvas στο target format
   */
  private compressToFormat(options: CompressionOptions): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const format = options.format || 'jpeg';
      const quality = (options.quality || this.getDefaultQuality(format)) / 100;
      const mimeType = SUPPORTED_FORMATS[format]?.mimeType || 'image/jpeg';

      this.canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new CompressionError('Failed to compress image', 'COMPRESSION_FAILED'));
          }
        },
        mimeType,
        quality
      );
    });
  }

  /**
   * Generates compression metadata
   */
  private generateMetadata(
    originalFile: File,
    options: CompressionOptions,
    dimensions: { width: number; height: number },
    processingTime: number
  ): CompressionMetadata {
    return {
      width: dimensions.width,
      height: dimensions.height,
      originalFormat: originalFile.type,
      targetFormat: SUPPORTED_FORMATS[options.format || 'jpeg']?.mimeType || 'image/jpeg',
      processingTime,
      algorithm: 'canvas-2d'
    };
  }

  /**
   * Helper methods
   */
  private detectBestFormat(file: File): CompressionFormat {
    if (file.type.includes('png') || file.name.toLowerCase().includes('transparent')) {
      return 'webp'; // Supports transparency με better compression
    }
    return 'jpeg'; // Default για photos
  }

  private getDefaultQuality(format?: CompressionFormat): number {
    return SUPPORTED_FORMATS[format || 'jpeg']?.quality.default || 85;
  }

  private calculateCompressionRatio(originalSize: number, compressedSize: number): number {
    return Math.round(((originalSize - compressedSize) / originalSize) * 100 * 100) / 100;
  }

  /**
   * Cleanup resources
   */
  destroy(): void {
    // Cleanup canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}