import type { QRType } from '@/types/qrcode';

export type ContentValues = Record<string, string>;

const vCard = (v: ContentValues) => `BEGIN:VCARD
VERSION:3.0
N:${v.lastName || ''};${v.firstName || ''}
FN:${v.firstName || ''} ${v.lastName || ''}
ORG:${v.company || ''}
TITLE:${v.title || ''}
TEL:${v.phone || ''}
EMAIL:${v.email || ''}
URL:${v.website || ''}
ADR:;;${v.address || ''}
END:VCARD`;

const meCard = (v: ContentValues) =>
  `MECARD:N:${v.lastName || ''},${v.firstName || ''};TEL:${v.phone || ''};EMAIL:${v.email || ''};URL:${v.website || ''};ADR:${v.address || ''};;`;

const toIcsDate = (value?: string) => (value ? value.replace(/-/g, '').replace(/:/g, '') + '00' : '');

const vEvent = (v: ContentValues) => `BEGIN:VEVENT
SUMMARY:${v.eventTitle || ''}
LOCATION:${v.eventLocation || ''}
DTSTART:${toIcsDate(v.startDate)}
DTEND:${toIcsDate(v.endDate)}
DESCRIPTION:${v.eventDescription || ''}
END:VEVENT`;

export const buildContent = (type: QRType, v: ContentValues): string => {
  switch (type) {
    case 'vcard':
      return vCard(v);
    case 'mecard':
      return meCard(v);
    case 'wifi':
      return `WIFI:T:${v.encryption || 'WPA'};S:${v.ssid || ''};P:${v.password || ''};;`;
    case 'email':
      return `mailto:${v.email || ''}?subject=${encodeURIComponent(v.subject || '')}&body=${encodeURIComponent(v.body || '')}`;
    case 'event':
      return vEvent(v);
    case 'phone':
      return `tel:${v.phone || ''}`;
    case 'sms':
      return `sms:${v.phone || ''}${v.message ? `?body=${encodeURIComponent(v.message)}` : ''}`;
    case 'location':
      return `geo:${v.lat || '0'},${v.lng || '0'}`;
    case 'instagram':
      return `https://instagram.com/${v.username || ''}`;
    case 'facebook':
      return `https://facebook.com/${v.username || ''}`;
    case 'youtube':
      return v.channel || '';
    case 'whatsapp':
      return `https://wa.me/${v.phone || ''}${v.message ? `?text=${encodeURIComponent(v.message)}` : ''}`;
    case 'tiktok':
      return `https://tiktok.com/@${v.username || ''}`;
    case 'twitter':
      return `https://x.com/${v.username || ''}`;
    case 'linkedin':
      return v.profileUrl || '';
    case 'spotify':
      return v.spotifyUrl || '';
    case 'telegram':
      return `https://t.me/${v.username || ''}`;
    case 'paypal':
      return `https://paypal.me/${v.username || ''}`;
    case 'pdf':
    case 'video':
    case 'audio':
      return v.fileUrl || '';
    case 'review':
      return v.reviewUrl || '';
    case 'feedback':
      return v.feedbackUrl || '';
    case 'coupon':
      return JSON.stringify({
        code: v.couponCode || '',
        discount: v.discount || '',
        description: v.couponDescription || '',
        validUntil: v.validUntil || '',
      });
    default:
      return v.content || '';
  }
};
