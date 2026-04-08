import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <div data-testid="home-page">
      <HeroSection />
      <ServicesSection />
      <PricingSection />
      <ContactSection />
    </div>
  );
}
