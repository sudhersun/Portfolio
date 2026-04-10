import { skills } from '../data/skills.js';

export default function Skills() {
  return (
    <section id="skills">
      <div className="sec-inner">
        <div className="rv">
          <div className="label">Expertise</div>
          <h2 className="sec-title">Skills & Toolkit.</h2>
          <p className="sec-sub">A full-stack design and engineering skillset — from early-stage UX research through to production React.js implementation.</p>
        </div>
        <div className="skills-grid">
          {skills.map((s, i) => (
            <div className={`sk-card rv d${i + 1}`} key={s.title}>
              <div className="sk-ic" style={s.iconStyle}>{s.icon}</div>
              <div className="sk-tt">{s.title}</div>
              <div className="sk-tg">
                {s.tags.map((t) => (
                  <span key={t.label} className={`tag ${t.cls || ''}`.trim()}>{t.label}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
