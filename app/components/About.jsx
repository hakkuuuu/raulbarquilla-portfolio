'use client';

import { infoList } from '@/assets/assets';
import React from 'react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay },
  }),
};

const About = () => {
  return (
    <section
      id="about"
      className="relative w-full px-6 py-28 flex flex-col items-center overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-500/10 dark:bg-blue-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-3xl mx-auto text-center w-full">
        {/* Section label */}
        <motion.p
          className="text-sm font-medium text-gray-500 dark:text-gray-400 tracking-widest uppercase mb-3"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
        >
          Introduction
        </motion.p>

        <motion.h2
          className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white tracking-tight mb-6"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.1}
        >
          About <span className="text-blue-600 dark:text-blue-500">me</span>
        </motion.h2>

        {/* Bio */}
        <motion.p
          className="text-base sm:text-lg text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.2}
        >
          I'm Raul B. Barquilla Jr., a 24-year-old fullstack developer with a
          year of experience building user-friendly and visually engaging web
          apps. I specialize in React, Next.js, TypeScript, and Tailwind CSS on
          the frontend, and Node.js, Express, Docker, MongoDB, and PostgreSQL on
          the backend. I focus on writing clean, maintainable code and
          delivering seamless user experiences.
        </motion.p>
      </div>

      {/* Info Cards */}
      <motion.ul
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mx-auto mt-14 w-full"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {infoList.map(({ icon: Icon, title, description }, index) => (
          <motion.li
            key={index}
            variants={fadeUp}
            custom={0.1 * index + 0.3}
            className="group bg-white/60 dark:bg-white/[0.03] border border-gray-200/80 dark:border-white/10 rounded-2xl p-6 shadow-sm hover:shadow-blue-100 dark:hover:shadow-blue-900/20 hover:border-blue-200 dark:hover:border-blue-500/20 transition-all duration-300 backdrop-blur-sm cursor-pointer"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center mb-4 group-hover:bg-blue-100 dark:group-hover:bg-blue-500/20 transition-colors duration-200">
              <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-1 text-sm">
              {title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              {description}
            </p>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
};

export default About;
