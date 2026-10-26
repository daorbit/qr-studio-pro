export const LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
  { value: 'it', label: 'Italian' },
  { value: 'pt', label: 'Portuguese' },
  { value: 'ru', label: 'Russian' },
  { value: 'zh', label: 'Chinese' },
  { value: 'ja', label: 'Japanese' },
  { value: 'ko', label: 'Korean' },
];

export const TIMEZONES = [
  { group: 'General', items: [{ value: 'UTC', label: 'UTC (Coordinated Universal Time)' }] },
  {
    group: 'Americas',
    items: [
      { value: 'America/New_York', label: 'New York (Eastern Time)' },
      { value: 'America/Chicago', label: 'Chicago (Central Time)' },
      { value: 'America/Denver', label: 'Denver (Mountain Time)' },
      { value: 'America/Los_Angeles', label: 'Los Angeles (Pacific Time)' },
      { value: 'America/Toronto', label: 'Toronto' },
      { value: 'America/Mexico_City', label: 'Mexico City' },
      { value: 'America/Sao_Paulo', label: 'São Paulo' },
      { value: 'America/Buenos_Aires', label: 'Buenos Aires' },
    ],
  },
  {
    group: 'Europe',
    items: [
      { value: 'Europe/London', label: 'London (GMT/BST)' },
      { value: 'Europe/Paris', label: 'Paris (CET)' },
      { value: 'Europe/Berlin', label: 'Berlin (CET)' },
      { value: 'Europe/Rome', label: 'Rome' },
      { value: 'Europe/Madrid', label: 'Madrid' },
      { value: 'Europe/Amsterdam', label: 'Amsterdam' },
      { value: 'Europe/Stockholm', label: 'Stockholm' },
      { value: 'Europe/Moscow', label: 'Moscow' },
    ],
  },
  {
    group: 'Asia',
    items: [
      { value: 'Asia/Dubai', label: 'Dubai (UAE)' },
      { value: 'Asia/Kolkata', label: 'India (IST)' },
      { value: 'Asia/Karachi', label: 'Karachi (Pakistan)' },
      { value: 'Asia/Dhaka', label: 'Dhaka (Bangladesh)' },
      { value: 'Asia/Bangkok', label: 'Bangkok (Thailand)' },
      { value: 'Asia/Singapore', label: 'Singapore' },
      { value: 'Asia/Hong_Kong', label: 'Hong Kong' },
      { value: 'Asia/Shanghai', label: 'Shanghai (China)' },
      { value: 'Asia/Tokyo', label: 'Tokyo (Japan)' },
      { value: 'Asia/Seoul', label: 'Seoul (South Korea)' },
      { value: 'Asia/Jakarta', label: 'Jakarta (Indonesia)' },
      { value: 'Asia/Manila', label: 'Manila (Philippines)' },
    ],
  },
  {
    group: 'Australia & Pacific',
    items: [
      { value: 'Australia/Sydney', label: 'Sydney' },
      { value: 'Australia/Melbourne', label: 'Melbourne' },
      { value: 'Australia/Brisbane', label: 'Brisbane' },
      { value: 'Australia/Perth', label: 'Perth' },
      { value: 'Pacific/Auckland', label: 'Auckland (New Zealand)' },
    ],
  },
  {
    group: 'Africa',
    items: [
      { value: 'Africa/Cairo', label: 'Cairo (Egypt)' },
      { value: 'Africa/Johannesburg', label: 'Johannesburg (South Africa)' },
      { value: 'Africa/Lagos', label: 'Lagos (Nigeria)' },
      { value: 'Africa/Nairobi', label: 'Nairobi (Kenya)' },
    ],
  },
];

export const TIME_FORMATS = [
  { value: '12', label: '12-hour · 2:30 PM' },
  { value: '24', label: '24-hour · 14:30' },
];
