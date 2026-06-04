"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ConsultationModal } from "./ConsultationModal";

const trustItems = [
  "15+ years specialist focus",
  "Procurement and supply chain only",
  "3–5 vetted candidates per brief",
];

export function Hero() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
    <section className="relative overflow-hidden px-6 md:px-10 lg:px-20" aria-labelledby="hero-heading">
      {/* Photo background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.jpg"
          alt=""
          fill
          className="object-cover object-center"
          priority
          aria-hidden="true"
        />
      </div>

      {/* Gradient overlay — heavier on the left where text sits, lets warm sunset show right */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(100deg, rgba(5,18,42,0.96) 0%, rgba(10,35,70,0.82) 42%, rgba(13,43,85,0.45) 70%, rgba(13,43,85,0.20) 100%)",
        }}
        aria-hidden="true"
      />
      {/* Bottom fade — ensures trust bar text is always readable */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 z-10"
        style={{ background: "linear-gradient(to top, rgba(5,18,42,0.5) 0%, transparent 100%)" }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-20 max-w-[1280px] mx-auto pt-44 pb-28">

        {/* Eyebrow */}
        <p
          className="text-amber font-semibold mb-7"
          style={{ fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase" }}
        >
          Specialist Recruitment · Since 2010
        </p>

        {/* Headline */}
        <h1
          id="hero-heading"
          className="font-bold text-white max-w-[580px] mb-6"
          style={{
            fontSize: "clamp(40px, 4.5vw, 58px)",
            lineHeight: 1.07,
            letterSpacing: "-0.03em",
          }}
        >
          The procurement<br />
          recruitment partner<br />
          <em className="not-italic" style={{ color: "rgba(255,255,255,0.75)", fontStyle: "normal" }}>you can trust.</em>
        </h1>

        {/* Subheadline */}
        <p
          className="text-white/70 max-w-[520px] mb-10"
          style={{ fontSize: "17px", lineHeight: 1.65 }}
        >
          We place procurement and supply chain professionals across industry,
          construction and offshore — permanently, interim, or on secondment.
        </p>

        {/* Door CTAs — 8px radius, no pill */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-14">
          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="flex flex-col justify-center px-6 py-4 rounded-[2px] bg-amber w-full sm:min-w-[248px] sm:w-auto h-[64px] sm:h-[76px] transition-all duration-[200ms] ease-out hover:bg-[#e8970a] hover:-translate-y-2 hover:shadow-xl active:bg-[#d4850a] text-left"
          >
            <span className="font-semibold text-navy text-[15px] leading-tight">
              I need to hire
            </span>
            <span className="text-navy/70 text-[13px] mt-0.5">
              Request consultation →
            </span>
          </button>

          <Link
            href="/vacancies"
            className="flex flex-col justify-center px-6 py-4 rounded-[2px] w-full sm:min-w-[248px] sm:w-auto h-[64px] sm:h-[76px] transition-all duration-[200ms] ease-out hover:-translate-y-2 hover:shadow-xl"
            style={{
              background: "rgba(255,255,255,0.10)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              border: "1.5px solid rgba(255,255,255,0.55)",
              boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
            }}
          >
            <span className="font-semibold text-white text-[15px] leading-tight">
              I'm looking for a new role
            </span>
            <span className="text-[13px] mt-0.5" style={{ color: "rgba(255,255,255,0.78)" }}>
              Browse vacancies →
            </span>
          </Link>
        </div>

        {/* Trust bar */}
        <div className="flex flex-wrap items-center gap-3 sm:gap-5" aria-label="Key facts">
          {trustItems.map((item, i) => (
            <div key={item} className="flex items-center gap-5">
              {i > 0 && (
                <div className="w-[3px] h-[3px] rounded-full bg-amber/50 flex-shrink-0" aria-hidden="true" />
              )}
              <span
                className="text-white/50 font-medium"
                style={{ fontSize: "12px", letterSpacing: "0.01em" }}
              >
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>

    <ConsultationModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
