const testimonials = [
  {
    type: "Client",
    quote:
      "Like no other, Maarten is able to give you the feeling that he will do absolutely everything to deliver the right candidate. And then he delivers.",
    name: "Hiring Manager",
    context: "Industrial sector · Permanent placement",
  },
  {
    type: "Candidate",
    quote:
      "From my first call with Xentys, they were warm, helpful and clearly knew what they were doing. This is what good recruitment feels like.",
    name: "Procurement Professional",
    context: "Placed via Xentys · Supply chain role",
  },
  {
    type: "Client",
    quote:
      "Pre-selection quality is something you expect but that other agencies don't deliver. Xentys does. We only met candidates who genuinely fit the brief.",
    name: "Procurement Director",
    context: "Construction sector · Multiple placements",
  },
];

export function Testimonials() {
  return (
    <section className="bg-[#f6f8fa] py-[120px]" aria-labelledby="testimonials-heading">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-[120px]">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-12">
          <h2
            className="font-bold text-navy tracking-[-0.025em]"
            style={{ fontSize: "32px" }}
            id="testimonials-heading"
          >
            What clients and candidates say
          </h2>

          {/* Google badge — understated */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <span className="text-amber text-[13px]">★</span>
            <span className="font-semibold text-[13px] text-text-primary">4.9</span>
            <span className="text-[13px] text-text-muted">· 47 reviews on Google</span>
          </div>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <blockquote
              key={t.name + t.context}
              className="bg-white border border-[#e1e4e8] rounded-xl p-7 flex flex-col gap-5 transition-all duration-[200ms] ease-out hover:border-[#c9cdd3] hover:shadow-[0_4px_12px_rgba(0,0,0,0.05)]"
            >
              {/* Type tag — muted */}
              <div className="inline-flex items-center self-start">
                <span className="text-[11px] font-semibold tracking-[0.06em] uppercase text-text-muted bg-[#f6f8fa] px-2 py-1 rounded-[4px]">
                  {t.type}
                </span>
              </div>

              {/* Quote */}
              <p className="text-[15px] leading-[1.6] text-text-secondary flex-1 tracking-[-0.005em]">
                "{t.quote}"
              </p>

              {/* Attribution */}
              <footer className="flex flex-col gap-1 pt-4 border-t border-[#f0f2f4]">
                <cite className="not-italic font-semibold text-[13px] text-text-primary">{t.name}</cite>
                <span className="text-[12px] text-text-muted">{t.context}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
