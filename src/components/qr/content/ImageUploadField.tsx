import React, { useState } from 'react';
import { ActionIcon, FileButton, Loader, Tooltip } from '@mantine/core';
import { ImagePlus, X } from 'lucide-react';
import { uploadsAPI } from '@/lib/api';
import { confirmAction, errorMessage, message } from '@/lib/notify';

const MAX_IMAGE_MB = 2;

const isValidImageUrl = (url?: string) => {
  if (!url || typeof url !== 'string' || url.trim() === '') return false;
  const trimmed = url.trim();
  if (/^data:image\//i.test(trimmed) || /^blob:/i.test(trimmed)) return true;
  if (!/^https?:\/\//i.test(trimmed)) return false;
  return /\.(png|jpe?g|webp|gif|bmp|svg)(\?.*)?$/i.test(trimmed);
};

interface ImageUploadFieldProps {
  content: string;
  onContentChange: (content: string) => void;
}

const ImageUploadField: React.FC<ImageUploadFieldProps> = ({ content, onContentChange }) => {
  const [uploading, setUploading] = useState(false);
  const [publicId, setPublicId] = useState<string | null>(null);

  const handleFile = async (file: File | null) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      message.error('Only image files are allowed');
      return;
    }
    if (file.size / 1024 / 1024 >= MAX_IMAGE_MB) {
      message.error(`Image must be smaller than ${MAX_IMAGE_MB}MB`);
      return;
    }

    setUploading(true);
    try {
      const res = await uploadsAPI.uploadQRImage(file);
      if (res?.success && res.url) {
        onContentChange(res.url);
        setPublicId(res.public_id || null);
        message.success('Image uploaded');
      } else {
        message.error(res?.message || 'Upload failed');
      }
    } catch (e) {
      message.error(errorMessage(e, 'Upload failed'));
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () =>
    confirmAction({
      title: 'Remove this image?',
      body: 'The QR code will no longer point to it.',
      confirmLabel: 'Remove',
      danger: true,
      onConfirm: async () => {
        if (publicId) {
          try {
            const res = await uploadsAPI.deleteQRImage(publicId);
            if (!res?.success) {
              message.error(res?.message || 'Failed to remove image');
              return;
            }
          } catch (e) {
            message.error(errorMessage(e, 'Failed to remove image'));
            return;
          }
          setPublicId(null);
        }
        onContentChange('');
        message.success('Image removed');
      },
    });

  if (uploading) {
    return (
      <div className="flex h-56 items-center justify-center rounded-2xl border border-dashed border-border">
        <Loader size="sm" />
      </div>
    );
  }

  if (isValidImageUrl(content)) {
    return (
      <div className="relative inline-block">
        <img src={content} alt="Uploaded" className="h-56 w-56 rounded-2xl border border-border object-cover shadow-soft" />
        <Tooltip label="Remove image">
          <ActionIcon variant="default" radius="xl" className="!absolute -right-2 -top-2" onClick={handleRemove} aria-label="Remove image">
            <X size={14} />
          </ActionIcon>
        </Tooltip>
      </div>
    );
  }

  return (
    <FileButton onChange={handleFile} accept="image/*">
      {(props) => (
        <button
          {...props}
          type="button"
          className="create-tile flex h-56 w-full flex-col items-center justify-center gap-2 rounded-2xl border-dashed"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <ImagePlus size={20} />
          </span>
          <span className="text-sm font-semibold text-foreground">Upload an image</span>
          <span className="text-xs text-muted-foreground">PNG, JPG or WebP, up to {MAX_IMAGE_MB}MB</span>
        </button>
      )}
    </FileButton>
  );
};

export default ImageUploadField;
