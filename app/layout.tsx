import type { Metadata } from "next";
import { Asta_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import AuthProvider from "@/components/AuthProvider/AuthProvider";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";

const astaSans = Asta_Sans({
  subsets:['latin'],
  weight:['400', '500', '600', '700'],
  variable: '--font-family',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Read Journey",
  description: "Discover books, share your reading experiences, and explore new stories with Read Journey.",
  icons:{
    icon: "/favicon.png"
  } 
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={` ${astaSans.variable}`}>
      <body>
        <TanStackProvider>
          <AuthProvider>
            {children}
            <Toaster/>
          </AuthProvider>
        </TanStackProvider>
      </body>
    </html>
  );
}
