# @layera/file-upload

Enterprise-grade file upload system για το Layera ecosystem με προηγμένες δυνατότητες που βασίζονται σε Google Drive και Dropbox patterns.

## 🚀 Features

### Core Functionality
- **Drag & Drop Interface**: Intuitive drag & drop με visual feedback
- **Chunked Upload**: Support για large files με resumable upload
- **Multiple Files**: Concurrent uploading με configurable limits
- **Progress Tracking**: Real-time progress με upload speed & ETA
- **File Validation**: Comprehensive validation με security checks
- **Preview Support**: Thumbnails για images και file metadata

### Enterprise Features
- **Error Handling**: Robust error handling με retry functionality
- **Security**: File type validation, executable detection, MIME type checking
- **Performance**: Optimized για large files με memory efficiency
- **Accessibility**: Full ARIA support και keyboard navigation
- **Internationalization**: Full i18n support (Greek/English)
- **Theming**: Dark/Light theme support

## 📦 Installation

```bash
npm install @layera/file-upload
```

## 🎯 Quick Start

```tsx
import { FileUploader, DEFAULT_UPLOAD_CONFIG } from '@layera/file-upload';

function MyComponent() {
  const uploadConfig = {
    ...DEFAULT_UPLOAD_CONFIG,
    uploadUrl: '/api/upload',
    maxFileSize: 50 * 1024 * 1024, // 50MB
    autoUpload: true
  };

  return (
    <FileUploader
      config={uploadConfig}
      onUploadComplete={(file) => {
        console.log('Upload completed:', file.file.name);
      }}
      onUploadError={(file, error) => {
        console.error('Upload failed:', error);
      }}
    />
  );
}
```

## 🔧 Configuration

### FileUploadConfig

```tsx
interface FileUploadConfig {
  /** Maximum file size σε bytes */
  maxFileSize: number;
  /** Maximum total size για όλα τα files */
  maxTotalSize: number;
  /** Accepted file types */
  acceptedTypes: SupportedFileType[];
  /** Enable chunk upload για large files */
  enableChunking: boolean;
  /** Chunk size σε bytes */
  chunkSize: number;
  /** Maximum concurrent uploads */
  maxConcurrent: number;
  /** Auto-start upload on file selection */
  autoUpload: boolean;
  /** Enable drag & drop */
  enableDragDrop: boolean;
  /** Upload endpoint URL */
  uploadUrl: string;
  /** HTTP headers για upload requests */
  headers?: Record<string, string>;
}
```

### Supported File Types

```tsx
type SupportedFileType =
  | 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp' | 'image/svg+xml'
  | 'application/pdf'
  | 'text/plain' | 'text/csv'
  | 'application/vnd.ms-excel'
  | 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  | 'application/msword'
  | 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  | 'application/zip' | 'application/x-rar-compressed'
  | 'image/vnd.dxf' | 'application/dxf'
  | 'application/json' | 'application/xml';
```

## 🎨 Components

### FileUploader (Main Component)

Ο κύριος component που περιλαμβάνει όλη τη λειτουργικότητα:

```tsx
<FileUploader
  config={uploadConfig}
  initialFiles={[]}
  disabled={false}
  onUploadStart={(file) => console.log('Started:', file.file.name)}
  onUploadProgress={(file, progress) => console.log('Progress:', progress)}
  onUploadComplete={(file) => console.log('Completed:', file.file.name)}
  onUploadError={(file, error) => console.error('Error:', error)}
/>
```

### DragDropZone

Standalone drag & drop zone component:

```tsx
<DragDropZone
  enabled={true}
  acceptedTypes={['image/jpeg', 'image/png']}
  maxFiles={5}
  onFilesDrop={(files) => console.log('Files dropped:', files)}
/>
```

### FileList

List view για uploaded files:

```tsx
<FileList
  files={fileItems}
  showProgress={true}
  showActions={true}
  onRemove={(fileId) => console.log('Remove:', fileId)}
  onCancel={(fileId) => console.log('Cancel:', fileId)}
  onRetry={(fileId) => console.log('Retry:', fileId)}
/>
```

### FilePreview

Grid view με thumbnails:

```tsx
<FilePreview
  file={fileItem}
  showPreview={true}
  onRemove={(fileId) => console.log('Remove:', fileId)}
  onClick={(file) => console.log('Clicked:', file.file.name)}
/>
```

## 🔧 Advanced Usage

### Custom Upload Engine

```tsx
import { UploadEngine } from '@layera/file-upload';

const engine = new UploadEngine(config, {
  onUploadStart: (file) => {
    // Handle upload start
  },
  onUploadProgress: (file, progress) => {
    // Handle progress updates
  },
  onUploadComplete: (file) => {
    // Handle completion
  }
});

// Add file to queue
engine.addFile(fileItem);

// Start upload manually
engine.uploadFile(fileItem);

// Cancel upload
engine.cancelUpload(fileId);
```

### File Validation

```tsx
import { validateFile, validateFileList } from '@layera/file-upload';

// Validate single file
const validation = validateFile(file, config);
if (!validation.isValid) {
  console.error('Validation errors:', validation.errors);
}

// Validate multiple files
const listValidation = validateFileList(files, config);
if (listValidation.warnings.length > 0) {
  console.warn('Warnings:', listValidation.warnings);
}
```

### Custom Components

```tsx
function CustomDropZone(props: DragDropZoneProps) {
  return (
    <div className="la-component">
      {/* Custom implementation */}
    </div>
  );
}

<FileUploader
  config={config}
  customDropZone={CustomDropZone}
/>
```

## 🌐 Internationalization

Το component υποστηρίζει πλήρως i18n με automatic translation:

```json
{
  "file-upload": {
    "drag-files-or-click": "Σύρετε αρχεία εδώ ή κάντε κλικ για επιλογή | Drag files here or click to select",
    "drop-files-here": "Αφήστε τα αρχεία εδώ | Drop files here",
    "accepted-types": "Αποδεκτοί τύποι | Accepted types",
    "max-files": "Μέγιστος αριθμός αρχείων | Maximum files",
    "upload-complete": "Η μεταφόρτωση ολοκληρώθηκε | Upload completed",
    "upload-error": "Σφάλμα μεταφόρτωσης | Upload error"
  }
}
```

## 🎯 Server Integration

### Standard Upload Endpoint

```javascript
// Express.js example
app.post('/api/upload', upload.single('file'), (req, res) => {
  res.json({
    success: true,
    filename: req.file.filename,
    url: `/uploads/${req.file.filename}`
  });
});
```

### Chunked Upload Endpoints

```javascript
// Initialize upload session
app.post('/api/upload/init', (req, res) => {
  const sessionId = generateSessionId();
  res.json({ sessionId });
});

// Upload chunk
app.post('/api/upload/chunk', (req, res) => {
  // Handle chunk upload
  res.json({ success: true });
});

// Finalize upload
app.post('/api/upload/finalize', (req, res) => {
  // Combine chunks and finalize
  res.json({
    success: true,
    filename: 'final-file.pdf',
    url: '/uploads/final-file.pdf'
  });
});
```

## 🔒 Security Considerations

### File Validation
- MIME type verification
- File extension checking
- Executable file detection
- File size limits
- Filename sanitization

### Best Practices
```tsx
const secureConfig = {
  maxFileSize: 10 * 1024 * 1024, // 10MB limit
  acceptedTypes: ['image/jpeg', 'image/png', 'application/pdf'], // Whitelist only
  headers: {
    'Authorization': `Bearer ${token}`,
    'X-CSRF-Token': csrfToken
  }
};
```

## 📱 Responsive Design

Το component είναι πλήρως responsive και προσαρμόζεται σε όλες τις συσκευές:

- **Mobile**: Touch-friendly interface με swipe gestures
- **Tablet**: Optimized layout για touch navigation
- **Desktop**: Full drag & drop functionality με keyboard support

## 🎨 Theming

Υποστηρίζει πλήρως το @layera/theme-switcher:

```tsx
// Automatically adapts to current theme
const { theme } = useTheme();

// Custom theme overrides
<FileUploader
  config={config}
  className={theme === 'dark' ? 'dark-theme-overrides' : 'light-theme-overrides'}
/>
```

## 🔗 Integration με άλλα Layera Systems

### Dependencies
- `@layera/cards` - Card components για file display
- `@layera/typography` - Typography system
- `@layera/buttons` - Button components
- `@layera/icons` - Icon library
- `@layera/theme-switcher` - Theme management
- `@layera/tolgee` - Internationalization
- `@layera/notifications` - Toast notifications
- `@layera/error-boundary` - Error handling

### Zero Duplication Policy
Δεν περιλαμβάνει duplicate functionality - χρησιμοποιεί πλήρως τα existing LEGO systems.

## 📚 Examples

### Basic Image Upload
```tsx
const imageUploadConfig = {
  ...DEFAULT_UPLOAD_CONFIG,
  uploadUrl: '/api/images/upload',
  acceptedTypes: ['image/jpeg', 'image/png', 'image/webp'],
  maxFileSize: 5 * 1024 * 1024, // 5MB
  autoUpload: true
};

<FileUploader config={imageUploadConfig} />
```

### Document Management
```tsx
const documentConfig = {
  ...DEFAULT_UPLOAD_CONFIG,
  uploadUrl: '/api/documents/upload',
  acceptedTypes: ['application/pdf', 'application/msword'],
  maxConcurrent: 1,
  enableChunking: true,
  autoUpload: false
};

<FileUploader config={documentConfig} />
```

### CAD File Processing
```tsx
const cadConfig = {
  ...DEFAULT_UPLOAD_CONFIG,
  uploadUrl: '/api/cad/upload',
  acceptedTypes: ['image/vnd.dxf', 'application/dxf'],
  maxFileSize: 100 * 1024 * 1024, // 100MB
  enableChunking: true,
  chunkSize: 2 * 1024 * 1024 // 2MB chunks
};

<FileUploader config={cadConfig} />
```

## 🐛 Troubleshooting

### Common Issues

**Upload fails immediately:**
```tsx
// Check network and CORS settings
const config = {
  uploadUrl: 'https://your-api.com/upload',
  headers: {
    'Access-Control-Allow-Origin': '*'
  }
};
```

**Large files timeout:**
```tsx
// Increase chunk size and enable chunking
const config = {
  enableChunking: true,
  chunkSize: 5 * 1024 * 1024, // 5MB chunks
  maxFileSize: 1024 * 1024 * 1024 // 1GB
};
```

**Validation errors:**
```tsx
// Check file types and sizes
import { validateFile } from '@layera/file-upload';

const result = validateFile(file, config);
console.log('Validation result:', result);
```

## 📄 License

Part of the Layera ecosystem. See main project license.