import { Hero } from "@/components/sections/Hero";
import { ClientLogoStrip } from "@/components/sections/ClientLogoStrip";
import { CredibilityBar } from "@/components/sections/CredibilityBar";
import { ServicesRows } from "@/components/sections/ServicesRows";
import { WhyXentys } from "@/components/sections/WhyXentys";
import { HowWeWork } from "@/components/sections/HowWeWork";
import { ConsultantPreview } from "@/components/sections/ConsultantPreview";
import { Testimonials } from "@/components/sections/Testimonials";
import { JobAlertStrip } from "@/components/sections/JobAlertStrip";
import { CTABanner } from "@/components/sections/CTABanner";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ClientLogoStrip />
      <CredibilityBar />
      <ServicesRows />
      <WhyXentys />
      <HowWeWork />
      <ConsultantPreview />
      <Testimonials />
      <JobAlertStrip />
      <CTABanner />
    </>
  );
}
