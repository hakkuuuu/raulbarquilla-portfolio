
import hero_img from '../public/hero_img.png'
import about_img from './about_img.png'

import { FiMail, FiFacebook, FiInstagram, FiGithub, FiLinkedin } from 'react-icons/fi';
import { FaBehance } from 'react-icons/fa';
import { FaGraduationCap, FaFolderOpen, FaTools } from 'react-icons/fa';

export const assets = {
    hero_img,
    about_img,
}

export const infoList = [
    { icon: FaGraduationCap, title: 'Education', description: <>Bicol University 2023 <br></br> BS Computer Science <br></br> Daraga, Albay</> },
    { icon: FaFolderOpen, title: 'Projects', description: 'Developed over 10 projects specializing in React.js and Next.js' },
    { icon: FaTools, title: 'Tools I use', description: 'VSCode, Git, Github, Postman, DBeaver, Notion, Figma' },
]

export const projectList = [
    { project: assets.project_7, title: 'HakoStore', description: 'A full-stack inventory management web application that allows users to manage products efficiently. Built with a modern tech stack — React, Vite, Tailwind CSS, Express, and Neon Postgres.', language: ['ReactJs', 'TailwindCSS', 'DaisyUI', 'Express.js', 'Node.js', "PostgresSQL"], link: 'https://github.com/hakkuuuu/Hakostore', demo: 'https://hakostore.onrender.com/' },
    { project: assets.project_8, title: 'Travelis', description: 'A comprehensive travel booking application built with Next.js 15, React, and MongoDB. Features destination discovery, user authentication, booking management, and an admin dashboard.', language: ['NextJs', 'TypeScript', 'TailwindCSS', 'Node.js', 'MongoDB'], link: 'https://github.com/hakkuuuu/travel-app', demo: 'https://travel-app-w4qg.onrender.com/' },
    { project: assets.project_1, title: 'HeroesConnect', description: 'An event proposal dashboard with admin and student interfaces, proposal submissions, multi-level approval, analytics, budget tracking, and user management.', language: ['ReactJs', 'MaterialUI', 'Laravel', 'PostgresSQL'], link: 'https://github.com/Think-and-Clack/heroes-connect-frontend', demo: 'https://heroesconnect.site/' },
    { project: assets.project_2, title: 'Hakomerch', description: 'A merchandise management app built with the MERN stack, utilizing React.js and Tailwind CSS for the frontend UI, and Express.js with MongoDB for the backend.', language: ['ReactJs', 'TailwindCSS', 'Express.js', 'MongoDB'], link: 'https://github.com/hakkuuuu/hakomerch-product-store', demo: 'https://hakomerch-product-store.onrender.com/' },
    { project: assets.project_6, title: 'Hakomovies', description: 'A movie browsing platform built using ReactJS, TailwindCSS, and TMDB API. Featureing search for movies, explore top IMDB, and view detailed information in a modern interface.', language: ['ReactJs', 'TailwindCSS', 'TMDB API'], link: 'https://github.com/hakkuuuu/hakomovies', demo: 'https://hakomovies.vercel.app/' },
    // { project: assets.project_4, title: 'WFit', description: 'A product filtering website using HTML, JavaScript, and Tailwind CSS. The key features are search, filter by category, and add items to shopping cart.', language: ['HTML', 'TailwindCSS', 'Javascript'], link: 'https://github.com/hakkuuuu/wfit-store', demo: 'https://wfit-store.vercel.app/' },
    { project: assets.project_5, title: 'EmoCare', description: 'A mobile app designed to provide AI-driven mental health support. Users can ask mental health-related questions, and the AI responds based on their needs.', language: ['Java', 'OpenAI', 'Tensorflow'], link: 'https://github.com/raffittee/EmoCare/tree/raul-copy', demo: 'https://github.com/raffittee/EmoCare/tree/raul-copy' }]

export const socialList = [
    { icon: FiMail, link: "mailto:raulbarquilla003@gmail.com", title: 'raulbarquilla003@gmail.com' },
    { icon: FiFacebook, link: 'https://www.facebook.com/raulbarquillajr', title: 'raulbarquillajr' },
    { icon: FiInstagram, link: "https://instagram.com/hqkuuuuu", title: '@hqkuuuuu' },
    { icon: FiGithub, link: "https://github.com/hakkuuuu", title: 'hakkuuuu' },
    { icon: FiLinkedin, link: "https://www.linkedin.com/in/raul-b-barquilla-jr-756058373/", title: 'rbarquillajr' },
    { icon: FaBehance, link: "https://behance.net/raulbarquillajr", title: 'raulbarquillajr' },
]

export const skills = [
    { name: "HTML", level: 95 },
    { name: "CSS", level: 95 },
    { name: "JavaScript", level: 90 },
    { name: "Python", level: 70 },
    { name: "Django", level: 70 },
    { name: "Tailwind", level: 90 },
    { name: "React.js", level: 85 },
    { name: "Next.js", level: 80 },
    { name: "Node.js", level: 75 },
    { name: "Express.js", level: 75 },
    { name: "MongoDB", level: 75 },
    { name: "PostgreSQL", level: 75 },
    { name: "Material-UI", level: 90 },
    { name: "Bootstrap", level: 90 },
    { name: "Git & GitHub", level: 85 },
];

export const fields = [
    { label: 'Full Name', name: 'fullName', type: 'text', placeholder: 'e.g. Juan Dela Cruz' },
    { label: 'Email', name: 'email', type: 'email', placeholder: 'e.g. juandelacruz@gmail.com' },
    { label: 'Message', name: 'message', type: 'textarea', placeholder: 'Your message' },
];