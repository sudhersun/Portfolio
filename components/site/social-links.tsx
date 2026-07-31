'use client';

import { socials } from '@/lib/site';
import { cn } from '@/lib/utils';

export function SocialLinks({
  items = socials,
  className,
  linkClassName,
  iconClassName,
}: {
  items?: typeof socials;
  className?: string;
  linkClassName?: string;
  iconClassName?: string;
}) {
  return (
    <div className={cn('flex items-center gap-4', className)}>
      {items.map(({ label, href, icon: Icon }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            'text-muted hover:text-accent inline-flex transition-all duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] hover:-translate-y-0.5',
            linkClassName,
          )}
        >
          <Icon className={cn('h-[18px] w-[18px]', iconClassName)} />
        </a>
      ))}
    </div>
  );
}
