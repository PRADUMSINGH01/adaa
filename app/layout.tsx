// app/layout.tsx
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";
import Provider from "./providers";
import { authOptions } from "@/components/lib/auth";
import Navbar from "@/components/Nav/Navbar";
import { CartProvider } from "./CartContext";

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={`${poppins.variable} ${playfair.variable} font-sans`}>
        <Provider session={session}>
          <CartProvider>
            <Navbar />
            {children}
          </CartProvider>
        </Provider>
      </body>
    </html>
  );
}
