import { useEffect } from 'react';

/**
 * Buttery wheel-driven smooth scroll. Lerps the scroll position toward a
 * target that accumulates from wheel deltas — gives a continuous Lenis-style
 * feel rather than the browser's native chunky steps.
 *
 * Disabled on touch devices and when prefers-reduced-motion is set.
 */
export function useSmoothScroll({ ease = 0.085, multiplier = 0.9 } = {}) {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (matchMedia('(hover: none)').matches) return;

    let target = window.scrollY;
    let current = window.scrollY;
    let raf = null;
    let running = false;

    const max = () => document.documentElement.scrollHeight - window.innerHeight;
    const clamp = (v) => Math.max(0, Math.min(v, max()));

    const tick = () => {
      current += (target - current) * ease;
      if (Math.abs(target - current) < 0.3) {
        current = target;
        window.scrollTo(0, current);
        running = false;
        raf = null;
        return;
      }
      window.scrollTo(0, current);
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      raf = requestAnimationFrame(tick);
    };

    const onWheel = (e) => {
      if (e.ctrlKey) return; // pinch-zoom
      e.preventDefault();
      // Normalize delta across deltaMode (0=px,1=line,2=page)
      let dy = e.deltaY;
      if (e.deltaMode === 1) dy *= 16;
      else if (e.deltaMode === 2) dy *= window.innerHeight;
      target = clamp(target + dy * multiplier);
      start();
    };

    // When something else (anchor click, keyboard) moves the page, sync.
    const sync = () => {
      if (!running) {
        target = window.scrollY;
        current = window.scrollY;
      }
    };

    // Override scrollIntoView so anchor clicks animate via the same loop
    const animateTo = (y) => {
      target = clamp(y);
      start();
    };

    const onAnchorClick = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute('href').slice(1);
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      const rect = el.getBoundingClientRect();
      animateTo(window.scrollY + rect.top);
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('resize', sync);
    document.addEventListener('click', onAnchorClick);

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('resize', sync);
      document.removeEventListener('click', onAnchorClick);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ease, multiplier]);
}
