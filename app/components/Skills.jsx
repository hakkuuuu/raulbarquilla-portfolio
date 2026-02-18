'use client';

import React from 'react';
import { skills } from '@/assets/assets';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay },
  }),
};

const CircularProgress = ({ level, index }) => {
  const radius = 36;
  const stroke = 4;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;
  const offset = circumference - (level / 100) * circumference;

  return (
    <motion.svg
      width={radius * 2}
      height={radius * 2}
      viewBox={`0 0 ${radius * 2} ${radius * 2}`}
      className="-rotate-90"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      {/* Track ring */}
      <circle
        cx={radius}
        cy={radius}
        r={normalizedRadius}
        fill="none"
        stroke="currentColor"
        strokeWidth={stroke}
        className="text-gray-100 dark:text-white/10"
      />
      {/* Progress ring */}
      <motion.circle
        cx={radius}
        cy={radius}
        r={normalizedRadius}
        fill="none"
        stroke="currentColor"
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={circumference}
        className="text-blue-600 dark:text-blue-500"
        initial={{ strokeDashoffset: circumference }}
        whileInView={{ strokeDashoffset: offset }}
        viewport={{ once: true }}
        transition={{
          duration: 1,
          ease: 'easeOut',
          delay: 0.05 * index + 0.3,
        }}
      />
    </motion.svg>
  );
};

const Skills = () => {
  return (
    <section
      id="skills"
      className="relative w-full px-6 py-28 flex flex-col items-center overflow-hidden"
    >
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/8 dark:bg-blue-500/10 rounded-full blur-[140px]" />
      </div>

      {/* Section header */}
      <div className="max-w-3xl mx-auto text-center w-full mb-14">
        <motion.p
          className="text-sm font-medium text-gray-500 dark:text-gray-400 tracking-widest uppercase mb-3"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0}
        >
          Skills
        </motion.p>

        <motion.h2
          className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white tracking-tight mb-6"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.1}
        >
          My{' '}
          <span className="text-blue-600 dark:text-blue-500">tech stack</span>
        </motion.h2>

        <motion.p
          className="text-base sm:text-lg text-gray-500 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.2}
        >
          Technologies I specialize in from crafting pixel-perfect frontends to
          building scalable, production-ready backends.
        </motion.p>
      </div>

      {/* Skills Grid */}
      <motion.div
        className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-4 max-w-5xl mx-auto w-full"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {skills.map(({ name, level }, index) => (
          <motion.div
            key={name}
            variants={fadeUp}
            custom={0.05 * index + 0.25}
            className="group flex flex-col items-center gap-3 bg-white/60 dark:bg-white/[0.03] border border-gray-200/80 dark:border-white/10 rounded-2xl px-3 py-5 shadow-sm hover:shadow-blue-100 dark:hover:shadow-blue-900/20 hover:border-blue-200 dark:hover:border-blue-500/20 transition-all duration-300 backdrop-blur-sm"
          >
            {/* Circular progress ring */}
            <div className="relative w-[72px] h-[72px] flex items-center justify-center">
              <CircularProgress level={level} index={index} />
              {/* Percentage in center */}
              <span className="absolute text-xs font-bold text-gray-900 dark:text-white tabular-nums">
                {level}%
              </span>
            </div>

            {/* Skill name */}
            <p className="text-xs font-semibold text-center text-gray-700 dark:text-gray-300 leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
              {name}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Skills;
