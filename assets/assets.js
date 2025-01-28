
import ic_moon from './ic_moon.png'
import ic_sun from './ic_sun.png'
import ic_menu_white from './ic_menu_white.png'
import ic_menu_black from './ic_menu_black.png'
import ic_close_white from './ic_close_white.png'
import ic_close_black from './ic_close_black.png'
import hero_img from './hero_img.png'
import about_img from './about_img.png'

import ic_code_dark from './ic_code_dark.png'
import ic_edu_dark from './ic_edu_dark.png'
import ic_project_dark from './ic_project_dark.png'
import ic_code_white from './ic_code_white.png'
import ic_edu_white from './ic_edu_white.png'
import ic_project_white from './ic_project_white.png'
import ic_dbeaver from './ic_dbeaver.png'
import ic_figma from './ic_figma.png'
import ic_git from './ic_git.png'
import ic_postman from './ic_postman.png'
import ic_vscode from './ic_vscode.png'
import project_1 from '../public/project_1.png'
import project_2 from '../public/project_2.png'
import project_3 from '../public/project_3.png'
import project_4 from '../public/project_4.png'
import project_5 from '../public/project_5.png'
import ic_fb from './ic_fb.png'
import ic_ig from './ic_ig.png'
import ic_gmail from './ic_gmail.png'
import ic_github from './ic_github.png'
import ic_linkedin from './ic_linkedin.png'
import ic_behance from './ic_behance.png'

export const assets = {
    ic_moon,
    ic_sun,
    ic_menu_white,
    ic_menu_black,
    ic_close_white,
    ic_close_black,
    hero_img,
    about_img,
    ic_code_dark,
    ic_edu_dark,
    ic_project_dark,
    ic_code_white,
    ic_edu_white,
    ic_project_white,
    ic_dbeaver,
    ic_figma,
    ic_git,
    ic_postman,
    ic_vscode,
    project_1,
    project_2,
    project_3,
    project_4,
    project_5,
    ic_fb,
    ic_ig,
    ic_gmail,
    ic_linkedin,
    ic_behance,
    ic_github,
}

export const infoList = [
    { icon: assets.ic_code_white, iconDark: assets.ic_code_dark, title: 'Languages', description: 'HTML, CSS, Tailwind, MaterialUI, JavaScript, ReactJs, NextJs' },
    { icon: assets.ic_edu_white, iconDark: assets.ic_edu_dark, title: 'Education', description: <>Bicol University 2023 <br></br> BS Computer Science </> },
    { icon: assets.ic_project_white, iconDark: assets.ic_project_dark, title: 'Projects', description: 'Built more than 5 projects' }
]

export const toolList = [
    assets.ic_vscode, assets.ic_git, assets.ic_figma, assets.ic_postman, assets.ic_dbeaver
]

export const projectList = [
    { project: assets.project_1, title: 'HeroesConnect', description: 'An event proposal dashboard with admin and student interfaces, proposal submissions, multi-level approval, analytics, budget tracking, and user management', language: ['ReactJs', 'MaterialUI', 'Laravel', 'PostgresSQL'], link: 'https://github.com/Think-and-Clack/heroes-connect-frontend', demo: 'https://heroesconnect.site/' },
    { project: assets.project_5, title: 'Hakomerch', description: 'HakoMerch is a MERN stack app for merchandise management, built with React.js and Tailwind CSS for frontend UI, and Express.js and MongoDB for backend.', language: ['ReactJs', 'TailwindCSS', 'Express.js', 'MongoDB'], link: 'https://github.com/hakkuuuu/hakomerch-product-store', demo: 'https://hakomerch-product-store.onrender.com/' },
    { project: assets.project_2, title: 'Hilink', description: 'A modern travel app UI built with Next.js, TypeScript, and Tailwind CSS, offering a clean, intuitive design for exploring travel destinations and campsites.', language: ['ReactJs', 'NextJs', 'TailwindCSS'], link: 'https://github.com/hakkuuuu/travel-app', demo: 'https://travel-app-navy-eight.vercel.app/' },
    { project: assets.project_4, title: 'WFit', description: 'A product filtering website using HTML, Vanilla JavaScript, and Tailwind CSS. The key features are search, filter by category, and add items to shopping cart.', language: ['HTML', 'TailwindCSS', 'Javascript'], link: 'https://github.com/hakkuuuu/wfit-store', demo: 'https://wfit-store.vercel.app/' },
    { project: assets.project_3, title: 'EmoCare', description: 'A mobile app prototype designed to provide AI-driven mental health support. Users can ask mental health-related questions, and the AI responds based on their needs.', language: ['Java', 'OpenAI', 'Tensorflow'], link: 'https://github.com/raffittee/EmoCare/tree/raul-copy', demo: 'https://github.com/raffittee/EmoCare/tree/raul-copy' }]

export const socialList = [
    { icon: assets.ic_gmail, link: "mailto:raulbarquilla003@gmail.com", title: 'raulbarquilla003@gmail.com' },
    { icon: assets.ic_fb, link: 'https://www.facebook.com/raulbarquillajr', title: 'raulbarquillajr' },
    { icon: assets.ic_ig, link: "https://instagram.com/hqkuuuuu", title: '@hqkuuuuu' },
    { icon: assets.ic_github, link: "https://github.com/hakkuuuu", title: 'hakkuuuu' },
    { icon: assets.ic_linkedin, link: "https://linkedin.com/in/rbarquillajr", title: 'rbarquillajr' },
    { icon: assets.ic_behance, link: "https://behance.net/raulbarquillajr", title: 'raulbarquillajr' },
]