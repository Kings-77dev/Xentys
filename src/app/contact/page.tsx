"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";

// ── Live office status ───────────────────────────────────────
function useLiveStatus() {
  const [status, setStatus] = useState<{ open: boolean; label: string }>({
    open: false,
    label: "Loading…",
  });

  useEffect(() => {
    const compute = () => {
      const now  = new Date();
      const day  = now.getDay();
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

const inputCls = "h-11 w-full px-[13px] border border-[#e0e2e5] rounded-[2px] text-[14px] text-text-primary placeholder:text-[#9a9da3] focus:border-navy focus:shadow-[0_0_0_3px_rgba(13,43,85,0.10)] focus:outline-none transition-all";

export default function ContactPage() {
  const liveStatus  = useLiveStatus();
  const [openFaq,   setOpenFaq]   = useState<number | null>(0);
  const [formState, setFormState] = useState<"idle" | "sent">("idle");
  const [firstName, setFirstName] = useState("");
  const [subjectVal, setSubjectVal] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name    = (form.elements.namedItem("name") as HTMLInputElement).value.trim();
    const subject = (form.elements.namedItem("subject") as HTMLInputElement).value.trim();
    setFirstName(name.split(/\s+/)[0]);
    setSubjectVal(subject || "message");
    setFormState("sent");
  };

  return (
    <>
      {/* ── 01 Hero — matches consultation page pattern exactly ── */}
      <section className="bg-navy pt-36 pb-16" aria-labelledby="ct-heading">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-[120px]">
          <nav className="flex items-center gap-2 text-[12px] text-white/50 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white/80 transition-colors">Home</Link>
            <span aria-hidden="true">/</span>
            <span className="text-white/80" aria-current="page">Contact</span>
          </nav>
          <Eyebrow label="Get in touch" inv />
          <h1 className="font-bold text-4xl lg:text-5xl tracking-tight text-white mb-4 max-w-2xl" id="ct-heading">
            Get in touch.
          </h1>
          <p className="text-lg text-white/70 max-w-xl mb-8">
            Whether you're looking to hire or find your next role — we're here, and a real person answers.
          </p>
          <div className="flex flex-wrap gap-5">
            {["Response within 1 working day", "A real person answers", "Treated with discretion"].map((t) => (
              <span key={t} className="flex items-center gap-2 text-[13px] text-white/70 font-medium">
                <span className="w-4 h-4 rounded-full bg-[rgba(35,189,106,0.18)] text-[#5bd08e] text-[11px] font-bold flex items-center justify-center flex-shrink-0">✓</span>
                {t}
              </span>
            ))}
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
                  Share a vacancy brief →
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
          {/* Natural heights — no items-stretch, matches reference layout */}
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* Left: image-slot — exact reference structure */}
            <div className="relative w-full border-2 border-dashed border-[#d5d8dd] bg-[#f0f1f3]" style={{ height: 440 }}>
              {/* Drop zone */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3" style={{ paddingBottom: 160 }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.2" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
                </svg>
              </div>

              {/* Caption — inset floating card inside the dashed container */}
              <div className="absolute bottom-3 left-3 right-3 bg-white p-5 border border-[#d5d8dd] shadow-sm">
                <p className="font-semibold text-[15px] text-navy mb-1">Speak to a real person.</p>
                <p className="text-[13px] text-text-secondary mb-4 leading-relaxed">
                  Adriaan, 15 years in procurement, leads our personal service. He'll find the right path and call you himself.
                </p>
                <div className="flex gap-4">
                  <a href="tel:+31702400414" className="flex items-center gap-2 text-[13px] font-semibold text-navy hover:text-amber-text transition-colors">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z"/></svg>
                    Call Adriaan directly
                  </a>
                  <a href="https://linkedin.com" rel="noopener noreferrer" className="text-[13px] font-semibold text-navy hover:text-amber-text transition-colors">LinkedIn →</a>
                </div>
              </div>
            </div>

            {/* Right: body — natural flow, exact reference structure */}
            <div>
              <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-amber-text mb-3">Visit us</p>
              <h2 className="font-bold text-[28px] text-navy mb-4 tracking-tight" id="ct-visit-h">
                Visit us in Rijswijk.
              </h2>
              <p className="text-[16px] text-text-secondary leading-relaxed mb-8">
                Prefer to talk in person? You are welcome to meet the team at our office by appointment at{" "}
                <em className="not-italic font-medium text-text-primary">Geestbrugkade 35, Rijswijk</em>.
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
                {/* Live status — plain, no background tint */}
                <div className="flex items-start gap-2 text-[12px] text-text-muted pt-3 border-t border-border">
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
      <section className="bg-white py-16" aria-labelledby="ct-enq-h">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-[120px]">
          <div className="mb-8">
            <h2 className="font-bold text-[28px] text-navy mb-2 tracking-tight" id="ct-enq-h">General enquiry</h2>
            <p className="text-[15px] text-text-secondary">For press, partnerships, or anything else.</p>
          </div>

          {/* Off-white card container — gives the form visual boundaries */}
          <div className="bg-off-white border border-border p-8">

          {formState === "idle" ? (
            <form onSubmit={handleSubmit} noValidate>
              {/* Full-width 2-col grid — matches reference ct-form__grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4 mb-4">
                {/* Row 1: name + email */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-[11px] font-semibold text-text-secondary">Full name <span className="text-[#b42318]">*</span></label>
                  <input id="name" name="name" type="text" required autoComplete="name" placeholder="Your full name" className={inputCls} />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-[11px] font-semibold text-text-secondary">Email address <span className="text-[#b42318]">*</span></label>
                  <input id="email" name="email" type="email" required autoComplete="email" placeholder="your@email.com" className={inputCls} />
                </div>

                {/* Row 2: subject — full width */}
                <div className="flex flex-col gap-2 sm:col-span-2">
                  <label htmlFor="subject" className="text-[11px] font-semibold text-text-secondary">
                    What is this about? <span className="text-[#b42318]">*</span>
                  </label>
                  <input id="subject" name="subject" type="text" required
                    placeholder="e.g. hiring need, partnership, general question"
                    className={inputCls} />
                </div>

                {/* Row 3: message — full width */}
                <div className="flex flex-col gap-2 sm:col-span-2">
                  <label htmlFor="message" className="text-[11px] font-semibold text-text-secondary">Message <span className="text-[#b42318]">*</span></label>
                  <textarea id="message" name="message" required rows={5}
                    placeholder="Tell us what you need — urgency, must-haves, blockers…"
                    className="w-full px-[13px] py-3 border border-[#e0e2e5] rounded-[2px] text-[14px] text-text-primary placeholder:text-[#9a9da3] focus:border-navy focus:shadow-[0_0_0_3px_rgba(13,43,85,0.10)] focus:outline-none transition-all resize-y" />
                </div>
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
              <div className="w-12 h-12 bg-[#e8f5ee] flex items-center justify-center text-[#11723a]">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 6 9 17l-5-5"/>
                </svg>
              </div>
              <h3 className="font-bold text-[22px] text-navy">
                {firstName ? `Thanks, ${firstName} — message sent.` : "Message sent — thank you."}
              </h3>
              <p className="text-[15px] text-text-secondary leading-relaxed">
                We've got your {subjectVal} and a specialist will reply within{" "}
                <strong className="text-text-primary">1 working day</strong>.
                {" "}Prefer to talk now? Call <strong className="text-text-primary">070 240 04 14</strong>.
              </p>
            </div>
          )}

          </div>{/* end off-white card */}
        </div>
      </section>

      {/* ── 05 FAQ — individual white cards ──────────────── */}
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

          {/* Individual white cards with full border + gap */}
          <div className="flex flex-col gap-3">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} className="bg-white border border-border">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className={`text-[15px] font-semibold transition-colors ${isOpen ? "text-navy" : "text-text-primary"}`}>
                      {faq.q}
                    </span>
                    <span
                      className={`text-[20px] flex-shrink-0 transition-colors duration-200 ${isOpen ? "text-amber-text" : "text-amber-text"}`}
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-5 border-t border-border">
                      <p className="text-[14px] text-text-secondary leading-relaxed pt-4">{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
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
    </>
  );
}
