import { Hero } from "@/components/sections/Hero";
import { CredibilityBar } from "@/components/sections/CredibilityBar";
import { PlacementTypes } from "@/components/sections/PlacementTypes";
import { WhyXentys } from "@/components/sections/WhyXentys";
import { HowWeWork } from "@/components/sections/HowWeWork";
import { MeetTeam } from "@/components/sections/MeetTeam";
import { Testimonials } from "@/components/sections/Testimonials";
import { FeaturedVacancies } from "@/components/sections/FeaturedVacancies";

export default function HomePage() {
  return (
    <>
      <Hero />
      <CredibilityBar />
      <PlacementTypes />
      <WhyXentys />
      <HowWeWork />
      <MeetTeam />
      <Testimonials />
      <FeaturedVacancies />
    </>
  );
}
