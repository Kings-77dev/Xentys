import { type ButtonHTMLAttributes, type AnchorHTMLAttributes, forwardRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/cn";

const variantClasses = {
  primary:   "bg-amber text-navy hover:scale-[1.02] hover:shadow-md",
  secondary: "bg-navy text-white hover:scale-[1.02] hover:shadow-md",
  ghost:     "bg-transparent border-2 border-navy text-text-primary hover:scale-[1.02]",
  "ghost-inv": "bg-transparent border-2 border-white/60 text-white hover:border-white hover:scale-[1.02]",
  link:      "p-0 text-amber-text underline underline-offset-4 hover:text-navy",
};

type Variant = keyof typeof variantClasses;

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

interface LinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: Variant;
  href: string;
}

const base =
  "inline-flex items-center gap-2 px-8 py-[14px] rounded-full font-semibold text-sm tracking-wide transition-all duration-150 whitespace-nowrap cursor-pointer";

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

export function LinkButton({ variant = "primary", href, className, children, ...props }: LinkButtonProps) {
  return (
    <Link href={href} className={cn(base, variantClasses[variant], className)} {...props}>
      {children}
    </Link>
  );
}
