"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useScrolled } from "@/lib/useScrolled";
import { cn } from "@/lib/cn";
import { MegaDropdown, type DropdownContent } from "./MegaDropdown";
import { MobileNav } from "./MobileNav";
import { LinkButton } from "@/components/ui/Button";

const hireDropdown: DropdownContent = {
  col1: {
    heading: "Services",
    links: [
      { href: "/about#services", icon: "briefcase", title: "Permanent Recruitment", desc: "Full-cycle permanent placements" },
      { href: "/about#services", icon: "clock",     title: "Interim Inkoop",         desc: "Screened professionals within days" },
      { href: "/about#services", icon: "users",     title: "Detachering",             desc: "Professionals on Xentys payroll" },
      { href: "/about#services", icon: "star",      title: "Executive Search",        desc: "Senior & confidential placements" },
    ],
  },
  col2: {
    heading: "Resources",
    links: [
      { href: "/contact", icon: "dollar", title: "Salary Benchmark", desc: "Procurement salary data by role & sector" },
      { href: "/contact", icon: "file",   title: "Hiring Guide",     desc: "How to brief, select and onboard" },
    ],
    cta: { href: "/consultation", label: "Request a Consultation →" },
  },
};

const roleDropdown: DropdownContent = {
  col1: {
    heading: "Browse & Apply",
    links: [
      { href: "/vacancies",         icon: "briefcase", title: "Vacancies",         desc: "Browse open procurement roles" },
      { href: "/open-application",  icon: "user",      title: "Open Application",  desc: "Register your profile for future roles" },
    ],
  },
  col2: {
    heading: "Resources",
    links: [
      { href: "/contact", icon: "dollar", title: "Salary Guide",       desc: "What procurement professionals earn" },
      { href: "/contact", icon: "book",   title: "Procurement Guide",  desc: "Terminology, concepts and frameworks" },
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

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpen(null);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const isLight = scrolled || open !== null;

  return (
    <>
      <nav
        ref={navRef}
        className={cn(
          "fixed top-0 left-0 right-0 z-40 transition-all duration-[240ms] ease-out",
          isLight
            ? "bg-white/95 backdrop-blur-sm border-b border-[#e1e4e8]"
            : "bg-transparent"
        )}
        aria-label="Main navigation"
      >
        <div className="max-w-[1280px] mx-auto px-6 lg:px-[120px]">
          <div
            className="flex items-center gap-8"
            style={{ height: scrolled ? "60px" : "72px", transition: "height 240ms ease-out" }}
          >
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center flex-shrink-0 mr-auto"
              aria-label="Xentys home"
            >
              <Image
                src="/images/xentys-logo.svg"
                width={112}
                height={21}
                alt="Xentys"
                priority
                className={cn(
                  "transition-all duration-[240ms]",
                  isLight ? "" : "brightness-0 invert"
                )}
              />
            </Link>

            {/* Desktop links */}
            <div className="hidden lg:flex items-center" role="menubar">
              {(["hire", "role"] as const).map((key) => (
                <button
                  key={key}
                  className={cn(
                    "flex items-center gap-1.5 px-3.5 py-2 rounded-none text-[13px] font-medium tracking-[0.01em] transition-all duration-[180ms] ease-out",
                    isLight
                      ? open === key
                        ? "text-text-primary bg-[#f6f8fa]"
                        : "text-text-secondary hover:text-text-primary hover:bg-[#f6f8fa]"
                      : open === key
                        ? "text-white bg-white/10"
                        : "text-white/80 hover:text-white hover:bg-white/8"
                  )}
                  onClick={() => setOpen(open === key ? null : key)}
                  aria-expanded={open === key}
                  aria-haspopup="true"
                  role="menuitem"
                >
                  {key === "hire" ? "I need to hire" : "I want a role"}
                  <svg
                    width="12" height="12" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" aria-hidden="true"
                    className={cn("transition-transform duration-[180ms]", open === key && "rotate-180")}
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
              ))}
              {["About", "Contact"].map((label) => (
                <Link
                  key={label}
                  href={`/${label.toLowerCase()}`}
                  className={cn(
                    "px-3.5 py-2 rounded-none text-[13px] font-medium tracking-[0.01em] transition-all duration-[180ms] ease-out",
                    isLight
                      ? "text-text-secondary hover:text-text-primary hover:bg-[#f6f8fa]"
                      : "text-white/80 hover:text-white hover:bg-white/8"
                  )}
                  role="menuitem"
                >
                  {label}
                </Link>
              ))}
            </div>

            {/* Language toggle */}
            <div className="hidden lg:flex items-center gap-0.5" aria-label="Language">
              {(["EN", "NL"] as const).map((l, i) => (
                <div key={l} className="flex items-center">
                  {i > 0 && (
                    <span
                      className={cn("text-[11px] mx-1", isLight ? "text-border" : "text-white/20")}
                      aria-hidden="true"
                    >|</span>
                  )}
                  <button
                    onClick={() => setLang(l)}
                    aria-pressed={lang === l}
                    className={cn(
                      "px-2 py-1 rounded text-[11px] font-semibold tracking-[0.06em] transition-all duration-[180ms]",
                      lang === l
                        ? isLight ? "text-text-primary" : "text-white"
                        : isLight ? "text-text-muted hover:text-text-secondary" : "text-white/40 hover:text-white/70"
                    )}
                  >{l}</button>
                </div>
              ))}
            </div>

            {/* CTA */}
            <LinkButton href="/consultation" variant="primary" className="hidden lg:inline-flex flex-shrink-0">
              Get in touch
            </LinkButton>

            {/* Hamburger */}
            <button
              className="lg:hidden flex flex-col gap-[5px] p-2 ml-auto rounded-none transition-colors hover:bg-white/10"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <span className={cn("block w-5 h-[1.5px] rounded-full transition-all duration-200", isLight || mobileOpen ? "bg-text-primary" : "bg-white", mobileOpen && "translate-y-[6.5px] rotate-45")} />
              <span className={cn("block w-5 h-[1.5px] rounded-full transition-opacity duration-200", isLight || mobileOpen ? "bg-text-primary" : "bg-white", mobileOpen && "opacity-0")} />
              <span className={cn("block w-5 h-[1.5px] rounded-full transition-all duration-200", isLight || mobileOpen ? "bg-text-primary" : "bg-white", mobileOpen && "-translate-y-[6.5px] -rotate-45")} />
            </button>
          </div>
        </div>

        {/* Mega dropdowns */}
        <MegaDropdown open={open === "hire"} content={hireDropdown} />
        <MegaDropdown open={open === "role"} content={roleDropdown} />
      </nav>

      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} lang={lang} setLang={setLang} />
    </>
  );
}
