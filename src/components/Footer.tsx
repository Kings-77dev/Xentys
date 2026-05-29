import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-navy" aria-label="Site footer">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-[120px] pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1.5fr] gap-12 pb-10 border-b border-white/10 mb-8">

          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" aria-label="Xentys home" className="inline-flex items-center w-fit">
              <Image
                src="/images/xentys-logo.svg"
                width={100}
                height={19}
                alt="Xentys"
                className="brightness-0 invert opacity-75"
              />
            </Link>
            <p className="text-[13px] text-white/50 max-w-[220px] leading-[1.6]">
              Specialist procurement and supply chain recruitment. Since 2010. The Hague.
            </p>
            <div className="flex gap-3">
              <a
                href="https://linkedin.com"
                aria-label="Xentys on LinkedIn"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-white/6 rounded-none flex items-center justify-center text-white/50 hover:bg-white/12 hover:text-white/80 transition-all duration-[180ms]"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
            </div>
          </div>

          {/* For Employers */}
          <div>
            <h2 className="text-[11px] font-semibold tracking-[0.08em] uppercase text-white/40 mb-4">Employers</h2>
            <nav className="flex flex-col gap-3" aria-label="Employer links">
              {[
                { href: "/consultation", label: "Submit a vacancy" },
                { href: "/about#services", label: "Permanent Recruitment" },
                { href: "/about#services", label: "Interim Inkoop" },
                { href: "/about#services", label: "Detachering" },
                { href: "/about#services", label: "Executive Search" },
              ].map((l) => (
                <Link key={l.label} href={l.href} className="text-[13px] text-white/55 hover:text-white/80 transition-colors duration-[180ms] leading-snug">
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* For Professionals */}
          <div>
            <h2 className="text-[11px] font-semibold tracking-[0.08em] uppercase text-white/40 mb-4">Professionals</h2>
            <nav className="flex flex-col gap-3" aria-label="Professional links">
              {[
                { href: "/vacancies",         label: "Browse vacancies" },
                { href: "/open-application",  label: "Open application" },
                { href: "/contact",           label: "Salary guide" },
                { href: "/contact",           label: "Career guide" },
              ].map((l) => (
                <Link key={l.label} href={l.href} className="text-[13px] text-white/55 hover:text-white/80 transition-colors duration-[180ms] leading-snug">
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-[11px] font-semibold tracking-[0.08em] uppercase text-white/40 mb-4">Contact</h2>
            <address className="not-italic flex flex-col gap-3">
              {[
                { text: "Geestbrugkade 35, 2281 CX Rijswijk", href: null },
                { text: "070 240 04 14", href: "tel:+31702400414" },
                { text: "info@xentys.nl", href: "mailto:info@xentys.nl" },
              ].map(({ text, href }) => (
                <div key={text} className="text-[13px] text-white/55 leading-snug">
                  {href
                    ? <a href={href} className="hover:text-white/80 transition-colors duration-[180ms]">{text}</a>
                    : <span>{text}</span>}
                </div>
              ))}
            </address>
            <p className="mt-5 text-[12px] text-white/35 leading-[1.5]">
              We respond to all briefs within 1 working day.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-[11px] text-white/30">
            © 2025 Xentys B.V. · NEN-4400-1 certified · SNA keurmerk
          </p>
          <nav className="flex gap-5" aria-label="Legal links">
            <Link href="#" className="text-[11px] text-white/30 hover:text-white/50 transition-colors duration-[180ms]">Privacy Policy</Link>
            <Link href="#" className="text-[11px] text-white/30 hover:text-white/50 transition-colors duration-[180ms]">Cookie Policy</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
