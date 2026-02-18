'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import About from './components/About';
import Contact from './components/Contact';
import Hero from './components/Hero';
import NavBar from './components/NavBar';
import Projects from './components/Projects';
import { LoadingScreen } from './components/LoadingScreen';
import Skills from './components/Skills';
import CustomCursor from './components/CustomCursor';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <style>{`@media (min-width: 768px) { * { cursor: none !important; } }`}</style>
      <CustomCursor />

      {isLoading ? (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      ) : (
        <>
          <NavBar />

          <motion.div
            id="hero"
            className="scroll-mt-40"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <Hero />
          </motion.div>

          <motion.div
            id="about"
            className="scroll-mt-32"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
          >
            <About />
          </motion.div>

          <motion.div
            id="skills"
            className="scroll-mt-40"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
          >
            <Skills />
          </motion.div>

          <motion.div
            id="projects"
            className="scroll-mt-40"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
          >
            <Projects />
          </motion.div>

          <motion.div
            id="contact"
            className="scroll-mt-40"
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
          >
            <Contact />
          </motion.div>
        </>
      )}
    </>
  );
}