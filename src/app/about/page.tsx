import { Eyebrow } from "@/components/ui/Eyebrow";
import { LinkButton } from "@/components/ui/Button";

const team = [
  { i: "MS", name: "Maarten Smits van Oyen", role: "Consultant — Permanent & Interim", years: "10+ years in procurement recruitment", quote: "I keep my commitments. That's the job.", email: "maarten.smitsvanoyen@xentys.nl" },
  { i: "AB", name: "Adriaan Brok", role: "Consultant — Interim Specialist", years: "8 years in interim procurement", quote: "Speed matters in interim. My network is ready.", email: "adriaan.brok@xentys.nl" },
  { i: "AU", name: "Aurelia Bredet", role: "Consultant — Permanent Recruitment", years: "6 years specialising in strategic roles", quote: "Good placements are built on honest conversations.", email: "aurelia.bredet@xentys.nl" },
  { i: "MH", name: "Martin Havelka", role: "Chief of Technology", years: "Joined 2018", quote: "The tools should be invisible. The match should not.", email: "martin.havelka@xentys.nl" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-navy pt-36 pb-20" aria-labelledby="about-heading">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-[120px]">
          <Eyebrow label="About Xentys" inv />
          <h1 className="font-bold text-5xl lg:text-6xl tracking-tight text-white mb-4 max-w-2xl" id="about-heading">
            Procurement is all we do.<br /><span className="text-amber">Since 2010.</span>
          </h1>
          <p className="text-lg text-white/70 max-w-xl">We built Xentys because procurement deserved a recruitment agency that actually understood it.</p>
        </div>
      </section>

      {/* Origin */}
      <section className="bg-white py-[120px]" aria-labelledby="origin-heading">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-[120px]">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Eyebrow label="Our story" />
              <h2 className="font-bold text-3xl lg:text-4xl tracking-tight text-text-primary mb-6" id="origin-heading">We started Xentys because we saw the gap.</h2>
              <div className="flex flex-col gap-4 text-lg text-text-secondary">
                <p>In 2010, procurement was still being handled by generalist agencies who didn't understand category management, couldn't tell a tactical buyer from a strategic one, and measured success by how many CVs they sent.</p>
                <p>We knew there was a better way. Specialise fully. Build a network in one discipline. Put consultants in front of clients who actually understand what they're hiring for.</p>
                <p>Fifteen years later, 745+ placed professionals later, 250+ client organisations later — that's still exactly what we do.</p>
              </div>
            </div>
            <div className="aspect-[4/3] bg-off-white rounded-none border border-border flex flex-col items-center justify-center gap-3 text-text-muted" aria-hidden="true">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
              <span className="text-sm text-center px-8">Photo: Xentys office or team at work</span>
            </div>
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="bg-off-white py-[120px]" id="services" aria-labelledby="diff-heading">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-[120px]">
          <div className="text-center max-w-xl mx-auto mb-16">
            <Eyebrow label="What makes us different" center />
            <h2 className="font-bold text-3xl lg:text-4xl tracking-tight text-text-primary" id="diff-heading">Not what we say. What we do.</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {[
              { icon: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01", title: "Specialist depth", desc: "Every consultant at Xentys has direct experience in procurement and supply chain. It's the only thing we do." },
              { icon: "M22 11.08V12a10 10 0 1 1-5.93-9.14M22 4 12 14.01l-3-3", title: "Pre-selection quality", desc: "You meet 3–5 vetted candidates — personally screened. We invest the time before the shortlist so you don't have to." },
              { icon: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 3a4 4 0 1 1 0 8 4 4 0 0 1 0-8z", title: "Named recruiter model", desc: "One consultant from first call to placement. No handoffs, no getting passed around a team." },
              { icon: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z", title: "Honest feedback culture", desc: "Candidates get real assessment. Clients get straight talk on the market. Hard conversations once beat comfortable ones that waste time." },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="bg-white border border-border rounded-none p-8 flex flex-col gap-4">
                <div className="w-12 h-12 bg-amber/10 rounded-none flex items-center justify-center text-amber-text">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d={icon}/></svg>
                </div>
                <h3 className="font-semibold text-xl text-text-primary">{title}</h3>
                <p className="text-base text-text-secondary">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sectors */}
      <section className="bg-navy py-[120px]" aria-labelledby="sectors-heading">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-[120px]">
          <div className="text-center max-w-xl mx-auto mb-16">
            <Eyebrow label="Sectors we know" inv center />
            <h2 className="font-bold text-3xl lg:text-4xl tracking-tight text-white" id="sectors-heading">Where we work</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { emoji: "🏭", title: "Industry", desc: "Manufacturing, process industry, and technical production environments across the Netherlands. From tactical buyers to procurement directors." },
              { emoji: "🏗️", title: "Construction", desc: "Infrastructure, civil, and building construction — including major project procurement, subcontract management, and supply chain roles." },
              { emoji: "⚓", title: "Offshore & Maritime", desc: "Oil and gas, renewable offshore, and maritime — project buying, category management, and technical procurement for complex asset environments." },
            ].map(({ emoji, title, desc }) => (
              <div key={title} className="bg-white/5 border border-white/10 rounded-none p-8 flex flex-col gap-4">
                <div className="text-4xl">{emoji}</div>
                <h3 className="font-semibold text-xl text-white">{title}</h3>
                <p className="text-base text-white/65">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full team */}
      <section className="bg-white py-[120px]" aria-labelledby="fullteam-heading">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-[120px]">
          <div className="text-center max-w-xl mx-auto mb-16">
            <Eyebrow label="The team" center />
            <h2 className="font-bold text-3xl lg:text-4xl tracking-tight text-text-primary" id="fullteam-heading">The people you'll work with</h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map(({ i, name, role, years, quote, email }) => (
              <article key={name} className="bg-off-white border border-border rounded-none p-8 flex flex-col items-center text-center gap-3">
                <div className="w-24 h-24 rounded-full bg-navy flex items-center justify-center text-white font-bold text-2xl mb-2">{i}</div>
                <h3 className="font-semibold text-lg text-text-primary">{name}</h3>
                <p className="text-sm text-text-muted">{role}</p>
                <p className="text-xs font-semibold text-amber-text tracking-wide">{years}</p>
                <p className="text-sm text-text-secondary italic border-t border-border pt-3 w-full">"{quote}"</p>
                <div className="flex gap-3 mt-1">
                  <a href={`mailto:${email}`} className="text-xs font-semibold text-amber-text underline underline-offset-2 hover:text-navy transition-colors">Email</a>
                  <a href="https://linkedin.com" rel="noopener noreferrer" className="text-xs font-semibold text-amber-text underline underline-offset-2 hover:text-navy transition-colors">LinkedIn</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-off-white py-[120px]" aria-labelledby="values-heading">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-[120px]">
          <div className="text-center max-w-xl mx-auto mb-16">
            <Eyebrow label="How we operate" center />
            <h2 className="font-bold text-3xl lg:text-4xl tracking-tight text-text-primary" id="values-heading">What we believe</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { title: "We tell you the truth", desc: "If a candidate isn't right, we say so. If your brief is unrealistic for the market, we tell you. Honesty up front saves everyone time." },
              { title: "You talk to one person, start to finish", desc: "No account managers, no handoffs. One consultant owns the brief and the relationship." },
              { title: "We know procurement, not just recruitment", desc: "We understand category management, NEVI, source-to-pay. That's why our shortlists are different." },
            ].map(({ title, desc }) => (
              <div key={title} className="bg-white border border-border rounded-none p-8 flex flex-col gap-3">
                <h3 className="font-semibold text-xl text-text-primary">{title}</h3>
                <p className="text-base text-text-secondary">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy py-20 text-center" aria-labelledby="cta-heading">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-[120px]">
          <h2 className="font-bold text-3xl lg:text-4xl tracking-tight text-white mb-4" id="cta-heading">Ready to work together?</h2>
          <p className="text-lg text-white/70 mb-10">Submit a vacancy or browse our current procurement roles.</p>
          <div className="flex justify-center gap-4 flex-wrap">
            <LinkButton href="/consultation" variant="primary">Submit a vacancy →</LinkButton>
            <LinkButton href="/vacancies" variant="ghost-inv">View vacancies</LinkButton>
          </div>
        </div>
      </section>
    </>
  );
}
