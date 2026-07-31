'use client';

import { useLayoutEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects, type Project } from '@/lib/site';

const PANEL_COUNT = projects.length + 1; // +1 for the intro title panel

function Panel({ project, index }: { project: Project; index: number }) {
  return (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`View ${project.title} case study on Behance`}
      className="group flex h-screen w-screen shrink-0 flex-col"
      style={{ background: project.bg, color: project.fg }}
    >
      {/* Full-bleed artwork occupies the upper field. project.bg shows through
          while the placeholder loads, then the real photo covers it. */}
      <div className="relative min-h-0 flex-1 overflow-hidden">
        <Image
          src={project.image}
          alt={`${project.title} case study`}
          fill
          sizes="100vw"
          className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:scale-105"
          priority={index === 0}
        />
      </div>

      {/* Solid info strip, as on the reference panels */}
      <div className="shrink-0 space-y-4 p-4 pb-8 lg:space-y-6 lg:p-8 lg:pb-10">
        <p className="max-w-[46ch] text-sm leading-relaxed opacity-70 lg:text-base">{project.description}</p>

        <div className="flex items-end justify-between gap-6">
          <h3 className="text-[clamp(2.75rem,8.5vw,7.5rem)] font-medium uppercase leading-[0.85] tracking-[-0.04em]">
            {project.title}
          </h3>

          <span
            aria-hidden
            className="relative mb-2 grid h-14 w-14 shrink-0 place-items-center rounded-full border border-current/40 lg:h-16 lg:w-16"
          >
            <span
              className="absolute inset-0 scale-0 rounded-full transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:scale-100"
              style={{ background: project.accent }}
            />
            <span className="relative text-xl transition-transform duration-500 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:rotate-45">
              &#8599;
            </span>
          </span>
        </div>
      </div>
    </a>
  );
}

/** Cover panel for the horizontal track — sets up the section before the projects scroll into view. */
function WorkIntro() {
  return (
    <div className="bg-foreground text-background flex h-screen w-screen shrink-0 flex-col justify-between p-4 pb-8 lg:p-8 lg:pb-10">
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.14em] lg:text-sm">
        <span>Selected Work</span>
        <span className="opacity-60">
          01 / {String(PANEL_COUNT - 1).padStart(2, '0')}
        </span>
      </div>

      <div className="space-y-8 lg:space-y-10">
        <h2 className="text-mega font-medium uppercase leading-[0.82] tracking-[-0.04em]">
          Case
          <br />
          Studies
        </h2>

        <div className="flex items-center gap-3 text-sm uppercase tracking-wide opacity-70">
          <span>Scroll to explore</span>
          <span aria-hidden className="hidden text-xl lg:inline">
            &rarr;
          </span>
          <span aria-hidden className="text-xl lg:hidden">
            &darr;
          </span>
        </div>
      </div>
    </div>
  );
}

export function Work() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const track = trackRef.current;
      const section = sectionRef.current;
      if (!track || !section) return;

      // Only run the pinned horizontal track on desktop; below lg the markup
      // falls back to the stacked sticky cards.
      const mm = gsap.matchMedia();
      mm.add('(min-width: 1024px)', () => {
        const distance = () => track.scrollWidth - window.innerWidth;

        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            // Scroll length = horizontal distance, so travel feels 1:1.
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        return () => tween.scrollTrigger?.kill();
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="work" className="relative">
      {/* Desktop: pinned horizontal track */}
      <div ref={sectionRef} className="relative hidden overflow-hidden lg:block">
        <div ref={trackRef} className="flex w-max">
          <WorkIntro />
          {projects.map((p, i) => (
            <Panel key={p.slug} project={p} index={i} />
          ))}
        </div>
      </div>

      {/* Mobile: sticky stack, matching the reference's small-screen fallback */}
      <div className="lg:hidden">
        <div className="sticky top-0 h-svh">
          <WorkIntro />
        </div>
        {projects.map((p, i) => (
          <div key={p.slug} className="sticky top-0 h-svh">
            <Panel project={p} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}
