import { scrollToSection } from '../hooks/useScrollFx.js';

export default function SectionDots({ sections, active }) {
  return (
    <div id="sdots">
      {sections.map((id) => (
        <div
          key={id}
          className={`sdot ${active === id ? 'on' : ''}`}
          onClick={() => scrollToSection(id)}
        />
      ))}
    </div>
  );
}
