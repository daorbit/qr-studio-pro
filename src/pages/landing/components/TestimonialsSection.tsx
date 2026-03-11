import AnimatedSection from "./AnimatedSection";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Marketing Manager",
    text: "QR Studio transformed our print campaigns. The analytics dashboard alone saved us hours of manual tracking. Highly recommend for any marketing team.",
    rating: 5,
  },
  {
    name: "James Rodriguez",
    role: "Restaurant Owner",
    text: "We replaced all our paper menus with QR codes from QR Studio. Setup took 5 minutes and our customers love the digital menu experience.",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "Event Coordinator",
    text: "The white-label feature is a game changer. I create branded QR codes for every client event without them seeing any third-party branding.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-12 md:py-16 lg:py-20" aria-label="Customer Testimonials">
      <div className="container mx-auto px-4 lg:px-8">
        <AnimatedSection>
          <div className="text-center mb-8 md:mb-10">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight mb-2">
              Loved by Businesses Worldwide
            </h2>
            <p className="text-xs md:text-sm text-muted-foreground max-w-md mx-auto">
              See why thousands of professionals trust QR Studio for their QR code needs.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={100}>
          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="p-5 rounded-xl border border-border/60 bg-card hover:border-primary/30 transition-colors"
              >
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} className="h-3.5 w-3.5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                  "{t.text}"
                </p>
                <div>
                  <div className="text-sm font-medium text-foreground">{t.name}</div>
                  <div className="text-[10px] text-muted-foreground">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default TestimonialsSection;
