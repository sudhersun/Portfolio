import { useEffect } from 'react';

export function useCursor() {
  useEffect(() => {
    const cur = document.getElementById('cur');
    const curR = document.getElementById('cur-r');
    if (!cur || !curR) return;
    let mx = 0, my = 0, rx = 0, ry = 0, raf;
    const onMove = (e) => {
      mx = e.clientX; my = e.clientY;
      cur.style.left = mx + 'px';
      cur.style.top = my + 'px';
    };
    const loop = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      curR.style.left = rx + 'px';
      curR.style.top = ry + 'px';
      raf = requestAnimationFrame(loop);
    };
    document.addEventListener('mousemove', onMove);
    loop();
    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);
}
