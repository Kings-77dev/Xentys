import { Eyebrow } from "@/components/ui/Eyebrow";
import Link from "next/link";

const steps = [
  { num: "01", title: "Brief",     desc: "Tell us about the role, seniority, sector, team context and must-haves." },
  { num: "02", title: "Search",    desc: "We find the right people from our active network of screened professionals." },
  { num: "03", title: "Shortlist", desc: "You meet 3–5 vetted candidates. Pre-selected, not forwarded." },
  { num: "04", title: "Interview", desc: "We coordinate the process and advise on both sides throughout." },
  { num: "05", title: "Placement", desc: "Your new hire starts. We stay available during the guarantee period." },
];

export function HowWeWork() {
  return (
    <section className="bg-white py-[120px]" aria-labelledby="how-heading">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-[120px]">

        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-[665px] mx-auto mb-3">
          <Eyebrow label="For hiring managers" center />
          <h2
            className="font-bold text-navy mb-3"
            style={{ fontSize: "28px" }}
            id="how-heading"
          >
            From brief to shortlist in days, not weeks.
          </h2>
          <p className="text-[16px] leading-6 text-[#4d5056] max-w-[554px]">
            A clear process, from your first call to your hire's first day.
          </p>
        </div>
        <div className="flex justify-end mb-8">
          <Link href="/consultation" className="text-[14px] font-semibold text-navy hover:text-amber-text transition-colors">
            See the full process →
          </Link>
        </div>

        {/* Step cards */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-6 mb-14" role="list">
          {steps.map((step) => (
            <div
              key={step.num}
              className="bg-[#15396b] rounded-xl p-6 flex flex-col gap-2 min-h-[209px] justify-center"
              role="listitem"
            >
              <span className="text-amber font-semibold text-[11px] tracking-[1.1px]">{step.num}</span>
              <h3 className="font-semibold text-[22px] leading-8 text-white">{step.title}</h3>
              <p className="text-[16px] leading-6 text-slate-300">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <Link
            href="/consultation"
            className="inline-flex items-center justify-center h-10 px-6 bg-amber rounded-lg text-[13px] font-semibold text-[#071935] hover:opacity-90 transition-opacity"
          >
            Request consultation →
          </Link>
        </div>
      </div>
    </section>
  );
}
