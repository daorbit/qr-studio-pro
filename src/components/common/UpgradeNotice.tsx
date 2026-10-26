import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mantine/core';
import { ArrowUpRight, Crown } from 'lucide-react';

interface UpgradeNoticeProps {
  title?: string;
  description: string;
}

const UpgradeNotice: React.FC<UpgradeNoticeProps> = ({ title = 'Available on paid plans', description }) => (
  <div className="flex flex-col gap-3 rounded-xl border border-amber-500/25 bg-gradient-to-br from-amber-400/10 to-orange-500/5 p-4 sm:flex-row sm:items-center">
    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-gradient-to-br from-amber-400 to-orange-500 text-white">
      <Crown size={17} />
    </span>
    <div className="min-w-0 flex-1">
      <div className="text-[13.5px] font-semibold text-foreground">{title}</div>
      <div className="text-xs text-muted-foreground">{description}</div>
    </div>
    <Button component={Link} to="/pricing" size="sm" rightSection={<ArrowUpRight size={14} />}>
      Upgrade
    </Button>
  </div>
);

export default UpgradeNotice;
