import { Eyebrow } from "@/components/ui/Eyebrow";
import { LinkButton } from "@/components/ui/Button";

const steps = [
  { num: "01", title: "Brief", desc: "Tell us about the role, seniority, sector, team context and must-haves." },
  { num: "02", title: "Search", desc: "We find the right people from our active network of screened professionals." },
  { num: "03", title: "Shortlist", desc: "You meet 3–5 vetted candidates. Pre-selected, not forwarded." },
  { num: "04", title: "Interview", desc: "We coordinate the process and advise on both sides throughout." },
  { num: "05", title: "Placement", desc: "Your new hire starts. We stay available during the guarantee period." },
];

export function HowWeWork() {
  return (
    <section className="bg-navy py-[120px]" aria-labelledby="how-heading">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-[120px]">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Eyebrow label="For hiring managers" inv center />
          <h2 className="font-bold text-3xl lg:text-4xl tracking-tight text-white mb-4" id="how-heading">
            From brief to shortlist in days, not weeks.
          </h2>
          <p className="text-lg text-white/70">A clear process — from your first call to your hire's first day.</p>
        </div>

        <div className="grid sm:grid-cols-5 mb-12" role="list">
          {steps.map((step, i) => (
            <div key={step.num}
              className={`flex flex-col gap-4 p-6 ${i < 4 ? "border-b sm:border-b-0 sm:border-r border-white/10" : ""}`}
              role="listitem">
              <span className="font-semibold text-sm text-amber tracking-wider">{step.num}</span>
              <h3 className="font-semibold text-lg text-white">{step.title}</h3>
              <p className="text-sm text-white/60">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center flex flex-wrap justify-center gap-4">
          <LinkButton href="/consultation" variant="primary">Request a Consultation →</LinkButton>
          <LinkButton href="/consultation" variant="ghost-inv">See full process</LinkButton>
        </div>
      </div>
    </section>
  );
}
