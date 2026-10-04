import About from './components/About';
import Contact from './components/Contact';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';

/**
 * Server Component. architecture.md ADR-004.
 *
 * Sections own their own entrance animation through ui/Reveal, so this file
 * stays a plain composition. The previous build wrapped every section in a
 * second animating container, which double-animated and blurred text (A6).
 */
export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
    </>
  );
}
