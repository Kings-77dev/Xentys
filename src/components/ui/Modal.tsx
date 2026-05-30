"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  className?: string;
  /** Pass true when the child component renders its own close button */
  hideCloseButton?: boolean;
}

export function Modal({ open, onClose, title, children, className, hideCloseButton }: ModalProps) {
  const backdropRef = useRef<HTMLDivElement>(null);
  const firstFocusRef = useRef<HTMLElement | null>(null);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Focus first focusable element on open
  useEffect(() => {
    if (!open) return;
    const el = backdropRef.current;
    if (!el) return;
    requestAnimationFrame(() => {
      const focusable = el.querySelectorAll<HTMLElement>(
        'button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])'
      );
      const first = Array.from(focusable).find(
        (e) => getComputedStyle(e).display !== "none"
      );
      first?.focus();
      firstFocusRef.current = first ?? null;
    });
  }, [open]);

  // ESC to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape" && open) onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose, open]);

  // Focus trap
  useEffect(() => {
    if (!open) return;
    const el = backdropRef.current;
    if (!el) return;
    const getFocusable = () =>
      Array.from(
        el.querySelectorAll<HTMLElement>(
          'button,[href],input,select,textarea,[tabindex]:not([tabindex="-1"])'
        )
      ).filter((e) => getComputedStyle(e).display !== "none");

    const trap = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const focusable = getFocusable();
      const first = focusable[0];
      const last  = focusable[focusable.length - 1];
      if (e.shiftKey) { if (document.activeElement === first) { e.preventDefault(); last?.focus(); } }
      else            { if (document.activeElement === last)  { e.preventDefault(); first?.focus(); } }
    };
    el.addEventListener("keydown", trap);
    return () => el.removeEventListener("keydown", trap);
  }, [open]);

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
      style={{
        // Glassmorphism backdrop — matches reference HTML exactly
        background: "rgba(7,25,53,0.55)",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
        opacity: open ? 1 : 0,
        pointerEvents: open ? "auto" : "none",
        transition: "opacity 0.25s ease",
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className={cn("bg-white w-full max-h-[92vh] relative", className)}
        style={{
          // Entrance: slides up from 16px + scales from 0.98 — matches reference
          transform: open ? "translateY(0) scale(1)" : "translateY(16px) scale(0.98)",
          opacity: open ? 1 : 0,
          transition: "transform 0.32s cubic-bezier(0.2,0.8,0.2,1), opacity 0.25s ease",
          // Navy-toned deep shadow — matches reference
          boxShadow: "0 24px 64px -8px rgba(7,25,53,0.32), 0 2px 8px rgba(7,25,53,0.08)",
          borderRadius: 0, // our system
          maxWidth: 700,
        }}
      >
        {/* Built-in close button — hidden when child manages its own */}
        {!hideCloseButton && (
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center rounded-none text-text-muted hover:bg-off-white hover:text-text-primary transition-colors z-10"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          </button>
        )}
        <h2 id="modal-title" className="sr-only">{title}</h2>
        {children}
      </div>
    </div>
  );
}
