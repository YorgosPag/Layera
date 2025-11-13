import type {
  FileUploadItem,
  FileUploadConfig,
  ChunkUploadProgress,
  UploadEventCallbacks
} from '../types';
// import { CONFIG } from '@layera/constants'; // Not needed for now

/**
 * Enterprise upload engine με chunked upload support
 * Βασισμένο σε Google Drive, Dropbox patterns
 */

export class UploadEngine {
  private config: FileUploadConfig;
  private callbacks: UploadEventCallbacks;
  private activeUploads: Map<string, AbortController> = new Map();
  private uploadQueue: FileUploadItem[] = [];
  private concurrentUploads: number = 0;

  constructor(config: FileUploadConfig, callbacks: UploadEventCallbacks = {}) {
    this.config = config;
    this.callbacks = callbacks;
  }

  /**
   * Adds file to upload queue
   */
  public addFile(file: FileUploadItem): void {
    this.uploadQueue.push(file);

    if (this.config.autoUpload) {
      this.processQueue();
    }
  }

  /**
   * Starts upload for specific file
   */
  public async uploadFile(fileItem: FileUploadItem): Promise<void> {
    if (this.concurrentUploads >= this.config.maxConcurrent) {
      return; // Will be processed when slot becomes available
    }

    this.concurrentUploads++;
    const abortController = new AbortController();
    this.activeUploads.set(fileItem.id, abortController);

    try {
      fileItem.status = 'uploading';
      fileItem.startTime = Date.now();
      this.callbacks.onUploadStart?.(fileItem);

      if (this.config.enableChunking && fileItem.file.size > this.config.chunkSize) {
        await this.uploadFileChunked(fileItem, abortController.signal);
      } else {
        await this.uploadFileStandard(fileItem, abortController.signal);
      }

      fileItem.status = 'completed';
      fileItem.completionTime = Date.now();
      this.callbacks.onUploadComplete?.(fileItem);

    } catch (error) {
      if (abortController.signal.aborted) {
        fileItem.status = 'cancelled';
        this.callbacks.onUploadCancel?.(fileItem);
      } else {
        fileItem.status = 'error';
        fileItem.error = error instanceof Error ? error.message : 'Upload failed';
        this.callbacks.onUploadError?.(fileItem, fileItem.error);
      }
    } finally {
      this.activeUploads.delete(fileItem.id);
      this.concurrentUploads--;
      this.processQueue(); // Process next file in queue
    }
  }

  /**
   * Standard upload για small files
   */
  private async uploadFileStandard(
    fileItem: FileUploadItem,
    signal: AbortSignal
  ): Promise<void> {
    const formData = new FormData();
    formData.append('file', fileItem.file);
    formData.append('filename', fileItem.file.name);

    const xhr = new XMLHttpRequest();

    // Track upload progress
    xhr.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable) {
        const progress = (event.loaded / event.total) * 100;
        fileItem.progress = progress;

        const chunkProgress: ChunkUploadProgress = {
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

    // Handle abort signal
    signal.addEventListener('abort', () => {
      xhr.abort();
    });

    return new Promise<void>((resolve, reject) => {
      xhr.onload = () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          fileItem.response = xhr.response;
          resolve();
        } else {
          reject(new Error(`Upload failed with status ${xhr.status}`));
        }
      };

      xhr.onerror = () => {
        reject(new Error('Network error occurred'));
      };

      xhr.open('POST', this.config.uploadUrl);

      // Add custom headers
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
  private async uploadFileChunked(
    fileItem: FileUploadItem,
    signal: AbortSignal
  ): Promise<void> {
    const file = fileItem.file;
    const chunkSize = this.config.chunkSize;
    const totalChunks = Math.ceil(file.size / chunkSize);
    let uploadedBytes = 0;

    // Initialize upload session
    const sessionId = await this.initializeUploadSession(fileItem);

    for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
      if (signal.aborted) {
        throw new Error('Upload cancelled');
      }

      const start = chunkIndex * chunkSize;
      const end = Math.min(start + chunkSize, file.size);
      const chunk = file.slice(start, end);

      await this.uploadChunk(fileItem, chunk, chunkIndex, totalChunks, sessionId);

      uploadedBytes += chunk.size;
      fileItem.progress = (uploadedBytes / file.size) * 100;

      const chunkProgress: ChunkUploadProgress = {
        currentChunk: chunkIndex + 1,
        totalChunks,
        chunkBytesUploaded: chunk.size,
        totalBytesUploaded: uploadedBytes,
        totalFileSize: file.size
      };

      this.calculateUploadSpeed(fileItem, uploadedBytes);
      this.callbacks.onUploadProgress?.(fileItem, chunkProgress);
    }

    // Finalize upload
    await this.finalizeUploadSession(fileItem, sessionId);
  }

  /**
   * Initializes chunked upload session
   */
  private async initializeUploadSession(fileItem: FileUploadItem): Promise<string> {
    const response = await fetch(`${this.config.uploadUrl}/init`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...this.config.headers
      },
      body: JSON.stringify({
        filename: fileItem.file.name,
        fileSize: fileItem.file.size,
        mimeType: fileItem.file.type
      })
    });

    if (!response.ok) {
      throw new Error('Failed to initialize upload session');
    }

    const data = await response.json() as { sessionId: string };
    return data.sessionId;
  }

  /**
   * Uploads a single chunk
   */
  private async uploadChunk(
    _fileItem: FileUploadItem,
    chunk: Blob,
    chunkIndex: number,
    totalChunks: number,
    sessionId: string
  ): Promise<void> {
    const formData = new FormData();
    formData.append('chunk', chunk);
    formData.append('chunkIndex', chunkIndex.toString());
    formData.append('totalChunks', totalChunks.toString());
    formData.append('sessionId', sessionId);

    const response = await fetch(`${this.config.uploadUrl}/chunk`, {
      method: 'POST',
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
  private async finalizeUploadSession(fileItem: FileUploadItem, sessionId: string): Promise<void> {
    const response = await fetch(`${this.config.uploadUrl}/finalize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...this.config.headers
      },
      body: JSON.stringify({
        sessionId,
        filename: fileItem.file.name
      })
    });

    if (!response.ok) {
      throw new Error('Failed to finalize upload');
    }

    fileItem.response = await response.json();
  }

  /**
   * Calculates upload speed and ETA
   */
  private calculateUploadSpeed(fileItem: FileUploadItem, bytesUploaded: number): void {
    if (!fileItem.startTime) return;

    const elapsed = (Date.now() - fileItem.startTime) / 1000; // seconds
    fileItem.speed = bytesUploaded / elapsed; // bytes per second

    if (fileItem.speed > 0) {
      const remainingBytes = fileItem.file.size - bytesUploaded;
      fileItem.eta = remainingBytes / fileItem.speed; // seconds
    }
  }

  /**
   * Processes upload queue
   */
  private processQueue(): void {
    while (this.uploadQueue.length > 0 && this.concurrentUploads < this.config.maxConcurrent) {
      const fileItem = this.uploadQueue.shift();
      if (fileItem && fileItem.status === 'idle') {
        this.uploadFile(fileItem);
      }
    }

    // Check if all uploads are complete
    if (this.uploadQueue.length === 0 && this.concurrentUploads === 0) {
      this.callbacks.onAllUploadsComplete?.([]);
    }
  }

  /**
   * Cancels upload for specific file
   */
  public cancelUpload(fileId: string): void {
    const abortController = this.activeUploads.get(fileId);
    if (abortController) {
      abortController.abort();
    }

    // Remove from queue if not started yet
    this.uploadQueue = this.uploadQueue.filter(item => item.id !== fileId);
  }

  /**
   * Pauses upload (για future implementation)
   */
  public pauseUpload(fileId: string): void {
    // Implementation for pausable uploads
    this.cancelUpload(fileId);
  }

  /**
   * Clears all uploads and resets engine
   */
  public clearAll(): void {
    // Cancel all active uploads
    this.activeUploads.forEach(controller => controller.abort());
    this.activeUploads.clear();

    // Clear queue
    this.uploadQueue = [];
    this.concurrentUploads = 0;
  }
}