import { useEffect, useState } from 'react';

const SECS = ['hero', 'about', 'skills', 'projects', 'experience', 'process', 'roles', 'philosophy', 'contact'];

export function useScrollFx() {
  const [active, setActive] = useState('hero');
  const [solid, setSolid] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const sh = document.body.scrollHeight - window.innerHeight;
      setProgress(sh > 0 ? (window.scrollY / sh) * 100 : 0);
      setSolid(window.scrollY > 60);
      const mid = window.innerHeight * 0.45;
      let act = SECS[0];
      SECS.forEach((id) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= mid) act = id;
      });
      setActive(act);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return { active, solid, progress, sections: SECS };
}

export function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}
