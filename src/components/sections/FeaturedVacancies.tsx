import Link from "next/link";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { VacancyCard } from "@/components/cards/VacancyCard";
import { LinkButton } from "@/components/ui/Button";
import { vacancies } from "@/data/vacancies";

export function FeaturedVacancies() {
  const featured = vacancies.slice(0, 3);
  return (
    <section className="bg-white py-[120px] px-6 md:px-10 lg:px-20" aria-labelledby="vacancies-heading">
      <div className="max-w-[1280px] mx-auto">
        <div className="flex items-end justify-between gap-6 mb-12 flex-wrap">
          <div>
            <Eyebrow label="Open roles" />
            <h2 className="font-bold text-3xl lg:text-4xl tracking-tight text-text-primary" id="vacancies-heading">Current vacancies</h2>
          </div>
          <LinkButton href="/vacancies" variant="ghost">View all vacancies →</LinkButton>
        </div>
        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          {featured.map((v) => <VacancyCard key={v.slug} vacancy={v} />)}
        </div>
        <div className="text-center">
          <LinkButton href="/vacancies" variant="secondary">View all vacancies →</LinkButton>
        </div>
      </div>
    </section>
  );
}
