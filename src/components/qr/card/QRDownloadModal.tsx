import React, { useRef, useState } from 'react';
import { Button, LoadingOverlay, Modal } from '@mantine/core';
import { FileImage, Image } from 'lucide-react';
import { toJpeg, toPng } from 'html-to-image';
import type { QRCodeData } from '@/types/qrcode';
import { useWorkspace } from '@/hooks/useWorkspace';
import { message } from '@/lib/notify';
import QRCodePreview from '../QRCodePreview';

type Format = 'png' | 'jpg' | 'webp';

const FORMATS: { value: Format; label: string; hint: string; icon: typeof Image }[] = [
  { value: 'png', label: 'PNG', hint: 'Best quality', icon: FileImage },
  { value: 'jpg', label: 'JPG', hint: 'Smaller file', icon: Image },
  { value: 'webp', label: 'WebP', hint: 'Smallest file', icon: Image },
];

const toWebp = async (jpegUrl: string) => {
  const img = new window.Image();
  await new Promise<void>((resolve) => {
    img.onload = () => resolve();
    img.src = jpegUrl;
  });
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return jpegUrl;
  ctx.drawImage(img, 0, 0);
  return canvas.toDataURL('image/webp', 0.9);
};

interface QRDownloadModalProps {
  qrCode: QRCodeData;
  opened: boolean;
  onClose: () => void;
}

const QRDownloadModal: React.FC<QRDownloadModalProps> = ({ qrCode, opened, onClose }) => {
  const { workspace } = useWorkspace();
  const previewRef = useRef<HTMLDivElement>(null);
  const [busy, setBusy] = useState<Format | null>(null);
  const showWatermark = !workspace?.removeWatermark;
  const watermarkText = workspace?.watermarkText || 'QR Studio';

  const download = async (format: Format) => {
    if (!previewRef.current || busy) return;
    setBusy(format);
    try {
      await new Promise((resolve) => setTimeout(resolve, 100));
      const node = previewRef.current;
      const pixelRatio = window.innerWidth < 640 ? 1 : 2;
      let dataUrl =
        format === 'png'
          ? await toPng(node, { quality: 1, pixelRatio, cacheBust: true })
          : await toJpeg(node, { quality: format === 'webp' ? 0.9 : 0.95, pixelRatio, cacheBust: true, backgroundColor: '#ffffff' });
      if (format === 'webp') dataUrl = await toWebp(dataUrl);

      const link = document.createElement('a');
      link.download = `${qrCode.name}-${Date.now()}.${format}`;
      link.href = dataUrl;
      link.click();
      message.success(`Downloaded as ${format.toUpperCase()}`);
      onClose();
    } catch {
      message.error('Failed to download. Please try again.');
    } finally {
      setBusy(null);
    }
  };

  return (
    <Modal opened={opened} onClose={onClose} title={qrCode.name} size={480}>
      <div className="create-stage relative -mx-4 flex justify-center px-4 py-8">
        <LoadingOverlay visible={busy !== null} overlayProps={{ blur: 2 }} />
        <QRCodePreview
          ref={previewRef}
          content={qrCode.content}
          template={qrCode.template}
          styling={qrCode.styling}
          qrId={qrCode.id}
          qrType={qrCode.type}
          showWatermark={showWatermark}
          watermarkText={watermarkText}
        />
      </div>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        {showWatermark ? `Watermark: “${watermarkText}”` : 'No watermark'}
      </p>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {FORMATS.map(({ value, label, hint, icon: Icon }, index) => (
          <Button
            key={value}
            variant={index === 0 ? 'filled' : 'default'}
            h="auto"
            py={10}
            radius="lg"
            onClick={() => download(value)}
            loading={busy === value}
            disabled={busy !== null && busy !== value}
          >
            <span className="flex flex-col items-center gap-0.5">
              <span className="flex items-center gap-1.5">
                <Icon size={15} />
                {label}
              </span>
              <span className="text-[11px] font-normal opacity-70">{hint}</span>
            </span>
          </Button>
        ))}
      </div>
    </Modal>
  );
};

export default QRDownloadModal;
