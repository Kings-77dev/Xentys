"use client";

import { useState } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";

const sectors = [
  {
    title: "Industry & Manufacturing",
    image: "/images/industrial.png",
    desc: "Procurement roles across production, engineering and technical operations. We know the demands of high-volume sourcing, complex supplier networks and the drive for operational efficiency.",
    roles: ["Strategic Buyer", "Category Mgr", "CPO", "Supply Chain Analyst"],
  },
  {
    title: "Construction & Infrastructure",
    image: "/images/contruction.png",
    desc: "Specialists for contractors, developers and complex project environments. Procurement in construction moves fast — we place people who can keep it moving.",
    roles: ["Project Buyer", "Sourcing Mgr", "Contract Mgr", "Procurement Lead"],
  },
  {
    title: "Offshore & Energy",
    image: "/images/offshore.png",
    desc: "Procurement expertise for marine, offshore and energy organisations. We understand the compliance demands, the global supply chains and the urgency that comes with the territory.",
    roles: ["Procurement Mgr", "Supply Chain Lead", "Category Specialist"],
  },
  {
    title: "High-Tech",
    image: "/images/high tech.png",
    desc: "Specialists for fast-moving, technical and innovation-led businesses. Procurement in high-tech demands agility and technical literacy — we find people who bring both.",
    roles: ["Tactical Buyer", "Supply Chain", "Commodity Mgr", "Sourcing Engineer"],
  },
];

export function SectorsFeature() {
  // Desktop tabs state
  const [active, setActive] = useState(0);
  // Mobile accordion state
  const [openAcc, setOpenAcc] = useState<number | null>(0);

  const s = sectors[active];

  return (
    <section className="py-16 lg:py-[88px] bg-white border-t border-border px-6 md:px-10 lg:px-20" aria-labelledby="sf-heading">
      <div className="max-w-[1280px] mx-auto">

        {/* Section head — shared */}
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

        {/* ── Mobile accordion (< sm) ─────────────────────────── */}
        <div className="sm:hidden border-t border-border" role="list">
          {sectors.map((sec, i) => {
            const isOpen = openAcc === i;
            return (
              <div key={sec.title} className="border-b border-border" role="listitem">
                <button
                  onClick={() => setOpenAcc(isOpen ? null : i)}
                  className={[
                    "w-full flex items-center justify-between gap-4 py-5 text-left transition-colors duration-150",
                    isOpen ? "text-navy" : "text-text-secondary hover:text-navy hover:bg-white/60",
                  ].join(" ")}
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className="block w-[3px] flex-shrink-0 rounded-full transition-all duration-200"
                      style={{
                        height: isOpen ? "24px" : "16px",
                        background: isOpen ? "#ffa300" : "#e1e4e8",
                      }}
                      aria-hidden="true"
                    />
                    <span className="font-semibold text-[17px] leading-snug">{sec.title}</span>
                  </div>
                  <svg
                    width="18" height="18" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" strokeWidth="2"
                    aria-hidden="true"
                    className="flex-shrink-0 transition-transform duration-200"
                    style={{
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      color: isOpen ? "#ffa300" : undefined,
                    }}
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>

                {/* Smooth height animation via CSS grid trick */}
                <div
                  className="overflow-hidden transition-all duration-300 ease-in-out"
                  style={{ display: "grid", gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="min-h-0">
                    <div className="pb-6 pl-7">
                      <p className="text-[15px] text-text-secondary leading-relaxed mb-4 max-w-[640px]">
                        {sec.desc}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-5">
                        {sec.roles.map((r) => (
                          <span key={r} className="text-[11.5px] px-2 py-1 bg-off-white text-text-secondary border border-border">
                            {r}
                          </span>
                        ))}
                      </div>
                      <div className="flex justify-end">
                        <a href="#" className="text-[13px] font-semibold text-navy hover:text-amber-text transition-colors inline-flex items-center gap-1">
                          Read more <span aria-hidden="true">→</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Desktop tabs + image (sm+) ──────────────────────── */}
        <div className="hidden sm:grid lg:grid-cols-[280px_1fr] border border-border">

          {/* Left rail */}
          <div className="relative bg-off-white border-b lg:border-b-0 lg:border-r border-border flex lg:flex-col overflow-x-auto lg:overflow-x-visible">

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
                key={sec.title}
                onClick={() => setActive(i)}
                className={[
                  "lg:flex-1 flex-shrink-0 flex items-center gap-2.5 px-5 py-4 lg:px-6 cursor-pointer border-r lg:border-r-0 lg:border-b border-border last:border-r-0 lg:last:border-b-0 text-left transition-colors duration-200",
                  i === active ? "bg-white text-navy" : "text-text-secondary hover:text-navy hover:bg-white/60",
                ].join(" ")}
                aria-selected={i === active}
                role="tab"
              >
                <span className="text-[15px] font-semibold whitespace-nowrap">{sec.title}</span>
              </button>
            ))}
          </div>

          {/* Right panel */}
          <div key={active} className="sf-panel-enter grid lg:grid-cols-[1fr_320px] gap-7 p-6 lg:p-9 items-center min-h-[280px]">
            <div>
              <h3 className="font-bold text-[24px] text-navy tracking-tight mb-3">{s.title}</h3>
              <p className="text-[15px] text-text-secondary leading-relaxed mb-5">{s.desc}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {s.roles.map((r) => (
                  <span key={r} className="text-[11.5px] px-2 py-1 bg-off-white text-text-secondary border border-border">
                    {r}
                  </span>
                ))}
              </div>
              <a href="#" className="text-[13px] font-semibold text-navy hover:text-amber-text transition-colors inline-flex items-center gap-1">
                Read more <span aria-hidden="true">→</span>
              </a>
            </div>

            {/* Sector image */}
            <img
              key={sectors[active].image}
              src={sectors[active].image}
              alt={sectors[active].title}
              className="hidden lg:block w-full max-w-[320px] aspect-square object-cover rounded-[2px] sector-img-enter"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
