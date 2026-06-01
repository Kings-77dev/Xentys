"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";

type AppType   = "specific" | "open" | null;
type ContactPref = "email" | "phone" | "either";
type FormState = "idle" | "confirmed";

// ── Reused helpers (same pattern as consultation/page.tsx) ───
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

function Field({ id, label, required, optional, children }: {
  id?: string; label: string; required?: boolean; optional?: boolean; children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[11px] font-semibold text-text-secondary">
        {label}
        {required && <span className="text-[#b42318] ml-0.5">*</span>}
        {optional && <span className="font-normal text-text-muted ml-1">(optional)</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls  = "h-11 w-full px-[13px] border border-[#e0e2e5] rounded-[2px] text-[14px] text-text-primary placeholder:text-[#9a9da3] focus:border-navy focus:shadow-[0_0_0_3px_rgba(13,43,85,0.10)] focus:outline-none transition-all";
const selectCls = `${inputCls} appearance-none cursor-pointer bg-[url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236b6f75' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")] bg-no-repeat bg-[right_12px_center]`;

// ── Segment button (Email / Phone / Either) ──────────────────
function SegBtn({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 flex-1 h-11 px-3 text-[13px] font-medium cursor-pointer transition-all duration-150 bg-white"
      style={{
        border: active ? "1.5px solid #ffa300" : "1px solid #e0e2e5",
        boxShadow: active ? "0 0 0 2px rgba(255,163,0,0.14)" : "none",
        color: active ? "#33363c" : "#6b6f75",
      }}
    >
      <span
        className="flex-shrink-0"
        style={{
          width: 20, height: 20, borderRadius: "50%",
          background: active ? "#ffa300" : "#fff",
          border: active ? "none" : "1.5px solid #c7cace",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >
        {active && <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#fff", display: "block" }} />}
      </span>
      {label}
    </button>
  );
}

// ── Page ─────────────────────────────────────────────────────
export default function OpenApplicationPage() {
  const [state,      setState]      = useState<FormState>("idle");
  const [appType,    setAppType]    = useState<AppType>(null);
  const [contact,    setContact]    = useState<ContactPref>("email");
  const [fileName,   setFileName]   = useState("No file chosen  ·  PDF / DOCX, max 10 MB");
  const [firstName,  setFirstName]  = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement)?.value.trim() ?? "";
    setFirstName(name.split(/\s+/)[0]);
    setState("confirmed");
  };

  return (
    <>
      {/* ── Hero ────────────────────────────────────────────── */}
      <section className="bg-navy pt-36 pb-16" aria-labelledby="oa-heading">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-[120px]">
          <nav className="flex items-center gap-2 text-[12px] text-white/50 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white/80 transition-colors">Home</Link>
            <span aria-hidden="true">/</span>
            <span className="text-white/80" aria-current="page">Open Application</span>
          </nav>
          <Eyebrow label="For procurement professionals · ~5 minutes" inv />
          <h1 className="font-bold text-4xl lg:text-5xl tracking-tight text-white mb-3 max-w-2xl" id="oa-heading">
            Apply to xentys
          </h1>
          <p className="text-lg font-semibold text-amber mb-4">
            We represent you, not just your CV.
          </p>
          <p className="text-lg text-white/70 max-w-xl mb-8">
            Tell us what you're looking for and a sector specialist will call you within 1 working day —
            confidential, no employer notified without your consent.
          </p>
          <div className="flex flex-wrap gap-5">
            {["Response within 1 working day", "Fully confidential", "Sector specialist"].map((t) => (
              <span key={t} className="flex items-center gap-2 text-[13px] text-white/70 font-medium">
                <span className="w-4 h-4 rounded-full bg-[rgba(35,189,106,0.18)] text-[#5bd08e] text-[11px] font-bold flex items-center justify-center flex-shrink-0">✓</span>
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Body ────────────────────────────────────────────── */}
      <div className="bg-off-white py-16">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-[120px]">
          <div className="grid lg:grid-cols-[1fr_360px] gap-12 items-start">

            {/* ── Main form ──────────────────────────────────── */}
            <div className="bg-white border border-border p-10">

              {state === "idle" ? (
                <>
                  {/* Step 1 — How would you like to engage? */}
                  <SectionHead num={1} title="How would you like to engage?" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-2">
                    {[
                      { id: "specific" as const, label: "I have a specific role in mind",       tagLabel: "Specific role",    tagClass: "bg-[#f0fdf4] text-[#166534]" },
                      { id: "open"     as const, label: "I'm open to procurement opportunities", tagLabel: "Open application", tagClass: "bg-[#eff6ff] text-[#1e40af]" },
                    ].map((t) => {
                      const active = appType === t.id;
                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setAppType(t.id)}
                          className="text-left p-[18px] border transition-all duration-150 cursor-pointer bg-white"
                          style={{
                            borderColor: active ? "#ffa300" : "#e0e2e5",
                            borderWidth: active ? 2 : 1,
                            boxShadow: active ? "0 0 0 3px rgba(255,163,0,0.14)" : "none",
                            minHeight: 80,
                          }}
                          aria-pressed={active}
                        >
                          <span className="w-5 h-5 rounded-full border-2 flex items-center justify-center mb-3 transition-all duration-150"
                            style={{ borderColor: active ? "#ffa300" : "#c7cace", background: active ? "#ffa300" : "#fff" }} aria-hidden="true">
                            {active && <span className="w-2.5 h-2.5 rounded-full bg-white block" />}
                          </span>
                          <span className={`text-[11px] font-semibold px-2 py-0.5 mb-2 inline-block ${t.tagClass}`}>
                            {t.tagLabel}
                          </span>
                          <h3 className="font-semibold text-[14px] text-navy">{t.label}</h3>
                        </button>
                      );
                    })}
                  </div>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-0" noValidate>

                    {/* Step 2 — What you're looking for */}
                    <SectionHead num={2} title="What you're looking for" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
                      <Field id="role-title" label="Role title or vacancy URL" optional>
                        <input id="role-title" name="roleTitle" type="text"
                          placeholder="Vacancy or role title you're applying for"
                          className={inputCls} />
                      </Field>
                      <Field id="jobtitle" label="Current job title" required>
                        <input id="jobtitle" name="jobtitle" type="text" required
                          placeholder="e.g. Senior Buyer" className={inputCls} />
                      </Field>
                      <Field id="seniority" label="Seniority level">
                        <select id="seniority" name="seniority" className={selectCls}>
                          <option value="">Tactical / Strategic / Management / Senior</option>
                          <option>Tactical</option>
                          <option>Strategic</option>
                          <option>Management</option>
                          <option>Senior</option>
                        </select>
                      </Field>
                      <Field id="sector" label="Preferred sector">
                        <select id="sector" name="sector" className={selectCls}>
                          <option value="">No preference</option>
                          <option>Industry &amp; Manufacturing</option>
                          <option>Construction &amp; Infrastructure</option>
                          <option>Offshore &amp; Energy</option>
                          <option>Other</option>
                        </select>
                      </Field>
                      <Field id="role-type" label="Role type interest">
                        <select id="role-type" name="roleType" className={selectCls}>
                          <option value="">Open to all</option>
                          <option>Permanent</option>
                          <option>Interim</option>
                          <option>Secondment</option>
                        </select>
                      </Field>
                      <Field id="start" label="Earliest start">
                        <select id="start" name="start" className={selectCls}>
                          <option value="">Choose…</option>
                          <option>Immediately</option>
                          <option>Within 1 month</option>
                          <option>1–3 months</option>
                          <option>Flexible</option>
                        </select>
                      </Field>
                      <div className="col-span-2">
                        <Field id="salary" label="Salary / rate expectation" optional>
                          <input id="salary" name="salary" type="text"
                            placeholder="What you're looking for" className={inputCls} />
                        </Field>
                      </div>
                      <div className="col-span-2">
                        <Field label="Upload your CV" required>
                          <div
                            onClick={() => fileRef.current?.click()}
                            className="h-[52px] border border-dashed border-[#e0e2e5] flex items-center px-[13px] gap-3 cursor-pointer hover:border-[#c7cace] transition-colors"
                          >
                            <input ref={fileRef} type="file" name="cv" accept=".pdf,.doc,.docx" className="sr-only"
                              onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "No file chosen  ·  PDF / DOCX, max 10 MB")} />
                            <span className="text-[13px] text-text-muted">📎  Upload CV  ·  {fileName}</span>
                          </div>
                        </Field>
                      </div>
                    </div>

                    {/* Step 3 — Contact details */}
                    <SectionHead num={3} title="Contact details" />
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-4">
                      <Field id="name" label="Full name" required>
                        <input id="name" name="name" type="text" required autoComplete="name"
                          placeholder="Your full name" className={inputCls} />
                      </Field>
                      <Field id="email" label="Email" required>
                        <input id="email" name="email" type="email" required autoComplete="email"
                          placeholder="your@email.com" className={inputCls} />
                      </Field>
                      <Field id="phone" label="Phone" required>
                        <input id="phone" name="phone" type="tel" required autoComplete="tel"
                          placeholder="+31 ..." className={inputCls} />
                      </Field>
                      <Field id="linkedin" label="LinkedIn" optional>
                        <input id="linkedin" name="linkedin" type="url"
                          placeholder="linkedin.com/in/yourname" className={inputCls} />
                      </Field>
                      <div className="col-span-2">
                        <Field label="Preferred contact method">
                          <div className="flex gap-2">
                            <SegBtn label="Email"  active={contact === "email"}  onClick={() => setContact("email")}  />
                            <SegBtn label="Phone"  active={contact === "phone"}  onClick={() => setContact("phone")}  />
                            <SegBtn label="Either" active={contact === "either"} onClick={() => setContact("either")} />
                          </div>
                        </Field>
                      </div>
                    </div>

                    {/* Consent */}
                    <div className="mt-6 bg-off-white border border-border p-4">
                      <label className="flex gap-3 items-start cursor-pointer">
                        <input type="checkbox" required className="mt-0.5 w-4 h-4 accent-amber flex-shrink-0" />
                        <span className="text-[13px] text-text-secondary leading-relaxed">
                          My CV and details will be reviewed in confidence by a xentys recruiter and{" "}
                          <strong className="text-text-primary font-semibold">not shared with any employer without my explicit consent.</strong>
                          {" "}<Link href="#" className="text-navy font-semibold underline underline-offset-2">Privacy statement →</Link>
                        </span>
                      </label>
                    </div>

                    {/* Submit row */}
                    <div className="flex items-center justify-between gap-4 mt-7 pt-6 border-t border-border flex-wrap">
                      <p className="text-[12.5px] text-text-muted">
                        Prefer to call?{" "}
                        <a href="tel:+31702400414" className="text-navy font-bold border-b border-dotted border-navy">
                          Dial <strong>070 240 04 14</strong>
                        </a>
                      </p>
                      <button type="submit"
                        className="h-11 px-6 bg-amber text-navy font-semibold text-[15px] rounded-[2px] hover:bg-[#e89400] transition-colors">
                        Submit application →
                      </button>
                    </div>
                  </form>
                </>
              ) : (
                /* Success state */
                <div className="py-8">
                  <div className="mb-6 text-[#11723a]">
                    <svg viewBox="0 0 48 48" width="64" height="64" aria-hidden="true">
                      <circle cx="24" cy="24" r="22" fill="none" stroke="currentColor" strokeWidth="2"/>
                      <path d="M14 24l7 7 14-14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <h2 className="font-bold text-[32px] text-navy mb-3 tracking-tight">
                    {firstName ? `Thanks, ${firstName} — we've received your application.` : "Thanks — we've received your application."}
                  </h2>
                  <p className="text-[16px] text-text-secondary leading-relaxed mb-8">
                    Adriaan Brok will review your profile and be in touch within 1 working day.
                    Your details stay confidential — no employer is contacted without your consent.
                  </p>
                  <div className="flex gap-3 flex-wrap">
                    <Link href="/vacancies" className="h-10 px-5 bg-amber text-navy font-semibold text-[14px] rounded-[2px] flex items-center hover:bg-[#e89400] transition-colors">
                      Browse open roles →
                    </Link>
                    <Link href="/" className="h-10 px-5 border border-border text-navy font-semibold text-[14px] rounded-[2px] flex items-center hover:border-[#c7cace] transition-colors">
                      ← Back to home
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* ── Sidebar ─────────────────────────────────────── */}
            <aside className="flex flex-col gap-5 sticky top-24 self-start">

              {/* Recruiter card */}
              <div className="bg-white border border-border p-6" style={{ borderTop: "3px solid #ffa300" }}>
                <div className="flex items-start gap-4 mb-4">
                  {/* Portrait placeholder (3:4) */}
                  <div
                    className="flex-shrink-0 flex items-center justify-center text-white font-bold text-[18px]"
                    style={{ width: 64, height: 85, background: "linear-gradient(180deg, #c7cace, #8a8e94)" }}
                    aria-hidden="true"
                  >
                    AB
                  </div>
                  <div>
                    <p className="font-bold text-[16px] text-navy">Adriaan Brok</p>
                    <p className="text-[12px] text-text-secondary mt-0.5">Senior Procurement Recruiter</p>
                    <p className="text-[11px] text-text-muted mt-0.5">15 years · Industry &amp; Construction</p>
                  </div>
                </div>
                <div className="h-px bg-off-white mb-4" />
                <p className="text-[13px] text-text-secondary leading-relaxed italic mb-4">
                  "We don't forward CVs to employers. We meet you first, understand what you actually want,
                  and only then match you to roles that genuinely fit."
                </p>
                <div className="h-px bg-off-white mb-4" />
                <div className="flex flex-col gap-2 text-[13px] font-semibold text-navy mb-3">
                  <span>📞 +31 6 28 57 14 83</span>
                  <span>✉ adriaan.brok@xentys.nl</span>
                  <a href="https://linkedin.com" rel="noopener noreferrer" className="hover:text-amber-text transition-colors">LinkedIn →</a>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 bg-[#e0f5e5] border-l-[3px] border-[#125e2e] text-[12px] font-semibold text-[#125e2e]">
                  Response within 1 working day
                </div>
              </div>

              {/* Post-apply timeline — navy bg, matches consultation page */}
              <div className="bg-navy p-6">
                <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-amber mb-4">
                  What happens after you apply
                </p>
                <ol className="flex flex-col relative list-none m-0 p-0" style={{ gap: "0" }}>
                  {/* Amber gradient line down the left */}
                  <div className="absolute left-[7px] top-3 bottom-3 w-0.5 bg-gradient-to-b from-amber to-amber/20" aria-hidden="true" />
                  {[
                    { title: "CV Review",               desc: "We assess your profile and experience." },
                    { title: "Discovery Call",           desc: "A short conversation about your goals, preferences, and opportunities." },
                    { title: "Targeted Introductions",   desc: "Matched to relevant roles with your consent every time." },
                  ].map((s) => (
                    <li key={s.title} className="pl-7 relative pb-5 last:pb-0">
                      <span className="absolute left-0 top-1 w-4 h-4 rounded-full bg-amber border-[3px] border-navy shadow-[0_0_0_2px_#ffa300] block" aria-hidden="true" />
                      <span className="text-[11px] font-semibold tracking-[0.08em] uppercase text-amber block mb-0.5">{s.title}</span>
                      <p className="text-[12px] text-white/65 leading-relaxed m-0">{s.desc}</p>
                    </li>
                  ))}
                </ol>
              </div>

            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
