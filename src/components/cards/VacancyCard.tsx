import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import type { Vacancy } from "@/data/vacancies";

interface VacancyCardProps { vacancy: Vacancy; }

export function VacancyCard({ vacancy }: VacancyCardProps) {
  return (
    <article className="bg-white border border-[#e1e4e8] rounded-xl p-6 flex flex-col gap-4 transition-all duration-[200ms] ease-out hover:-translate-y-px hover:border-[#c9cdd3] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
      <div className="flex justify-between items-start gap-3">
        <Badge type={vacancy.type} />
      </div>
      <h2 className="font-semibold text-[17px] text-text-primary leading-snug tracking-[-0.01em]">
        {vacancy.title}
      </h2>
      <div className="flex flex-wrap gap-3">
        {[
          { icon: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0zM12 7a3 3 0 1 1 0 6 3 3 0 0 1 0-6", text: vacancy.location },
          { icon: "M20 7H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16", text: vacancy.sector.charAt(0).toUpperCase() + vacancy.sector.slice(1) },
          { icon: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 6v6l4 2", text: vacancy.postedAgo },
        ].map(({ icon, text }) => (
          <span key={text} className="flex items-center gap-1.5 text-[12px] text-text-muted">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d={icon}/></svg>
            {text}
          </span>
        ))}
      </div>
      <span className="font-semibold text-[13px] text-amber-text">{vacancy.salary}</span>
      <div className="flex items-center justify-between pt-4 border-t border-[#f0f2f4]">
        <div className="flex items-center gap-2 text-[12px] text-text-muted">
          <div className="w-7 h-7 rounded-full bg-[#f6f8fa] border border-[#e1e4e8] flex items-center justify-center text-navy font-semibold text-[10px]" aria-hidden="true">
            {vacancy.recruiterInitials}
          </div>
          {vacancy.recruiterName.split(" ")[0]}
        </div>
        <Link
          href={`/vacancies/${vacancy.slug}`}
          className="text-[12px] font-semibold text-text-muted hover:text-text-primary transition-colors duration-[180ms] tracking-[0.01em]"
        >
          View role →
        </Link>
      </div>
    </article>
  );
}
