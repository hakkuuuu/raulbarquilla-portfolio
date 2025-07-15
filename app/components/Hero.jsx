import { assets } from '@/assets/assets';
import Image from 'next/image';
import React from 'react';

const Hero = () => {
  return (
    <section
      id="home"
      className="w-11/12 max-w-3xl text-center mx-auto h-screen flex flex-col items-center justify-center gap-4 pt-3 space-y-4"
    >
      <div className="relative w-32 h-32">
        {/* Blurred Background */}
        <div className="absolute inset-0 bg-blue-700 bg-opacity-40 blur-2xl rounded-full"></div>

        {/* Foreground Image */}
        <Image
          src={assets.hero_img}
          height={500}
          width={500}
          quality={80}
          alt="Raul Barquilla Jr.'s Profile Picture"
          className="relative rounded-full object-cover"
        />
      </div>

      <h1 className="font-semibold text-2xl sm:text-6xl lg:text-[62px]">
        Hi there!<span className=" text-blue-700"> I'm Raul.</span>
      </h1>
      <p className="max-w-2xl mx-auto text-gray-200">
        I'm a web designer and developer based in the Philippines, specializing
        in creating functional, visually appealing, and user-friendly websites
        and applications tailored to business needs.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-4 mt-4">
        <a
          href="#contact"
          className="px-10 py-3 bg-blue-700 hover:bg-opacity-80 rounded-full flex items-center gap-2 shadow-md transition-all"
          aria-label="Get in touch with Raul"
        >
          Contact Me
        </a>
        <a
          href="/barquilla_raul_resume.pdf"
          download
          target="_blank"
          rel="noopener noreferrer"
          className="px-10 py-3 border rounded-full border-gray-500 hover:shadow-lg hover:text-blue-700 hover:hover-glow flex items-center gap-2 transition-all"
          aria-label="Download Raul's resume in PDF format"
        >
          Download Resume
        </a>
      </div>
    </section>
  );
};

export default Hero;
