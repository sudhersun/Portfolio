'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { MaskText, Rise } from '@/components/motion/mask-text';
import { experience, responsibilities } from '@/lib/site';
import { cn } from '@/lib/utils';

const EASE = [0.33, 1, 0.68, 1] as const;

const ICONS: Record<string, React.ReactNode> = {
  '01': (
    <>
      <path d="M4 20l3-1 9.5-9.5a2.1 2.1 0 0 0 0-3l-.9-.9a2.1 2.1 0 0 0-3 0L3 15l-1 3z" />
      <circle cx="6.4" cy="16.6" r="1.1" />
    </>
  ),
  '02': (
    <>
      <polyline points="8 6 3 12 8 18" />
      <polyline points="16 6 21 12 16 18" />
    </>
  ),
  '03': (
    <>
      <path d="M12 3.5l8.5 4.5-8.5 4.5-8.5-4.5z" />
      <path d="M3.5 13l8.5 4.5 8.5-4.5" />
    </>
  ),
  '04': (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="M20 20l-4.3-4.3" />
    </>
  ),
};

/** The counter that stays parked mid-viewport while entries scroll past it. */
function Counter({ index }: { index: number }) {
  const label = String(index + 1).padStart(2, '0');
  return (
    <div className="sticky top-[35%] flex items-start">
      {/* One shared type size keeps the brackets on the numeral's baseline. */}
      <div className="text-display-sm flex items-center font-medium leading-none tracking-tight">
        <span className="text-muted">[</span>
        <span className="mask relative block h-[1em] w-[1.75em] text-center">
          <motion.span
            key={label}
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 0.6, ease: EASE }}
            className="absolute inset-0 block"
          >
            {label}
          </motion.span>
        </span>
        <span className="text-muted">]</span>
      </div>
    </div>
  );
}

function ServiceCard({ n, title, body, i }: { n: string; title: string; body: string; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  // Alternating drift gives the row the staggered rhythm the reference has.
  const y = useTransform(scrollYProgress, [0, 1], [i % 2 === 0 ? 60 : -20, i % 2 === 0 ? -60 : 20]);

  return (
    <motion.div ref={ref} style={{ y }} className="lg:flex-1">
      <Rise delay={i * 0.08}>
        <div className="border-line bg-surface/50 hover:border-accent/60 group h-full space-y-6 rounded-3xl border p-7 transition-colors duration-500 lg:p-8">
          <svg
            viewBox="0 0 24 24"
            className="text-accent h-11 w-11 fill-none stroke-current stroke-[1.4] transition-transform duration-700 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:-rotate-6 group-hover:scale-110"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {ICONS[n]}
          </svg>
          <h3 className="text-2xl font-medium leading-tight tracking-tight">{title}</h3>
          <p className="text-muted text-sm leading-relaxed">{body}</p>
        </div>
      </Rise>
    </motion.div>
  );
}

export function Services() {
  const entryRefs = useRef<(HTMLDivElement | null)[]>([]);
  // Full opacity the moment an entry appears on screen; dims once its top edge
  // scrolls past the very top of the viewport (i.e. it's being left behind).
  const [onScreen, setOnScreen] = useState<boolean[]>(() => experience.map(() => false));
  const [pastTop, setPastTop] = useState<boolean[]>(() => experience.map(() => false));

  useEffect(() => {
    const indexOf = (target: Element) => entryRefs.current.indexOf(target as HTMLDivElement);

    const onScreenObserver = new IntersectionObserver(
      (observed) => {
        setOnScreen((prev) => {
          const next = [...prev];
          observed.forEach((o) => {
            const i = indexOf(o.target);
            if (i !== -1) next[i] = o.isIntersecting;
          });
          return next;
        });
      },
      { threshold: 0 },
    );

    // Shrinks the observed area to a hairline at the very top of the
    // viewport, so this only flips once an entry's top edge reaches it.
    const pastTopObserver = new IntersectionObserver(
      (observed) => {
        setPastTop((prev) => {
          const next = [...prev];
          observed.forEach((o) => {
            const i = indexOf(o.target);
            if (i !== -1) next[i] = o.isIntersecting;
          });
          return next;
        });
      },
      { rootMargin: '0px 0px -100% 0px', threshold: 0 },
    );

    entryRefs.current.forEach((el) => {
      if (!el) return;
      onScreenObserver.observe(el);
      pastTopObserver.observe(el);
    });

    return () => {
      onScreenObserver.disconnect();
      pastTopObserver.disconnect();
    };
  }, []);

  // Drives the sticky counter: whichever entry currently sits at the top,
  // falling back to the last one that's simply on screen.
  const active = Math.max(pastTop.lastIndexOf(true), onScreen.lastIndexOf(true), 0);

  return (
    <section id="services" className="edge pt-[160px] lg:pt-[260px]">
      <div className="grid gap-16 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
        {/* Sticky column: heading + live counter */}
        <div className="lg:sticky lg:top-0 lg:h-svh lg:pt-32">
          <Rise>
            <div className="border-line mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs uppercase tracking-[0.14em]">
              <span className="bg-accent h-2 w-2 rounded-full" />
              Work History
            </div>
          </Rise>

          <h2 className="text-display font-medium leading-[0.9] tracking-tight">
            <MaskText>Experience.</MaskText>
          </h2>

          <div className="mt-10">
            <Counter index={active} />
          </div>

          <Rise delay={0.15}>
            <a
              href="#contact"
              className="group border-line mt-8 inline-flex items-center gap-2 border-b pb-1 text-sm"
            >
              Learn more
              <span className="transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:translate-x-1">
                &rarr;
              </span>
            </a>
          </Rise>
        </div>

        {/* Entries spaced so each occupies roughly a third of a viewport */}
        <div className="space-y-[30vh] lg:pt-[42vh]">
          {experience.map((entry, i) => (
            <div
              key={entry.title}
              ref={(el) => {
                entryRefs.current[i] = el;
              }}
              className={cn(
                'border-line border-t pt-6 transition-opacity duration-500',
                pastTop[i] ? 'opacity-40' : onScreen[i] ? 'opacity-100' : 'opacity-45',
              )}
            >
              <div className="flex items-baseline justify-between gap-6">
                <h3 className="text-display-sm font-medium leading-none tracking-tight">
                  <MaskText>{entry.title}</MaskText>
                </h3>
                <span className="text-muted shrink-0 text-sm">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <p className="text-muted mt-3 text-sm">
                {entry.company} &middot; {entry.period} ({entry.duration})
              </p>
              <ul className="mt-5 max-w-[46ch] space-y-3">
                {entry.bullets.map((b) => (
                  <li key={b} className="text-muted flex gap-3 text-base leading-relaxed">
                    <span className="text-accent shrink-0">&rarr;</span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Key responsibilities */}
      <div className="mt-[160px] lg:mt-[220px]">
        <Rise>
          <div className="text-accent mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em]">
            <span className="h-px w-5 bg-current" />
            What I do
          </div>
        </Rise>

        <h2 className="text-display-sm mb-10 font-medium leading-[0.95] tracking-tight lg:mb-14">
          <MaskText>Key Responsibilities.</MaskText>
        </h2>

        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-5">
          {responsibilities.map((r, i) => (
            <ServiceCard key={r.n} n={r.n} title={r.title} body={r.body} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
