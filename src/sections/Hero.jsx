import { scrollToSection } from '../hooks/useScrollFx.js';

const marqueeItems = [
  'UI Engineering', 'UX Design', 'React.js', 'Design Systems',
  'Figma', 'Interaction Design', 'Prototyping', 'Frontend Dev',
];

export default function Hero() {
  return (
    <section id="hero">
      <div className="hero-bg"></div>
      <div className="hero-noise"></div>
      <div className="hero-inner">
        <div>
          <div className="hero-eyebrow"><span className="hero-live"></span>Open to Opportunities · 2025</div>
          <h1 className="hero-h1">
            <span className="ln"><span className="wd">Sudhersun M</span></span>
            <span className="ln"><span className="wd ca">UI Engineer</span></span>
            <span className="ln"><span className="wd cb">&amp; Designer</span></span>
          </h1>
          <div className="hero-role">UI Engineer · Product Designer · Frontend Specialist (React)</div>
          <p className="hero-sub">3.5 years delivering scalable digital products across SaaS, B2B, analytics, and e-commerce — bridging pixel-perfect design with production-ready code.</p>
          <div className="hero-acts">
            <a href="#projects" className="btn bp" onClick={(e) => { e.preventDefault(); scrollToSection('projects'); }}>View Projects ↓</a>
            <a href="https://www.behance.net/sudhersunsun" target="_blank" rel="noreferrer" className="btn bo">Behance ↗</a>
            <a href="#contact" className="btn bs" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Contact →</a>
          </div>
        </div>
        <div className="hero-kpis">
          <div className="kpi"><div className="kpi-n">3.5<em>+</em></div><div className="kpi-l">Years Experience</div></div>
          <div className="kpi"><div className="kpi-n">5<em>+</em></div><div className="kpi-l">Products Shipped</div></div>
          <div className="kpi"><div className="kpi-n">B2B<em>·</em></div><div className="kpi-l">SaaS Domains</div></div>
        </div>
      </div>
      <div className="hero-scroll wrap">
        <div className="scroll-line"></div>Scroll to explore<span className="scroll-arrow">↓</span>
      </div>
      <div className="mq">
        <div className="mq-t">
          {[...marqueeItems, ...marqueeItems].map((it, i) => (
            <span className="mi" key={i}>{it}<span className="md"></span></span>
          ))}
        </div>
      </div>
    </section>
  );
}
