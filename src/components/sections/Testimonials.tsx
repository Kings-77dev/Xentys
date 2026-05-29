const testimonials = [
  {
    type: "Client",
    typeBg: "bg-[#e5f0ff]",
    typeText: "text-navy",
    quote:
      "Like no other, Maarten is able to give you the feeling that he will do absolutely everything to deliver the right candidate. And then he delivers.",
    name: "Hiring Manager",
    context: "Industrial sector · Permanent placement",
  },
  {
    type: "Candidate",
    typeBg: "bg-[#fff5e0]",
    typeText: "text-[#8c5400]",
    quote:
      "From my first call with Xentys, they were warm, helpful and clearly knew what they were doing. This is what good recruitment feels like.",
    name: "Procurement Professional",
    context: "Placed via Xentys · Supply chain role",
  },
  {
    type: "Client",
    typeBg: "bg-[#e5f0ff]",
    typeText: "text-navy",
    quote:
      "Pre-selection quality is something you expect but that other agencies don't deliver. Xentys does. We only met candidates who genuinely fit the brief.",
    name: "Procurement Director",
    context: "Construction sector · Multiple placements",
  },
];

export function Testimonials() {
  return (
    <section className="bg-[#f8f8f7] py-[120px]" aria-labelledby="testimonials-heading">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-[120px]">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12">
          <h2
            className="font-bold text-[36px] text-navy"
            id="testimonials-heading"
          >
            What clients and candidates say
          </h2>

          {/* Google badge */}
          <div className="flex items-center gap-2 px-4 py-2 bg-[#f0f1f3] rounded-lg flex-shrink-0">
            <span className="font-bold text-[13px] text-[#33363c]">4.9</span>
            <span className="text-amber text-[11px] tracking-wide">★★★★★</span>
            <span className="text-[11px] text-[#6b6f75]">47 reviews</span>
          </div>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <blockquote
              key={t.name + t.context}
              className="bg-white border border-[#c7cace] rounded-xl p-8 flex flex-col gap-4 h-[240px]"
            >
              {/* Type tag */}
              <div className={`inline-flex items-center h-6 px-2 rounded text-[11px] font-semibold self-start ${t.typeBg} ${t.typeText}`}>
                {t.type}
              </div>

              {/* Quote mark */}
              <div className="text-amber font-bold text-[32px] leading-none" aria-hidden="true">"</div>

              {/* Quote text */}
              <p className="text-[16px] leading-6 text-[#4d5056] flex-1">{t.quote}</p>

              {/* Attribution */}
              <footer className="flex flex-col gap-1 mt-auto">
                <div className="w-10 h-px bg-[#c7cace]" aria-hidden="true" />
                <cite className="not-italic font-semibold text-[16px] leading-6 text-navy">{t.name}</cite>
                <span className="text-[12px] text-[#8e9197]">{t.context}</span>
              </footer>
            </blockquote>
          ))}
        </div>

        <div className="flex justify-end mt-8">
          <span className="text-[14px] font-semibold text-navy cursor-pointer hover:text-amber-text transition-colors">
            → Read full case studies
          </span>
        </div>
      </div>
    </section>
  );
}
