const strengths = [
  ['Core Strength 01', 'Full-Cycle Product Ownership', 'End-to-end ownership from discovery to developer handoff — research, wireframes, high-fidelity UI, and developer-ready Figma specs. Nothing falls through the gap.'],
  ['Core Strength 02', 'Design-to-Code Fluency', "I don't just hand off specs — I implement them. Building reusable component architectures in React.js directly from design systems ensures pixel-perfect delivery at speed."],
  ['Core Strength 03', 'Scalable Design Systems', 'Agile, documented UI pattern libraries and reusable components that scale across products — consistent, maintainable, and team-ready in both Figma and code.'],
  ['Core Strength 04', 'Cross-Functional Collaboration', 'Proven collaborator with product managers, engineers, clients, and stakeholders across SaaS, B2B, and analytics domains. Communication is the second design tool.'],
];

export default function About() {
  return (
    <section id="about">
      <div className="sec-inner">
        <div className="about-grid">
          <div className="rv rv-l">
            <div className="label">About Me</div>
            <h2 className="sec-title">Design + Code,<br />Combined.</h2>
            <div className="about-text">
              <p>I'm a <strong>UI Engineer & Product Designer</strong> with 3.6 years of experience delivering scalable digital products across SaaS, B2B, analytics, and e-commerce platforms — based in Tirunelveli, Tamil Nadu.</p>
              <p>My edge is working across both disciplines seamlessly. I speak Figma and React fluently — translating complex business requirements into <strong>intuitive, performance-focused user experiences</strong> aligned with product goals.</p>
              <p>Currently at <strong>Soft Suave Technology</strong>, leading end-to-end UI/UX design and frontend development, mentoring designers, and managing multiple high-impact projects across diverse client domains.</p>
            </div>
            <div className="about-links">
              <a href="https://github.com/sudhersun" target="_blank" rel="noreferrer" className="btn bs">GitHub ↗</a>
              <a href="https://www.behance.net/sudhersunsun" target="_blank" rel="noreferrer" className="btn bs">Behance ↗</a>
              <a href="mailto:sudhersun346@gmail.com" className="btn bo">Email ↗</a>
            </div>
          </div>
          <div className="about-cards rv rv-r">
            {strengths.map(([n, t, d], i) => (
              <div className={`str-card d${i + 1}`} key={n}>
                <div className="str-n">{n}</div>
                <div className="str-t">{t}</div>
                <div className="str-d">{d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
