import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Raul Barquilla Jr. - Web Developer",
  description: "My NextJS Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${poppins.variable} antialiased leading-8 overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
