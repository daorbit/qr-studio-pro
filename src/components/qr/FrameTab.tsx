import React from 'react';
import { QRStyling } from '../../types/qrcode';
import CornerControl from './style/CornerControl';
import { CORNER_DOT_TYPES, CORNER_SQUARE_TYPES } from './style/styleOptions';

interface FrameTabProps {
  styling: QRStyling;
  onStyleChange: (styling: QRStyling) => void;
}

const FrameTab: React.FC<FrameTabProps> = ({ styling, onStyleChange }) => (
  <div className="space-y-8">
    <CornerControl
      label="Corner squares"
      types={CORNER_SQUARE_TYPES}
      options={styling.cornersSquareOptions ?? { color: styling.fgColor, type: 'square' }}
      onChange={(cornersSquareOptions) => onStyleChange({ ...styling, cornersSquareOptions })}
    />
    <CornerControl
      label="Corner dots"
      types={CORNER_DOT_TYPES}
      options={styling.cornersDotOptions ?? { color: styling.fgColor, type: 'square' }}
      onChange={(cornersDotOptions) => onStyleChange({ ...styling, cornersDotOptions })}
    />
  </div>
);

export default FrameTab;
