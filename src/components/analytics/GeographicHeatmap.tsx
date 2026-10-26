import React from 'react';
import { Loader } from '@mantine/core';
import { MapPin } from 'lucide-react';
import type { GeographicHeatmapData } from '@/types/analytics';
import ChartPanel from './chart/ChartPanel';
import RankedList from './chart/RankedList';
import { formatNumber } from './chart/chartTheme';

interface HeatmapProps {
  data?: GeographicHeatmapData;
  loading?: boolean;
  qrCodeId?: string;
}

const GeographicHeatmap: React.FC<HeatmapProps> = ({ data, loading }) => {
  const cities = Array.isArray(data?.cityData) ? data!.cityData : [];
  const totalScans =
    data?.total || data?.totalScansWithCoordinates || cities.reduce((sum, c) => sum + (c.count || c.scans || 0), 0);

  return (
    <ChartPanel
      title="Cities"
      description="Where scans happen"
      icon={MapPin}
      empty={!loading && cities.length === 0}
      emptyText="No location data yet"
      extra={
        cities.length > 0 ? (
          <div className="text-right text-[11px] text-muted-foreground">
            <span className="font-semibold text-foreground">{formatNumber(cities.length)}</span> places ·{' '}
            <span className="font-semibold text-foreground">{formatNumber(totalScans)}</span> scans
          </div>
        ) : null
      }
    >
      {loading ? (
        <div className="flex h-48 items-center justify-center">
          <Loader size="sm" />
        </div>
      ) : (
        <RankedList
          limit={8}
          items={cities.map((c, i) => ({
            key: `${c.city}-${c.country}-${i}`,
            label: (
              <>
                {c.city || 'Unknown'}
                <span className="ml-1.5 text-muted-foreground">{c.country}</span>
              </>
            ),
            value: c.count || c.scans || 0,
          }))}
        />
      )}
    </ChartPanel>
  );
};

export default GeographicHeatmap;
