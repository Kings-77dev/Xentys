import { Eyebrow } from "@/components/ui/Eyebrow";
import { ServiceCard } from "@/components/cards/ServiceCard";

const services = [
  {
    type: "permanent" as const,
    title: "Permanent Recruitment",
    description: "Direct hire of procurement professionals into your team. We handle the full search, screen, and present 3–5 candidates — with a 3-month replacement guarantee.",
    ctaLabel: "Submit a vacancy →",
    ctaHref: "/consultation",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
  },
  {
    type: "interim" as const,
    title: "Interim Inkoop",
    description: "Flexible procurement capacity when you need it — project cover, team gaps, or rapid scaling. Screened interim specialists available within days, not weeks.",
    ctaLabel: "Request interim capacity →",
    ctaHref: "/consultation",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  },
  {
    type: "secondment" as const,
    title: "Detachering",
    description: "A procurement professional on the Xentys payroll, embedded in your organisation. You get the expertise without the employment overhead.",
    ctaLabel: "Explore secondment →",
    ctaHref: "/consultation",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  },
  {
    type: "executive" as const,
    title: "Executive Search",
    description: "Senior and leadership procurement placement — CPOs, Heads of Procurement, Category Directors. Discrete, thorough, and built on a 15-year network.",
    ctaLabel: "Start a search →",
    ctaHref: "/consultation",
    icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  },
];

export function PlacementTypes() {
  return (
    <section className="bg-off-white py-[120px]" aria-labelledby="services-heading">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-[120px]">
        <div className="text-center max-w-xl mx-auto mb-16">
          <Eyebrow label="How we place" center />
          <h2 className="font-bold text-3xl lg:text-4xl tracking-tight text-text-primary" id="services-heading">
            Four ways to bring the right person in
          </h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s) => <ServiceCard key={s.title} {...s} />)}
        </div>
      </div>
    </section>
  );
}
