var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// src/types/geo.ts
var GeoUtils;
((GeoUtils2) => {
  GeoUtils2.point = (lat, lng) => ({ lat, lng });
  GeoUtils2.bbox = (south, west, north, east) => ({
    south,
    west,
    north,
    east
  });
  GeoUtils2.pointToCoordinate = (point2) => [point2.lng, point2.lat];
  GeoUtils2.coordinateToPoint = (coord) => ({
    lat: coord[1],
    lng: coord[0]
  });
  GeoUtils2.pointInBBox = (point2, bbox2) => {
    return point2.lat >= bbox2.south && point2.lat <= bbox2.north && point2.lng >= bbox2.west && point2.lng <= bbox2.east;
  };
  GeoUtils2.bboxCenter = (bbox2) => ({
    lat: (bbox2.south + bbox2.north) / 2,
    lng: (bbox2.west + bbox2.east) / 2
  });
  GeoUtils2.bboxArea = (bbox2) => {
    return (bbox2.north - bbox2.south) * (bbox2.east - bbox2.west);
  };
  GeoUtils2.bboxIntersects = (bbox1, bbox2) => {
    return !(bbox1.east < bbox2.west || bbox1.west > bbox2.east || bbox1.north < bbox2.south || bbox1.south > bbox2.north);
  };
  GeoUtils2.bboxUnion = (bbox1, bbox2) => ({
    south: Math.min(bbox1.south, bbox2.south),
    west: Math.min(bbox1.west, bbox2.west),
    north: Math.max(bbox1.north, bbox2.north),
    east: Math.max(bbox1.east, bbox2.east)
  });
  GeoUtils2.isValidBBox = (bbox2) => {
    return bbox2.south <= bbox2.north && bbox2.west <= bbox2.east && bbox2.south >= -90 && bbox2.north <= 90 && bbox2.west >= -180 && bbox2.east <= 180;
  };
  GeoUtils2.normalizeLongitude = (lng) => {
    while (lng > 180) lng -= 360;
    while (lng < -180) lng += 360;
    return lng;
  };
  GeoUtils2.normalizeLatitude = (lat) => {
    return Math.max(-90, Math.min(90, lat));
  };
  GeoUtils2.distanceInMeters = (point1, point2) => {
    const R = 6371e3;
    const dLat = (0, GeoUtils2.toRadians)(point2.lat - point1.lat);
    const dLng = (0, GeoUtils2.toRadians)(point2.lng - point1.lng);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos((0, GeoUtils2.toRadians)(point1.lat)) * Math.cos((0, GeoUtils2.toRadians)(point2.lat)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };
  GeoUtils2.toRadians = (degrees) => degrees * Math.PI / 180;
  GeoUtils2.toDegrees = (radians) => radians * 180 / Math.PI;
  GeoUtils2.bearing = (point1, point2) => {
    const dLng = (0, GeoUtils2.toRadians)(point2.lng - point1.lng);
    const lat1 = (0, GeoUtils2.toRadians)(point1.lat);
    const lat2 = (0, GeoUtils2.toRadians)(point2.lat);
    const y = Math.sin(dLng) * Math.cos(lat2);
    const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);
    const bearingRad = Math.atan2(y, x);
    return ((0, GeoUtils2.toDegrees)(bearingRad) + 360) % 360;
  };
  GeoUtils2.pointBuffer = (point2, radiusMeters) => {
    const degreeRadius = radiusMeters / 111e3;
    return {
      south: point2.lat - degreeRadius,
      west: point2.lng - degreeRadius,
      north: point2.lat + degreeRadius,
      east: point2.lng + degreeRadius
    };
  };
  GeoUtils2.formatPoint = (point2, precision = 6) => {
    return `${point2.lat.toFixed(precision)}, ${point2.lng.toFixed(precision)}`;
  };
  GeoUtils2.formatBBox = (bbox2, precision = 4) => {
    return `${bbox2.south.toFixed(precision)},${bbox2.west.toFixed(precision)},${bbox2.north.toFixed(precision)},${bbox2.east.toFixed(precision)}`;
  };
})(GeoUtils || (GeoUtils = {}));
var LeafletCompat;
((LeafletCompat2) => {
  LeafletCompat2.fromLatLng = (latlng) => ({
    lat: latlng.lat,
    lng: latlng.lng
  });
  LeafletCompat2.fromLatLngBounds = (bounds) => ({
    south: bounds.getSouth(),
    west: bounds.getWest(),
    north: bounds.getNorth(),
    east: bounds.getEast()
  });
  LeafletCompat2.toLatLng = (point) => ({
    lat: point.lat,
    lng: point.lng
  });
  LeafletCompat2.toLatLngBounds = (bbox) => [
    [bbox.south, bbox.west],
    [bbox.north, bbox.east]
  ];
})(LeafletCompat || (LeafletCompat = {}));
var GeoConstants = {
  /** Earth radius σε μέτρα */
  EARTH_RADIUS_METERS: 6371e3,
  /** Earth circumference σε μέτρα */
  EARTH_CIRCUMFERENCE_METERS: 40075e3,
  /** Approximate meters per degree στον ισημερινό */
  METERS_PER_DEGREE: 111e3,
  /** WGS84 coordinate system limits */
  WGS84_BOUNDS: {
    south: -90,
    west: -180,
    north: 90,
    east: 180
  },
  /** Typical zoom levels για mapping */
  ZOOM_LEVELS: {
    WORLD: 1,
    CONTINENT: 3,
    COUNTRY: 6,
    REGION: 8,
    CITY: 10,
    DISTRICT: 13,
    STREET: 16,
    BUILDING: 18
  }
};

// src/types/result.ts
var ResultUtils;
((ResultUtils2) => {
  ResultUtils2.ok = (data) => ({ ok: true, data });
  ResultUtils2.error = (error2, status) => {
    const result = { ok: false, error: error2 };
    if (status !== void 0) {
      result.status = status;
    }
    return result;
  };
  ResultUtils2.fail = (message, status) => {
    const result = { ok: false, error: new Error(message) };
    if (status !== void 0) {
      result.status = status;
    }
    return result;
  };
  ResultUtils2.map = (result, fn) => {
    return result.ok ? { ok: true, data: fn(result.data) } : result;
  };
  ResultUtils2.mapError = (result, fn) => {
    return result.ok ? result : { ...result, error: fn(result.error) };
  };
  ResultUtils2.chain = (result, fn) => {
    return result.ok ? fn(result.data) : result;
  };
  ResultUtils2.unwrapOr = (result, defaultValue) => {
    return result.ok ? result.data : defaultValue;
  };
  ResultUtils2.unwrap = (result) => {
    if (result.ok) {
      return result.data;
    }
    if (result.error instanceof Error) {
      throw result.error;
    }
    throw new Error(String(result.error));
  };
  ResultUtils2.combine = (results) => {
    const data = [];
    for (let i = 0; i < results.length; i++) {
      const result = results[i];
      if (result && !result.ok) {
        return result;
      }
      if (result) {
        data[i] = result.data;
      }
    }
    return { ok: true, data };
  };
  ResultUtils2.fromPromise = async (promise) => {
    try {
      const data = await promise;
      return { ok: true, data };
    } catch (error2) {
      return {
        ok: false,
        error: error2 instanceof Error ? error2 : new Error(String(error2))
      };
    }
  };
  ResultUtils2.toPromise = async (asyncResult) => {
    const result = await asyncResult;
    return (0, ResultUtils2.unwrap)(result);
  };
})(ResultUtils || (ResultUtils = {}));
var OSMError = class extends Error {
  constructor(message, code, details) {
    super(message);
    this.code = code;
    this.details = details;
    this.name = "OSMError";
  }
};
var NetworkError = class extends OSMError {
  constructor(message, status) {
    super(message, "NETWORK_ERROR", { status });
    this.status = status;
    this.name = "NetworkError";
  }
};
var ValidationError = class extends OSMError {
  constructor(message, field) {
    super(message, "VALIDATION_ERROR", { field });
    this.field = field;
    this.name = "ValidationError";
  }
};
var TimeoutError = class extends OSMError {
  constructor(message, timeoutMs) {
    super(message, "TIMEOUT_ERROR", { timeoutMs });
    this.timeoutMs = timeoutMs;
    this.name = "TimeoutError";
  }
};
var ParseError = class extends OSMError {
  constructor(message, data) {
    super(message, "PARSE_ERROR", { data });
    this.data = data;
    this.name = "ParseError";
  }
};

// src/types/osm.ts
var ADMIN_LEVELS = {
  /** Χώρα (Greece) */
  COUNTRY: 2,
  /** Περιφέρεια (e.g., Κεντρική Μακεδονία) */
  REGION: 4,
  /** Περιφερειακή Ενότητα (e.g., Θεσσαλονίκης) */
  REGIONAL_UNIT: 6,
  /** Δήμος (e.g., Δήμος Θεσσαλονίκης) */
  MUNICIPALITY: 8,
  /** Δημοτική/Τοπική Κοινότητα */
  COMMUNITY: 9,
  /** Οικισμός */
  SETTLEMENT: 10
};
var OSMTypeGuards;
((OSMTypeGuards2) => {
  OSMTypeGuards2.isNode = (element) => element.type === "node";
  OSMTypeGuards2.isWay = (element) => element.type === "way";
  OSMTypeGuards2.isRelation = (element) => element.type === "relation";
  OSMTypeGuards2.isBuildingFeature = (feature) => feature.properties?.building !== void 0;
  OSMTypeGuards2.isBoundaryFeature = (feature) => feature.properties?.boundary === "administrative";
  OSMTypeGuards2.isValidAdminLevel = (level) => Object.values(ADMIN_LEVELS).includes(level);
  OSMTypeGuards2.hasGeometry = (element) => {
    if ((0, OSMTypeGuards2.isNode)(element)) {
      return typeof element.lat === "number" && typeof element.lon === "number";
    }
    if ((0, OSMTypeGuards2.isWay)(element)) {
      return Array.isArray(element.nodes) && element.nodes.length >= 2;
    }
    if ((0, OSMTypeGuards2.isRelation)(element)) {
      return Array.isArray(element.members) && element.members.length > 0;
    }
    return false;
  };
})(OSMTypeGuards || (OSMTypeGuards = {}));
var OSMConstants = {
  /** Default Overpass API servers */
  DEFAULT_SERVERS: [
    "https://overpass-api.de/api/interpreter",
    "https://overpass.kumi.systems/api/interpreter",
    "https://overpass.openstreetmap.ru/api/interpreter"
  ],
  /** Common building types */
  BUILDING_TYPES: [
    "yes",
    "house",
    "residential",
    "apartments",
    "commercial",
    "office",
    "industrial",
    "retail",
    "hotel",
    "school",
    "hospital",
    "church",
    "public"
  ],
  /** Greece-specific name tag priorities */
  NAME_TAG_PRIORITY: ["name:el", "name", "name:en", "official_name"],
  /** Default query limits */
  QUERY_LIMITS: {
    MAX_TIMEOUT_SECONDS: 30,
    MAX_ELEMENTS: 1e4,
    MAX_BBOX_AREA: 0.2,
    // degrees²
    DEFAULT_BUILDINGS_LIMIT: 1e3,
    DEFAULT_BOUNDARIES_LIMIT: 100
  },
  /** Cache settings */
  CACHE_DEFAULTS: {
    BUILDINGS_TTL_MS: 10 * 60 * 1e3,
    // 10 minutes
    BOUNDARIES_TTL_MS: 60 * 60 * 1e3,
    // 1 hour
    MAX_CACHE_SIZE: 500,
    CLEANUP_INTERVAL_MS: 5 * 60 * 1e3
    // 5 minutes
  }
};

// src/utils/strings.ts
var escapeRegex = (input) => {
  return input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};
var normalizeAreaName = (name) => {
  return name.toLowerCase().trim().replace(/\s+/g, " ").replace(/ά/g, "\u03B1").replace(/έ/g, "\u03B5").replace(/ή/g, "\u03B7").replace(/ί/g, "\u03B9").replace(/ό/g, "\u03BF").replace(/ύ/g, "\u03C5").replace(/ώ/g, "\u03C9").replace(/ΐ/g, "\u03B9").replace(/ΰ/g, "\u03C5").replace(/\bδημ\b\.?/g, "\u03B4\u03AE\u03BC\u03BF\u03C2").replace(/\bπεριφ\b\.?/g, "\u03C0\u03B5\u03C1\u03B9\u03C6\u03AD\u03C1\u03B5\u03B9\u03B1").replace(/\bνομ\b\.?/g, "\u03BD\u03BF\u03BC\u03CC\u03C2").replace(/[^\w\s\-α-ωΑ-Ω]/g, "").trim();
};
var generateSearchVariants = (name) => {
  const normalized = normalizeAreaName(name);
  const variants = /* @__PURE__ */ new Set();
  variants.add(normalized);
  const withoutPrefix = normalized.replace(/^(δήμος|περιφέρεια|νομός)\s+/g, "").trim();
  if (withoutPrefix !== normalized) {
    variants.add(withoutPrefix);
  }
  if (!normalized.startsWith("\u03B4\u03AE\u03BC\u03BF\u03C2 ") && !normalized.startsWith("\u03C0\u03B5\u03C1\u03B9\u03C6\u03AD\u03C1\u03B5\u03B9\u03B1 ")) {
    variants.add(`\u03B4\u03AE\u03BC\u03BF\u03C2 ${withoutPrefix}`);
    variants.add(`\u03C0\u03B5\u03C1\u03B9\u03C6\u03AD\u03C1\u03B5\u03B9\u03B1 ${withoutPrefix}`);
  }
  const words = normalized.split(/\s+/);
  if (words.length > 1) {
    variants.add(words[0]);
    variants.add(words[words.length - 1]);
    for (let i = 0; i < words.length - 1; i++) {
      for (let j = i + 2; j <= words.length; j++) {
        variants.add(words.slice(i, j).join(" "));
      }
    }
  }
  return Array.from(variants).filter((v) => v.length >= 2);
};
var validateQueryString = (input) => {
  if (typeof input !== "string") {
    return { valid: false, reason: "Input must be a string" };
  }
  if (input.length === 0) {
    return { valid: false, reason: "Input cannot be empty" };
  }
  if (input.length > 200) {
    return { valid: false, reason: "Input too long (max 200 characters)" };
  }
  const suspiciousPatterns = [
    /[<>]/,
    // HTML tags
    /javascript:/i,
    // JavaScript URLs
    /data:/i,
    // Data URLs
    /vbscript:/i,
    // VBScript URLs
    /on\w+\s*=/i,
    // Event handlers
    /\|\s*\w+/,
    // Command injection
    /;\s*\w+/,
    // Command chaining
    /\/\*[\s\S]*?\*\//,
    // Block comments
    /--/,
    // SQL comments
    /union\s+select/i,
    // SQL injection
    /insert\s+into/i,
    // SQL injection
    /delete\s+from/i,
    // SQL injection
    /drop\s+table/i,
    // SQL injection
    /script\s*:/i,
    // Script protocols
    /eval\s*\(/i
    // Code evaluation
  ];
  for (const pattern of suspiciousPatterns) {
    if (pattern.test(input)) {
      return { valid: false, reason: "Input contains suspicious patterns" };
    }
  }
  return { valid: true };
};
var sanitizeInput = (input) => {
  return input.replace(/[<>]/g, "").replace(/[&]/g, "&amp;").replace(/['"]/g, "").replace(/[\x00-\x1F\x7F]/g, "").trim();
};
var formatCoordinateForDisplay = (coord, precision = 6) => {
  if (!Number.isFinite(coord)) {
    return "0.000000";
  }
  const fixed = coord.toFixed(precision);
  if (Math.abs(coord) > 180) {
    return "0.000000";
  }
  return fixed;
};
var createSafeTagValue = (value) => {
  return value.replace(/"/g, '\\"').replace(/\\/g, "\\\\").replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t");
};
var validateOSMId = (id) => {
  return typeof id === "number" && Number.isInteger(id) && id > 0 && id <= Number.MAX_SAFE_INTEGER;
};
var createCacheKey = (prefix, params) => {
  const sortedParams = Object.keys(params).sort().map((key) => `${key}:${JSON.stringify(params[key])}`).join("|");
  let hash = 0;
  for (let i = 0; i < sortedParams.length; i++) {
    const char = sortedParams.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return `${prefix}:${Math.abs(hash).toString(36)}`;
};
var validateURL = (url, allowedDomains) => {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:") {
      return false;
    }
    return allowedDomains.some(
      (domain) => parsed.hostname === domain || parsed.hostname.endsWith(`.${domain}`)
    );
  } catch {
    return false;
  }
};
var StringConstants = {
  /** Maximum length για area name queries */
  MAX_QUERY_LENGTH: 200,
  /** Minimum length για meaningful searches */
  MIN_QUERY_LENGTH: 2,
  /** Maximum number of search variants */
  MAX_SEARCH_VARIANTS: 20,
  /** Coordinate display precision */
  COORDINATE_PRECISION: 6,
  /** Cache key prefix separator */
  CACHE_SEPARATOR: ":",
  /** Greek alphabet range για validation */
  GREEK_ALPHABET_REGEX: /[α-ωΑ-Ωάέήίόύώΐΰ]/,
  /** Latin alphabet range για validation */
  LATIN_ALPHABET_REGEX: /[a-zA-Z]/
};

// src/http/client.ts
var HTTPError = class extends Error {
  constructor(message, status, response, url) {
    super(message);
    this.status = status;
    this.response = response;
    this.url = url;
    this.name = "HTTPError";
  }
};
var TimeoutError2 = class extends Error {
  constructor(message, timeoutMs, url) {
    super(message);
    this.timeoutMs = timeoutMs;
    this.url = url;
    this.name = "TimeoutError";
  }
};
var NetworkError2 = class extends Error {
  constructor(message, cause, url) {
    super(message);
    this.cause = cause;
    this.url = url;
    this.name = "NetworkError";
  }
};
var CircuitBreaker = class {
  constructor(failureThreshold = 5, recoveryTimeoutMs = 3e4) {
    this.failureThreshold = failureThreshold;
    this.recoveryTimeoutMs = recoveryTimeoutMs;
    __publicField(this, "failureCount", 0);
    __publicField(this, "lastFailureTime", 0);
    __publicField(this, "state", "closed");
  }
  canExecute() {
    if (this.state === "closed") {
      return true;
    }
    if (this.state === "open") {
      if (Date.now() - this.lastFailureTime > this.recoveryTimeoutMs) {
        this.state = "half-open";
        return true;
      }
      return false;
    }
    return true;
  }
  onSuccess() {
    this.failureCount = 0;
    this.state = "closed";
  }
  onFailure() {
    this.failureCount++;
    this.lastFailureTime = Date.now();
    if (this.failureCount >= this.failureThreshold) {
      this.state = "open";
    }
  }
  getState() {
    return this.state;
  }
  getFailureCount() {
    return this.failureCount;
  }
};
var RateLimiter = class {
  constructor(requestsPerSecond) {
    this.requestsPerSecond = requestsPerSecond;
    __publicField(this, "requests", []);
  }
  canMakeRequest() {
    const now = Date.now();
    const oneSecondAgo = now - 1e3;
    this.requests = this.requests.filter((time) => time > oneSecondAgo);
    return this.requests.length < this.requestsPerSecond;
  }
  recordRequest() {
    this.requests.push(Date.now());
  }
  getRequestCount() {
    const now = Date.now();
    const oneSecondAgo = now - 1e3;
    return this.requests.filter((time) => time > oneSecondAgo).length;
  }
};
var OverpassHTTPClient = class {
  constructor(config) {
    this.config = config;
    __publicField(this, "circuitBreakers", /* @__PURE__ */ new Map());
    __publicField(this, "rateLimiters", /* @__PURE__ */ new Map());
    __publicField(this, "metrics", []);
    __publicField(this, "allowedDomains");
    this.allowedDomains = config.servers.map((url) => new URL(url).hostname);
    for (const server of config.servers) {
      this.circuitBreakers.set(server, new CircuitBreaker());
      this.rateLimiters.set(server, new RateLimiter(config.rateLimitRps));
    }
  }
  /**
   * Makes HTTP request με comprehensive error handling
   */
  async request(url, options = {}, retryConfig) {
    if (!validateURL(url, this.allowedDomains)) {
      return ResultUtils.error(
        new NetworkError2(`URL not allowed: ${url}`, void 0, url)
      );
    }
    const fullRetryConfig = {
      maxAttempts: this.config.retryAttempts,
      baseDelayMs: this.config.retryDelayMs,
      maxDelayMs: 3e4,
      backoffMultiplier: 2,
      retryableStatusCodes: [408, 429, 500, 502, 503, 504],
      ...retryConfig
    };
    const hostname = new URL(url).hostname;
    const circuitBreaker = this.circuitBreakers.get(url);
    const rateLimiter = this.rateLimiters.get(url);
    if (!circuitBreaker?.canExecute()) {
      return ResultUtils.error(
        new NetworkError2(`Circuit breaker open for ${hostname}`, void 0, url)
      );
    }
    if (!rateLimiter?.canMakeRequest()) {
      await this.sleep(1e3 / this.config.rateLimitRps);
    }
    let lastError;
    for (let attempt = 1; attempt <= fullRetryConfig.maxAttempts; attempt++) {
      const startTime = Date.now();
      try {
        rateLimiter?.recordRequest();
        const controller = new AbortController();
        const timeoutId = setTimeout(
          () => controller.abort(),
          this.config.timeout
        );
        const requestOptions = {
          ...options,
          signal: controller.signal,
          headers: {
            "User-Agent": this.config.userAgent,
            "Accept": "application/json",
            "Cache-Control": "no-cache",
            ...options.headers
          }
        };
        const response = await fetch(url, requestOptions);
        clearTimeout(timeoutId);
        const endTime = Date.now();
        const duration = endTime - startTime;
        const metrics = {
          queryHash: this.createQueryHash(url, options),
          server: hostname,
          startTime,
          endTime,
          duration,
          elementCount: 0,
          // Will be filled by caller
          cacheHit: false,
          success: response.ok
        };
        if (!response.ok) {
          metrics.error = `HTTP ${response.status}`;
        }
        this.recordMetrics(metrics);
        if (!response.ok) {
          const error = new HTTPError(
            `HTTP ${response.status}: ${response.statusText}`,
            response.status,
            response,
            url
          );
          if (attempt < fullRetryConfig.maxAttempts && fullRetryConfig.retryableStatusCodes.includes(response.status)) {
            lastError = error;
            circuitBreaker?.onFailure();
            const delay = Math.min(
              fullRetryConfig.baseDelayMs * Math.pow(fullRetryConfig.backoffMultiplier, attempt - 1),
              fullRetryConfig.maxDelayMs
            );
            await this.sleep(delay);
            continue;
          }
          circuitBreaker?.onFailure();
          return ResultUtils.error(error);
        }
        circuitBreaker?.onSuccess();
        return ResultUtils.ok(response);
      } catch (error) {
        const endTime = Date.now();
        const duration = endTime - startTime;
        if (error instanceof Error && error.name === "AbortError") {
          const timeoutError = new TimeoutError2(
            `Request timeout after ${this.config.timeout}ms`,
            this.config.timeout,
            url
          );
          this.recordMetrics({
            queryHash: this.createQueryHash(url, options),
            server: hostname,
            startTime,
            endTime,
            duration,
            elementCount: 0,
            cacheHit: false,
            success: false,
            error: "Timeout"
          });
          if (attempt < fullRetryConfig.maxAttempts) {
            lastError = timeoutError;
            circuitBreaker?.onFailure();
            const delay = Math.min(
              fullRetryConfig.baseDelayMs * Math.pow(fullRetryConfig.backoffMultiplier, attempt - 1),
              fullRetryConfig.maxDelayMs
            );
            await this.sleep(delay);
            continue;
          }
          circuitBreaker?.onFailure();
          return ResultUtils.error(timeoutError);
        }
        const networkError = new NetworkError2(
          `Network error: ${error instanceof Error ? error.message : String(error)}`,
          error instanceof Error ? error : void 0,
          url
        );
        this.recordMetrics({
          queryHash: this.createQueryHash(url, options),
          server: hostname,
          startTime,
          endTime,
          duration,
          elementCount: 0,
          cacheHit: false,
          success: false,
          error: networkError.message
        });
        if (attempt < fullRetryConfig.maxAttempts) {
          lastError = networkError;
          circuitBreaker?.onFailure();
          const delay = Math.min(
            fullRetryConfig.baseDelayMs * Math.pow(fullRetryConfig.backoffMultiplier, attempt - 1),
            fullRetryConfig.maxDelayMs
          );
          await this.sleep(delay);
          continue;
        }
        circuitBreaker?.onFailure();
        return ResultUtils.error(networkError);
      }
    }
    return ResultUtils.error(
      lastError || new NetworkError2("All retry attempts failed", void 0, url)
    );
  }
  /**
   * Executes Overpass query με automatic server fallback
   */
  async executeQuery(query) {
    const servers = [...this.config.servers];
    servers.sort((a, b) => {
      const circuitA = this.circuitBreakers.get(a);
      const circuitB = this.circuitBreakers.get(b);
      if (circuitA?.canExecute() && !circuitB?.canExecute()) return -1;
      if (!circuitA?.canExecute() && circuitB?.canExecute()) return 1;
      return (circuitA?.getFailureCount() || 0) - (circuitB?.getFailureCount() || 0);
    });
    let lastError;
    for (const server of servers) {
      const circuitBreaker = this.circuitBreakers.get(server);
      if (!circuitBreaker?.canExecute()) {
        continue;
      }
      try {
        const result = await this.request(server, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body: `data=${encodeURIComponent(query)}`
        });
        if (result.ok) {
          const text = await result.data.text();
          return ResultUtils.ok(text);
        }
        lastError = result.error;
        if (result.error instanceof HTTPError && result.error.status >= 400 && result.error.status < 500) {
          break;
        }
      } catch (error) {
        lastError = new NetworkError2(
          `Unexpected error with server ${server}`,
          error instanceof Error ? error : void 0,
          server
        );
      }
    }
    return ResultUtils.error(
      lastError || new NetworkError2("All servers failed", void 0, "all")
    );
  }
  /**
   * Gets client health status
   */
  getHealthStatus() {
    const servers = this.config.servers.map((server) => ({
      url: server,
      circuitBreakerState: this.circuitBreakers.get(server)?.getState() || "unknown",
      failureCount: this.circuitBreakers.get(server)?.getFailureCount() || 0,
      currentRps: this.rateLimiters.get(server)?.getRequestCount() || 0
    }));
    const recentMetrics = this.metrics.slice(-100);
    const successfulRequests = recentMetrics.filter((m) => m.success).length;
    const successRate = recentMetrics.length > 0 ? successfulRequests / recentMetrics.length : 0;
    return {
      servers,
      totalRequests: this.metrics.length,
      successRate
    };
  }
  /**
   * Gets performance metrics
   */
  getMetrics() {
    return [...this.metrics];
  }
  /**
   * Clears old metrics για memory management
   */
  clearOldMetrics(maxAge = 36e5) {
    const cutoff = Date.now() - maxAge;
    this.metrics.splice(0, this.metrics.findIndex((m) => m.endTime > cutoff));
  }
  sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  createQueryHash(url, options) {
    const key = `${url}:${JSON.stringify(options.body || "")}`;
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      const char = key.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(36);
  }
  recordMetrics(metrics) {
    this.metrics.push(metrics);
    if (this.metrics.length > 1e3) {
      this.metrics.splice(0, 100);
    }
  }
};
var createDefaultClientConfig = () => ({
  servers: [
    "https://overpass-api.de/api/interpreter",
    "https://overpass.kumi.systems/api/interpreter",
    "https://overpass.openstreetmap.ru/api/interpreter"
  ],
  timeout: 3e4,
  userAgent: "Layera-OSM/1.0 (Enterprise Mapping Application)",
  rateLimitRps: 1,
  retryAttempts: 3,
  retryDelayMs: 1e3
});
var createHTTPClient = (config) => {
  const fullConfig = { ...createDefaultClientConfig(), ...config };
  return new OverpassHTTPClient(fullConfig);
};

// src/cache/cache.ts
var LayeraCache = class {
  constructor(config) {
    this.config = config;
    __publicField(this, "entries", /* @__PURE__ */ new Map());
    __publicField(this, "accessOrder", /* @__PURE__ */ new Map());
    // για LRU tracking
    __publicField(this, "listeners", /* @__PURE__ */ new Set());
    __publicField(this, "hitCount", 0);
    __publicField(this, "missCount", 0);
    __publicField(this, "evictionCount", 0);
    __publicField(this, "accessCounter", 0);
    __publicField(this, "cleanupTimer");
    this.startCleanupTimer();
  }
  /**
   * Stores value στο cache με TTL
   */
  set(key, value, ttlMs) {
    const now = Date.now();
    const effectiveTtl = ttlMs ?? this.config.ttlMs;
    const size = this.estimateSize(value);
    this.ensureCapacity(size);
    const entry = {
      value,
      key,
      createdAt: now,
      expiresAt: now + effectiveTtl,
      size,
      accessCount: 0,
      lastAccessAt: now
    };
    this.entries.set(key, entry);
    this.accessOrder.set(key, ++this.accessCounter);
    this.emit({
      type: "set",
      key,
      size,
      ttl: effectiveTtl
    });
  }
  /**
   * Retrieves value από το cache
   */
  get(key) {
    const entry = this.entries.get(key);
    if (!entry) {
      this.missCount++;
      this.emit({ type: "miss", key });
      return void 0;
    }
    if (Date.now() > entry.expiresAt) {
      this.delete(key, "expired");
      this.missCount++;
      this.emit({ type: "miss", key });
      return void 0;
    }
    const updatedEntry = {
      ...entry,
      accessCount: entry.accessCount + 1,
      lastAccessAt: Date.now()
    };
    this.entries.set(key, updatedEntry);
    this.accessOrder.set(key, ++this.accessCounter);
    this.hitCount++;
    this.emit({
      type: "hit",
      key,
      size: entry.size
    });
    return entry.value;
  }
  /**
   * Checks if key exists στο cache (without accessing)
   */
  has(key) {
    const entry = this.entries.get(key);
    if (!entry) return false;
    if (Date.now() > entry.expiresAt) {
      this.delete(key, "expired");
      return false;
    }
    return true;
  }
  /**
   * Deletes entry από το cache
   */
  delete(key, reason = "manual") {
    const entry = this.entries.get(key);
    if (!entry) return false;
    this.entries.delete(key);
    this.accessOrder.delete(key);
    if (reason !== "manual") {
      this.evictionCount++;
    }
    this.emit({
      type: "evicted",
      key,
      reason,
      size: entry.size
    });
    return true;
  }
  /**
   * Clears όλο το cache
   */
  clear() {
    const entries = Array.from(this.entries.keys());
    this.entries.clear();
    this.accessOrder.clear();
    for (const key of entries) {
      this.emit({
        type: "evicted",
        key,
        reason: "manual",
        size: 0
      });
    }
  }
  /**
   * Gets cache statistics
   */
  getStats() {
    const entries = Array.from(this.entries.values());
    const totalSize = entries.reduce((sum, entry) => sum + entry.size, 0);
    const total = this.hitCount + this.missCount;
    return {
      totalEntries: this.entries.size,
      totalSize,
      hitCount: this.hitCount,
      missCount: this.missCount,
      evictionCount: this.evictionCount,
      hitRate: total > 0 ? this.hitCount / total : 0,
      memoryUsage: totalSize / this.config.maxSize,
      oldestEntry: entries.length > 0 ? Math.min(...entries.map((e) => e.createdAt)) : void 0,
      newestEntry: entries.length > 0 ? Math.max(...entries.map((e) => e.createdAt)) : void 0
    };
  }
  /**
   * Gets all cache keys
   */
  keys() {
    return Array.from(this.entries.keys());
  }
  /**
   * Gets cache size in bytes
   */
  size() {
    return Array.from(this.entries.values()).reduce((sum, entry) => sum + entry.size, 0);
  }
  /**
   * Adds event listener για cache monitoring
   */
  addEventListener(listener) {
    this.listeners.add(listener);
  }
  /**
   * Removes event listener
   */
  removeEventListener(listener) {
    this.listeners.delete(listener);
  }
  /**
   * Manual cleanup του cache
   */
  cleanup() {
    const now = Date.now();
    let removedCount = 0;
    let freedSize = 0;
    for (const [key, entry] of this.entries) {
      if (now > entry.expiresAt) {
        freedSize += entry.size;
        this.delete(key, "expired");
        removedCount++;
      }
    }
    this.emit({
      type: "cleanup",
      removedCount,
      freedSize
    });
    return { removedCount, freedSize };
  }
  /**
   * Warms up cache με batch data
   */
  warmUp(entries) {
    for (const entry of entries) {
      this.set(entry.key, entry.value, entry.ttlMs);
    }
  }
  /**
   * Destroys cache και cleanup resources
   */
  destroy() {
    if (this.cleanupTimer) {
      clearInterval(this.cleanupTimer);
      this.cleanupTimer = void 0;
    }
    this.clear();
    this.listeners.clear();
  }
  ensureCapacity(newEntrySize) {
    const currentSize = this.size();
    const requiredSpace = currentSize + newEntrySize - this.config.maxSize;
    if (requiredSpace <= 0) return;
    const sortedEntries = Array.from(this.entries.entries()).sort(([keyA], [keyB]) => {
      const accessA = this.accessOrder.get(keyA) || 0;
      const accessB = this.accessOrder.get(keyB) || 0;
      return accessA - accessB;
    });
    let freedSpace = 0;
    for (const [key, entry] of sortedEntries) {
      if (freedSpace >= requiredSpace) break;
      freedSpace += entry.size;
      this.delete(key, "lru");
    }
  }
  estimateSize(value) {
    try {
      const jsonString = JSON.stringify(value);
      return jsonString.length * 2;
    } catch {
      return 1e3;
    }
  }
  startCleanupTimer() {
    this.cleanupTimer = setInterval(() => {
      this.cleanup();
    }, this.config.cleanupIntervalMs);
  }
  emit(event) {
    for (const listener of this.listeners) {
      try {
        listener(event);
      } catch (error) {
        console.warn("Cache event listener error:", error);
      }
    }
  }
};
var OSMCacheManager = class {
  constructor(config) {
    __publicField(this, "buildingsCache");
    __publicField(this, "boundariesCache");
    __publicField(this, "queryCache");
    const buildingsConfig = {
      ...config,
      ttlMs: 10 * 60 * 1e3
      // 10 minutes για buildings
    };
    const boundariesConfig = {
      ...config,
      ttlMs: 60 * 60 * 1e3
      // 1 hour για boundaries
    };
    const queryConfig = {
      ...config,
      ttlMs: 5 * 60 * 1e3,
      // 5 minutes για raw queries
      maxSize: config.maxSize / 3
      // Smaller cache για queries
    };
    this.buildingsCache = new LayeraCache(buildingsConfig);
    this.boundariesCache = new LayeraCache(boundariesConfig);
    this.queryCache = new LayeraCache(queryConfig);
  }
  /**
   * Gets/sets buildings cache
   */
  get buildings() {
    return this.buildingsCache;
  }
  /**
   * Gets/sets boundaries cache
   */
  get boundaries() {
    return this.boundariesCache;
  }
  /**
   * Gets/sets query cache
   */
  get queries() {
    return this.queryCache;
  }
  /**
   * Gets combined statistics
   */
  getAllStats() {
    const buildingsStats = this.buildingsCache.getStats();
    const boundariesStats = this.boundariesCache.getStats();
    const queriesStats = this.queryCache.getStats();
    const totalEntries = buildingsStats.totalEntries + boundariesStats.totalEntries + queriesStats.totalEntries;
    const totalSize = buildingsStats.totalSize + boundariesStats.totalSize + queriesStats.totalSize;
    const totalHits = buildingsStats.hitCount + boundariesStats.hitCount + queriesStats.hitCount;
    const totalRequests = totalHits + buildingsStats.missCount + boundariesStats.missCount + queriesStats.missCount;
    return {
      buildings: buildingsStats,
      boundaries: boundariesStats,
      queries: queriesStats,
      total: {
        entries: totalEntries,
        size: totalSize,
        hitRate: totalRequests > 0 ? totalHits / totalRequests : 0
      }
    };
  }
  /**
   * Clears all caches
   */
  clearAll() {
    this.buildingsCache.clear();
    this.boundariesCache.clear();
    this.queryCache.clear();
  }
  /**
   * Cleanup all caches
   */
  cleanupAll() {
    this.buildingsCache.cleanup();
    this.boundariesCache.cleanup();
    this.queryCache.cleanup();
  }
  /**
   * Destroys all caches
   */
  destroy() {
    this.buildingsCache.destroy();
    this.boundariesCache.destroy();
    this.queryCache.destroy();
  }
};
var createDefaultCacheConfig = () => ({
  maxSize: 50 * 1024 * 1024,
  // 50MB
  ttlMs: 30 * 60 * 1e3,
  // 30 minutes
  cleanupIntervalMs: 5 * 60 * 1e3
  // 5 minutes
});
var createCacheManager = (config) => {
  const fullConfig = { ...createDefaultCacheConfig(), ...config };
  return new OSMCacheManager(fullConfig);
};

// src/utils/validation.ts
var CoordinateValidation;
((CoordinateValidation2) => {
  CoordinateValidation2.validateLatitude = (lat) => {
    if (!Number.isFinite(lat)) {
      return ResultUtils.error({
        code: "INVALID_LATITUDE_TYPE",
        message: "Latitude must be a finite number",
        field: "latitude",
        value: lat,
        severity: "error",
        location: void 0
      });
    }
    if (lat < -90 || lat > 90) {
      return ResultUtils.error({
        code: "LATITUDE_OUT_OF_RANGE",
        message: "Latitude must be between -90 and 90 degrees",
        field: "latitude",
        value: lat,
        severity: "error",
        location: void 0
      });
    }
    return ResultUtils.ok(lat);
  };
  CoordinateValidation2.validateLongitude = (lng) => {
    if (!Number.isFinite(lng)) {
      return ResultUtils.error({
        code: "INVALID_LONGITUDE_TYPE",
        message: "Longitude must be a finite number",
        field: "longitude",
        value: lng,
        severity: "error",
        location: void 0
      });
    }
    if (lng < -180 || lng > 180) {
      return ResultUtils.error({
        code: "LONGITUDE_OUT_OF_RANGE",
        message: "Longitude must be between -180 and 180 degrees",
        field: "longitude",
        value: lng,
        severity: "error",
        location: void 0
      });
    }
    return ResultUtils.ok(lng);
  };
  CoordinateValidation2.validatePoint = (point) => {
    const errors = [];
    const warnings = [];
    const latResult = (0, CoordinateValidation2.validateLatitude)(point.lat);
    if (!latResult.ok) {
      errors.push(latResult.error);
    }
    const lngResult = (0, CoordinateValidation2.validateLongitude)(point.lng);
    if (!lngResult.ok) {
      errors.push(lngResult.error);
    }
    return {
      valid: errors.length === 0,
      errors,
      warnings
    };
  };
  CoordinateValidation2.validateBBox = (bbox) => {
    const errors = [];
    const warnings = [];
    const coords = [
      { value: bbox.south, name: "south" },
      { value: bbox.west, name: "west" },
      { value: bbox.north, name: "north" },
      { value: bbox.east, name: "east" }
    ];
    for (const coord of coords) {
      if (!Number.isFinite(coord.value)) {
        errors.push({
          code: "INVALID_COORDINATE_TYPE",
          message: `${coord.name} must be a finite number`,
          field: coord.name,
          value: coord.value,
          severity: "error"
        });
      }
    }
    const southResult = (0, CoordinateValidation2.validateLatitude)(bbox.south);
    if (!southResult.ok) {
      errors.push({ ...southResult.error, field: "south" });
    }
    const northResult = (0, CoordinateValidation2.validateLatitude)(bbox.north);
    if (!northResult.ok) {
      errors.push({ ...northResult.error, field: "north" });
    }
    const westResult = (0, CoordinateValidation2.validateLongitude)(bbox.west);
    if (!westResult.ok) {
      errors.push({ ...westResult.error, field: "west" });
    }
    const eastResult = (0, CoordinateValidation2.validateLongitude)(bbox.east);
    if (!eastResult.ok) {
      errors.push({ ...eastResult.error, field: "east" });
    }
    if (bbox.south >= bbox.north) {
      errors.push({
        code: "INVALID_BBOX_LATITUDE_ORDER",
        message: "South latitude must be less than north latitude",
        field: "bbox",
        value: bbox,
        severity: "error"
      });
    }
    if (bbox.west >= bbox.east) {
      errors.push({
        code: "INVALID_BBOX_LONGITUDE_ORDER",
        message: "West longitude must be less than east longitude",
        field: "bbox",
        value: bbox,
        severity: "error"
      });
    }
    const area = (bbox.north - bbox.south) * (bbox.east - bbox.west);
    if (area > 100) {
      warnings.push({
        code: "LARGE_BBOX_AREA",
        message: "BBox area is very large, may cause performance issues",
        field: "bbox",
        value: area,
        severity: "warning"
      });
    }
    if (area < 1e-4) {
      warnings.push({
        code: "SMALL_BBOX_AREA",
        message: "BBox area is very small, may not contain any features",
        field: "bbox",
        value: area,
        severity: "warning"
      });
    }
    return {
      valid: errors.length === 0,
      errors,
      warnings
    };
  };
})(CoordinateValidation || (CoordinateValidation = {}));
var OSMValidation;
((OSMValidation2) => {
  OSMValidation2.validateNode = (node) => {
    const errors = [];
    const warnings = [];
    if (node.type !== "node") {
      errors.push({
        code: "INVALID_NODE_TYPE",
        message: 'Element type must be "node"',
        field: "type",
        value: node.type,
        severity: "error"
      });
    }
    if (!Number.isInteger(node.id) || node.id <= 0) {
      errors.push({
        code: "INVALID_NODE_ID",
        message: "Node ID must be a positive integer",
        field: "id",
        value: node.id,
        severity: "error"
      });
    }
    const pointValidation = CoordinateValidation.validatePoint({
      lat: node.lat,
      lng: node.lon
    });
    errors.push(...pointValidation.errors);
    warnings.push(...pointValidation.warnings);
    return {
      valid: errors.length === 0,
      errors,
      warnings
    };
  };
  OSMValidation2.validateWay = (way) => {
    const errors = [];
    const warnings = [];
    if (way.type !== "way") {
      errors.push({
        code: "INVALID_WAY_TYPE",
        message: 'Element type must be "way"',
        field: "type",
        value: way.type,
        severity: "error"
      });
    }
    if (!Number.isInteger(way.id) || way.id <= 0) {
      errors.push({
        code: "INVALID_WAY_ID",
        message: "Way ID must be a positive integer",
        field: "id",
        value: way.id,
        severity: "error"
      });
    }
    if (!Array.isArray(way.nodes)) {
      errors.push({
        code: "INVALID_WAY_NODES_TYPE",
        message: "Way nodes must be an array",
        field: "nodes",
        value: way.nodes,
        severity: "error"
      });
    } else {
      if (way.nodes.length < 2) {
        errors.push({
          code: "INSUFFICIENT_WAY_NODES",
          message: "Way must have at least 2 nodes",
          field: "nodes",
          value: way.nodes.length,
          severity: "error"
        });
      }
      for (let i = 0; i < way.nodes.length; i++) {
        const nodeId = way.nodes[i];
        if (!Number.isInteger(nodeId) || nodeId <= 0) {
          errors.push({
            code: "INVALID_WAY_NODE_ID",
            message: `Node ID at index ${i} must be a positive integer`,
            field: `nodes[${i}]`,
            value: nodeId,
            severity: "error"
          });
        }
      }
      if (way.nodes.length > 3 && way.nodes[0] === way.nodes[way.nodes.length - 1]) {
        if (way.nodes.length < 4) {
          warnings.push({
            code: "MINIMAL_POLYGON",
            message: "Closed way has minimal number of nodes",
            field: "nodes",
            value: way.nodes.length,
            severity: "warning"
          });
        }
      }
    }
    return {
      valid: errors.length === 0,
      errors,
      warnings
    };
  };
  OSMValidation2.validateRelation = (relation) => {
    const errors = [];
    const warnings = [];
    if (relation.type !== "relation") {
      errors.push({
        code: "INVALID_RELATION_TYPE",
        message: 'Element type must be "relation"',
        field: "type",
        value: relation.type,
        severity: "error"
      });
    }
    if (!Number.isInteger(relation.id) || relation.id <= 0) {
      errors.push({
        code: "INVALID_RELATION_ID",
        message: "Relation ID must be a positive integer",
        field: "id",
        value: relation.id,
        severity: "error"
      });
    }
    if (!Array.isArray(relation.members)) {
      errors.push({
        code: "INVALID_RELATION_MEMBERS_TYPE",
        message: "Relation members must be an array",
        field: "members",
        value: relation.members,
        severity: "error"
      });
    } else {
      if (relation.members.length === 0) {
        warnings.push({
          code: "EMPTY_RELATION",
          message: "Relation has no members",
          field: "members",
          value: relation.members.length,
          severity: "warning"
        });
      }
      for (let i = 0; i < relation.members.length; i++) {
        const member = relation.members[i];
        if (!member) continue;
        if (!["node", "way", "relation"].includes(member.type)) {
          errors.push({
            code: "INVALID_MEMBER_TYPE",
            message: `Member type at index ${i} must be node, way, or relation`,
            field: `members[${i}].type`,
            value: member.type,
            severity: "error"
          });
        }
        if (!Number.isInteger(member.ref) || member.ref <= 0) {
          errors.push({
            code: "INVALID_MEMBER_REF",
            message: `Member ref at index ${i} must be a positive integer`,
            field: `members[${i}].ref`,
            value: member.ref,
            severity: "error"
          });
        }
        if (typeof member.role !== "string") {
          errors.push({
            code: "INVALID_MEMBER_ROLE",
            message: `Member role at index ${i} must be a string`,
            field: `members[${i}].role`,
            value: member.role,
            severity: "error"
          });
        }
      }
    }
    return {
      valid: errors.length === 0,
      errors,
      warnings
    };
  };
  OSMValidation2.validateElement = (element) => {
    switch (element.type) {
      case "node":
        return (0, OSMValidation2.validateNode)(element);
      case "way":
        return (0, OSMValidation2.validateWay)(element);
      case "relation":
        return (0, OSMValidation2.validateRelation)(element);
      default:
        return {
          valid: false,
          errors: [{
            code: "UNKNOWN_ELEMENT_TYPE",
            message: "Unknown OSM element type",
            field: "type",
            value: element.type,
            severity: "error"
          }],
          warnings: []
        };
    }
  };
  OSMValidation2.validateOverpassResponse = (response) => {
    const errors = [];
    const warnings = [];
    if (typeof response.version !== "number") {
      errors.push({
        code: "INVALID_RESPONSE_VERSION",
        message: "Response version must be a number",
        field: "version",
        value: response.version,
        severity: "error"
      });
    }
    if (typeof response.generator !== "string") {
      errors.push({
        code: "INVALID_RESPONSE_GENERATOR",
        message: "Response generator must be a string",
        field: "generator",
        value: response.generator,
        severity: "error"
      });
    }
    if (!Array.isArray(response.elements)) {
      errors.push({
        code: "INVALID_RESPONSE_ELEMENTS",
        message: "Response elements must be an array",
        field: "elements",
        value: response.elements,
        severity: "error"
      });
    } else {
      const elementValidations = response.elements.map(OSMValidation2.validateElement);
      const allErrors = elementValidations.flatMap((v) => v.errors);
      const allWarnings = elementValidations.flatMap((v) => v.warnings);
      errors.push(...allErrors);
      warnings.push(...allWarnings);
      if (response.elements.length === 0) {
        warnings.push({
          code: "EMPTY_RESPONSE",
          message: "Response contains no elements",
          field: "elements",
          value: 0,
          severity: "warning"
        });
      }
      if (response.elements.length > 1e4) {
        warnings.push({
          code: "LARGE_RESPONSE",
          message: "Response contains many elements, may cause performance issues",
          field: "elements",
          value: response.elements.length,
          severity: "warning"
        });
      }
    }
    return {
      valid: errors.length === 0,
      errors,
      warnings
    };
  };
})(OSMValidation || (OSMValidation = {}));
var QueryValidation;
((QueryValidation2) => {
  QueryValidation2.validateTimeout = (timeout) => {
    if (!Number.isInteger(timeout) || timeout <= 0) {
      return ResultUtils.error({
        code: "INVALID_TIMEOUT",
        message: "Timeout must be a positive integer",
        field: "timeout",
        value: timeout,
        severity: "error",
        location: void 0
      });
    }
    if (timeout > 60) {
      return ResultUtils.error({
        code: "TIMEOUT_TOO_LARGE",
        message: "Timeout cannot exceed 60 seconds",
        field: "timeout",
        value: timeout,
        severity: "error",
        location: void 0
      });
    }
    return ResultUtils.ok(timeout);
  };
  QueryValidation2.validateAdminLevel = (level) => {
    if (!Number.isInteger(level)) {
      return ResultUtils.error({
        code: "INVALID_ADMIN_LEVEL_TYPE",
        message: "Admin level must be an integer",
        field: "adminLevel",
        value: level,
        severity: "error",
        location: void 0
      });
    }
    if (level < 1 || level > 11) {
      return ResultUtils.error({
        code: "ADMIN_LEVEL_OUT_OF_RANGE",
        message: "Admin level must be between 1 and 11",
        field: "adminLevel",
        value: level,
        severity: "error",
        location: void 0
      });
    }
    return ResultUtils.ok(level);
  };
  QueryValidation2.validateLimit = (limit) => {
    if (!Number.isInteger(limit) || limit <= 0) {
      return ResultUtils.error({
        code: "INVALID_LIMIT",
        message: "Limit must be a positive integer",
        field: "limit",
        value: limit,
        severity: "error",
        location: void 0
      });
    }
    if (limit > 1e3) {
      return ResultUtils.error({
        code: "LIMIT_TOO_LARGE",
        message: "Limit cannot exceed 1000",
        field: "limit",
        value: limit,
        severity: "error",
        location: void 0
      });
    }
    return ResultUtils.ok(limit);
  };
})(QueryValidation || (QueryValidation = {}));
var ValidationConstants = {
  /** Maximum allowed timeout για queries (seconds) */
  MAX_TIMEOUT_SECONDS: 60,
  /** Maximum allowed search limit */
  MAX_SEARCH_LIMIT: 1e3,
  /** Maximum reasonable BBox area (square degrees) */
  MAX_BBOX_AREA: 100,
  /** Minimum meaningful BBox area (square degrees) */
  MIN_BBOX_AREA: 1e-4,
  /** Maximum elements in response before warning */
  MAX_RESPONSE_ELEMENTS: 1e4,
  /** Valid admin levels για Greece */
  VALID_ADMIN_LEVELS: [2, 4, 6, 8, 9, 10],
  /** Coordinate precision για validation */
  COORDINATE_PRECISION: 1e-8
};

// src/parsers/buildings.ts
var BuildingClassifier;
((BuildingClassifier2) => {
  BuildingClassifier2.normalizeBuildingType = (building) => {
    const normalized = building.toLowerCase().trim();
    const typeMapping = {
      "yes": "building",
      "house": "residential",
      "detached": "residential",
      "semidetached_house": "residential",
      "terrace": "residential",
      "apartments": "residential",
      "residential": "residential",
      "office": "commercial",
      "commercial": "commercial",
      "retail": "commercial",
      "shop": "commercial",
      "warehouse": "industrial",
      "factory": "industrial",
      "industrial": "industrial",
      "school": "public",
      "hospital": "public",
      "church": "religious",
      "mosque": "religious",
      "synagogue": "religious",
      "temple": "religious"
    };
    return typeMapping[normalized] || normalized;
  };
  BuildingClassifier2.isValidBuildingType = (building) => {
    if (!building || typeof building !== "string") return false;
    const validTypes = [
      "yes",
      "house",
      "residential",
      "apartments",
      "detached",
      "semidetached_house",
      "terrace",
      "commercial",
      "office",
      "retail",
      "shop",
      "industrial",
      "warehouse",
      "factory",
      "public",
      "school",
      "hospital",
      "church",
      "mosque",
      "synagogue",
      "temple",
      "hotel",
      "civic",
      "government"
    ];
    return validTypes.includes(building.toLowerCase()) || building.length > 0;
  };
  BuildingClassifier2.getBuildingCategory = (building) => {
    const normalized = (0, BuildingClassifier2.normalizeBuildingType)(building);
    if (["residential", "house", "apartments"].includes(normalized)) {
      return "residential";
    }
    if (["commercial", "office", "retail", "shop"].includes(normalized)) {
      return "commercial";
    }
    if (["industrial", "warehouse", "factory"].includes(normalized)) {
      return "industrial";
    }
    if (["public", "school", "hospital", "civic", "government"].includes(normalized)) {
      return "public";
    }
    if (["religious", "church", "mosque", "synagogue", "temple"].includes(normalized)) {
      return "religious";
    }
    return "other";
  };
})(BuildingClassifier || (BuildingClassifier = {}));
var AddressProcessor;
((AddressProcessor2) => {
  AddressProcessor2.normalizeAddress = (tags) => {
    const addr = {};
    const housenumber = tags["addr:housenumber"]?.trim();
    if (housenumber) addr.housenumber = housenumber;
    const street = tags["addr:street"]?.trim();
    if (street) addr.street = street;
    const city = tags["addr:city"]?.trim();
    if (city) addr.city = city;
    const postcode = tags["addr:postcode"]?.trim();
    if (postcode) addr.postcode = postcode;
    const country = tags["addr:country"]?.trim();
    if (country) addr.country = country;
    return addr;
  };
  AddressProcessor2.formatAddress = (tags) => {
    const addr = (0, AddressProcessor2.normalizeAddress)(tags);
    const parts = [];
    if (addr.housenumber && addr.street) {
      parts.push(`${addr.street} ${addr.housenumber}`);
    } else if (addr.street) {
      parts.push(addr.street);
    }
    if (addr.city) {
      parts.push(addr.city);
    }
    if (addr.postcode) {
      parts.push(addr.postcode);
    }
    return parts.length > 0 ? parts.join(", ") : void 0;
  };
  AddressProcessor2.validateAddress = (tags) => {
    const issues = [];
    const addr = (0, AddressProcessor2.normalizeAddress)(tags);
    if (addr.housenumber && !addr.street) {
      issues.push({
        severity: "warning",
        code: "MISSING_STREET",
        message: "House number without street name",
        location: void 0
      });
    }
    if (addr.street && !addr.city) {
      issues.push({
        severity: "info",
        code: "MISSING_CITY",
        message: "Street without city information",
        location: void 0
      });
    }
    return issues;
  };
})(AddressProcessor || (AddressProcessor = {}));
var HeightProcessor;
((HeightProcessor2) => {
  HeightProcessor2.parseHeight = (height) => {
    if (!height) return void 0;
    const trimmed = height.trim().toLowerCase();
    let meters;
    if (trimmed.endsWith("m")) {
      meters = parseFloat(trimmed.slice(0, -1));
    } else if (trimmed.endsWith("ft") || trimmed.endsWith("feet")) {
      const feet = parseFloat(trimmed.replace(/ft|feet/g, ""));
      meters = feet * 0.3048;
    } else {
      meters = parseFloat(trimmed);
    }
    if (!Number.isFinite(meters) || meters <= 0) return void 0;
    if (meters > 1e3) return void 0;
    if (meters < 1) return void 0;
    return Math.round(meters * 10) / 10;
  };
  HeightProcessor2.parseLevels = (levels) => {
    if (!levels) return void 0;
    const parsed = parseInt(levels.trim(), 10);
    if (!Number.isInteger(parsed) || parsed <= 0) return void 0;
    if (parsed > 300) return void 0;
    return parsed;
  };
  HeightProcessor2.estimateHeightFromLevels = (levels) => {
    return levels * 3.5;
  };
  HeightProcessor2.estimateLevelsFromHeight = (height) => {
    return Math.round(height / 3.5);
  };
})(HeightProcessor || (HeightProcessor = {}));
var BuildingsParser = class {
  /**
   * Parses Overpass response σε building features
   */
  static parseOverpassResponse(response) {
    const validation = OSMValidation.validateOverpassResponse(response);
    const issues = [...validation.errors, ...validation.warnings];
    if (!validation.valid) {
      return ResultUtils.error(issues);
    }
    const nodes = /* @__PURE__ */ new Map();
    const ways = [];
    const relations = [];
    for (const element of response.elements) {
      switch (element.type) {
        case "node":
          nodes.set(element.id, element);
          break;
        case "way":
          if (element.tags?.building) {
            ways.push(element);
          }
          break;
        case "relation":
          if (element.tags?.building) {
            relations.push(element);
          }
          break;
      }
    }
    const features = [];
    for (const way of ways) {
      const result = this.parseWayBuilding(way, nodes);
      if (result.ok) {
        features.push(result.data);
      } else {
        issues.push(...result.error);
      }
    }
    for (const relation of relations) {
      const result = this.parseRelationBuilding(relation, ways, nodes);
      if (result.ok) {
        features.push(result.data);
      } else {
        issues.push(...result.error);
      }
    }
    const collection = {
      type: "FeatureCollection",
      features
    };
    return ResultUtils.ok(collection);
  }
  /**
   * Parses way-based building
   */
  static parseWayBuilding(way, nodes) {
    const issues = [];
    const wayValidation = OSMValidation.validateWay(way);
    issues.push(...wayValidation.errors, ...wayValidation.warnings);
    if (!wayValidation.valid) {
      return ResultUtils.error(issues);
    }
    const coordinates = [];
    for (const nodeId of way.nodes) {
      const node = nodes.get(nodeId);
      if (!node) {
        issues.push({
          severity: "error",
          code: "MISSING_NODE",
          message: `Node ${nodeId} not found`,
          element: way
        });
        continue;
      }
      coordinates.push([node.lon, node.lat]);
    }
    if (coordinates.length < 3) {
      return ResultUtils.error([{
        severity: "error",
        code: "INSUFFICIENT_COORDINATES",
        message: "Building way must have at least 3 coordinates",
        element: way
      }]);
    }
    const firstCoord = coordinates[0];
    const lastCoord = coordinates[coordinates.length - 1];
    if (!firstCoord || !lastCoord || firstCoord[0] !== lastCoord[0] || firstCoord[1] !== lastCoord[1]) {
      coordinates.push(coordinates[0]);
    }
    const geometry = {
      type: "Polygon",
      coordinates: [coordinates]
    };
    const properties = this.processProperties(way.tags || {}, way.id, "way");
    if (way.tags) {
      issues.push(...AddressProcessor.validateAddress(way.tags));
    }
    const feature = {
      type: "Feature",
      geometry,
      properties
    };
    return ResultUtils.ok(feature);
  }
  /**
   * Parses relation-based building (multipolygon)
   */
  static parseRelationBuilding(relation, ways, nodes) {
    const issues = [];
    const relationValidation = OSMValidation.validateRelation(relation);
    issues.push(...relationValidation.errors, ...relationValidation.warnings);
    if (!relationValidation.valid) {
      return ResultUtils.error(issues);
    }
    const outerMembers = relation.members.filter((m) => m.role === "outer" && m.type === "way");
    if (outerMembers.length === 0) {
      return ResultUtils.error([{
        severity: "error",
        code: "NO_OUTER_MEMBERS",
        message: "Relation building must have outer way members",
        element: relation
      }]);
    }
    const firstOuterWay = ways.find((w) => w.id === outerMembers[0]?.ref);
    if (!firstOuterWay) {
      return ResultUtils.error([{
        severity: "error",
        code: "OUTER_WAY_NOT_FOUND",
        message: "Outer way not found in data",
        element: relation
      }]);
    }
    const wayResult = this.parseWayBuilding(firstOuterWay, nodes);
    if (!wayResult.ok) {
      return wayResult;
    }
    const properties = this.processProperties(relation.tags || {}, relation.id, "relation");
    const feature = {
      ...wayResult.data,
      properties
    };
    return ResultUtils.ok(feature);
  }
  /**
   * Processes OSM tags σε feature properties
   */
  static processProperties(tags, id, type) {
    const building = tags.building || "yes";
    return {
      id,
      type,
      building: BuildingClassifier.normalizeBuildingType(building),
      category: BuildingClassifier.getBuildingCategory(building),
      name: tags.name,
      height: tags.height,
      levels: tags["building:levels"],
      addr_housenumber: tags["addr:housenumber"],
      addr_street: tags["addr:street"],
      addr_city: tags["addr:city"],
      addr_postcode: tags["addr:postcode"],
      address: AddressProcessor.formatAddress(tags),
      // Include all original tags για flexibility
      ...tags
    };
  }
};

// src/parsers/boundaries.ts
var GreekAdminHierarchy;
((GreekAdminHierarchy2) => {
  GreekAdminHierarchy2.getAdminLevelName = (level) => {
    const names = {
      [ADMIN_LEVELS.COUNTRY]: "\u03A7\u03CE\u03C1\u03B1",
      [ADMIN_LEVELS.REGION]: "\u03A0\u03B5\u03C1\u03B9\u03C6\u03AD\u03C1\u03B5\u03B9\u03B1",
      [ADMIN_LEVELS.REGIONAL_UNIT]: "\u03A0\u03B5\u03C1\u03B9\u03C6\u03B5\u03C1\u03B5\u03B9\u03B1\u03BA\u03AE \u0395\u03BD\u03CC\u03C4\u03B7\u03C4\u03B1",
      [ADMIN_LEVELS.MUNICIPALITY]: "\u0394\u03AE\u03BC\u03BF\u03C2",
      [ADMIN_LEVELS.COMMUNITY]: "\u039A\u03BF\u03B9\u03BD\u03CC\u03C4\u03B7\u03C4\u03B1",
      [ADMIN_LEVELS.SETTLEMENT]: "\u039F\u03B9\u03BA\u03B9\u03C3\u03BC\u03CC\u03C2"
    };
    return names[level] || `\u0395\u03C0\u03AF\u03C0\u03B5\u03B4\u03BF ${level}`;
  };
  GreekAdminHierarchy2.isValidGreekAdminLevel = (level) => {
    const validLevels = Object.values(ADMIN_LEVELS);
    return validLevels.includes(level);
  };
  GreekAdminHierarchy2.getParentAdminLevel = (level) => {
    switch (level) {
      case ADMIN_LEVELS.SETTLEMENT:
        return ADMIN_LEVELS.COMMUNITY;
      case ADMIN_LEVELS.COMMUNITY:
        return ADMIN_LEVELS.MUNICIPALITY;
      case ADMIN_LEVELS.MUNICIPALITY:
        return ADMIN_LEVELS.REGIONAL_UNIT;
      case ADMIN_LEVELS.REGIONAL_UNIT:
        return ADMIN_LEVELS.REGION;
      case ADMIN_LEVELS.REGION:
        return ADMIN_LEVELS.COUNTRY;
      case ADMIN_LEVELS.COUNTRY:
        return void 0;
      default:
        return void 0;
    }
  };
  GreekAdminHierarchy2.getChildAdminLevels = (level) => {
    switch (level) {
      case ADMIN_LEVELS.COUNTRY:
        return [ADMIN_LEVELS.REGION];
      case ADMIN_LEVELS.REGION:
        return [ADMIN_LEVELS.REGIONAL_UNIT];
      case ADMIN_LEVELS.REGIONAL_UNIT:
        return [ADMIN_LEVELS.MUNICIPALITY];
      case ADMIN_LEVELS.MUNICIPALITY:
        return [ADMIN_LEVELS.COMMUNITY];
      case ADMIN_LEVELS.COMMUNITY:
        return [ADMIN_LEVELS.SETTLEMENT];
      case ADMIN_LEVELS.SETTLEMENT:
        return [];
      default:
        return [];
    }
  };
})(GreekAdminHierarchy || (GreekAdminHierarchy = {}));
var BoundaryNameProcessor;
((BoundaryNameProcessor2) => {
  BoundaryNameProcessor2.extractNameVariants = (tags) => {
    const nameEl = tags["name:el"];
    const nameEn = tags["name:en"];
    const name = tags.name;
    const officialName = tags.official_name;
    const primary = nameEl || name || nameEn || officialName;
    const allNames = [name, nameEl, nameEn, officialName].filter((n) => Boolean(n));
    const variants = [...new Set(allNames)];
    return {
      primary,
      greek: nameEl,
      english: nameEn,
      official: officialName,
      variants
    };
  };
  BoundaryNameProcessor2.normalizeBoundaryName = (name) => {
    return normalizeAreaName(name);
  };
  BoundaryNameProcessor2.generateBoundarySearchVariants = (tags) => {
    const nameData = (0, BoundaryNameProcessor2.extractNameVariants)(tags);
    const allVariants = /* @__PURE__ */ new Set();
    for (const name of nameData.variants) {
      const variants = generateSearchVariants(name);
      variants.forEach((v) => allVariants.add(v));
    }
    return Array.from(allVariants);
  };
  BoundaryNameProcessor2.validateNames = (tags) => {
    const issues = [];
    const nameData = (0, BoundaryNameProcessor2.extractNameVariants)(tags);
    if (!nameData.primary) {
      issues.push({
        severity: "error",
        code: "MISSING_NAME",
        message: "Boundary must have at least one name",
        location: void 0
      });
    }
    if (!nameData.greek && nameData.primary) {
      issues.push({
        severity: "warning",
        code: "MISSING_GREEK_NAME",
        message: "Boundary missing Greek name (name:el)",
        location: void 0
      });
    }
    if (!nameData.english && nameData.primary) {
      issues.push({
        severity: "info",
        code: "MISSING_ENGLISH_NAME",
        message: "Boundary missing English name (name:en)",
        location: void 0
      });
    }
    return issues;
  };
})(BoundaryNameProcessor || (BoundaryNameProcessor = {}));
var BoundaryStatsProcessor;
((BoundaryStatsProcessor2) => {
  BoundaryStatsProcessor2.parsePopulation = (population) => {
    if (!population) return void 0;
    const cleaned = population.replace(/[,.\s]/g, "");
    const parsed = parseInt(cleaned, 10);
    if (!Number.isInteger(parsed) || parsed <= 0) return void 0;
    if (parsed > 1e8) return void 0;
    return parsed;
  };
  BoundaryStatsProcessor2.parseArea = (area) => {
    if (!area) return void 0;
    const trimmed = area.trim().toLowerCase();
    let sqKm;
    if (trimmed.includes("km")) {
      sqKm = parseFloat(trimmed.replace(/km²?|km2/g, ""));
    } else if (trimmed.includes("m\xB2") || trimmed.includes("m2")) {
      const sqM = parseFloat(trimmed.replace(/m²?|m2/g, ""));
      sqKm = sqM / 1e6;
    } else {
      sqKm = parseFloat(trimmed);
    }
    if (!Number.isFinite(sqKm) || sqKm <= 0) return void 0;
    if (sqKm > 2e5) return void 0;
    return Math.round(sqKm * 100) / 100;
  };
  BoundaryStatsProcessor2.formatPopulation = (population) => {
    return population.toLocaleString("el-GR");
  };
  BoundaryStatsProcessor2.formatArea = (area) => {
    return `${area.toLocaleString("el-GR")} km\xB2`;
  };
})(BoundaryStatsProcessor || (BoundaryStatsProcessor = {}));
var RingAssembler;
((RingAssembler2) => {
  RingAssembler2.assembleRings = (members, ways, nodes) => {
    const issues = [];
    const outer = [];
    const inner = [];
    const outerMembers = members.filter((m) => m.role === "outer" && m.type === "way");
    const innerMembers = members.filter((m) => m.role === "inner" && m.type === "way");
    for (const member of outerMembers) {
      const way = ways.get(member.ref);
      if (!way) {
        issues.push({
          severity: "warning",
          code: "MISSING_OUTER_WAY",
          message: `Outer way ${member.ref} not found`,
          location: void 0
        });
        continue;
      }
      const coordinates = RingAssembler2.wayToCoordinates(way, nodes);
      if (coordinates.length >= 3) {
        outer.push(coordinates);
      }
    }
    for (const member of innerMembers) {
      const way = ways.get(member.ref);
      if (!way) {
        issues.push({
          severity: "warning",
          code: "MISSING_INNER_WAY",
          message: `Inner way ${member.ref} not found`,
          location: void 0
        });
        continue;
      }
      const coordinates = RingAssembler2.wayToCoordinates(way, nodes);
      if (coordinates.length >= 3) {
        inner.push(coordinates);
      }
    }
    if (outer.length === 0) {
      return ResultUtils.error([{
        severity: "error",
        code: "NO_OUTER_RINGS",
        message: "Multipolygon must have at least one outer ring",
        location: void 0
      }]);
    }
    return ResultUtils.ok({ outer, inner });
  };
  RingAssembler2.wayToCoordinates = (way, nodes) => {
    const coordinates = [];
    for (const nodeId of way.nodes) {
      const node = nodes.get(nodeId);
      if (node) {
        coordinates.push([node.lon, node.lat]);
      }
    }
    if (coordinates.length >= 3) {
      const first = coordinates[0];
      const last = coordinates[coordinates.length - 1];
      if (first && last && (first[0] !== last[0] || first[1] !== last[1])) {
        coordinates.push(first);
      }
    }
    return coordinates;
  };
})(RingAssembler || (RingAssembler = {}));
var BoundariesParser = class {
  /**
   * Parses Overpass response σε boundary features
   */
  static parseOverpassResponse(response) {
    const validation = OSMValidation.validateOverpassResponse(response);
    const issues = [...validation.errors, ...validation.warnings];
    if (!validation.valid) {
      return ResultUtils.error(issues);
    }
    const nodes = /* @__PURE__ */ new Map();
    const ways = /* @__PURE__ */ new Map();
    const relations = [];
    for (const element of response.elements) {
      switch (element.type) {
        case "node":
          nodes.set(element.id, element);
          break;
        case "way":
          ways.set(element.id, element);
          break;
        case "relation":
          if (element.tags?.boundary === "administrative") {
            relations.push(element);
          }
          break;
      }
    }
    const features = [];
    for (const relation of relations) {
      const result = this.parseAdminBoundary(relation, ways, nodes);
      if (result.ok) {
        features.push(result.data);
      } else {
        issues.push(...result.error);
      }
    }
    const collection = {
      type: "FeatureCollection",
      features
    };
    return ResultUtils.ok(collection);
  }
  /**
   * Parses relation-based administrative boundary
   */
  static parseAdminBoundary(relation, ways, nodes) {
    const issues = [];
    const relationValidation = OSMValidation.validateRelation(relation);
    issues.push(...relationValidation.errors, ...relationValidation.warnings);
    if (!relationValidation.valid) {
      return ResultUtils.error(issues);
    }
    const tags = relation.tags || {};
    const adminLevelStr = tags.admin_level;
    if (!adminLevelStr) {
      return ResultUtils.error([{
        severity: "error",
        code: "MISSING_ADMIN_LEVEL",
        message: "Administrative boundary must have admin_level tag",
        element: relation
      }]);
    }
    const adminLevel = parseInt(adminLevelStr, 10);
    if (!GreekAdminHierarchy.isValidGreekAdminLevel(adminLevel)) {
      issues.push({
        severity: "warning",
        code: "INVALID_ADMIN_LEVEL",
        message: `Admin level ${adminLevel} is not standard \u03B3\u03B9\u03B1 Greece`,
        element: relation
      });
    }
    issues.push(...BoundaryNameProcessor.validateNames(tags));
    const ringsResult = RingAssembler.assembleRings(relation.members, ways, nodes);
    if (!ringsResult.ok) {
      return ResultUtils.error(ringsResult.error);
    }
    const { outer, inner } = ringsResult.data;
    let geometry;
    if (outer.length === 1) {
      const coordinates = inner.length > 0 ? [outer[0], ...inner] : [outer[0]];
      geometry = {
        type: "Polygon",
        coordinates
      };
    } else {
      const polygons = outer.map((ring) => [ring]);
      geometry = {
        type: "MultiPolygon",
        coordinates: polygons
      };
    }
    const properties = this.processProperties(tags, relation.id);
    const feature = {
      type: "Feature",
      geometry,
      properties
    };
    return ResultUtils.ok(feature);
  }
  /**
   * Processes OSM tags σε feature properties
   */
  static processProperties(tags, id) {
    const nameData = BoundaryNameProcessor.extractNameVariants(tags);
    const adminLevel = parseInt(tags.admin_level || "0", 10);
    return {
      id,
      type: "relation",
      admin_level: adminLevel.toString(),
      admin_level_name: GreekAdminHierarchy.getAdminLevelName(adminLevel),
      name: nameData.primary,
      name_el: nameData.greek,
      name_en: nameData.english,
      official_name: nameData.official,
      boundary: tags.boundary || "administrative",
      place: tags.place,
      population: tags.population,
      population_formatted: tags.population ? BoundaryStatsProcessor.formatPopulation(BoundaryStatsProcessor.parsePopulation(tags.population) || 0) : void 0,
      area: tags.area,
      area_formatted: tags.area ? BoundaryStatsProcessor.formatArea(BoundaryStatsProcessor.parseArea(tags.area) || 0) : void 0,
      wikidata: tags.wikidata,
      wikipedia: tags.wikipedia,
      search_variants: BoundaryNameProcessor.generateBoundarySearchVariants(tags),
      // Include all original tags για flexibility
      ...tags
    };
  }
};

// src/repositories/overpass-repository.ts
var OverpassQueryBuilder = class {
  constructor() {
    __publicField(this, "elements", []);
    __publicField(this, "filters", []);
    __publicField(this, "bbox");
    __publicField(this, "timeout", 30);
    __publicField(this, "format", "json");
    __publicField(this, "output", "out geom");
  }
  /**
   * Sets query timeout
   */
  setTimeout(seconds) {
    this.timeout = Math.max(1, Math.min(60, seconds));
    return this;
  }
  /**
   * Sets output format
   */
  setFormat(format) {
    this.format = format;
    return this;
  }
  /**
   * Sets output verbosity
   */
  setOutput(output) {
    this.output = output;
    return this;
  }
  /**
   * Sets bounding box για query
   */
  setBBox(bbox) {
    this.bbox = bbox;
    return this;
  }
  /**
   * Adds element type για query
   */
  addElement(element) {
    if (!this.elements.includes(element)) {
      this.elements.push(element);
    }
    return this;
  }
  /**
   * Adds filter για tags
   */
  addFilter(filter) {
    this.filters.push(filter);
    return this;
  }
  /**
   * Adds tag equals filter
   */
  addTagEquals(key, value) {
    return this.addFilter({
      key,
      value,
      operator: "="
    });
  }
  /**
   * Adds tag exists filter
   */
  addTagExists(key) {
    return this.addFilter({
      key,
      operator: "exists"
    });
  }
  /**
   * Adds tag regex filter
   */
  addTagRegex(key, pattern, caseSensitive = false) {
    return this.addFilter({
      key,
      value: pattern,
      operator: "~",
      caseSensitive
    });
  }
  /**
   * Builds final Overpass QL query
   */
  build() {
    const parts = [];
    parts.push(`[out:${this.format}][timeout:${this.timeout}];`);
    parts.push("(");
    for (const element of this.elements) {
      const elementQuery = this.buildElementQuery(element);
      if (elementQuery) {
        parts.push(`  ${elementQuery}`);
      }
    }
    parts.push(");");
    parts.push(`${this.output};`);
    return parts.join("\n");
  }
  buildElementQuery(element) {
    const parts = [element];
    for (const filter of this.filters) {
      parts.push(this.buildFilterString(filter));
    }
    if (this.bbox) {
      const bboxStr = `(${this.bbox.south},${this.bbox.west},${this.bbox.north},${this.bbox.east})`;
      parts.push(bboxStr);
    }
    return parts.join("") + ";";
  }
  buildFilterString(filter) {
    const key = createSafeTagValue(filter.key);
    switch (filter.operator) {
      case "=":
        return `["${key}"="${createSafeTagValue(filter.value || "")}"]`;
      case "!=":
        return `["${key}"!="${createSafeTagValue(filter.value || "")}"]`;
      case "~":
        const regexFlag = filter.caseSensitive === false ? "i" : "";
        return `["${key}"~"${createSafeTagValue(filter.value || "")}"${regexFlag}]`;
      case "!~":
        const negRegexFlag = filter.caseSensitive === false ? "i" : "";
        return `["${key}"!~"${createSafeTagValue(filter.value || "")}"${negRegexFlag}]`;
      case "exists":
        return `["${key}"]`;
      case "!exists":
        return `[!"${key}"]`;
      default:
        return `["${key}"]`;
    }
  }
};
var BuildingsRepository = class {
  constructor(httpClient, cache) {
    this.httpClient = httpClient;
    this.cache = cache;
  }
  /**
   * Searches για buildings σε bounding box
   */
  async findInBBox(bbox, config = {}) {
    const bboxValidation = CoordinateValidation.validateBBox(bbox);
    if (!bboxValidation.valid) {
      return ResultUtils.error(
        new Error(`Invalid bounding box: ${bboxValidation.errors.map((e) => e.message).join(", ")}`)
      );
    }
    const fullConfig = {
      includeBuildingTypes: ["yes", "house", "residential", "apartments", "commercial", "office"],
      excludeBuildingTypes: [],
      minArea: 0,
      maxArea: Infinity,
      includeAddresses: true,
      ...config
    };
    const cacheKey = createCacheKey("buildings", { bbox, config: fullConfig });
    const cached = this.cache.buildings.get(cacheKey);
    if (cached) {
      return ResultUtils.ok(cached);
    }
    const query = new OverpassQueryBuilder().setTimeout(30).setBBox(bbox).addElement("way").addElement("relation").addTagExists("building");
    if (fullConfig.includeBuildingTypes.length > 0) {
      const typePattern = fullConfig.includeBuildingTypes.join("|");
      query.addTagRegex("building", `^(${typePattern})$`);
    }
    const queryString = query.build();
    const response = await this.httpClient.executeQuery(queryString);
    if (!response.ok) {
      return ResultUtils.error(response.error);
    }
    let overpassData;
    try {
      overpassData = JSON.parse(response.data);
    } catch (error) {
      return ResultUtils.error(new Error("Failed to parse Overpass response"));
    }
    const parseResult = BuildingsParser.parseOverpassResponse(overpassData);
    if (!parseResult.ok) {
      return ResultUtils.error(
        new Error(`Parse error: ${parseResult.error.map((e) => e.message).join(", ")}`)
      );
    }
    let features = parseResult.data.features;
    if (fullConfig.excludeBuildingTypes.length > 0) {
      features = features.filter(
        (f) => !fullConfig.excludeBuildingTypes.includes(f.properties.building)
      );
    }
    const result = {
      type: "FeatureCollection",
      features
    };
    this.cache.buildings.set(cacheKey, result);
    return ResultUtils.ok(result);
  }
  /**
   * Finds buildings near a point
   */
  async findNearPoint(point, radiusMeters, config = {}) {
    const degreeRadius = radiusMeters / 111e3;
    const bbox = {
      south: point.lat - degreeRadius,
      west: point.lng - degreeRadius,
      north: point.lat + degreeRadius,
      east: point.lng + degreeRadius
    };
    return this.findInBBox(bbox, config);
  }
  /**
   * Gets building by OSM ID
   */
  async findById(id, type) {
    const cacheKey = createCacheKey("building-by-id", { id, type });
    const cached = this.cache.buildings.get(cacheKey);
    if (cached) {
      return ResultUtils.ok(cached);
    }
    const queryString = `
      [out:json][timeout:10];
      (
        ${type}(${id});
      );
      out geom;
    `;
    const response = await this.httpClient.executeQuery(queryString);
    if (!response.ok) {
      return ResultUtils.error(response.error);
    }
    let overpassData;
    try {
      overpassData = JSON.parse(response.data);
    } catch (error) {
      return ResultUtils.error(new Error("Failed to parse Overpass response"));
    }
    const parseResult = BuildingsParser.parseOverpassResponse(overpassData);
    if (!parseResult.ok) {
      return ResultUtils.error(
        new Error(`Parse error: ${parseResult.error.map((e) => e.message).join(", ")}`)
      );
    }
    this.cache.buildings.set(cacheKey, parseResult.data, 60 * 60 * 1e3);
    return ResultUtils.ok(parseResult.data);
  }
};
var BoundariesRepository = class {
  constructor(httpClient, cache) {
    this.httpClient = httpClient;
    this.cache = cache;
  }
  /**
   * Searches για administrative boundaries by name
   */
  async searchByName(name, config = {}) {
    const validation = validateQueryString(name);
    if (!validation.valid) {
      return ResultUtils.error(new Error(validation.reason));
    }
    const fullConfig = {
      adminLevels: [4, 6, 8],
      // Region, Regional Unit, Municipality
      searchVariants: true,
      exactMatch: false,
      fallbackToPartial: true,
      maxResults: 10,
      ...config
    };
    const cacheKey = createCacheKey("boundaries-by-name", { name, config: fullConfig });
    const cached = this.cache.boundaries.get(cacheKey);
    if (cached) {
      return ResultUtils.ok(cached);
    }
    const query = new OverpassQueryBuilder().setTimeout(30).addElement("relation").addTagEquals("boundary", "administrative");
    if (fullConfig.adminLevels.length > 0) {
      const levelPattern = fullConfig.adminLevels.join("|");
      query.addTagRegex("admin_level", `^(${levelPattern})$`);
    }
    if (fullConfig.exactMatch) {
      query.addTagEquals("name", name);
    } else {
      query.addTagRegex("name", name, false);
    }
    const queryString = query.build();
    console.log("\u{1F50D} Generated Boundary Search Query:", queryString);
    const response = await this.httpClient.executeQuery(queryString);
    if (!response.ok) {
      return ResultUtils.error(response.error);
    }
    let overpassData;
    try {
      overpassData = JSON.parse(response.data);
    } catch (error) {
      return ResultUtils.error(new Error("Failed to parse Overpass response"));
    }
    const parseResult = BoundariesParser.parseOverpassResponse(overpassData);
    if (!parseResult.ok) {
      return ResultUtils.error(
        new Error(`Parse error: ${parseResult.error.map((e) => e.message).join(", ")}`)
      );
    }
    let features = parseResult.data.features;
    if (fullConfig.maxResults > 0) {
      features = features.slice(0, fullConfig.maxResults);
    }
    const result = {
      type: "FeatureCollection",
      features
    };
    this.cache.boundaries.set(cacheKey, result, 2 * 60 * 60 * 1e3);
    return ResultUtils.ok(result);
  }
  /**
   * Gets boundary by admin level and name
   */
  async findByAdminLevel(adminLevel, name) {
    const cacheKey = createCacheKey("boundaries-by-admin-level", { adminLevel, name });
    const cached = this.cache.boundaries.get(cacheKey);
    if (cached) {
      return ResultUtils.ok(cached);
    }
    const query = new OverpassQueryBuilder().setTimeout(30).addElement("relation").addTagEquals("boundary", "administrative").addTagEquals("admin_level", adminLevel.toString());
    if (name) {
      const validation = validateQueryString(name);
      if (!validation.valid) {
        return ResultUtils.error(new Error(validation.reason));
      }
      query.addTagRegex("name", name, false);
    }
    const queryString = query.build();
    const response = await this.httpClient.executeQuery(queryString);
    if (!response.ok) {
      return ResultUtils.error(response.error);
    }
    let overpassData;
    try {
      overpassData = JSON.parse(response.data);
    } catch (error) {
      return ResultUtils.error(new Error("Failed to parse Overpass response"));
    }
    const parseResult = BoundariesParser.parseOverpassResponse(overpassData);
    if (!parseResult.ok) {
      return ResultUtils.error(
        new Error(`Parse error: ${parseResult.error.map((e) => e.message).join(", ")}`)
      );
    }
    this.cache.boundaries.set(cacheKey, parseResult.data, 2 * 60 * 60 * 1e3);
    return ResultUtils.ok(parseResult.data);
  }
  /**
   * Gets boundary containing a point
   */
  async findContainingPoint(point, adminLevel) {
    const pointValidation = CoordinateValidation.validatePoint(point);
    if (!pointValidation.valid) {
      return ResultUtils.error(
        new Error(`Invalid point: ${pointValidation.errors.map((e) => e.message).join(", ")}`)
      );
    }
    const cacheKey = createCacheKey("boundaries-containing-point", { point, adminLevel });
    const cached = this.cache.boundaries.get(cacheKey);
    if (cached) {
      return ResultUtils.ok(cached);
    }
    const query = new OverpassQueryBuilder().setTimeout(30).addElement("relation").addTagEquals("boundary", "administrative");
    if (adminLevel) {
      query.addTagEquals("admin_level", adminLevel.toString());
    }
    const buffer = 0.01;
    const bbox = {
      south: point.lat - buffer,
      west: point.lng - buffer,
      north: point.lat + buffer,
      east: point.lng + buffer
    };
    query.setBBox(bbox);
    const queryString = query.build();
    const response = await this.httpClient.executeQuery(queryString);
    if (!response.ok) {
      return ResultUtils.error(response.error);
    }
    let overpassData;
    try {
      overpassData = JSON.parse(response.data);
    } catch (error) {
      return ResultUtils.error(new Error("Failed to parse Overpass response"));
    }
    const parseResult = BoundariesParser.parseOverpassResponse(overpassData);
    if (!parseResult.ok) {
      return ResultUtils.error(
        new Error(`Parse error: ${parseResult.error.map((e) => e.message).join(", ")}`)
      );
    }
    this.cache.boundaries.set(cacheKey, parseResult.data, 30 * 60 * 1e3);
    return ResultUtils.ok(parseResult.data);
  }
};
var OSMRepositoryManager = class {
  constructor(httpClient, cache) {
    this.httpClient = httpClient;
    this.cache = cache;
    __publicField(this, "buildings");
    __publicField(this, "boundaries");
    this.buildings = new BuildingsRepository(httpClient, cache);
    this.boundaries = new BoundariesRepository(httpClient, cache);
  }
  /**
   * Gets performance metrics από all repositories
   */
  getMetrics() {
    return {
      http: this.httpClient.getHealthStatus(),
      cache: this.cache.getAllStats()
    };
  }
  /**
   * Clears all caches
   */
  clearCaches() {
    this.cache.clearAll();
  }
  /**
   * Performs cleanup operations
   */
  cleanup() {
    this.cache.cleanupAll();
    this.httpClient.clearOldMetrics();
  }
};
var createRepositoryManager = () => {
  const httpClient = createHTTPClient();
  const cache = createCacheManager();
  return new OSMRepositoryManager(httpClient, cache);
};

// src/index.ts
var OSMClientImpl = class {
  constructor(config = {}) {
    __publicField(this, "startTime", Date.now());
    __publicField(this, "cache");
    __publicField(this, "httpClient");
    __publicField(this, "_boundaries");
    __publicField(this, "_buildings");
    this.cache = new OSMCacheManager({
      maxSize: config.cache?.maxSize || 500,
      ttlMs: config.cache?.ttlMs || 10 * 60 * 1e3,
      cleanupIntervalMs: config.cache?.cleanupIntervalMs || 5 * 60 * 1e3
    });
    this.httpClient = new OverpassHTTPClient({
      servers: config.http?.servers || [
        "https://overpass-api.de/api/interpreter",
        "https://overpass.kumi.systems/api/interpreter",
        "https://overpass.openstreetmap.ru/api/interpreter"
      ],
      timeout: config.http?.timeout || 3e4,
      userAgent: config.http?.userAgent || "Layera-Enterprise-OSM/1.0",
      rateLimitRps: config.http?.rateLimitRps || 1,
      retryAttempts: config.http?.retryAttempts || 3,
      retryDelayMs: config.http?.retryDelayMs || 1e3
    });
    this._boundaries = new BoundariesRepository(this.httpClient, this.cache);
    this._buildings = new BuildingsRepository(this.httpClient, this.cache);
    if (config.debug) {
      console.log("OSM Client initialized with config:", config);
    }
  }
  get buildings() {
    return this._buildings;
  }
  get boundaries() {
    return this._boundaries;
  }
  getHealth() {
    return {
      http: { status: "ok" },
      cache: { status: "ok", entries: 0 },
      uptime: Date.now() - this.startTime
    };
  }
  clearCaches() {
    this.cache.clearAll();
  }
  cleanup() {
    this.cache.cleanupAll();
  }
  destroy() {
    this.cache.destroy();
  }
};
var createOSMClient = (config = {}) => {
  return new OSMClientImpl(config);
};
var defaultOSMClient = createOSMClient();
var OSMService = {
  /**
   * Searches για buildings σε bounding box
   */
  findBuildings: defaultOSMClient.buildings.findInBBox.bind(defaultOSMClient.buildings),
  /**
   * Searches για buildings near point
   */
  findBuildingsNearPoint: defaultOSMClient.buildings.findNearPoint.bind(defaultOSMClient.buildings),
  /**
   * Searches για boundaries by name
   */
  searchBoundaries: defaultOSMClient.boundaries.searchByName.bind(defaultOSMClient.boundaries),
  /**
   * Gets boundaries containing point
   */
  findBoundariesContainingPoint: defaultOSMClient.boundaries.findContainingPoint.bind(defaultOSMClient.boundaries),
  /**
   * Gets client health
   */
  getHealth: defaultOSMClient.getHealth.bind(defaultOSMClient),
  /**
   * Clears all caches
   */
  clearCaches: defaultOSMClient.clearCaches.bind(defaultOSMClient)
};
var version = "1.0.0";
var packageInfo = {
  name: "@layera/osm",
  version,
  description: "Enterprise-grade OpenStreetMap services \u03B3\u03B9\u03B1 Layera ecosystem",
  author: "Layera Development Team",
  license: "MIT"
};
export {
  ADMIN_LEVELS,
  AddressProcessor,
  BoundariesParser,
  BoundariesRepository,
  BoundaryNameProcessor,
  BoundaryStatsProcessor,
  BuildingClassifier,
  BuildingsParser,
  BuildingsRepository,
  CoordinateValidation,
  GeoConstants,
  GeoUtils,
  GreekAdminHierarchy,
  HTTPError,
  HeightProcessor,
  LayeraCache,
  LeafletCompat,
  NetworkError2 as NetworkError,
  OSMCacheManager,
  OSMConstants,
  OSMError,
  NetworkError as OSMNetworkError,
  OSMRepositoryManager,
  OSMService,
  TimeoutError as OSMTimeoutError,
  OSMTypeGuards,
  OSMValidation,
  ValidationError as OSMValidationError,
  OverpassHTTPClient,
  OverpassQueryBuilder,
  ParseError,
  QueryValidation,
  ResultUtils,
  RingAssembler,
  StringConstants,
  TimeoutError2 as TimeoutError,
  ValidationConstants,
  createCacheKey,
  createCacheManager,
  createDefaultCacheConfig,
  createDefaultClientConfig,
  createHTTPClient,
  createOSMClient,
  createRepositoryManager,
  createSafeTagValue,
  defaultOSMClient,
  escapeRegex,
  formatCoordinateForDisplay,
  generateSearchVariants,
  normalizeAreaName,
  packageInfo,
  sanitizeInput,
  validateOSMId,
  validateQueryString,
  validateURL,
  version
};
//# sourceMappingURL=index.js.map