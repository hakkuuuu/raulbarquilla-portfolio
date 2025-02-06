import { assets } from '@/assets/assets';
import Image from 'next/image';
import React from 'react';

const Hero = () => {
  return (
    <div
      id="home"
      className="w-11/12 max-w-3xl text-center mx-auto h-screen flex flex-col items-center justify-center gap-4 pt-3 space-y-3"
    >
      <div>
        <Image
          src={assets.hero_img}
          alt="hero_image"
          className="rounded-full w-32"
        />
      </div>
      <h1 className="font-semibold text-2xl sm:text-6xl lg:text-[62px] text-blue-700">
        Hi there! I'm Raul.
      </h1>
      <p className=" max-w-2xl mx-auto text-gray-200">
        I'm a freelance web designer and web developer specializing in creating
        stunning, user-friendly websites and applications that help businesses
        thrive online.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
        <a
          href="#contact"
          className="px-10 py-3  bg-blue-700 hover:bg-blue-800 rounded-full flex item-center gap-2"
        >
          Contact me
        </a>
        <a
          href="/my_resume.pdf"
          download
          className="px-10 py-3 border rounded-full border-white hover:bg-black flex item-center gap-2"
        >
          Download Resume
        </a>
      </div>
    </div>
  );
};

export default Hero;
