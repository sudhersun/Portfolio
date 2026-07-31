'use client';

import { MaskText, Rise } from '@/components/motion/mask-text';
import { ScrollWords } from '@/components/motion/scroll-words';
import { Marquee } from '@/components/site/marquee';
import { skills } from '@/lib/site';

const STATEMENT =
  "I'm a Product Designer and Frontend Developer passionate about creating digital products that solve real problems. My focus is on designing experiences that are intuitive, scalable, and memorable.";

export function Manifesto() {
  return (
    <section id="about" className="space-y-[160px] pt-[160px] lg:space-y-[260px] lg:pt-[260px]">
      <div className="edge space-y-20 lg:space-y-28">
        <Rise>
          <p className="text-muted text-center text-sm tracking-wide">
            <span className="text-accent">[ ! ]</span> Be the brand they never stop talking about
          </p>
        </Rise>

        <ScrollWords
          text={STATEMENT}
          className="text-display-sm mx-auto max-w-[22ch] font-normal leading-[1.04] tracking-tight lg:max-w-none lg:indent-[9rem]"
        />

        <div className="border-line border-t pt-10">
          <div className="grid gap-10 lg:grid-cols-2">
            <h2 className="text-muted text-base">
              <MaskText>Turning ideas into digital experiences.</MaskText>
            </h2>

            <div className="space-y-6 lg:justify-self-end lg:text-right">
              <p className="text-muted max-w-[50ch] text-base leading-relaxed">
                I combine product strategy, UX thinking, and modern interface design to create websites
                and applications that are engaging, accessible, and focused on achieving real business
                outcomes.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Two tracks running against each other — the reference's client strip. */}
      <div className="space-y-1">
        <Marquee items={skills} speed={42} />
        <Marquee items={[...skills].reverse()} speed={42} reverse />
      </div>
    </section>
  );
}
