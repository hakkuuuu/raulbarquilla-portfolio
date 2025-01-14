import { assets, infoList, toolList } from '@/assets/assets';
import Image from 'next/image';
import React from 'react';

const About = () => {
  return (
    <div id="about" className="w-full px-[12%] py-10 scroll-mt-20">
      <h4 className="text-center mb-2 text-lg">Introduction</h4>
      <h2 className="text-center text-5xl">About me</h2>

      <div className="flex w-full flex-col lg:flex-row items-center gap-24 my-20">
        <div className="w-64 sm:w-80 rounded-3xl max-w-none">
          <Image
            src={assets.about_img}
            alt="about_img"
            className="w-full rounded-3xl"
          />
        </div>

        <div className="flex-1">
          <p className="mb-6 max-w-2xl">
            I am a UI/UX Designer and Web Developer with 2 years of freelance
            experience. <br></br> I specialize in designing and building
            intuitive, user-focused digital experiences using tools like Figma,
            Next.js, ReactJS, and Tailwind CSS. I focus on creating designs that
            solve problems and developing clean, efficient code to bring them to
            life.
          </p>

          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mb-6">
            {infoList.map(({ icon, iconDark, title, description }, index) => {
              return (
                <li
                  className="border border-gray-900 rounded-3xl p-6 cursor-pointer hover:bg-lightHover hover:-translate-y-4 duration-500"
                  key={index}
                >
                  <Image src={iconDark} alt={title} className="w-7 mt-2" />
                  <h3 className="my-2 font-semibold text-gray-800">{title}</h3>
                  <p className="text-gray-600 text-sm">{description}</p>
                </li>
              );
            })}
          </ul>

          <div className="flex flex-row gap-6 my-4 items-center">
            <h3 className="text-gray-800 font-medium">Tools I use:</h3>
            <ul className="flex flex-row gap-3 sm:gap-4">
              {toolList.map((tool, index) => {
                return (
                  <li
                    key={index}
                    className="border border-gray-900 p-2 rounded-xl"
                  >
                    <Image src={tool} alt="tool" className="w-5 sm:w-6" />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
