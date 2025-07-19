import { assets, infoList, toolList } from '@/assets/assets';
import Image from 'next/image';
import React from 'react';

const About = () => {
  return (
    <section className="section-container min-h-screen scroll-margin-top" id="about">
      <h4 className="text-center mb-2 text-lg text-gray-600 dark:text-gray-400 font-medium">Introduction</h4>
      <h2 className="text-center text-5xl font-bold text-blue-700">About me</h2>
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-24 my-12">
        <div className="w-64 sm:w-80 rounded-3xl max-w-none shadow-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-[#0F0F0F]">
          <Image
            src={assets.about_img}
            alt="about_img"
            height={500}
            width={500}
            quality={100}
            className="rounded-3xl max-h-[400px] object-cover"
          />
        </div>
        <div className="flex-1">
          <p className="max-w-3xl text-gray-600 dark:text-gray-300 text-lg">
          I'm Raul B. Barquilla Jr., a 24-year-old fullstack developer with a year of experience building user-friendly and visually engaging web apps. I specialize in React, Next.js, TypeScript, and Tailwind CSS on the frontend, and Node.js, Express, Docker, MongoDB, and PostgreSQL on the backend. I focus on writing clean, maintainable code and delivering seamless user experiences.
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-3xl mt-8">
            {infoList.map(({ icon: Icon, title, description }, index) => {
              return (
                <li
                  className="bg-gray-50 dark:bg-[#070707] rounded-xl p-7 border border-gray-200 dark:border-gray-700 shadow-md shadow-gray-200 dark:shadow dark:hover:shadow-blue-900 hover:shadow-blue-100 transition duration-300 cursor-pointer"
                  key={index}
                >
                  <Icon className="mt-2 opacity-80 w-7 h-7 text-black dark:text-white" />
                  <h3 className="my-2 font-semibold text-blue-700 dark:text-blue-500">{title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default About;
