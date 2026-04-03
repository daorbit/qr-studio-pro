import React, { useState, useCallback, useMemo } from 'react';
import { CheckCircleFilled } from '@ant-design/icons';
import { QrCode, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { QRTemplate, defaultTemplates } from '../../types/qrcode';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TemplateSelectorProps {
  selectedTemplate: QRTemplate | null;
  onSelect: (template: QRTemplate | null) => void;
}

const categories = [
  { value: 'all', label: 'All' },
  { value: 'professional', label: 'Professional' },
  { value: 'social', label: 'Social' },
  { value: 'restaurant', label: 'Restaurant' },
  { value: 'vibrant', label: 'Vibrant' },
  { value: 'minimal', label: 'Minimal' },
  { value: 'luxury', label: 'Luxury' },
  { value: 'themed', label: 'Themed' },
];

const getCategoryForTemplate = (template: QRTemplate): string => {
  const name = template.name.toLowerCase();
  const id = template.id.toLowerCase();
  
  if (id.includes('instagram') || id.includes('facebook') || id.includes('youtube') || 
      id.includes('linkedin') || id.includes('whatsapp') ||
      id.includes('twitter') || id.includes('pinterest') || id.includes('social-follow')) return 'social';
  
  if (id.includes('restaurant') || id.includes('bistro') || id.includes('cafe') || 
      id.includes('sushi') || id.includes('pizzeria') || id.includes('foodtruck') ||
      id.includes('bar') || name.includes('menu') || name.includes('café')) return 'restaurant';
  
  if (id.includes('professional') || id.includes('corporate') || id.includes('lawfirm') ||
      id.includes('medical') || id.includes('realestate') || id.includes('consulting') ||
      id.includes('techstartup') || id.includes('fitness') || id.includes('beauty') ||
      id.includes('photography') || id.includes('business-card')) return 'professional';
  
  if (id.includes('tech-cyber') || id.includes('podcast-episode') || id.includes('product-launch-tech') || 
      id.includes('download-app') || id.includes('artisan-guild') || id.includes('velvet-lounge') ||
      id.includes('cosmic') || id.includes('dragon') || id.includes('silk-sage') || 
      id.includes('iron-spark') || id.includes('quick-checkin') || id.includes('my-work-portfolio')) return 'themed';
  
  if (name.includes('luxury') || name.includes('premium') || name.includes('gold') || name.includes('wine')) return 'luxury';
  if (name.includes('neon') || name.includes('sunset') || name.includes('aurora') || name.includes('party') || name.includes('ocean wave')) return 'vibrant';
  if (name.includes('minimal') || name.includes('elegant') || name.includes('white') || name.includes('slate')) return 'minimal';
  
  return 'professional';
};

const TemplateSelector: React.FC<TemplateSelectorProps> = React.memo(({
  selectedTemplate,
  onSelect,
}) => {
  const [category, setCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 11;

  const filteredTemplates = useMemo(() => 
    defaultTemplates.filter((template) => {
      const matchesCategory = category === 'all' || getCategoryForTemplate(template) === category;
      return matchesCategory;
    }),
    [category]
  );

  const totalTemplates = filteredTemplates.length;
  const totalPages = Math.ceil(totalTemplates / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentTemplates = useMemo(() => 
    filteredTemplates.slice(startIndex, endIndex),
    [filteredTemplates, startIndex, endIndex]
  );

  const handleCategoryChange = useCallback((value: string) => {
    setCategory(value);
    setCurrentPage(1);
  }, []);

  const handleSelectTemplate = useCallback((template: QRTemplate | null) => {
    onSelect(template);
  }, [onSelect]);

  const showNoTemplate = category === 'all' && currentPage === 1;

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-foreground tracking-tight">Choose Your Card Template</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Select a template to customize your QR code card, or choose "No Template" for a plain QR code
        </p>
      </div>

      {/* Category Pills */}
      <div className="mb-5 -mx-4 px-4 overflow-x-auto scrollbar-hide">
        <div className="flex gap-1.5 w-max pb-1">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => handleCategoryChange(cat.value)}
              className={cn(
                "px-3.5 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap",
                "border border-border/60 hover:border-primary/50",
                category === cat.value
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-card text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {/* No Template Option */}
        {showNoTemplate && (
          <div
            className={cn(
              "group rounded-xl cursor-pointer transition-all duration-200 overflow-hidden",
              "hover:shadow-lg hover:scale-[1.03] hover:-translate-y-1",
              selectedTemplate === null
                ? "ring-2 ring-primary shadow-md"
                : "ring-1 ring-border/50 hover:ring-primary/40 hover:shadow-primary/10"
            )}
            onClick={() => handleSelectTemplate(null)}
          >
            <div className="h-32 sm:h-36 flex flex-col items-center justify-center relative p-4 bg-muted/50">
              {selectedTemplate === null && (
                <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                  <CheckCircleFilled className="text-[11px] text-primary-foreground" />
                </div>
              )}
              <div className="w-14 h-14 bg-background rounded-lg flex items-center justify-center shadow-sm border border-border/40 group-hover:shadow-md transition-shadow">
                <QrCode size={28} className="text-muted-foreground" />
              </div>
              <p className="text-[11px] text-muted-foreground text-center mt-2.5 font-medium">
                Plain QR Code
              </p>
            </div>
            <div className="px-3 py-2.5 bg-card text-center border-t border-border/40">
              <span className="text-xs font-semibold text-foreground">No Template</span>
            </div>
          </div>
        )}

        {currentTemplates.map((template) => (
          <div
            key={template.id}
            className={cn(
              "group rounded-xl cursor-pointer transition-all duration-200 overflow-hidden",
              "hover:shadow-lg hover:scale-[1.03] hover:-translate-y-1",
              selectedTemplate?.id === template.id
                ? "ring-2 ring-primary shadow-md"
                : "ring-1 ring-border/50 hover:ring-primary/40 hover:shadow-primary/10"
            )}
            onClick={() => handleSelectTemplate(template)}
          >
            <div
              className="h-32 sm:h-36 flex flex-col items-center justify-center relative p-3"
              style={{
                background: template.showGradient && template.gradientColor
                  ? `linear-gradient(${template.gradientDirection === 'to-bottom' ? '180deg' : template.gradientDirection === 'to-right' ? '90deg' : template.gradientDirection === 'to-top-right' ? '45deg' : '135deg'}, ${template.backgroundColor} 0%, ${template.gradientColor} 100%)`
                  : template.backgroundColor,
                color: template.textColor,
                borderRadius: `${(template.borderRadius || 16) * 0.5}px ${(template.borderRadius || 16) * 0.5}px 0 0`,
              }}
            >
              {selectedTemplate?.id === template.id && (
                <div
                  className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full flex items-center justify-center z-10"
                  style={{ backgroundColor: template.textColor }}
                >
                  <CheckCircleFilled
                    className="text-[11px]"
                    style={{ color: template.backgroundColor }}
                  />
                </div>
              )}
              <h4
                className="font-bold text-center leading-tight"
                style={{
                  fontSize: `${Math.min((template.titleFontSize || 24) * 0.5, 13)}px`,
                  fontFamily: template.fontFamily || 'Inter',
                }}
              >
                {template.title}
              </h4>
              <p
                className="text-[10px] opacity-70 text-center mt-1 line-clamp-2"
                style={{ fontFamily: template.fontFamily || 'Inter' }}
              >
                {template.subtitle}
              </p>
              <div className="mt-2 w-7 h-7 bg-white/90 rounded flex items-center justify-center shadow-sm">
                <div className="w-5 h-5 bg-gray-800 rounded-sm" />
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors duration-200 pointer-events-none" />
            </div>
            <div className="px-3 py-2.5 bg-card text-center border-t border-border/40">
              <span className="text-xs font-semibold truncate block text-foreground">{template.name}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-1.5 rounded-lg border border-border/50 bg-card text-muted-foreground hover:text-foreground hover:bg-accent disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={cn(
                  "w-8 h-8 rounded-lg text-xs font-medium transition-colors",
                  page === currentPage
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-muted-foreground hover:bg-accent hover:text-foreground border border-border/50"
                )}
              >
                {page}
              </button>
            ))}
          </div>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-1.5 rounded-lg border border-border/50 bg-card text-muted-foreground hover:text-foreground hover:bg-accent disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight size={16} />
          </button>
          <span className="text-[11px] text-muted-foreground ml-2 hidden sm:inline">
            {startIndex + 1}–{Math.min(endIndex, totalTemplates)} of {totalTemplates}
          </span>
        </div>
      )}

      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <p className="text-sm text-muted-foreground">No templates found</p>
        </div>
      )}
    </div>
  );
});

TemplateSelector.displayName = 'TemplateSelector';

export default TemplateSelector;