import type { Metadata } from "next";
import { Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers";
import Navbar from "@/components/Nav/Navbar";
import Provider from "./providers";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-poppins",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "KurtiKraft - Elegant Women's Kurtis",
  description:
    "Discover handcrafted designer kurtis blending traditional craftsmanship with modern style",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} ${playfair.variable} font-sans`}>
        <Provider>
          <Providers>
            <Navbar />
            {children}
          </Providers>
        </Provider>
      </body>
    </html>
  );
}
