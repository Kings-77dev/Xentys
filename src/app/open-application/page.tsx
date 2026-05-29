"use client";
import { useState } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { FileUpload } from "@/components/ui/FileUpload";
import { LinkButton } from "@/components/ui/Button";

export default function OpenApplicationPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <section className="bg-navy pt-36 pb-16" aria-labelledby="oa-heading">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-[120px]">
          <Eyebrow label="For Professionals" inv />
          <h1 className="font-bold text-4xl lg:text-5xl tracking-tight text-white mb-4 max-w-2xl" id="oa-heading">
            Not seeing the right vacancy? Register and we'll represent you.
          </h1>
          <p className="text-lg text-white/70 max-w-xl">We take your profile directly to clients in industrial, construction, and offshore — proactively, not reactively.</p>
        </div>
      </section>

      <div className="max-w-[1280px] mx-auto px-6 lg:px-[120px] py-16">
        <div className="grid lg:grid-cols-[1fr_340px] gap-16 items-start">
          <div>
            {!submitted ? (
              <div className="bg-white border border-border rounded-none p-12">
                <h2 className="font-semibold text-2xl text-text-primary mb-2">Register your profile</h2>
                <p className="text-base text-text-secondary mb-8">Takes about 3 minutes. Everything you share goes directly to one of our consultants.</p>
                <form className="flex flex-col gap-6" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[{ id: "oa-first", label: "First name", ph: "Sarah", auto: "given-name" }, { id: "oa-last", label: "Last name", ph: "Maassen", auto: "family-name" }].map((f) => (
                      <div key={f.id} className="flex flex-col gap-2">
                        <label htmlFor={f.id} className="text-sm font-semibold text-text-primary">{f.label} <span className="text-red-500">*</span></label>
                        <input id={f.id} required autoComplete={f.auto} placeholder={f.ph} className="h-12 px-4 rounded-[2px] border-[1.5px] border-border focus:border-amber focus:outline-none text-sm transition-colors" />
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="oa-email" className="text-sm font-semibold text-text-primary">Email <span className="text-red-500">*</span></label>
                    <input id="oa-email" type="email" required autoComplete="email" placeholder="sarah@example.com" className="h-12 px-4 rounded-[2px] border-[1.5px] border-border focus:border-amber focus:outline-none text-sm transition-colors" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="oa-phone" className="text-sm font-semibold text-text-primary">Phone <span className="text-red-500">*</span></label>
                    <input id="oa-phone" type="tel" required autoComplete="tel" placeholder="+31 6 …" className="h-12 px-4 rounded-[2px] border-[1.5px] border-border focus:border-amber focus:outline-none text-sm transition-colors" />
                  </div>
                  {[
                    { id: "oa-spec", label: "Specialism", opts: ["Tactical Buyer", "Strategic Buyer", "Category Manager", "Procurement Manager", "Supply Chain", "Other"] },
                    { id: "oa-level", label: "Seniority level", opts: ["Junior (0–3 years)", "Medior (3–7 years)", "Senior (7+ years)", "Management / Leadership"] },
                    { id: "oa-avail", label: "Availability", opts: ["Immediately", "Within 1 month", "Within 3 months", "Passively open — not urgently looking"] },
                  ].map(({ id, label, opts }) => (
                    <div key={id} className="flex flex-col gap-2">
                      <label htmlFor={id} className="text-sm font-semibold text-text-primary">{label} <span className="text-red-500">*</span></label>
                      <select id={id} required className="h-12 px-4 rounded-[2px] border-[1.5px] border-border focus:border-amber focus:outline-none text-sm transition-colors appearance-none bg-white"
                        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 16px center" }}>
                        <option value="">Select…</option>
                        {opts.map((o) => <option key={o}>{o}</option>)}
                      </select>
                    </div>
                  ))}
                  <fieldset>
                    <legend className="text-sm font-semibold text-text-primary mb-3">Preferred sectors <span className="font-normal text-text-muted">(select all that apply)</span></legend>
                    <div className="flex flex-wrap gap-4">
                      {["Industry", "Construction", "Offshore", "Energy", "Maritime"].map((s) => (
                        <label key={s} className="flex items-center gap-2 cursor-pointer text-sm text-text-secondary">
                          <input type="checkbox" name="sector" value={s.toLowerCase()} className="accent-amber" />{s}
                        </label>
                      ))}
                    </div>
                  </fieldset>
                  <fieldset>
                    <legend className="text-sm font-semibold text-text-primary mb-3">Preferred placement type <span className="font-normal text-text-muted">(select all that apply)</span></legend>
                    <div className="flex flex-wrap gap-4">
                      {["Permanent", "Interim", "Secondment"].map((t) => (
                        <label key={t} className="flex items-center gap-2 cursor-pointer text-sm text-text-secondary">
                          <input type="checkbox" name="placement" value={t.toLowerCase()} className="accent-amber" />{t}
                        </label>
                      ))}
                    </div>
                  </fieldset>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-text-primary">CV / Profile <span className="text-red-500">*</span></label>
                    <FileUpload id="oa-cv" name="cv" required />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="oa-notes" className="text-sm font-semibold text-text-primary">Anything else to share? <span className="font-normal text-text-muted">(optional)</span></label>
                    <textarea id="oa-notes" rows={3} className="px-4 py-3 rounded-[2px] border-[1.5px] border-border focus:border-amber focus:outline-none text-sm transition-colors resize-y" placeholder="Salary expectations, types of roles you're interested in, any constraints…" />
                  </div>
                  <button type="submit" className="w-full h-12 bg-amber text-navy font-semibold rounded-[2px] hover:bg-[#e8970a] transition-all duration-[200ms]">Register my profile →</button>
                  <p className="text-xs text-text-muted text-center">Your details are handled in accordance with our <a href="#" className="underline underline-offset-2 text-amber-text">privacy policy</a>.</p>
                </form>
              </div>
            ) : (
              <div className="flex flex-col gap-4 p-12 bg-off-white rounded-none border border-border">
                <div className="w-14 h-14 bg-amber/10 rounded-none flex items-center justify-center text-amber-text">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <h2 className="font-semibold text-2xl text-text-primary">We've received your profile</h2>
                <p className="text-base text-text-secondary">One of our consultants will review your details and be in touch within 1 working day. We'll always give you honest feedback — whatever the outcome.</p>
                <LinkButton href="/vacancies" variant="ghost" className="self-start">Browse open vacancies →</LinkButton>
              </div>
            )}
          </div>

          <aside className="flex flex-col gap-6 sticky top-20">
            <div className="bg-navy rounded-none p-8">
              <h2 className="font-semibold text-lg text-white mb-5">What happens next</h2>
              {[
                { n: "1", t: "We review your profile", d: "A consultant reviews your background — usually within 1 working day." },
                { n: "2", t: "We call you", d: "A brief call to understand your situation and what you're looking for." },
                { n: "3", t: "We take your profile to clients", d: "We approach relevant clients proactively — not just when a vacancy appears." },
                { n: "4", t: "Honest feedback throughout", d: "You'll hear from us at every step. No silence, no guessing." },
              ].map(({ n, t, d }) => (
                <div key={n} className="flex gap-4 items-start mb-4 last:mb-0">
                  <div className="w-7 h-7 rounded-full bg-amber flex items-center justify-center text-navy font-semibold text-xs flex-shrink-0">{n}</div>
                  <div><strong className="block font-semibold text-sm text-white mb-1">{t}</strong><span className="text-sm text-white/65">{d}</span></div>
                </div>
              ))}
            </div>
            <div className="bg-off-white rounded-none p-6 border border-border">
              <h3 className="font-semibold text-base text-text-primary mb-2">Already see a vacancy you like?</h3>
              <p className="text-sm text-text-secondary mb-4">You can apply for a specific role directly, or register here for proactive representation — or both.</p>
              <LinkButton href="/vacancies" variant="ghost" className="w-full justify-center">Browse vacancies →</LinkButton>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
