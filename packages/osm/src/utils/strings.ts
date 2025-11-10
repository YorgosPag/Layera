/**
 * @layera/osm - String Security & Utilities
 *
 * Enterprise-grade string processing με security hardening.
 * Προστασία από injection attacks και proper Unicode handling.
 */

/**
 * Escapes special regex characters για safe pattern matching
 * Προστασία από ReDoS (Regular Expression Denial of Service) attacks
 */
export const escapeRegex = (input: string): string => {
  return input.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

/**
 * Normalizes area names για consistent searching
 * Handles Greek diacritics, case variations, και common abbreviations
 */
export const normalizeAreaName = (name: string): string => {
  return name
    .toLowerCase()
    .trim()
    // Remove multiple spaces
    .replace(/\s+/g, ' ')
    // Greek diacritics normalization
    .replace(/ά/g, 'α')
    .replace(/έ/g, 'ε')
    .replace(/ή/g, 'η')
    .replace(/ί/g, 'ι')
    .replace(/ό/g, 'ο')
    .replace(/ύ/g, 'υ')
    .replace(/ώ/g, 'ω')
    .replace(/ΐ/g, 'ι')
    .replace(/ΰ/g, 'υ')
    // Common Greek abbreviations
    .replace(/\bδημ\b\.?/g, 'δήμος')
    .replace(/\bπεριφ\b\.?/g, 'περιφέρεια')
    .replace(/\bνομ\b\.?/g, 'νομός')
    // Remove punctuation except hyphens
    .replace(/[^\w\s\-α-ωΑ-Ω]/g, '')
    .trim();
};

/**
 * Generates search variants για area names
 * Περιλαμβάνει common variations που χρησιμοποιούν οι χρήστες
 */
export const generateSearchVariants = (name: string): readonly string[] => {
  const normalized = normalizeAreaName(name);
  const variants = new Set<string>();

  // Original normalized form
  variants.add(normalized);

  // Without common prefixes
  const withoutPrefix = normalized
    .replace(/^(δήμος|περιφέρεια|νομός)\s+/g, '')
    .trim();

  if (withoutPrefix !== normalized) {
    variants.add(withoutPrefix);
  }

  // With common prefixes
  if (!normalized.startsWith('δήμος ') && !normalized.startsWith('περιφέρεια ')) {
    variants.add(`δήμος ${withoutPrefix}`);
    variants.add(`περιφέρεια ${withoutPrefix}`);
  }

  // Partial matches for compound names
  const words = normalized.split(/\s+/);
  if (words.length > 1) {
    // First word only
    variants.add(words[0]!);
    // Last word only
    variants.add(words[words.length - 1]!);

    // All combinations of 2+ consecutive words
    for (let i = 0; i < words.length - 1; i++) {
      for (let j = i + 2; j <= words.length; j++) {
        variants.add(words.slice(i, j).join(' '));
      }
    }
  }

  return Array.from(variants).filter(v => v.length >= 2);
};

/**
 * Validates string input για OSM queries
 * Prevents injection attacks και validates length constraints
 */
export const validateQueryString = (input: string): { valid: boolean; reason?: string } => {
  if (typeof input !== 'string') {
    return { valid: false, reason: 'Input must be a string' };
  }

  if (input.length === 0) {
    return { valid: false, reason: 'Input cannot be empty' };
  }

  if (input.length > 200) {
    return { valid: false, reason: 'Input too long (max 200 characters)' };
  }

  // Check for suspicious patterns
  const suspiciousPatterns = [
    /[<>]/,                    // HTML tags
    /javascript:/i,            // JavaScript URLs
    /data:/i,                  // Data URLs
    /vbscript:/i,             // VBScript URLs
    /on\w+\s*=/i,             // Event handlers
    /\|\s*\w+/,               // Command injection
    /;\s*\w+/,                // Command chaining
    /\/\*[\s\S]*?\*\//,       // Block comments
    /--/,                      // SQL comments
    /union\s+select/i,         // SQL injection
    /insert\s+into/i,          // SQL injection
    /delete\s+from/i,          // SQL injection
    /drop\s+table/i,           // SQL injection
    /script\s*:/i,             // Script protocols
    /eval\s*\(/i,              // Code evaluation
  ];

  for (const pattern of suspiciousPatterns) {
    if (pattern.test(input)) {
      return { valid: false, reason: 'Input contains suspicious patterns' };
    }
  }

  return { valid: true };
};

/**
 * Sanitizes user input για safe processing
 * Removes potentially dangerous characters while preserving Greek text
 */
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '')           // Remove HTML brackets
    .replace(/[&]/g, '&amp;')       // Escape ampersand
    .replace(/['"]/g, '')           // Remove quotes
    .replace(/[\x00-\x1F\x7F]/g, '') // Remove control characters
    .trim();
};

/**
 * Formats coordinates για safe display
 * Prevents scientific notation και limits precision
 */
export const formatCoordinateForDisplay = (coord: number, precision = 6): string => {
  if (!Number.isFinite(coord)) {
    return '0.000000';
  }

  // Prevent scientific notation
  const fixed = coord.toFixed(precision);

  // Validate range
  if (Math.abs(coord) > 180) {
    return '0.000000';
  }

  return fixed;
};

/**
 * Creates safe OSM tag values για queries
 * Ensures proper escaping για Overpass QL syntax
 */
export const createSafeTagValue = (value: string): string => {
  return value
    .replace(/"/g, '\\"')     // Escape quotes
    .replace(/\\/g, '\\\\')   // Escape backslashes
    .replace(/\n/g, '\\n')    // Escape newlines
    .replace(/\r/g, '\\r')    // Escape carriage returns
    .replace(/\t/g, '\\t');   // Escape tabs
};

/**
 * Validates OSM element IDs
 * Ensures IDs are positive integers within valid range
 */
export const validateOSMId = (id: unknown): id is number => {
  return (
    typeof id === 'number' &&
    Number.isInteger(id) &&
    id > 0 &&
    id <= Number.MAX_SAFE_INTEGER
  );
};

/**
 * Creates hash για caching keys
 * Generates consistent cache keys από query parameters
 */
export const createCacheKey = (prefix: string, params: Record<string, unknown>): string => {
  const sortedParams = Object.keys(params)
    .sort()
    .map(key => `${key}:${JSON.stringify(params[key])}`)
    .join('|');

  // Simple hash function for cache keys
  let hash = 0;
  for (let i = 0; i < sortedParams.length; i++) {
    const char = sortedParams.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }

  return `${prefix}:${Math.abs(hash).toString(36)}`;
};

/**
 * Validates URL safety για external requests
 * Prevents SSRF attacks και validates allowed domains
 */
export const validateURL = (url: string, allowedDomains: readonly string[]): boolean => {
  try {
    const parsed = new URL(url);

    // Only allow HTTPS
    if (parsed.protocol !== 'https:') {
      return false;
    }

    // Check against allowed domains
    return allowedDomains.some(domain =>
      parsed.hostname === domain ||
      parsed.hostname.endsWith(`.${domain}`)
    );
  } catch {
    return false;
  }
};

/**
 * Constants για string validation
 */
export const StringConstants = {
  /** Maximum length για area name queries */
  MAX_QUERY_LENGTH: 200,

  /** Minimum length για meaningful searches */
  MIN_QUERY_LENGTH: 2,

  /** Maximum number of search variants */
  MAX_SEARCH_VARIANTS: 20,

  /** Coordinate display precision */
  COORDINATE_PRECISION: 6,

  /** Cache key prefix separator */
  CACHE_SEPARATOR: ':',

  /** Greek alphabet range για validation */
  GREEK_ALPHABET_REGEX: /[α-ωΑ-Ωάέήίόύώΐΰ]/,

  /** Latin alphabet range για validation */
  LATIN_ALPHABET_REGEX: /[a-zA-Z]/,
} as const;