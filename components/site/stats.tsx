'use client';

import { CountUp } from '@/components/motion/count-up';
import { Rise } from '@/components/motion/mask-text';
import { stats } from '@/lib/site';

export function Stats() {
  return (
    <section className="edge">
      <div className="border-line grid grid-cols-2 border-l lg:grid-cols-4">
        {stats.map((s, i) => (
          <Rise key={s.label} delay={i * 0.08}>
            <div className="border-line h-full space-y-2 border-r border-t px-6 py-10 lg:px-8 lg:py-14">
              <p className="text-display-sm font-medium leading-none tracking-tight">
                <CountUp value={s.value} />
              </p>
              <p className="text-muted text-sm">{s.label}</p>
            </div>
          </Rise>
        ))}
      </div>
    </section>
  );
}
