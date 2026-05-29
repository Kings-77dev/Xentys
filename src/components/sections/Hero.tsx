"use client";
import { useState } from "react";
import { LinkButton, Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import Link from "next/link";

export function Hero() {
  const [modal, setModal] = useState<"hire" | "candidate" | null>(null);

  return (
    <>
      <section className="bg-navy pt-40 pb-24 overflow-hidden" aria-labelledby="hero-heading">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-[120px]">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h1 className="font-bold text-5xl lg:text-6xl leading-tight tracking-[-0.56px] text-white mb-6" id="hero-heading">
                Procurement recruitment<br />done with <span className="text-amber">precision.</span>
              </h1>
              <p className="text-lg text-white/75 mb-10 max-w-lg">
                We recruit exclusively in procurement and supply chain — for industrial, construction, and offshore organisations in the Netherlands. Since 2010.
              </p>
              <div className="flex flex-wrap gap-4 mb-12">
                <Button variant="primary" onClick={() => setModal("hire")}>I need to hire →</Button>
                <Button variant="ghost-inv" onClick={() => setModal("candidate")}>I want a role</Button>
              </div>
              <div className="flex flex-wrap gap-4 items-center pt-8 border-t border-white/12" aria-label="Key facts">
                {["15+ Years specialist focus", "Procurement only", "3–5 vetted candidates", "1-day response"].map((item, i) => (
                  <div key={item} className="flex items-center gap-3">
                    {i > 0 && <span className="w-1 h-1 rounded-full bg-amber" aria-hidden="true" />}
                    <span className="text-xs font-semibold tracking-wider text-white/60 uppercase">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div aria-hidden="true">
              <div className="w-full aspect-[4/5] bg-white/6 rounded-3xl border border-white/10 flex flex-col items-center justify-center gap-3 text-white/30">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
                </svg>
                <span className="text-sm text-center px-8">Photo: recruiter in conversation, warm office setting</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client modal */}
      <Modal open={modal === "hire"} onClose={() => setModal(null)} title="Looking to hire a procurement specialist?">
        <h2 className="font-bold text-3xl tracking-tight text-text-primary mb-3">Looking to hire a procurement specialist?</h2>
        <p className="text-base text-text-secondary mb-8">We recruit exclusively in procurement and supply chain — and we keep it simple. Tell us what you need, and we'll come back to you within one working day with a clear plan.</p>
        <div className="flex flex-col gap-3">
          <LinkButton href="/consultation" variant="primary" className="justify-center" onClick={() => setModal(null)}>Submit a vacancy →</LinkButton>
          <LinkButton href="/about#services" variant="ghost" className="justify-center" onClick={() => setModal(null)}>Explore our services</LinkButton>
        </div>
      </Modal>

      {/* Candidate modal */}
      <Modal open={modal === "candidate"} onClose={() => setModal(null)} title="Ready for your next procurement role?">
        <h2 className="font-bold text-3xl tracking-tight text-text-primary mb-3">Ready for your next procurement role?</h2>
        <p className="text-base text-text-secondary mb-8">We don't just forward your CV — we represent you. We take your profile directly to clients in industrial, construction, and offshore, and give you honest feedback throughout.</p>
        <div className="flex flex-col gap-3">
          <LinkButton href="/vacancies" variant="primary" className="justify-center" onClick={() => setModal(null)}>Browse vacancies →</LinkButton>
          <LinkButton href="/open-application" variant="ghost" className="justify-center" onClick={() => setModal(null)}>Register your profile</LinkButton>
        </div>
      </Modal>
    </>
  );
}
