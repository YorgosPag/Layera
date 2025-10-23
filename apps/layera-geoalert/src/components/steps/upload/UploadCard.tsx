/**
 * UploadCard.tsx - Reusable Upload Interface Card
 */

import React, { useRef } from 'react';
import { BaseCard } from '../../device-specific/mobile/iphone-14-pro-max/components/BaseCard';
import { UploadIcon, ImageIcon } from '@layera/icons';
import type { UploadOptions } from './types';

interface UploadCardProps {
  title: string;
  description?: string;
  options?: UploadOptions;
  onFilesSelected: (files: FileList) => void;
  'data-testid'?: string;
}

export const UploadCard: React.FC<UploadCardProps> = ({
  title,
  description,
  options = {},
  onFilesSelected,
  'data-testid': testId
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      onFilesSelected(files);
    }
  };

  const accept = options.acceptedTypes?.join(',') || 'image/*,.pdf,.doc,.docx';

  return (
    <>
      <BaseCard
        variant="info"
        title={title}
        description={description}
        icon={<UploadIcon size="sm" theme="neutral" />}
        onClick={handleClick}
        data-testid={testId}
      />
      <input
        ref={fileInputRef}
        type="file"
        multiple={options.multiple !== false}
        accept={accept}
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </>
  );
};