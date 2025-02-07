import { socialList } from '@/assets/assets';
import Image from 'next/image';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);

  const fields = [
    { label: 'Full Name', name: 'fullName', type: 'text', placeholder: 'e.g. Juan Dela Cruz' },
    { label: 'Email', name: 'email', type: 'email', placeholder: 'e.g. juandelacruz@gmail.com' },
    { label: 'Message', name: 'message', type: 'textarea', placeholder: 'Your message' },
  ];

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
      <div id="contact" className="w-full px-[12%] py-10 scroll-mt-20">
        <div className="flex flex-wrap justify-between items-start">
          <div className="w-full lg:w-1/2 my-8 lg:mb-0">
            <h5 className="mb-2 text-lg">Connect with me</h5>
            <h2 className="text-5xl text-blue-700">Get in touch</h2>
            <p className="my-6 max-w-lg text-gray-300">
              Feel free to reach out! You can send me a message or follow me on
              social media.
            </p>
            <div>
              <div className="flex flex-col items-start gap-6 max-w-2xl mx-auto my-7 ">
                {socialList.map(({ icon, link, title }, index) => (
                  <a
                    key={index}
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center sm:justify-start gap-4 "
                  >
                    <Image src={icon} alt="social icon" className="w-6" />
                    <p className="text-sm text-gray-300">{title}</p>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 p-6 sm:p-8 md:p-10 border border-gray-600 shadow rounded-lg hover:hover-glow">
          <form onSubmit={onSubmit} className="space-y-4">
    {fields.map((field, index) => (
      <div key={index}>
        <label className="block text-gray-200 font-medium mb-1">
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
      className={`w-full py-2 sm:py-3 rounded-full transition ${
        isLoading
          ? 'bg-gray-800 text-gray-300 cursor-not-allowed'
          : 'bg-blue-700 hover:bg-blue-800'
      }`}
      disabled={isLoading}
    >
      {isLoading ? 'Sending...' : 'Send Message'}
    </button>
  </form>
          </div>
        </div>
      </div>
      <ToastContainer />
      <footer className="flex flex-col items-center justify-center mt-8 w-full border-t border-white/10 ">
        <span className="text-center text-sm p-6">
          © 2025 Raul Barquilla Jr. All rights reserved.
        </span>
      </footer>
    </>
  );
};

export default Contact;
