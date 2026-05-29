"use client";
import { useEffect, useRef, useState } from "react";

const stats = [
  { count: 15,   suffix: "+", display: null,    label: "Years of specialist focus" },
  { count: 745,  suffix: "+", display: null,    label: "Vacancies filled since 2010" },
  { count: 3,    suffix: "",  display: null,    label: "Specialist sectors" },
  { count: null, suffix: "",  display: "1 day", label: "Response commitment on all briefs" },
  { count: null, suffix: "",  display: "98%",   label: "Client satisfaction rate" },
];

function Counter({ count, suffix, display }: { count: number | null; suffix: string; display: string | null }) {
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

  return (
    <span ref={ref}>
      {display ?? `${val}${suffix}`}
    </span>
  );
}

export function CredibilityBar() {
  return (
    <section className="bg-white" aria-label="Key statistics">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-[120px]">
        <div className="flex items-center justify-center py-14">
          {stats.map((s, i) => (
            <div key={s.label} className="flex items-center">
              {i > 0 && (
                <div className="w-px bg-[#e0e2e5] mx-8 self-stretch" style={{ height: "139px" }} aria-hidden="true" />
              )}
              <div className="flex flex-col items-center gap-1 text-center px-4">
                <span
                  className="font-bold text-[36px] text-amber-text"
                  style={{ letterSpacing: "-0.18px", lineHeight: "44px" }}
                >
                  <Counter count={s.count} suffix={s.suffix} display={s.display} />
                </span>
                <span className="text-[16px] text-text-muted leading-6 max-w-[200px]">
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
