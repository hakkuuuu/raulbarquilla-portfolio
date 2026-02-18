'use client';

import { fields, socialList } from '@/assets/assets';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay },
  }),
};

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
        toast.success('Message sent successfully!');
        event.target.reset();
      } else {
        toast.error(`Error: ${data.message}`);
      }
    } catch (error) {
      toast.error('An unexpected error occurred!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <section
        id="contact"
        className="relative w-full px-6 py-28 flex flex-col items-center overflow-hidden"
      >
        {/* Background glow */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-500/10 dark:bg-blue-500/10 rounded-full blur-[120px]" />
        </div>

        {/* Header */}
        <div className="max-w-3xl mx-auto text-center w-full">
          <motion.p
            className="text-sm font-medium text-gray-500 dark:text-gray-400 tracking-widest uppercase mb-3"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0}
          >
            Connect with me
          </motion.p>

          <motion.h2
            className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white tracking-tight mb-4"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.1}
          >
            Get in{' '}
            <span className="text-blue-600 dark:text-blue-500">touch</span>
          </motion.h2>

          <motion.p
            className="text-base sm:text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto leading-relaxed"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.2}
          >
            Feel free to reach out, send me a message or find me on social
            media.
          </motion.p>
        </div>

        {/* Two-col layout */}
        <div className="max-w-3xl mx-auto w-full mt-14 grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Social links */}
          <motion.div
            className="lg:col-span-2 flex flex-col justify-center gap-5"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.3}
          >
            {socialList.map(({ icon: Icon, link, title }, index) => (
              <a
                key={index}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 transition-all duration-200"
              >
                <div className="w-9 h-9 rounded-xl bg-white/60 dark:bg-white/[0.03] border border-gray-200/80 dark:border-white/10 flex items-center justify-center group-hover:bg-blue-50 dark:group-hover:bg-blue-500/10 group-hover:border-blue-200 dark:group-hover:border-blue-500/20 transition-all duration-200 shrink-0 shadow-sm backdrop-blur-sm">
                  <Icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 font-medium group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                  {title}
                </p>
              </a>
            ))}
          </motion.div>

          {/* Contact form */}
          <motion.div
            className="lg:col-span-3"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.4}
          >
            <form
              onSubmit={onSubmit}
              className="bg-white/60 dark:bg-white/[0.03] border border-gray-200/80 dark:border-white/10 rounded-2xl p-6 sm:p-8 shadow-sm backdrop-blur-sm space-y-4"
            >
              {fields.map((field, index) => (
                <div key={index}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                    {field.label}
                  </label>
                  {field.type === 'textarea' ? (
                    <textarea
                      required
                      name={field.name}
                      placeholder={field.placeholder}
                      rows="4"
                      className="w-full text-sm px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 dark:focus:border-blue-500 transition-all duration-200 resize-none"
                    />
                  ) : (
                    <input
                      required
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder}
                      className="w-full text-sm px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-400 dark:focus:border-blue-500 transition-all duration-200"
                    />
                  )}
                </div>
              ))}

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 rounded-xl text-sm font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/25 hover:shadow-blue-500/30 hover:-translate-y-0.5 transition-all duration-200 ${
                  isLoading ? 'opacity-60 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-gray-200/60 dark:border-white/5">
        <div className="max-w-3xl mx-auto px-6 py-6 flex items-center justify-center">
          <span className="text-xs text-gray-400 dark:text-gray-600 tracking-wide">
            © 2025 Raul Barquilla Jr. All rights reserved.
          </span>
        </div>
      </footer>

      <ToastContainer position="bottom-right" toastClassName="text-sm" />
    </>
  );
};

export default Contact;
