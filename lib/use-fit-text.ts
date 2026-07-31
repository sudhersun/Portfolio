'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Scales a single line of text so it spans its container exactly, the way the
 * reference site's hero wordmark sits flush to both edges at every viewport.
 *
 * Measures the glyph run once at a known size, then solves for the font-size
 * that makes it match the container — no binary search, no layout thrash.
 */
export function useFitText<T extends HTMLElement = HTMLDivElement>(text: string) {
  const containerRef = useRef<T>(null);
  const measureRef = useRef<HTMLSpanElement>(null);
  const [fontSize, setFontSize] = useState<number | null>(null);

  const fit = useCallback(() => {
    const container = containerRef.current;
    const measure = measureRef.current;
    if (!container || !measure) return;

    const available = container.clientWidth;
    const natural = measure.getBoundingClientRect().width;
    if (!available || !natural) return;

    // measure span is pinned at 100px, so the ratio scales linearly
    setFontSize((available / natural) * 100);
  }, []);

  useEffect(() => {
    fit();
    const ro = new ResizeObserver(fit);
    if (containerRef.current) ro.observe(containerRef.current);
    // webfont swap changes the metrics underneath us
    document.fonts?.ready.then(fit);
    return () => ro.disconnect();
  }, [fit, text]);

  return { containerRef, measureRef, fontSize };
}
