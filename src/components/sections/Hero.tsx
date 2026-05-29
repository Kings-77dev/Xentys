import Link from "next/link";
import Image from "next/image";

const trustItems = [
  "15+ years specialist focus",
  "Procurement and supply chain only",
  "3–5 vetted candidates per brief",
];

export function Hero() {
  return (
    <section className="relative overflow-hidden" aria-labelledby="hero-heading">
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

      {/* Gradient overlay — more precise, less stock-photo */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(105deg, rgba(7,25,53,0.97) 0%, rgba(13,43,85,0.88) 50%, rgba(13,43,85,0.60) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-20 max-w-[1280px] mx-auto px-6 lg:px-[120px] pt-44 pb-28">

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
        <div className="flex flex-wrap gap-3 mb-14">
          <Link
            href="/consultation"
            className="flex flex-col justify-center px-6 py-4 rounded-[2px] bg-amber min-w-[248px] h-[76px] transition-all duration-[200ms] ease-out hover:bg-[#e8970a] hover:shadow-[0_8px_20px_rgba(255,163,0,0.25)] active:bg-[#d4850a]"
          >
            <span className="font-semibold text-navy text-[15px] leading-tight">
              I'm looking for a buyer
            </span>
            <span className="text-navy/70 text-[13px] mt-0.5">
              Request a Consultation →
            </span>
          </Link>

          <Link
            href="/vacancies"
            className="flex flex-col justify-center px-6 py-4 rounded-[2px] bg-white/8 border border-white/20 min-w-[248px] h-[76px] transition-all duration-[200ms] ease-out hover:bg-white/12 hover:border-white/35 active:bg-white/6"
          >
            <span className="font-semibold text-white text-[15px] leading-tight">
              I'm looking for a new role
            </span>
            <span className="text-white/55 text-[13px] mt-0.5">
              Browse vacancies →
            </span>
          </Link>
        </div>

        {/* Trust bar */}
        <div className="flex flex-wrap items-center gap-5" aria-label="Key facts">
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
  );
}
