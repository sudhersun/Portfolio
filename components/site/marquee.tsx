'use client';

import type { IconType } from 'react-icons';
import { cn } from '@/lib/utils';

type MarqueeItem = { label: string; icon?: IconType };

/**
 * Infinite ticker. The track holds two identical copies and translates by
 * exactly -50%, so the loop point is invisible.
 */
export function Marquee({
  items,
  reverse = false,
  speed = 38,
  className,
  itemClassName,
}: {
  items: MarqueeItem[];
  reverse?: boolean;
  speed?: number;
  className?: string;
  itemClassName?: string;
}) {
  const run = [...items, ...items];

  return (
    <div className={cn('group relative overflow-hidden', className)}>
      <div
        className="flex w-max"
        style={{
          animation: `marquee ${speed}s linear infinite`,
          animationDirection: reverse ? 'reverse' : 'normal',
        }}
      >
        {run.map((item, i) => (
          <div
            key={i}
            className={cn(
              'border-line bg-surface/60 mr-1 flex h-24 shrink-0 items-center justify-center gap-3 px-12 text-xl font-medium tracking-tight lg:h-32 lg:px-20 lg:text-2xl',
              itemClassName,
            )}
          >
            {item.icon ? <item.icon className="h-6 w-6 shrink-0 lg:h-7 lg:w-7" aria-hidden /> : null}
            {item.label}
          </div>
        ))}
      </div>
    </div>
  );
}
