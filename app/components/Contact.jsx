import { socialList } from '@/assets/assets';
import Image from 'next/image';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData(event.target);
    formData.append('access_key', 'e7f7e333-5af4-4569-999a-eac44cfb1db6');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Form Submitted Successfully!');
        event.target.reset();
      } else {
        console.error('Error:', data);
        toast.error(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Submission Error:', error);
      toast.error('An unexpected error occurred!');
    }
    finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div id="contact" className="w-full px-[12%] py-10 scroll-mt-20">
        <div className="flex flex-wrap justify-between items-start">
          <div className="w-full lg:w-1/2 my-8 lg:mb-0">
            <h5 className="text-gray-800 mb-2 text-lg">Connect with me</h5>
            <h2 className="text-gray-800 text-5xl">Get in touch</h2>
            <p className="text-gray-600 my-6 max-w-lg">
              Feel free to reach out! You can send me a message or follow me on
              social media.
            </p>
            <div>
              <div className="flex flex-col items-start gap-6 max-w-2xl mx-auto my-7">
                {socialList.map(({ icon, link, title }, index) => (
                  <a
                    key={index}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center sm:justify-start gap-4"
                  >
                    <Image src={icon} alt="social icon" className="w-6" />
                    <p className="text-sm text-gray-600">{title}</p>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 bg-white p-10 shadow rounded-lg">
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Full Name
                </label>
                <input
                  required
                  type="text"
                  name="fullName"
                  placeholder="e.g. Juan Dela Cruz"
                  className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-gray-800"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Email
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="e.g. juandelacruz@gmail.com"
                  className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-gray-800"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Message
                </label>
                <textarea
                  required
                  placeholder="Your message"
                  name="message"
                  rows="4"
                  className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-1 focus:ring-gray-700"
                ></textarea>
              </div>
              <button
                type="submit"
                className={`w-full py-3 rounded-full transition ${
                  isLoading
                    ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                    : "bg-gray-900 text-white hover:bg-gray-700"
                }`}
                disabled={isLoading} // Disable button when loading
              >
                {isLoading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
      <footer className="flex flex-col items-center justify-center mt-8 bg-gray-950 w-full">
        <span className="text-center text-white text-sm p-8">
          © 2025 Raul Barquilla Jr. All rights reserved.
        </span>
      </footer>
    </>
  );
};

export default Contact;
