
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
import project_6 from '../public/project_6.png'
import ic_fb from './ic_fb.png'
import ic_ig from './ic_ig.png'
import ic_gmail from './ic_gmail.png'
import ic_github from './ic_github.png'
import ic_github_white from './ic_github_white.png'
import ic_linkedin from './ic_linkedin.png'
import ic_behance from './ic_behance.png'

export const assets = {
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
    project_6,
    ic_fb,
    ic_ig,
    ic_gmail,
    ic_linkedin,
    ic_behance,
    ic_github,
    ic_github_white,
}

export const infoList = [
    { icon: assets.ic_edu_white, iconDark: assets.ic_edu_dark, title: 'Education', description: <>Bicol University 2023 <br></br> BS Computer Science <br></br> Daraga, Albay</> },
    { icon: assets.ic_project_white, iconDark: assets.ic_project_dark, title: 'Projects', description: 'Developed over 5 projects specializing in React.js and Next.js' },
    { icon: assets.ic_code_white, iconDark: assets.ic_code_dark, title: 'Tools I use', description: 'VSCode, Git, Github, Postman, DBeaver, Notion, Figma' },
]

// export const toolList = [
//     assets.ic_vscode, assets.ic_git, assets.ic_figma, assets.ic_postman, assets.ic_dbeaver
// ]

export const projectList = [
    { project: assets.project_1, title: 'HeroesConnect', description: 'An event proposal dashboard with admin and student interfaces, proposal submissions, multi-level approval, analytics, budget tracking, and user management', language: ['ReactJs', 'MaterialUI', 'Laravel', 'PostgresSQL'], link: 'https://github.com/Think-and-Clack/heroes-connect-frontend', demo: 'https://heroesconnect.site/' },
    { project: assets.project_2, title: 'Hakomerch', description: 'A merchandise management app built with the MERN stack, utilizing React.js and Tailwind CSS for the frontend UI, and Express.js with MongoDB for the backend.', language: ['ReactJs', 'TailwindCSS', 'Express.js', 'MongoDB'], link: 'https://github.com/hakkuuuu/hakomerch-product-store', demo: 'https://hakomerch-product-store.onrender.com/' },
    { project: assets.project_7, title: 'HakoStore', description: 'An e-commerce website built with React.js, Tailwind CSS, and Firebase. It features a user-friendly interface for browsing products, adding to cart, and secure checkout.', language: ['ReactJs', 'TailwindCSS', 'DaisyUI', 'Express.js', 'Node.js', "PostgresSQP"], link: 'https://github.com/hakkuuuu/Hakostore', demo: 'https://hakostore.onrender.com/' },
    { project: assets.project_6, title: 'Hakomovies', description: 'A movie browsing platform built using ReactJS, TailwindCSS, and TMDB API. Featureing search for movies, explore top IMDB, and view detailed information in a modern interface.', language: ['ReactJs', 'TailwindCSS', 'TMDB API'], link: 'https://github.com/hakkuuuu/hakomovies', demo: 'https://hakomovies.vercel.app/' },
    { project: assets.project_3, title: 'Hilink', description: 'A modern travel app UI built with Next.js, TypeScript, and Tailwind CSS, offering a clean, intuitive design for exploring travel destinations and campsites.', language: ['ReactJs', 'NextJs', 'TailwindCSS'], link: 'https://github.com/hakkuuuu/travel-app', demo: 'https://travel-app-navy-eight.vercel.app/' },
    { project: assets.project_4, title: 'WFit', description: 'A product filtering website using HTML, JavaScript, and Tailwind CSS. The key features are search, filter by category, and add items to shopping cart.', language: ['HTML', 'TailwindCSS', 'Javascript'], link: 'https://github.com/hakkuuuu/wfit-store', demo: 'https://wfit-store.vercel.app/' },
    { project: assets.project_5, title: 'EmoCare', description: 'A mobile app designed to provide AI-driven mental health support. Users can ask mental health-related questions, and the AI responds based on their needs.', language: ['Java', 'OpenAI', 'Tensorflow'], link: 'https://github.com/raffittee/EmoCare/tree/raul-copy', demo: 'https://github.com/raffittee/EmoCare/tree/raul-copy' }]

export const socialList = [
    { icon: assets.ic_gmail, link: "mailto:raulbarquilla003@gmail.com", title: 'raulbarquilla003@gmail.com' },
    { icon: assets.ic_fb, link: 'https://www.facebook.com/raulbarquillajr', title: 'raulbarquillajr' },
    { icon: assets.ic_ig, link: "https://instagram.com/hqkuuuuu", title: '@hqkuuuuu' },
    { icon: assets.ic_github_white, link: "https://github.com/hakkuuuu", title: 'hakkuuuu' },
    { icon: assets.ic_linkedin, link: "https://linkedin.com/in/rbarquillajr", title: 'rbarquillajr' },
    { icon: assets.ic_behance, link: "https://behance.net/raulbarquillajr", title: 'raulbarquillajr' },
]

export const skills = [
    { name: "HTML", level: 95 },
    { name: "CSS", level: 95 },
    { name: "JavaScript", level: 90 },
    { name: "Tailwind", level: 90 },
    { name: "React.js", level: 85 },
    { name: "Next.js", level: 80 },
    { name: "Node.js", level: 75 },
    { name: "Express.js", level: 75 },
    { name: "MongoDB", level: 75 },
    { name: "Material-UI", level: 90 },
    { name: "Bootstrap", level: 90 },
    { name: "Git & GitHub", level: 85 },
];

export const fields = [
    { label: 'Full Name', name: 'fullName', type: 'text', placeholder: 'e.g. Juan Dela Cruz' },
    { label: 'Email', name: 'email', type: 'email', placeholder: 'e.g. juandelacruz@gmail.com' },
    { label: 'Message', name: 'message', type: 'textarea', placeholder: 'Your message' },
];