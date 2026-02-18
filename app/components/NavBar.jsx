'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi';
import Image from 'next/image';

const NAV_ITEMS = ['Home', 'About', 'Skills', 'Projects', 'Contact'];

const NavBar = () => {
  const [isScroll, setIsScroll] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('Home');
  const sideMenuRef = useRef();
  const { theme, toggleTheme } = useTheme();

  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => setIsScroll(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (sideMenuRef.current && !sideMenuRef.current.contains(e.target)) {
        closeMenu();
      }
    };
    if (isMenuOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 py-4 transition-all duration-500 ${
          isScroll
            ? 'bg-white/70 dark:bg-[#070707]/70 backdrop-blur-xl border-b border-gray-200/60 dark:border-white/5 shadow-sm shadow-black/5'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <a
            href="#home"
            className="flex items-center gap-2 font-semibold text-sm text-gray-900 dark:text-white shrink-0 group"
          >
            <div className="w-7 h-7 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
              <Image
                src="/logo.png"
                alt="dev.haku Logo"
                width={18}
                height={18}
              />
            </div>
            <span className="tracking-tight">
              dev<span className="text-blue-600 font-bold">.haku</span>
            </span>
          </a>

          <ul className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center gap-1 bg-gray-100/80 dark:bg-white/5 backdrop-blur-sm border border-gray-200/80 dark:border-white/10 rounded-full px-2 py-1.5">
            {NAV_ITEMS.map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setActiveItem(item)}
                  className={`relative text-sm font-medium px-4 py-1.5 rounded-full transition-all duration-200 ${
                    activeItem === item
                      ? 'bg-white dark:bg-white/10 text-blue-600 dark:text-blue-400 shadow-sm shadow-black/10'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-white/5'
                  }`}
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 shrink-0">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-all duration-200"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                <FiSun className="w-4 h-4" />
              ) : (
                <FiMoon className="w-4 h-4" />
              )}
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={openMenu}
              className="md:hidden p-2 rounded-full text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-all duration-200"
              aria-label="Open menu"
            >
              <FiMenu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeMenu}
      />

      <aside
        ref={sideMenuRef}
        className={`fixed top-0 right-0 bottom-0 z-50 w-72 bg-white dark:bg-[#0c0c0c] border-l border-gray-200 dark:border-white/10 flex flex-col shadow-2xl transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 dark:border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center shadow-md shadow-blue-500/30">
              <Image
                src="/logo.png"
                alt="dev.haku Logo"
                width={16}
                height={16}
              />
            </div>
            <span className="font-semibold text-sm text-gray-900 dark:text-white tracking-tight">
              dev<span className="text-blue-600 font-bold">.haku</span>
            </span>
          </div>
          <button
            onClick={closeMenu}
            className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
            aria-label="Close menu"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* Sidebar Nav */}
        <nav className="flex-1 px-4 py-6 flex flex-col gap-1">
          {NAV_ITEMS.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => {
                setActiveItem(item);
                closeMenu();
              }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeItem === item
                  ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="px-6 py-5 border-t border-gray-100 dark:border-white/10">
          <button
            onClick={toggleTheme}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white transition-all duration-200"
          >
            {theme === 'dark' ? (
              <FiSun className="w-4 h-4" />
            ) : (
              <FiMoon className="w-4 h-4" />
            )}
            {theme === 'dark' ? 'Light mode' : 'Dark mode'}
          </button>
        </div>
      </aside>
    </>
  );
};

export default NavBar;
