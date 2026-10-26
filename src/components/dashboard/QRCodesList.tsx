import React, { memo } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import type { QRCodeData } from '@/types/qrcode';
import QRCodeCard from '../qr/QRCodeCard';

interface QRCodesListProps {
  qrCodes: QRCodeData[];
  loading: boolean;
  viewMode: 'list' | 'grid';
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onToggleStatus: (id: string) => void;
}

const GRID = 'grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 xl:grid-cols-4';
const LIST = 'divide-y divide-border overflow-hidden rounded-[22px] border border-border bg-card';

const QRCodesList: React.FC<QRCodesListProps> = memo(({ qrCodes, loading, viewMode, onEdit, onDelete, onToggleStatus }) => {
  if (loading) {
    return viewMode === 'list' ? (
      <div className={LIST}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 px-4 py-3">
            <Skeleton className="h-14 w-14 rounded-xl" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-3 w-64" />
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className={GRID}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="rounded-[22px] border border-border bg-card p-1.5">
            <Skeleton className="aspect-[4/3] w-full rounded-[18px]" />
            <div className="space-y-2 px-2.5 py-3">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={viewMode === 'list' ? LIST : GRID}>
      {qrCodes.map((qrCode) => (
        <QRCodeCard
          key={qrCode.id}
          qrCode={qrCode}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleStatus={onToggleStatus}
          viewMode={viewMode}
        />
      ))}
    </div>
  );
});

QRCodesList.displayName = 'QRCodesList';

export default QRCodesList;
