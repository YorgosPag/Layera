import React, { useState, useCallback, useMemo } from 'react';
import { Card, CardContent, CardHeader } from '@layera/cards';
import { Button, IconButton } from '@layera/buttons';
import { Text, Heading } from '@layera/typography';
import { LoadingSpinner } from '@layera/loading';
import { useLayeraTranslation } from '@layera/tolgee';
import { ImportedFile } from '../types';
import { SPACING_SCALE, BORDER_RADIUS_SCALE } from '@layera/constants';

export interface FilePreviewProps {
  file: ImportedFile;
  onClose: () => void;
  showMetadata?: boolean;
  showActions?: boolean;
  maxHeight?: string;
}

export const FilePreview: React.FC<FilePreviewProps> = ({
  file,
  onClose,
  showMetadata = true,
  showActions = true,
  maxHeight = '600px'
}) => {
  const { t } = useLayeraTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [previewError, setPreviewError] = useState<string | null>(null);

  const fileExtension = useMemo(() => {
    return file.file.name.split('.').pop()?.toLowerCase();
  }, [file.file.name]);

  const fileCategory = useMemo(() => {
    switch (fileExtension) {
      case 'dxf':
      case 'dwg':
        return 'cad';
      case 'pdf':
        return 'document';
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'webp':
      case 'bmp':
      case 'tiff':
        return 'image';
      case 'svg':
        return 'vector';
      default:
        return 'unknown';
    }
  }, [fileExtension]);

  const formatFileSize = useCallback((bytes: number): string => {
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }

    return `${size.toFixed(1)} ${units[unitIndex]}`;
  }, []);

  const formatDate = useCallback((timestamp: number): string => {
    return new Date(timestamp).toLocaleString('el-GR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }, []);

  const handleDownload = useCallback(() => {
    try {
      const url = URL.createObjectURL(file.file);
      const link = document.createElement('a');
      link.href = url;
      link.download = file.metadata.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  }, [file]);

  const renderImagePreview = useCallback(() => {
    if (!file.previewUrl) {
      return (
        <div style={{
          height: '300px',
          backgroundColor: '#f5f5f5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: `${BORDER_RADIUS_SCALE.SM}px`,
          border: '1px solid #e0e0e0'
        }}>
          <Text color="secondary">{t('file.preview.no.image')}</Text>
        </div>
      );
    }

    return (
      <div style={{
        textAlign: 'center',
        padding: `${SPACING_SCALE.MD}px`,
        backgroundColor: '#f9f9f9',
        borderRadius: `${BORDER_RADIUS_SCALE.SM}px`,
        border: '1px solid #e0e0e0'
      }}>
        <img
          src={file.previewUrl}
          alt={file.metadata.name}
          style={{
            maxWidth: '100%',
            maxHeight: '400px',
            objectFit: 'contain',
            borderRadius: `${BORDER_RADIUS_SCALE.XS}px`,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}
          onError={() => setPreviewError(t('file.preview.image.error'))}
        />

        {file.metadata.dimensions && (
          <Text variant="caption" color="secondary" style={{ marginTop: `${SPACING_SCALE.SM}px`, display: 'block' }}>
            {t('file.dimensions', {
              width: file.metadata.dimensions.width,
              height: file.metadata.dimensions.height
            })}
          </Text>
        )}
      </div>
    );
  }, [file.previewUrl, file.metadata, t]);

  const renderDocumentPreview = useCallback(() => {
    return (
      <div style={{
        height: '300px',
        backgroundColor: '#f5f5f5',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: `${BORDER_RADIUS_SCALE.SM}px`,
        border: '1px solid #e0e0e0',
        gap: '16px'
      }}>
        <div style={{ fontSize: '48px' }}>📄</div>
        <Text variant="body" weight="medium">
          {t('file.preview.document.title')}
        </Text>
        <Text variant="caption" color="secondary" style={{ textAlign: 'center' }}>
          {t('file.preview.document.description')}
        </Text>
        <Button variant="primary" onClick={handleDownload}>
          {t('file.action.download')}
        </Button>
      </div>
    );
  }, [handleDownload, t]);

  const renderCADPreview = useCallback(() => {
    return (
      <div style={{
        height: '300px',
        backgroundColor: '#f5f5f5',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: `${BORDER_RADIUS_SCALE.SM}px`,
        border: '1px solid #e0e0e0',
        gap: '16px'
      }}>
        <div style={{ fontSize: '48px' }}>📐</div>
        <Text variant="body" weight="medium">
          {t('file.preview.cad.title')}
        </Text>
        <Text variant="caption" color="secondary" style={{ textAlign: 'center', maxWidth: '300px' }}>
          {fileExtension?.toUpperCase() === 'DXF'
            ? t('file.preview.cad.dxf.description')
            : t('file.preview.cad.dwg.description')
          }
        </Text>
        <div style={{ display: 'flex', gap: '8px' }}>
          <Button variant="primary" onClick={handleDownload}>
            {t('file.action.download')}
          </Button>
          <Button variant="secondary" disabled>
            {t('file.action.render')} ({t('common.coming.soon')})
          </Button>
        </div>
      </div>
    );
  }, [fileExtension, handleDownload, t]);

  const renderVectorPreview = useCallback(() => {
    return (
      <div style={{
        height: '300px',
        backgroundColor: '#f5f5f5',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: `${BORDER_RADIUS_SCALE.SM}px`,
        border: '1px solid #e0e0e0',
        gap: '16px'
      }}>
        <div style={{ fontSize: '48px' }}>🎨</div>
        <Text variant="body" weight="medium">
          {t('file.preview.vector.title')}
        </Text>
        <Text variant="caption" color="secondary" style={{ textAlign: 'center' }}>
          {t('file.preview.vector.description')}
        </Text>
        <Button variant="primary" onClick={handleDownload}>
          {t('file.action.download')}
        </Button>
      </div>
    );
  }, [handleDownload, t]);

  const renderPreviewContent = useCallback(() => {
    if (file.status === 'processing') {
      return (
        <div style={{
          height: '300px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px'
        }}>
          <LoadingSpinner size="large" />
          <Text variant="body" color="secondary">
            {t('file.preview.processing')}
          </Text>
          <Text variant="caption" color="secondary">
            {file.progress}% {t('common.completed')}
          </Text>
        </div>
      );
    }

    if (file.status === 'error') {
      return (
        <div style={{
          height: '300px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px'
        }}>
          <div style={{ fontSize: '48px', color: '#f44336' }}>⚠️</div>
          <Text variant="body" color="error" weight="medium">
            {t('file.preview.error.title')}
          </Text>
          <Text variant="caption" color="secondary" style={{ textAlign: 'center' }}>
            {file.error || t('file.preview.error.description')}
          </Text>
        </div>
      );
    }

    if (previewError) {
      return (
        <div style={{
          height: '300px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px'
        }}>
          <div style={{ fontSize: '48px', color: '#f44336' }}>⚠️</div>
          <Text variant="body" color="error" weight="medium">
            {t('file.preview.error.title')}
          </Text>
          <Text variant="caption" color="secondary">
            {previewError}
          </Text>
        </div>
      );
    }

    switch (fileCategory) {
      case 'image':
        return renderImagePreview();
      case 'document':
        return renderDocumentPreview();
      case 'cad':
        return renderCADPreview();
      case 'vector':
        return renderVectorPreview();
      default:
        return (
          <div style={{
            height: '300px',
            backgroundColor: '#f5f5f5',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: `${BORDER_RADIUS_SCALE.SM}px`,
            border: '1px solid #e0e0e0',
            gap: '16px'
          }}>
            <div style={{ fontSize: '48px' }}>📎</div>
            <Text variant="body" weight="medium">
              {t('file.preview.unsupported.title')}
            </Text>
            <Text variant="caption" color="secondary">
              {t('file.preview.unsupported.description')}
            </Text>
            <Button variant="primary" onClick={handleDownload}>
              {t('file.action.download')}
            </Button>
          </div>
        );
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

  return (
    <Card className="file-preview" style={{ maxHeight, overflow: 'auto' }}>
      <CardHeader>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <Heading level={4} style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              marginBottom: `${SPACING_SCALE.XS - 4}px`
            }}>
              {file.metadata.name}
            </Heading>
            <Text variant="caption" color="secondary">
              {fileExtension?.toUpperCase()} • {formatFileSize(file.metadata.size)}
            </Text>
          </div>

          <IconButton
            variant="secondary"
            size="small"
            onClick={onClose}
            aria-label={t('common.close')}
          >
            ✕
          </IconButton>
        </div>
      </CardHeader>

      <CardContent>
        {renderPreviewContent()}

        {showMetadata && file.status === 'completed' && (
          <div style={{ marginTop: `${SPACING_SCALE.XL}px` }}>
            <Heading level={5} style={{ marginBottom: `${SPACING_SCALE.SM}px` }}>
              {t('file.metadata.title')}
            </Heading>

            <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '8px 16px', fontSize: '14px' }}>
              <Text variant="caption" color="secondary" weight="medium">
                {t('file.metadata.name')}:
              </Text>
              <Text variant="caption">
                {file.metadata.name}
              </Text>

              <Text variant="caption" color="secondary" weight="medium">
                {t('file.metadata.size')}:
              </Text>
              <Text variant="caption">
                {formatFileSize(file.metadata.size)}
              </Text>

              <Text variant="caption" color="secondary" weight="medium">
                {t('file.metadata.type')}:
              </Text>
              <Text variant="caption">
                {file.metadata.type}
              </Text>

              <Text variant="caption" color="secondary" weight="medium">
                {t('file.metadata.modified')}:
              </Text>
              <Text variant="caption">
                {formatDate(file.metadata.lastModified)}
              </Text>

              {file.metadata.dimensions && (
                <>
                  <Text variant="caption" color="secondary" weight="medium">
                    {t('file.metadata.dimensions')}:
                  </Text>
                  <Text variant="caption">
                    {file.metadata.dimensions.width} × {file.metadata.dimensions.height} px
                  </Text>
                </>
              )}
            </div>
          </div>
        )}

        {showActions && file.status === 'completed' && (
          <div style={{ marginTop: `${SPACING_SCALE.XL}px`, display: 'flex', gap: `${SPACING_SCALE.SM + SPACING_SCALE.XS}px`, justifyContent: 'flex-end' }}>
            <Button variant="secondary" onClick={handleDownload}>
              {t('file.action.download')}
            </Button>
            <Button variant="primary" onClick={onClose}>
              {t('common.close')}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};