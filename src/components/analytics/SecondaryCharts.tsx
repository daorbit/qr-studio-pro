import React from 'react';
import { Globe, Layers, Trophy } from 'lucide-react';
import type { LocationData, QRCodeScanData, QRTypeData } from '@/types/analytics';
import { QR_TYPE_OPTIONS } from '@/components/qr/qrTypeOptions';
import ChartPanel from './chart/ChartPanel';
import RankedList from './chart/RankedList';
import DonutBreakdown from './chart/DonutBreakdown';

interface SecondaryChartsProps {
  topQRCodes: QRCodeScanData[];
  qrTypeDistribution: QRTypeData[];
  locationData: LocationData[];
}

const SecondaryCharts: React.FC<SecondaryChartsProps> = ({ topQRCodes, qrTypeDistribution, locationData }) => (
  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
    <ChartPanel title="Top QR codes" description="Most scanned codes" icon={Trophy} empty={!topQRCodes.some((q) => q.scans > 0)}>
      <RankedList items={topQRCodes.map((q, i) => ({ key: `${q.name}-${i}`, label: q.name, value: q.scans }))} />
    </ChartPanel>

    <ChartPanel title="Top countries" description="Where scans come from" icon={Globe} empty={!locationData.some((l) => l.scans > 0)}>
      <RankedList items={locationData.map((l) => ({ key: l.country, label: l.country || 'Unknown', value: l.scans }))} />
    </ChartPanel>

    <ChartPanel title="Code types" description="What your codes open" icon={Layers} empty={qrTypeDistribution.length === 0} className="md:col-span-2 xl:col-span-1">
      <DonutBreakdown
        data={qrTypeDistribution.map((t) => ({
          name: QR_TYPE_OPTIONS.find((o) => o.value === t.name)?.label ?? t.name,
          value: t.value,
        }))}
        centerLabel="Codes"
        unit="codes"
      />
    </ChartPanel>
  </div>
);

export default SecondaryCharts;
