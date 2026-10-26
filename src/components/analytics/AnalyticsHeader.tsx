import React from 'react';
import { Button, SegmentedControl } from '@mantine/core';
import { Download } from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';

interface AnalyticsHeaderProps {
  mode: 'real' | 'demo';
  onModeChange: (mode: 'real' | 'demo') => void;
  onDownloadCSV: () => void;
}

const MODES = [
  { value: 'real', label: 'Your data' },
  { value: 'demo', label: 'Sample' },
];

const AnalyticsHeader: React.FC<AnalyticsHeaderProps> = ({ mode, onModeChange, onDownloadCSV }) => (
  <PageHeader
    title="Analytics"
    description="How your QR codes perform across the workspace"
    actions={
      <>
        <SegmentedControl data={MODES} value={mode} onChange={(v) => onModeChange(v as 'real' | 'demo')} />
        <Button variant="default" leftSection={<Download size={15} />} onClick={onDownloadCSV}>
          Export CSV
        </Button>
      </>
    }
  />
);

export default AnalyticsHeader;
