"use client";
import { useEffect, useRef, useState } from "react";

const stats = [
  { count: 745, suffix: "+", label: "Vacancies filled since 2010" },
  { count: 250, suffix: "+", label: "Client organisations served" },
  { count: 15,  suffix: "+", label: "Years of specialist focus" },
  { count: null, display: "1 day", label: "Response commitment on all briefs" },
];

function Counter({ count, suffix, display }: { count: number | null; suffix?: string; display?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    if (!count) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || animated.current) return;
      animated.current = true;
      const start = performance.now();
      const duration = 1200;
      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setVal(Math.round(eased * count));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      observer.disconnect();
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [count]);

  return <span ref={ref}>{display ?? `${val}${suffix}`}</span>;
}

export function CredibilityBar() {
  return (
    <section className="bg-white border-b border-border py-20" aria-label="Key statistics">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-[120px]">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.label} className={`text-center px-4 py-8 ${i < 3 ? "border-r border-border" : ""}`}>
              <span className="font-bold text-4xl tracking-tight text-amber-text block mb-2">
                <Counter count={s.count} suffix={s.suffix} display={s.display} />
              </span>
              <span className="text-sm text-text-muted">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
