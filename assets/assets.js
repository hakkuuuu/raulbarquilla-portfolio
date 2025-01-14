
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
    { project: assets.project_1, title: 'HeroesConnect', description: 'An event proposal dashboard with admin and student interfaces, proposal submissions, multi-level approval, analytics, budget tracking, and user management', language: ['ReactJs', 'MaterialUI', 'Laravel', 'RestAPI'] },
    { project: assets.project_2, title: 'Hilink', description: 'A modern travel app UI built with Next.js, TypeScript, and Tailwind CSS, offering a clean, intuitive design for exploring travel destinations and campsites.', language: ['ReactJs', 'NextJs', 'TailwindCSS'] },
    { project: assets.project_3, title: 'EmoCare', description: 'A mobile app prototype designed to provide AI-driven mental health support. Users can ask mental health-related questions, and the AI responds based on their needs.', language: ['Java', 'OpenAI', 'Tensorflow'] },
    { project: assets.project_4, title: 'Wfit', description: 'A product filtering website using Vanilla JS and Tailwind CSS. The key features are search, filter by category, and add items to cart.', language: ['HTML', 'TawilwindCSS', 'Javascript'] }]