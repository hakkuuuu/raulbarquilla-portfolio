import { assets, projectList } from '@/assets/assets';
import Image from 'next/image';
import React from 'react';

const Projects = () => {
  return (
    <div
      id="projects"
      className="w-full px-[12%] py-10 scroll-mt-20 flex flex-col items-center"
    >
      <h4 className="text-center mb-2 text-lg">Projects</h4>
      <h2 className="text-center text-5xl mb-2">My Latest Work</h2>
      <p className="text-center text-gray-600 my-6 max-w-2xl">
        Here’s a showcase of my most recent projects that demonstrate my
        expertise in web development, front-end design, and UI/UX.
      </p>

      <div className="flex flex-col lg:flex-row items-center gap-12 my-10">
        <div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 max-w-7xl">
            {projectList?.map(
              ({ project, title, description, language, link, demo }, idx) => (
                <li
                  key={idx}
                  className="w-full sm:w-[500px] lg:w-[580px] border border-gray-300 shadow-sm hover:bg-gray-50 hover:border-gray-500 px-8 py-6 transition-shadow duration-300 cursor-pointer bg-white flex flex-col sm:flex-row items-center sm:items-start gap-6 rounded-2xl"
                >
                  {/* Project Image */}
                  <Image
                    src={project}
                    alt={title}
                    className="w-24 rounded-full object-cover flex-shrink-0"
                  />

                  {/* Card Content */}
                  <div className="flex-1 w-full">
                    {/* Title and Actions */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                      <h3 className="text-lg font-medium text-gray-800">
                        {title}
                      </h3>
                      <div className="flex items-center gap-3">
                        {/* GitHub Icon */}
                        <a
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-6 h-6 hover:opacity-70"
                        >
                          <Image
                            src={assets.ic_github}
                            alt="GitHub"
                            className="w-full h-full"
                          />
                        </a>

                        {/* Demo Button */}
                        <a
                          href={demo}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <button className="text-sm text-white bg-gray-800 rounded-lg px-4 py-1 hover:bg-gray-600">
                            Demo
                          </button>
                        </a>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mt-2">{description}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {language.map((lang, idx) => (
                        <span
                          key={idx}
                          className="text-xs text-gray-600 bg-gray-100 py-1 px-3 rounded-lg"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                </li>
              )
            )}

            {/* Show More */}
            <li className="border border-dashed border-gray-300 rounded-lg bg-gray-100 text-gray-700 flex items-center justify-center text-lg font-medium p-6 cursor-pointer hover:bg-gray-200 hover:border-gray-400 transition-all">
              Show More
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Projects;
