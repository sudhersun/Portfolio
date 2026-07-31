'use client';

import { motion, type Variants } from 'motion/react';
import { cn } from '@/lib/utils';

const EASE = [0.33, 1, 0.68, 1] as const;

/**
 * Reproduces the reference's `maskFill` keyframe: the line sits in an
 * overflow-hidden box and slides up from translateY(100%).
 */
export function MaskText({
  children,
  className,
  delay = 0,
  duration = 0.9,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}) {
  /**
   * The in-view trigger must sit on the mask, not on the sliding child: the
   * child starts at translateY(110%) and the mask clips it, so an observer on
   * the child would report zero intersection forever and never fire.
   */
  return (
    <motion.span
      className={cn('mask', className)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
    >
      <motion.span
        variants={{ hidden: { y: '125%' }, show: { y: '0%' } }}
        transition={{ duration, delay, ease: EASE }}
        className="block will-change-transform"
      >
        {children}
      </motion.span>
    </motion.span>
  );
}

/** Per-character stagger, used for the hero wordmark. */
export function MaskChars({
  text,
  className,
  charClassName,
  delay = 0,
  stagger = 0.055,
  duration = 1.1,
  float = false,
}: {
  text: string;
  className?: string;
  charClassName?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  /** Once the entrance reveal settles, each letter idles with its own gentle bob. */
  float?: boolean;
}) {
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  const child: Variants = {
    // 125% rather than ~110%: with tight display line-heights the mask's
    // bottom clip allowance can otherwise bleed the incoming glyph tops.
    hidden: { y: '125%' },
    show: { y: '0%', transition: { duration, ease: EASE } },
  };

  return (
    <motion.span
      variants={container}
      initial="hidden"
      animate="show"
      className={cn('flex', className)}
      aria-label={text}
    >
      {text.split('').map((ch, i) => {
        const floatDelay = delay + i * stagger + duration + i * 0.09;
        return (
        <span
          key={i}
          className={cn(float && 'char-float')}
          style={
            float
              ? { animationDelay: `${floatDelay}s`, animationDuration: `${2.4 + (i % 3) * 0.35}s` }
              : undefined
          }
        >
        <span className="mask" aria-hidden>
          <motion.span variants={child} className={cn('block will-change-transform', charClassName)}>
            {ch === ' ' ? ' ' : ch}
          </motion.span>
        </span>
        </span>
        );
      })}
    </motion.span>
  );
}

/** Simple fade + rise, for supporting copy and UI chrome. */
export function Rise({
  children,
  className,
  delay = 0,
  y = 24,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-12%' }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
