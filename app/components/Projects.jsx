'use client';

import { assets, projectList } from '@/assets/assets';
import Image from 'next/image';
import React from 'react';
import { FiGithub } from 'react-icons/fi';

const Projects = () => {
  return (
    <section
      id="projects"
      className="w-full px-4 sm:px-8 lg:px-16 pt-28 pb-24 flex flex-col items-center"
    >
      <h4 className="text-center mb-2 text-lg text-gray-600 dark:text-gray-400 font-medium">Projects</h4>
      <h2 className="text-center text-5xl font-bold text-gray-900 dark:text-white mb-2">
        My latest work
      </h2>
      <p className="text-center text-gray-600 dark:text-gray-300 my-6 max-w-2xl">
        Here's a showcase of my most recent projects that demonstrate my
        expertise in web development, front-end design, and UI/UX.
      </p>

      <div className="flex flex-col lg:flex-row items-center gap-12 my-12">
        <div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-6xl mx-auto">
            {projectList?.map(
              ({ project, title, description, language, link, demo }, idx) => (
                <li
                  key={idx}
                  className="bg-gray-50 dark:bg-[#0F0F0F] w-full rounded-xl border border-gray-200 dark:border-gray-700 shadow hover:shadow-blue-100 dark:hover:shadow-blue-900/30 transition duration-300 p-9 cursor-pointer flex flex-col"
                >
                  <div className="flex flex-col h-full">
                    {/* Title and Actions */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {title}
                      </h3>

                      <div className="flex items-center gap-2 sm:gap-3">
                        {/* GitHub Icon */}
                        <a
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-6 h-6 sm:w-6 sm:h-6 text-black dark:text-white hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
                        >
                          <FiGithub className="w-6 h-6" />
                        </a>

                        {/* Demo Button */}
                        <a
                          href={demo}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <button className="text-xs sm:text-sm bg-blue-700 hover:bg-blue-600 text-white rounded-xl px-4 py-2 shadow-lg shadow-blue-700/30 transition-all duration-300">
                            Demo
                          </button>
                        </a>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-300 text-sm flex-grow">
                      {description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {language.map((lang, idx) => (
                        <span
                          key={idx}
                          className="text-xs text-blue-700 dark:text-blue-500 bg-blue-50 dark:bg-blue-900/20 py-1 px-3 rounded-lg"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                </li>
              )
            )}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Projects;
