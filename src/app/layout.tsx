import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer"
import { Toaster } from "react-hot-toast";
import { CartContextProvider } from "@/components/context/CartContext";
import { WishlistContextProvider } from "../components/context/wishlistContext";
import { ThemeProvider } from "next-themes"
import MySessionProvider from "@/components/MySessionProvider";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ShopMart",
  description: "E-commerce is an online platform that enables businesses to showcase, sell, and manage products or services through the internet. It allows customers to browse items, compare prices, add products to a cart, and complete secure payments anytime and from anywhere. The system typically includes features such as product management, user authentication, order tracking, payment integration, and customer support, providing a fast, convenient, and scalable shopping experience for both sellers and buyers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
            // <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {
          <MySessionProvider>
          <WishlistContextProvider>
          <CartContextProvider>
                  <Navbar/>
        {children}
         <Toaster/>
        <Footer/>
          </CartContextProvider>
          </WishlistContextProvider>
          </MySessionProvider>
          }
      </body>
    </html>
    // </ThemeProvider>
  );
}
