import React from 'react';
import { Loader } from '@mantine/core';
import { Share2 } from 'lucide-react';
import type { ReferrerAnalyticsData } from '@/types/analytics';
import ChartPanel from './chart/ChartPanel';
import DonutBreakdown from './chart/DonutBreakdown';
import RankedList from './chart/RankedList';

interface ReferrerProps {
  data?: ReferrerAnalyticsData;
  loading?: boolean;
  qrCodeId?: string;
}

const ReferrerAnalysis: React.FC<ReferrerProps> = ({ data, loading }) => {
  const referrers = Array.isArray(data?.referrers) ? data!.referrers : [];
  const categories = Object.entries(data?.categorized || {}).map(([name, value]) => ({ name, value: Number(value) || 0 }));
  const hasCategories = categories.some((c) => c.value > 0);

  return (
    <ChartPanel title="Traffic sources" description="How people reached your codes" icon={Share2} empty={!loading && !hasCategories && referrers.length === 0}>
      {loading ? (
        <div className="flex h-48 items-center justify-center">
          <Loader size="sm" />
        </div>
      ) : (
        <div className="space-y-5">
          {hasCategories && <DonutBreakdown data={categories} centerLabel="Visits" />}
          {referrers.length > 0 && (
            <div className={hasCategories ? 'border-t border-border pt-4' : ''}>
              <div className="mb-3 text-xs font-medium text-muted-foreground">Top referrers</div>
              <RankedList
                items={referrers.map((r, i) => ({
                  key: `${r.referrer}-${i}`,
                  label: <span className="font-mono text-xs">{r.referrer || 'Unknown'}</span>,
                  value: r.count || 0,
                }))}
              />
            </div>
          )}
        </div>
      )}
    </ChartPanel>
  );
};

export default ReferrerAnalysis;
