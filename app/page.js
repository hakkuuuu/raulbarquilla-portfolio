'use client';
import About from './components/About';
import Hero from './components/Hero';
import NavBar from './components/NavBar';
import Projects from './components/Projects';

export default function Home() {
  return (
    <>
      <NavBar />
      <Hero />
      <About />
      <Projects />
    </>
  );
}
