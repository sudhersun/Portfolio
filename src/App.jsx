import Cursor from './components/Cursor.jsx';
import ProgressBar from './components/ProgressBar.jsx';
import Navbar from './components/Navbar.jsx';
import SectionDots from './components/SectionDots.jsx';
import Footer from './components/Footer.jsx';

import Hero from './sections/Hero.jsx';
import About from './sections/About.jsx';
import Skills from './sections/Skills.jsx';
import Projects from './sections/Projects.jsx';
import Process from './sections/Process.jsx';
import Roles from './sections/Roles.jsx';
import Experience from './sections/Experience.jsx';
import Philosophy from './sections/Philosophy.jsx';
import Contact from './sections/Contact.jsx';

import { useReveal } from './hooks/useReveal.js';
import { useTheme } from './hooks/useTheme.js';
import { useScrollFx } from './hooks/useScrollFx.js';
import { useCursor } from './hooks/useCursor.js';
import { useSmoothScroll } from './hooks/useSmoothScroll.js';

export default function App() {
  useCursor();
  useReveal();
  useSmoothScroll();
  const { dark, toggle } = useTheme();
  const { active, solid, progress, sections } = useScrollFx();

  return (
    <>
      <Cursor />
      <ProgressBar progress={progress} />
      <Navbar active={active} solid={solid} dark={dark} onToggleTheme={toggle} />
      <SectionDots sections={sections} active={active} />

      <Hero />
      <About />
      <div className="div"></div>
      <Skills />
      <div className="div"></div>
      <Projects />
      <div className="div"></div>
      <Experience />
      <div className="div"></div>
      <Process />
      <div className="div"></div>
      <Roles />
      <div className="div"></div>
      <Philosophy />
      <div className="div"></div>
      <Contact />

      <Footer />
    </>
  );
}
