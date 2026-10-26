import React from 'react';
import { Link } from 'react-router-dom';
import { ActionIcon, Button, Progress, Tooltip } from '@mantine/core';
import { ChevronLeft, Undo2 } from 'lucide-react';
import StepBar from './StepBar';
import { CREATE_STEPS } from './createSteps';

interface CreateHeaderProps {
  name: string;
  editing: boolean;
  current: number;
  canJump: (index: number) => boolean;
  onJump: (index: number) => void;
  canUndo: boolean;
  onUndo: () => void;
  canSave: boolean;
  saving: boolean;
  onSave: () => void;
}

const CreateHeader: React.FC<CreateHeaderProps> = ({ name, editing, current, canJump, onJump, canUndo, onUndo, canSave, saving, onSave }) => (
  <div className="create-glass-bar sticky top-0 z-20 -mx-4 -mt-6 mb-6 border-b px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:-mt-7 lg:mb-8 lg:rounded-t-2xl lg:px-8">
    <div className="flex h-16 items-center gap-3">
      <Tooltip label="Back to QR codes">
        <ActionIcon component={Link} to="/dashboard" size="lg" radius="xl" aria-label="Back to QR codes">
          <ChevronLeft size={18} />
        </ActionIcon>
      </Tooltip>

      <div className="min-w-0 flex-1 xl:flex-none xl:basis-56">
        <div className="text-[11px] font-medium uppercase tracking-[0.08em] text-muted-foreground">
          {editing ? 'Editing' : 'New QR code'}
        </div>
        <div className="truncate text-[15px] font-semibold tracking-[-0.01em] text-foreground">{name.trim() || 'Untitled'}</div>
      </div>

      <div className="hidden flex-1 justify-center xl:flex">
        <StepBar current={current} canJump={canJump} onJump={onJump} />
      </div>

      <Tooltip label="Undo style change">
        <ActionIcon variant="default" size="lg" radius="xl" onClick={onUndo} disabled={!canUndo} aria-label="Undo style change">
          <Undo2 size={15} />
        </ActionIcon>
      </Tooltip>

      <Button onClick={onSave} disabled={!canSave} loading={saving} className="hidden lg:inline-flex">
        {editing ? 'Save changes' : 'Save QR code'}
      </Button>
    </div>

    <div className="hidden pb-3 lg:flex xl:hidden">
      <StepBar current={current} canJump={canJump} onJump={onJump} />
    </div>

    <Progress value={((current + 1) / CREATE_STEPS.length) * 100} size={2} radius={0} className="-mx-4 sm:-mx-6 lg:hidden" />
  </div>
);

export default CreateHeader;
