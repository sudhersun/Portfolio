import { useEffect } from 'react';

export function useReveal() {
  useEffect(() => {
    const obs = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && e.target.classList.add('in')),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.rv, .rv-l, .rv-r').forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}
