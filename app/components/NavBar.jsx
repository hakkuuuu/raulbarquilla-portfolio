import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { assets } from '@/assets/assets';

const NavBar = () => {
  const [isScroll, setIsScroll] = useState(null);
  const sideMenuRef = useRef();

  const openMenu = () => {
    sideMenuRef.current.style.transform = 'translateX(-16rem)';
  };
  const closeMenu = () => {
    sideMenuRef.current.style.transform = 'translateX(16rem)';
  };

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (scrollY > 50) {
        setIsScroll(true);
      } else {
        setIsScroll(false);
      }
    });
  }, []);

  return (
    <>
      <nav
        className={`w-full fixed px-5 lg:px-8 xl:px-[8%] py-2 flex items-center justify-between z-20 ${
          isScroll ? 'backdrop-blur-lg border-bborder-white/10 shadow-lg' : ''
        }`}
      >
        <a href="#home" className="font-semibold text-base">
          Dev<span className="font-bold text-md text-blue-700">.Haku</span>
        </a>
        <ul className="hidden md:flex text-md items-center gap-6 lg:gap-8 rounded-full px-12 py-2 ml-auto ">
          <li>
            <a href="#home" className="hover:text-blue-700">
              Home
            </a>
          </li>
          <li>
            <a href="#about" className="hover:text-blue-700">
              About
            </a>
          </li>
          <li>
            <a href="#projects" className="hover:text-blue-700">
              Projects
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-blue-700">
              Contact
            </a>
          </li>
        </ul>

        <div className="flex items-center gap-2">
          <button className="block md:hidden" onClick={openMenu}>
            <Image src={assets.ic_menu_white} alt="menu" className="w-10" />
          </button>
        </div>

        {/* ----- mobile menu ----- */}

        <ul
          ref={sideMenuRef}
          className="flex md:hidden flex-col gap-4 py-6 fixed px-10 -right-64 top-0 bottom-0 w-64 z-50 h-screen transition duration-1000"
        >
          <div onClick={closeMenu}>
            <Image
              src={assets.ic_close_white}
              alt="close"
              className="w-8 cursor-pointer"
            />
          </div>

          <li>
            <a onClick={closeMenu} href="#home" className="hover:text-blue-700">
              Home
            </a>
          </li>
          <li>
            <a
              onClick={closeMenu}
              href="#about"
              className="hover:text-blue-700"
            >
              About
            </a>
          </li>
          <li>
            <a
              onClick={closeMenu}
              href="#projects"
              className="hover:text-blue-700"
            >
              Projects
            </a>
          </li>
          <li>
            <a
              onClick={closeMenu}
              href="#contact"
              className="hover:text-blue-700"
            >
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
