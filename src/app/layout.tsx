import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import AuthContext from "./context/authContext";
import CartContext from "./context/cartContext";


const quicksand = Quicksand({ subsets: ["latin"] });


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
      <body className={quicksand.className}>
        <CartContext>
        <AuthContext>
        <Header/>
      
        <div className="main-container">
        {children}
        </div>
        </AuthContext>
        </CartContext>
        </body>
    </html>
  );
}
