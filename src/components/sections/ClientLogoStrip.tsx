const logos = [
  { src: "/images/banner1.png", alt: "Client 1" },
  { src: "/images/banner2.png", alt: "Client 2" },
  { src: "/images/banner3.png", alt: "Client 3" },
  { src: "/images/banner4.png", alt: "Client 4" },
  { src: "/images/banner5.png", alt: "Client 5" },
  { src: "/images/banner6.png", alt: "Client 6" },
  { src: "/images/banner7.png", alt: "Client 7" },
];

export function ClientLogoStrip() {
  return (
    <section className="bg-white border-t border-border overflow-hidden" aria-label="Trusted by">
      <div className="py-8">
        <p className="text-[13px] text-[#6b6f75] text-center mb-7">
          Trusted by leading organisations across the Netherlands.
        </p>

        {/* Mobile — static wrapped grid, no animation */}
        <div className="sm:hidden flex flex-wrap justify-center gap-4 px-6 pb-2">
          {logos.map((logo, i) => (
            <div key={i} className="h-9 w-28 flex items-center justify-center">
              <img
                src={logo.src}
                alt={logo.alt}
                className="max-h-full max-w-full object-contain opacity-50"
                draggable={false}
              />
            </div>
          ))}
        </div>

        {/* Desktop — animated marquee */}
        <div className="hidden sm:block logo-mask">
          <div className="logo-track flex items-center gap-8 sm:gap-16" style={{ width: "max-content" }}>
            {[...logos, ...logos].map((logo, i) => (
              <div
                key={i}
                className="flex-shrink-0 h-9 w-28 sm:h-[44px] sm:w-[140px] flex items-center justify-center"
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="max-h-full max-w-full object-contain opacity-50 hover:opacity-100 transition-opacity duration-200"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
