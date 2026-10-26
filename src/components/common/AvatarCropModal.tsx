import React, { useState } from 'react';
import { Button, Modal, Slider } from '@mantine/core';
import Cropper, { type Area } from 'react-easy-crop';
import { cropImageToFile } from '@/lib/cropImage';
import { message } from '@/lib/notify';

interface AvatarCropModalProps {
  image: string | null;
  busy?: boolean;
  onCancel: () => void;
  onConfirm: (file: File) => void;
}

const AvatarCropModal: React.FC<AvatarCropModalProps> = ({ image, busy, onCancel, onConfirm }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [area, setArea] = useState<Area | null>(null);

  const confirm = async () => {
    if (!image || !area) return;
    try {
      onConfirm(await cropImageToFile(image, area));
    } catch {
      message.error('Could not crop the image');
    }
  };

  return (
    <Modal opened={Boolean(image)} onClose={onCancel} title="Crop your photo" size={480}>
      <div className="relative h-[320px] overflow-hidden rounded-xl bg-foreground/[0.04]">
        {image && (
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            showGrid={false}
            onCropChange={setCrop}
            onCropComplete={(_, pixels) => setArea(pixels)}
            onZoomChange={setZoom}
            objectFit="contain"
          />
        )}
      </div>
      <div className="mt-5">
        <div className="mb-1.5 flex justify-between text-xs font-medium text-muted-foreground">
          <span>Zoom</span>
          <span className="tabular-nums">{Math.round(zoom * 100)}%</span>
        </div>
        <Slider min={1} max={3} step={0.05} value={zoom} onChange={setZoom} label={null} />
      </div>
      <div className="mt-6 flex justify-end gap-2">
        <Button variant="default" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={confirm} loading={busy}>
          Save photo
        </Button>
      </div>
    </Modal>
  );
};

export default AvatarCropModal;
