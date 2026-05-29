export function ClientLogoStrip() {
  return (
    <section className="bg-white border-t border-border" aria-label="Trusted by">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-[120px] py-8">
        <p className="text-[13px] text-[#6b6f75] text-center mb-6">
          Trusted by leading organisations across the Netherlands.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="w-[132px] h-[49px] border border-border rounded flex items-center justify-center bg-white"
              aria-hidden="true"
            >
              <span className="text-[11px] text-text-muted font-medium">Logo {i + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
