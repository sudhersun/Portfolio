import { Nav } from '@/components/site/nav';
import { Hero } from '@/components/site/hero';
import { Manifesto } from '@/components/site/manifesto';
import { Stats } from '@/components/site/stats';
import { Work } from '@/components/site/work';
import { Services } from '@/components/site/services';
import { Cta } from '@/components/site/cta';
import { Footer } from '@/components/site/footer';
import { SectionNav } from '@/components/site/section-nav';
import { ThemeToggle } from '@/components/site/theme-toggle';

export default function Home() {
  return (
    <>
      <Nav />
      <ThemeToggle />
      <SectionNav />
      <main className="w-screen overflow-x-clip">
        <Hero />
        <Manifesto />
        <Stats />
        <Work />
        <Services />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
