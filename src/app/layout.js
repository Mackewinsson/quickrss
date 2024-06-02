import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@component/Navbar/index";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { startAllRSSFeedSubscriptions } from "../utils/rssChecker";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "uprss",
  description: "",
};
startAllRSSFeedSubscriptions();

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
