import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { LinkButton } from "@/components/ui/Button";
import { CTABanner } from "@/components/sections/CTABanner";

// ── Team data (existing site team) ──────────────────────────
const team = [
  { initials: "MS", name: "Maarten Smits van Oyen", role: "Consultant — Permanent & Interim",    exp: "10+ years in procurement recruitment", tag: "Permanent · Interim",     email: "maarten.smitsvanoyen@xentys.nl", phone: "+31612345678" },
  { initials: "AB", name: "Adriaan Brok",            role: "Consultant — Interim Specialist",     exp: "8 years in interim procurement",      tag: "Industry · Construction", email: "adriaan.brok@xentys.nl",          phone: "+31623456789" },
  { initials: "AU", name: "Aurelia Bredet",           role: "Consultant — Permanent Recruitment", exp: "6 years specialising in strategic roles", tag: "Offshore · Energy",   email: "aurelia.bredet@xentys.nl",        phone: "+31634567890" },
  { initials: "MH", name: "Martin Havelka",           role: "Chief of Technology",               exp: "Joined 2018",                         tag: "Technology",             email: "martin.havelka@xentys.nl",        phone: "+31645678901" },
];

const sectors = [
  { num: "01", title: "Industry & Manufacturing",     desc: "Procurement roles across production, engineering and technical operations.",    roles: ["Strategic Buyer", "Category Mgr", "CPO"] },
  { num: "02", title: "Construction & Infrastructure", desc: "Specialists for contractors, developers and complex project environments.",   roles: ["Project Buyer", "Sourcing Mgr", "Contract Mgr"] },
  { num: "03", title: "Offshore & Energy",             desc: "Procurement expertise for marine, offshore and energy organisations.",         roles: ["Procurement Mgr", "Supply Chain Lead"] },
  { num: "04", title: "High-Tech",                    desc: "Specialists for fast-moving, technical and innovation-led businesses.",        roles: ["Tactical Buyer", "Supply Chain"] },
];

const principles = [
  { num: "01", title: "Specialist by design",   desc: "Procurement and supply chain only. Not general recruitment, not a side service." },
  { num: "02", title: "Quality over volume",    desc: "A carefully vetted shortlist of three to five — never a stack of CVs to sort through." },
  { num: "03", title: "One point of contact",  desc: "The same named recruiter stays with you, from first conversation to placement." },
  { num: "04", title: "Honest and direct",     desc: "Clear expectations and feedback throughout. If we can't help, we say so on day one." },
];

// ── Reusable helpers ─────────────────────────────────────────
function SectionBorder() {
  return <div className="border-t border-border" aria-hidden="true" />;
}

function PhotoPlaceholder({ className, note }: { className?: string; note: string }) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 border-2 border-dashed border-[#d5d8dd] bg-[#f0f1f3] text-text-muted ${className ?? ""}`}
      aria-hidden="true"
    >
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3">
        <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
      </svg>
      <span className="text-[12px] text-center px-4">{note}</span>
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      {/* ── 1. Hero ─────────────────────────────────────────── */}
      <section className="bg-navy pt-36 pb-16" aria-labelledby="ab-heading">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-[120px]">
          <nav className="flex items-center gap-2 text-[12px] text-white/50 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white/80 transition-colors">Home</Link>
            <span aria-hidden="true">/</span>
            <span className="text-white/80" aria-current="page">About</span>
          </nav>
          <Eyebrow label="About xentys · Since 2010" inv />
          <h1 className="font-bold text-4xl lg:text-5xl tracking-tight text-white mb-4 max-w-3xl" id="ab-heading">
            Specialists in procurement.<br />
            <span className="text-amber">People at heart.</span>
          </h1>
          <p className="text-lg text-white/70 max-w-xl mb-8">
            For fifteen years we&apos;ve helped organisations hire the right procurement and supply chain professionals —
            permanent, interim, secondment and executive search. One market, known in detail.
          </p>
          <div className="flex flex-wrap gap-3 mb-8">
            <LinkButton href="#ab-team" variant="primary">Meet the team →</LinkButton>
            <LinkButton href="/consultation" variant="ghost-inv">Request a consultation →</LinkButton>
          </div>
          <div className="flex flex-wrap gap-5">
            {["15+ years specialist focus", "One named recruiter throughout", "Response within 1 working day"].map((t) => (
              <span key={t} className="flex items-center gap-2 text-[13px] text-white/70 font-medium">
                <span className="w-4 h-4 rounded-full bg-[rgba(35,189,106,0.18)] text-[#5bd08e] text-[11px] font-bold flex items-center justify-center flex-shrink-0">✓</span>
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. Our story ────────────────────────────────────── */}
      <section className="bg-white py-[88px]" id="story" aria-labelledby="ab-story-h">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-[120px]">
          <div className="grid lg:grid-cols-[300px_1fr] gap-[72px] items-start">

            {/* Sticky aside */}
            <div className="lg:sticky lg:top-24 self-start">
              <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-amber-text mb-4">Our story</p>
              <h2 className="font-bold text-[30px] text-navy tracking-tight mb-5" id="ab-story-h">
                Built on expertise.<br />Kept personal.
              </h2>
              <PhotoPlaceholder className="w-full h-[220px] mb-3" note="Drop a photo of The Hague / the team" />
              <p className="text-[12px] text-text-muted">Founded in The Hague, 2010.</p>
            </div>

            {/* Scrolling prose */}
            <div className="text-[17px] leading-[1.72] text-text-primary max-w-[600px]">
              <p className="mb-[22px]">xentys was founded in The Hague in 2010 by procurement professionals who had seen recruitment done differently — and wanted to do it better. Too many agencies sent stacks of CVs. We wanted to provide insight, understanding, and matches that actually hold.</p>
              <p className="mb-[22px]">So we made a choice that still defines us: stay specialist. Procurement and supply chain, and nothing else. It means every consultant knows the roles, the language, and the market in real detail — not in passing.</p>

              {/* Pull quote */}
              <blockquote
                className="my-8 py-1 pl-6 text-[21px] leading-[1.45] text-navy tracking-tight"
                style={{ borderLeft: "3px solid #ffa300" }}
              >
                "When you genuinely know procurement, you make better connections — for the company and for the person."
                <cite className="block mt-3 not-italic text-[12px] text-text-muted tracking-[0.06em] uppercase font-semibold">
                  Maarten · Founder, xentys
                </cite>
              </blockquote>

              <p>Fifteen years later we&apos;re still specialist by choice. The market has grown, the team has grown, but the commitment hasn&apos;t changed: personal contact, deep sector knowledge, and relationships that outlast a single placement.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Meet the team ────────────────────────────────── */}
      <SectionBorder />
      <section className="bg-off-white py-[88px]" id="ab-team" aria-labelledby="ab-team-h">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-[120px]">
          <div className="flex items-end justify-between gap-6 flex-wrap mb-10">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-amber-text mb-3">Meet the team</p>
              <h2 className="font-bold text-[32px] text-navy tracking-tight mb-2" id="ab-team-h">The people behind xentys.</h2>
              <p className="text-[16px] text-text-secondary">Four specialists, one focus. You&apos;ll always know exactly who you&apos;re talking to.</p>
            </div>
            <Link href="/contact" className="text-[13px] font-semibold text-navy hover:text-amber-text transition-colors flex-shrink-0">
              Contact our team →
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-[18px]">
            {team.map((m) => (
              <article key={m.initials} className="bg-white border border-border rounded-lg overflow-hidden flex flex-col">
                <div
                  className="relative flex items-center justify-center"
                  style={{ aspectRatio: "4/5", background: "linear-gradient(165deg, #0d2b55 0%, #15396b 100%)", overflow: "hidden" }}
                >
                  <span className="absolute font-semibold text-white select-none" style={{ fontSize: "80px", opacity: 0.12, letterSpacing: "-0.02em", userSelect: "none" }} aria-hidden="true">{m.initials}</span>
                  <span className="absolute top-3 left-3 text-[10px] font-semibold tracking-[0.08em] uppercase text-amber px-2 py-1" style={{ background: "rgba(7,25,53,0.7)", backdropFilter: "blur(4px)" }}>{m.tag}</span>
                </div>
                <div className="p-[18px] flex flex-col gap-1 flex-1">
                  <span className="font-bold text-[15px] text-navy tracking-tight">{m.name}</span>
                  <span className="text-[12.5px] text-text-secondary">{m.role}</span>
                  <span className="text-[12px] text-text-muted mt-0.5">{m.exp}</span>
                  <div className="flex gap-4 mt-3 flex-wrap">
                    <a href={`tel:${m.phone}`} className="text-[12px] font-semibold text-navy hover:text-amber-text transition-colors flex items-center gap-1">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 17.92z"/></svg>Call
                    </a>
                    <a href={`mailto:${m.email}`} className="text-[12px] font-semibold text-navy hover:text-amber-text transition-colors flex items-center gap-1">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>Email
                    </a>
                    <a href="https://linkedin.com" rel="noopener noreferrer" className="text-[12px] font-semibold text-navy hover:text-amber-text transition-colors">LinkedIn</a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Sectors we know (ledger editorial) ───────────── */}
      <SectionBorder />
      <section className="bg-white py-[88px]" aria-labelledby="ab-sec-h">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-[120px]">
          <div className="mb-12">
            <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-amber-text mb-3">Sectors we know</p>
            <h2 className="font-bold text-[32px] text-navy tracking-tight mb-3" id="ab-sec-h">
              Sector knowledge that goes beyond recruitment.
            </h2>
            <p className="text-[16px] text-text-secondary leading-relaxed max-w-[620px]">
              We specialise where procurement is most demanding — four sectors we know from the inside.
            </p>
          </div>

          {/* Ledger editorial rows */}
          <div className="border-t border-border">
            {sectors.map((s) => (
              <div
                key={s.num}
                className="grid border-b border-border transition-colors hover:bg-off-white"
                style={{ gridTemplateColumns: "96px 1fr 300px", alignItems: "baseline", gap: "32px", padding: "30px 0" }}
              >
                {/* Giant amber number */}
                <span
                  className="font-bold text-[#d1d5db]  leading-none select-none"
                  style={{ fontSize: "32px", letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums" }}
                  aria-hidden="true"
                >
                  {s.num}
                </span>

                {/* Title + description */}
                <div>
                  <h3 className="font-bold text-[22px] text-navy tracking-tight mb-2">{s.title}</h3>
                  <p className="text-[14.5px] text-text-secondary leading-relaxed max-w-[460px]">{s.desc}</p>
                </div>

                {/* Role bullet list */}
                <div className="flex flex-wrap gap-x-[18px] gap-y-2 self-center">
                  {s.roles.map((r) => (
                    <span key={r} className="text-[12px] text-text-muted relative pl-[14px]">
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[5px] h-[5px] rounded-full bg-amber" aria-hidden="true" />
                      {r}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Our approach ─────────────────────────────────── */}
      <section className="bg-[#f8f8f7] py-[88px]" aria-labelledby="ab-app-h">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-[120px]">

          {/* Header — left-aligned */}
          <div className="max-w-[665px] mb-16">
            <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-amber-text mb-3">Our approach</p>
            <h2 className="font-bold text-[32px] text-navy tracking-tight mb-3" id="ab-app-h">Four principles, since day one.</h2>
            <p className="text-[16px] text-[#4d5056] leading-relaxed">
              They&apos;re not slogans. They&apos;re the reason clients and candidates come back — and the standard we hold ourselves to on every brief.
            </p>
          </div>

          {/* 4-column grid — same pattern as HowWeWork */}
          <div className="grid lg:grid-cols-4 items-start" style={{ gap: 0 }}>
            {principles.map((p, i) => (
              <div
                key={p.num}
                className={`group flex flex-col gap-5 px-8 first:pl-0 ${i < principles.length - 1 ? "border-r border-[#e0e2e5]" : ""}`}
                style={{ paddingTop: "8px" }}
              >
                {/* Giant number */}
                <span
                  className="font-bold text-[#d1d5db] group-hover:text-amber-text transition-colors duration-200 select-none leading-none"
                  style={{ fontSize: "72px", letterSpacing: "-2px", lineHeight: 1 }}
                  aria-hidden="true"
                >
                  {p.num}
                </span>
                {/* Amber accent bar */}
                <div className="w-8 h-[3px] bg-amber rounded-full" aria-hidden="true" />
                {/* Title */}
                <h3 className="font-semibold text-[22px] text-navy leading-tight">{p.title}</h3>
                {/* Description */}
                <p className="text-[15px] leading-6 text-[#4d5056]">{p.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 7. Final CTA ────────────────────────────────────── */}
      <CTABanner />
    </>
  );
}
