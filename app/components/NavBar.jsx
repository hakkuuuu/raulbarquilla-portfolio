import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { assets } from '@/assets/assets';

const NavBar = () => {
  const [isScroll, setIsScroll] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const sideMenuRef = useRef();

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
  className={`w-full fixed px-6 sm:px-8 lg:px-12 xl:px-[8%] py-2 flex items-center z-20 border-b border-white/10 transition-all duration-300 ${
    isScroll ? 'backdrop-blur-lg' : 'bg-transparent'
  }`}
    >
      {/* Logo */}
      <a href="#home" className="font-semibold text-md">
        Dev<span className="font-bold text-md text-blue-700">.Haku</span>
      </a>

      {/* Desktop Menu */}
      <ul className="hidden md:flex text-md items-center gap-6 lg:gap-8 rounded-full px-8 sm:px-12 py-2 ml-auto">
        {['Home', 'About', 'Projects', 'Contact'].map((item) => (
          <li key={item}>
            <a href={`#${item.toLowerCase()}`} className="hover:text-blue-700">
              {item}
            </a>
          </li>
        ))}
      </ul>

      {/* Mobile Menu Button */}
      <button className="block md:hidden ml-auto" onClick={openMenu}>
        <Image src={assets.ic_menu_white} alt="menu" className="w-8" />
      </button>

      {/* Mobile Sidebar */}
      <ul
        ref={sideMenuRef}
        className={`fixed top-0 bottom-0 right-0 w-64 bg-[#070707] text-white flex flex-col gap-6 px-10 py-6 z-50 h-screen shadow-lg transition-transform duration-300 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Close Button */}
        <div onClick={closeMenu} className="self-end cursor-pointer">
          <Image src={assets.ic_close_white} alt="close" className="w-8" />
        </div>

        {['Home', 'About', 'Projects', 'Contact'].map((item) => (
          <li key={item}>
            <a
              onClick={closeMenu}
              href={`#${item.toLowerCase()}`}
              className="hover:text-blue-700"
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
