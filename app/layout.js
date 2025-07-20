import { Poppins } from "next/font/google";
import { ThemeProvider } from "./context/ThemeContext";
import BackToTop from "./components/BackToTop";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata = {
  metadataBase: new URL('https://raulbarquilla-portfolio.vercel.app/'),
  title: "Raul Barquilla Jr. - Web Developer",
  description: "Full-stack web developer specializing in creating functional, visually appealing, and user-friendly websites and applications. Explore my portfolio of projects and get in touch for collaboration opportunities.",
  keywords: ["web developer", "frontend developer", "React developer", "Next.js developer", "Philippines developer"],
  openGraph: {
    title: "Raul Barquilla Jr. - Web Developer",
    description: "Full-stack web developer specializing in creating functional, visually appealing, and user-friendly websites and applications.",
    type: "website",
    url: '/',
    images: [
      {
        url: "/hero_img.png",
        width: 1200,
        height: 630,
        alt: "Raul Barquilla Jr. - Web Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Raul Barquilla Jr. - Web Developer",
    description: "Full-stack web developer specializing in creating functional, visually appealing, and user-friendly websites and applications.",
    images: ["hero_img.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
  robots: "index, follow",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${poppins.variable} antialiased leading-8 overflow-x-hidden relative bg-white text-gray-900 dark:bg-[#070707] dark:text-white transition-colors duration-200`}>
        <ThemeProvider>
          {/* Page Content */}
          <div className="relative z-10">{children}</div>
          <BackToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
