'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useContactModal } from '@/components/providers/contact-modal-provider';

const LINE = 'So — are you ready to stand out?';

/**
 * Second pinned horizontal run: an oversized line of type that tracks sideways
 * while the section holds the viewport, mirroring the reference's closing beat.
 */
export function Cta() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const { open: openContact } = useContactModal();

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      const mm = gsap.matchMedia();
      mm.add('(min-width: 1024px)', () => {
        const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);

        const tween = gsap.fromTo(
          track,
          { x: 0 },
          {
            x: () => -distance(),
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: () => `+=${distance()}`,
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          },
        );

        return () => tween.scrollTrigger?.kill();
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" className="mt-[160px] lg:mt-[260px]">
      <div
        ref={sectionRef}
        className="relative flex min-h-svh w-full items-center overflow-hidden bg-[var(--foreground)] py-20 text-[var(--background)] lg:h-svh lg:py-0"
      >
        {/* Mobile/tablet: wraps and stacks normally. Desktop (lg): becomes the
            single nowrap line the GSAP horizontal scrub pins and drags. */}
        <div
          ref={trackRef}
          className="edge flex flex-col items-start gap-10 lg:w-max lg:flex-row lg:items-center lg:gap-0 lg:whitespace-nowrap lg:pl-[8vw]"
        >
          <h2 className="text-[11vw] font-medium uppercase leading-[1.05] tracking-[-0.04em] sm:text-[9vw] lg:text-[13vw] lg:leading-none">
            {LINE}
          </h2>
          <button
            type="button"
            onClick={openContact}
            className="group grid h-24 w-24 shrink-0 place-items-center rounded-full bg-[var(--accent)] text-sm uppercase tracking-[0.12em] text-white lg:ml-[6vw] lg:mr-[8vw] lg:h-44 lg:w-44 lg:text-base"
          >
            <span className="transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:scale-110">
              Let&rsquo;s talk
            </span>
          </button>
        </div>
      </div>
    </section>
  );
}
