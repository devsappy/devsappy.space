import { Inter, Playfair_Display, Caveat } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: '--font-playfair',
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: '--font-caveat',
});

export const metadata = {
  title: "Sappy - Portfolio",
  description: "Website developer & Video editor based in India",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} ${caveat.variable}`}>
        {children}
      </body>
    </html>
  );
}
