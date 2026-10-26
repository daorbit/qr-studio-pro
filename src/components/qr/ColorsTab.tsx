import React from 'react';
import { QRStyling } from '../../types/qrcode';
import GradientColorControl from './style/GradientColorControl';

interface ColorsTabProps {
  styling: QRStyling;
  onStyleChange: (styling: QRStyling) => void;
}

const ColorsTab: React.FC<ColorsTabProps> = ({ styling, onStyleChange }) => (
  <div className="space-y-8">
    <GradientColorControl
      label="Code"
      color={styling.fgColor}
      gradient={styling.dotsGradient}
      onChange={(fgColor, dotsGradient) => onStyleChange({ ...styling, fgColor, dotsGradient })}
    />
    <GradientColorControl
      label="Background"
      color={styling.bgColor}
      gradient={styling.backgroundGradient}
      onChange={(bgColor, backgroundGradient) => onStyleChange({ ...styling, bgColor, backgroundGradient })}
    />
  </div>
);

export default ColorsTab;
