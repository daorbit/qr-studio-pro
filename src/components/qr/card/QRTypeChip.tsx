import React from 'react';
import { QrCode } from 'lucide-react';
import type { QRType } from '@/types/qrcode';
import { QR_TYPE_OPTIONS } from '../qrTypeOptions';

const QRTypeChip: React.FC<{ type: QRType }> = ({ type }) => {
  const option = QR_TYPE_OPTIONS.find((o) => o.value === type);
  const Icon = option?.icon ?? QrCode;

  return (
    <span className="inline-flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground">
      <Icon size={13} className="shrink-0" />
      <span className="truncate">{option?.label ?? type}</span>
    </span>
  );
};

export default QRTypeChip;
