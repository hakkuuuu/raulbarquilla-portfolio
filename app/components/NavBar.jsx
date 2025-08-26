'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';
import Image from 'next/image';

const NavBar = () => {
  const [isScroll, setIsScroll] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const sideMenuRef = useRef();
  const { theme, toggleTheme } = useTheme();

  // Handle mobile menu open/close
  const openMenu = () => {
    setIsMenuOpen(true);
  };
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScroll(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`w-full fixed px-6 sm:px-8 lg:px-12 xl:px-[12%] py-2 flex items-center z-20 border-b transition-all duration-300 ${
        isScroll
          ? 'bg-white/80 border-gray-200 backdrop-blur-lg dark:bg-[#070707]/80 dark:border-gray-800'
          : 'bg-white border-gray-200 dark:bg-[#070707] dark:border-gray-800'
      }`}
    >
      {/* Logo */}
      <a
        href="#home"
        className="flex items-center font-semibold text-md text-gray-900 dark:text-white"
      >
        <Image
          src="/logo.png"
          alt="dev.daku Logo"
          width={20}
          height={20}
          className="mr-2"
        />
        dev<span className="font-bold text-md text-blue-700">.haku</span>
      </a>

      {/* Desktop Menu */}
      <ul className="hidden md:flex text-md items-center gap-6 lg:gap-1 rounded-full px-2 sm:px-2 py-2 ml-auto">
        {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
          <li key={item}>
            <a
              href={`#${item.toLowerCase()}`}
              className="text-gray-700 hover:text-blue-700 hover:bg-blue-800/10 rounded-xl py-2 px-4 dark:text-gray-300 dark:hover:text-blue-500 transition-colors"
            >
              {item}
            </a>
          </li>
        ))}

        {/* Theme Toggle Button */}
        <li>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-blue-800/10 transition-colors"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <FiSun className="w-5 h-5" />
            ) : (
              <FiMoon className="w-5 h-5" />
            )}
          </button>
        </li>
      </ul>

      {/* Mobile Menu Button */}
      <div className="flex items-center gap-4 md:hidden ml-auto">
        {/* Theme Toggle Button (Mobile) */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? (
            <FiSun className="w-5 h-5" />
          ) : (
            <FiMoon className="w-5 h-5" />
          )}
        </button>

        <button
          onClick={openMenu}
          className="p-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          aria-label="Open menu"
        >
          <FiMenu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Sidebar */}
      <ul
        ref={sideMenuRef}
        className={`fixed top-0 bottom-0 right-0 w-full bg-white dark:bg-[#070707] text-gray-900 dark:text-white flex flex-col items-center gap-6 px-10 py-6 z-50 h-screen shadow-lg transition-transform duration-300 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Close Button */}
        <div className="mt-12 mb-6">
          <button
            onClick={closeMenu}
            className="p-2 border text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-[#070707] hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            aria-label="Close menu"
          >
            <FiX className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-row items-center mb-2">
          <Image
            src="/logo.png"
            alt="dev.daku Logo"
            width={34}
            height={34}
            className="mr-2"
          />
          <span className="font-bold text-xl text-gray-900 dark:text-white">
            dev
          </span>
          <span className="font-bold text-xl text-blue-700">.haku</span>
        </div>
        {['Home', 'About', 'Projects', 'Contact'].map((item) => (
          <li key={item}>
            <a
              onClick={closeMenu}
              href={`#${item.toLowerCase()}`}
              className="text-gray-700 hover:text-blue-700 hover:bg-blue-800/10 rounded-xl py-4 px-20 dark:text-gray-300 dark:hover:text-blue-500 transition-colors"
            >
              {item}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
