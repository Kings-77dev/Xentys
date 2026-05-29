import Link from "next/link";

export function ConsultantPreview() {
  return (
    <section className="bg-white py-[120px]" aria-labelledby="consultant-heading">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-[120px]">
        <div className="flex flex-col lg:flex-row gap-20 items-center">

          {/* Left — copy */}
          <div className="lg:max-w-[520px]">
            <h2
              className="font-bold text-navy mb-6"
              style={{ fontSize: "32px" }}
              id="consultant-heading"
            >
              You'll work with a named specialist.
            </h2>
            <p className="text-[16px] leading-6 text-[#4d5056] mb-4">
              Every client and candidate has one dedicated recruiter from first
              call to successful placement — and beyond.
            </p>
            <p className="text-[16px] leading-6 text-[#4d5056] mb-8">
              No handoffs. No being passed around. One person who knows your
              brief and is accountable for the outcome.
            </p>
            <Link
              href="/about"
              className="text-[14px] font-semibold text-navy hover:text-amber-text transition-colors"
            >
              → Meet the team
            </Link>
          </div>

          {/* Right — recruiter card */}
          <div
            className="bg-[#f8f8f7] rounded-none p-6 flex gap-6 items-start flex-1 min-w-0"
            style={{ minWidth: "min(100%, 560px)" }}
          >
            {/* Photo placeholder */}
            <div
              className="w-[139px] h-[195px] rounded-[2px] bg-[#c7cace] flex-shrink-0 overflow-hidden flex items-center justify-center"
              aria-hidden="true"
            >
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" opacity="0.5">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
            </div>

            {/* Details */}
            <div className="flex flex-col gap-3 flex-1 pt-1">
              <div className="flex flex-col gap-1">
                <h3 className="font-bold text-[18px] text-navy">Adriaan Brok</h3>
                <p className="font-medium text-[16px] leading-6 text-[#4d5056]">Senior Procurement Recruiter</p>
                <p className="text-[14px] leading-5 text-[#8e9197]">Specialism: Industry & Construction</p>
                <p className="text-[14px] leading-5 text-[#8e9197]">12 years in procurement recruitment</p>
                <div className="h-px bg-[#c7cace] mt-1" />
              </div>
              <p className="text-[14px] leading-5 text-[#4d5056]">
                "I've placed 60+ procurement professionals at manufacturing and
                construction organisations across the Netherlands. I know this
                market."
              </p>
              <div>
                <a
                  href="https://linkedin.com"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-1 bg-[#f0f1f3] rounded text-[12px] font-medium text-navy hover:bg-[#e5e7ea] transition-colors"
                >
                  LinkedIn →
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
