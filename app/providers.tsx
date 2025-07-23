// app/providers.tsx
"use client";

//import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { Poppins, Playfair_Display } from "next/font/google";
//import { Session } from "next-auth";

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

interface ProvidersProps {
  children: ReactNode;
  //  session: Session | null;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    //  <SessionProvider session={session}>
    <div className={`${poppins.variable} ${playfair.variable}`}>{children}</div>
    // </SessionProvider>
  );
}
