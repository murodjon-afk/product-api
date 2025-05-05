
import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import SessionWrapper from "../componens/SessionWrapper"; 
import Header from "@/componens/Header";
import Footer from "@/componens/Footer"; 


export const metadata: Metadata = {
  title: "Mevazor",
  description: "Интернет-магазин",
  icons: {
    icon: "/mevazor.jpg", // Путь к вашему favicon
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ru">
      <body className="p-6 space-y-8">
        <SessionWrapper>
          <Header />
          {children}
          <Footer /> 
        </SessionWrapper>
      </body>
    </html>
  );
}
