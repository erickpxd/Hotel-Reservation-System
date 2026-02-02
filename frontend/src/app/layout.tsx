import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "../context/AuthContext";
import { Navbar } from "../shared/components/navbar";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "JalaHotel",
  description: "Book your luxury stay today.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} font-sans antialiased bg-gray-50 text-gray-900`}>
        <AuthProvider>
          <Toaster position="top-center" />
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}