interface RecruiterCardProps {
  initials: string;
  name: string;
  title: string;
  bio: string;
  email: string;
}

export function RecruiterCard({ initials, name, title, bio, email }: RecruiterCardProps) {
  return (
    <article className="bg-white border border-border rounded-2xl p-8 flex flex-col items-center text-center gap-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
      <div className="w-24 h-24 rounded-full bg-off-white border-3 border-border flex items-center justify-center text-2xl font-bold text-navy" aria-hidden="true">
        {initials}
      </div>
      <div>
        <h3 className="font-semibold text-lg text-text-primary">{name}</h3>
        <p className="text-sm text-text-muted mt-1">{title}</p>
      </div>
      <p className="text-sm text-text-secondary">{bio}</p>
      <div className="flex gap-3 mt-1">
        <a href={`mailto:${email}`} className="text-xs font-semibold text-amber-text underline underline-offset-2 hover:text-navy transition-colors">Email</a>
        <a href="https://linkedin.com" rel="noopener noreferrer" className="text-xs font-semibold text-amber-text underline underline-offset-2 hover:text-navy transition-colors">LinkedIn</a>
      </div>
    </article>
  );
}
