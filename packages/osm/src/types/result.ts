/**
 * @layera/osm - Foundation Types
 *
 * Generic Result<T, E> type για enterprise-grade error handling.
 * Εμπνευσμένο από Rust Result<T, E> και functional programming patterns.
 *
 * Χρησιμοποιείται σε όλο το Layera ecosystem για consistent error handling.
 */

/**
 * Generic Result type που εγκλωβίζει επιτυχημένα αποτελέσματα ή errors
 * Εναλλακτική στο throwing exceptions που επιτρέπει explicit error handling
 *
 * @template T - Ο τύπος του επιτυχημένου αποτελέσματος
 * @template E - Ο τύπος του error (default: Error)
 *
 * @example
 * ```typescript
 * async function fetchData(): Promise<Result<string, NetworkError>> {
 *   try {
 *     const data = await api.get('/data');
 *     return { ok: true, data };
 *   } catch (error) {
 *     return { ok: false, error: new NetworkError(error.message) };
 *   }
 * }
 *
 * const result = await fetchData();
 * if (result.ok) {
 *// Type-safe access
 * } else {
 *   console.error(result.error.message);
 * }
 * ```
 */
export type Result<T, E = Error> =
  | { readonly ok: true; readonly data: T }
  | { readonly ok: false; readonly error: E; readonly status?: number };

/**
 * HTTP-specific Result που περιλαμβάνει status codes
 * Χρησιμοποιείται για API calls που χρειάζονται HTTP semantics
 */
export type HttpResult<T, E = Error> = Result<T, E> & {
  readonly status?: number;
  readonly headers?: Record<string, string>;
};

/**
 * Async Result για Promise-based operations
 */
export type AsyncResult<T, E = Error> = Promise<Result<T, E>>;

/**
 * Utility type για εξαγωγή του data type από ένα Result
 *
 * @example
 * ```typescript
 * type UserResult = Result<User, ValidationError>;
 * type UserData = ResultData<UserResult>; // User
 * ```
 */
export type ResultData<R> = R extends Result<infer T, any> ? T : never;

/**
 * Utility type για εξαγωγή του error type από ένα Result
 */
export type ResultError<R> = R extends Result<any, infer E> ? E : never;

/**
 * Utility functions για Result operations
 */
export namespace ResultUtils {
  /**
   * Δημιουργεί επιτυχημένο Result
   */
  export const ok = <T>(data: T): Result<T, never> => ({ ok: true, data });

  /**
   * Δημιουργεί αποτυχημένο Result
   */
  export const error = <E>(error: E, status?: number): Result<never, E> => {
    const result: Result<never, E> = { ok: false, error };
    if (status !== undefined) {
      (result as any).status = status;
    }
    return result;
  };

  /**
   * Δημιουργεί αποτυχημένο Result με Error instance
   */
  export const fail = (message: string, status?: number): Result<never, Error> => {
    const result: Result<never, Error> = { ok: false, error: new Error(message) };
    if (status !== undefined) {
      (result as any).status = status;
    }
    return result;
  };

  /**
   * Maps το data ενός επιτυχημένου Result
   */
  export const map = <T, U, E>(
    result: Result<T, E>,
    fn: (data: T) => U
  ): Result<U, E> => {
    return result.ok ? { ok: true, data: fn(result.data) } : result;
  };

  /**
   * Maps το error ενός αποτυχημένου Result
   */
  export const mapError = <T, E, F>(
    result: Result<T, E>,
    fn: (error: E) => F
  ): Result<T, F> => {
    return result.ok ? result : { ...result, error: fn(result.error) };
  };

  /**
   * Chains Results μαζί (flatMap)
   */
  export const chain = <T, U, E>(
    result: Result<T, E>,
    fn: (data: T) => Result<U, E>
  ): Result<U, E> => {
    return result.ok ? fn(result.data) : result;
  };

  /**
   * Unwraps Result ή επιστρέφει default value
   */
  export const unwrapOr = <T, E>(result: Result<T, E>, defaultValue: T): T => {
    return result.ok ? result.data : defaultValue;
  };

  /**
   * Unwraps Result ή throws error
   */
  export const unwrap = <T, E>(result: Result<T, E>): T => {
    if (result.ok) {
      return result.data;
    }

    if (result.error instanceof Error) {
      throw result.error;
    }

    throw new Error(String(result.error));
  };

  /**
   * Συνδυάζει multiple Results σε ένα
   * Αποτυγχάνει αν οποιοδήποτε Result είναι error
   */
  export const combine = <T extends readonly unknown[], E>(
    results: { [K in keyof T]: Result<T[K], E> }
  ): Result<T, E> => {
    const data = [] as unknown as { -readonly [K in keyof T]: T[K] };

    for (let i = 0; i < results.length; i++) {
      const result = results[i];
      if (result && !result.ok) {
        return result as Result<never, E>;
      }
      if (result) {
        data[i] = result.data;
      }
    }

    return { ok: true, data };
  };

  /**
   * Converts Promise<T> σε AsyncResult<T>
   */
  export const fromPromise = async <T>(
    promise: Promise<T>
  ): AsyncResult<T, Error> => {
    try {
      const data = await promise;
      return { ok: true, data };
    } catch (error) {
      return {
        ok: false,
        error: error instanceof Error ? error : new Error(String(error))
      };
    }
  };

  /**
   * Converts AsyncResult<T> σε Promise<T> (throws on error)
   */
  export const toPromise = async <T, E>(
    asyncResult: AsyncResult<T, E>
  ): Promise<T> => {
    const result = await asyncResult;
    return unwrap(result);
  };
}

/**
 * Common error types για OSM operations
 */
export class OSMError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'OSMError';
  }
}

export class NetworkError extends OSMError {
  constructor(message: string, public readonly status?: number) {
    super(message, 'NETWORK_ERROR', { status });
    this.name = 'NetworkError';
  }
}

export class ValidationError extends OSMError {
  constructor(message: string, public readonly field?: string) {
    super(message, 'VALIDATION_ERROR', { field });
    this.name = 'ValidationError';
  }
}

export class TimeoutError extends OSMError {
  constructor(message: string, public readonly timeoutMs?: number) {
    super(message, 'TIMEOUT_ERROR', { timeoutMs });
    this.name = 'TimeoutError';
  }
}

export class ParseError extends OSMError {
  constructor(message: string, public readonly data?: unknown) {
    super(message, 'PARSE_ERROR', { data });
    this.name = 'ParseError';
  }
}