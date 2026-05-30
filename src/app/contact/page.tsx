"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

// ── Live office status ───────────────────────────────────────
function useLiveStatus() {
  const [status, setStatus] = useState<{ open: boolean; label: string }>({
    open: false,
    label: "Loading…",
  });

  useEffect(() => {
    const compute = () => {
      const now  = new Date();
      const day  = now.getDay();           // 0=Sun … 6=Sat
      const h    = now.getHours() + now.getMinutes() / 60;
      const open = day >= 1 && day <= 5 && h >= 9 && h < 17;

      if (open) {
        setStatus({ open: true, label: "We're in the office now — pop by, or give us a call." });
        return;
      }

      const names = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
      let label = "on Monday at 09:00";
      if (day >= 1 && day <= 5 && h < 9) {
        label = "later today at 09:00";
      } else {
        for (let i = 1; i <= 7; i++) {
          const nd = (day + i) % 7;
          if (nd >= 1 && nd <= 5) {
            label = (i === 1 ? "tomorrow" : "on " + names[nd]) + " at 09:00";
            break;
          }
        }
      }
      setStatus({ open: false, label: `We're out of office, but we'll be back to help you ${label}.` });
    };
    compute();
  }, []);

  return status;
}

// ── FAQ data ─────────────────────────────────────────────────
const faqs = [
  { q: "How quickly will I get a response?", a: "Within one working day, always. Most enquiries get a call back the same day if received before 15:00 CET. Outside office hours, leave a voicemail or email — we read everything by 09:00 the next morning." },
  { q: "Do you charge candidates?", a: "Never. Candidates pay nothing — ever. Our fee is paid by the hiring company on a successful placement, and only then. The whole process is free for you whether you place or not." },
  { q: "Will my CV be shared without my permission?", a: "No. Your CV is shared only with employers you explicitly approve, role by role. We discuss the company, the role, and the people before we send anything. Everything is treated as confidential by default." },
  { q: "I'm hiring — how does the process work?", a: "Share a brief, get a call within one working day to confirm scope, and receive 3–5 vetted shortlist candidates within 10 working days. Permanent placements come with a three-month replacement guarantee." },
  { q: "What sectors do you cover?", a: "Industry & Manufacturing, Construction & Infrastructure, and Offshore & Energy. Within those, we cover the full procurement function — tactical/strategic buyers, category managers, contract managers, supply chain leads, up to CPO and executive search." },
  { q: "Do you work outside the Netherlands?", a: "We're based in The Hague and specialise in the Dutch procurement market — every consultant knows this market in detail. For roles elsewhere in the Benelux or Germany, ask us first; we'll tell you honestly whether we're the right partner." },
];

const subjects = [
  { id: "hiring",      label: "I have a hiring need" },
  { id: "role",        label: "Looking for a role" },
  { id: "partnership", label: "Partnership" },
  { id: "other",       label: "Other" },
];

const subjectLabels: Record<string, string> = {
  hiring: "hiring need", role: "role search", partnership: "partnership enquiry", other: "message",
};

export default function ContactPage() {
  const liveStatus  = useLiveStatus();
  const [openFaq,   setOpenFaq]   = useState<number | null>(0);
  const [subject,   setSubject]   = useState<string | null>(null);
  const [formState, setFormState] = useState<"idle" | "sent">("idle");
  const [firstName, setFirstName] = useState("");
  const [subjectErr, setSubjectErr] = useState(false);
  const [shakeChips, setShakeChips] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!subject) {
      setSubjectErr(true);
      setShakeChips(true);
      setTimeout(() => setShakeChips(false), 300);
      return;
    }
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value.trim();
    setFirstName(name.split(/\s+/)[0]);
    setFormState("sent");
  };

  return (
    <>
      {/* ── 01 Hero ──────────────────────────────────────── */}
      <section className="bg-white pt-36 pb-12 border-b border-border" aria-labelledby="ct-heading">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-[120px]">
          {/* Rating */}
          <div className="flex justify-end mb-8">
            <div className="flex items-center gap-2 text-[13px]">
              <strong className="text-text-primary font-semibold">4.9</strong>
              <span className="text-amber tracking-wide">★★★★★</span>
              <span className="text-text-muted">47 reviews</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-end">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-amber-text mb-3">Get in touch</p>
              <h1 className="font-bold text-navy mb-4" style={{ fontSize: "clamp(36px, 5vw, 56px)", letterSpacing: "-0.028em", lineHeight: 1.06 }} id="ct-heading">
                Get in touch.
              </h1>
              <p className="text-[18px] text-text-secondary leading-relaxed max-w-[500px]">
                Whether you're looking to hire or find your next role — we're here, and a real person answers.
              </p>
            </div>
            <div className="flex items-center gap-2 px-5 py-3 bg-[#e8f5ee] text-[#166534] text-[13px] font-medium self-start lg:self-end flex-shrink-0">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" width="14" height="14" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>
              Response within 1 working day
            </div>
          </div>
        </div>
      </section>

      {/* ── 02 Routing cards ─────────────────────────────── */}
      <section className="bg-off-white py-16" aria-label="Choose your route">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-[120px]">
          <div className="grid sm:grid-cols-2 gap-6">

            {/* I need to hire */}
            <article className="bg-white border border-border p-8 flex flex-col gap-5">
              <div>
                <h2 className="font-bold text-[22px] text-navy mb-2">I need to hire</h2>
                <p className="text-[15px] text-text-secondary leading-relaxed">
                  Find the right procurement professional for your team — permanently, interim, or on secondment.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 mt-auto">
                <Link href="/consultation"
                  className="inline-flex items-center h-11 px-5 bg-amber text-navy font-semibold text-[14px] rounded-[2px] hover:bg-[#e89400] transition-colors whitespace-nowrap">
                  Request a Consultation →
                </Link>
              </div>
            </article>

            {/* I want a role */}
            <article className="bg-navy p-8 flex flex-col gap-5">
              <div>
                <h2 className="font-bold text-[22px] text-white mb-2">I want a role</h2>
                <p className="text-[15px] text-white/70 leading-relaxed">
                  Browse open procurement roles or register your profile — your details stay confidential.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 mt-auto">
                <Link href="/vacancies"
                  className="inline-flex items-center h-11 px-5 bg-white text-navy font-semibold text-[14px] rounded-[2px] hover:bg-off-white transition-colors whitespace-nowrap">
                  Browse open roles →
                </Link>
                <Link href="/open-application"
                  className="inline-flex items-center h-11 px-5 border border-white/40 text-white font-semibold text-[14px] rounded-[2px] hover:border-white transition-colors whitespace-nowrap">
                  Open application →
                </Link>
              </div>
            </article>
          </div>

          <p className="text-[13px] text-text-muted mt-6">
            Press, partnerships or general enquiry?{" "}
            <a href="mailto:info@xentys.nl" className="text-navy font-semibold hover:text-amber-text transition-colors">
              info@xentys.nl →
            </a>
          </p>
        </div>
      </section>

      {/* ── 03 Visit us ──────────────────────────────────── */}
      <section className="bg-white py-16" aria-labelledby="ct-visit-h">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-[120px]">
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* Photo + caption */}
            <div className="flex flex-col gap-5">
              {/* Photo placeholder */}
              <div className="w-full bg-off-white border border-border flex flex-col items-center justify-center gap-3 text-text-muted" style={{ height: 440 }} aria-hidden="true">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.3">
                  <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
                </svg>
                <span className="text-sm text-center px-8">Drop a team photo of the xentys people</span>
              </div>

              {/* Caption */}
              <div className="p-5 bg-off-white border border-border">
                <p className="font-semibold text-[15px] text-navy mb-1">Speak to a real person.</p>
                <p className="text-[13px] text-text-secondary mb-4 leading-relaxed">
                  Adriaan, 15 years in procurement, leads our personal service. He'll find the right path and call you himself.
                </p>
                <div className="flex gap-3">
                  <a href="tel:+31702400414" className="flex items-center gap-2 text-[13px] font-semibold text-navy hover:text-amber-text transition-colors">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z"/></svg>
                    Call Adriaan directly
                  </a>
                  <a href="https://linkedin.com" rel="noopener noreferrer" className="text-[13px] font-semibold text-navy hover:text-amber-text transition-colors">LinkedIn →</a>
                </div>
              </div>
            </div>

            {/* Body */}
            <div>
              <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-amber-text mb-3">Visit us</p>
              <h2 className="font-bold text-[28px] text-navy mb-4 tracking-tight" id="ct-visit-h">
                We're people, not just pixels.
              </h2>
              <p className="text-[16px] text-text-secondary leading-relaxed mb-8">
                Come by for a coffee in our building at{" "}
                <em className="not-italic font-medium text-text-primary">Geestbrugkade 35, Rijswijk</em>.
                {" "}We're here to help you personally — check the hours below and make an appointment.
              </p>

              {/* Office card */}
              <div className="border border-border p-6 mb-6">
                <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-amber-text mb-3">Our office &amp; hours</p>
                <address className="not-italic text-[14px] text-text-primary font-semibold mb-4">
                  xentys B.V.<br />
                  <span className="font-normal text-text-secondary">Geestbrugkade 35, 2281 CX · Rijswijk, Netherlands</span>
                </address>
                <div className="flex flex-col gap-2 mb-4 text-[13px]">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Monday – Friday</span>
                    <strong className="text-text-primary font-semibold">09:00 – 17:00</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Saturday – Sunday</span>
                    <strong className="text-text-primary font-semibold">Closed</strong>
                  </div>
                </div>
                {/* Live status */}
                <div className={`flex items-start gap-2 text-[12px] px-3 py-2 ${liveStatus.open ? "bg-[#e8f5ee] text-[#166534]" : "bg-off-white text-text-muted"}`}>
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 mt-0.5 ${liveStatus.open ? "bg-[#22c55e]" : "bg-[#9ca3af]"}`} aria-hidden="true" />
                  {liveStatus.label}
                </div>
              </div>

              <a href="https://maps.google.com/?q=Geestbrugkade+35,+Rijswijk" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center h-11 px-5 border border-border text-navy font-semibold text-[14px] rounded-[2px] hover:border-[#c9cdd3] hover:bg-off-white transition-all">
                Get directions →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── 04 General enquiry form ──────────────────────── */}
      <section className="bg-off-white py-16" aria-labelledby="ct-enq-h">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-[120px]">
          <div className="max-w-[700px]">
            <h2 className="font-bold text-[28px] text-navy mb-2 tracking-tight" id="ct-enq-h">General enquiry</h2>
            <p className="text-[15px] text-text-secondary mb-8">For press, partnerships, or anything else.</p>

            {formState === "idle" ? (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-[11px] font-semibold text-text-secondary">Full name <span className="text-[#b42318]">*</span></label>
                    <input id="name" name="name" type="text" required autoComplete="name" placeholder="Your full name"
                      className="h-11 px-[13px] border border-[#e0e2e5] rounded-[2px] text-[14px] text-text-primary placeholder:text-[#9a9da3] focus:border-navy focus:shadow-[0_0_0_3px_rgba(13,43,85,0.10)] focus:outline-none transition-all" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-[11px] font-semibold text-text-secondary">Email address <span className="text-[#b42318]">*</span></label>
                    <input id="email" name="email" type="email" required autoComplete="email" placeholder="your@email.com"
                      className="h-11 px-[13px] border border-[#e0e2e5] rounded-[2px] text-[14px] text-text-primary placeholder:text-[#9a9da3] focus:border-navy focus:shadow-[0_0_0_3px_rgba(13,43,85,0.10)] focus:outline-none transition-all" />
                  </div>
                </div>

                {/* Subject chips */}
                <div className="flex flex-col gap-2">
                  <span className="text-[11px] font-semibold text-text-secondary">What is this about? <span className="text-[#b42318]">*</span></span>
                  <div
                    className="flex flex-wrap gap-2"
                    role="radiogroup"
                    aria-label="What is this about?"
                    style={{ animation: shakeChips ? "tile-shake 0.22s ease" : "none" }}
                  >
                    {subjects.map(({ id, label }) => {
                      const active = subject === id;
                      return (
                        <button
                          key={id}
                          type="button"
                          role="radio"
                          aria-checked={active}
                          onClick={() => { setSubject(id); setSubjectErr(false); }}
                          className={`h-9 px-4 text-[13px] font-medium border transition-all duration-150 cursor-pointer ${
                            active
                              ? "border-amber bg-amber/10 text-navy font-semibold"
                              : `border-[#e0e2e5] text-text-secondary hover:border-[#c9cdd3] ${subjectErr ? "border-[#b42318]" : ""}`
                          }`}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>
                  {subjectErr && <span className="text-[12px] text-[#b42318] font-medium">Please choose a subject.</span>}
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-[11px] font-semibold text-text-secondary">Message <span className="text-[#b42318]">*</span></label>
                  <textarea id="message" name="message" required rows={5} placeholder="Tell us what you need — urgency, must-haves, blockers…"
                    className="px-[13px] py-3 border border-[#e0e2e5] rounded-[2px] text-[14px] text-text-primary placeholder:text-[#9a9da3] focus:border-navy focus:shadow-[0_0_0_3px_rgba(13,43,85,0.10)] focus:outline-none transition-all resize-y" />
                </div>

                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <button type="submit"
                    className="h-11 px-6 bg-navy text-white font-semibold text-[14px] rounded-[2px] hover:bg-[#0a2347] transition-colors">
                    Send message →
                  </button>
                  <span className="text-[13px] text-text-muted">
                    Or call us:{" "}
                    <a href="tel:+31702400414" className="text-navy font-semibold hover:text-amber-text transition-colors">070 240 04 14</a>
                  </span>
                </div>
              </form>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="w-12 h-12 bg-[#e8f5ee] rounded-none flex items-center justify-center text-[#11723a]">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M20 6 9 17l-5-5"/>
                  </svg>
                </div>
                <h3 className="font-bold text-[22px] text-navy">
                  {firstName ? `Thanks, ${firstName} — message sent.` : "Message sent — thank you."}
                </h3>
                <p className="text-[15px] text-text-secondary leading-relaxed">
                  We've got your {subjectLabels[subject!] ?? "message"} and a specialist will reply within{" "}
                  <strong className="text-text-primary">1 working day</strong>.
                  {" "}Prefer to talk now? Call <strong className="text-text-primary">070 240 04 14</strong>.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── 05 FAQ ───────────────────────────────────────── */}
      <section className="bg-white py-16" id="faq" aria-labelledby="ct-faq-h">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-[120px]">
          <div className="flex items-start justify-between gap-8 mb-10 flex-wrap">
            <div>
              <h2 className="font-bold text-[28px] text-navy mb-2 tracking-tight" id="ct-faq-h">
                Questions before we talk?
              </h2>
              <p className="text-[15px] text-text-secondary">The most common questions, answered honestly.</p>
            </div>
            <Link href="/about" className="text-[13px] font-semibold text-navy hover:text-amber-text transition-colors whitespace-nowrap">
              Read more about how we work →
            </Link>
          </div>

          <ul className="flex flex-col border-t border-border">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <li key={i} className="border-b border-border">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 py-5 text-left group"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-[11px] font-bold text-amber flex-shrink-0 w-5 text-center">{i + 1}</span>
                      <span className={`text-[15px] font-semibold transition-colors ${isOpen ? "text-navy" : "text-text-primary group-hover:text-navy"}`}>
                        {faq.q}
                      </span>
                    </div>
                    <span
                      className={`text-[20px] text-text-muted flex-shrink-0 transition-transform duration-200 ${isOpen ? "rotate-45 text-navy" : ""}`}
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </button>
                  {isOpen && (
                    <div className="pb-5 pl-9">
                      <p className="text-[15px] text-text-secondary leading-relaxed">{faq.a}</p>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ── 06 Final CTA ─────────────────────────────────── */}
      <section className="bg-navy py-20" aria-label="Final call to action">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-[120px]">
          <div className="grid lg:grid-cols-[1fr_auto] gap-12 items-center">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-amber mb-4">Still deciding?</p>
              <h2 className="font-bold text-white mb-4 tracking-tight" style={{ fontSize: "clamp(24px, 3vw, 36px)", lineHeight: 1.15 }}>
                Pick up the phone. The first call is always free, always honest.
              </h2>
              <p className="text-[15px] text-white/65 leading-relaxed mb-3 max-w-[520px]">
                No script, no automated triage, no chasing. A 15-minute call tells you whether we're the right partner — for hiring, for your next move, or for something we haven't built yet.
              </p>
              <p className="text-[12.5px] text-white/40">
                We treat every enquiry with discretion. No employer is contacted, no candidate is approached.
              </p>
            </div>
            <div className="flex flex-col gap-3 flex-shrink-0">
              <a href="tel:+31702400414"
                className="inline-flex items-center justify-center h-12 px-7 bg-amber text-navy font-semibold text-[14px] rounded-[2px] hover:bg-[#e89400] transition-colors whitespace-nowrap">
                Call 070 240 04 14
              </a>
              <a href="mailto:info@xentys.nl"
                className="inline-flex items-center justify-center h-12 px-7 border border-white/30 text-white font-semibold text-[14px] rounded-[2px] hover:border-white transition-colors whitespace-nowrap">
                Email instead
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Shake keyframe (reused from modals) */}
      <style>{`
        @keyframes tile-shake {
          0%   { transform: translateX(0); }
          20%  { transform: translateX(-4px); }
          40%  { transform: translateX(4px); }
          60%  { transform: translateX(-3px); }
          80%  { transform: translateX(3px); }
          100% { transform: translateX(0); }
        }
      `}</style>
    </>
  );
}
