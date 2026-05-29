import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import type { Vacancy } from "@/data/vacancies";

interface VacancyCardProps { vacancy: Vacancy; }

export function VacancyCard({ vacancy }: VacancyCardProps) {
  return (
    <article className="bg-white border border-border rounded-2xl p-6 flex flex-col gap-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex justify-between items-start gap-3">
        <Badge type={vacancy.type} />
      </div>
      <h2 className="font-semibold text-lg text-text-primary leading-snug">{vacancy.title}</h2>
      <div className="flex flex-wrap gap-3">
        <span className="flex items-center gap-1 text-sm text-text-muted">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          {vacancy.location}
        </span>
        <span className="flex items-center gap-1 text-sm text-text-muted">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
          {vacancy.sector.charAt(0).toUpperCase() + vacancy.sector.slice(1)}
        </span>
        <span className="flex items-center gap-1 text-sm text-text-muted">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          {vacancy.postedAgo}
        </span>
      </div>
      <span className="font-semibold text-sm text-amber-text">{vacancy.salary}</span>
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center gap-2 text-sm text-text-muted">
          <div className="w-8 h-8 rounded-full bg-off-white border-2 border-border flex items-center justify-center text-navy font-semibold text-xs" aria-hidden="true">
            {vacancy.recruiterInitials}
          </div>
          Posted by {vacancy.recruiterName.split(" ")[0]}
        </div>
        <Link href={`/vacancies/${vacancy.slug}`} className="font-semibold text-sm text-amber-text underline underline-offset-4 hover:text-navy transition-colors">
          View role →
        </Link>
      </div>
    </article>
  );
}
