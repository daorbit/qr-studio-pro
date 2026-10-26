import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mantine/core';
import { ArrowUpRight, Gauge } from 'lucide-react';
import type { Workspace } from '@/types/workspace';
import SettingsCard from '@/components/common/SettingsCard';
import UsageMeter from '@/components/common/UsageMeter';

interface WorkspaceUsageCardProps {
  workspace: Workspace;
  qrCount: number;
}

const WorkspaceUsageCard: React.FC<WorkspaceUsageCardProps> = ({ workspace, qrCount }) => {
  const { features } = workspace.plan;

  return (
    <SettingsCard
      icon={Gauge}
      title="Usage"
      description="How much of your plan this workspace is using."
      action={
        <Button component={Link} to="/pricing" size="xs" variant="default" rightSection={<ArrowUpRight size={13} />}>
          Plans
        </Button>
      }
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <UsageMeter label="QR codes" used={qrCount} limit={features.maxQRCodes} />
        <UsageMeter label="Seats" used={workspace.memberCount} limit={features.maxMembers ?? 1} />
      </div>
      <p className="mt-4 text-xs text-muted-foreground">
        Each code can be scanned {features.maxScansPerQR === -1 ? 'without limit' : `up to ${features.maxScansPerQR.toLocaleString()} times`} on this plan.
      </p>
    </SettingsCard>
  );
};

export default WorkspaceUsageCard;
