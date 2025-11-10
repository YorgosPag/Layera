/**
 * @layera/osm - Enterprise HTTP Client
 *
 * Production-ready HTTP client με comprehensive error handling, retry logic,
 * circuit breaker pattern, και performance monitoring.
 *
 * Features:
 * - Exponential backoff retry strategy
 * - Circuit breaker για failing servers
 * - Request/response interceptors
 * - Performance metrics collection
 * - Timeout management με progressive timeouts
 * - Rate limiting compliance
 */

import type { AsyncResult } from '../types/result';
import { ResultUtils } from '../types/result';
import type { OverpassClientConfig, QueryMetrics } from '../types/osm';
import { validateURL } from '../utils/strings';

/**
 * HTTP client error types
 */
export class HTTPError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly response?: Response,
    public readonly url?: string
  ) {
    super(message);
    this.name = 'HTTPError';
  }
}

export class TimeoutError extends Error {
  constructor(
    message: string,
    public readonly timeoutMs: number,
    public readonly url?: string
  ) {
    super(message);
    this.name = 'TimeoutError';
  }
}

export class NetworkError extends Error {
  constructor(
    message: string,
    public readonly cause?: Error,
    public readonly url?: string
  ) {
    super(message);
    this.name = 'NetworkError';
  }
}

/**
 * Circuit breaker για server health tracking
 */
class CircuitBreaker {
  private failureCount = 0;
  private lastFailureTime = 0;
  private state: 'closed' | 'open' | 'half-open' = 'closed';

  constructor(
    private readonly failureThreshold = 5,
    private readonly recoveryTimeoutMs = 30000
  ) {}

  canExecute(): boolean {
    if (this.state === 'closed') {
      return true;
    }

    if (this.state === 'open') {
      if (Date.now() - this.lastFailureTime > this.recoveryTimeoutMs) {
        this.state = 'half-open';
        return true;
      }
      return false;
    }

    // half-open state
    return true;
  }

  onSuccess(): void {
    this.failureCount = 0;
    this.state = 'closed';
  }

  onFailure(): void {
    this.failureCount++;
    this.lastFailureTime = Date.now();

    if (this.failureCount >= this.failureThreshold) {
      this.state = 'open';
    }
  }

  getState(): string {
    return this.state;
  }

  getFailureCount(): number {
    return this.failureCount;
  }
}

/**
 * Rate limiter για API requests
 */
class RateLimiter {
  private requests: number[] = [];

  constructor(private readonly requestsPerSecond: number) {}

  canMakeRequest(): boolean {
    const now = Date.now();
    const oneSecondAgo = now - 1000;

    // Remove old requests
    this.requests = this.requests.filter(time => time > oneSecondAgo);

    return this.requests.length < this.requestsPerSecond;
  }

  recordRequest(): void {
    this.requests.push(Date.now());
  }

  getRequestCount(): number {
    const now = Date.now();
    const oneSecondAgo = now - 1000;
    return this.requests.filter(time => time > oneSecondAgo).length;
  }
}

/**
 * Request retry configuration
 */
export interface RetryConfig {
  readonly maxAttempts: number;
  readonly baseDelayMs: number;
  readonly maxDelayMs: number;
  readonly backoffMultiplier: number;
  readonly retryableStatusCodes: readonly number[];
}

/**
 * Enterprise HTTP client
 */
export class OverpassHTTPClient {
  private readonly circuitBreakers = new Map<string, CircuitBreaker>();
  private readonly rateLimiters = new Map<string, RateLimiter>();
  private readonly metrics: QueryMetrics[] = [];
  private readonly allowedDomains: readonly string[];

  constructor(private readonly config: OverpassClientConfig) {
    this.allowedDomains = config.servers.map(url => new URL(url).hostname);

    // Initialize circuit breakers and rate limiters for each server
    for (const server of config.servers) {
      this.circuitBreakers.set(server, new CircuitBreaker());
      this.rateLimiters.set(server, new RateLimiter(config.rateLimitRps));
    }
  }

  /**
   * Makes HTTP request με comprehensive error handling
   */
  async request(
    url: string,
    options: RequestInit = {},
    retryConfig?: Partial<RetryConfig>
  ): AsyncResult<Response, HTTPError | TimeoutError | NetworkError> {
    // Validate URL safety
    if (!validateURL(url, this.allowedDomains)) {
      return ResultUtils.error(
        new NetworkError(`URL not allowed: ${url}`, undefined, url)
      );
    }

    const fullRetryConfig: RetryConfig = {
      maxAttempts: this.config.retryAttempts,
      baseDelayMs: this.config.retryDelayMs,
      maxDelayMs: 30000,
      backoffMultiplier: 2,
      retryableStatusCodes: [408, 429, 500, 502, 503, 504],
      ...retryConfig
    };

    const hostname = new URL(url).hostname;
    const circuitBreaker = this.circuitBreakers.get(url);
    const rateLimiter = this.rateLimiters.get(url);

    if (!circuitBreaker?.canExecute()) {
      return ResultUtils.error(
        new NetworkError(`Circuit breaker open for ${hostname}`, undefined, url)
      );
    }

    if (!rateLimiter?.canMakeRequest()) {
      await this.sleep(1000 / this.config.rateLimitRps);
    }

    let lastError: HTTPError | TimeoutError | NetworkError | undefined;

    for (let attempt = 1; attempt <= fullRetryConfig.maxAttempts; attempt++) {
      const startTime = Date.now();

      try {
        // Record rate limit
        rateLimiter?.recordRequest();

        // Create abort controller for timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(
          () => controller.abort(),
          this.config.timeout
        );

        const requestOptions: RequestInit = {
          ...options,
          signal: controller.signal,
          headers: {
            'User-Agent': this.config.userAgent,
            'Accept': 'application/json',
            'Cache-Control': 'no-cache',
            ...options.headers
          }
        };

        const response = await fetch(url, requestOptions);
        clearTimeout(timeoutId);

        const endTime = Date.now();
        const duration = endTime - startTime;

        // Record metrics
        const metrics: QueryMetrics = {
          queryHash: this.createQueryHash(url, options),
          server: hostname,
          startTime,
          endTime,
          duration,
          elementCount: 0, // Will be filled by caller
          cacheHit: false,
          success: response.ok
        };

        if (!response.ok) {
          (metrics as any).error = `HTTP ${response.status}`;
        }

        this.recordMetrics(metrics);

        if (!response.ok) {
          const error = new HTTPError(
            `HTTP ${response.status}: ${response.statusText}`,
            response.status,
            response,
            url
          );

          // Check if this is a retryable error
          if (
            attempt < fullRetryConfig.maxAttempts &&
            fullRetryConfig.retryableStatusCodes.includes(response.status)
          ) {
            lastError = error;
            circuitBreaker?.onFailure();

            // Calculate delay with exponential backoff
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

        if (error instanceof Error && error.name === 'AbortError') {
          const timeoutError = new TimeoutError(
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
            error: 'Timeout'
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

        const networkError = new NetworkError(
          `Network error: ${error instanceof Error ? error.message : String(error)}`,
          error instanceof Error ? error : undefined,
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

    // All attempts failed
    return ResultUtils.error(
      lastError || new NetworkError('All retry attempts failed', undefined, url)
    );
  }

  /**
   * Executes Overpass query με automatic server fallback
   */
  async executeQuery(query: string): AsyncResult<string, HTTPError | TimeoutError | NetworkError> {
    const servers = [...this.config.servers];

    // Sort servers by health (circuit breaker state)
    servers.sort((a, b) => {
      const circuitA = this.circuitBreakers.get(a);
      const circuitB = this.circuitBreakers.get(b);

      if (circuitA?.canExecute() && !circuitB?.canExecute()) return -1;
      if (!circuitA?.canExecute() && circuitB?.canExecute()) return 1;

      // Prefer servers with fewer failures
      return (circuitA?.getFailureCount() || 0) - (circuitB?.getFailureCount() || 0);
    });

    let lastError: HTTPError | TimeoutError | NetworkError | undefined;

    for (const server of servers) {
      const circuitBreaker = this.circuitBreakers.get(server);

      if (!circuitBreaker?.canExecute()) {
        continue;
      }

      try {
        const result = await this.request(server, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: `data=${encodeURIComponent(query)}`
        });

        if (result.ok) {
          const text = await result.data.text();
          return ResultUtils.ok(text);
        }

        lastError = result.error;

        // If it's a client error (4xx), don't try other servers
        if (result.error instanceof HTTPError && result.error.status >= 400 && result.error.status < 500) {
          break;
        }

      } catch (error) {
        lastError = new NetworkError(
          `Unexpected error with server ${server}`,
          error instanceof Error ? error : undefined,
          server
        );
      }
    }

    return ResultUtils.error(
      lastError || new NetworkError('All servers failed', undefined, 'all')
    );
  }

  /**
   * Gets client health status
   */
  getHealthStatus(): {
    servers: Array<{
      url: string;
      circuitBreakerState: string;
      failureCount: number;
      currentRps: number;
    }>;
    totalRequests: number;
    successRate: number;
  } {
    const servers = this.config.servers.map(server => ({
      url: server,
      circuitBreakerState: this.circuitBreakers.get(server)?.getState() || 'unknown',
      failureCount: this.circuitBreakers.get(server)?.getFailureCount() || 0,
      currentRps: this.rateLimiters.get(server)?.getRequestCount() || 0
    }));

    const recentMetrics = this.metrics.slice(-100);
    const successfulRequests = recentMetrics.filter(m => m.success).length;
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
  getMetrics(): readonly QueryMetrics[] {
    return [...this.metrics];
  }

  /**
   * Clears old metrics για memory management
   */
  clearOldMetrics(maxAge: number = 3600000): void { // 1 hour default
    const cutoff = Date.now() - maxAge;
    this.metrics.splice(0, this.metrics.findIndex(m => m.endTime > cutoff));
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private createQueryHash(url: string, options: RequestInit): string {
    const key = `${url}:${JSON.stringify(options.body || '')}`;
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      const char = key.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(36);
  }

  private recordMetrics(metrics: QueryMetrics): void {
    this.metrics.push(metrics);

    // Keep only recent metrics για memory efficiency
    if (this.metrics.length > 1000) {
      this.metrics.splice(0, 100);
    }
  }
}

/**
 * Default client configuration
 */
export const createDefaultClientConfig = (): OverpassClientConfig => ({
  servers: [
    'https://overpass-api.de/api/interpreter',
    'https://overpass.kumi.systems/api/interpreter',
    'https://overpass.openstreetmap.ru/api/interpreter'
  ],
  timeout: 30000,
  userAgent: 'Layera-OSM/1.0 (Enterprise Mapping Application)',
  rateLimitRps: 1,
  retryAttempts: 3,
  retryDelayMs: 1000
});

/**
 * Creates configured HTTP client instance
 */
export const createHTTPClient = (config?: Partial<OverpassClientConfig>): OverpassHTTPClient => {
  const fullConfig = { ...createDefaultClientConfig(), ...config };
  return new OverpassHTTPClient(fullConfig);
};