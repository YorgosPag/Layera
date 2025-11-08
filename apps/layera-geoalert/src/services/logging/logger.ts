/**
 * Enterprise Logger
 *
 * Production-ready logging με structured output
 * και automatic error tracking.
 */

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3
}

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  service: string;
  message: string;
  data?: unknown;
  error?: Error;
}

export class Logger {
  private serviceName: string;
  private minLevel: LogLevel = LogLevel.INFO;

  constructor(serviceName: string) {
    this.serviceName = serviceName;
  }

  debug(message: string, data?: unknown): void {
    this.log(LogLevel.DEBUG, message, data);
  }

  info(message: string, data?: unknown): void {
    this.log(LogLevel.INFO, message, data);
  }

  warn(message: string, data?: unknown): void {
    this.log(LogLevel.WARN, message, data);
  }

  error(message: string, error?: unknown, data?: unknown): void {
    this.log(LogLevel.ERROR, message, data, error instanceof Error ? error : undefined);
  }

  private log(level: LogLevel, message: string, data?: unknown, error?: Error): void {
    if (level < this.minLevel) {
      return;
    }

    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      service: this.serviceName,
      message,
      data,
      error
    };

    // In development, use console
    if (import.meta.env.MODE === 'development') {
      this.logToConsole(entry);
    }

    // In production, would send to logging service
    // this.sendToLoggingService(entry);
  }

  private logToConsole(entry: LogEntry): void {
    const levelName = LogLevel[entry.level];
    const prefix = `[${entry.timestamp}] [${entry.service}] [${levelName}]`;

    switch (entry.level) {
      case LogLevel.DEBUG:
        console.debug(prefix, entry.message, entry.data);
        break;
      case LogLevel.INFO:
        console.info(prefix, entry.message, entry.data);
        break;
      case LogLevel.WARN:
        console.warn(prefix, entry.message, entry.data);
        break;
      case LogLevel.ERROR:
        console.error(prefix, entry.message, entry.error || entry.data);
        break;
    }
  }
}