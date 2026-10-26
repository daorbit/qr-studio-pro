import { Calendar, Clock, Minus, Tag, Type, type LucideIcon } from 'lucide-react';
import type { CustomField } from '@/types/qrcode';

export const FIELD_TYPES: { value: CustomField['type']; label: string; icon: LucideIcon }[] = [
  { value: 'label', label: 'Label', icon: Tag },
  { value: 'text', label: 'Text', icon: Type },
  { value: 'date', label: 'Date', icon: Calendar },
  { value: 'time', label: 'Time', icon: Clock },
  { value: 'divider', label: 'Divider', icon: Minus },
];

export const FIELD_DEFAULTS: Record<CustomField['type'], string> = {
  label: 'NEW LABEL',
  title: 'New Title',
  subtitle: 'New Subtitle',
  text: 'New text content',
  date: 'January 1, 2025',
  time: '12:00 PM',
  button: 'Click Me',
  divider: '',
  logo: '',
};

export const FONT_WEIGHTS = [
  { value: 'normal', label: 'Regular' },
  { value: 'medium', label: 'Medium' },
  { value: 'semibold', label: 'Semibold' },
  { value: 'bold', label: 'Bold' },
];

export const FONT_FAMILIES = [
  'Inter', 'Space Grotesk', 'Playfair Display', 'Poppins', 'Roboto', 'Montserrat', 'Open Sans', 'Lato', 'Oswald', 'Raleway',
  'Source Sans Pro', 'Ubuntu', 'Nunito', 'Quicksand', 'Bebas Neue', 'Archivo Black', 'Satisfy', 'Dancing Script', 'Pacifico', 'Lobster',
];

export const TEXT_ALIGNS = [
  { value: 'left', label: 'Left' },
  { value: 'center', label: 'Center' },
  { value: 'right', label: 'Right' },
];

export const GRADIENT_DIRECTIONS = [
  { value: 'to-bottom', label: '↓' },
  { value: 'to-right', label: '→' },
  { value: 'to-bottom-right', label: '↘' },
  { value: 'to-top-right', label: '↗' },
];

export const SHADOWS = [
  { value: 'none', label: 'None' },
  { value: 'light', label: 'Light' },
  { value: 'medium', label: 'Medium' },
  { value: 'strong', label: 'Strong' },
];

export const GRADIENT_PRESETS = [
  { bg: '#667eea', end: '#764ba2', text: '#ffffff' },
  { bg: '#11998e', end: '#38ef7d', text: '#ffffff' },
  { bg: '#ee9ca7', end: '#ffdde1', text: '#1a1a1a' },
  { bg: '#232526', end: '#414345', text: '#ffffff' },
  { bg: '#1e3c72', end: '#2a5298', text: '#ffffff' },
  { bg: '#00c6ff', end: '#0072ff', text: '#ffffff' },
  { bg: '#ed213a', end: '#93291e', text: '#ffffff' },
  { bg: '#00f260', end: '#0575e6', text: '#ffffff' },
];

export const EMOJI_GROUPS = [
  { name: 'Popular', emojis: ['✨', '🎉', '🚀', '💡', '🔥', '⭐', '💫', '🎯', '💪', '👋', '❤️', '💜', '💙', '💚', '🧡'] },
  { name: 'Business', emojis: ['📱', '💼', '📊', '📈', '🏢', '💰', '🎁', '📦', '🛒', '💳', '📧', '📞', '🔗', '📍', '🏆'] },
  { name: 'Social', emojis: ['👤', '👥', '🤝', '💬', '🎵', '🎬', '📸', '🎨', '🎧', '🎮', '📺', '🎭', '🎪', '🎡', '🎢'] },
  { name: 'Food & nature', emojis: ['🍕', '🍔', '🍜', '☕', '🍷', '🍰', '🌿', '🌸', '🌺', '🌻', '🍀', '🌙', '☀️', '🌈', '🌊'] },
  { name: 'Symbols', emojis: ['→', '←', '↑', '↓', '↔', '•', '◆', '■', '▶', '★', '☆', '✓', '✗', '♦', '♣'] },
];
