import Link from "next/link";

export function ConsultantPreview() {
  return (
    <section className="bg-white py-[120px] px-6 md:px-10 lg:px-20" aria-labelledby="consultant-heading">
      <div className="max-w-[1280px] mx-auto">
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
            {/* Photo */}
            <img
              src="/images/AdriaanVierkant.avif"
              alt="Adriaan Brok"
              className="w-[139px] h-[195px] rounded-[2px] flex-shrink-0 object-cover object-top"
            />

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
              <div className="flex items-center gap-3 pt-3 border-t border-[#e1e4e8]">
                <a href="tel:+31702400414" className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#f0f1f3] text-[12px] font-medium text-navy hover:bg-[#e5e7ea] transition-colors">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 17.92z"/></svg>
                  Call
                </a>
                <a href="mailto:adriaan.brok@xentys.nl" className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#f0f1f3] text-[12px] font-medium text-navy hover:bg-[#e5e7ea] transition-colors">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>
                  Email
                </a>
                <a href="https://linkedin.com" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#f0f1f3] text-[12px] font-medium text-navy hover:bg-[#e5e7ea] transition-colors">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
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
