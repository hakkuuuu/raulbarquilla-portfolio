'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiArrowDownRight } from 'react-icons/fi';

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay = 0) => ({
    opacity: 1,
    transition: { duration: 0.5, delay },
  }),
};

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden px-6 pt-20"
    >
      {/* Background glow blobs */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/10 dark:bg-blue-500/15 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/3 w-[300px] h-[300px] bg-blue-400/10 dark:bg-blue-400/10 rounded-full blur-[80px]" />
      </div>

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(to right, #3b82f6 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="max-w-3xl mx-auto text-center space-y-6">
        {/* Badge */}
        <motion.div
          className="flex justify-center"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          custom={0.1}
        >
          <span className="inline-flex items-center gap-2 border border-blue-500/40 bg-blue-500/5 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-medium px-4 py-1.5 rounded-full tracking-wide uppercase">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
            </span>
            Available to work
          </span>
        </motion.div>

        {/* Headline */}
        <div className="space-y-2">
          <motion.p
            className="text-sm font-medium text-gray-500 dark:text-gray-400 tracking-widest uppercase"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.2}
          >
            Full Stack Web Developer
          </motion.p>

          <motion.h1
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-[1.1] tracking-tight"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={0.3}
          >
            Hi, I'm{' '}
            <span className="relative inline-block">
              <span className="text-blue-600 dark:text-blue-500">Raul</span>
              {/* Underline accent */}
              <motion.span
                className="absolute -bottom-1 left-0 h-[3px] bg-blue-600/40 dark:bg-blue-500/40 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.6, delay: 0.8, ease: 'easeOut' }}
              />
            </span>
          </motion.h1>
        </div>

        {/* Description */}
        <motion.p
          className="text-base sm:text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto leading-relaxed"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.45}
        >
          I'm a web designer and full-stack developer based in the Philippines,
          building functional, visually appealing, and user-friendly digital
          experiences.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.55}
        >
          <a
            href="#contact"
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-xl shadow-lg shadow-blue-600/25 transition-all duration-200 hover:shadow-blue-500/30 hover:-translate-y-0.5"
          >
            <FiMail className="w-4 h-4" />
            Let's Talk
            <FiArrowDownRight className="w-4 h-4 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform duration-200" />
          </a>
          <a
            href="/barquilla_raul_resume.pdf"
            download
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-gray-200 dark:border-white/10 bg-white/60 dark:bg-white/5 text-gray-800 dark:text-gray-200 text-sm font-medium rounded-xl backdrop-blur-sm hover:bg-gray-50 dark:hover:bg-white/10 hover:text-blue-600 dark:hover:text-blue-400 hover:-translate-y-0.5 transition-all duration-200"
          >
            View Resume
          </a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          className="flex items-center justify-center gap-4 pt-2"
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          custom={0.7}
        >
          {[
            {
              href: 'https://github.com/hakkuuuu',
              icon: FiGithub,
              label: 'GitHub',
            },
            {
              href: 'https://www.linkedin.com/in/raul-b-barquilla-jr-756058373',
              icon: FiLinkedin,
              label: 'LinkedIn',
            },
            {
              href: 'mailto:raulbarquilla003@gmail.com',
              icon: FiMail,
              label: 'Email',
            },
          ].map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              aria-label={label}
              className="p-2.5 rounded-xl text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-all duration-200 hover:-translate-y-0.5"
            >
              <Icon className="w-5 h-5" />
            </a>
          ))}
          {/* Divider */}
          <span className="w-px h-5 bg-gray-200 dark:bg-white/10" />
          <span className="text-xs text-gray-400 dark:text-gray-500 tracking-wide">
            Philippines 🇵🇭
          </span>
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white dark:from-[#070707] to-transparent -z-10 pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
