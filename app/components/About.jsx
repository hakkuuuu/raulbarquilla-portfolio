import { assets, infoList, toolList } from '@/assets/assets';
import Image from 'next/image';
import React from 'react';

const About = () => {
  return (
    <section id="about" className="w-full px-[12%] min-h-screen my-20">
      <h4 className="text-center mb-2 text-lg">Introduction</h4>
      <h2 className="text-center text-5xl text-blue-700">About me</h2>

      <div className="flex w-full flex-col lg:flex-row items-center gap-24 my-12 sm:my-20">
        <div className="w-64 sm:w-80 rounded-3xl max-w-none">
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
          <p className="max-w-2xl text-gray-300">
            I'm Raul B. Barquilla Jr., 24, with one year of experience,
            passionate about creating user-friendly, accessible, and visually
            engaging digital experiences. I specialize in front-end development,
            using Figma for UI/UX and Next.js, ReactJS, and Tailwind CSS to
            build fast, responsive websites. My focus is on problem-solving
            through design, writing clean, maintainable code, and ensuring
            seamless user experiences.
          </p>

          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-2xl mt-8">
            {infoList.map(({ icon, title, description }, index) => {
              return (
                <li
                  className="bg-[#0F0F0F] rounded-3xl p-7 cursor-pointer hover:hover-glow duration-500"
                  key={index}
                >
                  <Image
                    src={icon}
                    alt={title}
                    height={28}
                    width={28}
                    className="mt-2 opacity-80"
                  />
                  <h3 className="my-2 font-semibold text-blue-500">{title}</h3>
                  <p className="text-sm text-gray-300">{description}</p>
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
