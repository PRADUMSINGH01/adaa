"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";

const Providers = ({ children }: { children: ReactNode }) => (
  <ThemeProvider attribute="class" defaultTheme="light">
    {children}
  </ThemeProvider>
);

export default Providers;
