'use client';

import { motion, useScroll, useTransform, type MotionValue } from 'motion/react';
import { useRef } from 'react';
import { cn } from '@/lib/utils';

function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    /* indent-0: the paragraph's text-indent would otherwise be re-applied
       inside every inline-block word, padding each one out by the full indent. */
    <span className="relative mr-[0.25em] inline-block indent-0">
      <motion.span style={{ opacity }}>{word}</motion.span>
    </span>
  );
}

/**
 * Scroll-linked word-by-word reveal: each word fades from ghosted to solid as
 * the block travels through the viewport, so reading pace follows scroll pace.
 */
export function ScrollWords({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.9', 'end 0.55'],
  });

  const words = text.split(' ');

  // Normal inline flow, not flex — flex would break natural line wrapping and
  // ignore text-indent on the opening line.
  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = (i + 1) / words.length;
        return <Word key={i} word={word} progress={scrollYProgress} range={[start, end]} />;
      })}
    </p>
  );
}
