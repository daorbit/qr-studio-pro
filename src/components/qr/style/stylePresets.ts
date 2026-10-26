import { defaultStyling, type QRStyling } from '@/types/qrcode';

export type StylePresetCategory = 'classic' | 'color' | 'gradient' | 'tinted';

export interface StylePreset {
  id: string;
  name: string;
  category: StylePresetCategory;
  styling: QRStyling;
}

export const STYLE_PRESET_CATEGORIES = [
  { value: 'all', label: 'All' },
  { value: 'classic', label: 'Classic' },
  { value: 'color', label: 'Color' },
  { value: 'gradient', label: 'Gradient' },
  { value: 'tinted', label: 'Tinted' },
];

type Dots = QRStyling['dotsType'];
type Square = NonNullable<QRStyling['cornersSquareOptions']>['type'];
type Dot = NonNullable<QRStyling['cornersDotOptions']>['type'];

const preset = (
  id: string,
  name: string,
  category: StylePresetCategory,
  opts: { fg: string; bg?: string; dots: Dots; square: Square; dot: Dot; corner?: string; gradient?: [string, string] }
): StylePreset => {
  const corner = opts.corner ?? opts.fg;
  return {
    id,
    name,
    category,
    styling: {
      ...defaultStyling,
      fgColor: opts.fg,
      bgColor: opts.bg ?? '#ffffff',
      dotsType: opts.dots,
      dotsGradient: opts.gradient
        ? {
            type: 'linear',
            rotation: 45,
            colorStops: [
              { offset: 0, color: opts.gradient[0] },
              { offset: 1, color: opts.gradient[1] },
            ],
          }
        : undefined,
      cornersSquareOptions: { color: corner, type: opts.square },
      cornersDotOptions: { color: corner, type: opts.dot },
    },
  };
};

export const STYLE_PRESETS: StylePreset[] = [
  preset('classic', 'Classic', 'classic', { fg: '#000000', dots: 'square', square: 'square', dot: 'square' }),
  preset('soft', 'Soft', 'classic', { fg: '#111827', dots: 'rounded', square: 'extra-rounded', dot: 'dot' }),
  preset('dotted', 'Dotted', 'classic', { fg: '#111827', dots: 'dots', square: 'extra-rounded', dot: 'dot' }),
  preset('editorial', 'Editorial', 'classic', { fg: '#0f172a', dots: 'classy-rounded', square: 'extra-rounded', dot: 'square' }),

  preset('ink', 'Ink', 'color', { fg: '#1d4ed8', corner: '#1e3a8a', dots: 'rounded', square: 'extra-rounded', dot: 'dot' }),
  preset('evergreen', 'Evergreen', 'color', { fg: '#047857', corner: '#064e3b', dots: 'classy-rounded', square: 'extra-rounded', dot: 'dot' }),
  preset('plum', 'Plum', 'color', { fg: '#6d28d9', corner: '#4c1d95', dots: 'dots', square: 'extra-rounded', dot: 'dot' }),
  preset('ember', 'Ember', 'color', { fg: '#c2410c', corner: '#7c2d12', dots: 'rounded', square: 'extra-rounded', dot: 'square' }),

  preset('sunset', 'Sunset', 'gradient', { fg: '#ea580c', corner: '#9a3412', gradient: ['#f97316', '#db2777'], dots: 'rounded', square: 'extra-rounded', dot: 'dot' }),
  preset('ocean', 'Ocean', 'gradient', { fg: '#1d4ed8', corner: '#1e3a8a', gradient: ['#2563eb', '#0891b2'], dots: 'dots', square: 'extra-rounded', dot: 'dot' }),
  preset('aurora', 'Aurora', 'gradient', { fg: '#7c3aed', corner: '#4c1d95', gradient: ['#7c3aed', '#2563eb'], dots: 'classy-rounded', square: 'extra-rounded', dot: 'dot' }),
  preset('forest', 'Forest', 'gradient', { fg: '#15803d', corner: '#14532d', gradient: ['#16a34a', '#0d9488'], dots: 'rounded', square: 'extra-rounded', dot: 'square' }),

  preset('paper', 'Paper', 'tinted', { fg: '#292524', bg: '#faf7f2', dots: 'rounded', square: 'extra-rounded', dot: 'dot' }),
  preset('mint', 'Mint', 'tinted', { fg: '#065f46', bg: '#ecfdf5', dots: 'dots', square: 'extra-rounded', dot: 'dot' }),
  preset('sky', 'Sky', 'tinted', { fg: '#1e3a8a', bg: '#eff6ff', dots: 'classy-rounded', square: 'extra-rounded', dot: 'dot' }),
  preset('blush', 'Blush', 'tinted', { fg: '#9f1239', bg: '#fff1f2', dots: 'rounded', square: 'extra-rounded', dot: 'dot' }),
];

const LOOK_KEYS: (keyof QRStyling)[] = ['fgColor', 'bgColor', 'dotsType', 'dotsGradient', 'cornersSquareOptions', 'cornersDotOptions'];

export const matchesPreset = (styling: QRStyling, presetStyling: QRStyling) =>
  LOOK_KEYS.every((key) => JSON.stringify(styling[key] ?? null) === JSON.stringify(presetStyling[key] ?? null));

export const applyPreset = (current: QRStyling, presetStyling: QRStyling): QRStyling => ({
  ...presetStyling,
  size: current.size,
  level: current.level,
  includeMargin: current.includeMargin,
  shape: current.shape,
  image: current.image,
  imageOptions: current.imageOptions ?? presetStyling.imageOptions,
});
