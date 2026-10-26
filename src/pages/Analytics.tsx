import React, { useState, useCallback } from 'react';
import { Alert, Button } from '@mantine/core';
import { FlaskConical } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { message } from '@/lib/notify';
import { useAnalyticsData } from '@/hooks/useAnalyticsData';
import HeatmapByTime from '@/components/analytics/HeatmapByTime';
import AnalyticsHeader from '@/components/analytics/AnalyticsHeader';
import StatsOverview from '@/components/analytics/StatsOverview';
import MainCharts from '@/components/analytics/MainCharts';
import SecondaryCharts from '@/components/analytics/SecondaryCharts';
import WeekdayChart from '@/components/analytics/WeekdayChart';
import AdvancedAnalyticsSection from '@/components/analytics/AdvancedAnalyticsSection';
import EmptyAnalyticsState from '@/components/analytics/EmptyAnalyticsState';
import { exportAnalyticsCsv } from '@/components/analytics/exportAnalyticsCsv';

const AnalyticsSkeleton: React.FC = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} className="h-[112px] rounded-xl" />
      ))}
    </div>
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <Skeleton className="h-[340px] rounded-xl lg:col-span-2" />
      <Skeleton className="h-[340px] rounded-xl" />
    </div>
  </div>
);

const MainAnalytics: React.FC = () => {
  const [mode, setMode] = useState<'real' | 'demo'>('real');

  const {
    loading,
    scans,
    qrCodes,
    totalQRCodes,
    activeQRs,
    scansOverTime,
    weeklyData,
    deviceData,
    topQRCodes,
    qrTypeDistribution,
    locationData,
    displayedTotalScans,
    avgScansPerQR,
    advancedAnalytics,
    advancedLoading,
  } = useAnalyticsData(mode);

  const downloadCSV = useCallback(() => {
    exportAnalyticsCsv({
      scansOverTime,
      weeklyData,
      deviceData,
      locationData,
      topQRCodes,
      qrTypeDistribution,
      totalScans: displayedTotalScans,
      totalQRCodes,
      activeQRs,
      avgScansPerQR,
      mode,
    });
    message.success('Analytics CSV downloaded');
  }, [scansOverTime, weeklyData, deviceData, locationData, topQRCodes, qrTypeDistribution, displayedTotalScans, totalQRCodes, activeQRs, avgScansPerQR, mode]);

  const header = <AnalyticsHeader mode={mode} onModeChange={setMode} onDownloadCSV={downloadCSV} />;
  const isLoading = loading && mode === 'real';
  const hasNoData =
    mode === 'real' && !loading && ((qrCodes.length === 0 && scans.length === 0) || (displayedTotalScans === 0 && scans.length === 0));

  return (
    <div className="animate-fade-in">
      {header}

      {isLoading ? (
        <AnalyticsSkeleton />
      ) : hasNoData ? (
        <EmptyAnalyticsState onSwitchToDemo={() => setMode('demo')} />
      ) : (
        <div className="space-y-4 sm:space-y-5">
          {mode === 'demo' && (
            <Alert
              icon={<FlaskConical size={16} />}
              title="You're looking at sample data"
              color="gray"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span>Numbers on this page are made up so you can explore the reports.</span>
                <Button size="xs" variant="default" onClick={() => setMode('real')}>
                  Back to your data
                </Button>
              </div>
            </Alert>
          )}

          <StatsOverview
            displayedTotalScans={displayedTotalScans}
            activeQRs={activeQRs}
            totalQRCodes={totalQRCodes}
            avgScansPerQR={avgScansPerQR}
            scansOverTime={scansOverTime}
          />

          <MainCharts scansOverTime={scansOverTime} deviceData={deviceData} />

          <SecondaryCharts topQRCodes={topQRCodes} qrTypeDistribution={qrTypeDistribution} locationData={locationData} />

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <WeekdayChart weeklyData={weeklyData} />
            <HeatmapByTime scans={scans} mode={mode} className="lg:col-span-2" />
          </div>

          <div className="pt-4">
            <AdvancedAnalyticsSection advancedAnalytics={advancedAnalytics} advancedLoading={advancedLoading} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MainAnalytics;
