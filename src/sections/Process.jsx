import { processSteps } from '../data/process.js';

export default function Process() {
  return (
    <section id="process">
      <div className="sec-inner">
        <div className="rv">
          <div className="label">Workflow</div>
          <h2 className="sec-title">Design Process.</h2>
          <p className="sec-sub">A repeatable, research-led framework that turns ambiguity into shipped product.</p>
        </div>

        <div className="process-flow">
          <div className="pf-row pf-row-5">
            <div className="pf-line" aria-hidden="true"></div>
            {processSteps.map((s, i) => (
              <div className="pf-step" style={{ animationDelay: `${i * 0.08}s` }} key={s.n}>
                <div className="pf-node"><span className="pf-ic">{s.icon}</span></div>
                <div className="pf-num">{s.n}</div>
                <div className="pf-tt">{s.title}</div>
                <div className="pf-ds">{s.desc}</div>
                <div className="pf-role">{s.role}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
