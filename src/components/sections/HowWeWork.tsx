import { Eyebrow } from "@/components/ui/Eyebrow";
import Link from "next/link";

const steps = [
  {
    num: "01",
    title: "Brief",
    desc: "A real conversation about the role, the team and what \"right\" looks like.",
  },
  {
    num: "02",
    title: "Search",
    desc: "We work our procurement network directly — no job-board spray.",
  },
  {
    num: "03",
    title: "Shortlist",
    desc: "3–5 vetted candidates, each with our honest read on the fit.",
  },
  {
    num: "04",
    title: "Interview",
    desc: "We coordinate the process and advise on both sides throughout.",
  },
  {
    num: "05",
    title: "Placement",
    desc: "Offer, onboarding and aftercare. 3-month guarantee on permanent hires.",
  },
];

export function HowWeWork() {
  return (
    <section className="bg-[#f8f8f7] py-[120px]" aria-labelledby="how-heading">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-[120px]">

        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-[665px] mx-auto mb-4">
          <Eyebrow label="For hiring managers" center />
          <h2
            className="font-bold text-navy mb-3"
            style={{ fontSize: "28px" }}
            id="how-heading"
          >
            From brief to shortlist in <span style={{ color: "#ffa300" }}>days</span>, not weeks.
          </h2>
          <p className="text-[16px] leading-6 text-[#4d5056] max-w-[554px]">
            A clear process, from your first call to your hire's first day.
          </p>
        </div>

        {/* See full process — right-aligned */}
        <div className="flex justify-end mb-16">
          <Link
            href="/consultation"
            className="text-[14px] font-semibold text-navy hover:text-amber-text transition-colors"
          >
            See the full process →
          </Link>
        </div>

        {/* Staggered step columns — desktop only stagger */}
        {/* Mobile: single column | Tablet: 3 col no stagger | Desktop: 5 col stagger */}
        <div
          className="hidden lg:grid pb-16"
          style={{
            gridTemplateColumns: "repeat(5, 1fr)",
            gap: "0",
          }}
          role="list"
        >
          {steps.map((step, i) => (
            <div
              key={step.num}
              className={`flex flex-col gap-5 px-8 ${i < steps.length - 1 ? "border-r border-[#e0e2e5]" : ""}`}
              style={{
                transform: i % 2 === 1 ? "translateY(56px)" : "translateY(0)",
                paddingTop: "8px",
              }}
              role="listitem"
            >
              {/* Giant step number */}
              <span
                className="font-bold text-navy select-none leading-none"
                style={{ fontSize: "72px", letterSpacing: "-2px", lineHeight: 1 }}
                aria-hidden="true"
              >
                {step.num}
              </span>

              {/* Amber accent bar */}
              <div className="w-8 h-[3px] bg-amber rounded-full" aria-hidden="true" />

              {/* Title */}
              <h3 className="font-semibold text-[22px] text-navy leading-tight">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-[15px] leading-6 text-[#4d5056]">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Tablet: 3-col grid, no stagger */}
        <div
          className="hidden md:grid lg:hidden gap-8 mb-16"
          style={{ gridTemplateColumns: "repeat(3, 1fr)" }}
          role="list"
        >
          {steps.map((step, i) => (
            <div
              key={step.num}
              className={`flex flex-col gap-4 p-6 ${i < steps.length - 1 ? "border-b md:border-b-0 md:border-r border-[#e0e2e5]" : ""}`}
              role="listitem"
            >
              <span
                className="font-bold text-navy select-none leading-none"
                style={{ fontSize: "56px", letterSpacing: "-1.5px", lineHeight: 1 }}
                aria-hidden="true"
              >
                {step.num}
              </span>
              <div className="w-6 h-[3px] bg-amber rounded-full" aria-hidden="true" />
              <h3 className="font-semibold text-[20px] text-navy">{step.title}</h3>
              <p className="text-[15px] leading-6 text-[#4d5056]">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Mobile: single column, no stagger */}
        <div className="flex flex-col gap-8 md:hidden mb-16" role="list">
          {steps.map((step) => (
            <div
              key={step.num}
              className="flex gap-5 items-start pb-8 border-b border-[#e0e2e5] last:border-0 last:pb-0"
              role="listitem"
            >
              <span
                className="font-bold text-navy select-none flex-shrink-0"
                style={{ fontSize: "48px", letterSpacing: "-1px", lineHeight: 1 }}
                aria-hidden="true"
              >
                {step.num}
              </span>
              <div className="pt-2">
                <div className="w-6 h-[3px] bg-amber rounded-full mb-3" aria-hidden="true" />
                <h3 className="font-semibold text-[20px] text-navy mb-2">{step.title}</h3>
                <p className="text-[15px] leading-6 text-[#4d5056]">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center" style={{ marginTop: "32px" }}>
          <Link
            href="/consultation"
            className="inline-flex items-center justify-center h-11 px-7 bg-amber rounded-lg text-[13px] font-semibold text-[#071935] hover:opacity-90 transition-opacity"
          >
            Request a Consultation →
          </Link>
        </div>

      </div>
    </section>
  );
}
