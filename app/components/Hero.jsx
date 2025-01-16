import { assets } from '@/assets/assets';
import Image from 'next/image';
import React from 'react';

const Hero = () => {
  return (
    <div id='home' className="w-11/12 max-w-3xl text-center mx-auto h-screen flex flex-col items-center justify-center gap-4 pt-4">
      <div>
        <Image
          src={assets.hero_img}
          alt="hero_image"
          className="rounded-full w-32"
        />
      </div>
      <h3 className="flex items-end gap-2 text-xl md:text-2xl mb-3">
        Hi there! My name is Raul. 👋
      </h3>
      <h1 className="text-2xl sm:text-6xl lg:text-[62px]">
        web developer based in the Philippines.
      </h1>
      <p className="text-gray-600 max-w-2xl mx-auto">
        I'm a freelance web designer and web developer specializing in creating
        stunning, user-friendly websites and applications that help businesses
        thrive online.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
        <a
          href="#contact"
          className="px-10 py-3 border border-white bg-gray-950 hover:bg-gray-800 text-white rounded-full flex item-center gap-2"
        >
          Contact me
        </a>
        <a
          href="/my_resume.pdf"
          download
          className="px-10 py-3 border rounded-full border-gray-900 hover:bg-lightHover flex item-center gap-2"
        >
          Download Resume
        </a>
      </div>
    </div>
  );
};

export default Hero;
