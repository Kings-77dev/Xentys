import Link from "next/link";

const LogoMark = () => (
  <div className="flex items-center gap-2">
    <div className="w-9 h-9 bg-amber rounded-lg flex items-center justify-center flex-shrink-0">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M10 2L18 6v8l-8 4L2 14V6l8-4z" fill="#0d2b55" />
      </svg>
    </div>
    <span className="font-semibold text-lg tracking-tight text-white">Xentys</span>
  </div>
);

export default function Footer() {
  return (
    <footer className="bg-navy" aria-label="Site footer">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-[120px] pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1.5fr] gap-12 pb-12 border-b border-white/10 mb-8">

          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" aria-label="Xentys home"><LogoMark /></Link>
            <p className="text-sm text-white/60 max-w-[240px]">
              Specialist procurement and supply chain recruitment for industrial, construction, and offshore organisations. Since 2010.
            </p>
            <div className="flex gap-3">
              <a href="https://linkedin.com" aria-label="Xentys on LinkedIn" rel="noopener noreferrer"
                className="w-9 h-9 bg-white/8 rounded-lg flex items-center justify-center text-white/70 hover:bg-white/15 hover:text-white transition-colors">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
            </div>
          </div>

          {/* For Employers */}
          <div>
            <h2 className="text-sm font-semibold text-white mb-4">For Employers</h2>
            <nav className="flex flex-col gap-3" aria-label="Employer links">
              {[
                { href: "/consultation", label: "Submit a vacancy" },
                { href: "/about#services", label: "Permanent Recruitment" },
                { href: "/about#services", label: "Interim Inkoop" },
                { href: "/about#services", label: "Detachering" },
                { href: "/about#services", label: "Executive Search" },
              ].map((l) => (
                <Link key={l.label} href={l.href} className="text-sm text-white/60 hover:text-white transition-colors">{l.label}</Link>
              ))}
            </nav>
          </div>

          {/* For Professionals */}
          <div>
            <h2 className="text-sm font-semibold text-white mb-4">For Professionals</h2>
            <nav className="flex flex-col gap-3" aria-label="Professional links">
              {[
                { href: "/vacancies", label: "Browse vacancies" },
                { href: "/open-application", label: "Open application" },
                { href: "/contact", label: "Salary guide" },
                { href: "/contact", label: "Career guide" },
              ].map((l) => (
                <Link key={l.label} href={l.href} className="text-sm text-white/60 hover:text-white transition-colors">{l.label}</Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-sm font-semibold text-white mb-4">Contact</h2>
            <address className="not-italic flex flex-col gap-3">
              {[
                { icon: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0zM12 10m-3 0a3 3 0 1 0 6 0 3 3 0 0 0-6 0", text: "Geestbrugkade 35, 2281 CX Rijswijk", href: null },
                { icon: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.39 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.4a16 16 0 0 0 6 6l.92-.92a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z", text: "070 240 04 14", href: "tel:+31702400414" },
                { icon: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6", text: "info@xentys.nl", href: "mailto:info@xentys.nl" },
              ].map(({ icon, text, href }) => (
                <div key={text} className="flex items-start gap-3 text-sm text-white/60">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffa300" strokeWidth="2" className="flex-shrink-0 mt-0.5" aria-hidden="true">
                    <path d={icon} />
                  </svg>
                  {href ? <a href={href} className="hover:text-white transition-colors">{text}</a> : <span>{text}</span>}
                </div>
              ))}
            </address>
            <div className="mt-4 flex items-center gap-2 px-4 py-3 bg-amber/10 rounded-lg border-l-[3px] border-amber text-sm text-white/80">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ffa300" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              We respond to all briefs within 1 working day.
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-white/40">© 2025 Xentys BV. All rights reserved. NEN-4400-1 certified · SNA keurmerk</p>
          <nav className="flex gap-6" aria-label="Legal links">
            <Link href="#" className="text-xs text-white/40 hover:text-white/70 transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-xs text-white/40 hover:text-white/70 transition-colors">Cookie Policy</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
