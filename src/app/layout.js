import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@component/Navbar/index";
import { UserProvider } from "@auth0/nextjs-auth0/client";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "WISE-ASS",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="dracula">
      <UserProvider>
        <body className={inter.className}>
          <Navbar />
          {children}
        </body>
      </UserProvider>
    </html>
  );
}
