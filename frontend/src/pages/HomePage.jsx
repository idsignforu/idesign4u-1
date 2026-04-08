import { HeroSection }       from "@/components/sections/HeroSection";
import { ServicesSection }   from "@/components/sections/ServicesSection";
import WhyWebsiteSection     from "@/components/sections/WhyWebsiteSection";
import { PricingSection }    from "@/components/sections/PricingSection";
import { ContactSection }    from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <div data-testid="home-page">
      <HeroSection />
      <ServicesSection />
      <WhyWebsiteSection />
      <PricingSection />
      <ContactSection />
    </div>
  );
}
