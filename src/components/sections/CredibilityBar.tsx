"use client";
import { useEffect, useRef, useState } from "react";

const stats = [
  { count: 15,   suffix: "+", display: null,    label: "Years of specialist focus" },
  { count: 745,  suffix: "+", display: null,    label: "Vacancies filled since 2010" },
  { count: 3,    suffix: "",  display: null,    label: "Specialist sectors" },
  { count: null, suffix: "",  display: "1 day", label: "Response commitment on all briefs" },
  { count: null, suffix: "",  display: "98%",   label: "Client satisfaction rate" },
];

function Counter({ count, suffix, display, sectionRef }: {
  count: number | null;
  suffix: string;
  display: string | null;
  sectionRef: React.RefObject<HTMLElement | null>;
}) {
  const [val, setVal] = useState(0);
  const animated = useRef(false);

  useEffect(() => {
    if (!count) return;
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || animated.current) return;
      animated.current = true;
      const start = performance.now();
      const duration = 1400;
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setVal(Math.round(eased * count));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      observer.disconnect();
    }, { threshold: 0.2 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [count, sectionRef]);

  return <span>{display ?? `${val}${suffix}`}</span>;
}

export function CredibilityBar() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} className="bg-white border-t border-[#f0f2f4] px-6 md:px-10 lg:px-20" aria-label="Key statistics">
      <div className="max-w-[1280px] mx-auto">

        {/* Mobile / tablet — 2-col grid (no divider overflow) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:hidden border border-[#e1e4e8] divide-x divide-y divide-[#e1e4e8]">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1.5 text-center py-8 px-3">
              <span
                className="font-bold text-amber-text block"
                style={{ fontSize: "32px", letterSpacing: "-0.03em", lineHeight: 1.1 }}
              >
                <Counter count={s.count} suffix={s.suffix} display={s.display} sectionRef={sectionRef} />
              </span>
              <span className="text-text-muted text-[12px] leading-snug max-w-[140px]">
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Desktop — original flex with mx-10 dividers */}
        <div className="hidden lg:flex items-stretch justify-center">
          {stats.map((s, i) => (
            <div key={s.label} className="flex items-center">
              {i > 0 && (
                <div className="w-px self-stretch bg-[#e1e4e8] mx-10 my-12" aria-hidden="true" />
              )}
              <div className="flex flex-col items-center gap-1.5 text-center py-14 px-2">
                <span
                  className="font-bold text-amber-text block"
                  style={{ fontSize: "40px", letterSpacing: "-0.03em", lineHeight: 1.1 }}
                >
                  <Counter count={s.count} suffix={s.suffix} display={s.display} sectionRef={sectionRef} />
                </span>
                <span className="text-text-muted max-w-[180px]" style={{ fontSize: "13px", lineHeight: 1.4 }}>
                  {s.label}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
