import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Inventory App",
  description: "App de inventarios",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
<html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="pt-16"> {/* Ajusta el padding-top según el tamaño del header */}
          {children}
        </main>
      </body>
    </html>
  );
}
