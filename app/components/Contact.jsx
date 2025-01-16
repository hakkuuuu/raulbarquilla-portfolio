import { socialList } from '@/assets/assets';
import Image from 'next/image';
import React from 'react';

const Contact = () => {
  console.log(socialList);
  return (
    <div id="contact" className="w-full px-[12%] py-10 scroll-mt-20">
      <div className="flex flex-wrap justify-between items-start">
        <div className="w-full lg:w-1/2 my-8 lg:mb-0">
          <h5 className="text-gray-800 mb-2 text-lg">
            Connect with me
          </h5>
          <h2 className="text-gray-800 text-5xl">
            Get in touch
          </h2>
          <p className="text-gray-600 my-6 max-w-lg">
          Feel free to reach out! You can send me a message or follow me on social media.
          </p>

          <div>
            <div className="flex flex-col items-start gap-6 max-w-2xl mx-auto my-7">
              {socialList.map(({ icon, link, title }, index) => {
                return (
                  <a
                    key={index}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center sm:justify-start gap-4"
                  >
                    {/* Icon */}
                    <Image src={icon} alt="social icon" className="w-6" />
                    {/* Link */}
                    <p className="text-sm text-gray-600">{title}</p>
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 bg-white p-6 shadow rounded-lg">
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="e.g. Juan Dela Cruz"
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-gray-800"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="e.g. juandelacruz@gmail.com"
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-gray-800"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Message
              </label>
              <textarea
                placeholder="Your message"
                rows="4"
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-gray-700"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-gray-900 text-white rounded-full py-3 hover:bg-gray-700 transition"
            >
              Send message <span className="ml-2">&rarr;</span>
            </button>
          </form>
        </div>
      </div>

      <footer className="flex flex-col items-center justify-center pt-10">
        <span className="text-center text-sm">
          © 2025 Raul Barquilla Jr. All rights reserved.
        </span>
      </footer>
    </div>
  );
};

export default Contact;
