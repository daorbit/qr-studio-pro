import React from 'react';
import { Popover } from '@mantine/core';
import { Type } from 'lucide-react';

interface InlineEditPopoverProps {
  title: string;
  opened: boolean;
  onChange: (opened: boolean) => void;
  target: React.ReactNode;
  children: React.ReactNode;
  width?: number;
}

const InlineEditPopover: React.FC<InlineEditPopoverProps> = ({ title, opened, onChange, target, children, width = 272 }) => (
  <Popover opened={opened} onChange={onChange} width={width} position="bottom" shadow="lg" trapFocus withinPortal>
    <Popover.Target>
      <div onClick={() => onChange(!opened)}>{target}</div>
    </Popover.Target>
    <Popover.Dropdown>
      <div className="mb-3 flex items-center gap-2 text-[13px] font-semibold text-foreground">
        <Type size={14} />
        {title}
      </div>
      <div className="space-y-3">{children}</div>
    </Popover.Dropdown>
  </Popover>
);

export default InlineEditPopover;
