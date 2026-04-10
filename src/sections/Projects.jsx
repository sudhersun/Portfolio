import { projects } from '../data/projects.js';
import urmillaImg  from '../assets/projects-image/urmilla.png';

function Visual({ k }) {
  const layouts = {
    amd: (
      <>
        <div style={{ width: '100%', height: 8, background: 'rgba(232,255,107,.25)', borderRadius: 4 }}></div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, width: '100%' }}>
          <div style={{ height: 64, background: 'rgba(232,255,107,.1)', borderRadius: 10, border: '1px solid rgba(232,255,107,.15)' }}></div>
          <div style={{ height: 64, background: 'rgba(232,255,107,.07)', borderRadius: 10, border: '1px solid rgba(232,255,107,.1)' }}></div>
          <div style={{ height: 64, background: 'rgba(232,255,107,.04)', borderRadius: 10, border: '1px solid rgba(232,255,107,.08)' }}></div>
        </div>
        <div style={{ width: '100%', height: 80, background: 'rgba(232,255,107,.05)', borderRadius: 10, border: '1px solid rgba(232,255,107,.1)' }}></div>
        <div style={{ width: '70%', height: 8, background: 'rgba(232,255,107,.12)', borderRadius: 4 }}></div>
      </>
    ),
    urmilla: (
      <>
        {/* <div style={{ display: 'flex', gap: 10, width: '100%' }}>
          <div style={{ flex: 1, height: 88, background: 'rgba(107,232,255,.1)', borderRadius: 10, border: '1px solid rgba(107,232,255,.18)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 26, height: 26, borderRadius: '50%', border: '2px solid rgba(107,232,255,.5)' }}></div>
          </div>
          <div style={{ flex: 2, height: 88, background: 'rgba(107,232,255,.05)', borderRadius: 10, border: '1px solid rgba(107,232,255,.1)' }}></div>
        </div>
        <div style={{ width: '100%', height: 7, background: 'rgba(107,232,255,.2)', borderRadius: 4 }}></div>
        <div style={{ width: '60%', height: 7, background: 'rgba(107,232,255,.1)', borderRadius: 4 }}></div> */}
        <img src={urmillaImg} className='project-thumbnail'style={{borderRadius: '16px'}} alt="" />
      </>
    ),
    smart: (
      <>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, width: '100%' }}>
          <div style={{ height: 76, background: 'rgba(255,107,232,.1)', borderRadius: 10, border: '1px solid rgba(255,107,232,.16)' }}></div>
          <div style={{ height: 76, background: 'rgba(255,107,232,.06)', borderRadius: 10, border: '1px solid rgba(255,107,232,.1)' }}></div>
        </div>
        <div style={{ width: '100%', height: 48, background: 'rgba(255,107,232,.06)', borderRadius: 10, border: '1px solid rgba(255,107,232,.1)' }}></div>
        <div style={{ width: '100%', height: 7, background: 'rgba(255,107,232,.18)', borderRadius: 4 }}></div>
      </>
    ),
    phoenix: (
      <>
        <div style={{ display: 'flex', gap: 10, width: '100%' }}>
          <div style={{ flex: 2, height: 80, background: 'rgba(251,146,60,.08)', borderRadius: 10, border: '1px solid rgba(251,146,60,.14)' }}></div>
          <div style={{ flex: 1, height: 80, background: 'rgba(251,146,60,.05)', borderRadius: 10, border: '1px solid rgba(251,146,60,.1)' }}></div>
        </div>
        <div style={{ width: '100%', height: 7, background: 'rgba(251,146,60,.2)', borderRadius: 4 }}></div>
        <div style={{ width: '55%', height: 7, background: 'rgba(251,146,60,.1)', borderRadius: 4 }}></div>
      </>
    ),
    emergex: (
      <>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, width: '100%' }}>
          <div style={{ height: 48, background: 'rgba(107,232,255,.12)', borderRadius: 8, border: '1px solid rgba(107,232,255,.2)' }}></div>
          <div style={{ height: 48, background: 'rgba(107,232,255,.08)', borderRadius: 8, border: '1px solid rgba(107,232,255,.14)' }}></div>
          <div style={{ height: 48, background: 'rgba(107,232,255,.05)', borderRadius: 8, border: '1px solid rgba(107,232,255,.1)' }}></div>
        </div>
        <div style={{ width: '100%', height: 64, background: 'rgba(107,232,255,.04)', borderRadius: 10, border: '1px solid rgba(107,232,255,.09)' }}></div>
        <div style={{ width: '100%', height: 7, background: 'rgba(107,232,255,.18)', borderRadius: 4 }}></div>
      </>
    ),
  };
  return <div className="pj-visual-inner">{layouts[k]}</div>;
}

export default function Projects() {
  return (
    <section id="projects">
      <div className="sec-inner">
        <div className="rv">
          <div className="label">Case Studies</div>
          <h2 className="sec-title">Featured Projects.</h2>
          <p className="sec-sub">End-to-end product work across enterprise B2B, SaaS, AI, and e-commerce domains.</p>
        </div>
        <div className="projects-list">
          {projects.map((p, i) => (
            <div
              className="pj-sticky"
              style={{ top: `calc(var(--nav) + ${i * 32}px)`, zIndex: i + 1 }}
              key={p.title}
            >
            <div className="pj">
              <div className="pj-info">
                <div className="pj-top">
                  <div className="pj-mt">
                    <span className="pj-num">{p.num} ——</span>
                    <span className={`tag ${p.badge.cls || ''}`.trim()} style={p.badge.style}>{p.badge.label}</span>
                  </div>
                  <div className="pj-title">{p.title}</div>
                  <p className="pj-desc">{p.desc}</p>
                  <div className="pj-tags">
                    {p.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
                  </div>
                </div>
                <div className="pj-lk">
                  <a href="https://www.behance.net/sudhersunsun" target="_blank" rel="noreferrer" className="pj-a">View on Behance ↗</a>
                </div>
              </div>
              <div className="pj-visual" style={{ background: p.visualBg }}>
                <Visual k={p.visualKey} />
              </div>
            </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
