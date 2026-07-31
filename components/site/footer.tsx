'use client';

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

        <div className="grid grid-cols-2 gap-10 lg:gap-24 items-center">
          <nav aria-label="Footer" className='flex gap-10'>
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
        <span
          ref={measureRef}
          aria-hidden
          className="pointer-events-none invisible absolute whitespace-pre font-medium uppercase"
          style={{ fontSize: 100, letterSpacing: '-0.05em', lineHeight: 1 }}
        >
          {site.wordmark}
        </span>
        <div
          ref={containerRef}
          className="w-full font-medium uppercase"
          style={{
            fontSize: fontSize ? `${fontSize}px` : undefined,
            letterSpacing: '-0.05em',
            lineHeight: 0.8,
            visibility: fontSize ? 'visible' : 'hidden',
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
