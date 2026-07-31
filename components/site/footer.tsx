'use client';

import { useEffect, useState } from 'react';
import { MaskText, Rise } from '@/components/motion/mask-text';
import { SocialLinks } from '@/components/site/social-links';
import { useContactModal } from '@/components/providers/contact-modal-provider';
import { navLinks, site } from '@/lib/site';
import { useFitText } from '@/lib/use-fit-text';

/** Link whose label rolls up to an accent-coloured duplicate on hover. */
function RollLink({ label, href }: { label: string; href: string }) {
  return (
    <a href={href} className="group relative block overflow-hidden py-1 text-sm uppercase tracking-wide">
      <span className="mask block">
        <span className="block transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:-translate-y-full">
          {label}
        </span>
      </span>
      <span className="mask absolute inset-0 block py-1" aria-hidden>
        <span className="text-accent block translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:translate-y-0">
          {label}
        </span>
      </span>
    </a>
  );
}

export function Footer() {
  const { containerRef, measureRef, fontSize } = useFitText<HTMLDivElement>(site.wordmark);
  const { open: openContact } = useContactModal();

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 1023px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // Fit-to-width sizing reads flush on desktop but runs a touch large on
  // mobile, so trim it back by a fixed amount there.
  const wordmarkSize = fontSize ? fontSize - (isMobile ? 50 : 0) : null;

  return (
    <footer className="edge relative z-20 pb-6 pt-24 lg:pt-32">
      <div className="flex flex-col justify-between gap-14 md:flex-row md:items-center">
        <div className="space-y-10">
          <h2 className="text-display-sm max-w-[16ch] font-medium leading-[1.02] tracking-tight">
            <MaskText>Design it once.</MaskText>
            <MaskText delay={0.08}>Design it right.</MaskText>
          </h2>

          <Rise delay={0.1}>
            <button
              type="button"
              onClick={openContact}
              className="group inline-flex w-full max-w-md items-center justify-center gap-2 bg-[var(--foreground)] px-8 py-4 text-[var(--background)] transition-colors hover:bg-[var(--accent)]"
            >
              Let&rsquo;s Talk
              <span className="transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:translate-x-1">
                &rarr;
              </span>
            </button>
          </Rise>
        </div>

        <div className="grid grid-cols-1 items-center gap-6 sm:grid-cols-2 sm:gap-10 lg:gap-24">
          <nav aria-label="Footer" className="flex flex-wrap gap-6 sm:gap-10">
            {navLinks.map((l) => (
              <RollLink key={l.label} label={l.label} href={l.href} />
            ))}
          </nav>
          <nav aria-label="Social">
            <SocialLinks iconClassName="h-6 w-6" />
          </nav>
        </div>
      </div>

      {/* Oversized wordmark sign-off, scaled flush to the viewport */}
      <div className="mt-20 lg:mt-28">
        {/* w-0 overflow-hidden keeps this off the page's scrollable width —
            getBoundingClientRect() on the inner span still reports its true
            natural size, so the fit-text measurement is unaffected. */}
        <span aria-hidden className="pointer-events-none absolute w-0 overflow-hidden">
          <span
            ref={measureRef}
            className="invisible whitespace-pre font-medium uppercase"
            style={{ fontSize: 100, letterSpacing: '-0.05em', lineHeight: 1 }}
          >
            {site.wordmark}
          </span>
        </span>
        <div
          ref={containerRef}
          className="w-full font-medium uppercase"
          style={{
            fontSize: wordmarkSize ? `${wordmarkSize}px` : undefined,
            letterSpacing: '-0.05em',
            lineHeight: 0.8,
            visibility: wordmarkSize ? 'visible' : 'hidden',
          }}
        >
          <MaskText duration={1.1}>{site.wordmark}</MaskText>
        </div>
      </div>

      {/* pr-20 keeps the legal row clear of the fixed theme toggle */}
      <div className="border-line text-muted mt-10 flex flex-col justify-between gap-3 border-t pb-4 pr-0 pt-5 text-xs sm:flex-row sm:pr-20">
        <p>
          &copy; {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
        <div className="flex gap-6">
          <a href="#terms" className="hover:text-accent transition-colors">
            Terms &amp; Conditions
          </a>
          <a href="#privacy" className="hover:text-accent transition-colors">
            Privacy Policy
          </a>
        </div>
      </div>
    </footer>
  );
}
