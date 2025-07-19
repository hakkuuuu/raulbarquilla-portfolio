import React from 'react';
import { skills } from '@/assets/assets';

const Skills = () => {
  return (
    <section
      id="skills"
      className="w-full px-4 sm:px-8 lg:px-16 pt-28 pb-24 max-w-7xl mx-auto min-h-screen"
    >
      <h4 className="text-center mb-2 text-lg text-gray-600 dark:text-gray-400 font-medium">Skills</h4>
      <h2 className="text-center text-5xl font-bold text-blue-700 mb-6">
        My technical level
      </h2>
      <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
        Here are the technologies I specialize in, showcasing my proficiency and
        experience in web development. I have strong expertise in JavaScript and
        its modern frameworks, building dynamic and scalable web applications.
      </p>

      <div className="flex flex-wrap justify-center gap-8 my-16">
        {skills.map((skill) => {
          const progress = skill.level;
          return (
            <div key={skill.name} className="flex flex-col items-center">
              <div
                className="relative w-20 h-20 rounded-full flex items-center justify-center text-gray-300 text-sm font-semibold border-2 border-blue-700 dark:border-blue-500 shadow-lg bg-gray-50 dark:bg-[#0F0F0F] hover:shadow-blue-100 dark:hover:shadow-blue-900/30 transition"
                style={{
                  background: `conic-gradient(#1D4ED8 ${progress}%, #d1d5db  ${progress}%)`,
                }}
              >
                <div className="absolute w-16 h-16 bg-white dark:bg-[#070707] text-gray-900 dark:text-gray-300 rounded-full flex items-center justify-center text-sm font-bold">
                  {progress}%
                </div>
              </div>
              <p className="mt-2 text-center font-medium text-gray-700 dark:text-gray-200">
                {skill.name}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Skills;
