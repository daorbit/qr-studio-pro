import type { DeviceData, LocationData, QRCodeScanData, QRTypeData, ScanData, WeeklyData } from '@/types/analytics';

interface AnalyticsCsvInput {
  scansOverTime: ScanData[];
  weeklyData: WeeklyData[];
  deviceData: DeviceData[];
  locationData: LocationData[];
  topQRCodes: QRCodeScanData[];
  qrTypeDistribution: QRTypeData[];
  totalScans: number;
  totalQRCodes: number;
  activeQRs: number;
  avgScansPerQR: number;
  mode: 'real' | 'demo';
}

const section = (title: string, header: string, rows: [string, number | string][]) => [
  `=== ${title} ===`,
  header,
  ...rows.map(([label, value]) => `"${label}",${value}`),
  '',
];

export const exportAnalyticsCsv = (input: AnalyticsCsvInput) => {
  const lines = [
    ...section('SCANS OVER TIME (Last 30 Days)', 'Date,Scans', input.scansOverTime.map((d) => [d.date, d.scans])),
    ...section('SCANS BY WEEKDAY', 'Day,Scans', input.weeklyData.map((d) => [d.day, d.scans])),
    ...section('DEVICES', 'Device,Scans', input.deviceData.map((d) => [d.name, d.value])),
    ...section('TOP COUNTRIES', 'Country,Scans', input.locationData.map((d) => [d.country, d.scans])),
    ...section('TOP QR CODES', 'QR Code,Scans', input.topQRCodes.map((d) => [d.name, d.scans])),
    ...section('QR CODE TYPES', 'Type,Count', input.qrTypeDistribution.map((d) => [d.name, d.value])),
    ...section('SUMMARY', 'Metric,Value', [
      ['Total Scans', input.totalScans],
      ['Total QR Codes', input.totalQRCodes],
      ['Active QR Codes', input.activeQRs],
      ['Average Scans per QR', input.avgScansPerQR],
      ['Data', input.mode === 'demo' ? 'Sample' : 'Live'],
      ['Exported', new Date().toISOString()],
    ]),
  ];

  const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `analytics-overview-${new Date().toISOString().split('T')[0]}.csv`;
  link.click();
  URL.revokeObjectURL(url);
};
