import React, { useRef } from 'react';
import { Upload, X, Camera, QrCode } from 'lucide-react';
import { 
  FaWhatsapp, 
  FaInstagram, 
  FaFacebookF, 
  FaYoutube, 
  FaLinkedinIn, 
  FaTwitter,
  FaTelegram,
  FaSpotify,
  FaPinterestP,
  FaDiscord,
  FaApple,
  FaAmazon,
  FaPaypal,
  FaGithub
} from 'react-icons/fa';
import { ActionIcon, Slider } from '@mantine/core';
import { QRStyling } from '../../types/qrcode';
import { cn } from '@/lib/utils';
import FieldGroup from '@/components/create/FieldGroup';
import { generateBrandSvgDataUrl } from './IconSvgs';

interface LogoTabProps {
  styling: QRStyling;
  onStyleChange: (styling: QRStyling) => void;
}

// Brand logos with their colors for preview icons
const BRAND_LOGOS = [
  { id: 'none', type: 'none', label: 'None' },
  { id: 'camera', type: 'icon', label: 'Camera' },
  { id: 'qr', type: 'icon', label: 'QR' },
  { id: 'whatsapp', type: 'brand', color: '#25D366', label: 'WhatsApp' },
  { id: 'instagram', type: 'brand', gradient: true, label: 'Instagram' },
  { id: 'facebook', type: 'brand', color: '#1877F2', label: 'Facebook' },
  { id: 'youtube', type: 'brand', color: '#FF0000', label: 'YouTube' },
  { id: 'linkedin', type: 'brand', color: '#0A66C2', label: 'LinkedIn' },
  { id: 'twitter', type: 'brand', color: '#000000', label: 'X (Twitter)' },
  { id: 'telegram', type: 'brand', color: '#229ED9', label: 'Telegram' },
  { id: 'spotify', type: 'brand', color: '#1DB954', label: 'Spotify' },
  { id: 'pinterest', type: 'brand', color: '#E60023', label: 'Pinterest' },
  { id: 'discord', type: 'brand', color: '#5865F2', label: 'Discord' },
  { id: 'apple', type: 'brand', color: '#000000', label: 'Apple' },
  { id: 'amazon', type: 'brand', color: '#FF9900', label: 'Amazon' },
  { id: 'paypal', type: 'brand', color: '#003087', label: 'PayPal' },
  { id: 'github', type: 'brand', color: '#181717', label: 'GitHub' },
  { id: 'scanme1', type: 'text', text: 'SCAN\nME', label: 'Scan Me' },
  { id: 'scanme2', type: 'text', text: 'SCAN\nME', bordered: true, label: 'Scan Me 2' },
];

// Map brand IDs to their icon components for preview
const getBrandIcon = (id: string) => {
  switch (id) {
    case 'whatsapp': return FaWhatsapp;
    case 'instagram': return FaInstagram;
    case 'facebook': return FaFacebookF;
    case 'youtube': return FaYoutube;
    case 'linkedin': return FaLinkedinIn;
    case 'twitter': return FaTwitter;
    case 'telegram': return FaTelegram;
    case 'spotify': return FaSpotify;
    case 'pinterest': return FaPinterestP;
    case 'discord': return FaDiscord;
    case 'apple': return FaApple;
    case 'amazon': return FaAmazon;
    case 'paypal': return FaPaypal;
    case 'github': return FaGithub;
    default: return null;
  }
};

const LogoTab: React.FC<LogoTabProps> = ({ styling, onStyleChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        onStyleChange({
          ...styling,
          image: result,
          imageOptions: {
            hideBackgroundDots: true,
            imageSize: 0.2,
            margin: 0,
          },
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePresetSelect = (preset: typeof BRAND_LOGOS[0]) => {
    if (preset.type === 'none') {
      onStyleChange({
        ...styling,
        image: undefined,
      });
    } else if (preset.type === 'brand') {
      // Use authentic brand SVGs from IconSvgs
      const svgDataUrl = generateBrandSvgDataUrl(preset.id);
      onStyleChange({
        ...styling,
        image: svgDataUrl,
        imageOptions: {
          hideBackgroundDots: true,
          imageSize: 0.2,
          margin: 0,
        },
      });
    } else {
      const svg = generatePresetSvg(preset);
      onStyleChange({
        ...styling,
        image: svg,
        imageOptions: {
          hideBackgroundDots: true,
          imageSize: 0.2,
          margin: 0,
        },
      });
    }
  };

  const generatePresetSvg = (preset: typeof BRAND_LOGOS[0]): string => {
    let svgContent = '';
    
    if (preset.type === 'icon' && preset.id === 'camera') {
      svgContent = `
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect width="24" height="24" fill="white"/>
          <rect x="2" y="6" width="20" height="14" rx="2"/>
          <circle cx="12" cy="13" r="4"/>
          <path d="M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2"/>
        </svg>
      `;
    } else if (preset.type === 'icon' && preset.id === 'qr') {
      svgContent = `
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect width="24" height="24" fill="white"/>
          <rect width="5" height="5" x="3" y="3" rx="1"/>
          <rect width="5" height="5" x="16" y="3" rx="1"/>
          <rect width="5" height="5" x="3" y="16" rx="1"/>
          <path d="M21 16h-3a2 2 0 0 0-2 2v3"/>
          <path d="M21 21v.01"/>
          <path d="M12 7v3a2 2 0 0 1-2 2H7"/>
          <path d="M3 12h.01"/>
          <path d="M12 3h.01"/>
          <path d="M12 16v.01"/>
          <path d="M16 12h1"/>
          <path d="M21 12v.01"/>
          <path d="M12 21v-1"/>
        </svg>
      `;
    } else if (preset.type === 'text') {
      const bordered = preset.bordered;
      svgContent = `
        <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
          <rect width="100" height="100" fill="white"/>
          ${bordered ? `
            <rect x="5" y="5" width="90" height="90" fill="none" stroke="black" stroke-width="3"/>
            <rect x="2" y="2" width="10" height="10" fill="black"/>
            <rect x="88" y="2" width="10" height="10" fill="black"/>
            <rect x="2" y="88" width="10" height="10" fill="black"/>
            <rect x="88" y="88" width="10" height="10" fill="black"/>
          ` : ''}
          <text x="50" y="40" text-anchor="middle" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="black">SCAN</text>
          <text x="50" y="70" text-anchor="middle" font-family="Arial, sans-serif" font-size="22" font-weight="bold" fill="black">ME</text>
        </svg>
      `;
    }
    
    return `data:image/svg+xml,${encodeURIComponent(svgContent.trim())}`;
  };

  const isPresetSelected = (preset: typeof BRAND_LOGOS[0]) => {
    if (preset.type === 'none') {
      return !styling.image;
    }
    return false;
  };

  const getIconColor = (preset: typeof BRAND_LOGOS[0]) => {
    if (preset.id === 'instagram') return '#E4405F';
    return preset.color || '#000';
  };

  const logoSize = Math.round((styling.imageOptions?.imageSize || 0.2) * 100);

  return (
    <div className="space-y-8">
      <FieldGroup label="Logo">
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
          <button
            type="button"
            onClick={handleUploadClick}
            className="create-tile flex aspect-square flex-col items-center justify-center gap-1 rounded-2xl border-dashed"
          >
            <Upload className="h-5 w-5 text-primary" />
            <span className="text-[11px] font-medium text-primary">Upload</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          {BRAND_LOGOS.map((preset) => {
            const BrandIcon = preset.type === 'brand' ? getBrandIcon(preset.id) : null;

            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => handlePresetSelect(preset)}
                data-selected={isPresetSelected(preset)}
                className="create-tile flex aspect-square items-center justify-center rounded-2xl"
                title={preset.label}
                aria-label={preset.label}
              >
                {preset.type === 'none' && (
                  <X className="h-6 w-6 text-muted-foreground" />
                )}
                {preset.type === 'icon' && preset.id === 'camera' && (
                  <Camera className="h-6 w-6 text-foreground" />
                )}
                {preset.type === 'icon' && preset.id === 'qr' && (
                  <QrCode className="h-6 w-6 text-foreground" />
                )}
                {preset.type === 'brand' && BrandIcon && (
                  <BrandIcon 
                    className="h-6 w-6" 
                    style={{ color: getIconColor(preset) }}
                  />
                )}
                {preset.type === 'text' && (
                  <div className={cn(
                    "text-[8px] font-bold leading-tight text-center text-foreground",
                    preset.bordered && "border border-foreground p-1"
                  )}>
                    SCAN<br/>ME
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </FieldGroup>

      {styling.image && (
        <div className="flex items-center gap-3 rounded-2xl bg-foreground/[0.04] p-3">
          <img src={styling.image} alt="Logo preview" className="h-12 w-12 rounded-xl border border-border bg-white object-contain" />
          <div className="flex-1">
            <p className="text-sm font-semibold text-foreground">Logo added</p>
            <p className="text-xs text-muted-foreground">Adjust its size below</p>
          </div>
          <ActionIcon onClick={() => onStyleChange({ ...styling, image: undefined })} aria-label="Remove logo">
            <X className="h-4 w-4" />
          </ActionIcon>
        </div>
      )}

      <FieldGroup
        label="Logo size"
        value={`${logoSize}%`}
        description="Keep the logo at 25% or less so the code stays easy to scan. Error correction is set to the highest level when a logo is added."
      >
        <Slider
          min={10}
          max={25}
          step={1}
          value={logoSize}
          label={(value) => `${value}%`}
          onChange={(value) =>
            onStyleChange({
              ...styling,
              imageOptions: {
                hideBackgroundDots: true,
                imageSize: value / 100,
                margin: 0,
              },
            })
          }
        />
      </FieldGroup>
    </div>
  );
};

export default LogoTab;
