import { scrollToSection } from '../hooks/useScrollFx.js';

const links = [
  ['hero', 'Home'], ['about', 'About'], ['skills', 'Skills'],
  ['projects', 'Projects'], ['process', 'Process'],
  ['experience', 'Experience'], ['contact', 'Contact'],
];

export default function Navbar({ active, solid, dark, onToggleTheme }) {
  return (
    <nav id="main-nav" className={solid ? 'solid' : ''}>
      <a href="#hero" className="logo" onClick={(e) => { e.preventDefault(); scrollToSection('hero'); }}>
        <span className="logo-dot"></span>Sudhersun
      </a>
      <ul className="nl">
        {links.map(([id, label]) => (
          <li key={id}>
            <a
              href={`#${id}`}
              data-sec={id}
              className={active === id ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); scrollToSection(id); }}
            >{label}</a>
          </li>
        ))}
      </ul>
      <div className="nr">
        <button id="tgl" title="Toggle theme" onClick={onToggleTheme}>{dark ? '☀' : '☾'}</button>
        <button className="nav-cta" onClick={() => scrollToSection('contact')}>Hire Me</button>
      </div>
    </nav>
  );
}
