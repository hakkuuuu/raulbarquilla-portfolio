import { socialList } from '@/assets/assets';
import Image from 'next/image';
import React from 'react';

const Contact = () => {
  console.log(socialList);
  return (
    <div id="contact" className="w-full px-[12%] py-10 scroll-mt-20">
      <h3 className="text-center mb-2 text-lg">
        DO YOU HAVE ANY PROJECTS? LET'S DISCUSS!
      </h3>
      <p className="text-center text-5xl">Find me online</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-3xl mx-auto my-10">
        {socialList.map(({ icon, link, title }, index) => {
          return (
            <a
              key={index}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center sm:justify-start gap-4"
            >
              <Image src={icon} alt="social icon" className="w-8" />
              <p className="text-sm text-gray-800">{title}</p>
            </a>
          );
        })}
      </div>

      <footer className="flex flex-col items-center justify-center pt-10">
        <span className="text-gray-900 text-center text-sm">
          © 2025 Raul Barquilla Jr. All rights reserved.
        </span>
      </footer>
    </div>
  );
};

export default Contact;
