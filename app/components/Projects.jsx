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
      <h2 className="text-center text-5xl mb-2 text-blue-700">
        My Latest Work
      </h2>
      <p className="text-center text-gray-300 my-6 max-w-2xl">
        Here’s a showcase of my most recent projects that demonstrate my
        expertise in web development, front-end design, and UI/UX.
      </p>

      <div className="flex flex-col lg:flex-row items-center gap-12 my-12">
        <div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-6xl mx-auto px-4">
            {projectList?.map(
              ({ project, title, description, language, link, demo }, idx) => (
                <li
                  key={idx}
                  className="w-full border border-gray-600 shadow-sm hover:-translate-y-2 duration-500 p-9 cursor-pointer flex flex-col rounded-2xl"
                >
                  <div className="flex flex-col h-full">
                    {/* Title and Actions */}
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-medium">{title}</h3>
                      <div className="flex items-center gap-3">
                        {/* GitHub Icon */}
                        <a
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-6 h-6 hover:opacity-70"
                        >
                          <Image
                            src={assets.ic_github_white || '/placeholder.svg'}
                            alt="GitHub"
                            width={24}
                            height={24}
                          />
                        </a>

                        {/* Demo Button */}
                        <a
                          href={demo}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <button className="text-sm bg-blue-700 rounded-lg px-4 py-1 hover:bg-blue-800">
                            Demo
                          </button>
                        </a>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 text-sm flex-grow">
                      {description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {language.map((lang, idx) => (
                        <span
                          key={idx}
                          className="text-xs text-blue-600 bg-blue-500/10 py-1 px-3 rounded-lg"
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
    </div>
  );
};

export default Projects;
