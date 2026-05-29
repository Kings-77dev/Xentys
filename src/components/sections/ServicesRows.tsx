import { Eyebrow } from "@/components/ui/Eyebrow";
import Link from "next/link";

const services = [
  {
    id: "01",
    label: "Permanent",
    title: "Permanent Recruitment",
    tag: { label: "Permanent", bg: "bg-[#e0f5e5]", text: "text-[#125e2e]" },
    description:
      "Full-cycle search for permanent procurement hires. Fixed fee agreed upfront, no hidden costs. 3-month replacement guarantee on every placement. You receive 3–5 screened, briefed candidates only.",
    href: "/consultation",
    imgAlt: "Permanent recruitment — professional meeting",
    // Figma image asset URL (valid for 7 days)
    imgSrc: "https://www.figma.com/api/mcp/asset/2fce4469-d9fe-4094-8085-fc804fd99bf1",
    imageLeft: true,
  },
  {
    id: "02",
    label: "Interim",
    title: "Interim Recruitment",
    tag: { label: "Interim", bg: "bg-[#fff2e0]", text: "text-[#733d00]" },
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
    tag: { label: "Secondment", bg: "bg-[#e0ebff]", text: "text-[#0a2e7a]" },
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
    <div className="relative w-[440px] flex-shrink-0 h-[300px] rounded-xl overflow-hidden bg-[#15396b]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover rounded-xl"
      />
      {/* Gradient overlay */}
      <div
        className="absolute inset-0 rounded-xl"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(7,25,53,0.45) 70%, rgba(7,25,53,0.82) 100%)",
        }}
        aria-hidden="true"
      />
    </div>
  );
}

export function ServicesRows() {
  return (
    <section className="bg-[#f8f8f7] py-[120px]" aria-labelledby="services-heading">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-[120px]">
        {/* Header */}
        <div className="text-center max-w-[665px] mx-auto mb-16">
          <Eyebrow label="How we place" center />
          <h2
            className="font-bold text-navy"
            style={{ fontSize: "28px", lineHeight: "normal" }}
            id="services-heading"
          >
            Three ways we can help bring the right person in
          </h2>
        </div>

        {/* Rows */}
        <div className="flex gap-16 items-start">
          {/* Left rail — sticky nav */}
          <div className="hidden lg:flex flex-col sticky top-28 self-start" aria-label="Service navigation">
            <div className="relative flex flex-col items-center">
              {/* Track line */}
              <div className="absolute left-[5px] top-0 w-[2px] h-full bg-[#e0e2e5]" aria-hidden="true" />
              {/* Active amber segment */}
              <div className="absolute left-[5px] top-0 w-[2px] h-[40px] bg-amber" aria-hidden="true" />

              {services.map((s, i) => (
                <div key={s.id} className="relative flex items-start gap-6 mb-24 last:mb-0">
                  {/* Node dot */}
                  <div
                    className={`w-3 h-3 rounded-full border-2 flex-shrink-0 mt-1 ${i === 0 ? "border-amber bg-amber" : "border-[#c0c4c9] bg-[#f8f8f7]"}`}
                    aria-hidden="true"
                  />
                  <div>
                    <p className={`font-semibold text-[10px] tracking-[1px] ${i === 0 ? "text-amber" : "text-[#6b6f75]"}`}>
                      {s.id}
                    </p>
                    <p className={`font-${i === 0 ? "semibold" : "normal"} text-[${i === 0 ? "15px" : "13px"}] mt-1 ${i === 0 ? "text-navy" : "text-[#6b6f75]"}`}>
                      {s.label}
                    </p>
                    {i === 0 && (
                      <p className="text-[11px] text-[#6b6f75] mt-1">01 of 03</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Service rows */}
          <div className="flex flex-col gap-16 flex-1 min-w-0">
            {services.map((s, i) => (
              <div key={s.id}>
                <div className={`flex flex-col lg:flex-row gap-12 items-start ${!s.imageLeft ? "lg:flex-row-reverse" : ""}`}>
                  <ServiceImage src={s.imgSrc} alt={s.imgAlt} />

                  <div className="flex flex-col gap-14 flex-1 min-w-0">
                    <div>
                      {/* Tag */}
                      <span className={`inline-block px-2 py-1 rounded text-[12px] font-semibold mb-3 ${s.tag.bg} ${s.tag.text}`}>
                        {s.tag.label}
                      </span>
                      <h3
                        className="font-bold text-navy mb-3"
                        style={{ fontSize: "24px", letterSpacing: "-0.12px" }}
                      >
                        {s.title}
                      </h3>
                      <p className="text-[16px] leading-6 text-[#4d5056]">
                        {s.description}
                      </p>
                    </div>
                    <Link
                      href={s.href}
                      className="text-[13px] font-semibold text-navy hover:text-amber-text transition-colors"
                    >
                      Learn more →
                    </Link>
                  </div>
                </div>

                {/* Divider (not after last) */}
                {i < services.length - 1 && (
                  <div className="h-px bg-[#f0f1f3] mt-16" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
