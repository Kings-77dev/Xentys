import { Eyebrow } from "@/components/ui/Eyebrow";
import Link from "next/link";

const services = [
  {
    id: "01",
    label: "Permanent",
    title: "Permanent Recruitment",
    tag: { label: "Permanent", className: "bg-[#f0fdf4] text-[#166534] border border-[#bbf7d0]" },
    description:
      "Full-cycle search for permanent procurement hires. Fixed fee agreed upfront, no hidden costs. 3-month replacement guarantee on every placement. You receive 3–5 screened, briefed candidates only.",
    href: "/consultation",
    imgAlt: "Permanent recruitment — professional meeting",
    imgSrc: "https://www.figma.com/api/mcp/asset/2fce4469-d9fe-4094-8085-fc804fd99bf1",
    imageLeft: true,
  },
  {
    id: "02",
    label: "Interim",
    title: "Interim Recruitment",
    tag: { label: "Interim", className: "bg-[#fffbeb] text-[#92400e] border border-[#fde68a]" },
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
    tag: { label: "Secondment", className: "bg-[#eff6ff] text-[#1e40af] border border-[#bfdbfe]" },
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
    <div className="relative w-full lg:w-[420px] flex-shrink-0 h-[280px] rounded-xl overflow-hidden bg-[#15396b]">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className="absolute inset-0 w-full h-full object-cover" />
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to bottom, rgba(0,0,0,0.02) 0%, rgba(7,25,53,0.35) 65%, rgba(7,25,53,0.72) 100%)",
        }}
        aria-hidden="true"
      />
    </div>
  );
}

export function ServicesRows() {
  return (
    <section className="bg-[#f6f8fa] py-[120px]" aria-labelledby="services-heading">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-[120px]">

        {/* Header */}
        <div className="text-center max-w-[580px] mx-auto mb-16">
          <Eyebrow label="How we place" center />
          <h2
            className="font-bold text-navy tracking-[-0.025em]"
            style={{ fontSize: "28px" }}
            id="services-heading"
          >
            Three ways we can help bring the right person in
          </h2>
        </div>

        {/* Rows */}
        <div className="flex gap-14 items-start">
          {/* Left rail — sticky, desktop only */}
          <div className="hidden lg:block sticky top-28 self-start w-[140px] flex-shrink-0">
            <div className="relative pl-4">
              {/* Track */}
              <div className="absolute left-0 top-0 w-[2px] h-full bg-[#e1e4e8]" aria-hidden="true" />
              {/* Amber active */}
              <div className="absolute left-0 top-0 w-[2px] h-10 bg-amber" aria-hidden="true" />

              {services.map((s, i) => (
                <div key={s.id} className={`flex items-start gap-3 ${i < services.length - 1 ? "mb-20" : ""}`}>
                  <div
                    className={`w-2 h-2 rounded-full flex-shrink-0 mt-1 border-2 ${i === 0 ? "border-amber bg-amber" : "border-[#c9cdd3] bg-[#f6f8fa]"}`}
                    aria-hidden="true"
                  />
                  <div>
                    <p className={`font-semibold text-[10px] tracking-[0.08em] uppercase ${i === 0 ? "text-amber-text" : "text-text-muted"}`}>
                      {s.id}
                    </p>
                    <p className={`text-[13px] mt-0.5 ${i === 0 ? "font-semibold text-navy" : "text-text-muted"}`}>
                      {s.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Service rows */}
          <div className="flex flex-col gap-14 flex-1 min-w-0">
            {services.map((s, i) => (
              <div key={s.id}>
                <div className={`flex flex-col lg:flex-row gap-10 items-start ${!s.imageLeft ? "lg:flex-row-reverse" : ""}`}>
                  <ServiceImage src={s.imgSrc} alt={s.imgAlt} />

                  <div className="flex flex-col justify-between flex-1 min-w-0 py-2">
                    <div className="mb-8">
                      {/* Tag — refined */}
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-[4px] text-[11px] font-semibold tracking-[0.04em] mb-4 ${s.tag.className}`}>
                        {s.tag.label}
                      </span>
                      <h3
                        className="font-bold text-navy mb-3 tracking-[-0.02em]"
                        style={{ fontSize: "22px" }}
                      >
                        {s.title}
                      </h3>
                      <p className="text-[15px] leading-[1.65] text-text-secondary">
                        {s.description}
                      </p>
                    </div>
                    <Link
                      href={s.href}
                      className="text-[13px] font-semibold text-text-muted hover:text-text-primary transition-colors duration-[180ms] tracking-[0.01em]"
                    >
                      Learn more →
                    </Link>
                  </div>
                </div>

                {i < services.length - 1 && (
                  <div className="h-px bg-[#e1e4e8] mt-14" aria-hidden="true" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
