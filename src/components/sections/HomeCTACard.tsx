import Link from "next/link";

export function HomeCTACard() {
  return (
    <section className="bg-off-white py-12 border-t border-border" aria-labelledby="home-cta-heading">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-[120px]">
        <div className="bg-navy p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">

          {/* Copy */}
          <div>
            <p className="text-[11px] font-semibold tracking-[0.1em] uppercase text-amber mb-2">
              Ready to hire or find a role?
            </p>
            <h2 className="font-bold text-[22px] text-white mb-1" id="home-cta-heading">
              Ready to find the right match?
            </h2>
            <p className="text-[14px] text-white/65 max-w-[440px]">
              Whether you&apos;re hiring or looking — we respond within 1 working day.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <Link
              href="/consultation"
              className="inline-flex h-12 px-7 bg-amber text-navy font-semibold text-[14px] rounded-[2px] items-center hover:bg-[#e89400] transition-colors whitespace-nowrap"
            >
              Share a vacancy brief
            </Link>
            <Link
              href="/vacancies"
              className="inline-flex h-12 px-7 rounded-[2px] border-[1.5px] border-[#668fbd] text-[14px] font-semibold text-white hover:border-white transition-colors whitespace-nowrap items-center"
            >
              Browse vacancies
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
