import {
  Link, Mail, Phone, MessageSquare, FileText, Wifi, MapPin,
  Instagram, Facebook, Youtube, MessageCircle, Image,
  Music, Send, CreditCard, Twitter, Linkedin,
  Calendar, FileDown, PlayCircle, Headphones, Tag, Star, ClipboardList, Contact, IdCard,
  type LucideIcon,
} from 'lucide-react';
import type { QRType } from '@/types/qrcode';

export type QRTypeCategory = 'basic' | 'social' | 'media' | 'business';

export interface QRTypeOption {
  value: QRType;
  label: string;
  description: string;
  category: QRTypeCategory;
  icon: LucideIcon;
  tint: string;
}

export const QR_TYPE_CATEGORIES: { value: 'all' | QRTypeCategory; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'basic', label: 'Basic' },
  { value: 'social', label: 'Social' },
  { value: 'media', label: 'Media' },
  { value: 'business', label: 'Business' },
];

export const QR_TYPE_OPTIONS: QRTypeOption[] = [
  { value: 'url', label: 'Website', description: 'Open any link', category: 'basic', icon: Link, tint: 'from-sky-400 to-blue-600' },
  { value: 'wifi', label: 'Wi-Fi', description: 'Join a network', category: 'basic', icon: Wifi, tint: 'from-cyan-400 to-sky-600' },
  { value: 'vcard', label: 'vCard', description: 'Save a contact', category: 'basic', icon: Contact, tint: 'from-emerald-400 to-teal-600' },
  { value: 'mecard', label: 'MeCard', description: 'Compact contact', category: 'basic', icon: IdCard, tint: 'from-teal-400 to-emerald-600' },
  { value: 'email', label: 'Email', description: 'Draft an email', category: 'basic', icon: Mail, tint: 'from-blue-400 to-indigo-600' },
  { value: 'phone', label: 'Phone', description: 'Start a call', category: 'basic', icon: Phone, tint: 'from-green-400 to-green-600' },
  { value: 'sms', label: 'SMS', description: 'Send a text', category: 'basic', icon: MessageSquare, tint: 'from-lime-400 to-green-600' },
  { value: 'location', label: 'Location', description: 'Open a map pin', category: 'basic', icon: MapPin, tint: 'from-rose-400 to-red-600' },
  { value: 'event', label: 'Event', description: 'Add to calendar', category: 'basic', icon: Calendar, tint: 'from-orange-400 to-red-500' },
  { value: 'text', label: 'Text', description: 'Show plain text', category: 'basic', icon: FileText, tint: 'from-zinc-400 to-zinc-600' },
  { value: 'whatsapp', label: 'WhatsApp', description: 'Start a chat', category: 'social', icon: MessageCircle, tint: 'from-green-400 to-emerald-600' },
  { value: 'instagram', label: 'Instagram', description: 'Open a profile', category: 'social', icon: Instagram, tint: 'from-amber-400 via-pink-500 to-purple-600' },
  { value: 'facebook', label: 'Facebook', description: 'Open a page', category: 'social', icon: Facebook, tint: 'from-blue-500 to-blue-700' },
  { value: 'youtube', label: 'YouTube', description: 'Play a video', category: 'social', icon: Youtube, tint: 'from-red-500 to-red-700' },
  { value: 'twitter', label: 'X', description: 'Open a profile', category: 'social', icon: Twitter, tint: 'from-zinc-700 to-black' },
  { value: 'linkedin', label: 'LinkedIn', description: 'Open a profile', category: 'social', icon: Linkedin, tint: 'from-sky-600 to-blue-800' },
  { value: 'spotify', label: 'Spotify', description: 'Play music', category: 'social', icon: Music, tint: 'from-green-500 to-green-700' },
  { value: 'telegram', label: 'Telegram', description: 'Start a chat', category: 'social', icon: Send, tint: 'from-sky-400 to-sky-600' },
  { value: 'pdf', label: 'PDF', description: 'Open a document', category: 'media', icon: FileDown, tint: 'from-red-400 to-rose-600' },
  { value: 'video', label: 'Video', description: 'Play a video file', category: 'media', icon: PlayCircle, tint: 'from-violet-400 to-purple-600' },
  { value: 'audio', label: 'Audio', description: 'Play an audio file', category: 'media', icon: Headphones, tint: 'from-fuchsia-400 to-pink-600' },
  { value: 'image', label: 'Image', description: 'Show a picture', category: 'media', icon: Image, tint: 'from-amber-400 to-orange-600' },
  { value: 'paypal', label: 'PayPal', description: 'Take a payment', category: 'business', icon: CreditCard, tint: 'from-blue-500 to-indigo-700' },
  { value: 'coupon', label: 'Coupon', description: 'Share a discount', category: 'business', icon: Tag, tint: 'from-orange-400 to-amber-600' },
  { value: 'review', label: 'Review', description: 'Ask for a review', category: 'business', icon: Star, tint: 'from-yellow-400 to-amber-500' },
  { value: 'feedback', label: 'Feedback', description: 'Open a survey', category: 'business', icon: ClipboardList, tint: 'from-indigo-400 to-violet-600' },
];
