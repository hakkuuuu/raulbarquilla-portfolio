import { Inter, JetBrains_Mono, Silkscreen } from 'next/font/google';
import { ThemeProvider } from './context/ThemeContext';
import ThemeScript from './components/ThemeScript';
import NavBar from './components/NavBar';
import SiteFooter from './components/SiteFooter';
import { profile } from './data/site';
import './globals.css';

const sans = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  display: 'swap',
});

const mono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  display: 'swap',
});

/* Accent face only: the logo mark and small status labels. Never body copy. */
const pixel = Silkscreen({
  variable: '--font-pixel',
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

/* Pinch zoom is never restricted. maximum-scale was a WCAG 1.4.4 failure. */
export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

const description =
  'Raul Barquilla Jr. is an AI and full-stack engineer in Albay, Philippines, building agentic AI systems, CRM integrations and production web apps with TypeScript, Next.js and PostgreSQL.';

export const metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: {
    default: `${profile.shortName} - ${profile.role}`,
    template: `%s - ${profile.shortName}`,
  },
  description,
  keywords: [
    'AI engineer',
    'agentic AI',
    'Claude API',
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
  // Generated from app/components/ui/brandPixels.mjs. app/favicon.ico is
  // linked automatically by Next (with a cache-busting hash), so only the
  // SVG and the Apple touch icon are declared here.
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
    apple: '/apple-touch-icon.png',
  },
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
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${sans.variable} ${mono.variable} ${pixel.variable}`}>
      <body>
        <ThemeScript />
        <ThemeProvider>
          <a href="#main" className="skip-link">
            Skip to content
          </a>
          <NavBar />
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
