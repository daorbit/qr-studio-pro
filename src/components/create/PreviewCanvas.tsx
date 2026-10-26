import React from 'react';
import { Button } from '@mantine/core';
import { PenLine, ScanLine } from 'lucide-react';
import QRCodePreview from '@/components/qr/QRCodePreview';
import type { QRStyling, QRTemplate, QRType } from '@/types/qrcode';

interface PreviewCanvasProps {
  previewRef: React.RefObject<HTMLDivElement>;
  content: string;
  template: QRTemplate | null;
  styling: QRStyling;
  type: QRType;
  qrId?: string;
  onTemplateChange: (template: QRTemplate | null) => void;
  onEditCard: () => void;
}

const PreviewCanvas: React.FC<PreviewCanvasProps> = ({ previewRef, content, template, styling, type, qrId, onTemplateChange, onEditCard }) => (
  <div className="create-stage overflow-hidden rounded-[28px] border border-foreground/[0.07]">
    <div className="flex items-center justify-between px-4 pt-4">
      <span className="create-glass inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold text-foreground">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        </span>
        Live preview
      </span>
      {template && (
        <Button size="xs" variant="default" leftSection={<PenLine size={13} />} onClick={onEditCard}>
          Edit card
        </Button>
      )}
    </div>

    <div className="flex min-h-[440px] items-center justify-center px-6 py-10">
      <div className={template ? '' : 'create-glass rounded-[28px] p-3'}>
        <QRCodePreview
          ref={previewRef}
          content={content}
          template={template}
          styling={styling}
          editable={Boolean(template)}
          onTemplateChange={onTemplateChange}
          qrId={qrId}
          qrType={type}
        />
      </div>
    </div>

    <div className="flex items-center justify-center gap-1.5 px-4 pb-5 text-xs text-muted-foreground">
      <ScanLine size={13} />
      {template ? 'Click any text on the card to edit it' : 'Point your phone camera here to test it'}
    </div>
  </div>
);

export default PreviewCanvas;
