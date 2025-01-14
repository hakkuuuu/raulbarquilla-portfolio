import { assets, projectList, toolList } from '@/assets/assets';
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
      <p className="text-center my-6 max-w-2xl">
        Here’s a showcase of my most recent projects that demonstrate my
        expertise in web development, front-end design, and UI/UX.
      </p>

      <div className="flex flex-col lg:flex-row items-center gap-24 my-10">
        <div className="flex-1">
          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-6xl mb-6">
            {projectList?.map(
              ({ project, title, description, language }, idx) => {
                return (
                  <li
                    className="border border-gray-900 rounded-3xl p-6 cursor-pointer hover:bg-lightHover duration-500"
                    key={idx}
                  >
                    <Image
                      src={project}
                      alt={title}
                      className="w-full mt-2 rounded-2xl"
                    />
                    <h3 className="my-2 font-semibold text-gray-800 text-left">
                      {title}
                    </h3>
                    <p className="text-gray-600 text-sm text-left">
                      {description}
                    </p>

                    <div className="flex flex-wrap gap-2 my-3">
                      {language.map((lang, idx) => (
                        <span
                          key={idx}
                          className="text-xs text-gray-600 bg-gray-200 py-1 px-3 rounded-xl"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  </li>
                );
              }
            )}
            <li className="border border-gray-900 bg-gray-900 text-white flex items-center justify-center text-lg rounded-3xl p-6 cursor-pointer hover:bg-lightHover hover:text-gray-950 duration-500">
              Show more
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Projects;
