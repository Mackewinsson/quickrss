import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@component/Navbar/index";
import { UserProvider } from "@auth0/nextjs-auth0/client";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "quickrss",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dracula" className="h-full">
      <UserProvider>
        <body className={`${inter.className} h-full bg-slate-100`}>
          <Navbar />
          <main className="container mx-auto px-4 py-8 bg-white h-full justify-center">
            {children}
          </main>
        </body>
      </UserProvider>
    </html>
  );
}
