import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@mantine/core';
import { BarChart3 } from 'lucide-react';
import EmptyBlock from '@/components/common/EmptyBlock';

interface EmptyAnalyticsStateProps {
  onSwitchToDemo?: () => void;
}

const EmptyAnalyticsState: React.FC<EmptyAnalyticsStateProps> = ({ onSwitchToDemo }) => (
  <div className="rounded-xl border border-border bg-card py-10 shadow-soft">
    <EmptyBlock
      icon={BarChart3}
      title="No scans yet"
      description="Share or print one of your QR codes. As soon as people scan it, you'll see where, when and how here."
      action={
        <div className="flex flex-wrap justify-center gap-2">
          <Button component={Link} to="/create">
            Create a QR code
          </Button>
          {onSwitchToDemo && (
            <Button variant="default" onClick={onSwitchToDemo}>
              View sample data
            </Button>
          )}
        </div>
      }
    />
  </div>
);

export default EmptyAnalyticsState;
