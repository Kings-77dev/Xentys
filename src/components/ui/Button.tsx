import { type ButtonHTMLAttributes, type AnchorHTMLAttributes, forwardRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

const base =
  "inline-flex items-center gap-2 px-5 py-[10px] rounded-[8px] text-[13px] font-semibold tracking-[0.01em] transition-all duration-[200ms] ease-out whitespace-nowrap cursor-pointer select-none";

const variantClasses = {
  primary:
    "bg-amber text-navy hover:bg-[#e8970a] hover:shadow-[0_4px_8px_-2px_rgba(255,163,0,0.3)] active:bg-[#d4850a]",
  secondary:
    "bg-navy text-white hover:bg-[#0a2347] hover:shadow-sm active:bg-[#081d3a]",
  ghost:
    "bg-transparent border border-[#e1e4e8] text-text-primary hover:bg-[#f6f8fa] hover:border-[#c9cdd3] active:bg-[#eef0f2]",
  "ghost-inv":
    "bg-transparent border border-white/25 text-white hover:border-white/60 hover:bg-white/5 active:bg-white/10",
  link:
    "p-0 rounded-none bg-none text-amber-text underline underline-offset-4 decoration-amber-text/40 hover:decoration-amber-text transition-all duration-[180ms]",
};

type Variant = keyof typeof variantClasses;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

interface LinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  href: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", className, children, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(base, variantClasses[variant], className)}
      {...props}
    >
      {children}
    </button>
  )
);
Button.displayName = "Button";

export function LinkButton({
  variant = "primary",
  href,
  className,
  children,
  ...props
}: LinkButtonProps) {
  return (
    <Link href={href} className={cn(base, variantClasses[variant], className)} {...props}>
      {children}
    </Link>
  );
}
