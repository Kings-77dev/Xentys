"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import Link from "next/link";

const services = [
  {
    id: "01",
    index: 0,
    label: "Permanent",
    title: "Permanent Recruitment",
    tag: { label: "Permanent", className: "bg-amber text-navy tracking-widest uppercase rounded-[2px]" },
    description:
      "Full-cycle search for permanent procurement hires. Fixed fee agreed upfront, no hidden costs. 3-month replacement guarantee on every placement. You receive 3–5 screened, briefed candidates only.",
    href: "/consultation",
    imgAlt: "Permanent recruitment",
    imgSrc: "/images/services-permanent.png",
    imageLeft: true,
  },
  {
    id: "02",
    index: 1,
    label: "Interim",
    title: "Interim Recruitment",
    tag: { label: "Interim", className: "bg-navy text-white tracking-widest uppercase rounded-[2px]" },
    description:
      "Screened interim procurement professionals deployed within days — not weeks. Self-employed or payroll basis. Ideal for project capacity, maternity cover, or rapid scaling of your team.",
    href: "/consultation",
    imgAlt: "Interim recruitment",
    imgSrc: "/images/services-interim.png",
    imageLeft: false,
  },
  {
    id: "03",
    index: 2,
    label: "Secondment",
    title: "Secondment",
    tag: { label: "Secondment", className: "bg-[#0e7490] text-white tracking-widest uppercase rounded-[2px]" },
    description:
      "Procurement professionals on our payroll, embedded in your organisation. All employer obligations managed by Xentys. Flexible hours and duration throughout the full assignment period.",
    href: "/consultation",
    imgAlt: "Secondment",
    imgSrc: "/images/services-secondment.png",
    imageLeft: true,
  },
];

export function ServicesRows() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Refs
  const rowRefs   = useRef<(HTMLDivElement | null)[]>([]);
  const stageRef  = useRef<HTMLDivElement>(null);
  const barRef    = useRef<HTMLSpanElement>(null);   // the growing amber span

  // ── Scroll: progress bar fill + active index ──────────────────
  const onScroll = useCallback(() => {
    const stage = stageRef.current;
    const bar   = barRef.current;
    if (!stage || !bar) return;

    // Amber progress bar
    const rect  = stage.getBoundingClientRect();
    const vh    = window.innerHeight;
    const total = rect.height - vh * 0.5;
    const passed = Math.max(0, Math.min(total, -rect.top + vh * 0.4));
    const pct   = total > 0 ? (passed / total) * 100 : 0;
    bar.style.height = pct + "%";

    // Active index — last row whose top edge is above 40% of viewport
    const trigger = vh * 0.40;
    let newActive = 0;
    rowRefs.current.forEach((row, i) => {
      if (!row) return;
      if (row.getBoundingClientRect().top <= trigger) newActive = i;
    });
    setActiveIndex(newActive);
  }, []);

  useEffect(() => {
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [onScroll]);

  // ── Click rail item → scroll to service ─────────────────────
  const scrollToService = (idx: number) => {
    const row = rowRefs.current[idx];
    if (!row) return;
    window.scrollTo({
      top: row.getBoundingClientRect().top + window.scrollY - 100,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-white border-t border-b border-[#e8eaed] px-6 md:px-10 lg:px-20" aria-labelledby="services-heading">
      <div className="max-w-[1280px] mx-auto">

        {/* Header */}
        <div className="pt-[88px] pb-12">
          <Eyebrow label="How we place" />
          <h2
            className="font-bold text-navy max-w-[580px]"
            style={{ fontSize: "28px", letterSpacing: "-0.02em", lineHeight: 1.3 }}
            id="services-heading"
          >
            Three ways we can help bring the right person in
          </h2>
        </div>

        {/* ── Desktop: pin-rail layout ─────────────────────────── */}
        <div className="hidden lg:grid pb-[88px]" style={{ gridTemplateColumns: "160px minmax(0,1fr)", gap: "56px", alignItems: "flex-start" }}>

          {/* Rail — sticky */}
          <div className="sticky self-start" style={{ top: "120px", padding: "16px 0" }}>
            <ul className="relative flex flex-col m-0 p-0 list-none" style={{ gap: "32px" }}>

              {/* Track line */}
              <div
                className="absolute w-[2px] bg-[#e1e4e8] overflow-hidden"
                style={{ left: "6px", top: "30px", bottom: "30px", borderRadius: "2px" }}
                aria-hidden="true"
              >
                {/* Amber fill — grows based on scroll */}
                <span
                  ref={barRef}
                  className="block w-full h-0"
                  style={{ background: "linear-gradient(180deg, #ffa300, rgba(255,163,0,0.4))", transition: "height 0.1s ease" }}
                />
              </div>

              {services.map((s) => {
                const isActive = s.index === activeIndex;
                return (
                  <li key={s.id}>
                    <button
                      onClick={() => scrollToService(s.index)}
                      className="relative flex flex-col text-left border-0 bg-transparent font-inherit cursor-pointer"
                      style={{ paddingLeft: "32px", gap: "2px", transition: "transform 0.2s ease" }}
                      onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateX(2px)"; }}
                      onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = ""; }}
                      aria-label={`Go to ${s.label}`}
                    >
                      {/* Node */}
                      <span
                        className="absolute"
                        style={{
                          left: 0,
                          top: "6px",
                          width: "14px",
                          height: "14px",
                          borderRadius: "50%",
                          background: isActive ? "#ffa300" : "#fff",
                          border: `2px solid ${isActive ? "#ffa300" : "#c9cdd3"}`,
                          boxShadow: isActive ? "0 0 0 4px rgba(255,163,0,0.18)" : "none",
                          transition: "background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease",
                          zIndex: 1,
                        }}
                        aria-hidden="true"
                      />
                      {/* Label */}
                      <span
                        className="font-semibold"
                        style={{
                          fontSize: "13px",
                          color: isActive ? "#0d2b55" : "#9ca3af",
                          transition: "color 0.25s ease",
                        }}
                      >
                        {s.label}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Service rows */}
          <div ref={stageRef} className="flex flex-col pb-8" style={{ gap: "96px" }}>
            {services.map((s) => {
              const isActive = s.index === activeIndex;
              return (
                <div
                  key={s.id}
                  ref={(el) => { rowRefs.current[s.index] = el; }}
                  data-index={s.index}
                  className="grid items-center"
                  style={{
                    gridTemplateColumns: "minmax(0,1.1fr) minmax(0,1fr)",
                    gap: "56px",
                    opacity: isActive ? 1 : 0.5,
                    transition: "opacity 0.35s ease",
                    scrollMarginTop: "120px",
                  }}
                >
                  {/* Image */}
                  <figure
                    className="m-0 overflow-hidden"
                    style={{
                      order: s.imageLeft ? 0 : 2,
                      borderRadius: "0",
                      aspectRatio: "4/3",
                      background: "#f6f8fa",
                      boxShadow: "0 1px 0 #e1e4e8",
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={s.imgSrc}
                      alt={s.imgAlt}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                  </figure>

                  {/* Body */}
                  <div className="flex flex-col" style={{ gap: "16px", order: s.imageLeft ? 1 : 1 }}>
                    <span className={`inline-flex items-center self-start px-2 py-0.5 text-[11px] font-semibold tracking-[0.04em] ${s.tag.className}`}>
                      {s.tag.label}
                    </span>
                    <h3
                      className="text-navy font-bold"
                      style={{ fontSize: "28px", lineHeight: 1.15, letterSpacing: "-0.02em" }}
                    >
                      {s.title}
                    </h3>
                    <p className="text-text-secondary" style={{ fontSize: "16px", lineHeight: 1.62, maxWidth: "520px" }}>
                      {s.description}
                    </p>
                    <Link
                      href={s.href}
                      className="text-[14px] font-semibold text-navy hover:text-amber-text transition-colors self-start mt-2"
                    >
                      Learn more →
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Mobile / Tablet: text-first, image below, link right ─ */}
        <div className="lg:hidden flex flex-col gap-12 py-12">
          {services.map((s) => (
            <div key={s.id}>
              {/* Text first */}
              <span className={`inline-flex items-center px-2 py-0.5 text-[11px] font-semibold tracking-[0.04em] mb-3 ${s.tag.className}`}>
                {s.tag.label}
              </span>
              <h3 className="font-bold text-navy mb-3" style={{ fontSize: "24px", letterSpacing: "-0.02em" }}>{s.title}</h3>
              <p className="text-text-secondary mb-5" style={{ fontSize: "16px", lineHeight: 1.62 }}>{s.description}</p>

              {/* Image below text */}
              <figure className="m-0 overflow-hidden mb-4" style={{ aspectRatio: "16/10", background: "#f6f8fa" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.imgSrc} alt={s.imgAlt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </figure>

              {/* Link right-aligned */}
              <div className="flex justify-end">
                <Link href={s.href} className="text-[14px] font-semibold text-navy hover:text-amber-text transition-colors inline-flex items-center gap-1">
                  Learn more →
                </Link>
              </div>

              <div className="h-px bg-[#e1e4e8] mt-10 last:hidden" aria-hidden="true" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
