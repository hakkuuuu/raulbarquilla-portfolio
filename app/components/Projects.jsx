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
        <div className="flex-1">
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mb-6">
            {projectList?.map(
              ({ project, title, description, language, link, demo }, idx) => (
                <li
                  key={idx}
                  className="border border-gray-300 shadow-sm hover:shadow-md p-0 transition-shadow duration-300 cursor-pointer bg-white"
                >
                  {/* Project Image */}
                  <Image
                    src={project}
                    alt={title}
                    className="w-full h-48 object-cover"
                  />

                  {/* Card Content */}
                  <div className="p-6">
                    {/* Title and Actions */}
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-bold text-gray-800">
                        {title}
                      </h3>
                      <div className="flex items-center gap-3">
                        {/* GitHub Icon */}
                        <a
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-6 h-6 hover:opacity-80"
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
                          <button className="text-sm text-white bg-gray-900 rounded-lg px-4 py-1 hover:bg-gray-800">
                            Demo
                          </button>
                        </a>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-sm mt-4 line-clamp-3">
                      {description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {language.map((lang, idx) => (
                        <span
                          key={idx}
                          className="text-xs text-gray-700 bg-gray-200 py-1 px-3 rounded-lg"
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
            <li className="border border-dashed border-gray-300 bg-gray-100 text-gray-700 flex items-center justify-center text-lg font-medium p-6cursor-pointer hover:bg-gray-200 hover:border-gray-400 transition-all">
              Show More
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Projects;
