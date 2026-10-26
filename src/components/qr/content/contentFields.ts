import { AtSign, Link, MapPin, Phone, type LucideIcon } from 'lucide-react';
import type { QRType } from '@/types/qrcode';

export type ContentFieldKind = 'text' | 'textarea' | 'password' | 'select' | 'datetime' | 'date';

export interface ContentField {
  name: string;
  label: string;
  placeholder?: string;
  kind?: ContentFieldKind;
  half?: boolean;
  required?: boolean;
  icon?: LucideIcon;
  rows?: number;
  options?: { value: string; label: string }[];
  defaultValue?: string;
}

const phoneField: ContentField = { name: 'phone', label: 'Phone number', placeholder: '+1 234 567 890', required: true, icon: Phone };
const messageField = (placeholder: string): ContentField => ({
  name: 'message',
  label: 'Pre-filled message',
  placeholder,
  kind: 'textarea',
  rows: 3,
});
const usernameField = (label: string): ContentField => ({ name: 'username', label, placeholder: 'yourusername', required: true, icon: AtSign });
const urlField = (name: string, label: string, placeholder: string): ContentField => ({ name, label, placeholder, required: true, icon: Link });

const contactFields: ContentField[] = [
  { name: 'firstName', label: 'First name', placeholder: 'John', half: true },
  { name: 'lastName', label: 'Last name', placeholder: 'Doe', half: true },
  { name: 'email', label: 'Email', placeholder: 'john@example.com', half: true },
  { name: 'phone', label: 'Phone', placeholder: '+1 234 567 890', half: true },
];

const contactExtras: ContentField[] = [
  { name: 'website', label: 'Website', placeholder: 'https://yourwebsite.com' },
  { name: 'address', label: 'Address', placeholder: '123 Main St, City, Country' },
];

export const CONTENT_FIELDS: Partial<Record<QRType, ContentField[]>> = {
  url: [urlField('content', 'Website URL', 'https://example.com')],
  text: [{ name: 'content', label: 'Text', placeholder: 'Enter your text here...', kind: 'textarea', rows: 6 }],
  phone: [phoneField],
  sms: [phoneField, messageField('Your message...')],
  whatsapp: [{ ...phoneField, label: 'WhatsApp number (with country code)', placeholder: '1234567890' }, messageField('Hi! I want to...')],
  location: [
    { name: 'lat', label: 'Latitude', placeholder: '40.7128', required: true, half: true, icon: MapPin },
    { name: 'lng', label: 'Longitude', placeholder: '-74.0060', required: true, half: true },
  ],
  instagram: [usernameField('Instagram username')],
  facebook: [usernameField('Facebook username')],
  tiktok: [usernameField('TikTok username')],
  twitter: [usernameField('X username')],
  telegram: [usernameField('Telegram username')],
  paypal: [usernameField('PayPal.me username')],
  youtube: [urlField('channel', 'YouTube channel or video URL', 'https://youtube.com/...')],
  linkedin: [urlField('profileUrl', 'LinkedIn profile URL', 'https://linkedin.com/in/yourprofile')],
  spotify: [urlField('spotifyUrl', 'Spotify URL (artist, playlist or track)', 'https://open.spotify.com/...')],
  pdf: [urlField('fileUrl', 'PDF or document URL', 'https://example.com/document.pdf')],
  video: [urlField('fileUrl', 'Video URL', 'https://example.com/video.mp4')],
  audio: [urlField('fileUrl', 'Audio URL', 'https://example.com/audio.mp3')],
  review: [urlField('reviewUrl', 'Google review URL', 'https://g.page/r/...')],
  feedback: [urlField('feedbackUrl', 'Feedback or survey URL', 'https://forms.google.com/...')],
  vcard: [
    ...contactFields,
    { name: 'company', label: 'Company', placeholder: 'Company Inc.', half: true },
    { name: 'title', label: 'Job title', placeholder: 'Software Engineer', half: true },
    ...contactExtras,
  ],
  mecard: [...contactFields, ...contactExtras],
  event: [
    { name: 'eventTitle', label: 'Event title', placeholder: 'Team Meeting', required: true },
    { name: 'startDate', label: 'Starts', kind: 'datetime', required: true, half: true },
    { name: 'endDate', label: 'Ends', kind: 'datetime', required: true, half: true },
    { name: 'eventLocation', label: 'Location', placeholder: 'Conference Room A' },
    { name: 'eventDescription', label: 'Description', placeholder: 'Event details...', kind: 'textarea', rows: 3 },
  ],
  coupon: [
    { name: 'couponCode', label: 'Coupon code', placeholder: 'SAVE20', required: true, half: true },
    { name: 'discount', label: 'Discount', placeholder: '20% OFF', half: true },
    { name: 'couponDescription', label: 'Description', placeholder: 'Valid for all products...', kind: 'textarea', rows: 2 },
    { name: 'validUntil', label: 'Valid until', kind: 'date' },
  ],
  wifi: [
    { name: 'ssid', label: 'Network name (SSID)', placeholder: 'MyWiFiNetwork' },
    { name: 'password', label: 'Password', placeholder: 'Enter password', kind: 'password', half: true },
    {
      name: 'encryption',
      label: 'Security',
      kind: 'select',
      half: true,
      defaultValue: 'WPA',
      options: [
        { value: 'WPA', label: 'WPA/WPA2' },
        { value: 'WEP', label: 'WEP' },
        { value: 'nopass', label: 'None' },
      ],
    },
  ],
  email: [
    { name: 'email', label: 'Email address', placeholder: 'recipient@example.com' },
    { name: 'subject', label: 'Subject', placeholder: 'Email subject' },
    { name: 'body', label: 'Message', placeholder: 'Email body...', kind: 'textarea', rows: 4 },
  ],
};
