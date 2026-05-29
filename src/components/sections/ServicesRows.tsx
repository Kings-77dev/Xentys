"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import Link from "next/link";

const services = [
  {
    id: "01",
    label: "Permanent",
    title: "Permanent Recruitment",
    tag: { label: "Permanent", className: "bg-[#f0fdf4] text-[#166534] border border-[#bbf7d0]" },
    description:
      "Full-cycle search for permanent procurement hires. Fixed fee agreed upfront, no hidden costs. 3-month replacement guarantee on every placement. You receive 3–5 screened, briefed candidates only.",
    href: "/consultation",
    imgAlt: "Permanent recruitment — professional meeting",
    imgSrc: "https://www.figma.com/api/mcp/asset/2fce4469-d9fe-4094-8085-fc804fd99bf1",
    imageLeft: true,
  },
  {
    id: "02",
    label: "Interim",
    title: "Interim Recruitment",
    tag: { label: "Interim", className: "bg-[#fffbeb] text-[#92400e] border border-[#fde68a]" },
    description:
      "Screened interim procurement professionals deployed within days — not weeks. Self-employed or payroll basis. Ideal for project capacity, maternity cover, or rapid scaling of your team.",
    href: "/consultation",
    imgAlt: "Interim procurement — office environment",
    imgSrc: "https://www.figma.com/api/mcp/asset/24004fb7-535b-4a80-aa5b-e88d960bc8c4",
    imageLeft: false,
  },
  {
    id: "03",
    label: "Secondment",
    title: "Secondment",
    tag: { label: "Secondment", className: "bg-[#eff6ff] text-[#1e40af] border border-[#bfdbfe]" },
    description:
      "Procurement professionals on our payroll, embedded in your organisation. All employer obligations managed by Xentys. Flexible hours and duration throughout the full assignment period.",
    href: "/consultation",
    imgAlt: "Secondment — team collaboration",
    imgSrc: "https://www.figma.com/api/mcp/asset/1e311119-6ce8-4611-ad92-aa6f9d1ae217",
    imageLeft: true,
  },
];

function ServiceImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative w-full lg:w-[420px] flex-shrink-0 h-[280px] rounded-none overflow-hidden bg-[#15396b]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="absolute inset-0 w-full h-full object-cover" />
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0.02) 0%, rgba(7,25,53,0.35) 65%, rgba(7,25,53,0.72) 100%)",
        }}
        aria-hidden="true"
      />
    </div>
  );
}

export function ServicesRows() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [amberHeight, setAmberHeight] = useState(4); // px from track top to active dot centre

  // Refs for IntersectionObserver targets (one per row)
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  // Refs for each dot (to measure exact position for amber bar)
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  // Ref for the track line container (measures from here)
  const trackRef = useRef<HTMLDivElement>(null);

  // Recalculate amber bar height whenever activeIndex changes or window resizes
  const updateAmberHeight = useCallback(() => {
    const track = trackRef.current;
    const dot = dotRefs.current[activeIndex];
    if (!track || !dot) return;
    const trackTop = track.getBoundingClientRect().top;
    const dotRect = dot.getBoundingClientRect();
    const dotCentre = dotRect.top + dotRect.height / 2;
    setAmberHeight(Math.max(0, dotCentre - trackTop));
  }, [activeIndex]);

  useEffect(() => {
    updateAmberHeight();
    window.addEventListener("resize", updateAmberHeight);
    return () => window.removeEventListener("resize", updateAmberHeight);
  }, [updateAmberHeight]);

  // IntersectionObserver — each row fires when it enters the middle band of the viewport
  useEffect(() => {
    const observers = rowRefs.current.map((row, i) => {
      if (!row) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveIndex(i);
        },
        {
          // Trigger when the row's top edge crosses into the top-third of the viewport
          rootMargin: "-20% 0px -55% 0px",
          threshold: 0,
        }
      );
      obs.observe(row);
      return obs;
    });
    return () => observers.forEach((obs) => obs?.disconnect());
  }, []);

  const counter = `${String(activeIndex + 1).padStart(2, "0")} of 03`;

  return (
    <section className="bg-[#f6f8fa] py-[120px]" aria-labelledby="services-heading">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-[120px]">

        {/* Header — left-aligned */}
        <div className="mb-16">
          <Eyebrow label="How we place" />
          <h2
            className="font-bold text-navy tracking-[-0.025em] max-w-[580px]"
            style={{ fontSize: "28px" }}
            id="services-heading"
          >
            Three ways we can help bring the right person in
          </h2>
        </div>

        {/* Body */}
        <div className="flex gap-14 items-start">

          {/* Left rail — sticky, desktop only */}
          <div className="hidden lg:block sticky top-28 self-start w-[140px] flex-shrink-0">
            <div className="relative pl-4" ref={trackRef}>

              {/* Track line — full height, always grey */}
              <div
                className="absolute left-0 top-0 w-[2px] bg-[#e1e4e8]"
                style={{ height: "100%" }}
                aria-hidden="true"
              />

              {/* Amber progress — animates height to active dot centre */}
              <div
                className="absolute left-0 top-0 w-[2px] bg-amber"
                style={{
                  height: `${amberHeight}px`,
                  transition: "height 420ms cubic-bezier(0.4, 0, 0.2, 1)",
                }}
                aria-hidden="true"
              />

              {/* Items */}
              {services.map((s, i) => {
                const isActive = i === activeIndex;
                return (
                  <div
                    key={s.id}
                    className={`flex items-start gap-3 ${i < services.length - 1 ? "mb-20" : ""}`}
                  >
                    {/* Dot */}
                    <div
                      ref={(el) => { dotRefs.current[i] = el; }}
                      className="w-2 h-2 rounded-full flex-shrink-0 mt-1 border-2 transition-all duration-300"
                      style={{
                        borderColor: isActive ? "#ffa300" : "#c9cdd3",
                        backgroundColor: isActive ? "#ffa300" : "#f6f8fa",
                        transform: isActive ? "scale(1.25)" : "scale(1)",
                      }}
                      aria-hidden="true"
                    />

                    {/* Label */}
                    <div>
                      <p
                        className="text-[10px] tracking-[0.08em] uppercase transition-colors duration-300"
                        style={{
                          fontWeight: isActive ? 700 : 400,
                          color: isActive ? "#d97706" : "#9ca3af",
                        }}
                      >
                        {s.id}
                      </p>
                      <p
                        className="text-[13px] mt-0.5 transition-colors duration-300"
                        style={{
                          fontWeight: isActive ? 600 : 400,
                          color: isActive ? "#0d2b55" : "#9ca3af",
                        }}
                      >
                        {s.label}
                      </p>
                      {/* Counter — static, shown on active item only */}
                      {isActive && (
                        <p className="text-[11px] mt-0.5 text-text-muted">
                          {counter}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Service rows */}
          <div className="flex flex-col gap-14 flex-1 min-w-0">
            {services.map((s, i) => (
              <div
                key={s.id}
                ref={(el) => { rowRefs.current[i] = el; }}
              >
                <div className={`flex flex-col lg:flex-row gap-10 items-start ${!s.imageLeft ? "lg:flex-row-reverse" : ""}`}>
                  <ServiceImage src={s.imgSrc} alt={s.imgAlt} />

                  <div className="flex flex-col justify-between flex-1 min-w-0 py-2">
                    <div className="mb-8">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-none text-[11px] font-semibold tracking-[0.04em] mb-4 ${s.tag.className}`}>
                        {s.tag.label}
                      </span>
                      <h3
                        className="font-bold text-navy mb-3 tracking-[-0.02em]"
                        style={{ fontSize: "22px" }}
                      >
                        {s.title}
                      </h3>
                      <p className="text-[15px] leading-[1.65] text-text-secondary">
                        {s.description}
                      </p>
                    </div>
                    <Link
                      href={s.href}
                      className="text-[13px] font-semibold text-text-muted hover:text-text-primary transition-colors duration-[180ms] tracking-[0.01em]"
                    >
                      Learn more →
                    </Link>
                  </div>
                </div>

                {i < services.length - 1 && (
                  <div className="h-px bg-[#e1e4e8] mt-14" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
