import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mantine/core';
import { Users } from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import { useWorkspace } from '@/hooks/useWorkspace';
import { useQRCodes } from '@/hooks/useQRCodes';
import WorkspaceHero from '@/components/workspace/WorkspaceHero';
import WorkspaceGeneralSettings from '@/components/workspace/WorkspaceGeneralSettings';
import WorkspaceUsageCard from '@/components/workspace/WorkspaceUsageCard';
import WorkspaceDangerZone from '@/components/workspace/WorkspaceDangerZone';

const WorkspacePage: React.FC = () => {
  const { workspace } = useWorkspace();
  const { statsTotal } = useQRCodes();

  if (!workspace) return null;

  return (
    <div className="animate-fade-in">
      <PageHeader
        title="Workspace"
        description="Its name, what it's using, and who owns it."
        actions={
          <Button component={Link} to="/members" variant="default" leftSection={<Users size={15} />}>
            Members
          </Button>
        }
      />
      <div className="max-w-[920px] space-y-5">
        <WorkspaceHero workspace={workspace} />
        <WorkspaceUsageCard workspace={workspace} qrCount={Number(statsTotal) || 0} />
        <WorkspaceGeneralSettings />
        <WorkspaceDangerZone />
      </div>
    </div>
  );
};

export default WorkspacePage;
