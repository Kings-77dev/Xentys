import { cn } from "@/lib/cn";

interface EyebrowProps {
  label: string;
  inv?: boolean;
  center?: boolean;
  className?: string;
}

export function Eyebrow({ label, inv, center, className }: EyebrowProps) {
  return (
    <div className={cn("flex flex-col gap-2 mb-4", center && "items-center", className)}>
      <div className="w-20 h-1.5 bg-amber rounded-full" aria-hidden="true" />
      <span
        className={cn(
          "font-semibold text-xs tracking-[0.48px] uppercase",
          inv ? "text-amber" : "text-amber-text"
        )}
      >
        {label}
      </span>
    </div>
  );
}
