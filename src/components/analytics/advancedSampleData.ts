import type { AdvancedAnalytics } from '@/types/analytics';

export const ADVANCED_SAMPLE_DATA: AdvancedAnalytics = {
  heatmap: {
    cityData: [
      { city: 'New York', country: 'United States', scans: 45, count: 45, lat: 40.7128, lng: -74.006 },
      { city: 'London', country: 'United Kingdom', scans: 32, count: 32, lat: 51.5074, lng: -0.1278 },
      { city: 'Mumbai', country: 'India', scans: 28, count: 28, lat: 19.076, lng: 72.8777 },
      { city: 'Berlin', country: 'Germany', scans: 19, count: 19, lat: 52.52, lng: 13.405 },
      { city: 'Sydney', country: 'Australia', scans: 12, count: 12, lat: -33.8688, lng: 151.2093 },
    ],
    total: 136,
    totalScansWithCoordinates: 136,
  },
  peakTimes: {
    hourlyData: Array.from({ length: 24 }, (_, hour) => ({
      hour,
      count: Math.round(10 + 40 * Math.exp(-((hour - 14) ** 2) / 18)),
    })),
    peakHour: '2pm',
    peakDay: 'Monday',
  },
  referrers: {
    referrers: [
      { referrer: 'Direct', count: 156 },
      { referrer: 'facebook.com', count: 89 },
      { referrer: 'mail.google.com', count: 67 },
      { referrer: 'instagram.com', count: 41 },
    ],
    categorized: { direct: 156, social: 130, search: 0, email: 67, other: 27 },
  },
  retention: {
    totalScans: 459,
    uniqueScanners: 287,
    newScans: 302,
    returningScans: 157,
    repeatRate: 54.7,
    dailyRetention: Array.from({ length: 7 }, (_, i) => ({
      date: new Date(Date.now() - (6 - i) * 86400000).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      uniqueUsers: 20 + ((i * 13) % 30),
    })),
  },
};
