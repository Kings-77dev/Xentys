"use client";
import { useState } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { LinkButton } from "@/components/ui/Button";

type FormState = "idle" | "confirmed";

export default function ConsultationPage() {
  const [state, setState] = useState<FormState>("idle");

  return (
    <>
      <section className="bg-navy pt-36 pb-16" aria-labelledby="consult-heading">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-[120px]">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber/15 rounded-none text-amber text-xs font-semibold tracking-widest uppercase mb-6">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.39 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.4a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            For hiring managers
          </div>
          <h1 className="font-bold text-4xl lg:text-5xl tracking-tight text-white mb-4 max-w-2xl" id="consult-heading">
            Tell us what you need. We'll take it from there.
          </h1>
          <p className="text-lg text-white/70 max-w-xl mb-10">Submit your brief below. A consultant will call you within one working day — no obligation, no pushy follow-up.</p>
          <div className="flex flex-wrap gap-6 text-sm text-white/70">
            {["Fixed fee, agreed upfront", "One named recruiter throughout", "1 working day response"].map((t) => (
              <span key={t} className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffa300" strokeWidth="2" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-[1280px] mx-auto px-6 lg:px-[120px] py-16">
        <div className="grid lg:grid-cols-[1fr_380px] gap-16 items-start">

          {/* Form */}
          <div>
            {state === "idle" ? (
              <div className="bg-white border border-border rounded-none p-12">
                <h2 className="font-semibold text-2xl text-text-primary mb-2">Your brief</h2>
                <p className="text-base text-text-secondary mb-8">Takes about 2 minutes. The more context you give, the better our first conversation will be.</p>
                <form className="flex flex-col gap-6" onSubmit={(e) => { e.preventDefault(); setState("confirmed"); }}>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[{ id: "c-name", label: "Your name", ph: "Thomas van der Berg", auto: "name" }, { id: "c-co", label: "Company", ph: "Acme Industrial BV", auto: "organization" }].map((f) => (
                      <div key={f.id} className="flex flex-col gap-2">
                        <label htmlFor={f.id} className="text-sm font-semibold text-text-primary">{f.label} <span className="text-red-500">*</span></label>
                        <input id={f.id} required autoComplete={f.auto} placeholder={f.ph} className="h-12 px-4 rounded-[2px] border-[1.5px] border-border focus:border-amber focus:outline-none text-sm transition-colors" />
                      </div>
                    ))}
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[{ id: "c-title", label: "Your job title", ph: "Procurement Director", auto: "organization-title" }, { id: "c-email", label: "Work email", ph: "thomas@acme.nl", auto: "email", type: "email" }].map((f) => (
                      <div key={f.id} className="flex flex-col gap-2">
                        <label htmlFor={f.id} className="text-sm font-semibold text-text-primary">{f.label} <span className="text-red-500">*</span></label>
                        <input id={f.id} type={f.type ?? "text"} required autoComplete={f.auto} placeholder={f.ph} className="h-12 px-4 rounded-[2px] border-[1.5px] border-border focus:border-amber focus:outline-none text-sm transition-colors" />
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="c-phone" className="text-sm font-semibold text-text-primary">Phone <span className="text-red-500">*</span></label>
                    <input id="c-phone" type="tel" required autoComplete="tel" placeholder="+31 6 …" className="h-12 px-4 rounded-[2px] border-[1.5px] border-border focus:border-amber focus:outline-none text-sm transition-colors" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="c-role" className="text-sm font-semibold text-text-primary">Role to fill <span className="text-red-500">*</span></label>
                    <input id="c-role" required placeholder="e.g. Senior Buyer, Category Manager, CPO" className="h-12 px-4 rounded-[2px] border-[1.5px] border-border focus:border-amber focus:outline-none text-sm transition-colors" />
                  </div>
                  <fieldset>
                    <legend className="text-sm font-semibold text-text-primary mb-3">Placement type <span className="text-red-500">*</span></legend>
                    <div className="flex flex-wrap gap-4">
                      {["Permanent", "Interim", "Secondment", "Executive Search"].map((t) => (
                        <label key={t} className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="placement" value={t.toLowerCase()} required className="accent-amber" />
                          <span className="text-sm text-text-secondary">{t}</span>
                        </label>
                      ))}
                    </div>
                  </fieldset>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="c-timeline" className="text-sm font-semibold text-text-primary">Timeline <span className="text-red-500">*</span></label>
                    <select id="c-timeline" required className="h-12 px-4 rounded-[2px] border-[1.5px] border-border focus:border-amber focus:outline-none text-sm transition-colors appearance-none bg-white"
                      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 16px center" }}>
                      <option value="">When do you need this person?</option>
                      <option>As soon as possible</option>
                      <option>Within 1 month</option>
                      <option>Within 3 months</option>
                      <option>Planning ahead</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="c-notes" className="text-sm font-semibold text-text-primary">Additional context <span className="font-normal text-text-muted">(optional)</span></label>
                    <textarea id="c-notes" rows={4} className="px-4 py-3 rounded-[2px] border-[1.5px] border-border focus:border-amber focus:outline-none text-sm transition-colors resize-y" placeholder="Sector, team size, seniority, any context that'll help us prepare for the call…" />
                  </div>
                  <button type="submit" className="w-full h-12 bg-amber text-navy font-semibold rounded-[2px] hover:bg-[#e8970a] transition-all duration-[200ms]">Submit brief →</button>
                  <p className="text-xs text-text-muted text-center">Your details are handled in accordance with our <a href="#" className="underline underline-offset-2 text-amber-text">privacy policy</a>.</p>
                </form>
              </div>
            ) : (
              <div className="flex flex-col gap-4 p-12 bg-off-white rounded-none border border-border">
                <div className="w-14 h-14 bg-amber/10 rounded-none flex items-center justify-center text-amber-text">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <h2 className="font-semibold text-2xl text-text-primary">We'll call you within 1 working day</h2>
                <p className="text-base text-text-secondary">One of our consultants will send you a confirmation email with their direct contact details. No waiting rooms, no support tickets.</p>
                <LinkButton href="/about" variant="ghost" className="self-start">Meet the team →</LinkButton>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="flex flex-col gap-6 sticky top-20" aria-label="What happens next">
            <div className="bg-navy rounded-none p-8">
              <h2 className="font-semibold text-lg text-white mb-6">What happens next</h2>
              {[
                { n: "1", t: "We call you within 1 working day", d: "No automated emails. A real consultant calls you directly." },
                { n: "2", t: "We discuss your brief in detail", d: "20–30 minutes to understand the role, team, and what good looks like." },
                { n: "3", t: "We begin search with your approval", d: "We only proceed when you're comfortable. No surprises, no hidden commitments." },
              ].map(({ n, t, d }) => (
                <div key={n} className="flex gap-4 items-start mb-5 last:mb-0">
                  <div className="w-7 h-7 rounded-full bg-amber flex items-center justify-center text-navy font-semibold text-xs flex-shrink-0">{n}</div>
                  <div><strong className="block font-semibold text-sm text-white mb-1">{t}</strong><span className="text-sm text-white/65">{d}</span></div>
                </div>
              ))}
              <div className="flex items-center gap-3 mt-6 pt-6 border-t border-white/10">
                <div className="flex">
                  {["MS", "AU", "AB"].map((i, idx) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-white/15 border-2 border-navy flex items-center justify-center text-white font-semibold text-xs" style={{ marginLeft: idx > 0 ? "-8px" : "0" }}>{i}</div>
                  ))}
                </div>
                <p className="text-sm text-white/70">Our consultants · <LinkButton href="/about" variant="link" className="text-amber text-sm p-0 font-normal no-underline">Meet the team →</LinkButton></p>
              </div>
            </div>
            <div className="bg-off-white rounded-none p-6 border border-border border-l-4 border-l-amber">
              <h3 className="font-semibold text-base text-text-primary mb-2">Fixed fee. No surprises.</h3>
              <p className="text-sm text-text-secondary">Fee agreed upfront before any search begins. No percentage-of-salary surprises, no hidden costs.</p>
            </div>
            <div className="bg-off-white rounded-none p-6 border border-border">
              <h3 className="font-semibold text-base text-text-primary mb-2">3-month replacement guarantee</h3>
              <p className="text-sm text-text-secondary">If a permanent placement doesn't work out within 3 months, we search again at no additional fee.</p>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
