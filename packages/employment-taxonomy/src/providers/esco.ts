/**
 * ESCO API Provider - Enterprise adapter για ESCO REST API
 * Official ESCO API: https://esco.ec.europa.eu/api/
 */

import type {
  ESCOApiConfig,
  ESCOSearchRequest,
  ESCOSearchResponse,
  ESCOOccupation,
  ESCOSkill,
  ESCOApiError
} from '../types/esco';

export class ESCOProvider {
  private config: Required<ESCOApiConfig>;
  private cache: Map<string, { data: unknown; expires: number }>;

  constructor(config: ESCOApiConfig = {}) {
    this.config = {
      baseUrl: config.baseUrl || 'https://esco.ec.europa.eu/api',
      timeout: config.timeout || 10000,
      enableCache: config.enableCache !== false,
      cacheTtl: config.cacheTtl || 300000, // 5 minutes
      defaultLanguage: config.defaultLanguage || 'el'
    };

    this.cache = new Map();
  }

  /**
   * Search occupations και skills στο ESCO API
   */
  async search(request: ESCOSearchRequest): Promise<ESCOSearchResponse> {
    const cacheKey = this.getCacheKey('search', request);

    // Check cache first
    if (this.config.enableCache) {
      const cached = this.getFromCache<ESCOSearchResponse>(cacheKey);
      if (cached) {
        return cached;
      }
    }

    const params = new URLSearchParams({
      text: request.text,
      type: request.type || 'occupation',
      language: request.language || this.config.defaultLanguage,
      limit: String(request.limit || 20),
      offset: String(request.offset || 0),
      mode: request.mode || 'contains'
    });

    if (request.includeSkills) {
      params.append('includeSkills', 'true');
    }

    const url = `${this.config.baseUrl}/search?${params.toString()}`;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout((): void => controller.abort(), this.config.timeout);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Layera-EmploymentTaxonomy/1.0'
        },
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new ESCOApiError(
          `ESCO_API_ERROR`,
          `ESCO API error: ${response.status} ${response.statusText}`,
          response.status
        );
      }

      const data = await response.json();

      // Transform ESCO API response to our format
      const searchResponse: ESCOSearchResponse = {
        results: this.transformSearchResults(data._embedded?.results || []),
        total: data.total || 0,
        offset: request.offset || 0,
        limit: request.limit || 20,
        meta: {
          processingTime: Date.now(), // Placeholder
          apiVersion: '1.2',
          language: request.language || this.config.defaultLanguage
        }
      };

      // Cache the response
      if (this.config.enableCache) {
        this.setCache(cacheKey, searchResponse);
      }
      return searchResponse;

    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        throw new ESCOApiError('ESCO_TIMEOUT', 'ESCO API request timeout', 408);
      }

      console.error('❌ ESCO API Error:', error);
      throw error instanceof ESCOApiError ? error :
        new ESCOApiError('ESCO_UNKNOWN', 'Unknown ESCO API error', 500);
    }
  }

  /**
   * Get detailed occupation information
   */
  async getOccupation(uri: string, language?: string): Promise<ESCOOccupation> {
    const cacheKey = this.getCacheKey('occupation', { uri, language });

    if (this.config.enableCache) {
      const cached = this.getFromCache<ESCOOccupation>(cacheKey);
      if (cached) {
        return cached;
      }
    }

    const params = new URLSearchParams({
      uri,
      language: language || this.config.defaultLanguage
    });

    const url = `${this.config.baseUrl}/resource/occupation?${params.toString()}`;

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'Layera-EmploymentTaxonomy/1.0'
        },
        signal: AbortSignal.timeout(this.config.timeout)
      });

      if (!response.ok) {
        throw new ESCOApiError(
          'ESCO_OCCUPATION_ERROR',
          `Failed to fetch occupation: ${response.statusText}`,
          response.status
        );
      }

      const data = await response.json();
      const occupation = this.transformOccupation(data);

      if (this.config.enableCache) {
        this.setCache(cacheKey, occupation);
      }

      return occupation;

    } catch (error) {
      console.error('❌ ESCO Occupation Error:', error);
      throw error instanceof ESCOApiError ? error :
        new ESCOApiError('ESCO_UNKNOWN', 'Failed to fetch occupation', 500);
    }
  }

  /**
   * Get occupation hierarchy/taxonomy
   */
  async getHierarchy(language?: string): Promise<unknown> {
    // FIXME: Implement hierarchy fetching - API implementation pending
    // This would fetch the ESCO occupation taxonomy structure
    return {};
  }

  /**
   * Transform ESCO API search results to our domain format
   */
  private transformSearchResults(results: unknown[]): (ESCOOccupation | ESCOSkill)[] {
    return results.map(result => this.transformSearchResult(result));
  }

  private transformSearchResult(result: unknown): ESCOOccupation | ESCOSkill {
    // Basic transformation από ESCO API format
    if (result._type === 'Occupation') {
      return this.transformOccupation(result);
    } else {
      return this.transformSkill(result);
    }
  }

  private transformOccupation(data: unknown): ESCOOccupation {
    return {
      uri: data.uri || data._id,
      uuid: data.uuid || this.extractUuidFromUri(data.uri),
      iscoGroup: data.iscoGroup,
      preferredLabel: data.preferredLabel || data.title,
      alternativeLabel: data.alternativeLabel || [],
      description: data.description,
      broaderOccupation: data.broaderOccupation || [],
      narrowerOccupation: data.narrowerOccupation || [],
      hasSkill: data.hasSkill || [],
      status: data.status || 'published',
      modifiedDate: data.modifiedDate
    };
  }

  private transformSkill(data: unknown): ESCOSkill {
    return {
      uri: data.uri || data._id,
      uuid: data.uuid || this.extractUuidFromUri(data.uri),
      preferredLabel: data.preferredLabel || data.title,
      alternativeLabel: data.alternativeLabel || [],
      description: data.description,
      skillType: data.skillType,
      broaderSkill: data.broaderSkill || [],
      status: data.status || 'published'
    };
  }

  private extractUuidFromUri(uri: string): string {
    // Extract UUID από ESCO URI (π.χ. από "/occupation/12345")
    const match = uri.match(/[a-f0-9-]{36}/i);
    return match?.[0] || uri;
  }

  private getCacheKey(operation: string, params: unknown): string {
    return `esco:${operation}:${JSON.stringify(params)}`;
  }

  private getFromCache<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    if (Date.now() > entry.expires) {
      this.cache.delete(key);
      return null;
    }

    return entry.data as T;
  }

  private setCache(key: string, data: unknown): void {
    const expires = Date.now() + this.config.cacheTtl;
    this.cache.set(key, { data, expires });
  }

  /**
   * Clear cache entries
   */
  clearCache(): void {
    this.cache.clear();
  }
}

class ESCOApiError extends Error {
  constructor(
    public code: string,
    message: string,
    public status: number,
    public details?: unknown
  ) {
    super(message);
    this.name = 'ESCOApiError';
  }
}

// Export singleton instance
export const escoProvider = new ESCOProvider();