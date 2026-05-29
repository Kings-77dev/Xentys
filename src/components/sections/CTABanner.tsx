import Link from "next/link";

export function CTABanner() {
  return (
    <section
      className="bg-navy relative overflow-hidden py-[52px]"
      style={{ borderLeft: "5px solid #ffa300" }}
      aria-labelledby="cta-banner-heading"
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-[120px]">
        <div className="flex flex-col lg:flex-row lg:items-center gap-8">

          {/* Copy */}
          <div className="flex-1">
            <h2
              className="font-bold text-[36px] text-white mb-2"
              id="cta-banner-heading"
            >
              Ready to find the right match?
            </h2>
            <p className="text-[16px] text-[#a6c2e0]">
              Whether you're hiring or looking — we respond within 1 working day.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <Link
              href="/consultation"
              className="inline-flex items-center justify-center h-[52px] px-6 bg-amber rounded-lg text-[14px] font-semibold text-navy hover:opacity-90 transition-opacity whitespace-nowrap"
            >
              Request a Consultation
            </Link>
            <Link
              href="/vacancies"
              className="inline-flex items-center justify-center h-[52px] px-6 rounded-lg border-[1.5px] border-[#668fbd] text-[14px] font-semibold text-white hover:border-white transition-colors whitespace-nowrap"
            >
              Browse vacancies
            </Link>
          </div>

        </div>

        {/* Privacy note */}
        <p className="text-[12px] text-[#6b8cb2] mt-8 max-w-[600px]">
          We treat every enquiry with discretion. Your details are shared only with the relevant recruiter.
        </p>
      </div>
    </section>
  );
}
