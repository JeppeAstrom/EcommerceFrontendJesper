import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import GlobalState from "./context";
import Authentication from "./context/authProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalState>
        <Authentication>
        <Header/>
      
        <div className="main-container">
        {children}
        </div>
        </Authentication>
        </GlobalState>
        </body>
    </html>
  );
}
