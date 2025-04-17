"use client";

import { Poppins, Playfair_Display } from "next/font/google";
import { ReactNode } from "react";

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

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <div className={`${poppins.variable} ${playfair.variable}`}>{children}</div>
  );
}
