"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  CompressionEngine: () => CompressionEngine,
  CompressionError: () => CompressionError,
  CompressionQualityError: () => CompressionQualityError,
  UnsupportedFormatError: () => UnsupportedFormatError,
  calculateCompressionScore: () => calculateCompressionScore,
  getOptimalFormat: () => getOptimalFormat,
  recommendOptimizations: () => recommendOptimizations,
  useFileCompression: () => useFileCompression,
  validateBatchOptions: () => validateBatchOptions,
  validateCompressionOptions: () => validateCompressionOptions
});
module.exports = __toCommonJS(index_exports);

// src/hooks/useFileCompression.ts
var import_react = require("react");
var import_notifications = require("@layera/notifications");
var import_i18n = require("@layera/i18n");

// src/types/index.ts
var CompressionError = class extends Error {
  constructor(message, code, fileId, originalError) {
    super(message);
    this.code = code;
    this.fileId = fileId;
    this.originalError = originalError;
    this.name = "CompressionError";
  }
};
var UnsupportedFormatError = class extends CompressionError {
  constructor(format, supportedFormats) {
    super(
      `Unsupported format: ${format}. Supported formats: ${supportedFormats.join(", ")}`,
      "UNSUPPORTED_FORMAT"
    );
  }
};
var CompressionQualityError = class extends CompressionError {
  constructor(quality, minQuality, maxQuality) {
    super(
      `Invalid quality: ${quality}. Must be between ${minQuality} and ${maxQuality}`,
      "INVALID_QUALITY"
    );
  }
};

// src/utils/compressionEngine.ts
var SUPPORTED_FORMATS = {
  jpeg: {
    mimeType: "image/jpeg",
    quality: { min: 10, max: 100, default: 85 },
    supportsTransparency: false
  },
  webp: {
    mimeType: "image/webp",
    quality: { min: 10, max: 100, default: 80 },
    supportsTransparency: true
  },
  avif: {
    mimeType: "image/avif",
    quality: { min: 10, max: 100, default: 75 },
    supportsTransparency: true
  },
  png: {
    mimeType: "image/png",
    quality: { min: 10, max: 100, default: 100 },
    supportsTransparency: true
  }
};
var CompressionEngine = class {
  constructor() {
    __publicField(this, "canvas");
    __publicField(this, "ctx");
    this.canvas = document.createElement("canvas");
    const context = this.canvas.getContext("2d");
    if (!context) {
      throw new CompressionError("Canvas 2D context not supported", "CANVAS_NOT_SUPPORTED");
    }
    this.ctx = context;
  }
  /**
   * Κύρια μέθοδος συμπίεσης αρχείου
   */
  async compressFile(file, options = {}) {
    const startTime = performance.now();
    try {
      await this.validateFile(file, options);
      const img = await this.loadImage(file);
      const dimensions = this.calculateDimensions(img, options);
      this.setupCanvas(dimensions.width, dimensions.height);
      this.drawImage(img, dimensions);
      await this.applyOptimizations(options);
      const compressedBlob = await this.compressToFormat(options);
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
        `Compression failed: ${error instanceof Error ? error.message : "Unknown error"}`,
        "COMPRESSION_FAILED",
        void 0,
        error instanceof Error ? error : void 0
      );
    }
  }
  /**
   * Batch compression για πολλαπλά αρχεία
   */
  async compressFiles(files, options = {}) {
    const results = [];
    for (const file of files) {
      try {
        const result = await this.compressFile(file, options);
        results.push(result);
      } catch (error) {
        console.warn(`Failed to compress file ${file.name}:`, error);
      }
    }
    return results;
  }
  /**
   * Validates file για compression
   */
  async validateFile(file, options) {
    if (!file.type.startsWith("image/")) {
      throw new UnsupportedFormatError(file.type, Object.keys(SUPPORTED_FORMATS));
    }
    if (options.quality !== void 0) {
      const format = options.format || this.detectBestFormat(file);
      const formatConfig = SUPPORTED_FORMATS[format];
      if (formatConfig && (options.quality < formatConfig.quality.min || options.quality > formatConfig.quality.max)) {
        throw new CompressionQualityError(
          options.quality,
          formatConfig.quality.min,
          formatConfig.quality.max
        );
      }
    }
    if (file.size > 100 * 1024 * 1024) {
      throw new CompressionError(
        `File too large: ${Math.round(file.size / 1024 / 1024)}MB. Maximum: 100MB`,
        "FILE_TOO_LARGE"
      );
    }
  }
  /**
   * Loads image από file
   */
  loadImage(file) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        URL.revokeObjectURL(url);
        resolve(img);
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new CompressionError("Failed to load image", "IMAGE_LOAD_FAILED"));
      };
      img.src = url;
    });
  }
  /**
   * Calculates optimal dimensions για resize
   */
  calculateDimensions(img, options) {
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
  setupCanvas(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
    this.ctx.clearRect(0, 0, width, height);
    this.ctx.imageSmoothingEnabled = true;
    this.ctx.imageSmoothingQuality = "high";
  }
  /**
   * Draws image στο canvas με resizing
   */
  drawImage(img, dimensions) {
    this.ctx.drawImage(img, 0, 0, dimensions.width, dimensions.height);
  }
  /**
   * Applies optimization techniques
   */
  async applyOptimizations(options) {
    if (options.customSettings?.sharpen) {
      this.applySharpeningFilter();
    }
    if (options.customSettings?.deNoise) {
      this.applyNoiseReduction();
    }
  }
  /**
   * Simple sharpening filter
   */
  applySharpeningFilter() {
    const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    const data = imageData.data;
    const sharpenKernel = [
      0,
      -1,
      0,
      -1,
      5,
      -1,
      0,
      -1,
      0
    ];
    this.applyConvolutionFilter(data, this.canvas.width, this.canvas.height, sharpenKernel, 3);
    this.ctx.putImageData(imageData, 0, 0);
  }
  /**
   * Basic noise reduction
   */
  applyNoiseReduction() {
    const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    const data = imageData.data;
    const blurKernel = [
      1,
      2,
      1,
      2,
      4,
      2,
      1,
      2,
      1
    ];
    this.applyConvolutionFilter(data, this.canvas.width, this.canvas.height, blurKernel, 3, 16);
    this.ctx.putImageData(imageData, 0, 0);
  }
  /**
   * Generic convolution filter
   */
  applyConvolutionFilter(data, width, height, kernel, kernelSize, divisor = 1) {
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
  compressToFormat(options) {
    return new Promise((resolve, reject) => {
      const format = options.format || "jpeg";
      const quality = (options.quality || this.getDefaultQuality(format)) / 100;
      const mimeType = SUPPORTED_FORMATS[format]?.mimeType || "image/jpeg";
      this.canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new CompressionError("Failed to compress image", "COMPRESSION_FAILED"));
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
  generateMetadata(originalFile, options, dimensions, processingTime) {
    return {
      width: dimensions.width,
      height: dimensions.height,
      originalFormat: originalFile.type,
      targetFormat: SUPPORTED_FORMATS[options.format || "jpeg"]?.mimeType || "image/jpeg",
      processingTime,
      algorithm: "canvas-2d"
    };
  }
  /**
   * Helper methods
   */
  detectBestFormat(file) {
    if (file.type.includes("png") || file.name.toLowerCase().includes("transparent")) {
      return "webp";
    }
    return "jpeg";
  }
  getDefaultQuality(format) {
    return SUPPORTED_FORMATS[format || "jpeg"]?.quality.default || 85;
  }
  calculateCompressionRatio(originalSize, compressedSize) {
    return Math.round((originalSize - compressedSize) / originalSize * 100 * 100) / 100;
  }
  /**
   * Cleanup resources
   */
  destroy() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
};

// src/utils/compressionValidator.ts
var SUPPORTED_FORMATS2 = ["jpeg", "webp", "avif", "png", "original"];
function validateCompressionOptions(options) {
  const errors = [];
  const warnings = [];
  const recommendations = [];
  if (options.quality !== void 0) {
    if (options.quality < 1 || options.quality > 100) {
      errors.push({
        code: "INVALID_QUALITY",
        message: `\u03A0\u03BF\u03B9\u03CC\u03C4\u03B7\u03C4\u03B1 \u03C0\u03C1\u03AD\u03C0\u03B5\u03B9 \u03BD\u03B1 \u03B5\u03AF\u03BD\u03B1\u03B9 \u03BC\u03B5\u03C4\u03B1\u03BE\u03CD 1-100. \u03A4\u03C1\u03AD\u03C7\u03BF\u03C5\u03C3\u03B1: ${options.quality}`,
        severity: "error"
      });
    } else if (options.quality < 50) {
      warnings.push({
        code: "LOW_QUALITY",
        message: "\u03A7\u03B1\u03BC\u03B7\u03BB\u03AE \u03C0\u03BF\u03B9\u03CC\u03C4\u03B7\u03C4\u03B1 \u03BC\u03C0\u03BF\u03C1\u03B5\u03AF \u03BD\u03B1 \u03B5\u03C0\u03B7\u03C1\u03B5\u03AC\u03C3\u03B5\u03B9 \u03C4\u03B7\u03BD \u03B5\u03BC\u03C6\u03AC\u03BD\u03B9\u03C3\u03B7 \u03C4\u03B7\u03C2 \u03B5\u03B9\u03BA\u03CC\u03BD\u03B1\u03C2",
        suggestion: "\u03A3\u03BA\u03B5\u03C6\u03C4\u03B5\u03AF\u03C4\u03B5 \u03BD\u03B1 \u03C7\u03C1\u03B7\u03C3\u03B9\u03BC\u03BF\u03C0\u03BF\u03B9\u03AE\u03C3\u03B5\u03C4\u03B5 \u03C0\u03BF\u03B9\u03CC\u03C4\u03B7\u03C4\u03B1 60-85 \u03B3\u03B9\u03B1 \u03BA\u03B1\u03BB\u03CD\u03C4\u03B5\u03C1\u03B1 \u03B1\u03C0\u03BF\u03C4\u03B5\u03BB\u03AD\u03C3\u03BC\u03B1\u03C4\u03B1"
      });
    } else if (options.quality > 95) {
      warnings.push({
        code: "HIGH_QUALITY",
        message: "\u03A5\u03C8\u03B7\u03BB\u03AE \u03C0\u03BF\u03B9\u03CC\u03C4\u03B7\u03C4\u03B1 \u03BC\u03C0\u03BF\u03C1\u03B5\u03AF \u03BD\u03B1 \u03B4\u03B7\u03BC\u03B9\u03BF\u03C5\u03C1\u03B3\u03AE\u03C3\u03B5\u03B9 \u03BC\u03B5\u03B3\u03AC\u03BB\u03B1 \u03B1\u03C1\u03C7\u03B5\u03AF\u03B1",
        suggestion: "\u03A0\u03BF\u03B9\u03CC\u03C4\u03B7\u03C4\u03B1 80-90 \u03C3\u03C5\u03BD\u03AE\u03B8\u03C9\u03C2 \u03C0\u03B1\u03C1\u03AD\u03C7\u03B5\u03B9 \u03BA\u03B1\u03BB\u03AE \u03B9\u03C3\u03BF\u03C1\u03C1\u03BF\u03C0\u03AF\u03B1 \u03BC\u03B5\u03B3\u03AD\u03B8\u03BF\u03C5\u03C2/\u03C0\u03BF\u03B9\u03CC\u03C4\u03B7\u03C4\u03B1\u03C2"
      });
    }
  }
  if (options.format && !SUPPORTED_FORMATS2.includes(options.format)) {
    errors.push({
      code: "UNSUPPORTED_FORMAT",
      message: `\u039C\u03B7 \u03C5\u03C0\u03BF\u03C3\u03C4\u03B7\u03C1\u03B9\u03B6\u03CC\u03BC\u03B5\u03BD\u03B7 \u03BC\u03BF\u03C1\u03C6\u03AE: ${options.format}`,
      severity: "error"
    });
  }
  if (options.maxWidth !== void 0 && options.maxWidth <= 0) {
    errors.push({
      code: "INVALID_WIDTH",
      message: "\u039C\u03AD\u03B3\u03B9\u03C3\u03C4\u03BF \u03C0\u03BB\u03AC\u03C4\u03BF\u03C2 \u03C0\u03C1\u03AD\u03C0\u03B5\u03B9 \u03BD\u03B1 \u03B5\u03AF\u03BD\u03B1\u03B9 \u03B8\u03B5\u03C4\u03B9\u03BA\u03CC\u03C2 \u03B1\u03C1\u03B9\u03B8\u03BC\u03CC\u03C2",
      severity: "error"
    });
  }
  if (options.maxHeight !== void 0 && options.maxHeight <= 0) {
    errors.push({
      code: "INVALID_HEIGHT",
      message: "\u039C\u03AD\u03B3\u03B9\u03C3\u03C4\u03BF \u03CD\u03C8\u03BF\u03C2 \u03C0\u03C1\u03AD\u03C0\u03B5\u03B9 \u03BD\u03B1 \u03B5\u03AF\u03BD\u03B1\u03B9 \u03B8\u03B5\u03C4\u03B9\u03BA\u03CC\u03C2 \u03B1\u03C1\u03B9\u03B8\u03BC\u03CC\u03C2",
      severity: "error"
    });
  }
  if (options.maxWidth && options.maxWidth > 4e3) {
    recommendations.push({
      type: "dimension",
      message: "\u03A0\u03BF\u03BB\u03CD \u03BC\u03B5\u03B3\u03AC\u03BB\u03BF \u03C0\u03BB\u03AC\u03C4\u03BF\u03C2 - \u03C3\u03BA\u03B5\u03C6\u03C4\u03B5\u03AF\u03C4\u03B5 \u03BC\u03B5\u03AF\u03C9\u03C3\u03B7 \u03B3\u03B9\u03B1 \u03BA\u03B1\u03BB\u03CD\u03C4\u03B5\u03C1\u03B7 \u03B1\u03C0\u03CC\u03B4\u03BF\u03C3\u03B7",
      impact: "medium",
      estimatedSavings: 30
    });
  }
  if (options.maxHeight && options.maxHeight > 4e3) {
    recommendations.push({
      type: "dimension",
      message: "\u03A0\u03BF\u03BB\u03CD \u03BC\u03B5\u03B3\u03AC\u03BB\u03BF \u03CD\u03C8\u03BF\u03C2 - \u03C3\u03BA\u03B5\u03C6\u03C4\u03B5\u03AF\u03C4\u03B5 \u03BC\u03B5\u03AF\u03C9\u03C3\u03B7 \u03B3\u03B9\u03B1 \u03BA\u03B1\u03BB\u03CD\u03C4\u03B5\u03C1\u03B7 \u03B1\u03C0\u03CC\u03B4\u03BF\u03C3\u03B7",
      impact: "medium",
      estimatedSavings: 30
    });
  }
  if (!options.format || options.format === "jpeg") {
    recommendations.push({
      type: "format",
      message: "WebP \u03BC\u03C0\u03BF\u03C1\u03B5\u03AF \u03BD\u03B1 \u03C0\u03B1\u03C1\u03AD\u03C7\u03B5\u03B9 25-30% \u03BA\u03B1\u03BB\u03CD\u03C4\u03B5\u03C1\u03B7 \u03C3\u03C5\u03BC\u03C0\u03AF\u03B5\u03C3\u03B7 \u03B1\u03C0\u03CC JPEG",
      impact: "high",
      estimatedSavings: 25
    });
  }
  if (!options.quality) {
    recommendations.push({
      type: "quality",
      message: "\u039F\u03C1\u03AF\u03C3\u03C4\u03B5 \u03C0\u03BF\u03B9\u03CC\u03C4\u03B7\u03C4\u03B1 \u03B3\u03B9\u03B1 \u03BA\u03B1\u03BB\u03CD\u03C4\u03B5\u03C1\u03BF \u03AD\u03BB\u03B5\u03B3\u03C7\u03BF \u03C4\u03BF\u03C5 \u03BC\u03B5\u03B3\u03AD\u03B8\u03BF\u03C5\u03C2 \u03B1\u03C1\u03C7\u03B5\u03AF\u03BF\u03C5",
      impact: "medium"
    });
  }
  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    recommendations
  };
}
async function recommendOptimizations(file) {
  const recommendations = {};
  const fileSize = file.size;
  const fileName = file.name.toLowerCase();
  const fileType = file.type;
  try {
    const dimensions = await getImageDimensions(file);
    if (fileType.includes("png") && fileName.includes("photo")) {
      recommendations.format = "webp";
      recommendations.quality = 85;
    } else if (fileType.includes("jpeg")) {
      recommendations.format = "webp";
      recommendations.quality = 80;
    } else if (fileType.includes("png")) {
      recommendations.format = "png";
      recommendations.quality = 90;
    } else {
      recommendations.format = "webp";
      recommendations.quality = 80;
    }
    if (fileSize > 5 * 1024 * 1024) {
      recommendations.quality = 70;
      if (dimensions) {
        recommendations.maxWidth = Math.min(dimensions.width, 2e3);
        recommendations.maxHeight = Math.min(dimensions.height, 2e3);
      }
    } else if (fileSize > 2 * 1024 * 1024) {
      recommendations.quality = 75;
      if (dimensions) {
        recommendations.maxWidth = Math.min(dimensions.width, 2500);
        recommendations.maxHeight = Math.min(dimensions.height, 2500);
      }
    } else if (fileSize > 1 * 1024 * 1024) {
      recommendations.quality = 80;
    }
    if (dimensions) {
      if (dimensions.width > 3e3 || dimensions.height > 3e3) {
        recommendations.maxWidth = 2500;
        recommendations.maxHeight = 2500;
        recommendations.maintainAspectRatio = true;
      }
    }
    recommendations.enableProgressive = true;
    recommendations.stripMetadata = true;
  } catch (error) {
    console.warn("Failed to analyze image dimensions:", error);
    recommendations.format = "webp";
    recommendations.quality = 80;
    recommendations.stripMetadata = true;
  }
  return recommendations;
}
function getOptimalFormat(useCase) {
  switch (useCase) {
    case "web":
      return "webp";
    case "print":
      return "jpeg";
    case "archive":
      return "png";
    case "thumbnail":
      return "webp";
    default:
      return "webp";
  }
}
function calculateCompressionScore(originalSize, compressedSize, targetQuality) {
  const compressionRatio = (originalSize - compressedSize) / originalSize;
  const qualityPenalty = targetQuality < 70 ? (70 - targetQuality) / 100 : 0;
  return Math.max(0, Math.min(100, compressionRatio * 100 - qualityPenalty * 20));
}
function getImageDimensions(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({
        width: img.naturalWidth,
        height: img.naturalHeight
      });
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Failed to load image for dimension analysis"));
    };
    img.src = url;
  });
}
function validateBatchOptions(files, options) {
  const errors = [];
  const warnings = [];
  const recommendations = [];
  if (files.length === 0) {
    errors.push({
      code: "NO_FILES",
      message: "\u0394\u03B5\u03BD \u03B5\u03C0\u03B9\u03BB\u03AD\u03C7\u03B8\u03B7\u03BA\u03B1\u03BD \u03B1\u03C1\u03C7\u03B5\u03AF\u03B1 \u03B3\u03B9\u03B1 \u03C3\u03C5\u03BC\u03C0\u03AF\u03B5\u03C3\u03B7",
      severity: "error"
    });
  }
  if (files.length > 50) {
    warnings.push({
      code: "MANY_FILES",
      message: "\u039C\u03B5\u03B3\u03AC\u03BB\u03BF\u03C2 \u03B1\u03C1\u03B9\u03B8\u03BC\u03CC\u03C2 \u03B1\u03C1\u03C7\u03B5\u03AF\u03C9\u03BD \u03BC\u03C0\u03BF\u03C1\u03B5\u03AF \u03BD\u03B1 \u03B5\u03C0\u03B7\u03C1\u03B5\u03AC\u03C3\u03B5\u03B9 \u03C4\u03B7\u03BD \u03B1\u03C0\u03CC\u03B4\u03BF\u03C3\u03B7",
      suggestion: "\u03A3\u03BA\u03B5\u03C6\u03C4\u03B5\u03AF\u03C4\u03B5 \u03BD\u03B1 \u03B5\u03C0\u03B5\u03BE\u03B5\u03C1\u03B3\u03B1\u03C3\u03C4\u03B5\u03AF\u03C4\u03B5 \u03C4\u03B1 \u03B1\u03C1\u03C7\u03B5\u03AF\u03B1 \u03C3\u03B5 \u03BC\u03B9\u03BA\u03C1\u03CC\u03C4\u03B5\u03C1\u03B5\u03C2 \u03BF\u03BC\u03AC\u03B4\u03B5\u03C2"
    });
  }
  const totalSize = files.reduce((sum, file) => sum + file.size, 0);
  if (totalSize > 500 * 1024 * 1024) {
    warnings.push({
      code: "LARGE_BATCH",
      message: "\u039C\u03B5\u03B3\u03AC\u03BB\u03BF \u03C3\u03C5\u03BD\u03BF\u03BB\u03B9\u03BA\u03CC \u03BC\u03AD\u03B3\u03B5\u03B8\u03BF\u03C2 \u03B1\u03C1\u03C7\u03B5\u03AF\u03C9\u03BD - \u03B7 \u03B5\u03C0\u03B5\u03BE\u03B5\u03C1\u03B3\u03B1\u03C3\u03AF\u03B1 \u03BC\u03C0\u03BF\u03C1\u03B5\u03AF \u03BD\u03B1 \u03C0\u03AC\u03C1\u03B5\u03B9 \u03B1\u03C1\u03BA\u03B5\u03C4\u03CC \u03C7\u03C1\u03CC\u03BD\u03BF",
      suggestion: "\u0395\u03C0\u03B5\u03BE\u03B5\u03C1\u03B3\u03B1\u03C3\u03C4\u03B5\u03AF\u03C4\u03B5 \u03C4\u03B1 \u03B1\u03C1\u03C7\u03B5\u03AF\u03B1 \u03C3\u03B5 \u03BC\u03B9\u03BA\u03C1\u03CC\u03C4\u03B5\u03C1\u03B5\u03C2 \u03BF\u03BC\u03AC\u03B4\u03B5\u03C2 \u03B3\u03B9\u03B1 \u03BA\u03B1\u03BB\u03CD\u03C4\u03B5\u03C1\u03B7 \u03B1\u03C0\u03CC\u03B4\u03BF\u03C3\u03B7"
    });
  }
  const optionsValidation = validateCompressionOptions(options);
  errors.push(...optionsValidation.errors);
  warnings.push(...optionsValidation.warnings);
  recommendations.push(...optionsValidation.recommendations);
  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    recommendations
  };
}

// src/hooks/useFileCompression.ts
function useFileCompression(options = {}) {
  const { t } = (0, import_i18n.useLayeraTranslation)();
  const { addNotification } = (0, import_notifications.useNotifications)();
  const [isCompressing, setIsCompressing] = (0, import_react.useState)(false);
  const [progress, setProgress] = (0, import_react.useState)(0);
  const [results, setResults] = (0, import_react.useState)([]);
  const [errors, setErrors] = (0, import_react.useState)([]);
  const engineRef = (0, import_react.useRef)(null);
  const abortControllerRef = (0, import_react.useRef)(null);
  const {
    defaultOptions = {},
    maxConcurrentFiles = 3,
    showNotifications = true,
    onProgress,
    onComplete,
    onError
  } = options;
  (0, import_react.useEffect)(() => {
    try {
      engineRef.current = new CompressionEngine();
    } catch (error) {
      console.error("Failed to initialize compression engine:", error);
      if (showNotifications) {
        addNotification({
          type: "error",
          message: t("compression.engine.init.error")
        });
      }
    }
    return () => {
      if (engineRef.current) {
        engineRef.current.destroy();
      }
    };
  }, [showNotifications, t]);
  const reportProgress = (0, import_react.useCallback)((fileId, stage, progress2, message) => {
    const progressData = {
      fileId,
      stage,
      progress: progress2,
      message
    };
    setProgress(progress2);
    onProgress?.(progressData);
    if (showNotifications && stage === "complete") {
      addNotification({
        type: "success",
        message: t("compression.file.success", { progress: Math.round(progress2) }),
        duration: 3e3
      });
    }
  }, [onProgress, showNotifications, t]);
  const handleError = (0, import_react.useCallback)((error) => {
    setErrors((prev) => [...prev, error]);
    onError?.(error);
    if (showNotifications) {
      addNotification({
        type: "error",
        message: t("compression.file.error", {
          error: error.message
        }),
        duration: 5e3
      });
    }
  }, [onError, showNotifications, t]);
  const compressFile = (0, import_react.useCallback)(async (file, compressionOptions) => {
    if (!engineRef.current) {
      throw new CompressionError(
        "Compression engine not initialized",
        "ENGINE_NOT_INITIALIZED"
      );
    }
    const fileId = `compress-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const finalOptions = { ...defaultOptions, ...compressionOptions };
    try {
      setIsCompressing(true);
      reportProgress(fileId, "analyzing", 10, t("compression.analyzing.file"));
      const validation = validateCompressionOptions(finalOptions);
      if (!validation.isValid) {
        throw new CompressionError(
          validation.errors.map((e) => e.message).join(", "),
          "VALIDATION_FAILED"
        );
      }
      if (validation.warnings.length > 0 && showNotifications) {
        validation.warnings.forEach((warning) => {
          addNotification({
            type: "warning",
            message: warning.message,
            duration: 4e3,
            ...warning.suggestion && {
              action: { label: t("compression.suggestion"), onClick: () => {
              } }
            }
          });
        });
      }
      reportProgress(fileId, "compressing", 50, t("compression.compressing.file"));
      const result = await engineRef.current.compressFile(file, finalOptions);
      reportProgress(fileId, "complete", 100, t("compression.completed"));
      setResults((prev) => [...prev, result]);
      return result;
    } catch (error) {
      const compressionError = error instanceof CompressionError ? error : new CompressionError(
        error instanceof Error ? error.message : "Unknown compression error",
        "COMPRESSION_FAILED",
        fileId
      );
      handleError(compressionError);
      throw compressionError;
    } finally {
      setIsCompressing(false);
      setProgress(0);
    }
  }, [defaultOptions, reportProgress, handleError, showNotifications, t]);
  const compressFiles = (0, import_react.useCallback)(async (files, batchOptions) => {
    if (!engineRef.current) {
      throw new CompressionError(
        "Compression engine not initialized",
        "ENGINE_NOT_INITIALIZED"
      );
    }
    const startTime = performance.now();
    const batchResults = [];
    const batchErrors = [];
    const {
      maxConcurrentFiles: batchMaxConcurrent = maxConcurrentFiles,
      stopOnError = false,
      onFileComplete,
      onFileError,
      ...compressionOptions
    } = batchOptions || {};
    try {
      setIsCompressing(true);
      abortControllerRef.current = new AbortController();
      for (let i = 0; i < files.length; i += batchMaxConcurrent) {
        if (abortControllerRef.current.signal.aborted) {
          break;
        }
        const chunk = files.slice(i, i + batchMaxConcurrent);
        const overallProgress = (i + chunk.length) / files.length * 100;
        setProgress(overallProgress);
        const chunkPromises = chunk.map(async (file) => {
          try {
            const result = await compressFile(file, compressionOptions);
            batchResults.push(result);
            onFileComplete?.(result);
            return result;
          } catch (error) {
            const compressionError = error instanceof CompressionError ? error : new CompressionError(
              error instanceof Error ? error.message : "Unknown error",
              "FILE_COMPRESSION_FAILED"
            );
            batchErrors.push(compressionError);
            onFileError?.(compressionError);
            if (stopOnError) {
              throw compressionError;
            }
            return null;
          }
        });
        await Promise.all(chunkPromises);
      }
      const processingTime = performance.now() - startTime;
      const totalOriginalSize = batchResults.reduce((sum, r) => sum + r.originalSize, 0);
      const totalCompressedSize = batchResults.reduce((sum, r) => sum + r.compressedSize, 0);
      const batchResult = {
        results: batchResults,
        errors: batchErrors,
        totalOriginalSize,
        totalCompressedSize,
        overallCompressionRatio: totalOriginalSize > 0 ? Math.round((totalOriginalSize - totalCompressedSize) / totalOriginalSize * 100 * 100) / 100 : 0,
        processingTime
      };
      onComplete?.(batchResults);
      if (showNotifications) {
        addNotification({
          type: "success",
          message: t("compression.batch.complete", {
            successful: batchResults.length,
            total: files.length,
            savings: batchResult.overallCompressionRatio
          }),
          duration: 5e3
        });
      }
      return batchResult;
    } finally {
      setIsCompressing(false);
      setProgress(0);
      abortControllerRef.current = null;
    }
  }, [compressFile, maxConcurrentFiles, onComplete, showNotifications, t]);
  const cancelCompression = (0, import_react.useCallback)(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setIsCompressing(false);
      setProgress(0);
      if (showNotifications) {
        addNotification({
          type: "info",
          message: t("compression.cancelled")
        });
      }
    }
  }, [showNotifications, t]);
  const clearResults = (0, import_react.useCallback)(() => {
    setResults([]);
    setErrors([]);
    setProgress(0);
  }, []);
  const validateOptions = (0, import_react.useCallback)((options2) => {
    return validateCompressionOptions(options2);
  }, []);
  const getRecommendations = (0, import_react.useCallback)(async (file) => {
    return recommendOptimizations(file);
  }, []);
  const estimateCompression = (0, import_react.useCallback)(async (file, options2) => {
    const baseRatio = options2.quality ? (100 - options2.quality) / 100 : 0.3;
    const formatMultiplier = options2.format === "webp" ? 0.8 : options2.format === "avif" ? 0.7 : 1;
    const estimatedRatio = baseRatio * formatMultiplier;
    const estimatedSize = Math.round(file.size * (1 - estimatedRatio));
    return {
      estimatedSize,
      estimatedRatio: Math.round(estimatedRatio * 100 * 100) / 100
    };
  }, []);
  return {
    // State
    isCompressing,
    progress,
    results,
    errors,
    // Actions
    compressFile,
    compressFiles,
    cancelCompression,
    clearResults,
    // Validation & optimization
    validateOptions,
    getRecommendations,
    estimateCompression
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CompressionEngine,
  CompressionError,
  CompressionQualityError,
  UnsupportedFormatError,
  calculateCompressionScore,
  getOptimalFormat,
  recommendOptimizations,
  useFileCompression,
  validateBatchOptions,
  validateCompressionOptions
});
//# sourceMappingURL=index.js.map