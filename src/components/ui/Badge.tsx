import { cn } from "@/lib/cn";
import type { PlacementType } from "@/data/vacancies";

const variants: Record<PlacementType, string> = {
  permanent: "bg-navy text-white",
  interim:   "bg-amber text-navy",
  secondment:"bg-teal text-white",
  executive: "bg-purple text-white",
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
