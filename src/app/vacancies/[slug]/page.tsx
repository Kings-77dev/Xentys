"use client";
import { use, useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { FileUpload } from "@/components/ui/FileUpload";
import { Modal } from "@/components/ui/Modal";
import { VacancyCard } from "@/components/cards/VacancyCard";
import { JobAlertStrip } from "@/components/sections/JobAlertStrip";
import { vacancies, getVacancyBySlug } from "@/data/vacancies";

// ── Left rail section navigator ─────────────────────────────
const sections = [
  { id: "sec-about", num: "01", label: "About" },
  { id: "sec-role",  num: "02", label: "The role" },
  { id: "sec-do",    num: "03", label: "Responsibilities" },
  { id: "sec-req",   num: "04", label: "Requirements" },
  { id: "sec-terms", num: "05", label: "Terms" },
];

function Rail() {
  const [activeIdx, setActiveIdx]   = useState(0);
  const [barOffset, setBarOffset]   = useState(0);
  const dotRefs  = useRef<(HTMLButtonElement | null)[]>([]);
  const listRef  = useRef<HTMLOListElement>(null);

  const updateBar = useCallback(() => {
    const list = listRef.current;
    const dot  = dotRefs.current[activeIdx];
    if (!list || !dot) return;
    const listTop = list.getBoundingClientRect().top;
    const dotTop  = dot.getBoundingClientRect().top;
    setBarOffset(Math.max(0, dotTop - listTop - 6));
  }, [activeIdx]);

  useEffect(() => {
    updateBar();
    window.addEventListener("resize", updateBar);
    return () => window.removeEventListener("resize", updateBar);
  }, [updateBar]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const idx = sections.findIndex(s => s.id === visible.target.id);
          if (idx >= 0) setActiveIdx(idx);
        }
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    sections.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 96, behavior: "smooth" });
  };

  return (
    <nav className="hidden lg:block sticky self-start" style={{ top: 96 }} aria-label="On this page">
      <ol ref={listRef} className="relative flex flex-col gap-6 list-none m-0 p-0 pl-6">
        {/* Track */}
        <div className="absolute left-[7px] top-0 bottom-0 w-[2px] bg-[#e1e4e8]" aria-hidden="true" />
        {/* Amber fill — slides to active dot */}
        <div className="absolute left-[7px] top-0 w-[2px] h-10 bg-amber"
          style={{ transform: `translateY(${barOffset}px)`, transition: "transform 420ms cubic-bezier(0.4,0,0.2,1)" }}
          aria-hidden="true" />

        {sections.map((s, i) => {
          const isActive = i === activeIdx;
          return (
            <li key={s.id}>
              <button
                ref={el => { dotRefs.current[i] = el; }}
                type="button"
                onClick={() => scrollTo(s.id)}
                className="flex items-start gap-3 text-left cursor-pointer group"
                aria-current={isActive ? "true" : undefined}
              >
                {/* Dot */}
                <span className="flex-shrink-0 mt-0.5 transition-all duration-200"
                  style={{
                    width: 14, height: 14, borderRadius: "50%",
                    background: isActive ? "#ffa300" : "#fff",
                    border: isActive ? "none" : "2px solid #c9cdd3",
                    boxShadow: isActive ? "0 0 0 4px rgba(255,163,0,0.18)" : "none",
                    marginLeft: -6,
                    zIndex: 1, position: "relative",
                  }} aria-hidden="true" />
                <div>
                  <span className="block text-[10px] font-bold tracking-[0.08em]"
                    style={{ color: isActive ? "#d97706" : "#9ca3af", transition: "color 0.25s" }}>
                    {s.num}
                  </span>
                  <span className="text-[12px] font-semibold leading-tight"
                    style={{ color: isActive ? "#0d2b55" : "#9ca3af", transition: "color 0.25s" }}>
                    {s.label}
                  </span>
                </div>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

// ── Section heading ──────────────────────────────────────────
function SectionHead({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-bold text-[22px] text-navy mb-4 tracking-tight pb-3 border-b border-border">
      {children}
    </h2>
  );
}

// ── Dot list ─────────────────────────────────────────────────
function DotList({ items, color }: { items: string[]; color: "amber" | "navy" }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="flex-shrink-0 mt-1.5 w-2 h-2 rounded-full"
            style={{ background: color === "amber" ? "#ffa300" : "#0d2b55" }} aria-hidden="true" />
          <span className="text-[15px] text-text-secondary leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  );
}

// ── Page ─────────────────────────────────────────────────────
export default function VacancyDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const vacancy = getVacancyBySlug(slug);
  if (!vacancy) notFound();

  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const similar = vacancies.filter(v => v.slug !== slug).slice(0, 3);

  const sectorLabel = vacancy.sector.charAt(0).toUpperCase() + vacancy.sector.slice(1);
  const typeLabel   = { permanent: "Permanent", interim: "Interim", secondment: "Secondment", executive: "Executive" }[vacancy.type];

  return (
    <>
      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="bg-navy pt-36 pb-12" aria-labelledby="vd-heading">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-[120px]">

          {/* Top row: rating */}
          <div className="flex justify-end mb-4">
            <div className="flex items-center gap-1.5 text-[13px]">
              <strong className="text-white font-semibold">4.9</strong>
              <span className="text-amber">★★★★★</span>
              <span className="text-white/50">47 reviews</span>
            </div>
          </div>

          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[12px] text-white/50 mb-5" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white/80 transition-colors">Home</Link>
            <span>/</span>
            <Link href="/vacancies" className="hover:text-white/80 transition-colors">Vacancies</Link>
            <span>/</span>
            <span className="text-white/80" aria-current="page">{vacancy.title}</span>
          </nav>

          {/* Tags */}
          <div className="flex items-center gap-2 mb-4">
            <Badge type={vacancy.type} />
            <span className="text-[11px] font-semibold px-2 py-0.5 bg-white/10 text-white/80 tracking-wide">
              {sectorLabel}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-bold text-4xl lg:text-5xl tracking-tight text-white mb-6" id="vd-heading">
            {vacancy.title}
          </h1>

          {/* Meta row */}
          <div className="flex flex-wrap gap-5 mb-5">
            {[
              { icon: "M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16", text: sectorLabel },
              { icon: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0zM12 7a3 3 0 1 1 0 6 3 3 0 0 1 0-6", text: vacancy.location },
              { icon: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 6v6l3 2M9.5 14.5c0 1.1 1.1 2 2.5 2s2.5-.9 2.5-2M12 6.5v11", text: vacancy.salary },
              { icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z", text: `Posted ${vacancy.postedAgo}` },
            ].map(({ icon, text }) => (
              <span key={text} className="flex items-center gap-2 text-[14px] text-white/70">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true"><path d={icon}/></svg>
                {text}
              </span>
            ))}
          </div>

          <p className="text-[15px] text-white/60">
            Is this the right role for you?{" "}
            <button type="button" onClick={() => setModalOpen(true)} className="text-amber underline underline-offset-2 hover:text-amber/80 transition-colors">
              Apply below
            </button>
            {" "}or call {vacancy.recruiterName.split(" ")[0]} first.
          </p>
        </div>
      </section>

      {/* ── Body ────────────────────────────────────────────── */}
      <div className="bg-off-white py-12">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-[120px]">
          <div className="grid lg:grid-cols-[120px_1fr_340px] gap-8 items-start">

            {/* Left rail */}
            <Rail />

            {/* Main content */}
            <div className="flex flex-col gap-10">

              <section id="sec-about" className="scroll-mt-24">
                <SectionHead>About the organisation</SectionHead>
                <p className="text-[15px] text-text-secondary leading-relaxed">{vacancy.description}</p>
              </section>

              <section id="sec-role" className="scroll-mt-24">
                <SectionHead>Role description</SectionHead>
                <p className="text-[15px] text-text-secondary leading-relaxed">{vacancy.recruiterNote}</p>
              </section>

              <section id="sec-do" className="scroll-mt-24">
                <SectionHead>What you will do</SectionHead>
                <DotList items={vacancy.whatYouDo} color="amber" />
              </section>

              <section id="sec-req" className="scroll-mt-24">
                <SectionHead>What we are looking for</SectionHead>
                <DotList items={vacancy.whatYouBring} color="navy" />
              </section>

              <section id="sec-terms" className="scroll-mt-24">
                <SectionHead>Terms of employment</SectionHead>
                <DotList items={vacancy.whatOnOffer} color="navy" />
              </section>

              {/* Apply banner */}
              <div className="bg-navy p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                  <h3 className="font-bold text-[20px] text-white mb-1">Is this going to be your next role?</h3>
                  <p className="text-[14px] text-white/65">Apply directly, or speak to {vacancy.recruiterName.split(" ")[0]} first for a no-obligation conversation.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  className="flex-shrink-0 h-11 px-6 bg-amber text-navy font-semibold text-[14px] rounded-[2px] hover:bg-[#e89400] transition-colors whitespace-nowrap"
                >
                  Apply now →
                </button>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="flex flex-col gap-5 sticky self-start" style={{ top: 96 }}>

              {/* In short */}
              <div className="bg-white border border-border p-5">
                <p className="text-[10px] font-bold tracking-[0.1em] uppercase text-amber-text mb-4">In short</p>
                {[
                  ["Type",     typeLabel],
                  ["Sector",   sectorLabel],
                  ["Salary",   vacancy.salary],
                  ["Location", vacancy.location],
                  ["Posted",   vacancy.postedAgo],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between py-2 border-b border-[#f0f2f4] last:border-0 text-[13px]">
                    <span className="text-text-muted">{label}</span>
                    <span className="font-semibold text-text-primary text-right">{value}</span>
                  </div>
                ))}
              </div>

              {/* Recruiter card */}
              <div className="bg-white border border-border p-5" style={{ borderTop: "3px solid #ffa300" }}>
                <div className="flex items-start gap-3 mb-4">
                  {/* Portrait placeholder */}
                  <div className="flex-shrink-0 flex items-center justify-center font-bold text-white text-[15px]"
                    style={{ width: 56, height: 75, background: "linear-gradient(180deg,#c7cace,#8a8e94)" }}
                    aria-hidden="true">AB</div>
                  <div>
                    <p className="font-bold text-[15px] text-navy">{vacancy.recruiterName}</p>
                    <p className="text-[11px] text-text-secondary mt-0.5">{vacancy.recruiterTitle}</p>
                    <p className="text-[11px] text-text-muted mt-0.5">15 years · Industry & Construction</p>
                  </div>
                </div>
                <div className="h-px bg-off-white mb-3" />
                <p className="text-[12.5px] text-text-secondary italic leading-relaxed mb-3">
                  "I know this role and this company. Call me before you apply — I'll tell you exactly what they're looking for."
                </p>
                <div className="h-px bg-off-white mb-3" />
                <div className="flex flex-col gap-2 text-[12.5px] font-semibold text-navy mb-3">
                  <a href="tel:+31628571483" className="flex items-center gap-2 hover:text-amber-text transition-colors">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z"/></svg>
                    +31 6 28 57 14 83
                  </a>
                  <a href={`mailto:${vacancy.recruiterEmail}`} className="flex items-center gap-2 hover:text-amber-text transition-colors">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>
                    {vacancy.recruiterEmail}
                  </a>
                  <a href="https://linkedin.com" rel="noopener noreferrer" className="hover:text-amber-text transition-colors">LinkedIn →</a>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-[#e0f5e5] border-l-[3px] border-[#125e2e] text-[11.5px] font-semibold text-[#125e2e]">
                  ✓ Response within 1 working day
                </div>
              </div>

              {/* Apply button */}
              <button
                type="button"
                onClick={() => setModalOpen(true)}
                className="w-full h-12 bg-amber text-navy font-semibold text-[14px] rounded-[2px] hover:bg-[#e89400] transition-colors"
              >
                Apply for this role →
              </button>

              {/* Post-apply timeline — navy bg */}
              <div className="bg-navy p-5">
                <p className="text-[10px] font-bold tracking-[0.1em] uppercase text-amber mb-4">What happens after you apply</p>
                <ol className="flex flex-col relative list-none m-0 p-0">
                  <div className="absolute left-[7px] top-3 bottom-3 w-0.5 bg-gradient-to-b from-amber to-amber/20" aria-hidden="true" />
                  {[
                    { day: "Day 1",    text: "Adriaan reviews your application personally." },
                    { day: "Day 2–3",  text: "A 30-minute intro call to discuss the role and fit." },
                    { day: "Day 5–10", text: "Presented to the client if there's a strong match." },
                    { day: "Day 10+",  text: "Interview support, offer guidance and onboarding check-in." },
                  ].map(s => (
                    <li key={s.day} className="pl-6 relative pb-4 last:pb-0">
                      <span className="absolute left-0 top-1 w-3.5 h-3.5 rounded-full bg-amber border-[2.5px] border-navy shadow-[0_0_0_2px_#ffa300] block" aria-hidden="true" />
                      <span className="text-[10px] font-bold tracking-[0.08em] uppercase text-amber block mb-0.5">{s.day}</span>
                      <p className="text-[12px] text-white/65 leading-relaxed m-0">{s.text}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </aside>
          </div>
        </div>
      </div>

      {/* ── Similar vacancies ──────────────────────────────── */}
      {similar.length > 0 && (
        <section className="bg-white py-16" aria-labelledby="sim-heading">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-[120px]">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-bold text-[24px] text-navy tracking-tight" id="sim-heading">Similar vacancies</h2>
              <Link href="/vacancies" className="text-[13px] font-semibold text-navy hover:text-amber-text transition-colors">
                View all vacancies →
              </Link>
            </div>
            <div className="grid sm:grid-cols-3 gap-5">
              {similar.map(v => <VacancyCard key={v.slug} vacancy={v} />)}
            </div>
          </div>
        </section>
      )}

      {/* ── Newsletter ────────────────────────────────────── */}
      <JobAlertStrip />

      {/* ── Apply modal ───────────────────────────────────── */}
      <Modal open={modalOpen} onClose={() => { setModalOpen(false); setTimeout(() => setSubmitted(false), 300); }}
        title={`Apply for ${vacancy.title}`} hideCloseButton>

        <div className="flex flex-col overflow-hidden" style={{ maxHeight: "92vh" }}>
          {/* Top bar */}
          <div className="flex items-center justify-between flex-shrink-0 px-6 py-3 bg-off-white border-b border-border">
            <div className="flex items-center gap-3 text-[13px]">
              <span className="w-[9px] h-[9px] rounded-full bg-[#11723a] flex-shrink-0"
                style={{ boxShadow: "0 0 0 3px rgba(17,114,58,0.16)" }} aria-hidden="true" />
              <span className="font-semibold text-text-primary">Response within 1 working day</span>
            </div>
            <button type="button" onClick={() => setModalOpen(false)} aria-label="Close"
              className="w-8 h-8 flex items-center justify-center text-text-muted hover:text-text-primary transition-colors">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18"/>
              </svg>
            </button>
          </div>

          {/* Body */}
          <div className="overflow-y-auto flex-1 px-7 py-6">
            {!submitted ? (
              <>
                <h2 className="font-bold text-[20px] text-navy mb-1">Apply for {vacancy.title}</h2>
                <p className="text-[13px] text-text-secondary mb-6">
                  Your details go directly to {vacancy.recruiterName.split(" ")[0]}. Response within 1 working day.
                </p>
                <form id="apply-form" className="flex flex-col gap-4" onSubmit={e => { e.preventDefault(); setSubmitted(true); }} noValidate>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { id: "af-first", label: "First name", ph: "Jan", auto: "given-name", type: "text" },
                      { id: "af-last",  label: "Last name",  ph: "de Vries", auto: "family-name", type: "text" },
                    ].map(f => (
                      <div key={f.id} className="flex flex-col gap-1.5">
                        <label htmlFor={f.id} className="text-[11px] font-semibold text-text-secondary">{f.label} <span className="text-[#b42318]">*</span></label>
                        <input id={f.id} required autoComplete={f.auto} placeholder={f.ph} type={f.type}
                          className="h-11 px-3 border border-[#e0e2e5] rounded-[2px] text-[14px] text-text-primary placeholder:text-[#9a9da3] focus:border-navy focus:outline-none transition-colors" />
                      </div>
                    ))}
                  </div>
                  {[
                    { id: "af-email",    label: "Email",    ph: "jan@example.com", auto: "email",  type: "email", req: true },
                    { id: "af-phone",    label: "Phone",    ph: "+31 6 …",          auto: "tel",    type: "tel",   req: true },
                    { id: "af-linkedin", label: "LinkedIn", ph: "https://linkedin.com/in/…", auto: "", type: "url", req: false },
                  ].map(f => (
                    <div key={f.id} className="flex flex-col gap-1.5">
                      <label htmlFor={f.id} className="text-[11px] font-semibold text-text-secondary">
                        {f.label}{f.req && <span className="text-[#b42318] ml-0.5">*</span>}
                        {!f.req && <span className="font-normal text-text-muted ml-1">(optional)</span>}
                      </label>
                      <input id={f.id} type={f.type} required={f.req} autoComplete={f.auto} placeholder={f.ph}
                        className="h-11 px-3 border border-[#e0e2e5] rounded-[2px] text-[14px] text-text-primary placeholder:text-[#9a9da3] focus:border-navy focus:outline-none transition-colors" />
                    </div>
                  ))}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[11px] font-semibold text-text-secondary">CV / Resume <span className="text-[#b42318]">*</span></label>
                    <FileUpload id="af-cv" name="cv" required hint="PDF, DOC, DOCX — max 10MB" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="af-note" className="text-[11px] font-semibold text-text-secondary">
                      Cover note <span className="font-normal text-text-muted">(optional)</span>
                    </label>
                    <textarea id="af-note" rows={3} placeholder={`Anything you'd like ${vacancy.recruiterName.split(" ")[0]} to know…`}
                      className="px-3 py-2.5 border border-[#e0e2e5] rounded-[2px] text-[14px] text-text-primary placeholder:text-[#9a9da3] focus:border-navy focus:outline-none transition-colors resize-none" />
                  </div>
                  <p className="text-[11.5px] text-text-muted">
                    Your details are handled in accordance with our{" "}
                    <Link href="#" className="text-navy underline underline-offset-2">privacy policy</Link>.
                  </p>
                </form>
              </>
            ) : (
              <div className="flex flex-col items-center text-center gap-4 py-6">
                <div className="w-14 h-14 rounded-full bg-[#e0f5e7] flex items-center justify-center text-[#11723a]">
                  <svg viewBox="0 0 48 48" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M13 24l7 7 15-15"/>
                  </svg>
                </div>
                <h3 className="font-bold text-[20px] text-navy">Application received</h3>
                <p className="text-[14px] text-text-secondary max-w-sm">
                  {vacancy.recruiterName.split(" ")[0]} will review your profile and be in touch within 1 working day.
                  Honest feedback — whatever the outcome.
                </p>
                <Link href="/vacancies" onClick={() => setModalOpen(false)}
                  className="h-10 px-5 bg-amber text-navy font-semibold text-[13px] rounded-[2px] flex items-center hover:bg-[#e89400] transition-colors">
                  Back to vacancies →
                </Link>
              </div>
            )}
          </div>

          {/* Footer — submit row */}
          {!submitted && (
            <footer className="flex-shrink-0 flex items-center justify-between gap-4 px-7 py-4 border-t border-border bg-white">
              <span className="text-[12.5px] text-text-muted">
                Prefer to call?{" "}
                <a href="tel:+31702400414" className="text-navy font-semibold border-b border-dotted border-navy">
                  070 240 04 14
                </a>
              </span>
              <button form="apply-form" type="submit"
                className="h-10 px-5 bg-amber text-navy font-semibold text-[13px] rounded-[2px] hover:bg-[#e89400] transition-colors">
                Submit application →
              </button>
            </footer>
          )}
        </div>
      </Modal>
    </>
  );
}
