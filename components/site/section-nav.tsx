'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const SECTIONS = [
  { id: 'top', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'services', label: 'Services' },
  { id: 'contact', label: 'Contact' },
];

/** Fixed dash rail on the right edge — jumps to a section and tracks which one is in view. */
export function SectionNav() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    // A thin band across the vertical centre of the viewport: whichever
    // section currently crosses it counts as the one being read.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const i = SECTIONS.findIndex((s) => s.id === entry.target.id);
          if (i !== -1) setActive(i);
        });
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    );

    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter((el): el is HTMLElement => !!el);
    els.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Section navigation"
      className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-4 lg:flex"
    >
      {SECTIONS.map((s, i) => (
        <a key={s.id} href={`#${s.id}`} aria-label={s.label} aria-current={active === i} className="group py-1">
          <span
            className={cn(
              'block h-[2px] rounded-full transition-all duration-500 ease-[cubic-bezier(0.33,1,0.68,1)]',
              active === i
                ? 'bg-foreground w-8'
                : 'bg-muted w-4 opacity-50 group-hover:w-6 group-hover:opacity-90',
            )}
          />
        </a>
      ))}
    </nav>
  );
}
