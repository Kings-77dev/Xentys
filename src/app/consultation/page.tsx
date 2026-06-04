"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";

type PlacementType = "permanent" | "interim" | "secondment" | null;
type FormState = "idle" | "confirmed";

const tiles = [
  { id: "permanent"  as const, label: "Permanent hire",  sub: "Fixed-fee, 3-month replacement guarantee.",               tagLabel: "Permanent",  tagClass: "bg-[#f0fdf4] text-[#166534]" },
  { id: "interim"    as const, label: "Interim cover",   sub: "Screened interim on ZZP or payroll, deployed in 5–10 days.", tagLabel: "Interim",    tagClass: "bg-[#fffbeb] text-[#92400e]" },
  { id: "secondment" as const, label: "Secondment",      sub: "Procurement professional on xentys payroll, embedded.",  tagLabel: "Secondment", tagClass: "bg-[#eff6ff] text-[#1e40af]" },
];

function SectionHead({ num, title }: { num: number; title: string }) {
  return (
    <h2 className="flex items-center gap-3 font-semibold text-[18px] text-navy mb-5 mt-8 pt-7 border-t border-border first:mt-0 first:pt-0 first:border-t-0">
      <span className="w-6 h-6 rounded-full bg-amber text-navy text-[12px] font-bold flex items-center justify-center flex-shrink-0">
        {num}
      </span>
      {title}
    </h2>
  );
}

function Field({ id, label, required, children }: { id?: string; label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[11px] font-semibold text-text-secondary">
        {label}{required && <span className="text-[#b42318] ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls = "h-11 w-full px-[13px] border border-[#e0e2e5] rounded-[2px] text-[14px] text-text-primary placeholder:text-[#9a9da3] focus:border-navy focus:shadow-[0_0_0_3px_rgba(13,43,85,0.10)] focus:outline-none transition-all";
const selectCls = `${inputCls} appearance-none cursor-pointer bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b6f75' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")] bg-no-repeat bg-[right_12px_center]`;

export default function ConsultationPage() {
  const [state, setState]       = useState<FormState>("idle");
  const [placement, setPlacement] = useState<PlacementType>(null);
  const [fileName, setFileName] = useState("No file chosen · PDF / DOCX, max 2 GB");
  const [successName, setSuccessName] = useState("");
  const [callTime,    setCallTime]    = useState("either");
  const [contactPref, setContactPref] = useState("phone");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement)?.value.trim();
    setSuccessName(name.split(/\s+/)[0]);
    setState("confirmed");
  };

  return (
    <>
      {/* ── Hero ───────────────────────────────────────── */}
      <section className="bg-navy pt-36 pb-16 px-6 md:px-10 lg:px-20" aria-labelledby="consult-heading">
        <div className="max-w-[1280px] mx-auto">
          {/* Google rating — top-right, matches vacancy detail pattern */}
          <div className="flex justify-end mb-4">
            <div className="flex items-center gap-1.5 text-[13px]">
              <strong className="text-white font-semibold">4.9</strong>
              <span className="text-amber">★★★★★</span>
              <span className="text-white/50">47 Google reviews</span>
            </div>
          </div>
          <nav className="flex items-center gap-2 text-[12px] text-white/50 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white/80 transition-colors">Home</Link>
            <span aria-hidden="true">/</span>
            <span className="text-white/80" aria-current="page">Share a vacancy brief</span>
          </nav>
          <Eyebrow label="Full brief · ~5 minutes" inv />
          <h1 className="font-bold text-4xl lg:text-5xl tracking-tight text-white mb-4 max-w-2xl" id="consult-heading">
            Share a vacancy brief
          </h1>
          <p className="text-lg text-white/70 max-w-xl mb-8">
            Share the role brief in detail and a sector specialist will call you within 1 working day to confirm fit, walk through the process, and start the search.
          </p>
          <div className="flex flex-wrap gap-5">
            {["Response within 1 working day", "Treated with discretion", "No spam, no automated emails"].map((t) => (
              <span key={t} className="flex items-center gap-2 text-[13px] text-white/70 font-medium">
                <span className="w-4 h-4 rounded-full bg-[rgba(35,189,106,0.18)] text-[#5bd08e] text-[11px] font-bold flex items-center justify-center flex-shrink-0">✓</span>
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Body ───────────────────────────────────────── */}
      <div className="bg-off-white py-16 px-6 md:px-10 lg:px-20">
        <div className="max-w-[1080px] mx-auto">
          <div className="grid lg:grid-cols-[1fr_360px] gap-12 items-start">

            {/* ── Main form ────────────────────────────── */}
            <div className="bg-white border border-border rounded-none p-10">

              {state === "idle" ? (
                <>
                  {/* Step 1 — Type tiles */}
                  <div className="mb-7">
                    <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-amber-text mb-3">
                      Step 1 · Choose the type of hire
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {tiles.map((t) => {
                        const active = placement === t.id;
                        return (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => setPlacement(t.id)}
                            className="text-left p-[18px] border transition-all duration-150 cursor-pointer bg-white"
                            style={{
                              borderColor: active ? "#ffa300" : "#e0e2e5",
                              borderWidth: active ? 2 : 1,
                              boxShadow: active ? "0 0 0 3px rgba(255,163,0,0.14)" : "none",
                              minHeight: 140,
                            }}
                            aria-pressed={active}
                          >
                            {/* Check mark */}
                            <span
                              className="w-5 h-5 rounded-full border-2 flex items-center justify-center mb-3 transition-all duration-150"
                              style={{ borderColor: active ? "#ffa300" : "#c7cace", background: active ? "#ffa300" : "#fff" }}
                              aria-hidden="true"
                            >
                              {active && <span className="w-2.5 h-2.5 rounded-full bg-white block" />}
                            </span>
                            <span className={`text-[11px] font-semibold px-2 py-0.5 mb-2 inline-block ${t.tagClass}`}>
                              {t.tagLabel}
                            </span>
                            <h3 className="font-bold text-[16px] text-navy mb-1">{t.label}</h3>
                            <p className="text-[12.5px] text-text-secondary leading-snug">{t.sub}</p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-0" noValidate>

                    {/* Step 2 — The role */}
                    <SectionHead num={2} title="The role" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
                      <div className="col-span-2">
                        <Field id="role" label="Role title" required>
                          <input id="role" name="role" required placeholder="e.g. Strategic Buyer, Category Manager" className={inputCls} />
                        </Field>
                      </div>
                      <Field id="sector" label="Sector" required>
                        <select id="sector" name="sector" required className={selectCls}>
                          <option value="">Choose a sector…</option>
                          <option>Industry &amp; Manufacturing</option>
                          <option>Construction &amp; Infrastructure</option>
                          <option>Offshore &amp; Energy</option>
                          <option>Other</option>
                        </select>
                      </Field>
                      <Field id="seniority" label="Seniority">
                        <select id="seniority" name="seniority" className={selectCls}>
                          <option value="">Choose…</option>
                          <option>Medior (3–6 years)</option>
                          <option>Senior (6–10 years)</option>
                          <option>Lead / Manager (10+ years)</option>
                          <option>Executive / CPO</option>
                        </select>
                      </Field>
                      <Field id="location" label="Location / city">
                        <input id="location" name="location" placeholder="e.g. Rotterdam, hybrid" className={inputCls} />
                      </Field>
                      <Field id="start" label="Start date / urgency">
                        <select id="start" name="start" className={selectCls}>
                          <option value="">Choose…</option>
                          <option>ASAP</option>
                          <option>Within 1 month</option>
                          <option>1–3 months</option>
                          <option>Flexible</option>
                        </select>
                      </Field>

                      {/* Conditional: permanent */}
                      {placement === "permanent" && (
                        <>
                          <Field id="salary" label="Annual salary range">
                            <input id="salary" name="salary" placeholder="e.g. €65,000 – €80,000" className={inputCls} />
                          </Field>
                          <Field id="hours" label="Hours per week">
                            <select id="hours" name="hours" className={selectCls}>
                              <option value="">Choose…</option>
                              <option>32 h</option><option>36 h</option><option>40 h</option>
                            </select>
                          </Field>
                        </>
                      )}

                      {/* Conditional: interim / secondment */}
                      {(placement === "interim" || placement === "secondment") && (
                        <>
                          <Field id="rate" label="Day-rate budget">
                            <input id="rate" name="rate" placeholder="e.g. €85 – €110 / day" className={inputCls} />
                          </Field>
                          <Field id="duration" label="Duration (months)">
                            <select id="duration" name="duration" className={selectCls}>
                              <option value="">Choose…</option>
                              <option>1–3 months</option><option>3–6 months</option>
                              <option>6–12 months</option><option>12+ months</option>
                            </select>
                          </Field>
                        </>
                      )}

                      <div className="col-span-2">
                        <Field id="context" label="Role context, must-haves, dealbreakers">
                          <textarea id="context" name="context" rows={4}
                            placeholder="Team dynamics, why hiring (replacement / growth / project), critical experience, dealbreakers…"
                            className={`${inputCls} h-auto py-3 resize-y`}
                          />
                        </Field>
                      </div>
                      <div className="col-span-2">
                        <Field label="Attach an existing JD (optional)">
                          <div
                            onClick={() => fileRef.current?.click()}
                            className="h-11 border border-[#e0e2e5] flex items-center px-[13px] gap-3 cursor-pointer hover:border-[#c7cace] transition-colors"
                          >
                            <input ref={fileRef} type="file" name="jd" accept=".pdf,.doc,.docx" className="sr-only"
                              onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "No file chosen · PDF / DOCX, max 5 MB")} />
                            <span className="text-[13px] text-text-muted">📎 Choose file</span>
                            <span className="text-[13px] text-text-muted">{fileName}</span>
                          </div>
                        </Field>
                      </div>
                    </div>

                    {/* Step 3 — About you */}
                    <SectionHead num={3} title="About you" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
                      <Field id="name" label="Full name" required>
                        <input id="name" name="name" required autoComplete="name" className={inputCls} />
                      </Field>
                      <Field id="company" label="Company" required>
                        <input id="company" name="company" required autoComplete="organization" className={inputCls} />
                      </Field>
                      <Field id="email" label="Work email" required>
                        <input id="email" name="email" type="email" required autoComplete="email" className={inputCls} />
                      </Field>
                      <Field id="phone" label="Phone" required>
                        <input id="phone" name="phone" type="tel" required autoComplete="tel" placeholder="+31 …" className={inputCls} />
                      </Field>
                      <div className="col-span-2">
                        <Field id="jobtitle" label="Your role at the company">
                          <input id="jobtitle" name="jobtitle" placeholder="e.g. CPO, HR Manager" className={inputCls} />
                        </Field>
                      </div>

                      {/* Radio groups — styled to match ConsultationModal SegBtn */}
                      <div className="flex flex-col gap-2">
                        <span className="text-[11px] font-semibold text-text-secondary">Best time to call</span>
                        <div className="flex gap-2 flex-wrap">
                          {["Morning", "Afternoon", "Either"].map((v) => {
                            const active = callTime === v.toLowerCase();
                            return (
                              <label key={v} className="inline-flex items-center gap-2 cursor-pointer select-none" style={{ padding: "9px 14px", border: active ? "1.5px solid #ffa300" : "1.5px solid #d5d8dd", borderRadius: 2, fontSize: 13.5, color: active ? "#0f172a" : "#4d5057", boxShadow: active ? "0 0 0 2px rgba(255,163,0,0.14)" : "none", background: "#fff", transition: "all 0.15s ease" }}>
                                <input type="radio" className="sr-only" checked={active} onChange={() => setCallTime(v.toLowerCase())} />
                                <span style={{ width: 16, height: 16, borderRadius: "50%", flexShrink: 0, background: active ? "#ffa300" : "#fff", border: active ? "none" : "1.5px solid #c7cace", display: "flex", alignItems: "center", justifyContent: "center" }} aria-hidden="true">
                                  {active && <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff" }} />}
                                </span>
                                {v}
                              </label>
                            );
                          })}
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="text-[11px] font-semibold text-text-secondary">Preferred contact</span>
                        <div className="flex gap-2 flex-wrap">
                          {["Phone", "Email"].map((v) => {
                            const active = contactPref === v.toLowerCase();
                            return (
                              <label key={v} className="inline-flex items-center gap-2 cursor-pointer select-none" style={{ padding: "9px 14px", border: active ? "1.5px solid #ffa300" : "1.5px solid #d5d8dd", borderRadius: 2, fontSize: 13.5, color: active ? "#0f172a" : "#4d5057", boxShadow: active ? "0 0 0 2px rgba(255,163,0,0.14)" : "none", background: "#fff", transition: "all 0.15s ease" }}>
                                <input type="radio" className="sr-only" checked={active} onChange={() => setContactPref(v.toLowerCase())} />
                                <span style={{ width: 16, height: 16, borderRadius: "50%", flexShrink: 0, background: active ? "#ffa300" : "#fff", border: active ? "none" : "1.5px solid #c7cace", display: "flex", alignItems: "center", justifyContent: "center" }} aria-hidden="true">
                                  {active && <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff" }} />}
                                </span>
                                {v}
                              </label>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Consent */}
                    <div className="mt-6 bg-off-white border border-border p-4">
                      <label className="flex gap-3 items-start cursor-pointer">
                        <input type="checkbox" required className="mt-0.5 w-4 h-4 accent-amber flex-shrink-0" />
                        <span className="text-[13px] text-text-secondary leading-relaxed">
                          I understand my details are shared{" "}
                          <strong className="text-text-primary font-semibold">only with the relevant xentys recruiter</strong>,
                          treated with discretion, and that I can be contacted about this brief.{" "}
                          <Link href="#" className="text-navy font-semibold underline underline-offset-2">Privacy statement →</Link>
                        </span>
                      </label>
                    </div>

                    {/* Submit row */}
                    <div className="flex items-center justify-between gap-4 mt-7 pt-6 border-t border-border flex-wrap">
                      <div className="flex flex-col gap-0.5">
                        <p className="text-[12.5px] text-text-muted">
                          Prefer to call?{" "}
                          <a href="tel:+31702400414" className="text-navy font-bold border-b border-dotted border-navy hover:text-amber-text transition-colors">
                            Dial <strong>070 240 04 14</strong>
                          </a>
                        </p>
                        <p className="text-[12.5px] text-text-muted">
                          Something else?{" "}
                          <Link href="/contact" className="text-navy font-semibold hover:text-amber-text transition-colors">
                            Contact us →
                          </Link>
                        </p>
                      </div>
                      <button type="submit"
                        className="h-11 px-6 bg-amber text-navy font-semibold text-[14px] rounded-[2px] hover:bg-[#e89400] transition-colors whitespace-nowrap">
                        Submit brief →
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                /* ── Success ─────────────────────────────── */
                <div className="py-8">
                  <div className="mb-6 text-[#11723a]">
                    <svg viewBox="0 0 48 48" width="64" height="64" aria-hidden="true">
                      <circle cx="24" cy="24" r="22" fill="none" stroke="currentColor" strokeWidth="2"/>
                      <path d="M14 24l7 7 14-14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h2 className="font-bold text-[32px] text-navy mb-3 tracking-tight">
                    {successName ? `${successName}, we've got your brief.` : "Thanks — we've got your brief."}
                  </h2>
                  <p className="text-[16px] text-text-secondary mb-6">Here's what happens next:</p>
                  <ol className="flex flex-col gap-4 mb-6">
                    {[
                      { day: "Within 1 working day", text: "Your dedicated recruiter reviews your brief and calls you at the preferred time." },
                      { day: "Within 2 working days", text: "You'll have a 30-minute call with Adriaan Brok to confirm fit and dealbreakers." },
                      { day: "Within 10 working days", text: "You receive a written shortlist of 3–5 pre-screened candidates." },
                    ].map((s) => (
                      <li key={s.day} className="pl-5 relative">
                        <span className="absolute left-0 top-1 w-2 h-2 rounded-full bg-amber block" aria-hidden="true" />
                        <span className="text-[11px] font-semibold tracking-[0.12em] uppercase text-amber-text block mb-1">{s.day}</span>
                        <p className="text-[13px] text-text-secondary leading-relaxed" dangerouslySetInnerHTML={{ __html: s.text.replace("Adriaan Brok", "<strong>Adriaan Brok</strong>").replace("3–5 pre-screened candidates", "<strong>3–5 pre-screened candidates</strong>") }} />
                      </li>
                    ))}
                  </ol>
                  <p className="text-[12.5px] text-text-muted mb-8">Your details are shared only with the relevant recruiter and treated with full discretion.</p>
                  <div className="flex gap-3 flex-wrap">
                    <Link href="/" className="h-10 px-5 border border-border text-navy font-semibold text-[14px] rounded-[2px] flex items-center hover:border-[#c7cace] transition-colors">← Back to home</Link>
                    <Link href="/about" className="h-10 px-5 bg-amber text-navy font-semibold text-[14px] rounded-[2px] flex items-center hover:bg-[#e89400] transition-colors">Read how we work →</Link>
                  </div>
                </div>
              )}
            </div>

            {/* ── Sidebar ─────────────────────────────── */}
            <aside className="flex flex-col gap-5 sticky top-24 self-start">

              {/* Recruiter card */}
              <div className="bg-white border border-border p-6">
                <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-amber-text mb-4">You'll work with</p>
                <div className="flex gap-4 items-start">
                  {/* Portrait */}
                  <img
                    src="/images/AdriaanVierkant.avif"
                    alt="Adriaan Brok"
                    className="flex-shrink-0"
                    style={{ width: 80, height: 107, objectFit: "cover", objectPosition: "top center" }}
                  />
                  <div className="min-w-0">
                    <p className="font-bold text-[16px] text-navy mb-0.5">Adriaan Brok</p>
                    <p className="text-[12.5px] text-text-secondary leading-snug">Senior Procurement Recruiter<br />15y · Industry &amp; Construction · 60+ placements</p>
                  </div>
                </div>
                <blockquote className="text-[13px] text-text-secondary leading-relaxed italic mt-4 pt-4 border-t border-border">
                  "I've placed 60+ procurement professionals at manufacturing and construction organisations across the Netherlands. I know this market."
                </blockquote>
                <div className="flex gap-2 mt-4">
                  <a href="tel:+31702400414" className="flex-1 text-[12.5px] font-semibold text-center py-2 px-3 bg-off-white text-navy hover:bg-[#e5e7ea] transition-colors">
                    📞 Call directly
                  </a>
                  <a href="https://linkedin.com" rel="noopener noreferrer" className="flex-1 text-[12.5px] font-semibold text-center py-2 px-3 bg-off-white text-navy hover:bg-[#e5e7ea] transition-colors">
                    LinkedIn →
                  </a>
                </div>
              </div>

              {/* What happens next — navy bg */}
              <div className="bg-navy p-6">
                <p className="text-[11px] font-semibold tracking-[0.14em] uppercase text-amber mb-4">What happens next</p>
                <ol className="flex flex-col gap-4 relative m-0 p-0 list-none" style={{ paddingLeft: 0 }}>
                  {/* Amber timeline line */}
                  <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-amber to-amber/20" aria-hidden="true" />
                  {[
                    { title: "Getting Acquainted",  text: "Recruiter calls at your preferred time." },
                    { title: "Deep Dive",           text: "30-min brief confirmation call." },
                    { title: "The Perfect Match",   text: <><strong className="text-white">3–5 vetted candidates</strong> presented.</> },
                    { title: "Partnering Together", text: "Offer support + onboarding check-ins." },
                  ].map((s) => (
                    <li key={s.title} className="pl-7 relative">
                      <span className="absolute left-0 top-1 w-4 h-4 rounded-full bg-amber border-[3px] border-navy shadow-[0_0_0_2px_#ffa300] block" aria-hidden="true" />
                      <span className="text-[13px] font-semibold text-white block mb-0.5">{s.title}</span>
                      <p className="text-[12px] text-white/60 leading-relaxed m-0">{s.text}</p>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Discretion note */}
              <p className="text-[11.5px] text-text-muted leading-relaxed px-4 py-3 bg-off-white border border-border">
                We treat every enquiry with discretion. Your details are shared only with the relevant recruiter and never with employers or third parties without your consent.
              </p>

            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
