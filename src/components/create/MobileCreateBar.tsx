import React from 'react';
import { ActionIcon, Button } from '@mantine/core';
import { ChevronLeft, ChevronRight, Eye } from 'lucide-react';

interface MobileCreateBarProps {
  isFirst: boolean;
  isLast: boolean;
  saving: boolean;
  onPrev: () => void;
  onNext: () => void;
  onSave: () => void;
  onPreview: () => void;
}

const MobileCreateBar: React.FC<MobileCreateBarProps> = ({ isFirst, isLast, saving, onPrev, onNext, onSave, onPreview }) => (
  <div className="fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(env(safe-area-inset-bottom),12px)] lg:hidden">
    <div className="create-glass mx-auto flex max-w-md items-center gap-2 rounded-full p-1.5">
      <ActionIcon size={42} radius="xl" variant="default" onClick={onPrev} disabled={isFirst} aria-label="Previous step">
        <ChevronLeft size={18} />
      </ActionIcon>
      <ActionIcon size={42} radius="xl" variant="default" onClick={onPreview} aria-label="Preview">
        <Eye size={18} />
      </ActionIcon>
      {isLast ? (
        <Button h={42} className="flex-1" onClick={onSave} loading={saving}>
          Save QR code
        </Button>
      ) : (
        <Button h={42} className="flex-1" rightSection={<ChevronRight size={16} />} onClick={onNext}>
          Continue
        </Button>
      )}
    </div>
  </div>
);

export default MobileCreateBar;
