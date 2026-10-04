import { Geist, Geist_Mono } from 'next/font/google';
import { ThemeProvider } from './context/ThemeContext';
import ThemeScript from './components/ThemeScript';
import SmoothScroll from './components/motion/SmoothScroll';
import FallingMark from './components/motion/FallingMark';
import NavBar from './components/NavBar';
import SiteFooter from './components/SiteFooter';
import { profile } from './data/site';
import './globals.css';

const sans = Geist({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
});

const mono = Geist_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  display: 'swap',
});

/* Pinch zoom is never restricted. maximum-scale was a WCAG 1.4.4 failure. */
export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

const description =
  'Raul Barquilla Jr. is a full-stack developer in Albay, Philippines, building production web applications with React, Next.js, Node and Laravel.';

export const metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: {
    default: `${profile.shortName} - ${profile.role}`,
    template: `%s - ${profile.shortName}`,
  },
  description,
  keywords: [
    'full-stack developer',
    'React developer',
    'Next.js developer',
    'web developer Philippines',
    'Raul Barquilla',
  ],
  authors: [{ name: profile.shortName, url: profile.siteUrl }],
  creator: profile.shortName,
  alternates: { canonical: '/' },
  openGraph: {
    title: `${profile.shortName} - ${profile.role}`,
    description,
    type: 'website',
    url: '/',
    siteName: profile.brand,
    images: [{ url: '/hero_img.png', width: 1200, height: 1200, alt: profile.shortName }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${profile.shortName} - ${profile.role}`,
    description,
    images: ['/hero_img.png'],
  },
  icons: { icon: '/favicon.ico' },
  robots: { index: true, follow: true },
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  alternateName: profile.brand,
  jobTitle: profile.role,
  url: profile.siteUrl,
  email: `mailto:${profile.email}`,
  address: { '@type': 'PostalAddress', addressRegion: 'Albay', addressCountry: 'PH' },
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'Bicol University' },
  sameAs: [
    'https://github.com/hakkuuuu',
    'https://www.linkedin.com/in/raulbjr/',
    'https://behance.net/raulbarquillajr',
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${sans.variable} ${mono.variable}`}>
      <body>
        <ThemeScript />
        <SmoothScroll />
        <ThemeProvider>
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <NavBar />
          <FallingMark />
          <main id="main">{children}</main>
          <SiteFooter />
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
