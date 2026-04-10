import { roles } from '../data/roles.js';

export default function Roles() {
  return (
    <section id="roles">
      <div className="sec-inner">
        <div className="rv">
          <div className="label">What I Do</div>
          <h2 className="sec-title">Key Responsibilities.</h2>
          <p className="sec-sub">From research to React — a holistic skill set across design, engineering, and collaboration.</p>
        </div>
        <div className="roles-grid">
          {roles.map((r, i) => (
            <div className={`rl-card rv d${i + 1}`} key={r.n}>
              <div className="rl-n">{r.n}</div>
              <div className="rl-tt">{r.title}</div>
              <div className="rl-ds">{r.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
