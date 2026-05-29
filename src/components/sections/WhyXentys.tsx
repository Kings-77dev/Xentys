import { Eyebrow } from "@/components/ui/Eyebrow";

const items = [
  {
    num: "01",
    title: "Niche Expertise",
    desc: "We recruit exclusively in procurement and supply chain. No generalists — every consultant has direct sector placement experience in industry, construction, and offshore.",
  },
  {
    num: "02",
    title: "Fast Interim Scaling",
    desc: "Need capacity within days? We deliver screened interim professionals on payroll or self-employed basis — for project cover, team gaps, or rapid growth.",
  },
  {
    num: "03",
    title: "Rigorous Pre-Selection",
    desc: "You only meet candidates we've personally screened. 3–5 vetted professionals presented — not a stack of forwarded CVs. Your time is too valuable for that.",
  },
  {
    num: "04",
    title: "Transparent Partnership",
    desc: "One recruiter from first call to placement. No handoffs, no surprises. Fixed fee agreed upfront. Available throughout the guarantee period.",
  },
];

export function WhyXentys() {
  return (
    <section className="bg-white py-[120px]" aria-labelledby="why-heading">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-[120px]">
        <div className="grid lg:grid-cols-[380px_1fr] gap-16 items-start">
          <div className="lg:sticky lg:top-24">
            <Eyebrow label="Why Xentys" />
            <h2 className="font-bold text-3xl lg:text-4xl tracking-tight text-text-primary mb-4" id="why-heading">
              Not a generalist agency. Never was.
            </h2>
            <p className="text-lg text-text-secondary">
              Every consultant here has direct procurement sector experience. We recruit in one discipline — and we're very good at it.
            </p>
          </div>
          <div className="flex flex-col gap-1">
            {items.map((item) => (
              <div key={item.num}
                className="grid grid-cols-[44px_1fr] gap-6 p-8 rounded-2xl border border-transparent hover:bg-off-white hover:border-border transition-all duration-200 items-start group">
                <span className="font-bold text-3xl tracking-tight text-border group-hover:text-amber transition-colors leading-none pt-1">
                  {item.num}
                </span>
                <div>
                  <h3 className="font-semibold text-xl text-text-primary mb-2">{item.title}</h3>
                  <p className="text-base text-text-secondary">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
