import Link from "next/link";
import Image from "next/image";

const trustItems = [
  "15+ Years specialist focus",
  "Procurement and supply chain only",
  "3–5 vetted candidates",
];

export function Hero() {
  return (
    <>
      {/* Hero */}
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

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "linear-gradient(to bottom, #071935 0%, rgba(13,43,85,0.92) 45%, rgba(13,43,85,0.78) 100%)",
          }}
          aria-hidden="true"
        />

        {/* Content */}
        <div className="relative z-20 max-w-[1280px] mx-auto px-6 lg:px-[120px] pt-48 pb-32">
          {/* Eyebrow */}
          <p className="text-amber font-semibold text-[11px] tracking-[1.98px] uppercase mb-6">
            SPECIALIST RECRUITMENT · SINCE 2010
          </p>

          {/* Headline */}
          <h1
            id="hero-heading"
            className="font-bold text-white max-w-[600px] mb-8"
            style={{
              fontSize: "58px",
              lineHeight: 1.08,
              letterSpacing: "-1.16px",
            }}
          >
            The procurement<br />
            recruitment partner<br />
            you can trust.
          </h1>

          {/* Subheadline */}
          <p
            className="text-white max-w-[560px] mb-12"
            style={{ fontSize: "17px", lineHeight: 1.62 }}
          >
            We place procurement and supply chain professionals across industry,
            construction and offshore — permanently, interim, or on secondment.
          </p>

          {/* Door CTAs */}
          <div className="flex flex-wrap gap-4 mb-16">
            {/* Amber — hiring */}
            <Link
              href="/consultation"
              className="flex flex-col justify-center px-6 py-5 rounded-lg bg-amber min-w-[264px] h-20 group transition-opacity hover:opacity-90"
            >
              <span className="font-semibold text-navy text-base leading-tight">
                I'm looking for a buyer
              </span>
              <span className="text-[#071935] text-[13px] mt-1 opacity-80">
                Request a Consultation →
              </span>
            </Link>

            {/* Dark blue — role seekers */}
            <Link
              href="/vacancies"
              className="flex flex-col justify-center px-6 py-5 rounded-lg bg-[#15396b] border border-[#406b9e] min-w-[264px] h-20 group transition-opacity hover:opacity-90"
            >
              <span className="font-semibold text-white text-base leading-tight">
                I'm looking for a new role
              </span>
              <span className="text-[#a6c2e0] text-[13px] mt-1">
                Browse vacancies →
              </span>
            </Link>
          </div>

          {/* Trust bar */}
          <div className="flex flex-wrap items-center gap-4" aria-label="Key facts">
            {trustItems.map((item, i) => (
              <div key={item} className="flex items-center gap-4">
                {i > 0 && (
                  <div className="w-[3px] h-[3px] rounded-full bg-amber flex-shrink-0" aria-hidden="true" />
                )}
                <span className="text-[14px] font-medium text-slate-400">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick-contact FAB — fixed bottom-right */}
      <div className="fixed bottom-8 right-8 z-50 flex items-center gap-3 group" aria-label="Quick contact">
        {/* Tooltip */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-navy text-white text-[13px] font-medium px-3 py-1.5 rounded-md whitespace-nowrap pointer-events-none">
          Quick contact →
        </div>
        <Link
          href="/contact"
          className="w-[52px] h-[52px] rounded-full bg-amber flex items-center justify-center text-[22px] shadow-lg hover:scale-105 transition-transform"
          aria-label="Quick contact"
        >
          💬
        </Link>
      </div>
    </>
  );
}
