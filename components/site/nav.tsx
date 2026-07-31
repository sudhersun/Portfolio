'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react';
import { SocialLinks } from '@/components/site/social-links';
import { useContactModal } from '@/components/providers/contact-modal-provider';
import { navLinks, site, socials } from '@/lib/site';
import { cn } from '@/lib/utils';

const EASE = [0.33, 1, 0.68, 1] as const;

function NavCol({ items }: { items: { label: string; href: string }[] }) {
  return (
    <ul className="hidden flex-col gap-1 text-sm lg:flex">
      {items.map((l) => (
        <li key={l.label}>
          <a href={l.href} className="group relative inline-block overflow-hidden">
            <span className="mask block">
              <span className="block transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:-translate-y-full">
                {l.label}
              </span>
            </span>
            <span className="mask absolute inset-0 block" aria-hidden>
              <span className="text-accent block translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:translate-y-0">
                {l.label}
              </span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();
  const { open: openContact } = useContactModal();

  // Retract while reading downward, return the moment the user scrolls back up.
  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    if (open) return setHidden(false);
    setHidden(y > prev && y > 220);
  });

  return (
    <>
      <motion.nav
        animate={{ y: hidden ? '-105%' : '0%' }}
        transition={{ duration: 0.5, ease: EASE }}
        className="border-line fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b bg-[var(--background)] p-4 lg:px-8"
      >
        <a href="#top" className="text-xl font-bold tracking-tight">
          {site.wordmark}
        </a>

        <div className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 items-center gap-10 lg:flex">
          <NavCol items={[{ label: 'About', href: '#about' }]} />
          <NavCol items={[{ label: 'Work', href: '#work' }]} />
          <SocialLinks items={socials.slice(0, 2)} iconClassName="h-5 w-5" />
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={openContact}
            className="group hidden items-center gap-2 bg-[var(--foreground)] px-5 py-2.5 text-sm text-[var(--background)] transition-colors hover:bg-[var(--accent)] lg:inline-flex"
          >
            Let&rsquo;s Talk
            <span className="transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:translate-x-1">
              &rarr;
            </span>
          </button>

          {/* Spacer so the bar keeps its layout; the real button lives outside
              .nav below so it isn't capped by the nav's own z-50 stacking
              context (a nested z-index can never outrank a sibling context). */}
          <div className="h-10 w-10 lg:hidden" aria-hidden />
        </div>
      </motion.nav>

      <motion.button
        animate={{ y: hidden ? '-105%' : '0%' }}
        transition={{ duration: 0.5, ease: EASE }}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        className={cn(
          'fixed right-4 top-4 z-[80] flex h-10 w-10 flex-col items-center justify-center gap-[5px] lg:hidden',
          open && 'text-white',
        )}
      >
        <span
          className={cn(
            'block h-[1.5px] w-6 bg-current transition-transform duration-400 ease-[cubic-bezier(0.33,1,0.68,1)]',
            open && 'translate-y-[3.25px] rotate-45',
          )}
        />
        <span
          className={cn(
            'block h-[1.5px] w-6 bg-current transition-transform duration-400 ease-[cubic-bezier(0.33,1,0.68,1)]',
            open && '-translate-y-[3.25px] -rotate-45',
          )}
        />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: EASE }}
            className="fixed inset-0 z-[60] flex flex-col justify-center gap-12 bg-[var(--accent)] p-4 text-white lg:px-8"
          >
            <SocialLinks
              linkClassName="text-white/80 hover:text-white hover:translate-y-0"
              iconClassName="h-6 w-6"
            />

            <ul className="flex flex-col">
              {navLinks.map((l, i) => (
                <li key={l.label} className="mask">
                  <motion.a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    initial={{ y: '110%' }}
                    animate={{ y: '0%' }}
                    transition={{ duration: 0.7, delay: 0.15 + i * 0.06, ease: EASE }}
                    className="block py-1 text-display-sm font-medium uppercase"
                  >
                    {l.label}
                  </motion.a>
                </li>
              ))}
            </ul>

            <div className="text-sm uppercase opacity-80">{site.email}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
