import { philosophy } from '../data/philosophy.js';

export default function Philosophy() {
  return (
    <section id="philosophy">
      <div className="sec-inner">
        <div className="rv">
          <div className="label">Mindset</div>
          <h2 className="sec-title">Design Philosophy.</h2>
          <p className="sec-sub">The principles that guide every decision — from first sketch to production code.</p>
        </div>
        <div className="ph-grid">
          {philosophy.map((p, i) => (
            <div className={`ph-card rv d${i + 1}`} key={p.title}>
              <div className="ph-ic">{p.icon}</div>
              <div className="ph-tt">{p.title}</div>
              <div className="ph-ds">{p.desc}</div>
              <div className="ph-q">{p.quote}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
