import { Hero } from "@/components/sections/Hero";
import { ClientLogoStrip } from "@/components/sections/ClientLogoStrip";
import { CredibilityBar } from "@/components/sections/CredibilityBar";
import { ServicesRows } from "@/components/sections/ServicesRows";
import { WhyXentys } from "@/components/sections/WhyXentys";
import { SectorsFeature } from "@/components/sections/SectorsFeature";
import { HowWeWork } from "@/components/sections/HowWeWork";
import { ConsultantPreview } from "@/components/sections/ConsultantPreview";
import { Testimonials } from "@/components/sections/Testimonials";
import { JobAlertStrip } from "@/components/sections/JobAlertStrip";
import { HomeCTACard } from "@/components/sections/HomeCTACard";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ClientLogoStrip />
      <CredibilityBar />
      <ServicesRows />
      <WhyXentys />
      <SectorsFeature />
      <HowWeWork />
      <ConsultantPreview />
      <Testimonials />
      <HomeCTACard />
      <JobAlertStrip />
    </>
  );
}
