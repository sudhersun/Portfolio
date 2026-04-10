import { experience } from '../data/experience.js';

export default function Experience() {
  return (
    <section id="experience">
      <div className="sec-inner">
        <div className="rv">
          <div className="label">Work History</div>
          <h2 className="sec-title">Experience.</h2>
        </div>
        <div className="tl">
          <div className="tl-line" aria-hidden="true"></div>
          {experience.map((ex, i) => (
            <div className="tl-item" style={{ animationDelay: `${i * 0.1}s` }} key={ex.role + i}>
              <div className="tl-dot" aria-hidden="true"></div>
              <div className="tl-period">{ex.period}</div>
              <div className="tl-role">{ex.role}</div>
              <div className="tl-co">
                {ex.company}
                {ex.badge?.label && (
                  <span className="tl-badge" style={ex.badge.style}>{ex.badge.label}</span>
                )}
              </div>
              {ex.bullets.length > 0 && (
                <ul className="tl-ul">
                  {ex.bullets.map((b) => <li key={b}>{b}</li>)}
                </ul>
              )}
              {ex.tags?.length > 0 && (
                <div className="tl-tags">
                  {ex.tags.map((t) => (
                    <span key={t.label} className={`tag ${t.cls || ''}`.trim()}>{t.label}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
