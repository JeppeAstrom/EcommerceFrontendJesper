import type { Metadata } from "next";
import {  Open_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import AuthContext from "./context/authContext";
import CartContext from "./context/cartContext";
import Footer from "@/components/footer/footer";
import { useRouter } from "next/router";


const kanit = Open_Sans({
  weight: ['400', '700'],  subsets: ['latin'],
});


export const metadata: Metadata = {
  title: "SandlerShop",
  icons: 'https://i.ebayimg.com/images/g/5uUAAOSwI4xa51hh/s-l400.jpg'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {



  return (
    <html lang="en">
      <body className={kanit.className}>
      <AuthContext>
        <CartContext>
   
        <Header/>
      
        <div className="main-container">
        {children}
        </div>
        <Footer/>
        </CartContext>
        </AuthContext>
        </body>
    </html>
  );
}
