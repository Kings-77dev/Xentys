"use client";

import { useState } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";

const sectors = [
  {
    num: "01",
    title: "Industry & Manufacturing",
    desc: "Procurement roles across production, engineering and technical operations. We know the demands of high-volume sourcing, complex supplier networks and the drive for operational efficiency.",
    roles: ["Strategic Buyer", "Category Mgr", "CPO", "Supply Chain Analyst"],
  },
  {
    num: "02",
    title: "Construction & Infrastructure",
    desc: "Specialists for contractors, developers and complex project environments. Procurement in construction moves fast — we place people who can keep it moving.",
    roles: ["Project Buyer", "Sourcing Mgr", "Contract Mgr", "Procurement Lead"],
  },
  {
    num: "03",
    title: "Offshore & Energy",
    desc: "Procurement expertise for marine, offshore and energy organisations. We understand the compliance demands, the global supply chains and the urgency that comes with the territory.",
    roles: ["Procurement Mgr", "Supply Chain Lead", "Category Specialist"],
  },
  {
    num: "04",
    title: "High-Tech",
    desc: "Specialists for fast-moving, technical and innovation-led businesses. Procurement in high-tech demands agility and technical literacy — we find people who bring both.",
    roles: ["Tactical Buyer", "Supply Chain", "Commodity Mgr", "Sourcing Engineer"],
  },
];

export function SectorsFeature() {
  const [active, setActive] = useState(0);
  const s = sectors[active];

  return (
    <section className="py-[88px] bg-white border-t border-border" aria-labelledby="sf-heading">
      <style>{`
        @keyframes sf-fade-in {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: none; }
        }
        .sf-panel-enter { animation: sf-fade-in 220ms cubic-bezier(0.2, 0.8, 0.2, 1) both; }
      `}</style>

      <div className="max-w-[1280px] mx-auto px-6 lg:px-[120px]">
        {/* Section head */}
        <div className="max-w-[680px] mb-10">
          <Eyebrow label="Sectors we know" />
          <h2
            id="sf-heading"
            className="font-bold text-[32px] text-navy tracking-tight mt-3 mb-3"
          >
            Sector knowledge that goes beyond recruitment.
          </h2>
          <p className="text-[16px] text-text-secondary leading-relaxed">
            We specialise where procurement is most demanding — four sectors we know from the inside.
          </p>
        </div>

        {/* Tabs box */}
        <div className="grid lg:grid-cols-[280px_1fr] border border-border">

          {/* Left rail — equal-height rows via flex-1 */}
          <div className="relative bg-off-white border-b lg:border-b-0 lg:border-r border-border flex lg:flex-col h-full">

            {/* Sliding amber indicator (desktop only) */}
            <div
              className="hidden lg:block absolute left-0 w-[3px] bg-amber pointer-events-none"
              style={{
                height: "25%",
                top: `${active * 25}%`,
                transition: "top 280ms cubic-bezier(0.2, 0.8, 0.2, 1)",
              }}
              aria-hidden="true"
            />

            {sectors.map((sec, i) => (
              <button
                key={sec.num}
                onClick={() => setActive(i)}
                className={[
                  "flex-1 flex items-center gap-2.5 px-6 cursor-pointer border-b border-border last:border-b-0 text-left w-full transition-colors duration-200",
                  i === active
                    ? "bg-white text-navy"
                    : "text-text-secondary hover:text-navy",
                ].join(" ")}
                aria-selected={i === active}
                role="tab"
              >
                <span className="text-[12px] font-bold text-text-muted w-9 flex-shrink-0">
                  {sec.num}
                </span>
                <span className="text-[15px] font-semibold leading-snug">{sec.title}</span>
              </button>
            ))}
          </div>

          {/* Right panel — key causes remount on tab change, re-triggering animation */}
          <div
            key={active}
            className="sf-panel-enter grid lg:grid-cols-[1fr_220px] gap-7 p-9 items-center min-h-[280px]"
          >
            {/* Content */}
            <div>
              <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-amber-text mb-3">
                {s.num} — Sector focus
              </p>
              <h3 className="font-bold text-[24px] text-navy tracking-tight mb-3">{s.title}</h3>
              <p className="text-[15px] text-text-secondary leading-relaxed mb-5">{s.desc}</p>

              {/* Role chips */}
              <div className="flex flex-wrap gap-2 mb-6">
                {s.roles.map((r) => (
                  <span
                    key={r}
                    className="text-[11.5px] px-2 py-1 bg-off-white text-text-secondary border border-border"
                  >
                    {r}
                  </span>
                ))}
              </div>

              <a
                href="#"
                className="text-[13px] font-semibold text-navy hover:text-amber-text transition-colors inline-flex items-center gap-1"
              >
                Read more <span aria-hidden="true">→</span>
              </a>
            </div>

            {/* Image placeholder */}
            <div
              className="hidden lg:flex flex-col items-center justify-center gap-3 border-2 border-dashed border-[#d5d8dd] bg-[#f0f1f3] text-text-muted"
              style={{ width: 220, height: 220 }}
              aria-hidden="true"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                opacity="0.3"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              <span className="text-[11px] text-center px-4">Sector photo</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
