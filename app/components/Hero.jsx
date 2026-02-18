'use client';

import { assets } from '@/assets/assets';
import Image from 'next/image';
import React from 'react';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

const Hero = () => {
  return (
    <section
      id="home"
      className="min-h-screen w-full px-4 sm:px-8 lg:px-16 pt-28 pb-24 flex items-center justify-center"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
        {/* Left Content */}
        <div className="flex-1 text-center lg:text-left space-y-6">
          <div className="flex items-center justify-center lg:justify-start mb-2 animate-fade-in">
            <span className="relative flex items-center border border-blue-500 rounded-full px-4 py-1 text-blue-700 bg-white dark:bg-gray-900 font-medium text-sm">
              <span className="flex h-3 w-3 mr-2">
                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500 animate-pulse"></span>
              </span>
              Available to work
            </span>
          </div>
          <div className="space-y-3">
            <h2 className="text-gray-600 dark:text-gray-400 text-lg font-medium animate-fade-in">
              Full Stack Web Developer
            </h2>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight animate-slide-up">
              Hi, I'm <span className="text-blue-700">Raul</span>
              <br />
            </h1>
          </div>

          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto lg:mx-0 animate-fade-in">
            I'm a web designer and developer based in the Philippines, I like to
            create functional, visually appealing, and user-friendly digital
            experiences.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start pt-4">
            <a
              href="#contact"
              className="w-full sm:w-auto px-8 py-4 bg-blue-700 hover:bg-blue-600 text-white rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-700/30 transition-all duration-300 animate-fade-in"
              aria-label="Get in touch with Raul"
            >
              <FiMail className="w-5 h-5" />
              Let's Talk
            </a>
            <a
              href="/barquilla_raul_resume.pdf"
              download
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 border rounded-xl border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-700 dark:hover:text-blue-500 flex items-center justify-center gap-2 transition-all duration-300 animate-fade-in"
              aria-label="Download Raul's resume in PDF format"
            >
              View Resume
            </a>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6 justify-center lg:justify-start pt-6 animate-fade-in">
            <a
              href="https://github.com/hakkuuuu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              aria-label="Visit my GitHub profile"
            >
              <FiGithub className="w-6 h-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/raul-b-barquilla-jr-756058373"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              aria-label="Visit my LinkedIn profile"
            >
              <FiLinkedin className="w-6 h-6" />
            </a>
            <a
              href="mailto:raulbarquilla003@gmail.com"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              aria-label="Send me an email"
            >
              <FiMail className="w-6 h-6" />
            </a>
          </div>
        </div>

        {/* Right Content - Profile Image */}
        <div className="flex-1 relative max-w-md lg:max-w-none animate-fade-in">
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 mx-auto">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full blur-3xl opacity-20 dark:opacity-30 animate-pulse"></div>

            {/* Circular Border */}
            <div className="absolute inset-0 border-2 border-gray-200 dark:border-gray-700 rounded-full"></div>

            {/* Image Container */}
            <div className="absolute inset-4 bg-gradient-to-b from-gray-100 to-white dark:from-gray-800 dark:to-gray-900 rounded-full p-2">
              <div className="relative w-full h-full rounded-full overflow-hidden">
                <Image
                  src={assets.hero_img}
                  alt="Raul Barquilla Jr.'s Profile Picture"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 256px, 320px"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
