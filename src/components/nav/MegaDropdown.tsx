import type { ReactElement } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { LinkButton } from "@/components/ui/Button";

// Tiny inline icons to avoid an icon lib dependency
const icons: Record<string, ReactElement> = {
  briefcase: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
  clock:     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  users:     <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  star:      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  dollar:    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>,
  file:      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
  user:      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  book:      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>,
};

export interface DropdownLink { href: string; icon: string; title: string; desc: string; }
export interface DropdownCol  { heading: string; links: DropdownLink[]; cta?: { href?: string; label: string; onClick?: () => void }; }
export interface DropdownContent { col1: DropdownCol; col2: DropdownCol; }

export function MegaDropdown({ open, content }: { open: boolean; content: DropdownContent }) {
  return (
    <div className={cn(
      "absolute top-full left-0 right-0 bg-white border-b border-[#e1e4e8] transition-all duration-[240ms] ease-out origin-top",
      "shadow-[0_8px_24px_rgba(0,0,0,0.07),0_2px_6px_rgba(0,0,0,0.04)]",
      open ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-1"
    )}>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-[120px] py-10 grid grid-cols-2 gap-12">
        {[content.col1, content.col2].map((col, i) => (
          <div key={i}>
            <h3 className="text-[10px] font-semibold tracking-[0.1em] uppercase text-text-muted mb-3">{col.heading}</h3>
            <div className="flex flex-col gap-0.5">
              {col.links.map((link) => (
                <Link
                  key={link.href + link.title}
                  href={link.href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-[2px] hover:bg-[#f6f8fa] transition-colors duration-[180ms] group"
                >
                  <div className="w-8 h-8 bg-[#f6f8fa] group-hover:bg-[#eef0f2] rounded-none flex items-center justify-center text-text-muted flex-shrink-0 transition-colors duration-[180ms]">
                    {icons[link.icon]}
                  </div>
                  <div>
                    <strong className="block font-semibold text-[13px] text-text-primary leading-tight">{link.title}</strong>
                    <span className="text-[11px] text-text-muted">{link.desc}</span>
                  </div>
                </Link>
              ))}
            </div>
            {col.cta && (
              <div className="mt-5 pt-5 border-t border-[#e1e4e8]">
                {col.cta.onClick ? (
                  <button
                    type="button"
                    onClick={col.cta.onClick}
                    className="inline-flex items-center gap-2 px-5 py-[10px] rounded-[2px] text-[13px] font-semibold tracking-[0.01em] bg-amber text-navy hover:bg-[#e8970a] transition-all duration-[200ms] ease-out whitespace-nowrap cursor-pointer"
                  >
                    {col.cta.label}
                  </button>
                ) : (
                  <LinkButton href={col.cta.href!} variant="primary">{col.cta.label}</LinkButton>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
