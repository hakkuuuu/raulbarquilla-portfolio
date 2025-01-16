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
        className={`w-full fixed px-5 lg:px-8 xl:px-[8%] py-3 flex items-center justify-between z-50 ${
          isScroll ? 'bg-white bg-opacity-50 backdrop-blur-lg shadow-sm' : ''
        }`}
      >
        <a href="#home">
          <span className="font-medium text-lg">Raul B. Barquilla Jr.</span>
        </a>
        <ul className="hidden md:flex text-lg items-center gap-6 lg:gap-8 rounded-full px-12 py-3">
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#projects">Projects</a>
          </li>
        </ul>

        <div className="flex items-center gap-2">
          <button>
            <Image src={assets.ic_moon} alt="moon_icon" className="w-8" />
          </button>
          <a
            href="#contact"
            className="hidden lg:flex items-center gap-3 px-8 py-2 border border-gray-600 rounded-full ml-4 hover:bg-lightHover hover:text-gray-900 duration-500"
          >
            Contact
          </a>
          <button className="block md:hidden" onClick={openMenu}>
            <Image src={assets.ic_menu_black} alt="menu" className="w-10" />
          </button>
        </div>

        {/* ----- mobile menu ----- */}

        <ul
          ref={sideMenuRef}
          className="flex md:hidden flex-col gap-4 py-6 fixed px-10 -right-64 top-0 bottom-0 w-64 z-50 h-screen bg-gray-100 transition duration-1000"
        >
          <div onClick={closeMenu}>
            <Image
              src={assets.ic_close_black}
              alt="close"
              className="w-8 cursor-pointer"
            />
          </div>

          <li>
            <a onClick={closeMenu} href="#home">
              Home
            </a>
          </li>
          <li>
            <a onClick={closeMenu} href="#about">
              About
            </a>
          </li>
          <li>
            <a onClick={closeMenu} href="#projects">
              Projects
            </a>
          </li>
          <li>
            <a onClick={closeMenu} href="#contact">
              Contact
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
