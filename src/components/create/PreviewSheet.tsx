import React from 'react';
import { Button, Drawer } from '@mantine/core';
import { PenLine } from 'lucide-react';
import QRCodePreview from '@/components/qr/QRCodePreview';
import type { QRStyling, QRTemplate, QRType } from '@/types/qrcode';

interface PreviewSheetProps {
  opened: boolean;
  onClose: () => void;
  content: string;
  template: QRTemplate | null;
  styling: QRStyling;
  type: QRType;
  qrId?: string;
  previewRef?: React.RefObject<HTMLDivElement>;
  onTemplateChange: (template: QRTemplate | null) => void;
  onEditCard: () => void;
}

const PreviewSheet: React.FC<PreviewSheetProps> = ({
  opened,
  onClose,
  content,
  template,
  styling,
  type,
  qrId,
  previewRef,
  onTemplateChange,
  onEditCard,
}) => (
  <Drawer
    opened={opened}
    onClose={onClose}
    position="bottom"
    size="auto"
    radius="xl"
    title="Preview"
    classNames={{ content: 'max-h-[88vh]' }}
  >
    <div className="create-stage -mx-4 flex flex-col items-center gap-4 px-4 py-8">
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
      <p className="text-center text-xs text-muted-foreground">
        {template ? 'Tap any text on the card to edit it' : 'Point another phone camera here to test it'}
      </p>
      {template && (
        <Button
          variant="default"
          leftSection={<PenLine size={14} />}
          onClick={() => {
            onClose();
            onEditCard();
          }}
        >
          Edit card
        </Button>
      )}
    </div>
  </Drawer>
);

export default PreviewSheet;
