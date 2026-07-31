'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { MaskChars, MaskText } from '@/components/motion/mask-text';
import { useFitText } from '@/lib/use-fit-text';
import { site } from '@/lib/site';

const EASE = [0.33, 1, 0.68, 1] as const;

/** Circular badge with a rotating caption ring — the "Scroll Down" affordance. */
function ShowreelBadge() {
  const label = 'SCROLL DOWN — SCROLL DOWN — ';
  return (
    <motion.a
      href="#about"
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, delay: 1.1, ease: EASE }}
      className="group relative h-28 w-28 shrink-0 lg:h-36 lg:w-36"
      aria-label="Scroll down"
    >
      <span className="bg-accent absolute inset-0 scale-0 rounded-full transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:scale-100" />
      <motion.svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
      >
        <defs>
          <path id="ring" d="M50,50 m-36,0 a36,36 0 1,1 72,0 a36,36 0 1,1 -72,0" fill="none" />
        </defs>
        <text className="fill-current text-[9.5px] tracking-[0.18em]">
          <textPath href="#ring">{label}</textPath>
        </text>
      </motion.svg>
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="border-current/40 flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-500 group-hover:border-white group-hover:text-white">
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-[1.8]">
            <path d="M12 4v15M6 13l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </span>
    </motion.a>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const { containerRef, measureRef, fontSize } = useFitText<HTMLDivElement>(site.wordmark);

  // The wordmark drifts up and fades as the next section arrives.
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '-18%']);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section ref={ref} id="top" className="relative flex min-h-svh flex-col justify-center gap-10 md:justify-between pt-48 lg:pt-60">
      <motion.div style={{ y, opacity }} className="edge">
        {/* Off-screen twin at a fixed size — gives us the glyph run width to solve
            against. w-0 overflow-hidden keeps it off the page's scrollable width;
            getBoundingClientRect() on the inner span still reports its true size. */}
        <span aria-hidden className="pointer-events-none absolute w-0 overflow-hidden">
          <span
            ref={measureRef}
            className="invisible whitespace-pre font-medium uppercase"
            style={{ fontSize: 100, letterSpacing: '-0.05em', lineHeight: 1 }}
          >
            {site.wordmark}
          </span>
        </span>

        <h1
          ref={containerRef}
          className="w-full text-center font-medium uppercase"
          style={{
            fontSize: fontSize ? `${fontSize}px` : undefined,
            letterSpacing: '-0.05em',
            lineHeight: 0.78,
            visibility: fontSize ? 'visible' : 'hidden',
          }}
        >
          {/* justify-center: per-character spans can drop kerning the plain
              measurement string had, so the rendered row may not land exactly
              at container width — centering keeps any slack symmetric. */}
          <MaskChars text={site.wordmark} delay={0.25} className="justify-center" float />
        </h1>
      </motion.div>

      <div className="edge flex items-end justify-between gap-8 pb-10 lg:pb-16">
        <div className="grid gap-6 sm:grid-cols-2 sm:gap-16 lg:gap-24">
          <p className="max-w-[16ch] text-base leading-snug lg:text-lg">
            <MaskText delay={0.9}>{site.tagline}</MaskText>
          </p>
          <p className="text-muted max-w-[26ch] text-base leading-snug lg:text-lg">
            <MaskText delay={1}>{site.intro}</MaskText>
          </p>
        </div>

        <div className="flex items-center gap-8">
          <ShowreelBadge />
        </div>
      </div>
    </section>
  );
}
