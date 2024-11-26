'use client'

import { NextUIProvider } from "@nextui-org/react";
import { Victor_Mono } from "next/font/google";

import "./globals.css";
// import 'primeicons/primeicons.css';

const plusJakartaSans = Victor_Mono({ subsets: ["latin"] });

import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={plusJakartaSans.className}>
        <NextUIProvider>
          <main>{children}</main>
        </NextUIProvider>
      </body>
    </html>
  )
}