import React from 'react';
import { Tooltip } from '@mantine/core';
import { Lock, Target } from 'lucide-react';
import type { QRCodeData } from '@/types/qrcode';

export const getProtection = (qrCode: QRCodeData) => {
  const scanLimit = (qrCode.scanLimit ?? (qrCode as { scanlimit?: number | null }).scanlimit) as number | null | undefined;
  return {
    isProtected: typeof qrCode.password === 'string' && qrCode.password.trim().length > 0,
    scanLimit: typeof scanLimit === 'number' && scanLimit > 0 ? scanLimit : null,
  };
};

const QRProtectionIcons: React.FC<{ qrCode: QRCodeData }> = ({ qrCode }) => {
  const { isProtected, scanLimit } = getProtection(qrCode);
  if (!isProtected && !scanLimit) return null;

  return (
    <span className="flex items-center gap-1">
      {isProtected && (
        <Tooltip label="Password protected">
          <span className="create-glass flex h-6 w-6 items-center justify-center rounded-full text-amber-500">
            <Lock size={12} />
          </span>
        </Tooltip>
      )}
      {scanLimit && (
        <Tooltip label={`Scan limit: ${scanLimit}`}>
          <span className="create-glass flex h-6 w-6 items-center justify-center rounded-full text-sky-500">
            <Target size={12} />
          </span>
        </Tooltip>
      )}
    </span>
  );
};

export default QRProtectionIcons;
