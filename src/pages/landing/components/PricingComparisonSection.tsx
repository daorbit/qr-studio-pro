import { Check, X, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import AnimatedSection from "./AnimatedSection";

const features = [
  { name: "Static QR Code Generator", free: true, starter: true, pro: true },
  { name: "URL, Text & Email QR Codes", free: true, starter: true, pro: true },
  { name: "Custom Colors & Patterns", free: true, starter: true, pro: true },
  { name: "Logo & Image Embedding", free: true, starter: true, pro: true },
  { name: "High-Res Download (PNG, WEBP, JPG)", free: true, starter: true, pro: true },
  { name: "Dynamic QR Codes", free: false, starter: true, pro: true },
  { name: "vCard & WiFi QR Codes", free: false, starter: true, pro: true },
  { name: "Real-Time Scan Analytics", free: false, starter: true, pro: true },
  { name: "Geographic Heatmaps", free: false, starter: false, pro: true },
  { name: "Device & Browser Breakdown", free: false, starter: false, pro: true },
  { name: "White Label & Custom Branding", free: false, starter: false, pro: true },
  { name: "Password Protected QR Codes", free: false, starter: false, pro: true },
  { name: "Custom Domain Redirects", free: false, starter: false, pro: true },
  { name: "Bulk QR Code Generation", free: false, starter: false, pro: true },
  { name: "Priority Support", free: false, starter: false, pro: true },
];

const Cell = ({ value }: { value: boolean }) =>
  value ? (
    <Check className="h-4 w-4 text-primary mx-auto" />
  ) : (
    <X className="h-4 w-4 text-muted-foreground/40 mx-auto" />
  );

const PricingComparisonSection = () => {
  return (
    <section
      id="pricing-comparison"
      className="py-12 md:py-16 lg:py-20 bg-muted/20 border-y border-border/50"
      aria-label="QR Code Pricing Plans Comparison"
    >
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        <AnimatedSection>
          <div className="text-center mb-8 md:mb-10">
            <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary rounded-full px-3 py-1 text-[10px] font-medium mb-3">
              <Sparkles className="h-3 w-3" />
              Transparent Pricing
            </div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight mb-2">
              Compare QR Code Plans & Features
            </h2>
            <p className="text-xs md:text-sm text-muted-foreground max-w-lg mx-auto">
              Choose the perfect QR code plan for your business. From free static QR codes to enterprise-grade analytics and white labeling.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <div className="border border-border/60 rounded-xl bg-background/80 overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-4 text-center border-b border-border/50 bg-muted/30">
              <div className="px-3 py-3 text-left text-xs font-semibold text-foreground">
                Feature
              </div>
              <div className="px-2 py-3 text-xs font-semibold text-foreground">
                Free
              </div>
              <div className="px-2 py-3 text-xs font-semibold text-foreground">
                Starter
              </div>
              <div className="px-2 py-3 text-xs font-semibold text-primary relative">
                Pro
                <span className="absolute -top-0.5 right-1/2 translate-x-1/2 bg-primary text-primary-foreground text-[8px] px-1.5 py-0.5 rounded-b-md font-medium">
                  Popular
                </span>
              </div>
            </div>

            {/* Rows */}
            {features.map((feature, i) => (
              <div
                key={i}
                className={`grid grid-cols-4 items-center text-center border-b border-border/30 last:border-b-0 transition-colors hover:bg-muted/20 ${
                  i % 2 === 0 ? "bg-background/50" : ""
                }`}
              >
                <div className="px-3 py-2.5 text-left text-[11px] text-foreground">
                  {feature.name}
                </div>
                <div className="px-2 py-2.5">
                  <Cell value={feature.free} />
                </div>
                <div className="px-2 py-2.5">
                  <Cell value={feature.starter} />
                </div>
                <div className="px-2 py-2.5">
                  <Cell value={feature.pro} />
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection delay={200}>
          <div className="text-center mt-6">
            <Link
              to="/pricing"
              className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground text-xs font-medium px-5 py-2.5 rounded-lg hover:opacity-90 transition-opacity"
            >
              View Full Pricing Details
            </Link>
            <p className="text-[10px] text-muted-foreground mt-2">
              No credit card required · Start free · Upgrade anytime
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default PricingComparisonSection;
