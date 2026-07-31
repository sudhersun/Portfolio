'use client';

import { useEffect, useRef, useState } from 'react';
import { animate } from 'motion/react';

/**
 * Animates the numeric portion of a stat (e.g. "300+" -> counts 0..300, then
 * re-appends the "+"). Runs once, the first time it enters the viewport.
 *
 * Uses a raw IntersectionObserver rather than useInView: the latter never
 * fired here (likely a rootMargin-format edge case), silently leaving every
 * counter frozen at 0 with no console error to point at.
 */
export function CountUp({ value, duration = 1.6 }: { value: string; duration?: number }) {
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? Number(match[1]) : 0;
  const suffix = match ? match[2] : '';

  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        animate(0, target, {
          duration,
          ease: [0.16, 1, 0.3, 1],
          onUpdate: (v) => setDisplay(Math.round(v)),
        });
        io.disconnect();
      },
      { threshold: 0.2 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
      {suffix}
    </span>
  );
}
