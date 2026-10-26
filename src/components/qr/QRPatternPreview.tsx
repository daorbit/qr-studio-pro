import React from 'react';
import type { QRStyling } from '@/types/qrcode';

const PATTERN = [
  [1, 1, 1, 0, 1, 0, 1, 1, 1],
  [1, 0, 1, 1, 0, 1, 1, 0, 1],
  [1, 1, 1, 0, 1, 0, 1, 1, 1],
  [0, 1, 0, 1, 1, 1, 0, 1, 0],
  [1, 0, 1, 1, 0, 1, 1, 0, 1],
  [0, 1, 0, 1, 1, 1, 0, 1, 0],
  [1, 1, 1, 0, 1, 0, 1, 1, 1],
  [1, 0, 1, 1, 0, 1, 1, 0, 1],
  [1, 1, 1, 0, 1, 0, 1, 1, 1],
];

const RADIUS: Record<string, number> = {
  dots: 0.5,
  dot: 0.5,
  rounded: 0.22,
  'extra-rounded': 0.38,
  classy: 0.16,
  'classy-rounded': 0.3,
};

const isCorner = (row: number, col: number) => (row < 3 && col < 3) || (row < 3 && col > 5) || (row > 5 && col < 3);

interface QRPatternPreviewProps {
  styling: Partial<QRStyling>;
  id?: string;
  size?: number;
}

const QRPatternPreview: React.FC<QRPatternPreviewProps> = ({ styling, id = 'template', size = 56 }) => {
  const fgColor = styling.fgColor || '#000000';
  const bgColor = styling.bgColor || '#ffffff';
  const dotsType = styling.dotsType || 'square';
  const cornerColor = styling.cornersSquareOptions?.color || fgColor;
  const gradientStops = styling.dotsGradient?.colorStops;
  const gradientId = `qrprev-grad-${id}`;
  const dotR = RADIUS[dotsType] ?? 0.06;
  const cornerR = RADIUS[styling.cornersSquareOptions?.type || 'square'] ?? 0.06;
  const dotFill = gradientStops?.length ? `url(#${gradientId})` : fgColor;

  return (
    <svg viewBox="0 0 9 9" width={size} height={size} className="block rounded-lg shadow-soft" aria-hidden="true">
      {gradientStops?.length ? (
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            {gradientStops.map((stop, i) => (
              <stop key={i} offset={`${stop.offset * 100}%`} stopColor={stop.color} />
            ))}
          </linearGradient>
        </defs>
      ) : null}
      <rect x={0} y={0} width={9} height={9} fill={bgColor} />
      {PATTERN.map((rowArr, r) =>
        rowArr.map((cell, c) => {
          if (!cell) return null;
          const corner = isCorner(r, c);
          if (!corner && dotsType === 'dots') {
            return <circle key={`${r}-${c}`} cx={c + 0.5} cy={r + 0.5} r={0.42} fill={dotFill} />;
          }
          const radius = corner ? cornerR : dotR;
          return (
            <rect
              key={`${r}-${c}`}
              x={c + 0.08}
              y={r + 0.08}
              width={0.84}
              height={0.84}
              rx={radius}
              ry={radius}
              fill={corner ? cornerColor : dotFill}
            />
          );
        })
      )}
    </svg>
  );
};

export default QRPatternPreview;
