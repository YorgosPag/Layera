"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  DragDropZone: () => DragDropZone,
  FileImportError: () => FileImportError,
  FileImporter: () => FileImporter,
  FileList: () => FileList,
  FilePreview: () => FilePreview,
  FileSizeError: () => FileSizeError,
  FileTypeError: () => FileTypeError,
  SUPPORTED_FILE_TYPES: () => SUPPORTED_FILE_TYPES,
  detectFileType: () => detectFileType,
  extractFileMetadata: () => extractFileMetadata,
  useFileImport: () => useFileImport,
  validateFile: () => validateFile
});
module.exports = __toCommonJS(index_exports);

// src/components/FileImporter.tsx
var import_react6 = __toESM(require("react"));
var import_cards4 = require("@layera/cards");
var import_buttons3 = require("@layera/buttons");
var import_loading3 = require("@layera/loading");
var import_i18n2 = require("@layera/i18n");
var import_error_boundary = require("@layera/error-boundary");

// ../typography/src/components/Text.tsx
var import_jsx_runtime = require("react/jsx-runtime");
var Text = ({
  size = "base",
  weight = "normal",
  align = "left",
  color = "secondary",
  lineHeight = "normal",
  className = "",
  as: Component = "p",
  children,
  ...props
}) => {
  const classes = [
    "layera-text",
    `layera-text-${size}`,
    `layera-font-${weight}`,
    `layera-text-${align}`,
    `layera-text-${color}`,
    `layera-leading-${lineHeight}`,
    className
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Component, { className: classes, ...props, children });
};
Text.displayName = "LayeraText";

// ../typography/src/components/Heading.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var Heading = ({
  size = "2xl",
  weight = "semibold",
  align = "left",
  color = "primary",
  lineHeight = "tight",
  className = "",
  as: Component = "h2",
  children,
  ...props
}) => {
  const getDefaultStylesForLevel = () => {
    switch (Component) {
      case "h1":
        return {
          size: "4xl",
          weight: "extrabold",
          lineHeight: "tight"
        };
      case "h2":
        return {
          size: "3xl",
          weight: "bold",
          lineHeight: "tight"
        };
      case "h3":
        return {
          size: "2xl",
          weight: "semibold",
          lineHeight: "snug"
        };
      case "h4":
        return {
          size: "xl",
          weight: "semibold",
          lineHeight: "snug"
        };
      case "h5":
        return {
          size: "lg",
          weight: "medium",
          lineHeight: "normal"
        };
      case "h6":
        return {
          size: "base",
          weight: "medium",
          lineHeight: "normal"
        };
      default:
        return { size, weight, lineHeight };
    }
  };
  const defaults = getDefaultStylesForLevel();
  const finalSize = size || defaults.size;
  const finalWeight = weight || defaults.weight;
  const finalLineHeight = lineHeight || defaults.lineHeight;
  const classes = [
    "layera-text",
    `layera-text-${finalSize}`,
    `layera-font-${finalWeight}`,
    `layera-text-${align}`,
    `layera-text-${color}`,
    `layera-leading-${finalLineHeight}`,
    className
  ].filter(Boolean).join(" ");
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Component, { className: classes, ...props, children });
};
Heading.displayName = "LayeraHeading";

// ../typography/src/hooks/useTypography.ts
var import_react = require("react");

// src/hooks/useFileImport.ts
var import_react2 = require("react");
var import_notifications = require("@layera/notifications");
var import_i18n = require("@layera/i18n");

// src/types/index.ts
var FileImportError = class extends Error {
  constructor(message, code, fileId) {
    super(message);
    this.code = code;
    this.fileId = fileId;
    this.name = "FileImportError";
  }
};
var FileSizeError = class extends FileImportError {
  constructor(filename, size, maxSize) {
    super(
      `File ${filename} (${Math.round(size / 1024 / 1024)}MB) exceeds maximum size of ${Math.round(maxSize / 1024 / 1024)}MB`,
      "FILE_TOO_LARGE"
    );
  }
};
var FileTypeError = class extends FileImportError {
  constructor(filename, type, allowedTypes) {
    super(
      `File ${filename} has unsupported type ${type}. Allowed types: ${allowedTypes.join(", ")}`,
      "UNSUPPORTED_FILE_TYPE"
    );
  }
};

// src/utils/fileValidation.ts
var SUPPORTED_FILE_TYPES = {
  // CAD files
  dxf: {
    mimeTypes: ["application/dxf", "image/vnd.dxf", "text/plain"],
    maxSize: 500 * 1024 * 1024,
    // 500MB
    description: "AutoCAD Drawing Exchange Format",
    category: "cad"
  },
  dwg: {
    mimeTypes: ["application/acad", "application/dwg", "application/x-dwg"],
    maxSize: 500 * 1024 * 1024,
    // 500MB
    description: "AutoCAD Drawing",
    category: "cad"
  },
  // Documents
  pdf: {
    mimeTypes: ["application/pdf"],
    maxSize: 200 * 1024 * 1024,
    // 200MB
    description: "Portable Document Format",
    category: "document"
  },
  // Images
  jpg: {
    mimeTypes: ["image/jpeg"],
    maxSize: 50 * 1024 * 1024,
    // 50MB
    description: "JPEG Image",
    category: "image"
  },
  jpeg: {
    mimeTypes: ["image/jpeg"],
    maxSize: 50 * 1024 * 1024,
    // 50MB
    description: "JPEG Image",
    category: "image"
  },
  png: {
    mimeTypes: ["image/png"],
    maxSize: 50 * 1024 * 1024,
    // 50MB
    description: "PNG Image",
    category: "image"
  },
  webp: {
    mimeTypes: ["image/webp"],
    maxSize: 50 * 1024 * 1024,
    // 50MB
    description: "WebP Image",
    category: "image"
  },
  tiff: {
    mimeTypes: ["image/tiff", "image/tif"],
    maxSize: 100 * 1024 * 1024,
    // 100MB
    description: "TIFF Image",
    category: "image"
  },
  bmp: {
    mimeTypes: ["image/bmp"],
    maxSize: 25 * 1024 * 1024,
    // 25MB
    description: "Bitmap Image",
    category: "image"
  },
  // Vector graphics
  svg: {
    mimeTypes: ["image/svg+xml"],
    maxSize: 10 * 1024 * 1024,
    // 10MB
    description: "Scalable Vector Graphics",
    category: "vector"
  }
};
async function validateFile(file, rules) {
  const errors = [];
  const warnings = [];
  if (file.size > rules.maxSize) {
    errors.push({
      code: "FILE_TOO_LARGE",
      message: `\u03A4\u03BF \u03B1\u03C1\u03C7\u03B5\u03AF\u03BF \u03B5\u03AF\u03BD\u03B1\u03B9 \u03C0\u03BF\u03BB\u03CD \u03BC\u03B5\u03B3\u03AC\u03BB\u03BF (${formatFileSize(file.size)}). \u039C\u03AD\u03B3\u03B9\u03C3\u03C4\u03BF \u03B5\u03C0\u03B9\u03C4\u03C1\u03B5\u03C0\u03C4\u03CC \u03BC\u03AD\u03B3\u03B5\u03B8\u03BF\u03C2: ${formatFileSize(rules.maxSize)}`,
      severity: "error"
    });
  }
  if (rules.minSize && file.size < rules.minSize) {
    errors.push({
      code: "FILE_TOO_SMALL",
      message: `\u03A4\u03BF \u03B1\u03C1\u03C7\u03B5\u03AF\u03BF \u03B5\u03AF\u03BD\u03B1\u03B9 \u03C0\u03BF\u03BB\u03CD \u03BC\u03B9\u03BA\u03C1\u03CC (${formatFileSize(file.size)}). \u0395\u03BB\u03AC\u03C7\u03B9\u03C3\u03C4\u03BF \u03B5\u03C0\u03B9\u03C4\u03C1\u03B5\u03C0\u03C4\u03CC \u03BC\u03AD\u03B3\u03B5\u03B8\u03BF\u03C2: ${formatFileSize(rules.minSize)}`,
      severity: "error"
    });
  }
  const fileExtension = getFileExtension(file.name).toLowerCase();
  if (!rules.allowedExtensions.includes(fileExtension)) {
    errors.push({
      code: "UNSUPPORTED_FILE_TYPE",
      message: `\u039C\u03B7 \u03C5\u03C0\u03BF\u03C3\u03C4\u03B7\u03C1\u03B9\u03B6\u03CC\u03BC\u03B5\u03BD\u03BF\u03C2 \u03C4\u03CD\u03C0\u03BF\u03C2 \u03B1\u03C1\u03C7\u03B5\u03AF\u03BF\u03C5: .${fileExtension}. \u0395\u03C0\u03B9\u03C4\u03C1\u03B5\u03C0\u03C4\u03BF\u03AF \u03C4\u03CD\u03C0\u03BF\u03B9: ${rules.allowedExtensions.map((ext) => `.${ext}`).join(", ")}`,
      severity: "error"
    });
  }
  if (rules.allowedMimeTypes && rules.allowedMimeTypes.length > 0) {
    if (!rules.allowedMimeTypes.includes(file.type)) {
      warnings.push({
        code: "MIME_TYPE_MISMATCH",
        message: `\u03A4\u03BF MIME type \u03C4\u03BF\u03C5 \u03B1\u03C1\u03C7\u03B5\u03AF\u03BF\u03C5 (${file.type}) \u03B4\u03B5\u03BD \u03C4\u03B1\u03B9\u03C1\u03B9\u03AC\u03B6\u03B5\u03B9 \u03BC\u03B5 \u03C4\u03B7\u03BD \u03B5\u03C0\u03AD\u03BA\u03C4\u03B1\u03C3\u03B7`,
        suggestion: "\u0395\u03BB\u03AD\u03B3\u03BE\u03C4\u03B5 \u03B1\u03BD \u03C4\u03BF \u03B1\u03C1\u03C7\u03B5\u03AF\u03BF \u03AD\u03C7\u03B5\u03B9 \u03C4\u03B7 \u03C3\u03C9\u03C3\u03C4\u03AE \u03B5\u03C0\u03AD\u03BA\u03C4\u03B1\u03C3\u03B7"
      });
    }
  }
  if (!isValidFileName(file.name)) {
    warnings.push({
      code: "INVALID_FILENAME",
      message: "\u03A4\u03BF \u03CC\u03BD\u03BF\u03BC\u03B1 \u03C4\u03BF\u03C5 \u03B1\u03C1\u03C7\u03B5\u03AF\u03BF\u03C5 \u03C0\u03B5\u03C1\u03B9\u03AD\u03C7\u03B5\u03B9 \u03BC\u03B7 \u03B5\u03C0\u03B9\u03C4\u03C1\u03B5\u03C0\u03C4\u03BF\u03CD\u03C2 \u03C7\u03B1\u03C1\u03B1\u03BA\u03C4\u03AE\u03C1\u03B5\u03C2",
      suggestion: "\u03A7\u03C1\u03B7\u03C3\u03B9\u03BC\u03BF\u03C0\u03BF\u03B9\u03AE\u03C3\u03C4\u03B5 \u03BC\u03CC\u03BD\u03BF \u03B3\u03C1\u03AC\u03BC\u03BC\u03B1\u03C4\u03B1, \u03B1\u03C1\u03B9\u03B8\u03BC\u03BF\u03CD\u03C2, \u03C0\u03B1\u03CD\u03BB\u03B5\u03C2 \u03BA\u03B1\u03B9 \u03BA\u03AC\u03C4\u03C9 \u03C0\u03B1\u03CD\u03BB\u03B5\u03C2"
    });
  }
  const fileTypeInfo = SUPPORTED_FILE_TYPES[fileExtension];
  if (fileTypeInfo && file.size > fileTypeInfo.maxSize * 0.8) {
    warnings.push({
      code: "LARGE_FILE_WARNING",
      message: `\u039C\u03B5\u03B3\u03AC\u03BB\u03BF \u03B1\u03C1\u03C7\u03B5\u03AF\u03BF - \u03B7 \u03B5\u03C0\u03B5\u03BE\u03B5\u03C1\u03B3\u03B1\u03C3\u03AF\u03B1 \u03BC\u03C0\u03BF\u03C1\u03B5\u03AF \u03BD\u03B1 \u03B5\u03AF\u03BD\u03B1\u03B9 \u03B1\u03C1\u03B3\u03AE`,
      suggestion: "\u03A3\u03BA\u03B5\u03C6\u03C4\u03B5\u03AF\u03C4\u03B5 \u03BD\u03B1 \u03C3\u03C5\u03BC\u03C0\u03B9\u03AD\u03C3\u03B5\u03C4\u03B5 \u03C4\u03BF \u03B1\u03C1\u03C7\u03B5\u03AF\u03BF \u03C0\u03C1\u03B9\u03BD \u03C4\u03B7\u03BD \u03B5\u03B9\u03C3\u03B1\u03B3\u03C9\u03B3\u03AE"
    });
  }
  if (rules.customValidator) {
    try {
      const customResult = await rules.customValidator(file);
      errors.push(...customResult.errors);
      warnings.push(...customResult.warnings);
    } catch (error) {
      errors.push({
        code: "CUSTOM_VALIDATION_ERROR",
        message: `\u03A3\u03C6\u03AC\u03BB\u03BC\u03B1 \u03C3\u03C4\u03B7\u03BD \u03C0\u03C1\u03BF\u03C3\u03B1\u03C1\u03BC\u03BF\u03C3\u03BC\u03AD\u03BD\u03B7 \u03B5\u03C0\u03B9\u03BA\u03CD\u03C1\u03C9\u03C3\u03B7: ${error instanceof Error ? error.message : "\u0386\u03B3\u03BD\u03C9\u03C3\u03C4\u03BF \u03C3\u03C6\u03AC\u03BB\u03BC\u03B1"}`,
        severity: "error"
      });
    }
  }
  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}
function detectFileType(file) {
  const extension = getFileExtension(file.name).toLowerCase();
  const fileTypeInfo = SUPPORTED_FILE_TYPES[extension];
  if (!fileTypeInfo) {
    return {
      detectedType: "unknown",
      confidence: 0,
      category: "unknown"
    };
  }
  let confidence = 0.7;
  if (fileTypeInfo.mimeTypes.includes(file.type)) {
    confidence += 0.3;
  }
  return {
    detectedType: extension,
    confidence,
    category: fileTypeInfo.category
  };
}
async function extractFileMetadata(file) {
  const metadata = {
    name: file.name,
    size: file.size,
    type: file.type || detectMimeTypeFromExtension(file.name),
    lastModified: file.lastModified
  };
  const fileType = detectFileType(file);
  if (fileType.category === "image") {
    try {
      const dimensions = await getImageDimensions(file);
      return { ...metadata, dimensions };
    } catch (error) {
      console.warn("Failed to extract image dimensions:", error);
    }
  }
  return metadata;
}
function getFileExtension(filename) {
  const lastDot = filename.lastIndexOf(".");
  return lastDot === -1 ? "" : filename.slice(lastDot + 1);
}
function formatFileSize(bytes) {
  const units = ["B", "KB", "MB", "GB"];
  let size = bytes;
  let unitIndex = 0;
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }
  return `${size.toFixed(1)} ${units[unitIndex]}`;
}
function isValidFileName(filename) {
  const validPattern = /^[a-zA-Z0-9\s._-]+$/;
  return validPattern.test(filename) && filename.length <= 255;
}
function detectMimeTypeFromExtension(filename) {
  const extension = getFileExtension(filename).toLowerCase();
  const fileTypeInfo = SUPPORTED_FILE_TYPES[extension];
  return fileTypeInfo?.mimeTypes[0] || "application/octet-stream";
}
async function getImageDimensions(file) {
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
      reject(new Error("Failed to load image for dimension extraction"));
    };
    img.src = url;
  });
}

// src/hooks/useFileImport.ts
function useFileImport(options = {}) {
  const { t } = (0, import_i18n.useLayeraTranslation)();
  const { addNotification } = (0, import_notifications.useNotifications)();
  const [files, setFiles] = (0, import_react2.useState)([]);
  const [isProcessing, setIsProcessing] = (0, import_react2.useState)(false);
  const [progress, setProgress] = (0, import_react2.useState)(0);
  const [error, setError] = (0, import_react2.useState)(null);
  const abortControllerRef = (0, import_react2.useRef)(null);
  const {
    allowedFormats,
    maxFileSize = 100 * 1024 * 1024,
    // 100MB default
    maxFiles = 10,
    showNotifications = true,
    onProgress,
    onComplete,
    onError
  } = options;
  const validationRules = {
    maxSize: maxFileSize,
    allowedExtensions: allowedFormats || Object.keys(SUPPORTED_FILE_TYPES),
    allowedMimeTypes: allowedFormats ? allowedFormats.flatMap((format) => SUPPORTED_FILE_TYPES[format]?.mimeTypes || []) : []
  };
  const generateFileId = (0, import_react2.useCallback)(() => {
    return `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }, []);
  const updateFileStatus = (0, import_react2.useCallback)((fileId, updates) => {
    setFiles((prev) => prev.map(
      (f) => f.id === fileId ? { ...f, ...updates } : f
    ));
  }, []);
  const reportProgress = (0, import_react2.useCallback)((fileId, progress2, stage, message) => {
    const progressData = {
      fileId,
      stage,
      progress: progress2,
      message
    };
    updateFileStatus(fileId, { progress: progress2 });
    onProgress?.(progressData);
  }, [updateFileStatus, onProgress]);
  const processFile = (0, import_react2.useCallback)(async (file) => {
    const fileId = generateFileId();
    const importedFile = {
      id: fileId,
      file,
      metadata: { name: file.name, size: file.size, type: file.type, lastModified: file.lastModified },
      status: "pending",
      progress: 0
    };
    setFiles((prev) => [...prev, importedFile]);
    try {
      reportProgress(fileId, 10, "validation", t("file.import.validating"));
      updateFileStatus(fileId, { status: "processing" });
      const validationResult = await validateFile(file, validationRules);
      if (!validationResult.isValid) {
        const errorMessage = validationResult.errors.map((e) => e.message).join(", ");
        throw new FileImportError(errorMessage, "VALIDATION_FAILED", fileId);
      }
      if (validationResult.warnings.length > 0 && showNotifications) {
        validationResult.warnings.forEach((warning) => {
          addNotification({
            type: "warning",
            message: warning.message,
            duration: 4e3,
            ...warning.suggestion && {
              action: { label: t("file.import.suggestion"), onClick: () => {
              } }
            }
          });
        });
      }
      reportProgress(fileId, 30, "processing", t("file.import.extracting.metadata"));
      const metadata = await extractFileMetadata(file);
      reportProgress(fileId, 60, "processing", t("file.import.reading.file"));
      const processedData = await file.arrayBuffer();
      let previewUrl = "";
      if (metadata.type.startsWith("image/")) {
        reportProgress(fileId, 80, "preview", t("file.import.generating.preview"));
        previewUrl = URL.createObjectURL(file);
      }
      reportProgress(fileId, 100, "complete", t("file.import.completed"));
      const completedFile = {
        ...importedFile,
        metadata,
        status: "completed",
        progress: 100,
        processedData,
        previewUrl
      };
      updateFileStatus(fileId, completedFile);
      if (showNotifications) {
        addNotification({
          type: "success",
          message: t("file.import.success", { filename: file.name }),
          duration: 3e3
        });
      }
      return completedFile;
    } catch (error2) {
      const errorMessage = error2 instanceof Error ? error2.message : t("file.import.unknown.error");
      updateFileStatus(fileId, {
        status: "error",
        error: errorMessage
      });
      if (showNotifications) {
        addNotification({
          type: "error",
          message: t("file.import.failed", {
            filename: file.name,
            error: errorMessage
          }),
          duration: 5e3,
          action: { label: t("file.import.retry"), onClick: () => retryFile(fileId) }
        });
      }
      const fileError = error2 instanceof FileImportError ? error2 : new FileImportError(errorMessage, "PROCESSING_FAILED", fileId);
      onError?.(fileError);
      throw fileError;
    }
  }, [generateFileId, validationRules, reportProgress, updateFileStatus, showNotifications, onError, t]);
  const importFiles = (0, import_react2.useCallback)(async (fileList) => {
    const filesArray = Array.from(fileList);
    if (files.length + filesArray.length > maxFiles) {
      const error2 = new FileImportError(
        t("file.import.too.many.files", { max: maxFiles }),
        "TOO_MANY_FILES"
      );
      if (showNotifications) {
        addNotification({
          type: "error",
          message: error2.message
        });
      }
      onError?.(error2);
      throw error2;
    }
    setIsProcessing(true);
    setError(null);
    abortControllerRef.current = new AbortController();
    const processedFiles = [];
    try {
      for (let i = 0; i < filesArray.length; i++) {
        if (abortControllerRef.current?.signal.aborted) {
          break;
        }
        const file = filesArray[i];
        const overallProgress = (i + 1) / filesArray.length * 100;
        setProgress(overallProgress);
        try {
          const processedFile = await processFile(file);
          processedFiles.push(processedFile);
        } catch (error2) {
          console.warn(`Failed to process file ${file.name}:`, error2);
        }
      }
      onComplete?.(processedFiles);
      return processedFiles;
    } finally {
      setIsProcessing(false);
      setProgress(0);
      abortControllerRef.current = null;
    }
  }, [files.length, maxFiles, processFile, onComplete, onError, showNotifications, t]);
  const importSingleFile = (0, import_react2.useCallback)(async (file) => {
    return processFile(file);
  }, [processFile]);
  const removeFile = (0, import_react2.useCallback)((fileId) => {
    setFiles((prev) => {
      const file = prev.find((f) => f.id === fileId);
      if (file?.previewUrl) {
        URL.revokeObjectURL(file.previewUrl);
      }
      return prev.filter((f) => f.id !== fileId);
    });
  }, []);
  const clearFiles = (0, import_react2.useCallback)(() => {
    files.forEach((file) => {
      if (file.previewUrl) {
        URL.revokeObjectURL(file.previewUrl);
      }
    });
    setFiles([]);
    setError(null);
    setProgress(0);
  }, [files]);
  const retryFile = (0, import_react2.useCallback)(async (fileId) => {
    const file = files.find((f) => f.id === fileId);
    if (!file) {
      console.warn(`File with id ${fileId} not found for retry`);
      return;
    }
    removeFile(fileId);
    await processFile(file.file);
  }, [files, removeFile, processFile]);
  const validateFiles = (0, import_react2.useCallback)(async (fileList) => {
    const filesArray = Array.from(fileList);
    for (const file of filesArray) {
      const result = await validateFile(file, validationRules);
      if (!result.isValid) {
        return false;
      }
    }
    return true;
  }, [validationRules]);
  const isFileSupported = (0, import_react2.useCallback)((file) => {
    const extension = file.name.split(".").pop()?.toLowerCase();
    return extension ? validationRules.allowedExtensions.includes(extension) : false;
  }, [validationRules.allowedExtensions]);
  return {
    // State
    files,
    isProcessing,
    progress,
    error,
    // Actions
    importFiles,
    importSingleFile,
    removeFile,
    clearFiles,
    retryFile,
    // Validation
    validateFiles,
    isFileSupported
  };
}

// src/components/DragDropZone.tsx
var import_react3 = require("react");
var import_cards = require("@layera/cards");
var import_hooks2 = require("@layera/i18n/hooks");
var import_jsx_runtime3 = require("react/jsx-runtime");
var DragDropZone = ({
  children,
  onFilesDrop,
  acceptedFormats,
  disabled = false,
  maxFiles = 10,
  compact = false,
  showHelper = true,
  className = ""
}) => {
  const { t } = (0, import_hooks2.useLayeraTranslation)();
  const [dragState, setDragState] = (0, import_react3.useState)({
    isDragging: false,
    isOver: false,
    canDrop: false
  });
  const dragCounterRef = (0, import_react3.useRef)(0);
  const validateDroppedFiles = (0, import_react3.useCallback)((files) => {
    const filesArray = Array.from(files);
    if (filesArray.length > maxFiles) {
      return false;
    }
    return filesArray.every((file) => {
      const extension = file.name.split(".").pop()?.toLowerCase();
      return extension && acceptedFormats.includes(extension);
    });
  }, [acceptedFormats, maxFiles]);
  const handleDragEnter = (0, import_react3.useCallback)((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;
    dragCounterRef.current++;
    if (e.dataTransfer?.items) {
      const canDrop = Array.from(e.dataTransfer.items).every((item) => {
        if (item.kind === "file") {
          const extension = item.type.split("/").pop();
          return extension && acceptedFormats.some(
            (format) => item.type.includes(format) || extension === format
          );
        }
        return false;
      });
      setDragState({
        isDragging: true,
        isOver: true,
        canDrop
      });
    }
  }, [disabled, acceptedFormats]);
  const handleDragOver = (0, import_react3.useCallback)((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;
    e.dataTransfer.dropEffect = dragState.canDrop ? "copy" : "none";
  }, [disabled, dragState.canDrop]);
  const handleDragLeave = (0, import_react3.useCallback)((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;
    dragCounterRef.current--;
    if (dragCounterRef.current === 0) {
      setDragState({
        isDragging: false,
        isOver: false,
        canDrop: false
      });
    }
  }, [disabled]);
  const handleDrop = (0, import_react3.useCallback)((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;
    dragCounterRef.current = 0;
    setDragState({
      isDragging: false,
      isOver: false,
      canDrop: false
    });
    const files = e.dataTransfer?.files;
    if (files && files.length > 0) {
      if (validateDroppedFiles(files)) {
        onFilesDrop(files);
      }
    }
  }, [disabled, validateDroppedFiles, onFilesDrop]);
  const formatAcceptedTypes = (0, import_react3.useCallback)(() => {
    return acceptedFormats.map((format) => `.${format}`).join(", ");
  }, [acceptedFormats]);
  const getDropZoneClasses = (0, import_react3.useCallback)(() => {
    const baseClasses = [
      "file-drop-zone",
      "transition-all",
      "duration-200",
      "ease-in-out",
      "border-2",
      "border-dashed",
      "rounded-lg",
      "p-6",
      "text-center",
      "cursor-pointer"
    ];
    if (compact) {
      baseClasses.push("p-3");
    }
    if (disabled) {
      baseClasses.push(
        "border-gray-300",
        "bg-gray-50",
        "cursor-not-allowed",
        "opacity-60"
      );
    } else if (dragState.isOver) {
      if (dragState.canDrop) {
        baseClasses.push(
          "border-green-400",
          "bg-green-50",
          "border-solid"
        );
      } else {
        baseClasses.push(
          "border-red-400",
          "bg-red-50",
          "border-solid"
        );
      }
    } else {
      baseClasses.push(
        "border-gray-400",
        "bg-white",
        "hover:border-blue-400",
        "hover:bg-blue-50"
      );
    }
    return baseClasses.join(" ");
  }, [compact, disabled, dragState]);
  if (compact) {
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      "div",
      {
        className: `${getDropZoneClasses()} ${className}`,
        onDragEnter: handleDragEnter,
        onDragOver: handleDragOver,
        onDragLeave: handleDragLeave,
        onDrop: handleDrop,
        children
      }
    );
  }
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_cards.Card, { className: `file-drop-zone-card ${className}`, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_cards.CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
    "div",
    {
      className: getDropZoneClasses(),
      onDragEnter: handleDragEnter,
      onDragOver: handleDragOver,
      onDragLeave: handleDragLeave,
      onDrop: handleDrop,
      children: [
        children,
        showHelper && !children && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "drag-drop-helper", children: [
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "upload-icon", style: { marginBottom: "16px" }, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
            "svg",
            {
              width: "48",
              height: "48",
              viewBox: "0 0 24 24",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              style: { margin: "0 auto", opacity: disabled ? 0.4 : 0.6 },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                  "path",
                  {
                    d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z",
                    stroke: "currentColor",
                    strokeWidth: "2",
                    strokeLinecap: "round",
                    strokeLinejoin: "round"
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                  "polyline",
                  {
                    points: "14,2 14,8 20,8",
                    stroke: "currentColor",
                    strokeWidth: "2",
                    strokeLinecap: "round",
                    strokeLinejoin: "round"
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                  "line",
                  {
                    x1: "16",
                    y1: "13",
                    x2: "8",
                    y2: "13",
                    stroke: "currentColor",
                    strokeWidth: "2",
                    strokeLinecap: "round",
                    strokeLinejoin: "round"
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
                  "line",
                  {
                    x1: "12",
                    y1: "17",
                    x2: "12",
                    y2: "9",
                    stroke: "currentColor",
                    strokeWidth: "2",
                    strokeLinecap: "round",
                    strokeLinejoin: "round"
                  }
                )
              ]
            }
          ) }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Text, { variant: "body", weight: "medium", color: disabled ? "disabled" : "primary", children: dragState.isOver ? dragState.canDrop ? t("file.drop.zone.drop.here") : t("file.drop.zone.invalid.files") : t("file.drop.zone.instruction") }),
          /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Text, { variant: "caption", color: "secondary", style: { marginTop: "8px" }, children: t("file.drop.zone.accepted.formats", {
            formats: formatAcceptedTypes(),
            maxFiles
          }) })
        ] })
      ]
    }
  ) }) });
};

// src/components/FileList.tsx
var import_react4 = require("react");
var import_cards2 = require("@layera/cards");
var import_buttons = require("@layera/buttons");
var import_loading = require("@layera/loading");
var import_hooks3 = require("@layera/i18n/hooks");
var import_jsx_runtime4 = require("react/jsx-runtime");
var FileList = ({
  files,
  onFileSelect,
  onFileRemove,
  onFileRetry,
  selectedFileId,
  disabled = false,
  compact = false,
  showThumbnails = true
}) => {
  const { t } = (0, import_hooks3.useLayeraTranslation)();
  const formatFileSize2 = (0, import_react4.useCallback)((bytes) => {
    const units = ["B", "KB", "MB", "GB"];
    let size = bytes;
    let unitIndex = 0;
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    return `${size.toFixed(1)} ${units[unitIndex]}`;
  }, []);
  const getFileIcon = (0, import_react4.useCallback)((file) => {
    const extension = file.file.name.split(".").pop()?.toLowerCase();
    switch (extension) {
      case "dxf":
      case "dwg":
        return "\u{1F4D0}";
      case "pdf":
        return "\u{1F4C4}";
      case "jpg":
      case "jpeg":
      case "png":
      case "webp":
      case "bmp":
      case "tiff":
        return "\u{1F5BC}\uFE0F";
      case "svg":
        return "\u{1F3A8}";
      default:
        return "\u{1F4CE}";
    }
  }, []);
  const getStatusColor = (0, import_react4.useCallback)((status) => {
    switch (status) {
      case "completed":
        return "green";
      case "error":
        return "red";
      case "processing":
        return "blue";
      case "pending":
      default:
        return "gray";
    }
  }, []);
  const getStatusText = (0, import_react4.useCallback)((file) => {
    switch (file.status) {
      case "completed":
        return t("file.status.completed");
      case "error":
        return file.error || t("file.status.error");
      case "processing":
        return t("file.status.processing");
      case "pending":
      default:
        return t("file.status.pending");
    }
  }, [t]);
  const renderFileThumbnail = (0, import_react4.useCallback)((file) => {
    if (!showThumbnails) return null;
    if (file.previewUrl && file.metadata.type.startsWith("image/")) {
      return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        "img",
        {
          src: file.previewUrl,
          alt: file.metadata.name,
          style: {
            width: compact ? "32px" : "48px",
            height: compact ? "32px" : "48px",
            objectFit: "cover",
            borderRadius: "4px",
            border: "1px solid #e0e0e0"
          }
        }
      );
    }
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      "div",
      {
        style: {
          width: compact ? "32px" : "48px",
          height: compact ? "32px" : "48px",
          backgroundColor: "#f5f5f5",
          borderRadius: "4px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: compact ? "16px" : "24px",
          border: "1px solid #e0e0e0"
        },
        children: getFileIcon(file)
      }
    );
  }, [showThumbnails, compact, getFileIcon]);
  const renderFileActions = (0, import_react4.useCallback)((file) => {
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { style: { display: "flex", gap: "8px", alignItems: "center" }, children: [
      file.status === "error" && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        import_buttons.Button,
        {
          variant: "secondary",
          size: "small",
          onClick: () => onFileRetry(file.id),
          disabled,
          children: t("file.action.retry")
        }
      ),
      file.status === "completed" && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        import_buttons.Button,
        {
          variant: "primary",
          size: "small",
          onClick: () => onFileSelect(file),
          disabled,
          children: t("file.action.preview")
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        import_buttons.IconButton,
        {
          variant: "secondary",
          size: "small",
          onClick: () => onFileRemove(file.id),
          disabled: disabled || file.status === "processing",
          "aria-label": t("file.action.remove"),
          children: "\u2715"
        }
      )
    ] });
  }, [disabled, onFileRetry, onFileSelect, onFileRemove, t]);
  const renderFileItem = (0, import_react4.useCallback)((file) => {
    const isSelected = selectedFileId === file.id;
    if (compact) {
      return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
        "div",
        {
          style: {
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "8px 12px",
            border: `1px solid ${isSelected ? "#2196f3" : "#e0e0e0"}`,
            borderRadius: "6px",
            backgroundColor: isSelected ? "#f3f9ff" : "#ffffff",
            cursor: "pointer",
            transition: "all 0.2s ease"
          },
          onClick: () => !disabled && onFileSelect(file),
          children: [
            renderFileThumbnail(file),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { style: { flex: 1, minWidth: 0 }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Text, { variant: "body", weight: "medium", style: {
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap"
              }, children: file.metadata.name }),
              /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Text, { variant: "caption", color: "secondary", children: formatFileSize2(file.metadata.size) })
            ] }),
            file.status === "processing" && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_loading.LoadingSpinner, { size: "small" }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              import_buttons.IconButton,
              {
                variant: "secondary",
                size: "small",
                onClick: (e) => {
                  e.stopPropagation();
                  onFileRemove(file.id);
                },
                disabled: disabled || file.status === "processing",
                "aria-label": t("file.action.remove"),
                children: "\u2715"
              }
            )
          ]
        },
        file.id
      );
    }
    return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      import_cards2.Card,
      {
        className: `file-list-item ${isSelected ? "selected" : ""}`,
        style: {
          border: `1px solid ${isSelected ? "#2196f3" : "#e0e0e0"}`,
          backgroundColor: isSelected ? "#f3f9ff" : "#ffffff",
          cursor: "pointer",
          transition: "all 0.2s ease"
        },
        onClick: () => !disabled && onFileSelect(file),
        children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_cards2.CardContent, { style: { padding: "16px" }, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { style: { display: "flex", alignItems: "flex-start", gap: "16px" }, children: [
          renderFileThumbnail(file),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { style: { flex: 1, minWidth: 0 }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { style: { flex: 1, minWidth: 0 }, children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Text, { variant: "body", weight: "medium", style: {
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  marginBottom: "4px"
                }, children: file.metadata.name }),
                /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Text, { variant: "caption", color: "secondary", children: [
                  formatFileSize2(file.metadata.size),
                  " \u2022 ",
                  file.metadata.type
                ] })
              ] }),
              renderFileActions(file)
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: "12px" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { style: { flex: 1 }, children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                    Text,
                    {
                      variant: "caption",
                      color: getStatusColor(file.status),
                      weight: "medium",
                      children: getStatusText(file)
                    }
                  ),
                  file.status === "processing" && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(Text, { variant: "caption", color: "secondary", children: [
                    file.progress,
                    "%"
                  ] })
                ] }),
                file.status === "processing" && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
                  import_loading.ProgressBar,
                  {
                    value: file.progress,
                    size: "small",
                    showPercentage: false
                  }
                )
              ] }),
              file.status === "processing" && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_loading.LoadingSpinner, { size: "small" })
            ] }),
            file.metadata.dimensions && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Text, { variant: "caption", color: "secondary", style: { marginTop: "8px" }, children: t("file.dimensions", {
              width: file.metadata.dimensions.width,
              height: file.metadata.dimensions.height
            }) })
          ] })
        ] }) })
      },
      file.id
    );
  }, [
    selectedFileId,
    compact,
    disabled,
    renderFileThumbnail,
    renderFileActions,
    formatFileSize2,
    getStatusColor,
    getStatusText,
    onFileSelect,
    onFileRemove,
    t
  ]);
  if (files.length === 0) {
    return null;
  }
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "file-list", style: { display: "flex", flexDirection: "column", gap: compact ? "8px" : "12px" }, children: files.map(renderFileItem) });
};

// src/components/FilePreview.tsx
var import_react5 = require("react");
var import_cards3 = require("@layera/cards");
var import_buttons2 = require("@layera/buttons");
var import_loading2 = require("@layera/loading");
var import_hooks4 = require("@layera/i18n/hooks");
var import_jsx_runtime5 = require("react/jsx-runtime");
var FilePreview = ({
  file,
  onClose,
  showMetadata = true,
  showActions = true,
  maxHeight = "600px"
}) => {
  const { t } = (0, import_hooks4.useLayeraTranslation)();
  const [isLoading, setIsLoading] = (0, import_react5.useState)(false);
  const [previewError, setPreviewError] = (0, import_react5.useState)(null);
  const fileExtension = (0, import_react5.useMemo)(() => {
    return file.file.name.split(".").pop()?.toLowerCase();
  }, [file.file.name]);
  const fileCategory = (0, import_react5.useMemo)(() => {
    switch (fileExtension) {
      case "dxf":
      case "dwg":
        return "cad";
      case "pdf":
        return "document";
      case "jpg":
      case "jpeg":
      case "png":
      case "webp":
      case "bmp":
      case "tiff":
        return "image";
      case "svg":
        return "vector";
      default:
        return "unknown";
    }
  }, [fileExtension]);
  const formatFileSize2 = (0, import_react5.useCallback)((bytes) => {
    const units = ["B", "KB", "MB", "GB"];
    let size = bytes;
    let unitIndex = 0;
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    return `${size.toFixed(1)} ${units[unitIndex]}`;
  }, []);
  const formatDate = (0, import_react5.useCallback)((timestamp) => {
    return new Date(timestamp).toLocaleString("el-GR", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  }, []);
  const handleDownload = (0, import_react5.useCallback)(() => {
    try {
      const url = URL.createObjectURL(file.file);
      const link = document.createElement("a");
      link.href = url;
      link.download = file.metadata.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  }, [file]);
  const renderImagePreview = (0, import_react5.useCallback)(() => {
    if (!file.previewUrl) {
      return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: {
        height: "300px",
        backgroundColor: "#f5f5f5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "8px",
        border: "1px solid #e0e0e0"
      }, children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Text, { color: "secondary", children: t("file.preview.no.image") }) });
    }
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: {
      textAlign: "center",
      padding: "16px",
      backgroundColor: "#f9f9f9",
      borderRadius: "8px",
      border: "1px solid #e0e0e0"
    }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
        "img",
        {
          src: file.previewUrl,
          alt: file.metadata.name,
          style: {
            maxWidth: "100%",
            maxHeight: "400px",
            objectFit: "contain",
            borderRadius: "4px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
          },
          onError: () => setPreviewError(t("file.preview.image.error"))
        }
      ),
      file.metadata.dimensions && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Text, { variant: "caption", color: "secondary", style: { marginTop: "8px", display: "block" }, children: t("file.dimensions", {
        width: file.metadata.dimensions.width,
        height: file.metadata.dimensions.height
      }) })
    ] });
  }, [file.previewUrl, file.metadata, t]);
  const renderDocumentPreview = (0, import_react5.useCallback)(() => {
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: {
      height: "300px",
      backgroundColor: "#f5f5f5",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "8px",
      border: "1px solid #e0e0e0",
      gap: "16px"
    }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: { fontSize: "48px" }, children: "\u{1F4C4}" }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Text, { variant: "body", weight: "medium", children: t("file.preview.document.title") }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Text, { variant: "caption", color: "secondary", style: { textAlign: "center" }, children: t("file.preview.document.description") }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_buttons2.Button, { variant: "primary", onClick: handleDownload, children: t("file.action.download") })
    ] });
  }, [handleDownload, t]);
  const renderCADPreview = (0, import_react5.useCallback)(() => {
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: {
      height: "300px",
      backgroundColor: "#f5f5f5",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "8px",
      border: "1px solid #e0e0e0",
      gap: "16px"
    }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: { fontSize: "48px" }, children: "\u{1F4D0}" }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Text, { variant: "body", weight: "medium", children: t("file.preview.cad.title") }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Text, { variant: "caption", color: "secondary", style: { textAlign: "center", maxWidth: "300px" }, children: fileExtension?.toUpperCase() === "DXF" ? t("file.preview.cad.dxf.description") : t("file.preview.cad.dwg.description") }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { display: "flex", gap: "8px" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_buttons2.Button, { variant: "primary", onClick: handleDownload, children: t("file.action.download") }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_buttons2.Button, { variant: "secondary", disabled: true, children: [
          t("file.action.render"),
          " (",
          t("common.coming.soon"),
          ")"
        ] })
      ] })
    ] });
  }, [fileExtension, handleDownload, t]);
  const renderVectorPreview = (0, import_react5.useCallback)(() => {
    return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: {
      height: "300px",
      backgroundColor: "#f5f5f5",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "8px",
      border: "1px solid #e0e0e0",
      gap: "16px"
    }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: { fontSize: "48px" }, children: "\u{1F3A8}" }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Text, { variant: "body", weight: "medium", children: t("file.preview.vector.title") }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Text, { variant: "caption", color: "secondary", style: { textAlign: "center" }, children: t("file.preview.vector.description") }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_buttons2.Button, { variant: "primary", onClick: handleDownload, children: t("file.action.download") })
    ] });
  }, [handleDownload, t]);
  const renderPreviewContent = (0, import_react5.useCallback)(() => {
    if (file.status === "processing") {
      return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: {
        height: "300px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px"
      }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_loading2.LoadingSpinner, { size: "large" }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Text, { variant: "body", color: "secondary", children: t("file.preview.processing") }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(Text, { variant: "caption", color: "secondary", children: [
          file.progress,
          "% ",
          t("common.completed")
        ] })
      ] });
    }
    if (file.status === "error") {
      return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: {
        height: "300px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px"
      }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: { fontSize: "48px", color: "#f44336" }, children: "\u26A0\uFE0F" }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Text, { variant: "body", color: "error", weight: "medium", children: t("file.preview.error.title") }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Text, { variant: "caption", color: "secondary", style: { textAlign: "center" }, children: file.error || t("file.preview.error.description") })
      ] });
    }
    if (previewError) {
      return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: {
        height: "300px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px"
      }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: { fontSize: "48px", color: "#f44336" }, children: "\u26A0\uFE0F" }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Text, { variant: "body", color: "error", weight: "medium", children: t("file.preview.error.title") }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Text, { variant: "caption", color: "secondary", children: previewError })
      ] });
    }
    switch (fileCategory) {
      case "image":
        return renderImagePreview();
      case "document":
        return renderDocumentPreview();
      case "cad":
        return renderCADPreview();
      case "vector":
        return renderVectorPreview();
      default:
        return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: {
          height: "300px",
          backgroundColor: "#f5f5f5",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "8px",
          border: "1px solid #e0e0e0",
          gap: "16px"
        }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { style: { fontSize: "48px" }, children: "\u{1F4CE}" }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Text, { variant: "body", weight: "medium", children: t("file.preview.unsupported.title") }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Text, { variant: "caption", color: "secondary", children: t("file.preview.unsupported.description") }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_buttons2.Button, { variant: "primary", onClick: handleDownload, children: t("file.action.download") })
        ] });
    }
  }, [
    file.status,
    file.progress,
    file.error,
    previewError,
    fileCategory,
    renderImagePreview,
    renderDocumentPreview,
    renderCADPreview,
    renderVectorPreview,
    handleDownload,
    t
  ]);
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_cards3.Card, { className: "file-preview", style: { maxHeight, overflow: "auto" }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_cards3.CardHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { flex: 1, minWidth: 0 }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Heading, { level: 4, style: {
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          marginBottom: "4px"
        }, children: file.metadata.name }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(Text, { variant: "caption", color: "secondary", children: [
          fileExtension?.toUpperCase(),
          " \u2022 ",
          formatFileSize2(file.metadata.size)
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
        import_buttons2.IconButton,
        {
          variant: "secondary",
          size: "small",
          onClick: onClose,
          "aria-label": t("common.close"),
          children: "\u2715"
        }
      )
    ] }) }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_cards3.CardContent, { children: [
      renderPreviewContent(),
      showMetadata && file.status === "completed" && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { marginTop: "24px" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Heading, { level: 5, style: { marginBottom: "12px" }, children: t("file.metadata.title") }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { display: "grid", gridTemplateColumns: "auto 1fr", gap: "8px 16px", fontSize: "14px" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(Text, { variant: "caption", color: "secondary", weight: "medium", children: [
            t("file.metadata.name"),
            ":"
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Text, { variant: "caption", children: file.metadata.name }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(Text, { variant: "caption", color: "secondary", weight: "medium", children: [
            t("file.metadata.size"),
            ":"
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Text, { variant: "caption", children: formatFileSize2(file.metadata.size) }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(Text, { variant: "caption", color: "secondary", weight: "medium", children: [
            t("file.metadata.type"),
            ":"
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Text, { variant: "caption", children: file.metadata.type }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(Text, { variant: "caption", color: "secondary", weight: "medium", children: [
            t("file.metadata.modified"),
            ":"
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Text, { variant: "caption", children: formatDate(file.metadata.lastModified) }),
          file.metadata.dimensions && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(import_jsx_runtime5.Fragment, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(Text, { variant: "caption", color: "secondary", weight: "medium", children: [
              t("file.metadata.dimensions"),
              ":"
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(Text, { variant: "caption", children: [
              file.metadata.dimensions.width,
              " \xD7 ",
              file.metadata.dimensions.height,
              " px"
            ] })
          ] })
        ] })
      ] }),
      showActions && file.status === "completed" && /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { style: { marginTop: "24px", display: "flex", gap: "12px", justifyContent: "flex-end" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_buttons2.Button, { variant: "secondary", onClick: handleDownload, children: t("file.action.download") }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_buttons2.Button, { variant: "primary", onClick: onClose, children: t("common.close") })
      ] })
    ] })
  ] });
};

// src/components/FileImporter.tsx
var import_jsx_runtime6 = require("react/jsx-runtime");
var SafeErrorBoundary = ({ children, fallback }) => {
  return import_react6.default.createElement(import_error_boundary.ErrorBoundary, { fallback }, children);
};
var SafeLoadingSpinner = (props) => {
  return import_react6.default.createElement(import_loading3.LoadingSpinner, props);
};
var FileImporter = ({
  onFileImported,
  acceptedFormats,
  maxFileSize = 100 * 1024 * 1024,
  // 100MB
  maxFiles = 10,
  allowMultiple = true,
  showPreview = true,
  showProgress = true,
  compact = false,
  disabled = false,
  title,
  description,
  onProgress,
  onError
}) => {
  const { t } = (0, import_i18n2.useLayeraTranslation)();
  const [selectedFile, setSelectedFile] = (0, import_react6.useState)(null);
  const {
    files,
    isProcessing,
    progress,
    error,
    importFiles,
    removeFile,
    clearFiles,
    retryFile
  } = useFileImport({
    allowedFormats: acceptedFormats,
    maxFileSize,
    maxFiles,
    showNotifications: true,
    ...onProgress && { onProgress },
    onComplete: onFileImported,
    ...onError && { onError }
  });
  const handleFilesDrop = (0, import_react6.useCallback)(async (droppedFiles) => {
    if (disabled) return;
    try {
      await importFiles(droppedFiles);
    } catch (error2) {
      console.error("File import failed:", error2);
    }
  }, [disabled, importFiles]);
  const handleFileInputChange = (0, import_react6.useCallback)((event) => {
    const files2 = event.target.files;
    if (files2 && files2.length > 0) {
      handleFilesDrop(files2);
    }
    event.target.value = "";
  }, [handleFilesDrop]);
  const handleFileSelect = (0, import_react6.useCallback)((file) => {
    setSelectedFile(file);
  }, []);
  const handleFileRemove = (0, import_react6.useCallback)((fileId) => {
    removeFile(fileId);
    if (selectedFile?.id === fileId) {
      setSelectedFile(null);
    }
  }, [removeFile, selectedFile]);
  const formatFileTypes = (0, import_react6.useCallback)(() => {
    return acceptedFormats.map((format) => `.${format}`).join(", ");
  }, [acceptedFormats]);
  const formatMaxSize = (0, import_react6.useCallback)(() => {
    const mb = maxFileSize / (1024 * 1024);
    return mb >= 1 ? `${Math.round(mb)}MB` : `${Math.round(maxFileSize / 1024)}KB`;
  }, [maxFileSize]);
  if (compact) {
    return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(SafeErrorBoundary, { fallback: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { children: t("file.import.error.boundary") }), children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "file-importer-compact", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
      DragDropZone,
      {
        onFilesDrop: handleFilesDrop,
        acceptedFormats,
        disabled: disabled || isProcessing,
        compact: true,
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
            "input",
            {
              type: "file",
              multiple: allowMultiple,
              accept: formatFileTypes(),
              onChange: handleFileInputChange,
              disabled: disabled || isProcessing,
              style: { display: "none" },
              id: "file-input-compact"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("label", { htmlFor: "file-input-compact", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
            import_buttons3.Button,
            {
              variant: "primary",
              disabled: disabled || isProcessing,
              style: { cursor: disabled || isProcessing ? "not-allowed" : "pointer" },
              children: isProcessing ? /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(import_jsx_runtime6.Fragment, { children: [
                /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(SafeLoadingSpinner, { size: "sm" }),
                t("file.import.processing")
              ] }) : t("file.import.select.files")
            }
          ) }),
          showProgress && isProcessing && /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { style: { marginTop: "8px", fontSize: "12px", color: "#666" }, children: [
            t("file.import.progress"),
            ": ",
            Math.round(progress),
            "%"
          ] })
        ]
      }
    ) }) });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(SafeErrorBoundary, { fallback: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { children: t("file.import.error.boundary") }), children: /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(import_cards4.BaseCard, { className: "file-importer", children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { style: { padding: "16px", borderBottom: "1px solid #eee" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Heading, { as: "h3", children: title || t("file.import.title") }),
      /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Text, { size: "sm", color: "secondary", children: description || t("file.import.description", {
        formats: formatFileTypes(),
        maxSize: formatMaxSize(),
        maxFiles
      }) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { style: { padding: "16px" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
        DragDropZone,
        {
          onFilesDrop: handleFilesDrop,
          acceptedFormats,
          disabled: disabled || isProcessing,
          maxFiles,
          showHelper: files.length === 0,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
              "input",
              {
                type: "file",
                multiple: allowMultiple,
                accept: formatFileTypes(),
                onChange: handleFileInputChange,
                disabled: disabled || isProcessing,
                style: { display: "none" },
                id: "file-input"
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("label", { htmlFor: "file-input", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
              import_buttons3.Button,
              {
                variant: "primary",
                size: "lg",
                disabled: disabled || isProcessing,
                style: { cursor: disabled || isProcessing ? "not-allowed" : "pointer" },
                children: isProcessing ? /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(import_jsx_runtime6.Fragment, { children: [
                  /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(SafeLoadingSpinner, { size: "sm" }),
                  t("file.import.processing")
                ] }) : t("file.import.select.files")
              }
            ) })
          ]
        }
      ),
      showProgress && isProcessing && /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { style: { marginTop: "16px", padding: "12px", backgroundColor: "#f5f5f5", borderRadius: "4px" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { style: { fontSize: "14px", marginBottom: "4px" }, children: [
          t("file.import.progress"),
          ": ",
          Math.round(progress),
          "%"
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { style: { width: "100%", height: "4px", backgroundColor: "#e0e0e0", borderRadius: "2px" }, children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
          "div",
          {
            style: {
              width: `${progress}%`,
              height: "100%",
              backgroundColor: "#007bff",
              borderRadius: "2px",
              transition: "width 0.3s ease"
            }
          }
        ) })
      ] }),
      error && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { style: { marginTop: "16px" }, children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Text, { color: "danger", children: error }) }),
      files.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { style: { marginTop: "16px" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Text, { size: "base", weight: "medium", children: t("file.import.files.selected", { count: files.length }) }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
            import_buttons3.Button,
            {
              variant: "secondary",
              size: "sm",
              onClick: clearFiles,
              disabled: isProcessing,
              children: t("file.import.clear.all")
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
          FileList,
          {
            files,
            onFileSelect: handleFileSelect,
            onFileRemove: handleFileRemove,
            onFileRetry: retryFile,
            ...selectedFile?.id && { selectedFileId: selectedFile.id },
            disabled: isProcessing
          }
        )
      ] }),
      showPreview && selectedFile && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { style: { marginTop: "16px" }, children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
        FilePreview,
        {
          file: selectedFile,
          onClose: () => setSelectedFile(null)
        }
      ) })
    ] })
  ] }) });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DragDropZone,
  FileImportError,
  FileImporter,
  FileList,
  FilePreview,
  FileSizeError,
  FileTypeError,
  SUPPORTED_FILE_TYPES,
  detectFileType,
  extractFileMetadata,
  useFileImport,
  validateFile
});
//# sourceMappingURL=index.js.map