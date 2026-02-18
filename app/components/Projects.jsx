'use client';

import { projectList } from '@/assets/assets';
import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay },
  }),
};

const Projects = () => {
  return (
    <section
      id="projects"
      className="relative w-full px-6 py-28 flex flex-col items-center overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-500/10 dark:bg-blue-500/10 rounded-full blur-[120px]" />
      </div>

      {/* Header */}
      <div className="max-w-3xl mx-auto text-center w-full">
        <motion.p
          className="text-sm font-medium text-gray-500 dark:text-gray-400 tracking-widest uppercase mb-3"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
        >
          Projects
        </motion.p>

        <motion.h2
          className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white tracking-tight mb-4"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.1}
        >
          My latest{' '}
          <span className="text-blue-600 dark:text-blue-500">work</span>
        </motion.h2>

        <motion.p
          className="text-base sm:text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto leading-relaxed"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.2}
        >
          A showcase of my most recent projects demonstrating expertise in web
          development, front-end design, and UI/UX.
        </motion.p>
      </div>

      {/* Project Grid */}
      <motion.ul
        className="grid grid-cols-3 gap-5 max-w-5xl mx-auto mt-14 w-full"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {projectList?.map(
          ({ title, description, language, link, demo }, idx) => (
            <motion.li
              key={idx}
              variants={fadeUp}
              custom={0.1 * idx + 0.3}
              className="group bg-white/60 dark:bg-white/[0.03] border border-gray-200/80 dark:border-white/10 rounded-2xl p-6 shadow-sm hover:shadow-blue-100 dark:hover:shadow-blue-900/20 hover:border-blue-200 dark:hover:border-blue-500/20 transition-all duration-300 backdrop-blur-sm flex flex-col gap-4"
            >
              {/* Title + actions */}
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white leading-snug">
                  {title}
                </h3>
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="p-1.5 rounded-lg text-gray-400 dark:text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-all duration-200"
                  >
                    <FiGithub className="w-4 h-4" />
                  </a>
                  <a
                    href={demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Live Demo"
                    className="p-1.5 rounded-lg text-gray-400 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-all duration-200"
                  >
                    <FiExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed flex-1">
                {description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {language.map((lang, i) => (
                  <span
                    key={i}
                    className="text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 py-0.5 px-2.5 rounded-full"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </motion.li>
          ),
        )}
      </motion.ul>
    </section>
  );
};

export default Projects;
