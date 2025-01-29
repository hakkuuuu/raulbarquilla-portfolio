'use client';
import { motion } from 'framer-motion';
import About from './components/About';
import Contact from './components/Contact';
import Hero from './components/Hero';
import NavBar from './components/NavBar';
import Projects from './components/Projects';

export default function Home() {
  return (
    <>
      <NavBar />

      <motion.div
        id="hero"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <Hero />
      </motion.div>

      <motion.div
        id="about"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <About />
      </motion.div>

      <motion.div
        id="projects"
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <Projects />
      </motion.div>

      <motion.div
        id="contact"
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <Contact />
      </motion.div>
    </>
  );
}
