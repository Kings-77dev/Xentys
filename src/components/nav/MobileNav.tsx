"use client";
import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { LinkButton } from "@/components/ui/Button";

interface MobileNavProps {
  open: boolean;
  onClose: () => void;
  lang: "EN" | "NL";
  setLang: (l: "EN" | "NL") => void;
  onRequestConsultation: () => void;
}

function Accordion({ label, children }: { label: string; children: React.ReactNode }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="border-b border-white/10">
      <button
        className="flex items-center justify-between w-full py-4 text-left font-semibold text-lg text-white"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
      >
        {label}
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          className={cn("transition-transform duration-150 flex-shrink-0", expanded && "rotate-180")} aria-hidden="true">
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      {expanded && <div className="flex flex-col gap-1 pb-4">{children}</div>}
    </div>
  );
}

export function MobileNav({ open, onClose, lang, setLang, onRequestConsultation }: MobileNavProps) {
  return (
    <div className={cn(
      "fixed inset-0 z-30 bg-navy overflow-y-auto transition-opacity duration-200",
      open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
    )}>
      <div className="px-6 pt-24 pb-8 flex flex-col gap-2">
        <Accordion label="For Employers">
          {["Permanent Recruitment", "Interim Inkoop", "Detachering", "Executive Search"].map((s) => (
            <Link key={s} href="/about#services" onClick={onClose}
              className="px-4 py-3 rounded-[2px] text-white/80 hover:bg-white/8 hover:text-white transition-colors">{s}</Link>
          ))}
          <Link href="/contact" onClick={onClose}
            className="px-4 py-3 rounded-[2px] text-white/80 hover:bg-white/8 hover:text-white transition-colors">Customer Cases</Link>
        </Accordion>
        <Accordion label="For Candidates">
          <Link href="/vacancies" onClick={onClose} className="px-4 py-3 rounded-[2px] text-white/80 hover:bg-white/8 hover:text-white transition-colors">Browse Vacancies</Link>
          <Link href="#" onClick={onClose} className="px-4 py-3 rounded-[2px] text-white/80 hover:bg-white/8 hover:text-white transition-colors">Subscribe for Newsletter</Link>
          <Link href="/contact" onClick={onClose}
            className="px-4 py-3 rounded-[2px] text-white/80 hover:bg-white/8 hover:text-white transition-colors">Customer Cases</Link>
        </Accordion>
        <Link href="/about" onClick={onClose} className="py-4 font-semibold text-lg text-white border-b border-white/10">About</Link>
        <Accordion label="Insights">
          {[
            { href: "/contact", label: "Case Studies" },
            { href: "/contact", label: "Procurement Guide" },
            { href: "/contact", label: "Salary Benchmark" },
            { href: "/contact", label: "Market Updates" },
          ].map(({ href, label }) => (
            <Link key={label} href={href} onClick={onClose}
              className="px-4 py-3 rounded-[2px] text-white/80 hover:bg-white/8 hover:text-white transition-colors">{label}</Link>
          ))}
        </Accordion>

        <div className="flex flex-col gap-3 mt-6">
          <button
            type="button"
            onClick={() => { onClose(); onRequestConsultation(); }}
            className="inline-flex items-center justify-center w-full px-5 py-[10px] rounded-[2px] text-[13px] font-semibold tracking-[0.01em] bg-amber text-navy hover:bg-[#e8970a] transition-all duration-[200ms]"
          >
            Share a vacancy brief →
          </button>
          <LinkButton href="/vacancies" variant="ghost-inv" className="justify-center" onClick={onClose}>Browse vacancies</LinkButton>
        </div>

        <div className="flex items-center gap-2 mt-4">
          {(["EN", "NL"] as const).map((l) => (
            <button key={l} onClick={() => setLang(l)}
              className={cn("px-3 py-1 rounded text-xs font-semibold tracking-widest transition-colors",
                lang === l ? "bg-white/10 text-white" : "text-white/50 hover:text-white")}>
              {l}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
