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
              ({ project, title, description, language, link, demo }, idx) => {
                return (
                  <li
                    className="border border-gray-900 rounded-3xl p-6 cursor-pointer"
                    key={idx}
                  >
                    <Image
                      src={project}
                      alt={title}
                      className="w-full mt-2 rounded-2xl"
                    />
                    <div className="flex flex-row justify-between item-center w-full mt-2">
                      <h3 className="text-lg my-4 font-semibold text-gray-800">
                        {title}
                      </h3>
                      {/* Actions (GitHub Link and Demo Button) */}
                      <div className="flex flex-row items-center gap-2">
                        {/* GitHub Icon */}
                        <a
                          href={link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-6 h-6"
                        >
                          <Image
                            src={assets.ic_github}
                            alt="github"
                            className="w-full h-full"
                          />
                        </a>

                        {/* Demo Button */}
                        <a
                          href={demo}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <button className="text-sm text-white bg-gray-900 rounded-2xl px-4 py-1 hover:bg-white hover:border border-gray-900 hover:text-gray-900">
                            Demo
                          </button>
                        </a>
                      </div>
                    </div>
                    <hr className="mb-4 border-gray-600" />
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
