import { scrollToSection } from '../hooks/useScrollFx.js';

export default function Footer() {
  return (
    <footer>
      <div className="flo">Sudhersun<span>.</span>M</div>
      <div className="fcp">UI Engineer · Product Designer · Tirunelveli, TN</div>
      <div className="fln">
        <a href="#hero" onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }}>Top ↑</a>
        <a href="https://www.behance.net/sudhersunsun" target="_blank" rel="noreferrer">Behance ↗</a>
        <a href="https://github.com/sudhersun" target="_blank" rel="noreferrer">GitHub ↗</a>
        <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Contact</a>
      </div>
    </footer>
  );
}
