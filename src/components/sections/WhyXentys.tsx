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
    <section className="bg-white py-[120px] px-6 md:px-10 lg:px-20" aria-labelledby="why-heading">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid lg:grid-cols-[360px_1fr] gap-20 items-start">

          {/* Sticky header */}
          <div className="lg:sticky lg:top-24">
            <Eyebrow label="Why Xentys" />
            <h2
              className="font-bold text-navy mb-5 tracking-[-0.025em]"
              style={{ fontSize: "28px", lineHeight: 1.25 }}
              id="why-heading"
            >
              Not a generalist agency.<br />Never was.
            </h2>
            <p className="text-[16px] leading-[1.65] text-text-secondary">
              Every consultant here has direct procurement sector experience. We recruit in one discipline — and we're very good at it.
            </p>
          </div>

          {/* Items */}
          <div className="flex flex-col">
            {items.map((item, i) => (
              <div
                key={item.num}
                className={`grid grid-cols-[48px_1fr] gap-6 py-7 transition-all duration-[200ms] ease-out group ${i < items.length - 1 ? "border-b border-[#f0f2f4]" : ""}`}
              >
                {/* Number */}
                <span
                  className="font-bold text-[#d1d5db] group-hover:text-amber transition-colors duration-[200ms] leading-none pt-1"
                  style={{ fontSize: "22px", letterSpacing: "-0.03em" }}
                  aria-hidden="true"
                >
                  {item.num}
                </span>
                <div>
                  <h3 className="font-semibold text-[17px] text-text-primary mb-2 tracking-[-0.01em]">
                    {item.title}
                  </h3>
                  <p className="text-[15px] leading-[1.6] text-text-secondary">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
