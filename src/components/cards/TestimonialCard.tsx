interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
}

export function TestimonialCard({ quote, name, role }: TestimonialCardProps) {
  return (
    <blockquote className="bg-white/7 border border-white/12 rounded-2xl p-8 flex flex-col gap-6">
      <div className="text-amber text-5xl font-bold leading-none" aria-hidden="true">"</div>
      <p className="text-lg text-white/90 italic flex-1">{quote}</p>
      <footer className="flex flex-col gap-1">
        <cite className="font-semibold text-sm text-white not-italic">{name}</cite>
        <span className="text-sm text-white/60">{role}</span>
      </footer>
    </blockquote>
  );
}
