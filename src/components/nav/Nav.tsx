"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useScrolled } from "@/lib/useScrolled";
import { cn } from "@/lib/cn";
import { MegaDropdown, type DropdownContent } from "./MegaDropdown";
import { MobileNav } from "./MobileNav";
import { LinkButton } from "@/components/ui/Button";

const hireDropdown: DropdownContent = {
  col1: {
    heading: "Services",
    links: [
      { href: "/about#services", icon: "briefcase", title: "Permanent Recruitment", desc: "Direct hire of procurement professionals" },
      { href: "/about#services", icon: "clock", title: "Interim Inkoop", desc: "Flexible procurement specialists on demand" },
      { href: "/about#services", icon: "users", title: "Detachering", desc: "Professionals on Xentys payroll, at your site" },
      { href: "/about#services", icon: "star", title: "Executive Search", desc: "Senior and leadership procurement placement" },
    ],
  },
  col2: {
    heading: "Resources",
    links: [
      { href: "/contact", icon: "dollar", title: "Salary Benchmark", desc: "Market rates for procurement roles" },
      { href: "/contact", icon: "file", title: "Hiring Guide", desc: "How to attract top procurement talent" },
    ],
    cta: { href: "/consultation", label: "Request a Consultation →" },
  },
};

const roleDropdown: DropdownContent = {
  col1: {
    heading: "Browse & Apply",
    links: [
      { href: "/vacancies", icon: "briefcase", title: "Vacancies", desc: "Browse all open procurement roles" },
      { href: "/open-application", icon: "user", title: "Open Application", desc: "Register and we'll represent you proactively" },
    ],
  },
  col2: {
    heading: "Resources",
    links: [
      { href: "/contact", icon: "dollar", title: "Salary Guide", desc: "Know your market value" },
      { href: "/contact", icon: "book", title: "Career Guide", desc: "Navigate your next move" },
    ],
    cta: { href: "/open-application", label: "Register your profile →" },
  },
};

export default function Nav() {
  const scrolled = useScrolled(80);
  const [open, setOpen] = useState<"hire" | "role" | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lang, setLang] = useState<"EN" | "NL">("EN");
  const navRef = useRef<HTMLElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Lock body scroll when mobile open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const navBg = scrolled || open
    ? "bg-white shadow-sm border-b border-border"
    : "bg-transparent";

  const textCol = scrolled || open ? "text-text-secondary" : "text-white/85";
  const logoCol = scrolled || open ? "text-text-primary" : "text-white";

  return (
    <>
      <nav ref={navRef} className={cn("fixed top-0 left-0 right-0 z-40 transition-all duration-200", navBg)} aria-label="Main navigation">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-[120px]">
          <div className="flex items-center gap-8 h-20 transition-all duration-200" style={{ height: scrolled ? "64px" : "80px" }}>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 flex-shrink-0 mr-auto" aria-label="Xentys home">
              <div className="w-9 h-9 bg-amber rounded-lg flex items-center justify-center flex-shrink-0">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path d="M10 2L18 6v8l-8 4L2 14V6l8-4z" fill="#0d2b55" />
                </svg>
              </div>
              <span className={cn("font-semibold text-lg tracking-tight transition-colors", logoCol)}>Xentys</span>
            </Link>

            {/* Desktop links */}
            <div className="hidden lg:flex items-center gap-1" role="menubar">
              {(["hire", "role"] as const).map((key) => (
                <button
                  key={key}
                  className={cn(
                    "flex items-center gap-1 px-4 py-2 rounded-lg font-semibold text-sm transition-colors",
                    textCol,
                    open === key ? (scrolled ? "bg-off-white text-text-primary" : "bg-white/10 text-white") : "hover:bg-white/10",
                    scrolled && "hover:bg-off-white hover:text-text-primary"
                  )}
                  onClick={() => setOpen(open === key ? null : key)}
                  aria-expanded={open === key}
                  aria-haspopup="true"
                  role="menuitem"
                >
                  {key === "hire" ? "I need to hire" : "I want a role"}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"
                    className={cn("transition-transform duration-150", open === key && "rotate-180")}>
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
              ))}
              <Link href="/about" className={cn("px-4 py-2 rounded-lg font-semibold text-sm transition-colors", textCol, scrolled ? "hover:bg-off-white hover:text-text-primary" : "hover:bg-white/10")}>About</Link>
              <Link href="/contact" className={cn("px-4 py-2 rounded-lg font-semibold text-sm transition-colors", textCol, scrolled ? "hover:bg-off-white hover:text-text-primary" : "hover:bg-white/10")}>Contact</Link>
            </div>

            {/* Lang toggle */}
            <div className="hidden lg:flex items-center gap-0.5 ml-2" aria-label="Language">
              {(["EN", "NL"] as const).map((l, i) => (
                <>
                  {i > 0 && <span className={cn("text-xs", scrolled ? "text-border" : "text-white/30")} aria-hidden="true">|</span>}
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    aria-pressed={lang === l}
                    className={cn(
                      "px-2 py-1 rounded text-xs font-semibold tracking-widest transition-colors",
                      lang === l
                        ? (scrolled ? "text-text-primary bg-off-white" : "text-white bg-white/10")
                        : (scrolled ? "text-text-muted hover:text-text-primary" : "text-white/50 hover:text-white")
                    )}
                  >{l}</button>
                </>
              ))}
            </div>

            {/* CTA */}
            <LinkButton href="/consultation" variant="primary" className="hidden lg:inline-flex flex-shrink-0">
              Get in touch →
            </LinkButton>

            {/* Hamburger */}
            <button
              className="lg:hidden flex flex-col gap-[5px] p-2 ml-auto"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <span className={cn("block w-6 h-0.5 rounded-full transition-transform duration-200", scrolled || mobileOpen ? "bg-text-primary" : "bg-white", mobileOpen && "translate-y-[7px] rotate-45")} />
              <span className={cn("block w-6 h-0.5 rounded-full transition-opacity duration-200", scrolled || mobileOpen ? "bg-text-primary" : "bg-white", mobileOpen && "opacity-0")} />
              <span className={cn("block w-6 h-0.5 rounded-full transition-transform duration-200", scrolled || mobileOpen ? "bg-text-primary" : "bg-white", mobileOpen && "-translate-y-[7px] -rotate-45")} />
            </button>
          </div>
        </div>

        {/* Mega dropdowns */}
        <MegaDropdown open={open === "hire"} content={hireDropdown} />
        <MegaDropdown open={open === "role"} content={roleDropdown} />
      </nav>

      {/* Mobile nav overlay */}
      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} lang={lang} setLang={setLang} />
    </>
  );
}
