import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import type { PlacementType } from "@/data/vacancies";

interface ServiceCardProps {
  type: PlacementType;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  icon: React.ReactNode;
}

export function ServiceCard({ type, title, description, ctaLabel, ctaHref, icon }: ServiceCardProps) {
  return (
    <article className="bg-white border border-border rounded-2xl p-8 flex flex-col gap-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      <div className="w-12 h-12 bg-amber/10 rounded-xl flex items-center justify-center text-amber-text">
        {icon}
      </div>
      <Badge type={type} />
      <h3 className="font-semibold text-lg text-text-primary">{title}</h3>
      <p className="text-base text-text-secondary flex-1">{description}</p>
      <Link href={ctaHref} className="inline-flex items-center gap-1 font-semibold text-sm text-amber-text hover:text-navy transition-colors">
        {ctaLabel}
      </Link>
    </article>
  );
}
