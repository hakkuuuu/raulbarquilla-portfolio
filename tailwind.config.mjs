/* eslint-disable import/no-anonymous-default-export */

import { Poppins } from 'next/font/google';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        lightHover: '#F0F0F0',
        darkHover: '#1c1c1c',
        darkTheme: '#1E1E1E',
      },
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
      }
    },
  },
  plugins: [],
};
