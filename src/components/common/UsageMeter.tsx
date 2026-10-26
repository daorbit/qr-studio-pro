import React from 'react';
import { Progress } from '@mantine/core';

interface UsageMeterProps {
  label: string;
  used: number;
  limit: number;
}

const UsageMeter: React.FC<UsageMeterProps> = ({ label, used, limit }) => {
  const unlimited = limit === -1;
  const percent = unlimited || limit === 0 ? 0 : Math.min(100, (used / limit) * 100);
  const color = percent >= 90 ? 'red' : percent >= 70 ? 'yellow' : 'brand';

  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between gap-3 text-xs">
        <span className="font-medium text-muted-foreground">{label}</span>
        <span className="tabular-nums text-foreground">
          <span className="font-semibold">{used.toLocaleString()}</span>
          <span className="text-muted-foreground"> / {unlimited ? 'Unlimited' : limit.toLocaleString()}</span>
        </span>
      </div>
      <Progress value={unlimited ? 4 : percent} color={unlimited ? 'gray' : color} size="sm" radius="xl" />
    </div>
  );
};

export default UsageMeter;
