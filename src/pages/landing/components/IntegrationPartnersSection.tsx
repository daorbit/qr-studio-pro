import { Globe, Smartphone, ShoppingBag, BarChart3, Palette, Shield, FileText, Wifi, Mail, QrCode } from "lucide-react";
import AnimatedSection from "./AnimatedSection";

const integrations = [
  {
    icon: Globe,
    title: "Website & Landing Pages",
    description: "Embed QR codes on your website, blog, or landing page to drive offline-to-online traffic.",
    keywords: "HTML embed, WordPress, Shopify, Wix",
  },
  {
    icon: ShoppingBag,
    title: "Product Packaging",
    description: "Add QR codes to product labels, boxes, and packaging for instant customer engagement.",
    keywords: "CPG, retail, packaging design",
  },
  {
    icon: FileText,
    title: "Print Marketing",
    description: "Business cards, flyers, brochures, posters — make every printed asset interactive with QR codes.",
    keywords: "Business cards, flyers, brochures",
  },
  {
    icon: Mail,
    title: "Email Campaigns",
    description: "Boost email click-through rates with embedded QR codes linking to offers, events, or downloads.",
    keywords: "Mailchimp, SendGrid, newsletters",
  },
  {
    icon: BarChart3,
    title: "Marketing Analytics",
    description: "Track scans across campaigns with UTM parameters, geographic data, and device breakdown.",
    keywords: "Google Analytics, UTM tracking",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps & Social",
    description: "Share QR codes on Instagram, TikTok, LinkedIn, and WhatsApp for viral reach.",
    keywords: "Social media, mobile sharing",
  },
  {
    icon: Wifi,
    title: "WiFi & Venue Access",
    description: "Let guests connect to WiFi instantly — perfect for restaurants, hotels, coworking spaces, and events.",
    keywords: "Hospitality, events, coworking",
  },
  {
    icon: Palette,
    title: "Brand & Design Tools",
    description: "Export high-res QR codes for Figma, Canva, Adobe Illustrator, and any design workflow.",
    keywords: "Figma, Canva, Adobe, SVG export",
  },
  {
    icon: Shield,
    title: "Secure & Compliant",
    description: "Password-protected QR codes, HTTPS redirects, and GDPR-ready scan analytics for enterprise use.",
    keywords: "GDPR, enterprise security, HTTPS",
  },
  {
    icon: QrCode,
    title: "vCard & Contact Sharing",
    description: "Share digital business cards via QR code — name, phone, email, company, and social links in one scan.",
    keywords: "Digital business card, NFC alternative",
  },
];

const stats = [
  { value: "50+", label: "Design Templates" },
  { value: "10+", label: "QR Code Types" },
  { value: "2048px", label: "Max Resolution" },
  { value: "99.9%", label: "Scan Reliability" },
];

const IntegrationPartnersSection = () => {
  return (
    <section
      id="integrations"
      className="py-12 md:py-16 lg:py-20"
      aria-label="QR Code Use Cases and Integrations"
    >
      <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
        <AnimatedSection>
          <div className="text-center mb-8 md:mb-10">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight mb-2">
              Works Everywhere You Do
            </h2>
            <p className="text-xs md:text-sm text-muted-foreground max-w-lg mx-auto">
              QR Studio integrates seamlessly with your marketing stack, design tools, and business workflows. Generate QR codes that work across every platform and medium.
            </p>
          </div>
        </AnimatedSection>

        {/* Stats bar */}
        <AnimatedSection delay={50}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8 md:mb-10">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="text-center py-3 px-2 rounded-lg border border-border/50 bg-muted/20"
              >
                <div className="text-lg md:text-xl font-bold text-primary">{stat.value}</div>
                <div className="text-[10px] text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* Integration grid */}
        <AnimatedSection delay={100}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {integrations.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="group border border-border/50 rounded-lg p-4 bg-background/50 hover:border-primary/30 hover:bg-muted/20 transition-all duration-200"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-md bg-primary/10 text-primary shrink-0 group-hover:bg-primary/15 transition-colors">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-xs font-semibold text-foreground mb-1">
                        {item.title}
                      </h3>
                      <p className="text-[11px] text-muted-foreground leading-relaxed mb-1.5">
                        {item.description}
                      </p>
                      <span className="text-[9px] text-muted-foreground/60 italic">
                        {item.keywords}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default IntegrationPartnersSection;
