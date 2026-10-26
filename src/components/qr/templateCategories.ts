import type { QRTemplate } from '@/types/qrcode';

export const TEMPLATE_CATEGORIES = [
  { value: 'all', label: 'All' },
  { value: 'professional', label: 'Professional' },
  { value: 'social', label: 'Social' },
  { value: 'restaurant', label: 'Restaurant' },
  { value: 'vibrant', label: 'Vibrant' },
  { value: 'minimal', label: 'Minimal' },
  { value: 'luxury', label: 'Luxury' },
  { value: 'themed', label: 'Themed' },
];

const matches = (value: string, parts: string[]) => parts.some((part) => value.includes(part));

export const getCategoryForTemplate = (template: QRTemplate): string => {
  const name = template.name.toLowerCase();
  const id = template.id.toLowerCase();

  if (matches(id, ['instagram', 'facebook', 'youtube', 'linkedin', 'whatsapp', 'twitter', 'pinterest', 'social-follow'])) return 'social';
  if (matches(id, ['restaurant', 'bistro', 'cafe', 'sushi', 'pizzeria', 'foodtruck', 'bar']) || matches(name, ['menu', 'café'])) return 'restaurant';
  if (
    matches(id, ['professional', 'corporate', 'lawfirm', 'medical', 'realestate', 'consulting', 'techstartup', 'fitness', 'beauty', 'photography', 'business-card'])
  )
    return 'professional';
  if (
    matches(id, [
      'tech-cyber', 'podcast-episode', 'product-launch-tech', 'download-app', 'artisan-guild', 'velvet-lounge',
      'cosmic', 'dragon', 'silk-sage', 'iron-spark', 'quick-checkin', 'my-work-portfolio',
    ])
  )
    return 'themed';
  if (matches(name, ['luxury', 'premium', 'gold', 'wine'])) return 'luxury';
  if (matches(name, ['neon', 'sunset', 'aurora', 'party', 'ocean wave'])) return 'vibrant';
  if (matches(name, ['minimal', 'elegant', 'white', 'slate'])) return 'minimal';
  return 'professional';
};

const GRADIENT_ANGLES: Record<string, string> = {
  'to-bottom': '180deg',
  'to-right': '90deg',
  'to-top-right': '45deg',
};

export const templateBackground = (template: QRTemplate) =>
  template.showGradient && template.gradientColor
    ? `linear-gradient(${GRADIENT_ANGLES[template.gradientDirection ?? ''] ?? '135deg'}, ${template.backgroundColor} 0%, ${template.gradientColor} 100%)`
    : template.backgroundColor;
