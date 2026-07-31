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
        className="relative flex h-svh w-full items-center overflow-hidden bg-[var(--foreground)] text-[var(--background)]"
      >
        <div ref={trackRef} className="flex w-max items-center whitespace-nowrap pl-[8vw]">
          <h2 className="text-[16vw] font-medium uppercase leading-none tracking-[-0.04em] lg:text-[13vw]">
            {LINE}
          </h2>
          <button
            type="button"
            onClick={openContact}
            className="group ml-[6vw] mr-[8vw] grid h-32 w-32 shrink-0 place-items-center rounded-full bg-[var(--accent)] text-base uppercase tracking-[0.12em] text-white lg:h-44 lg:w-44"
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
