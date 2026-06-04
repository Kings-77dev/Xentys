import { cn } from "@/lib/cn";
import type { PlacementType } from "@/data/vacancies";

const variants: Record<PlacementType, string> = {
  permanent:  "border border-navy text-navy",
  interim:    "border border-amber text-[#d97706]",
  secondment: "border border-[#1e40af] text-[#1e40af]",
  executive:  "border border-purple text-purple",
};

const labels: Record<PlacementType, string> = {
  permanent:  "Permanent",
  interim:    "Interim",
  secondment: "Secondment",
  executive:  "Executive",
};

interface BadgeProps {
  type: PlacementType;
  className?: string;
}

export function Badge({ type, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-[2px] font-semibold text-xs tracking-widest uppercase",
        variants[type],
        className
      )}
    >
      {labels[type]}
    </span>
  );
}
