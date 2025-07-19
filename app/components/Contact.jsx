import { fields, socialList } from '@/assets/assets';
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
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <section id="contact" className="w-full py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-16 flex flex-wrap justify-between items-start">
          <div className="w-full lg:w-1/2 my-3 lg:mb-0">
            <h5 className="mb-2 text-lg text-gray-600 dark:text-gray-400 font-medium">Connect with me</h5>
            <h2 className="text-5xl font-bold text-blue-700">Get in touch</h2>
            <p className="my-6 max-w-lg text-gray-600 dark:text-gray-300">
              Feel free to reach out! You can send me a message or follow me on
              social media.
            </p>
            <div>
              <div className="flex flex-col items-start gap-6 max-w-2xl mx-auto my-7 ">
                {socialList.map(({ icon: Icon, link, title }, index) => (
                  <a
                    key={index}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center sm:justify-start gap-4 "
                  >
                    <Icon className="w-6 h-6" />
                    <p className="text-sm text-gray-600 dark:text-gray-300">{title}</p>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 p-6 sm:p-8 md:p-10 bg-gray-50 dark:bg-[#0F0F0F] shadow-md shadow-gray-200 dark:shadow-lg rounded-2xl border border-gray-200 dark:border-gray-700 hover:shadow-blue-100 dark:hover:shadow-blue-900/30 transition">
            <form onSubmit={onSubmit} className="space-y-4">
              {fields.map((field, index) => (
                <div key={index}>
                  <label className="block text-gray-900 dark:text-white font-medium mb-1">
                    {field.label}
                  </label>
                  {field.type === 'textarea' ? (
                    <textarea
                      required
                      name={field.name}
                      placeholder={field.placeholder}
                      rows="4"
                      className="textarea-field"
                    ></textarea>
                  ) : (
                    <input
                      required
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder}
                      className="input-field"
                    />
                  )}
                </div>
              ))}
              <button
                type="submit"
                className={`w-full py-3 rounded-xl shadow-lg shadow-blue-700/30 bg-blue-700 hover:bg-blue-600 text-white font-semibold transition-all duration-300 ${isLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </section>
      <ToastContainer />
      <footer className="flex flex-col items-center justify-center mt-8 w-full border-t border-white/10 ">
        <span className="text-center text-sm p-6 text-gray-600 dark:text-gray-400">
          © 2025 Raul Barquilla Jr. All rights reserved.
        </span>
      </footer>
    </>
  );
};

export default Contact;
