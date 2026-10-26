import type { QRStyling } from '@/types/qrcode';

type DotsType = QRStyling['dotsType'];
type CornerSquareType = NonNullable<QRStyling['cornersSquareOptions']>['type'];
type CornerDotType = NonNullable<QRStyling['cornersDotOptions']>['type'];
export type Gradient = NonNullable<QRStyling['dotsGradient']>;

export const DOT_TYPES: { value: DotsType; label: string }[] = [
  { value: 'square', label: 'Square' },
  { value: 'dots', label: 'Dots' },
  { value: 'rounded', label: 'Rounded' },
  { value: 'extra-rounded', label: 'Soft' },
  { value: 'classy', label: 'Classy' },
  { value: 'classy-rounded', label: 'Classy soft' },
];

export const CORNER_SQUARE_TYPES: { value: CornerSquareType; label: string }[] = [
  { value: 'square', label: 'Square' },
  { value: 'dot', label: 'Circle' },
  { value: 'rounded', label: 'Rounded' },
  { value: 'extra-rounded', label: 'Soft' },
  { value: 'classy', label: 'Classy' },
  { value: 'classy-rounded', label: 'Classy soft' },
];

export const CORNER_DOT_TYPES: { value: CornerDotType; label: string }[] = [
  { value: 'square', label: 'Square' },
  { value: 'dot', label: 'Circle' },
  { value: 'rounded', label: 'Rounded' },
  { value: 'classy', label: 'Classy' },
  { value: 'classy-rounded', label: 'Classy soft' },
];

export const ERROR_LEVELS: { value: QRStyling['level']; label: string }[] = [
  { value: 'L', label: '7%' },
  { value: 'M', label: '15%' },
  { value: 'Q', label: '25%' },
  { value: 'H', label: '30%' },
];
