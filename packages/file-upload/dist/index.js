"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
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
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// ../../node_modules/@babel/runtime/helpers/extends.js
var require_extends = __commonJS({
  "../../node_modules/@babel/runtime/helpers/extends.js"(exports2, module2) {
    "use strict";
    function _extends2() {
      return module2.exports = _extends2 = Object.assign ? Object.assign.bind() : function(n) {
        for (var e2 = 1; e2 < arguments.length; e2++) {
          var t = arguments[e2];
          for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
        }
        return n;
      }, module2.exports.__esModule = true, module2.exports["default"] = module2.exports, _extends2.apply(null, arguments);
    }
    module2.exports = _extends2, module2.exports.__esModule = true, module2.exports["default"] = module2.exports;
  }
});

// ../../node_modules/void-elements/index.js
var require_void_elements = __commonJS({
  "../../node_modules/void-elements/index.js"(exports2, module2) {
    "use strict";
    module2.exports = {
      "area": true,
      "base": true,
      "br": true,
      "col": true,
      "embed": true,
      "hr": true,
      "img": true,
      "input": true,
      "link": true,
      "meta": true,
      "param": true,
      "source": true,
      "track": true,
      "wbr": true
    };
  }
});

// src/index.ts
var index_exports = {};
__export(index_exports, {
  DEFAULT_UPLOAD_CONFIG: () => DEFAULT_UPLOAD_CONFIG,
  DragDropZone: () => DragDropZone,
  FileList: () => FileList,
  FilePreview: () => FilePreview,
  FileUploader: () => FileUploader,
  UploadEngine: () => UploadEngine,
  formatBytes: () => formatBytes,
  isImageFile: () => isImageFile,
  isPreviewSupported: () => isPreviewSupported,
  validateFile: () => validateFile,
  validateFileList: () => validateFileList
});
module.exports = __toCommonJS(index_exports);

// src/components/FileUploader.tsx
var import_react11 = require("react");

// ../../node_modules/react-i18next/dist/es/Trans.js
var import_react3 = require("react");

// ../../node_modules/react-i18next/dist/es/TransWithoutContext.js
var import_extends = __toESM(require_extends(), 1);
var import_react = __toESM(require("react"), 1);

// ../../node_modules/html-parse-stringify/dist/html-parse-stringify.module.js
var import_void_elements = __toESM(require_void_elements());

// ../../node_modules/react-i18next/dist/es/utils.js
function warn() {
  if (console && console.warn) {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    if (typeof args[0] === "string") args[0] = `react-i18next:: ${args[0]}`;
    console.warn(...args);
  }
}
var alreadyWarned = {};
function warnOnce() {
  for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }
  if (typeof args[0] === "string" && alreadyWarned[args[0]]) return;
  if (typeof args[0] === "string") alreadyWarned[args[0]] = /* @__PURE__ */ new Date();
  warn(...args);
}
var loadedClb = (i18n, cb) => () => {
  if (i18n.isInitialized) {
    cb();
  } else {
    const initialized = () => {
      setTimeout(() => {
        i18n.off("initialized", initialized);
      }, 0);
      cb();
    };
    i18n.on("initialized", initialized);
  }
};
function loadNamespaces(i18n, ns, cb) {
  i18n.loadNamespaces(ns, loadedClb(i18n, cb));
}
function loadLanguages(i18n, lng, ns, cb) {
  if (typeof ns === "string") ns = [ns];
  ns.forEach((n) => {
    if (i18n.options.ns.indexOf(n) < 0) i18n.options.ns.push(n);
  });
  i18n.loadLanguages(lng, loadedClb(i18n, cb));
}
function oldI18nextHasLoadedNamespace(ns, i18n) {
  let options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  const lng = i18n.languages[0];
  const fallbackLng = i18n.options ? i18n.options.fallbackLng : false;
  const lastLng = i18n.languages[i18n.languages.length - 1];
  if (lng.toLowerCase() === "cimode") return true;
  const loadNotPending = (l, n) => {
    const loadState = i18n.services.backendConnector.state[`${l}|${n}`];
    return loadState === -1 || loadState === 2;
  };
  if (options.bindI18n && options.bindI18n.indexOf("languageChanging") > -1 && i18n.services.backendConnector.backend && i18n.isLanguageChangingTo && !loadNotPending(i18n.isLanguageChangingTo, ns)) return false;
  if (i18n.hasResourceBundle(lng, ns)) return true;
  if (!i18n.services.backendConnector.backend || i18n.options.resources && !i18n.options.partialBundledLanguages) return true;
  if (loadNotPending(lng, ns) && (!fallbackLng || loadNotPending(lastLng, ns))) return true;
  return false;
}
function hasLoadedNamespace(ns, i18n) {
  let options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  if (!i18n.languages || !i18n.languages.length) {
    warnOnce("i18n.languages were undefined or empty", i18n.languages);
    return true;
  }
  const isNewerI18next = i18n.options.ignoreJSONStructure !== void 0;
  if (!isNewerI18next) {
    return oldI18nextHasLoadedNamespace(ns, i18n, options);
  }
  return i18n.hasLoadedNamespace(ns, {
    lng: options.lng,
    precheck: (i18nInstance2, loadNotPending) => {
      if (options.bindI18n && options.bindI18n.indexOf("languageChanging") > -1 && i18nInstance2.services.backendConnector.backend && i18nInstance2.isLanguageChangingTo && !loadNotPending(i18nInstance2.isLanguageChangingTo, ns)) return false;
    }
  });
}

// ../../node_modules/react-i18next/dist/es/unescape.js
var matchHtmlEntity = /&(?:amp|#38|lt|#60|gt|#62|apos|#39|quot|#34|nbsp|#160|copy|#169|reg|#174|hellip|#8230|#x2F|#47);/g;
var htmlEntities = {
  "&amp;": "&",
  "&#38;": "&",
  "&lt;": "<",
  "&#60;": "<",
  "&gt;": ">",
  "&#62;": ">",
  "&apos;": "'",
  "&#39;": "'",
  "&quot;": '"',
  "&#34;": '"',
  "&nbsp;": " ",
  "&#160;": " ",
  "&copy;": "\xA9",
  "&#169;": "\xA9",
  "&reg;": "\xAE",
  "&#174;": "\xAE",
  "&hellip;": "\u2026",
  "&#8230;": "\u2026",
  "&#x2F;": "/",
  "&#47;": "/"
};
var unescapeHtmlEntity = (m) => htmlEntities[m];
var unescape = (text) => text.replace(matchHtmlEntity, unescapeHtmlEntity);

// ../../node_modules/react-i18next/dist/es/defaults.js
var defaultOptions = {
  bindI18n: "languageChanged",
  bindI18nStore: "",
  transEmptyNodeValue: "",
  transSupportBasicHtmlNodes: true,
  transWrapTextNodes: "",
  transKeepBasicHtmlNodesFor: ["br", "strong", "i", "p"],
  useSuspense: true,
  unescape
};
function getDefaults() {
  return defaultOptions;
}

// ../../node_modules/react-i18next/dist/es/i18nInstance.js
var i18nInstance;
function getI18n() {
  return i18nInstance;
}

// ../../node_modules/react-i18next/dist/es/context.js
var import_react2 = require("react");
var I18nContext = (0, import_react2.createContext)();
var ReportNamespaces = class {
  constructor() {
    this.usedNamespaces = {};
  }
  addUsedNamespaces(namespaces) {
    namespaces.forEach((ns) => {
      if (!this.usedNamespaces[ns]) this.usedNamespaces[ns] = true;
    });
  }
  getUsedNamespaces() {
    return Object.keys(this.usedNamespaces);
  }
};

// ../../node_modules/react-i18next/dist/es/useTranslation.js
var import_react4 = require("react");
var usePrevious = (value, ignore) => {
  const ref = (0, import_react4.useRef)();
  (0, import_react4.useEffect)(() => {
    ref.current = ignore ? ref.current : value;
  }, [value, ignore]);
  return ref.current;
};
function useTranslation(ns) {
  let props = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  const {
    i18n: i18nFromProps
  } = props;
  const {
    i18n: i18nFromContext,
    defaultNS: defaultNSFromContext
  } = (0, import_react4.useContext)(I18nContext) || {};
  const i18n = i18nFromProps || i18nFromContext || getI18n();
  if (i18n && !i18n.reportNamespaces) i18n.reportNamespaces = new ReportNamespaces();
  if (!i18n) {
    warnOnce("You will need to pass in an i18next instance by using initReactI18next");
    const notReadyT = (k, optsOrDefaultValue) => {
      if (typeof optsOrDefaultValue === "string") return optsOrDefaultValue;
      if (optsOrDefaultValue && typeof optsOrDefaultValue === "object" && typeof optsOrDefaultValue.defaultValue === "string") return optsOrDefaultValue.defaultValue;
      return Array.isArray(k) ? k[k.length - 1] : k;
    };
    const retNotReady = [notReadyT, {}, false];
    retNotReady.t = notReadyT;
    retNotReady.i18n = {};
    retNotReady.ready = false;
    return retNotReady;
  }
  if (i18n.options.react && i18n.options.react.wait !== void 0) warnOnce("It seems you are still using the old wait option, you may migrate to the new useSuspense behaviour.");
  const i18nOptions = {
    ...getDefaults(),
    ...i18n.options.react,
    ...props
  };
  const {
    useSuspense,
    keyPrefix
  } = i18nOptions;
  let namespaces = ns || defaultNSFromContext || i18n.options && i18n.options.defaultNS;
  namespaces = typeof namespaces === "string" ? [namespaces] : namespaces || ["translation"];
  if (i18n.reportNamespaces.addUsedNamespaces) i18n.reportNamespaces.addUsedNamespaces(namespaces);
  const ready = (i18n.isInitialized || i18n.initializedStoreOnce) && namespaces.every((n) => hasLoadedNamespace(n, i18n, i18nOptions));
  function getT() {
    return i18n.getFixedT(props.lng || null, i18nOptions.nsMode === "fallback" ? namespaces : namespaces[0], keyPrefix);
  }
  const [t, setT] = (0, import_react4.useState)(getT);
  let joinedNS = namespaces.join();
  if (props.lng) joinedNS = `${props.lng}${joinedNS}`;
  const previousJoinedNS = usePrevious(joinedNS);
  const isMounted = (0, import_react4.useRef)(true);
  (0, import_react4.useEffect)(() => {
    const {
      bindI18n,
      bindI18nStore
    } = i18nOptions;
    isMounted.current = true;
    if (!ready && !useSuspense) {
      if (props.lng) {
        loadLanguages(i18n, props.lng, namespaces, () => {
          if (isMounted.current) setT(getT);
        });
      } else {
        loadNamespaces(i18n, namespaces, () => {
          if (isMounted.current) setT(getT);
        });
      }
    }
    if (ready && previousJoinedNS && previousJoinedNS !== joinedNS && isMounted.current) {
      setT(getT);
    }
    function boundReset() {
      if (isMounted.current) setT(getT);
    }
    if (bindI18n && i18n) i18n.on(bindI18n, boundReset);
    if (bindI18nStore && i18n) i18n.store.on(bindI18nStore, boundReset);
    return () => {
      isMounted.current = false;
      if (bindI18n && i18n) bindI18n.split(" ").forEach((e2) => i18n.off(e2, boundReset));
      if (bindI18nStore && i18n) bindI18nStore.split(" ").forEach((e2) => i18n.store.off(e2, boundReset));
    };
  }, [i18n, joinedNS]);
  const isInitial = (0, import_react4.useRef)(true);
  (0, import_react4.useEffect)(() => {
    if (isMounted.current && !isInitial.current) {
      setT(getT);
    }
    isInitial.current = false;
  }, [i18n, keyPrefix]);
  const ret = [t, i18n, ready];
  ret.t = t;
  ret.i18n = i18n;
  ret.ready = ready;
  if (ready) return ret;
  if (!ready && !useSuspense) return ret;
  throw new Promise((resolve) => {
    if (props.lng) {
      loadLanguages(i18n, props.lng, namespaces, () => resolve());
    } else {
      loadNamespaces(i18n, namespaces, () => resolve());
    }
  });
}

// ../../node_modules/react-i18next/dist/es/withTranslation.js
var import_react5 = require("react");

// ../../node_modules/react-i18next/dist/es/I18nextProvider.js
var import_react6 = require("react");

// ../../node_modules/react-i18next/dist/es/withSSR.js
var import_react8 = require("react");

// ../../node_modules/react-i18next/dist/es/useSSR.js
var import_react7 = require("react");

// src/components/FileUploader.tsx
var import_notifications = require("@layera/notifications");
var import_error_boundary = require("@layera/error-boundary");
var import_typography4 = require("@layera/typography");
var import_buttons3 = require("@layera/buttons");
var import_icons4 = require("@layera/icons");
var import_theme_switcher4 = require("@layera/theme-switcher");

// src/components/DragDropZone.tsx
var import_react9 = require("react");
var import_cards = require("@layera/cards");
var import_typography = require("@layera/typography");
var import_icons = require("@layera/icons");
var import_theme_switcher = require("@layera/theme-switcher");
var import_jsx_runtime = require("react/jsx-runtime");
var DragDropZone = ({
  enabled,
  acceptedTypes,
  maxFiles,
  dropZoneText,
  onFilesDrop,
  className = "",
  multiple = true
}) => {
  const { t } = useTranslation();
  const { theme } = (0, import_theme_switcher.useTheme)();
  const [isDragOver, setIsDragOver] = (0, import_react9.useState)(false);
  const [dragCounter, setDragCounter] = (0, import_react9.useState)(0);
  const handleDragEnter = (0, import_react9.useCallback)((e2) => {
    e2.preventDefault();
    e2.stopPropagation();
    if (!enabled) return;
    setDragCounter((prev) => prev + 1);
    if (e2.dataTransfer?.items && e2.dataTransfer.items.length > 0) {
      setIsDragOver(true);
    }
  }, [enabled]);
  const handleDragLeave = (0, import_react9.useCallback)((e2) => {
    e2.preventDefault();
    e2.stopPropagation();
    if (!enabled) return;
    setDragCounter((prev) => {
      const newCounter = prev - 1;
      if (newCounter === 0) {
        setIsDragOver(false);
      }
      return newCounter;
    });
  }, [enabled]);
  const handleDragOver = (0, import_react9.useCallback)((e2) => {
    e2.preventDefault();
    e2.stopPropagation();
    if (!enabled) return;
    if (e2.dataTransfer) {
      e2.dataTransfer.dropEffect = "copy";
    }
  }, [enabled]);
  const handleDrop = (0, import_react9.useCallback)((e2) => {
    e2.preventDefault();
    e2.stopPropagation();
    if (!enabled) return;
    setIsDragOver(false);
    setDragCounter(0);
    const { files } = e2.dataTransfer;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      const limitedFiles = maxFiles ? fileArray.slice(0, maxFiles) : fileArray;
      const validFiles = limitedFiles.filter(
        (file) => acceptedTypes.length === 0 || acceptedTypes.includes(file.type)
      );
      if (validFiles.length > 0) {
        onFilesDrop(validFiles);
      }
    }
  }, [enabled, maxFiles, acceptedTypes, onFilesDrop]);
  const handleFileInputChange = (0, import_react9.useCallback)((e2) => {
    const { files } = e2.target;
    if (files && files.length > 0) {
      const fileArray = Array.from(files);
      onFilesDrop(fileArray);
    }
    e2.target.value = "";
  }, [onFilesDrop]);
  const getZoneClasses = () => {
    const baseClasses = [
      "relative",
      "border-2",
      "border-dashed",
      "rounded-lg",
      "p-8",
      "text-center",
      "transition-all",
      "duration-200",
      "cursor-pointer"
    ];
    if (!enabled) {
      baseClasses.push("opacity-50", "cursor-not-allowed");
    } else if (isDragOver) {
      baseClasses.push(
        "border-blue-500",
        "bg-blue-50",
        theme === "dark" ? "bg-blue-900/20" : "bg-blue-50",
        "scale-105"
      );
    } else {
      baseClasses.push(
        "border-gray-300",
        "hover:border-gray-400",
        theme === "dark" ? "border-gray-600 hover:border-gray-500" : "border-gray-300 hover:border-gray-400"
      );
    }
    return baseClasses.join(" ");
  };
  const acceptAttribute = acceptedTypes.length > 0 ? acceptedTypes.join(",") : void 0;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_cards.BaseCard, { className: `${getZoneClasses()} ${className}`, children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "div",
    {
      onDragEnter: handleDragEnter,
      onDragLeave: handleDragLeave,
      onDragOver: handleDragOver,
      onDrop: handleDrop,
      className: "w-full h-full",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "input",
          {
            type: "file",
            multiple,
            accept: acceptAttribute,
            onChange: handleFileInputChange,
            disabled: !enabled,
            className: "absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex flex-col items-center justify-center space-y-4", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `p-4 rounded-full ${isDragOver ? "bg-blue-100 text-blue-600" : theme === "dark" ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-500"}`, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_icons.UploadIcon, { className: "w-8 h-8" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "space-y-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_typography.Text, { size: "lg", weight: "medium", className: "", children: dropZoneText || (isDragOver ? t("file-upload.drop-files-here") : t("file-upload.drag-files-or-click")) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_typography.Text, { size: "sm", className: theme === "dark" ? "text-gray-400" : "text-gray-500", children: [
              acceptedTypes.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
                t("file-upload.accepted-types"),
                ": ",
                acceptedTypes.join(", "),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {})
              ] }),
              maxFiles && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
                t("file-upload.max-files", { count: maxFiles }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {})
              ] }),
              t("file-upload.or-click-to-browse")
            ] })
          ] }),
          isDragOver && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center space-x-2 text-blue-600", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_icons.UploadIcon, { className: "w-5 h-5" }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_typography.Text, { size: "base", weight: "medium", className: "", children: t("file-upload.release-to-upload") })
          ] })
        ] })
      ]
    }
  ) });
};

// src/components/FileList.tsx
var import_cards2 = require("@layera/cards");
var import_typography2 = require("@layera/typography");
var import_buttons = require("@layera/buttons");
var import_icons2 = require("@layera/icons");
var import_theme_switcher2 = require("@layera/theme-switcher");

// src/utils/fileValidation.ts
var validateFile = (file, config) => {
  const errors = [];
  const warnings = [];
  if (file.size > config.maxFileSize) {
    errors.push(`File size (${formatBytes(file.size)}) exceeds maximum allowed size (${formatBytes(config.maxFileSize)})`);
  }
  if (!config.acceptedTypes.includes(file.type)) {
    errors.push(`File type "${file.type}" is not supported`);
  }
  if (!isValidFileName(file.name)) {
    errors.push("File name contains invalid characters");
  }
  const securityCheck = performSecurityValidation(file);
  if (!securityCheck.isValid) {
    errors.push(...securityCheck.errors);
  }
  const largeFileThreshold = 50 * 1024 * 1024;
  if (file.size > largeFileThreshold) {
    warnings.push("Large file detected - upload may take longer");
  }
  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
};
var validateFileList = (files, config) => {
  const errors = [];
  const warnings = [];
  const totalSize = files.reduce((sum, file) => sum + file.size, 0);
  if (totalSize > config.maxTotalSize) {
    errors.push(`Total size (${formatBytes(totalSize)}) exceeds maximum allowed (${formatBytes(config.maxTotalSize)})`);
  }
  files.forEach((file, index) => {
    const fileValidation = validateFile(file, config);
    if (!fileValidation.isValid) {
      errors.push(`File ${index + 1} (${file.name}): ${fileValidation.errors.join(", ")}`);
    }
    warnings.push(...fileValidation.warnings);
  });
  const duplicates = findDuplicateFileNames(files);
  if (duplicates.length > 0) {
    warnings.push(`Duplicate file names detected: ${duplicates.join(", ")}`);
  }
  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
};
var isValidFileName = (fileName) => {
  const dangerousChars = /[<>:"|?*\x00-\x1f]/;
  if (dangerousChars.test(fileName)) {
    return false;
  }
  const reservedNames = /^(CON|PRN|AUX|NUL|COM[1-9]|LPT[1-9])(\.|$)/i;
  if (reservedNames.test(fileName)) {
    return false;
  }
  const maxFileNameLength = 255;
  if (fileName.length > maxFileNameLength) {
    return false;
  }
  return true;
};
var performSecurityValidation = (file) => {
  const errors = [];
  const extension = getFileExtension(file.name);
  const expectedMimeTypes = getExpectedMimeTypes(extension);
  if (expectedMimeTypes.length > 0 && !expectedMimeTypes.includes(file.type)) {
    errors.push(`File extension "${extension}" does not match MIME type "${file.type}"`);
  }
  const executableExtensions = [".exe", ".bat", ".cmd", ".scr", ".pif", ".com", ".dll"];
  if (executableExtensions.some((ext) => file.name.toLowerCase().endsWith(ext))) {
    errors.push("Executable files are not allowed");
  }
  return {
    isValid: errors.length === 0,
    errors,
    warnings: []
  };
};
var getFileExtension = (fileName) => {
  const lastDotIndex = fileName.lastIndexOf(".");
  return lastDotIndex !== -1 ? fileName.substring(lastDotIndex) : "";
};
var getExpectedMimeTypes = (extension) => {
  const mimeMap = {
    ".jpg": ["image/jpeg"],
    ".jpeg": ["image/jpeg"],
    ".png": ["image/png"],
    ".gif": ["image/gif"],
    ".pdf": ["application/pdf"],
    ".txt": ["text/plain"],
    ".csv": ["text/csv"],
    ".json": ["application/json"],
    ".xml": ["application/xml", "text/xml"],
    ".zip": ["application/zip"],
    ".dxf": ["image/vnd.dxf", "application/dxf"]
  };
  return mimeMap[extension.toLowerCase()] || [];
};
var findDuplicateFileNames = (files) => {
  const nameCount = {};
  const duplicates = [];
  files.forEach((file) => {
    nameCount[file.name] = (nameCount[file.name] || 0) + 1;
  });
  Object.entries(nameCount).forEach(([name, count]) => {
    if (count > 1) {
      duplicates.push(name);
    }
  });
  return duplicates;
};
var formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};
var isImageFile = (file) => {
  return file.type.startsWith("image/");
};
var isPreviewSupported = (file) => {
  const supportedTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "text/plain",
    "application/json",
    "text/csv"
  ];
  return supportedTypes.includes(file.type);
};

// src/components/FileList.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var FileList = ({
  files,
  showProgress,
  showActions,
  onRemove,
  onCancel,
  onRetry
}) => {
  const { t } = useTranslation();
  const { theme } = (0, import_theme_switcher2.useTheme)();
  if (files.length === 0) {
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_cards2.BaseCard, { className: `p-6 text-center ${theme === "dark" ? "bg-gray-800" : "bg-gray-50"}`, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_icons2.UploadIcon, { className: "w-12 h-12 mx-auto mb-4 text-gray-400" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_typography2.Text, { size: "base", className: "text-gray-500", children: t("file-upload.no-files") })
    ] });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "space-y-3", children: files.map((file) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    FileListItem,
    {
      file,
      showProgress,
      showActions,
      onRemove,
      onCancel,
      onRetry
    },
    file.id
  )) });
};
var FileListItem = ({
  file,
  showProgress,
  showActions,
  onRemove,
  onCancel,
  onRetry
}) => {
  const { t } = useTranslation();
  const { theme } = (0, import_theme_switcher2.useTheme)();
  const getStatusIcon = () => {
    switch (file.status) {
      case "completed":
        return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_icons2.UploadIcon, { className: "w-5 h-5 text-green-500" });
      case "error":
        return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_icons2.CloseIcon, { className: "w-5 h-5 text-red-500" });
      case "uploading":
        return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_icons2.UploadIcon, { className: "w-5 h-5 text-blue-500 animate-pulse" });
      case "cancelled":
        return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_icons2.CloseIcon, { className: "w-5 h-5 text-gray-500" });
      case "paused":
        return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_icons2.UploadIcon, { className: "w-5 h-5 text-yellow-500" });
      default:
        return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_icons2.UploadIcon, { className: "w-5 h-5 text-gray-400" });
    }
  };
  const getStatusText = () => {
    switch (file.status) {
      case "completed":
        return t("file-upload.status.completed");
      case "error":
        return file.error || t("file-upload.status.error");
      case "uploading":
        return t("file-upload.status.uploading");
      case "cancelled":
        return t("file-upload.status.cancelled");
      case "paused":
        return t("file-upload.status.paused");
      default:
        return t("file-upload.status.pending");
    }
  };
  const getProgressBarColor = () => {
    switch (file.status) {
      case "completed":
        return "bg-green-500";
      case "error":
        return "bg-red-500";
      case "uploading":
        return "bg-blue-500";
      case "cancelled":
        return "bg-gray-500";
      case "paused":
        return "bg-yellow-500";
      default:
        return "bg-gray-300";
    }
  };
  const formatUploadSpeed = (speed) => {
    if (!speed) return "";
    return `${formatBytes(speed)}/s`;
  };
  const formatETA = (eta) => {
    if (!eta) return "";
    const minutes = Math.floor(eta / 60);
    const seconds = Math.floor(eta % 60);
    return minutes > 0 ? `${minutes}:${seconds.toString().padStart(2, "0")}` : `${seconds}s`;
  };
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_cards2.BaseCard, { className: `p-4 ${theme === "dark" ? "bg-gray-800" : "bg-white"}`, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "flex items-center justify-between", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "flex items-center space-x-3 flex-1 min-w-0", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "flex-shrink-0", children: getStatusIcon() }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_typography2.Text, { size: "base", weight: "medium", className: "truncate", children: file.file.name }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_typography2.Text, { size: "sm", className: "text-gray-500 ml-2", children: formatBytes(file.file.size) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "flex items-center space-x-4 mt-1", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_typography2.Text, { size: "sm", className: "text-gray-500", children: getStatusText() }),
          file.status === "uploading" && file.speed && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_typography2.Text, { size: "sm", className: "text-gray-500", children: formatUploadSpeed(file.speed) }),
            file.eta && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_typography2.Text, { size: "sm", className: "text-gray-500", children: t("file-upload.eta", { time: formatETA(file.eta) }) })
          ] })
        ] }),
        showProgress && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: `w-full bg-gray-200 rounded-full h-2 mt-2 ${theme === "dark" ? "bg-gray-600" : "bg-gray-200"}`, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          "div",
          {
            className: `h-2 rounded-full transition-all duration-300 ${getProgressBarColor()}`,
            style: { width: `${Math.min(file.progress, 100)}%` }
          }
        ) })
      ] })
    ] }),
    showActions && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "flex items-center space-x-2 ml-4", children: [
      file.status === "uploading" && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        import_buttons.Button,
        {
          variant: "outline",
          size: "sm",
          onClick: () => onCancel(file.id),
          className: "text-red-600 hover:text-red-700",
          children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_icons2.CloseIcon, { className: "w-4 h-4" })
        }
      ),
      file.status === "error" && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        import_buttons.Button,
        {
          variant: "outline",
          size: "sm",
          onClick: () => onRetry(file.id),
          className: "text-blue-600 hover:text-blue-700",
          children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_icons2.RefreshIcon, { className: "w-4 h-4" })
        }
      ),
      (file.status === "completed" || file.status === "error" || file.status === "cancelled") && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        import_buttons.Button,
        {
          variant: "outline",
          size: "sm",
          onClick: () => onRemove(file.id),
          className: "text-gray-600 hover:text-gray-700",
          children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_icons2.DeleteIcon, { className: "w-4 h-4" })
        }
      )
    ] })
  ] }) });
};

// src/components/FilePreview.tsx
var import_react10 = require("react");
var import_cards3 = require("@layera/cards");
var import_typography3 = require("@layera/typography");
var import_buttons2 = require("@layera/buttons");
var import_icons3 = require("@layera/icons");
var import_theme_switcher3 = require("@layera/theme-switcher");
var import_jsx_runtime3 = require("react/jsx-runtime");
var FilePreview = ({
  file,
  showPreview,
  onRemove,
  onClick
}) => {
  const { t } = useTranslation();
  const { theme } = (0, import_theme_switcher3.useTheme)();
  const [previewUrl, setPreviewUrl] = (0, import_react10.useState)(null);
  const [previewError, setPreviewError] = (0, import_react10.useState)(false);
  (0, import_react10.useEffect)(() => {
    if (!showPreview || !isImageFile(file.file)) {
      return;
    }
    const url = URL.createObjectURL(file.file);
    setPreviewUrl(url);
    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file.file, showPreview]);
  const getFileIcon = () => {
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_icons3.UploadIcon, { className: "w-8 h-8" });
  };
  const getStatusColor = () => {
    switch (file.status) {
      case "completed":
        return "border-green-500";
      case "error":
        return "border-red-500";
      case "uploading":
        return "border-blue-500";
      case "cancelled":
        return "border-gray-500";
      case "paused":
        return "border-yellow-500";
      default:
        return theme === "dark" ? "border-gray-600" : "border-gray-300";
    }
  };
  const getProgressOverlay = () => {
    if (file.status !== "uploading") return null;
    return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "text-center text-white", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_icons3.UploadIcon, { className: "w-6 h-6 mx-auto mb-2 animate-pulse" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_typography3.Text, { variant: "caption", className: "text-white", children: [
        Math.round(file.progress),
        "%"
      ] })
    ] }) });
  };
  const handleImageError = () => {
    setPreviewError(true);
    setPreviewUrl(null);
  };
  const handleClick = () => {
    if (onClick) {
      onClick(file);
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_cards3.BaseCard, { className: `relative overflow-hidden transition-all duration-200 ${getStatusColor()} border-2 ${onClick ? "cursor-pointer hover:shadow-lg" : ""}`, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { onClick: handleClick, className: "relative", children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "aspect-square bg-gray-50 dark:bg-gray-800 flex items-center justify-center", children: [
      showPreview && previewUrl && !previewError ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        "img",
        {
          src: previewUrl,
          alt: file.file.name,
          className: "w-full h-full object-cover",
          onError: handleImageError
        }
      ) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: `text-gray-400 ${theme === "dark" ? "text-gray-500" : "text-gray-400"}`, children: getFileIcon() }),
      getProgressOverlay(),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "absolute top-2 left-2", children: [
        file.status === "completed" && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "bg-green-500 text-white rounded-full p-1", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_icons3.UploadIcon, { className: "w-3 h-3" }) }),
        file.status === "error" && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "bg-red-500 text-white rounded-full p-1", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_icons3.CloseIcon, { className: "w-3 h-3" }) }),
        file.status === "uploading" && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "bg-blue-500 text-white rounded-full p-1", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_icons3.UploadIcon, { className: "w-3 h-3 animate-pulse" }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "absolute top-2 right-2", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        import_buttons2.Button,
        {
          variant: "outline",
          size: "sm",
          onClick: (e2) => {
            e2.stopPropagation();
            onRemove(file.id);
          },
          className: "bg-white bg-opacity-90 hover:bg-opacity-100 text-gray-600 hover:text-red-600 border-0 p-1 w-6 h-6",
          children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_icons3.CloseIcon, { className: "w-3 h-3" })
        }
      ) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "p-3", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
        import_typography3.Text,
        {
          variant: "caption",
          className: "font-medium truncate block mb-1",
          title: file.file.name,
          children: file.file.name
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_typography3.Text, { variant: "caption", className: "text-gray-500", children: formatBytes(file.file.size) }),
        file.status === "uploading" && /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(import_typography3.Text, { variant: "caption", className: "text-blue-600", children: [
          Math.round(file.progress),
          "%"
        ] }),
        file.status === "error" && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(import_typography3.Text, { variant: "caption", className: "text-red-600", title: file.error, children: t("file-upload.status.error") })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "mt-2", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: `inline-block px-2 py-1 text-xs rounded ${theme === "dark" ? "bg-gray-700 text-gray-300" : "bg-gray-100 text-gray-600"}`, children: file.file.type || t("file-upload.unknown-type") }) }),
      file.status === "uploading" && file.speed && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "mt-2 space-y-1", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex items-center justify-between text-xs text-gray-500", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("span", { children: [
          formatBytes(file.speed),
          "/s"
        ] }),
        file.eta && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { children: Math.floor(file.eta / 60) > 0 ? `${Math.floor(file.eta / 60)}:${Math.floor(file.eta % 60).toString().padStart(2, "0")}` : `${Math.floor(file.eta)}s` })
      ] }) })
    ] })
  ] }) });
};

// src/utils/uploadEngine.ts
var UploadEngine = class {
  constructor(config, callbacks = {}) {
    __publicField(this, "config");
    __publicField(this, "callbacks");
    __publicField(this, "activeUploads", /* @__PURE__ */ new Map());
    __publicField(this, "uploadQueue", []);
    __publicField(this, "concurrentUploads", 0);
    this.config = config;
    this.callbacks = callbacks;
  }
  /**
   * Adds file to upload queue
   */
  addFile(file) {
    this.uploadQueue.push(file);
    if (this.config.autoUpload) {
      this.processQueue();
    }
  }
  /**
   * Starts upload for specific file
   */
  async uploadFile(fileItem) {
    if (this.concurrentUploads >= this.config.maxConcurrent) {
      return;
    }
    this.concurrentUploads++;
    const abortController = new AbortController();
    this.activeUploads.set(fileItem.id, abortController);
    try {
      fileItem.status = "uploading";
      fileItem.startTime = Date.now();
      this.callbacks.onUploadStart?.(fileItem);
      if (this.config.enableChunking && fileItem.file.size > this.config.chunkSize) {
        await this.uploadFileChunked(fileItem, abortController.signal);
      } else {
        await this.uploadFileStandard(fileItem, abortController.signal);
      }
      fileItem.status = "completed";
      fileItem.completionTime = Date.now();
      this.callbacks.onUploadComplete?.(fileItem);
    } catch (error) {
      if (abortController.signal.aborted) {
        fileItem.status = "cancelled";
        this.callbacks.onUploadCancel?.(fileItem);
      } else {
        fileItem.status = "error";
        fileItem.error = error instanceof Error ? error.message : "Upload failed";
        this.callbacks.onUploadError?.(fileItem, fileItem.error);
      }
    } finally {
      this.activeUploads.delete(fileItem.id);
      this.concurrentUploads--;
      this.processQueue();
    }
  }
  /**
   * Standard upload για small files
   */
  async uploadFileStandard(fileItem, signal) {
    const formData = new FormData();
    formData.append("file", fileItem.file);
    formData.append("filename", fileItem.file.name);
    const xhr = new XMLHttpRequest();
    xhr.upload.addEventListener("progress", (event) => {
      if (event.lengthComputable) {
        const progress = event.loaded / event.total * 100;
        fileItem.progress = progress;
        const chunkProgress = {
          currentChunk: 1,
          totalChunks: 1,
          chunkBytesUploaded: event.loaded,
          totalBytesUploaded: event.loaded,
          totalFileSize: event.total
        };
        this.calculateUploadSpeed(fileItem, event.loaded);
        this.callbacks.onUploadProgress?.(fileItem, chunkProgress);
      }
    });
    signal.addEventListener("abort", () => {
      xhr.abort();
    });
    return new Promise((resolve, reject) => {
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          fileItem.response = xhr.response;
          resolve();
        } else {
          reject(new Error(`Upload failed with status ${xhr.status}`));
        }
      };
      xhr.onerror = () => {
        reject(new Error("Network error occurred"));
      };
      xhr.open("POST", this.config.uploadUrl);
      if (this.config.headers) {
        Object.entries(this.config.headers).forEach(([key, value]) => {
          xhr.setRequestHeader(key, value);
        });
      }
      xhr.send(formData);
    });
  }
  /**
   * Chunked upload για large files
   */
  async uploadFileChunked(fileItem, signal) {
    const file = fileItem.file;
    const chunkSize = this.config.chunkSize;
    const totalChunks = Math.ceil(file.size / chunkSize);
    let uploadedBytes = 0;
    const sessionId = await this.initializeUploadSession(fileItem);
    for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
      if (signal.aborted) {
        throw new Error("Upload cancelled");
      }
      const start = chunkIndex * chunkSize;
      const end = Math.min(start + chunkSize, file.size);
      const chunk = file.slice(start, end);
      await this.uploadChunk(fileItem, chunk, chunkIndex, totalChunks, sessionId);
      uploadedBytes += chunk.size;
      fileItem.progress = uploadedBytes / file.size * 100;
      const chunkProgress = {
        currentChunk: chunkIndex + 1,
        totalChunks,
        chunkBytesUploaded: chunk.size,
        totalBytesUploaded: uploadedBytes,
        totalFileSize: file.size
      };
      this.calculateUploadSpeed(fileItem, uploadedBytes);
      this.callbacks.onUploadProgress?.(fileItem, chunkProgress);
    }
    await this.finalizeUploadSession(fileItem, sessionId);
  }
  /**
   * Initializes chunked upload session
   */
  async initializeUploadSession(fileItem) {
    const response = await fetch(`${this.config.uploadUrl}/init`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...this.config.headers
      },
      body: JSON.stringify({
        filename: fileItem.file.name,
        fileSize: fileItem.file.size,
        mimeType: fileItem.file.type
      })
    });
    if (!response.ok) {
      throw new Error("Failed to initialize upload session");
    }
    const data = await response.json();
    return data.sessionId;
  }
  /**
   * Uploads a single chunk
   */
  async uploadChunk(fileItem, chunk, chunkIndex, totalChunks, sessionId) {
    const formData = new FormData();
    formData.append("chunk", chunk);
    formData.append("chunkIndex", chunkIndex.toString());
    formData.append("totalChunks", totalChunks.toString());
    formData.append("sessionId", sessionId);
    const response = await fetch(`${this.config.uploadUrl}/chunk`, {
      method: "POST",
      headers: this.config.headers || {},
      body: formData
    });
    if (!response.ok) {
      throw new Error(`Failed to upload chunk ${chunkIndex + 1}`);
    }
  }
  /**
   * Finalizes chunked upload session
   */
  async finalizeUploadSession(fileItem, sessionId) {
    const response = await fetch(`${this.config.uploadUrl}/finalize`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...this.config.headers
      },
      body: JSON.stringify({
        sessionId,
        filename: fileItem.file.name
      })
    });
    if (!response.ok) {
      throw new Error("Failed to finalize upload");
    }
    fileItem.response = await response.json();
  }
  /**
   * Calculates upload speed and ETA
   */
  calculateUploadSpeed(fileItem, bytesUploaded) {
    if (!fileItem.startTime) return;
    const elapsed = (Date.now() - fileItem.startTime) / 1e3;
    fileItem.speed = bytesUploaded / elapsed;
    if (fileItem.speed > 0) {
      const remainingBytes = fileItem.file.size - bytesUploaded;
      fileItem.eta = remainingBytes / fileItem.speed;
    }
  }
  /**
   * Processes upload queue
   */
  processQueue() {
    while (this.uploadQueue.length > 0 && this.concurrentUploads < this.config.maxConcurrent) {
      const fileItem = this.uploadQueue.shift();
      if (fileItem && fileItem.status === "idle") {
        this.uploadFile(fileItem);
      }
    }
    if (this.uploadQueue.length === 0 && this.concurrentUploads === 0) {
      this.callbacks.onAllUploadsComplete?.([]);
    }
  }
  /**
   * Cancels upload for specific file
   */
  cancelUpload(fileId) {
    const abortController = this.activeUploads.get(fileId);
    if (abortController) {
      abortController.abort();
    }
    this.uploadQueue = this.uploadQueue.filter((item) => item.id !== fileId);
  }
  /**
   * Pauses upload (για future implementation)
   */
  pauseUpload(fileId) {
    this.cancelUpload(fileId);
  }
  /**
   * Clears all uploads and resets engine
   */
  clearAll() {
    this.activeUploads.forEach((controller) => controller.abort());
    this.activeUploads.clear();
    this.uploadQueue = [];
    this.concurrentUploads = 0;
  }
};

// src/components/FileUploader.tsx
var import_jsx_runtime4 = require("react/jsx-runtime");
var FileUploader = ({
  config,
  initialFiles = [],
  className = "",
  disabled = false,
  customDropZone: CustomDropZone,
  customFileList: CustomFileList,
  onUploadStart,
  onUploadProgress,
  onUploadComplete,
  onUploadError,
  onUploadCancel,
  onFileRemove,
  onAllUploadsComplete
}) => {
  const { t } = useTranslation();
  const { theme } = (0, import_theme_switcher4.useTheme)();
  const { addNotification } = (0, import_notifications.useNotifications)();
  const [files, setFiles] = (0, import_react11.useState)([]);
  const [isUploading, setIsUploading] = (0, import_react11.useState)(false);
  const [viewMode, setViewMode] = (0, import_react11.useState)("list");
  const uploadEngineRef = (0, import_react11.useRef)(null);
  (0, import_react11.useEffect)(() => {
    uploadEngineRef.current = new UploadEngine(config, {
      onUploadStart: (file) => {
        setFiles((prev) => prev.map((f) => f.id === file.id ? file : f));
        onUploadStart?.(file);
      },
      onUploadProgress: (file, progress) => {
        setFiles((prev) => prev.map((f) => f.id === file.id ? file : f));
        onUploadProgress?.(file, progress);
      },
      onUploadComplete: (file) => {
        setFiles((prev) => prev.map((f) => f.id === file.id ? file : f));
        onUploadComplete?.(file);
        addNotification({
          type: "success",
          title: t("file-upload.notifications.upload-complete"),
          message: t("file-upload.notifications.file-uploaded", { name: file.file.name })
        });
      },
      onUploadError: (file, error) => {
        setFiles((prev) => prev.map((f) => f.id === file.id ? file : f));
        onUploadError?.(file, error);
        addNotification({
          type: "error",
          title: t("file-upload.notifications.upload-error"),
          message: error
        });
      },
      onUploadCancel: (file) => {
        setFiles((prev) => prev.map((f) => f.id === file.id ? file : f));
        onUploadCancel?.(file);
        addNotification({
          type: "info",
          title: t("file-upload.notifications.upload-cancelled"),
          message: t("file-upload.notifications.file-cancelled", { name: file.file.name })
        });
      },
      onAllUploadsComplete: (completedFiles) => {
        setIsUploading(false);
        onAllUploadsComplete?.(completedFiles);
        addNotification({
          type: "success",
          title: t("file-upload.notifications.all-complete"),
          message: t("file-upload.notifications.all-files-uploaded", { count: completedFiles.length })
        });
      }
    });
    return () => {
      uploadEngineRef.current?.clearAll();
    };
  }, [config, onUploadStart, onUploadProgress, onUploadComplete, onUploadError, onUploadCancel, onAllUploadsComplete, t, addNotification]);
  (0, import_react11.useEffect)(() => {
    if (initialFiles.length > 0) {
      handleFilesAdded(initialFiles);
    }
  }, []);
  const generateFileId = () => {
    return `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  };
  const createFileUploadItem = (file) => {
    return {
      id: generateFileId(),
      file,
      status: "idle",
      progress: 0
    };
  };
  const handleFilesAdded = (0, import_react11.useCallback)((newFiles) => {
    if (disabled) return;
    const validation = validateFileList(newFiles, config);
    if (!validation.isValid) {
      validation.errors.forEach((error) => {
        addNotification({
          type: "error",
          title: t("file-upload.notifications.validation-error"),
          message: error
        });
      });
      return;
    }
    validation.warnings.forEach((warning) => {
      addNotification({
        type: "warning",
        title: t("file-upload.notifications.validation-warning"),
        message: warning
      });
    });
    const fileItems = newFiles.map(createFileUploadItem);
    setFiles((prev) => [...prev, ...fileItems]);
    fileItems.forEach((fileItem) => {
      uploadEngineRef.current?.addFile(fileItem);
    });
    if (config.autoUpload) {
      setIsUploading(true);
    }
  }, [config, disabled, t, addNotification]);
  const handleStartUpload = (0, import_react11.useCallback)(() => {
    if (!uploadEngineRef.current || isUploading) return;
    const pendingFiles = files.filter((f) => f.status === "idle");
    if (pendingFiles.length === 0) return;
    setIsUploading(true);
    pendingFiles.forEach((file) => {
      uploadEngineRef.current?.uploadFile(file);
    });
  }, [files, isUploading]);
  const handlePauseUpload = (0, import_react11.useCallback)(() => {
    if (!uploadEngineRef.current) return;
    const uploadingFiles = files.filter((f) => f.status === "uploading");
    uploadingFiles.forEach((file) => {
      uploadEngineRef.current?.pauseUpload(file.id);
    });
    setIsUploading(false);
  }, [files]);
  const handleCancelUpload = (0, import_react11.useCallback)((fileId) => {
    uploadEngineRef.current?.cancelUpload(fileId);
  }, []);
  const handleRetryUpload = (0, import_react11.useCallback)((fileId) => {
    const file = files.find((f) => f.id === fileId);
    if (!file) return;
    const resetFile = { ...file, status: "idle", progress: 0, error: void 0 };
    setFiles((prev) => prev.map((f) => f.id === fileId ? resetFile : f));
    uploadEngineRef.current?.addFile(resetFile);
    if (config.autoUpload) {
      setIsUploading(true);
    }
  }, [files, config.autoUpload]);
  const handleRemoveFile = (0, import_react11.useCallback)((fileId) => {
    const file = files.find((f) => f.id === fileId);
    if (!file) return;
    if (file.status === "uploading") {
      uploadEngineRef.current?.cancelUpload(fileId);
    }
    setFiles((prev) => prev.filter((f) => f.id !== fileId));
    onFileRemove?.(file);
  }, [files, onFileRemove]);
  const handleClearAll = (0, import_react11.useCallback)(() => {
    uploadEngineRef.current?.clearAll();
    setFiles([]);
    setIsUploading(false);
  }, []);
  const getUploadSummary = () => {
    const total = files.length;
    const completed = files.filter((f) => f.status === "completed").length;
    const uploading = files.filter((f) => f.status === "uploading").length;
    const errors = files.filter((f) => f.status === "error").length;
    return { total, completed, uploading, errors };
  };
  const summary = getUploadSummary();
  const hasFiles = files.length > 0;
  const canStartUpload = !isUploading && files.some((f) => f.status === "idle");
  const DropZoneComponent = CustomDropZone || DragDropZone;
  const FileListComponent = CustomFileList || FileList;
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_error_boundary.ErrorBoundary, { children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: `layera-file-uploader ${className}`, children: [
    hasFiles && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: `mb-6 p-4 rounded-lg ${theme === "dark" ? "bg-gray-800" : "bg-gray-50"}`, children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex items-center justify-between mb-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_typography4.Text, { variant: "h6", className: "mb-1", children: t("file-upload.upload-summary") }),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_typography4.Text, { variant: "caption", className: "text-gray-500", children: t("file-upload.files-summary", {
            total: summary.total,
            completed: summary.completed,
            uploading: summary.uploading,
            errors: summary.errors
          }) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex items-center space-x-1 mr-4", children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              import_buttons3.Button,
              {
                variant: viewMode === "list" ? "primary" : "outline",
                size: "sm",
                onClick: () => setViewMode("list"),
                children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_icons4.UploadIcon, { className: "w-4 h-4" })
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
              import_buttons3.Button,
              {
                variant: viewMode === "grid" ? "primary" : "outline",
                size: "sm",
                onClick: () => setViewMode("grid"),
                children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_icons4.UploadIcon, { className: "w-4 h-4" })
              }
            )
          ] }),
          canStartUpload && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
            import_buttons3.Button,
            {
              variant: "primary",
              onClick: handleStartUpload,
              disabled,
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_icons4.UploadIcon, { className: "w-4 h-4 mr-2" }),
                t("file-upload.start-upload")
              ]
            }
          ),
          isUploading && /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
            import_buttons3.Button,
            {
              variant: "outline",
              onClick: handlePauseUpload,
              disabled,
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_icons4.UploadIcon, { className: "w-4 h-4 mr-2" }),
                t("file-upload.pause-upload")
              ]
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
            import_buttons3.Button,
            {
              variant: "outline",
              onClick: handleClearAll,
              disabled: disabled || isUploading,
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(import_icons4.DeleteIcon, { className: "w-4 h-4 mr-2" }),
                t("file-upload.clear-all")
              ]
            }
          )
        ] })
      ] }),
      isUploading && summary.total > 0 && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "w-full bg-gray-200 rounded-full h-2", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
        "div",
        {
          className: "bg-blue-500 h-2 rounded-full transition-all duration-300",
          style: { width: `${summary.completed / summary.total * 100}%` }
        }
      ) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "mb-6", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      DropZoneComponent,
      {
        enabled: !disabled && config.enableDragDrop,
        acceptedTypes: config.acceptedTypes,
        maxFiles: config.maxConcurrent,
        onFilesDrop: handleFilesAdded,
        multiple: true
      }
    ) }),
    hasFiles && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "mb-6", children: viewMode === "list" ? /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      FileListComponent,
      {
        files,
        showProgress: true,
        showActions: true,
        onRemove: handleRemoveFile,
        onCancel: handleCancelUpload,
        onRetry: handleRetryUpload
      }
    ) : /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4", children: files.map((file) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      FilePreview,
      {
        file,
        showPreview: true,
        onRemove: handleRemoveFile
      },
      file.id
    )) }) })
  ] }) });
};

// src/index.ts
var DEFAULT_UPLOAD_CONFIG = {
  maxFileSize: 100 * 1024 * 1024,
  // 100MB
  maxTotalSize: 500 * 1024 * 1024,
  // 500MB
  enableChunking: true,
  chunkSize: 1024 * 1024,
  // 1MB chunks
  maxConcurrent: 3,
  autoUpload: false,
  enableDragDrop: true,
  acceptedTypes: [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "application/pdf",
    "text/plain",
    "text/csv",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/zip"
  ]
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DEFAULT_UPLOAD_CONFIG,
  DragDropZone,
  FileList,
  FilePreview,
  FileUploader,
  UploadEngine,
  formatBytes,
  isImageFile,
  isPreviewSupported,
  validateFile,
  validateFileList
});
//# sourceMappingURL=index.js.map